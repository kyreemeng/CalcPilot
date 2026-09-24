# 竞品 SEO 拆解：CoolConversion.com

> 对标站点：https://coolconversion.com/
> 本方法：qiaomu-seo（compare / diagnose 只读模式）
> 抓取日期：2026-09-24｜证据模式：`live`（curl 原始 HTML）+ `code`（CalcPilot 构建产物对比）
> 抓取页面：首页、`/weight/kilogram-to-pound/`、`/weight/kg-to-lb/`、`/weight/60-kilogram-to-pound`、
> `/weight/1.554-kilogram-to-pound`、`/weight/`、`/weight/kg-to-lbs-conversion-table/`、
> `/weight/kg-to-stones-pounds/`、`/length/inches-to-mm/`、`/temperature/celsius-to-fahrenheit/`、
> `/about/authors/adilson-fernandes/`、robots.txt、sitemap.xml（135 个子 sitemap）

---

## 〇、先划清一条边界：哪些是"位置红利"，哪些是"可复制的技艺"

**我无法测量 CoolConversion 的真实 CTR**——没有它的 Search Console 权限。而且**CTR 跨排名不可比**：CoolConversion 在同类词上排第 1–3 位，CalcPilot 平均 19.7 位。第 1 位与第 20 位的 CTR 相差十倍以上是**排名造成的，不是标题造成的**。

所以本报告只做一件事：**拆解那些独立于排名的、确实影响点击的页面元素**，并明确标注每一项属于哪一类。

| 归因 | 具体内容 | 能否复制 |
|---|---|---|
| **位置红利**（不可复制，需长期积累） | 79,167 个已声明 URL、135 个 sitemap、2014 年运营至今、作者持真实工程师资质 | ❌ 只能靠时间与外链 |
| **页面技艺**（可直接复制） | 答案写进标题、答案首句写进描述、别名+canonical 归一、跨单位内链、Information Gain 区块、E-E-A-T 实体 | ✅ 本轮重点 |

**重要提示**：如果只看"它 CTR 比我们高"就去抄标题，会得出错误结论——它的 CTR 高首先是因为它排在第一。真正值得抄的是它**在排第一时仍然在用**的那些技法，因为这些技法让它在同处第一时也赢过其他第一。

---

## 一、站点量级（一手观测）

| 指标 | 实测值 | 证据 |
|---|---:|---|
| sitemap 数量 | **135** | `sitemap.xml` 索引 |
| 已声明 URL 总量 | **79,167** | 逐个 sitemap 统计 `<loc>` |
| 最大单一家族 | `/weight/` **16,079**；`/length/` 14,582；`/angle/` 8,266；`/volume/` 4,525 | 各家族 sitemap |
| 最小工具簇 | `/statistics/` 10；`/electrical/` 10；`/chemistry/` 166 | 同上 |
| 运营起始 | 2014 年（作者页自述） | `/about/authors/adilson-fernandes/` |
| 第三方流量/DR 估算 | **unknown** | 搜索未返回有效数据源，按证据规范不采用 |

**robots.txt 策略（值得注意）**：对 Bingbot / msnbot / Yandex 设 `Crawl-delay: 10`，注释写明"Google 忽略该指令，由 Search Console 控制"；并**显式 `Disallow: ClaudeBot`**（注释说明是为了越过 Cloudflare 的混合用途爬虫）。这是一个**主动的 AI 爬虫治理姿态**。

---

## 二、关键词选择与布局：三层结构 + 别名归一

### 2.1 URL 体系（可直接对照）

```
/{unit-family}/{from-unit}-to-{to-unit}/              ← 工具页（有尾斜杠）
/{unit-family}/{magnitude}-{from-unit}-to-{to-unit}   ← 数值页（无尾斜杠）
```

实测样本：

| 层 | URL | 目标查询 |
|---|---|---|
| 家族 Hub | `/weight/` | weight converter |
| 工具页 | `/weight/kilogram-to-pound/` | kilograms to pounds |
| 工具页别名 | `/weight/kg-to-lb/` | kg to lb |
| 数值页 | `/weight/60-kilogram-to-pound` | 60 kg to lbs |
| 数值页（极端长尾） | `/weight/1.554-kilogram-to-pound` | 1.554 kg to lbs |
| 复合换算器 | `/weight/kg-to-stones-pounds/` | kg to stones and pounds |
| 换算表页 | `/weight/kg-to-lbs-conversion-table/` | kg to lbs chart / printable |

