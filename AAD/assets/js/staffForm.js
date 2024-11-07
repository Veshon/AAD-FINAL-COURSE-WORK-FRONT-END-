$(document).ready(function () {

    $("#load").click(function(event) {
        event.preventDefault();

        let selectedFieldCode = $("#staffId").val(); // Get the selected field code from input or dropdown

        if (selectedFieldCode) {
            // AJAX request to get field data
            $.ajax({
                url: "http://localhost:5050/fcw/api/v1/staff/" + selectedFieldCode,
                type: "GET",
                contentType: "application/json",
                success: function(data) {
                    // Populate the form fields with the received data
                    $("#firstName").val(data.firstName);
                    $("#lastName").val(data.lastName);
                    $("#designation").val(data.designation);
                    $("#gender").val(data.gender);
                    $("#joinedDate").val(data.joinedDate);
                    $("#dob").val(data.dob);
                    $("#al1").val(data.addressLine01);
                    $("#al2").val(data.addressLine02);
                    $("#al3").val(data.addressLine03);
                    $("#al4").val(data.addressLine04);
                    $("#al5").val(data.addressLine05);
                    $("#contactNo").val(data.contactNo);
                    $("#email").val(data.email);
                    $("#role").val(data.role);
                    $("#fieldCode").val(data.fieldCode);
                    $("#vehicleCode").val(data.vehicleCode);
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

    // AJAX request to fetch all vehicle codes
    $.ajax({
        url: "http://localhost:5050/fcw/api/v1/vehicles",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#vehicleCode");
            select.empty(); // Clear existing options if any
            select.append(new Option("Select vehicle ID"));

            // Populate select element with field codes
            data.forEach(function(vehicle) {
                select.append(new Option("License No: "+vehicle.licensePlateNumber + " - Category: "+vehicle.vehicleCategory));
                select.append(new Option(vehicle.vehicleCode));
                select.append(new Option("______________________________________________________"));
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

        let firstNameE = $("#firstName").val();
        let lastNameE = $("#lastName").val();
        let designationE = $("#designation").val();
        let genderE = $("#gender").val();
        let joinedDate = $("#joinedDate").val();
        let dob = $("#dob").val();
        let al1 = $("#al1").val();
        let al2 = $("#al2").val();
        let al3 = $("#al3").val();
        let al4 = $("#al4").val();
        let al5 = $("#al5").val();
        let contactNo = $("#contactNo").val();
        let email = $("#email").val();
        let role = $("#role").val();
        let fieldCode = $("#fieldCode").val();
        let vehicleCode = $("#vehicleCode").val();

        console.log(firstNameE)
        console.log(lastNameE)
        console.log(designationE)
        console.log(genderE)
        console.log(joinedDate)
        console.log(dob)
        console.log(al1)
        console.log(al2)
        console.log(al3)
        console.log(al4)
        console.log(al5)
        console.log(contactNo)
        console.log(email)
        console.log(role)
        console.log(fieldCode)
        console.log(vehicleCode)

        const staffData = {
            firstName: firstNameE,
            lastName: lastNameE,
            designation: designationE,
            gender: genderE,
            joinedDate: joinedDate,
            dob: dob,
            addressLine01: al1,
            addressLine02: al2,
            addressLine03: al3,
            addressLine04: al4,
            addressLine05: al5,
            contactNo: contactNo,
            email: email,
            role: role,
            fieldCode: fieldCode,
            vehicleCode: vehicleCode
        };

        const staffJSON = JSON.stringify(staffData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/staff",
            type: "POST",
            data: staffJSON,
            // processData: false, // Important: prevent jQuery from processing the data
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                Swal.fire({
                    title: "Saved!",
                    text: "Staff member saved successfully!",
                    icon: "success"
                });
                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error saving staff member:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error saving staff member!",
                });            }
        });
    });

    ///////////////////////////////////////Delete/////////////////////////////////////////////
    $("#delete").click(function(event) {
        event.preventDefault();

        let staffId = $("#staffId").val();

        console.log(staffId)

        const staffData = {
            id: staffId,
        };

        const staffJSON = JSON.stringify(staffData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/staff/" + staffId,
            type: "DELETE",
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Staff member deleted successfully!",
                    icon: "success"
                });
                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error deleting staff member:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error deleting staff member!",
                });
            }
        });
    });

    ///////////////////////////////////////Update/////////////////////////////////////////////
    $("#update").click(function(event) {
        event.preventDefault();

        let staffId = $("#staffId").val();
        let firstNameE = $("#firstName").val();
        let lastNameE = $("#lastName").val();
        let designationE = $("#designation").val();
        let genderE = $("#gender").val();
        let joinedDate = $("#joinedDate").val();
        let dob = $("#dob").val();
        let al1 = $("#al1").val();
        let al2 = $("#al2").val();
        let al3 = $("#al3").val();
        let al4 = $("#al4").val();
        let al5 = $("#al5").val();
        let contactNo = $("#contactNo").val();
        let email = $("#email").val();
        let role = $("#role").val();
        let fieldCode = $("#fieldCode").val();
        let vehicleCode = $("#vehicleCode").val();

        console.log(firstNameE)
        console.log(lastNameE)
        console.log(designationE)
        console.log(genderE)
        console.log(joinedDate)
        console.log(dob)
        console.log(al1)
        console.log(al2)
        console.log(al3)
        console.log(al4)
        console.log(al5)
        console.log(contactNo)
        console.log(email)
        console.log(role)
        console.log(fieldCode)
        console.log(vehicleCode)

        const staffData = {
            id: staffId,
            firstName: firstNameE,
            lastName: lastNameE,
            designation: designationE,
            gender: genderE,
            joinedDate: joinedDate,
            dob: dob,
            addressLine01: al1,
            addressLine02: al2,
            addressLine03: al3,
            addressLine04: al4,
            addressLine05: al5,
            contactNo: contactNo,
            email: email,
            role: role,
            fieldCode: fieldCode,
            vehicleCode: vehicleCode
        };

        const staffJSON = JSON.stringify(staffData)

        // Send AJAX request
        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/staff/" + staffId,
            type: "PUT",
            data: staffJSON,
            // processData: false, // Important: prevent jQuery from processing the data
            headers: { "Content-Type": "application/json" },
            success: function(response) {
                Swal.fire({
                    title: "Updated!",
                    text: "Staff member updated successfully!",
                    icon: "success"
                });
                clearFields()
            },
            error: function(xhr, status, error) {
                console.error("Error updating staff member:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error updating staff member!",
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
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('designation').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('joinedDate').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('al1').value = '';
    document.getElementById('al2').value = '';
    document.getElementById('al3').value = '';
    document.getElementById('al4').value = '';
    document.getElementById('al5').value = '';
    document.getElementById('contactNo').value = '';
    document.getElementById('email').value = '';
    document.getElementById('role').value = '';
}

