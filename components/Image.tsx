import React from 'react';
import Image from 'next/image';

interface ImageProps {
    src: string;
    width: number;
    alt?: string;
}

const CustomImage: React.FC<ImageProps> = ({ src, width, alt = '' }) => {
    return (
        <Image
            src={src}
            width={width}
            height={0}
            style={{ width: '100%', height: 'auto' }}
            alt={alt}
        />
    );
};

export default CustomImage;



