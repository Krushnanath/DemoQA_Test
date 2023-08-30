const { test, expect } = require("@playwright/test");
const { DemoqaPage } = require("../pageObjects/demoqaPage");
const { CheckBox } = require("../pageObjects/checkBox");
const { RadioButton } = require("../pageObjects/RadioButton");
const { Table } = require("../pageObjects/TablePage");
const { Buttons } = require("../pageObjects/ButtonsPage");
const { Links } = require("../pageObjects/LinksPage");
const { Images } = require("../pageObjects/ImagePage");
const { UploadDownloads } = require("../pageObjects/UploadDownloadPage");
const { Forms } = require("../pageObjects/FormsPage");
const { PopupEvents } = require("../pageObjects/PopupEvents");

test("has title", async ({ page }) => {
  const demoqaPage = new DemoqaPage(page);
  await demoqaPage.gotoHomePage();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DEMOQA/);
});

test("Text Box Test", async ({ page }) => {
  const demoqaPage = new DemoqaPage(page);
  await demoqaPage.gotoHomePage();
  await demoqaPage.gotoElementsBlock();
  await demoqaPage.gotoTextBox();
  const mainheadertext = await demoqaPage.getMainHeader();
  await expect(mainheadertext).toContain("Text Box");
  const nameInput = await demoqaPage.getTextBoxInput();
  const emailInput = await demoqaPage.getEmailInput();
  const currentAddress = await demoqaPage.getCurrentAddressInput();
  const permanentAddress = await demoqaPage.getPermanentAddressInput();
  await expect(emailInput).toHaveAttribute("placeholder", /name@example.com/);
  await expect(currentAddress).toHaveAttribute(
    "placeholder",
    /Current Address/
  );
  await nameInput.click();
  await nameInput.type("Test Name");
  await emailInput.click();
  await emailInput.type("testName@test.com");
  await currentAddress.click();
  await currentAddress.type("At Pune");
  await permanentAddress.click();
  await permanentAddress.type("At VimanNager");
  await demoqaPage.getSubmitButton();
  await expect(page.locator("//p[@id='name']")).toContainText(/Name:Test Name/);
  await expect(page.locator("//p[@id='email']")).toContainText(
    /Email:testName@test.com/
  );
  await expect(page.locator("//p[@id='currentAddress']")).toContainText(
    /Current Address :At Pune/
  );
  await expect(page.locator("//p[@id='permanentAddress']")).toContainText(
    /Permananet Address :At VimanNager/
  );
});

//////////  Verify and Test Check Box element funcationality   ////////////////////////

test("Check Box Test", async ({ page }) => {
  await page.goto("https://demoqa.com/elements");
  await page.getByText(/Check Box/).click();
  await expect(page.locator(".main-header")).toContainText(/Check Box/);
  const checkBox = new CheckBox(page);
  await checkBox.expandAllToggle();
  await page.getByText("Desktop").click();
  await page.getByText("React").click();
  await page.getByText("Classified").click();
  await page.getByText("General").click();
  await page.getByText("Excel File").click();

  const matchingResult = await checkBox.matchWithSelection();
  console.log(matchingResult);
  expect(matchingResult).toBeTruthy();
});

/////////// Test and examine the Radio button  /////////////////////////////

test("Radio Buttons Test", async ({ page }) => {
  await page.goto("https://demoqa.com/radio-button");

  const radioButton = new RadioButton(page);
  const mainHeader = await radioButton.getMainHeader();
  expect(mainHeader).toContain("Radio Button");
  // await page.pause();

  await radioButton.checkYesRadio();
  let ischecked = await radioButton.isYesRadiochecked();
  await expect(ischecked).toBeChecked();
  let successText = await radioButton.getSuccessText();
  await expect(successText).toContainText("Yes");
  await radioButton.checkImpressiveRadio();
  ischecked = await radioButton.isImpressiveRadiochecked();
  await expect(ischecked).toBeChecked();
  successText = await radioButton.getSuccessText();
  await expect(successText).toContainText("Impressive");
  const isDisabled = await radioButton.isNoRadioDisabled();
  await expect(isDisabled).toBeTruthy();
});

////////////// Verify and examine Web Tables functionality  ////////////////////////

test("Web Tables Test", async ({ page }) => {
  const tables = new Table(page);
  const url = "https://demoqa.com/webtables";
  await tables.gotoPage(url);
  const mainHeader = await tables.getMainHeader();
  await expect(mainHeader).toHaveText("Web Tables");
  /// Checking all table first column all data
  const initialFirstColumnData = await tables.getFirstColumnData();
  // Adding new Row to the Table
  await tables.addNewRecord();
  // checking again table data if new value is appered in row
  const afterFirstColumnData = await tables.getFirstColumnData();
  console.log("Initial Table Data: ", initialFirstColumnData);
  console.log("After add new Record, Table Data: ", afterFirstColumnData);
  expect(initialFirstColumnData.length + 1).toEqual(
    afterFirstColumnData.length
  );
});

