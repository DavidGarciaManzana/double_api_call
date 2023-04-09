import React, {ReactNode} from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import {AlertTriangle} from 'react-feather';

import styles from '@/pages/TooltipAlert/TooltipAlert.module.css'

function TooltipAlert({children}: { children: ReactNode }) {
    return (
        <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
                <Tooltip.Trigger className={styles.trigger}>
                    <AlertTriangle></AlertTriangle>
                </Tooltip.Trigger>
                <Tooltip.Content className={styles.content}>
                    <Tooltip.Arrow/>
                    {children}
                </Tooltip.Content>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

export default TooltipAlert;