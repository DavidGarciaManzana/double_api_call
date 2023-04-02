import React from "react";
import Button from "@/pages/Button/Button";
import styles from "@/pages/AddIngredientButton/AddIngredientButton.module.css";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children:React.ReactNode

}
export default function AddIngredientButton({children,...delegated}:InputProps) {
    return <Button className={styles.button} {...delegated}>{children}</Button>

}