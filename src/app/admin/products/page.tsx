"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Save, Power, AlertCircle } from "lucide-react";
import { getProducts, createProduct, updateProduct, deleteProduct, toggleProductStatus } from "@/lib/actions/products";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadProducts();
  }, []);

  async function loadProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      console.error("Failed to load products:", err);
      setError(err.message || "Failed to connect to Supabase. Please check your environment variables.");
      // Fallback to empty if error
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleProductStatus(id, currentStatus);
      loadProducts();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="space-y-8 animate-reveal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading text-primary">Product Management</h1>
          <p className="text-textMuted text-sm mb-4">Manage your herbal mehendi inventory.</p>
          <div className="bg-secondary/20 border border-accent/20 rounded-xl p-3 text-xs text-primary/80">
            <strong>Data Check:</strong> If multiple products show the same image on your site, edit them below, delete the identical image (X), and upload a unique one.
          </div>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">
            <p className="font-bold mb-1">Database Connection Issue</p>
            <p className="opacity-80">{error}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[400px] bg-secondary/30 rounded-card animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-card border border-dashed border-secondary">
          <ImageIcon className="w-16 h-16 text-textMuted/20 mx-auto mb-4" />
          <p className="text-textMuted">No products found. Start by adding one!</p>
          {!error && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-6 text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
            >
              Create your first product
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-card shadow-soft border border-secondary overflow-hidden group hover:border-accent/30 transition-all">
              <div className="h-48 bg-secondary relative overflow-hidden">
                <img 
                  src={product.images?.[0] || "https://images.unsplash.com/photo-1590670460285-f219f708a2c1?auto=format&fit=crop&q=80&w=400"} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button 
                  onClick={() => handleToggleStatus(product.id, product.is_active)}
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm flex items-center gap-1.5 ${
                    product.is_active ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  <Power className="w-3 h-3" />
                  {product.is_active ? "Active" : "Inactive"}
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-1 tracking-tight">{product.name}</h3>
                {product.slug ? (
                  <p className="text-[10px] text-textMuted font-mono bg-secondary/30 w-fit px-2 py-0.5 rounded mb-4">/{product.slug}</p>
                ) : (
                  <p className="text-[10px] text-red-500 font-bold bg-red-50 w-fit px-2 py-0.5 rounded mb-4 shadow-sm border border-red-100">Missing SEO Slug - Edit & Save to fix</p>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl font-bold text-primary">৳{product.offer_price || product.price}</span>
                  {product.offer_price && (
                    <span className="text-sm text-textMuted line-through">৳{product.price}</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-secondary">
                  <span className="text-xs text-textMuted font-medium italic">
                    {product.variants?.length || 0} variants available
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setEditingProduct(product);
                        setIsModalOpen(true);
                      }}
                      className="p-2 hover:bg-secondary rounded-button transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-textMuted hover:text-primary transition-colors" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-red-50 rounded-button transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Form Modal */}
      {isModalOpen && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            setIsModalOpen(false);
            loadProducts();
          }}
        />
      )}
    </div>
  );
}

function ProductFormModal({ product, onClose, onSuccess }: any) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    offer_price: product?.offer_price || "",
    is_active: product?.is_active ?? true,
    images: product?.images || [],
    variants: product?.variants || [],
    tagline: product?.tagline || "",
    ingredients: product?.ingredients || "",
    shipping_policy: product?.shipping_policy || "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData({ ...formData, images: [...formData.images, data.url] });
      } else {
        const errorMsg = data.error || "Upload failed. Please check your Cloudinary configuration.";
        console.error("Upload error:", errorMsg);
        alert(`Upload Failed: ${errorMsg}`);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload connection error. Please check your internet connection.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      onSuccess();
    } catch (err: any) {
      console.error("Failed to save product:", err);
      alert(err.message || "Failed to save product. Check database connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-6 pb-20 overflow-y-auto">
      <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 border border-white animate-in zoom-in-95 duration-200 mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-heading text-primary">
            {product ? "Edit Product" : "New Botanical Product"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-wider">Product Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none"
                placeholder="e.g. Bridal Mehendi Cone"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-wider">Base Price (৳)</label>
              <input 
                type="number" 
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || ""})}
                className="w-full bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-wider">Offer Price (Optional)</label>
              <input 
                type="number" 
                value={formData.offer_price}
                onChange={(e) => setFormData({...formData, offer_price: parseFloat(e.target.value) || ""})}
                className="w-full bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-wider">Status</label>
              <select 
                value={formData.is_active ? "active" : "inactive"}
                onChange={(e) => setFormData({...formData, is_active: e.target.value === "active"})}
                className="w-full bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">Product Images</label>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    id="file-upload"
                  />
                  <div className={`w-full bg-secondary/50 border-2 border-dashed ${isUploading ? 'border-primary/20' : 'border-primary/10'} p-3 rounded-xl text-center text-sm text-textMuted flex items-center justify-center gap-2`}>
                    {isUploading ? (
                      <><div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /> Uploading...</>
                    ) : (
                      <><ImageIcon className="w-4 h-4" /> Click to upload image</>
                    )}
                  </div>
                </div>
                <div className="flex items-center px-4 font-bold text-[10px] text-textMuted uppercase tracking-widest">or</div>
                <input 
                  type="text" 
                  id="new-image-url"
                  className="flex-1 bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none text-sm"
                  placeholder="Paste URL..."
                />
                <button 
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('new-image-url') as HTMLInputElement;
                    if (input.value) {
                      setFormData({...formData, images: [...formData.images, input.value]});
                      input.value = "";
                    }
                  }}
                  className="px-4 bg-primary text-white rounded-xl font-bold hover:bg-accent transition-all text-xs"
                >
                  Add
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {formData.images.map((img: string, i: number) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-secondary shadow-sm group">
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, images: formData.images.filter((_: string, idx: number) => idx !== i)})}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">Description</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none resize-none"
              placeholder="Tell customers about this botanical creation..."
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-wider">Tagline (Under Price)</label>
              <input 
                type="text" 
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                className="w-full bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none"
                placeholder="e.g. Discover the rich, dark stain..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase tracking-wider">Ingredients & Purity</label>
                <textarea 
                  rows={4}
                  value={formData.ingredients}
                  onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                  className="w-full bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none resize-none"
                  placeholder="e.g. Made with 100% natural Rajasthani henna..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase tracking-wider">Shipping & Returns</label>
                <textarea 
                  rows={4}
                  value={formData.shipping_policy}
                  onChange={(e) => setFormData({...formData, shipping_policy: e.target.value})}
                  className="w-full bg-secondary/50 border-2 border-transparent focus:border-accent focus:bg-white p-3 rounded-xl transition-all outline-none resize-none"
                  placeholder="e.g. Inside Dhaka: Delivery within 24 hours..."
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-secondary flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-secondary text-textMuted rounded-xl font-bold hover:bg-secondary transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-[2] btn-primary py-3 flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {product ? "Update Product" : "Publish Product"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
