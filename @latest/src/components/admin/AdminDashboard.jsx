import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { HiUpload, HiTrash, HiLogout } from 'react-icons/hi'
import { API_URL } from '../../config'

function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [productDetails, setProductDetails] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)

    // Create previews
    const previewUrls = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file,
      index,
    }))
    setPreviews(previewUrls)
    
    // Initialize product details
    setProductDetails(files.map(() => ({ name: '', price: '' })))
  }

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...productDetails]
    newDetails[index] = { ...newDetails[index], [field]: value }
    setProductDetails(newDetails)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)
    setMessage('')

    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append('images', file)
      })
      
      // Send as array indexed by position
      const detailsArray = productDetails.reduce((acc, detail, index) => {
        acc[index] = detail
        return acc
      }, {})
      
      formData.append('productDetails', JSON.stringify(detailsArray))

      const response = await fetch(`${API_URL}/api/admin/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (response.ok) {
        setMessage('✓ Upload successful!')
        setSelectedFiles([])
        setPreviews([])
        setProductDetails([])
        fetchProducts()
        document.getElementById('file-input').value = ''
      } else {
        setMessage('✗ Upload failed')
      }
    } catch (error) {
      setMessage('✗ Connection error')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return

    try {
      const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const clearPreviews = () => {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url))
    setPreviews([])
    setSelectedFiles([])
    setProductDetails([])
    document.getElementById('file-input').value = ''
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900">Product Manager</h1>
            <p className="mt-1 text-slate-600">Upload and manage product images</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <HiLogout size={18} />
            Logout
          </button>
        </div>

        {/* Upload Section */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-display text-xl font-semibold text-slate-900">Upload Products</h2>

          <div className="mb-4">
            <label
              htmlFor="file-input"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-slate-600 transition-colors hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600"
            >
              <HiUpload size={24} />
              <span className="font-medium">Click to select images (JPG, PNG, WEBP)</span>
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Previews with Details */}
          {previews.length > 0 && (
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">
                  {previews.length} file(s) selected
                </p>
                <button
                  onClick={clearPreviews}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-4">
                {previews.map((preview, index) => (
                  <div key={index} className="flex gap-4 rounded-xl border border-slate-200 p-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 gap-3">
                      <div className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Product Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., iPhone 14 Pro Case"
                          value={productDetails[index]?.name || ''}
                          onChange={(e) => handleDetailChange(index, 'name', e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                      </div>
                      <div className="w-32">
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Price (₹)
                        </label>
                        <input
                          type="text"
                          placeholder="299"
                          value={productDetails[index]?.price || ''}
                          onChange={(e) => handleDetailChange(index, 'price', e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading}
              className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Products'}
            </button>
            {message && (
              <span className={`text-sm font-medium ${message.startsWith('✓') ? 'text-success-600' : 'text-red-600'}`}>
                {message}
              </span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-display text-xl font-semibold text-slate-900">
            Current Products ({products.length})
          </h2>

          {products.length === 0 ? (
            <p className="py-8 text-center text-slate-500">No products uploaded yet</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-xl border border-slate-200"
                >
                  <img
                    src={`${API_URL}/products/${product.filename}`}
                    alt={product.name || 'Product'}
                    className="aspect-square w-full object-cover"
                  />
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white opacity-0 shadow-lg transition-opacity hover:bg-red-600 group-hover:opacity-100"
                  >
                    <HiTrash size={16} />
                  </button>
                  <div className="border-t border-slate-200 bg-white p-2">
                    <p className="truncate text-xs font-medium text-slate-900">
                      {product.name || 'Untitled'}
                    </p>
                    {product.price && (
                      <p className="text-xs font-semibold text-primary-600">₹{product.price}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

AdminDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default AdminDashboard
