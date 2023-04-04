import React from "react";
import Button from "@/pages/Button/Button";
import {inspect} from "util";

import styles from "@/pages/ResetButton/ResetButton.module.css";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children:React.ReactNode

}
export default function AddMoreIngredientsButton({children,...delegated}:InputProps) {
    return <Button className={styles.margin} {...delegated}>{children}</Button>

}