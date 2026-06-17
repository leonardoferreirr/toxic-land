import Image from "next/image";

// Imagem de produto real. As fotos das camisetas têm proporções diferentes,
// então a PDP usa fit="contain" para mostrar a peça inteira sem cortar.
export default function ProductImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
  fit = "cover",
  zoomOnHover = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  zoomOnHover?: boolean;
}) {
  if (!src) return <div className={`bg-white ${className}`} />;
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={[
          fit === "contain" ? "object-contain" : "object-cover object-top",
          zoomOnHover ? "transition-transform duration-500 group-hover:scale-[1.04]" : "",
        ].join(" ")}
      />
    </div>
  );
}
