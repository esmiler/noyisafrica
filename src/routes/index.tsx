import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  ChevronDown, MapPin, Phone, Clock, Leaf, ShoppingBag, ArrowRight,
  MessageCircle, Check, Plus, Minus, Search, Layers, Navigation, Coffee, Snowflake, Zap, Flower2, Shield,
} from "lucide-react";
import heroImg from "@/assets/hero-herbs.jpg";
import manImg from "@/assets/treasure-man.jpg";
import womanImg from "@/assets/treasure-woman.jpg";
import herbsImg from "@/assets/treasure-herbs.jpg";

const WHATSAPP_PHONE = "12687700171";
const buildWhatsApp = (text?: string) => {
  const msg = text ?? "Hi Noyis Africa, I am visiting your web catalog and would love to learn more about the Treasure botanical formulas.";
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
};

const PRODUCTS = [
  {
    id: "treasure-man",
    name: "Treasure Man",
    tagline: "Male Vitality & Stamina Support",
    price: "EC$40",
    image: manImg,
    alt: "Treasure Man Caribbean herbal formula for male vitality and stamina — Noyis Africa, Antigua",
    benefits: [
      "Enhances long-term natural stamina and energy",
      "Promotes healthy vascular blood circulation",
      "Formulated for optimal baseline vitality",
    ],
    waText: "Hi Noyis Africa, I am visiting your web catalog and would love to coordinate an order for the Energy & Stamina package including Treasure Man (EC$40). Please confirm availability and delivery.",
  },
  {
    id: "treasure-woman",
    name: "Treasure Woman",
    tagline: "Hormonal Balance & Metabolic Health",
    price: "EC$40",
    image: womanImg,
    alt: "Treasure Woman herbal wellness tincture for female hormonal balance — Noyis Africa",
    benefits: [
      "Formulated for female system balance",
      "Promotes healthy vitality and natural detoxification",
      "Supports long-term immune cell health",
    ],
    waText: "Hi Noyis Africa, I am interested in securing a bottle of Treasure Woman (EC$40) for hormonal balance and metabolic support. Please share availability.",
  },
  {
    id: "treasure-herbs",
    name: "Treasure Herbs",
    tagline: "Broad-Spectrum Systemic Immunity",
    price: "EC$40",
    image: herbsImg,
    alt: "Treasure Herbs broad-spectrum Caribbean wellness formula — St John's herbal medicine",
    benefits: [
      "Deep cellular detoxification support",
      "Boosts daily immune and metabolic protection",
      "Optimizes digestive track health",
    ],
    waText: "Hi Noyis Africa, I would like to order a bottle of Treasure Herbs (EC$40) for broad-spectrum immunity and detox. Please confirm pickup or delivery.",
  },
];

const GOALS = [
  {
    id: "stamina",
    label: "Boost Energy & Stamina",
    icon: Zap,
    recommends: ["treasure-man", "treasure-herbs"],
    summary: "Restore daily drive and lasting physical endurance with our most-requested vitality stack.",
    waText: "Hi Noyis Africa, I am visiting your web catalog and would love to coordinate an order for the Energy & Stamina package including Treasure Man and Treasure Herbs. Please confirm pricing and delivery to my area.",
  },
  {
    id: "hormonal",
    label: "Hormonal Balance & Metabolism",
    icon: Flower2,
    recommends: ["treasure-woman"],
    summary: "Support hormonal markers, metabolic health, and natural detoxification for the female system.",
    waText: "Hi Noyis Africa, I'd like to order Treasure Woman (EC$40) for hormonal and metabolic balance. Please share availability.",
  },
  {
    id: "immunity",
    label: "Immunity, Detox & Digestion",
    icon: Shield,
    recommends: ["treasure-herbs"],
    summary: "Reinforce systemic immunity, cellular detoxification, and digestive performance daily.",
    waText: "Hi Noyis Africa, I'd like to order Treasure Herbs (EC$40) for immunity and full-system detox. Please confirm pickup/delivery.",
  },
];

