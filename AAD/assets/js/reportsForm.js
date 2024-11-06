$.ajax({
    url: "http://localhost:5050/fcw/api/v1/fields",
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
        alert("Failed to load field data.");
    }
});
