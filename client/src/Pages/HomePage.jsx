import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import HomeLayout from '../Layouts/HomeLayout';

import { FaFeatherAlt} from "react-icons/fa";
import { GiGrowth } from "react-icons/gi";

function HomePage() {
    return (
        <>
            <HomeLayout>

            <section className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
                <div className="relative z-20 flex flex-col items-center justify-center text-center text-black h-full space-y-6">
                
                    <h1 className="text-6xl md:text-7xl font-bold tracking-wide leading-tight animate-fade-in shadow-text">
                        Welcome to Your Blogging Universe
                    </h1>

                    
                    <p className="mt-4 text-lg md:text-2xl max-w-3xl font-light animate-fade-in-up shadow-text">
                        Share your stories, connect with readers, and explore countless perspectives from all over the world.
                    </p>

                    
                    <Link to="/blogs/all">
                    <button className="mt-8 px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                        Explore Blogs
                    </button>
                    </Link>
                </div>

                
                <div className="absolute bottom-12 right-12 animate-float">
                    <FaFeatherAlt className="w-16 h-16 text-gray-500 opacity-60" />
                </div>
            </section>






            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 md:px-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800">Featured Blogs</h2>
                    <p className="text-center text-gray-600 mt-4 text-lg">Handpicked stories just for you</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    
                        <div className="group relative bg-white rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-105">
                            <img src="/images/featured-blog-1.jpg" alt="Featured Blog 1" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-4 text-white">
                                <h3 className="text-2xl font-bold">How to Write Engaging Blog Content</h3>
                                <Link to="/blogs/view/1">
                                    <button className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300">Read More</button>
                                </Link>
                            </div>
                        </div>

                        <div className="group relative bg-white rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-105">
                            <img src="/images/featured-blog-2.jpg" alt="Featured Blog 2" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-4 text-white">
                                <h3 className="text-2xl font-bold">The Future of Blogging: What's Next?</h3>
                                <Link to="/blogs/view/2">
                                    <button className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300">Read More</button>
                                </Link>
                            </div>
                        </div>

                        <div className="group relative bg-white rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-105">
                            <img src="/images/featured-blog-3.jpg" alt="Featured Blog 3" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-4 text-white">
                                <h3 className="text-2xl font-bold">10 Tips for Becoming a Better Writer</h3>
                                <Link to="/blogs/view/3">
                                    <button className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300">Read More</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-600">
                <div className="max-w-6xl mx-auto px-6 md:px-8 text-center text-white">
                    <h2 className="text-5xl font-extrabold mb-6">Start Sharing Your Stories Today!</h2>
                    <p className="text-xl mb-8">Sign up now and start creating engaging blogs that captivate your audience.</p>
                    <Link to="/blogs/create">
                        <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-yellow-500 transition duration-300">
                            Create a Blog
                        </button>
                    </Link>
                </div>
            </section>

            <section className="py-20 ">
                <div className="max-w-6xl mx-auto px-6 md:px-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">

                        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                            <FaUserCircle className="text-6xl text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-700 mb-6">"This platform has transformed my writing skills. I've learned so much!"</p>
                            <div className="flex justify-center mb-4">
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                            </div>
                            <p className="text-gray-500">- Sarah, Blogger</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                            <FaUserCircle className="text-6xl text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-700 mb-6">"An incredible platform for sharing my experiences with a wide audience."</p>
                            <div className="flex justify-center mb-4">
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                            </div>
                            <p className="text-gray-500">- John, Writer</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                            <FaUserCircle className="text-6xl text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-700 mb-6">"The best blogging site I've ever used. Highly recommend!"</p>
                            <div className="flex justify-center mb-4">
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                                <AiFillStar className="text-yellow-400 text-2xl" />
                            </div>
                            <p className="text-gray-500">- Emily, Enthusiast</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col justify-center items-center px-6 md:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">Our Mission</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Our mission is to create a vibrant platform where storytellers from all walks of life can share their ideas, insights, and experiences. We believe in the power of words to inspire, connect, and change the world. Through creativity and community, we aim to elevate every voice and provide a space where stories come alive.
                        </p>
                    </div>
                    <div className="mt-12 flex gap-4 p-4 justify-center">
                        <GiGrowth className="rounded-lg shadow-lg w-full text-4xl " />
                    </div>
                </div>
            </section>


            <section className="py-20 ">
                <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Join Our Blogging Community!</h2>
                    <p className="text-lg text-gray-600 mt-2">Connect with like-minded individuals and share your passion for writing.</p>
                    <div className="mt-8">
                        <Link to="/community">
                            <button className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold text-lg shadow-lg hover:bg-yellow-600 transition duration-300">
                                Get Involved
                            </button>
                        </Link>
                    </div>
                    <div className="mt-10 text-gray-700">
                        <p>Participate in writing challenges, workshops, and discussions to enhance your skills and network!</p>
                    </div>
                </div>
            </section>



            </HomeLayout>
        </>
    );
}

export default HomePage;
