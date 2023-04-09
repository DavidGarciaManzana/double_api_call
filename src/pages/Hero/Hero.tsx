import React from "react";
import styles from '@/pages/Hero/Hero.module.css';
import {IngredientsContext} from "@/pages/IngredientsProvider/IngredientsProvider";
import Image from "next/image";



export default function Hero() {
    const {foodIngredients} = React.useContext(IngredientsContext)

    let fridge = 'FRIDGE1.png' ;
    if (foodIngredients?.length>2){
        fridge = 'FRIDGE2.png'
    }
    if (foodIngredients?.length>4){
        fridge = 'FRIDGE3.png'
    }
    if (foodIngredients?.length>6){
        fridge = 'FRIDGE4.png'
    }
    if (foodIngredients?.length>8){
        fridge = 'FRIDGE5.png'
    }
    return (
        <div className={styles.hero}>
            <Image className={styles.world} src={fridge} alt="An image of a fridge that dynamically changes"/>
        </div>
    );
}