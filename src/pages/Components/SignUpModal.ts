import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { GaragePage } from "../GaragePage";


export class SignUpModal extends BaseComponent{
    errorReasons = ['longName', 'longLastName', 'passwordNotMatch', 'empty' ]

    protected readonly _signUpNameField:Locator
    protected readonly _signUpLastNameField:Locator
    protected readonly _emailField:Locator
    protected readonly _passwordField:Locator
    protected readonly _confirmPasswordField:Locator
    protected readonly _registerButton:Locator
    protected readonly _errorLabel:Locator
    protected readonly _nameTooLongLabel:Locator
    protected readonly _passwordsNotMatchLabel:Locator

    constructor(page:Page){
        super(page, page.locator('.modal-content > app-signup-modal:nth-child(1)'))
        this._signUpNameField = this._container.locator('#signupName')
        this._signUpLastNameField = this._container.locator('#signupLastName')
        this._emailField = this._container.getByLabel('Email')
        this._passwordField = this._container.getByLabel('Password', {exact:true})
        this._confirmPasswordField = this._container.getByLabel('Re-enter Password')
        this._registerButton = this._container.getByRole('button', {name:"Register"})
        this._errorLabel = this._container.getByText('User already exists')
        this._nameTooLongLabel = this._container.getByText('Name has to be from 2 to 20')
        this._passwordsNotMatchLabel = this._container.getByText('Passwords do not match')
    }


    async signUp(object:Object){
        await this._signUpNameField.fill(object['name'])
        await this._signUpLastNameField.fill(object['lastName'])
        await this._emailField.fill(object['email'])
        await this._passwordField.fill(object['password'])
        await this._confirmPasswordField.fill(object['password'])
        await this._registerButton.click()  
        return new GaragePage(this._page)
    }
    async invalidSignUp(object:Object, reason:'longName'|'longLastName'|'passwordNotMatch'|'empty'){
        if(reason == 'longName'){
            await this._signUpNameField.fill(object['longName'])
            await this._container.click()
        }
        if(reason == 'longLastName'){
            await this._signUpLastNameField.fill(object['longName'])
            await this._container.click()
        }
        if(reason == 'passwordNotMatch'){
            await this._passwordField.fill(object['password'])
            await this._confirmPasswordField.fill(object['passwordNoMatch'])
            await this._container.click()
        }
        if(reason == 'empty'){
            await this._container.click()
        }  
    }
    get signUpNameField(){
        return this._signUpNameField
    }

    get errorLabel(){
        return this._errorLabel
    }
    get registerButton(){
        return this._registerButton
    }
    get nameTooLongLabel(){
        return this._nameTooLongLabel
    }
    get passwordNotMatchLabel(){
        return this._passwordsNotMatchLabel
    }
    
}