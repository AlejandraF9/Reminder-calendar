const baseUrl = "https://68c834775d8d9f514734a5d4.mockapi.io/api/calendar";

export async function getAllReminders() {
    const url = `${baseUrl}/reminders`;

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("Error en la petición getAllReminders");
        }
        const reminders = await response.json();
        return reminders;
    } catch(error) {
        console.error("Error", error);
    }
}

export async function createNewReminder(task) {
   const url = `${baseUrl}/reminders`;
   
   try {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            reminder: task.reminder,
            weekDay: task.weekDay,
            monthDay: task.monthDay,
            month: task.month
        }),
    });

    if(!response.ok) {
        throw new Error("Error en la petición createNewReminder");
    }
    const newReminder = await response.json();
    return newReminder;
   } catch(error) {
    console.error("Error", error);
   }
}

export async function deleteReminder(id) {
  const url = `${baseUrl}/reminders/${id}`;
  try {
    const response = await fetch(url, { method: "DELETE" });
    
    if (!response.ok) {
        throw new Error("Error eliminando el recordatorio");
    }
  } catch (error) {
    console.error("Error", error);
  }
}