### 2.2 别名归一 —— 本次最值得抄的一条

实测：`/weight/kg-to-lb/` 返回 **200**，标题、描述、H1 与 `/weight/kilogram-to-pound/` **完全一致**，但 canonical 指向后者：

```
/weight/kilogram-to-pound/   canonical → https://coolconversion.com/weight/kilogram-to-pound/
/weight/kg-to-lb/            canonical → https://coolconversion.com/weight/kilogram-to-pound/
```

**含义**：用**一个**强页面吃下「全称」与「缩写」两族查询，靠 canonical 把权重归一到全称页。它没有为 `kg to lb`、`kilo to pound`、`kilogram to lbs` 各建一个页面。

**对比 CalcPilot**：目前是 **6 个独立页面**做同一件事——
`kilos-to-pounds-converter`、`kilograms-to-pounds-converter`、`lbs-to-kg-converter`、`pounds-to-kg-converter`、`pounds-to-kilograms-converter`、`kg-to-stone-converter`。
其中 `pounds-to-kg` 与 `pounds-to-kilograms` 是**同一意图的同义页**。你自有的跟踪文档已经预警过这个内耗风险，但架构上仍在为每个变体开新页。

### 2.3 数值页覆盖逻辑（值得学，但要克制）

它把 `/weight/` 铺到 16,079 个 URL，包含 `1.554`、`1.556`、`1.648` 这种极细分位数。

**但注意它有一条纪律**：**整数 1 不建页**——`/weight/1-kilogram-to-pound` 存在，而工具页的"Common Conversions"区块里 `1 kg→ lb` 的锚文本**指回工具页自身**，不是新建页。等于说：最高价值的那个数值交给工具页承接，其余才生成数值页。

**对 CalcPilot 的启示**：`1 kg to lbs`（月搜索量级远高于其它）目前是**独立数值页** `1-kg-to-lbs`。按它的做法，1 这个值更适合由核心工具页承接。这一点需要你自己的数据判断，不要照抄。

---

## 三、标题与元描述：把答案直接写进 SERP

### 3.1 CoolConversion 的四种标题模板（实测，模式高度一致）

| 页型 | 模板 | 实测样本 | 长度 |
|---|---|---|---:|
| 工具页 | `{全称} Converter \| {换算因子等式}` | `Kilograms to Pounds Converter \| 1 kg = 2.20462 lb` | 49 |
| 工具页（公式型） | `{X to Y} \| Formula: {公式}` | `Celsius to Fahrenheit \| Formula: F = (C × 9/5) + 32` | 51 |
| 数值页 | `{N} {全称} to {全称} \| {N} {缩写} ≈ {结果}` | `60 Kilograms to Pounds \| 60 kg ≈ 132.28 lb` | 42 |
| 数值页（反向） | 同上 | `150 Pounds to Kilograms \| 150 lb ≈ 68.039 kg` | 44 |
| 换算表页 | `{单位} Conversion Tables` | `Kilograms to Pounds Conversion Tables` | 37 |

**核心机制**：**每一个标题都携带「答案」本身**——要么是换算因子（`1 kg = 2.20462 lb`），要么是公式（`F = (C × 9/5) + 32`），要么是算好的结果（`150 lb ≈ 68.039 kg`）。

**一个精妙的细节**：工具页用 `=`（精确因子），数值页用 `≈`（四舍五入结果）。这不是随意符号——是**精度分层**，`≈` 暗示"这是为你这个具体数值算出来的"，比 `=` 更有"专门为你算过"的点击理由。

### 3.2 CalcPilot 现状逐项对比

