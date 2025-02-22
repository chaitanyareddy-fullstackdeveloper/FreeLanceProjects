
import { useState } from "react";
import Login from "../auth/Login";

const Hero = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <section className="bg-white flex w-full items-center gap-[40px_80px] overflow-hidden flex-wrap px-16 py-28 max-md:px-5 max-md:py-[100px]">
      <div className="self-stretch flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
        <div className="w-full text-black max-md:max-w-full">
          <h1 className="text-[56px] font-bold leading-[67px] max-md:max-w-full max-md:text-[40px] max-md:leading-[54px]">
            Kickstart Your Tech Career with Real-World Projects
          </h1>
          <p className="text-lg font-normal leading-[27px] mt-6 max-md:max-w-full">
            Connecting BTech graduates with exciting startup projects to gain
            hands-on coding experience
          </p>
        </div>
        <div className="flex gap-4 text-base font-normal mt-8">
          <button
            onClick={() => setShowLogin(true)}
            className="self-stretch bg-black border gap-2 text-white px-6 py-3 border-black border-solid hover:bg-gray-800 transition-colors"
          >
            Get Started
          </button>
          <button className="self-stretch border gap-2 text-black px-6 py-3 border-black border-solid hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
      </div>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/35e5da359b3b2b292a3f2b47ae9290c2d2844d3b3556b2ad7970b145332dbb75?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/35e5da359b3b2b292a3f2b47ae9290c2d2844d3b3556b2ad7970b145332dbb75?placeholderIfAbsent=true&width=200 200w"
        className="aspect-[0.96] object-contain w-full self-stretch min-w-60 flex-1 shrink basis-[0%] my-auto max-md:max-w-full"
        alt="Hero illustration"
      />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  );
};

export default Hero;
