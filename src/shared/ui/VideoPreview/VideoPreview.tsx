import React, { FC, useEffect, useRef, useState } from 'react';

import { Skeleton } from '@/shared/ui';

interface IVideoPreviewProps {
    src: string;
    width: number;
    height: number;
    className?: string;
}

export const VideoPreview: FC<IVideoPreviewProps> = ({ src, width, height, className }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const capturePreview = () => {
            if (videoRef.current) {
                const video = videoRef.current;
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const context = canvas.getContext('2d');
                if (context) {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataURL = canvas.toDataURL();
                    setPreview(dataURL);
                }
            }
        };

        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('loadeddata', capturePreview);
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('loadeddata', capturePreview);
            }
        };
    }, [src]);

    return (
        <div>
            {preview ? (
                <img src={preview} alt={'Video preview'} width={width} height={height} className={className} />
            ) : (
                <Skeleton width={`${width}px`} height={`${height}px`} />
            )}
            <video ref={videoRef} width={width} controls style={{ display: 'none' }}>
                <source src={src} type='video/mp4' />
            </video>
        </div>
    );
};
