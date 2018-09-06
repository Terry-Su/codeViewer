const FETCH_SCRIPT_URL = "https://terry-su.github.io/CDN/utils/fetch.js"
const CODE_VIEWER_IFRAME_URL = "/index.html"


const HTML_URL = "./template.html"
const CSS_URL = "./index.css"
const JAVASCRIPT_URL = "./index.js"


const STYLE_TEXT = `html,body,iframe{ width:100%;height:100%;margin:0;padding:0; overflow: hidden; } iframe{width:100%;height:100%;border:none;}`

let tsHtml, tsCss, tsJavascript

applyStyle( STYLE_TEXT )
loadScript( FETCH_SCRIPT_URL, main )

function main() {
  iframe = addIframe()
}

function addIframe() {
  const iframe = document.createElement( "iframe" )
  iframe.src = CODE_VIEWER_IFRAME_URL
  iframe.setAttribute( "frameBorder", 0 )
  iframe.onload = onIframeLoad
  document.body.appendChild( iframe )

  function onIframeLoad() {
    fetchHtml()
      .then( fetchCss )
      .catch( fetchCss )
      .then( fetchJavascript )
      .catch( fetchJavascript )
      .then( postMessage )

    function fetchHtml() {
      return fetchText( HTML_URL ).then( function( html ) {
        tsHtml = html
        return
      } )
    }
    function fetchCss() {
      return fetchText( CSS_URL ).then( function( css ) {
        tsCss = css
        return
      } )
    }
    function fetchJavascript() {
      return fetchText( JAVASCRIPT_URL ).then( function( javascript ) {
        tsJavascript = javascript
        return
      } )
    }
    function postMessage() {
      const data = {
        tsHtml,
        tsCss,
        tsJavascript
      }
      iframe.contentWindow.postMessage( data, "*" )
    }
  }
}

function fetchText( url ) {
  return fetch( url ).then( function( response ) {
    try {
      return response.text()
    } catch ( e ) {
      return null
    }
  } )
}

function loadScript( src, callback ) {
  const script = document.createElement( "script" )
  script.src = src
  script.onload = callback || function() {}
  document.head.appendChild( script )
}

function applyStyle( styleText ) {
  const style = document.createElement( "style" )
  style.type = "text/css"
  style.appendChild( document.createTextNode( styleText ) )
  document.head.appendChild( style )
}
