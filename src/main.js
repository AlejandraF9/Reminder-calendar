import { createNewReminder, getAllReminders } from "./api/apiReminders";

const addReminderButton = document.getElementById("add-reminder");
const addForm = document.getElementById("add-form");

addReminderButton.addEventListener("click", () => {
    addForm.classList.toggle("visible");
});

addForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const task = {
        reminder: document.getElementById("add-textarea").value,
        weekDay: document.getElementById("week-day").value,
        monthDay: document.getElementById("month-day").value,
        month: document.getElementById("month").value,
    };

    await createNewReminder(task);

    let newReminder = JSON.parse(localStorage.getItem("reminders")) || [];
    
    newReminder.push(task);

    localStorage.setItem("reminders", JSON.stringify(newReminder));

    document.getElementById("add-textarea").value = "";
    document.getElementById("week-day").value = "Mo";
    document.getElementById("month-day").value = "1";
    document.getElementById("month").value = "Jan";

    alert("Recordatorio guardado en tu agenda");

    showReminders();
});

const reminderList = document.getElementById("reminder-list");

async function showReminders() {
    const dataReminders = await getAllReminders();
    reminderList.innerHTML = "";

    dataReminders.forEach(reminder => {
        const reminderLi = document.createElement("li");
        reminderLi.classList.add("reminder-item");

        reminderLi.innerHTML = `
        <span class="reminder-text">${reminder.reminder} - ${reminder.weekDay}, ${reminder.monthDay} - ${reminder.month}</span>
        <button class="complete-button">
            <img src="./src/assets/images/completed button.png" alt="icon for completed tasks" class="icon">
        </button>
        <button class="delete-button">
            <img src="./src/assets/images/delete button.png" alt="icon for delete tasks" class="icon">
        </button>`;

        reminderLi.querySelector(".complete-button").addEventListener("click", () => {
            reminderLi.classList.toggle("completed");
        });

        reminderLi.querySelector(".delete-button").addEventListener("click", () => {
            reminderLi.remove();
        });

        reminderList.appendChild(reminderLi);
    });
}