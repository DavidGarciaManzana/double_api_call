import React from "react";
import Button from "@/pages/Button/Button";
import styles from "@/pages/ButtonBar/ButtonBar.module.css";

import {StatusContext} from "@/pages/StatusProvider/StatusProvider";
import {IngredientInterface, IngredientsContext} from "@/pages/IngredientsProvider/IngredientsProvider";
import {APIContext} from "@/pages/APIProvider/APIProvider";
interface ButtonBarProps {
    B1:string;
    B2:string;
    B3:string;
    toggleModal:Function;

}


export default function ButtonBar({B1, B2, B3,toggleModal}:ButtonBarProps) {

    const {status} = React.useContext(StatusContext)

    const {foodIngredients,hardReset} = React.useContext(IngredientsContext)
    const {handleTextAPI} = React.useContext(APIContext)
    let buttonActive: boolean = foodIngredients?.length > 2 && (status === 'idle' || status ==='success')
    return (
        <div className={styles.wrapper}>
            <Button className={styles.barNormalButton} onClick={hardReset}>{B1}</Button>
            {
                buttonActive ?
                    <Button className={styles.barActiveCentralButton}
                            onClick={handleTextAPI}>{B2}</Button> :
                    <Button className={styles.barInactiveCentralButton}
                    >...</Button>
            }

            <Button className={styles.barNormalButton} onClick={toggleModal}>{B3}</Button>
        </div>
    )

}