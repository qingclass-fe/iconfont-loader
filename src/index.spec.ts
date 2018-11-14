// tslint:disable:no-expression-statement
import test from 'ava'
import IconFont from './index'

const src = `{
  "name": "font-awesome",
  "prefix": "fa-icon",
  "url": "https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts",
  "buildHash": "2d3f348a",
  "files": {
    "eot": "fontawesome-webfont.eot",
    "woff2": "fontawesome-webfont.woff2",
    "woff": "fontawesome-webfont.woff",
    "ttf": "fontawesome-webfont.ttf",
    "svg": "fontawesome-webfont.svg"
  },
  "icons": {
    "address-book": "f2b9",
    "address-book-o": "f2ba"
  }
}`

const expectResult = `@font-face {
  font-family: 'font-awesome';
  src: url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.eot?h=2d3f348a');  src: url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.eot??#iefix&h=2d3f348a') format('embedded-opentype'), url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.woff2?h=2d3f348a') format('woff2'), url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.woff?h=2d3f348a') format('woff'), url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.ttf?h=2d3f348a') format('ttf'), url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.svg?h=2d3f348a#font-awesome') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="fa-icon-"], [class*=" fa-icon-"] {
  font-family: 'font-awesome' !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fa-icon-address-book:before { content: "\\f2b9" }
.fa-icon-address-book-o:before { content: "\\f2ba" }
`

test('build hash', t => {
  t.is(new IconFont(JSON.parse(src)).generateCSS(), expectResult)
})
