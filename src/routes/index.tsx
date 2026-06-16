import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ChevronDown, MapPin, Phone, Clock, Leaf, ShoppingBag, Sparkles, ArrowRight, MessageCircle, Check } from "lucide-react";
import heroImg from "@/assets/hero-herbs.jpg";
import manImg from "@/assets/treasure-man.jpg";
import womanImg from "@/assets/treasure-woman.jpg";
import herbsImg from "@/assets/treasure-herbs.jpg";

const WHATSAPP_PHONE = "12687700171";
const buildWhatsApp = (product?: string) => {
  const text = product
    ? `Hi Noyis Africa, I am interested in *${product}* (EC$40). Please share availability and delivery details.`
    : `Hi Noyis Africa, I am interested in your Treasure herbal formulas. Please share more info.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

const PRODUCTS = [
  {
    id: "treasure-man",
    name: "Treasure Man",
    tagline: "Male Vitality & Stamina",
    price: "EC$40",
    image: manImg,
    alt: "Treasure Man Caribbean herbal formula for male vitality — Noyis Africa, Antigua",
    benefits: [
      "Supports stamina and lasting energy",
      "Promotes healthy blood circulation",
      "Boosts long-term reproductive health",
      "Crafted from premium natural herbs",
    ],
  },
  {
    id: "treasure-woman",
    name: "Treasure Woman",
    tagline: "Hormonal Balance & Vitality",
    price: "EC$40",
    image: womanImg,
    alt: "Treasure Woman herbal wellness tincture for female hormonal balance — Noyis Africa",
    benefits: [
      "Supports natural hormonal balance",
      "Boosts metabolic function",
      "Aids gentle full-body detoxification",
      "Restores everyday vitality",
    ],
  },
  {
    id: "treasure-herbs",
    name: "Treasure Herbs",
    tagline: "Broad-Spectrum Wellness",
    price: "EC$40",
    image: herbsImg,
    alt: "Treasure Herbs broad-spectrum Caribbean wellness formula — St John's herbal medicine",
    benefits: [
      "Strengthens immune defense",
      "Optimizes digestive health",
      "Supports daily detoxification",
      "Premium full-system wellness",
    ],
  },
];

const FAQS = [
  {
    q: "Where is Noyis Africa physically located?",
    a: "We are located in the Neverland Building on Lower Nevis Street in St. John's, Antigua & Barbuda. You can easily find us right by the Cherry Jamdon Club.",
  },
  {
    q: "What are the main benefits of the Treasure herbal formulas?",
    a: "Our premium natural formulas are crafted to support energy and stamina, promote healthy blood circulation, support hormonal balance, boost immune function, and aid in digestive health and full-body detoxification.",
  },
  {
    q: "How much does a bottle cost, and what currency is used?",
    a: "Each bottle of Treasure Man, Treasure Woman, or Treasure Herbs is priced at a flat rate of EC$40 (Eastern Caribbean Dollars).",
  },
  {
    q: "How can I place an order from another part of Antigua or the Caribbean?",
    a: `Placing an order is simple! Click any of our "Order via WhatsApp" buttons or call us directly at +1 (268) 770-0171 or +1 (268) 721-0101. We coordinate local delivery and regional fulfillment logistics.`,
  },
  {
    q: "What are your opening hours?",
    a: "We are open every single day, Monday through Sunday, from 9:00 AM to 6:00 PM to serve your wellness needs.",
  },
];

const GOALS = [
  { id: "vitality", label: "Energy, stamina & vitality", recommends: "treasure-man" },
  { id: "hormonal", label: "Hormonal balance & metabolism", recommends: "treasure-woman" },
  { id: "immune", label: "Immunity, digestion & detox", recommends: "treasure-herbs" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Noyis Africa",
  description: "Premium Caribbean natural wellness and herbal health hub offering Treasure Man, Treasure Woman, and Treasure Herbs formulas.",
  image: "https://noyisafrica.com/hero.jpg",
  telephone: ["+1-268-770-0171", "+1-268-719-2579", "+1-268-721-0101"],
  priceRange: "EC$40",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Neverland Building, Lower Nevis Street",
    addressLocality: "St. John's",
    addressCountry: "AG",
  },
  geo: { "@type": "GeoCoordinates", latitude: 17.1175, longitude: -61.8456 },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "09:00", closes: "18:00",
  }],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Treasure Herbal Formulas",
    itemListElement: PRODUCTS.map(p => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: p.name, description: p.tagline },
      price: "40.00",
      priceCurrency: "XCD",
    })),
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noyis Africa — Premium Caribbean Herbal Wellness | St. John's, Antigua" },
      { name: "description", content: "Antigua natural remedies & St. John's herbal medicine. Premium Treasure formulas — order via WhatsApp from Noyis Africa, Neverland Building." },
      { property: "og:title", content: "Noyis Africa — Your Health, Our Priority" },
      { property: "og:description", content: "Premium Caribbean wellness formulas. Treasure Man, Treasure Woman & Treasure Herbs — EC$40 per bottle." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Products />
        <Wizard />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#products", label: "Products" },
    { href: "#location", label: "Location" },
    { href: "#faqs", label: "FAQs" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-primary">Noyis Africa</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 transition hover:text-primary">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={buildWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-deep sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Order via WhatsApp
          </a>
          <button
            onClick={() => setOpen(v => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border md:hidden"
            aria-label="Toggle menu"
          >
            <ChevronDown className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">{l.label}</a>
            ))}
            <a href={buildWhatsApp()} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              <MessageCircle className="h-4 w-4" />
              Order via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-deep via-primary to-[oklch(0.4_0.08_155)]" />
      <div className="absolute inset-0 -z-10 opacity-25 mix-blend-overlay">
        <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div className="text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" /> St. John's · Antigua & Barbuda
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Your Health,<br />
            <span className="italic text-[oklch(0.88_0.09_85)]">Our Priority.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85 sm:text-xl">
            Premium Caribbean wellness formulas crafted from nature's most powerful herbs.
            Trusted Antigua natural remedies — bottled with care in the Neverland Building.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#products" className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.96_0.022_85)] px-7 py-3.5 text-base font-semibold text-primary-deep shadow-lg transition hover:bg-white">
              Explore Products <ArrowRight className="h-4 w-4" />
            </a>
            <a href={buildWhatsApp()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition hover:brightness-110">
              <MessageCircle className="h-4 w-4" /> Order Now
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-primary-foreground/15 pt-6 text-sm">
            {[
              { k: "100%", v: "Natural Herbs" },
              { k: "EC$40", v: "Flat Pricing" },
              { k: "7 days", v: "Open Weekly" },
            ].map(s => (
              <div key={s.v}>
                <div className="font-display text-2xl font-bold text-[oklch(0.92_0.06_85)]">{s.k}</div>
                <div className="text-primary-foreground/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 rounded-3xl bg-accent/30 blur-3xl" />
          <img
            src={heroImg}
            alt="Fresh Caribbean herbs and amber herbal tincture bottles — Noyis Africa premium wellness"
            width={1536}
            height={1024}
            className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-primary-foreground/20"
          />
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">The Treasure Collection</span>
        <h2 className="mt-3 font-display text-4xl font-bold text-primary sm:text-5xl">Premium Caribbean wellness, bottled.</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Three signature formulas — each EC$40, each crafted to restore vitality the natural way.
        </p>
      </div>
      <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map(p => (
          <article key={p.id} className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <img src={p.image} alt={p.alt} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute right-4 top-4 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-md">{p.price}</span>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">{p.tagline}</div>
              <h3 className="mt-2 font-display text-2xl font-bold text-primary">{p.name}</h3>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.benefits.map(b => (
                  <li key={b} className="flex gap-2.5 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href={buildWhatsApp(p.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep"
              >
                <ShoppingBag className="h-4 w-4" /> Order {p.name}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Wizard() {
  const [goal, setGoal] = useState<string | null>(null);
  const recommended = useMemo(
    () => PRODUCTS.find(p => p.id === GOALS.find(g => g.id === goal)?.recommends),
    [goal]
  );

  return (
    <section className="bg-primary-deep py-24 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.85_0.1_85)]">Find Your Treasure</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Tell us your wellness goal.</h2>
          <p className="mt-4 max-w-md text-primary-foreground/80">
            Answer one question and we'll match you with the perfect Treasure formula —
            then send your order straight to WhatsApp.
          </p>
        </div>
        <div className="rounded-3xl bg-background p-7 text-foreground shadow-2xl sm:p-9">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Step 1 — Your Goal</div>
          <div className="mt-4 space-y-3">
            {GOALS.map(g => (
              <button
                key={g.id}
                onClick={() => setGoal(g.id)}
                className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 text-left transition ${
                  goal === g.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium">{g.label}</span>
                <span className={`grid h-6 w-6 place-items-center rounded-full border-2 ${goal === g.id ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                  {goal === g.id && <Check className="h-3.5 w-3.5" />}
                </span>
              </button>
            ))}
          </div>
          {recommended && (
            <div className="mt-6 rounded-2xl border border-primary/20 bg-secondary p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">We Recommend</div>
              <div className="mt-1 font-display text-2xl font-bold text-primary">{recommended.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{recommended.tagline} · {recommended.price}</p>
              <a
                href={buildWhatsApp(recommended.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" /> Send my order on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Come Visit</span>
        <h2 className="mt-3 font-display text-4xl font-bold text-primary sm:text-5xl">Visit Us in St. John's</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Find Noyis Africa in the heart of Antigua's capital — Neverland Building on Lower Nevis Street, right by the Cherry Jamdon Club.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <InfoCard icon={<MapPin className="h-5 w-5" />} title="Address">
            Neverland Building, Lower Nevis Street<br />
            St. John's, Antigua & Barbuda<br />
            <span className="text-sm text-muted-foreground">Landmark: By Cherry Jamdon Club</span>
          </InfoCard>
          <InfoCard icon={<Phone className="h-5 w-5" />} title="Call Us">
            <div className="space-y-1.5">
              {["+1 (268) 770-0171", "+1 (268) 719-2579", "+1 (268) 721-0101"].map(n => (
                <a key={n} href={`tel:${n.replace(/\D/g, "")}`} className="block font-medium transition hover:text-primary">{n}</a>
              ))}
            </div>
          </InfoCard>
          <InfoCard icon={<Clock className="h-5 w-5" />} title="Opening Hours">
            Monday – Sunday<br />
            <span className="font-semibold text-primary">9:00 AM – 6:00 PM</span>
          </InfoCard>
        </div>

        {/* Stylized structural map */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary p-2 shadow-sm">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[oklch(0.94_0.025_85)]">
            <svg viewBox="0 0 400 500" className="h-full w-full" aria-label="Map of Noyis Africa in St. John's, Antigua">
              {/* streets */}
              <rect x="0" y="0" width="400" height="500" fill="oklch(0.94 0.025 85)" />
              <path d="M0 180 L400 220" stroke="oklch(0.85 0.02 85)" strokeWidth="22" />
              <path d="M0 320 L400 340" stroke="oklch(0.85 0.02 85)" strokeWidth="18" />
              <path d="M120 0 L160 500" stroke="oklch(0.85 0.02 85)" strokeWidth="24" />
              <path d="M290 0 L310 500" stroke="oklch(0.85 0.02 85)" strokeWidth="16" />
              {/* blocks */}
              <rect x="20" y="20" width="80" height="140" fill="oklch(0.88 0.03 150)" opacity="0.5" rx="4" />
              <rect x="180" y="20" width="90" height="140" fill="oklch(0.88 0.03 150)" opacity="0.5" rx="4" />
              <rect x="330" y="20" width="60" height="140" fill="oklch(0.88 0.03 150)" opacity="0.5" rx="4" />
              <rect x="20" y="240" width="80" height="60" fill="oklch(0.88 0.03 150)" opacity="0.5" rx="4" />
              <rect x="330" y="240" width="60" height="60" fill="oklch(0.88 0.03 150)" opacity="0.5" rx="4" />
              <rect x="20" y="360" width="80" height="120" fill="oklch(0.88 0.03 150)" opacity="0.5" rx="4" />
              <rect x="330" y="360" width="60" height="120" fill="oklch(0.88 0.03 150)" opacity="0.5" rx="4" />
              {/* highlighted block — Neverland building */}
              <rect x="180" y="240" width="90" height="60" fill="oklch(0.34 0.07 155)" rx="6" />
              <text x="225" y="275" textAnchor="middle" fill="oklch(0.98 0.012 85)" fontSize="11" fontWeight="700" fontFamily="Inter">NEVERLAND</text>
              {/* street labels */}
              <text x="350" y="210" fill="oklch(0.45 0.025 140)" fontSize="9" fontWeight="600">LOWER NEVIS ST</text>
              <text x="140" y="100" fill="oklch(0.45 0.025 140)" fontSize="9" fontWeight="600" transform="rotate(90 140 100)">ST. MARY'S ST</text>
              {/* pin */}
              <g transform="translate(225 200)">
                <circle r="22" fill="oklch(0.66 0.14 50)" opacity="0.25">
                  <animate attributeName="r" values="22;32;22" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle r="12" fill="oklch(0.66 0.14 50)" stroke="white" strokeWidth="3" />
                <circle r="4" fill="white" />
              </g>
            </svg>
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-xl bg-background/95 p-4 shadow-md backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><MapPin className="h-4 w-4" /></span>
                <div className="min-w-0">
                  <div className="font-display text-sm font-bold text-primary">Noyis Africa</div>
                  <div className="text-xs text-muted-foreground">Neverland Building · by Cherry Jamdon Club</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
        <h3 className="font-display text-lg font-bold text-primary">{title}</h3>
      </div>
      <div className="mt-3 text-foreground/85">{children}</div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faqs" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Helpful Answers</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-primary sm:text-5xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-12 space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {FAQS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <article
                key={f.q}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span itemProp="name" className="font-display text-base font-semibold text-primary sm:text-lg">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="px-5 pb-5">
                    <p itemProp="text" className="text-foreground/80 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-deep py-14 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[oklch(0.96_0.022_85)] text-primary-deep">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">Noyis Africa</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Premium Caribbean herbal wellness, bottled with care in St. John's, Antigua & Barbuda.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-[oklch(0.85_0.1_85)]">Visit</h4>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Neverland Building<br />Lower Nevis Street<br />St. John's, Antigua & Barbuda
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-[oklch(0.85_0.1_85)]">Contact</h4>
          <div className="mt-3 space-y-1 text-sm text-primary-foreground/80">
            <div>+1 (268) 770-0171</div>
            <div>+1 (268) 719-2579</div>
            <div>+1 (268) 721-0101</div>
            <div className="pt-1">Daily · 9:00 AM – 6:00 PM</div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-primary-foreground/15 px-5 pt-6 text-xs text-primary-foreground/60 sm:px-8">
        © {new Date().getFullYear()} Noyis Africa. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order via WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-2xl ring-4 ring-accent/20 transition hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
