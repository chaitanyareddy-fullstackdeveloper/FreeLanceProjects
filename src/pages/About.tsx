
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContactInfo from "@/components/contact/ContactInfo";
import Navbar from "@/components/layout/Navbar";
import { X } from "lucide-react"; // Import X icon
import { useNavigate } from "react-router-dom"; // Import useNavigate

const About = () => {
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <div className="relative container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="absolute right-4 top-0 hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </Button>
        
        <div className="space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Empowering Startups & Graduates
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Prajitha Reddy Solutions we bridge the gap between innovative startups and talented graduates. Our mission is to help startups bring their ideas to life while providing skilled graduates with real-world projects that kickstart their careers.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-500 text-2xl">✅</span>
                  <h3 className="font-semibold text-xl">Startups Submit Projects</h3>
                </div>
                <p className="text-gray-600">
                  Startups bring their ideas, and we provide them with a platform to turn their vision into reality.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-500 text-2xl">✅</span>
                  <h3 className="font-semibold text-xl">Verified Graduates Execute</h3>
                </div>
                <p className="text-gray-600">
                  We handpick top graduates with the right skills to work on these projects, ensuring high-quality execution.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-500 text-2xl">✅</span>
                  <h3 className="font-semibold text-xl">Win-Win Collaboration</h3>
                </div>
                <p className="text-gray-600">
                  Startups get <em>affordable, high-quality solutions</em>, and graduates gain <em>practical experience</em> to build their portfolios and careers.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">Why Choose Us?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <span className="text-2xl">🚀</span>
                <div>
                  <h3 className="font-semibold text-xl mb-2">For Startups</h3>
                  <p className="text-gray-600">Get your project done efficiently by passionate, skilled, and verified graduates.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <span className="text-2xl">🎓</span>
                <div>
                  <h3 className="font-semibold text-xl mb-2">For Graduates</h3>
                  <p className="text-gray-600">Gain hands-on experience, build a strong portfolio, and connect with potential employers.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <span className="text-2xl">🤝</span>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Quality & Trust</h3>
                  <p className="text-gray-600">We ensure that all graduates are <em>verified, trained, and ready</em> to work on industry-level projects.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center space-y-6 bg-gray-50 p-8 rounded-lg">
            <p className="text-xl font-semibold">
              Join us in <em>shaping the future</em>—where startups thrive and graduates grow.
            </p>
            <div>
              <p className="text-lg mb-4">
                <em>Want to collaborate?</em>
              </p>
              <Button 
                onClick={() => setShowContact(true)}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Contact Us Today!
              </Button>
            </div>
          </div>
        </div>

        <ContactInfo isOpen={showContact} onClose={() => setShowContact(false)} />
      </div>
    </>
  );
};

export default About;
