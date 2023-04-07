import React from "react";
import styles from '@/styles/Home.module.css'
import AddIngredientButton from "@/pages/AddIngredientButton/AddIngredientButton";
import Input from "@/pages/Input/Input";
import axios from 'axios';
import Loader from '@/pages/Loader/Loader'
import Modal from '@/pages/Modal/Modal'
import ButtonBar from "@/pages/ButtonBar/ButtonBar";
import useToggle from "@/hooks/useToggle";
import TopBar from "@/pages/TopBar/TopBar";
import Hero from "@/pages/Hero/Hero"
import IngredientList from "@/pages/IngredientList/IngredientList";


const TEXTENDPOINT = 'https://api.openai.com/v1/chat/completions';
const IMAGEENDPOINT = 'https://api.openai.com/v1/images/edits';

export interface IngredientInterface {
    id: string;
    text: string;
    quantity: string;

}

export default function Home() {
    type StatusType = 'idle' | 'loading' | 'success' | 'error'
    const [ingredientName, setIngredientName] = React.useState<string>('')
    const [ingredientQuantity, setIngredientQuantity] = React.useState<string>('')
    const [foodIngredients, setFoodIngredients] = React.useState<IngredientInterface[]>([])
    const [status, setStatus] = React.useState<StatusType>('idle');
    const [textApiAnswer, setTextApiAnswer] = React.useState<string[]>([])
    const [imageApiAnswer, setImageApiAnswer] = React.useState<string[]>([])
    const [isModalOpen, toggleIsModalOpen] = useToggle();

    let testJson;

    function plainIngredients() {
        let ingredientsList: string = '';
        foodIngredients.map((item: IngredientInterface) => {
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

    async function handleImageAPI(dish: string) {

        const formData = new FormData();
        formData.append('image', await fetch('PLATOCONCOMIDA.png').then((response) => response.blob()), 'image.png');
        formData.append('mask', await fetch('PLATOSINCOMIDA.png').then((response) => response.blob()), 'mask.png');
        formData.append('prompt', `Un plato de comida recién cocinada, apetitoso y sabroso, que contiene: ${dish}`);
        formData.append('n', '1');
        formData.append('size', '256x256');
        let url: string = '';
        const response = await axios.post(IMAGEENDPOINT, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer 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'
                }
            });
        if (response.data.data[0].url || response.data.data[0].url !== '') {
            url = response.data.data[0].url
        } else {
            console.log(response.status); //401
            console.log('HA OCURRIDO UN ERROR');
        }
        return url
    }


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
        let arrayJson;
        if (testJson.choices[0].message.content || testJson.choices[0].message.content !== '') {
            if (testJson.choices[0].message.content.includes('\n\n')) {
                arrayJson = testJson.choices[0].message.content.split(/\n\n/)
                setTextApiAnswer(arrayJson)
            } else if (testJson.choices[0].message.content.includes('\n')) {
                arrayJson = testJson.choices[0].message.content.split(/\n/)
                setTextApiAnswer(arrayJson)
            }
            console.log(arrayJson)

            if (arrayJson.length === 3) {
                // const promesas = await Promise.all([
                //     handleImageAPI(arrayJson[0].substring(arrayJson[0].indexOf(' ') + 1, arrayJson[0].indexOf(':'))),
                //     handleImageAPI(arrayJson[1].substring(arrayJson[1].indexOf(' ') + 1, arrayJson[1].indexOf(':'))),
                //     handleImageAPI(arrayJson[2].substring(arrayJson[2].indexOf(' ') + 1, arrayJson[2].indexOf(':'))),
                // ])
                //
                // setImageApiAnswer(promesas)
                setStatus('success');
            } else {
                window.alert("Chat gpt tuvo problemas al proporcionar los platillos (mando un array de mas de 3 elementos)")
            }
        } else {
            setStatus('error');
        }

    }

    function addIngredient() {
        let newIngredient = {id: crypto.randomUUID(), text: ingredientName, quantity: ingredientQuantity}
        setFoodIngredients([...foodIngredients, newIngredient])
        setIngredientName('')
        setIngredientQuantity('')
        if (typeof toggleIsModalOpen === 'function') {
            toggleIsModalOpen()
        }

    }

    return (
        <div className={styles.parent}>
            {/*Web structure*/}
            <TopBar/>
            <div className={styles.heroPlusList}>
                <Hero foodIngredients={foodIngredients}/>
                {status !== 'loading' &&
                    <IngredientList foodIngredients={foodIngredients} removeItem={removeItem}/>}

            </div>
            <ButtonBar status={status} foodIngredients={foodIngredients} B1={'Reset'} B2={'Enviar'} B3={'Añadir'}
                       B1Click={hardReset}
                       B2Click={handleTextAPI}
                       B3Click={toggleIsModalOpen}/>
            {/*Temporal elements*/}
            {status === 'loading' && <Loader></Loader>}
            {isModalOpen && <Modal title="Add Ingredient Modal" handleDismiss={toggleIsModalOpen}>
                <form className={styles.form} onSubmit={(e) => {
                    e.preventDefault()
                    addIngredient();
                }}>
                    <Input ingredient={ingredientQuantity} setIngredient={setIngredientQuantity} maxLength={20}
                           required={true} placeholder={'Quantity'}></Input>
                    <Input ingredient={ingredientName} setIngredient={setIngredientName} maxLength={20}
                           required={true} placeholder={'Name'}></Input>

                    <AddIngredientButton type={"submit"}>Añadir ingrediente</AddIngredientButton>
                </form>
            </Modal>}
            {/*THE API'S RESPONSE*/}


            {/*{status === 'success' && <section className={styles.section}>*/}
            {/*    <div className={styles.container}>*/}
            {/*        <div className={styles.grid}>*/}
            {/*            <article className={styles.card}>*/}
            {/*                <img className={styles.card__image} src={imageApiAnswer[0]}*/}
            {/*                     alt='Imagen de un platillo de comida'/>*/}
            {/*                <div className={styles.card__data}>*/}
            {/*                    <div className={styles.card__info}>*/}
            {/*                        /!*<h2>{textApiAnswer[0].split(':', 1)}</h2>*!/*/}
            {/*                        <h2>{textApiAnswer[0].substring(textApiAnswer[0].indexOf(' ') + 1, textApiAnswer[0].indexOf(':'))}</h2>*/}
            {/*                        <p>{textApiAnswer[0].substring(textApiAnswer[0].indexOf(':') + 1)}</p>*/}
            {/*                    </div>*/}
            {/*                    /!*<h3 className={styles.card__price}>$7.50</h3>*!/*/}
            {/*                    /!*<button className={styles.card__add}>+</button>*!/*/}
            {/*                </div>*/}
            {/*            </article>*/}
            {/*            <article className={styles.card}>*/}
            {/*                <img className={styles.card__image} src={imageApiAnswer[1]}*/}
            {/*                     alt='Imagen de un platillo de comida'/>*/}
            {/*                <div className={styles.card__data}>*/}
            {/*                    <div className={styles.card__info}>*/}
            {/*                        <h2>{textApiAnswer[1].substring(textApiAnswer[1].indexOf(' ') + 1, textApiAnswer[1].indexOf(':'))}</h2>*/}
            {/*                        <p>{textApiAnswer[1].substring(textApiAnswer[1].indexOf(':') + 1)}</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </article>*/}
            {/*            <article className={styles.card}>*/}
            {/*                <img className={styles.card__image} src={imageApiAnswer[2]}*/}
            {/*                     alt='Imagen de un platillo de comida'/>*/}
            {/*                <div className={styles.card__data}>*/}
            {/*                    <div className={styles.card__info}>*/}
            {/*                        <h2>{textApiAnswer[2].substring(textApiAnswer[2].indexOf(' ') + 1, textApiAnswer[2].indexOf(':'))}</h2>*/}
            {/*                        <p>{textApiAnswer[2].substring(textApiAnswer[2].indexOf(':') + 1)}</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </article>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>}*/}
        </div>
    )
}
