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

//sets up a admin account for testing on startup
localStorage.setItem('admin_username', "admin");
localStorage.setItem('admin_password', "admin123");

//sets up a user account for testing on startup
// localStorage.setItem('username', "Bob");
// localStorage.setItem('password', '123');

//Register-form retriever
function registerUser() {
    var user_register = document.getElementById("register_username").value;
    var pass_register = document.getElementById("register_password").value;

    register = document.getElementById("register_form");
    register.addEventListener("click", function (event) {
        event.preventDefault();

        if (localStorage.getItem('username') == user_register) {
            alert("Username already exists");
            register.reset(); //reset register form
        } else {
            localStorage.setItem('username', user_register);
            localStorage.setItem('password', pass_register);

            window.location.assign('reservation.html');
        }
    });

}



//Login-form retriever
function commenceLogin() {
    login = document.getElementById("login_form");
    login.addEventListener("submit", function (event) {
        event.preventDefault();

        //Register form user credentials in Local Storage
        var storedUsername = localStorage.username;
        var storedPassword = localStorage.password;

        //Retrieve the already made admin account in Local Storage
        var storedadminUser = localStorage.admin_username;
        var storedadminPass = localStorage.admin_password;

        //get the DOM attribute username and password from login form
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        //Authentication
        if (username == storedUsername || password == storedPassword) {
            alert("Login Successful!");
            window.location.assign("index.html");

        } else if (username == storedadminUser && password == storedadminPass) {
            alert("Welcome back Employee!");
            window.location.assign("index.html");

        } else {
            alert("Incorrect credentials.");
        }
    });
}

//Permanent login for now because admin_username is in localStorage on start up
function checkLoginStatus() {
    //check if the key "username" is in localStorage
    try {
        if ("username" in localStorage) {
            const loginBtn = document.getElementById("loginBtn");
            const signupBtn = document.getElementById("signupBtn");
            const logoutBtn = document.getElementById("logoutBtn");
            const reservationBtn = document.getElementById("reservationBtn");
            const returningBtn = document.getElementById("returningBtn");

            loginBtn.classList.add("hidden");
            signupBtn.classList.add("hidden");

            logoutBtn.classList.remove("hidden");
            reservationBtn.classList.remove("hidden");
            returningBtn.classList.remove("hidden");

        } else if ("admin_username" in localStorage) {
            const loginBtn = document.getElementById("loginBtn");
            const signupBtn = document.getElementById("signupBtn");
            const logoutBtn = document.getElementById("logoutBtn");
            const reservationBtn = document.getElementById("reservationBtn");
            const returningBtn = document.getElementById("returningBtn");
            const fileReportBtn = document.getElementById("fileReportBtn");

            loginBtn.classList.add("hidden");
            signupBtn.classList.add("hidden");

            logoutBtn.classList.remove("hidden");
            reservationBtn.classList.remove("hidden");
            returningBtn.classList.remove("hidden");
            fileReportBtn.classList.remove("hidden");
        }
    } catch (TypeError) {}

}

checkLoginStatus();

function logOut() {
    //check if the "username" key is in localStorage
    if ("username" in localStorage) {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        alert("Logging out...");
        window.location.assign('index.html');
    }
}

//<---  RESERVATION FORM PORTION --->//
try {
    //set the start date to the current date from local computer
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('rental_start').value = now.toISOString().slice(0, 16);

    //get the date of 1 week later
    var oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    //for formatting date
    function formatDate(date) {
        date = date.toISOString().slice(0, 16);
        return date;
    }

    // set min-max start date from the current date from local computer
    let dateInputStart = document.getElementById("rental_start");
    dateInputStart.min = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
    document.getElementById("rental_start").max = formatDate(oneWeekLater);

    // set min-max end date from the current date from local computer
    let dateInputEnd = document.getElementById("rental_end");
    dateInputEnd.min = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
    document.getElementById("rental_end").max = formatDate(oneWeekLater);
} catch (TypeError) {}




//Reservation-form retriever
reservation = document.getElementById("reservation_form");
reservation && reservation.addEventListener("submit", function (event) {

    event.preventDefault();

    //retrieve value upon submit button pressed from reservation-form
    const creditCard = document.getElementById("credit_card").value;
    const licenceNo = document.getElementById("licence_number").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rentalStart = document.getElementById("rental_start").value;
    const rentalEnd = document.getElementById("rental_end").value;
    const carModel = document.getElementById("car_select").value;

    //concatenating every info to put into the txt file receipt
    let receipt = "AZoom Car Rental Receipt"+ "\n" //title 
        + "Licence Number: " + licenceNo + "\n" //Licence Number of the user
        + "Credit-Card: ************" + creditCard.substr(creditCard.length - 4) + "\n" //Credit card info
        + "Name: " + name + "\n" //Name
        + "Email: " + email + "\n" //Email
        + "Duration: " + rentalStart + " - " + rentalEnd + "\n" //Duration of the rent
        + "Car Model: " + carModel; //Car Model


    function validateCreditCard(cardNumber) {
        // Basic validation for a 16-digit credit card number
        const regex = /^[0-9]{16}$/;
        return regex.test(cardNumber);
    }

    function validateLicenseCard(cardNumber) {
        //Basic validation for 9 alphanumeric license number
        const regex = /^[A-Za-z]{1}[0-9]{7}[A-Za-z]{1}$/;
        return regex.test(cardNumber);
    }

    if (!validateCreditCard(creditCard)) {
        alert("Please enter a valid credit card number.");
    } else if (!validateLicenseCard(licenceNo)){
        alert("Please enter a valid license number.");
    } else {
        let blobdtMIME = new Blob([receipt], { type: "text/plain" });
        let url = URL.createObjectURL(blobdtMIME);
        let anele = document.createElement("a");
        anele.setAttribute("download", "Reservation_Receipt");
        anele.href = url;
        anele.click();
        alert("Thank you for reserving with us!");
    }
});

// REPORT FORM SECTION
const imageInput = document.getElementById("car_damage_image");
const preview = document.getElementById("preview");

report = document.getElementById("report_form");
report && report.addEventListener("submit", function(event){
    event.preventDefault();

    licenceNumber = document.getElementById("licence_number").value;
    imageString = imageInput.value;

    let final_report = "Employee Report Submission" + "\n" 
    + "Licence Number: *****" //concat together licence number and photo evidence
    + licenceNumber.substr(licenceNumber.length - 4) + "\n" 
    + "Photo Evidence: " + imageString; 

    let blobdtMIME = new Blob([final_report], { type: "text/plain" });
    let url = URL.createObjectURL(blobdtMIME);
    let anele = document.createElement("a");
    anele.setAttribute("download", "Report_*****"+ licenceNumber.substr(licenceNumber.length - 4));
    anele.href = url;
    anele.click();
    alert("Report Submitted.");

});

// Function to handle image selection and preview
imageInput.addEventListener("change", function() {
    const file = this.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader(); // Create a FileReader

        reader.onload = function(e) {
            // Set the preview image src to the file's data URL
            preview.src = e.target.result;
            preview.style.display = "block"; // Show the preview image
        };

        reader.readAsDataURL(file); // Read the file as a Data URL
    }
});
