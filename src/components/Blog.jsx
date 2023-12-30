import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [detailVisible, setDetailVisible] = useState(false)

  const handleLikeClick = async () => {
    try {
      await blogService.updateById(blog.id, { likes: blog.likes + 1 })
      
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
        likes {blog.likes} <button onClick={handleLikeClick}>like</button><br/>
        {blog.user.username}<br/>
      </div>
    </div>
  )
}

export default Blog