import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Users,
  Zap,
  ShieldCheck,
  Compass,
  ArrowUpRight,
  Twitter,
  MessageCircle,
  Send,
  Plus,
  Minus,
} from "lucide-react";
import robinhoodLogo from "@/assets/robinhood logo.png";
import yoloLogo from "@/assets/YOLO logo.jpg";
import yoloBanner from "@/assets/yolo banner.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: yoloBanner },
      { name: "twitter:image", content: yoloBanner },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#token", label: "Token" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border-soft)] bg-[#090909]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={yoloLogo} alt="YOLOROBINHOOD" className="h-8 w-8 rounded-md" />
          <span className="text-sm font-semibold tracking-tight">YOLOROBINHOOD</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#buy"
          className="group inline-flex items-center gap-1.5 rounded-full bg-[#CCFF00] px-4 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03]"
        >
          Buy YOLO
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />

      {/* Decorative YOLO logo pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={yoloLogo}
          alt=""
          className="absolute -left-16 top-24 h-56 w-56 rotate-[-14deg] opacity-[0.05] blur-[1px] md:h-72 md:w-72"
        />
        <img
          src={yoloLogo}
          alt=""
          className="absolute -right-20 bottom-10 h-72 w-72 rotate-[18deg] opacity-[0.06] blur-[1px] md:h-96 md:w-96"
        />
        <img
          src={yoloLogo}
          alt=""
          className="absolute left-1/2 top-1/2 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rotate-[8deg] opacity-[0.035] lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-fade-up text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00]" />
              Built on Robinhood Chain
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              You only
              <br />
              live <span className="text-brand">once.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg lg:mx-0">
              YOLOROBINHOOD is a community-driven cryptocurrency built for people who believe
              opportunity belongs to those willing to take action.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                id="buy"
                href="#token"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#CCFF00] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_#CCFF00] sm:w-auto"
              >
                Buy YOLO
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#community"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-white/[0.06] sm:w-auto"
              >
                Join Community
              </a>
            </div>

            {/* Partner strip */}
            <div className="mt-12 flex flex-col items-center gap-3 lg:items-start">
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                In partnership with
              </span>
              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/[0.03] px-4 py-2">
                <img
                  src={robinhoodLogo}
                  alt="Robinhood Chain"
                  className="h-6 w-6 rounded"
                />
                <span className="text-sm font-medium text-white/90">Robinhood Chain</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div
              aria-hidden
              className="absolute inset-8 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(204,255,0,0.45), transparent 65%)",
              }}
            />
            <div className="animate-float relative flex h-full w-full items-center justify-center">
              <img
                src={yoloLogo}
                alt="YOLO token logo"
                className="w-[78%] rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerStrip() {
  return (
    <section
      aria-label="YOLO banner"
      className="relative border-t border-[var(--border-soft)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div
          data-reveal
          className="reveal group relative overflow-hidden rounded-3xl border border-[var(--border-soft)] shadow-[0_40px_120px_-40px_rgba(204,255,0,0.25)]"
        >
          <img
            src={yoloBanner}
            alt="YOLO — You Only Live Once"
            className="h-56 w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] sm:h-72 md:h-96"
            loading="lazy"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(9,9,9,0) 40%, rgba(9,9,9,0.85) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 sm:p-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-brand">
              YOLO / Robinhood Chain
            </span>
            <p className="max-w-xl text-lg font-semibold leading-snug text-white sm:text-2xl">
              One token. One philosophy. You Only Live Once.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-[var(--border-soft)] py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {description}
            </p>
          )}
        </div>
        {children && <div className="mt-16">{children}</div>}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>What is YOLOROBINHOOD?</>}
    >
      <div data-reveal className="reveal mx-auto max-w-3xl space-y-6 text-center text-lg leading-relaxed text-[var(--text-secondary)]">
        <p>
          YOLOROBINHOOD is a community-first digital asset inspired by the philosophy that life
          rewards bold decisions.
        </p>
        <p>
          Built on Robinhood Chain, YOLO combines modern branding, transparent tokenomics, and a
          long-term ecosystem vision into one simple idea:{" "}
          <span className="font-medium text-white">You Only Live Once.</span>
        </p>
        <p>
          The project exists to build a strong community around innovation, confidence, and
          financial freedom while maintaining a clean and professional identity.
        </p>
      </div>
    </Section>
  );
}

const features = [
  { icon: Users, title: "Community Driven", desc: "Built together with holders." },
  { icon: Zap, title: "Robinhood Chain", desc: "Fast and efficient blockchain." },
  { icon: ShieldCheck, title: "Secure", desc: "Transparent smart contract." },
  { icon: Compass, title: "Long-Term Vision", desc: "Focused on sustainable ecosystem growth." },
];

function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title="Designed for the long run."
      description="Four principles guide every decision behind YOLO."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={f.title}
            data-reveal
            className="reveal glass-card glass-card-hover p-7"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white/[0.04]">
              <f.icon className="h-5 w-5 text-brand" />
            </div>
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const tokenInfo = [
  { label: "Token Name", value: "YOLOROBINHOOD" },
  { label: "Ticker", value: "YOLO" },
  { label: "Network", value: "Robinhood Chain" },
  { label: "Contract", value: "Coming Soon" },
  { label: "Tax", value: "0 / 0" },
  { label: "Liquidity", value: "Locked" },
  { label: "Ownership", value: "Renounced" },
];

