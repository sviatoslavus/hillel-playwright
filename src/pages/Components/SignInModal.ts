import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { GaragePage } from "../GaragePage";

export class SignInModal extends BaseComponent{
    protected readonly _emailField:Locator
    protected readonly _passwordField:Locator
    protected readonly _rememberMeCheckbox:Locator
    protected readonly _loginButton:Locator
    protected readonly _forgotPasswordButton:Locator
    protected readonly _closeButton:Locator

    constructor(page:Page){
        super(page, page.locator('.modal-content > app-signin-modal'))
        this._emailField = this._container.getByLabel('Email')
        this._passwordField = this._container.getByLabel('Password')
        this._rememberMeCheckbox = this._container.getByLabel('Remember me')
        this._loginButton = this._container.getByRole('button', {name:'Login'})
        this._forgotPasswordButton = this._container.getByRole('button', {name: 'Forgot Password'})
        this._closeButton = this._container.getByLabel('Close')
    }
    async signIn(user:Object){
        await this._emailField.fill(user['email'])
        await this._passwordField.fill(user['password'])
        await this._rememberMeCheckbox.check()
        await this._loginButton.click()
    }

}






//getByLabel('Email')