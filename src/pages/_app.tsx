import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {NextPageContext} from "next";



export default function App({Component, pageProps}: AppProps) { //,actualIp


    return <Component {...pageProps} />
}

// App.getInitialProps = async({ctx})=>{
//     return {actualIp:ctx.req.connection.remoteAddress}
// }

