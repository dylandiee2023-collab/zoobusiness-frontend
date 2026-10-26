import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, Bot, ImagePlus, Package, Plus, Search, ShoppingCart } from "lucide-react";
import { Alert, Button, Card, EmptyState, Input, Select, Textarea } from "@/design-system/components";
import { Container } from "@/design-system/layout";
import { ContentShellViewport, useContentShell } from "@/content-shell-engine";
import { useResponsive } from "@/responsive";
import { DashboardLayout } from "@/layouts/dashboard";
import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers/workspace-provider";
import { ProductService, type CreateProductPayload, type ProductOption, type ProductRecord, type ProductStatus, type ProductType } from "@/products/services/product-service";
import "./ProductsWorkspaceRebuild.css";

type FormState = {
  name: string; slug: string; sku: string; description: string;
  categoryId: string; unitId: string; productType: ProductType; status: ProductStatus;
};
const EMPTY: FormState = { name: "", slug: "", sku: "", description: "", categoryId: "", unitId: "", productType: "PHYSICAL", status: "ACTIVE" };
const TYPES = [{ value: "PHYSICAL", label: "Physical product" }, { value: "SERVICE", label: "Service" }, { value: "DIGITAL", label: "Digital" }];
const STATUSES = [{ value: "ACTIVE", label: "Active" }, { value: "INACTIVE", label: "Inactive" }, { value: "ARCHIVED", label: "Archived" }];
const slugify = (value: string) => value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const messageOf = (error: unknown) => error instanceof Error ? error.message : "Something went wrong. Please try again.";

