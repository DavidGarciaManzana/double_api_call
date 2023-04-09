import React from "react";
import IngredientsProvider from "@/pages/IngredientsProvider/IngredientsProvider";
import APIProvider from "@/pages/APIProvider/APIProvider";
import StatusProvider from "@/pages/StatusProvider/StatusProvider";
import App from "@/pages/App/App"
import {GetServerSideProps} from "next";

interface HomeProps {
    ip:string
}

export default function Home({ip}:HomeProps) {
    return (
        <StatusProvider>
            <IngredientsProvider>
                <APIProvider ip={ip}>
                    <App ip={ip}/>
                </APIProvider>
            </IngredientsProvider>
        </StatusProvider>
    )
}

export const  getServerSideProps: GetServerSideProps<Object>= async (context) => {
    let ip;

    const { req } = context;

    if (req.headers['x-forwarded-for']) {
        // @ts-ignore
        ip = req.headers['x-forwarded-for'].split(',')[0];
    } else if (req.headers['x-real-ip']) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.connection.remoteAddress;
    }

    return {
        props: {
            ip,
        },
    };
}
