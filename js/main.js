function App() {
    // main application 'object'
    this.loadImgFromFile = function (event) {
        /*
        Load the image from input file.
        There is a better way??
        */
        var tgt = event.target;
        var fr = new FileReader();

        fr.onload = function () {
            $("#inputImg").attr("src", fr.result);
        }

        fr.readAsDataURL(tgt.files[0]);

    },

    this.loadImgToCV = function () {
        let imgElement = document.getElementById("inputImg");
        imgElement.onload = function () {
            let mat = cv.imread(imgElement);
            cv.imshow("outputImg", mat);
            mat.delete();
        };
    }

};

// when the opencv.js was fully loaded
$("#opencvJSFile").ready(function () {
    var app = new App();

    // Load the image
    $("#fileInput").change(function(event) {
        app.loadImgFromFile(event);
        app.loadImgToCV();
    });

});
