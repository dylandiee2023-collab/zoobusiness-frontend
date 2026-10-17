import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, BadgePercent, Boxes, CalendarDays, Check, ImagePlus, Package, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Alert, Badge, Button, Card, Input, Select, Textarea } from "@/design-system/components";
import { DashboardLayout } from "@/layouts/dashboard";
import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers/workspace-provider";
import { ProductService, type ProductOption, type ProductRecord, type ProductType } from "@/products/services/product-service";

type Row<T> = { data: T[]; meta?: { total?: number; totalPages?: number } } | T[];
type PriceList = { id: string; name: string; code: string; currency: string; is_default?: boolean; isDefault?: boolean; status: string };
type WarehouseOption = { id: string; name: string; code?: string; status?: string };
type ShopOption = { id: string; name: string; code?: string; status?: string };
type AttributeOption = { id: string; name: string; code: string; status?: string };
type AttributeValueOption = { id: string; value: string; display_name?: string; displayName?: string; status?: string };
type VariantDraft = { key: string; name: string; sku: string; barcode: string; description: string; attributes: string };
type PurchaseStatus = "DRAFT" | "CONFIRMED" | "RECEIVED" | "CANCELLED";
type DestinationType = "WAREHOUSE" | "SHOP";

const selectOptions = {
  type: [
    { value: "PHYSICAL", label: "Physical product" },
    { value: "SERVICE", label: "Service" },
    { value: "DIGITAL", label: "Digital product" },
  ],
  status: [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ],
  purchaseStatus: [
    { value: "DRAFT", label: "Draft" },
    { value: "CONFIRMED", label: "Confirmed" },
    { value: "RECEIVED", label: "Received" },
    { value: "CANCELLED", label: "Cancelled" },
  ],
  paymentStatus: [
    { value: "UNPAID", label: "Unpaid" },
    { value: "PARTIAL", label: "Partially paid" },
    { value: "PAID", label: "Paid" },
  ],
  offerType: [
    { value: "PERCENT_DISCOUNT", label: "Percentage discount" },
    { value: "AMOUNT_DISCOUNT", label: "Fixed amount discount" },
    { value: "FIXED_PRICE", label: "Fixed offer price" },
  ],
};

function rowsOf<T>(value: Row<T> | undefined | null): T[] {
  if (Array.isArray(value)) return value;
  return value && Array.isArray(value.data) ? value.data : [];
}

function messageOf(error: unknown): string {
  return error instanceof Error && error.message ? error.message : "The request could not be completed.";
}

