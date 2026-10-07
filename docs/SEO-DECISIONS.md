# SEO 决策与复查日志（SEO-DECISIONS）

> 用途：跨会话记忆。任何 AI agent（或人）冷启动接手 CalcPilot 的 SEO工作时，先读这个文件，
> 避免重新论证已拍板的事、或遗忘待复查项。纪律来自 `.agents/skills/change-and-decision-log`。
> 变更史（what/when/why）：见 git log 与 `docs/SEO-ACTIONS-2026-09-30.md`、`docs/SEO-COOKBOOK-AUDIT-2026-10-01.md`，此处不重复。

---

## 一、已拍板的决策（含理由，防止重新论证）

| # | 决策 | 理由（为什么选它、放弃了什么） | 日期 |
|---|---|---|---|
| D1 | 长尾数值页 `<title>` 去掉 `\| CalcPilot` 品牌尾巴 | 未成熟品牌的名字在 title 中只消耗点击欲；工具页保留品牌。放弃的是教程「Title 结尾加品牌名」的默认建议 | 2026-09 |
| D2 | 数值页 title 用 `≈` 不用 `=` | 展示值是四舍五入（如 5.4454 lb），换算因子（2.2046226218）才是精确定义，`=` 会声明一个不成立的等式 | 2026-09 |
| D3 | 新站期冻结批量数字页：只做 GSC 验证过的 query（impressions ≥ 2 且 position < 70）才建页 | 教程「新站协议」+ Google scaled-content/doorway 风险。放弃的是程序化铺量的理论流量上限 | 2026-09-30 |
| D4 | kg 多措辞页面共存：kg-to-lbs-converter / kilograms-to-pounds-converter / kilos-to-pounds-converter 各自独立页 | 三种措辞是不同 query（缩写/全称/口语），title 与内容刻意差异化避免同 title 竞争。**风险**：同义意图蚕食，需按 D8 监控 | 2026-09 |
| D5 | 不用子域名 | 新站期子目录共享主域权重；子域名聚焦策略是老站（onl.jp 案例）的做法 | 2026-10-01 |
| D6 | 多语言暂缓 | GSC 流量 100% 来自 US/UK/CA/AU 英语区；hreflang 成本先花在主市场 | 2026-10-01 |
| D7 | Footer「Popular tools」采用单列 8 链接（不用双列） | 双列在页脚容器内折行破坏可读性；完整描述性锚文本比列数更有价值 | 2026-10-01 |
| D8 | P2 清单中 cm/m/liters 等的数值长尾页冻结，等 GSC 出现 ≥2 impressions 再建 | 同 D3；这些 pair 目前无数值型 query 证据 | 2026-09-30 |
| D9 | 新增 `/everyday/board-foot-calculator`，覆盖 board foot / feet / boardfoot / ft 四个拼写变体于同一页 | 四变体搜索意图与 SERP 完全相同，拆页只会自我蚕食（同 D4 风险，但此处合并是主动选择）。页内差异化靠「成本 + 圆木 Doyle/Scribner + 反查数量」三模式承担 | 2026-10-06 |
| D10 | 圆木模式改用各规则的**权威原始形式**：Doyle `(D−4)²×L/16`、International 1/4" 段式 `0.905×Σ(0.22d²−0.71d)`（按 4 ft 分段、每段 +0.5 in 锥度、取整 5 BF）、Scribner 直接查官方 16 ft 表后按长度缩放（取整 10 BF） | 初版误用 `(D²−k)×L÷12` 通式，16"×16' 算出 Doyle 320 BF，正确值 144 BF——**数值错误比排名差更伤 E-E-A-T**。三条规则本身量纲不同（公式规则/图表规则），用一个通式套是概念性错误。International 段式公式已对 USDA/VT 官方表 10 个直径全部命中；Scribner 表与 Idaho Board of Scaling Practices 的 Coconino Decimal C 表逐行核对一致 | 2026-10-06 |
| D11 | `<1119px` 时把结果卡片移到表单**上方**并 `position: sticky` 吸附，隐藏 breakdown 行 | 原先堆叠后表单高 740px，结果卡片落在 y=1113（视口仅 844），与「首屏直接给答案」的目标冲突。置顶后首屏可见（top 350 / 高 191），滚动填表时答案仍在视线内实时更新；实测不遮挡任何字段 | 2026-10-06 |
| D12 | 木材厚度加 3/4–8/4 五个 chip 快捷键；删掉 `.form-hint` 死类名；补 `log board foot calculator` 与「该用哪条规则」两条 FAQ | chip 把「4/4 是多少英寸」这一最高频疑问变成一次点击；死类名无样式，属于无效代码 | 2026-10-06 |
| D13 | related 从 `[percentage, discount, tip]` 换成 `[area, volume, length-converter]` | 原推荐与木工场景零相关，跳出率高且浪费内链权重；三个转换器均与「尺寸／体积」意图邻接，且都存在、可正常解析 | 2026-10-06 |
| D14 | 全站移动端（≤1119px）结果卡片上移到表单前并吸顶；≤767px 时财务页隐藏 donut | 实测 18 个页面里 14 个的结果卡片落在 y=635–1049，手机视口仅 844——用户要先划过大半屏才看到自己刚算的东西，与「首屏给答案」直接冲突。上移后全部进首屏（top 275–350），实测不遮挡任何输入框 | 2026-10-06 |
| D15 | `.result-card` 在窄屏由 `position: static` 改为 `relative` | **真 bug**：卡片改为 static 后不再是包含块，`::before` 光晕（`right:-20%`、宽 70%）改相对外层祖先定位且无人裁剪，导致**全站所有页面**在手机上横向溢出 78px（=20%×390）。这是 `overflow: hidden` 只裁后代、不裁包含块在自身之外的绝对定位元素所致 | 2026-10-06 |
| D16 | finance 三处数学修正：贷款 extra payment 真正缩短期限并降息、储蓄/复利不再把本金算成利息、salary 与 auto-loan 的环形图对齐中心数 | 三处都属「文案承诺 A、代码做 B」：①页面写 "extra payments shorten your term and cut total interest"，代码只在月供上加钱，利息与期数完全不变；②`grossInterest = gross - totalContrib` 漏减本金，把本金当利息征税后再从头条里丢掉，头条约少算 $10,000 且与环形图对不上；③环形图三段之和 ≠ 中心数 | 2026-10-06 |
| D17 | 日期类改用日历运算（`setDate` / 逐日计数）替代毫秒运算 | **真 bug**：`age-calculator` 用 `floor(ms/86400000)`，DST 让某些本地日长 23 或 25 小时，跨 30 年可差 1–2 天（悉尼 160/216、纽约 36/216 组合出错）；`date-add` 用 `+n*86400000`，2026 年在纽约有 38 个日期组合算错（如 10-03 +30 天显示 Nov 1，应为 Nov 2）。`date-difference`/`countdown` 用 `round` 因正负偏差抵消而侥幸正确，暂不动 | 2026-10-06 |

