const jwtToken = localStorage.getItem("jwtToken");
console.log(jwtToken)

$.ajax({
    url: "http://localhost:5050/fcw/api/v1/fields",
    type: "GET",
    dataType: "json",
    headers: {
        "Authorization": `Bearer ${jwtToken}` // Add token to Authorization header
    },
    success: function(data) {
        let tbody = $("#table tbody"); // Select the tbody of the table
        tbody.empty(); // Clear any existing rows
            // Loop through the data and create a new row for each log entry
        data.forEach(function(log) {
            // Create a new row
            let row = $("<tr></tr>");
            // Add cells for each log property
            row.append($("<td></td>").text(log.fieldCode));
            row.append($("<td></td>").text(log.fieldName));
            row.append($("<td></td>").text(log.fieldLocation));
            row.append($("<td></td>").text(log.extentSize));
            row.append($("<td></td>").text(log.fieldImage1));
            row.append($("<td></td>").text(log.fieldImage2));

                // Append the row to the tbody
            tbody.append(row);
        });},
    error: function(xhr, status, error) {
        console.error("Error loading field data:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error loading fields data!",
        });    }
});

$.ajax({
    url: "http://localhost:5050/fcw/api/v1/vehicles",
    type: "GET",
    dataType: "json",
    headers: {
        "Authorization": `Bearer ${jwtToken}` // Add token to Authorization header
    },
    success: function(data) {
        let tbody = $("#tableVehicle tbody"); // Select the tbody of the table
        tbody.empty(); // Clear any existing rows
            // Loop through the data and create a new row for each log entry
        data.forEach(function(log) {
            // Create a new row
            let row = $("<tr></tr>");
            // Add cells for each log property
            row.append($("<td></td>").text(log.vehicleCode));
            row.append($("<td></td>").text(log.licensePlateNumber));
            row.append($("<td></td>").text(log.vehicleCategory));
            row.append($("<td></td>").text(log.fuelType));
            row.append($("<td></td>").text(log.status));
            row.append($("<td></td>").text(log.remarks));

                // Append the row to the tbody
            tbody.append(row);
        });},
    error: function(xhr, status, error) {
        console.error("Error loading vehicle data:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error loading vehicles data!",
        });    }
});

$.ajax({
    url: "http://localhost:5050/fcw/api/v1/equipments",
    type: "GET",
    dataType: "json",
    headers: {
        "Authorization": `Bearer ${jwtToken}` // Add token to Authorization header
    },
    success: function(data) {
        let tbody = $("#equipmentTable tbody"); // Select the tbody of the table
        tbody.empty(); // Clear any existing rows
            // Loop through the data and create a new row for each log entry
        data.forEach(function(log) {
            // Create a new row
            let row = $("<tr></tr>");
            // Add cells for each log property
            row.append($("<td></td>").text(log.equipmentId));
            row.append($("<td></td>").text(log.name));
            row.append($("<td></td>").text(log.type));
            row.append($("<td></td>").text(log.status));
            row.append($("<td></td>").text(log.fieldCode));
            row.append($("<td></td>").text(log.staffId));

                // Append the row to the tbody
            tbody.append(row);
        });},
    error: function(xhr, status, error) {
        console.error("Error loading vehicle data:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error loading equipments data!",
        });    }
});

$.ajax({
    url: "http://localhost:5050/fcw/api/v1/crops",
    type: "GET",
    dataType: "json",
    headers: {
        "Authorization": `Bearer ${jwtToken}` // Add token to Authorization header
    },
    success: function(data) {
        let tbody = $("#cropsTable tbody"); // Select the tbody of the table
        tbody.empty(); // Clear any existing rows
            // Loop through the data and create a new row for each log entry
        data.forEach(function(log) {
            // Create a new row
            let row = $("<tr></tr>");
            // Add cells for each log property
            row.append($("<td></td>").text(log.code));
            row.append($("<td></td>").text(log.commonName));
            row.append($("<td></td>").text(log.scientificName));
            row.append($("<td></td>").text(log.cropImg));
            row.append($("<td></td>").text(log.category));
            row.append($("<td></td>").text(log.season));
            row.append($("<td></td>").text(log.fieldCode));

                // Append the row to the tbody
            tbody.append(row);
        });},
    error: function(xhr, status, error) {
        console.error("Error loading crop data:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error loading crops data!",
        });    }
});

$.ajax({
    url: "http://localhost:5050/fcw/api/v1/staff",
    type: "GET",
    dataType: "json",
    headers: {
        "Authorization": `Bearer ${jwtToken}` // Add token to Authorization header
    },
    success: function(data) {
        let tbody = $("#staffTable tbody"); // Select the tbody of the table
        tbody.empty(); // Clear any existing rows
            // Loop through the data and create a new row for each log entry
        data.forEach(function(log) {
            // Create a new row
            let row = $("<tr></tr>");
            // Add cells for each log property
            row.append($("<td></td>").text(log.id));
            row.append($("<td></td>").text(log.firstName));
            row.append($("<td></td>").text(log.lastName));
            row.append($("<td></td>").text(log.designation));
            row.append($("<td></td>").text(log.gender));
            row.append($("<td></td>").text(log.joinedDate));
            row.append($("<td></td>").text(log.dob));
            row.append($("<td></td>").text(log.addressLine01));
            row.append($("<td></td>").text(log.addressLine02));
            row.append($("<td></td>").text(log.addressLine03));
            row.append($("<td></td>").text(log.addressLine04));
            row.append($("<td></td>").text(log.addressLine05));
            row.append($("<td></td>").text(log.contactNo));
            row.append($("<td></td>").text(log.email));
            row.append($("<td></td>").text(log.role));
            row.append($("<td></td>").text(log.fieldCode));
            row.append($("<td></td>").text(log.vehicleCode));

                // Append the row to the tbody
            tbody.append(row);
        });},
    error: function(xhr, status, error) {
        console.error("Error loading staff data:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error loading staff data!",
        });
    }
});
