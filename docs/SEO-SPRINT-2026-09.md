# SEO 施工单执行报告 · calc pilot.net

执行日期：2026-09-14
站型：Astro 5 静态站（SSG）+ Vercel
构建结果：**52 个页面**（施工前 40 个 HTML），`astro check` 0 error，自建校验脚本 0 error / 0 warning

---

## 0. 一句话结论

三周施工单的**全部 12 个动作**已落地并构建验证：样板页改造成「能进前 20」的结构、重量族 6 个反向页 + gb-to-mb、5 个数值页、`/converters` 正文、sitemap `lastmod`、`/sitemap.xml` 301、移动端收尾核查。外链部分按施工单要求**不在本轮执行**，已产出预算方案（`LINK-BUILDING-PLAN.md`），触发条件是重点页曝光进 30 位以内。

---

## 1. 第一周 · kg-to-lbs 样板页改造

目标页：`/converters/kg-to-lbs-converter`
数据源：`src/data/converters.ts`（weight 条目）
渲染组件：`src/components/ConverterTool.astro`

### ① Title / Description

| 项 | 施工前 | 施工后 | 字符数 |
|---|---|---|---:|
| Title | kg to lbs Converter — Free kg to lb Calculator \| CalcPilot | **KG to LBS Converter — Kilograms to Pounds (Free)** | **48** ✅ |
| Description | …（含品牌词前置铺垫） | Convert kilograms to pounds instantly. 1 kg = 2.20462 lbs. Free kilogram to pound converter with a full 1 to 100 kg chart and the exact formula. | 144 ✅ |

关键词 `KG to LBS` 排最前，品牌词整段移除（新站无品牌认知，按社群结论品牌词后置/不放置）。Title 落在 40~60 区间。

### ② H1 与首段：三个语义锚点齐了

```html
<h1>KG to LBS Converter</h1>
<p class="lead">Convert kilograms (kg) to pounds (lbs) instantly — free weight converter
with a full kg-to-lbs conversion chart and the exact formula. 1 kilogram equals 2.2046226218 pounds.</p>
```

`kg` ✅ `pounds` ✅ `weight` ✅ 三个锚点同时出现在 H1 + 首段（已从构建产物中逐个确认）。同时把页面主体从「Free kg to lb Calculator」改写为以 kilograms→pounds 为主语，让谷歌重新归类，脱离 `lb to mb` / `kb to lbs` / `m in kg` 的错配语义域（对应施工单「靠主题写窄让谷歌重新归类」）。

### ③ 换算表：1~100 kg 全覆盖，静态渲染

- 新增字段 `fullTable`，通过 `makeFactorRows()`（`src/lib/convert-tables.ts`）在**构建期**算出全部行，直接写进 HTML。
- 校验结果：`full 1-100 kg chart rendered statically (100 rows)` — 构建产物里实测 **100 行 `<tr>`**，不是前 10 行 + 「展开」按钮加载。
- 三列结构：`Kilograms (kg)` | `Pounds (lb)` | `Pounds back to kilograms`。
  第三列不是冗余列，而是同一数量级的反向读数（`60 lb = 27.2155 kg`），一张表同时覆盖 `kg to lbs` 与 `lbs to kg` 两个方向的数值查询。

### ④ 常见数值专区（独立一节，未混进表）

新增 `valueBlocks` 字段 + 独立 `section`，**14 个 H3**，每条 = H3（查询词原样）+ 一行答案 + 公式：

| 类型 | 覆盖数值 |
|---|---|
| GSC 实锤错配词 | 2.415 / 2.47 / 11.79 / 11,793 / 17,000 / 22,000 / 24,000 kg to lbs |
| 高频整数 | 1 / 2 / 5 / 10 / 50 / 60 / 100 kg to lbs |

其中 1 / 10 / 50 / 60 / 100 五个整数的 H3 块**内链指向各自的独立数值页**（第二周建成），避免父子页互相抢词；长尾怪数值不建独立页，留在本页做直答。

### ⑤ FAQ + FAQPage schema

**13 条 FAQ**，施工单指定的 4 条全部收录并改写为英文原查询：

- How many pounds is 1 kg?
- What is 60 kg in lbs?
- What is the kg to lbs formula?
- How many pounds is 100 kg?

