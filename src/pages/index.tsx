import React from "react";
import styles from '@/styles/Home.module.css'
import Loader from '@/pages/Loader/Loader'
import Modal from '@/pages/Modal/Modal'
import ButtonBar from "@/pages/ButtonBar/ButtonBar";
import TopBar from "@/pages/TopBar/TopBar";
import Hero from "@/pages/Hero/Hero"
import IngredientList from "@/pages/IngredientList/IngredientList";
import StatusProvider from "@/pages/StatusProvider/StatusProvider";
import IngredientsProvider from "@/pages/IngredientsProvider/IngredientsProvider";
import APIProvider from "@/pages/APIProvider/APIProvider";
import ParentContainer from "@/pages/ParentContainer/ParentContainer";
import {StatusContext} from "@/pages/StatusProvider/StatusProvider";
import IngredientForm from "@/pages/IngredientForm/IngredientForm";
import useToggle from "@/hooks/useToggle";


export default function Home() {
    const [isModalOpen,toggleModal] = useToggle()
        // React.useState<boolean>(false);

    const {status} = React.useContext(StatusContext)
    

    return (
        <StatusProvider>

            <IngredientsProvider>
                <APIProvider>

                    <ParentContainer>
                        <TopBar/>
                        <ParentContainer className={styles.heroPlusList}>
                            <Hero/>
                            {status !== 'loading' &&
                                <IngredientList/>}


                            <section className={styles.section}>
                                <div className={styles.container}>
                                    <div className={styles.grid}>
                                        <article className={styles.card}>
                                            <img className={styles.card__image} src='food1.jpg'
                                                 alt='Imagen de un platillo de comida'/>
                                            <div className={styles.card__data}>
                                                <div className={styles.card__info}>
                                                    <h2>Platillo 1</h2>
                                                    <p>Descripcion del platillo 1</p>
                                                </div>
                                                {/*<h3 className={styles.card__price}>$7.50</h3>*/}
                                                {/*<button className={styles.card__add}>+</button>*/}
                                            </div>
                                        </article>
                                        <article className={styles.card}>
                                            <img className={styles.card__image} src='food1.jpg'
                                                 alt='Imagen de un platillo de comida'/>
                                            <div className={styles.card__data}>
                                                <div className={styles.card__info}>
                                                    <h2>Platillo 1</h2>
                                                    <p>Descripcion del platillo 1</p>
                                                </div>
                                            </div>
                                        </article>
                                        <article className={styles.card}>
                                            <img className={styles.card__image} src='food1.jpg'
                                                 alt='Imagen de un platillo de comida'/>
                                            <div className={styles.card__data}>
                                                <div className={styles.card__info}>
                                                    <h2>Platillo 1</h2>
                                                    <p>Descripcion del platillo 1</p>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </section>
                        </ParentContainer>
                        <ButtonBar toggleModal={toggleModal} B1={'Reset'} B2={'Enviar'} B3={'Añadir'}/>

                        {status === 'loading' && <Loader></Loader>}

                        <Modal title="Add Ingredient Modal" isModalOpen={isModalOpen} toggleModal={toggleModal}>


                            <IngredientForm toggleModal={toggleModal}></IngredientForm>



                        </Modal>


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


                    </ParentContainer>
                </APIProvider>
            </IngredientsProvider>
        </StatusProvider>
    )
}
