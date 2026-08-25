type ProductPhotoProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

const ProductPhoto = ({ src, alt, className }: ProductPhotoProps) => {
  if (!src) return null;

  return (
    // Native img avoids Next.js /_next/image, which fails on placehold.co SSL in this env.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
};

export default ProductPhoto;
