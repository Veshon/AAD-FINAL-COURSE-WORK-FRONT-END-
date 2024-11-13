$(document).ready(function () {
    $("#save").click(function(event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();
        let profilePic = $("#profilePic")[0].files[0];
        let fName = $("#fName").val();
        let lName = $("#lName").val();
        let role = $("#role").val();
        let formData = new FormData();
        formData.append("firstName", fName);
        formData.append("lastName", lName);
        formData.append("profilePic", profilePic);
        formData.append("role", role);
        formData.append("password", password);
        formData.append("email", email);
        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/auth/signup",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // Assuming the response contains a JWT token (e.g., response.token)
                const jwtToken = response.token;
                // Store JWT token in localStorage
                localStorage.setItem("jwtToken", jwtToken);
                // Log the token to the console
                console.log("JWT Token:", jwtToken);
                Swal.fire({
                    title: "Saved!",
                    text: "User saved successfully!",
                    icon: "success"
                });
            },
            error: function(xhr, status, error) {
                console.error("Error saving user:", error);
                alert("Failed to save user.");
            }
        });
    });
});