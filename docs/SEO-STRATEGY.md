# CalcPilot SEO 策略文档

> 基于 SEO-Awesome 框架（Google API 一手数据驱动 + I-Lang 算法编码）
> 生成日期：2026-08-14

---

## 一、当前 SEO 资产审计

### ✅ 已具备的基础（良好）

| 维度 | 现状 | 评分 |
|------|------|------|
| 渲染模式 | Astro SSG 静态输出，Google 可完整抓取 | A |
| 结构化数据 | Organization + WebSite + WebPage + WebApplication + HowTo + FAQPage + BreadcrumbList | A |
| Canonical | trailingSlash: never，每页唯一 canonical URL | A |
| Sitemap | @astrojs/sitemap 自动生成，已配置 lastmod/changefreq/priority | A- |
| robots.txt | 已配置，屏蔽 /search 和 /404，声明 sitemap | B+ |
| OG/Twitter | 完整的 Open Graph + Twitter Card 元数据 | A |
| 语义化 HTML | 正确的 H1-H4 层级、nav/main/footer 语义标签 | A |
| 内链结构 | RelatedCards + Footer + Breadcrumb 三层内链 | B+ |
| 移动适配 | 移动优先设计，响应式断点完整 | A |
| Core Web Vitals | SSG + 内联样式 + content-visibility:auto | A- |
| 页面速度 | 客户端计算 <200ms，无后端请求 | A |

### ⚠️ 已优化的改进项（本轮完成）

| 改进项 | 优化前 | 优化后 |
|--------|--------|--------|
| TDH 标题 | 无年份修饰，意图匹配不够精准 | 添加 2026 年份词，核心实体词前置 |
| Meta Description | 描述性语言，缺 CTR 触发词 | 添加 "Free"/"Instant"/"No sign-up" 等 CTR boosters |
| WebSite schema | 无 SearchAction | 添加 potentialAction SearchAction（启用 sitelinks search box） |
| Organization schema | 仅 name/url/logo | 添加 description + contactPoint |
| WebApplication schema | 基础字段 | 添加 featureList + audience + isAccessibleForFree + browserRequirements |
| Sitemap | 无 lastmod/changefreq/priority | 配置 lastmod + weekly + 0.7 |
| robots.txt | 基础规则 | 添加 Googlebot/Bingbot 显式允许 + crawl-delay |
| 内链深度 | 仅 RelatedCards 卡片链接 | 内容段落中添加语义化锚文本内链 |
| 内容实体密度 | understanding 描述较短 | 用 <strong> 标注领域实体词，扩展内容深度 |
| Core Web Vitals | 全量渲染 | 添加 content-visibility:auto 跳过离屏渲染 |
| 样式内联 | 外部 CSS 请求 | build.inlineStylesheets: auto |

---

## 二、Google 排名算法对齐策略

### 1. PageRank 权重传播

> PR(i) = (1-d)/N + d × Σ(PR(j)/L(j))，d=0.85

**策略：**
- 高权重外链 > 低权重外链。优先获取 .edu/.gov/权威金融媒体的外链
- GitHub 开源仓库（已配置 sameAs）提供技术社区信任信号
- 内链权重通过 RelatedCards 和内容内链自动传播到长尾页

**行动项：**
- [ ] 在 Product Hunt / Hacker News 发布，获取技术社区外链
- [ ] 在 Reddit r/personalfinance、r/financialindependence 自然分享
- [ ] 向金融教育类 .edu 网站推荐工具资源

### 2. TrustRank 信任种子

> 信任从种子站单向往外传播，每跳衰减

**策略：**
- 缩短与种子站的拓扑距离
- GitHub 仓库是技术信任种子之一（已配置）
- 通过 Wikipedia 外链（如果工具被引用）可大幅提升

**行动项：**
- [ ] 提交到 Wikipedia "List of online calculators"（需符合收录标准）
- [ ] 在 dev.to / Medium 发布技术文章，外链回 CalcPilot
- [ ] 申请 Google Search Console 验证

### 3. 时间衰减 & QDF

> W(t) = W₀ × e^(-λ(t-t₀)) + QDF 机制

