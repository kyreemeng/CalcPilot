# GSC 驱动 SEO 行动 P0/P1/P2 — 实施记录

> 实施日期：2026-09-30｜依据：GSC 诊断（2026-08-13 ～ 2026-09-27 数据）的行动清单
> 验证命令：`npm run seo:audit` → **56 页 / 0 error / 0 warning / 全部内部链接可解析**
> 本轮原则：**只做 GSC 已验证的 query（impressions ≥ 2 + position < 70）**，不批量生成数字页（避开 doorway / scaled-content 风险）

---

## P0（24–72 小时）— 5/5 完成

| # | 任务 | 状态 | 实施与验证 |
|---|---|---|---|
| 1 | 修 Percentage 页面 `200 × 15%30` 异常文本 | ✅ | 根因：`blabel` 与 `bvalue` 是相邻元素，纯文本抽取时拼接成 `200 × 15%30`。已改为 `200 × 15% =` + `30`，抽取文本为 `200 × 15% = 30`（JS 渲染同样修正）。同时排查了 tip / discount / BMI / BMR / salary 等全部带 breakdown 的页面，其余拼接结果（如 `Total bill $59.00`）均可读，无需修改 |
| 2 | Indexing health（URL Inspection 代码侧） | ✅ | 构建产物逐页验证：每个新页面 `<link rel="canonical">` 指向自身规范 URL、单一 `<h1>`、FAQPage JSON-LD 正常解析。GSC 控制台内的 URL Inspection 仍需人工执行（见文末待办） |
| 3 | 确认 sitemap-index 链路 | ✅ | `robots.txt → sitemap-index.xml → sitemap-0.xml（54 URLs，原 50 + 本轮 4 个新页面）`。GSC 后台的提交状态需人工确认一次 |
| 4 | 新建 `/converters/2.47-kg-to-lbs` | ✅ | GSC 第一名 query（40 imp / #7.05）。title `2.47 kg to lbs ≈ 5.4454 lb (Kilograms to Pounds)`，首屏答案 `2.47 kilograms equals 5.4454 pounds`，formula / 邻近值表（2.20–2.60 kg）/ 六单位换算 / 反向换算 / 4 条 FAQ 齐全 |
| 5 | 新建 `/converters/2.6-kg-to-lbs` | ✅ | 覆盖 `2.6 kg to pounds / kgs in pounds / kilograms to pounds / kilos to pounds / what is 2.6 kg in lbs` 五个变体（17 imp / #41–51），title 命中 `2.6 kg to lbs ≈ 5.7320 lb` |

## P1（7 天）— 4/4 完成

| # | 任务 | 状态 | 实施与验证 |
|---|---|---|---|
| 6 | 新建 `/converters/24.6-kg-to-lbs` | ✅ | 5 imp / #42.20。行李额（23 kg）场景 + 3 st 12.2 lb 英石格式 + 反向换算 |
| 7 | `/converters` 升级为 Unit Conversion Hub | ✅ | 9 个 family（新增 area / speed / currency），每个 family：公式 chips + 「Popular conversions」（含 GSC 验证值 2.47 / 2.6 / 24.6 kg 及答案）+ 相关工具链接 |
| 8 | Percentage Calculator 升级 | ✅ | title `Percentage Calculator — Free PCT Calculator`；新增第二种计算模式「X is what percent of Y?」（真实功能，非关键词文章）；新增「Percentage increase, decrease and change」章节（公式面板 + 链接 percentage-change-calculator）；FAQ 新增 pct calculator / what percent is X of Y 问答（共 6 条，FAQPage schema 同步） |
| 9 | KG 主页面 GSC 热门值模块 | ✅ | `kg-to-lbs-converter` 的 valueBlocks 中 2.47 / 2.6 / 24.6 三个块从纯文本升级为链接到新页面（60 / 100 kg 原有链接保留） |

## P2（2–4 周）— 按方案完成

| 任务 | 状态 | 说明 |
|---|---|---|
| liters to gallons 独立页 | ✅ | `/converters/liters-to-gallons`：P2 清单中唯一缺失的专用页。US / imperial gallon 差异说明 + 三列图表（含反向列）+ 5 条 FAQ + 内链集群 |
| cm to inches / meters to feet / celsius to fahrenheit 升级 | ✅ | 图表升级为三列（主列 + 反向列，覆盖反向 query）；表格扩充（新增 15/80/150 cm、1.5–1.8 m 身高等常用值）；FAQ 扩到 6 条；新增「More conversions」内链集群 |
| lbs to kg / kg to stone / GB to MB / MB to GB | —（已有） | 此前已按「主 Calculator + Formula + FAQ + Internal Links」模式建好，本轮未动 |
| 热门数值页（各 pair 的数字长尾） | ⏸ 冻结 | 遵循方案第七节规则：GSC 尚未出现这些 pair 的数值型 query（impressions ≥ 2），不预先铺页；等下一轮 GSC 导出触发增长循环再建 |

## 内链结构（方案第十四节）

- KG 主页面 ↔ 2.47 / 2.6 / 24.6 数值页（valueBlocks 直链）
- 2.47 页 ↔ 2.6 页（正文互链 + related 卡片）；24.6 页 → kg-to-stone
- `/converters` hub → 全部新页面（Popular conversions 列表）
- liters-to-gallons ↔ volume-converter（related 互换）
- cm / m / temperature 页 → length-converter / area-converter / hub

## 遗留人工项（代码之外）

1. GSC → URL Inspection 逐一检查：Homepage、`/converters`、`kg-to-lbs-converter`、`percentage-calculator`、`salary-calculator`、`/methodology`
2. GSC → Sitemaps 确认 `sitemap-index.xml` 状态为 Success（新 URL 上线后可用 URL Inspection → Request indexing 加速发现）
3. 7–14 天后复查 GSC：`2.47 / 2.6 / 24.6 kg to lbs`、`pct calculator` 的 impressions / position / query variants
