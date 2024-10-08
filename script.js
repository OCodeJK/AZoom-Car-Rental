function hamburger() {
    var links = document.getElementById("links");
    var hamburger = document.getElementById("hamburger_icon");
    var cross = document.getElementById("cross_icon");

    if (links.style.display === "block") {
        links.style.display = "none";
    }
    else {
        links.style.display = "block";
        hamburger.style.display = "none";
        cross.style.display = "block";
    }
}

function cross() {
    var links = document.getElementById("links");
    var hamburger = document.getElementById("hamburger_icon");
    var cross = document.getElementById("cross_icon");

    if (cross.style.display === "block") {
        cross.style.display = "none";
        hamburger.style.display = "block";
        links.style.display = "none";
    }
}

//Register-form retriever
function registerUser() {
    var user_register = document.getElementById("register_username").value;
    var pass_register = document.getElementById("register_password").value;

    localStorage.setItem('username', user_register);
    localStorage.setItem('password', pass_register);

    window.location.assign('reservation.html');
}

//Login-form retriever
function commenceLogin() {
    login = document.getElementById("login_form");
    login && login.addEventListener("submit", function (event) {
        event.preventDefault();

        //Register form user credentials in Local Storage
        var storedUsername = localStorage.getItem('username');
        var storedPassword = localStorage.getItem('password');

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username == storedUsername || password == storedPassword) {
            alert("Login Successful!");
            window.location.assign("reservation.html");
        } else {
            alert('Incorrect credentials.')
        }
    });
}

function logOut(){
    localStorage.clear();
    window.location.assign('index.html');
}


//Reservation-form retriever
reservation = document.getElementById("reseveration_form");
reservation && reservation.addEventListener("submit", function (event) {
    event.preventDefault();
    const creditCard = document.getElementById("credit_card").value;

    if (!validateCreditCard(creditCard)) {
        alert("Please enter a valid credit card number.");
        event.preventDefault(); // Prevent form submission
    }
    else {
        alert("Thank you for reserving with us!");
    }
});

function validateCreditCard(cardNumber) {
    // Basic validation for a 16-digit credit card number
    const regex = /^[0-9]{16}$/;
    return regex.test(cardNumber);
}
