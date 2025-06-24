// const entryList = document.getElementById("entry-list");

//Handles loading, displaying, editing, deleting, and view single diary entry

const API_BASE_URL = "https://tunga-diary-api.onrender.com/api/fullstack";
const token = localStorage.getItem("token");


const element = {
  entries: document.getElementById("entries")
}

// Redirect to login if not logged in
if (!token) {
  alert("You must log in first.");
  window.location.href = "../pages/login-page.html";
}

// Fetch and display entries
async function fetchEntries() {
  try {
    const response = await axios.get(`${API_BASE_URL}/diary/entries`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
     

    const entries = response.data.entries || response.data.data || [];
    displayEntries(entries);
  } catch (error) {
    console.error(error);
    alert("Could not load entries.");
  }
}

// Display entries on the page
function displayEntries(entries) {
  const entriesContainer = document.getElementById("entries");
  if (!entriesContainer) {
      console.error("Element with ID 'entries' not found.");
      return;
  }
  
  entriesContainer.innerHTML = "";
  
  entries.forEach(entry => {
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry";
      const firstLine = entry.content.split('\n')[0];
        const truncatedContent = firstLine.length > 100 
            ? firstLine.substring(0, 100) + "..." 
            : firstLine;
      entryDiv.innerHTML = `
          <h3>${entry.title}</h3>
          <p>${truncatedContent}</p>
          <button class="edit-btn" data-id="${entry.id}">Edit</button>
          <button class="delete-btn" data-id="${entry.id}">Delete</button>
          <button class="view-btn" data-id="${entry.id}">View Entry</button>
      `;
      entriesContainer.appendChild(entryDiv);
  });
  document.getElementById('loadercontainer').style.display = 'none';
  
  // Add event listeners
  entriesContainer.addEventListener('click', function(e) {
    e.preventDefault()
      const id = e.target.dataset.id;
      if (e.target.classList.contains('edit-btn')) {
          editEntry(id);
      } else if (e.target.classList.contains('delete-btn')) {
          deleteEntry(id);
      } else if (e.target.classList.contains('view-btn')) {
          viewEntry(id);
 }
});
}

// Redirect to edit-entry page
function editEntry(entryId) {
  localStorage.setItem("editEntryId", entryId);
  window.location.href = "edit-entry.html";
  console.log(entryId);
}


// Redirect to single-entry view page
function viewEntry(entryId) {
  localStorage.setItem("viewEntryId", entryId);
  window.location.href = "single-entry-page.html";
}

// Delete an entry
async function deleteEntry(entryId) {
  if (!entryId) {
    console.error("No entryId provided to deleteEntry()");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this entry?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${API_BASE_URL}/diary/delete/${entryId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    alert("Entry Deleted successfully!");
    fetchEntries();
  } catch (error) {
    console.error("Delete error:", error);
    alert("Something went wrong. Try again.");
  }
}

document.addEventListener("DOMContentLoaded", fetchEntries);