$(document).ready(function () {
    // Check if the profile image is saved in localStorage
    const profilePic = localStorage.getItem("profilePic");

    if (profilePic) {
        // If there is a profile picture saved, set it as the source of the img tag
        $("#profileImage").attr("src", profilePic);  // Assuming your img tag has id="profileImage"
    }

    // Retrieve the JWT token from localStorage (if it exists)
    const jwtToken = localStorage.getItem("jwtToken");
    console.log("Current JWT Token:", jwtToken); // Log existing token if any

    // Login button click handler
    $("#loginButton").click(function(event) {
        event.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();

        // Prepare data for login
        let loginData = {
            email: email,
            password: password
        };

        // Send AJAX request for login
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/auth/signin",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(loginData),
            success: function(response) {
                const jwtToken = response.token; // Get the token from the response

                // Store the new JWT token in localStorage
                localStorage.setItem("jwtToken", jwtToken);

                // Print the newly created JWT token in the console
                console.log("New JWT Token:", jwtToken);

                // Remove the profile picture from localStorage and reset the img tag
                localStorage.removeItem("profilePic");  // Remove profile picture from localStorage
                $("#profileImage").attr("src", "");  // Clear the image displayed

                // Show success message
                Swal.fire({
                    title: "Logged In!",
                    text: "Login successful!",
                    icon: "success"
                }).then(() => {
                    // Redirect to the desired page after login
                    window.location.href = "index.html"; // Replace with your actual target page
                });
            },
            error: function(xhr, status, error) {
                console.error("Login error:", error);
                Swal.fire({
                    title: "Login Failed",
                    text: "Invalid email or password.",
                    icon: "error"
                });
            }
        });
    });
});
