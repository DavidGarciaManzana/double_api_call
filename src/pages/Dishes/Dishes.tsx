import React from "react";
import styles from '@/pages/Dishes/Dishes.module.css';
import {APIContext} from "@/pages/APIProvider/APIProvider";






export default function Hero() {
    const {textApiAnswer,imageApiAnswer} = React.useContext(APIContext)

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <article className={styles.card}>
                        <img className={styles.card__image} src={imageApiAnswer[0]}
                             alt='Imagen de un platillo de comida'/>
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
                        <img className={styles.card__image} src={imageApiAnswer[1]}
                             alt='Imagen de un platillo de comida'/>
                        <div className={styles.card__data}>
                            <div className={styles.card__info}>
                                <h2>{textApiAnswer[1].substring(textApiAnswer[1].indexOf(' ') + 1, textApiAnswer[1].indexOf(':'))}</h2>
                                <p>{textApiAnswer[1].substring(textApiAnswer[1].indexOf(':') + 1)}</p>
                            </div>
                        </div>
                    </article>
                    <article className={styles.card}>
                        <img className={styles.card__image} src={imageApiAnswer[2]}
                             alt='Imagen de un platillo de comida'/>
                        <div className={styles.card__data}>
                            <div className={styles.card__info}>
                                <h2>{textApiAnswer[2].substring(textApiAnswer[2].indexOf(' ') + 1, textApiAnswer[2].indexOf(':'))}</h2>
                                <p>{textApiAnswer[2].substring(textApiAnswer[2].indexOf(':') + 1)}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}