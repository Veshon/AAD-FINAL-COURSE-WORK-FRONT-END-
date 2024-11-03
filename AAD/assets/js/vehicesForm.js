$(document).ready(function () {

    // AJAX request to fetch all vehicle ids
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
            console.error("Error loading Vehicle codes:", error);
            alert("Failed to load vehicle codes.");
        }
    });

    // AJAX request to fetch all staff ids
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/staff",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#sDetails");
            select.empty(); // Clear existing options if any

            // Populate select element with field codes
            data.forEach(function(staff) {
                select.append(new Option(staff.id));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading staff codes:", error);
            alert("Failed to load staff codes.");
        }
    });

    ///////////////////////////////////////Save/////////////////////////////////////////////
    $("#save").click(function(event) {
        event.preventDefault();

        let licensePlateNumber = $("#licensePlateNo").val();
        let vehicleCategory = $("#category").val();
        let fuelType = $("#fuelType").val();
        let status = $("#status").val();
        let remarks = $("#remarks").val();
        let staffDetails = $("#sDetails").val();


        console.log(licensePlateNumber)
        console.log(vehicleCategory)
        console.log(fuelType)
        console.log(status)
        console.log(remarks)
        console.log(staffDetails)

        const vehicleData = {
            licensePlateNumber: licensePlateNumber,
            vehicleCategory: vehicleCategory,
            fuelType: fuelType,
            status: status,
            remarks: remarks,
            staffDetails: staffDetails
        };

        const vehicleJSON = JSON.stringify(vehicleData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/vehicles",
            type: "POST",
            data: vehicleJSON,
            // processData: false, // Important: prevent jQuery from processing the data
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                alert("Vehicle saved successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error saving vehicle:", error);
                alert("Vehicle not saved.");
            }
        });
    });

    ///////////////////////////////////////Delete/////////////////////////////////////////////
    $("#delete").click(function(event) {
        event.preventDefault();

        let code = $("#vehicleCode").val();

        console.log(code)

        const vehicleData = {
            id: code,
        };

        const vehicleJSON = JSON.stringify(vehicleData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/vehicles/" + code,
            type: "DELETE",
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                alert("Vehicle deleted successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error deleting vehicle:", error);
                alert("Vehicle not deleted.");
            }
        });
    });

    ///////////////////////////////////////Update/////////////////////////////////////////////
    $("#update").click(function(event) {
        event.preventDefault();

        let vehicleCode = $("#vehicleCode").val();
        let licensePlateNumber = $("#licensePlateNo").val();
        let vehicleCategory = $("#category").val();
        let fuelType = $("#fuelType").val();
        let status = $("#status").val();
        let staffDetails = $("#sDetails").val();
        let remarks = $("#remarks").val();

        console.log(vehicleCode)
        console.log(licensePlateNumber)
        console.log(vehicleCategory)
        console.log(fuelType)
        console.log(status)
        console.log(staffDetails)
        console.log(remarks)


        const vehicleData = {
            vehicleCode: vehicleCode,
            licensePlateNumber: licensePlateNumber,
            vehicleCategory: vehicleCategory,
            fuelType: fuelType,
            status: status,
            staffDetails: staffDetails,
            remarks: remarks,
        };

        const vehicleJSON = JSON.stringify(vehicleData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/vehicles/" + vehicleCode,
            type: "PUT",
            data: vehicleJSON,
            // processData: false, // Important: prevent jQuery from processing the data
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                alert("Vehicle updated successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error updating vehicle:", error);
                alert("Vehicle not updated.");
            }
        });
    });

    //////////////////////////////////Clear/////////////////////////////////////////
    $("#clear").click(function() {
        clearFields()
    })
});

function clearFields() {
    document.getElementById('licensePlateNo').value = '';
    document.getElementById('type').value = '';
    document.getElementById('fuelType').value = '';
    document.getElementById('status').value = '';
    document.getElementById('remarks').value = '';
}