`FAQPage` schema 由 `converterJsonLd()` 自动生成，已确认落在 `<script type="application/ld+json">` 里；`HowTo` + `WebApplication` 同步保留。

### ⑥ 内链区 + 全站内页回链首页

页面底部新增「More weight converters」内链区，锚文本方向全部是「同族但更宽」：

| 锚文本 | 指向 | 状态 |
|---|---|---|
| lbs to kg converter | `/converters/lbs-to-kg-converter` | 已建 ✅ |
| kilos to pounds converter | `/converters/kilos-to-pounds-converter` | 已建 ✅ |
| kilograms to pounds converter | `/converters/kilograms-to-pounds-converter` | 已建 ✅ |
| kg to stone converter | `/converters/kg-to-stone-converter` | 已建 ✅ |
| all weight converters | `/converters` | 原有 ✅ |
| All CalcPilot calculators | `/` | 原有 + 本轮补强 ✅ |

**关于「每个内页回链首页」**：核查后确认面包屑（`Breadcrumb.astro` 的 Home 链接）与页脚 logo（`<a href="/">`）在全站 52 个页面都已存在，这条历史上并非空白。本轮额外在改造页与 12 个新页的**正文内**加了一条语境化首页链接（锚文本 `All CalcPilot calculators`），比页脚链接的权重信号更强。

---

## 2. 第二周 · 反向页与数值页

建页架构：`src/data/seo-pages.ts`（数据源）+ `src/pages/converters/[slug].astro`（统一动态路由，现在同时承载 tool / conversion / value 三类页面）。

### 已建成页面（12 个）

| # | Slug | 主词 | 月搜（美国） | KD | 差异化点 |
|---|---|---|---:|---:|---|
| 1 | `kilos-to-pounds-converter` | kilos to pounds | 74,000 ↑52% | 22.8 | 口语「kilos」语境；1–100 的 5 步进刻度（1,2,3,5,10,15…200） |
| 2 | `lbs-to-kg-converter` | lbs to kg | 823,000 | 46.7 | 反向主词；磅制刻度（1,2,5,10,20,25,50…300 lb），含 1/10/100/150/200/300 数值块 |
| 3 | `kilograms-to-pounds-converter` | kilograms to pounds | 1,220,000 | 48.3 | 全称 + 货运/报关语境；含 1,000 kg = 2,204.6226 lb |
| 4 | `pounds-to-kg-converter` | pounds to kg | 301,000 | 预筛 8 | 缩写优先；1–20 逐磅刻度 + 45/180/300 数值块 |
| 5 | `pounds-to-kilograms-converter` | pounds to kilograms | 301,000 | 预筛 8 | 全称 + 国际表单/行李阈值语境（44/50/70 lb ↔ 20/22.7/31.8 kg） |
| 6 | `kg-to-stone-converter` | kg to stone | — | — | 英制 stone；含「11 stone 0.3 lb」双向读法 |
| 7 | `gb-to-mb-converter` | gb to mb | 28,000 | 45.6 | 数据存储；1,000 vs 1,024 双口径解释，广告出价最高的一条线 |
| 8 | `1-kg-to-lbs` | 1 kg to lbs | — | — | 数值页，1–10 刻度 |
| 9 | `10-kg-to-lbs` | 10 kg to lbs | — | — | 数值页，1–50 刻度 |
| 10 | `50-kg-to-lbs` | 50 kg to lbs | — | — | 数值页，10–100 刻度 |
| 11 | `60-kg-to-lbs` | 60 kg to lbs | — | — | 数值页，50–70 逐 2 刻度 |
| 12 | `100-kg-to-lbs` | 100 kg to lbs | — | — | 数值页，80–200 刻度 |

**每页差异化已落实**：换算表刻度、示例数值、FAQ 集合、正文字段（`explanation`）四者逐页不同，不存在模板复制。校验脚本已确认 13 个 converter 页面的 title 长度 48–55、description 135–153，全部落在目标区间。

### 树状结构落位

```
首页（全站最强内链源）
  └─ 已在热门面板第 1/2/3 位放入 kg-to-lbs → kilos-to-pounds → lbs-to-kg
/converters（分类页，全站曝光最多）
  ├─ kg-to-lbs-converter（一级主词，全量 1–100 表）
  ├─ 二级词页：kilos / lbs-to-kg / kilograms-to-pounds / pounds-to-kg / pounds-to-kilograms / kg-to-stone / gb-to-mb
  └─ 三级长尾：1 / 10 / 50 / 60 / 100-kg-to-lbs（由二级页与主页面内链汇聚）
```