## 二、运行规则（发页/改页时必须执行）

1. **发新页面**：slug 加入 `src/data/site.ts` 的 `latestSlugs`（首页新鲜度模块）；用 `.agents/skills/content-creation-standards` 的四步清单过一遍（查重 → 事实核对 → 技术检查 → 双向内链）。
2. **改已有页面**：一次一个变量，先记录基线（日期/旧值/28 天点击曝光），4–6 周窗口内不再动同一页面及同 query 竞争页（`.agents/skills/measurement-discipline`）。排名 1–3 或点击稳定的页面不改 title，除非有诊断依据。
3. **判断性决定**：按本文件第一节格式追加记录；不确定的事写进第二节「标记」，不猜。

## 三、待复查标记（flag，到期必查）

| 标记 | 内容 | 复查时间 / 触发条件 |
|---|---|---|
| F1 | GSC 人工项：核心页 URL Inspection + 确认 sitemap-index 状态 Success；对 4 个新页 Request indexing | 部署完成后立即（上一轮对话已给步骤） |
| F2 | 2026-09 spam update 已于 9/24 开始 rollout（约两周）| 2026-10-08 之后再看整站曝光趋势，此前不下结论 |
| F3 | kg 多措辞三胞胎（D4）蚕食监控：GSC 按 query 看 kg-to-lbs / kilograms-to-pounds / kilos-to-pounds 三页是否互相分食而非各自增长 | 下一轮 GSC 导出（60–90 天窗口），异常则触发 `.agents/skills/duplicate-intent-audit` |
| F4 | CTR 优化首批候选：`2.47kg in pounds`（#7.05、40 imp、1 click）数据积累后适合 `.agents/skills/ctr-snippet-optimization` 流程；`pct calculator`（34 imp / #68.71）位置太深，不属于 CTR 技能范围，走内容/内链 | 数据满 28–90 天窗口后 |
| F5 | PageSpeed 基线实测：代码侧已最优（SSG/自托管字体/内联 CSS），用 pagespeed.web.dev 跑首页 + kg-to-lbs 页留档 | 下一轮部署稳定后 |
| F6 | Finance 页面合规复查：salary/mortgage 属 YMYL 邻近域，已有免责声明与「estimates only」措辞，按 `.agents/skills/legal-regulatory-compliance` 核对educational/advice 边界 | 下次改动 finance 内容时 |
| F7 | board-foot-calculator 蚕食与蚕食反向监控：新页与既有 54 页主题（转换器/财务）相关性弱，需观察 GSC 是否将其归入 construction 类而非 finance；另监控 boardfoot 无空格变体是否被同页覆盖而非另起意图 | 部署后 28–60 天 |
| F8 | 页内木材价格区间（rough $2–6 / surfaced $4–11 / walnut $10–18）为 2026 年公开来源快照，具时效性 | 每 6 个月复核一次，木材价格波动时立即更新 |
| F9 | 圆木模式的 Doyle/Scribner/International 输出已对 VT/USDA 与 IBSP 官方表校验（16 ft 全直径段）；但表只覆盖 6–40 in，超出范围当前做端点钳制，未给提示 | 若 GSC 出现 >40 in 或超大径查询，补边界提示 |
| F10 | 移动端结果卡片改为置顶吸附加隐藏 breakdown（D11），属于**该页独有**的移动端布局，与站内其他工具页不一致 | 部署后看 GSC 移动端可用性 + 行为数据；若其他页也需同款，抽成公共类而非逐页复制 |
| F11 | D14 已把「结果卡片置顶吸顶」从 board-foot 单页提升为全站规则，F10 的复查项合并到这里 | 部署后看 GSC 移动端可用性与滚动深度 |
| F12 | 日期计算（D17）只修了 age 与 date-add 两页；`date-difference` 和 `countdown` 目前靠 `Math.round` 的正负抵消侥幸正确，逻辑仍脆弱 | 下次改动日期类页面时一并换成日历运算 |
| F13 | `npx astro check` 有 1 条 `MB_PER_GB` 未使用告警（converters.ts 引入未用） | 下次改 converters.ts 时顺手清理 |

