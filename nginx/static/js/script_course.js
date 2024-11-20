const courseEl = document.getElementById('course');
const loginEl = document.getElementById('login');
const profileEl = document.getElementById('profile');
const logoutEl = document.getElementById('logout');

// if user is logged in, show profile link and hide login link
if (document.cookie.includes('main_session')) {
    loginEl.style.display = 'none';
} else {
    profileEl.style.display = 'none';
    logoutEl.style.display = 'none';
}

// read courseId from url query
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

// fetch course and populate list
fetch(`/api/courses/${courseId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(async (data) => {
        console.log(`Course data: ${JSON.stringify(data)}`);
        const authorId = data.author_id;
        const author = await fetch(`/api/authors?datasource=https://dummyjson.com/users/${authorId}`).then(res => res.json());

        courseEl.innerHTML = `
          <div class="heading_container heading_center">
                    <h2 class="">
                        Course <span> ${data.course_name}</span>
                    </h2>
                </div>
         <div class="team_container">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-sm-8">
                            <div class="box ">
                                <div class="img-box">
                                      <img src="${author.image}" alt="${author.name}" width="100" height="100">
                                </div>
                                <div class="detail-box">
                                    <h5> <p>${author.firstName} ${author.lastName}</p></h5>
                                    <p>${data.course_code}</p>
                                    <p> ${data.course_description} </p>
                                </div>
                                <div class="social_box">
                                    <a href="#" class="d-flex align-items-center">
                                        <i class="fa fa-envelope" aria-hidden="true"></i>
                                        <p class="mb-0 ml-2">${author.email}</p>  <!-- "mb-0" elimina el margen inferior, "ml-2" agrega un margen izquierdo -->
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

`;
        console.log('Course data fetched and populated list');
    })
    .catch(error => {
        console.error('Error:', error);
        courseEl.innerText = 'Error: ' + error;
    });
