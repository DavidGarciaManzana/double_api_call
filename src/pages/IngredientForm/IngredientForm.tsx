import React from "react"
import styles from '@/pages/IngredientForm/IngredientForm.module.css';
import Input from "@/pages/Input/Input";
import AddIngredientButton from "@/pages/AddIngredientButton/AddIngredientButton";
import {IngredientsContext} from "@/pages/IngredientsProvider/IngredientsProvider";

interface IngredientFormProps {
    toggleModal:Function
}

export default function IngredientForm({toggleModal}: IngredientFormProps) {
    // console.log(isModalOpen)
    const [ingredientQuantity, setIngredientQuantity] = React.useState<string>('')
    const [ingredientName, setIngredientName] = React.useState<string>('')

    const {addIngredient} = React.useContext(IngredientsContext)

    return (
        <form className={styles.form} onSubmit={(e) => {
            e.preventDefault();
            addIngredient(ingredientName,ingredientQuantity);
            setIngredientName('')
            setIngredientQuantity('')
            toggleModal()
        }}>
            <Input maxLength={20} required={true} placeholder={'Cantidad'} value={ingredientQuantity} setValue={setIngredientQuantity}/>
            <Input maxLength={20} required={true} placeholder={'Ingrediente'} value={ingredientName} setValue={setIngredientName}/>

            <AddIngredientButton type={"submit"}>Añadir ingrediente</AddIngredientButton>
        </form>
    );
}

