import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class SideBar extends BaseComponent {
    protected readonly _garageBtn:Locator
    protected readonly _fuelExpensesBtn:Locator
    protected readonly _instructionBtn:Locator
    protected readonly _settingsBtn:Locator
    protected readonly _profileBtn:Locator
    protected readonly _logoutBtn:Locator
    


    constructor(page:Page){
        super(page, page.getByText('Garage Fuel expenses'))
        this._garageBtn = this._container.getByRole('link', { name: 'Garage' })
        this._fuelExpensesBtn = this._container.getByRole('link', {name: 'Fuel Expenses'})
        this._instructionBtn = this._container.getByRole('link', {name: 'Instructions'})
        this._settingsBtn = this._container.getByRole('link', {name: 'Settings'})
        this._profileBtn = this._container.getByRole('link', {name: 'Profile'})
        this._logoutBtn = this._container.locator('.icon-logout')

    }
    get garageBtn(){
        return this._garageBtn
    }
    get fuelExpensesBtn(){
        return this._fuelExpensesBtn
    }
    get instructionBtn(){
        return this._instructionBtn
    }
    get settingsButton(){
        return this._settingsBtn
    }
    get profileButton(){
        return this._profileBtn
    }
    get logoutButton(){
        return this._logoutBtn
    }
}