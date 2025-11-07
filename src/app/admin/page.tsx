'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PRODUCT_SIZES, type ProductCategory } from '../../constants/productSizes';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: ProductCategory;
  sizes: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Mattress');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [customSize, setCustomSize] = useState('');
  const [showCustomSize, setShowCustomSize] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState<ProductCategory>('Mattress');
  const [editSelectedSizes, setEditSelectedSizes] = useState<string[]>([]);
  const [editCustomSize, setEditCustomSize] = useState('');
  const [editShowCustomSize, setEditShowCustomSize] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || !session.user || (session.user as any).role !== 'admin') {
      router.push('/admin/signin');
    } else {
      fetchProducts();
    }
  }, [session, status, router]);

  // Reset selected sizes when category changes
  useEffect(() => {
    setSelectedSizes([]);
    setCustomSize('');
    setShowCustomSize(false);
  }, [category]);

  useEffect(() => {
    if (editingProduct) {
      setEditSelectedSizes([]);
      setEditCustomSize('');
      setEditShowCustomSize(false);
    }
  }, [editCategory]);


  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p._id !== productId));
        setMessage('Product deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage('An error occurred while deleting');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditPrice(product.price.toString());
    setEditCategory(product.category);
    
    const predefinedSizes = [...PRODUCT_SIZES[product.category]] as string[];
    const customSizes = product.sizes.filter(size => !predefinedSizes.includes(size));
    const selectedPredefined = product.sizes.filter(size => predefinedSizes.includes(size));
    
    setEditSelectedSizes(selectedPredefined);
    if (customSizes.length > 0) {
      setEditCustomSize(customSizes.join(', '));
      setEditShowCustomSize(true);
    } else {
      setEditCustomSize('');
      setEditShowCustomSize(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;

    const parsedPrice = parseFloat(editPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setMessage('Please enter a valid price');
      return;
    }

    if (editSelectedSizes.length === 0) {
      setMessage('Please select at least one size');
      return;
    }

    if (!editName.trim()) {
      setMessage('Please enter a product name');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingProduct._id,
          name: editName.trim(),
          price: parsedPrice,
          category: editCategory,
          sizes: editSelectedSizes,
        }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(p => p._id === editingProduct._id ? updatedProduct : p));
        setEditingProduct(null);
        setMessage('Product updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Update failed:', response.status, errorData);
        setMessage(`Failed to update product: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('An error occurred while updating');
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditName('');
    setEditPrice('');
    setEditCategory('Mattress');
    setEditSelectedSizes([]);
    setEditCustomSize('');
    setEditShowCustomSize(false);
  };

  const toggleSizeSelection = (size: string, isEdit: boolean = false) => {
    if (isEdit) {
      setEditSelectedSizes(prev => 
        prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
      );
    } else {
      setSelectedSizes(prev => 
        prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
      );
    }
  };

  const addCustomSize = (isEdit: boolean = false) => {
    const customSizeValue = isEdit ? editCustomSize : customSize;
    if (!customSizeValue.trim()) return;

    const customSizesArray = customSizeValue.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    if (isEdit) {
      setEditSelectedSizes(prev => [...prev, ...customSizesArray.filter(s => !prev.includes(s))]);
      setEditCustomSize('');
      setEditShowCustomSize(false);
    } else {
      setSelectedSizes(prev => [...prev, ...customSizesArray.filter(s => !prev.includes(s))]);
      setCustomSize('');
      setShowCustomSize(false);
    }
  };

  const removeSize = (size: string, isEdit: boolean = false) => {
    if (isEdit) {
      setEditSelectedSizes(prev => prev.filter(s => s !== size));
    } else {
      setSelectedSizes(prev => prev.filter(s => s !== size));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSizes.length === 0) {
      setMessage('Please select at least one size');
      return;
    }
    
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('sizes', selectedSizes.join(','));
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Product created successfully!');
        setName('');
        setPrice('');
        setCategory('Mattress');
        setSelectedSizes([]);
        setCustomSize('');
        setShowCustomSize(false);
        setImages(null);
        fetchProducts(); // Refresh the products list
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to create product');
      }
    } catch {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || !session.user || (session.user as any).role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="/assets/MattresWala.jpg"
                alt="MattressWala Logo"
                className="w-16 h-16 object-contain rounded-lg"
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1aa39a] to-[#2a73af] bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Manage your mattress products</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-medium text-gray-900">{session?.user?.name || 'Admin'}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/signin' })}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1aa39a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Images</p>
                <p className="text-3xl font-bold text-gray-900">
                  {products.reduce((total, product) => total + (product.images?.length || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1aa39a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(products.flatMap(product => product.sizes)).size}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1aa39a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#1aa39a] to-[#2a73af] p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Product
                </h2>
                <p className="text-white/80 text-sm mt-1">Add a new mattress to your catalog</p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] transition-all duration-200 text-black"
                      placeholder="e.g., Luxury Memory Foam"
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      id="price"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] transition-all duration-200 text-black"
                      placeholder="29999"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Product Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] transition-all duration-200 text-black bg-white"
                    >
                      <option value="Mattress">Mattress</option>
                      <option value="Bolster">Bolster</option>
                      <option value="Cushion">Cushion</option>
                      <option value="Pillow">Pillow</option>
                      <option value="Quilts">Quilts</option>
                      <option value="Sheet">Sheet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available Sizes
                    </label>
                    
                    {/* Predefined Sizes */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {PRODUCT_SIZES[category].map((size) => (
                        <label
                          key={size}
                          className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition-all ${
                            selectedSizes.includes(size)
                              ? 'bg-[#1aa39a]/10 border-[#1aa39a] text-[#1aa39a]'
                              : 'border-gray-200 hover:border-[#1aa39a]/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => toggleSizeSelection(size)}
                            className="w-4 h-4 text-[#1aa39a] border-gray-300 rounded focus:ring-[#1aa39a]"
                          />
                          <span className="text-sm text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>

                    {/* Selected Sizes Display */}
                    {selectedSizes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                        {selectedSizes.map((size) => (
                          <span
                            key={size}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-[#1aa39a] text-white text-xs rounded-full"
                          >
                            {size}
                            <button
                              type="button"
                              onClick={() => removeSize(size)}
                              className="hover:bg-[#159089] rounded-full p-0.5"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Custom Size Option */}
                    {!showCustomSize ? (
                      <button
                        type="button"
                        onClick={() => setShowCustomSize(true)}
                        className="text-sm text-[#1aa39a] hover:text-[#159089] font-medium flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Custom Size
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customSize}
                          onChange={(e) => setCustomSize(e.target.value)}
                          placeholder="e.g., Custom 72x84"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] text-sm text-black"
                        />
                        <button
                          type="button"
                          onClick={() => addCustomSize()}
                          className="px-4 py-2 bg-[#1aa39a] text-white rounded-lg hover:bg-[#159089] text-sm font-medium"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCustomSize(false);
                            setCustomSize('');
                          }}
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={(e) => setImages(e.target.files)}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#1aa39a] file:text-white hover:file:bg-[#159089]"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Upload multiple high-quality images (max 5MB each)</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:from-[#159089] hover:to-[#24659a] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Product...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Product
                      </>
                    )}
                  </button>
                </form>

                {message && (
                  <div className={`mt-4 p-4 rounded-xl ${
                    message.includes('success')
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      {message.includes('success') ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <p className="text-sm font-medium">{message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#2a73af] to-[#1aa39a] p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Manage Products
                </h2>
                <p className="text-white/80 text-sm mt-1">Edit and manage your product catalog</p>
              </div>

              <div className="p-6">
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                    <p className="text-gray-500">Create your first product using the form on the left.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product._id} className="border border-gray-200 rounded-xl p-5 hover:border-[#1aa39a]/30 hover:shadow-md transition-all duration-200">
                        {editingProduct && editingProduct._id === product._id ? (
                          // Edit Form
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-5 h-5 text-[#1aa39a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <h3 className="text-lg font-semibold text-gray-900">Edit Product</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="text-black w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] transition-all duration-200"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="text-black w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] transition-all duration-200"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                              <select
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value as ProductCategory)}
                                className="text-black w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] transition-all duration-200 bg-white"
                              >
                                <option value="Mattress">Mattress</option>
                                <option value="Bolster">Bolster</option>
                                <option value="Cushion">Cushion</option>
                                <option value="Pillow">Pillow</option>
                                <option value="Quilts">Quilts</option>
                                <option value="Sheet">Sheet</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">Available Sizes</label>
                              
                              {/* Predefined Sizes */}
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                {PRODUCT_SIZES[editCategory].map((size) => (
                                  <label
                                    key={size}
                                    className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition-all ${
                                      editSelectedSizes.includes(size)
                                        ? 'bg-[#1aa39a]/10 border-[#1aa39a] text-[#1aa39a]'
                                        : 'border-gray-200 hover:border-[#1aa39a]/50'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={editSelectedSizes.includes(size)}
                                      onChange={() => toggleSizeSelection(size, true)}
                                      className="w-4 h-4 text-[#1aa39a] border-gray-300 rounded focus:ring-[#1aa39a]"
                                    />
                                    <span className="text-sm text-gray-700">{size}</span>
                                  </label>
                                ))}
                              </div>

                              {/* Selected Sizes Display */}
                              {editSelectedSizes.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                                  {editSelectedSizes.map((size) => (
                                    <span
                                      key={size}
                                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#1aa39a] text-white text-xs rounded-full"
                                    >
                                      {size}
                                      <button
                                        type="button"
                                        onClick={() => removeSize(size, true)}
                                        className="hover:bg-[#159089] rounded-full p-0.5"
                                      >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Custom Size Option */}
                              {!editShowCustomSize ? (
                                <button
                                  type="button"
                                  onClick={() => setEditShowCustomSize(true)}
                                  className="text-sm text-[#1aa39a] hover:text-[#159089] font-medium flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Add Custom Size
                                </button>
                              ) : (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={editCustomSize}
                                    onChange={(e) => setEditCustomSize(e.target.value)}
                                    placeholder="e.g., Custom 72x84"
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa39a]/20 focus:border-[#1aa39a] text-sm text-black"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => addCustomSize(true)}
                                    className="px-4 py-2 bg-[#1aa39a] text-white rounded-lg hover:bg-[#159089] text-sm font-medium"
                                  >
                                    Add
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditShowCustomSize(false);
                                      setEditCustomSize('');
                                    }}
                                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-3">
                              <button
                                onClick={handleUpdate}
                                className="px-6 py-2 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white rounded-lg font-medium hover:from-[#159089] hover:to-[#24659a] transition-all duration-200 flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Save Changes
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Product Display
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-start gap-4">
                                {product.images && product.images.length > 0 && (
                                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                      src={`/api/images/${product.images[0]}`}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                                      {product.category}
                                    </span>
                                  </div>
                                  <p className="text-2xl font-bold text-[#1aa39a] mb-2">₹{Math.round(product.price)}</p>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {product.sizes.map((size) => (
                                      <span
                                        key={size}
                                        className="px-3 py-1 bg-[#1aa39a]/10 text-[#1aa39a] text-xs rounded-full font-medium"
                                      >
                                        {size}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      {product.images?.length || 0} images
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      {new Date(product.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleEdit(product)}
                                className="p-2 text-[#1aa39a] hover:bg-[#1aa39a]/10 rounded-lg transition-all duration-200"
                                title="Edit product"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                title="Delete product"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}