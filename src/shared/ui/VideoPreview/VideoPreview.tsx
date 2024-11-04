import clsx from 'clsx';
import React, { FC } from 'react';

import PlayIcon from '@/shared/assets/icons/play.svg';

import styles from './VideoPreview.module.scss';

interface IVideoPreviewProps {
    src: string;
    width: number;
    height: number;
    onClick?: () => void;
    className?: string;
}

export const VideoPreview: FC<IVideoPreviewProps> = ({ src, className, width, height, onClick }) => {
    return (
        <div onClick={onClick} className={clsx(styles.videoPreview, className)} style={{ width, height }}>
            <PlayIcon className={styles.play} />
            <video>
                <source src={src} />
            </video>
        </div>
    );
};
