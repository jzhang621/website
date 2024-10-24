import React from 'react';
import Image from 'next/image';

interface ImageProps {
    src: string;
    width: number;
    height: number;
    alt?: string;
}

const CustomImage: React.FC<ImageProps> = ({ src, width, height, alt = '' }) => {
    return (
        <Image
            src={src}
            width={width}
            height={height}
            layout="responsive"
            alt={alt}
        />
    );
};

export default CustomImage;


