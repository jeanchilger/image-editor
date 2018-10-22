function App() {
    // main application 'object'
    this.loadImgFromFile = function(event) {
        /*
        Load the image from input file.
        There is a better way??
        */
        var tgt = event.target;
        var fr = new FileReader();

        fr.onload = function() {
            $("#inputImg").attr("src", fr.result);
        }

        fr.readAsDataURL(tgt.files[0]);

    },

    this.loadImgToCV = function() {
        let imgElement = $("#inputImg")[0];
        imgElement.onload = function () {
            let mat = cv.imread(imgElement);
            cv.imshow("outputImg", mat);
            mat.delete();
        };
    },

    this.downloadImage = function() {
        let canvas = $("#outputImg")[0];
        alert(canvas);
        let img = canvas.toDataURL("image/png");
        $("#triggerDownload").attr("href", img);
    }
};

// when the opencv.js was fully loaded
$("#opencvJSFile").ready(function() {
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

    $("#triggerDilate").click(function() {
        filter.dilate("outputImg", "outputImg", $("#kerSizeD").val(), $("#kerShapeD").val());
    });

    $("#triggerErode").click(function() {
        filter.erode("outputImg", "outputImg", $("#kerSizeE").val(), $("#kerShapeE").val());
    });

    $("#triggerSharpen").click(function() {
        filter.sharpen("outputImg", "outputImg");
    });

    $("#triggerPixelize").click(function() {
        filter.pixelize("outputImg", "outputImg");
    });

    $("#triggerTresh").click(function() {
        filter.thresholding("outputImg", "outputImg");
    });

    $("#triggerSobel").click(function() {
        filter.sobel("outputImg", "outputImg");
    });

    $("#triggerPen").click(function(){
        let pen = new tools.Pen();
        pen.color = "#" + $(".jscolor")[0].value;
        pen.init();
        $(".jscolor").change(function(){
            pen.color = "#" + $(".jscolor")[0].value;

        });
    });

    $("#triggerCutImg").click(function(){

        let imgCutter = new tools.ImgCutter("outputImg");
    });
});

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})
