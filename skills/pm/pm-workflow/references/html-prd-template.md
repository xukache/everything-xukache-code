# HTML PRD 浮标模板

在原型页面中嵌入 PRD 内容时使用本模板。

## 悬浮按钮

```html
<button class="prd-fab" type="button" onclick="togglePrdPanel()" aria-label="打开需求说明">PRD</button>
<aside class="prd-panel" id="prdPanel" aria-hidden="true">
  <div class="prd-panel__header">
    <strong>页面需求说明</strong>
    <button type="button" onclick="togglePrdPanel()" aria-label="关闭需求说明">×</button>
  </div>
  <div class="prd-panel__body">
    <section>
      <h3>页面目标</h3>
      <p>说明该页面帮助哪个角色完成什么业务动作。</p>
    </section>
    <section>
      <h3>功能范围</h3>
      <ul>
        <li>本页必须支持的能力。</li>
        <li>本页明确不做的能力。</li>
      </ul>
    </section>
    <section>
      <h3>字段与规则</h3>
      <ul>
        <li>字段名：来源、含义、是否必填、校验规则。</li>
      </ul>
    </section>
    <section>
      <h3>动作级验收标准</h3>
      <ul>
        <li>用户完成关键操作后，可以看到明确成功状态。</li>
      </ul>
    </section>
  </div>
</aside>
```

## 最小 CSS

```css
.prd-fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 50;
  width: 52px;
  height: 52px;
  border: 0;
  border-radius: 12px;
  background: #111827;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 12px 30px rgba(17, 24, 39, .22);
  cursor: pointer;
}

.prd-panel {
  position: fixed;
  right: 24px;
  bottom: 88px;
  z-index: 49;
  width: min(420px, calc(100vw - 32px));
  max-height: min(680px, calc(100vh - 120px));
  display: none;
  overflow: hidden;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 18px 60px rgba(15, 23, 42, .2);
}

.prd-panel.is-open {
  display: block;
}

.prd-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.prd-panel__header button {
  border: 0;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
}

.prd-panel__body {
  max-height: calc(min(680px, calc(100vh - 120px)) - 54px);
  overflow: auto;
  padding: 16px;
  color: #1f2937;
}

.prd-panel__body h3 {
  margin: 14px 0 6px;
  font-size: 14px;
}

.prd-panel__body p,
.prd-panel__body li {
  font-size: 13px;
  line-height: 1.6;
}
```

## 最小 JavaScript

```html
<script>
  function togglePrdPanel() {
    const panel = document.getElementById('prdPanel');
    const isOpen = panel.classList.toggle('is-open');
    panel.setAttribute('aria-hidden', String(!isOpen));
  }
</script>
```

## 写作规则

- PRD 内容使用业务方日常语言。
- 每个页面浮标只聚焦该页面；跨页面材料放到 `prd.html`。
- 每条业务规则都要关联到可见 UI 行为或验收标准。
- 开放问题必须明确标注，不要猜测后写成事实。
