interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

const ServiceCard = ({
  image,
  title,
  description,
  buttonText,
}: ServiceCardProps) => {
  return (
    <div className="min-w-60 overflow-hidden flex-1 shrink basis-[0%]">
      <img
        loading="lazy"
        srcSet={image}
        className="aspect-[1.69] object-contain w-full"
        alt={title}
      />
      <div className="w-full mt-8">
        <div className="w-full text-black">
          <h3 className="text-2xl font-bold leading-[34px]">{title}</h3>
          <p className="text-base font-normal leading-6 mt-4">{description}</p>
        </div>
        <div className="flex w-full flex-col text-base text-black font-normal mt-8">
          <button className="flex items-center gap-2 overflow-hidden hover:text-gray-600 transition-colors">
            <span>{buttonText}</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/9cc59fc65142f42773e3131d8a5a5a8d452f8191d61b72aca044880ddbb310ec?placeholderIfAbsent=true"
              className="w-6 h-6"
              alt="Arrow right"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
