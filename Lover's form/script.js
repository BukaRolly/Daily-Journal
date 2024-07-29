// Sample user data
const users = {
    userA: { username: "userA", password: "passwordA", submissions: [] },
    userB: { username: "userB", password: "passwordB", submissions: [] }
};

let currentUser = null;

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        localStorage.setItem('currentUser', username); // Store current user in localStorage
        document.getElementById('auth').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        displaySubmissions();
    } else {
        alert('Invalid username or password');
    }
});

// Handle questionnaire form submission
document.getElementById('questionnaireForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!currentUser) {
        alert('You need to be logged in to submit the form.');
        return;
    }

    const form = new FormData(e.target);
    const data = {};
    form.forEach((value, key) => {
        data[key] = value;
    });
    data.timestamp = new Date().toISOString();
    data.username = currentUser.username; // Include username for the sheet
    data.shareWithOther = document.getElementById('shareWithOther').checked;

    currentUser.submissions.push(data);
    displaySubmissions();

    fetch('https://script.google.com/macros/s/AKfycbw8KJ35lyHawPJV_AD8xpb6n8_z5Oxj5EvLCRT5mrBn50dG0X5XXJoxbcPeC9Djur4/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'  // Ensure this is set to 'cors'
    }).then(response => response.json())
      .then(result => {
          console.log('Success:', result);
      }).catch(error => {
          console.error('Error:', error);
      });
    
});

// Navigate to history page
document.getElementById('viewHistory').addEventListener('click', function() {
    window.location.href = 'history.html';
});

// Display submissions in the profile view
function displaySubmissions() {
    const submissionList = document.getElementById('submissionList');
    submissionList.innerHTML = '';
    if (currentUser) {
        currentUser.submissions.forEach(submission => {
            const li = document.createElement('li');
            li.textContent = `Submitted on ${new Date(submission.timestamp).toLocaleString()}: ${JSON.stringify(submission)}`;
            submissionList.appendChild(li);
        });
    }
}

// Check if user is logged in on page load
window.onload = function() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser && users[storedUser]) {
        currentUser = users[storedUser];
        document.getElementById('auth').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        displaySubmissions();
    } else {
        document.getElementById('auth').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }
};
