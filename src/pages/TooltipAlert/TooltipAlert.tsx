import React, {ReactNode} from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import {AlertTriangle} from 'react-feather';

import styles from '@/pages/TooltipAlert/TooltipAlert.module.css'

function TooltipAlert({children}: { children: ReactNode }) {
    const buttonRef = React.useRef(null);
    const handleButtonClick = () => {
        // buttonRef.current.focus();
        // console.log(buttonRef)
    };
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger className={styles.trigger}>
                    <button ref={buttonRef} onClick={handleButtonClick} className={styles.IconButton}>
                        <AlertTriangle />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className={styles.TooltipContent} sideOffset={5}>
                        {children}
                        <Tooltip.Arrow className={styles.TooltipArrow} />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

export default TooltipAlert;