export function ProductsWorkspaceRebuild() {
  const platform = usePlatform();
  const { workspace, loading: workspaceLoading } = useWorkspace();
  const shell = useContentShell();
  const { isMobile, width } = useResponsive();
  // Product creation replaces the catalogue workspace; preview is desktop-only.
  const isNarrowShell = isMobile || width <= 1023;
  const service = useMemo(() => new ProductService(platform.api), [platform.api]);
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [categories, setCategories] = useState<ProductOption[]>([]);
  const [units, setUnits] = useState<ProductOption[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [formError, setFormError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!workspace?.id || workspaceLoading) return;
    let active = true;
    void Promise.allSettled([service.categories(workspace.id), service.units(workspace.id)]).then(([cats, unitList]) => {
      if (!active) return;
      if (cats.status === "fulfilled") setCategories(cats.value);
      if (unitList.status === "fulfilled") setUnits(unitList.value);
    });
    return () => { active = false; };
  }, [service, workspace?.id, workspaceLoading]);

  useEffect(() => {
    if (!workspace?.id || workspaceLoading) return;
    let active = true;
    setLoading(true);
    setError("");
    void service.list(workspace.id, { page: 1, limit: 100 }).then((result) => {
      if (!active) return;
      setProducts(result.data);
    }).catch((caught: unknown) => {
      if (active) setError(messageOf(caught));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [service, workspace?.id, workspaceLoading, reload]);

  useEffect(() => {
    if (isNarrowShell && shell.shell2?.id === "products.preview") {
      shell.closeShell2(() => true);
      setShowPreview(false);
    }
  }, [isNarrowShell, shell.shell2?.id, shell.closeShell2]);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [product.name, product.slug, product.sku ?? ""].some((value) => value.toLowerCase().includes(query));
    return matchesSearch && (statusFilter === "ALL" || product.status === statusFilter);
  }), [products, search, statusFilter]);
  const activeCount = products.filter((product) => product.status === "ACTIVE").length;
  const inactiveCount = products.filter((product) => product.status === "INACTIVE").length;
  const archivedCount = products.filter((product) => product.status === "ARCHIVED").length;

  function openWorkspace() {
    shell.closeShell2(() => true);
    shell.closeShell3(() => true);
    setForm(EMPTY);
    setFormError("");
    setShowPreview(!isNarrowShell);
    setWorkspaceOpen(true);
    if (!isNarrowShell) shell.openShell2({ id: "products.preview", title: "Live preview" });
  }

  function closeWorkspace() {
    if (saving) return;
    shell.closeShell2(() => true);
    shell.closeShell3(() => true);
    setWorkspaceOpen(false);
    setForm(EMPTY);
    setFormError("");
  }

  async function submitProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!workspace?.id) return;
    const name = form.name.trim();
    const payload: CreateProductPayload = {
      name,
      slug: form.slug.trim() || slugify(name),
      sku: form.sku.trim() || null,
      description: form.description.trim() || null,
      categoryId: form.categoryId || null,
      unitId: form.unitId || null,
      productType: form.productType,
      status: form.status,
    };
    setSaving(true);
    setFormError("");
    setNotice("");
    try {
      await service.create(workspace.id, payload);
      shell.closeShell2(() => true);
      setWorkspaceOpen(false);
      setForm(EMPTY);
      setFormError("");
      setNotice("Product created. Add purchase details separately when you are ready to receive stock.");
      setReload((value) => value + 1);
    } catch (caught) {
      setFormError(messageOf(caught));
    } finally {
      setSaving(false);
    }
  }

  const catalogueContent = (
    <div className="zb-products-page">
<header className="zb-products-header flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">CATALOGUE</p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Products</h1>
              <p className="max-w-2xl text-sm opacity-70 sm:text-base">Manage your product catalogue, product types and availability in one workspace.</p>
            </div>
            <Button type="button" onClick={openWorkspace} leftIcon={<Plus size={18} />}>Add product</Button>
          </header>

          {notice ? <Alert variant="success" title="Product saved">{notice}</Alert> : null}
          {error ? <Alert variant="danger" title="Could not load products"><div className="flex flex-wrap items-center justify-between gap-3"><span>{error}</span><Button type="button" variant="outline" onClick={() => setReload((value) => value + 1)}>Try again</Button></div></Alert> : null}

          <section aria-label="Product summary" className="zb-products-summary grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            <SummaryCard label="Total products" value={error ? "—" : products.length} detail={error ? "Unable to load catalogue" : "In this workspace"} icon={<Package size={18} />} />
            <SummaryCard label="Active products" value={error ? "—" : activeCount} detail="Available in catalogue" />
            <SummaryCard label="Inactive products" value={error ? "—" : inactiveCount} detail="Not currently active" />
            <SummaryCard label="Archived products" value={error ? "—" : archivedCount} detail="Kept for records" />
            <SummaryCard label="Stock cost value" value="—" detail="Available from inventory data" />
            <SummaryCard label="Retail value" value="—" detail="Available from price data" />
          </section>

          <section className="flex flex-col gap-4">
            <div className="zb-products-toolbar flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 flex-1">
                <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search product name, SKU or slug…" aria-label="Search products" fullWidth />
              </div>
              <div className="w-full sm:w-52">
                <Select aria-label="Filter by status" value={statusFilter} options={[{ value: "ALL", label: "All statuses" }, ...STATUSES]} onChange={(event) => setStatusFilter(event.target.value)} />
              </div>
              <Button type="button" variant="outline" onClick={() => setReload((value) => value + 1)}>Refresh</Button>
            </div>

            {loading ? <div className="zb-products-grid grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4" role="status">{Array.from({ length: 8 }, (_, index) => <div key={index} className="h-64 animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--zb-colors-surface,#f7f8f7)]" />)}</div> :
              visibleProducts.length === 0 ? <Card padding="lg"><EmptyState icon={<Package size={28} />} heading={search || statusFilter !== "ALL" ? "No matching products" : "Your catalogue starts here"} description={search || statusFilter !== "ALL" ? "Try a different search or status filter." : "Add your first product to build your business catalogue."} /></Card> :
              <div className="zb-products-grid grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => <article key={product.id} className="zb-product-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--zb-colors-surface,#fff)] transition-shadow hover:shadow-md">
                  <div className="zb-product-image relative flex aspect-[4/3] items-center justify-center bg-[var(--zb-colors-background-subtle,#f3f5f3)]">
                    <Package size={38} strokeWidth={1.3} className="opacity-25" />
                    <span className={"absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-semibold " + (product.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-[var(--zb-colors-surface,#fff)] opacity-70")}>{product.status.toLowerCase()}</span>
                    <button type="button" aria-label={"Add " + product.name + " to cart"} title="Add to cart" className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-white shadow-sm transition hover:bg-green-800" onClick={() => setNotice("Cart actions will be available when product pricing and sales workflows are connected.")}><ShoppingCart size={16} /></button>
                  </div>
                  <div className="zb-product-card-body flex flex-1 flex-col gap-2 p-3 sm:p-4">
                    <h2 className="line-clamp-2 text-sm font-semibold sm:text-base">{product.name}</h2>
                    <p className="truncate text-xs opacity-60">{product.sku || product.slug}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <span className="text-sm font-bold">Price not set</span>
                      <span className="text-[10px] opacity-60">{product.product_type.toLowerCase()}</span>
                    </div>
                  </div>
                </article>)}
              </div>}
          </section>
      {!workspaceOpen ? <div className="zb-products-floating-actions"><button type="button" aria-label="AI product assistant" title="AI assistant" className="zb-products-ai-fab" onClick={() => setNotice("AI assistant is a visual entry point; connect the AI product service to enable generation.")}><Bot size={20} /></button><button type="button" aria-label="Add product" title="Add product" className="zb-products-add-fab" onClick={openWorkspace}><Plus size={25} /></button></div> : null}
    </div>
  );
  const productFormContent = (
    <div className="zb-product-form-shell">
          <div className="zb-product-entry-grid grid grid-cols-1 items-start gap-6">
            <form className="zb-product-form flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] p-4 sm:p-6" onSubmit={(event) => void submitProduct(event)}>
              {formError ? <Alert variant="danger" title="Product could not be saved">{formError}</Alert> : null}
              <section className="zb-product-form-section space-y-4">
                <h2 className="text-lg font-semibold">Basic information</h2>
                <Field label="Product name" required><Input autoFocus required maxLength={255} value={form.name} onChange={(event) => setForm((old) => ({ ...old, name: event.target.value, slug: old.slug || slugify(event.target.value) }))} placeholder="e.g. Organic cocoa beans" fullWidth /></Field>
                <Field label="Product slug" required><Input required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={(event) => setForm((old) => ({ ...old, slug: slugify(event.target.value) }))} placeholder="organic-cocoa-beans" fullWidth /></Field>
                <Field label="SKU"><Input maxLength={100} value={form.sku} onChange={(event) => setForm((old) => ({ ...old, sku: event.target.value }))} placeholder="Internal product code" fullWidth /></Field>
                <div className="zb-product-field-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Category"><Select value={form.categoryId} options={[{ value: "", label: "Select category" }, ...categories.map((item) => ({ value: item.id, label: item.name }))]} onChange={(event) => setForm((old) => ({ ...old, categoryId: event.target.value }))} /></Field>
                  <Field label="Unit"><Select value={form.unitId} options={[{ value: "", label: "Select unit" }, ...units.map((item) => ({ value: item.id, label: item.code ? item.name + " (" + item.code + ")" : item.name }))]} onChange={(event) => setForm((old) => ({ ...old, unitId: event.target.value }))} /></Field>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Product type"><Select value={form.productType} options={TYPES} onChange={(event) => setForm((old) => ({ ...old, productType: event.target.value as ProductType }))} /></Field>
                  <Field label="Status"><Select value={form.status} options={STATUSES} onChange={(event) => setForm((old) => ({ ...old, status: event.target.value as ProductStatus }))} /></Field>
                </div>
                <Field label="Description"><Textarea value={form.description} onChange={(event) => setForm((old) => ({ ...old, description: event.target.value }))} placeholder="Product details, specifications and notes…" /></Field>
              </section>
              <div className="zb-product-note rounded-xl bg-[var(--zb-colors-background-subtle,#f3f5f3)] p-4 text-sm">
                <p className="font-semibold">Stock and prices are separate workflows</p>
                <p className="mt-1 opacity-70">Saving a product creates its catalogue record only. Use Purchase Orders and Receive Stock to record buying price, destination and received quantity; pricing is managed through the price service.</p>
              </div>
              <div className="zb-product-form-actions flex flex-col-reverse gap-2 border-t border-[var(--color-border)] pt-4 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" disabled={saving} onClick={closeWorkspace}>Cancel</Button>
                <Button type="submit" loading={saving} disabled={saving}>Save product</Button>
              </div>
            </form>


          </div>
    </div>
  );
  const productPreviewContent = (
    <div className="zb-product-preview-shell">
<aside className="zb-product-preview space-y-4 xl:sticky xl:top-6">
              <Card padding="none">
                <div className="zb-product-preview-image flex aspect-[4/3] items-center justify-center bg-[var(--zb-colors-background-subtle,#f3f5f3)]"><ImagePlus size={52} strokeWidth={1.2} className="opacity-30" /></div>
                <div className="zb-product-preview-body space-y-3 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-green-700">LIVE PREVIEW</p>
                  <h2 className="text-xl font-bold">{form.name.trim() || "Your product name"}</h2>
                  <p className="text-sm opacity-60">{form.sku.trim() || form.slug || "SKU / product slug"}</p>
                  <p className="text-sm">{form.description.trim() || "Your product description will appear here."}</p>
                  <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-sm"><span className="opacity-60">Product type</span><span className="font-medium">{form.productType.toLowerCase()}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="opacity-60">Status</span><span className="font-medium">{form.status.toLowerCase()}</span></div>
                </div>
              </Card>
              <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] p-4"><Bot size={20} className="mt-0.5 text-green-700" /><div><p className="font-semibold">AI product assistant</p><p className="mt-1 text-sm opacity-70">Use AI assistance for descriptions and product setup when that service is connected.</p></div><ArrowUpRight size={16} className="ml-auto opacity-50" /></div>
            </aside>
    </div>
  );
  const createWorkspaceContent = (
    <div className="zb-products-page zb-products-create-workspace flex h-full min-h-0 flex-col gap-4 p-4 sm:p-6">
      <header className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button type="button" variant="outline" disabled={saving} onClick={closeWorkspace}>Back to products</Button>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">PRODUCT CATALOGUE</p>
            <h1 className="text-2xl font-bold tracking-tight">Add product</h1>
          </div>
        </div>
        {!isNarrowShell ? (
          <Button type="button" variant="outline" onClick={() => {
            if (showPreview) {
              shell.closeShell2(() => true);
              setShowPreview(false);
            } else {
              shell.openShell2({ id: "products.preview", title: "Live preview" });
              setShowPreview(true);
            }
          }}>
            {showPreview ? "Hide preview" : "Show preview"}
          </Button>
        ) : null}
      </header>
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="min-w-0">{productFormContent}</div>
      </div>
    </div>
  );

  if (workspaceLoading) return <DashboardLayout><div className="flex min-h-64 items-center justify-center" role="status">Loading product workspace…</div></DashboardLayout>;
  if (!workspace?.id) return <DashboardLayout><Alert variant="danger" title="Workspace unavailable">Complete business setup or refresh the page before managing products.</Alert></DashboardLayout>;

  return (
    <DashboardLayout>
      <Container className="zb-products-container" maxWidth="1600px" padding="0">
        <ContentShellViewport
          className="zb-products-shell-viewport"
          shell1={workspaceOpen ? createWorkspaceContent : catalogueContent}
          renderShell2={(entry) => entry.id === "products.preview" ? productPreviewContent : null}
          renderShell3={() => null}
        />
      </Container>
    </DashboardLayout>
  );
}

function SummaryCard({ label, value, detail, icon }: { label: string; value: string | number; detail: string; icon?: ReactNode }) {
  return <Card className="zb-summary-card" padding="md"><div className="flex items-start justify-between gap-2"><p className="text-xs font-medium opacity-65">{label}</p>{icon ? <span className="text-green-700">{icon}</span> : null}</div><p className="mt-3 text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-xs opacity-60">{detail}</p></Card>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return <label className="zb-product-field flex min-w-0 flex-col gap-2 text-sm font-medium">{label}{required ? <span className="text-green-700">*</span> : null}{children}</label>;
}
