import test, { expect } from "@playwright/test"

const validUser = {
    name: "Sviat",
    lastName: "Peralta",
    email: "sviat.peralta@gmail.com",
    password: "Qauto123"
}



test("user is able to register with valid credentials", async ({page})=>{
    
    const signUpButton = page.getByRole('button', {name:"Sign Up"})
    const signUpName = page.locator('#signupName')
    const signUpLastNameField = page.locator('#signupLastName')
    const emailField = page.getByLabel('Name')
    const passwordField = page.getByLabel('Password', {exact:true})
    const confirmPasswordField = page.getByLabel('Re-enter Password')
    const registerButton = page.getByRole('button', {name:"Register"})
    const garageHeading =  page.getByRole("heading", {name:"Garage"})

    
    await page.goto('/')
    await signUpButton.click()
    await signUpName.fill(validUser.name)
    await signUpLastNameField.fill(validUser.lastName)
    await emailField.fill(validUser.email)
    await passwordField.fill(validUser.password)
    await confirmPasswordField.fill(validUser.password)
    await registerButton.click()
    await expect(garageHeading).toHaveText("Garage")


})