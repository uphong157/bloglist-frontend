import { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailVisible, setDetailVisible] = useState(false)

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
        likes {blog.likes} <button>like</button><br/>
        {blog.user.username}<br/>
      </div>
    </div>
  )
}

export default Blog