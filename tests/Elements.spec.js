const { test, expect } = require("@playwright/test");
const { DemoqaPage } = require("../pageObjects/demoqaPage");
const { CheckBox } = require("../pageObjects/checkBox");
const { RadioButton } = require("../pageObjects/RadioButton");


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

test.only("Radio Buttons Test", async ({ page }) => {
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
  await page.goto("https://demoqa.com/webtables");

  await expect(page.locator(".main-header")).toHaveText("Web Tables");

  /// Checking all table first column all data
  let tableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  tableData = tableData.filter((item) => item.trim() !== ""); /// removing empty elements
  tableData.shift(); //// removing fist element as it is header.
  console.log(tableData);

  //adding new row
  await page.locator("//button[@id='addNewRecordButton']").click();
  await page.locator("//input[@id='firstName']").type("Test");
  await page.locator("//input[@id='lastName']").type("Name");
  await page.locator("//input[@id='userEmail']").type("testname@test.com");
  await page.locator("//input[@id='age']").type("20");
  await page.locator("//input[@id='salary']").type("30000");
  await page.locator("//input[@id='department']").type("Comp");
  await page.locator("//button[@id='submit']").click();
  /// checking again table data if new value is appered in row

  let afterTableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  afterTableData = afterTableData.filter((item) => item.trim() !== "");
  afterTableData.shift();
  console.log("New table data : ", afterTableData);
  expect(tableData.length + 1).toEqual(afterTableData.length);
});

////// Verify table edit functionality  /////////////////////////////////////

test("Table Edit Function", async ({ page }) => {
  await page.goto("https://demoqa.com/webtables");

  await expect(page.locator(".main-header")).toHaveText("Web Tables");

  /// Checking all table first column all data
  let tableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  tableData = tableData.filter((item) => item.trim() !== ""); /// removing empty elements
  tableData.shift(); //// removing fist element as it is header.
  console.log(tableData);

  //adding new row
  await page.locator("//button[@id='addNewRecordButton']").click();
  await page.locator("//input[@id='firstName']").type("Test");
  await page.locator("//input[@id='lastName']").type("Name");
  await page.locator("//input[@id='userEmail']").type("testname@test.com");
  await page.locator("//input[@id='age']").type("20");
  await page.locator("//input[@id='salary']").type("30000");
  await page.locator("//input[@id='department']").type("Comp");
  await page.locator("//button[@id='submit']").click();
  /// checking again table data if new value is appered in row

  let afterTableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  afterTableData = afterTableData.filter((item) => item.trim() !== "");
  afterTableData.shift();

  //editing the same table entry salary

  // finding out the element with name Test to be edited

  let check = [];
  let resultRow = 0;

  // for (let i = 1; i <= afterTableData.length; i++) {
  //   const checkHandle = await page.evaluateHandle(
  //     (i) => document.querySelector(`div.rt-tbody > div.rt-tr-group:nth-child(${i}) > div[role="row"] > div:nth-child(1)`),
  //     i
  //   );

  //   // Check if the handle has textContent (is an ElementHandle)
  //   const checkValue = (await checkHandle.getProperty('textContent')).toString();

  //   if (checkValue === "Test") {
  //     resultRow = i;
  //     break; // Assuming you want to stop the loop if "Test" is found in any row.
  //   }

  //   await checkHandle.dispose();
  // }

  for (let i = 1; i <= afterTableData.length; i++) {
    check = await page
      .locator(
        `div.rt-tbody > div.rt-tr-group:nth-child(${i}) > div[role="row"] > div:nth-child(1)`
      )
      .allTextContents();
    if (check[0] == "Test") {
      resultRow = i;
      break;
    }
  }

  console.log(resultRow);
  //clicking on edit button
  await page.locator(`//span[@id='edit-record-${resultRow}']`).click();
  await page.locator("//input[@id='salary']").fill("50000");
  await page.locator("//button[@id='submit']").click();
  let updatedSalary = await page
    .locator(
      `div.rt-tbody > div.rt-tr-group:nth-child(${resultRow}) > div[role="row"] > div:nth-child(5)`
    )
    .allTextContents();
  expect(updatedSalary[0]).toEqual("50000");
});

/////////// Verifying  Delete button functionality  ////////////////////////

