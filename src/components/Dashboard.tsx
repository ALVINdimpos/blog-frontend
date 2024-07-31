import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
} from "../redux/api";
import { RootState } from "../redux/store";
import Modal from "./ModalDasboard";
import ConfirmationDialog from "./ConfirmationDialog";
import { Post} from "../redux/api"; // Import the types

const Dashboard: React.FC = () => {
  const { data: posts = [], refetch: refetchPosts } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

  const handleAddPost = async () => {
    if (title && content) {
      await addPost({ title, content, userId: user?._id });
      setTitle("");
      setContent("");
      refetchPosts();
      setIsModalOpen(false);
    }
  };

  const handleEditPost = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditPostId(post.id);
    setIsModalOpen(true);
  };

  const handleUpdatePost = async () => {
    if (editPostId && title && content) {
      await updatePost({ id: editPostId, title, content });
      setTitle("");
      setContent("");
      setEditPostId(null);
      refetchPosts();
      setIsModalOpen(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    await deletePost(postId);
    refetchPosts();
    setIsConfirmOpen(false);
    setPostIdToDelete(null);
  };

  const confirmDeletePost = (postId: number) => {
    setPostIdToDelete(postId);
    setIsConfirmOpen(true);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => handleEditPost(post)}
              onDelete={() => confirmDeletePost(post.id)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editPostId ? "Edit Post" : "Add Post"}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={editPostId ? handleUpdatePost : handleAddPost}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editPostId ? "Update Post" : "Add Post"}
        </button>
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => handleDeletePost(postIdToDelete!)}
        message="Are you sure you want to delete this post?"
      />
    </div>
  );
};

const PostCard: React.FC<{
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ post, onEdit, onDelete }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
    <p className="text-gray-700 mb-4">{post.content}</p>
    <div className="flex justify-between items-center">
      <button onClick={onEdit} className="text-blue-600 hover:underline">
        Edit
      </button>
      <button onClick={onDelete} className="text-red-600 hover:underline">
        Delete
      </button>
    </div>
    <CommentsTable postId={post.id} />
  </div>
);

const CommentsTable: React.FC<{ postId: number }> = ({ postId }) => {
  const { data: comments = [] } = useGetCommentsQuery(postId);
  return (
    <div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Comment</th>
            <th className="py-2">User</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td className="py-2">{comment.content}</td>
              <td className="py-2">{comment?.user?.username}</td>
              <td className="py-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
