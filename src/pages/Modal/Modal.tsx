import React from "react"
import styles from '@/pages/Modal/Modal.module.css';
import {X as Close} from 'react-feather';
import {Dialog} from '@headlessui/react'

interface ModalProps {
    className? :string;
    title: string;
    isModalOpen: boolean;
    toggleModal: Function;
    children: React.ReactNode;
}

export default function Modal({className='',title = 'Modal Title', isModalOpen, toggleModal, children}: ModalProps) {

    return (
        <Dialog className={`${styles.wrapper} ${className}`} open={isModalOpen} onClose={()=>{toggleModal()}}>
            <div
                className={styles.backdrop}
                onClick={() => {
                    toggleModal()
                }}
            />
            <Dialog.Panel className={styles.dialog}>
                <button

                    className={`${styles.closeBtn} ${className}`}
                    onClick={() => {
                        toggleModal()
                    }}
                >
                    <Close />
                </button>
                <Dialog.Title>{title}</Dialog.Title>

                {children}

            </Dialog.Panel>
        </Dialog>
    )
}

