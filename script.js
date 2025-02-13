let lastTap = 0;

document.addEventListener("touchstart", function (event) {
    let currentTime = new Date().getTime();
    let tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
        alert("Double Tap Detected!");
        // Perform your action here
    }

    lastTap = currentTime;
});


// Generate a unique ID for each note
function generateID() {
    return 'note-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  
  // Load notes from localStorage or initialize with pre-populated notes
  let notes = JSON.parse(localStorage.getItem('notes21')) || {};
  
  // Initialize with sample notes if empty
  if (Object.keys(notes).length === 0) {
    const initialNotes = [
    ];
    initialNotes.forEach(note => {
      const id = generateID();
      notes[id] = { text: note, timestamp: Date.now() };
    });
    localStorage.setItem('notes21', JSON.stringify(notes));
  }
  
  // Get DOM elements
  const searchBox = document.getElementById('search-box');
  const notesContainer = document.getElementById('notes-container');
  
  // Display notes when the page loads
  displayNotes(notes);
  
  // Listen for keydown events globally to show the search box
  document.addEventListener('keydown', (e) => {
    if (!searchBox.style.display || searchBox.style.display === 'none') {
      searchBox.style.display = 'block'; // Show the search box
      searchBox.focus(); // Focus on the input
    }
  });
  
  // Listen for input in the search box
  searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredNotes = Object.fromEntries(
      Object.entries(notes).filter(([key, noteObj]) => noteObj.text.toLowerCase().includes(query))
    );
    displayNotes(filteredNotes);
  });
  
  // Listen for Ctrl + Enter to save a new note
  searchBox.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      const content = searchBox.value.trim();
      if (content) {
        const id = generateID();
        notes[id] = { text: content, timestamp: Date.now() }; // Add new note with a timestamp
        localStorage.setItem('notes21', JSON.stringify(notes)); // Save to localStorage
        searchBox.value = ''; // Clear the input
        displayNotes(notes); // Refresh the notes list
      }
    }
  });
  
  // Function to display notes sorted by most recently edited/added
  function displayNotes(notesToShow) {
    const sortedNotes = Object.entries(notesToShow)
      .sort((a, b) => b[1].timestamp - a[1].timestamp) // Sort by timestamp (newest first)
      .map(([key, noteObj]) => `
        <div class="note-card" data-id="${key}">
          <p class="note-text">${noteObj.text}</p>
          <div class="note-actions">
            <span class="edit-icon" onclick="editNote('${key}')">✏️</span>
            <span class="delete-icon" onclick="deleteNote('${key}')">🗑️</span>
          </div>
        </div>
      `)
      .join('');
  
    notesContainer.innerHTML = sortedNotes;
  }
  
  // Function to delete a note
  function deleteNote(noteID) {
    delete notes[noteID]; // Remove the note from the map
    localStorage.setItem('notes21', JSON.stringify(notes)); // Update localStorage
    displayNotes(notes); // Refresh the notes list
  }
  
  // Function to edit a note and move it to the top
  function editNote(noteID) {
    const newText = prompt("Edit your note:", notes[noteID].text);
    if (newText !== null && newText.trim() !== "") {
      notes[noteID] = { text: newText.trim(), timestamp: Date.now() }; // Update note and timestamp
      localStorage.setItem('notes21', JSON.stringify(notes)); // Save to localStorage
      searchBox.value = newText.trim(); // Update search box with edited text
      searchBox.dispatchEvent(new Event('input')); // Trigger search to show only the edited note
      searchBox.focus();
    }
  }

  document.addEventListener('keydown', (e) => {
    if (searchBox.style.display === 'block' && document.activeElement !== searchBox) {
      searchBox.focus();
    }
  });

  // Toggle dark mode
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode')); // Save mode preference
  });
  
  // Load dark mode state on page load
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  
