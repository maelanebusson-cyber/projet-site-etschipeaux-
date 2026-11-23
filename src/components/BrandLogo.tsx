interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export function BrandLogo({
  className = 'logo',
  alt = "ETS Chipeaux, installation d'équipements thermiques et de climatisation",
}: BrandLogoProps) {
  return (
    <img
      className={className}
      src="/assets/logo-ets-chipeaux.png"
      alt={alt}
      width={1024}
      height={348}
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}
