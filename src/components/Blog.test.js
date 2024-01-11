import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'BlogTitle',
    author: 'BlogAuthor',
    url: 'url',
    likes: 0,
    user: {
      "username": "username",
      "name": "name",
    }
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    render(<Blog blog={blog} setBlogs={mockHandler} />)
  })

  test('renders title and author', () => {
    const titleElem = screen.getByText(blog.title, { exact: false })
    const authorElem = screen.getByText(blog.author, { exact: false })

    expect(titleElem).toBeDefined()
    expect(authorElem).toBeDefined()
  })

  test('does not render URL and likes by default', () => {
    const urlElem = screen.getByText(blog.url, { exact: false })
    const likesElem = screen.getByText(blog.likes, { exact: false })

    expect(urlElem).toHaveStyle('display: none')
    expect(likesElem).toHaveStyle('display: none')
  })
})
