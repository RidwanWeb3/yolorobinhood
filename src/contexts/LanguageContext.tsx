import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.features": "Features",
    "nav.token": "Token",
    "nav.staking": "Staking",
    "nav.live": "Live",
    "nav.roadmap": "Roadmap",
    "nav.faq": "FAQ",
    "nav.buy": "Buy YOLO",

    // Hero
    "hero.badge": "Built on Robinhood Chain",
    "hero.title1": "You only",
    "hero.title2": "live",
    "hero.title3": "once.",
    "hero.subtitle": "YOLOROBINHOOD is a community-driven cryptocurrency built for people who believe opportunity belongs to those willing to take action.",
    "hero.join": "Join Community",

    // Partner
    "partner.title": "In partnership with",
    "partner.name": "Robinhood Chain",

    // Banner
    "banner.badge": "YOLO / Robinhood Chain",
    "banner.text": "One token. One philosophy. You Only Live Once.",

    // About
    "about.title": "What is YOLOROBINHOOD?",
    "about.p1": "YOLOROBINHOOD is a community-first digital asset inspired by the philosophy that life rewards bold decisions.",
    "about.p2": "Built on Robinhood Chain, YOLO combines modern branding, transparent tokenomics, and a long-term ecosystem vision into one simple idea:",
    "about.p3": "You Only Live Once.",
    "about.p4": "The project exists to build a strong community around innovation, confidence, and financial freedom while maintaining a clean and professional identity.",

    // Features
    "features.badge": "Features",
    "features.title": "Designed for the long run.",
    "features.subtitle": "Four principles guide every decision behind YOLO.",
    "features.community.title": "Community Driven",
    "features.community.desc": "Built together with holders.",
    "features.robinhood.title": "Robinhood Chain",
    "features.robinhood.desc": "Fast and efficient blockchain.",
    "features.secure.title": "Secure",
    "features.secure.desc": "Transparent smart contract.",
    "features.vision.title": "Long-Term Vision",
    "features.vision.desc": "Focused on sustainable ecosystem growth.",

    // Token
    "token.badge": "Token",
    "token.title": "Token Information",
    "token.subtitle": "Transparent by design. Everything you need to know about YOLO.",
    "token.name.label": "Token Name",
    "token.name.value": "YOLOROBINHOOD",
    "token.ticker.label": "Ticker",
    "token.ticker.value": "YOLO",
    "token.network.label": "Network",
    "token.network.value": "Robinhood Chain",
    "token.contract.label": "Contract",
    "token.contract.value": "Coming Soon",
    "token.tax.label": "Tax",
    "token.tax.value": "0 / 0",
    "token.liquidity.label": "Liquidity",
    "token.liquidity.value": "Locked",
    "token.ownership.label": "Ownership",
    "token.ownership.value": "Renounced",

    // Staking
    "staking.badge": "Staking",
    "staking.title": "Stake YOLO, Earn Rewards",
    "staking.subtitle": "Lock your YOLO tokens and earn high APY while supporting the network. Coming soon!",
    "staking.plan1.badge": "Flexible",
    "staking.plan1.duration": "7 Days",
    "staking.plan1.f1": "Flexible withdrawal",
    "staking.plan1.f2": "No minimum",
    "staking.plan1.f3": "Instant reward distribution",
    "staking.plan2.badge": "Popular",
    "staking.plan2.duration": "30 Days",
    "staking.plan2.f1": "Bonus rewards",
    "staking.plan2.f2": "Early unlock penalty",
    "staking.plan2.f3": "Priority support",
    "staking.plan3.badge": "Max APY",
    "staking.plan3.duration": "90 Days",
    "staking.plan3.f1": "Max APY",
    "staking.plan3.f2": "Governance rights",
    "staking.plan3.f3": "Exclusive benefits",
    "staking.stat1.label": "Total Staked",
    "staking.stat1.value": "12.5M YOLO",
    "staking.stat2.label": "Active Stakers",
    "staking.stat2.value": "8,421",
    "staking.stat3.label": "Average Duration",
    "staking.stat3.value": "45 Days",
    "staking.form.balance": "Balance",
    "staking.form.amount": "Amount to Stake",
    "staking.form.duration": "Duration",
    "staking.form.apy": "APY",
    "staking.form.est": "Est. Rewards (Year)",
    "staking.form.button": "Coming Soon",
    "staking.form.note": "Staking will launch in Q4 2026. Stay tuned!",

    // Roadmap
    "roadmap.badge": "Roadmap",
    "roadmap.title": "A path forward.",
    "roadmap.subtitle": "Deliberate steps towards a durable ecosystem.",
    "roadmap.p1.phase": "Phase 1",
    "roadmap.p1.title": "Foundation",
    "roadmap.p1.i1": "Brand Launch",
    "roadmap.p1.i2": "Website",
    "roadmap.p1.i3": "Community",
    "roadmap.p1.i4": "Socials",
    "roadmap.p2.phase": "Phase 2",
    "roadmap.p2.title": "Expansion",
    "roadmap.p2.i1": "DEX Listing",
    "roadmap.p2.i2": "Marketing",
    "roadmap.p2.i3": "Partnerships",
    "roadmap.p3.phase": "Phase 3",
    "roadmap.p3.title": "Ecosystem",
    "roadmap.p3.i1": "Utilities",
    "roadmap.p3.i2": "Ecosystem",
    "roadmap.p3.i3": "Growth",

    // FAQ (home)
    "faq.title": "Frequently asked.",
    "faq.q1": "What is YOLO?",
    "faq.a1": "YOLO is the native token of YOLOROBINHOOD — a community-first digital asset on Robinhood Chain built around the philosophy that opportunity belongs to those willing to take action.",
    "faq.q2": "How to buy?",
    "faq.a2": "The contract will be published at launch. Once live, you'll be able to swap for YOLO on supported Robinhood Chain DEXs. Follow our socials for the official announcement.",
    "faq.q3": "What chain is it on?",
    "faq.a3": "YOLO is built on Robinhood Chain — a fast, efficient blockchain designed for low fees and quick confirmations.",
    "faq.q4": "Where is the contract?",
    "faq.a4": "The contract address is Coming Soon. It will be published exclusively through our official channels to prevent scams.",

    // Footer
    "footer.desc": "A community-driven cryptocurrency on Robinhood Chain. Built for people who believe opportunity belongs to those willing to take action.",
    "footer.navigate": "Navigate",
    "footer.community": "Community",
    "footer.copyright": "© {year} YOLOROBINHOOD. All rights reserved.",
    "footer.tagline": "You Only Live Once.",

    // Livestream Page
    "livestream.meta.title": "Live Stream & Earn | YOLOROBINHOOD",
    "livestream.meta.desc": "Stream, earn gifts, and get paid in $YOLO instantly! The future of creator monetization on Robinhood Chain.",
    "livestream.hero.badge": "LIVE STREAMING PLATFORM",
    "livestream.hero.title1": "Stream, Get Gifts,",
    "livestream.hero.title2": "Earn",
    "livestream.hero.subtitle": "Become a streamer, go live, and let your fans show love with gifts! Every gift instantly converts to $YOLO tokens and drops straight into your wallet. It's that simple!",
    "livestream.hero.learn": "Learn More",
    "livestream.how.title": "Earn in 4 Simple Steps",
    "livestream.how.subtitle": "From going live to getting paid, we've streamlined the process so you can focus on what matters most: creating great content!",
    "livestream.how.s1.title": "1. Go Live",
    "livestream.how.s1.desc": "Start your stream with one click. Engage your audience, share your passion, and build your community.",
    "livestream.how.s2.title": "2. Receive Gifts",
    "livestream.how.s2.desc": "Fans send you virtual gifts as a token of appreciation for your amazing content.",
    "livestream.how.s3.title": "3. Convert to $YOLO",
    "livestream.how.s3.desc": "Every gift automatically converts to $YOLO tokens at real-time rates. No hidden fees!",
    "livestream.how.s4.title": "4. Instant Payout",
    "livestream.how.s4.desc": "Your earnings are sent directly to your crypto wallet instantly. Withdraw anytime!",
    "livestream.benefits.title": "Benefits for Creators",
    "livestream.benefits.badge": "Why Stream on YOLO",
    "livestream.benefits.b1.title": "100% Transparent",
    "livestream.benefits.b1.desc": "See exactly how much you earn from every gift. No hidden fees or fine print.",
    "livestream.benefits.b2.title": "Instant Withdrawals",
    "livestream.benefits.b2.desc": "Your $YOLO is available immediately. Withdraw to your wallet anytime.",
    "livestream.benefits.b3.title": "Grow Your Community",
    "livestream.benefits.b3.desc": "Built-in tools to help you grow your audience and connect with fans.",
    "livestream.benefits.b4.title": "Secure & Decentralized",
    "livestream.benefits.b4.desc": "Powered by Robinhood Chain for maximum security and decentralization.",
    "livestream.benefits.b5.title": "Creator Rewards",
    "livestream.benefits.b5.desc": "Top streamers get exclusive bonuses and recognition from the community.",
    "livestream.benefits.b6.title": "Early Access",
    "livestream.benefits.b6.desc": "Be the first to test new features and shape the future of the platform.",
    "livestream.cs.title": "Launching Soon",
    "livestream.cs.subtitle": "We're putting the finishing touches on our live streaming platform. Follow us on X to be the first to know when we go live!",
    "livestream.cs.button": "Notify Me",
    "livestream.cs.follow": "Follow Us",
    "livestream.faq.title": "Common Questions",
    "livestream.faq.q1": "How do gifts convert to $YOLO?",
    "livestream.faq.a1": "Every virtual gift has a fixed $YOLO value. When a fan sends you a gift, it's automatically converted to $YOLO tokens and deposited into your wallet instantly.",
    "livestream.faq.q2": "When can I withdraw my earnings?",
    "livestream.faq.a2": "Immediately! Your earnings are available in your wallet as soon as they're received. You can withdraw or stake your $YOLO anytime.",
    "livestream.faq.q3": "Are there any fees?",
    "livestream.faq.a3": "We charge a small platform fee to keep the service running, but it's transparently displayed on every transaction. No hidden fees!",
    "livestream.faq.q4": "What kind of content can I stream?",
    "livestream.faq.a4": "Anything you're passionate about! Gaming, music, art, education, AMAs — you name it. As long as it follows our community guidelines, you're good to go.",
    "livestream.faq.q5": "Do I need to hold $YOLO to stream?",
    "livestream.faq.a5": "No, anyone can become a streamer! However, holding $YOLO may unlock special perks and features in the future.",
  },
  zh: {
    // Navbar
    "nav.about": "关于我们",
    "nav.features": "功能特点",
    "nav.token": "代币",
    "nav.staking": "质押",
    "nav.live": "直播",
    "nav.roadmap": "路线图",
    "nav.faq": "常见问题",
    "nav.buy": "购买 YOLO",

    // Hero
    "hero.badge": "基于 Robinhood Chain 构建",
    "hero.title1": "人生只有",
    "hero.title2": "一次",
    "hero.title3": "。",
    "hero.subtitle": "YOLOROBINHOOD 是一个社区驱动的加密货币，专为相信机遇属于那些愿意采取行动的人而构建。",
    "hero.join": "加入社区",

    // Partner
    "partner.title": "合作伙伴",
    "partner.name": "Robinhood Chain",

    // Banner
    "banner.badge": "YOLO / Robinhood Chain",
    "banner.text": "一个代币。一个理念。人生只有一次。",

    // About
    "about.title": "什么是 YOLOROBINHOOD？",
    "about.p1": "YOLOROBINHOOD 是一个社区优先的数字资产，其灵感来自于生活奖励大胆决策的理念。",
    "about.p2": "基于 Robinhood Chain 构建，YOLO 将现代品牌、透明的代币经济学和长期生态系统愿景融合到一个简单的理念中：",
    "about.p3": "人生只有一次。",
    "about.p4": "该项目旨在围绕创新、信心和财务自由建立一个强大的社区，同时保持简洁和专业的形象。",

    // Features
    "features.badge": "功能特点",
    "features.title": "为长期而设计。",
    "features.subtitle": "四个原则指导着 YOLO 背后的每一个决策。",
    "features.community.title": "社区驱动",
    "features.community.desc": "与持有者共同构建。",
    "features.robinhood.title": "Robinhood Chain",
    "features.robinhood.desc": "快速高效的区块链。",
    "features.secure.title": "安全可靠",
    "features.secure.desc": "透明的智能合约。",
    "features.vision.title": "长期愿景",
    "features.vision.desc": "专注于可持续的生态系统增长。",

    // Token
    "token.badge": "代币",
    "token.title": "代币信息",
    "token.subtitle": "设计透明。您需要了解的关于 YOLO 的一切。",
    "token.name.label": "代币名称",
    "token.name.value": "YOLOROBINHOOD",
    "token.ticker.label": "代码",
    "token.ticker.value": "YOLO",
    "token.network.label": "网络",
    "token.network.value": "Robinhood Chain",
    "token.contract.label": "合约",
    "token.contract.value": "即将推出",
    "token.tax.label": "税费",
    "token.tax.value": "0 / 0",
    "token.liquidity.label": "流动性",
    "token.liquidity.value": "已锁定",
    "token.ownership.label": "所有权",
    "token.ownership.value": "已放弃",

    // Staking
    "staking.badge": "质押",
    "staking.title": "质押 YOLO，赚取奖励",
    "staking.subtitle": "锁定您的 YOLO 代币，在支持网络的同时赚取高 APY。即将推出！",
    "staking.plan1.badge": "灵活",
    "staking.plan1.duration": "7 天",
    "staking.plan1.f1": "灵活取款",
    "staking.plan1.f2": "无最低限制",
    "staking.plan1.f3": "即时奖励分配",
    "staking.plan2.badge": "热门",
    "staking.plan2.duration": "30 天",
    "staking.plan2.f1": "额外奖励",
    "staking.plan2.f2": "提前解锁罚款",
    "staking.plan2.f3": "优先支持",
    "staking.plan3.badge": "最高 APY",
    "staking.plan3.duration": "90 天",
    "staking.plan3.f1": "最高 APY",
    "staking.plan3.f2": "治理权",
    "staking.plan3.f3": "独家福利",
    "staking.stat1.label": "总质押量",
    "staking.stat1.value": "1250万 YOLO",
    "staking.stat2.label": "活跃质押者",
    "staking.stat2.value": "8,421",
    "staking.stat3.label": "平均时长",
    "staking.stat3.value": "45 天",
    "staking.form.balance": "余额",
    "staking.form.amount": "质押数量",
    "staking.form.duration": "时长",
    "staking.form.apy": "APY",
    "staking.form.est": "预计奖励（年）",
    "staking.form.button": "即将推出",
    "staking.form.note": "质押将于 2026 年第四季度推出。敬请关注！",

    // Roadmap
    "roadmap.badge": "路线图",
    "roadmap.title": "前进之路。",
    "roadmap.subtitle": "迈向持久生态系统的审慎步骤。",
    "roadmap.p1.phase": "第一阶段",
    "roadmap.p1.title": "基础",
    "roadmap.p1.i1": "品牌发布",
    "roadmap.p1.i2": "网站",
    "roadmap.p1.i3": "社区",
    "roadmap.p1.i4": "社交媒体",
    "roadmap.p2.phase": "第二阶段",
    "roadmap.p2.title": "扩张",
    "roadmap.p2.i1": "DEX 上线",
    "roadmap.p2.i2": "营销",
    "roadmap.p2.i3": "合作伙伴",
    "roadmap.p3.phase": "第三阶段",
    "roadmap.p3.title": "生态系统",
    "roadmap.p3.i1": "实用工具",
    "roadmap.p3.i2": "生态系统",
    "roadmap.p3.i3": "增长",

    // FAQ (home)
    "faq.title": "常见问题。",
    "faq.q1": "什么是 YOLO？",
    "faq.a1": "YOLO 是 YOLOROBINHOOD 的原生代币——一个基于 Robinhood Chain 的社区优先数字资产，围绕机遇属于愿意采取行动的人的理念构建。",
    "faq.q2": "如何购买？",
    "faq.a2": "合约将在发布时公布。一旦上线，您将能够在支持的 Robinhood Chain DEX 上兑换 YOLO。请关注我们的社交媒体以获取官方公告。",
    "faq.q3": "它在哪个链上？",
    "faq.a3": "YOLO 基于 Robinhood Chain 构建——一种为低费用和快速确认而设计的快速高效区块链。",
    "faq.q4": "合约在哪里？",
    "faq.a4": "合约地址即将推出。它将仅通过我们的官方渠道发布，以防止诈骗。",

    // Footer
    "footer.desc": "基于 Robinhood Chain 的社区驱动加密货币。专为相信机遇属于愿意采取行动的人而构建。",
    "footer.navigate": "导航",
    "footer.community": "社区",
    "footer.copyright": "© {year} YOLOROBINHOOD。保留所有权利。",
    "footer.tagline": "人生只有一次。",

    // Livestream Page
    "livestream.meta.title": "直播并赚取 | YOLOROBINHOOD",
    "livestream.meta.desc": "直播、收礼、即时获得 $YOLO 报酬！Robinhood Chain 上创作者变现的未来。",
    "livestream.hero.badge": "直播平台",
    "livestream.hero.title1": "直播、收礼、",
    "livestream.hero.title2": "赚取",
    "livestream.hero.subtitle": "成为主播，开始直播，让粉丝用礼物表达爱意！每份礼物会即时转换为 $YOLO 代币并直接进入您的钱包。就这么简单！",
    "livestream.hero.learn": "了解更多",
    "livestream.how.title": "4 个简单步骤赚取收益",
    "livestream.how.subtitle": "从开始直播到获得报酬，我们简化了流程，让您可以专注于最重要的事情：创造优质内容！",
    "livestream.how.s1.title": "1. 开始直播",
    "livestream.how.s1.desc": "一键开启直播。与观众互动，分享您的热情，建立您的社区。",
    "livestream.how.s2.title": "2. 收取礼物",
    "livestream.how.s2.desc": "粉丝发送虚拟礼物，作为对您精彩内容的赞赏。",
    "livestream.how.s3.title": "3. 转换为 $YOLO",
    "livestream.how.s3.desc": "每份礼物以实时汇率自动转换为 $YOLO 代币。无隐藏费用！",
    "livestream.how.s4.title": "4. 即时提现",
    "livestream.how.s4.desc": "您的收益立即发送到您的加密钱包。随时可以提现！",
    "livestream.benefits.title": "创作者福利",
    "livestream.benefits.badge": "为什么选择 YOLO 直播",
    "livestream.benefits.b1.title": "100% 透明",
    "livestream.benefits.b1.desc": "准确查看您从每份礼物中赚取多少。无隐藏费用或小字条款。",
    "livestream.benefits.b2.title": "即时提现",
    "livestream.benefits.b2.desc": "您的 $YOLO 立即可用。随时提现到您的钱包。",
    "livestream.benefits.b3.title": "发展您的社区",
    "livestream.benefits.b3.desc": "内置工具帮助您增长观众并与粉丝联系。",
    "livestream.benefits.b4.title": "安全且去中心化",
    "livestream.benefits.b4.desc": "由 Robinhood Chain 提供动力，确保最大安全性和去中心化。",
    "livestream.benefits.b5.title": "创作者奖励",
    "livestream.benefits.b5.desc": "顶级主播获得社区的独家奖励和认可。",
    "livestream.benefits.b6.title": "提前访问",
    "livestream.benefits.b6.desc": "成为第一个测试新功能并塑造平台未来的人。",
    "livestream.cs.title": "即将推出",
    "livestream.cs.subtitle": "我们正在为直播平台进行最后的润色。在 X 上关注我们，第一时间知道我们何时上线！",
    "livestream.cs.button": "通知我",
    "livestream.cs.follow": "关注我们",
    "livestream.faq.title": "常见问题",
    "livestream.faq.q1": "礼物如何转换为 $YOLO？",
    "livestream.faq.a1": "每个虚拟礼物都有固定的 $YOLO 价值。当粉丝给您发送礼物时，它会自动转换为 $YOLO 代币并立即存入您的钱包。",
    "livestream.faq.q2": "我何时可以提现我的收益？",
    "livestream.faq.a2": "立即！您的收益一收到就可以在钱包中使用。您可以随时提现或质押您的 $YOLO。",
    "livestream.faq.q3": "有任何费用吗？",
    "livestream.faq.a3": "我们收取少量平台费用以维持服务运行，但它会透明地显示在每笔交易上。无隐藏费用！",
    "livestream.faq.q4": "我可以直播什么类型的内容？",
    "livestream.faq.a4": "您热爱的任何内容！游戏、音乐、艺术、教育、AMA——应有尽有。只要符合我们的社区准则，就没问题。",
    "livestream.faq.q5": "我需要持有 $YOLO 才能直播吗？",
    "livestream.faq.a5": "不，任何人都可以成为主播！然而，持有 $YOLO 可能会在未来解锁特殊福利和功能。",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      return (saved as Language) || "en";
    }
    return "en";
  });

  useEffect(() => {
    // Only access localStorage on the client
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  const t = (key: string): string => {
    const text = translations[language][key as keyof typeof translations.en] || key;
    return text.replace("{year}", new Date().getFullYear().toString());
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
