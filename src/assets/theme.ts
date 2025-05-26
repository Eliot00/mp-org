export const defaultTheme = `
:root {
    --org-brand-color: rgba(15, 76, 129, 1);
}
h1 {
    display: table;
    padding: 0 1em;
    border-bottom: 2px solid var(--org-brand-color);
    margin: 2em auto 1em;
    color: hsl(var(--foreground));
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    padding: 0 1em;
}

h2 {
    display: table;
    padding: 0 0.2em;
    margin: 4em auto 2em;
    color: #fff;
    background: var(--org-brand-color);
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
}

h3 {
    padding-left: 8px;
    border-left: 3px solid var(--org-brand-color);
    margin: 2em 8px 0.75em 0;
    color: hsl(var(--foreground));
    font-size: 1.1em;
    font-weight: bold;
    line-height: 1.2;
}

h4 {
    margin: 2em 8px 0.5em;
    color: var(--org-brand-color);
    font-size: 1em;
    font-weight: bold;
}

h5 {
  margin: 1.5em 8px 0.5em;
  color: var(--org-brand-color);
  font-size: 1em;
  font-weight: bold;
}

h6 {
  margin: 1.5em 8px 0.5em;
  font-size: 1em;
  color: var(--org-brand-color);
}

img {
    text-align: left;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 14px;
    border-radius: 4px;
    display: block;
    margin: 0.1em auto 0.5em;
    width: 100% !important;
}

blockquote {
    font-style: normal;
    padding: 1em;
    border-left: 4px solid var(--org-brand-color);
    border-radius: 6px;
    color: rgba(0,0,0,0.5);
    background: #f7f7f7;
    margin-bottom: 1em;
}

blockquote > p {
    display: block;
    font-size: 1em;
    letter-spacing: 0.1em;
    color: hsl(var(--foreground));
}

p {
    margin: 1.5em 8px;
    letter-spacing: 0.1em;
    color: hsl(var(--foreground));
}

hr {
  border-style: solid;
  border-width: 2px 0 0;
  border-color: rgba(0,0,0,0.1);
  --webkit-transform-origin: 0 0;
  --webkit-transform: scale(1, 0.5);
  transform-origin: 0 0;
  transform: scale(1, 0.5);
  height: 0.4em;
  margin: 1.5em 0;
}

strong {
    color: var(--org-brand-color);
    font-weight: bold;
    font-size: inherit;
}

/* 样式化有序列表 <ol> */
ol {
    list-style-type: decimal; /* 使用数字作为列表项标记 */
    margin: 20px 0;           /* 上下间距 */
    padding-left: 40px;       /* 左边距 */
    font-family: Arial, sans-serif; /* 字体 */
    font-size: 16px;          /* 字体大小 */
    color: #333;              /* 文字颜色 */
}

ol li {
    margin: 8px 0;           /* 列表项的上下间距 */
}

/* 样式化无序列表 <ul> */
ul {
    list-style-type: disc;    /* 使用实心圆作为列表项标记 */
    margin: 20px 0;           /* 上下间距 */
    padding-left: 40px;       /* 左边距 */
    font-family: Arial, sans-serif; /* 字体 */
    font-size: 16px;          /* 字体大小 */
    color: #333;              /* 文字颜色 */
}

ul li {
    margin: 8px 0;           /* 列表项的上下间距 */
}

pre {
    margin: 1.5rem 8px;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow: auto;
}

code:not(pre code) {
  background-color: rgba(255, 235, 235, 0.6);
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  color: #E05252;
}

[aria-hidden="true"] {
  display: none;
}
`;
