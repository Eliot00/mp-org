// Ported from doocs/md's default (经典) theme.
// WeChat drops custom properties, `rem` and `color-mix()`, so the theme's
// variables are resolved to their defaults:
//   --md-primary-color -> rgba(15, 76, 129, 1)
//   --foreground       -> #0a0a0a
//   --md-link-color    -> #576b95
//   --blockquote-background -> #f7f7f7
export const defaultTheme = `
h1 {
    display: table;
    padding: 0 1em;
    border-bottom: 2px solid rgba(15, 76, 129, 1);
    margin: 2em auto 1em;
    color: #0a0a0a;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
}

h2 {
    display: table;
    padding: 0 0.2em;
    margin: 4em auto 2em;
    color: #fff;
    background: rgba(15, 76, 129, 1);
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
}

h3 {
    padding-left: 8px;
    border-left: 3px solid rgba(15, 76, 129, 1);
    margin: 2em 8px 0.75em 0;
    color: #0a0a0a;
    font-size: 1.1em;
    font-weight: bold;
    line-height: 1.2;
}

h4 {
    margin: 2em 8px 0.5em;
    color: rgba(15, 76, 129, 1);
    font-size: 1em;
    font-weight: bold;
}

h5 {
    margin: 1.5em 8px 0.5em;
    color: rgba(15, 76, 129, 1);
    font-size: 1em;
    font-weight: bold;
}

h6 {
    margin: 1.5em 8px 0.5em;
    font-size: 1em;
    color: rgba(15, 76, 129, 1);
}

p {
    margin: 1.5em 8px;
    letter-spacing: 0.1em;
    color: #0a0a0a;
}

blockquote {
    margin: 0 0 1em;
    padding: 1em;
    border-left: 4px solid rgba(15, 76, 129, 1);
    border-radius: 6px;
    color: #0a0a0a;
    background: #f7f7f7;
    font-style: normal;
}

blockquote > p {
    display: block;
    margin: 0;
    font-size: 1em;
    letter-spacing: 0.1em;
    color: #0a0a0a;
}

strong {
    color: rgba(15, 76, 129, 1);
    font-weight: bold;
    font-size: inherit;
}

em {
    font-style: italic;
    font-size: inherit;
}

a {
    color: #576b95;
    text-decoration: none;
}

del {
    color: rgba(10, 10, 10, 0.55);
    text-decoration: line-through;
}

img {
    display: block;
    max-width: 100%;
    margin: 0.1em auto 0.5em;
    border-radius: 4px;
}

hr {
    border-style: solid;
    border-width: 2px 0 0;
    border-color: rgba(0,0,0,0.1);
    transform-origin: 0 0;
    transform: scale(1, 0.5);
    height: 0.4em;
    margin: 1.5em 0;
}

ol {
    margin-left: 0;
    padding-left: 1em;
    color: #0a0a0a;
}

ul {
    list-style: circle;
    margin-left: 0;
    padding-left: 1em;
    color: #0a0a0a;
}

li {
    display: block;
    margin: 0.2em 8px;
    color: #0a0a0a;
}

table {
    border-collapse: collapse;
    min-width: 100%;
    color: #0a0a0a;
}

thead {
    font-weight: bold;
    color: #0a0a0a;
}

th {
    border: 1px solid rgba(10, 10, 10, 0.15);
    padding: 0.25em 0.5em;
    color: #0a0a0a;
    word-break: keep-all;
    background: rgba(10, 10, 10, 0.05);
}

td {
    border: 1px solid rgba(10, 10, 10, 0.15);
    padding: 0.25em 0.5em;
    color: #0a0a0a;
    word-break: keep-all;
}

/* The card box is moved onto the wrapper section for WeChat, see utils/code-block. */
pre {
    margin: 24px 8px;
    padding: 16px;
    border-radius: 8px;
    overflow: auto;
}

code:not(pre code) {
    padding: 3px 5px;
    border: 1px solid rgba(15, 76, 129, 0.2);
    border-radius: 4px;
    color: rgba(15, 76, 129, 1);
    background: rgba(15, 76, 129, 0.08);
    font-size: 90%;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
}

[aria-hidden="true"] {
    display: none;
}
`;
