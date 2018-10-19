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
        let imgElement = $("#inputImg")[0];
        imgElement.onload = function () {
            let mat = cv.imread(imgElement);
            cv.imshow("outputImg", mat);
            mat.delete();
        };
    },

    this.downloadImage = function () {
        let canvas = $("#outputImg")[0];
        let img = canvas.toDataURL("image/png");
        $("#triggerDownload").attr("href", img);
    }
};

// when the opencv.js was fully loaded
$("#opencvJSFile").ready(function () {
    var app = new App();
    var tools = new Tools();
    var filter = new FilterManager();

    //set canvas size
    $("#outputImg").attr("width", $("#outImgContainer")[0].clientWidth);
    $("#outputImg").attr("height", $("#outImgContainer")[0].clientHeight);


    // Load the image
    $("#fileInput").change(function(event) {
        app.loadImgFromFile(event);
        app.loadImgToCV();
    });

    // Filter triggers
    $("#triggerGrayScale").click(function() {
        filter.grayScale("outputImg", "outputImg");
    });

    $("#triggerSepia").click(function() {
        filter.sepia("outputImg", "outputImg");
    });

    $("#triggerDownload").click(function() {
        app.downloadImage();
    });

    $("#triggerPen").click(function(){
        let pen = new tools.Pen();
        pen.init();
    });

    $("#triggerCutImg").click(function(){
        let pen = new tools.Pen();
        pen.init();
    });
});

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})
