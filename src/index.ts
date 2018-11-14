const fontFaceTmpl = ({ name, prefix, url, files, buildHash }: IconFont) => {
  const hash = buildHash ? `?h=${buildHash}` : ''

  let result = `@font-face {
  font-family: '${name}';
`

  if (files.eot) {
    result += `  src: url('${url}/${files.eot}${hash}');`
  }

  const urlList = []
  if (files.eot) {
    urlList.push(
      `url('${url}/${files.eot}??#iefix${
        buildHash ? '&h=' + buildHash : ''
      }') format('embedded-opentype')`,
    )
  }
  if (files.woff2) {
    urlList.push(`url('${url}/${files.woff2}${hash}') format('woff2')`)
  }
  if (files.woff) {
    urlList.push(`url('${url}/${files.woff}${hash}') format('woff')`)
  }
  if (files.ttf) {
    urlList.push(`url('${url}/${files.ttf}${hash}') format('ttf')`)
  }
  if (files.svg) {
    urlList.push(`url('${url}/${files.svg}${hash}#${name}') format('svg')`)
  }

  result += `  src: ${urlList.join(', ')};
`
  result += `  font-weight: normal;
  font-style: normal;
}
`
  result += `
[class^="${prefix}-"], [class*=" ${prefix}-"] {
  font-family: '${name}' !important;
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
`
  return result
}

export interface IconFontFiles {
  eot?: string
  woff2?: string
  woff?: string
  ttf?: string
  svg?: string
}

export interface IconFontOptions {
  name: string
  prefix: string
  url: string
  files: IconFontFiles
  icons: { [iconName: string]: string }
  buildHash?: string
  addonStyle?: string
  styleEl?: HTMLStyleElement
}

class IconFont {
  public name: string
  public prefix: string
  public url: string
  public files: IconFontFiles
  public icons: { [iconName: string]: string }
  public buildHash?: string
  public addonStyle?: string
  public styleEl?: HTMLStyleElement

  constructor(data: IconFontOptions) {
    this.name = data.name
    this.prefix = data.prefix
    this.url = data.url
    this.files = data.files
    this.icons = data.icons
    this.buildHash = data.buildHash
    this.addonStyle = data.addonStyle
    this.styleEl = data.styleEl || null
  }
  public generateCSS({ attach = false }: { attach?: boolean } = {}) {
    let style = ''

    // 生成字体 fontFace
    style += fontFaceTmpl(this)

    // 生成每个图标的 class
    const prefix = this.prefix
    for (const iconName in this.icons) {
      if (this.icons.hasOwnProperty(iconName)) {
        const iconChar = this.icons[iconName]
        style += `.${prefix}-${iconName}:before { content: "\\${iconChar}" }\n`
      }
    }

    // 自定义 css 文本
    style += this.addonStyle || ''

    // 向页面注入 CSS
    if (attach && window.document) {
      if (!this.styleEl) {
        this.styleEl = document.createElement('style')
        // this.styleEl.type = 'text/css'
        // document.getElementsByTagName('head')[0].appendChild(this.styleEl)
      }
      // this.styleEl.innerHTML = style
    }
    return style
  }
}

export default IconFont
