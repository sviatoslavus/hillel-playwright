import  { test, expect } from "@playwright/test"
import { HomePage } from "../src/pages/HomePage"
import { GaragePage } from "../src/pages/GaragePage"
import { SignInModal } from "../src/pages/Components/SignInModal"

//will remove later
const validUser = {
    name: "Sviat",
    lastName: "Peralta",
    email: "aqa-sviat.peralta@test.com",
    password: "Qauto123"
}

test.describe("garage test", () => {

    let signInModal:SignInModal
    test.only("sign in as a valid user", async ({page}) =>{
        let homePage = new HomePage(page)
        await homePage.navigate()
        await homePage.signInAsUser(validUser)
        await page.pause()
    })
})