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
interface AppProps {
    ip:string
}
export default function App({ip}:AppProps) {
    const {status,setStatus} = React.useContext(StatusContext)
    const [isModalOpen, toggleModal] = useToggle()

    const {isValid} = useValidation(ip)

    React.useEffect(()=>{
        if(!isValid()){
            setStatus('consumed')
        }
    },[isValid,setStatus])




    return (
        <ParentContainer>
            {status == 'consumed' && <Modal className={styles.noMore} title={'😔'} isModalOpen={true} toggleModal={()=>{}}>Por el momento solo se permiten 3 intentos por dia, ponte en contacto con el equipo de desarrollo si te gustaria adquirir una suscripcion premium <a href='https://twitter.com/DavidGarciaMa1' target="_blank"><Twitter></Twitter></a></Modal>}
            <TopBar/>
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
            <ButtonBar toggleModal={toggleModal} B1={'Reset'} B2={'Enviar'} B3={'Añadir'}/>

            {status === 'loading' && <Loader></Loader>}

            <Modal title="Add Ingredient Modal" isModalOpen={isModalOpen} toggleModal={toggleModal}>


                <IngredientForm toggleModal={toggleModal}></IngredientForm>


            </Modal>


        </ParentContainer>

    )
}