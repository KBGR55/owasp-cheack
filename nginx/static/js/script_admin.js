const usersEl = document.getElementById('users');
const errorEl = document.getElementById('error');

errorEl.addEventListener('click', () => {
    errorEl.innerText = '';
});

// fetch users and populate list
const fetchUsers = async () => {
    console.log('Fetching users...');
    console.log(`Cookies: ${document.cookie}`);
    const session = document.cookie.split(';').find(c => {
        console.log(`Cookie: ${c}`);
        return c.includes('main_session');
    });
    console.log(`Session: ${session}`);

    if (!session) {
        // redirect to logout
        window.location.href = '/logout';
    }

    fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': session
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Users fetched');
                return response.json();
            } else {
                console.log('Users fetch failed');
                throw new Error('Users fetch failed');
            }
        })
        .then(users => {
            console.log('Users:', users);
            users.forEach(user => {
                const div = document.createElement('div');
               div.className='col-lg-3 col-sm-6';
                div.innerHTML = `
                    <div class="box ">
                        <div class="img-box"> <img src="/files/${user.username}.jpg" width="100" height="100"> </div>
                        <div class="detail-box">
                        <h5> ${user.first_name} ${user.last_name}</h5>
                        <p>Email: ${user.email}</p>
                        <p>Phone: ${user.phone}</p>
                        <p>LinkedIn: ${user.website}</p>
                        </div>
                        <div class="social_box">
                           <a href="/payments?userId=${user.id}">
                                <i class="fa fa-credit-card" aria-hidden="true"" style="font-size: 20px;"></i> Payments
                            </a>
                            <a href="/courses?userId=${user.id}">
                                <i class="fa fa-graduation-cap" aria-hidden="true" style="font-size: 20px;"></i> Courses
                            </a>
                        </div>
                    </div>
            `;
                usersEl.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            errorEl.innerText = error;
        });
};

fetchUsers();