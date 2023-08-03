class RadioButton {
    constructor(page){

        this.mainHeader = page.locator(".main-header");
        this.yesRadioButton = page.locator("//label[normalize-space()='Yes']");
        this.afterClickYesRadio = page.locator("//input[@id='yesRadio']");
        this.succesText = page.locator("//span[@class='text-success']");
        this.impressiveRadioButton = page.locator("//label[@for='impressiveRadio']");
        this.afterClickImpressiveRadio = page.locator("//input[@id='impressiveRadio']");
        this.noRadioButton = page.locator("input[type='radio']").nth(2);
    }

    async getMainHeader(){
        
        return await this.mainHeader.textContent();
    }
    async checkYesRadio(){

        await this.yesRadioButton.click();
    }
    async isYesRadiochecked(){

        return this.afterClickYesRadio;
    }
    async getSuccessText(){

        return this.succesText;
    }
    async checkImpressiveRadio(){

        await this.impressiveRadioButton.click();
    }
    async isImpressiveRadiochecked(){

        return this.afterClickImpressiveRadio;
    }
    async isNoRadioDisabled(){

        const disabledRadio = await this.noRadioButton.isDisabled();
        return disabledRadio;
    }



}

module.exports = {RadioButton}