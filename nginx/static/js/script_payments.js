const paymentsEl = document.getElementById('payments');
const fetchPayments = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    };

    fetch(`/api/users/${userId}/payments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const carouselContainer = document.querySelector('.owl-carousel');
        carouselContainer.innerHTML = '';

        paymentsEl.innerHTML = data.map(payment => {
            const courseItem = `
                <div class="item">
                    <div class="box">
                        <div class="img-box">
                            <img src="/images/payments.png" alt="Payment image" class="box-img">
                        </div>
                        <div class="detail-box">
                            <div class="client_id">
                                <div class="client_info">
                                    <h6>Date: ${formatDate(payment.date)}</h6>
                                    <p>ID: ${payment.id}</p>
                                </div>
                                <i class="fa fa-credit-card" aria-hidden="true"></i>
                            </div>
                            <p>Amount: $${payment.amount}</p>
                        </div>
                    </div>
                </div>
            `;
            carouselContainer.innerHTML += courseItem; 
        });

        $('.owl-carousel').owlCarousel({loop: true,margin: 20, nav: true, items: 2,
            navText: ["<", ">"], responsive: { 0: { items: 1 }, 768: { items: 2 } }
        });
    })
    .catch(error => {
        console.error('Error fetching payments:', error);
    });
};

window.onload = fetchPayments;