test("Table Delete button Functionality", async ({ page }) => {
  await page.goto("https://demoqa.com/webtables");

  await expect(page.locator(".main-header")).toHaveText("Web Tables");

  /// Checking all table first column all data
  let tableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  tableData = tableData.filter((item) => item.trim() !== ""); /// removing empty elements
  tableData.shift(); //// removing fist element as it is header.
  console.log(tableData);

  //adding new row
  await page.locator("//button[@id='addNewRecordButton']").click();
  await page.locator("//input[@id='firstName']").type("Test");
  await page.locator("//input[@id='lastName']").type("Name");
  await page.locator("//input[@id='userEmail']").type("testname@test.com");
  await page.locator("//input[@id='age']").type("20");
  await page.locator("//input[@id='salary']").type("30000");
  await page.locator("//input[@id='department']").type("Comp");
  await page.locator("//button[@id='submit']").click();
  /// checking again table data if new value is appered in row

  let afterTableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  afterTableData = afterTableData.filter((item) => item.trim() !== "");
  afterTableData.shift();
  console.log("After new row add: ", afterTableData);

  // finding out the element row number with name Test to be Deleted

  let check = [];
  let resultRow = 0;
  for (let i = 1; i <= afterTableData.length; i++) {
    check = await page
      .locator(
        `div.rt-tbody > div.rt-tr-group:nth-child(${i}) > div[role="row"] > div:nth-child(1)`
      )
      .allTextContents();
    if (check[0] == "Test") {
      resultRow = i;
      break;
    }
  }

  console.log(resultRow);
  //clicking on Delete button of respective row:

  await page.locator(`//span[@id='delete-record-${resultRow}']`).click();
  let afterDeleteTableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  afterDeleteTableData = afterDeleteTableData.filter(
    (item) => item.trim() !== ""
  );
  afterDeleteTableData.shift();
  console.log("After Delete row added: ", afterDeleteTableData);

  expect(afterDeleteTableData.includes("Test")).toBeFalsy();
  expect(
    afterTableData.length - 1 === afterDeleteTableData.length
  ).toBeTruthy();
});

//////// Test and examine the table serach functionality  /////////////////////

test("Table Search Test", async ({ page }) => {
  await page.goto("https://demoqa.com/webtables");

  await expect(page.locator(".main-header")).toHaveText("Web Tables");

  /// Checking all table first column all data
  let tableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  tableData = tableData.filter((item) => item.trim() !== ""); /// removing empty elements
  tableData.shift(); //// removing fist element as it is header.
  console.log(tableData);

  //adding new row
  await page.locator("//button[@id='addNewRecordButton']").click();
  await page.locator("//input[@id='firstName']").type("Test");
  await page.locator("//input[@id='lastName']").type("Name");
  await page.locator("//input[@id='userEmail']").type("testname@test.com");
  await page.locator("//input[@id='age']").type("20");
  await page.locator("//input[@id='salary']").type("30000");
  await page.locator("//input[@id='department']").type("Comp");
  await page.locator("//button[@id='submit']").click();

  // adding one more row
  await page.locator("//button[@id='addNewRecordButton']").click();
  await page.locator("//input[@id='firstName']").type("TestName");
  await page.locator("//input[@id='lastName']").type("Name");
  await page.locator("//input[@id='userEmail']").type("testname@test.com");
  await page.locator("//input[@id='age']").type("21");
  await page.locator("//input[@id='salary']").type("50000");
  await page.locator("//input[@id='department']").type("IT");
  await page.locator("//button[@id='submit']").click();

  /// checking again table data if new value is appered in row

  let afterTableData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  afterTableData = afterTableData.filter((item) => item.trim() !== "");
  afterTableData.shift();
  console.log("After new row add: ", afterTableData);
  ///starting search

  await page.locator("//input[@id='searchBox']").type("test", { delay: 200 });
  let afterSearchData = await page
    .locator(
      "//div[@class='ReactTable -striped -highlight']//div[@role='row']/div[1]"
    )
    .allTextContents();
  afterSearchData = afterSearchData.filter((item) => item.trim() !== "");
  afterSearchData.shift();
  console.log("After search : ", afterSearchData);
  let flag = false;
  afterSearchData.forEach((element) => {
    if (element.toLowerCase().includes("test")) {
      flag = true;
    } else {
      flag = false;
    }
  });
  expect(flag).toBeTruthy();
});

/////// Test and Examine the buttons different clicks functionality  ////////////////////

test("Button Clicks Test", async ({ page }) => {
  await page.goto("https://demoqa.com/buttons");

  await expect(page.locator(".main-header")).toHaveText("Buttons");
  /// checking the doubleClcik functionality.
  await page.locator("//button[@id='doubleClickBtn']").dblclick();

  //checking the message appearred or not
  expect(
    await page.locator("//p[@id='doubleClickMessage']").allTextContents()
  ).toContain("You have done a double click");

  //cheking right click functionality

  await page
    .locator("//button[@id='rightClickBtn']")
    .click({ button: "right" });
  expect(
    await page.locator("//p[@id='rightClickMessage']").allTextContents()
  ).toContain("You have done a right click");

  //Dynamic id buttons  click functionality check
  // const buttonText = "Click Me";
  // await page.locator(`button:has-text("${buttonText}")`).nth(2).click();  or simple is below
  await page.locator("//button[@class='btn btn-primary']").nth(2).click(); // as it is third button
  // you can use nth of last too as it is las button too.

  expect(
    await page.locator("//p[@id='dynamicClickMessage']").allTextContents()
  ).toContain("You have done a dynamic click");
});

