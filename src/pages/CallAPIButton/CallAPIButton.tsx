import React from "react";
import Button from "@/pages/Button/Button";
import styles from "@/pages/CallAPIButton/CallAPIButton.module.css";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children:React.ReactNode

}
export default function CallAPIButton({children,...delegated}:InputProps) {
    return <Button className={styles.roundButton} {...delegated}>{children}</Button>

}