import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from "@/pages/Button/Button";
import AddIngredientButton from "@/pages/AddIngredientButton/AddIngredientButton";
import CallAPIButton from "@/pages/CallAPIButton/CallAPIButton";
import ResetButton from "@/pages/ResetButton/ResetButton";
import Input from "@/pages/Input/Input";
import {
    X
} from "react-feather";
import {string} from "prop-types";
// import buttonstyles from '@/pages/Button/Button.module.css';
// const axios = require('axios').default;
import axios from 'axios';

import plateWithFood from '../../public/PLATOCONCOMIDA.png'
import plateWithoutFood from '../../public/PLATOSINCOMIDA.png'
import {Console} from "inspector";


const TEXTENDPOINT =
    'https://api.openai.com/v1/chat/completions';
const IMAGEENDPOINT = 'https://api.openai.com/v1/images/edits';
const inter = Inter({subsets: ['latin']})

export interface MyObject {
    id: string;
    text: string;
    quantity?: string;

}

export default function Home() {
    type StatusType = 'idle' | 'loading' | 'success' | 'error'
    const [ingredient, setIngredient] = React.useState<string>('')
    const [foodIngredients, setFoodIngredients] = React.useState<MyObject[]>([])
    const [ingredientButton, setIngredientButton] = React.useState('Añadir ingrediente')
    const [incompleteIngredient, setIncompleteIngredient] = React.useState({})
    const [status, setStatus] = React.useState<StatusType>('idle');
    const [textApiAnswer, setTextApiAnswer] = React.useState<string[]>([])
    const [imageApiAnswer, setImageApiAnswer] = React.useState<string[]>([])

    // const [titlesArray, setTitlesArray] = React.useState<string[]>([])
    let nextIngredient: MyObject;
    let nextCompleteIngredient: MyObject;
    let testJson;

    function plainIngredients() {
        let ingredientsList: string = '';
        foodIngredients.map((item: MyObject) => {
            ingredientsList += `${item.quantity} ${item.text}, `
        })
        return ingredientsList;
    }

    function hardReset() {
        setStatus('idle')
        setFoodIngredients([])
    }

    function removeItem(id: string) {
        const nextFoodIngredients = foodIngredients.filter(item => {
            return item.id !== id
        })
        setFoodIngredients(nextFoodIngredients)
    }

// -----
    async function handleImageAPI(dish: string, status: StatusType = 'loading') {

        const formData = new FormData();
        formData.append('image', await fetch('PLATOCONCOMIDA.png').then((response) => response.blob()), 'image.png');
        formData.append('mask', await fetch('PLATOSINCOMIDA.png').then((response) => response.blob()), 'mask.png');
        formData.append('prompt', `Un plato de comida recién cocinada, apetitoso y sabroso, que contiene: ${dish}`);
        formData.append('n', '1');
        formData.append('size', '256x256');
        console.log(formData)

        axios.post(IMAGEENDPOINT, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer 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'
                }
            })
            .then(function (response: any) {
                let url = response.data.data[0].url
                console.log(response);

                setImageApiAnswer([...imageApiAnswer, url])
                console.log('aqui abajo esta la url')
                console.log(url);
                console.log('aqui abajo esta [...imageApiAnswer, url]')
                console.log([...imageApiAnswer, url]);
                console.log('aqui abajo esta el imageApiAnswer')
                console.log(imageApiAnswer);
                console.log('Aqui el status que mandaron');
                console.log(status);
                setStatus(status);

            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

//     ------

    async function handleTextAPI() {
        setStatus('loading');


        const response = await fetch(TEXTENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                    "role": "user",
                    "content": `No escribas nada mas que la respuesta, te voy a proporcionar una serie de ingredientes y quiero que me retornes 3 opciones de platillos que se puedan preparar con dichos ingredientes, bajo el siguiente formato "1.Nombre : Amplia descripcion del sabor ,2.Nombre : Amplia descripcion del sabor,3.Nombre : Amplia descripcionn del sabor", puedes añadir aceite y sal,aqui estan los ingredientes: ${plainIngredients()} `
                }]
            }),
        });
        testJson = await response.json();
        console.log(testJson)
        // 1.- Ensalada de aguacate, jitomate y cebolla: Mezcla los ingredientes con un poco de aceite de oliva y sal al gusto - Instrucciones.
        // 2.- Spaghetti con salsa de jitomate y queso: Cocina el spaghetti y mezcla con una salsa de jitomate hecha con los ingredientes proporcionados y queso rallado.
        // 3.- Tortitas de plátano y huevo con salsa picante: Mezcla los plátanos con huevo y fríe en aceite caliente, sirve con salsa picante al gusto.
        let arrayJson;
        let arrayJson1;
        let arrayJson2;
        if (testJson.choices[0].message.content || testJson.choices[0].message.content !== '') {
            if (testJson.choices[0].message.content.includes('\n\n')) {
                arrayJson = testJson.choices[0].message.content.split(/\n\n/)
                console.log('AQUI LOS TEXTOS DE LA IA \n\n')
                console.log(arrayJson)
                setTextApiAnswer(arrayJson)
            }
            else if (testJson.choices[0].message.content.includes('\n')) {
                arrayJson = testJson.choices[0].message.content.split(/\n/)
                console.log('AQUI LOS TEXTOS DE LA IA \n')
                console.log(arrayJson)
                setTextApiAnswer(arrayJson)
            }
            // else if (testJson.choices[0].message.content.includes('\n2')) {
            //     arrayJson = testJson.choices[0].message.content.split(/\n/)
            //     arrayJson1 = arrayJson[1].split(/\n2/)
            //     arrayJson2 = testJson.choices[0].message.content.substring(testJson.choices[0].message.content.indexOf('\n3') + 1)
            //     console.log('AQUI ESTA EL ARRAY: ')
            //     console.log([arrayJson[0], arrayJson1[0], arrayJson2])
            //     setApiAnswer([arrayJson[0], arrayJson1[0], arrayJson2])
            // }

            if(arrayJson.length === 3){
                handleImageAPI(arrayJson[0].substring(arrayJson[0].indexOf(' ') + 1, arrayJson[0].indexOf(':')))
                handleImageAPI(arrayJson[1].substring(arrayJson[1].indexOf(' ') + 1, arrayJson[1].indexOf(':')))
                handleImageAPI(arrayJson[2].substring(arrayJson[2].indexOf(' ') + 1, arrayJson[2].indexOf(':')), 'success')
            } else {
                window.alert("Chat gpt tuvo problemas al proporcionar los platillos (mando un array de mas de 3 elementos)")
            }


            // await handleImageAPI()

        } else {
            setStatus('error');
        }

        console.log('status' + status)
    }


    return (
        <div className={styles.parent}>
            {foodIngredients.length > 2 && status === 'idle' &&
                <CallAPIButton onClick={handleTextAPI}>Enviar</CallAPIButton>}


            <form action="" className={styles.container} onSubmit={(event) => {
                event.preventDefault()
                if (ingredient === '') {
                    return;
                }
                if (ingredientButton === 'Añadir ingrediente') {
                    nextIngredient = {id: crypto.randomUUID(), text: ingredient}
                    setIncompleteIngredient(nextIngredient)
                    setIngredientButton('Añadir cantidad')
                } else {
                    nextCompleteIngredient = {...incompleteIngredient, quantity: ingredient}
                    setFoodIngredients([...foodIngredients, nextCompleteIngredient])
                    setIngredientButton('Añadir ingrediente')
                    // console.log(plainIngredients())
                }
                setIngredient('')


            }
            }>

                {status === 'idle' &&
                    <Input ingredient={ingredient} setIngredient={setIngredient} maxLength={20}></Input>}
                {status === 'idle' && <AddIngredientButton type={"submit"}>{ingredientButton}</AddIngredientButton>}
                {status === 'success' && <ResetButton onClick={hardReset}>Reiniciar</ResetButton>}
                {status === 'success' && <AddIngredientButton onClick={() => {
                    setStatus('idle')
                }}>Añadir ingredientes</AddIngredientButton>}
                <div className={styles.listContainer}>
                    <ul className={styles.list}>
                        {foodIngredients.map((ingr: MyObject) => (
                            <li className={styles.listItem} key={ingr.id}>{ingr.quantity} {ingr.text} <X
                                className={styles.closeButton} onClick={() => {
                                removeItem(ingr.id)
                                setStatus('success');
                            }}/></li>
                        ))}
                    </ul>
                </div>

                {status === 'success' && <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            <article className={styles.card}>
                                <img className={styles.card__image} src={imageApiAnswer[0]}/>
                                <div className={styles.card__data}>
                                    <div className={styles.card__info}>
                                        {/*<h2>{textApiAnswer[0].split(':', 1)}</h2>*/}
                                        <h2>{textApiAnswer[0].substring(textApiAnswer[0].indexOf(' ') + 1, textApiAnswer[0].indexOf(':'))}</h2>
                                        <p>{textApiAnswer[0].substring(textApiAnswer[0].indexOf(':') + 1)}</p>
                                    </div>
                                    {/*<h3 className={styles.card__price}>$7.50</h3>*/}
                                    {/*<button className={styles.card__add}>+</button>*/}
                                </div>
                            </article>
                            <article className={styles.card}>
                                <img className={styles.card__image} src={imageApiAnswer[1]}/>
                                <div className={styles.card__data}>
                                    <div className={styles.card__info}>
                                        <h2>{textApiAnswer[1].substring(textApiAnswer[1].indexOf(' ') + 1, textApiAnswer[1].indexOf(':'))}</h2>
                                        <p>{textApiAnswer[1].substring(textApiAnswer[1].indexOf(':') + 1)}</p>
                                    </div>
                                </div>
                            </article>
                            <article className={styles.card}>
                                <img className={styles.card__image} src={imageApiAnswer[2]}/>
                                <div className={styles.card__data}>
                                    <div className={styles.card__info}>
                                        <h2>{textApiAnswer[2].substring(textApiAnswer[2].indexOf(' ') + 1, textApiAnswer[2].indexOf(':'))}</h2>
                                        <p>{textApiAnswer[2].substring(textApiAnswer[2].indexOf(':') + 1)}</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>}


            </form>
        </div>
    )
}
