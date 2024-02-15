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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken('')
    setUser(null)
  }

  const increaseLikes = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      await blogService.updateById(blog.id, { likes: blog.likes + 1 })
      
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch(e) {
      console.log('Error', e)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)

      const blogs = await blogService.getAll()
      setBlogs(blogs)

      setErrorMessage(`new blog "${blogObject.title}" has been added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (e) {
      console.log('Error', e)
    }
  }

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
  const blogsToShow = blogs.filter(blog => blog.user)
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
        <BlogForm createBlog={addBlog} hideSelf={() => setBlogFormVisible(false)}/>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      {blogsToShow.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog 
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            isDeleteAllowed={blog.user.username === user.username}
            increaseLikes={() => increaseLikes(blog.id)}
          />
      )}
    </div>
  )
}

export default App