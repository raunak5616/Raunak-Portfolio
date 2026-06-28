import { memo } from "react";

const OptimizedImage = ({
  alt,
  avifSrcSet,
  webpSrcSet,
  fallbackSrc,
  sizes,
  width,
  height,
  className = "",
  imgClassName = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  style,
}) => {
  return (
    <picture className={className}>
      {avifSrcSet ? <source srcSet={avifSrcSet} sizes={sizes} type="image/avif" /> : null}
      {webpSrcSet ? <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" /> : null}
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={imgClassName}
        style={style}
      />
    </picture>
  );
};

export default memo(OptimizedImage);
