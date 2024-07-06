import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SignUpModal } from "./Components/SignUpModal";

export class HomePage extends BasePage{

    protected readonly _singUpButton:Locator


    constructor(page: Page){
        super(page, '/')
        this._singUpButton = this._page.getByRole('button', {name:"Sign Up"})
    }

   async navigate(){
        return this._page.goto(this._url)
    }

    async openSignUpModal(){
        await this._singUpButton.click()
        return new SignUpModal(this._page)
    }


    get signUpButton(){
        return this._singUpButton
    }
}