import React from "react";
import styles from '@/pages/TopBar/TopBar.module.css';
import Button from "@/pages/Button/Button";
import {HelpCircle, Twitter} from "react-feather";


export default function TopBar({toggleInstructionsModal}: any) { //todo remove any
    return (
        <div className={styles.topBar}>
            <Button className={styles.hamburgerButton} onClick={toggleInstructionsModal}>
                <HelpCircle></HelpCircle>
            </Button>
            <h1>RefriChef</h1>
            <Button className={styles.userPlusButton}>
                <a href='https://twitter.com/DavidGarciaMa1' target="_blank"><Twitter></Twitter></a>
            </Button>
        </div>
    );
}