////////////////////// Test and Verify the links there functionality //////////////////

test("Test the different links functionality", async ({ page }) => {
  await page.goto("https://demoqa.com/links");

  await expect(page.locator(".main-header")).toHaveText("Links");

  // tesing simple link that opens new tab
  // Get the current window.
  const currentPage = page;

  // Get the promise for the popup event.
  const page1Promise = page.waitForEvent("popup");
  // now clicking on the desired link
  await page.locator("//a[@id='simpleLink']").click();
  // Get the popup window.
  const page1 = await page1Promise;

  //checking if the new window tab opened
  let flag = false;
  if (currentPage !== page1) {
    flag = true;
  } else {
    flag = false;
  }
  expect(flag).toBeTruthy();
  console.log(currentPage.url(), " and ", page1.url());

  /// checking links that sends the API call

  // intercept the api call
  await page.route("**/created", (route) => {
    route.fulfill({
      status: 201,
      // @ts-ignore
      statusText: "Created",
    });
  });

  await page.locator("//a[@id='created']").click();
  const messageText = await page
    .locator("//p[@id='linkResponse']")
    .textContent();
  expect(messageText).toContain(
    "Link has responded with staus 201 and status text Created"
  );
  // next link to test
  /// below part is neccesory for the creating simulated responce that actual site gives. needed for playwright.
  await page.route("**/no-content", (route) => {
    route.fulfill({
      status: 204,
      // @ts-ignore
      statusText: "No Content",
    });
  });

  await page.locator("//a[@id='no-content']").click();
  let message = await page.locator("//p[@id='linkResponse']").textContent();
  expect(message).toContain(
    "Link has responded with staus 204 and status text No Content"
  );

  /// next link to be checked:
  await page.route("**/moved", (route) => {
    route.fulfill({
      status: 301,
      // @ts-ignore
      statusText: "Moved Permanently",
    });
  });

  await page.locator("//a[@id='moved']").click();
  expect(await page.locator("//p[@id='linkResponse']").textContent()).toContain(
    "Link has responded with staus 301 and status text Moved Permanently"
  );
});

//////////////////////////// test and verify Broken link - Images ////////////////////////////

test("Test Broken links and Image", async ({ page }) => {
  await page.goto("https://demoqa.com/broken");

  // checking we are on right page
  await expect(page.locator(".main-header")).toHaveText(
    "Broken Links - Images"
  );
  // get all image tags from page
  const allImages = await page.locator("img");

  // Extract the src attribute from each image element
  const imageSrcs = await allImages.evaluateAll((elements) => {
    return elements.map((element) => element.getAttribute("src"));
  });

  console.log(imageSrcs);
  // now we are removing the imgages like advertising images
  const filteredImageSrcs = imageSrcs.filter(
    // @ts-ignore
    (element) => !element.includes("ad")
  );
  console.log(filteredImageSrcs);

  // we are creating the final url array that we will check one by one for all url

  const baseUrl = "https://demoqa.com";
  const finalUrls = filteredImageSrcs.map((url) => baseUrl + url);
  console.log(finalUrls);

  //checking if every source of the image working properly by opeing src in new tab
  const imageResult = [];
  // Open a new tab for each image source URL
  for (const element of finalUrls) {
    let newPage = await page.context().newPage();

    await newPage.goto(element);

    let newPageImage = await newPage.locator("img");

    // Extract the src attribute from each image element for new page
    let newPageSrc = await newPageImage.evaluateAll((item) => {
      return item.map((item) => item.getAttribute("src"));
    });
    let newPageImageSrcs = newPageSrc.filter(
      // @ts-ignore
      (element) => !element.includes("ad")
    );
    console.log("New page", newPageImageSrcs);
    // checking that image src is present in the new tab

    // @ts-ignore
    if (newPageImageSrcs.some((src) => element.includes(src))) {
      imageResult.push("true");
      console.log(element, " is valid image");
    } else {
      imageResult.push("false");
      console.log(element, " is broken image");
    }

    await newPage.close();
  }
  console.log(imageResult);
  // Adding assertion on the all imges
  imageResult.forEach((element) => {
    expect(element).toEqual("true");
  });
});

////////////////// Check and Verify the Download and upload functionality //////////////
test("Test Download and upload button", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download");

  await expect(page.locator(".main-header")).toHaveText("Upload and Download");

  // Register a download listener to wait for the download to start
  const downloadPromise = page.waitForEvent("download");

  // Click the download button to trigger the download
  await page.locator("//a[@id='downloadButton']").click();

  // Wait for the download event to be triggered
  const download = await downloadPromise;

  // At this point, the download has started
  // You can add additional assertions here if needed

  // For example, you can check the suggested filename of the download
  const suggestedFilename = download.suggestedFilename();
  console.log("Download started with suggested filename:", suggestedFilename);

  // Add an assertion to check if the download has started
  expect(download).toBeTruthy();
});

