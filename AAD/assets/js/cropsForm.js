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

        let code = $("#cropCode").val();

        console.log(code);

        const cropData = {
            cusId: code,
        };

        console.log(cropData);

        const cropJSON = JSON.stringify(cropData);
        console.log(cropJSON);

        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/crops/" + code,
            type: "DELETE",
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                alert("Crop deleted successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error deleting crop:", error);
                alert("Failed to delete crop.");
            }
        });
    });

/////////////////////////////////////Update///////////////////////////////////////////
    $("#update").click(function(event) {
        event.preventDefault();

        let code = $("#cropCode").val();
        let commonName = $("#commonName").val();
        let scientificName = $("#scientificName").val();
        let image = $("#image")[0].files[0];
        let category = $("#category").val();
        let season = $("#season").val();
        let fieldCode = $("#fieldCode").val();


        // Create a FormData object to hold the form data
        let formData = new FormData();
        formData.append("code", code);
        formData.append("commonName", commonName);
        formData.append("scientificName", scientificName);
        formData.append("cropImg", image);
        formData.append("category", category);
        formData.append("season", season);
        formData.append("fieldCode", fieldCode);

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/crops/"+code,
            type: "PUT",
            data: formData,
            processData: false, // Important: prevent jQuery from processing the data
            contentType: false, // Important: prevent jQuery from setting Content-Type header
            success: function(response) {
                alert("Crop update successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error update crop:", error);
                alert("Failed to update crop.");
            }
        });
    });

    //////////////////////////////////Clear/////////////////////////////////////////
    $("#clear").click(function() {
        clearFields()
    })
});

function clearFields() {
    document.getElementById('commonName').value = '';
    document.getElementById('scientificName').value = '';
    document.getElementById('image').value = '';
    document.getElementById('category').value = '';
    document.getElementById('season').value = '';
}

