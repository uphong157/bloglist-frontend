import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    try {
      await blogService.create(blogObject)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setTitle('')
      setAuthor('')
      setUrl('')

      setErrorMessage(`new blog "${title}" has been added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (e) {
      console.log('Error', e)
    }
  }

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={handleNewBlog} >
        <div>
          title: 
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: 
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: 
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm