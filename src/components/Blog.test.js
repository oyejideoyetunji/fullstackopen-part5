import React from "react"
import Blog from "./Blog"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"



describe("<Blog/>", () => {
    let component
    const handleUpdateBlogMock = jest.fn()
    const handleDeleteBlogMock = jest.fn()

    beforeEach(() => {
        const blog = {
            "title": "Smashing Magazine",
            "author": "John Doe",
            "url": "https://dummie@url.com",
            "likes": 8,
            "id": "5a422aa71b54a676234d17f8",
            "user": {
                "name": "ayo oyejide",
                "username": "inspiredjide",
                "id": "5a422b3a1b54a676234d17f9"
            }
        }

        const user = {
            "name": "ayo oyejide",
            "username": "inspiredjide",
            "id": "5a422b3a1b54a676234d17f9"
        }

        component = render(
            <Blog
                blog={blog}
                user={user}
                handleUpdateBlog={handleUpdateBlogMock}
                handleDeleteBlog={handleDeleteBlogMock}
            />
        )
    })

    test("the blog title and author name are displayed by defaul, whereas other details are hidde",
        () => {
            // component.debug()

            const blogCard = component.container.querySelector("div")
            console.log(prettyDOM(blogCard))

            const visibleByDefault = component.container.querySelector(".sumary-card")
            expect(visibleByDefault).not.toHaveStyle("display: none")

            const hiddenByDefault = component.container.querySelector(".details-card")
            expect(hiddenByDefault).toHaveStyle("display: none")

            expect(component.container).toHaveTextContent("Smashing Magazine John Doe")

            const firstElement = component.getByText("Smashing Magazine John Doe")
            expect(firstElement).toBeDefined()

        }
    )

    test("the blog url, number of likes and other details are shown when the view button is clicked",
        () => {
            const viewButton = component.getByText("View")

            fireEvent.click(viewButton)
            expect(
                component.container.querySelector(".details-card")
            ).not.toHaveStyle("display: none")
        }
    )

    test("if the like button is clicked twice, the event handler for it is also called twice",
        () => {
            const likeButton = component.container.querySelector(".like-btn")

            fireEvent.click(likeButton)
            expect(handleUpdateBlogMock.mock.calls.length).toBe(1)

            fireEvent.click(likeButton)
            expect(handleUpdateBlogMock.mock.calls.length).toBe(2)
        }
    )

    test("clicking the remove blog button in the component calls the event handler once",
        () => {
            const button = component.getByText("Remove Blog")
            fireEvent.click(button)

            expect(handleDeleteBlogMock.mock.calls).toHaveLength(1)
        }
    )

})
