import React from "react";
import styles from '@/pages/Hero/Hero.module.css';



export default function Hero({foodIngredients}) {
    console.log('RENDERIZA HERO')
    let fridge = 'FRIDGE1.png' ;
    if (foodIngredients.length>2){
        fridge = 'FRIDGE2.png'
    }
    if (foodIngredients.length>4){
        fridge = 'FRIDGE3.png'
    }
    if (foodIngredients.length>6){
        fridge = 'FRIDGE4.png'
    }
    if (foodIngredients.length>8){
        fridge = 'FRIDGE5.png'
    }
    return (
        <div className={styles.hero}>
            <img className={styles.world} src={fridge} alt="An image of the world been cooked"/>
        </div>
    );
}