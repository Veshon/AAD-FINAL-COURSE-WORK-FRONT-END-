$(document).ready(function () {

    // AJAX request to fetch all equipment ids
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/equipments",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#eId");
            select.empty(); // Clear existing options if any

            // Populate select element with field codes
            data.forEach(function(equipment) {
                select.append(new Option(equipment.equipmentId));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading equipment ids:", error);
            alert("Failed to load equipment ids.");
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

    // AJAX request to fetch all Field codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/fields",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#fDetails");
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

    ///////////////////////////////////////Save/////////////////////////////////////////////
    $("#save").click(function(event) {
        event.preventDefault();

        let eName = $("#eName").val();
        let type = $("#type").val();
        let status = $("#status").val();
        let staffDetails = $("#sDetails").val();
        let fieldDetails = $("#fDetails").val();


        console.log(eName)
        console.log(type)
        console.log(status)
        console.log(staffDetails)
        console.log(fieldDetails)

        const staffData = {
            name: eName,
            type: type,
            status: status,
            staffId: staffDetails,
            fieldCode: fieldDetails,
        };

        const staffJSON = JSON.stringify(staffData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/equipments",
            type: "POST",
            data: staffJSON,
            // processData: false, // Important: prevent jQuery from processing the data
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                alert("Equipment saved successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error saving Equipment:", error);
                alert("Equipment not saved.");
            }
        });
    });

    ///////////////////////////////////////Delete/////////////////////////////////////////////
    $("#delete").click(function(event) {
        event.preventDefault();

        let eId = $("#eId").val();

        console.log(eId)

        const equipmentData = {
            id: eId,
        };

        const equipmentJSON = JSON.stringify(equipmentData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/equipments/" + eId,
            type: "DELETE",
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                alert("Equipment deleted successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error deleting Equipment:", error);
                alert("Equipment not deleted.");
            }
        });
    });

    ///////////////////////////////////////Update/////////////////////////////////////////////
    $("#update").click(function(event) {
        event.preventDefault();

        let equipmentId = $("#eId").val();
        let name = $("#eName").val();
        let type = $("#type").val();
        let status = $("#status").val();
        let staffId = $("#sDetails").val();
        let fieldCode = $("#fDetails").val();

        console.log(equipmentId)
        console.log(name)
        console.log(type)
        console.log(status)
        console.log(staffId)
        console.log(fieldCode)


        const staffData = {
            equipmentId: equipmentId,
            name: name,
            type: type,
            status: status,
            staffId: staffId,
            fieldCode: fieldCode,
        };

        const staffJSON = JSON.stringify(staffData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/equipments/" + equipmentId,
            type: "PUT",
            data: staffJSON,
            // processData: false, // Important: prevent jQuery from processing the data
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                alert("Equipment updated successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error updating Equipment:", error);
                alert("Equipment not updated.");
            }
        });
    });
});