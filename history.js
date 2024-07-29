const users = {
    userA: { username: "userA", password: "passwordA", submissions: [] },
    userB: { username: "userB", password: "passwordB", submissions: [] }
};

let currentUser = null;

// Retrieve current user from localStorage (or use other method)
function getCurrentUser() {
    const username = localStorage.getItem('currentUser');
    if (username && users[username]) {
        currentUser = users[username];
        displayHistory();
    } else {
        alert('No user logged in.');
        window.location.href = 'index.html';
    }
}

document.getElementById('goBack').addEventListener('click', function() {
    window.location.href = 'index.html';
});

function displayHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    currentUser.submissions.forEach(submission => {
        const li = document.createElement('li');
        li.textContent = `Date: ${new Date(submission.timestamp).toLocaleString()}, Data: ${JSON.stringify(submission)}`;
        historyList.appendChild(li);
    });

    Object.keys(users).forEach(username => {
        if (username !== currentUser.username) {