首页 `popularSlugs` 前三位已改为 `kg-to-lbs-converter` → `kilos-to-pounds-converter` → `lbs-to-kg-converter`，让首页最强的站点级链接优先输送给重量族。

### 需要如实说明的两处判断

1. **`24000 kg to lbs` 的数值与施工单不一致。**
   施工单写 `52,910.86`，用 2.20462 手算约 52,910.88。站内全站统一采用精确因子 `2.2046226218`，`24000 × 2.2046226218 = 52,910.9429`。
   本轮按**全站口径一致**处理，页面统一写 **52,910.9429**。同理修正了历史遗留误差：`11.79 kg` 原写 25.9926，精确值是 **25.9925**；`22,000 kg` 原写 48,501.698，精确值 **48,501.6977**。
   已用脚本对 23 个关键数值逐个复算，全部一致。

2. **`pounds-to-kg-converter` 与 `pounds-to-kilograms-converter` 存在同义风险。**
   两页同属 30.1 万那条词，意图几乎重合。施工单要求两页都建，本轮用「缩写优先 / 全称 + 国际化表单语境」做了明确切分：前者面向 `lbs to kg` 类缩写查询与健身房场景，刻度走 1–20 逐磅；后者面向医疗记录、报关单、航空公司行李阈值（44/50/70 lb），刻度走 44/50/70 这些真实阈值。**仍在观察期**，第三周起在 GSC 里盯这两页的 query 重叠率；若 6 周后仍互相分流，建议把弱的一页 301 到强的一页（见 `GSC-WEEKLY-TRACKING.md` 的处理预案）。

---

## 3. 第三周 · 分类页、sitemap、移动端

### ① `/converters` 页做正文

新增组件 `src/components/ConvertersHubGuide.astro`，只在 converters hub 渲染。

- H2：**Free online unit converter — every category explained**（覆盖口语词 `free online unit converter`）
- 开头一段总述（转换器是什么、为什么可以不注册直接用、页面提供什么）
- **六段分类说明**，每段 H3 + 一段正文 + 3~4 个入口：

| 分类 | 正文覆盖的硬信息 |
|---|---|
| 重量与质量 | 2.2046226218 / 0.45359237 / 6.35029318，三类用户心智 |
| 长度与距离 | 2.54 cm、0.3048 m、1.609344 km，及面积因子要平方 |
| 体积与容量 | US gal 3.785411784 L vs 英制 4.546 L 的 20% 差异 |
| 温度 | °F = °C×9/5+32，0/100/−40 三个参考点 |
| 数据存储 | 1,024 vs 1,000 双口径，500GB 硬盘显示 465GB 的原因 |
| 时间与时长 | 60 进制来源，及为什么日期运算要另用日期工具 |

同时把 hub 的 `intro` 首句改为 `This is a free online unit converter for weight, length, volume, temperature, data storage and time.`，让口语词落在前 100 词。分类页因此从「一张导航列表」变成权重汇聚的中间层。

### ② sitemap 补 lastmod + 分路径权重

`astro.config.mjs` 改用 `serialize()`：

- 所有 URL 补 `<lastmod>`（构建时间，与页面 JSON-LD 的 `dateModified` 同一口径）
- 分路径设置 `changefreq` / `priority`，替代原来「全部 0.7 / weekly」：

| 路径 | changefreq | priority |
|---|---|---:|
| `/` | weekly | 1.0 |
| `/converters` | weekly | 0.9 |
| `/converters/*` | monthly | 0.8 |
| `/finance` `/everyday` `/time-date` | weekly | 0.8 |
| `/about` `/contact` `/methodology` | monthly | 0.5 |
| `/privacy` `/disclaimer` | yearly | 0.3 |
| `/404` | yearly | 0.1 |

构建产物实测：**50 个 `<loc>` 全部带 `<lastmod>`**（`grep -c "<lastmod>"` = 50）。

**`/sitemap.xml` 404 的修正方式**：Astro 的 sitemap 集成只会产出 `sitemap-index.xml` + `sitemap-0.xml`，并不存在 `sitemap.xml`。已在 `vercel.json` 加两条 301：`/sitemap.xml` 和 `/sitemap_index.xml` → `/sitemap-index.xml`，并给 XML 加了 `application/xml; charset=utf-8` 响应头与缓存策略。

