import React from "react"
import styles from '@/pages/Modal/Modal.module.css';
import {X as Close} from 'react-feather';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';


export default function Modal({title = 'Modal Title', handleDismiss, children}) {
    console.log('renderiza modal')
    React.useEffect(() => {
        function handleKeyDown(event:any) { //todo remove any
            if (event.code === 'Escape') {
                handleDismiss();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleDismiss]);
    return (
        <>
            <FocusLock returnFocus={true}>
                <RemoveScroll>
                    <div className={styles.wrapper}>
                        <div
                            className={styles.backdrop}
                            onClick={handleDismiss}
                        />
                        <div
                            className={styles.dialog}
                            role="dialog"
                            aria-modal="true"
                            aria-label={title}
                        >
                            <button

                                className={styles.closeBtn}
                                onClick={handleDismiss}
                            >
                                <Close/>
                            </button>
                            {children}
                        </div>
                    </div>
                </RemoveScroll>
            </FocusLock>
        </>
    );
}

