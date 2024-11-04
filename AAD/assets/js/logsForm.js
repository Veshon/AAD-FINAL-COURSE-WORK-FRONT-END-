$(document).ready(function () {
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
});
