let today = new Date();

let currentMonth;
let currentYear;

if (selectedDate) {
    let dateParts = selectedDate.split("-");
    currentMonth = Number(dateParts[1]) - 1;
    currentYear = Number(dateParts[0]);
}
else {
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
}

let first_day = new Date(currentYear, currentMonth, 1).getDay();
let emptyDays = (first_day + 6) % 7;
let total_days = new Date(currentYear, currentMonth+1,0).getDate()
let calendarDates = document.querySelector(".days")
let monthYear = document.querySelector("#month-year");

monthYear.textContent = new Date(currentYear, currentMonth)
    .toLocaleString("en-US", { month: "long", year: "numeric" });

for (let i = 0; i < emptyDays; i++) {
    let newDate = document.createElement("p")
    newDate.textContent = " "
    calendarDates.appendChild(newDate);

}

for (let i=1; i<=total_days; i++){
    let newDate = document.createElement("p")
    newDate.textContent = i
    let datevalue = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    newDate.dataset.date = datevalue;
    if (datevalue === selectedDate) {
        newDate.classList.add("selected");
    }
    newDate.addEventListener("click", function() {
        let selected_date = document.querySelector("#date");
        selected_date.value = newDate.dataset.date
        document.querySelector("#calendar-form").submit();
    });
    calendarDates.appendChild(newDate);

}


let nextButton = document.querySelector("#next-month");

nextButton.addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    calendarDates.innerHTML = "";

    let monthYear = document.querySelector("#month-year");

    monthYear.textContent = new Date(currentYear, currentMonth)
        .toLocaleString("en-US", { month: "long", year: "numeric" });

    let first_day = new Date(currentYear, currentMonth, 1).getDay();
    let emptyDays = (first_day + 6) % 7;
    let total_days = new Date(currentYear, currentMonth+1,0).getDate()
    
    for (let i = 0; i < emptyDays; i++) {
    let newDate = document.createElement("p")
    newDate.textContent = " "
    calendarDates.appendChild(newDate);
    
    }

    for (let i=1; i<=total_days; i++){
        let newDate = document.createElement("p")
        newDate.textContent = i
        let datevalue = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        newDate.dataset.date = datevalue;
        if (datevalue === selectedDate) {
            newDate.classList.add("selected");
        }
        newDate.addEventListener("click", function() {
            let selected_date = document.querySelector("#date");
            selected_date.value = newDate.dataset.date
            document.querySelector("#calendar-form").submit();
        });
        calendarDates.appendChild(newDate);

    }
});

let prevButton = document.querySelector("#prev-month");

prevButton.addEventListener("click", function() {
    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    calendarDates.innerHTML = "";
    let monthYear = document.querySelector("#month-year");

    monthYear.textContent = new Date(currentYear, currentMonth)
        .toLocaleString("en-US", { month: "long", year: "numeric" });
    
    let first_day = new Date(currentYear, currentMonth, 1).getDay();
    let emptyDays = (first_day + 6) % 7;
    let total_days = new Date(currentYear, currentMonth+1,0).getDate()
    
    for (let i = 0; i < emptyDays; i++) {
    let newDate = document.createElement("p")
    newDate.textContent = " "
    calendarDates.appendChild(newDate);
    
    }

    for (let i=1; i<=total_days; i++){
        let newDate = document.createElement("p")
        newDate.textContent = i
        let datevalue = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        newDate.dataset.date = datevalue;
        if (datevalue === selectedDate) {
            newDate.classList.add("selected");
        }
        newDate.addEventListener("click", function() {
            let selected_date = document.querySelector("#date");
            selected_date.value = newDate.dataset.date
            document.querySelector("#calendar-form").submit();
        });
        calendarDates.appendChild(newDate);

    }
});




