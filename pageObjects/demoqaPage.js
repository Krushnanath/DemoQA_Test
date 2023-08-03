// demoqaPage.js
class DemoqaPage {
  constructor(page) {
    this.page = page;
    this.elementsBlock = page.locator("(//h5)[1]");
    this.mainHeader = page.locator(".main-header");
  }
  async getMainHeader() {
    
    const mainheadertext = await this.mainHeader.allTextContents();
    console.log(mainheadertext);
    return mainheadertext;
    
  }

  async gotoHomePage() {
    await this.page.goto("https://demoqa.com");
  }

  async gotoElementsBlock() {
    //const elementsBlock = await this.page.locator("(//h5)[1]");
    await this.elementsBlock.click();
  }

  async gotoTextBox() {
    await this.page.getByText("Text Box").click();
  }

  async getTextBoxInput() {
    return await this.page.locator("#userName");
  }

  async getEmailInput() {
    return await this.page.locator("#userEmail");
  }

  async getCurrentAddressInput() {
    return await this.page.locator("#currentAddress");
  }

  async getPermanentAddressInput() {
    return await this.page.locator("#permanentAddress");
  }

  async getSubmitButton() {
    return await this.page.locator("#submit").click();
  }
}
module.exports = { DemoqaPage };
