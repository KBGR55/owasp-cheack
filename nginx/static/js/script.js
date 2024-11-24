const coursesEl = document.getElementById('courses');
const loginEl = document.getElementById('login');
const profileEl = document.getElementById('profile');
const logoutEl = document.getElementById('logout');

if (document.cookie.includes('main_session')) {
    loginEl.style.display = 'none';
} else {
    profileEl.style.display = 'none';
    logoutEl.style.display = 'none';
}

fetch('/api/courses', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(`Courses data: ${JSON.stringify(data)}`);
        coursesEl.innerHTML = data.map(course => `
            <div class="col-md-4">
                <div class="box">
                    <div class="img-box">
                        <img src="images/s1.png" alt="">
                    </div>
                    <div class="detail-box">
                        <h5>${course.course_name} - #${course.course_code}</h5>
                        <p>${course.course_description}</p>
                        <a href="/course?courseId=${course.id}">View course</a>
                    </div>
                </div>
            </div>
        `).join('');
        console.log('Courses data fetched and populated list');
    })