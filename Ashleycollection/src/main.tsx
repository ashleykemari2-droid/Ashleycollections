import { StrictMode, useState, type FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

type Product = {
  name: string
  category: string
  price: string
  image: string
  label?: string
}

const products: Product[] = [
  {
    name: 'The Everyday Trainer',
    category: 'Shoes',
    price: 'KSh 4,800',
    image: 'photo-1542291026-7eec264c27ff',
    label: 'Bestseller',
  },
  {
    name: 'Soft Form Shirt',
    category: 'Clothing',
    price: 'KSh 3,200',
    image: 'photo-1598033129183-c4f50c736f10',
    label: 'New arrival',
  },
  {
    name: 'Sunday Market Tote',
    category: 'Bags',
    price: 'KSh 2,600',
    image: 'photo-1590874103328-eac38a683ce7',
  },
  {
    name: 'Linen Blend Bedding',
    category: 'Home',
    price: 'KSh 6,500',
    image: 'photo-1631049307264-da0ec9d70304',
    label: 'Customer favourite',
  },
  {
    name: 'City Edit Loafer',
    category: 'Shoes',
    price: 'KSh 5,400',
    image: 'photo-1543163521-1bf539c55dd2',
  },
  {
    name: 'The Weekend Layer',
    category: 'Clothing',
    price: 'KSh 4,100',
    image: 'photo-1483985988355-763728e1935b',
  },
  {
    name: 'Everyday Crossbody',
    category: 'Bags',
    price: 'KSh 3,900',
    image: 'photo-1584917865442-de89df76afd3',
  },
  {
    name: 'Calm Morning Curtains',
    category: 'Home',
    price: 'KSh 4,700',
    image: 'photo-1616486338812-3dadae4b4ace',
  },
]

const categories = ['All pieces', 'Shoes', 'Clothing', 'Bags', 'Home']

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M4.5 8h15l1 12h-17l1-12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [cartCount, setCartCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [formSent, setFormSent] = useState(false)
  const visibleProducts =
    activeCategory === 'All pieces'
      ? products
      : products.filter((product) => product.category === activeCategory)

  function addToBag(productName: string) {
    setCartCount((count) => count + 1)
    setNotice(`${productName} added to your bag`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormSent(true)
    event.currentTarget.reset()
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <div className="announcement">
        A little something for your everyday <span>—</span> now in Kisii
      </div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Ashley Collection home" onClick={closeMenu}>
          <span>ASHLEY</span>
          <span className="wordmark-subtitle">COLLECTION</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#about" onClick={closeMenu}>About us</a>
          <a href="#contact" onClick={closeMenu}>Contact us</a>
        </nav>
        <a className="bag-link" href="#gallery" aria-label={`Shopping bag, ${cartCount} items`}>
          <BagIcon />
          <span className="bag-label">Bag</span>
          <span className="bag-count">{cartCount}</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85"
            alt="Thoughtfully styled everyday fashion in warm, natural light"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow light-eyebrow">THE GOOD THINGS, GATHERED</p>
            <h1>Find your<br />everyday lovely.</h1>
            <p className="hero-description">
              A thoughtful mix of style and comfort for you, your home, and all the days in between.
            </p>
            <a className="button button-light" href="#gallery">Explore the collection <ArrowIcon /></a>
          </div>
          <div className="hero-caption"><span>01</span> A more considered kind of everyday</div>
        </section>

        <section className="collection section-wrap" id="gallery">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2>Pieces to keep close.</h2>
            </div>
            <p className="section-note">Well-loved essentials, picked with you in mind.</p>
          </div>
          <div className="category-list" aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'category-button active' : 'category-button'}
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-image-wrap">
                  <img
                    src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=850&q=80`}
                    alt={product.name}
                    loading="lazy"
                  />
                  {product.label && <span className="product-label">{product.label}</span>}
                  <button className="quick-add" type="button" onClick={() => addToBag(product.name)}>
                    Add to bag <span aria-hidden="true">+</span>
                  </button>
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <p className="product-price">{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
              alt="A warmly styled home with thoughtfully chosen furnishings"
              loading="lazy"
            />
            <span className="image-note">Make room for the good things.</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">A LITTLE ABOUT US</p>
            <h2>Good style should feel like you.</h2>
            <p>
              Ashley Collection is your neighbourhood destination for pieces that make
              everyday life feel a little more special. From a favourite new outfit to
              the finishing touch your home has been waiting for, we bring together
              thoughtful finds for every part of your day.
            </p>
            <p>
              We believe shopping should feel personal, welcoming, and easy. Come in,
              have a look around, and find something you’ll love living with.
            </p>
            <a className="text-link" href="#contact">Come say hello <ArrowIcon /></a>
          </div>
        </section>

        <section className="visit section-wrap" id="contact">
          <div className="visit-heading">
            <p className="eyebrow">FIND YOUR WAY TO US</p>
            <h2>There’s a place<br />for you in Kisii.</h2>
            <p>We’d love to see you. Stop by, explore the collection, and let us help you find just the right thing.</p>
            <div className="store-details">
              <div>
                <span className="detail-label">OUR LOCATION</span>
                <p>Kisii, Kenya</p>
              </div>
              <div>
                <span className="detail-label">GET IN TOUCH</span>
                <a href="mailto:hello@ashleycollection.co.ke">hello@ashleycollection.co.ke</a>
              </div>
              <div>
                <span className="detail-label">OPENING HOURS</span>
                <p>Monday – Saturday, 9:00 am – 6:00 pm</p>
              </div>
            </div>
          </div>
          <div className="map-wrap">
            <iframe
              title="Map showing Kisii, Kenya"
              src="https://maps.google.com/maps?q=Kisii%2C%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="map-directions"
              href="https://www.google.com/maps/search/?api=1&query=Kisii%2C+Kenya"
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="contact-strip">
          <div>
            <p className="eyebrow">A NOTE FROM US</p>
            <h2>Good things, straight to your inbox.</h2>
            <p>New finds, little updates, and a reason to treat yourself.</p>
          </div>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="email">Your email address</label>
            <input id="email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe"><ArrowIcon /></button>
            {formSent && <p className="form-message" role="status">Thank you for getting in touch.</p>}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#home">
          <span>ASHLEY</span>
          <span className="wordmark-subtitle">COLLECTION</span>
        </a>
        <p>Considered style for everyday living.</p>
        <span className="copyright">© {new Date().getFullYear()} Ashley Collection</span>
      </footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
