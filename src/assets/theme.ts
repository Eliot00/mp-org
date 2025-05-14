export const defaultTheme = `
h1 {
    text-align: center;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 1.2em;
    font-weight: bold;
    display: table;
    margin: 2em auto 1em;
    margin-top: 2em;
    padding: 0 1em;
    border-bottom: 2px solid rgba(15, 76, 129, 1);
    color: #3f3f3f;
    margin-top: 0;
}

h2 {
    text-align: center;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 1.2em;
    font-weight: bold;
    display: table;
    margin: 4em auto 2em;
    padding: 0 0.2em;
    background: rgba(15, 76, 129, 1);
    color: #fff;
}

h3 {
    text-align: left;
    line-height: 1.2;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 1.1em;
    font-weight: bold;
    margin: 2em 8px 0.75em 0;
    padding-left: 8px;
    border-left: 3px solid rgba(15, 76, 129, 1);
    color: #3f3f3f;
}

h4 {
    text-align: left;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 1em;
    font-weight: bold;
    margin: 2em 8px 0.5em;
    color: rgba(15, 76, 129, 1);
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
    text-align: left;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 14px;
    font-style: normal;
    border-left: none;
    padding: 1em;
    border-radius: 8px;
    color: rgba(0,0,0,0.5);
    background: #f7f7f7;
    margin: 2em 8px;
}

blockquote > p {
    text-align: left;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 1em;
    letter-spacing: 0.1em;
    color: rgb(80, 80, 80);
    display: block;
}

p {
    text-align: left;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 14px;
    margin: 1.5em 8px;
    letter-spacing: 0.1em;
    color: #3f3f3f;
}

hr {
    text-align: left;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 14px;
    border-style: solid;
    border-width: 1px 0 0;
    border-color: rgba(0,0,0,0.1);
    -webkit-transform-origin: 0 0;
    -webkit-transform: scale(1, 0.5);
    transform-origin: 0 0;
    transform: scale(1, 0.5);
}

strong {
    text-align: left;
    line-height: 1.75;
    color: rgba(15, 76, 129, 1);
    font-weight: bold;
}

a {
    text-align: left;
    line-height: 1.75;
    color: #576b95;
    text-decoration: none;
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
    padding: 1rem;
    border-radius: 0.5rem;
    overflow: auto;
}

[aria-hidden="true"] {
  display: none;
}
`;
