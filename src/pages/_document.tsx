import { Html, Head, Main, NextScript } from 'next/document'



export default function Document() {
  const variableGA =`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GA_KEY}');`
  
  return (
    <Html lang="en">
      <Head />

<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_KEY}`}></script>
<script>
{variableGA}
</script>
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>

  )
}
