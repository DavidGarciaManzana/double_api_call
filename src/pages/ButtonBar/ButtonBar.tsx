import React from "react";
import Button from "@/pages/Button/Button";
import styles from "@/pages/ButtonBar/ButtonBar.module.css";


export default function ButtonBar({B1, B2, B3,B3Click, ...delegated}) {
    return (
        <div className={styles.wrapper}>
            <Button className={styles.barNormalButton} {...delegated}>{B1}</Button>
            <Button className={styles.barCentralButton} {...delegated}>{B2}</Button>
            <Button className={styles.barNormalButton} onClick={B3Click} {...delegated}>{B3}</Button>
        </div>
    )

}