### ③ 移动端核查（静态审查 + 产物度量）

现状复核结论：**移动端基础条件本来就是合格的**，问题在曝光而不在可用性。

| 检查项 | 结果 |
|---|---|
| viewport | `<meta name="viewport" content="width=device-width, initial-scale=1">` ✅ |
| iOS 聚焦缩放 | 输入框字号 `--fs-body` = 1rem = 16px ✅（未触发 <16px 自动放大） |
| 横向溢出 | `html { overflow-x: clip }` + 所有表格包在 `.table-scroll { overflow-x: auto }` ✅ |
| 固定宽度 | 全站仅 `table.amort { min-width: 560px }`，且在滚动容器内 ✅ |
| 触控目标 | `.swap-btn { min-height: 40px }`、导航 `a { padding: 12px }`，移动端展开态符合 40px+ ✅ |
| 换行与粘连 | `.hero h1` / `.title-block h1` 已设 `overflow-wrap: break-word` ✅ |

本轮新增的移动端优化：

- 767px 断点下把 `.common-table th/td` 内边距从 `12px 20px` 收到 `10px 12px` —— 三列换算表在 375px 屏上能少滚动一次。
- `.value-blocks` 网格在移动端降为单列；`.value-block` / `.internal-links li` / `.hub-guide-item` 内边距同步收紧。

页面重量实测（用于判断移动端加载速度的上界）：

| 页面 | HTML | 外部资源 | 合计 |
|---|---:|---:|---:|
| `/converters/kg-to-lbs-converter` | 45.6 KB | 2 个 / 49 KB | ~94 KB |
| `/converters/60-kg-to-lbs` | 27.5 KB | 1 个 / 44 KB | ~71 KB |
| `/converters` | 48.7 KB | 1 个 / 44 KB | ~92 KB |

全站 CSS 44.6 KB（未压缩前）、JS 11.2 KB、字体 11 个 woff2 共 143 KB 按需加载。**换算站是手机场景，这个重量不会成为 LCP 瓶颈**；但真实 CWV 必须用 CrUX/GSC 的实测字段数据确认，本地无法替代 —— 这一项列入第三周验收待办（见下）。

### ④ 顺带修掉的存量问题

早先 on-page 审计里 4 个 C 级页面（title 22~27 字符）已修正：

| 页面 | 新 Title | 字符 |
|---|---|---:|
| `/about` | About CalcPilot — Free Online Calculators & Converters | 50 |
| `/contact` | Contact CalcPilot — Report an Error or Send Feedback | 52 |
| `/privacy` | Privacy Policy — No Accounts, No Tracking \| CalcPilot | 52 |
| `/disclaimer` | Disclaimer — Estimate Accuracy & Limits \| CalcPilot | 51 |

### ⑤ llms.txt / llms-full.txt 同步

两个 Agent 索引已补上 12 个新页面的 URL 与新增品类（kilos to pounds / lbs to kg / kg to stone / GB to MB），保持 AI 搜索入口与站点一致。

---

## 4. 变更文件清单

### 新增

| 文件 | 作用 |
|---|---|
| `src/lib/convert-tables.ts` | 换算表构建器（`makeFactorRows` / `range` / `fmt`），构建期算好数值，静态渲染 |
| `src/data/seo-pages.ts` | 12 个 SEO 落地页的数据源（7 个反向页 + 5 个数值页） |
| `src/components/PairWidget.astro` | 新的双向换算组件，支持同页多实例、可交换单位与标签 |
| `src/components/SeoConversionPage.astro` | 反向页渲染器（工具 + 公式 + 示例 + 三列表 + 数值块 + FAQ + 内链） |
| `src/components/SeoValuePage.astro` | 数值页渲染器（直答优先 BLUF 版式） |
| `src/components/ConvertersHubGuide.astro` | `/converters` 分类正文 |
| `scripts/seo-validate.mjs` | 构建后校验脚本（内链 / H1 / canonical / JSON-LD / 静态表 / 数值） |
| `docs/SEO-SPRINT-2026-09.md` | 本文件 |
| `docs/GSC-WEEKLY-TRACKING.md` | 周度四指标看板与处置预案 |
| `docs/LINK-BUILDING-PLAN.md` | 外链预算与执行方案（DR ≥ 10 后启动） |

