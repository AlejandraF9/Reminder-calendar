import { createNewReminder, getAllReminders } from "./api/apiReminders";

const addReminderButton = document.getElementById("add-reminder");
const addForm = document.getElementById("add-form");

addReminderButton.addEventListener("click", () => {
    if(addForm.style.display ==="none") { //mirar por qué hay que hacer click dos veces para que se abra
        addForm.style.display = "block";
    } else {
        addForm.style.display = "none";
    }
});

addForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const task = {
        reminder: document.getElementById("add-textarea").value,
        weekDay: document.getElementById("week-day").value,
        monthDay: document.getElementById("month-day").value,
        month: document.getElementById("month").value,
    };

    let newReminder = JSON.parse(localStorage.getItem("reminders")) || [];
    
    newReminder.push(task);

    localStorage.setItem("reminders", JSON.stringify(newReminder));

    reminder.value = "";
    weekDay.value = "Mo";
    monthDay.value = "1";
    month.value = "Jan";

    const saveReminder = document.getElementById("save-reminder");
    saveReminder.addEventListener("click", () => {
        alert("Recordatorio guardado en tu agenda");
    })
});