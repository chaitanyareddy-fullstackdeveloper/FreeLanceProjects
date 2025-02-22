import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-neutral-100 min-h-[72px] w-full flex items-center justify-center px-16 max-md:px-5">
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap">
        <Link
          to="/"
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
            <Link to="/" className="hover:text-gray-600 transition-colors">
              Home
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
              <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                Contact Us
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/8d558f9bb4764a5dac86741cae883290/fee1f4da4fbc0ac2471ce1f6c2ea6132c2a43490c7dcf7518142e53de96c1a55?placeholderIfAbsent=true"
                  className="w-6 h-6"
                  alt="Dropdown arrow"
                />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
