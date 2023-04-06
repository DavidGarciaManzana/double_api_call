import React from "react"
import styles from '@/pages/Input/Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    ingredient: string;
    setIngredient: React.Dispatch<React.SetStateAction<string>>;

}

export default function Input({className = '', ingredient, setIngredient, ...delegated}: InputProps) {
    return (
        <>
            <input className={`${styles.input} ${className}`} value={ingredient} onChange={(event) => {
                setIngredient(event.target.value)
            }}
                   {...delegated}/>
        </>
    );
}