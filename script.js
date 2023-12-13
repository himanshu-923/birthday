// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQYAnkl09XLMmvBa5lXipUFUWlU0yHex0",
  authDomain: "birthday-f337e.firebaseapp.com",
  projectId: "birthday-f337e",
  storageBucket: "birthday-f337e.appspot.com",
  messagingSenderId: "721849928533",
  appId: "1:721849928533:web:330886032ca6ffa3c23ddc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firestore
const db = firebase.firestore();

// Function to handle form submission
function submitForm(event) {
  event.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const wish = document.getElementById('wish').value;

  // Save data to Firestore
  db.collection("wishes").add({
    name: name,
    wish: wish,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    
    // Display a custom modal for the thank you message with "Yes" and "No" buttons
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';

    // Handle "Yes" button click
document.getElementById('modalYesButton').addEventListener('click', function() {
  // Display a picture with adjusted size
  const imagePath = 'qr.jpg';
  const imageSizeStyle = 'max-width: 60%; max-height: 60%;'; // Adjust the size as needed
  
  document.getElementById('modalContent').innerHTML = `<img src="${imagePath}" alt="Special Picture" style="${imageSizeStyle}">`;

  // Remove the buttons
  document.getElementById('modalButtons').style.display = 'none';
});


    // Handle "No" button click
    document.getElementById('modalNoButton').addEventListener('click', function() {
      // Display a "Thanks and Goodbye" message
      document.getElementById('modalContent').innerHTML = '<p>Thanks and Goodbye!</p>';
      
      // Remove the buttons
      document.getElementById('modalButtons').style.display = 'none';
    });
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    
    // Display an error message
    alert("Error submitting the wish. Please try again.");
  });
}

// Attach the submitForm function to the form's submit event
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('wishing-form');
  form.addEventListener('submit', submitForm);
});

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('confirmationModal');
  modal.style.display = 'none';
}