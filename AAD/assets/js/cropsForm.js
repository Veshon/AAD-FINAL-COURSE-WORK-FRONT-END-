$(document).ready(function () {

    $("#load").click(function(event) {
        event.preventDefault();

        let selectedFieldCode = $("#cropCode").val(); // Get the selected field code from input or dropdown

        if (selectedFieldCode) {
            // AJAX request to get field data
            $.ajax({
                url: "http://localhost:5050/fcw/api/v1/crops/" + selectedFieldCode,
                type: "GET",
                contentType: "application/json",
                success: function(data) {
                    // Populate the form fields with the received data
                    $("#commonName").val(data.commonName);
                    $("#scientificName").val(data.scientificName);
                    $("#category").val(data.category);
                    $("#season").val(data.season);
                    $("#fieldCode").val(data.fieldCode);

                    // Display base64 images as previews
                    if (data.cropImg) {
                        $("#cropImgPreview").attr("src", "data:image/jpeg;base64," + data.cropImg);
                    } else {
                        $("#cropImgPreview").attr("src", ""); // Clear if no image
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching field data:", error);
                    alert("Failed to load field data.");
                }
            });
        } else {
            alert("Please enter a valid field code.");
        }
    });


    // AJAX request to fetch all crop codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/crops",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#cropCode");
            select.empty(); // Clear existing options if any
            select.append(new Option("Select crop code"));

            // Populate select element with field codes
            data.forEach(function(crop) {
                select.append(new Option("Name: "+crop.commonName + " - Category: "+crop.category));
                select.append(new Option(crop.code));
                select.append(new Option("______________________________________________________"));
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
            select.append(new Option("Select field code"));

            // Populate select element with field codes
            data.forEach(function(field) {
                select.append(new Option("Name: " + field.fieldName + " - Location: "+field.fieldLocation));
                select.append(new Option(field.fieldCode));
                select.append(new Option("______________________________________________________"));
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
                Swal.fire({
                    title: "Saved!",
                    text: "Crop saved successfully!",
                    icon: "success"
                });
            },
            error: function(xhr, status, error) {
                console.error("Error saving crop", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error saving crop!",
                });
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

        // SweetAlert2 confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "http://localhost:5050/fcw/api/v1/crops/" + code,
                    type: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    success: function(response) {
                        clearFields(); // Clear fields only after successful deletion
                        clearFields()
                    },
                    error: function(xhr, status, error) {
                        console.error("Error saving crop", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Error deleting crop!",
                        });
                    }
                });
            } else {
                console.log("Crop deletion canceled.");
            }
        });
    });

/*///////////////////////////////////////Delete/////////////////////////////////////////////
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
        clearFields()
    });*/

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
                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error updating crop", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error updating crop!",
                });
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