function TokenInfo() {
  return (
    <Section
      id="token"
      eyebrow="Token"
      title="Token Information"
      description="Transparent by design. Everything you need to know about YOLO."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tokenInfo.map((t, i) => (
          <div
            key={t.label}
            data-reveal
            className="reveal glass-card p-6"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <div className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              {t.label}
            </div>
            <div className="mt-3 text-lg font-semibold text-white">{t.value}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    items: ["Brand Launch", "Website", "Community", "Socials"],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    items: ["DEX Listing", "Marketing", "Partnerships"],
  },
  {
    phase: "Phase 3",
    title: "Ecosystem",
    items: ["Utilities", "Ecosystem", "Growth"],
  },
];

function Roadmap() {
  return (
    <Section
      id="roadmap"
      eyebrow="Roadmap"
      title="A path forward."
      description="Deliberate steps toward a durable ecosystem."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {phases.map((p, i) => (
          <div
            key={p.phase}
            data-reveal
            className="reveal glass-card glass-card-hover p-8"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                {p.phase}
              </span>
              <span className="text-xs text-[var(--text-secondary)]">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{p.title}</h3>
            <ul className="mt-6 space-y-3">
              {p.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

const faqs = [
  {
    q: "What is YOLO?",
    a: "YOLO is the native token of YOLOROBINHOOD — a community-first digital asset on Robinhood Chain built around the philosophy that opportunity belongs to those willing to take action.",
  },
  {
    q: "How to buy?",
    a: "The contract will be published at launch. Once live, you'll be able to swap for YOLO on supported Robinhood Chain DEXs. Follow our socials for the official announcement.",
  },
  {
    q: "What chain is it on?",
    a: "YOLO is built on Robinhood Chain — a fast, efficient blockchain designed for low fees and quick confirmations.",
  },
  {
    q: "Where is the contract?",
    a: "The contract address is Coming Soon. It will be published exclusively through our official channels to prevent scams.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Frequently asked.">
      <div className="mx-auto max-w-3xl divide-y divide-[var(--border-soft)] rounded-2xl border border-[var(--border-soft)] bg-white/[0.02]">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} data-reveal className="reveal">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-white/[0.02]"
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-white sm:text-lg">{f.q}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/[0.03]">
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-brand" />
                  ) : (
                    <Plus className="h-4 w-4 text-[var(--text-secondary)]" />
                  )}
                </span>
              </button>
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="min-h-0">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer
      id="community"
      className="border-t border-[var(--border-soft)] py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={yoloLogo} alt="YOLOROBINHOOD" className="h-9 w-9 rounded-md" />
              <span className="text-sm font-semibold tracking-tight">YOLOROBINHOOD</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              A community-driven cryptocurrency on Robinhood Chain. Built for people who believe
              opportunity belongs to those willing to take action.
            </p>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Navigate
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { href: "#about", label: "About" },
                { href: "#features", label: "Features" },
                { href: "#token", label: "Token" },
                { href: "#roadmap", label: "Roadmap" },
                { href: "#faq", label: "FAQ" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/80 transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Community
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="https://x.com/yolorobinhood"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/[0.03] text-white/80 transition-all duration-200 hover:scale-105 hover:border-[#CCFF00]/40 hover:text-brand"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-soft)] pt-8 text-xs text-[var(--text-secondary)] sm:flex-row">
          <span>© {new Date().getFullYear()} YOLOROBINHOOD. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">You Only Live Once.</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <div className="animate-page-fade relative min-h-screen overflow-hidden bg-[#090909] text-white">
      {/* Global decorative watermarks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* YOLO logo 1 */}
        <img
          src={yoloLogo}
          alt=""
          className="absolute right-[-6rem] top-[52%] h-80 w-80 rotate-12 opacity-[0.04] blur-[2px] animate-float"
        />
        {/* YOLO logo 2 */}
        <img
          src={yoloLogo}
          alt=""
          className="absolute left-[-5rem] top-[78%] h-64 w-64 -rotate-6 opacity-[0.035] blur-[1px] animate-float"
          style={{ animationDelay: '2s' }}
        />
        {/* Robinhood logo 1 */}
        <img
          src={robinhoodLogo}
          alt=""
          className="absolute left-[10%] top-[15%] h-40 w-40 rotate-45 opacity-[0.03] blur-[1px] animate-spin-slow"
        />
        {/* Robinhood logo 2 */}
        <img
          src={robinhoodLogo}
          alt=""
          className="absolute right-[15%] bottom-[25%] h-56 w-56 -rotate-20 opacity-[0.035] blur-[1px] animate-spin-slow"
          style={{ animationDelay: '3s', animationDirection: 'reverse' }}
        />
      </div>
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <About />
          <BannerStrip />
          <Features />
          <TokenInfo />
          <Roadmap />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
}
