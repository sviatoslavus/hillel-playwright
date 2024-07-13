import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SignUpModal } from "./Components/SignUpModal";
import { SignInModal } from "./Components/SignInModal";
import { GaragePage } from "./GaragePage";

const validUser = {
    name: "Sviat",
    lastName: "Peralta",
    email: "aqa-sviat.peralta@test.com",
    password: "Qauto123"
}
export class HomePage extends BasePage{

    protected readonly _signUpButton:Locator
    protected readonly _signInButton:Locator
    protected readonly _signInModal:SignInModal


    constructor(page: Page){
        super(page, '/')
        this._signUpButton = this._page.getByRole('button', {name:"Sign Up"})
        this._signInButton = this._page.getByRole('button', {name:"Sign In"})
        this._signInModal = new SignInModal(this._page)
    }

   async navigate(){
        return this._page.goto(this._url)
    }

    async openSignUpModal(){
        await this._signUpButton.click()
        return new SignUpModal(this._page)
    }
    async signInAsUser(user:Object){
        await this._signInButton.click()
        await this._signInModal.signIn(user)
    }


    get signUpButton(){
        return this._signUpButton
    }
}