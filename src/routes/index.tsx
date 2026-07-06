import { createFileRoute, Link } from "@tanstack/react-router";
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
  Lock,
  TrendingUp,
  Clock,
  Globe,
  Telegram,
} from "lucide-react";
import robinhoodLogo from "@/assets/robinhood logo.png";
import yoloLogo from "@/assets/YOLO logo.jpg";
import yoloBanner from "@/assets/yolo banner.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t("nav.about") },
    { href: "#features", label: t("nav.features") },
    { href: "#token", label: t("nav.token") },
    { href: "#staking", label: t("nav.staking") },
    { href: "/livestream", label: t("nav.live"), isExternal: true },
    { href: "#roadmap", label: t("nav.roadmap") },
    { href: "#faq", label: t("nav.faq") },
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
        <a href="#top" className="flex items-center gap-2.5">
          <img src={yoloLogo} alt="YOLOROBINHOOD" className="h-8 w-8 rounded-md" />
          <span className="text-sm font-semibold tracking-tight">YOLOROBINHOOD</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) =>
            l.isExternal ? (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
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
            href="#token"
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
                  className="py-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
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
              href="#token"
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

function Hero() {
  const { t } = useLanguage();
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-fade-up text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00]" />
              {t("hero.badge")}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-[5.25rem]">
              {t("hero.title1")}
              <br />
              {t("hero.title2")} <span className="text-brand">{t("hero.title3")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg lg:mx-0">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                id="buy"
                href="#token"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#CCFF00] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_#CCFF00] sm:w-auto"
              >
                {t("nav.buy")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#community"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-white/[0.06] sm:w-auto"
              >
                {t("hero.join")}
              </a>
            </div>

            {/* Partner strip */}
            <div className="mt-12 flex flex-col items-center gap-3 lg:items-start">
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                {t("partner.title")}
              </span>
              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/[0.03] px-4 py-2">
                <img
                  src={robinhoodLogo}
                  alt="Robinhood Chain"
                  className="h-6 w-6 rounded"
                />
                <span className="text-sm font-medium text-white/90">{t("partner.name")}</span>
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
  const { t } = useLanguage();
  return (
    <section
      aria-label="YOLO banner"
      className="relative border-t border-[var(--border-soft)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
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
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4 sm:p-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-brand">
              {t("banner.badge")}
            </span>
            <p className="max-w-xl text-lg font-semibold leading-snug text-white sm:text-2xl">
              {t("banner.text")}
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
    <section id={id} className="border-t border-[var(--border-soft)] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
  const { t } = useLanguage();
  return (
    <Section
      id="about"
      eyebrow={t("about.title")}
      title={<>What is YOLOROBINHOOD?</>}
    >
      <div data-reveal className="reveal mx-auto max-w-3xl space-y-6 text-center text-lg leading-relaxed text-[var(--text-secondary)]">
        <p>{t("about.p1")}</p>
        <p>
          {t("about.p2")} <span className="font-medium text-white">{t("about.p3")}</span>
        </p>
        <p>{t("about.p4")}</p>
      </div>
    </Section>
  );
}

const features = [
  { icon: Users, key: "community" },
  { icon: Zap, key: "robinhood" },
  { icon: ShieldCheck, key: "secure" },
  { icon: Compass, key: "vision" },
];

function Features() {
  const { t } = useLanguage();
  return (
    <Section
      id="features"
      eyebrow={t("features.badge")}
      title={t("features.title")}
      description={t("features.subtitle")}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={f.key}
            data-reveal
            className="reveal glass-card glass-card-hover p-7"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white/[0.04]">
              <f.icon className="h-5 w-5 text-brand" />
            </div>
            <h3 className="text-lg font-semibold">{t(`features.${f.key}.title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t(`features.${f.key}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const tokenInfo = [
  { key: "name" },
  { key: "ticker" },
  { key: "network" },
  { key: "contract" },
  { key: "tax" },
  { key: "liquidity" },
  { key: "ownership" },
];

function TokenInfo() {
  const { t } = useLanguage();
  return (
    <Section
      id="token"
      eyebrow={t("token.badge")}
      title={t("token.title")}
      description={t("token.subtitle")}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tokenInfo.map((tkn, i) => (
          <div
            key={tkn.key}
            data-reveal
            className="reveal glass-card p-6"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <div className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              {t(`token.${tkn.key}.label`)}
            </div>
            <div className="mt-3 text-lg font-semibold text-white">
              {t(`token.${tkn.key}.value`)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const stakingPlans = [
  { key: "plan1", featured: false },
  { key: "plan2", featured: true },
  { key: "plan3", featured: false },
];

function StakingSection() {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [amount, setAmount] = useState("1000");

  return (
    <Section
      id="staking"
      eyebrow={t("staking.badge")}
      title={t("staking.title")}
      description={t("staking.subtitle")}
    >
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] items-start">
        {/* Plans */}
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {stakingPlans.map((plan, i) => (
              <button
                key={plan.key}
                onClick={() => setSelectedPlan(i)}
                className={`text-left p-7 transition-all duration-300 ${
                  selectedPlan === i
                    ? "border-[#CCFF00]/50 bg-[#CCFF00]/5 scale-[1.02]"
                    : "border-[var(--border-soft)] bg-white/[0.02] hover:border-white/10"
                } rounded-2xl border`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                    {t(`staking.${plan.key}.badge`)}
                  </span>
                  {plan.featured && (
                    <span className="text-[10px] font-semibold text-black bg-[#CCFF00] px-2 py-0.5 rounded-full">
                      BEST
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{t(`staking.${plan.key}.duration`)}</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-brand">{plan.key === "plan1" ? "24.9" : plan.key === "plan2" ? "59.9" : "89.9"}%</span>
                  <span className="text-[var(--text-secondary)] ml-1">APY</span>
                </div>
                <ul className="mt-6 space-y-2">
                  {[1, 2, 3].map((j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
                      {t(`staking.${plan.key}.f${j}`)}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Lock, key: "stat1" },
              { icon: TrendingUp, key: "stat2" },
              { icon: Clock, key: "stat3" },
            ].map((stat, i) => (
              <div
                key={stat.key}
                data-reveal
                className="reveal glass-card p-6"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white/[0.04]">
                    <stat.icon className="h-5 w-5 text-brand" />
                  </div>
                </div>
                <div className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                  {t(`staking.${stat.key}.label`)}
                </div>
                <div className="mt-2 text-xl font-semibold text-white">
                  {t(`staking.${stat.key}.value`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staking Form */}
        <div className="sticky top-24">
          <div className="glass-card p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CCFF00]/20">
                <img src={yoloLogo} alt="YOLO" className="h-8 w-8 rounded-md" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                  YOLO
                </p>
                <p className="font-semibold">YOLOROBINHOOD</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                  {t("staking.form.balance")}
                </p>
                <p className="font-semibold">10,000 YOLO</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                {t("staking.form.amount")}
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-white/[0.02] p-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent text-xl font-semibold outline-none"
                  placeholder="0"
                />
                <div className="flex gap-1">
                  {[25, 50, 75, 100].map((p) => (
                    <button
                      key={p}
                      onClick={() => setAmount((10000 * p / 100).toString())}
                      className="text-xs font-medium text-brand bg-brand/10 px-2 py-1 rounded-lg hover:bg-brand/20 transition-colors"
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">{t("staking.form.duration")}</span>
                <span className="text-sm font-semibold">
                  {t(`staking.${stakingPlans[selectedPlan].key}.duration`)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">{t("staking.form.apy")}</span>
                <span className="text-sm font-semibold text-brand">
                  {selectedPlan === 0 ? "24.9" : selectedPlan === 1 ? "59.9" : "89.9"}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">{t("staking.form.est")}</span>
                <span className="text-sm font-semibold">
                  {(Number(amount) * (selectedPlan === 0 ? 0.249 : selectedPlan === 1 ? 0.599 : 0.899)).toFixed(2)} YOLO
                </span>
              </div>
            </div>

            <button
              disabled
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gray-700 px-6 py-3.5 text-sm font-semibold text-white cursor-not-allowed"
            >
              <Lock className="h-4 w-4" />
              {t("staking.form.button")}
            </button>

            <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
              {t("staking.form.note")}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

const phases = [
  { key: "p1", items: [1, 2, 3, 4] },
  { key: "p2", items: [1, 2, 3] },
  { key: "p3", items: [1, 2, 3] },
];

function Roadmap() {
  const { t } = useLanguage();
  return (
    <Section
      id="roadmap"
      eyebrow={t("roadmap.badge")}
      title={t("roadmap.title")}
      description={t("roadmap.subtitle")}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {phases.map((phase, i) => (
          <div
            key={phase.key}
            data-reveal
            className="reveal glass-card glass-card-hover p-8"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                {t(`roadmap.${phase.key}.phase`)}
              </span>
              <span className="text-xs text-[var(--text-secondary)]">0{i + 1}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{t(`roadmap.${phase.key}.title`)}</h3>
            <ul className="mt-6 space-y-3">
              {phase.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
                  {t(`roadmap.${phase.key}.i${it}`)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

const faqs = [1, 2, 3, 4];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useLanguage();
  return (
    <Section id="faq" eyebrow={t("faq.title")} title={<></>}>
      <div className="mx-auto max-w-3xl divide-y divide-[var(--border-soft)] rounded-2xl border border-[var(--border-soft)] bg-white/[0.02]">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f} data-reveal className="reveal">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-white/[0.02]"
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-white sm:text-lg">{t(`faq.q${f}`)}</span>
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
                    {t(`faq.a${f}`)}
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
  const { t } = useLanguage();
  return (
    <footer
      id="community"
      className="border-t border-[var(--border-soft)] py-16"
    >
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
                { href: "#about", label: t("nav.about") },
                { href: "#features", label: t("nav.features") },
                { href: "#token", label: t("nav.token") },
                { href: "#staking", label: t("nav.staking") },
                { href: "/livestream", label: t("nav.live"), isLink: true },
                { href: "#roadmap", label: t("nav.roadmap") },
                { href: "#faq", label: t("nav.faq") },
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
                <Twitter className="h-4 w-4" />
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
          <StakingSection />
          <Roadmap />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
}
