import { motion } from "framer-motion";
import { Button } from "../app/@/components/ui/button";
import { PostList } from "./PostList";
const Home = () => (
  <div className="space-y-16">
    {/* Hero Section */}
    <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-lg overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Welcome to <span className="text-yellow-300">Alvin's Blog Hub</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Explore a world of ideas, stories, and insights. Your journey into
          captivating content starts here.
        </p>
        <Button className="bg-white text-indigo-600 hover:bg-yellow-300 hover:text-indigo-700 transition-colors duration-300 text-lg px-8 py-3 rounded-full shadow-lg">
          Start Reading
        </Button>
      </motion.div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white bg-opacity-10 rounded-full"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </section>

    {/* Featured Posts Section */}
    <PostList />

    {/* Call to Action Section */}
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to share your story?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join our community of writers and let your voice be heard. Start your
          blogging journey today!
        </p>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 text-lg px-8 py-3 rounded-full shadow-lg">
          Create Your First Post
        </Button>
      </div>
    </section>
  </div>
);

export { Home };
