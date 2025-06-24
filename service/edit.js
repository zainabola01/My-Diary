
// document.addEventListener("DOMContentLoaded", loadEntry);
  
const API_BASE_URL = "https://tunga-diary-api.onrender.com/api/fullstack";
const token = localStorage.getItem("token");
const entryId = localStorage.getItem("editEntryId");
console.log(entryId)
if (!token || !entryId) {
  alert("Unauthorized or no entry selected.");
  window.location.href = "view-entry.html";
}

// Load existing entry into form
async function loadEntry() {
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

    document.getElementById("title").value = data.data.title;
    document.getElementById("content").value = data.data.content;

  } catch (error) {
    console.error(error);
    alert("Failed to load entry.");
  }
}
// object.addEventListener("load", loadEntry);

// Handle update form submission
document.getElementById("edit-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const updatedTitle = document.getElementById("title").value;
  const updatedContent = document.getElementById("content").value;

  try {
    const response = await fetch(`${API_BASE_URL}/diary/update/${entryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title: updatedTitle,
        content: updatedContent
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update entry.");
    }

    alert("Entry updated successfully!");
    localStorage.removeItem("editEntryId");
    window.location.href = "view-entry.html";

  } catch (error) {
    console.error(error);
    alert("Failed to update entry.");
  }
});

document.addEventListener("DOMContentLoaded", loadEntry);
