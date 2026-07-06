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
    "hero.subtitle": "YOLOROBINHOOD is a comprehensive decentralized ecosystem on Robinhood Chain, featuring staking rewards, a creator live-streaming platform, and transparent tokenomics. Empowering communities and creators through blockchain innovation.",
    "hero.join": "Join Community",

    // Partner
    "partner.title": "In partnership with",
    "partner.name": "Robinhood Chain",

    // Banner
    "banner.badge": "YOLO / Robinhood Chain",
    "banner.text": "One token. One ecosystem. Stake, Stream, and Earn.",

    // About
    "about.title": "What is YOLOROBINHOOD?",
    "about.p1": "YOLOROBINHOOD is a multi-faceted decentralized finance and creator platform built on Robinhood Chain, designed to foster sustainable growth, community engagement, and creator monetization through innovative blockchain technology.",
    "about.p2": "Our ecosystem integrates three core pillars: transparent tokenomics for secure value transfer, a high-yield staking program for passive income, and a revolutionary live-streaming platform where creators earn $YOLO instantly from fan gifts.",
    "about.p3": "Built with security, transparency, and long-term sustainability at its core, YOLOROBINHOOD is committed to delivering real utility and value to every participant in our ecosystem.",
    "about.p4": "Join us as we build the future of decentralized finance and creator economy on Robinhood Chain.",

    // Features
    "features.badge": "Ecosystem Features",
    "features.title": "A Complete DeFi & Creator Ecosystem",
    "features.subtitle": "Three core pillars powering the YOLOROBINHOOD experience.",
    "features.community.title": "Staking Program",
    "features.community.desc": "Earn high APY by staking YOLO tokens with flexible lock-up periods.",
    "features.robinhood.title": "Live Streaming",
    "features.robinhood.desc": "Content creators monetize directly via gifts convertible to YOLO.",
    "features.secure.title": "Secure & Transparent",
    "features.secure.desc": "Renounced contract, locked liquidity, and 0% buy/sell taxes.",
    "features.vision.title": "Robinhood Chain",
    "features.vision.desc": "Fast, low-cost transactions on a reliable, scalable blockchain.",

    // Token
    "token.badge": "Tokenomics",
    "token.title": "Transparent Token Information",
    "token.subtitle": "Complete transparency in every aspect of our token design.",
    "token.name.label": "Token Name",
    "token.name.value": "YOLOROBINHOOD",
    "token.ticker.label": "Ticker",
    "token.ticker.value": "YOLO",
    "token.network.label": "Network",
    "token.network.value": "Robinhood Chain",
    "token.contract.label": "Contract",
    "token.contract.value": "0xb8e3f6a6e3bfd5bb965cc28a2dd7f2e5b7c802fb",
    "token.tax.label": "Buy/Sell Tax",
    "token.tax.value": "0 / 0",
    "token.liquidity.label": "Liquidity",
    "token.liquidity.value": "Locked",
    "token.ownership.label": "Contract Ownership",
    "token.ownership.value": "Renounced",

    // Staking
    "staking.badge": "Staking Program",
    "staking.title": "Stake YOLO & Earn Competitive Rewards",
    "staking.subtitle": "Participate in network security while earning attractive yields through our flexible staking program with multiple duration options.",
    "staking.plan1.badge": "Flexible",
    "staking.plan1.duration": "7 Days",
    "staking.plan1.f1": "Flexible withdrawal",
    "staking.plan1.f2": "No minimum deposit",
    "staking.plan1.f3": "Daily reward distribution",
    "staking.plan2.badge": "Popular",
    "staking.plan2.duration": "30 Days",
    "staking.plan2.f1": "Enhanced APY",
    "staking.plan2.f2": "Early unlock available with fee",
    "staking.plan2.f3": "Priority support access",
    "staking.plan3.badge": "Max APY",
    "staking.plan3.duration": "90 Days",
    "staking.plan3.f1": "Maximum yield potential",
    "staking.plan3.f2": "Governance participation",
    "staking.plan3.f3": "Exclusive ecosystem perks",
    "staking.stat1.label": "Total Value Staked",
    "staking.stat1.value": "12.5M YOLO",
    "staking.stat2.label": "Active Stakers",
    "staking.stat2.value": "8,421",
    "staking.stat3.label": "Average Staking Duration",
    "staking.stat3.value": "45 Days",
    "staking.form.balance": "Available Balance",
    "staking.form.amount": "Amount to Stake",
    "staking.form.duration": "Lock-Up Duration",
    "staking.form.apy": "Annual Percentage Yield",
    "staking.form.est": "Estimated Annual Rewards",
    "staking.form.button": "Coming Soon",
    "staking.form.note": "Staking platform launch scheduled for Q4 2026. Stay connected for updates!",

    // Roadmap
    "roadmap.badge": "Development Roadmap",
    "roadmap.title": "Our Strategic Path Forward",
    "roadmap.subtitle": "Phased development ensuring sustainable ecosystem growth and value creation.",
    "roadmap.p1.phase": "Phase 1",
    "roadmap.p1.title": "Foundation & Launch",
    "roadmap.p1.i1": "Brand & Identity Launch",
    "roadmap.p1.i2": "Official Website",
    "roadmap.p1.i3": "Community Building",
    "roadmap.p1.i4": "Social Media Presence",
    "roadmap.p2.phase": "Phase 2",
    "roadmap.p2.title": "Expansion & Growth",
    "roadmap.p2.i1": "DEX Listings",
    "roadmap.p2.i2": "Strategic Marketing",
    "roadmap.p2.i3": "Key Partnerships",
    "roadmap.p3.phase": "Phase 3",
    "roadmap.p3.title": "Ecosystem Utilities",
    "roadmap.p3.i1": "Staking Platform",
    "roadmap.p3.i2": "Live Streaming Platform",
    "roadmap.p3.i3": "Ecosystem Expansion",

    // FAQ (home)
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "What is YOLOROBINHOOD?",
    "faq.a1": "YOLOROBINHOOD is a comprehensive decentralized ecosystem on Robinhood Chain featuring staking rewards, a creator live-streaming platform, and transparent tokenomics. It empowers both holders and creators through innovative blockchain technology.",
    "faq.q2": "How can I purchase YOLO tokens?",
    "faq.a2": "The official contract address will be published at launch. Once deployed, YOLO will be available for trading on supported decentralized exchanges (DEXs) on Robinhood Chain. Follow our official social channels for announcements.",
    "faq.q3": "Which blockchain is YOLOROBINHOOD built on?",
    "faq.a3": "YOLOROBINHOOD is built on Robinhood Chain, a fast, secure, and efficient blockchain designed for low transaction fees and rapid confirmation times.",
    "faq.q4": "Where can I find the official contract address?",
    "faq.a4": "The contract address will be announced exclusively through our official social media channels and website to protect our community from scams and fraudulent addresses.",

    // Footer
    "footer.desc": "A comprehensive decentralized ecosystem on Robinhood Chain featuring staking, live streaming, and transparent tokenomics. Empowering communities and creators.",
    "footer.navigate": "Navigate",
    "footer.community": "Community",
    "footer.copyright": "© {year} YOLOROBINHOOD. All rights reserved.",
    "footer.tagline": "Stake. Stream. Earn. You Only Live Once.",

    // Livestream Page
    "livestream.meta.title": "Creator Live Streaming Platform | YOLOROBINHOOD",
    "livestream.meta.desc": "Monetize your content through live streaming! Receive gifts from fans that instantly convert to $YOLO tokens on Robinhood Chain.",
    "livestream.hero.badge": "CREATOR MONETIZATION PLATFORM",
    "livestream.hero.title1": "Stream. Earn.",
    "livestream.hero.title2": "Grow.",
    "livestream.hero.subtitle": "Join the next generation of content creators. Go live, engage your audience, receive virtual gifts, and get paid instantly in $YOLO tokens directly to your crypto wallet. A revolutionary way to monetize your passion.",
    "livestream.hero.learn": "Discover More",
    "livestream.how.title": "How It Works",
    "livestream.how.subtitle": "A streamlined process designed to let creators focus on what they do best: creating amazing content.",
    "livestream.how.s1.title": "1. Start Streaming",
    "livestream.how.s1.desc": "Launch your live stream with a single click. Connect with your audience, share your expertise, and build your community.",
    "livestream.how.s2.title": "2. Receive Gifts",
    "livestream.how.s2.desc": "Fans show appreciation by sending virtual gifts during your live streams as a recognition of your valuable content.",
    "livestream.how.s3.title": "3. Auto-Convert to $YOLO",
    "livestream.how.s3.desc": "Every gift is automatically converted to $YOLO tokens at transparent real-time rates with no hidden fees.",
    "livestream.how.s4.title": "4. Instant Wallet Payout",
    "livestream.how.s4.desc": "Your earnings are deposited directly into your crypto wallet immediately. Withdraw, stake, or hold at your discretion.",
    "livestream.benefits.title": "Why Choose YOLOROBINHOOD?",
    "livestream.benefits.badge": "Creator-Centric Benefits",
    "livestream.benefits.b1.title": "Full Transparency",
    "livestream.benefits.b1.desc": "Real-time earning tracking with complete visibility into every transaction and conversion rate.",
    "livestream.benefits.b2.title": "Instant Liquidity",
    "livestream.benefits.b2.desc": "Immediate access to your earnings with no waiting periods or withdrawal restrictions.",
    "livestream.benefits.b3.title": "Community Growth Tools",
    "livestream.benefits.b3.desc": "Integrated features to help you expand your audience and deepen fan engagement.",
    "livestream.benefits.b4.title": "Decentralized Security",
    "livestream.benefits.b4.desc": "Powered by Robinhood Chain for institutional-grade security and censorship resistance.",
    "livestream.benefits.b5.title": "Creator Incentive Program",
    "livestream.benefits.b5.desc": "Exclusive bonuses, recognition, and early access for top-performing creators.",
    "livestream.benefits.b6.title": "Early Adopter Privileges",
    "livestream.benefits.b6.desc": "Be among the first to test new features and influence platform development.",
    "livestream.cs.title": "Coming Soon",
    "livestream.cs.subtitle": "Our live streaming platform is in final development. Follow us on X to receive launch notifications and be part of the creator revolution.",
    "livestream.cs.button": "Get Notified",
    "livestream.cs.follow": "Follow Us",
    "livestream.faq.title": "Creator FAQ",
    "livestream.faq.q1": "How are gifts converted to $YOLO tokens?",
    "livestream.faq.a1": "Each virtual gift has a pre-determined $YOLO value. When received, gifts are automatically converted and deposited into your connected crypto wallet instantly with no manual processing required.",
    "livestream.faq.q2": "How quickly can I access my earnings?",
    "livestream.faq.a2": "Immediately! Your $YOLO tokens are available in your wallet as soon as they are received. You can withdraw, stake, or transfer your earnings at any time without delay.",
    "livestream.faq.q3": "Are there any platform fees?",
    "livestream.faq.a3": "A minimal, transparent platform fee is applied to maintain and improve the service. All fees are clearly displayed before any transaction is completed—no hidden charges.",
    "livestream.faq.q4": "What content categories are allowed?",
    "livestream.faq.a4": "We welcome all creative and legitimate content including gaming, music, art, education, AMAs, podcasts, and more—provided it adheres to our community guidelines and terms of service.",
    "livestream.faq.q5": "Is $YOLO token holding required to stream?",
    "livestream.faq.a5": "No, any creator can join and start streaming regardless of token holdings. However, holding $YOLO may unlock premium features, enhanced visibility, and exclusive creator benefits in the future.",
  },
  zh: {
    // Navbar
    "nav.about": "关于我们",
    "nav.features": "生态系统",
    "nav.token": "代币",
    "nav.staking": "质押",
    "nav.live": "直播",
    "nav.roadmap": "路线图",
    "nav.faq": "常见问题",
    "nav.buy": "购买 YOLO",

    // Hero
    "hero.badge": "基于 Robinhood Chain 构建",
    "hero.title1": "You only",
    "hero.title2": "live",
    "hero.title3": "once.",
    "hero.subtitle": "YOLOROBINHOOD 是一个基于 Robinhood Chain 的综合去中心化生态系统，包含质押奖励、创作者直播平台和透明的代币经济学。通过区块链创新赋能社区和创作者。",
    "hero.join": "加入社区",

    // Partner
    "partner.title": "合作伙伴",
    "partner.name": "Robinhood Chain",

    // Banner
    "banner.badge": "YOLO / Robinhood Chain",
    "banner.text": "一个代币。一个生态系统。质押、直播、赚取。",

    // About
    "about.title": "什么是 YOLOROBINHOOD？",
    "about.p1": "YOLOROBINHOOD 是一个基于 Robinhood Chain 构建的多面去中心化金融和创作者平台，旨在通过创新的区块链技术促进可持续增长、社区参与和创作者变现。",
    "about.p2": "我们的生态系统整合了三大核心支柱：用于安全价值转移的透明代币经济学、用于被动收入的高收益质押计划，以及让创作者从粉丝礼物中即时赚取 $YOLO 的革命性直播平台。",
    "about.p3": "YOLOROBINHOOD 以安全、透明和长期可持续性为核心，致力于为生态系统中的每个参与者提供真正的实用性和价值。",
    "about.p4": "加入我们，在 Robinhood Chain 上构建去中心化金融和创作者经济的未来。",

    // Features
    "features.badge": "生态系统功能",
    "features.title": "完整的 DeFi 与创作者生态系统",
    "features.subtitle": "三大核心支柱驱动 YOLOROBINHOOD 体验。",
    "features.community.title": "质押计划",
    "features.community.desc": "通过灵活锁定期限质押 YOLO 代币，赚取高 APY。",
    "features.robinhood.title": "直播平台",
    "features.robinhood.desc": "内容创作者通过可兑换为 YOLO 的礼物直接变现。",
    "features.secure.title": "安全与透明",
    "features.secure.desc": "已放弃合约、锁定流动性，0% 买卖税。",
    "features.vision.title": "Robinhood Chain",
    "features.vision.desc": "可靠、可扩展区块链上的快速、低成本交易。",

    // Token
    "token.badge": "代币经济学",
    "token.title": "透明的代币信息",
    "token.subtitle": "代币设计各方面的完全透明度。",
    "token.name.label": "代币名称",
    "token.name.value": "YOLOROBINHOOD",
    "token.ticker.label": "代码",
    "token.ticker.value": "YOLO",
    "token.network.label": "网络",
    "token.network.value": "Robinhood Chain",
    "token.contract.label": "合约地址",
    "token.contract.value": "0xb8e3f6a6e3bfd5bb965cc28a2dd7f2e5b7c802fb",
    "token.tax.label": "买卖税",
    "token.tax.value": "0 / 0",
    "token.liquidity.label": "流动性",
    "token.liquidity.value": "已锁定",
    "token.ownership.label": "合约所有权",
    "token.ownership.value": "已放弃",

    // Staking
    "staking.badge": "质押计划",
    "staking.title": "质押 YOLO 赚取丰厚奖励",
    "staking.subtitle": "通过我们灵活的多期限质押计划，在参与网络安全的同时获得有吸引力的收益。",
    "staking.plan1.badge": "灵活",
    "staking.plan1.duration": "7 天",
    "staking.plan1.f1": "灵活取款",
    "staking.plan1.f2": "无最低存款",
    "staking.plan1.f3": "每日奖励分配",
    "staking.plan2.badge": "热门",
    "staking.plan2.duration": "30 天",
    "staking.plan2.f1": "增强 APY",
    "staking.plan2.f2": "提前解锁（收取费用）",
    "staking.plan2.f3": "优先支持访问",
    "staking.plan3.badge": "最高 APY",
    "staking.plan3.duration": "90 天",
    "staking.plan3.f1": "最大收益潜力",
    "staking.plan3.f2": "治理参与",
    "staking.plan3.f3": "独家生态系统福利",
    "staking.stat1.label": "质押总价值",
    "staking.stat1.value": "1250万 YOLO",
    "staking.stat2.label": "活跃质押者",
    "staking.stat2.value": "8,421",
    "staking.stat3.label": "平均质押期限",
    "staking.stat3.value": "45 天",
    "staking.form.balance": "可用余额",
    "staking.form.amount": "质押数量",
    "staking.form.duration": "锁定期限",
    "staking.form.apy": "年化收益率",
    "staking.form.est": "预计年收益",
    "staking.form.button": "即将推出",
    "staking.form.note": "质押平台计划于 2026 年第四季度推出。保持关注获取更新！",

    // Roadmap
    "roadmap.badge": "发展路线图",
    "roadmap.title": "我们的战略发展路径",
    "roadmap.subtitle": "分阶段开发确保可持续的生态系统增长和价值创造。",
    "roadmap.p1.phase": "第一阶段",
    "roadmap.p1.title": "基础与启动",
    "roadmap.p1.i1": "品牌与标识发布",
    "roadmap.p1.i2": "官方网站",
    "roadmap.p1.i3": "社区建设",
    "roadmap.p1.i4": "社交媒体布局",
    "roadmap.p2.phase": "第二阶段",
    "roadmap.p2.title": "扩张与增长",
    "roadmap.p2.i1": "DEX 上线",
    "roadmap.p2.i2": "战略营销",
    "roadmap.p2.i3": "重要合作伙伴",
    "roadmap.p3.phase": "第三阶段",
    "roadmap.p3.title": "生态系统实用工具",
    "roadmap.p3.i1": "质押平台",
    "roadmap.p3.i2": "直播平台",
    "roadmap.p3.i3": "生态系统扩张",

    // FAQ (home)
    "faq.title": "常见问题",
    "faq.q1": "什么是 YOLOROBINHOOD？",
    "faq.a1": "YOLOROBINHOOD 是一个基于 Robinhood Chain 的综合去中心化生态系统，包含质押奖励、创作者直播平台和透明的代币经济学。通过创新的区块链技术赋能持有者和创作者。",
    "faq.q2": "如何购买 YOLO 代币？",
    "faq.a2": "官方合约地址将在发布时公布。部署后，YOLO 将可在 Robinhood Chain 上支持的去中心化交易所（DEX）进行交易。请关注我们的官方社交渠道获取公告。",
    "faq.q3": "YOLOROBINHOOD 建立在哪个区块链上？",
    "faq.a3": "YOLOROBINHOOD 建立在 Robinhood Chain 上，这是一个快速、安全、高效的区块链，专为低交易费用和快速确认时间而设计。",
    "faq.q4": "在哪里可以找到官方合约地址？",
    "faq.a4": "合约地址将仅通过我们的官方社交媒体渠道和网站公布，以保护我们的社区免受诈骗和欺诈地址的侵害。",

    // Footer
    "footer.desc": "基于 Robinhood Chain 的综合去中心化生态系统，包含质押、直播和透明的代币经济学。赋能社区和创作者。",
    "footer.navigate": "导航",
    "footer.community": "社区",
    "footer.copyright": "© {year} YOLOROBINHOOD。保留所有权利。",
    "footer.tagline": "质押、直播、赚取。人生只有一次。",

    // Livestream Page
    "livestream.meta.title": "创作者直播平台 | YOLOROBINHOOD",
    "livestream.meta.desc": "通过直播变现您的内容！从粉丝那里接收礼物，这些礼物会在 Robinhood Chain 上即时转换为 $YOLO 代币。",
    "livestream.hero.badge": "创作者变现平台",
    "livestream.hero.title1": "直播、赚取、",
    "livestream.hero.title2": "成长。",
    "livestream.hero.subtitle": "加入下一代内容创作者。开始直播，与观众互动，接收虚拟礼物，并通过 $YOLO 代币即时获得报酬，直接发送到您的加密钱包。一种革命性的变现方式。",
    "livestream.hero.learn": "发现更多",
    "livestream.how.title": "如何运作",
    "livestream.how.subtitle": "简化的流程旨在让创作者专注于他们最擅长的事情：创造精彩内容。",
    "livestream.how.s1.title": "1. 开始直播",
    "livestream.how.s1.desc": "一键启动直播。与观众建立联系，分享您的专业知识，构建您的社区。",
    "livestream.how.s2.title": "2. 接收礼物",
    "livestream.how.s2.desc": "粉丝在您的直播期间发送虚拟礼物，以表达对您宝贵内容的认可。",
    "livestream.how.s3.title": "3. 自动转换为 $YOLO",
    "livestream.how.s3.desc": "每份礼物以透明的实时汇率自动转换为 $YOLO 代币，无隐藏费用。",
    "livestream.how.s4.title": "4. 即时钱包付款",
    "livestream.how.s4.desc": "您的收益立即直接存入您的加密钱包。可自行决定提现、质押或持有。",
    "livestream.benefits.title": "为什么选择 YOLOROBINHOOD？",
    "livestream.benefits.badge": "以创作者为中心的福利",
    "livestream.benefits.b1.title": "完全透明",
    "livestream.benefits.b1.desc": "实时收益跟踪，完全可见每笔交易和转换率。",
    "livestream.benefits.b2.title": "即时流动性",
    "livestream.benefits.b2.desc": "立即访问您的收益，无等待期或提现限制。",
    "livestream.benefits.b3.title": "社区增长工具",
    "livestream.benefits.b3.desc": "集成功能帮助您扩大观众群并深化粉丝互动。",
    "livestream.benefits.b4.title": "去中心化安全",
    "livestream.benefits.b4.desc": "由 Robinhood Chain 提供机构级安全和抗审查能力。",
    "livestream.benefits.b5.title": "创作者激励计划",
    "livestream.benefits.b5.desc": "为表现最佳的创作者提供独家奖金、认可和早期访问权限。",
    "livestream.benefits.b6.title": "早期采用者特权",
    "livestream.benefits.b6.desc": "成为第一批测试新功能并影响平台发展的人。",
    "livestream.cs.title": "即将推出",
    "livestream.cs.subtitle": "我们的直播平台正在最后开发阶段。在 X 上关注我们以接收启动通知，并成为创作者革命的一部分。",
    "livestream.cs.button": "获取通知",
    "livestream.cs.follow": "关注我们",
    "livestream.faq.title": "创作者常见问题",
    "livestream.faq.q1": "礼物如何转换为 $YOLO 代币？",
    "livestream.faq.a1": "每个虚拟礼物都有预先确定的 $YOLO 价值。收到后，礼物会自动转换并立即存入您连接的加密钱包，无需手动处理。",
    "livestream.faq.q2": "我可以多快访问我的收益？",
    "livestream.faq.a2": "立即！您的 $YOLO 代币一收到就可以在钱包中使用。您可以随时提现、质押或转移您的收益，无需延迟。",
    "livestream.faq.q3": "有任何平台费用吗？",
    "livestream.faq.a3": "收取最低限度的透明平台费用以维护和改进服务。所有费用在任何交易完成前都会清晰显示——无隐藏费用。",
    "livestream.faq.q4": "允许哪些内容类别？",
    "livestream.faq.a4": "我们欢迎所有创意和合法内容，包括游戏、音乐、艺术、教育、AMA、播客等——只要符合我们的社区准则和服务条款。",
    "livestream.faq.q5": "直播需要持有 $YOLO 代币吗？",
    "livestream.faq.a5": "不需要，任何创作者都可以加入并开始直播，无论代币持有情况如何。然而，持有 $YOLO 未来可能会解锁高级功能、增强可见性和独家创作者福利。",
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
