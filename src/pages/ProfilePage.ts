import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";




export class ProfilePage extends BasePage{
    protected readonly _profileHeading:Locator
    protected readonly _editProfile:Locator
    protected readonly _profileName:Locator
    protected readonly _profileImage:Locator
    protected readonly _sideBar:Locator

    constructor(page:Page){
        super(page, '/panel/profile')
        this._profileHeading = this._page.getByRole('heading', {name: 'Profile'})
        this._editProfile = this._page.getByRole('button', {name: 'Edit Profile'})
        this._profileImage = this._page.locator('app-profile').getByRole('img', { name: 'User photo' })
        this._profileName = this._page.locator('.profile_name')
    }
    get profileName(){
        return this._profileName
    }
}