import React from "react";
import styles from '@/pages/ParentContainer/ParentContainer.module.css';

interface ParentContainerProps  {
    className?: string;
    children:React.ReactNode;

}

export default function ParentContainer({className = '',children} : ParentContainerProps) {
    return (
        <div className={`${styles.parent} ${className}`}>
            {children}
        </div>
    );
}