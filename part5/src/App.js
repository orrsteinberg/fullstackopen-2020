import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const blogFormRef = React.createRef();

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
        );
    }, []);

    useEffect(() => {
        const loggedInJSON = window.localStorage.getItem('loggedInUser');
        if (loggedInJSON) {
            const user = JSON.parse(loggedInJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async event => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });

            window.localStorage.setItem('loggedInUser', JSON.stringify(user));

            blogService.setToken(user.token);

            setUser(user);
            setUsername('');
            setPassword('');

        } catch (exception) {
            setErrorMessage('Wrong username or password');
            setTimeout(() => { setErrorMessage(null); }, 5000);
        }
    };

    const createNewBlog = async blogObject => {
        try {
            const returnedBlog = await blogService.create(blogObject);

            blogFormRef.current.toggleVisibility();

            setSuccessMessage(`New blog created: ${returnedBlog.title} by ${returnedBlog.author}`);
            setTimeout(() => { setSuccessMessage(null); }, 5000);

            setBlogs(blogs.concat(returnedBlog));
        } catch (exception) {
            setErrorMessage('Could not create a new blog entry');
            setTimeout(() => { setErrorMessage(null); }, 5000);
        }
    };

    const updateBlog = async (blogId, blogObject) => {
        try {
            const updatedBlog = await blogService.update(blogId, blogObject);

            setSuccessMessage(`Added a like for ${updatedBlog.title}`);
            setTimeout(() => { setSuccessMessage(null); }, 5000);

            // Update blogs array
            const updatedBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b);

            // Set blogs state, order by number of likes
            setBlogs( updatedBlogs.sort((a, b) => b.likes - a.likes) );

        } catch (exception) {
            setErrorMessage('Could not update blog');
            setTimeout(() => { setErrorMessage(null); }, 5000);
        }
    };

    const deleteBlog = async blogId => {
        try {
            const response = await blogService.remove(blogId);

            if (response.status === 204) {
                setSuccessMessage('Successfully removed blog');
                setTimeout(() => { setSuccessMessage(null); }, 5000);

                setBlogs(blogs.filter(b => b.id !== blogId));
            }

        } catch (exception) {
            setErrorMessage('Could not delete blog');
            setTimeout(() => { setErrorMessage(null); }, 5000);
        }
    };


    if (!user) {
        return (
            <div>
                <h1>Log in</h1>
                <Notification message={errorMessage || successMessage}
                    type={errorMessage ? 'error' : 'success'} />
                <form onSubmit={handleLogin}>
                    <div>
                        Username: <input id="username" type="text" value={username} name="Username"
                            onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
                        Password: <input id="password" type="password" value={password} name="Password"
                            onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={errorMessage || successMessage}
                type={errorMessage ? 'error' : 'success'} />
            <p>{user.name} logged in</p>
            <button onClick={() => {
                window.localStorage.clear();
                setUser(null);
            }}>
            Log out
            </button>
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <CreateBlogForm
                    createNewBlog={createNewBlog}
                />
            </Togglable>
            <div id="blogs">
                {blogs.map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                        user={user}
                        updateBlog={updateBlog}
                        deleteBlog={deleteBlog}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
