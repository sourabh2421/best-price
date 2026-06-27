import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { HiX, HiTrash, HiMinus, HiPlus } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { business } from '../data/siteData'
import { API_URL } from '../config'

function CartModal({ isOpen, onClose, cart, setCart }) {
  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }))
  }

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0
    return sum + (price * item.quantity)
  }, 0)

  const sendWhatsAppOrder = () => {
    const orderDetails = cart.map(item => 
      `${item.name || 'Product'} x${item.quantity} - ₹${(parseFloat(item.price) || 0) * item.quantity}`
    ).join('%0A')
    
    const message = `Hi! I want to order:%0A%0A${orderDetails}%0A%0ATotal: ₹${total}%0A%0APlease confirm availability.`
    const whatsappUrl = `https://wa.me/${business.whatsappPhone}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
    setCart([])
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <h2 className="font-display text-2xl font-bold text-slate-900">Your Cart</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <HiX size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="text-slate-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-xl border border-slate-200 p-4">
                      <img
                        src={`${API_URL}/products/${item.filename}`}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-medium text-slate-900">{item.name || 'Product'}</h3>
                        <p className="text-sm font-semibold text-primary-600">₹{item.price}</p>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="rounded-lg bg-slate-100 p-1 text-slate-600 transition-colors hover:bg-slate-200"
                            >
                              <HiMinus size={16} />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="rounded-lg bg-slate-100 p-1 text-slate-600 transition-colors hover:bg-slate-200"
                            >
                              <HiPlus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 transition-colors hover:text-red-600"
                          >
                            <HiTrash size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-slate-200 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-primary-600">₹{total}</span>
                </div>
                <button
                  onClick={sendWhatsAppOrder}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-success-600 to-success-500 px-6 py-4 font-semibold text-white shadow-lg shadow-success-500/30 transition-all hover:shadow-xl"
                >
                  <FaWhatsapp size={24} />
                  Order via WhatsApp
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  You'll be redirected to WhatsApp to confirm your order
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

CartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
}

export default CartModal
