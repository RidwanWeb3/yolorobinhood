import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Lock,
  TrendingUp,
  Clock,
  Zap,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import yoloLogo from "@/assets/YOLO logo.jpg";

export const Route = createFileRoute("/staking")({
  head: () => ({
    title: "Staking | YOLOROBINHOOD",
    meta: [
      { name: "description", content: "Stake your YOLO tokens and earn attractive APY" },
    ],
  }),
  component: StakingPage,
});

function StakingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border-soft)] bg-[#090909]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={yoloLogo} alt="YOLOROBINHOOD" className="h-8 w-8 rounded-md" />
          <span className="text-sm font-semibold tracking-tight">YOLOROBINHOOD</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: "/#about", label: "About" },
            { href: "/#features", label: "Features" },
            { href: "/#token", label: "Token" },
            { href: "/staking", label: "Staking", active: true },
            { href: "/#roadmap", label: "Roadmap" },
            { href: "/#faq", label: "FAQ" },
          ].map((l) => (
            <Link
              key={l.href}
              to={l.href.startsWith("/#") ? "/" : l.href}
              className={`text-sm transition-colors hover:text-white ${
                l.active ? "text-brand" : "text-[var(--text-secondary)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/#token"
          className="group inline-flex items-center gap-1.5 rounded-full bg-[#CCFF00] px-4 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03]"
        >
          Buy YOLO
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </header>
  );
}

function StakingHero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />

      <div className="relative mx-auto max-w-4xl px-6 text-center animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00]" />
          Staking
        </span>
        <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          Stake <span className="text-brand">YOLO</span>,
          <br />
          Earn Rewards
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          Lock your YOLO tokens and earn high APY while supporting the network. Coming soon!
        </p>
      </div>
    </section>
  );
}

const stakingPlans = [
  {
    duration: "7 Days",
    apy: 24.9,
    features: ["Flexible withdrawal", "No minimum", "Instant reward distribution"],
    tag: "Flexible",
  },
  {
    duration: "30 Days",
    apy: 59.9,
    features: ["Bonus rewards", "Early unlock penalty", "Priority support"],
    tag: "Popular",
    featured: true,
  },
  {
    duration: "90 Days",
    apy: 89.9,
    features: ["Max APY", "Governance rights", "Exclusive benefits"],
    tag: "Max APY",
  },
];

function StakingPlans() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [amount, setAmount] = useState("1000");

  return (
    <section className="border-t border-[var(--border-soft)] py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] items-start">
          {/* Plans */}
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-3">
              {stakingPlans.map((plan, i) => (
                <button
                  key={plan.duration}
                  onClick={() => setSelectedPlan(i)}
                  className={`text-left p-7 transition-all duration-300 ${
                    selectedPlan === i
                      ? "border-[#CCFF00]/50 bg-[#CCFF00]/5 scale-[1.02]"
                      : "border-[var(--border-soft)] bg-white/[0.02] hover:border-white/10"
                  } rounded-2xl border`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                      {plan.tag}
                    </span>
                    {plan.featured && (
                      <span className="text-[10px] font-semibold text-black bg-[#CCFF00] px-2 py-0.5 rounded-full">
                        BEST
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{plan.duration}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-brand">{plan.apy}%</span>
                    <span className="text-[var(--text-secondary)] ml-1">APY</span>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Lock, label: "Total Staked", value: "12.5M YOLO" },
                { icon: TrendingUp, label: "Active Stakers", value: "8,421" },
                { icon: Clock, label: "Average Duration", value: "45 Days" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
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
                    {stat.label}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">{stat.value}</div>
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
                    Balance
                  </p>
                  <p className="font-semibold">10,000 YOLO</p>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                  Amount to Stake
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
                  <span className="text-sm text-[var(--text-secondary)]">Duration</span>
                  <span className="text-sm font-semibold">
                    {stakingPlans[selectedPlan].duration}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">APY</span>
                  <span className="text-sm font-semibold text-brand">
                    {stakingPlans[selectedPlan].apy}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">Est. Rewards (Year)</span>
                  <span className="text-sm font-semibold">
                    {(Number(amount) * stakingPlans[selectedPlan].apy / 100).toFixed(2)} YOLO
                  </span>
                </div>
              </div>

              <button
                disabled
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gray-700 px-6 py-3.5 text-sm font-semibold text-white cursor-not-allowed"
              >
                <Lock className="h-4 w-4" />
                Coming Soon
              </button>

              <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
                Staking will launch in Q4 2026. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StakingFeatures() {
  const features = [
    { icon: Zap, title: "Instant Rewards", desc: "Rewards are distributed every block to your wallet automatically." },
    { icon: ShieldCheck, title: "Secure & Audited", desc: "Smart contracts are fully audited and non-custodial for maximum security." },
    { icon: Lock, title: "Flexible Lockup", desc: "Choose from multiple lockup periods with varying APY rates." },
  ];

  return (
    <section className="border-t border-[var(--border-soft)] py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">Features</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why stake <span className="text-brand">YOLO</span>?
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
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
      </div>
    </section>
  );
}

function StakingFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "When will staking be available?", a: "Staking functionality is planned to launch in Q4 2026. Follow our socials for the latest updates." },
    { q: "What are the APY rates?", a: "We're planning attractive APY rates from 24.9% up to 89.9% depending on the lockup duration you choose." },
    { q: "Is there a minimum stake?", a: "There will be no minimum staking amount, everyone can participate regardless of how much YOLO they hold." },
    { q: "Are staking rewards taxable?", a: "Tax regulations vary by jurisdiction. Please consult a tax professional for advice regarding your specific situation." },
  ];

  return (
    <section className="border-t border-[var(--border-soft)] py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">FAQ</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Common Questions
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
      </div>
    </section>
  );
}

function StakingFooter() {
  return (
    <footer className="border-t border-[var(--border-soft)] py-16">
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
                { href: "/#about", label: "About" },
                { href: "/#features", label: "Features" },
                { href: "/#token", label: "Token" },
                { href: "/staking", label: "Staking" },
                { href: "/#roadmap", label: "Roadmap" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href.startsWith("/#") ? "/" : l.href}
                    className="text-white/80 transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
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
                href="https://x.com/Yolo_robinhood"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/[0.03] text-white/80 transition-all duration-200 hover:scale-105 hover:border-[#CCFF00]/40 hover:text-brand"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
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

function StakingPage() {
  return (
    <div className="animate-page-fade relative min-h-screen overflow-hidden bg-[#090909] text-white">
      <div className="relative">
        <StakingNavbar />
        <main>
          <StakingHero />
          <StakingPlans />
          <StakingFeatures />
          <StakingFAQ />
        </main>
        <StakingFooter />
      </div>
    </div>
  );
}
