$(document).ready(function () {

    $("#load").click(function(event) {
        event.preventDefault();

        let selectedFieldCode = $("#eId").val(); // Get the selected field code from input or dropdown

        if (selectedFieldCode) {
            // AJAX request to get field data
            $.ajax({
                url: "http://localhost:5050/fcw/api/v1/equipments/" + selectedFieldCode,
                type: "GET",
                contentType: "application/json",
                success: function(data) {
                    // Populate the form fields with the received data
                    $("#eName").val(data.name);
                    $("#type").val(data.type);
                    $("#status").val(data.status);
                    $("#sDetails").val(data.staffId);
                    $("#fDetails").val(data.fieldCode);

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
                    console.error("Error fetching equipment data:", error);
                    alert("Failed to load equipment data.");
                }
            });
        } else {
            alert("Please enter a valid equipment code.");
        }
    });

    // AJAX request to fetch all equipment ids
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/equipments",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#eId");
            select.empty(); // Clear existing options if any
            select.append(new Option("Select equipment ID"));

            // Populate select element with field codes
            data.forEach(function(equipment) {
                select.append(new Option("Name: " + equipment.name + " - Status: "+equipment.status));
                select.append(new Option(equipment.equipmentId));
                select.append(new Option("______________________________________________________"));
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
            select.append(new Option("Select staff ID"));

            // Populate select element with field codes
            data.forEach(function(staff) {
                select.append(new Option("Name: "+staff.firstName + " - Designation: "+staff.designation));
                select.append(new Option(staff.id));
                select.append(new Option("______________________________________________________"));
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
                clearFields()
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
                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error deleting Equipment:", error);
                alert("Equipment not deleted.");
            }
        });
        clearFields()
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
                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error updating Equipment:", error);
                alert("Equipment not updated.");
            }
        });
    });

    //////////////////////////////////Clear/////////////////////////////////////////
    $("#clear").click(function() {
        clearFields()
    })
});

function clearFields() {
    document.getElementById('eName').value = '';
    document.getElementById('type').value = '';
    document.getElementById('status').value = '';
}