import React from "react"
import AddBlogForm from "./AddBlogForm"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"



test("<AddBlogForm />", () => {
    const handleAddBlog = jest.fn()
    const togglerRef = {
        current: {
            setVisibility: () => null
        }
    }

    const component = render(
        <AddBlogForm handleAddBlog={handleAddBlog} togglerRef={togglerRef} />
    )

    const form = component.container.querySelector("form")
    const titleForm = component.container.querySelector("#title-frm")
    const authorForm = component.container.querySelector("#author-frm")
    const urlForm = component.container.querySelector("#url-frm")

    fireEvent.change(titleForm, {
        target: {
            value: "Writting semantic HTML"
        }
    })
    fireEvent.change(authorForm, {
        target: {
            value: "john doe"
        }
    })
    fireEvent.change(urlForm, {
        target: {
            value: "https://www.demoblogsite.com"
        }
    })
    fireEvent.submit(form)

    expect(handleAddBlog.mock.calls).toHaveLength(1)
    expect(handleAddBlog.mock.calls[0][0].title).toBe("Writting semantic HTML")
    expect(handleAddBlog.mock.calls[0][0].author).toBe("john doe")
    expect(handleAddBlog.mock.calls[0][0].url).toBe("https://www.demoblogsite.com")
})