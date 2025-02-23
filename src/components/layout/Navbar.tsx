
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ContactInfo from "../contact/ContactInfo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RocketIcon, GraduationCapIcon, CheckCircleIcon, LogOutIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [showContact, setShowContact] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/', { replace: true });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-neutral-100 min-h-[72px] w-full flex items-center justify-center px-16 max-md:px-5">
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap">
        <Link
          to="/"
          onClick={handleHomeClick}
          className="bg-white h-10 flex items-center justify-center w-20"
        >
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/91073290d081bfb41048783c358941f899d297f396f8b83be32d228ecad24ad2?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/91073290d081bfb41048783c358941f899d297f396f8b83be32d228ecad24ad2?placeholderIfAbsent=true&width=200 200w"
            className="aspect-[1.93] object-contain w-[108px]"
            alt="Company Logo"
          />
        </Link>

        <div className="flex min-w-60 items-center gap-8 text-base text-black font-normal">
          <nav className="flex min-w-60 items-center gap-8 flex-wrap">
            <Link 
              to="/" 
              onClick={handleHomeClick}
              className="hover:text-gray-600 transition-colors"
            >
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-600 transition-colors">
              About Us
            </Link>
            <button
              onClick={() => setShowServices(true)}
              className="hover:text-gray-600 transition-colors"
            >
              Our Services
            </button>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                Projects
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/fee1f4da4fbc0ac2471ce1f6c2ea6132c2a43490c7dcf7518142e53de96c1a55?placeholderIfAbsent=true"
                  className="w-6 h-6"
                  alt="Dropdown arrow"
                />
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                Partners
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/fee1f4da4fbc0ac2471ce1f6c2ea6132c2a43490c7dcf7518142e53de96c1a55?placeholderIfAbsent=true"
                  className="w-6 h-6"
                  alt="Dropdown arrow"
                />
              </button>
            </div>

            <div className="relative group">
              <button 
                onClick={() => setShowContact(true)}
                className="flex items-center gap-1 hover:text-gray-600 transition-colors"
              >
                Contact Us
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/fee1f4da4fbc0ac2471ce1f6c2ea6132c2a43490c7dcf7518142e53de96c1a55?placeholderIfAbsent=true"
                  className="w-6 h-6"
                  alt="Dropdown arrow"
                />
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOutIcon className="w-4 h-4" />
              Logout
            </Button>
          </nav>
        </div>
      </div>
      <ContactInfo isOpen={showContact} onClose={() => setShowContact(false)} />

      {/* Services Dialog */}
      <Dialog open={showServices} onOpenChange={setShowServices}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Empowering Startups & Verified Graduates
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <p className="text-center text-gray-600">
              We bridge the gap between startups looking for skilled talent and verified graduates seeking real-world experience. Our platform ensures a win-win collaboration where innovation meets expertise.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-lg mb-3">
                      <RocketIcon className="text-purple-500" />
                      For Startups
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Submit your project requirements.</li>
                      <li>Get matched with skilled, verified graduates.</li>
                      <li>Receive high-quality work at competitive rates.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-lg mb-3">
                      <GraduationCapIcon className="text-purple-500" />
                      For Graduates
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Access real-world projects from innovative startups.</li>
                      <li>Gain experience, build your portfolio, and get paid.</li>
                      <li>Work on exciting challenges and grow your career.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircleIcon className="text-green-500" size={20} />
                    Verified and skilled graduates.
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircleIcon className="text-green-500" size={20} />
                    Cost-effective solutions for startups.
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircleIcon className="text-green-500" size={20} />
                    A seamless collaboration platform.
                  </li>
                </ul>
              </div>

              <p className="text-center font-semibold text-lg text-purple-600">
                Start your journey with us today!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
