import React from "react";
import styles from '@/pages/TopBar/TopBar.module.css';
import Button from "@/pages/Button/Button";
import {Menu, UserPlus} from "react-feather";


export default function TopBar() {
    return (
        <div className={styles.topBar}>
        <Button className={styles.hamburgerButton}>
            <Menu></Menu>
        </Button>
            <h1>Algo Rico</h1>
        <Button className={styles.userPlusButton}>
            <UserPlus></UserPlus>
        </Button>
        </div>
    );
}