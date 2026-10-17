import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  Package,
  PackagePlus,
  Pencil,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import { Alert, Badge, Button, Card, DataGrid, Drawer, EmptyState, Input, Select, Textarea } from "@/design-system/components";
import type { DataGridColumn } from "@/design-system/components/data-grid";
import { DashboardLayout } from "@/layouts/dashboard";
import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers/workspace-provider";
import {
  ProductService,
  type CreateProductPayload,
  type ProductOption,
  type ProductRecord,
  type ProductStatus,
  type ProductType,
} from "@/products/services/product-service";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "ARCHIVED", label: "Archived" },
];

const TYPE_OPTIONS = [
  { value: "", label: "All product types" },
  { value: "PHYSICAL", label: "Physical product" },
  { value: "SERVICE", label: "Service" },
  { value: "DIGITAL", label: "Digital" },
];

interface ProductFormState {
  name: string;
  slug: string;
  sku: string;
  description: string;
  categoryId: string;
  unitId: string;
  productType: ProductType;
  status: ProductStatus;
}

const EMPTY_FORM: ProductFormState = {
  name: "",
  slug: "",
  sku: "",
  description: "",
  categoryId: "",
  unitId: "",
  productType: "PHYSICAL",
  status: "ACTIVE",
};

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message.trim() ? error.message : fallback;
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-TZ", { dateStyle: "medium" }).format(date);
}

function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const variant =
    status === "ACTIVE" ? "success" : status === "INACTIVE" ? "warning" : "neutral";

  return <Badge variant={variant}>{status.toLowerCase()}</Badge>;
}

