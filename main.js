//selecting html element
let nextStep = document.getElementById("go");
let backStep = document.getElementById("back");
let firstPage = document.getElementById("first-page");
let secondPage = document.getElementById("second-page");
let thirdPage = document.getElementById("third-page");
let fourthPage = document.getElementById("fourth-page");
let fifthPage = document.getElementById("fifth-page");
let navIndication = document.querySelectorAll("nav ul li span");
let checkFields = document.querySelectorAll("main .first-step form input");
let checkFieldsForm = document.querySelector("main .first-step form");
let radioOptions = document.querySelectorAll(
  "main .second-step form .plan input[type=radio]"
);
let planAmount = document.querySelectorAll(
  "main .second-step form .plan .details .money"
);
let gift = document.querySelectorAll(".gift");
let monthOrYear = document.querySelector(
  "main .second-step .mo-ye .select .select-ball"
);
let monthly = document.querySelector("main .second-step .mo-ye .monthly");
let yearly = document.querySelector("main .second-step .mo-ye .yearly");
let extraAddOns = document.querySelectorAll(
  "main .third-step form .option input[type=checkbox]"
);
let summaryContainer = document.querySelector(".summary");
let total = document.querySelector(".total-sum");
let spanAddCosts = document.querySelectorAll(".add-cost");
let changePlan = document.querySelector(".change");
let projectEnd = document.getElementById("footerend");
// my variables
let counter = 0;
//data gathered to be omitted in summary
let chosenPlanName, chosenPlanAmount;
let chosenPlanDuration = monthly.textContent;
let addOnsCost = [],
  addOns = [];

//default values
monthly.style.color = " hsl(213, 96%, 18%)";
yearly.style.color = "hsl(231, 11%, 63%) ";

//error msg for wrong format and the right formats
let errorMsg = document.createElement("span");
errorMsg.innerHTML = "This field is required";
let errorStyle = `
  display : inline-block;
  float : right;
  color : red;
  font-size : 14px;
`;
const nameRegex = /^[a-z]+\s[a-z]+$/i;
const emailRegex = /^[a-z]+\w+@\w{2,}\.\w+/i;
const numRegex = /^\+\d{1}(\s\d{3}){3}$/;
let wrongFormat = document.createElement("span");
wrongFormat.innerHTML = "Wrong format";

// console.log(navIndication);
// console.log(checkFields);

//navigation

window.onload = movingPages(counter);
nextStep.onclick = function () {
  let wantedAddOns = document.getElementsByClassName("wanted");
  if (counter == 0) {
    checkEmptyFields(checkFields);
  } else if (counter == 1) {
    if (
      radioOptions[0].checked ||
      radioOptions[1].checked ||
      radioOptions[2].checked
    ) {
      counter++;
    } else {
      alert("Choose A Plan");
    }
  } else if (counter == 2) {
    nextStep.innerHTML = "Confirm";
    for (let i = 0; i < wantedAddOns.length; i++) {
      addOns[i] = wantedAddOns[i].children[0].getAttribute("data-add");
      addOnsCost[i] = wantedAddOns[i].children[3].textContent;
    }
    summary();
    counter++;
  } else if (counter == 3) {
    nextStep.style.display = "none";
    projectEnd.style.display = "none";
    counter++;
    // nextStep.style.display = "none";
    // backStep.style.display = "none";
  }
  movingPages(counter);
  console.log(counter);
  console.log(chosenPlanName);
  console.log(chosenPlanAmount);
  console.log(chosenPlanDuration);
  console.log(addOns);
  console.log(addOnsCost);
};
backStep.onclick = function () {
  if (counter > 0 && counter != 3) {
    counter--;
  } else if (counter == 3) {
    addOns = [];
    addOnsCost = [];
    nextStep.innerHTML = "Next Step";
    counter--;
  } else {
    console.log("error");
  }
  console.log(counter);
  movingPages(counter);
};

//choosing plan and get values stored in variables
radioOptions.forEach(selectingPlan);
monthOrYear.parentElement.onclick = monthYearChose;

//choosing Add-ons and get values stored in variables
extraAddOns.forEach((box) => {
  box.parentElement.onclick = function () {
    if (box.checked) {
      box.parentElement.classList.add("wanted");
    } else {
      box.parentElement.classList.remove("wanted");
    }
  };
});

