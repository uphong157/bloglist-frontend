import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  const mockLikesHandler = jest.fn()

  beforeEach(() => {
    render(<Blog
      blog={blog} 
      setBlogs={mockHandler} 
      increaseLikes={mockLikesHandler}
    />)
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

  test('after clicking the view button, URL and likes are displayed', async () => {
    const user = userEvent.setup()
    const viewBtn = screen.getByRole('button', { name: 'view' })
    await user.click(viewBtn)

    const urlElem = screen.getByText(blog.url, { exact: false })
    const likesElem = screen.getByText(blog.likes, { exact: false })

    expect(urlElem).not.toHaveStyle('display: none')
    expect(likesElem).not.toHaveStyle('display: none')
  })

  test('clicking likes btn 2 times calls the handler 2 times', async () => {
    const user = userEvent.setup()
    
    const viewBtn = screen.getByRole('button', { name: 'view' })
    await user.click(viewBtn)

    const likeBtn = screen.getByRole('button', { name: 'like' })
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(mockLikesHandler.mock.calls).toHaveLength(2)
  })
})