const FAQS = [
  {
    q: "Where can I find the physical Noyis Africa boutique store?",
    a: "Our flagship health hub is situated inside the Neverland Building on Lower Nevis Street in St. John's, Antigua & Barbuda. We are located right next to the popular Cherry Jamdon Club for easy navigation.",
  },
  {
    q: "What are the primary functions of your Treasure formulas?",
    a: "Our master herbal formulas are scientifically engineered using high-quality natural ingredients to support natural energy and body stamina, promote clean blood circulation, balance endocrine and hormonal markers, strengthen immune protection, and aid in systemic digestion and deep internal detoxification.",
  },
  {
    q: "Do you sell other items alongside the flagship herbal remedies?",
    a: "Yes! To keep our local community comfortable while picking up their premium formulas, our physical storefront always keeps a fresh stock of chilled refreshments, including ice-cold Coca-Cola, to keep you cool and energized.",
  },
  {
    q: "How do I arrange delivery if I am located outside of St. John's?",
    a: "Simply click any of our live \"Order via WhatsApp\" buttons or dial our support team directly at +1 (268) 770-0171. We run regular local courier loops across the island and manage regional fulfillment infrastructure.",
  },
];

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Noyis Africa",
  description: "Premium botanical wellness and herbal health hub in St. John's, Antigua & Barbuda — Treasure Man, Treasure Woman, Treasure Herbs.",
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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { name: "description", content: "Noyis Africa — premium botanical wellness in St. John's, Antigua & Barbuda. Treasure Man, Woman & Herbs formulas. Order via WhatsApp." },
      { property: "og:url", content: "https://noyisafrica.com/" },
    ],
    links: [{ rel: "canonical", href: "https://noyisafrica.com/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessLd) },
      { type: "application/ld+json", children: JSON.stringify(faqLd) },
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
        <CommunityCorner />
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
    { href: "#selector", label: "Wellness Selector" },
    { href: "#visit", label: "Visit Us" },
    { href: "#faqs", label: "FAQs" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[#FDFBF7]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold tracking-[0.18em] text-primary">NOYIS AFRICA</span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground">Botanical Wellness</span>
        </a>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[13px] font-medium uppercase tracking-[0.14em] text-foreground/75 transition hover:text-primary">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={buildWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-accent bg-primary px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition hover:bg-primary-deep hover:shadow-[0_0_0_3px_rgba(212,175,55,0.18)] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Order via WhatsApp
          </a>
          <button
            onClick={() => setOpen(v => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
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
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wider hover:bg-muted">{l.label}</a>
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
    <section id="top" className="relative border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
            <span className="h-px w-8 bg-accent" /> Est. Antigua &amp; Barbuda
          </span>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] text-primary sm:text-6xl lg:text-[5.25rem]">
            Your Health,<br />
            <span className="italic text-primary-deep">Our Priority.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/75">
            Premium botanical wellness formulas crafted to restore vitality, support daily immunity,
            and optimize metabolic health across Antigua and the wider Caribbean region.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#products" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-primary-deep">
              Explore Formulas <ArrowRight className="h-4 w-4" />
            </a>
            <a href={buildWhatsApp("Hi Noyis Africa, I'd like an instant consult on the right Treasure formula for me.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/80 bg-transparent px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition hover:border-accent hover:text-accent">
              Instant Consult
            </a>
          </div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7 text-sm">
            {[
              { k: "100%", v: "Natural Botanical" },
              { k: "EC$40", v: "Flat Bottle Price" },
              { k: "7 Days", v: "Open 9AM – 6PM" },
            ].map(s => (
              <div key={s.v}>
                <div className="font-display text-3xl font-semibold text-primary">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-secondary" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border">
            <img
              src={heroImg}
              alt="Hand-blended Caribbean botanicals and amber tincture bottles — Noyis Africa apothecary, St John's"
              width={1280}
              height={1600}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-accent/20" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-64 rounded-2xl border border-accent/40 bg-background p-5 shadow-xl sm:block">
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">House Apothecary</div>
            <div className="mt-2 font-display text-lg leading-snug text-primary">Hand-blended in the Neverland Building, St. John's.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="border-b border-border bg-[#FDFBF7]">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">The Treasure Collection</span>
            <h2 className="mt-4 font-display text-4xl font-medium text-primary sm:text-5xl">Three signature botanical formulas.</h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground">
            Each Treasure bottle is hand-blended at EC$40, crafted to restore vitality the natural Caribbean way.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map(p => (
            <article key={p.id} className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-border bg-card transition hover:border-accent">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img src={p.image} alt={p.alt} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
                <span className="absolute right-4 top-4 rounded-full border border-accent bg-background/95 px-3.5 py-1 text-xs font-semibold tracking-widest text-primary">{p.price}</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">{p.tagline}</div>
                <h3 className="mt-3 font-display text-3xl font-medium text-primary">{p.name}</h3>
                <ul className="mt-5 flex-1 space-y-3">
                  {p.benefits.map(b => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={buildWhatsApp(p.waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition hover:bg-primary-deep"
                >
                  <ShoppingBag className="h-4 w-4" /> Secure Bottle via WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wizard() {
  const [goalId, setGoalId] = useState<string>("stamina");
  const goal = useMemo(() => GOALS.find(g => g.id === goalId)!, [goalId]);
  const recommended = useMemo(
    () => PRODUCTS.filter(p => goal.recommends.includes(p.id)),
    [goal]
  );

  return (
    <section id="selector" className="bg-[#121212] py-24 text-[#FDFBF7]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">Personalized Health Alignment Hub</span>
          <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">Tell us your wellness goal.</h2>
          <p className="mt-5 text-base leading-relaxed text-[#FDFBF7]/70">
            Select your priority and we'll align the right Treasure formula — instantly, with a personalized WhatsApp order ready to send.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {GOALS.map(g => {
            const Icon = g.icon;
            const active = goalId === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setGoalId(g.id)}
                className={`group relative flex items-start gap-4 rounded-2xl border p-6 text-left transition ${
                  active
                    ? "border-accent bg-[#FDFBF7]/[0.04] shadow-[0_0_0_1px_rgba(212,175,55,0.5)]"
                    : "border-white/15 hover:border-accent/60"
                }`}
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${active ? "border-accent bg-accent text-[#121212]" : "border-white/25 text-accent"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-xl font-medium leading-tight">{g.label}</div>
                  <div className="mt-2 text-xs leading-relaxed text-[#FDFBF7]/60">{g.summary}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-accent/40 bg-[#0A2F1D]">
          <div className="grid gap-0 lg:grid-cols-[1fr_1.4fr]">
            <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
              <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">Aligned For You</div>
              <div className="mt-3 font-display text-3xl font-medium leading-tight">{goal.label}</div>
              <p className="mt-4 text-sm leading-relaxed text-[#FDFBF7]/75">{goal.summary}</p>
              <a
                href={buildWhatsApp(goal.waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#121212] transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" /> Send Personalized Order
              </a>
            </div>
            <div className="grid gap-4 p-8 sm:grid-cols-2">
              {recommended.map(p => (
                <div key={p.id} className="rounded-2xl border border-white/15 bg-[#FDFBF7]/[0.03] p-5 transition hover:border-accent">
                  <div className="aspect-square overflow-hidden rounded-xl bg-black/30">
                    <img src={p.image} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">{p.tagline}</div>
                  <div className="mt-1 font-display text-2xl font-medium">{p.name}</div>
                  <div className="mt-1 text-xs text-[#FDFBF7]/60">{p.price} per bottle</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunityCorner() {
  return (
    <section className="border-b border-border bg-secondary py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-background p-8 sm:p-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col items-start">
            <div className="flex gap-2">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-accent text-accent"><Coffee className="h-5 w-5" /></span>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-border text-primary"><Snowflake className="h-5 w-5" /></span>
            </div>
            <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">Storefront Hospitality</span>
            <h2 className="mt-3 font-display text-3xl font-medium text-primary sm:text-4xl">Local Community Corner &amp; Cold Refreshments</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-foreground/80">
              Visiting our physical storefront in St. John's to pick up your regular botanical formulas?
              Beat the warm Caribbean sun and enjoy a crisp, ice-cold Coca-Cola or premium soft drink
              while you consult with our local health team. We stock cold baseline refreshments on-site
              for all our valued neighborhood visitors.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span>· Ice-Cold Coca-Cola</span>
              <span>· Premium Soft Drinks</span>
              <span>· Friendly On-Site Consults</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="visit" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">Find The Hub</span>
          <h2 className="mt-4 font-display text-4xl font-medium text-primary sm:text-5xl">Visit Us in St. John's</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Neverland Building · Lower Nevis Street · directly adjacent to the Cherry Jamdon Club.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Macro Regional Frame */}
          <MapFrame
            label="Antigua · Macro View"
            sub="Capital pinned: St. John's"
          >
            <svg viewBox="0 0 400 320" className="h-full w-full">
              <rect width="400" height="320" fill="#E8EEEA" />
              <path d="M0 0 H400 V320 H0 Z" fill="url(#sea)" />
              <defs>
                <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#CFE0E8" />
                  <stop offset="1" stopColor="#A9C7D4" />
                </linearGradient>
              </defs>
              {/* island shape (stylized Antigua) */}
              <path
                d="M80 140 Q120 90 180 95 Q240 80 290 110 Q340 130 330 175 Q325 215 285 230 Q235 250 180 240 Q120 235 90 200 Q70 175 80 140 Z"
                fill="#E8E1CC" stroke="#0A2F1D" strokeWidth="1.5"
              />
              {/* roads */}
              <path d="M120 170 Q200 140 290 175" stroke="#FDFBF7" strokeWidth="2" fill="none" strokeDasharray="3 3" />
              <text x="245" y="215" fill="#0A2F1D" fontSize="10" fontWeight="600" fontFamily="Montserrat">BARBUDA SEA</text>
              <text x="180" y="265" fill="#0A2F1D" fontSize="9" fontWeight="500" fontFamily="Montserrat" opacity="0.6">ANTIGUA</text>
              {/* gold pin on St John's (NW coast) */}
              <g transform="translate(135 155)">
                <circle r="18" fill="#D4AF37" opacity="0.25">
                  <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <path d="M0 -14 C8 -14 12 -8 12 -2 C12 6 0 18 0 18 C0 18 -12 6 -12 -2 C-12 -8 -8 -14 0 -14 Z" fill="#D4AF37" stroke="#0A2F1D" strokeWidth="1.5" />
                <circle r="3.5" fill="#0A2F1D" />
              </g>
              <text x="155" y="148" fill="#0A2F1D" fontSize="11" fontWeight="700" fontFamily="Montserrat">ST. JOHN'S</text>
            </svg>
          </MapFrame>

          {/* Micro Street-Level Matrix */}
          <MapFrame
            label="Lower Nevis Street · Street View"
            sub="Pin: Neverland Building"
          >
            <svg viewBox="0 0 400 320" className="h-full w-full" aria-label="Map of Noyis Africa in St. John's, Antigua">
              <rect width="400" height="320" fill="#EFEAD8" />
              {/* streets */}
              <rect x="0" y="130" width="400" height="40" fill="#FDFBF7" />
              <rect x="0" y="240" width="400" height="22" fill="#FDFBF7" />
              <rect x="90" y="0" width="34" height="320" fill="#FDFBF7" />
              <rect x="260" y="0" width="28" height="320" fill="#FDFBF7" />
              {/* lane dashes */}
              <line x1="0" y1="150" x2="400" y2="150" stroke="#D4AF37" strokeDasharray="6 6" strokeWidth="1" />
              {/* blocks */}
              <rect x="10" y="10" width="70" height="110" fill="#D7E3D8" rx="3" />
              <rect x="130" y="10" width="120" height="110" fill="#D7E3D8" rx="3" />
              <rect x="295" y="10" width="95" height="110" fill="#D7E3D8" rx="3" />
              {/* Cherry Jamdon Club */}
              <rect x="130" y="180" width="55" height="50" fill="#E2C9A8" stroke="#8a6a3a" strokeWidth="1" rx="3" />
              <text x="157" y="208" textAnchor="middle" fill="#5A4220" fontSize="7.5" fontWeight="700" fontFamily="Montserrat">CHERRY</text>
              <text x="157" y="218" textAnchor="middle" fill="#5A4220" fontSize="7.5" fontWeight="700" fontFamily="Montserrat">JAMDON</text>
              {/* Neverland Building — highlighted */}
              <rect x="190" y="180" width="60" height="50" fill="#0A2F1D" rx="3" />
              <text x="220" y="205" textAnchor="middle" fill="#FDFBF7" fontSize="8" fontWeight="700" fontFamily="Montserrat">NEVERLAND</text>
              <text x="220" y="216" textAnchor="middle" fill="#D4AF37" fontSize="6.5" fontWeight="600" fontFamily="Montserrat">BUILDING</text>
              <rect x="295" y="180" width="95" height="50" fill="#D7E3D8" rx="3" />
              <rect x="10" y="270" width="380" height="40" fill="#D7E3D8" rx="3" />
              {/* labels */}
              <text x="200" y="148" textAnchor="middle" fill="#0A2F1D" fontSize="10" fontWeight="700" fontFamily="Montserrat" letterSpacing="1">LOWER NEVIS STREET</text>
              <text x="107" y="320" textAnchor="middle" fill="#0A2F1D" fontSize="7" fontWeight="600" fontFamily="Montserrat" opacity="0.7">ST MARY'S</text>
              {/* red pinpoint on Neverland */}
              <g transform="translate(220 175)">
                <circle r="14" fill="#D7263D" opacity="0.2">
                  <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <path d="M0 -12 C7 -12 11 -7 11 -2 C11 5 0 16 0 16 C0 16 -11 5 -11 -2 C-11 -7 -7 -12 0 -12 Z" fill="#D7263D" stroke="#FDFBF7" strokeWidth="2" />
                <circle r="3" fill="#FDFBF7" />
              </g>
              {/* callout */}
              <g>
                <rect x="252" y="245" width="138" height="32" rx="6" fill="#FDFBF7" stroke="#0A2F1D" strokeWidth="1" />
                <text x="259" y="259" fill="#0A2F1D" fontSize="8" fontWeight="700" fontFamily="Montserrat">NOYIS AFRICA</text>
                <text x="259" y="270" fill="#5A5A5A" fontSize="7" fontFamily="Montserrat">Adjacent to Cherry Jamdon Club</text>
              </g>
            </svg>
          </MapFrame>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <InfoCard icon={<MapPin className="h-5 w-5" />} title="Address">
            Neverland Building, Lower Nevis Street<br />
            St. John's, Antigua &amp; Barbuda<br />
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">By Cherry Jamdon Club</span>
          </InfoCard>
          <InfoCard icon={<Phone className="h-5 w-5" />} title="Hotlines">
            <div className="space-y-1.5">
              {["+1 (268) 770-0171", "+1 (268) 719-2579", "+1 (268) 721-0101"].map(n => (
                <a key={n} href={`tel:${n.replace(/\D/g, "")}`} className="block font-medium transition hover:text-accent">{n}</a>
              ))}
            </div>
          </InfoCard>
          <InfoCard icon={<Clock className="h-5 w-5" />} title="Open Daily">
            Monday – Sunday<br />
            <span className="font-display text-xl text-primary">9:00 AM – 6:00 PM</span>
          </InfoCard>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Neverland+Building+Lower+Nevis+Street+St+John%27s+Antigua"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#121212] transition hover:brightness-110"
          >
            <Navigation className="h-4 w-4" /> Open Live Navigation Directions
          </a>
        </div>
      </div>
    </section>
  );
}

function MapFrame({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* search bar */}
      <div className="absolute left-3 right-3 top-3 z-10 flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 shadow-sm backdrop-blur">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Search Google Maps...</span>
      </div>
      {/* map */}
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-secondary">
        {children}
      </div>
      {/* zoom + satellite controls */}
      <div className="absolute bottom-16 right-3 z-10 flex flex-col overflow-hidden rounded-md border border-border bg-background shadow-md">
        <button aria-label="Zoom in" className="grid h-8 w-8 place-items-center border-b border-border text-primary hover:bg-muted"><Plus className="h-4 w-4" /></button>
        <button aria-label="Zoom out" className="grid h-8 w-8 place-items-center text-primary hover:bg-muted"><Minus className="h-4 w-4" /></button>
      </div>
      <div className="absolute bottom-16 left-3 z-10 flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-primary shadow-md">
        <Layers className="h-3.5 w-3.5" /> Satellite
        <span className="ml-1 inline-flex h-4 w-7 items-center rounded-full bg-muted">
          <span className="ml-0.5 h-3 w-3 rounded-full bg-primary" />
        </span>
      </div>
      {/* footer caption */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-4 py-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">{label}</div>
          <div className="text-xs text-muted-foreground">{sub}</div>
        </div>
        <Leaf className="h-4 w-4 text-primary" />
      </div>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-accent text-accent">{icon}</span>
        <h3 className="font-display text-xl font-medium text-primary">{title}</h3>
      </div>
      <div className="mt-4 text-[15px] leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faqs" className="bg-secondary py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">Helpful Answers</span>
          <h2 className="mt-4 font-display text-4xl font-medium text-primary sm:text-5xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border" itemScope itemType="https://schema.org/FAQPage">
          {FAQS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <article
                key={f.q}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span itemProp="name" className="font-display text-lg font-medium text-primary sm:text-xl">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${isOpen ? "border-accent bg-accent text-[#121212]" : "border-border text-primary"}`}>
                    <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {isOpen && (
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="pb-6 pr-12">
                    <p itemProp="text" className="text-[15px] leading-relaxed text-foreground/75">{f.a}</p>
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
    <footer className="bg-[#121212] py-16 text-[#FDFBF7]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="font-display text-2xl font-semibold tracking-[0.18em]">NOYIS AFRICA</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-accent">Botanical Wellness</div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#FDFBF7]/65">
            Premium Caribbean herbal wellness, hand-blended in the Neverland Building, St. John's, Antigua &amp; Barbuda.
          </p>
        </div>
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-accent">Visit</h3>
          <p className="mt-4 text-sm leading-relaxed text-[#FDFBF7]/80">
            Neverland Building<br />Lower Nevis Street<br />St. John's, Antigua &amp; Barbuda<br />
            <span className="text-[#FDFBF7]/55">By Cherry Jamdon Club</span>
          </p>
        </div>
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-accent">Contact</h3>
          <div className="mt-4 space-y-1.5 text-sm text-[#FDFBF7]/80">
            <div>+1 (268) 770-0171</div>
            <div>+1 (268) 719-2579</div>
            <div>+1 (268) 721-0101</div>
            <div className="pt-2 text-[#FDFBF7]/55">Daily · 9:00 AM – 6:00 PM</div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-5 pt-6 text-xs text-[#FDFBF7]/45 sm:px-8">
        © {new Date().getFullYear()} Noyis Africa · All rights reserved.
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
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-accent text-[#121212] shadow-2xl ring-4 ring-accent/20 transition hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
