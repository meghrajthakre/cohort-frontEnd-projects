function allElements() {
  let allElements = document.querySelectorAll(".elem");
  let allFullElems = document.querySelectorAll(".allFullelems");
  let button = document.querySelectorAll(".back");

  allElements.forEach((element) => {
    element.addEventListener("click", () => {
      allFullElems[element.id].style.display = "block";
    });
  });

  button.forEach((element) => {
    element.addEventListener("click", () => {
      allFullElems[element.id].style.display = "none";
    });
  });
}
allElements();

function todoList() {
  let form = document.querySelector(".form");
  let input = document.querySelector(".form input");
  let input2 = document.querySelector(".form textarea");
  let input3 = document.querySelector(".form #important");

  let formData = [];

  if (localStorage.getItem("formData")) {
    formData = JSON.parse(localStorage.getItem("formData"));
  } else {
    console.log("no data found");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    formData.push({
      name: input.value,
      description: input2.value,
      important: input3.checked,
    });

    renderData();
    console.log(formData);

    input.value = "";
    input2.value = "";
    input3.checked = false;
  });

  function renderData() {
    let todoTasks = document.querySelector(".todo-list");
    let sum = "";

    formData.forEach((data, idx) => {
      sum =
        sum +
        `<div class="items-bar">
                            <h3>${data.name}</h3>
                            <p>${data.description}</p>
                            <p class="imp" >Imp*</p>
                            <button id='${idx}' class="mark-button">mark as read</button>
                        </div>`;
    });
    todoTasks.innerHTML = sum;
    localStorage.setItem("formData", JSON.stringify(formData));

    document.querySelectorAll(".mark-button").forEach((button) => {
      button.addEventListener("click", () => {
        formData.splice(button.id, 1);
        renderData();
      });
    });
  }
  renderData();
}

todoList();

// daily planner
function dailyPlanner() {
  let dayPlanDatas = JSON.parse(localStorage.getItem("dayPlanDatas")) || {};
  let dailyPlannerFullPage = document.querySelector(".daily-panner-full-page");
  let hours = Array.from(
    { length: 18 },
    (_, idx) => ` ${6 + idx}:00 - ${7 + idx}:00`
  );

  let wholeDayTime = "";

  hours.forEach((hours, idx) => {
    let savedData = dayPlanDatas[idx] || "";

    wholeDayTime =
      wholeDayTime +
      ` <div class="daily-time">
                <h3>${hours}</h3>
                <input id=${idx} type="text" class="input-daily-planner" value=${savedData}>
            </div>`;
  });

  dailyPlannerFullPage.innerHTML = wholeDayTime;

  let inputDailyPlanner = document.querySelectorAll(".input-daily-planner");

  inputDailyPlanner.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayPlanDatas[elem.id] = elem.value;
      localStorage.setItem("dayPlanDatas", JSON.stringify(dayPlanDatas));
    });
  });
}

dailyPlanner();
