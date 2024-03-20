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

ol {
    text-align: left;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 14px;
    margin-left: 0;
    padding-left: 1em;
    color: #3f3f3f;
}

ul {
    text-align: left;
    line-height: 1.75;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 14px;
    margin-left: 0;
    padding-left: 1em;
    list-style: circle;
    color: #3f3f3f;
}

li {
    text-align: left;
    line-height: 1.75;
    text-indent: -1em;
    display: block;
    margin: 0.2em 8px;
    color: #3f3f3f;
}

pre {
    text-align: left;
    line-height: 1.5;
    font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;
    font-size: 14px;
    overflow-x: auto;
    border-radius: 8px;
    margin: 10px 8px;
    margin-top: 0;
}

code {
    text-align: left;
    line-height: 1.75;
    font-size: 90%;
    color: #d14;
    background: rgba(27,31,35,.05);
    padding: 3px 5px;
    border-radius: 4px;
    word-break: break-all;
}

pre::before {
    position: initial;
    padding: initial;
    content: '';
    display: block;
    height: 25px;
    background-color: #fdf6e3;
    background-image: url("https://doocs.oss-cn-shenzhen.aliyuncs.com/img/123.svg");
    background-position: 14px 10px;
    background-repeat: no-repeat;
    background-size: 40px;
}

/*!
  Theme: Solarized Light
  Author: Ethan Schoonover (modified by aramisgithub)
  License: ~ MIT (or more permissive) [via base16-schemes-source]
  Maintainer: @highlightjs/core-team
  Version: 2021.09.0
*/pre code.hljs {
  display:block;
  overflow-x:auto;
  padding:1em
}
code.hljs {
  padding:3px 5px
}
.hljs {
  color:#586e75;
  background:#fdf6e3
}
.hljs ::selection,
.hljs::selection {
  background-color:#93a1a1;
  color:#586e75
}
.hljs-comment {
  color:#839496
}
.hljs-tag {
  color:#657b83
}
.hljs-operator,
.hljs-punctuation,
.hljs-subst {
  color:#586e75
}
.hljs-operator {
  opacity:.7
}
.hljs-bullet,
.hljs-deletion,
.hljs-name,
.hljs-selector-tag,
.hljs-template-variable,
.hljs-variable {
  color:#dc322f
}
.hljs-attr,
.hljs-link,
.hljs-literal,
.hljs-number,
.hljs-symbol,
.hljs-variable.constant_ {
  color:#cb4b16
}
.hljs-class .hljs-title,
.hljs-title,
.hljs-title.class_ {
  color:#b58900
}
.hljs-strong {
  font-weight:700;
  color:#b58900
}
.hljs-addition,
.hljs-code,
.hljs-string,
.hljs-title.class_.inherited__ {
  color:#859900
}
.hljs-built_in,
.hljs-doctag,
.hljs-keyword.hljs-atrule,
.hljs-quote,
.hljs-regexp {
  color:#2aa198
}
.hljs-attribute,
.hljs-function .hljs-title,
.hljs-section,
.hljs-title.function_,
.ruby .hljs-property {
  color:#268bd2
}
.diff .hljs-meta,
.hljs-keyword,
.hljs-template-tag,
.hljs-type {
  color:#6c71c4
}
.hljs-emphasis {
  color:#6c71c4;
  font-style:italic
}
.hljs-meta,
.hljs-meta .hljs-keyword,
.hljs-meta .hljs-string {
  color:#d33682
}
.hljs-meta .hljs-keyword,
.hljs-meta-keyword {
  font-weight:700
}
`;
