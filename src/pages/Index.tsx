import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonial from "@/components/sections/Testimonial";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Testimonial />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
