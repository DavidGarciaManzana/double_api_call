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


const ENDPOINT =
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
    const [apiAnswer, setApiAnswer] = React.useState<string[]>([])
    let nextIngredient: MyObject;
    let nextCompleteIngredient: MyObject;
    let json;

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
    async function handleImageAPI() {
        setStatus('loading');


        const response = await fetch(IMAGEENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                "image": "PLATOCONCOMIDA.png",
                "mask" : "PLATOSINCOMIDA.png",
                "prompt" : "A fresh plate of food containing Spaghetti Carbonara",
                "n":1,
                "size": "256x256"
            }),
        });
        json = await response.json();
        console.log(json)
        console.log(json.data.data[0].url)
        // 1.- Ensalada de aguacate, jitomate y cebolla: Mezcla los ingredientes con un poco de aceite de oliva y sal al gusto.
        // 2.- Spaghetti con salsa de jitomate y queso: Cocina el spaghetti y mezcla con una salsa de jitomate hecha con los ingredientes proporcionados y queso rallado.
        // 3.- Tortitas de plátano y huevo con salsa picante: Mezcla los plátanos con huevo y fríe en aceite caliente, sirve con salsa picante al gusto.

        // if (json.choices[0].message.content || json.choices[0].message.content !== '') {
        //     setApiAnswer(json.choices[0].message.content.split(/\r?\n|\r|\n/g))
        //     setStatus('success');
        // } else {
        //     setStatus('error');
        // }

        // console.log('status' + status)
    }
//     ------

    async function handleAPI() {
        setStatus('loading');


        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                    "role": "user",
                    "content": `No escribas nada mas que la respuesta, te voy a proporcionar una serie de ingredientes y quiero que me retornes 3 opciones de platillos que se puedan preparar con dichos ingredientes, bajo el siguiente formato "1.-Platillo 1 : Descripcion /n 2.- Platillo 2: Descripcion /n 3.- Platillo 3: Descripcion", puedes añadir aceite y sal,aqui estan los ingredientes: ${plainIngredients()} `
                }]
            }),
        });
        json = await response.json();
        console.log(json)
        // 1.- Ensalada de aguacate, jitomate y cebolla: Mezcla los ingredientes con un poco de aceite de oliva y sal al gusto.
        // 2.- Spaghetti con salsa de jitomate y queso: Cocina el spaghetti y mezcla con una salsa de jitomate hecha con los ingredientes proporcionados y queso rallado.
        // 3.- Tortitas de plátano y huevo con salsa picante: Mezcla los plátanos con huevo y fríe en aceite caliente, sirve con salsa picante al gusto.

        if (json.choices[0].message.content || json.choices[0].message.content !== '') {
            setApiAnswer(json.choices[0].message.content.split(/\r?\n|\r|\n/g))
            setStatus('success');
        } else {
            setStatus('error');
        }

        console.log('status' + status)
    }
    console.log('json fuera, listo para usarse: ')
console.log(apiAnswer)
    return (
        <div className={styles.parent}>
            {foodIngredients.length > 2 && status === 'idle' &&
                <CallAPIButton onClick={handleAPI}>Enviar</CallAPIButton>}


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
                            }}/></li>
                        ))}
                    </ul>
                </div>
                {status === 'success' && <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            <article className={styles.card}>
                                <img className={styles.card__image} src="public/food1.jpg"/>
                                <div className={styles.card__data}>
                                    <div className={styles.card__info}>
                                        <h2>{apiAnswer[0].split(':',1)}</h2>
                                        <p>{apiAnswer[0].substring(apiAnswer[0].indexOf(':')+1)}</p>
                                    </div>
                                    {/*<h3 className={styles.card__price}>$7.50</h3>*/}
                                    {/*<button className={styles.card__add}>+</button>*/}
                                </div>
                            </article>
                            <article className={styles.card}>
                                <img className={styles.card__image} src="https://i.ibb.co/RT0bjJq/food1.png"/>
                                <div className={styles.card__data}>
                                    <div className={styles.card__info}>
                                        <h2>{apiAnswer[1].split(':',1)}</h2>
                                        <p>{apiAnswer[1].substring(apiAnswer[1].indexOf(':')+1)}</p>
                                    </div>
                                </div>
                            </article>
                            <article className={styles.card}>
                                <img className={styles.card__image} src="https://i.ibb.co/RT0bjJq/food1.png"/>
                                <div className={styles.card__data}>
                                    <div className={styles.card__info}>
                                        <h2>{apiAnswer[2].split(':',1)}</h2>
                                        <p>{apiAnswer[2].substring(apiAnswer[2].indexOf(':')+1)}</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>}

                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            <article className={styles.card}>
                                <img className={styles.card__image} src="PLATOSINCOMIDA.png"/>
                                <div className={styles.card__data}>
                                    <div className={styles.card__info}>
                                        <h2>1.- Ensalada de aguacate, jitomate y cebolla</h2>
                                        <p>Mezcla los ingredientes con un poco de aceite de oliva y sal al gusto.</p>
                                    </div>
                                    {/*<h3 className={styles.card__price}>$7.50</h3>*/}
                                    {/*<button className={styles.card__add}>+</button>*/}
                                </div>
                            </article>
                            <article className={styles.card}>
                                <img className={styles.card__image} src="PLATOCONCOMIDA.png"/>
                                <div className={styles.card__data}>
                                    <div className={styles.card__info}>
                                        <h2>1.- Ensalada de aguacate, jitomate y cebolla</h2>
                                        <p>Mezcla los ingredientes con un poco de aceite de oliva y sal al gusto.</p>
                                    </div>
                                </div>
                            </article>

                        </div>
                    </div>
                </section>


            </form>
        </div>
    )
}
