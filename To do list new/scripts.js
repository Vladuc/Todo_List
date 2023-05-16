"use strict";

const inputValue = document.querySelector(".title-input");
const addDescriptionInput = document.querySelector(".icon-add");
const removeDescriptionInput = document.querySelector(".icon-remove");
const inputDescription = document.querySelector(".description");
const descriptionTaskInput = document.querySelector(".description-task");
const deadlineTaskInput = document.querySelector(".deadline-task");
// const myDate = new Date(document.getElementById("myDate"));
const taskBox = document.getElementById("toDo");

// CONTROLS
const all = document.getElementById("all");
const pending = document.getElementById("Pending");
const completed = document.getElementById("Complete");
const clearAll = document.querySelector(".clear-btn");

// POPUP
const popUp = document.querySelector(".pop-up");
const wrapper = document.querySelector(".wrapper");
const closePopUp = document.querySelector(".icon-close-popUp");
const yesBtn = document.querySelector(".btn-yes");
const noBtn = document.querySelector(".btn-no");

// task - add
const addBtn = document.querySelector(".btn-add");
let bool = true;
let listItems = [];

// ********************************
// INPUT
// ********************************

const changeSign = function () {
  addDescriptionInput.classList.toggle("hidden");
  removeDescriptionInput.classList.toggle("hidden");
};

const descriptionToggle = function () {
  inputDescription.classList.toggle("hidden");
  inputValue.classList.toggle("hidden-off");

  changeSign();
};

inputValue.addEventListener("keypress", function (event) {
  if (event.key === "Enter") event.preventDefault();
});

addDescriptionInput.addEventListener("click", function () {
  if (inputValue.value === "") {
    alert("Introduceti titlul task-ului!");
  } else {
    descriptionToggle();
    removeDescriptionInput.addEventListener("click", descriptionToggle);
  }
});
// close popUp
const closePop = function () {
  popUp.classList.toggle("hidden");
  wrapper.classList.toggle("blur");
};

// data Formatter
const current = new Date();
const currentYear = current.getFullYear();
const currentMonth = current.getMonth() + 1;
const currentDay = current.getDate();

const minDate = currentYear + "-" + currentMonth + "-" + currentDay;

document.getElementById("myDate").setAttribute("min", dateFormatter(minDate));
console.log(minDate);