**策略：**
- 年份词（"2026"）利用竞品内容衰减窗口，每年 12 月布局下一年份词
- 计算器类工具属于常青内容（λ 小），衰减慢
- 金融利率等数据需要定期更新以保持时效性

**行动项：**
- [ ] 每年 11 月更新所有标题中的年份
- [ ] 定期检查默认利率/税率是否需要更新
- [ ] 添加 "Last updated" 时间戳到页面

### 4. 主题权威度（Topic-Sensitive PageRank）

> 每个主题单独算权重向量。跨界写内容=稀释主题权重

**策略：**
- CalcPilot 聚焦 "calculators + converters" 主题，不跨界
- 四大类别（Finance / Converters / Time-Date / Everyday）各自主题独立
- 每个类别的 Hub 页是主题权重中心，通过内链向工具页传播

**当前状态：** 良好，主题聚焦度高

### 5. Neural Ranking（BERT/MUM 时代）

> 关键词密度已死。BERT 看语义向量，不看关键词重复次数
> 每千字核心词不超过 3 次，用同义词/上位词/下位词替代

**策略：**
- 内容使用语义变异度（覆盖多个相关角度）而非关键词堆砌
- 示例："mortgage" → 同义替换为 "home loan"、"housing payment"、"monthly payment"
- 每页覆盖：定义 + 计算方法 + 影响因素 + 示例 + FAQ = 语义凸包最大化

**当前状态：** 良好，已有 factors + examples + FAQ 多角度覆盖

### 6. Information Gain（最值钱的概念）

> 正交分量 = 你的独家信息。正交分量越长，排名越高
> 至少 15% 内容必须是全网独家的

**策略：**
- 计算器本身是物理唯一的工具（交互式计算 = 不可复制的信息资产）
- 独家内容来源：
  - 实时计算的摊还表（每个输入组合生成唯一数据）
  - 独家示例组合（worked examples 使用独特数值）
  - 独家 FAQ（回答用户真实问题）
- 添加更多独家数据：利率趋势图、不同地区税率对比

**行动项：**
- [ ] 添加 "当前平均利率" 参考数据（定期更新）
- [ ] 添加各州/各国的税率对比表
- [ ] 添加用户生成内容（UGC）入口：计算结果分享

### 7. 意图向量

> 前 200 字决定 Google 把你分到哪个意图象限
> 前 200 字必须密集堆放领域实体词

**策略：**
- 每个工具页的 intro 段落必须在前 200 字密集包含领域实体词
- 示例（Mortgage Calculator）："principal"、"interest"、"property tax"、"home insurance"、"amortization"、"down payment"、"fixed-rate"、"monthly payment"

**已优化：** understanding 段落已用 `<strong>` 标注实体词

**行动项：**
- [ ] 审计每个工具页 intro 的实体词密度
- [ ] 确保 H1 + intro + understanding 形成实体词三角

### 8. 用户行为信号

> 不是 bounce rate，是 Pogo-sticking（Short Click = 负面信号）
> Long Click = 正面信号。提高停留时间

**策略：**
- 交互式计算器天然降低 Pogo-sticking（用户输入数据→看结果→停留）
- 已添加的动画效果提升交互感知质量
- 结构化内容（表格 + 图表 + FAQ）增加停留时间

**当前状态：** 良好，计算器交互天然产生 Long Click

### 9. 内容结构模板（向量友好型）

> 1. 标题：核心实体词 + 高维修饰词 + 结果预期
> 2. 前 200 字：密集实体词锚定意图象限
> 3. 段落：论点→论据→推导（三角拓扑）
> 4. 至少 15% 独家内容
> 5. 内链锚文本语义丰富

**已对齐：** 标题已优化为 "核心词 + 年份 + 结果预期" 模式

---

## 三、PSEO 页面矩阵扩展策略

### 品类 × 维度矩阵

CalcPilot 当前有 18 个工具页面。可以通过维度扩展生成更多长尾页：

