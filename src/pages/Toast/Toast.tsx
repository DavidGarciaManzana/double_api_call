import React, {ReactNode} from 'react';
import * as Toast from '@radix-ui/react-toast';
import {AlertTriangle, X} from 'react-feather';

import styles from '@/pages/Toast/Toast.module.css'

const ToastDemo = ({children}: { children: ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const eventDateRef = React.useRef(new Date());
    const timerRef = React.useRef(0);

    React.useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <Toast.Provider swipeDirection="right" duration={20000} >
            <button
                className={styles.buttonLarge}
                onClick={() => {
                    setOpen(false);
                    window.clearTimeout(timerRef.current);
                    timerRef.current = window.setTimeout(() => {
                        setOpen(true);
                    }, 100);
                }}
            >
                <AlertTriangle/>
            </button>

            <Toast.Root className={styles.ToastRoot} open={open} onOpenChange={setOpen}>
                <Toast.Title className={styles.ToastTitle}>¡Importante!</Toast.Title>
                <Toast.Description asChild>
                    <p className={styles.ToastDescription}>{children}</p>
                </Toast.Description>
                <br/>
                <Toast.Action className={styles.ToastAction} asChild altText="Goto schedule to undo">
                    <button className={`${styles.Button} ${styles.small} `}><X/></button>
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className={styles.ToastViewport}/>
        </Toast.Provider>
    );
};


export default ToastDemo;