import React from "react"
import styles from '@/pages/Modal/Modal.module.css';
import {X as Close} from 'react-feather';
import {Dialog} from '@headlessui/react'

interface ModalProps {
    title: string;
    isModalOpen: boolean;
    toggleModal: Function;
    children: React.ReactNode;
}

export default function Modal({title = 'Modal Title', isModalOpen, toggleModal, children}: ModalProps) {
    // console.log(isModalOpen)

    return (
        <Dialog className={styles.wrapper} open={isModalOpen} onClose={()=>{toggleModal()}}>
            <div
                className={styles.backdrop}
                onClick={() => {
                    toggleModal()
                }}
            />
            <Dialog.Panel className={styles.dialog}>
                <button

                    className={styles.closeBtn}
                    onClick={() => {
                        toggleModal()
                    }}
                >
                    <Close/>
                </button>
                <Dialog.Title>{title}</Dialog.Title>

                {children}

            </Dialog.Panel>
        </Dialog>
    )
}

