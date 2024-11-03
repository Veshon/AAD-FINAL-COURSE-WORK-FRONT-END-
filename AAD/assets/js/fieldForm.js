$(document).ready(function () {
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
                alert("Field saved successfully!");
            },
            error: function(xhr, status, error) {
                console.error("Error saving field:", error);
                alert("Failed to save field.");
            }
        });
    });
});


/*
$(document).ready(function () {
    $("#save").click(function() {
        event.preventDefault();

        let idE = $("#fieldCode").val();
        let nameE = $("#fieldName").val();
        let locationE = $("#location").val();
        let sizeE = $("#size").val();
        // let cropE = $("#crop").val();
        // let staffE = $("#staff").val();
        let img1E = $("#img1").val();
        let img2E = $("#img2").val();

        console.log(idE);
        console.log(nameE);
        console.log(locationE);
        console.log(sizeE);
        // console.log(cropE);
        // console.log(staffE);
        console.log(img1E);
        console.log(img2E);

        const customerData = {
            fieldCode:idE,
            fieldName:nameE,
            location:locationE,
            size:sizeE,
            // crop:cropE,
            // staff:staffE,
            img1:img1E,
            img2:img2E
        };

        console.log(customerData)

        const customerJSON = JSON.stringify(customerData)
        console.log(customerJSON)

        $.ajax({
            url: "http://localhost:5050/fcw/api/v1/fields",
            type: "POST",
            data: customerJSON,
            headers: { "Content-Type": "application/json" },
/!*            success: (res) => {
                console.log(JSON.stringify(res));
                successBanner.classList.remove('hidden');
                successBanner.style.display = 'block';
                setTimeout(function() {
                    successBanner.style.display = 'none';
                }, 3000);
            },
            error: (res) => {
                console.error(res);
                notSuccessBanner.classList.remove('hidden');
                notSuccessBannerSave.style.display = 'block';
                setTimeout(function() {
                    notSuccessBannerSave.style.display = 'none';
                }, 3000);
            }*!/
        })
    })
})*/