### 修改

| 文件 | 改动 |
|---|---|
| `src/data/converters.ts` | kg-to-lbs 全面改造；接口新增 `fullTable` / `valueBlocks` / `internalLinks` / `keywords` / `tableTitle` |
| `src/components/ConverterTool.astro` | 渲染新增的三个区块 + 表格标题可配置 |
| `src/pages/converters/[slug].astro` | 统一路由，同时承载 tool / conversion / value 三类页面 |
| `src/pages/[category]/index.astro` | converters hub 挂载正文组件 |
| `src/data/site.ts` | 注册 12 个新页；图标映射；`popularSlugs` 前三给重量族；hub intro 加口语词 |
| `src/lib/seo.ts` | `dateModified` 由硬编码日期改为构建日期（与 sitemap lastmod 同口径） |
| `src/styles/global.css` | 新增 `.value-blocks` / `.internal-links` / `.hub-guide` / `.cell-reverse` / `.answer-lead` / `.table-footnote`；移动端收紧内边距 |
| `astro.config.mjs` | sitemap `serialize()`：lastmod + 分路径权重 |
| `vercel.json` | `/sitemap.xml`、`/sitemap_index.xml` 301；sitemap XML 缓存与 Content-Type |
| `public/llms.txt`、`public/llms-full.txt` | 补 12 个新页 URL 与新品类 |
| `package.json` | 新增 `npm run seo:validate` / `npm run seo:audit` |
| 4 个信任页 | title 长度修正 |

---

## 5. 构建与验证记录

```
npm run build        → 52 page(s) built，Complete
npx astro check      → 0 errors, 0 warnings, 0 hints
npm run seo:validate → pages scanned 52 / internal link targets 52 / errors 0 / warnings 0
                       note: full 1-100 kg chart rendered statically (100 rows)
```

校验脚本每次构建后都检查：

1. 构建产物里**每一个内链都能解析到真实文件**（52 个目标全部通过，0 死链）
2. 每页恰好 1 个 `<h1>`、canonical 存在、JSON-LD 可解析
3. 有 FAQ 区块就必有 `FAQPage` schema
4. title / meta description 长度带
5. kg-to-lbs 的 1–100 表在静态 HTML 里确实有 100 行
6. 6 组关键换算与页面所写数值逐一复算

后续每次改站后 `npm run seo:audit` 一条命令即可复现。

---

## 6. 明确未做的事（以及为什么）

| 项 | 状态 | 理由 |
|---|---|---|
| 外链建设 | 未执行 | 施工单明确要求 DR 到 10、重点页曝光进 30 位后再动，现在买外链是浪费预算 |
| 品牌词曝光问题 | 未处理 | 品牌词只 1 次曝光属于口碑问题，不是页面问题，靠内容和时间解决 |
| `lb to mb` / `kb to lbs` / `m in kg` 的 9~10 位 | 未处理（刻意） | 语义错配，为它们改页面会污染主题；靠本轮把 kg→lbs 主题写窄，让谷歌重新归类 |
| 移动端 CWV 实测 | 待办 | 需要 GSC / CrUX 字段数据，本地只能做静态审查与重量度量 |
| 收录状态排查 | 待办 | 曝光 8 月底后从日均 20+ 掉到 10 以下，下一步要查是否滑向「已抓取-尚未编入索引」 |

---

## 7. 下一步动作（第三个自然周开始）

1. **GSC 提交新 sitemap**：重新提交 `https://calcpilot.net/sitemap-index.xml`，并对 12 个新页逐个「请求编入索引」（一次 5~10 个，别一口气全提）。
2. **盯四指标**：按 `docs/GSC-WEEKLY-TRACKING.md` 每周导出同一份数据。
3. **收录状态体检**：GSC → 页面 → 查看「已抓取-尚未编入索引」是否增长。这是比排名更优先的内容质量信号。
4. **CWV 实测**：GSC 核心网页指标报告 + PageSpeed Insights 跑 `/converters/kg-to-lbs-converter` 与 `/converters`，重点看移动端 LCP / INP / CLS。
5. **外链启动判定**：重点页曝光进入 30 位以内后，按 `docs/LINK-BUILDING-PLAN.md` 小批量测试，每个落地页独立配引用域。
