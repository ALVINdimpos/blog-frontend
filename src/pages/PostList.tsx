import React from "react"; // Add this line
import { motion } from "framer-motion";
import { Button } from "../app/@/components/ui/button";
import { useGetPostsQuery } from "../redux/api";
import { Link } from "react-router-dom";

const PostList = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <div className="text-center">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading posts</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Posts</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            >
              <img
                src={`https://source.unsplash.com/random/800x600?blog,${post.id}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-800"
                    asChild
                  >
                    <Link to={`/posts/${post.id}`}>Read More</Link>
                  </Button>
                  <span className="text-sm text-gray-500">
                    By {post.user?.username}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export { PostList };
