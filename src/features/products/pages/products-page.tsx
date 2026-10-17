import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Bot,
  CirclePlus,
  Package,
  PackageX,
  Plus,
  Search,
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
  slug?: string | null;
  sku?: string | null;
  image_url?: string | null;
  product_type?: string | null;
  status?: string | null;
  category?: { name?: string } | string | null;
};

type Price = {
  product_id?: string | null;
  variant_id?: string | null;
  price_type?: "BUYING" | "SELLING";
  amount?: number | string;
  currency?: string;
  status?: string;
};

type InventoryItem = {
  product_id?: string;
  quantity_available?: number | string;
  available_quantity?: number | string;
  reorder_level?: number | string;
};

type DashboardSummary = {
  currency?: string;
  inventory?: {
    products?: number;
    lowStockItems?: number;
    outOfStockItems?: number;
    availableUnits?: number;
  };
};

function recordsFrom<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (typeof payload === "object" && payload !== null) {
    const value = payload as Record<string, unknown>;
    for (const key of ["data", "items", "products", "results"]) {
      if (Array.isArray(value[key])) return value[key] as T[];
    }
  }
  return [];
}

function money(value: number, currency = "TZS") {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ProductsPage() {
  const navigate = useNavigate();
  const platform = usePlatform();
  const { theme } = useTheme();
  const { workspace, loading: workspaceLoading } = useWorkspace();
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const colors = theme.colors;

  const load = useCallback(async () => {
    if (!workspace?.id) return;
    setLoading(true);
    setError(null);
    try {
      const [productResult, priceResult, inventoryResult, dashboardResult] =
        await Promise.all([
          platform.api.get<unknown>(
            `/api/workspaces/${workspace.id}/products?page=1&limit=100`,
          ),
          platform.api
            .get<unknown>(
              `/api/workspaces/${workspace.id}/prices?page=1&limit=100`,
            )
            .catch(() => []),
          platform.api
            .get<unknown>(`/api/workspaces/${workspace.id}/inventory`)
            .catch(() => []),
          platform.api
            .get<DashboardSummary>(
              `/api/workspaces/${workspace.id}/dashboard/summary?currency=TZS`,
            )
            .catch(() => null),
        ]);
      setProducts(recordsFrom<Product>(productResult));
      setPrices(recordsFrom<Price>(priceResult));
      setInventory(recordsFrom<InventoryItem>(inventoryResult));
      setSummary(dashboardResult);
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
      [product.name, product.sku, product.slug]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle)),
    );
  }, [products, query]);

  const inventoryQuantity = (item: InventoryItem) =>
    Number(item.quantity_available ?? item.available_quantity ?? 0);

  const stockValue = (type: "BUYING" | "SELLING") => {
    if (inventory.length === 0 || prices.length === 0) return null;
    return inventory.reduce((total, item) => {
      const price = prices.find(
        (entry) =>
          entry.product_id === item.product_id &&
          !entry.variant_id &&
          entry.price_type === type &&
          entry.status === "ACTIVE",
      );
      if (!price) return total;
      return total + inventoryQuantity(item) * Number(price.amount ?? 0);
    }, 0);
  };

  const createProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!workspace?.id) {
      setFormError("Choose or set up a workspace before adding products.");
      return;
    }
    if (!name.trim()) {
      setFormError("Enter a product name.");
      return;
    }
    setSaving(true);
    try {
      await platform.api.post(`/api/workspaces/${workspace.id}/products`, {
        name: name.trim(),
        slug: slugify(name),
        sku: sku.trim() || undefined,
        description: description.trim() || undefined,
        productType: "PHYSICAL",
        status: "ACTIVE",
      });
      setShowCreate(false);
      setName("");
      setSku("");
      setDescription("");
      await load();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Product could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  };

  const buyingValue = stockValue("BUYING");
  const retailValue = stockValue("SELLING");
  const metrics = [
    {
      label: "Stock cost value",
      value: buyingValue === null ? "—" : money(buyingValue),
      icon: Wallet,
      className: "metric-primary",
    },
    {
      label: "Retail value",
      value: retailValue === null ? "—" : money(retailValue),
      icon: TrendingUp,
      className: "metric-primary",
    },
    {
      label: "Total products",
      value: String(summary?.inventory?.products ?? products.length),
      icon: Package,
      className: "metric-primary",
    },
    {
      label: "Out of stock",
      value:
        summary?.inventory?.outOfStockItems == null
          ? "—"
          : String(summary.inventory.outOfStockItems),
      icon: PackageX,
      className: "metric-warning",
    },
    {
      label: "Low stock",
      value:
        summary?.inventory?.lowStockItems == null
          ? "—"
          : String(summary.inventory.lowStockItems),
      icon: AlertTriangle,
      className: "metric-warning",
    },
    {
      label: "Damaged stock",
      value: "—",
      icon: PackageX,
      className: "metric-danger",
    },
  ];

  if (workspaceLoading) {
    return (
      <main className="products-page">
        <div className="products-state">Loading your workspace…</div>
      </main>
    );
  }

  return (
    <main
      className="products-page"
      style={{ color: colors.text, background: colors.background }}
    >
      <header className="products-header">
        <div>
          <p className="products-eyebrow">INVENTORY</p>
          <h1>Products</h1>
          <p className="products-subtitle">
            Manage your catalogue, pricing and stock across locations.
          </p>
        </div>
        <div className="products-header-actions">
          <button
            type="button"
            className="products-ai-button"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("zoobusiness:open-ai-assistant", {
                  detail: { context: "products" },
                }),
              )
            }
          >
            <Bot size={18} /> <span>AI Assistant</span>
          </button>
          <button
            type="button"
            className="products-primary-button"
            onClick={() => navigate("/products/new")}
          >
            <Plus size={18} /> <span>Add Product</span>
          </button>
        </div>
      </header>

      <section className="products-metrics" aria-label="Inventory summary">
        {metrics.map(({ label, value, icon: Icon, className }, index) => (
          <article
            className={`products-metric ${className} ${index > 2 ? "desktop-only-metric" : ""}`}
            key={label}
          >
            <div className="products-metric-top">
              <span>{label}</span>
              <Icon size={19} aria-hidden="true" />
            </div>
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
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products or SKU"
              aria-label="Search products or SKU"
            />
          </label>
        </div>

        {error ? (
          <div className="products-state products-error" role="alert">
            <AlertTriangle size={22} />
            <div>
              <strong>Could not load products</strong>
              <p>{error}</p>
              <button
                type="button"
                className="products-secondary-button"
                onClick={() => void load()}
              >
                Try again
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="products-state">Loading catalogue…</div>
        ) : visibleProducts.length === 0 ? (
          <div className="products-empty">
            <div className="products-empty-icon">
              <Package size={28} />
            </div>
            <h3>
              {query
                ? "No matching products"
                : "Your catalogue is ready for its first product"}
            </h3>
            <p>
              {query
                ? "Try another name or SKU."
                : "Add a product to start building your catalogue. Stock is added separately through purchasing and receiving."}
            </p>
            {!query && (
              <button
                type="button"
                className="products-primary-button"
                onClick={() => navigate("/products/new")}
              >
                <Plus size={18} /> Add Product
              </button>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {visibleProducts.map((product) => {
              const sellingPrice = prices.find(
                (entry) =>
                  entry.product_id === product.id &&
                  !entry.variant_id &&
                  entry.price_type === "SELLING" &&
                  entry.status === "ACTIVE",
              );
              const inventoryItem = inventory.find(
                (entry) => entry.product_id === product.id,
              );
              const category =
                typeof product.category === "string"
                  ? product.category
                  : product.category?.name;
              const stock =
                inventoryItem?.quantity_available ??
                inventoryItem?.available_quantity;

              return (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
                      />
                    ) : (
                      <Package size={34} aria-hidden="true" />
                    )}
                    {product.status && (
                      <span className="product-status">
                        {product.status.replaceAll("_", " ")}
                      </span>
                    )}
                  </div>
                  <div className="product-card-content">
                    <p className="product-category">
                      {category || "Uncategorised"}
                    </p>
                    <h3 title={product.name}>{product.name}</h3>
                    {product.sku && (
                      <p className="product-sku">SKU: {product.sku}</p>
                    )}
                    <div className="product-card-bottom">
                      <div>
                        <strong>
                          {sellingPrice
                            ? money(
                                Number(sellingPrice.amount),
                                sellingPrice.currency ?? "TZS",
                              )
                            : "Price not set"}
                        </strong>
                        <span>
                          {stock == null ? "Stock not available" : `Stock: ${stock}`}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="product-add-cart"
                        aria-label={`Add ${product.name} to cart`}
                        title="Add to cart"
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("zoobusiness:add-to-cart", {
                              detail: { productId: product.id },
                            }),
                          )
                        }
                      >
                        <CirclePlus size={22} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <div className="products-mobile-actions">
        <button
          type="button"
          className="products-mobile-ai"
          aria-label="Open AI Assistant"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("zoobusiness:open-ai-assistant", {
                detail: { context: "products" },
              }),
            )
          }
        >
          <Bot size={21} />
        </button>
        <button
          type="button"
          className="products-mobile-add"
          aria-label="Add product"
          onClick={() => navigate("/products/new")}
        >
          <Plus size={23} />
        </button>
      </div>

      {showCreate && (
        <div
          className="products-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowCreate(false);
          }}
        >
          <section
            className="products-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
          >
            <header className="products-modal-header">
              <div>
                <h2 id="add-product-title">Add product</h2>
                <p>
                  Create the catalogue record first. Prices and stock are
                  managed in their respective workflows.
                </p>
              </div>
              <button
                type="button"
                className="products-icon-button"
                aria-label="Close"
                onClick={() => setShowCreate(false)}
              >
                <X size={20} />
              </button>
            </header>
            <form onSubmit={(event) => void createProduct(event)}>
              <label>
                Product name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Fertilizer 50kg"
                  autoFocus
                />
              </label>
              <label>
                SKU / barcode
                <input
                  value={sku}
                  onChange={(event) => setSku(event.target.value)}
                  placeholder="Optional product code"
                />
              </label>
              <label>
                Description
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Product details (optional)"
                  rows={3}
                />
              </label>
              <p className="products-form-note">
                Adding a product does not create stock. Use purchasing and
                receiving to record stock at a shop or warehouse.
              </p>
              {formError && (
                <p className="products-form-error" role="alert">
                  {formError}
                </p>
              )}
              <footer className="products-modal-footer">
                <button
                  type="button"
                  className="products-secondary-button"
                  onClick={() => setShowCreate(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="products-primary-button"
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save product"}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
