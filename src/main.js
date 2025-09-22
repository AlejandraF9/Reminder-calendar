import { createNewReminder, getAllReminders, deleteReminder } from "./api/apiReminders";
import { validateTextarea } from "./utils/validations";
import { showToast } from "./utils/toastify";

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

    const validReminder = validateTextarea(task.reminder);
    if(!validReminder) {
        return;
    }

    await createNewReminder(task);

    showReminders();

    document.getElementById("add-textarea").value = "";
    document.getElementById("week-day").value = "Mo";
    document.getElementById("month-day").value = "1";
    document.getElementById("month").value = "Jan";

    showToast({text: "Recordatorio guardado en tu agenda", type: "success"});
});

const weekDaysMap = {
    Mo: "Lunes",
    Tu: "Martes",
    We: "Miércoles",
    Th: "Jueves",
    Fr: "Viernes",
    St: "Sábado",
    Su: "Domingo",
};

const monthsMap = {
    Jan: "Enero",
    Feb: "Febrero",
    Mar: "Marzo",
    Apr: "Abril",
    May: "Mayo",
    Jun: "Junio",
    Jul: "Julio",
    Aug: "Agosto",
    Sep: "Septiembre",
    Oct: "Octubre",
    Nov: "Noviembre",
    Dec: "Diciembre",
};

const reminderList = document.getElementById("reminder-list");
const completedList = document.getElementById("completed-list");

async function showReminders() {
    const dataReminders = await getAllReminders();
    reminderList.innerHTML = "";
    completedList.innerHTML = "";

    dataReminders.forEach(reminder => {
        const reminderLi = document.createElement("li");
        reminderLi.classList.add("reminder-item");

        reminderLi.innerHTML = `
        <span class="reminder-text">${reminder.reminder} - ${weekDaysMap[reminder.weekDay]} ${reminder.monthDay} de ${monthsMap[reminder.month]}</span>
        <button class="completed-button">
            <img src="/src/assets/images/completed icon.png" alt="icon for completed tasks" class="icon">
        </button>
        <button class="delete-button">
            <img src="/src/assets/images/delete icon.png" alt="icon for delete tasks" class="icon">
        </button>`;

        reminderLi.querySelector(".completed-button").addEventListener("click", () => {
            const completedList = document.getElementById("completed-list");
            reminderLi.classList.toggle("completed");
            completedList.appendChild(reminderLi);

            const completedButton = reminderLi.querySelector(".completed-button");
            completedButton.disabled = true;
            completedButton.style.opacity = "0.5";
            completedButton.style.cursor = "not-allowed";
        });

        reminderLi.querySelector(".delete-button").addEventListener("click", async () => {
            await deleteReminder(reminder.id);
            showReminders();
        });

        reminderList.appendChild(reminderLi);
    });
}

showReminders();

//incluir toastify para botón de eliminar