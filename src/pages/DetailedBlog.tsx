/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPostQuery, useAddCommentMutation } from "../redux/api";
import { selectCurrentUser } from "../redux/authSlice";
import { format } from "date-fns";
import Modal from "../components/Modal";

const BlogPostPage = () => {
  const { id } = useParams();
  const { data: post, error, isLoading,refetch } = useGetPostQuery(Number(id));
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectCurrentUser);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    if (!comment.trim()) return;
    try {
      await addComment({
        postId: Number(id),
        content: comment,
        userId: user._id,
      }).unwrap();
        setComment("");
    refetch();
        
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  if (isLoading) return <div className="text-center">Loading post...</div>;
  if (error)
    return <div className="text-center text-red-500">Error loading post</div>;
  if (!post) return <div className="text-center">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center mb-6">
            <img
              src={`https://i.pravatar.cc/150?u=${post.user._id}`}
              alt={post.user?.username}
              className="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {post.user?.username}
              </p>
              <p className="text-sm text-gray-600">{post.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="prose max-w-none">{post.content}</div>
        </div>
        <div className="px-6 py-4 bg-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Likes</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{post.comments?.length} Comments</span>
            </button>
          </div>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </article>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
        <div className="space-y-6">
          {post.comments?.map((comment: { id: React.Key | null | undefined; user: { id: any; username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }; createdAt: string; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
            <div key={comment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <img
                  src={`https://i.pravatar.cc/150?u=${comment.user.id}`}
                  className="h-10 w-10 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {comment.user.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Leave a Comment
        </h2>
        <form
          onSubmit={handleSubmitComment}
          className="bg-white rounded-lg shadow p-6"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full mb-4 p-2 border rounded"
            rows={4}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isAddingComment}
          >
            {isAddingComment ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BlogPostPage;
