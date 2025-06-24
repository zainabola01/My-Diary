const API_BASE_URL = "https://tunga-diary-api.onrender.com/api/fullstack";
const token = localStorage.getItem("token");
const entryId = localStorage.getItem("viewEntryId");

if (!token || !entryId) {
  alert("No entry selected.");
  window.location.href = "view-entry.html";
}

async function loadSingleEntry() {
  try {
    const response = await fetch(`${API_BASE_URL}/diary/entry/${entryId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log(data)

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch entry.");
    }

    document.getElementById("entry-title").innerText = data.data.title;
    document.getElementById("entry-content").innerText = data.data.content;
    // document.getElementById("entry-date").innerText = new Date(data.date).toLocaleString();

  } catch (error) {
    console.error(error);
    alert("Unable to load entry.");
  }
}

document.addEventListener("DOMContentLoaded", loadSingleEntry);
