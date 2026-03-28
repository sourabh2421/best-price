import About from './components/About'
import Contact from './components/Contact'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'
import Reviews from './components/Reviews'
import ScrollToTopButton from './components/ScrollToTopButton'
import ScrollProgressBar from './components/ScrollProgressBar'
import Services from './components/Services'

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <ScrollProgressBar />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Services />
        <Products />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
