import  { test, expect } from "@playwright/test"

const validUser = {
    name: "Sviat",
    lastName: "Peralta",
    email: "aqa-sviat.peralta@test.com",
    password: "Qauto123"
}
const invalidUser = {
    longtName: "veryverylongnamemorethantwentyletters",
    email: "bademail.com",
    shortPassword: "one",
    passwordNoMatch:"Qauto122"
}

test.beforeEach(async ({page})=>{
    await page.goto('/')
})



test("user is able to register with valid credentials",{tag:'@positive'} , async ({page})=>{
    
    const signUpButton = page.getByRole('button', {name:"Sign Up"})
    const signUpName = page.locator('#signupName')
    const signUpLastNameField = page.locator('#signupLastName')
    const emailField = page.getByLabel('Name')
    const passwordField = page.getByLabel('Password', {exact:true})
    const confirmPasswordField = page.getByLabel('Re-enter Password')
    const registerButton = page.getByRole('button', {name:"Register"})
    const garageHeading =  page.getByRole("heading", {name:"Garage"})

    
    
    await signUpButton.click()
    await signUpName.fill(validUser.name)
    await signUpLastNameField.fill(validUser.lastName)
    await emailField.fill(validUser.email)
    await passwordField.fill(validUser.password)
    await confirmPasswordField.fill(validUser.password)
    await registerButton.click()
    await expect(garageHeading).toHaveText("Garage")
    // const response =  await request.delete('https://qauto.forstudy.space/api/users')
    // console.log(response.status);

})
test('user is not able to sign up with existing credentials',{tag:'@negative'} , async({page})=>{
    const signUpButton = page.getByRole('button', {name:"Sign Up"})
    const signUpName = page.locator('#signupName')
    const signUpLastNameField = page.locator('#signupLastName')
    const emailField = page.getByLabel('Name')
    const passwordField = page.getByLabel('Password', {exact:true})
    const confirmPasswordField = page.getByLabel('Re-enter Password')
    const registerButton = page.getByRole('button', {name:"Register"})

    const errorLabel = page.getByText('User already exists')

    await signUpButton.click()
    await signUpName.fill(validUser.name)
    await signUpLastNameField.fill(validUser.lastName)
    await emailField.fill(validUser.email)
    await passwordField.fill(validUser.password)
    await confirmPasswordField.fill(validUser.password)
    await registerButton.click()
    await expect(errorLabel).toBeVisible()
})

test('the Register button is disabled if no fields are filled ',{tag:'@negative'} , async ({page})=> {
    const signUpButton = page.getByRole('button', {name:"Sign Up"})
    const registerButton = page.getByRole('button', {name:"Register"})


    
    await signUpButton.click()
    expect(registerButton).toBeDisabled()
})

test('error is displayed if the name is too long', async({page})=>{
    const signUpButton = page.getByRole('button', {name:"Sign Up"})
    const signUpName = page.locator('#signupName')
    const signUpLastNameField = page.locator('#signupLastName')
    const emailField = page.getByLabel('Name')
    const passwordField = page.getByLabel('Password', {exact:true})
    const nameTooLongLable = page.getByText('Name has to be from 2 to 20')

    
    await signUpButton.click()
    await signUpName.fill(invalidUser.longtName)
    await signUpLastNameField.click()
    await expect(nameTooLongLable).toBeVisible()

})
test('error is displayed if the last name is too long', async({page})=>{
    const signUpButton = page.getByRole('button', {name:"Sign Up"})
    const signUpName = page.locator('#signupName')
    const signUpLastNameField = page.locator('#signupLastName')
    const emailField = page.getByLabel('Name')
    const passwordField = page.getByLabel('Password', {exact:true})
    const nameTooLongLable = page.getByText('Name has to be from 2 to 20')

    
    await signUpButton.click()
    await signUpLastNameField.fill(invalidUser.longtName)
    await signUpName.click()
    await expect(nameTooLongLable).toBeVisible()

})
test('error is displayed if the confirmation password is not matched', async({page})=>{
    const signUpButton = page.getByRole('button', {name:"Sign Up"})
    const signUpName = page.locator('#signupName')
    const signUpLastNameField = page.locator('#signupLastName')
    const emailField = page.getByLabel('Name')
    const passwordField = page.getByLabel('Password', {exact:true})
    const confirmPasswordField = page.getByLabel('Re-enter Password')
    const passwordMismatchLabel = page.getByText('Passwords do not match')



    
    await signUpButton.click()
    await signUpName.fill(validUser.name)
    await signUpLastNameField.fill(validUser.lastName)
    await emailField.fill(validUser.email)
    await passwordField.fill(validUser.password)
    await confirmPasswordField.fill(invalidUser.passwordNoMatch)
    await emailField.click()
    await expect(passwordMismatchLabel).toBeVisible()
   

})