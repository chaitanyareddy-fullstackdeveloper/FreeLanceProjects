const Testimonial = () => {
  return (
    <section className="bg-white flex w-full flex-col overflow-hidden items-center justify-center px-16 py-28 max-md:px-5 max-md:py-[100px]">
      <div className="flex w-[768px] max-w-full flex-col overflow-hidden items-center">
        <div className="flex gap-1 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/0faa8b18428a60cda2ac4beb4b2ddb3fb9c80d43af605c137a236c1db91b28f8?placeholderIfAbsent=true"
              className="aspect-[1.05] object-contain w-5 shrink-0"
              alt="Star rating"
            />
          ))}
        </div>

        <blockquote className="self-stretch text-black text-center text-2xl font-bold leading-[34px] mt-8 max-md:max-w-full">
          "Working with this team transformed our project into a success story.
          Their expertise and dedication were evident every step of the way."
        </blockquote>

        <div className="flex items-center gap-5 text-base text-black mt-8">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/87dcf4c99de23e34ecdd776eb13b93023cde10869a0c864f750fedb489ccc890?placeholderIfAbsent=true"
            className="w-14 h-14 rounded-full object-cover"
            alt="Prajitha Reddy"
          />
          <div>
            <div className="font-semibold">Prajitha Reddy</div>
            <div className="font-normal">CEO, Tech Innovations</div>
          </div>
          <div className="border self-stretch w-0 h-[61px] border-black" />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/a8d930c6dfb6a07369af8f21db4df65f7c34ec56fe850178474ddf8d37c8369c?placeholderIfAbsent=true"
            className="aspect-[2.5] object-contain w-[120px]"
            alt="Company logo"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
