import React from "react";
import Button from "@/pages/Button/Button";
import styles from "@/pages/ButtonBar/ButtonBar.module.css";


export default function ButtonBar({status, foodIngredients, B1, B2, B3, B1Click, B2Click, B3Click}) {
    let buttonActive: boolean = foodIngredients.length > 2 && status === 'idle'
    return (
        <div className={styles.wrapper}>
            <Button className={styles.barNormalButton} onClick={B1Click}>{B1}</Button>
            {
                buttonActive ?
                    <Button className={styles.barActiveCentralButton}
                            onClick={B2Click}>{B2}</Button> :
                    <Button className={styles.barInactiveCentralButton}
                    >...</Button>
            }

            <Button className={styles.barNormalButton} onClick={B3Click}>{B3}</Button>
        </div>
    )

}