import { Nav } from '@/components/site/Nav'
import { Hero } from '@/components/site/Hero'
import { Products } from '@/components/site/Products'
import { About } from '@/components/site/About'
import { Contact } from '@/components/site/Contact'
import { Footer } from '@/components/site/Footer'
import { Videos } from '@/components/site/Videos'

function App() {
  return (
    <div className="min-h-screen w-full bg-background">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Videos />
        <Products />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
