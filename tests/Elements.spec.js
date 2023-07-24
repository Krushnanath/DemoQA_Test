// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("https://demoqa.com");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DEMOQA/);
});

//////////  Verify and check text box element functionality  //////////////////////////

test("Text Box Test", async ({ page }) => {
  await page.goto("https://demoqa.com");
  page.pause();
  const elemetsBlock = page.locator("(//h5)[1]");
  await elemetsBlock.click();
  await page.getByText("Text Box").click();
  await expect(page.locator(".main-header")).toContainText(/Text Box/);
  const nameInput = await page.locator("#userName");
  const emailInput = page.locator("#userEmail");
  const currentAddress = page.locator("#currentAddress");
  const permanentAddress = page.locator("#permanentAddress");
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
  await page.locator("#submit").click();

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
  await page.locator(".rct-icon.rct-icon-expand-close").click();
  await page
    .locator("(//*[name()='svg'][@class='rct-icon rct-icon-expand-close'])[1]")
    .click();
  await page
    .locator("(//*[name()='svg'][@class='rct-icon rct-icon-expand-close'])[1]")
    .click();
  await page
    .locator("(//*[name()='svg'][@class='rct-icon rct-icon-expand-close'])[1]")
    .click();
  await page
    .locator("(//*[name()='svg'][@class='rct-icon rct-icon-expand-close'])[1]")
    .click();
  //await page.pause();
  await page
    .locator("(//*[name()='svg'][@class='rct-icon rct-icon-expand-close'])[1]")
    .click();
  const selection = [
    "Desktop",
    "Notes",
    "Commands",
    "React",
    "Classified",
    "General",
    "excelFile",
  ];
  await page.getByText("Desktop").click();
  await page.getByText("React").click();
  await page.getByText("Classified").click();
  await page.getByText("General").click();
  await page
    .locator("(//*[name()='svg'][@class='rct-icon rct-icon-uncheck'])[7]")
    .click();
  const result = await page.locator("//div[@id='result']").textContent();
  console.log("Selection: ", selection, "Result: ", result);
  for (let i = 0; i < selection.length; i++) {
    // @ts-ignore
    expect(result.toLocaleLowerCase()).toContain(selection[i].toLowerCase());
  }
});

/////////// Test and examine the Radio button  /////////////////////////////

test("Radio Buttons Test", async ({ page }) => {
  await page.goto("https://demoqa.com/radio-button");

  await expect(page.locator(".main-header")).toContainText("Radio Button");
  // await page.pause();

  await page.locator("//label[normalize-space()='Yes']").click();

  await expect(page.locator("//input[@id='yesRadio']")).toBeChecked();
  const chk1 = await page.locator("//span[@class='text-success']");
  await expect(chk1).toContainText("Yes");
  await page.locator("//label[@for='impressiveRadio']").click();
  await expect(page.locator("//input[@id='impressiveRadio']")).toBeChecked();
  await expect(await page.locator("//p[@class='mt-3']")).toContainText(
    "Impressive"
  );

  // await page.locator("input[type='radio']").nth(2).click();
  const disabledRadio = await page
    .locator("input[type='radio']")
    .nth(2)
    .isDisabled();
  await expect(disabledRadio).toBeTruthy();
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

test.only("Test Broken links and Image", async ({ page }) => {
  await page.goto("https://demoqa.com/broken");

  // checking we are on right page
  await expect(page.locator(".main-header")).toHaveText(
    "Broken Links - Images"
  );
  const allImages = await page.locator("img");

  // Extract the src attribute from each image element
  const imageSrcs = await allImages.evaluateAll((elements) => {
    return elements.map((element) => element.getAttribute("src"));
  });

  console.log(imageSrcs);
  // now we are removing the imgages like advertising images
  const filteredImageSrcs = imageSrcs.filter(
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
      (element) => !element.includes("ad")
    );
    console.log("New page", newPageImageSrcs);
    // checking that image src is present in the new tab

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
    expect(element).toEqual('true');
  });
});

////////////////// Check and Verify the Download and upload functionality ///////////////

test("Test Download and upload button", async ({ page, context }) => {
  await page.goto("https://demoqa.com/upload-download");

  await expect(page.locator(".main-header")).toHaveText("Upload and Download");

  await page.locator("//a[@id='downloadButton']").click();

  // Get the downloaded file path
  const downloads = await page.waitForEvent("download");
  const download = downloads[0]; // Assuming there's only one download
  const filePath = download.path();

  // Check if the file exists
  const fs = require("fs");
  const fileExists = fs.existsSync(filePath);
  expect(fileExists).toBeTruthy();

  // Optionally, you can also check the file size or other properties
  const fileSize = fs.statSync(filePath).size;
  expect(fileSize).toBeGreaterThan(0);

  // Clean up: remove the downloaded file after the test is complete
  fs.unlinkSync(filePath);
});
