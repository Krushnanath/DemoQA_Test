class Forms {
    constructor(page) {
        this.page = page;
        this.mainHeader = page.locator(".main-header");
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.emailaddress = page.getByPlaceholder("name@example.com");
        this.gender = page.getByText("Male", { exact: true });
        this.mobileNumer = page.getByPlaceholder("Mobile Number");
        this.DOBInput = page.locator("#dateOfBirthInput");
        this.selectYear = page.getByRole("combobox").nth(1);
        this.selectMonth = page
            .locator("div")
            .filter({
                hasText:
                    /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/,
            })
            .getByRole("combobox");
        this.selectFinalDate = page.getByLabel("Choose Friday, April 4th, 1997");
        this.subjectOption = page.locator(
            ".subjects-auto-complete__value-container"
        );
        this.subjectInput = page.locator("#subjectsInput");
        this.selectMath = page.getByText("Maths", { exact: true });
        this.selectPhysics = page.getByText("Physics", { exact: true });
        this.selectChemestry = page.getByText("Chemistry", { exact: true });
        this.selectEnglish = page.getByText("English", { exact: true });
        this.selectSportOption = page.getByText("Sports");
        this.selectMusicOption = page.getByText("Music");
        this.fileInput = page.locator("//input[@id='uploadPicture']");
        this.fileInputXpath = "//input[@id='uploadPicture']";
        this.filePath = "c:/Users/krushnath.dhongade/Downloads/sampleFile.JPEG";
        this.currentAddress = page.getByPlaceholder("Current Address");
        this.randomArea = page.locator(
            "(//span[contains(@class,'group-header')])[6]"
        );
        this.state = page.locator("//div[@id='state']");
        this.ncrOption = page.getByText("NCR", { exact: true });
        this.city = page.locator("//div[@id='city']");
        this.delhiCity = page.getByText("Delhi", { exact: true });
        this.submitButton = page.locator("//button[@id='submit']");
        this.formSubmissionFeedback = page.locator("//div[@class='modal-header']");
        // creating an array for comparisons for the desired input
        this.inputHeaders = [
            "Student Name",
            "Student Email",
            "Gender",
            "Mobile",
            "Date of Birth",
            "Subjects",
            "Hobbies",
            "Picture",
            "Address",
            "State and City",
        ];
        this.inputValues = [
            "Kishan D",
            "Kishan@email.com",
            "Male",
            "1234567890",
            "04 April,1997",
            "Maths, Physics, Chemistry, English",
            "Sports, Music",
            "sampleFile.JPEG",
            "pune",
            "NCR Delhi",
        ];
        this.resultInputHeaders = page.locator("(//tr)//td[1]");
        this.resultInputValues = page.locator("(//tr)//td[2]");
    }
    async getMainHeader() {
        const mainHeaderText = this.mainHeader.textContent();
        return mainHeaderText;
    }
    async fillForm() {
        await this.firstName.fill("Kishan");

        await this.lastName.fill("D");

        await this.emailaddress.fill("Kishan@email.com");
        await this.gender.click();
        await this.mobileNumer.fill("1234567890");
        await this.DOBInput.click();
        await this.selectYear.selectOption("1997");
        await this.selectMonth.selectOption("3");
        await this.selectFinalDate.click();
        await this.subjectOption.click();
        await this.subjectInput.fill("m");
        await this.selectMath.click();
        await this.subjectInput.fill("ph");
        await this.selectPhysics.click();
        await this.subjectInput.fill("che");
        await this.selectChemestry.click();
        await this.subjectInput.fill("en");
        await this.selectEnglish.click();
        await this.selectSportOption.click();
        await this.selectMusicOption.click();
        //checking fileinput
        if (
            (await this.fileInput.isVisible()) &&
            (await this.fileInput.isEnabled())
        ) {
        } else return false;

        // Set the file path for upload
        // Replace this with the actual file path
        await this.page.setInputFiles(this.fileInputXpath, this.filePath);
        await this.currentAddress.fill("pune");
        // due to some issue with the site ui, doing next click
        await this.randomArea.click();
        await this.state.click();

        await this.ncrOption.click();
        await this.city.click();
        await this.delhiCity.click();
        await this.submitButton.click();
        // sending flag that form has been filled
        return true;
    }
    async validateFormSubmissionOutput() {
        //checking for form submission feedback appeard
        const formFeedback = await this.formSubmissionFeedback.textContent();
        console.log("feedback Text: ", formFeedback);
        if (formFeedback.includes("Thanks for submitting the form")) {
        } else return false;

        // creating an array  for comparison with result data appeared
        //(//tr[1])//td[1]
        const resultInputHeaders = await this.resultInputHeaders.allTextContents();
        const resultInputValues = await this.resultInputValues.allTextContents();
        //console.log("Resultinput : ", resultInputHeaders, "ResultInputValues : ", resultInputValues);

        // asserting each value for each array comparison
        const isHeadersEqual =
            JSON.stringify(this.inputHeaders) === JSON.stringify(resultInputHeaders);
        console.log(isHeadersEqual);
        console.log(
            "InputHeaders: ",
            this.inputHeaders,
            "Result Input Headers: ",
            resultInputHeaders
        );

        //assertion for values entered
        const isValuesEqual =
            JSON.stringify(this.inputValues) === JSON.stringify(resultInputValues);
        console.log(isValuesEqual);
        console.log(
            "Input Values: ",
            this.inputValues,
            "Result input values : ",
            resultInputValues
        );
        if (isHeadersEqual && isValuesEqual) {
            return true;
        } else return false;
    }
}
module.exports = { Forms };
