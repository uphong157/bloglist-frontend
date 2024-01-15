import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, increaseLikes }) => {
  const [detailVisible, setDetailVisible] = useState(false)

  const handleBlogDelete = async () => {
    if (!window.confirm(`Remove blog "${blog.title}"?`)) return

    try {
      await blogService.deleteById(blog.id)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch(e) {
      console.log('Error', e)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showIfDetailVisible = { display: detailVisible ? '' : 'none' }
  const hideIfDetailVisible = { display: detailVisible ? 'none' : '' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>

      <button 
        style={hideIfDetailVisible}
        onClick={() => setDetailVisible(true)}
      >
        view
      </button>
      <button 
        style={showIfDetailVisible}
        onClick={() => setDetailVisible(false)}
      >
        hide
      </button>

      <div style={showIfDetailVisible}>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={increaseLikes}>like</button><br/>
        {blog.user.username}<br/>
        <button onClick={handleBlogDelete}>remove</button><br/>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog