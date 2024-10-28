import Image from 'next/image';

interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
    width: number;
    height: number;
}

const CustomImage: React.FC<ImageProps> = ({ src, alt = '', className, width, height }) => {
    return (
        <div className={`relative ${className}`}>
            <Image
                src={src}
                alt={alt}
                layout="responsive"
                width={width}
                height={height}
                objectFit="cover"
                className="rounded-sm"
                quality={100}
                priority={true}
            />
        </div>
    );
};

export default CustomImage;
