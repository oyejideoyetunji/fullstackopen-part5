import React from "react"
import Toggler from "./Toggler"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"




describe("<Toggler />", () => {
    let component

    beforeEach(() => {
        component = render(
            <Toggler buttonLabel="Add new blog">
                <div className="test-div" />
            </Toggler>
        )
    })

    test("renders it's children", () => {
        expect(
            component.container.querySelector(".test-div")
        ).toBeDefined()
    })

    test("at first, its' children are not visible", () => {
        expect(
            component.container.querySelector(".toggler-content")
        ).toHaveStyle("display: none")
    })

    test("after clicking the button that shows the content, the children are displayed",
        () => {
            const showContentButton = component.getByText("Add new blog")
            fireEvent.click(showContentButton)

            expect(
                component.container.querySelector(".toggler-content")
            ).not.toHaveStyle("display: none")
        }
    )

    test("after clicking the button that hides the content, the children are hidden again",
        () => {
            const showContentButton = component.getByText("Add new blog")
            fireEvent.click(showContentButton)

            const hideContentButton = component.getByText("Cancel")
            fireEvent.click(hideContentButton)

            expect(
                component.container.querySelector(".toggler-content")
            ).toHaveStyle("display: none")
        }
    )
})