const verifyDate = function () {
  if (myDate.value < minDate) alert("Va rugam sa selectati o data din viitor!");
  else bool = false;
};
function dateFormatter(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

// Remove description
const removeDescriptionF = function () {
  changeSign(removeDescriptionInput, addDescriptionInput);
  inputDescription.classList.add("hidden");
  inputValue.classList.remove("hidden-off");
};

// control selected
all.addEventListener("click", function () {
  all.classList.add("underline");
  pending.classList.remove("underline");
});
pending.addEventListener("click", function () {
  pending.classList.add("underline");
  all.classList.remove("underline");
});
completed.addEventListener("click", function () {
  completed.classList.add("underline");
  all.classList.remove("underline");
  pending.classList.remove("underline");
});

// ********************************
//  add TASK
// ********************************

addBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let myDate = new Date(document.getElementById("myDate").value);

  if (inputValue.value === "") {
    alert("Introduceti titlul task-ului");
  } else if (dateFormatter(myDate) < dateFormatter(minDate)) {
    event.preventDefault();
    alert("Va rugam sa selectati o data din viitor!");
  } else {
    const ol = document.getElementById("toDo");
    const li = document.createElement("li");
    li.classList.add("delete-task");
    li.classList.add("task");
    listItems.push(li);

    const li_div = document.createElement("div");
    li_div.classList.add("summary-task");
    // li_div.setAttribute("draggable", true);
    li.appendChild(li_div);

    const li_div_label = document.createElement("label");
    li_div.appendChild(li_div_label);

    const li_div_label_inputCheckBox = document.createElement("input");
    li_div_label_inputCheckBox.classList.add("checkbox");
    li_div_label_inputCheckBox.type = "checkbox";
    li_div_label.appendChild(li_div_label_inputCheckBox);
    const cb = li_div_label_inputCheckBox;

    const li_div_label_iconTrash = document.createElement("span");
    li_div_label_iconTrash.classList.add("hidden");
    li_div_label_iconTrash.innerHTML =
      "<ion-icon class='icon-bin-exp ' name='trash-outline'></ion-icon>";
    li_div_label.appendChild(li_div_label_iconTrash);

    const li_div_label_inputTask = document.createElement("input");
    li_div_label_inputTask.readOnly = "readonly";
    li_div_label_inputTask.classList.add("input-task");
    li_div_label_inputTask.value = inputValue.value;
    // AICI TREBE COMPLETAT
    li_div_label.appendChild(li_div_label_inputTask);

    ol.appendChild(li);

    const li_div_div = document.createElement("div");
    li_div_div.classList.add("settings");
    li_div.appendChild(li_div_div);

    const li_div_div_button1 = document.createElement("button");
    li_div_div_button1.classList.add("btn-tasks");
    li_div_div_button1.classList.add("btn-edit");
    li_div_div_button1.innerHTML = "Edit";

    li_div_div.appendChild(li_div_div_button1);

    const li_div_div_button2 = document.createElement("button");
    li_div_div_button2.classList.add("btn-tasks");
    li_div_div_button2.classList.add("btn-save");
    li_div_div_button2.classList.add("hidden");
    li_div_div_button2.innerHTML = "Save";
    li_div_div.appendChild(li_div_div_button2);

    const li_div_div_span = document.createElement("span");
    li_div_div_span.innerHTML =
      "<ion-icon class='icon-menu'name='ellipsis-horizontal-outline'></ion-icon>";
    li_div_div.appendChild(li_div_div_span);

    const li_div2 = document.createElement("div");
    li_div2.classList.add("description-placed");
    li_div2.classList.add("hidden");

    li.appendChild(li_div2);

    const li_div2_p2 = document.createElement("p");
    li_div2_p2.classList.add("description-taskForm");
    li_div2_p2.innerHTML = descriptionTaskInput.value;
    li_div2.appendChild(li_div2_p2);

    const li_div2_div = document.createElement("div");
    li_div2_div.classList.add("description-last");

    li_div2.appendChild(li_div2_div);

    const li_div2_div_p = document.createElement("p");
    li_div2_div_p.classList.add("deadline");
    let dateCheck = deadlineTaskInput.value;

    li_div2_div_p.innerHTML = deadlineTaskInput.value;

    li_div2_div.appendChild(li_div2_div_p);

    const li_div2_div_div = document.createElement("div");
    li_div2_div_div.classList.add("description-icons");

    li_div2_div.appendChild(li_div2_div_div);

    const li_div2_div_div_button = document.createElement("span");
    li_div2_div_div_button.innerHTML =
      '<ion-icon class="icon-bin" name="trash-outline"></ion-icon>';
    li_div2_div_div.appendChild(li_div2_div_div_button);

    const li_div2_div_div_button2 = document.createElement("span");
    li_div2_div_div_button2.innerHTML =
      '<ion-icon class="icon-up" name="arrow-up-outline"></ion-icon>';
    li_div2_div_div.appendChild(li_div2_div_div_button2);
    inputValue.value = "";
    descriptionTaskInput.value = "";
    deadlineTaskInput.value = "";

    let date = new Date();
    //  BTN MENU
    const descriptionTaskToggle = function () {
      li_div2.classList.toggle("hidden");
    };
    li_div_div_span.addEventListener("click", descriptionTaskToggle);

    // BTN CHECKED
    cb.addEventListener("click", function () {
      if (cb.checked) {
        li_div_label_inputTask.style.textDecoration = "line-through";
      } else li_div_label_inputTask.style.textDecoration = "none";
    });
    // Verify the date
    if (dateCheck < dateFormatter(date) && dateCheck != "") {
      li_div.classList.add("expired");
      li_div_div_button1.classList.add("hidden");
      li_div_label_iconTrash.classList.remove("hidden");
      li_div_div_span.classList.add("hidden");
      li_div_label_inputCheckBox.classList.add("hidden");
    }

    const deleteF = function () {
      closePop();
      closePopUp.addEventListener("click", closePop);
      noBtn.addEventListener("click", function () {
        popUp.classList.add("hidden");
        wrapper.classList.remove("blur");
      });
      // Yes btn
      yesBtn.addEventListener("click", function () {
        popUp.classList.add("hidden");
        wrapper.classList.remove("blur");
        li.remove();
      });
    };
    li_div_label_iconTrash.addEventListener("click", deleteF);
    li_div2_div_div_button.addEventListener("click", deleteF);
    // arrow up
    li_div2_div_div_button2.addEventListener("click", function () {
      li_div2.classList.add("hidden");
    });

    // btn edit
    li_div_div_button1.addEventListener("click", function () {
      li_div_label_inputTask.readOnly = false;
      li_div_div_button1.classList.add("hidden");
      li_div_div_button2.classList.remove("hidden");
    });

    // btn save
    li_div_div_button2.addEventListener("click", function () {
      li_div_div_button2.classList.add("hidden");
      li_div_div_button1.classList.remove("hidden");
      li_div_label_inputTask.readOnly = true;
    });

    // CONTROLS

    all.addEventListener("click", function () {
      li.classList.remove("hidden");
    });
    pending.addEventListener("click", function () {
      if (!cb.checked && (dateCheck > dateFormatter(date) || dateCheck == ""))
        li.classList.remove("hidden");
      else li.classList.add("hidden");
    });
    completed.addEventListener("click", function () {
      if (cb.checked) li.classList.remove("hidden");
      else li.classList.add("hidden");
    });
    clearAll.addEventListener("click", function () {
      if (!li.classList.contains("hidden")) li.remove();
    });

    removeDescriptionF();
    // addEventListeners();
  }
});

new Sortable(taskBox, {
  animation: 300,
});

// let dragStartIndex;

// function dragStart() {
//   // console.log("Event:", "dragstart");
//   dragStartIndex = this.closest("li").getAttribute("data-index");
// }
// function dragEnter() {
//   // console.log("Event:", "dragenter");
//   this.classList.add("over");
// }
// function dragLeave() {
//   // console.log("Event:", "dragleave");
//   this.classList.remove("over");
// }
// function dragOver(event) {
//   // console.log("Event:", "dragover");
//   event.preventDefault();
// }
// function dragDrop() {
//   // console.log("Event:", "drop");
//   const dragEndIndex = +this.getAttribute("data-index");
//   swapItems(dragStartIndex, dragEndIndex);

//   this.classList.remove("over");
// }

// function swapItems(fromIndex, toIndex) {
//   // console.log("123");
//   const itemOne = listItems[fromIndex].querySelector(".task");
//   const itemTwo = listItems[toIndex].querySelector(".task");

//   listItems[fromIndex].appendChild(itemTwo);
//   listItems[toIndex].appendChild(itemOne);
// }

// function addEventListeners() {
//   const draggables = document.querySelectorAll(".task");
//   const dragListItems = document.querySelectorAll(".task-box li");

//   draggables.forEach((draggable) => {
//     draggable.addEventListener("dragstart", dragStart);
//   });
//   dragListItems.forEach((item) => {
//     item.addEventListener("dragover", dragOver);
//     item.addEventListener("drop", dragDrop);
//     item.addEventListener("dragenter", dragEnter);
//     item.addEventListener("dragleave", dragLeave);
//   });
// }
