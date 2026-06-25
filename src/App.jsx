/*
  Ridgewood Auto Electrical CC — Landing Page

  Positioning: Pretoria East's longest-established independent auto electrical
  specialist. Owner-direct expertise as the primary trust signal, not service breadth.

  Top trust signals: 35+ years Est. 1989, RMI 5-Star Approved, MIWA Member,
  owner-operated diagnostics, Mercedes-Benz specialist depth

  Primary CTA: Phone call to 012 361 6836 — placed in hero, sticky nav, and
  contact section as tap-to-call. Direct phone is the lowest-friction path for
  this audience (35-65, premium vehicle owners who want to speak to a person).

  Font pairing: Space Grotesk (headings) + Plus Jakarta Sans (body).
  Space Grotesk is technical and precise without being cold, matching the
  "precision engineering" aesthetic the brief calls for. Plus Jakarta Sans
  is warm and legible for body copy.

  Accent colour: #1A1A2E (deep navy) — applied to CTA buttons, headings,
  quote marks on testimonials, section labels, hover states. Used sparingly
  against near-white backgrounds for maximum contrast and authority.
*/

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SalesBar from "./components/SalesBar"
import "./index.css"

const img = (p) => import.meta.env.BASE_URL + p.replace(/^\//, "")

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

/* ─── Navigation ─────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-8 flex items-center justify-between h-20">
        <a href="#" className="font-display font-bold text-xl tracking-tight text-navy">
          Ridgewood Auto Electrical
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-sm text-[#111827] hover:text-navy transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:0123616836"
            className="inline-flex items-center justify-center min-h-[44px] px-6 bg-navy text-white text-sm font-semibold font-body rounded transition-all hover:bg-[#12122a] active:scale-[0.98]"
          >
            Call 012 361 6836
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-navy"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex flex-col items-center justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 min-w-[44px] min-h-[44px] flex items-center justify-center text-white"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
                <path d="M2 2l16 16M18 2L2 18" />
              </svg>
            </button>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl text-white hover:text-white/70 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:0123616836"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center min-h-[52px] px-8 bg-white text-navy text-lg font-semibold font-body rounded transition-all hover:bg-white/90"
            >
              Call 012 361 6836
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ─── Vanta NET Hero ─────────────────────────────────────────── */
function VantaHero() {
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)

  useEffect(() => {
    let cancelled = false
    async function init() {
      try {
        const THREE = await import("three")
        window.THREE = THREE
        const NET = (await import("vanta/dist/vanta.net.min")).default
        if (cancelled || !vantaRef.current) return
        vantaEffect.current = NET({
          el: vantaRef.current,
          THREE,
          color: 0x1a1a2e,
          backgroundColor: 0xf8fafc,
          points: 8,
          maxDistance: 22,
          spacing: 18,
          showDots: true,
          mouseControls: true,
          touchControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      } catch (e) {
        // Vanta fails silently — fallback is the canvas bg colour
      }
    }
    init()
    return () => {
      cancelled = true
      if (vantaEffect.current) vantaEffect.current.destroy()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={vantaRef}
      className="relative min-h-[90vh] flex items-center bg-canvas"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 94%, 0 100%)" }}
    >
      <div className="relative z-10 max-w-[1180px] mx-auto px-8 py-32 md:py-40 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-2 border border-silver/40 rounded-full mb-10"
        >
          <span className="text-xs font-body font-semibold tracking-[0.14em] uppercase text-navy">
            RMI 5-Star Approved
          </span>
          <span className="w-1 h-1 rounded-full bg-silver" />
          <span className="text-xs font-body font-semibold tracking-[0.14em] uppercase text-navy">
            MIWA Member
          </span>
          <span className="w-1 h-1 rounded-full bg-silver" />
          <span className="text-xs font-body font-semibold tracking-[0.14em] uppercase text-navy">
            Est. 1989
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-display font-bold text-[#111827] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight max-w-4xl"
        >
          Pretoria East's specialist auto electrician,
          <span className="text-navy"> since 1989</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 font-body text-lg md:text-xl text-[#4B5563] max-w-2xl leading-relaxed"
        >
          Heinz has been diagnosing electrical faults on Mercedes-Benz and European
          vehicles from this same workshop in Lynnwood Ridge for over 35 years.
          When he looks at your car, there is very little he hasn't seen before.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="tel:0123616836"
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-navy text-white text-base font-semibold font-body rounded transition-all hover:bg-[#12122a] active:scale-[0.98]"
          >
            Call Ridgewood: 012 361 6836
          </a>
          <a
            href="mailto:ridgewoodae@mweb.co.za"
            className="inline-flex items-center justify-center min-h-[52px] px-8 border-2 border-navy text-navy text-base font-semibold font-body rounded transition-all hover:bg-navy/5 active:scale-[0.98]"
          >
            Not sure? Email us
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Trust Anchors ──────────────────────────────────────────── */
function TrustAnchors() {
  const anchors = [
    {
      stat: "35+",
      label: "Years in Lynnwood Ridge",
      detail: "Same workshop, same owner, since 1989",
    },
    {
      stat: "RMI",
      label: "5-Star Approved",
      detail: "Independently verified quality and fair pricing",
    },
    {
      stat: "MB",
      label: "Mercedes-Benz Specialists",
      detail: "Deep expertise in European vehicle electrical systems",
    },
  ]

  return (
    <section className="bg-white py-24 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
      >
        {anchors.map((a, i) => (
          <motion.div key={i} variants={staggerItem} className="text-center">
            <span className="font-display font-bold text-5xl md:text-6xl text-navy">
              {a.stat}
            </span>
            <p className="mt-3 font-body font-semibold text-lg text-[#111827]">
              {a.label}
            </p>
            <p className="mt-2 font-body text-base text-[#6B7280] max-w-xs mx-auto">
              {a.detail}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ─── Services ───────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      title: "Diagnostics & Fault-Finding",
      desc: "Precision electrical diagnostics using professional-grade equipment. Heinz personally identifies the fault, explains it to you, and quotes fairly before any work begins.",
      image: img("images/diagnostics.webp"),
    },
    {
      title: "Alternators & Starters",
      desc: "Complete alternator and starter motor rewinding, repair, and replacement. OEM-standard work that extends the life of your vehicle's charging and ignition system.",
      image: img("images/alternator.webp"),
    },
    {
      title: "Engine Management",
      desc: "Engine control unit diagnostics, sensor replacement, and fault code resolution. The kind of work that requires experience, not just a code reader.",
      image: img("images/engine-bay.png"),
    },
    {
      title: "Wiring & Electrical Repair",
      desc: "Full wiring harness diagnosis and repair, central locking systems, window regulators, and complete auto electrical fault resolution.",
      image: img("images/mechanic-hands.webp"),
    },
    {
      title: "Mercedes-Benz & European",
      desc: "Specialist depth in Mercedes-Benz, Smart, Land Rover, Jaguar, and Audi electrical systems. Independent expertise at fair pricing, not dealership rates.",
      image: img("images/engine-service.webp"),
    },
    {
      title: "All Makes & Models",
      desc: "From Toyota to BMW, bakkies to SUVs. 35 years of experience means there are very few electrical faults Ridgewood hasn't diagnosed and resolved before.",
      image: img("images/batteries.webp"),
    },
  ]

  return (
    <section
      id="services"
      className="bg-canvas pt-28 pb-44 md:pt-36 md:pb-52"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 96%, 0 100%)" }}
    >
      <div className="max-w-[1180px] mx-auto px-8">
        <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-navy">
            What we do
          </span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#111827] tracking-tight">
            Auto electrical services you can trust
          </h2>
          <p className="mt-5 font-body text-lg text-[#6B7280] max-w-2xl mx-auto">
            Every job is diagnosed and overseen by Heinz personally.
            No junior guesswork, no unnecessary replacements.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group bg-white rounded-lg overflow-hidden border border-[#E5E7EB] hover:border-navy/30 transition-colors duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display font-semibold text-lg text-[#111827]">
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-[15px] text-[#6B7280] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── About / Owner ──────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="bg-white py-28 md:py-36">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-navy">
              About Ridgewood
            </span>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-tight">
              The owner diagnoses your car. That changes everything.
            </h2>
            <div className="mt-8 space-y-5 font-body text-[17px] text-[#4B5563] leading-[1.75]">
              <p>
                When you bring your vehicle to Ridgewood, Heinz is the person who looks at it.
                Not a junior technician. Not a service advisor reading from a screen. The owner,
                with over 35 years of hands-on auto electrical experience, diagnosing your fault
                personally and explaining what he finds, directly to you.
              </p>
              <p>
                That matters, because auto electrical work is diagnosis work. The difference
                between an accurate diagnosis and guesswork is decades of pattern recognition,
                and that cannot be taught from a manual. It is built one vehicle at a time,
                over thousands of repairs.
              </p>
              <p>
                Heinz is direct. You won't get small talk or a sales pitch.
                You will get an honest assessment, a fair quote, and the knowledge
                that if your fault is outside his scope, he will tell you, refer you
                to the right person, and often not charge you for the diagnostic time.
              </p>
            </div>
            <a
              href="tel:0123616836"
              className="mt-10 inline-flex items-center justify-center min-h-[52px] px-8 bg-navy text-white text-base font-semibold font-body rounded transition-all hover:bg-[#12122a] active:scale-[0.98]"
            >
              Speak to Heinz: 012 361 6836
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={img("images/engine-bay.png")}
                alt="Auto electrical diagnostic equipment on a vehicle engine bay at Ridgewood Auto Electrical"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-navy text-white px-6 py-4 rounded">
              <span className="font-display font-bold text-2xl">35+</span>
              <span className="font-body text-sm text-white/80 ml-2">years experience</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Reviews ────────────────────────────────────────────────── */
function Reviews() {
  const testimonials = [
    {
      quote:
        "Hans has provided excellent service for me and many friends across all our family vehicles for over 15 years. He gets the job done, quickly, fairly, and without wasting your time.",
      author: "John Baggott",
      stars: 5,
    },
    {
      quote:
        "You don't go there for pleasantries. You go there for probably the most experienced auto electrical specialist in the business. Fast, efficient, and the bill is always reasonable.",
      author: "Laubscher Calitz",
      stars: 5,
    },
    {
      quote:
        "He didn't even charge me for the diagnostics, and referred me to someone who could help. That kind of honesty is rare. I'll definitely be back.",
      author: "Debbie Breytenbach",
      stars: 5,
    },
  ]

  return (
    <section
      id="reviews"
      className="bg-navy py-28 md:py-36 pb-40 md:pb-48"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)" }}
    >
      <div className="max-w-[1180px] mx-auto px-8">
        <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60">
            What clients say
          </span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">
            Built on word-of-mouth, for 35 years
          </h2>
          <p className="mt-5 font-body text-lg text-white/70 max-w-2xl mx-auto">
            No review generation strategy. No marketing campaigns.
            Just honest work that people talk about.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-lg p-8"
            >
              <span className="font-display text-5xl text-navy/60 leading-none select-none">
                &#8220;
              </span>
              <div className="flex gap-1 mt-2 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[16px] text-white/90 leading-relaxed">
                {t.quote}
              </p>
              <p className="mt-6 font-body text-sm text-white/50">
                {t.author}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Contact & Location ─────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="bg-white py-28 md:py-36">
      <div className="max-w-[1180px] mx-auto px-8">
        <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-navy">
            Get in touch
          </span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#111827] tracking-tight">
            Ready to get your vehicle sorted?
          </h2>
          <p className="mt-5 font-body text-lg text-[#6B7280] max-w-2xl mx-auto">
            Call Heinz directly, or send an email if you're not sure whether
            your fault is something Ridgewood can help with. Either way, you'll
            get an honest answer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div {...fadeUp} className="space-y-10">
            <div>
              <a
                href="tel:0123616836"
                className="inline-flex items-center justify-center w-full min-h-[60px] px-8 bg-navy text-white text-xl font-semibold font-body rounded transition-all hover:bg-[#12122a] active:scale-[0.98]"
              >
                Call Ridgewood: 012 361 6836
              </a>
            </div>

            <div>
              <a
                href="mailto:ridgewoodae@mweb.co.za"
                className="inline-flex items-center justify-center w-full min-h-[52px] px-8 border-2 border-navy text-navy text-base font-semibold font-body rounded transition-all hover:bg-navy/5"
              >
                Not sure? Email us: ridgewoodae@mweb.co.za
              </a>
            </div>

            <div className="space-y-5 font-body text-[#4B5563]">
              <div>
                <h3 className="font-semibold text-[#111827] text-sm uppercase tracking-wider mb-2">
                  Address
                </h3>
                <p className="text-base">
                  16 Camellia Avenue South<br />
                  Lynnwood Ridge, Pretoria, 0040
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#111827] text-sm uppercase tracking-wider mb-2">
                  Trading Hours
                </h3>
                <p className="text-base">
                  Monday to Friday: 07:30 to 16:30<br />
                  Saturday &amp; Sunday: Closed
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#111827] text-sm uppercase tracking-wider mb-2">
                  Credentials
                </h3>
                <div className="flex items-center gap-4 mt-3">
                  <img
                    src={img("images/rmi-logo.png")}
                    alt="RMI 5-Star Approved"
                    className="h-12 w-auto object-contain"
                    loading="lazy"
                  />
                  <span className="text-sm text-[#6B7280]">
                    RMI 5-Star Approved &amp; MIWA Member
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E5E7EB]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.5!2d28.2907875!3d-25.7729403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ2JzIyLjYiUyAyOMKwMTcnMjYuOCJF!5e0!3m2!1sen!2sza!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ridgewood Auto Electrical location on Google Maps"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─────────────────────────────────────────────────────── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      q: "Do you specialise in Mercedes-Benz and other European vehicles?",
      a: "Yes. Ridgewood Auto Electrical has specialist depth in Mercedes-Benz and Smart vehicles, built over 35+ years. We also service all other European makes including Land Rover, Jaguar, Audi, and BMW, alongside Japanese and domestic vehicles.",
    },
    {
      q: "Will using an independent workshop affect my vehicle's warranty?",
      a: "No. Under South African consumer protection law, you are free to use any qualified independent workshop without voiding your manufacturer's warranty, provided the work meets manufacturer standards. As an RMI 5-Star Approved workshop and MIWA member, Ridgewood meets and exceeds these standards.",
    },
    {
      q: "How long does a diagnostic assessment typically take?",
      a: "Most diagnostic assessments are completed within 1 to 2 hours. Heinz diagnoses your vehicle personally and will explain the findings directly to you, along with a clear, fair quote before any work begins.",
    },
    {
      q: "What happens if the fault is outside your area of expertise?",
      a: "Honesty is foundational to how we operate. If a fault falls outside our scope, we will tell you directly, refer you to the right specialist, and in many cases will not charge for the diagnostic time. Several of our best client relationships started exactly this way.",
    },
  ]

  return (
    <section className="bg-canvas py-28 md:py-36">
      <div className="max-w-[720px] mx-auto px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-navy">
            Common questions
          </span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl text-[#111827] tracking-tight">
            Frequently asked questions
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left min-h-[44px]"
                aria-expanded={openIndex === i}
              >
                <span className="font-body font-semibold text-base text-[#111827] leading-snug">
                  {f.q}
                </span>
                <svg
                  className={`w-5 h-5 text-navy shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 font-body text-[16px] text-[#6B7280] leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Email Capture ──────────────────────────────────────────── */
function EmailCapture() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-white py-28 md:py-36">
      <motion.div {...fadeUp} className="max-w-[480px] mx-auto px-8 text-center">
        <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-navy">
          Not sure yet?
        </span>
        <h2 className="mt-4 font-display font-bold text-2xl md:text-3xl text-[#111827] tracking-tight">
          Drop us your details
        </h2>
        <p className="mt-4 font-body text-base text-[#6B7280] leading-relaxed">
          Not sure if your fault is something we handle? Send us a message.
          We will be honest about whether we can help, and if not,
          point you in the right direction. No obligation.
        </p>

        {submitted ? (
          <div className="mt-10 p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="font-body text-base text-emerald-800 font-semibold">
              Thank you. We'll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-4 text-left">
            {/* Placeholder: connect to Mailchimp / Brevo / Formspree */}
            <div>
              <label htmlFor="name" className="font-body text-sm font-medium text-[#374151] block mb-1.5">
                First name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full min-h-[44px] px-4 py-3 border border-[#D1D5DB] rounded font-body text-base text-[#111827] focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-body text-sm font-medium text-[#374151] block mb-1.5">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full min-h-[44px] px-4 py-3 border border-[#D1D5DB] rounded font-body text-base text-[#111827] focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full min-h-[48px] bg-navy text-white font-body font-semibold text-base rounded transition-all hover:bg-[#12122a] active:scale-[0.98]"
            >
              Send enquiry
            </button>
            <p className="font-body text-xs text-[#9CA3AF] text-center">
              Your information is kept private and never shared.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <>
      <footer className="bg-[#0f0f0f] text-white py-16 md:py-20">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-display font-bold text-xl mb-4">
                Ridgewood Auto Electrical
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                Pretoria East's specialist independent auto electrician.
                Expert diagnostics, honest pricing, and 35+ years of experience
                in Lynnwood Ridge.
              </p>
            </div>

            <div>
              <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
                Contact
              </h4>
              <div className="space-y-3 font-body text-sm">
                <p>
                  <a href="tel:0123616836" className="text-white/80 hover:text-white transition-colors">
                    012 361 6836
                  </a>
                </p>
                <p>
                  <a href="mailto:ridgewoodae@mweb.co.za" className="text-white/80 hover:text-white transition-colors">
                    ridgewoodae@mweb.co.za
                  </a>
                </p>
                <p className="text-white/60">
                  16 Camellia Avenue South<br />
                  Lynnwood Ridge, Pretoria, 0040
                </p>
                <p className="text-white/60">Mon-Fri 07:30-16:30</p>
              </div>
            </div>

            <div>
              <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
                Quick Links
              </h4>
              <div className="space-y-3 font-body text-sm">
                <p><a href="#services" className="text-white/80 hover:text-white transition-colors">Services</a></p>
                <p><a href="#about" className="text-white/80 hover:text-white transition-colors">About</a></p>
                <p><a href="#reviews" className="text-white/80 hover:text-white transition-colors">Reviews</a></p>
                <p><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a></p>
              </div>
              <div className="mt-6">
                <a
                  href="https://www.facebook.com/profile.php?id=100063767843252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <p className="font-body text-xs text-white/40">
              Ridgewood Auto Electrical CC (Hatfield Motors CC t/a Ridgewood Auto Service)
            </p>
            <p className="font-body text-xs text-white/40">
              RMI 5-Star Approved &middot; MIWA Member &middot; Est. 1989
            </p>
          </div>
        </div>
      </footer>

      {/* Footer credit */}
      <div className="bg-[#0a0a0a] py-3 text-center">
        <p className="font-body text-xs text-white/30">
          Website design by{" "}
          <a
            href="https://flintandfuel.co.za"
            target="_blank"
            rel="noopener"
            className="underline hover:opacity-70"
          >
            Flint and Fuel Creative
          </a>
        </p>
      </div>
    </>
  )
}

/* ─── App ─────────────────────────────────────────────────────── */
function App() {
  return (
    <div className="pb-24 font-body text-[#111827] bg-white">
      <Nav />
      <VantaHero />
      <TrustAnchors />
      <Services />
      <About />
      <Reviews />
      <Contact />
      <FAQ />
      <EmailCapture />
      <Footer />
      <SalesBar />
    </div>
  )
}

export default App
