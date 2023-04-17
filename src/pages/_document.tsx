import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';



export default function Document() {
  
  return (
  
    <Html lang="en">
      <Head />


      <Script id={'GA1'} strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_KEY}`} />

      <Script id={'GA2'} strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_KEY}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>

  )
}
