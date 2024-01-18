import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('passes the right details for new blog', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('input[name=Title]')
    const authorInput = container.querySelector('input[name=Author]')
    const urlInput = container.querySelector('input[name=Url]')

    await user.type(titleInput, 'titleA')
    await user.type(authorInput, 'authorA')
    await user.type(urlInput, 'urlA')

    const createBtn = screen.getByRole('button', {name: 'create'})
    await user.click(createBtn)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('titleA')
    expect(createBlog.mock.calls[0][0].author).toBe('authorA')
    expect(createBlog.mock.calls[0][0].url).toBe('urlA')
  })
})