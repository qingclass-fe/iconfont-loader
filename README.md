# IconFont Loader

## Install

`yarn add @qingclass/iconfont-loader`

## Usage

```javascript
import IconFont from '@qingclass/iconfont-loader'
import fontAwesomeData from '@qingclass/iconfont-loader/iconfonts/font-awesome.json'
import customFontData from 'somewhere/costom-font.json'

const fontAwesome = new IconFont(fontAwesomeData)
const customFont = new IconFont(customFontData)

fontAwesome.generateCSS({ attach: true })
customFont.generateCSS({ attach: true })
```

## Data JSON format

```json
{
  "name": "font-name",
  "prefix": "font-prefix",
  "url": "font-url",
  "buildHash": "build-hash",
  "files": {
    "eot": "font-file-name.eot",
    "woff2": "font-file-name.woff2",
    "woff": "font-file-name.woff",
    "ttf": "font-file-name.ttf",
    "svg": "font-file-name.svg"
  },
  "icons": {
    "icon-name":"icon-unicode-index",
  }
}
```
