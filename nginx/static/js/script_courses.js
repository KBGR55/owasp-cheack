const fetchCourses = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    fetch(`/api/users/${userId}/courses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            const carouselContainer = document.querySelector('.owl-carousel');
            carouselContainer.innerHTML = '';

            data.forEach(course => {
                const courseItem = `
                <div class="item">
                    <div class="box">
                        <div class="img-box">
                            <img src="images/curso.png" alt="" class="box-img">
                        </div>
                        <div class="detail-box">
                            <div class="client_id">
                                <div class="client_info">
                                    <h6>Name: ${course.course_name}</h6>
                                    <p>ID: ${course.id}</p>
                                </div>
                                <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                            </div>
                            <p>Code: ${course.course_code}<br/>Description: ${course.course_description}</p>
                        </div>
                    </div>
                </div>
            `;
                carouselContainer.innerHTML += courseItem;
            });

            $('.owl-carousel').owlCarousel({
                loop: true, margin: 20,nav: true, items: 2,   navText: ["<", ">"],
                responsive: { 0: {items: 1, }, 768: { items: 2, }}
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
};

window.onload = fetchCourses;