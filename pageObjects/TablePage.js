class Table{

    constructor(page){

        this.page = page;
        this.mainHeader = page.locator(".main-header");
        this.tableFirstColumnData = page.locator("//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]");
        this.addRecordButton = page.locator("//button[@id='addNewRecordButton']");
        this.FirstNameInput = page.locator("//input[@id='firstName']");
        this.LastNameInput = page.locator("//input[@id='lastName']");
        this.EmailInput = page.locator("//input[@id='userEmail']");
        this.ageInput = page.locator("//input[@id='age']");
        this.salarayInput = page.locator("//input[@id='salary']");
        this.departmentInput = page.locator("//input[@id='department']");
        this.submitButton = page.locator("//button[@id='submit']");


    }
    async gotoPage(url){

        await this.page.goto(url);
    }
    async getMainHeader(){

        return this.mainHeader;
    }
    async getFirstColumnData(){

        let firstColumnData = await this.tableFirstColumnData.allTextContents(); 
        firstColumnData = firstColumnData.filter((item) => item.trim() !== ""); /// removing empty elements
        firstColumnData.shift(); //// removing fist element as it is header.
        return firstColumnData;
    }
    async addNewRecord(){
        await this.addRecordButton.click();
        await this.FirstNameInput.type("Test");
        await this.LastNameInput.type("Name");
        await this.EmailInput.type("testname@test.com");
        await this.ageInput.type("20");
        await this.salarayInput.type("30000");
        await this.departmentInput.type("Comp");
        await this.submitButton.click();
    }
    async findOutRowNum(afterFirstColumnData){
        let check = [];
       // let resultRow = 0;
        // Finding out the row number of new record entered.
        for (let i = 1; i <= afterFirstColumnData.length; i++) {
            check = await this.page.locator(`div.rt-tbody > div.rt-tr-group:nth-child(${i}) > div[role="row"] > div:nth-child(1)`).allTextContents();
            if (check[0] == "Test") {
                return i; 
                
            }
        }
    }
    async editRow(editRowNum,newSalaray){

        await this.page.locator(`//span[@id='edit-record-${editRowNum}']`).click();
        await this.salarayInput.fill(newSalaray);
        await this.submitButton.click();
    }
    async getUpdatedSalary(recordNumber){

        let updatedSalary = await this.page
        .locator(
        `div.rt-tbody > div.rt-tr-group:nth-child(${recordNumber}) > div[role="row"] > div:nth-child(5)`
        )
        .allTextContents();
        console.log("Udated Salary : ",updatedSalary);
        return updatedSalary;

    }
}
module.exports = {Table};