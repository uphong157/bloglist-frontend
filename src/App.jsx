import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken('')
    setUser(null)
  }

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (e) {
        console.log('Error', e)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />

        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      </div>
    )
  }

  // blog will generally have a user, but not technically guaranteed
  // will filter out blogs that don't have an user
  const blogsToShow = user === null
    ? blogs
    : blogs
        .filter(blog => blog.user)
        .filter(blog => blog.user.username === user.username)
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <div style={{display : blogFormVisible ? 'none' : '' }}>
        <button onClick={() => setBlogFormVisible(true)}>add new blog</button>
      </div>
      <div style={{display : blogFormVisible ? '' : 'none' }}>
        <BlogForm setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>

      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App