import clsx from 'clsx';
import React, { FC } from 'react';

import PlayIcon from '@/shared/assets/icons/play.svg';

import styles from './VideoPreview.module.scss';

interface IVideoPreviewProps {
    src: string;
    width: number;
    height: number;
    className?: string;
}

export const VideoPreview: FC<IVideoPreviewProps> = ({ src, className }) => {
    return (
        <div className={clsx(styles.videoPreview, className)}>
            <PlayIcon className={styles.play} />
            <video>
                <source src={src} />
            </video>
        </div>
    );
};
