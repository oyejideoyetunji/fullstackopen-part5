describe("Blog list app", function(){
    beforeEach(function(){
        cy.request("POST", "http://localhost:3003/api/test/reset")
        const user = {
            "name": "ayo oyejide",
            "username": "inspiredjide",
            "password": "abcdefg"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown by default", function(){
        cy.contains("Login to proceed")
        cy.contains("Login")
    })

    describe("login", function(){
        it("fails with invalid user credentials", function () {
            cy.get("#username").type("inspiredjide")
            cy.get("#password").type("wrong")
            cy.get("#login").click()

            cy.contains("invalid username or password")
            cy.get("html").should("not.contain", "AYO OYEJIDE logged in")
        })

        it("succeds with valid user credentials", function () {
            cy.get("#username").type("inspiredjide")
            cy.get("#password").type("abcdefg")
            cy.get("#login").click()

            cy.contains("AYO OYEJIDE logged in")
        })
    })

    describe("when a user has logged in", () => {
        beforeEach(function(){
            cy.get("#username").type("inspiredjide")
            cy.get("#password").type("abcdefg")
            cy.get("#login").click()
        })

        it("new blog can be added", function () {
            cy.contains("Add new blog").click()

            cy.get("#title-frm").type("Into the bad lands")
            cy.get("#author-frm").type("J.O. Shakim")
            cy.get("#url-frm").type("https://www.theninjablog.com")
            cy.contains("Add Blog").click()

            cy.contains("Into the bad lands J.O. Shakim")
        })

        it("blogs can be liked", function () {
            cy.contains("Add new blog").click()

            cy.get("#title-frm").type("Into the bad lands")
            cy.get("#author-frm").type("J.O. Shakim")
            cy.get("#url-frm").type("https://www.theninjablog.com")
            cy.contains("Add Blog").click()

            cy.contains("View").click()
            cy.contains("Like").click()
        })
    })

})