| 页面 | CalcPilot 现标题 | CoolConversion 对应 | 差距 |
|---|---|---|---|
| 核心工具页 | `KG to LBS Converter — Kilograms to Pounds (Free)` (48) | `Kilograms to Pounds Converter \| 1 kg = 2.20462 lb` (49) | ❌ 标题**无数字**，`(Free)` 占位不如放因子 |
| 数值页 | `60 kg to lbs — How Many Pounds Is 60 kg? \| CalcPilot` (54) | `60 Kilograms to Pounds \| 60 kg ≈ 132.28 lb` (42) | ❌ 后半是**疑问句而非答案**；`\| CalcPilot` 对新站是无效字符 |
| 温度页 | `Celsius to Fahrenheit Converter — Formula & Chart \| CalcPilot` (61) | `Celsius to Fahrenheit \| Formula: F = (C × 9/5) + 32` (51) | ⚠️ 说了"有公式"但**不给公式** |

**结论**：CalcPilot 的元数据已经把答案放进**描述**了（`60 kilograms equals 132.28 pounds`），但**没放进标题**。SERP 里标题是视觉权重最高的位置，把 `— How Many Pounds Is 60 kg?` 换成 `| 60 kg ≈ 132.28 lb`，是**零成本、可当天上线**的改动。

### 3.3 元描述：答案首句 + "Learn how to" 钩子

| 页型 | 实测描述 | 长度 |
|---|---|---:|
| 工具页 | `Convert kilograms to pounds. 1 kilogram equals 2.20462 pounds. Free converter with formula, examples and conversion table.` | 122 |
| 数值页 | `60 kilograms equals 132.28 pounds. Learn how to convert kilograms to pounds using the conversion formula and calculation steps.` | 127 |
| 换算表页 | `Free kg to lbs conversion charts organized by use case. Download printable tables for body weight, baby weight, luggage, and cooking. Available as PNG, CSV, and PDF.` | 165 |

**两个可复制的写法**：
1. **第一句就是答案**（`60 kilograms equals 132.28 pounds.`），不给铺垫、不写"Looking for..."。
2. **第二句承诺"方法"而非"工具"**（`Learn how to convert ... using the conversion formula and calculation steps.`）——即使答案已经给了，用户仍会为了**看懂怎么算的**而点击。这比"Free, instant, no sign-up"更有点击理由，因为后者是自我吹嘘，前者是内容承诺。

**注意长度**：实测 99–170 字符，**没有卡在 155**。它优化的是"答案前置"，不是字符数上限。这与你既有规范里"120–160 字符"的硬约束不完全一致——建议按信息密度而非长度裁剪。

**顺手发现一个 CalcPilot 缺陷**：`/converters/1-kg-to-lbs` 的描述写作 **"1 kilograms equals 2.20 pounds"**——单复数错误。模板未处理 `n=1` 的情况。这一页恰好是最高价值的圆整数。

---

## 四、内容结构与内链

### 4.1 工具页 H2 骨架（`/weight/kilogram-to-pound/`，844 词，6 张表 93 行）

```
Converter（交互）
→ What Is a Kilogram?          （定义）
→ What Is a Pound?             （定义）
→ Kilograms to Pounds Formula  （公式）
→ Frequently Asked Questions   （FAQ）
→ Common Kilogram to Pound Conversions   ← 向下内链数值页
→ Kilograms to pounds Conversion Table    ← 静态表格
→ Related Weight (Mass) Converters       ← 横向内链同族
→ Popular Weight Conversions
```

### 4.2 数值页 H2 骨架（`/weight/60-kilogram-to-pound`，447 词）

```
Converter
→ How heavy is 60 kg?                    ← Information Gain
→ What does 60 kg look like?             ← Information Gain
→ 60 kg on the pound scale               ← 可视化刻度尺
→ How to Convert Kilogram to Pound       ← 公式 + worked example
→ Frequently Asked Questions
→ Share This Calculation
```

### 4.3 Information Gain 区块 —— 真正的差异化内容

这是它最不容易被抄、也最有价值的做法。实测 `/weight/60-kilogram-to-pound` 正文原文：

> **How heavy is 60 kg?** 60 kg is comparable to the weight of a small adult or a ballet dancer (54-64 kg / 119-141 lb).
>
> **Did you know?** Average adult woman (UK) is 70 kg. The average adult woman in the UK weighs about 70 kg (154 lb), according to NHS data.
>
> **About these units —— Kilogram:** The kilogram (kg) is the SI base unit of mass. Since 2019, it is defined by fixing the numerical value of the Planck constant, ensuring stability independent of physical artifacts.

