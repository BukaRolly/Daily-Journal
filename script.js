// Sample user data
const users = {
    Natasch: { username: "Natasch", password: "Ilovehim", submissions: [] },
    Bubu: { username: "Bubu", password: "Iloveher", submissions: [] }
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
        document.getElementById('LogedUser').value = currentUser.username || username;
        displaySubmissions();
    } else {
        alert('Invalid username or password');
    }
});
