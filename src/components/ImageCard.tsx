interface ImageCardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  imageSource?: string;
}

const ImageCard = ({ imageSource, description, title }: ImageCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-10">
      <img src={imageSource} alt="image" className="w-full" />
      <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
        <h1 className="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary ">
          {title}
        </h1>
        <p className="text-base leading-relaxed mb-7">{description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
