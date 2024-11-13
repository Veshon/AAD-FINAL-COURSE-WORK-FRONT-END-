$(document).ready(function () {

    const jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken)

    $("#load").click(function(event) {
        event.preventDefault();

        let selectedFieldCode = $("#fieldCode").val(); // Get the selected field code from input or dropdown

        if (selectedFieldCode) {
            // AJAX request to get field data
            $.ajax({
                url: "http://localhost:5050/fcw/api/v1/fields/" + selectedFieldCode,
                type: "GET",
                contentType: "application/json",
                success: function(data) {
                    // Populate the form fields with the received data
                    $("#fieldName").val(data.fieldName);
                    $("#location").val(data.fieldLocation);
                    $("#size").val(data.extentSize);

                    // Display base64 images as previews
                    if (data.fieldImage1) {
                        $("#img1Preview").attr("src", "data:image/jpeg;base64," + data.fieldImage1);
                    } else {
                        $("#img1Preview").attr("src", ""); // Clear if no image
                    }

                    if (data.fieldImage2) {
                        $("#img2Preview").attr("src", "data:image/jpeg;base64," + data.fieldImage2);
                    } else {
                        $("#img2Preview").attr("src", ""); // Clear if no image
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

//Load Fields
 /*   $("#load").click(function(event) {
        event.preventDefault();

        let selectedFieldCode = $("#fieldCode").val(); // Get the selected field code from input or dropdown

        if (selectedFieldCode) {
            // AJAX request to get field data
            $.ajax({
                url: "http://localhost:5050/fcw/api/v1/fields/" + selectedFieldCode,
                type: "GET",
                contentType: "application/json",
                success: function(data) {
                    // Populate the form fields with the received data
                    $("#fieldName").val(data.fieldName);
                    $("#location").val(data.fieldLocation);
                    $("#size").val(data.extentSize);

                    // Assuming fieldImage1 and fieldImage2 are base64 strings
                    $("#img1Preview").attr("src", "data:image/jpeg;base64," + data.fieldImage1);
                    $("#img2Preview").attr("src", "data:image/jpeg;base64," + data.fieldImage2);
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching field data:", error);
                    alert("Failed to load field data.");
                }
            });
        } else {
            alert("Please enter a valid field code.");
        }
    });*/


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
            console.error("Error loading field codes:", error);
            alert("Failed to load field codes.");
        }
    });

    // AJAX request to fetch all crop codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/crops",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#crop");
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

    // AJAX request to fetch all staff codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/staff",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#staff");
            select.empty(); // Clear existing options if any
            select.append(new Option("Select staff ID"));

            // Populate select element with field codes
            data.forEach(function(staff) {
                select.append(new Option("Name: "+staff.firstName + " - Designation: "+staff.designation));
                select.append(new Option(staff.id));
                select.append(new Option("______________________________________________________"));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading staff ids:", error);
            alert("Failed to load staff ids.");
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
                Swal.fire({
                    title: "Saved!",
                    text: "Field saved successfully!",
                    icon: "success"
                });
                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error saving field:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error saving field!",
                });
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
                Swal.fire({
                    title: "Deleted!",
                    text: "Field deleted successfully!",
                    icon: "success"
                });                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error saving field:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error deleting crop!",
                });            }
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
                Swal.fire({
                    title: "Updated!",
                    text: "Field updated successfully!",
                    icon: "success"
                });                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error update field:", error);
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
    document.getElementById('fieldName').value = '';
    document.getElementById('location').value = '';
    document.getElementById('size').value = '';
    document.getElementById('img1').value = '';
    document.getElementById('img2').value = '';
}

