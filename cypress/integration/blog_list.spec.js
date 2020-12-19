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
    })

    describe("when a blog has been created", function(){
        beforeEach(function(){
            cy.get("#username").type("inspiredjide")
            cy.get("#password").type("abcdefg")
            cy.get("#login").click()

            cy.contains("Add new blog").click()

            cy.get("#title-frm").type("Into the bad lands")
            cy.get("#author-frm").type("J.O. Shakim")
            cy.get("#url-frm").type("https://www.theninjablog.com")
            cy.contains("Add Blog").click()
        })


        it("blog can be liked", function () {
            cy.contains("View").click()
            cy.contains("Like").click()
        })

        it("blog can be removed by the user who created it", function(){
            cy.contains("View").click()
            cy
                .contains("Remove Blog")
                .click()
        })

        it("blog cannot be removed by the usr who didn't create it", function(){
            cy.contains("Logout").click()

            const user = {
                "name": "tobi oyejide",
                "username": "oyejideoyetunji",
                "password": "123456"
            }
            cy.request("POST", "http://localhost:3003/api/users", user)
            cy.visit("http://localhost:3000")

            cy.get("#username").type("oyejideoyetunji")
            cy.get("#password").type("123456")
            cy.get("#login").click()

            cy.contains("View").click()
            cy.get("html").should("not.contain", "Remove Blog")
        })
    })

    describe("when multiple blogs have been created", function(){

        it.only("blogs are ordered according to likes with the blog with the most likes being first",
            function(){
                let blogs
                const blogDocs = [
                    {
                        title: "smack up",
                        author: "indiana jones",
                        url: "https://www.theblog.com/ij",
                        likes: 2
                    },
                    {
                        title: "piece by pieces",
                        author: "wole soyinka",
                        url: "https://theroot.com/wole",
                        likes: 7
                    },
                ]
                cy.visit("http://localhost:3000")
                cy.request("POST", "http://localhost:3003/api/login", {
                    "username": "inspiredjide",
                    "password": "abcdefg"
                }).then(response => {
                    window.localStorage.setItem("currentUser", JSON.stringify(response.body))
                    cy.visit("http://localhost:3000")

                    for(const blogDoc of blogDocs){
                        cy.request({
                            url: "http://localhost:3003/api/blogs",
                            method: "POST",
                            body: blogDoc,
                            headers: {
                                "Authorization": `bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`
                            }
                        })
                    }

                    cy.visit("http://localhost:3000")

                    blogs = cy.get(".blog-card")

                    if (blogs) {
                        cy.wrap(blogs[0]).get(".likes-wrp").should("contain", "Likes: 7")
                        cy.wrap(blogs[1]).get(".likes-wrp").should("contain", "Likes: 2")
                    }
                })
            }
        )
    })
})