////// Verify table edit functionality  /////////////////////////////////////

test("Table Edit Function", async ({ page }) => {
  await page.goto("https://demoqa.com/webtables");
  const tables = new Table(page);
  const mainHeader = await tables.getMainHeader();
  await expect(mainHeader).toHaveText("Web Tables");
  /// Checking all table first column all data
  const initialFirstColumnData = await tables.getFirstColumnData();
  console.log("Initial Table Data: ", initialFirstColumnData);
  await tables.addNewRecord();
  const afterFirstColumnData = await tables.getFirstColumnData();
  console.log("After Row Addingtion: ", afterFirstColumnData);
  const newSalaray = "50000";
  // we are editing the record with name test finding respective record
  const recordNumber = await tables.findOutRowNum(afterFirstColumnData);
  //editing respective record with new Salaray
  await tables.editRow(recordNumber, newSalaray);
  const updatedSalary = await tables.getUpdatedSalary(recordNumber);
  expect(updatedSalary[0]).toEqual(newSalaray);
});

/////////// Verifying  Delete button functionality  ////////////////////////
test("Table Delete button Functionality", async ({ page }) => {
  const tables = new Table(page);
  await page.goto("https://demoqa.com/webtables");

  const mainHeader = await tables.getMainHeader();
  await expect(mainHeader).toHaveText("Web Tables");
  /// Checking all table first column all data
  const initialFirstColumnData = await tables.getFirstColumnData();
  //adding new row
  await tables.addNewRecord();
  /// checking again table data if new value is appered in row
  const afterFirstColumnData = await tables.getFirstColumnData();
  // finding out the element row number with name Test to be Deleted
  const recordNumber = await tables.findOutRowNum(afterFirstColumnData);
  //clicking on Delete button of respective row:
  await tables.clickDeleteButtonOfRecord(recordNumber);
  const afterDeleteFirstColumnData = await tables.getFirstColumnData();
  console.log("Intial Table Data: ", initialFirstColumnData);
  console.log("After Row Addition Table Data: ", afterFirstColumnData);
  console.log("Record Number to be Deleting: ", recordNumber);
  console.log("After Delete Record Table Data: ", afterDeleteFirstColumnData);
  //testing that record with name 'Test' deleted and count of Table record reduced by 1
  expect(afterDeleteFirstColumnData.includes("Test")).toBeFalsy();
  expect(
    afterFirstColumnData.length - 1 === afterDeleteFirstColumnData.length
  ).toBeTruthy();
});

//////// Test and examine the table serach functionality  /////////////////////

test("Table Search Test", async ({ page }) => {
  const tables = new Table(page);
  await page.goto("https://demoqa.com/webtables");

  const mainHeader = await tables.getMainHeader();
  await expect(mainHeader).toHaveText("Web Tables");
  /// Checking  table first column all data
  const initialFirstColumnData = await tables.getFirstColumnData();
  //adding new row with name Test
  await tables.addNewRecord();
  // adding one more row with name 'TestName
  await tables.addSecondRecord();
  /// checking again table data if new value is appered in row
  const afterFirstColumnData = await tables.getFirstColumnData();
  ///starting search
  const searchValue = "test";
  await tables.startSearching(searchValue);
  const afterSearchFirstColumnData = await tables.getFirstColumnData();
  console.log("Initial Table Data: ", initialFirstColumnData);
  console.log("After records Addition Table Data: ", afterFirstColumnData);
  console.log("Search Value :", searchValue);
  console.log("After search table Data : ", afterSearchFirstColumnData);
  //Testing if table only inclues searchvalue Records
  const isTableIncluesOnlySeachValue = await tables.confirmSearchData(
    afterSearchFirstColumnData,
    searchValue
  );
  expect(isTableIncluesOnlySeachValue).toBeTruthy();
});

/////// Test and Examine the buttons different clicks functionality  ////////////////////

test("Button Clicks Test", async ({ page }) => {
  await page.goto("https://demoqa.com/buttons");
  const buttons = new Buttons(page);
  const requiredDblClickMessage = "You have done a double click";
  const requiredRightClkMessage = "You have done a right click";
  const requiredDynamicButtonClkMessage = "You have done a dynamic click";
  const mainHeader = await buttons.getMainHeader();
  //checking we are on right page.
  await expect(mainHeader).toHaveText("Buttons");
  /// checking the doubleClcik functionality.
  await buttons.performDoubleClick();
  const dblClickMessage = await buttons.getdblClickMessage();
  //checking the message appearred or not
  expect(dblClickMessage).toContain(requiredDblClickMessage);
  //cheking right click functionality
  await buttons.performRightClick();
  const rightClickMessage = await buttons.getRightClickMessage();
  expect(rightClickMessage).toContain(requiredRightClkMessage);
  //Dynamic id buttons  click functionality check
  // await page.locator(`button:has-text("${buttonText}")`).nth(2).click();  or simple is below
  await buttons.performDynamicButtonClk();
  const dynamicClickMessage = await buttons.getDynamicBtnMessage();
  await page.locator("//button[@class='btn btn-primary']").nth(2).click(); // as it is third button
  // you can use nth of last too as it is las button too.
  expect(dynamicClickMessage).toContain(requiredDynamicButtonClkMessage);
});

