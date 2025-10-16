import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const categories = ['General Discussion', 'Questions', 'Testimonies', 'Bible Study', 'Prayer Requests'];

const Forum = () => {
  const { user, forumPosts, addForumPost, addComment, deleteForumPost, deleteComment } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [expandedPosts, setExpandedPosts] = useState({});
  const [commentText, setCommentText] = useState({});
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-500">Please log in to participate in the forum.</p>
      </div>
    );
  }

  const handleAddPost = () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content cannot be empty!');
      return;
    }
    const postObj = {
      title,
      content,
      category,
      timestamp: new Date().toISOString()
    };
    addForumPost(postObj);
    setTitle('');
    setContent('');
    setIsCreatePostOpen(false);
  };

  const toggleExpandPost = (postId) => {
    setExpandedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId) => {
    if (!commentText[postId]?.trim()) {
      alert('Comment cannot be empty!');
      return;
    }
    addComment(postId, commentText[postId]);
    setCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = forumPosts
    .filter((post) => {
      const matchesTopic = filterTopic === 'all' || post.category === filterTopic;
      const matchesUser =
        filterUser === 'all' ||
        (filterUser === 'me' && post.userEmail === user.email) ||
        post.userName.toLowerCase().includes(filterUser.toLowerCase());
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTopic && matchesUser && matchesSearch;
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="relative container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Arrow */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-0 left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Home"
      >
        🡨
      </button>

      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">Bible Forum</h1>

      {/* Toggle Button for Create Post Form */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}
          className="bg-primaryBlue text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          aria-expanded={isCreatePostOpen}
          aria-controls="create-post-form"
        >
          {isCreatePostOpen ? 'Hide Create Post' : 'Create New Post'}
        </button>
      </div>

      {/* Add Post Form (Toggleable) */}
      {isCreatePostOpen && (
        <div
          id="create-post-form"
          className="bg-white p-6 rounded-3xl shadow-xl border-4 border-white mb-8 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue">Create a New Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple transition-all duration-300"
            aria-label="Post title"
          />
          <textarea
            placeholder="Content (related to biblical/spiritual journey)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 mb-4 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple transition-all duration-300"
            rows="4"
            aria-label="Post content"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 mb-4 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple transition-all duration-300"
            aria-label="Select post category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddPost}
            className="w-full bg-primaryBlue text-white py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            aria-label="Submit new post"
          >
            Post
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/3 p-3 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple transition-all duration-300"
          aria-label="Search posts by title or content"
        />
        <select
          value={filterTopic}
          onChange={(e) => setFilterTopic(e.target.value)}
          className="w-full sm:w-1/4 p-3 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple transition-all duration-300"
          aria-label="Filter posts by topic"
        >
          <option value="all">All Topics</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="w-full sm:w-1/4 p-3 bg-white border border-secondaryPurple rounded-2xl text-textGray focus:outline-none focus:ring-2 focus:ring-secondaryPurple transition-all duration-300"
          aria-label="Filter posts by user"
        >
          <option value="all">All Users</option>
          <option value="me">My Posts</option>
        </select>
      </div>

      {/* Forum Posts */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-textGray">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-xl border border-secondaryPurple">
              <h3 className="text-xl font-bold text-funPink">{post.title} ({post.category})</h3>
              <p className="text-textGray mt-2">{post.content}</p>
              <p className="text-textGray text-sm mt-1">Posted by {post.userName} on {new Date(post.timestamp).toLocaleString()}</p>
              {post.userEmail === user.email && (
                <button
                  onClick={() => deleteForumPost(post.id)}
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-all duration-300"
                  aria-label={`Delete post titled ${post.title}`}
                >
                  Delete Post
                </button>
              )}

              {/* Comments */}
              <div className="mt-4">
                <button
                  onClick={() => toggleExpandPost(post.id)}
                  className="text-blue-500 hover:underline"
                  aria-label={expandedPosts[post.id] ? `Hide comments for ${post.title}` : `View comments for ${post.title}`}
                >
                  {expandedPosts[post.id] ? 'Hide Comments' : `View Comments (${post.comments.length})`}
                </button>
                {expandedPosts[post.id] && (
                  <div className="mt-2 space-y-2">
                    {post.comments.map((comment, index) => (
                      <div key={index} className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-textGray">{comment.text}</p>
                        <p className="text-textGray text-sm">By {comment.userName} on {new Date(comment.timestamp).toLocaleString()}</p>
                        {comment.userEmail === user.email && (
                          <button
                            onClick={() => deleteComment(post.id, index)}
                            className="mt-1 text-red-500 hover:underline text-sm"
                            aria-label="Delete comment"
                          >
                            Delete Comment
                          </button>
                        )}
                      </div>
                    ))}
                    <textarea
                      value={commentText[post.id] || ''}
                      onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                      placeholder="Add a comment..."
                      className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      rows="2"
                      aria-label="Add a comment to post"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="mt-2 bg-primaryBlue text-white py-1 px-3 rounded-full hover:bg-blue-700 transition-all duration-300"
                      aria-label="Submit comment"
                    >
                      Add Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forum;
