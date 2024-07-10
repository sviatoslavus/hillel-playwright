import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GaragePage extends BasePage{

    protected readonly _garageHeading:Locator
    
    constructor(page:Page){
        super(page, 'panel/garage')
        this._garageHeading = page.getByRole("heading", {name:"Garage"})
    }
    get garageHeading(){
        return this._garageHeading
    }
}