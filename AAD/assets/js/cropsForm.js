$(document).ready(function () {

    // AJAX request to fetch all crop codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/crops",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#cropCode");
            select.empty(); // Clear existing options if any

            // Populate select element with field codes
            data.forEach(function(crop) {
                select.append(new Option(crop.code));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading crop codes:", error);
            alert("Failed to load crop codes.");
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
            console.error("Error loading crop codes:", error);
            alert("Failed to load crop codes.");
        }
    });

///////////////////////////////////////Save/////////////////////////////////////////////
    $("#save").click(function(event) {
        event.preventDefault();

        let commonName = $("#commonName").val();
        let scientificName = $("#scientificName").val();
        let cropImg = $("#image")[0].files[0];
        let category = $("#category").val();
        let season = $("#season").val();
        let fieldCode = $("#fieldCode").val();


        // Create a FormData object to hold the form data
        let formData = new FormData();
        formData.append("commonName", commonName);
        formData.append("scientificName", scientificName);
        formData.append("cropImg", cropImg); // Append the first image file
        formData.append("category", category);
        formData.append("season", season);
        formData.append("fieldCode", fieldCode);

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/crops",
            type: "POST",
            data: formData,
            processData: false, // Important: prevent jQuery from processing the data
            contentType: false, // Important: prevent jQuery from setting Content-Type header
            success: function(response) {
                alert("Crop saved successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error saving crops", error);
                alert("Failed to save crop.");
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

