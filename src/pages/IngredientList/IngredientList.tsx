import React from "react";
import styles from '@/pages/IngredientList/IngredientList.module.css';
import {IngredientInterface} from "@/pages/IngredientsProvider/IngredientsProvider";
import {X} from "react-feather";
import {IngredientsContext} from "@/pages/IngredientsProvider/IngredientsProvider";


export default function IngredientList() {
    const {foodIngredients, removeItem} = React.useContext(IngredientsContext)
    return (
        <div className={styles.listContainer}>
            <ul className={styles.list}>
                {foodIngredients?.map((ingr: IngredientInterface) => (
                    <li className={styles.listItem} key={ingr.id}>{ingr.quantity} {ingr.text} <X
                        className={styles.closeButton} onClick={() => {
                        removeItem(ingr.id)
                    }}/></li>
                ))}
            </ul>
        </div>
    );
}