function slugify(value: string): string {
  return value.trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function codeify(value: string): string {
  return slugify(value).replace(/-/g, "_").toUpperCase().slice(0, 48);
}

function parseAttributes(value: string): Array<{ name: string; value: string }> {
  return value.split(";").map((pair) => pair.trim()).filter(Boolean).map((pair) => {
    const splitAt = pair.indexOf("=");
    return splitAt < 0 ? { name: "", value: "" } : { name: pair.slice(0, splitAt).trim(), value: pair.slice(splitAt + 1).trim() };
  }).filter((pair) => pair.name && pair.value);
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className="flex min-w-0 flex-col gap-2"><span className="text-sm font-semibold">{label}</span>{children}{hint ? <span className="text-xs opacity-65">{hint}</span> : null}</label>;
}

export function ProductCreatePage() {
  const platform = usePlatform();
  const { workspace, loading: workspaceLoading } = useWorkspace();
  const navigate = useNavigate();
  const service = useMemo(() => new ProductService(platform.api), [platform.api]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [productType, setProductType] = useState<ProductType>("PHYSICAL");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [currency, setCurrency] = useState("TZS");
  const [variants, setVariants] = useState<VariantDraft[]>([]);
  const [offerEnabled, setOfferEnabled] = useState(false);
  const [offerName, setOfferName] = useState("");
  const [offerCode, setOfferCode] = useState("");
  const [offerType, setOfferType] = useState("PERCENT_DISCOUNT");
  const [offerValue, setOfferValue] = useState("");
  const [offerFrom, setOfferFrom] = useState("");
  const [offerUntil, setOfferUntil] = useState("");
  const [receiveOpeningStock, setReceiveOpeningStock] = useState(false);
  const [stockQuantity, setStockQuantity] = useState("1");
  const [destinationType, setDestinationType] = useState<DestinationType>("WAREHOUSE");
  const [destinationId, setDestinationId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10));
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>("DRAFT");
  const [paymentStatus, setPaymentStatus] = useState("UNPAID");
  const [notes, setNotes] = useState("");
  const [categories, setCategories] = useState<ProductOption[]>([]);
  const [units, setUnits] = useState<ProductOption[]>([]);
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);
  const [shops, setShops] = useState<ShopOption[]>([]);
  const [attributes, setAttributes] = useState<AttributeOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [createdProduct, setCreatedProduct] = useState<ProductRecord | null>(null);

  useEffect(() => {
    if (!workspace?.id || !platform.authentication.ready) return;
    let alive = true;
    setLoadingOptions(true);
    const base = `/api/workspaces/${encodeURIComponent(workspace.id)}`;
    Promise.all([
      service.categories(workspace.id).catch(() => [] as ProductOption[]),
      service.units(workspace.id).catch(() => [] as ProductOption[]),
      platform.api.get<Row<PriceList>>(`${base}/price-lists?page=1&limit=100&status=ACTIVE`).catch(() => [] as PriceList[]),
      platform.api.get<Row<WarehouseOption>>(`${base}/warehouses`).catch(() => [] as WarehouseOption[]),
      platform.api.get<Row<ShopOption>>(`${base}/shops`).catch(() => [] as ShopOption[]),
      platform.api.get<Row<AttributeOption>>(`${base}/attributes?page=1&limit=100&status=ACTIVE`).catch(() => [] as AttributeOption[]),
    ]).then(([categoryRows, unitRows, priceRows, warehouseRows, shopRows, attributeRows]) => {
      if (!alive) return;
      setCategories(categoryRows);
      setUnits(unitRows);
      setPriceLists(rowsOf(priceRows));
      setWarehouses(rowsOf(warehouseRows).filter((item) => item.status !== "INACTIVE"));
      setShops(rowsOf(shopRows).filter((item) => item.status !== "INACTIVE"));
      setAttributes(rowsOf(attributeRows).filter((item) => item.status !== "INACTIVE"));
    }).finally(() => { if (alive) setLoadingOptions(false); });
    return () => { alive = false; };
  }, [platform.api, platform.authentication.ready, service, workspace?.id]);

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(name));
  }, [name, slugEdited]);

  useEffect(() => {
    const options = destinationType === "WAREHOUSE" ? warehouses : shops;
    if (!options.some((option) => option.id === destinationId)) setDestinationId(options[0]?.id ?? "");
  }, [destinationId, destinationType, warehouses, shops]);

  const destinationOptions = (destinationType === "WAREHOUSE" ? warehouses : shops).map((item) => ({ value: item.id, label: item.code ? `${item.name} · ${item.code}` : item.name }));
  const categoryOptions = [{ value: "", label: "No category" }, ...categories.map((item) => ({ value: item.id, label: item.name }))];
  const unitOptions = [{ value: "", label: "No unit" }, ...units.map((item) => ({ value: item.id, label: item.code ? `${item.name} · ${item.code}` : item.name }))];

  function updateVariant(key: string, patch: Partial<VariantDraft>) {
    setVariants((current) => current.map((item) => item.key === key ? { ...item, ...patch } : item));
  }

  function addVariant() {
    setVariants((current) => [...current, { key: `variant-${Date.now()}-${current.length}`, name: "", sku: "", barcode: "", description: "", attributes: "" }]);
  }

  async function ensurePriceList(): Promise<string> {
    const current = priceLists.find((item) => item.status === "ACTIVE" && (item.is_default || item.isDefault)) ?? priceLists.find((item) => item.status === "ACTIVE" && item.currency === currency);
    if (current) return current.id;
    const created = await platform.api.post<PriceList>(`/api/workspaces/${encodeURIComponent(workspace!.id)}/price-lists`, {
      name: "Standard prices",
      code: `STANDARD_${currency}`,
      description: "Default buying and selling prices",
      currency,
      isDefault: priceLists.length === 0,
      status: "ACTIVE",
    });
    setPriceLists((current) => [...current, created]);
    return created.id;
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!workspace?.id) return;
    if (!name.trim() || !slug.trim()) { setError("Product name and URL slug are required."); return; }
    if ((buyingPrice.trim() && Number(buyingPrice) < 0) || (sellingPrice.trim() && Number(sellingPrice) < 0)) { setError("Prices cannot be negative."); return; }
    if ((buyingPrice.trim() && !Number.isFinite(Number(buyingPrice))) || (sellingPrice.trim() && !Number.isFinite(Number(sellingPrice)))) { setError("Enter valid numeric prices."); return; }
    if (receiveOpeningStock && (!destinationId || !Number.isFinite(Number(stockQuantity)) || Number(stockQuantity) <= 0 || !purchaseDate || !buyingPrice.trim() || !sellingPrice.trim())) { setError("Choose a destination, purchase date and a stock quantity greater than zero."); return; }
    if (offerEnabled && (!offerName.trim() || !offerCode.trim() || !offerValue.trim() || Number(offerValue) < 0)) { setError("Complete the offer name, code and valid discount/price value."); return; }

    setSaving(true);
    setError(null);
    setWarning(null);
    const base = `/api/workspaces/${encodeURIComponent(workspace.id)}`;
    const completed: string[] = [];
    let productWasCreated = Boolean(createdProduct);
    try {
      let product = createdProduct;
      if (!product) {
        product = await service.create(workspace.id, {
          name: name.trim(),
          slug: slugify(slug),
          sku: sku.trim() || null,
          description: description.trim() || null,
          categoryId: categoryId || null,
          unitId: unitId || null,
          productType,
          status,
        });
        setCreatedProduct(product);
        productWasCreated = true;
        completed.push("product");
      }

      const priceListId = await ensurePriceList();
      const prices = await platform.api.get<Row<{ id: string; product_id?: string; price_type: string; status: string }>>(`${base}/prices?page=1&limit=100&productId=${encodeURIComponent(product.id)}`).catch(() => [] as { id: string; product_id?: string; price_type: string; status: string }[]);
      const existingPrices = rowsOf(prices);
      if (buyingPrice.trim() && !existingPrices.some((item) => item.price_type === "BUYING" && item.status === "ACTIVE")) {
        await platform.api.post(`${base}/prices`, { priceListId, productId: product.id, priceType: "BUYING", amount: Number(buyingPrice), minQuantity: 1, currency, status: "ACTIVE" });
        completed.push("buying price");
      }
      if (sellingPrice.trim() && !existingPrices.some((item) => item.price_type === "SELLING" && item.status === "ACTIVE")) {
        await platform.api.post(`${base}/prices`, { priceListId, productId: product.id, priceType: "SELLING", amount: Number(sellingPrice), minQuantity: 1, currency, status: "ACTIVE" });
        completed.push("selling price");
      }

      const existingVariants = await platform.api.get<Row<{ id: string; name: string }>>(`${base}/products/${encodeURIComponent(product.id)}/variants?page=1&limit=100`).catch(() => [] as { id: string; name: string }[]);
      const knownVariants = rowsOf(existingVariants);
      const attributeCache = [...attributes];
      for (const variant of variants.filter((item) => item.name.trim())) {
        let savedVariant = knownVariants.find((item) => item.name.toLowerCase() === variant.name.trim().toLowerCase());
        if (!savedVariant) {
          savedVariant = await platform.api.post<{ id: string; name: string }>(`${base}/products/${encodeURIComponent(product.id)}/variants`, {
            name: variant.name.trim(),
            sku: variant.sku.trim() || undefined,
            barcode: variant.barcode.trim() || undefined,
            description: variant.description.trim() || undefined,
            status: "ACTIVE",
          });
          knownVariants.push(savedVariant);
          completed.push(`variant ${variant.name.trim()}`);
        }
        const assignments = await platform.api.get<Row<{ attribute_id?: string; attributeId?: string; attribute_value_id?: string; attributeValueId?: string }>>(`${base}/products/${encodeURIComponent(product.id)}/variants/${encodeURIComponent(savedVariant.id)}/attributes`).catch(() => [] as { attribute_id?: string; attributeId?: string; attribute_value_id?: string; attributeValueId?: string }[]);
        const existingAssignments = rowsOf(assignments);
        for (const pair of parseAttributes(variant.attributes)) {
          let attribute = attributeCache.find((item) => item.name.toLowerCase() === pair.name.toLowerCase() || item.code.toLowerCase() === codeify(pair.name).toLowerCase());
          if (!attribute) {
            attribute = await platform.api.post<AttributeOption>(`${base}/attributes`, { name: pair.name, code: codeify(pair.name), attributeType: "SELECT", isRequired: false, status: "ACTIVE" });
            attributeCache.push(attribute);
            setAttributes((current) => current.some((item) => item.id === attribute!.id) ? current : [...current, attribute!]);
          }
          const values = await platform.api.get<Row<AttributeValueOption>>(`${base}/attributes/${encodeURIComponent(attribute.id)}/values?page=1&limit=100&status=ACTIVE`).catch(() => [] as AttributeValueOption[]);
          let value = rowsOf(values).find((item) => item.value.toLowerCase() === pair.value.toLowerCase());
          if (!value) value = await platform.api.post<AttributeValueOption>(`${base}/attributes/${encodeURIComponent(attribute.id)}/values`, { value: pair.value, displayName: pair.value, status: "ACTIVE" });
          const alreadyAssigned = existingAssignments.some((item) => (item.attribute_value_id ?? item.attributeValueId) === value!.id);
          if (!alreadyAssigned) {
            await platform.api.post(`${base}/products/${encodeURIComponent(product.id)}/variants/${encodeURIComponent(savedVariant.id)}/attributes`, { attributeId: attribute.id, attributeValueId: value.id });
            existingAssignments.push({ attribute_id: attribute.id, attribute_value_id: value.id });
          }
        }
      }
      setAttributes(attributeCache);

      if (offerEnabled && !completed.includes("offer")) {
        const existingOffers = await platform.api.get<Row<{ id: string; code: string }>>(`${base}/offers?page=1&limit=100&productId=${encodeURIComponent(product.id)}&status=ACTIVE`).catch(() => [] as { id: string; code: string }[]);
        if (!rowsOf(existingOffers).some((item) => item.code.toLowerCase() === offerCode.trim().toLowerCase())) {
          const isFixedPrice = offerType === "FIXED_PRICE";
          await platform.api.post(`${base}/offers`, {
            productId: product.id,
            name: offerName.trim(),
            code: offerCode.trim().toUpperCase(),
            offerType,
            price: isFixedPrice ? Number(offerValue) : null,
            discountType: offerType === "PERCENT_DISCOUNT" ? "PERCENT" : offerType === "AMOUNT_DISCOUNT" ? "AMOUNT" : null,
            discountValue: offerType === "FIXED_PRICE" ? null : Number(offerValue),
            currency,
            status: "ACTIVE",
            validFrom: offerFrom || null,
            validUntil: offerUntil || null,
          });
          completed.push("offer");
        }
      }

      if (receiveOpeningStock) {
        if (!buyingPrice.trim() || !sellingPrice.trim()) throw new Error("Enter both buying and selling prices before recording opening stock.");
        const existingPurchases = await platform.api.get<Row<{ id: string; notes?: string; status: string }>>(`${base}/purchases?page=1&limit=100&from=${encodeURIComponent(purchaseDate)}&to=${encodeURIComponent(purchaseDate)}`).catch(() => [] as { id: string; notes?: string; status: string }[]);
        const existingOpening = rowsOf(existingPurchases).find((item) => item.notes?.startsWith(`Product setup: ${product!.id}`));
        const purchase = existingOpening ?? await platform.api.post<{ id: string; status?: string }>(`${base}/purchases`, {
          orderDate: purchaseDate,
          destinationType,
          ...(destinationType === "WAREHOUSE" ? { destinationWarehouseId: destinationId } : { destinationShopId: destinationId }),
          currency,
          notes: `Product setup: ${product.id}${notes.trim() ? ` — ${notes.trim()}` : ""}`,
          paymentStatus,
          items: [{ productId: product.id, quantity: Number(stockQuantity), buyingPrice: Number(buyingPrice), sellingPrice: Number(sellingPrice) }],
        });
        if (!existingOpening) completed.push("opening purchase");
        const currentStatus = purchase.status ?? "DRAFT";
        if (purchaseStatus === "CONFIRMED" && currentStatus === "DRAFT") await platform.api.post(`${base}/purchases/${encodeURIComponent(purchase.id)}/confirm`, {});
        if (purchaseStatus === "RECEIVED") {
          if (currentStatus === "DRAFT") await platform.api.post(`${base}/purchases/${encodeURIComponent(purchase.id)}/confirm`, {});
          if (currentStatus !== "RECEIVED") await platform.api.post(`${base}/purchases/${encodeURIComponent(purchase.id)}/receive`, { receivedDate: purchaseDate });
        }
        if (purchaseStatus === "CANCELLED" && currentStatus === "DRAFT") await platform.api.post(`${base}/purchases/${encodeURIComponent(purchase.id)}/cancel`, {});
      }

      if (completed.length) setWarning(`Saved: ${completed.join(", ")}.`);
      navigate("/products", { state: { createdProductId: product.id } });
    } catch (caught) {
      const partial = productWasCreated ? "The product record already exists. Correct the issue and submit again to continue configuring it without creating another product. " : "";
      setError(partial + messageOf(caught));
    } finally {
      setSaving(false);
    }
  }

  if (!platform.authentication.ready || workspaceLoading) {
    return <DashboardLayout><div className="flex min-h-64 items-center justify-center" role="status">Loading product workspace…</div></DashboardLayout>;
  }
  if (!workspace?.id) {
    return <DashboardLayout><Alert variant="danger" title="Workspace unavailable">Complete business setup before creating products.</Alert></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Button type="button" variant="outline" size="sm" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate("/products")}>Back</Button>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-green-600">Catalogue workspace</p>
              <h1 className="text-2xl font-bold sm:text-3xl">{createdProduct ? "Continue product setup" : "Add product"}</h1>
              <p className="mt-1 text-sm opacity-70">Product details, pricing, variants and optional opening stock in one workspace.</p>
            </div>
          </div>
          <Badge variant={createdProduct ? "success" : "neutral"}>{createdProduct ? "Product created · setup pending" : "New product"}</Badge>
        </header>

        {error ? <Alert variant="danger" title="Could not complete product setup">{error}</Alert> : null}
        {warning ? <Alert variant="success" title="Product setup updated">{warning}</Alert> : null}
        {loadingOptions ? <p className="text-sm opacity-65" role="status">Loading categories, units and locations…</p> : null}

        <form className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]" onSubmit={(event) => void saveProduct(event)}>
          <div className="flex min-w-0 flex-col gap-5">
            <Card padding="lg">
              <div className="mb-5 flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-green-500/10 text-green-600"><Package size={21} /></span>
                <div><h2 className="text-lg font-bold">Product information</h2><p className="text-sm opacity-65">Identity and catalogue details.</p></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Product name"><Input required maxLength={255} value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Premium maize flour" fullWidth /></Field>
                <Field label="SKU" hint="Must be unique within this workspace."><Input value={sku} onChange={(event) => setSku(event.target.value)} maxLength={100} placeholder="e.g. MAIZE-001" fullWidth /></Field>
                <Field label="URL slug"><Input required value={slug} onChange={(event) => { setSlug(event.target.value); setSlugEdited(true); }} onBlur={() => setSlug(slugify(slug))} placeholder="premium-maize-flour" fullWidth /></Field>
                <Field label="Product type"><Select value={productType} options={selectOptions.type} onChange={(event) => setProductType(event.target.value as ProductType)} /></Field>
                <Field label="Category"><Select value={categoryId} options={categoryOptions} onChange={(event) => setCategoryId(event.target.value)} /></Field>
                <Field label="Unit of measure"><Select value={unitId} options={unitOptions} onChange={(event) => setUnitId(event.target.value)} /></Field>
                <Field label="Catalogue status"><Select value={status} options={selectOptions.status} onChange={(event) => setStatus(event.target.value as "ACTIVE" | "INACTIVE")} /></Field>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--zb-colors-border)] p-3">
                  <ImagePlus size={24} className="shrink-0 opacity-60" />
                  <div><p className="text-sm font-semibold">Product image</p><p className="text-xs opacity-65">Image storage is not exposed by the current product API yet; this is intentionally not faked as a saved upload.</p></div>
                </div>
                <div className="sm:col-span-2"><Field label="Description"><Textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Product details, packaging, ingredients or usage notes…" /></Field></div>
              </div>
            </Card>

            <Card padding="lg">
              <div className="mb-5 flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-600"><BadgePercent size={21} /></span>
                <div><h2 className="text-lg font-bold">Buying and selling prices</h2><p className="text-sm opacity-65">Prices are saved to the workspace price list, separately from purchase receiving.</p></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Buying price (TZS)"><Input type="number" min="0" step="0.01" value={buyingPrice} onChange={(event) => setBuyingPrice(event.target.value)} placeholder="0.00" fullWidth /></Field>
                <Field label="Selling price (TZS)"><Input type="number" min="0" step="0.01" value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="0.00" fullWidth /></Field>
                <Field label="Currency"><Select value={currency} options={[{ value: "TZS", label: "TZS · Tanzanian shilling" }, { value: "USD", label: "USD · US dollar" }]} onChange={(event) => setCurrency(event.target.value)} /></Field>
              </div>
              {buyingPrice && sellingPrice && Number(sellingPrice) >= Number(buyingPrice) ? <p className="mt-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-700">Gross margin estimate: {Number(sellingPrice) - Number(buyingPrice)} {currency} per unit, before other costs.</p> : null}
            </Card>

            <Card padding="lg">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-600"><Boxes size={21} /></span><div><h2 className="text-lg font-bold">Variants and attributes</h2><p className="text-sm opacity-65">Use one variant per sellable option, such as 1 kg, 5 kg, red or large.</p></div></div>
                <Button type="button" variant="outline" size="sm" leftIcon={<Plus size={15} />} onClick={addVariant}>Add variant</Button>
              </div>
              {variants.length === 0 ? <div className="rounded-xl border border-dashed border-[var(--zb-colors-border)] p-5 text-sm opacity-70">No variants added. Create variants only when the product has distinct options.</div> : <div className="flex flex-col gap-4">
                {variants.map((variant, index) => <section key={variant.key} className="rounded-xl border border-[var(--zb-colors-border)] p-4">
                  <div className="mb-4 flex items-center justify-between gap-2"><h3 className="font-semibold">Variant {index + 1}</h3><Button type="button" variant="ghost" size="sm" aria-label={`Remove variant ${index + 1}`} onClick={() => setVariants((current) => current.filter((item) => item.key !== variant.key))}><Trash2 size={16} /></Button></div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Variant name"><Input required value={variant.name} onChange={(event) => updateVariant(variant.key, { name: event.target.value })} placeholder="e.g. 5 kg bag" fullWidth /></Field>
                    <Field label="Variant SKU"><Input value={variant.sku} onChange={(event) => updateVariant(variant.key, { sku: event.target.value })} fullWidth /></Field>
                    <Field label="Barcode"><Input value={variant.barcode} onChange={(event) => updateVariant(variant.key, { barcode: event.target.value })} fullWidth /></Field>
                    <Field label="Attributes" hint="Format: Size=5 kg; Colour=Blue"><Input value={variant.attributes} onChange={(event) => updateVariant(variant.key, { attributes: event.target.value })} placeholder="Size=5 kg; Colour=Blue" fullWidth /></Field>
                    <div className="sm:col-span-2"><Field label="Variant description"><Input value={variant.description} onChange={(event) => updateVariant(variant.key, { description: event.target.value })} fullWidth /></Field></div>
                  </div>
                </section>)}
              </div>}
            </Card>

            <Card padding="lg">
              <div className="mb-4 flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600"><BadgePercent size={21} /></span><div><h2 className="text-lg font-bold">Offer (optional)</h2><p className="text-sm opacity-65">Add a product-level promotion now or manage offers later.</p></div></div>
              <label className="mb-4 flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={offerEnabled} onChange={(event) => setOfferEnabled(event.target.checked)} /> Add an offer for this product</label>
              {offerEnabled ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Offer name"><Input required value={offerName} onChange={(event) => setOfferName(event.target.value)} placeholder="Weekend discount" fullWidth /></Field>
                <Field label="Offer code"><Input required value={offerCode} onChange={(event) => setOfferCode(event.target.value.toUpperCase())} placeholder="WEEKEND10" fullWidth /></Field>
                <Field label="Offer type"><Select value={offerType} options={selectOptions.offerType} onChange={(event) => setOfferType(event.target.value)} /></Field>
                <Field label={offerType === "FIXED_PRICE" ? "Offer price" : offerType === "PERCENT_DISCOUNT" ? "Discount (%)" : "Discount amount"}><Input required type="number" min="0" step="0.01" value={offerValue} onChange={(event) => setOfferValue(event.target.value)} fullWidth /></Field>
                <Field label="Valid from"><Input type="date" value={offerFrom} onChange={(event) => setOfferFrom(event.target.value)} fullWidth /></Field>
                <Field label="Valid until"><Input type="date" value={offerUntil} onChange={(event) => setOfferUntil(event.target.value)} min={offerFrom || undefined} fullWidth /></Field>
              </div> : null}
            </Card>

            <Card padding="lg">
              <div className="mb-4 flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-orange-600"><CalendarDays size={21} /></span><div><h2 className="text-lg font-bold">Opening purchase and stock (optional)</h2><p className="text-sm opacity-65">This creates a purchase order. Stock changes only when the order is received.</p></div></div>
              <label className="mb-4 flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={receiveOpeningStock} onChange={(event) => setReceiveOpeningStock(event.target.checked)} /> Record an opening purchase for this product</label>
              {receiveOpeningStock ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Purchase date"><Input type="date" required value={purchaseDate} onChange={(event) => setPurchaseDate(event.target.value)} fullWidth /></Field>
                <Field label="Quantity purchased"><Input type="number" required min="0.000001" step="any" value={stockQuantity} onChange={(event) => setStockQuantity(event.target.value)} fullWidth /></Field>
                <Field label="Destination type"><Select value={destinationType} options={[{ value: "WAREHOUSE", label: "Warehouse" }, { value: "SHOP", label: "Shop" }]} onChange={(event) => setDestinationType(event.target.value as DestinationType)} /></Field>
                <Field label={destinationType === "WAREHOUSE" ? "Warehouse" : "Shop"}>{destinationOptions.length ? <Select required value={destinationId} options={destinationOptions} onChange={(event) => setDestinationId(event.target.value)} /> : <span className="rounded-lg border border-amber-500/40 p-3 text-sm">No active {destinationType.toLowerCase()} found. Set up a location first.</span>}</Field>
                <Field label="Purchase workflow status"><Select value={purchaseStatus} options={selectOptions.purchaseStatus} onChange={(event) => setPurchaseStatus(event.target.value as PurchaseStatus)} /></Field>
                <Field label="Payment status"><Select value={paymentStatus} options={selectOptions.paymentStatus} onChange={(event) => setPaymentStatus(event.target.value)} /></Field>
                <div className="sm:col-span-2"><Field label="Purchase notes"><Textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Supplier, receipt reference or other notes…" /></Field></div>
                {purchaseStatus === "RECEIVED" ? <p className="sm:col-span-2 rounded-lg bg-amber-500/10 p-3 text-sm">Selecting Received confirms the purchase and records stock as received at the chosen location.</p> : null}
              </div> : null}
            </Card>
          </div>

          <aside className="flex min-w-0 flex-col gap-5 xl:sticky xl:top-24">
            <Card padding="lg">
              <p className="text-xs font-bold uppercase tracking-[.15em] text-green-600">Live preview</p>
              <div className="mt-4 grid aspect-[16/9] place-items-center rounded-2xl border border-dashed border-[var(--zb-colors-border)] bg-[var(--zb-colors-surfaceSecondary)]"><ImagePlus size={38} className="opacity-40" /></div>
              <h2 className="mt-4 text-xl font-bold">{name.trim() || "Product name"}</h2>
              <p className="mt-1 break-all text-sm opacity-65">{sku.trim() || "SKU not assigned"} · {productType.toLowerCase()}</p>
              <div className="mt-4 flex items-baseline justify-between gap-3"><span className="text-sm opacity-65">Selling price</span><strong className="text-xl">{sellingPrice ? `${Number(sellingPrice).toLocaleString("en-TZ")} ${currency}` : "—"}</strong></div>
              <div className="mt-2 flex items-baseline justify-between gap-3"><span className="text-sm opacity-65">Buying price</span><strong>{buyingPrice ? `${Number(buyingPrice).toLocaleString("en-TZ")} ${currency}` : "—"}</strong></div>
              <div className="mt-4 flex flex-wrap gap-2"><Badge variant={status === "ACTIVE" ? "success" : "warning"}>{status.toLowerCase()}</Badge>{variants.length ? <Badge variant="neutral">{variants.length} variant{variants.length === 1 ? "" : "s"}</Badge> : null}{offerEnabled ? <Badge variant="warning">Offer</Badge> : null}</div>
              {description.trim() ? <p className="mt-4 line-clamp-4 text-sm opacity-75">{description}</p> : null}
            </Card>
            <Card padding="lg">
              <h2 className="font-bold">Before creating</h2>
              <ul className="mt-3 flex flex-col gap-3 text-sm">
                <li className="flex items-start gap-2"><Check size={17} className="mt-0.5 shrink-0 text-green-600" /><span>Product identity is saved first.</span></li>
                <li className="flex items-start gap-2"><Check size={17} className="mt-0.5 shrink-0 text-green-600" /><span>Prices, variants, attributes and offer are separate AutoBots records.</span></li>
                <li className="flex items-start gap-2"><Check size={17} className="mt-0.5 shrink-0 text-green-600" /><span>Opening stock is handled through the purchase workflow, not directly added to inventory.</span></li>
              </ul>
            </Card>
            <div className="flex flex-col gap-2 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-4 shadow-sm">
              <Button type="submit" loading={saving} disabled={saving || loadingOptions || !name.trim() || !slug.trim() || (receiveOpeningStock && !destinationId)} leftIcon={<Check size={17} />}>{saving ? "Creating product…" : createdProduct ? "Continue setup" : "Create product"}</Button>
              <Button type="button" variant="outline" disabled={saving} onClick={() => navigate("/products")}>Cancel</Button>
              <p className="text-center text-xs opacity-60">You can continue setup if a later step fails; the product won't be duplicated.</p>
            </div>
          </aside>
        </form>
      </div>
    </DashboardLayout>
  );
}