三个层次：
1. **可感知的类比**（"相当于一个成年人或芭蕾舞演员的体重"）——回答"这个数字意味着什么"，几乎**没有任何竞品做这件事**。
2. **真实世界锚点 + 引用来源**（NHS 数据）——外部权威引用，是 E-E-A-T 的实证信号。
3. **计量学深度**（"2019 年起由普朗克常数定义")——展示专业度，是 AI 摘要与精选摘要的取材来源。

这正好印证了你自有策略文档中"Information Gain / 正交分量"那条——**CoolConversion 已经把这条落了地，CalcPilot 还停在原则层。**

### 4.4 内链拓扑 —— 三层 + 跨单位横向织网

工具页 `/weight/kilogram-to-pound/`：**47 条绝对内链（43 唯一）**，其中 36 条带锚文本。结构：

```
向上：Home → /weight/（家族 Hub）
横向（同族工具页，双向）：pound-to-kilogram、kilogram-to-stone、stone-to-kilogram、
                        stone-to-pound、pound-to-stone、gram-to-pound、pound-to-gram、
                        kilogram-to-gram、gram-to-kilogram、pound-to-ounce、ounce-to-pound
向下（数值页）：1 / 2 / 5 / 6 / 8 / 10 / 15 kg → lb（锚文本即查询写法 "2 kg→ lb"）
复合页：kg-lbs-oz、kg-to-stones-pounds
跨类目：G-force to m/s²
E-E-A-T：/about/authors/adilson-fernandes/、/about/authors/tiago-fernandes/
```

数值页 `/weight/60-kilogram-to-pound`：**17 条唯一锚文本内链**，关键在 `is also equal to:` 区块：

```
60000 gram   → /weight/60-kilogram-to-gram
0.06 tonne   → /weight/60-kilogram-to-tonne
9.4484 stone → /weight/60-kilogram-to-stone
2116.4 ounce → ...
```

**这是它内链设计里最聪明的一点**：**同一个数值（60）跨不同目标单位横向织网**。用户查"60 kg 是多少磅"，页面顺手告诉他"也等于 60,000 克 / 0.06 吨 / 9.45 英石"，并给出链接。这既提升了单页价值与停留时间，又用一条内容撬动了多个单位家族的数值页索引。

**注意它没有做的事**：数值页**不**链接相邻数值（60 不链 59 或 61）。横向织的是**单位**，不是**数值序列**。推测是为了避免制造近似重复页的互链网络。

### 4.5 换算表独立页型（CalcPilot 完全缺失）

`/weight/kg-to-lbs-conversion-table/`（自身还有 2 条 URL 的 sitemap）：
- 标题 `Kilograms to Pounds Conversion Tables | CoolConversion`
- 描述主打**用途分类 + 下载格式**：`organized by use case. Download printable tables for body weight, baby weight, luggage, and cooking. Available as PNG, CSV, and PDF.`
- H1 `Kilograms to Pounds Conversion Tables`

它单独用一个页面吃"printable / chart / table"这个**独立意图**——想打印一张表贴墙上的人，和想换算一个数的人，是两个不同的搜索意图。

---

## 五、E-E-A-T 与信任信号

| 信号 | CoolConversion | CalcPilot |
|---|---|---|
| 具名作者页 | ✅ `/about/authors/adilson-fernandes/`，含 `Person` + `CollegeOrUniversity` schema、学历、LinkedIn | ❌ 无 `Person` schema |
| 作者资质 | ✅ "Electronics Engineer，Universidade de Pernambuco，专注 NIST / BIPM / ISO 80000 计量标准" | ❌ 无 |
| 方法论页 | ✅ `/about/methodology/` | ⚠️ 有 `/methodology` 但未在每页链出 |
| 内容复审日期 | ✅ 页面级 `Last reviewed: May 2026` | ⚠️ 有 `dateModified`（构建时间），非人工复审日期 |
| 外部权威引用 | ✅ 正文引用 NHS 数据 | ⚠️ 有 DisclaimerSnippet 但无来源引用 |

