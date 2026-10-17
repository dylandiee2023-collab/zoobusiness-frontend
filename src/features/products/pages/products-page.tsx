import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bot,
  CirclePlus,
  Package,
  PackageX,
  Plus,
  Search,
  ShoppingCart,
  Wallet,
  X,
  TrendingUp,
} from "lucide-react";

import { usePlatform } from "@/platform/providers/use-platform";
import { useTheme } from "@/theme/hooks";
import { useWorkspace } from "@/workspace/providers/workspace-provider";
import "./products-page.css";

type Product = {
  id: string;
  name: string;
  sku?: string | null;
  image_url?: string | null;
  selling_price?: number | string | null;
  currency?: string | null;
  available_quantity?: number | string | null;
  stock_quantity?: number | string | null;
  category?: { name?: string } | string | null;
  status?: string | null;
};

type ProductSummary = {
  stock_cost_value?: number | string | null;
  retail_value?: number | string | null;
  total_products?: number | null;
  out_of_stock?: number | null;
  low_stock?: number | null;
  damaged_stock?: number | null;
  currency?: string | null;
};

function recordsFrom<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (typeof payload === "object" && payload !== null) {
    const value = payload as Record<string, unknown>;
    for (const key of ["items", "data", "products", "results"]) {
      if (Array.isArray(value[key])) return value[key] as T[];
    }
  }
  return [];
}

