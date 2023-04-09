import React from "react";
import styles from '@/styles/Home.module.css'
import Loader from '@/pages/Loader/Loader'
import Modal from '@/pages/Modal/Modal'
import ButtonBar from "@/pages/ButtonBar/ButtonBar";
import TopBar from "@/pages/TopBar/TopBar";
import Hero from "@/pages/Hero/Hero"
import IngredientList from "@/pages/IngredientList/IngredientList";
import ParentContainer from "@/pages/ParentContainer/ParentContainer";
import IngredientForm from "@/pages/IngredientForm/IngredientForm";
import useToggle from "@/hooks/useToggle";
import Dishes from "@/pages/Dishes/Dishes"
import {StatusContext} from "@/pages/StatusProvider/StatusProvider";
import useValidation from "@/hooks/useValidation";
import {Twitter} from "react-feather";
import * as Tooltip from '@radix-ui/react-tooltip';
import TooltipAlert from '@/pages/TooltipAlert/TooltipAlert'


interface AppProps {
    ip: string
}

export default function App({ip}: AppProps) {
    const {status, setStatus} = React.useContext(StatusContext)
    const [isIngredientModalOpen, toggleIngredientModal] = useToggle()
    const [isInstructionsModalOpen, toggleInstructionsModal] = useToggle(true)

    const {isValid} = useValidation(ip)

    React.useEffect(() => {
        if (!isValid()) {
            setStatus('consumed')
        }
    }, [isValid, setStatus])


    return (
        <ParentContainer>
            <Modal title={'Bienvenido a refrichef'} isModalOpen={isInstructionsModalOpen}
                   toggleModal={toggleInstructionsModal}>


                {/*<TooltipAlert>*/}
                {/*    <strong style={{textAlign: "center", maxWidth: '565px'}}>¡Importante! Esta aplicación hace uso de*/}
                {/*        inteligencia artificial. Por favor, use su propio criterio al seguir las*/}
                {/*        sugerencias.</strong>*/}
                {/*</TooltipAlert>*/}


                <p style={{textAlign: "center"}}>Agrega los ingredientes que tengas en casa y te sugeriremos platillos
                    que puedas preparar con ellos:</p>
                <br/>
                <ol className={styles.orderList}>
                    <li>Haz click en el boton <strong>Añadir</strong> para agregar un nuevo ingrediente</li>
                    <li>Escribe la cantidad que deseas agregar del ingrediente (Ejemplo: 1Kg, una pizca, 100gr, una
                        taza, 1 pieza, etc.)
                    </li>
                    <li>Escribe el nombre del ingrediente y haz click en el boton <strong>Añadir ingrediente</strong>
                    </li>
                    <li>Necesitas por lo menos 3 ingredientes para generar las sugerencias</li>
                    <li>Una vez que los tengas listos da click en el boton <strong>Enviar</strong></li>
                    {/*<li>Espera unos segundos y revisa las sugerencias que refrichef te generará</li>*/}
                </ol>
                <br/>


            </Modal>
            {status == 'consumed' &&
                <Modal className={styles.noMore} title={'😔'} isModalOpen={true} toggleModal={() => {
                }}>Por el momento solo se permiten 3 intentos por dia, ponte en contacto con el equipo de desarrollo si
                    te gustaria adquirir una suscripcion premium <a href='https://twitter.com/DavidGarciaMa1'
                                                                    target="_blank"><Twitter></Twitter></a></Modal>}
            <TopBar toggleInstructionsModal={toggleInstructionsModal}/>
            <ParentContainer className={styles.heroPlusList}>
                <Hero/>
                {status !== 'loading' &&
                    <IngredientList/>}


                {/*<section className={styles.section}>*/}
                {/*    <div className={styles.container}>*/}
                {/*        <div className={styles.grid}>*/}
                {/*            <article className={styles.card}>*/}
                {/*                <img className={styles.card__image} src='food1.jpg'*/}
                {/*                     alt='Imagen de un platillo de comida'/>*/}
                {/*                <div className={styles.card__data}>*/}
                {/*                    <div className={styles.card__info}>*/}
                {/*                        <h2>Platillo 1</h2>*/}
                {/*                        <p>Descripcion del platillo 1</p>*/}
                {/*                    </div>*/}
                {/*                    /!*<h3 className={styles.card__price}>$7.50</h3>*!/*/}
                {/*                    /!*<button className={styles.card__add}>+</button>*!/*/}
                {/*                </div>*/}
                {/*            </article>*/}
                {/*            <article className={styles.card}>*/}
                {/*                <img className={styles.card__image} src='food1.jpg'*/}
                {/*                     alt='Imagen de un platillo de comida'/>*/}
                {/*                <div className={styles.card__data}>*/}
                {/*                    <div className={styles.card__info}>*/}
                {/*                        <h2>Platillo 1</h2>*/}
                {/*                        <p>Descripcion del platillo 1</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </article>*/}
                {/*            <article className={styles.card}>*/}
                {/*                <img className={styles.card__image} src='food1.jpg'*/}
                {/*                     alt='Imagen de un platillo de comida'/>*/}
                {/*                <div className={styles.card__data}>*/}
                {/*                    <div className={styles.card__info}>*/}
                {/*                        <h2>Platillo 1</h2>*/}
                {/*                        <p>Descripcion del platillo 1</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </article>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}
                {status === 'success' && <Dishes/>}
            </ParentContainer>
            <ButtonBar toggleModal={toggleIngredientModal} B1={'Reiniciar'} B2={'Enviar'} B3={'Añadir'}/>

            {status === 'loading' && <Loader></Loader>}

            <Modal title="Nuevo ingrediente" isModalOpen={isIngredientModalOpen} toggleModal={toggleIngredientModal}>
                <IngredientForm toggleModal={toggleIngredientModal}></IngredientForm>
            </Modal>


        </ParentContainer>

    )
}