import React from "react";
import styles from '@/pages/ParentContainer/ParentContainer.module.css';

interface ParentContainerProps  {
    className?: string;
    children:React.ReactNode;

}

function ParentContainer({className = '',children} : ParentContainerProps,ref:any) {
    return (
        <div className={className ? className: styles.parent } ref={ref}>
            {children}
        </div>
    );
}
export default React.forwardRef(ParentContainer)