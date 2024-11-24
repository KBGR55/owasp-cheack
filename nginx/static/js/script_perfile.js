const profile = document.getElementById('profile');
const profilePicture = document.getElementById('profile-picture');
const errorEl = document.getElementById('error');
const successEl = document.getElementById('success');
const coursesEl = document.getElementById('courses');
const paymentsEl = document.getElementById('payments');
const adminEl = document.getElementById('admin');
const linkedinInput = document.getElementById('linkedin-input');
const linkedinPreview = document.getElementById('linkedin-preview');

linkedinInput.addEventListener('input', () => {
    linkedinPreview.innerText = `linkedin.com/in/${linkedinInput.value}`
    linkedinPreview.href = `https://linkedin.com/in/${linkedinInput.value}`;
});

const fetchUserData =  async () => {
    const session = document.cookie.split(';').find(c => {
        console.log(`Cookie: ${c}`);
        return c.includes('main_session');
    });

    if (!session) {
        window.location.href = '/logout';
    }

    const sessionData = atob(decodeURIComponent(session.split('=')[1]));
    const { userId, role } = JSON.parse(sessionData);

    if (role !== 'admin') {
        adminEl.style.display = 'none';
    }

    coursesEl.href = `/courses?userId=${userId}`;
    paymentsEl.href = `/payments?userId=${userId}`;

    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();

    const { username, bio, first_name, last_name, email, phone, website } = data;
    profilePicture.src = `/files/${username}.jpg`;
    profile.username.value = username;
    profile.bio.value = bio;
    profile.first_name.value = first_name;
    profile.last_name.value = last_name;
    profile.email.value = email;
    profile.phone.value = phone;
    profile.website.value = website;
    linkedinPreview.innerText = `linkedin.com/in/${website}`;
    linkedinPreview.href = `https://linkedin.com/in/${website}`;
    console.log('User data fetched and populated form');
};
fetchUserData();

profile.addEventListener('submit', async (e) => {
    e.preventDefault();

    const session = document.cookie.split(';').find(c => c.includes('main_session'));
    const sessionData = atob(decodeURIComponent(session.split('=')[1]));
    const { userId } = JSON.parse(sessionData);

    const formData = new FormData(profile);
    const formDataObject = Object.fromEntries(formData);

    fetch(`/api/users/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('successMessage').innerText = 'Update successful'; 
            $('#successModal').modal('show');
        } else {
            document.getElementById('errorMessage').innerText = 'Update failed';
            $('#errorModal').modal('show');
        }
    })    
    .catch(error => {
        document.getElementById('errorMessage').innerText = error;         
        $('#errorModal').modal('show');
    });
});
