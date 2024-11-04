$(document).ready(function () {

    // AJAX request to fetch all log codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/logs",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#logCode");
            select.empty(); // Clear existing options if any
            select.append(new Option("Select log code"));

            // Populate select element with field codes
            data.forEach(function(log) {
                select.append(new Option("Log Details: "+log.logDetails + " - Date: "+log.logDate));
                select.append(new Option(log.logCode));
                select.append(new Option("______________________________________________________"));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading field codes:", error);
            alert("Failed to load field codes.");
        }
    });

    //Fetch data to table
    $("#load").click(function(event) {
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/logs",
            type: "GET",
            dataType: "json",
            success: function(data) {
                let tbody = $("#table tbody"); // Select the tbody of the table
                tbody.empty(); // Clear any existing rows

                // Loop through the data and create a new row for each log entry
                data.forEach(function(log) {
                    // Create a new row
                    let row = $("<tr></tr>");

                    // Add cells for each log property
                    row.append($("<td></td>").text(log.logCode));
                    row.append($("<td></td>").text(log.logDate));
                    row.append($("<td></td>").text(log.logDetails));
                    row.append($("<td></td>").text(log.observedImage));
                    // if (log.observedImage) {
                    //     row.append($("<td></td>").append($("<img>").attr("src", "data:image/jpeg;base64," + log.observedImage)));
                    // } else {
                    //     row.append($("<td></td>").append($("<img>").attr("src", ""))); // Clear if no image
                    // }
                    row.append($("<td></td>").text(log.fieldCode));
                    row.append($("<td></td>").text(log.cropCode));
                    row.append($("<td></td>").text(log.staffId));

                    // Append the row to the tbody
                    tbody.append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading log data:", error);
                alert("Failed to load log data.");
            }
        });
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
            let select = $("#fieldCodes");
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

    // AJAX request to fetch all staff ids
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/staff",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#staffId");
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
            console.error("Error loading field codes:", error);
            alert("Failed to load field codes.");
        }
    });

    ///////////////////////////////////////Save/////////////////////////////////////////////
    $("#save").click(function(event) {
        event.preventDefault();

        let logDate = $("#logDate").val();
        let logDetails = $("#logDetails").val();
        let logImg = $("#logImg")[0].files[0]; // Access the file input's first file
        let fieldCodes = $("#fieldCodes").val();
        let cropCode = $("#cropCode").val();
        let staffId = $("#staffId").val();

        // Create a FormData object to hold the form data
        let formData = new FormData();
        formData.append("logDate", logDate);
        formData.append("logDetails", logDetails);
        formData.append("observedImage", logImg);
        formData.append("fieldCode", fieldCodes);
        formData.append("cropCode", cropCode);
        formData.append("staffId", staffId);

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/logs",
            type: "POST",
            data: formData,
            processData: false, // Important: prevent jQuery from processing the data
            contentType: false, // Important: prevent jQuery from setting Content-Type header
            success: function(response) {
                Swal.fire({
                    title: "Saved!",
                    text: "Log saved successfully!",
                    icon: "success"
                });
            },
            error: function(xhr, status, error) {
                console.error("Error saving log:", error);
                alert("Failed to save log.");
            }
        });
    });

    ///////////////////////////////////////Delete/////////////////////////////////////////////

    $("#delete").click(function(event) {
        event.preventDefault();

        let code = $("#logCode").val();
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
                    url: "http://localhost:5050/fcw/api/v1/logs/" + code,
                    type: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    success: function(response) {
                        clearFields(); // Clear fields only after successful deletion
                    },
                    error: function(xhr, status, error) {
                        console.error("Error deleting crop:", error);
                        alert("Failed to delete crop.");
                    }
                });
            } else {
                console.log("Crop deletion canceled.");
            }
        });
    });
    //////////////////////////////////Clear/////////////////////////////////////////
    $("#clear").click(function() {
        clearFields()
    })
});

function clearFields() {
    document.getElementById('logDate').value = '';
    document.getElementById('logDetails').value = '';
    document.getElementById('logImg').value = '';
}
