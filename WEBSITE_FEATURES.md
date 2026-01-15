# 网站高级功能与技巧完整指南

> 本文档整理了这个 SvelteKit 博客模板使用的所有高级网页技术和特效实现

---

## 目录

1. [自定义 Markdown 扩展语法](#1-自定义-markdown-扩展语法)
2. [视频自动播放特效](#2-视频自动播放特效)
3. [项目卡片悬停特效](#3-项目卡片悬停特效)
4. [ScrollMeter 进度条导航](#4-scrollmeter-进度条导航)
5. [代码块复制按钮](#5-代码块复制按钮)
6. [数学公式支持](#6-数学公式支持)
7. [自定义组件](#7-自定义组件)
8. [链接智能处理](#8-链接智能处理)
9. [项目卡片配置](#9-项目卡片配置)
10. [性能优化技巧](#10-性能优化技巧)

---

## 1. 自定义 Markdown 扩展语法

### 1.1 增强图片语法

支持在 Markdown 图片语法后添加自定义属性：

```markdown
![图片描述](/assets/images/example.png "图片标题"){width=600px}
```

**支持的属性**：
- `width=600px` - 设置宽度
- `height=400px` - 设置高度
- 任何 HTML 属性：`class="my-class"`, `id="fig-1"` 等

**自动识别视频**：

如果图片路径以 `.mp4`, `.webm`, `.ogg` 结尾，会自动渲染为 `<video>` 标签：

```markdown
![动画演示](/assets/videos/demo.mp4 "这是一个演示视频"){width=800px}
```

### 1.2 视频特殊参数

```markdown
![视频](/assets/demo.mp4){width=700px freeze=8000 loop playsinline}
```

**参数说明**：
- `freeze=8000` - 视频结束后暂停 8000ms（8秒）再重新播放
- `loop` - 循环播放
- `playsinline` - 在移动设备上内联播放（不全屏）
- `controls` - 显示视频控制条（默认鼠标悬停时显示）

---

## 2. 视频自动播放特效

### 2.1 核心功能

使用 `IntersectionObserver` 实现智能视频播放：

- ✅ **视频完全进入视口**时自动播放
- ✅ **视频离开视口**时自动暂停
- ✅ **播放结束后暂停 N 秒**（freeze），再自动重播
- ✅ **桌面端悬停**显示控制条
- ✅ **移动端**隐藏控制条（避免干扰）
- ✅ **性能优化**：使用 `IntersectionObserver` 而非滚动监听

### 2.2 使用示例

在 `main.md` 中直接使用：

```markdown
## 实验结果

下面的视频展示了训练过程：

![训练过程](/assets/videos/training.mp4 "模型训练的loss曲线"){width=800px freeze=10000}

视频会在完全可见时自动播放，播放结束后暂停10秒再重播。
```

### 2.3 技术实现

**关键代码片段**（已在 `src/lib/components/Markdown.svelte` 中实现）：

```javascript
// IntersectionObserver 配置
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const video = entry.target;
      if (entry.intersectionRatio >= 1.0) {
        video.play(); // 完全可见时播放
      } else {
        video.pause(); // 离开视口暂停
      }
    }
  },
  { threshold: 1.0 } // 100% 可见时触发
);
```

---

## 3. 项目卡片悬停特效

### 3.1 图片/视频切换

项目卡片支持**鼠标悬停时从静态图片切换到视频**：

**配置方式**（在 `src/projects/*.md` 的 frontmatter）：

```yaml
---
title: 我的研究项目
image_before: /assets/images/project_preview.png
image_after: /assets/images/project_demo.mp4  # 悬停时显示的视频
---
```

### 3.2 效果类型

**A. 图片 → 图片**
```yaml
image_before: /assets/static.png
image_after: /assets/animated.png
```
悬停时简单切换图片

**B. 图片 → 视频**（推荐）
```yaml
image_before: /assets/preview.png
image_after: /assets/demo.mp4
```
悬停时播放视频，离开时暂停并回到预览图

### 3.3 完整项目配置示例

```yaml
---
title: Compute-Optimal Scaling
link: https://arxiv.org/abs/xxxx
date: 2026-01-13
highlight: true                                    # 高亮显示（蓝色背景）
image_before: /assets/images/preview.png
image_after: /assets/images/result.mp4
image_border: true                                 # 给图片加边框

resources:
  - label: arXiv
    url: https://arxiv.org/abs/xxxx
  - label: Code
    url: https://github.com/username/repo
  - label: Poster
    url: /assets/files/poster.pdf
---

作者列表：[张三](https://example.com), 李四, 王五

_NeurIPS_, 2026
```

---

## 4. ScrollMeter 进度条导航

### 4.1 功能特性

**最炫酷的特效之一！** 左侧固定的渐变进度条：

- ✅ **渐变进度条**：蓝色 → 绿色，显示阅读进度
- ✅ **自动提取标题**：h2/h3 标题自动成为"刻度线"
- ✅ **可点击跳转**：点击刻度线跳转到对应章节
- ✅ **悬停显示标题**：鼠标悬停在刻度上显示章节名
- ✅ **当前位置高亮**：正在阅读的章节刻度会高亮
- ✅ **响应式设计**：小屏幕（<1024px）自动隐藏

### 4.2 使用方法

在页面中添加（已在 `+page.svelte` 中配置）：

```svelte
<ScrollMeter 
  containerSelector=".md-output" 
  headingsSelector="h2, h3" 
/>
```

### 4.3 跳过某些标题

如果某个标题不想出现在进度条中：

**方法 1：使用属性**
```markdown
<h2 data-skip-meter>这个标题不会出现在进度条</h2>
```

**方法 2：使用 class**
```markdown
<h2 class="no-meter">也不会出现</h2>
```

### 4.4 自定义样式

在 `ScrollMeter.svelte` 中可修改：

```css
:root {
  --meter-width: 14px;        /* 进度条宽度 */
  --tick-length: 22px;        /* 刻度线长度 */
  --tick-color: #9ca3af;      /* 刻度线颜色 */
}

.gradient {
  background: linear-gradient(180deg, #77aabb 0%, #bbcc33 100%);
  /* 修改这里改变渐变颜色：起始色 → 结束色 */
}
```

---

## 5. 代码块复制按钮

### 5.1 自动功能

所有代码块右上角自动出现 "Copy" 按钮：

```markdown
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

**效果**：
- 悬停时显示 "Copy" 按钮
- 点击后复制代码到剪贴板
- 按钮文字变为 "Copied!" 然后恢复
- 出错时显示 "Error"

### 5.2 样式自定义

在 `Markdown.svelte` 的 `<style>` 部分：

```css
:global(pre[data-copyable] .copy-btn) {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: #f3f4f6;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
```

---

## 6. 数学公式支持

### 6.1 使用 KaTeX

本项目使用 [KaTeX](https://katex.org/) 渲染数学公式。

**行内公式**：
```markdown
这是一个行内公式 $E = mc^2$，它会自动渲染。
```

**块级公式**：
```markdown
$$
\mathcal{C}_J \propto \mathcal{D}_J \times \text{UTD} \times \text{batch size} \times \text{model size}
$$
```

### 6.2 复杂公式示例

```markdown
$$
L(\theta) = \mathbb{E}_{(s, a, s') \sim \mathcal{P}, a' \sim \pi(\cdot|s')}\left[ \left(r(s, a) + \gamma \bar{Q}(s', a') - Q_\theta(s, a) \right)^2\right]
$$
```

### 6.3 错误处理

如果公式语法错误，会显示错误提示而不会破坏页面。

---

## 7. 自定义组件

### 7.1 Jumpbox（跳转框）

**功能**：创建带样式的内部链接框，跳转到指定章节

**语法**：
```markdown
:::jumpbox id="method" label="方法详解":::
```

如果省略 `label`，会自动使用项目标题：
```markdown
:::jumpbox id="utd_scaling":::
```

**效果**：渲染成灰色背景的可点击框，点击后跳转到 `#method`

### 7.2 Takeaway Box（要点框）

**功能**：高亮显示重点内容

**语法**：
```markdown
:::takeaway_begin:::
**核心发现**：
- 发现 1：模型越大，效果越好
- 发现 2：数据质量比数量更重要
:::takeaway_end:::
```

**效果**：浅蓝色背景、深蓝色左边框、带 "TAKEAWAYS" 标签的高亮框

### 7.3 Small Block（小字区块）

**功能**：以较小字体显示内容（如脚注、附录）

**语法**：
```markdown
:::small_begin:::
**脚注**：这里是一些不太重要的补充信息，
用较小的字体显示以不干扰主要内容。
:::small_end:::
```

---

## 8. 链接智能处理

### 8.1 自动区分内外链

**内部链接**（站内跳转）：
```markdown
[关于我们](/about)
[跳转到方法章节](#method)
```
正常跳转，不打开新标签页

**外部链接**（站外跳转）：
```markdown
[arXiv 论文](https://arxiv.org/abs/xxxx)
[GitHub 代码](https://github.com/user/repo)
```
自动添加 `target="_blank"` 和安全属性 `rel="external noopener noreferrer"`

### 8.2 自动识别规则

判断为内部链接的条件：
- 以 `/` 开头：`/about`
- 以 `#` 开头：`#method`
- 相对路径：`projects/demo.html`

其他均视为外部链接。

---

## 9. 项目卡片配置

### 9.1 完整配置模板

创建 `src/projects/your_project.md`：

```markdown
---
# 基本信息
title: 你的项目标题
link: https://arxiv.org/abs/xxxx              # 主链接
date: 2026-01-13                              # 发布日期（YYYY-MM-DD）
highlight: true                                # 是否高亮（蓝色背景）

# 图片配置
image_before: /assets/images/preview.png      # 预览图
image_after: /assets/images/demo.mp4          # 悬停效果（图片或视频）
image_border: false                            # 是否添加边框

# 子图片（可选）
subimages:
  - /assets/images/sub1.png
  - /assets/images/sub2.png
  - /assets/images/sub3.png

# 资源链接
resources:
  - label: arXiv
    url: https://arxiv.org/abs/xxxx
  - label: Code
    url: https://github.com/username/repo
  - label: Website
    url: https://project-website.com
  - label: Poster
    url: /assets/files/poster.pdf
  - label: Slides
    url: /assets/files/slides.pptx
---

[作者1](https://author1.com/)\*,
[作者2](https://author2.com/)\*,
[作者3](https://author3.com/)

_会议名称_, 2026

项目简介和主要内容描述...

## 可以包含子标题

支持完整的 Markdown 语法，包括：
- 列表
- **粗体**
- *斜体*
- 数学公式 $E = mc^2$

```python
# 代码示例
print("Hello, World!")
```
```

### 9.2 日期格式

日期使用 `YYYY-MM-DD` 格式，会自动格式化为 "January 2026" 这样的显示。

### 9.3 高亮项目

设置 `highlight: true` 会给项目卡片添加浅蓝色背景，用于突出重要项目。

---

## 10. 性能优化技巧

### 10.1 视频优化

**预加载策略**：
```html
<video preload="metadata">
  <!-- 只预加载元数据，不预加载整个视频 -->
</video>
```

**IntersectionObserver**：
- 使用视口检测而非滚动事件监听
- 减少不必要的事件触发
- 提升页面滚动性能

### 10.2 事件清理

组件销毁时自动清理所有监听器：

```javascript
onDestroy(() => {
  // 清理视频事件监听器
  videos.forEach(v => {
    const cleanup = v._cleanupVideo;
    if (cleanup) cleanup();
  });
  
  // 断开 IntersectionObserver
  if (io) io.disconnect();
});
```

### 10.3 响应式设计

**ScrollMeter 自适应**：
```css
@media (max-width: 1024px) {
  .scroll-meter {
    display: none; /* 小屏幕隐藏 */
  }
}
```

**项目卡片网格**：
```html
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
  <!-- 手机1列，平板3列，桌面4列 -->
</div>
```

---

## 11. 完整示例

### 11.1 创建一篇完整博客

**文件**：`src/maintext/main.md`

```markdown
# 深度强化学习的可扩展性研究

在大规模 AI 时代，我们需要能够预测训练结果的方法论...

![训练曲线](/assets/videos/training_curve.mp4 "模型训练过程"){width=800px freeze=10000}

## 方法介绍

:::jumpbox id="method":::

我们提出了一种新的训练方法，基于以下核心思想：

### 数学推导

损失函数定义为：

$$
L(\theta) = \mathbb{E}_{(s, a, s') \sim \mathcal{P}}\left[ \left(r(s, a) + \gamma \bar{Q}(s', a') - Q_\theta(s, a) \right)^2\right]
$$

其中 $\theta$ 是网络参数，$\gamma$ 是折扣因子。

### 关键发现

:::takeaway_begin:::
**主要贡献**：
1. 证明了 value-based RL 是可预测的
2. 发现了 UTD ratio 和 model size 的 scaling law
3. 实现了 compute-optimal scaling
:::takeaway_end:::

## 实验结果

我们在多个环境上验证了方法...

![实验结果对比](/assets/images/results_comparison.png){width=700px}

### 详细分析

:::small_begin:::
**技术细节**：更多实验参数和消融实验结果请参见论文附录 A.3。
我们使用了标准的 DQN 架构，包含 3 层全连接网络...
:::small_end:::

## 结论

> 我们的研究表明，通过正确的超参数选择，value-based RL 
> 可以实现可预测的 scaling behavior。

## 相关工作

参考文献：
- [Chinchilla 论文](https://arxiv.org/abs/2203.15556)
- [GPT-3 Scaling Laws](https://arxiv.org/abs/2001.08361)

代码实现：

\`\`\`python
def train_agent(env, model_size, utd_ratio):
    # 初始化模型
    model = create_network(model_size)
    
    # 训练循环
    for step in range(total_steps):
        # 收集数据
        data = collect_data(env)
        
        # 多次更新
        for _ in range(utd_ratio):
            loss = compute_td_loss(model, data)
            optimizer.step(loss)
    
    return model
\`\`\`
```

### 11.2 添加新项目

**文件**：`src/projects/my_research.md`

```markdown
---
title: 大规模强化学习的扩展定律
link: https://arxiv.org/abs/2026.xxxxx
date: 2026-01-13
highlight: true
image_before: /assets/images/research_preview.png
image_after: /assets/videos/research_demo.mp4

resources:
  - label: arXiv
    url: https://arxiv.org/abs/2026.xxxxx
  - label: Code
    url: https://github.com/myusername/scaling-rl
  - label: Demo
    url: https://my-demo-site.com
  - label: Poster
    url: /assets/files/my_poster.pdf
---

[张三](https://zhangsan.com/)\*,
[李四](https://lisi.com/)\*,
[王五](https://wangwu.com/)

_NeurIPS_, 2026

本文研究了强化学习算法的扩展性，发现了数据效率与模型大小之间的 power law 关系。

**主要贡献**：
- 提出了 compute-optimal 的训练配置
- 在 10+ 个环境上验证了 scaling law
- 开源了完整的训练代码和数据
```

---

## 12. 文件结构说明

```
value-scaling.github.io/
├── src/
│   ├── lib/
│   │   └── components/
│   │       ├── Markdown.svelte       # 核心：Markdown 渲染 + 视频特效
│   │       ├── ScrollMeter.svelte    # 进度条导航
│   │       ├── Jumpbox.svelte        # 跳转框组件
│   │       ├── TakeawayBox.svelte    # 要点框组件
│   │       └── Seo.svelte            # SEO 配置
│   ├── maintext/
│   │   └── main.md                   # 主页内容（你主要编辑的文件）
│   ├── projects/
│   │   ├── project1.md               # 项目1
│   │   └── project2.md               # 项目2
│   └── routes/
│       ├── +page.svelte              # 主页布局
│       └── projects/
│           └── Project.svelte        # 项目卡片组件
├── static/
│   └── assets/
│       ├── images/                   # 图片资源
│       ├── videos/                   # 视频资源（建议创建）
│       ├── files/                    # PDF/其他文件
│       └── fonts/                    # 字体文件
└── docs/                             # 构建输出目录（npm run build）
```

---

## 13. 常见问题 FAQ

### Q1: 视频不自动播放？
**A**: 检查：
1. 视频格式是否为 `.mp4/.webm/.ogg`
2. 视频是否完全可见（threshold: 1.0）
3. 浏览器是否允许自动播放（需要 `muted` 属性）

### Q2: ScrollMeter 不显示？
**A**: 检查：
1. 屏幕宽度是否 > 1024px（小屏幕会隐藏）
2. 是否有 `h2/h3` 标题
3. CSS 是否正确加载

### Q3: 数学公式渲染失败？
**A**: 检查：
1. KaTeX CSS 是否加载：`import "katex/dist/katex.min.css"`
2. 公式语法是否正确
3. 是否使用了不支持的命令

### Q4: 如何修改进度条颜色？
**A**: 在 `ScrollMeter.svelte` 中修改：
```css
.gradient {
  background: linear-gradient(180deg, #你的起始色 0%, #你的结束色 100%);
}
```

### Q5: 如何添加更多自定义组件？
**A**: 
1. 在 `src/lib/components/` 创建新组件
2. 在 `Markdown.svelte` 中添加对应的正则和渲染逻辑
3. 参考 `jumpbox` 和 `takeaway` 的实现

---

## 14. 开发工作流

### 14.1 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（支持热重载）
npm run dev

# 3. 访问 http://localhost:5173
```

### 14.2 构建生产版本

```bash
# 构建静态网站到 docs/
npm run build

# 预览构建结果
npm run preview
```

### 14.3 部署到 GitHub Pages

```bash
# 1. 构建
npm run build

# 2. 提交
git add docs/
git commit -m "Update website"
git push

# 3. 在 GitHub 仓库设置中：
#    Settings → Pages → Source: main 分支 → Folder: /docs
```

---

## 15. 进阶自定义

### 15.1 修改主题颜色

在 `tailwind.config.js` 中：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#another-color',
      }
    }
  }
}
```

### 15.2 添加新页面

1. 在 `src/routes/` 创建新目录，如 `about/`
2. 添加 `about/+page.svelte`
3. 访问 `/about` 即可

### 15.3 自定义字体

1. 将字体文件放到 `static/fonts/`
2. 在 `src/app.css` 中定义：

```css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2');
}

body {
  font-family: 'MyFont', sans-serif;
}
```

---

## 16. 技术栈总结

- **框架**: SvelteKit 2.0
- **样式**: Tailwind CSS 3.4
- **Markdown**: Marked.js + 自定义扩展
- **数学公式**: KaTeX
- **图标**: Lucide Svelte
- **构建工具**: Vite 5.0
- **适配器**: `@sveltejs/adapter-static`（静态站点生成）

---

## 17. 参考资源

- [SvelteKit 文档](https://kit.svelte.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [KaTeX 文档](https://katex.org/)
- [Marked.js 文档](https://marked.js.org/)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

## 结语

这个博客模板集成了众多现代 Web 技术，提供了丰富的内容展示方式。
你可以根据需要选择使用这些功能，也可以在此基础上进一步扩展。

**关键优势**：
- 🎨 丰富的视觉效果
- 📝 强大的 Markdown 扩展
- 🚀 优秀的性能优化
- 📱 完美的响应式设计
- 🛠️ 易于维护和扩展

祝你创建出优秀的学术博客网站！

---

*最后更新：2026-01-13*