## 四、技能包路由表（seoo skill pack × CalcPilot）

已装入 `.agents/skills/`（MIT，源：seoo.tools / countrytaxcalc.com）。用 `site-audit-orchestrator` 做总入口。与本项目现有机制的对应：

| 技能 | CalcPilot 状态 |
|---|---|
| content-opportunity-discovery | ✅ 已有同等机制（GSC 近失词扫描 = 2.47/2.6 的选词法），技能补充了结构化缺口分析 |
| internal-linking-audit | ✅ 已做手工版；技能补充「层级对层级的系统性缺口」视角 |
| technical-seo-audit | ✅ 已机器化（scripts/seo-validate.mjs）；注意技能提醒 FAQ/HowTo 富结果已不再展示，schema 保留无害 |
| verify-primary-source | ✅ 换算因子是精确 SI 定义（NIST），风险低；finance 数字适用 |
| seo-health-monitoring | ✅ 已有 GSC-WEEKLY-TRACKING；技能补充了基于自身历史的告警阈值校准（点击为主指标） |
| change-and-decision-log | ✅ 本文件即其产物 |
| duplicate-intent-audit | ⚠️ 高相关：D4 的多措辞策略正是该技能针对的风险面，见 F3 |
| legal-regulatory-compliance | ⚠️ finance 内容适用，见 F6 |
| ctr-snippet-optimization | ⏳ 等 F4 数据成熟 |
| traffic-drop-diagnosis / indexing-crawl-health-audit / site-migration-safety / backlink-profile-audit / measurement-discipline / seo-growth-stage-strategy | 📦 情境备用，触发时按技能步骤执行 |

## 五、AI-SEO + 全站审计（2026-10-07）

| # | 决策 | 原因 |
|---|------|------|
| A1 | llms.txt/llms-full.txt 纳入部署校验：URL 集合必须与 sitemap-0.xml 完全一致 | 上轮上线 board-foot 后 llms-full 落后 2 个 URL（缺首页 + 新页）。机器可读目录与 sitemap 失配会让 AI 爬虫拿到过期目录；后续每次发新页把两个文件当作一个原子提交 |
| A2 | 全站工具页免责声明块显示「Content updated <build date>」（与 JSON-LD dateModified 同源） | 新鲜度原来只存在于结构化数据里，页面不可见。GEO 研究与 Google 指南都把「可见的更新日期」当作 freshness/E-E-A-T 信号；渲染在 6 个工具模板上，一次改动全站生效 |
| A3 | methodology「Last reviewed」从 8-26 刷新至 10-07 | 页面可见日期与 dateModified 断档 6 周，是全站唯一过期的 freshness 信号 |
| A4 | meta description 全站 ≤165 字符；liters-to-gallons（170）与 percentage-calculator（170）修剪至 151/150 | SERP 约 155-160 字符截断，超出部分被省略号吃掉，行动引导丢失 |
| A5 | contact 页从 159 词扩到 ~450 词（报告分诊、如何提交、FAQ 指引） | 全站唯一 thin content 页；contact 是 trust 页，薄内容拖低整站质量信号 |
| A6 | vercel.json 补 X-Frame-Options: SAMEORIGIN | 原来只有 nosniff/referrer/HSTS，缺 clickjacking 头。CSP frame-ancestors 更现代但 SAMEORIGIN 是零成本兼容层 |

## 六、审计基线（2026-10-07 快照，用于下次对照）

- 57 页 / 56 个 index 页全扫描：title 18-62 字符、description 102-170、正文 250-2490 词（中位 617）
- JSON-LD 全覆盖：Organization/WebSite/WebPage/BreadcrumbList/WebApplication/HowTo/FAQPage/ItemList，无缺页
- 全站 2288 个内链，无 <5 唯一内链的孤页；canonical 全部自引用；重定向链规范（http→https、www→裸域、尾斜杠 308）
- search 页 noindex 正确；404 返回真 404；HSTS 2 年
- 未做项：hreflang（GSC 流量 100% 英语区，暂不需要）；OG 图全站共用一张（工具页个性化 OG 图是后续可选项）
