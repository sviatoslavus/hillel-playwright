import  { test, expect } from "@playwright/test"
import { SignUpModal } from "../src/pages/Components/SignUpModal"
import { HomePage } from "../src/pages/HomePage"
import { GaragePage } from "../src/pages/GaragePage"

const validUser = {
    name: "Sviat",
    lastName: "Peralta",
    email: "aqa-sviat.peralta@test.com",
    password: "Qauto123"
}
const invalidUser = {
    longName: "veryverylongnamemorethantwentyletters",
    email: "bademail.com",
    shortPassword: "one",
    password: "Qauto123",
    passwordNoMatch:"Qauto122"
}

let signUpModal:SignUpModal 

test.beforeEach(async ({page})=>{
    // await page.goto('/')
    const homePage = new HomePage(page)
    await homePage.navigate()
    signUpModal = await homePage.openSignUpModal()

})



test("user is able to register with valid credentials",{tag:'@positive'} , async ({page})=>{
    
    const garagePage:GaragePage = await signUpModal.signUp(validUser)
    await expect(garagePage.garageHeading).toHaveText("Garage")
   

})
test('user is not able to sign up with existing credentials',{tag:'@negative'} , async({page})=>{   
    await signUpModal.signUp(validUser)
    
    await expect(signUpModal.errorLabel).toBeVisible()
})

test('the Register button is disabled if no fields are filled ',{tag:'@negative'} , async ({page})=> {
    await signUpModal.invalidSignUp(invalidUser, "empty")

    expect(signUpModal.registerButton).toBeDisabled()
})

test('error is displayed if the name is too long', async({page})=>{
    await signUpModal.invalidSignUp(invalidUser, "longName")

    await expect(signUpModal.nameTooLongLabel).toBeVisible()

})
test('error is displayed if the last name is too long', async({page})=>{
    await signUpModal.invalidSignUp(invalidUser, "longLastName")
  
    await expect(signUpModal.nameTooLongLabel).toBeVisible()

})
test('error is displayed if the confirmation password is not matched', async({page})=>{
    await signUpModal.invalidSignUp(invalidUser, "passwordNotMatch")

    await expect(signUpModal.passwordNotMatchLabel).toBeVisible()
   

})