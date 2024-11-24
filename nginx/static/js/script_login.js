const loginEl = document.getElementById('loginForm');

loginEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Login successful');
            window.location = '/profile';
        } else {
            console.log('Login failed');
            document.getElementById('errorMessage').innerText = 'Login failed';
            $('#errorModal').modal('show');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMessage').innerText = 'Error: ' + error;
        $('#errorModal').modal('show');
    });
});
