import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, Bot, ImagePlus, Plus, Trash2, Package, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlatform } from "@/platform/providers/use-platform";
import { useTheme } from "@/theme/hooks";
import { useWorkspace } from "@/workspace/providers/workspace-provider";
import "./product-create-page.css";

type VariantRow = { name: string; sku: string; buyingPrice: string; sellingPrice: string; quantity: string };
type AttributeRow = { name: string; value: string };

const purchaseOptions = [
  { value: "DRAFT", label: "Draft — finish later" },
  { value: "PENDING", label: "Pending — awaiting confirmation" },
  { value: "ORDERED", label: "Ordered — waiting for delivery" },
  { value: "RECEIVED", label: "Received — stock delivered" },
];

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ProductCreatePage() {
  const navigate = useNavigate();
  const platform = usePlatform();
  const { theme } = useTheme();
  const { workspace } = useWorkspace();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("piece");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [currency, setCurrency] = useState("TZS");
  const [locationType, setLocationType] = useState("SHOP");
  const [locationName, setLocationName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10));
  const [purchaseStatus, setPurchaseStatus] = useState("DRAFT");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDiscount, setOfferDiscount] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [attributes, setAttributes] = useState<AttributeRow[]>([{ name: "", value: "" }]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const themeColors = theme.colors;
  const previewPrice = useMemo(() => Number(sellingPrice || 0), [sellingPrice]);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : "");
  };

  const addVariant = () => setVariants((rows) => [...rows, { name: "", sku: "", buyingPrice: "", sellingPrice: "", quantity: "0" }]);
  const addAttribute = () => setAttributes((rows) => [...rows, { name: "", value: "" }]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!workspace?.id) {
      setError("Workspace haijapatikana. Chagua workspace kwanza.");
      return;
    }
    if (!name.trim()) {
      setError("Weka jina la bidhaa.");
      return;
    }
    setSubmitting(true);
    try {
      // Create the catalogue record through the known product API. Pricing and receiving
      // are separate backend resources; they must be submitted through their verified APIs.
      const created = await platform.api.post<unknown>(`/api/workspaces/${workspace.id}/products`, {
        name: name.trim(),
        slug: slugify(name),
        sku: sku.trim() || undefined,
        description: description.trim() || undefined,
        productType: "PHYSICAL",
        status: "ACTIVE",
      });
      const productId = typeof created === "object" && created !== null && "id" in created
        ? String((created as { id: unknown }).id)
        : "";
      setNotice(productId
        ? "Bidhaa ya catalogue imeundwa. Bei, variant na kupokea stock vinahitaji kuhifadhiwa kupitia workflows za backend husika."
        : "Ombi la kuunda bidhaa limetumwa. Hakiki catalogue kabla ya kuendelea na bei na kupokea stock.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bidhaa haikuweza kuundwa.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="product-create-shell" style={{ background: themeColors.background, color: themeColors.text }}>
      <header className="product-create-topbar">
        <button type="button" className="pc-back" onClick={() => navigate("/products")} aria-label="Rudi Products">
          <ArrowLeft size={19} /><span>Products</span>
        </button>
        <div className="pc-topbar-title"><span>CATALOGUE WORKSPACE</span><h1>New product</h1></div>
        <button type="button" className="pc-ai-button" onClick={() => window.dispatchEvent(new CustomEvent("zoobusiness:open-ai-assistant", { detail: { context: "product-create" } }))}>
          <Bot size={18} /><span>AI Assistant</span>
        </button>
      </header>

      <div className="product-create-layout">
        <form className="pc-form-column" onSubmit={(event) => void submit(event)}>
          <section className="pc-section">
            <div className="pc-section-heading"><div><span>01</span><div><h2>Product details</h2><p>Basic information shown in your catalogue.</p></div></div></div>
            <div className="pc-form-grid">
              <label className="pc-field pc-full">Product name *<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Fertilizer 50kg" /></label>
              <label className="pc-field">SKU / barcode<input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Auto or enter SKU" /></label>
              <label className="pc-field">Category<input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Choose category" /></label>
              <label className="pc-field pc-full">Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Product specifications, usage and other details…" /></label>
              <label className="pc-field">Selling unit<select value={unit} onChange={(e) => setUnit(e.target.value)}><option value="piece">Piece</option><option value="kg">Kilogram (kg)</option><option value="bag">Bag</option><option value="box">Box</option><option value="litre">Litre</option><option value="pack">Pack</option><option value="dozen">Dozen</option></select></label>
              <label className="pc-field">Currency<select value={currency} onChange={(e) => setCurrency(e.target.value)}><option value="TZS">TZS — Tanzanian shilling</option><option value="USD">USD — US dollar</option></select></label>
            </div>
            <label className="pc-field pc-image-field">Product image
              <span className="pc-image-drop">
                {imagePreview ? <img src={imagePreview} alt="Product preview" /> : <><ImagePlus size={24} /><strong>Choose product image</strong><small>PNG, JPG or WEBP</small></>}
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onImageChange} />
              </span>
            </label>
          </section>

          <section className="pc-section">
            <div className="pc-section-heading"><div><span>02</span><div><h2>Pricing & stock</h2><p>Buying cost, retail price and opening quantity.</p></div></div></div>
            <div className="pc-form-grid">
              <label className="pc-field">Buying price<input type="number" min="0" value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} placeholder="0.00" /></label>
              <label className="pc-field">Selling price<input type="number" min="0" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="0.00" /></label>
              <label className="pc-field">Opening quantity<input type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label>
              <label className="pc-field">Purchase date<input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} /></label>
            </div>
            <div className="pc-form-grid pc-location-grid">
              <label className="pc-field">Stock location type<select value={locationType} onChange={(e) => setLocationType(e.target.value)}><option value="SHOP">Shop</option><option value="WAREHOUSE">Warehouse</option></select></label>
              <label className="pc-field">{locationType === "SHOP" ? "Shop location" : "Warehouse"}<input value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder={locationType === "SHOP" ? "Select shop" : "Select warehouse"} /></label>
            </div>
            <label className="pc-field">Purchase workflow status
              <select value={purchaseStatus} onChange={(e) => setPurchaseStatus(e.target.value)}>
                {purchaseOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <p className="pc-helper">Stock is only physically available after the receiving workflow confirms delivery. An order that is still pending or in transit must not increase available stock.</p>
          </section>

          <section className="pc-section">
            <div className="pc-section-heading"><div><span>03</span><div><h2>Variants & attributes</h2><p>Capture sizes, colours, packaging or product-specific details.</p></div></div><button type="button" className="pc-add-row" onClick={addVariant}><Plus size={16} /> Add variant</button></div>
            {variants.length === 0 ? <div className="pc-inline-empty"><Package size={18} /><span>No variants added. Add one for different sizes, colours or packs.</span></div> : variants.map((variant, index) => <div className="pc-variant-row" key={index}>
              <label className="pc-field">Variant name<input value={variant.name} onChange={(e) => setVariants((rows) => rows.map((row, i) => i === index ? { ...row, name: e.target.value } : row))} placeholder="e.g. 25kg bag" /></label>
              <label className="pc-field">SKU<input value={variant.sku} onChange={(e) => setVariants((rows) => rows.map((row, i) => i === index ? { ...row, sku: e.target.value } : row))} placeholder="Variant SKU" /></label>
              <button type="button" className="pc-remove-row" aria-label="Remove variant" onClick={() => setVariants((rows) => rows.filter((_, i) => i !== index))}><Trash2 size={16} /></button>
            </div>)}
            <div className="pc-section-subheading"><strong>Attributes</strong><button type="button" className="pc-text-button" onClick={addAttribute}><Plus size={15} /> Add attribute</button></div>
            {attributes.map((attribute, index) => <div className="pc-attribute-row" key={index}>
              <input aria-label="Attribute name" value={attribute.name} onChange={(e) => setAttributes((rows) => rows.map((row, i) => i === index ? { ...row, name: e.target.value } : row))} placeholder="e.g. Brand, Colour, Size" />
              <input aria-label="Attribute value" value={attribute.value} onChange={(e) => setAttributes((rows) => rows.map((row, i) => i === index ? { ...row, value: e.target.value } : row))} placeholder="Value" />
              {attributes.length > 1 && <button type="button" className="pc-remove-row" aria-label="Remove attribute" onClick={() => setAttributes((rows) => rows.filter((_, i) => i !== index))}><Trash2 size={16} /></button>}
            </div>)}
          </section>

          <section className="pc-section">
            <div className="pc-section-heading"><div><span>04</span><div><h2>Offers & discounts</h2><p>Optional promotion details for this product.</p></div></div></div>
            <div className="pc-form-grid">
              <label className="pc-field">Offer name<input value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} placeholder="e.g. October promotion" /></label>
              <label className="pc-field">Discount (%)<input type="number" min="0" max="100" value={offerDiscount} onChange={(e) => setOfferDiscount(e.target.value)} placeholder="0" /></label>
            </div>
            <p className="pc-helper">Offers are optional. Confirm eligibility, dates and discount rules in the Offers workflow before publishing.</p>
          </section>

          {error && <p className="pc-message pc-error" role="alert">{error}</p>}
          {notice && <div className="pc-message pc-notice" role="status"><strong>Product request complete</strong><p>{notice}</p><button type="button" onClick={() => navigate("/products")}>Back to catalogue</button></div>}
          <div className="pc-submit-bar">
            <button type="button" className="pc-cancel-button" onClick={() => navigate("/products")}>Cancel</button>
            <label className="pc-submit-status">Create workflow<select value={purchaseStatus} onChange={(e) => setPurchaseStatus(e.target.value)}>{purchaseOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <button type="submit" className="pc-submit-button" disabled={submitting}>{submitting ? "Submitting…" : "Create product"}<ChevronDown size={16} /></button>
          </div>
        </form>

        <aside className="pc-preview-column">
          <div className="pc-preview-sticky">
            <div className="pc-preview-heading"><div><span>LIVE PREVIEW</span><h2>Product card</h2></div><span className="pc-preview-badge">Preview</span></div>
            <article className="pc-preview-card">
              <div className="pc-preview-image">{imagePreview ? <img src={imagePreview} alt="" /> : <Package size={42} />}</div>
              <div className="pc-preview-content"><span>{category || "Category"}</span><h3>{name || "Your product name"}</h3><p>{description || "Your product description will appear here."}</p><div className="pc-preview-price">{previewPrice > 0 ? new Intl.NumberFormat("en-TZ", { style: "currency", currency, maximumFractionDigits: 0 }).format(previewPrice) : "Selling price"}<small> / {unit}</small></div><div className="pc-preview-stock">Opening quantity: {quantity || "0"}</div></div>
            </article>
            <div className="pc-preview-details"><div><span>Buying price</span><strong>{buyingPrice ? new Intl.NumberFormat("en-TZ", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(buyingPrice)) : "Not set"}</strong></div><div><span>Location</span><strong>{locationName || (locationType === "SHOP" ? "Shop not selected" : "Warehouse not selected")}</strong></div><div><span>Purchase date</span><strong>{purchaseDate || "Not set"}</strong></div><div><span>Workflow</span><strong>{purchaseOptions.find((option) => option.value === purchaseStatus)?.label.split(" — ")[0]}</strong></div></div>
            <p className="pc-preview-footnote">This preview shows how the product may appear. Final catalogue, pricing, variant and stock records depend on the connected backend workflows.</p>
          </div>
        </aside>
      </div>

      <div className="pc-floating-actions">
        <button type="button" aria-label="Open AI Assistant" onClick={() => window.dispatchEvent(new CustomEvent("zoobusiness:open-ai-assistant", { detail: { context: "product-create" } }))}><Bot size={21} /></button>
        <button type="button" aria-label="Add product" onClick={() => document.querySelector<HTMLFormElement>(".pc-form-column")?.requestSubmit()}><Plus size={22} /></button>
      </div>
    </main>
  );
}
