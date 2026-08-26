# CalcPilot 关键词抓取与 SEO 落地（zens-ink）

日期：2026-08-26  
站点：https://calcpilot.net  
工具：zens-ink 1.4.6（Google Autocomplete，无 Bing/Serper 密钥）

## 抓取规模

- 种子词 21 个（mortgage / car payment / salary / kg to lbs / cm to inches 等）
- a-z 深挖：mortgage calculator、kg to lbs、salary calculator、percentage calculator
- 去噪后约 **1070** 条英文建议词
- 聚类、意图分类、GEO fan-out 已写入 `reports/seo/`
- KGR / Bing volume：未配置 `BING_API_KEY`，无法打分
- Reddit blue-ocean：API 403，跳过
- 竞品 sitemap：calculator.net（222 页）、calculatorsoup（1494 页）、omnicalculator（277 页）vs 本站 35 页

## 高需求、已有页面可承接的词

| 搜索意图 | 落地页 |
|---|---|
| kg to lbs / formula / chart / 70 kg | `/converters/kg-to-lbs-converter` |
| cm to inches, meters to feet | `/converters/length-converter`（已改为多单位） |
| celsius to fahrenheit / formula / chart | `/converters/temperature-converter` |
| car payment calculator | `/finance/auto-loan-calculator` |
| amortization / extra payments | `/finance/mortgage-calculator` |
| hourly to salary / annual | `/finance/salary-calculator` |
| percentage of Y / increase / difference | `/everyday/percentage-calculator` + change 页 |
| age calculator by date of birth | `/time-date/age-calculator` |
| bmi kg / bmr men women | everyday 对应页 |

## 竞品有、本站暂不做的品类（广度缺口）

401k、retirement、tax、inflation、body fat、macro、auto lease、annuity、sales tax。这些需要新引擎，未在本轮硬造薄页。

## 本轮已落地

- 长度换算：mm/cm/m/km/in/ft/yd/mi
- 标题、描述、FAQ、H1 对齐 Autocomplete 主词
- `public/llms.txt` + `llms-full.txt`（When to use + How to use/call）
- 查询别名 301：car-payment、compound-interest、amortization、cm-to-inches、meters-to-feet、celsius-to-fahrenheit
- 页脚回链首页；简单工具 JSON-LD 补齐 featureList / free
- 构建后 site_audit：**0 errors**；GEO llms 检查通过

## 未做（缺密钥或需人工）

- Search Console / GA4 验证
- Ahrefs DR、Serper KD、Bing 搜索量
- 与 calculator.net 同量级的新品类扩张
