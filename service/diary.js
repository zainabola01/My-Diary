const API_BASE_URL = "https://tunga-diary-api.onrender.com/api/fullstack";
const token = localStorage.getItem("token");

if (!token) {
  alert("You must log in to write a new diary entry.");
  window.location.href = "login.html";
  e.preventDefault();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const date = document.getElementById("date").value;

    try {
      const response = await fetch(`${API_BASE_URL}/diary/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, date })
      });

      if (!response.ok) throw new Error("Failed to save entry.");

      const result = await response.json();
      alert("Diary entry saved successfully!");
      window.location.href = "view-entry.html";
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  });
});
