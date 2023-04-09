import React from 'react';
import axios from "axios";
import {StatusContext} from "@/pages/StatusProvider/StatusProvider";
import {IngredientsContext} from "@/pages/IngredientsProvider/IngredientsProvider";
import useValidation from "@/hooks/useValidation";
import {set} from "immutable";

interface APIProviderProps {
    ip: string;
    children: React.ReactNode;


}

interface APIContextInterface {
    handleTextAPI: Function;
    textApiAnswer: Array<string>;
    imageApiAnswer: Array<string>;

}

export const APIContext = React.createContext({} as APIContextInterface);

const TEXTENDPOINT = 'https://api.openai.com/v1/chat/completions';
const IMAGEENDPOINT = 'https://api.openai.com/v1/images/edits';

function APIProvider({ip, children}: APIProviderProps) {
    const {isValid, incrementTries} = useValidation(ip)
    const {status, setStatus} = React.useContext(StatusContext)
    const {plainIngredients} = React.useContext(IngredientsContext)

    const [textApiAnswer, setTextApiAnswer] = React.useState<string[]>([])
    const [imageApiAnswer, setImageApiAnswer] = React.useState<string[]>([])
    let testJson;

    function checkTries() {
        if (!isValid()) {
            setStatus('consumed')
            return false
        }
        incrementTries()
        return true

    }


    async function handleImageAPI(dish: string) {

        const formData = new FormData();
        formData.append('image', await fetch('PLATOCONCOMIDA.png').then((response) => response.blob()), 'image.png');
        formData.append('mask', await fetch('PLATOSINCOMIDA.png').then((response) => response.blob()), 'mask.png');
        formData.append('prompt', `${process.env.NEXT_PUBLIC_IMAGEPROMPT} ${dish}`);
        formData.append('n', '1');
        formData.append('size', '256x256');
        let url: string = '';
        const response = await axios.post(IMAGEENDPOINT, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`
                }
            });
        if (response.data.data[0].url || response.data.data[0].url !== '') {
            url = response.data.data[0].url

        } else {
            console.error(response.status); //401
            console.error('HA OCURRIDO UN ERROR');
        }
        return url
    }


    async function handleTextAPI() {
        if (!checkTries()) {
            return;
        }




        setStatus('loading');


        const response = await fetch(TEXTENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                    "role": "user",
                    "content": `${process.env.NEXT_PUBLIC_TEXTPROMPT} ${plainIngredients()} `
                }]
            }),
        });
        testJson = await response.json();
        let arrayJson;
        if (testJson.choices[0].message.content || testJson.choices[0].message.content !== '') {
            if (testJson.choices[0].message.content.includes('\n\n')) {
                arrayJson = testJson.choices[0].message.content.split(/\n\n/)
                setTextApiAnswer(arrayJson)
            } else if (testJson.choices[0].message.content.includes('\n')) {
                arrayJson = testJson.choices[0].message.content.split(/\n/)
                setTextApiAnswer(arrayJson)
            }


            if (arrayJson.length === 3) {
                const promesas = await Promise.all([
                    handleImageAPI(arrayJson[0].substring(arrayJson[0].indexOf(' ') + 1, arrayJson[0].indexOf(':'))),
                    handleImageAPI(arrayJson[1].substring(arrayJson[1].indexOf(' ') + 1, arrayJson[1].indexOf(':'))),
                    handleImageAPI(arrayJson[2].substring(arrayJson[2].indexOf(' ') + 1, arrayJson[2].indexOf(':'))),
                ])

                setImageApiAnswer(promesas)
                setStatus('success');
            } else {
                window.alert("Chat gpt tuvo problemas al proporcionar los platillos (mando un array de mas de 3 elementos)")
            }
        } else {
            setStatus('error');
        }

    }

    return (
        <APIContext.Provider value={{handleTextAPI, textApiAnswer, imageApiAnswer}}>
            {children}
        </APIContext.Provider>
    )
}

export default APIProvider