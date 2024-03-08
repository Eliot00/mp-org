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

image {
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
    padding: 1em;
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

/*!
  Theme: Default
  Description: Original highlight.js style
  Author: (c) Ivan Sagalaev <maniac@softwaremaniacs.org>
  Maintainer: @highlightjs/core-team
  Website: https://highlightjs.org/
  License: see project LICENSE
  Touched: 2021
*/pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#f3f3f3;color:#444}.hljs-comment{color:#697070}.hljs-punctuation,.hljs-tag{color:#444a}.hljs-tag .hljs-attr,.hljs-tag .hljs-name{color:#444}.hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-name,.hljs-selector-tag{font-weight:700}.hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{color:#800}.hljs-section,.hljs-title{color:#800;font-weight:700}.hljs-link,.hljs-operator,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{color:#ab5656}.hljs-literal{color:#695}.hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{color:#397300}.hljs-meta{color:#1f7199}.hljs-meta .hljs-string{color:#38a}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}
`;