---

## 六、一个必须纠正的技术误判

实测发现并已核实（Google Search Central 官方公告，2023-08-08 发布 + 2023-09-14 更新）：

- **HowTo 富结果已彻底弃用**：2023-08 先限制为仅桌面端，**2023-09-13 起桌面端也不再展示**，Google 明确称"this result type is now deprecated"。Rich Results Test 与 Search Console 的 HowTo 报告也已移除。
- **FAQ 富结果被大幅收窄**：仅对"知名的权威政府与健康类网站"展示。

**对 CalcPilot 的含义**：核心转换页目前挂载 `HowTo` + `FAQPage` 两套 schema，**两者在 Google 搜索中都不再产生富结果展示**。这不造成惩罚（官方明确说可保留），但意味着：

1. 你自有策略文档把"结构化数据 A"列为优势，其中 HowTo/FAQ 这部分对 SERP 呈现**实际收益为零**，不应再计入排期理由。
2. 真正还可能有效的是 `BreadcrumbList`（仍在渲染）与 `WebApplication`。
3. **不要**为了富结果投入工程资源去维护 HowTo 步骤标记。

> 依据来源：`developers.google.com/search/blog/2023/08/howto-faq-changes`。注：skill 来源登记表中 `google-search-appearance` 标记为逾期，建议后续复查该来源状态。

---

## 七、可复用策略要点（八条）

| # | 要点 | 机制 | 复制成本 |
|---|---|---|---|
| 1 | **答案写进标题** | SERP 中标题视觉权重最高；含数字的标题在同类结果中"看起来更有用" | 极低 |
| 2 | **答案作描述首句，第二句承诺"方法"** | 给答案降低不确定性，给方法提供点击理由 | 极低 |
| 3 | **H1 = 查询原形，标题 = 查询 + 答案** | H1 负责相关性，标题负责点击，两者分工不重复 | 极低 |
| 4 | **别名 + canonical 归一，而非为变体建页** | 一个强页吃多族查询，避免同义页内耗与权重稀释 | 低 |
| 5 | **同数值跨单位横向内链** | 一条内容撬动多单位家族的收录与停留 | 中 |
| 6 | **Information Gain 区块**（可感知类比 + 权威引用 + 学科深度） | 竞品不做的独占内容；同时是精选摘要与 AI 摘要的取材源 | 中 |
| 7 | **"printable / chart" 独立页型 + 多格式下载** | 吃下与"换算一个数"不同的搜索意图 | 中 |
| 8 | **具名作者 + 复审日期 + 方法论链出** | YMYL 邻域（BMI/BMR/体重）的信任信号 | 低 |

---

## 八、针对 CalcPilot 的优化建议（按优先级）

### P0 — 本周可上线，零风险，直接改文案

| # | 动作 | 现状 → 建议 |
|---|---|---|
| 1 | 数值页标题改为「查询 + 答案」 | `60 kg to lbs — How Many Pounds Is 60 kg? \| CalcPilot` → **`60 kg to lbs \| 60 kg ≈ 132.28 lb`** |
| 2 | 数值页去掉问句与品牌尾巴 | 新站无品牌认知，`\| CalcPilot` 占 11 字符却零收益；腾出空间给数值 |
| 3 | 核心工具页标题补换算因子 | `KG to LBS Converter — Kilograms to Pounds (Free)` → **`Kilograms to Pounds Converter \| 1 kg = 2.20462 lb`** |
| 4 | 温度页标题给出公式 | `Celsius to Fahrenheit Converter — Formula & Chart \| CalcPilot` → **`Celsius to Fahrenheit \| Formula: F = (C × 9/5) + 32`** |
| 5 | 描述第二句改为 "Learn how to..." | 现为 `Convert ... instantly with the exact 2.2046226218 factor, a nearby-value chart and the formula.`（自述功能）→ 改为承诺方法 |
| 6 | 修 `1-kg-to-lbs` 单复数 | `1 kilograms equals 2.20 pounds` → `1 kilogram equals 2.20462 pounds` |

