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
