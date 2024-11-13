/*
$(document).ready(function () {
    // Existing code for save button...

    // Delete button event
    $("#homeBtn").click(function(event) {
        event.preventDefault();

        // Assuming you're deleting based on email
        let email = $("#email").val();

        $.ajax({
            url: `http://localhost:5050/fcw/api/v1/users/`+email, // Adjust the URL if needed
            type: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwtToken")
            },
            success: function(response) {
                Swal.fire({
                    title: "Deleted!",
                    text: "User deleted successfully!",
                    icon: "success"
                }).then(() => {
                    // Optionally clear fields or redirect as needed
                    clearFields();
                    window.location.href = "index.html"; // Replace with your actual URL
                });
            },
            error: function(xhr, status, error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user.");
            }
        });
    });

    function clearFields() {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('role').value = '';
        document.getElementById('fName').value = '';
        document.getElementById('lName').value = '';
        document.getElementById('profilePic').value = '';
    }
});
*/
