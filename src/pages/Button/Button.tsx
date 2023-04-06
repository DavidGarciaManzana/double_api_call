import styles from '@/pages/Button/Button.module.css';
import React from "react";


export default function Button({className = '', ...delegated}) {
    return (
        <button className={`${styles.button} ${className}`} {...delegated} />
    );
}