import React, { ReactNode } from 'react';
import * as TooltipTag from '@radix-ui/react-tooltip';
import {AlertTriangle} from 'react-feather';

import styles from '@/pages/Tooltip/Tooltip.module.css'

function Tooltip({ children }: { children: ReactNode }) {
    return (
        <TooltipTag.Root>
            <TooltipTag.Trigger className={styles.trigger}>
                <AlertTriangle></AlertTriangle>
            </TooltipTag.Trigger>
            <TooltipTag.Content className={styles.content}>
                <TooltipTag.Arrow />
                {children}
            </TooltipTag.Content>
        </TooltipTag.Root>
    );
}

export default Tooltip;