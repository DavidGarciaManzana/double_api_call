import React from "react"
import styles from '@/pages/Input/Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    setValue:Function

}

export default function Input({className = '', value, setValue,...delegated}: InputProps) {

    return (
        <>
            <input className={`${styles.input} ${className}`} value={value} onChange={(event) => {
                setValue(event.target.value)
            }}
                   {...delegated}/>
        </>
    );
}