////////////////////// Test and Verify the links there functionality //////////////////

test("Test the different links functionality", async ({ page }) => {
  await page.goto("https://demoqa.com/links");
  const links = new Links(page);
  const mainHeader = await links.getMainHeader();
  await expect(mainHeader).toHaveText("Links");
  // tesing simple link that opens new tab
  const isNewWindowOpened = await links.openNewWindowLink();
  expect(isNewWindowOpened).toBeTruthy();

  /// checking links that sends the API call
  const isApiLinkResponded = await links.openApiLink();
  console.log(isApiLinkResponded);
  expect(isApiLinkResponded).toBeTruthy();
  // next link to test
  /// below part is neccesory for the creating simulated responce that actual site gives. needed for playwright.
  const isNoContentLinkResponded = await links.openNoContentLink();
  expect(isNoContentLinkResponded).toBeTruthy();

  /// next link to be checked:
  const isMovedApilinkResponnded = await links.openMovedPermanentlyLink();
  expect(isMovedApilinkResponnded).toBeTruthy();
});

//////////////////////////// test and verify Broken link - Images ////////////////////////////

test("Test Broken links and Image", async ({ page }) => {
  await page.goto("https://demoqa.com/broken");
  const images = new Images(page);
  const mainHeader = await images.getMainHeader();
  // checking we are on right page
  await expect(mainHeader).toEqual("Broken Links - Images");

  const allImageURL = await images.getAllImageURL();
  //checking if every source of the image working properly by opeing src in new tab
  const isAnyImageBroken = await images.checkImageURL(allImageURL);

  // Adding assertion on the all imges

  expect(isAnyImageBroken).toBeFalsy();
});

////////////////// Check and Verify the Download and upload functionality //////////////
test("Test Download and upload button", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download");

  const upDownloads = new UploadDownloads(page);
  const mainHeader = await upDownloads.getMainHeader();
  // checking we are on the right page
  await expect(mainHeader).toEqual("Upload and Download");

  //checking if the download starts when we click on the download link
  const isDownloadStarted = await upDownloads.startDownload();
  await expect(isDownloadStarted).toBeTruthy();
});

/////////////////// Test and verify upload file functionality /////////////////

test("Test Upload file functionality", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download"); // Replace this with the URL of your website

  const uploads = new UploadDownloads(page);
  const mainHeader = await uploads.getMainHeader();
  // checking we are on the right page
  await expect(mainHeader).toEqual("Upload and Download");
  //checking if the upload input visible and enbled
  const fileUploadInput = await uploads.getFileInputSection();
  
  expect(await fileUploadInput.isVisible()).toBe(true);
  expect(await fileUploadInput.isEnabled()).toBe(true);

  // Set the file path for upload
  const filePath = "c:/Users/krushnath.dhongade/Downloads/sampleFile.JPEG"; // Replace this with the actual file path
  const isFileUploaded = await uploads.uploadFile(filePath);
  await expect(isFileUploaded).toBeTruthy();
});

///////////////////// Test and verify Form functionality  //////////////////////////

test("Test Form opertaions", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  const forms = new Forms(page);
  //cheking we are on the right page
  const mainHeader = await forms.getMainHeader();
  expect(mainHeader).toEqual("Practice Form");
  const isformfilled = await forms.fillForm();
  await expect(isformfilled).toBeTruthy();
  // checking for validation of data entered in form
  const isValidated = await forms.validateFormSubmissionOutput();
  await expect(isValidated).toBeTruthy();
});

///////////////////// Test and verify browser window   //////////////////////////

test.only("Test Browser window functionality", async({page, browser}) => {
  

  await page.goto("https://demoqa.com/browser-windows");

  const popupEvents = new PopupEvents(page);
  // checking we are on the right page
  const mainHeader = await popupEvents.getMainHeader();
  await expect(mainHeader).toEqual("Browser Windows");

  // checking if the new tab opended.
  const isNewTabBtnWorked = await popupEvents.clickBtn('NewTab');
  expect(isNewTabBtnWorked).toBeTruthy();
  // checking for new window opened
  const isNewWindowBtnWorked = await popupEvents.clickBtn('NewWindow');
  expect(isNewWindowBtnWorked).toBeTruthy();
  // checking for the new window message
  const isMsgWindowBtnWorked = await popupEvents.clickBtn('MsgWindow');
  expect(isMsgWindowBtnWorked).toBeTruthy();

  
});
// test and verify download button functonality 
