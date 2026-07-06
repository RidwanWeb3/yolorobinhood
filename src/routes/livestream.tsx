import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Lock,
  Users,
  Gift,
  Zap,
  ShieldCheck,
  Plus,
  Minus,
  MessageCircle,
  Heart,
  Star,
  DollarSign,
  Trophy,
  Wallet,
  Video,
  Sparkles,
  TrendingUp,
  Globe,
  Telegram,
} from "lucide-react";
import yoloLogo from "@/assets/YOLO logo.jpg";
import robinhoodLogo from "@/assets/robinhood logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/livestream")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Stream, earn gifts, and get paid in $YOLO instantly! The future of creator monetization on Robinhood Chain.",
      },
    ],
  }),
  component: LiveStreamPage,
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

function LiveNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#about", label: t("nav.about") },
    { href: "/#features", label: t("nav.features") },
    { href: "/#token", label: t("nav.token") },
    { href: "/#staking", label: t("nav.staking") },
    { href: "/livestream", label: t("nav.live"), isExternal: true, active: true },
    { href: "/#roadmap", label: t("nav.roadmap") },
    { href: "/#faq", label: t("nav.faq") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border-soft)] bg-[#090909]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={yoloLogo} alt="YOLOROBINHOOD" className="h-8 w-8 rounded-md" />
          <span className="text-sm font-semibold tracking-tight">YOLOROBINHOOD</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) =>
            l.isExternal ? (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm transition-colors hover:text-white ${
                  l.active ? "text-brand" : "text-[var(--text-secondary)]"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
              >
                {l.label}
              </a>
            )
          )}
        </nav>
        
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "en" ? "zh" : "en")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/[0.02] text-white/80 transition-all hover:border-[#CCFF00]/40 hover:text-brand"
          >
            <Globe className="h-4 w-4" />
          </button>
          <a
            href="/#token"
            className="group hidden items-center gap-1.5 rounded-full bg-[#CCFF00] px-4 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] sm:flex"
          >
            {t("nav.buy")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/[0.02] text-white/80 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="border-t border-[var(--border-soft)] bg-[#090909]/95 backdrop-blur-xl p-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((l) =>
              l.isExternal ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-sm transition-colors hover:text-white ${
                    l.active ? "text-brand" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              )
            )}
            <a
              href="/#token"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#CCFF00] px-4 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03]"
            >
              {t("nav.buy")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function LiveHero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />

      {/* Decorative animated logos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={yoloLogo}
          alt=""
          className="absolute -left-16 top-24 h-56 w-56 rotate-[-14deg] opacity-[0.05] blur-[1px] md:h-72 md:w-72 animate-float"
        />
        <img
          src={yoloLogo}
          alt=""
          className="absolute -right-20 bottom-10 h-72 w-72 rotate-[18deg] opacity-[0.06] blur-[1px] md:h-96 md:w-96 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-fade-up text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
              {t("livestream.hero.badge")}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-[5.25rem]">
              {t("livestream.hero.title1")}
              <br />
              {t("livestream.hero.title2")} <span className="text-brand">$YOLO</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg lg:mx-0">
              {t("livestream.hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                disabled
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#CCFF00] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_#CCFF00] sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="h-4 w-4" />
                {t("livestream.cs.button")}
              </button>
              <Link
                to="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-white/[0.06] sm:w-auto"
              >
                {t("livestream.hero.learn")}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="absolute inset-8 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(204,255,0,0.45), transparent 65%)",
              }}
            />
            <div className="glass-card p-6 rounded-3xl border border-[var(--border-soft)] relative overflow-hidden animate-float">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl font-bold">
                    YR
                  </div>
                  <div>
                    <p className="font-semibold">YoloRobin</p>
                    <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      LIVE • 1.2K viewers
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <MessageCircle className="h-5 w-5" />
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden mb-4">
                <Video className="h-16 w-16 text-gray-600" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-2 rounded bg-brand/50 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                  <div className="glass-card px-3 py-1 rounded-full flex items-center gap-2">
                    <Gift className="h-4 w-4 text-brand" />
                    <span className="font-semibold text-xs">12.5K $YOLO earned</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Heart, color: "text-red-500", label: "❤️ 100" },
                  { icon: Star, color: "text-yellow-500", label: "⭐ 500" },
                  { icon: Trophy, color: "text-blue-500", label: "🏆 1000" },
                  { icon: Sparkles, color: "text-purple-500", label: "✨ 5000" },
                ].map((gift, i) => (
                  <button
                    key={i}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl border border-[var(--border-soft)] bg-white/[0.02] hover:border-brand/50 hover:bg-brand/10 transition-all"
                  >
                    <gift.icon className={`h-6 w-6 ${gift.color}`} />
                    <span className="text-[10px] text-[var(--text-secondary)]">{gift.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { t } = useLanguage();
  const steps = [
    {
      icon: Video,
      title: t("livestream.how.s1.title"),
      desc: t("livestream.how.s1.desc"),
    },
    {
      icon: Gift,
      title: t("livestream.how.s2.title"),
      desc: t("livestream.how.s2.desc"),
    },
    {
      icon: TrendingUp,
      title: t("livestream.how.s3.title"),
      desc: t("livestream.how.s3.desc"),
    },
    {
      icon: Wallet,
      title: t("livestream.how.s4.title"),
      desc: t("livestream.how.s4.desc"),
    },
  ];

  return (
    <section className="border-t border-[var(--border-soft)] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div data-reveal className="reveal max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("livestream.how.title")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {t("livestream.how.subtitle")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              data-reveal
              className="reveal glass-card glass-card-hover p-7"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white/[0.04]">
                <step.icon className="h-5 w-5 text-brand" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StreamerBenefitsSection() {
  const { t } = useLanguage();
  const benefits = [
    { icon: DollarSign, title: t("livestream.benefits.b1.title"), desc: t("livestream.benefits.b1.desc") },
    { icon: Zap, title: t("livestream.benefits.b2.title"), desc: t("livestream.benefits.b2.desc") },
    { icon: Users, title: t("livestream.benefits.b3.title"), desc: t("livestream.benefits.b3.desc") },
    { icon: ShieldCheck, title: t("livestream.benefits.b4.title"), desc: t("livestream.benefits.b4.desc") },
    { icon: Trophy, title: t("livestream.benefits.b5.title"), desc: t("livestream.benefits.b5.desc") },
    { icon: Star, title: t("livestream.benefits.b6.title"), desc: t("livestream.benefits.b6.desc") },
  ];

  return (
    <section className="border-t border-[var(--border-soft)] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div data-reveal className="reveal max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
            {t("livestream.benefits.badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("livestream.benefits.title")}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              data-reveal
              className="reveal glass-card glass-card-hover p-7"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white/[0.04]">
                <benefit.icon className="h-5 w-5 text-brand" />
              </div>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComingSoonSection() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-[var(--border-soft)] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div data-reveal className="reveal glass-card p-10 text-center rounded-3xl border border-[var(--border-soft)]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[var(--border-soft)] bg-white/[0.04]">
            <Sparkles className="h-10 w-10 text-brand" />
          </div>
          <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("livestream.cs.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {t("livestream.cs.subtitle")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              disabled
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-700 px-8 py-3.5 text-sm font-semibold text-white cursor-not-allowed"
            >
              <Lock className="h-4 w-4" />
              {t("livestream.cs.button")}
            </button>
            <a
              href="https://x.com/Yolo_robinhood"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/[0.02] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-white/[0.06]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {t("livestream.cs.follow")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useLanguage();
  const faqs = [
    { q: t("livestream.faq.q1"), a: t("livestream.faq.a1") },
    { q: t("livestream.faq.q2"), a: t("livestream.faq.a2") },
    { q: t("livestream.faq.q3"), a: t("livestream.faq.a3") },
    { q: t("livestream.faq.q4"), a: t("livestream.faq.a4") },
    { q: t("livestream.faq.q5"), a: t("livestream.faq.a5") },
  ];

  return (
    <section className="border-t border-[var(--border-soft)] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div data-reveal className="reveal text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("livestream.faq.title")}
          </h2>
        </div>
        <div className="divide-y divide-[var(--border-soft)] rounded-2xl border border-[var(--border-soft)] bg-white/[0.02]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-reveal className="reveal">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-white sm:text-lg">
                    {f.q}
                  </span>
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
      </div>
    </section>
  );
}

function LiveFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-[var(--border-soft)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={yoloLogo} alt="YOLOROBINHOOD" className="h-9 w-9 rounded-md" />
              <span className="text-sm font-semibold tracking-tight">YOLOROBINHOOD</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              {t("footer.desc")}
            </p>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              {t("footer.navigate")}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { href: "/#about", label: t("nav.about") },
                { href: "/#features", label: t("nav.features") },
                { href: "/#token", label: t("nav.token") },
                { href: "/#staking", label: t("nav.staking") },
                { href: "/livestream", label: t("nav.live"), isLink: true },
                { href: "/#roadmap", label: t("nav.roadmap") },
              ].map((l) => (
                <li key={l.href}>
                  {l.isLink ? (
                    <Link
                      to={l.href}
                      className="text-white/80 transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      className="text-white/80 transition-colors hover:text-brand"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              {t("footer.community")}
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="https://x.com/Yolo_Robinhood_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/[0.03] text-white/80 transition-all duration-200 hover:scale-105 hover:border-[#CCFF00]/40 hover:text-brand"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/+CaFdtPGGb-s3Mzk9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/[0.03] text-white/80 transition-all duration-200 hover:scale-105 hover:border-[#CCFF00]/40 hover:text-brand"
              >
                <Telegram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-soft)] pt-8 text-xs text-[var(--text-secondary)] sm:flex-row">
          <span>{t("footer.copyright")}</span>
          <span className="tracking-[0.2em] uppercase">{t("footer.tagline")}</span>
        </div>
      </div>
    </footer>
  );
}

function LiveStreamPage() {
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
          style={{ animationDelay: "2s" }}
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
          style={{ animationDelay: "3s", animationDirection: "reverse" }}
        />
      </div>
      <div className="relative">
        <LiveNavbar />
        <main>
          <LiveHero />
          <HowItWorksSection />
          <StreamerBenefitsSection />
          <ComingSoonSection />
          <LiveFAQ />
        </main>
        <LiveFooter />
      </div>
    </div>
  );
}
