import styles from '@/pages/Button/Button.module.css';
import React from "react";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string| undefined;


}

export default function Button({ className= '', ...delegated}: InputProps) {
    return (
        <button className={`${styles.button} ${className}`} {...delegated} />
    );
}