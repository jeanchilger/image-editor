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
            $("#btnDownload").attr("href", fr.result);
        }

        fr.readAsDataURL(tgt.files[0]);

    },

    this.loadImgToCV = function () {
        let imgElement = $("#inputImg")[0];
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
    var filter = new FilterManager();
    filter.fuck();

    // Load the image
    $("#fileInput").change(function(event) {
        app.loadImgFromFile(event);
        app.loadImgToCV();
    });

    // Filter triggers
    $("#btnGrayScale").click(function() {
        filter.grayScale("outputImg", "outputImg");
    });

    $("#btnSepia").click(function() {
        filter.sepia("outputImg", "outputImg");
    });


});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
