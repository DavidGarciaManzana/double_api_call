import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from "@/pages/Button/Button";
import AddIngredientButton from "@/pages/AddIngredientButton/AddIngredientButton";
import CallAPIButton from "@/pages/CallAPIButton/CallAPIButton";
import Input from "@/pages/Input/Input";
import {string} from "prop-types";
// import buttonstyles from '@/pages/Button/Button.module.css';


const ENDPOINT =
    'https://api.openai.com/v1/chat/completions';
const inter = Inter({subsets: ['latin']})

export interface MyObject {
    id: string;
    text: string;
    quantity?: string;

}

export default function Home() {
    const [ingredient, setIngredient] = React.useState<string>('')
    const [foodIngredients, setFoodIngredients] = React.useState<MyObject[]>([])
    const [ingredientButton, setIngredientButton] = React.useState('Añadir ingrediente')
    const [incompleteIngredient, setIncompleteIngredient] = React.useState({})
    const [status, setStatus] = React.useState('idle');
    let nextIngredient: MyObject;
    let nextCompleteIngredient: MyObject;
    function plainIngredients (){
        let ingredientsList:string = '';
        foodIngredients.map((item: MyObject) => {
            ingredientsList += `${item.quantity} ${item.text}, `
        })
        return ingredientsList;
    }



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
                    "content": `Responde unicamente con 3 incisos, sin saludos, sin decirme que aqui esta la solucion, quiero interactuar con un robot,sin la descripcion para cocinarlos, dame 3 platillos pueda crear con los siguientes ingredientes: ${plainIngredients()} `
                }]
            }),
        });
        const json = await response.json();
        console.log(json)

        // if (json.ok) {
        //     setStatus('success');
        //     setMessage('');
        // } else {
        //     setStatus('error');
        // }
    }

    return (
        <div className={styles.parent}>
            {foodIngredients.length > 2 && <CallAPIButton onClick={handleAPI}>Enviar</CallAPIButton>}
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

                <Input ingredient={ingredient} setIngredient={setIngredient} maxLength={20}></Input>
                <AddIngredientButton type={"submit"}>{ingredientButton}</AddIngredientButton>
                <div className={styles.listContainer}>
                    <ul className={styles.list}>
                        {foodIngredients.map((ingr: MyObject) => (
                            <li className={styles.listItem} key={ingr.id}>{ingr.quantity} {ingr.text}</li>
                        ))}
                    </ul>
                </div>
                {/*<p>{foodIngredients[0]}</p>*/}
                {/*<Button className={buttonstyles.special-button}>Añadir ingrediente</Button>*/}

            </form>
        </div>
    )
}
