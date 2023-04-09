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
import Toast from "@/pages/Toast/Toast";
import {ArrowDown} from "react-feather";
import {stat} from "fs";


interface AppProps {
    ip: string
}

export default function App({ip}: AppProps) {
    const {status, setStatus} = React.useContext(StatusContext)
    const [isIngredientModalOpen, toggleIngredientModal] = useToggle()
    const [isInstructionsModalOpen, toggleInstructionsModal] = useToggle(true)
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const {isValid} = useValidation(ip)

    React.useEffect(() => {
        if (!isValid()) {
            setStatus('consumed')
        }
    }, [isValid, setStatus])

    React.useEffect(() => {
        if (status === "success") {
            handleScroll()
        }
    }, [status])

    function handleScroll() {
        scrollRef.current?.scrollTo({
            top: 350,
            left: 0,
            behavior: 'smooth'
        });
    }


    return (
        <ParentContainer>
            <Modal title={'Bienvenido a refrichef'} isModalOpen={isInstructionsModalOpen}
                   toggleModal={toggleInstructionsModal}>

                <br/>

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
                </ol>
                <br/>
                <Toast>Esta aplicación hace uso de inteligencia artificial para sugerir platillos en base a los
                    ingredientes proporcionados. Debido a esto, los resultados pueden variar y es posible que se
                    sugieran combinaciones de ingredientes inesperadas. Por favor, use su propio criterio al seguir las
                    sugerencias de la aplicación. ¡Diviértete cocinando!</Toast>


            </Modal>
            {status == 'consumed' &&
                <Modal className={styles.noMore} title={'😔'} isModalOpen={true} toggleModal={() => {
                }}>Por el momento solo se permiten 3 intentos por dia, ponte en contacto con el equipo de desarrollo si
                    te gustaria adquirir una suscripcion premium <a href='https://twitter.com/DavidGarciaMa1'
                                                                    target="_blank"><Twitter></Twitter></a></Modal>}
            <TopBar toggleInstructionsModal={toggleInstructionsModal}/>
            <ParentContainer className={styles.heroPlusList} ref={scrollRef}>
                <Hero/>
                {status !== 'loading' &&
                    <IngredientList/>}
                {status == 'success' &&
                    <button className={styles.downButton} onClick={handleScroll}><ArrowDown></ArrowDown></button>}


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