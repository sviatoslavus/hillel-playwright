import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SideBar } from "./Components/SideBarComponent";

export class GaragePage extends BasePage{

    protected readonly _garageHeading:Locator
    protected readonly _addCarBtn: Locator
    protected readonly _addCarModal: Locator
    protected readonly _addCarBrandSelect: Locator
    protected readonly _addCarModelSelect: Locator
    protected readonly _mileageInput: Locator
    protected readonly _addBtn: Locator
    protected readonly _carItem: Locator
    protected readonly _sideBar:SideBar
    
    constructor(page:Page){
        super(page, 'panel/garage')
        this._garageHeading = page.getByRole("heading", {name:"Garage"})
        this._addCarModal = page.locator('.modal-content')
        this._addCarBrandSelect = this._addCarModal.locator('#addCarBrand')
        this._addCarModelSelect = this._addCarModal.locator('#addCarModel')
        this._mileageInput = this._addCarModal.locator('input[formcontrolname="mileage"]')
        this._addCarBtn = page.getByRole('button', {name: 'Add Car'})
        this._addBtn = this._addCarModal.getByRole('button', {name: 'Add'})
        this._carItem = this._page.locator('.car-item')
        this._sideBar = new SideBar(this._page)
    }

    async selectBrand(brand: 'Audi'| 'BWM' | 'Ford' | 'Porsche' | 'Fiat'){
        return this._addCarBrandSelect.selectOption(brand)
      }


    async addCar(brand: 'Audi'| 'BWM' | 'Ford' | 'Porsche' | 'Fiat', model: '911' | 'TT', mileage: number){
        await this._addCarBtn.click()
        await this.selectBrand(brand)
        await this._addCarModelSelect.selectOption(model)
        await this._mileageInput.fill(mileage.toString())
        await this._addBtn.click()
      }
    get garageHeading(){
        return this._garageHeading
    }
    get addCarBtn(){
        return this._addCarBtn
      }
      get addCarModelSelect(){
        return this._addCarBrandSelect
      }
    
      get mileageInput(){
        return this._mileageInput
      }
    
      get addBtn(){
        return this._addBtn
      }
    
      get carItem(){
        return this._carItem
      }
      get sideBar(){
        return this._sideBar
      }
    

}