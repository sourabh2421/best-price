import { lazy, Suspense } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ScrollProgressBar from './components/ScrollProgressBar'

const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Products = lazy(() => import('./components/Products'))
const Reviews = lazy(() => import('./components/Reviews'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const FloatingWhatsApp = lazy(() => import('./components/FloatingWhatsApp'))
const ScrollToTopButton = lazy(() => import('./components/ScrollToTopButton'))

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <ScrollProgressBar />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Services />
          <Products />
          <Reviews />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ScrollToTopButton />
        <FloatingWhatsApp />
      </Suspense>
    </div>
  )
}

export default App
