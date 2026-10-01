# gefei-seo-cookbook 方法论对照审计 — CalcPilot

> 审计日期：2026-10-01｜教程：`gefei-seo-cookbook/seo-book`（20 篇全部精读）
> 本文档把教程方法论逐条映射到 CalcPilot 现状，标注【已符合 / 本轮补齐 / 合理偏离 / 待办】
> 验证：`npm run seo:audit` → 56 页 / 0 error / 0 warning

---

## 一、审计总览

| 教程章节 | 核心要求 | CalcPilot 状态 |
|---|---|---|
| 技术 SEO / 搜索引擎原理 | SSG/SSR 渲染、robots、sitemap、canonical、HTTPS、结构化数据 | ✅ 已符合 |
| On-Page SEO（TDH） | 唯一 Title/Description/H1、50–60 字符、关键词前置 | ✅ 已符合（seo:validate 机器检查） |
| 网站架构 | ≤3 层深度、面包屑、描述性锚文本、内链 3–5/页 | ✅ 已符合 |
| 程序化 SEO | 新站不批量发页、一词一页、**首页新鲜度加速** | ✅ 节奏正确； freshness 模块【本轮补齐】 |
| 排名因素 2025 | 链接多样性（深层内页外/内链）、引用权威外链=信任分 | footer 深链【本轮补齐】；NIST 引用已有 |
| 内容 SEO | 首页主题聚焦、工具页说明+FAQ、免费无登录 | ✅ 已符合 |
| 关键词研究 | KGR、长尾优先、GSC 驱动循环 | ✅ 已符合（reports/seo/kgr.json、GSC-WEEKLY-TRACKING） |
| 外链 | 质量优先、锚文本多样化、不买链 | ✅ 阶段正确（GSC 诊断判定暂不重点投入） |
| AI SEO | llms.txt、内容可引用性（结构化+数据+来源） | ✅ 已符合；品牌平台布局为站外待办 |
| 多语言 SEO | hreflang/子目录 | 合理偏离：主攻 US/UK/CA/AU 英语，暂不做 |
| 数据分析 | 每周 GSC、每月索引报告 | ✅ 已有周跟踪文档 |

## 二、本轮按教程补齐的两项

### 1. 首页新鲜度加速模块（programmatic-seo 第五章）

教程原文：「在首页展示最新的 N 个内页链接，是加速 Googlebot 爬取和新页面收录的可靠方法……Googlebot 最频繁爬取的就是首页。」

**实施**：`src/data/site.ts` 新增 `latestSlugs`（最新 6 页，手工维护），首页新增 **"Latest tools & pages"** 区块（复用 tool-list 样式）。今后每发新页面，把 slug 加进该数组即可——Googlebot 首访首页就能发现新 URL，不必等 sitemap 处理。

### 2. Footer 深层内链（排名因素 + 网站架构章）

教程依据：2025 排名因素新增「链接多样性——来自不同类型网站的链接，以及**指向深层内页的链接（而非全部指向首页）**」；架构章 Toolify 式页脚让任何页面 3 步可达。

**实施**：`footerToolSlugs`（8 个高价值深层页）→ 全站 56 页页脚新增 **"Popular tools"** 列（KG to LBS / LBS to KG / cm to Inches / Liters to Gallons / MB to GB / Percentage / Salary / Mortgage，均为完整描述性锚文本）。深层工具页因此获得全站级内链投票。

## 三、教程检查清单逐项核对（抽样）

### 技术 SEO 检查清单
- [x] robots.txt 正确（Allow 全站 + Disallow /search + sitemap 指向）
- [x] Sitemap 只含规范页、lastmod=构建日期、已提交 GSC
- [x] HTTPS + HTTP→HTTPS（Vercel）
- [x] 无前端渲染：Astro SSG，全部内容在 HTML 源码中（教程三令五申的红线）
- [x] 结构化数据：Organization + WebSite + WebPage + BreadcrumbList（每页）+ WebApplication + HowTo + FAQPage
- [x] canonical 每页指向自身绝对 URL

### On-Page（TDH）清单
- [x] Title 唯一、50–60 字符、关键词前置（seo:validate 校验）
- [x] Description 唯一、150–160 字符、答案优先
- [x] 每页唯一 H1 含关键词；H2/H3 层级清晰
- [x] 无 Keywords meta（教程：已死 10 年）

### 架构清单
- [x] 全站 3 层内（首页 → 分类 → 工具/长尾页），面包屑导航 + BreadcrumbList
- [x] 内链：每页 3–8 个描述性锚文本内链，无「点击这里」
- [x] URL 小写连字符、含关键词、无参数

### 程序化 SEO 红线（新站协议）
- [x] CalcPilot 符合教程「新站」定义（引用域名 <100），故坚持：一词一页、GSC 验证（impressions ≥ 2）才建页、拒绝批量数字页
- [x] 每页有独立价值（公式+图表+单位换算+FAQ+反向换算），非模板薄内容

## 四、合理偏离记录（与教程建议不同，有意为之）

1. **Title 去品牌尾巴**：教程建议 Title 结尾加品牌名；但长尾数值页按竞品拆解结论去掉 `| CalcPilot`——未成熟品牌在 title 中只消耗点击欲。工具页保留品牌。
2. **子域名策略未采用**：日本工具站案例用子域名聚焦关键词，但那是 2016 年起家的老站；CalcPilot 处于新站期，子目录共享权重（教程架构章：同一主题用子目录）更稳。
3. **多语言暂缓**：教程有完整 hreflang 章；GSC 数据显示流量 100% 来自英语区，先做深英语。

## 五、站外待办（教程要求、非代码能完成）

- **AI SEO 品牌布局**：在 Reddit（r/askmath、r/personalfinance）与 Quora 回答相关问题并自然提及 CalcPilot——AI 搜索引擎最常引用社区内容，纯文本 URL 也能被捕获。
- **基础外链**：按 `docs/LINK-BUILDING-PLAN.md` 执行目录提交与资源页外联；锚文本保持品牌词/URL/通用词多样化（教程惩罚恢复章的教训：锚文本单一化曾致展示量暴跌 94%）。
- **PageSpeed 实测**：教程要求 LCP/FID/CLS 达标。代码侧已最优（SSG、自托管字体、内联关键 CSS、无第三方 JS 除 Analytics），上线后用 pagespeed.web.dev 跑一次首页与 kg-to-lbs 页留档。