export function ProductsPage() {
  const platform = usePlatform();
  const { workspace, loading: workspaceLoading } = useWorkspace();
  const navigate = useNavigate();

  const service = useMemo(() => new ProductService(platform.api), [platform.api]);
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [categories, setCategories] = useState<ProductOption[]>([]);
  const [units, setUnits] = useState<ProductOption[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [status, setStatus] = useState<ProductStatus | "">("");
  const [productType, setProductType] = useState<ProductType | "">("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null);
  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [reloadVersion, setReloadVersion] = useState(0);

  useEffect(() => {
    if (!platform.authentication.ready) return;
    if (!platform.authentication.authenticated) {
      navigate("/login", { replace: true });
    }
  }, [navigate, platform.authentication.authenticated, platform.authentication.ready]);

  useEffect(() => {
    if (workspaceLoading || !workspace?.id) return;
    let active = true;

    void Promise.allSettled([
      service.categories(workspace.id),
      service.units(workspace.id),
    ]).then(([categoryResult, unitResult]) => {
      if (!active) return;
      const failures: string[] = [];

      if (categoryResult.status === "fulfilled") {
        setCategories(categoryResult.value);
      } else {
        failures.push("categories");
      }

      if (unitResult.status === "fulfilled") {
        setUnits(unitResult.value);
      } else {
        failures.push("units");
      }

      setOptionsError(
        failures.length
          ? `Product ${failures.join(" and ")} could not be loaded. You can still create a product without these optional values.`
          : null,
      );
    });

    return () => {
      active = false;
    };
  }, [service, workspace?.id, workspaceLoading]);

  useEffect(() => {
    if (workspaceLoading || !workspace?.id) return;
    let active = true;

    setLoading(true);
    setError(null);

    void service
      .list(workspace.id, {
        page,
        limit: pageSize,
        search: appliedSearch,
        categoryId,
        status,
        productType,
      })
      .then((response) => {
        if (!active) return;
        setProducts(response.data);
        setTotal(response.meta.total);
        setTotalPages(response.meta.totalPages);
      })
      .catch((caught: unknown) => {
        if (active) {
          setProducts([]);
          setError(errorMessage(caught, "Products could not be loaded."));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [
    appliedSearch,
    categoryId,
    page,
    pageSize,
    productType,
    reloadVersion,
    service,
    status,
    workspace?.id,
    workspaceLoading,
  ]);

  const columns: DataGridColumn<ProductRecord>[] = [
      {
        id: "product",
        field: "name",
        header: "Product",
        minWidth: 220,
        render: (_value, row) => (
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{row.name}</span>
            <span className="text-sm opacity-70">{row.slug}</span>
          </div>
        ),
      },
      {
        id: "sku",
        field: "sku",
        header: "SKU",
        minWidth: 110,
        render: (_value, row) => row.sku || "—",
      },
      {
        id: "type",
        field: "product_type",
        header: "Type",
        minWidth: 120,
        render: (_value, row) => row.product_type.toLowerCase(),
      },
      {
        id: "status",
        field: "status",
        header: "Status",
        minWidth: 120,
        render: (_value, row) => <ProductStatusBadge status={row.status} />,
      },
      {
        id: "updated",
        field: "updated_at",
        header: "Last updated",
        minWidth: 140,
        render: (_value, row) => formatDate(row.updated_at),
      },
      {
        id: "actions",
        field: "id",
        header: "Actions",
        minWidth: 150,
        render: (_value, row) => (
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Edit ${row.name}`}
              onClick={() => openEdit(row)}
            >
              <Pencil size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Archive ${row.name}`}
              disabled={row.status === "ARCHIVED"}
              onClick={() => void archiveProduct(row)}
            >
              <Archive size={16} />
            </Button>
          </div>
        ),
      },
  ];

  function openCreate() {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setDrawerOpen(true);
  }

  function openEdit(product: ProductRecord) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      slug: product.slug,
      sku: product.sku ?? "",
      description: product.description ?? "",
      categoryId: product.category_id ?? "",
      unitId: product.unit_id ?? "",
      productType: product.product_type,
      status: product.status,
    });
    setFormError(null);
    setDrawerOpen(true);
  }

  const archiveProduct = useCallback(
    async (product: ProductRecord) => {
      if (!workspace?.id || product.status === "ARCHIVED") return;
      const confirmed = window.confirm(`Archive “${product.name}”? It will no longer appear in the active catalogue.`);
      if (!confirmed) return;

      try {
        await service.updateStatus(workspace.id, product.id, "ARCHIVED");
        setReloadVersion((version) => version + 1);
      } catch (caught) {
        setError(errorMessage(caught, "The product could not be archived."));
      }
    },
    [service, workspace?.id],
  );

  async function submitProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!workspace?.id) return;

    const payload: CreateProductPayload = {
      name: form.name.trim(),
      slug: form.slug.trim().toLowerCase(),
      sku: form.sku.trim() || null,
      description: form.description.trim() || null,
      categoryId: form.categoryId || null,
      unitId: form.unitId || null,
      productType: form.productType,
      status: form.status,
    };

    setSaving(true);
    setFormError(null);

    try {
      if (editingProduct) {
        await service.update(workspace.id, editingProduct.id, payload);
      } else {
        await service.create(workspace.id, payload);
      }

      setDrawerOpen(false);
      setEditingProduct(null);
      setForm(EMPTY_FORM);
      setReloadVersion((version) => version + 1);
    } catch (caught) {
      setFormError(errorMessage(caught, "The product could not be saved."));
    } finally {
      setSaving(false);
    }
  }

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "All categories" },
      ...categories.map((category) => ({ value: category.id, label: category.name })),
    ],
    [categories],
  );

  if (!platform.authentication.ready || workspaceLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-64 items-center justify-center" role="status">
          Loading product workspace…
        </div>
      </DashboardLayout>
    );
  }

  if (!workspace?.id) {
    return (
      <DashboardLayout>
        <Alert variant="danger" title="Workspace unavailable">
          Your business workspace could not be resolved. Refresh the page or complete business setup before managing products.
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main className="flex flex-col gap-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">Catalogue</p>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="opacity-70">Manage your workspace catalogue, product types and active status.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" leftIcon={<RefreshCw size={16} />} onClick={() => setReloadVersion((version) => version + 1)}>
              Refresh
            </Button>
            <Button type="button" leftIcon={<Plus size={16} />} onClick={openCreate}>
              Add product
            </Button>
          </div>
        </header>

        {error ? (
          <Alert variant="danger" title="Products could not be loaded">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span>{error}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => setReloadVersion((version) => version + 1)}>
                Try again
              </Button>
            </div>
          </Alert>
        ) : null}

        {optionsError ? <Alert variant="warning" title="Some product options are unavailable">{optionsError}</Alert> : null}

        <Card padding="lg">
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setPage(1);
              setAppliedSearch(search.trim());
            }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="min-w-64 flex-1">
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, slug or SKU"
                  aria-label="Search products"
                  fullWidth
                />
              </div>
              <Button type="submit" variant="outline" leftIcon={<Search size={16} />}>Search</Button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Select
                aria-label="Filter by category"
                value={categoryId}
                options={categoryOptions}
                onChange={(event) => {
                  setCategoryId(event.target.value);
                  setPage(1);
                }}
              />
              <Select
                aria-label="Filter by status"
                value={status}
                options={STATUS_OPTIONS}
                onChange={(event) => {
                  setStatus(event.target.value as ProductStatus | "");
                  setPage(1);
                }}
              />
              <Select
                aria-label="Filter by product type"
                value={productType}
                options={TYPE_OPTIONS}
                onChange={(event) => {
                  setProductType(event.target.value as ProductType | "");
                  setPage(1);
                }}
              />
            </div>
            <p className="text-sm opacity-70">{loading ? "Loading catalogue…" : `${total} product${total === 1 ? "" : "s"} found`}</p>
          </form>
        </Card>

        <Card padding="none">
          {products.length === 0 && !loading && !error ? (
            <EmptyState
              icon={<Package size={28} />}
              heading={appliedSearch || categoryId || status || productType ? "No matching products" : "No products yet"}
              description={appliedSearch || categoryId || status || productType ? "Try changing the search or filters." : "Add your first product to start building the catalogue for this workspace."}
              action={
                <Button type="button" leftIcon={<PackagePlus size={16} />} onClick={openCreate}>
                  Add product
                </Button>
              }
            />
          ) : (
            <DataGrid<ProductRecord>
              columns={columns}
              data={products}
              loading={loading}
              rowKey="id"
              hoverable
            />
          )}
        </Card>

        <footer className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm opacity-70">
            {total === 0 ? "No records" : `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}`}
          </span>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}>
              Previous
            </Button>
            <span className="text-sm">{page} / {Math.max(1, totalPages)}</span>
            <Button type="button" variant="outline" size="sm" disabled={loading || page >= totalPages} onClick={() => setPage((value) => value + 1)}>
              Next
            </Button>
          </div>
        </footer>

        <Drawer
          open={drawerOpen}
          onClose={() => {
            if (!saving) setDrawerOpen(false);
          }}
          heading={editingProduct ? "Edit product" : "Add product"}
          placement="right"
          size="lg"
        >
          <form className="flex flex-col gap-5" onSubmit={(event) => void submitProduct(event)}>
            {formError ? <Alert variant="danger" title="Could not save product">{formError}</Alert> : null}
            <div className="flex flex-col gap-2">
              <label htmlFor="product-name" className="font-medium">Product name</label>
              <Input id="product-name" required minLength={1} maxLength={255} value={form.name} onChange={(event) => setForm((value) => ({ ...value, name: event.target.value }))} fullWidth />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="product-slug" className="font-medium">Slug</label>
              <Input id="product-slug" required minLength={1} maxLength={255} pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={(event) => setForm((value) => ({ ...value, slug: event.target.value.toLowerCase() }))} fullWidth />
              <p className="text-sm opacity-70">Use lowercase letters, numbers and hyphens.</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="product-sku" className="font-medium">SKU <span className="opacity-70">(optional)</span></label>
              <Input id="product-sku" maxLength={100} value={form.sku} onChange={(event) => setForm((value) => ({ ...value, sku: event.target.value }))} fullWidth />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="product-category" className="font-medium">Category <span className="opacity-70">(optional)</span></label>
                <Select id="product-category" value={form.categoryId} options={[{ value: "", label: "No category" }, ...categories.map((category) => ({ value: category.id, label: category.name }))]} onChange={(event) => setForm((value) => ({ ...value, categoryId: event.target.value }))} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="product-unit" className="font-medium">Unit <span className="opacity-70">(optional)</span></label>
                <Select id="product-unit" value={form.unitId} options={[{ value: "", label: "No unit" }, ...units.map((unit) => ({ value: unit.id, label: unit.code ? `${unit.name} (${unit.code})` : unit.name }))]} onChange={(event) => setForm((value) => ({ ...value, unitId: event.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="product-type" className="font-medium">Product type</label>
                <Select id="product-type" value={form.productType} options={TYPE_OPTIONS.filter((option) => option.value !== "").map((option) => ({ ...option, value: option.value }))} onChange={(event) => setForm((value) => ({ ...value, productType: event.target.value as ProductType }))} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="product-status" className="font-medium">Status</label>
                <Select id="product-status" value={form.status} options={STATUS_OPTIONS.filter((option) => option.value !== "").map((option) => ({ ...option, value: option.value }))} onChange={(event) => setForm((value) => ({ ...value, status: event.target.value as ProductStatus }))} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="product-description" className="font-medium">Description <span className="opacity-70">(optional)</span></label>
              <Textarea id="product-description" value={form.description} onChange={(event) => setForm((value) => ({ ...value, description: event.target.value }))} />
            </div>
            <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--color-border)] pt-4">
              <Button type="button" variant="outline" disabled={saving} onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button type="submit" loading={saving} disabled={saving}>{editingProduct ? "Save changes" : "Create product"}</Button>
            </div>
          </form>
        </Drawer>
      </main>
    </DashboardLayout>
  );
}
