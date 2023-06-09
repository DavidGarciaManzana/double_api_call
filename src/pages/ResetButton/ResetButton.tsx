import React from "react";
import Button from "@/pages/Button/Button";

import styles from "@/pages/ResetButton/ResetButton.module.css";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode

}

export default function ResetButton({children, ...delegated}: InputProps) {
    return <Button className={styles.margin} {...delegated}>{children}</Button>

}