/////////////////// Test and verify upload file functionality /////////////////

test("Test Upload file functionality", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download"); // Replace this with the URL of your website

  const fileInput = await page.locator("//input[@id='uploadFile']");
  expect(await fileInput.isVisible()).toBe(true);
  expect(await fileInput.isEnabled()).toBe(true);

  // Set the file path for upload
  const filePath = "c:/Users/krushnath.dhongade/Downloads/sampleFile.JPEG"; // Replace this with the actual file path
  await page.setInputFiles("//input[@id='uploadFile']", filePath);

  // Wait for the file upload to complete (you may need to adjust the waiting condition based on the behavior of the website)
  await page.waitForTimeout(5000); // Wait for 5 seconds (adjust as needed)

  // Assert that the file upload is successful (you may need to check for specific changes on the page or some success message)
  // For example, if there is a success message displayed after the upload, you can use the following assertion:
  const successMessage = await page.locator("//p[@id='uploadedFilePath']");
  expect(await successMessage.isVisible()).toBe(true);
});

///////////////////// Test and verify Form functionality  //////////////////////////

test("Test Form opertaions", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await expect(page.locator(".main-header")).toHaveText("Practice Form");

  await page.getByPlaceholder("First Name").click();
  await page.getByPlaceholder("First Name").fill("Kishan");
  await page.getByPlaceholder("Last Name").click();
  await page.getByPlaceholder("Last Name").fill("D");
  await page.getByPlaceholder("name@example.com").click();
  await page.getByPlaceholder("name@example.com").fill("Kishan@email.com");
  await page.getByText("Male", { exact: true }).click();
  await page.getByPlaceholder("Mobile Number").click();
  await page.getByPlaceholder("Mobile Number").fill("1234567890");
  await page.locator("#dateOfBirthInput").click();
  await page.getByRole("combobox").nth(1).selectOption("1997");
  await page
    .locator("div")
    .filter({
      hasText:
        /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/,
    })
    .getByRole("combobox")
    .selectOption("3");
  await page.getByLabel("Choose Friday, April 4th, 1997").click();
  await page.locator(".subjects-auto-complete__value-container").click();
  await page.locator("#subjectsInput").fill("m");
  await page.getByText("Maths", { exact: true }).click();
  await page.locator("#subjectsInput").fill("ph");
  await page.getByText("Physics", { exact: true }).click();
  await page.locator("#subjectsInput").fill("che");
  await page.getByText("Chemistry", { exact: true }).click();
  await page.locator("#subjectsInput").fill("en");
  await page.getByText("English", { exact: true }).click();
  await page.getByText("Sports").click();
  await page.getByText("Music").click();
  const fileInput = await page.locator("//input[@id='uploadPicture']");
  expect(await fileInput.isVisible()).toBe(true);
  expect(await fileInput.isEnabled()).toBe(true);

  // Set the file path for upload
  const filePath = "c:/Users/krushnath.dhongade/Downloads/sampleFile.JPEG"; // Replace this with the actual file path
  await page.setInputFiles("//input[@id='uploadPicture']", filePath);
  await page.getByPlaceholder("Current Address").click();
  await page.getByPlaceholder("Current Address").fill("pune");
  await page.locator("(//span[contains(@class,'group-header')])[6]").click();
  await page.locator("//div[@id='state']").click();

  await page.getByText("NCR", { exact: true }).click();
  await page.locator("//div[@id='city']").click();
  await page.getByText("Delhi", { exact: true }).click();
  await page.locator("//button[@id='submit']").click();
  // checking for validation of data entered in form

  await expect(page.locator("//div[@class='modal-header']")).toHaveText(
    "Thanks for submitting the form"
  );
  // creating an array for comparisons for the desired input
  const input = [
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
  const inputValues = [
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

  // creating an array  for comparison with result data appeared
  //(//tr[1])//td[1]
  const resultInput = await page.locator("(//tr)//td[1]").allTextContents();
  const resultInputValues = await page
    .locator("(//tr)//td[2]")
    .allTextContents();
  console.log("input : ", resultInput, "inputValues : ", resultInputValues);

  // asserting each value for each array comparison
  const isEqual = JSON.stringify(input) === JSON.stringify(resultInput);
  console.log(isEqual);
  console.log(input, resultInput);
  expect(isEqual).toBeTruthy();
  //assertion for values entered
  const isEqualValues =
    JSON.stringify(inputValues) === JSON.stringify(resultInputValues);
  console.log(isEqualValues);
  console.log(inputValues, resultInputValues);
  expect(isEqualValues).toBeTruthy();
});
