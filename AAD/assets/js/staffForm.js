$(document).ready(function () {

    // AJAX request to fetch all staff ids
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/staff",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#staffId");
            select.empty(); // Clear existing options if any

            // Populate select element with field codes
            data.forEach(function(staff) {
                select.append(new Option(staff.id));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading field codes:", error);
            alert("Failed to load field codes.");
        }
    });

    // AJAX request to fetch all field codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/fields",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#fieldCode");
            select.empty(); // Clear existing options if any

            // Populate select element with field codes
            data.forEach(function(field) {
                select.append(new Option(field.fieldCode));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading field codes:", error);
            alert("Failed to load field codes.");
        }
    });

    // AJAX request to fetch all vehicle codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/vehicles",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#vehicleCode");
            select.empty(); // Clear existing options if any

            // Populate select element with field codes
            data.forEach(function(vehicle) {
                select.append(new Option(vehicle.vehicleCode));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading vehicle codes:", error);
            alert("Failed to load vehicle codes.");
        }
    });

///////////////////////////////////////Save/////////////////////////////////////////////
    $("#save").click(function(event) {
        event.preventDefault();

        let nameE = $("#fieldName").val();
        let locationE = $("#location").val();
        let sizeE = $("#size").val();
        let img1E = $("#img1")[0].files[0]; // Access the file input's first file
        let img2E = $("#img2")[0].files[0];

        // Create a FormData object to hold the form data
        let formData = new FormData();
        formData.append("fieldName", nameE);
        formData.append("fieldLocation", locationE);
        formData.append("extentSize", sizeE);
        formData.append("fieldImage1", img1E); // Append the first image file
        formData.append("fieldImage2", img2E); // Append the second image file

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/fields",
            type: "POST",
            data: formData,
            processData: false, // Important: prevent jQuery from processing the data
            contentType: false, // Important: prevent jQuery from setting Content-Type header
            success: function(response) {
                alert("Field saved successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error saving field:", error);
                alert("Failed to save field.");
            }
        });
    });

///////////////////////////////////////Delete/////////////////////////////////////////////
    $("#delete").click(function(event) {
        event.preventDefault();

        let idE = $("#fieldCode").val();

        console.log(idE);

        const customerData = {
            cusId: idE,
        };

        console.log(customerData);

        const customerJSON = JSON.stringify(customerData);
        console.log(customerJSON);

        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/fields/" + idE,
            type: "DELETE",
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                alert("Field deleted successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error saving field:", error);
                alert("Failed to delete field.");
            }
        });
    });

/////////////////////////////////////Update///////////////////////////////////////////
    $("#update").click(function(event) {
        event.preventDefault();

        let idE = $("#fieldCode").val();
        let nameE = $("#fieldName").val();
        let locationE = $("#location").val();
        let sizeE = $("#size").val();
        let img1E = $("#img1")[0].files[0]; // Access the file input's first file
        let img2E = $("#img2")[0].files[0];

        // Create a FormData object to hold the form data
        let formData = new FormData();
        formData.append("fieldCode", idE);
        formData.append("fieldName", nameE);
        formData.append("fieldLocation", locationE);
        formData.append("extentSize", sizeE);
        formData.append("fieldImage1", img1E); // Append the first image file
        formData.append("fieldImage2", img2E); // Append the second image file

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/fields/"+idE,
            type: "PUT",
            data: formData,
            processData: false, // Important: prevent jQuery from processing the data
            contentType: false, // Important: prevent jQuery from setting Content-Type header
            success: function(response) {
                alert("Field update successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error update field:", error);
                alert("Failed to update field.");
            }
        });
    });

    //////////////////////////////////Clear/////////////////////////////////////////
    $("#clear").click(function() {
        clearFields()
    })
});

function clearFields() {
    document.getElementById('fieldName').value = '';
    document.getElementById('location').value = '';
    document.getElementById('size').value = '';
    document.getElementById('img1').value = '';
    document.getElementById('img2').value = '';
}