function movingPages(count) {
  if (counter == 0 || counter == 4) {
    backStep.style.display = "none";
  } else {
    backStep.style.display = "inline-block";
  }
  switch (count) {
    case 0:
      firstPage.style.display = "block";
      secondPage.style.display = "none";
      thirdPage.style.display = "none";
      fourthPage.style.display = "none";
      fifthPage.style.display = "none";
      break;
    case 1:
      firstPage.style.display = "none";
      secondPage.style.display = "block";
      thirdPage.style.display = "none";
      fourthPage.style.display = "none";
      fifthPage.style.display = "none";
      break;
    case 2:
      firstPage.style.display = "none";
      secondPage.style.display = "none";
      thirdPage.style.display = "block";
      fourthPage.style.display = "none";
      fifthPage.style.display = "none";
      break;
    case 3:
      firstPage.style.display = "none";
      secondPage.style.display = "none";
      thirdPage.style.display = "none";
      fourthPage.style.display = "block";
      fifthPage.style.display = "none";
      break;
    case 4:
      firstPage.style.display = "none";
      secondPage.style.display = "none";
      thirdPage.style.display = "none";
      fourthPage.style.display = "none";
      fifthPage.style.display = "flex";
      break;
    default:
      firstPage.style.display = "none";
      secondPage.style.display = "none";
      thirdPage.style.display = "none";
      fourthPage.style.display = "none";
      fifthPage.style.display = "none";
      break;
  }
  navIndication.forEach((e, i, arr) => {
    e.style.backgroundColor = "transparent";
    e.style.color = "white";
    if (i == count) {
      arr[i].style.backgroundColor = "hsl(228, 100%, 84%)";
      arr[i].style.color = "hsl(213, 96%, 18%)";
    }
  });
}
function checkEmptyFields(arr) {
  errorMsg.style.display = "none";
  wrongFormat.style.display = "none";
  for (let i = 2; i >= 0; i--) {
    if (arr[i].value == []) {
      errorMsg.style.cssText = errorStyle;
      checkFieldsForm.insertBefore(errorMsg, arr[i]);
    } else if (!nameRegex.test(arr[0].value) && arr[0].value != []) {
      wrongFormat.style.cssText = errorStyle;
      checkFieldsForm.insertBefore(wrongFormat, arr[0]);
    } else if (!emailRegex.test(arr[1].value) && arr[1].value != []) {
      wrongFormat.style.cssText = errorStyle;
      checkFieldsForm.insertBefore(wrongFormat, arr[1]);
    } else if (!numRegex.test(arr[2].value) && arr[2].value != []) {
      wrongFormat.style.cssText = errorStyle;
      checkFieldsForm.insertBefore(wrongFormat, arr[2]);
    } else if (
      nameRegex.test(arr[0].value) &&
      emailRegex.test(arr[1].value) &&
      numRegex.test(arr[2].value)
    ) {
      counter++;
      break;
    }
  }
}
function selectingPlan(el) {
  el.onclick = function () {
    radioOptions.forEach((e) => {
      e.parentElement.style.backgroundColor = "white";
      e.parentElement.style.borderColor = "hsl(231, 11%, 63%)";
      e.removeAttribute("checked");
    });
    el.setAttribute("checked", "");
    monthOrYear.parentElement.addEventListener("click", () => {
      el.removeAttribute("checked");
      if (el.checked) {
        el.parentElement.style.borderColor = "hsl(243, 100%, 62%)";
        el.parentElement.style.backgroundColor = "hsl(217, 100%, 97%)";
        chosenPlanName = el.getAttribute("data-name");
        chosenPlanAmount = el.parentElement.children[2].children[1].textContent;
      }
    });
    if (el.checked) {
      el.parentElement.style.borderColor = "hsl(243, 100%, 62%)";
      el.parentElement.style.backgroundColor = "hsl(217, 100%, 97%)";
      chosenPlanName = el.getAttribute("data-name");
      chosenPlanAmount = el.parentElement.children[2].children[1].textContent;
    } else {
      alert("choose a plan");
    }
  };
}
function monthYearChose() {
  if (monthOrYear.classList.contains("right")) {
    chosenPlanDuration = monthly.textContent;
    monthOrYear.classList.remove("right");
    monthOrYear.classList.add("left");
    monthly.style.color = " hsl(213, 96%, 18%)";
    yearly.style.color = "hsl(231, 11%, 63%) ";
    gift.forEach((ele) => {
      ele.style.display = "none";
    });
    planAmount.forEach((el) => {
      let cost = +el.textContent.match(/[0-9]+/) / 10;
      el.innerHTML = `$${cost}/mo`;
    });
    spanAddCosts.forEach((el) => {
      let costx = +el.textContent.match(/[0-9]+/) / 10;
      el.innerHTML = `$${costx}/mo`;
    });
  } else if (monthOrYear.classList.contains("left")) {
    chosenPlanDuration = yearly.textContent;
    monthOrYear.classList.remove("left");
    monthOrYear.classList.add("right");
    yearly.style.color = " hsl(213, 96%, 18%)";
    monthly.style.color = "hsl(231, 11%, 63%)";
    gift.forEach((ele) => {
      ele.style.display = "block";
    });
    planAmount.forEach((el) => {
      let cost = +el.textContent.match(/[0-9]+/);
      el.innerHTML = `$${cost}0/yr`;
    });
    spanAddCosts.forEach((el) => {
      let costx = +el.textContent.match(/[0-9]+/);
      el.innerHTML = `$${costx}0/yr`;
    });
  } else {
    alert("Choose A Plan Duration");
  }
}
function summary() {
  let summaryPlan = `
  <div class="summary-top">
  <span>${chosenPlanName}</span> <span>(${chosenPlanDuration})</span>
  <span>${chosenPlanAmount}</span> <a href="#second-step      
  target="_self" class="change">Change</a> 
  </div>
  <div class="summary-bottom">
  <div class="bottom-left">
  <ul>
  `;
  for (const x of addOns) {
    summaryPlan += `<li>${x}</li> `;
  }
  summaryPlan += `</ul> 
  </div>
  <div class="bottom-right">
  <ul>`;
  for (const y of addOnsCost) {
    summaryPlan += `<li>${y}</li>`;
  }
  summaryPlan += `
  </ul>
  </div>
  </div>
  `;
  summaryContainer.innerHTML = summaryPlan;

  let = totalContainer = "";
  let totalSum = +chosenPlanAmount.match(/[0-9]+/);
  for (const i of addOnsCost) {
    totalSum += +i.match(/[0-9]+/);
  }
  if (chosenPlanDuration == "Monthly") {
    totalContainer = `<span>Total (per Month)</span>
    <span>+$${totalSum}/mo</span>`;
  } else if (chosenPlanDuration == "Yearly") {
    totalContainer = `<span>Total (per Year)</span>
    <span>+$${totalSum}/yr</span>`;
  }
  total.innerHTML = totalContainer;
}