| 维度 | 示例 | 预估页面数 |
|------|------|-----------|
| 地区维度 | "mortgage calculator California" / "mortgage calculator Texas" | 50+ |
| 年份维度 | "mortgage calculator 2026" / "loan calculator 2027" | 每年 18 |
| 对比维度 | "15 vs 30 year mortgage" / "kg vs lbs" | 10+ |
| 场景维度 | "mortgage calculator with PMI" / "loan calculator extra payments" | 20+ |
| 单位组合 | "100 kg to lbs" / "5 meters to feet"（预设值页面） | 100+ |

### 自动化管道建议

1. **数据层**：为每个维度组合预设默认值和上下文文案
2. **模板层**：复用现有 FinanceTool / ConverterTool 组件
3. **发布策略**：先 staging 验证 5 批，确认质量后开 Cron
4. **内链编织**：新页面自动链回 Hub 页 + 相关工具页

---

## 四、变现策略

### 优先级排序

| 优先级 | 渠道 | 适用页面 | 预期 RPM |
|--------|------|---------|---------|
| P0 | Affiliate（金融产品推荐） | Finance 工具页 | $5-20 |
| P1 | AdSense | 全站 | $2-8 |
| P2 | Lead 生成 | Mortgage / Loan 页 | $10-50/lead |
| P3 | 订阅/API | 高频用户 | $5-15/月 |

**注意：** Lead 生成需先完善 Privacy Policy + 用户 opt-in 同意机制

---

## 五、自动化复盘管道

### GA4 接入清单

1. [ ] 创建 GA4 属性，获取 Measurement ID
2. [ ] 在 Base.astro 添加 GA4 gtag.js 脚本
3. [ ] 创建 Google Cloud 服务账号，下载 JSON 凭证
4. [ ] GA4 属性给服务账号加"查看者"权限
5. [ ] 搭建 Cron 每日拉取 pageview 数据
6. [ ] AI 按数据自动调整内容生成策略

### GSC 接入清单

1. [ ] 提交 sitemap-index.xml 到 Google Search Console
2. [ ] 验证域名所有权（DNS TXT 记录）
3. [ ] 监控 "排名 11-20 的词"（第二页机会词）
4. [ ] 监控 "曝光高点击低" 的词（优化 TDH）

### 关键指标看板

| 指标 | 目标 | 频率 |
|------|------|------|
| 索引页面数 | >30 | 每周 |
| 平均排名 | <20 | 每周 |
| 总曝光 | 持续增长 | 每周 |
| CTR | >3% | 每月 |
| Core Web Vitals | 全绿 | 每月 |
| Organic Sessions | 持续增长 | 每月 |

---

## 六、技术 SEO 检查清单

- [x] SSG 静态渲染（Google 可完整抓取）
- [x] Canonical URL（每页唯一）
- [x] Sitemap 自动生成 + lastmod
- [x] robots.txt 配置正确
- [x] JSON-LD 结构化数据完整
- [x] BreadcrumbList 面包屑导航
- [x] SearchAction（sitelinks search box）
- [x] 语义化 HTML（H1-H4 层级）
- [x] 移动适配（移动优先设计）
- [x] Core Web Vitals 优化（content-visibility）
- [x] OG/Twitter Card 元数据
- [x] 内链结构（三层：RelatedCards + Footer + 内容内链）
- [ ] Google Search Console 验证
- [ ] GA4 接入
- [ ] hreflang（如需多语言）
- [ ] 页面 "Last updated" 时间戳
- [ ] Open Graph 视频预览

---

## 七、下一步行动建议

1. **立即执行**：提交 sitemap 到 Google Search Console，验证域名
2. **本周完成**：接入 GA4，开始收集基线数据
3. **两周内**：审计每个工具页 intro 的实体词密度，确保前 200 字锚定意图象限
4. **本月内**：启动 PSEO 页面矩阵扩展（优先地区维度 × 金融计算器）
5. **持续**：每月检查 GSC 中排名 11-20 的词，优化对应页面的 TDH

---

*本策略文档基于 SEO-Awesome 技能框架生成，方法论来源于 Google API 一手数据驱动 + I-Lang 编码的 Google 排名算法解析。*
