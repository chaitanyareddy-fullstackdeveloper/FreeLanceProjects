import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="bg-[rgba(195,255,255,1)] flex w-full flex-col overflow-hidden justify-center px-16 py-28 max-md:px-5 max-md:py-[100px]">
      <div className="w-[768px] max-w-full">
        <div className="w-full text-black max-md:max-w-full">
          <h2 className="text-5xl font-bold leading-[1.2] max-md:text-[40px]">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-lg font-normal mt-6">
            Join our community to receive the latest news and exclusive offers
            directly to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-[513px] max-w-full font-normal mt-8"
        >
          <div className="flex w-full gap-4 text-base flex-wrap">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Here"
              className="self-stretch flex-1 shrink basis-[11px] border min-w-60 gap-2 text-[rgba(102,102,102,1)] p-3 border-black"
              required
            />
            <button
              type="submit"
              className="self-stretch bg-black border gap-2 text-white w-[103px] px-4 py-3 border-black hover:bg-gray-800 transition-colors"
            >
              Join Now
            </button>
          </div>
          <p className="text-black text-xs mt-4">
            By clicking Join Now, you agree to our Terms and Conditions.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
