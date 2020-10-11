import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginTop: 2,
        marginBottom: 2
    };

    const [showDetails, setShowDetails] = useState(false);

    const addLike = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 };
        updateBlog(blog.id, updatedBlog);
    };

    const BlogDetails = () => (
        <div className="blog-details">
            <p>{blog.url}</p>
            <p className="likes">{blog.likes} likes<button onClick={addLike}>Add</button></p>
            <p>{user.name}</p>
            <DeleteButton />
        </div>
    );

    const DeleteButton = () => {
        if (user.username === blog.user.username) {
            return (
                <button onClick={() => {
                    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                        deleteBlog(blog.id);
                    }
                }
                }>delete</button>
            );
        }

        return null;
    };

    return (
        <div className="blog" style={blogStyle}>
            <b>{blog.title}</b> {blog.author} <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'hide' : 'view'}
            </button>
            {showDetails ? <BlogDetails className='blogDetails' /> : null}
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
};

export default Blog;