### P1 — 结构优化（需少量开发）

| # | 动作 | 说明 |
|---|---|---|
| 7 | 新变体一律走「别名 + canonical」，不再开新页 | 已有 6 个 kg/lbs 同义页的历史包袱，新词别再重演 |
| 8 | 在数值页加 `is also equal to:` 跨单位区块 | 60 kg 页链出 60,000 g / 0.06 t / 9.45 st，复用现有 `convert-tables.ts` 即可 |
| 9 | 为已出现曝光的数值补 H3 值块 | 17000 / 22000 / 211 / 24.6 / 2.6 kg（上一轮 GSC 诊断的 A-003），与本条同源 |

### P2 — 内容增量（中期，需判断投入产出）

| # | 动作 | 说明 |
|---|---|---|
| 10 | 新增「换算表」独立页型 | 目标 "printable kg to lbs chart"，提供 PNG/CSV/PDF 下载。与现有静态表复用同一数据源 |
| 11 | 补 Information Gain 区块 | 每个数值页加"相当于什么"的类比 + 一个带来源的真实世界锚点。**这是最难被抄、AI 摘要最可能引用的部分** |
| 12 | 补英国口径的复合换算页 | GSC 显示英国是第 2 大市场（11 次曝光）；`kg to stones and pounds` 是英国主流表达，目前只有单单位 `kg-to-stone-converter` |
| 13 | 建具名作者页 + 每页复审日期 | 站点覆盖 BMI/BMR/体重，属 YMYL 邻域，缺 `Person` schema 是实质短板 |

### 明确不建议照抄的部分

| 不做 | 原因 |
|---|---|
| ❌ 把 `/weight/` 铺到 16,079 个 URL | 上一轮 GSC 诊断已证实：CalcPilot 12 个手写新页 7 天 0 曝光，权威度不足时铺量无效且增加低质内容风险 |
| ❌ 把 `1-kg-to-lbs` 撤掉改由工具页承接 | CoolConversion 的这条规则有其自身流量结构支撑，CalcPilot 缺同口径数据，不要盲抄 |
| ❌ 保留 HowTo/FAQ 作为"结构化数据优势"排期依据 | 已核实：两者在 Google 均不再产生富结果 |
| ❌ 用 `.html` 结尾或大小写混用的 canonical | 实测其 canonical 存在尾斜杠不一致（工具页有 `/`、数值页无）、大小写保留（`/temperature/Celsius-to-Fahrenheit/`）等瑕疵，这是它的**反面教材**，不要学 |

---

## 九、缺失证据与局限

1. **真实 CTR 数据** —— 无 CoolConversion 的 Search Console 权限，其各页面实际 CTR **unknown**。本报告分析的是影响 CTR 的**页面元素**，不是 CTR 结果本身。
2. **第三方流量与域名权威度** —— 搜索未返回有效数据源，DR、引荐域数、月访问量均标 **unknown**，未做估算。
3. **实际 SERP 排名与竞品结果构成** —— 未做排名追踪，未采集 SERP 快照，因此"同类词中的相对位次"为推断。
4. **收录状态** —— 79,167 是 **sitemap 声明量**，不等于已收录量。sitemap 中的 URL 仅证明"声明了发现意图"。
5. **抓取覆盖** —— 抽样的 12 个 URL 覆盖 4 个单位家族，属 `template sample`，**不代表全站 79,167 页的一致实现**；文中已按模板说明选择依据。
6. **是否含 JS 渲染差异** —— 本次为静态抓取。CoolConversion 的交互换算器部分依赖 JS，静态 HTML 与渲染后 DOM 可能存在差异（尤其交互结果区）。
7. **来源时效** —— HowTo/FAQ 弃用结论已核对 Google Search Central 官方公告（2023-08-08 / 更新 2023-09-14）。skill 来源登记表标记 `google-search-appearance` 逾期，建议复查。

**声明**：本报告不承诺排名、收录、富结果或流量结果。所有结论标注为直接观测、合理推断或缺失证据。

---

*方法论：qiaomu-seo（Copyright © 向阳乔木）｜抓取工具：curl 原始 HTML + CalcPilot 构建产物比对*
