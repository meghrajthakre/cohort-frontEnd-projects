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

// motivational page
// http://api.quotable.io/random
function motivation() {
  let motivationQuote = document.querySelector(".motivation-1 h2");
  let motivationAthur = document.querySelector(".motivation-1 h5");

  async function fetchApi() {
    let response = await fetch(" http://api.quotable.io/random");
    let data = await response.json();

    motivationQuote.innerHTML = "'' " + data.content + "'' ";
    motivationAthur.innerHTML = "-" + data.author;
  }
  fetchApi();
  let refreshBtn = document.querySelector(".refresh-btn");

  refreshBtn.addEventListener("click", () => {
    fetchApi();
    console.log("clickwd");
  });
}

motivation();

// pomodoroTime

function pomodoroTimer() {
  let timer = document.querySelector(".pomodo-body h1");
  let starBtn = document.querySelector(".pomo-start");
  let resetBtn = document.querySelector(".pomo-reset");
  let stopBtn = document.querySelector(".pomo-stop");
  let clearTime = null;
  let totalSecond = 25 * 60;

  function updateTime() {
    let minute = Math.floor(totalSecond / 60);
    let second = totalSecond % 60;

    timer.innerHTML = `${String(minute).padStart(2, "0")}: ${String(
      second
    ).padStart(2, "0")}`;
  }

  function starTime() {
    clearTime = setInterval(() => {
      if (totalSecond > 0) {
        totalSecond--;
        updateTime();
      } else {
        clearTimer();
      }
    }, 1000);
  }

  function clearTimer() {
    clearInterval(clearTime);
  }

  function resetTimer() {
    totalSecond = 25 * 60;
    updateTime();
  }

  starBtn.addEventListener("click", starTime);
  stopBtn.addEventListener("click", clearTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateTime();
}

pomodoroTimer();
function fetchWeather() {
  async function fetchData() {
    let divTemp = document.querySelector(".div-temp .condition");
    let city = document.querySelector(".div-temp .city");
    let tempreture = document.querySelector(".div-temp .tempreture");
    let humidity = document.querySelector(".div-temp .humidity");
    let response = await fetch(
      "https://api.weatherstack.com/current?access_key=8a787f7bf13035ea62af9f50e4321608&query=wani"
    );

    let data = await response.json();

    divTemp.innerHTML =
      " Weather Conditions : " + data.current.weather_descriptions;

    city.innerHTML = "City: " + data.location.name;

    tempreture.innerHTML = "temperature : " + data.current.temperature;
    humidity.innerHTML = "Humidity : " + data.current.humidity;
  }

  fetchData();

  function fetchingDate() {
    let dates = document.querySelector(".div-date h1");
    let time = document.querySelector(".div-date h2");
    let date = new Date();

    let day = date.getHours();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    let hour = String(date.getHours()).padStart(2, "0");
    let minuts = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    let hours = hour % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const ampm = hours <= 12 ? "PM" : "AM";
    dates.innerHTML = `${day}- ${month}-${year}`;
    time.innerHTML = `${hours}:${minuts}:${seconds} ${ampm}`;
  }

  setInterval(() => {
    fetchingDate();
  }, 1000);

  fetchingDate();
}

fetchWeather();
