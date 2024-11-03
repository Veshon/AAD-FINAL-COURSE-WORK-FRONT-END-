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
});