function money(value: number | string | null | undefined, currency = "TZS") {
  const amount = Number(value ?? 0);
  if (!Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductsPage() {
  const platform = usePlatform();
  const { theme } = useTheme();
  const { workspace, loading: workspaceLoading } = useWorkspace();
  const [products, setProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState<ProductSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [currency, setCurrency] = useState("TZS");
  const [formError, setFormError] = useState<string | null>(null);

  const colors = theme.colors;
  const load = useCallback(async () => {
    if (!workspace?.id) return;
    setLoading(true);
    setError(null);
    try {
      const [productResult, summaryResult] = await Promise.all([
        platform.api.get<unknown>(`/api/workspaces/${workspace.id}/products`),
        platform.api.get<ProductSummary>(
          `/api/workspaces/${workspace.id}/products/summary?currency=TZS`,
        ).catch(() => null),
      ]);
      setProducts(recordsFrom<Product>(productResult));
      setSummary(summaryResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load products.");
    } finally {
      setLoading(false);
    }
  }, [platform.api, workspace?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const visibleProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((product) =>
      [product.name, product.sku, typeof product.category === "string" ? product.category : product.category?.name]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle)),
    );
  }, [products, query]);

  const createProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!workspace?.id) {
      setFormError("Choose or set up a workspace before adding products.");
      return;
    }
    if (!name.trim() || !price || Number(price) < 0 || Number(costPrice || 0) < 0) {
      setFormError("Enter a product name and valid non-negative prices.");
      return;
    }
    setSaving(true);
    try {
      await platform.api.post(`/api/workspaces/${workspace.id}/products`, {
        name: name.trim(),
        sku: sku.trim() || undefined,
        selling_price: Number(price),
        cost_price: costPrice ? Number(costPrice) : undefined,
        currency,
      });
      setShowCreate(false);
      setName("");
      setSku("");
      setPrice("");
      setCostPrice("");
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Product could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const metrics = [
    { label: "Stock cost value", value: summary ? money(summary.stock_cost_value, summary.currency ?? "TZS") : "—", icon: Wallet, className: "metric-primary" },
    { label: "Retail value", value: summary ? money(summary.retail_value, summary.currency ?? "TZS") : "—", icon: TrendingUp, className: "metric-primary" },
    { label: "Total products", value: summary?.total_products == null ? String(products.length) : String(summary.total_products), icon: Package, className: "metric-primary" },
    { label: "Out of stock", value: summary?.out_of_stock == null ? "—" : String(summary.out_of_stock), icon: PackageX, className: "metric-warning" },
    { label: "Low stock", value: summary?.low_stock == null ? "—" : String(summary.low_stock), icon: AlertTriangle, className: "metric-warning" },
    { label: "Damaged stock", value: summary?.damaged_stock == null ? "—" : String(summary.damaged_stock), icon: PackageX, className: "metric-danger" },
  ];

  if (workspaceLoading) {
    return <main className="products-page"><div className="products-state">Loading your workspace…</div></main>;
  }

  return (
    <main className="products-page" style={{ color: colors.text, background: colors.background }}>
      <header className="products-header">
        <div>
          <p className="products-eyebrow">INVENTORY</p>
          <h1>Products</h1>
          <p className="products-subtitle">Manage your catalogue, pricing and stock across locations.</p>
        </div>
        <div className="products-header-actions">
          <button type="button" className="products-ai-button" onClick={() => window.dispatchEvent(new CustomEvent("zoobusiness:open-ai-assistant", { detail: { context: "products" } }))}>
            <Bot size={18} /> <span>AI Assistant</span>
          </button>
          <button type="button" className="products-primary-button" onClick={() => setShowCreate(true)}>
            <Plus size={18} /> <span>Add Product</span>
          </button>
        </div>
      </header>

      <section className="products-metrics" aria-label="Inventory summary">
        {metrics.map(({ label, value, icon: Icon, className }, index) => (
          <article className={`products-metric ${className} ${index > 2 ? "desktop-only-metric" : ""}`} key={label}>
            <div className="products-metric-top"><span>{label}</span><Icon size={19} aria-hidden="true" /></div>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="products-catalogue">
        <div className="products-catalogue-heading">
          <div>
            <h2>Product catalogue</h2>
            <p>{loading ? "Loading products…" : `${visibleProducts.length} products`}</p>
          </div>
          <label className="products-search">
            <Search size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or SKU" aria-label="Search products or SKU" />
          </label>
        </div>

        {error ? (
          <div className="products-state products-error" role="alert">
            <AlertTriangle size={22} />
            <div><strong>Could not load products</strong><p>{error}</p><button type="button" className="products-secondary-button" onClick={() => void load()}>Try again</button></div>
          </div>
        ) : loading ? (
          <div className="products-state">Loading catalogue…</div>
        ) : visibleProducts.length === 0 ? (
          <div className="products-empty">
            <div className="products-empty-icon"><Package size={28} /></div>
            <h3>{query ? "No matching products" : "Your catalogue is ready for its first product"}</h3>
            <p>{query ? "Try another name or SKU." : "Add a product to start building your catalogue. Receiving stock is handled separately through purchasing and stock receiving."}</p>
            {!query && <button type="button" className="products-primary-button" onClick={() => setShowCreate(true)}><Plus size={18} /> Add Product</button>}
          </div>
        ) : (
          <div className="products-grid">
            {visibleProducts.map((product) => {
              const category = typeof product.category === "string" ? product.category : product.category?.name;
              const stock = product.available_quantity ?? product.stock_quantity;
              return (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    {product.image_url ? <img src={product.image_url} alt={product.name} loading="lazy" /> : <Package size={34} aria-hidden="true" />}
                    {product.status && <span className="product-status">{product.status.replaceAll("_", " ")}</span>}
                  </div>
                  <div className="product-card-content">
                    <p className="product-category">{category || "Uncategorised"}</p>
                    <h3 title={product.name}>{product.name}</h3>
                    {product.sku && <p className="product-sku">SKU: {product.sku}</p>}
                    <div className="product-card-bottom">
                      <div><strong>{money(product.selling_price, product.currency ?? "TZS")}</strong><span>{stock == null ? "Stock not available" : `Stock: ${stock}`}</span></div>
                      <button type="button" className="product-add-cart" aria-label={`Add ${product.name} to cart`} title="Add to cart" onClick={() => window.dispatchEvent(new CustomEvent("zoobusiness:add-to-cart", { detail: { productId: product.id } }))}><CirclePlus size={22} /></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <button type="button" className="products-mobile-add" onClick={() => setShowCreate(true)}><Plus size={20} /> Add Product</button>

      {showCreate && (
        <div className="products-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowCreate(false); }}>
          <section className="products-modal" role="dialog" aria-modal="true" aria-labelledby="add-product-title">
            <header className="products-modal-header"><div><h2 id="add-product-title">Add product</h2><p>Create catalogue details first. Stock is added through receiving.</p></div><button type="button" className="products-icon-button" aria-label="Close" onClick={() => setShowCreate(false)}><X size={20} /></button></header>
            <form onSubmit={(event) => void createProduct(event)}>
              <label>Product name <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Fertilizer 50kg" autoFocus /></label>
              <label>SKU / barcode <input value={sku} onChange={(event) => setSku(event.target.value)} placeholder="Optional product code" /></label>
              <div className="products-form-row">
                <label>Cost price <input type="number" min="0" step="0.01" value={costPrice} onChange={(event) => setCostPrice(event.target.value)} placeholder="0.00" /></label>
                <label>Selling price <input required type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="0.00" /></label>
              </div>
              <label>Currency <select value={currency} onChange={(event) => setCurrency(event.target.value)}><option value="TZS">TZS — Tanzanian Shilling</option><option value="USD">USD — US Dollar</option></select></label>
              {formError && <p className="products-form-error" role="alert">{formError}</p>}
              <footer className="products-modal-footer"><button type="button" className="products-secondary-button" onClick={() => setShowCreate(false)} disabled={saving}>Cancel</button><button type="submit" className="products-primary-button" disabled={saving}>{saving ? "Saving…" : "Save product"}</button></footer>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
