
import ServiceCard from "../ui/ServiceCard";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Services = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const services = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/c8bc1e245d93769845bd278d2ec8b1b405562c9bd96939a393625b3655e7a196?placeholderIfAbsent=true",
      title: "Unlock Your Potential with Our Expert Solutions and Support",
      description:
        "We offer a variety of services designed to elevate your business.",
      buttonText: "Learn More",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/00bdba05286c969d9eb363029a7a2995e84ae0bae4212a93345275ce8d811542?placeholderIfAbsent=true",
      title: "Transform Your Ideas into Reality with Our Development Services",
      description:
        "Our development team brings your vision to life with precision and creativity.",
      buttonText: "Discover",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/de488c27eb5e6753531fcb8d580d07b13912c51ff76acbf34cbba396a5c4271c?placeholderIfAbsent=true",
      title: "Enhance Your Online Presence with Our Marketing Solutions",
      description:
        "We create tailored marketing strategies that drive engagement and growth.",
      buttonText: "Get Started",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="relative h-[calc(100vh-72px)]">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="absolute right-4 top-4 hover:bg-gray-100 z-10"
        >
          <X className="h-6 w-6" />
        </Button>
        <ScrollArea className="h-full">
          <section className="bg-[rgba(255,160,122,1)] w-full overflow-hidden px-16 py-28 max-md:px-5 max-md:py-[100px]">
            <h2 className="text-black text-[40px] font-bold leading-[48px] max-md:max-w-full">
              Explore Our Comprehensive Range of Services Tailored for Your Needs
            </h2>
            <div className="w-full mt-20 max-md:mt-10">
              <div className="flex w-full gap-[40px_48px] justify-center flex-wrap">
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            </div>
          </section>
        </ScrollArea>
      </div>
    </>
  );
};

export default Services;
