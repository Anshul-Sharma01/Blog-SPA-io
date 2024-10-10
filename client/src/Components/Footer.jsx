import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Upper section with links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Site Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/blogs/all" className="hover:text-blue-400 transition-colors duration-200">
                                    All Blogs
                                </Link>
                            </li>
                            <li>
                                <Link to="/auth/login" className="hover:text-blue-400 transition-colors duration-200">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/auth/register" className="hover:text-blue-400 transition-colors duration-200">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/favourites/my" className="hover:text-blue-400 transition-colors duration-200">
                                    My Favourites
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                <FaFacebook className="text-white hover:text-blue-500 transition-colors duration-200" size={30} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                <FaTwitter className="text-white hover:text-blue-400 transition-colors duration-200" size={30} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer">
                                <FaInstagram className="text-white hover:text-pink-400 transition-colors duration-200" size={30} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                                <FaLinkedin className="text-white hover:text-blue-600 transition-colors duration-200" size={30} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p>Email: support@yourblog.com</p>
                        <p>Phone: +123-456-7890</p>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                    <p>&copy; 2024 Your Blog Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
