import { lazy, Suspense } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Circle } from 'lucide-react'
import Navbar from '../components/Navbar'
import ScrollProgressBar from '../components/ScrollProgressBar'
import { getCategoryBySlug } from '../data/products'
import { getProductIcon } from '../data/productIcons'

const Footer = lazy(() => import('../components/Footer'))
const FloatingWhatsApp = lazy(() => import('../components/FloatingWhatsApp'))
const ScrollToTopButton = lazy(() => import('../components/ScrollToTopButton'))

function ProductCategoryPage() {
  const { category } = useParams()
  const product = getCategoryBySlug(category ?? '')

  if (!product) {
    return <Navigate to="/" replace />
  }

  const Icon = getProductIcon(product.icon)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <ScrollProgressBar />
      <Navbar />
      <main className="overflow-x-hidden pt-24 pb-20 md:pt-28 md:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Products
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex rounded-xl bg-amber-50 p-3 text-amber-500">
              <Icon size={32} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h1 className="mt-5 font-display text-3xl font-bold text-neutral-900 md:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              {product.description}
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.items.map((item) => (
              <article
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <Circle
                  size={8}
                  fill="currentColor"
                  className="mt-2 shrink-0 text-amber-500"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium leading-relaxed text-neutral-800 md:text-base">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ScrollToTopButton />
        <FloatingWhatsApp />
      </Suspense>
    </div>
  )
}

export default ProductCategoryPage
