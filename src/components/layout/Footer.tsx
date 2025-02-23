import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

const Footer = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <footer className="bg-[rgba(235,235,235,1)] flex w-full flex-col overflow-hidden items-stretch px-16 py-20 max-md:px-5">
      <div className="self-center flex w-[493px] max-w-full flex-col items-center">
        <div className="h-[49px] w-14 overflow-hidden">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/2f12dea8f2db7ffa55739e9ed27ae8295cbb4884e18af2b299cb6bcd938a22ef?placeholderIfAbsent=true"
            className="aspect-[1.14] object-contain w-full rounded-[50%]"
            alt="Footer logo"
          />
        </div>

        <nav className="flex w-full gap-8 text-sm text-black font-semibold justify-center flex-wrap mt-8">
          <Link to="/" className="hover:text-gray-600 transition-colors">
            Home Page
          </Link>
          <Link to="/about" className="hover:text-gray-600 transition-colors">
            About Us
          </Link>
          <Link
            to="/services"
            className="hover:text-gray-600 transition-colors"
          >
            Our Services
          </Link>
          <Link
            to="/projects"
            className="hover:text-gray-600 transition-colors"
          >
            Projects
          </Link>
          <button 
            onClick={() => setShowContact(true)}
            className="hover:text-gray-600 transition-colors"
          >
            Contact Us
          </button>
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-6 mt-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#1877F2] transition-colors"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#1DA1F2] transition-colors"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#0A66C2] transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#E4405F] transition-colors"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>

      <div className="w-full text-sm font-normal mt-20 max-md:mt-10">
        <hr className="border-black" />
        <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-8">
          <div className="text-black">
            © 2024 CS Software Solutions. All rights reserved.
          </div>
          <div className="flex min-w-60 gap-6 text-black">
            <Link
              to="/privacy"
              className="underline hover:text-gray-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="underline hover:text-gray-600 transition-colors"
            >
              Terms of Use
            </Link>
            <button className="underline hover:text-gray-600 transition-colors">
              Cookie Settings
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showContact} onOpenChange={setShowContact}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Phone:</p>
              <p className="text-gray-600">7981012359</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Email:</p>
              <p className="text-gray-600">Chaitanyakumarreddy@gmail.com</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
