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
        let img = canvas.toDataURL("image/png");
        $("#triggerDownload").attr("href", img);
    }
};

// when the opencv.js is fully loaded
$("#opencvJSFile").ready(function() {
    var app = new App();
    var tools = new Tools();
    var filter = new FilterManager();

    //set canvas size
    $("#outputImg").attr("width", $("#outImgContainer")[0].clientWidth);
    $("#outputImg").attr("height", $("#outImgContainer")[0].clientHeight);


    // Upload and download image
    $("#fileInput").change(function(event) {
        app.loadImgFromFile(event);
        app.loadImgToCV();
    });

    $("#triggerDownload").click(function() {
        app.downloadImage();
    });

    // Filters triggers
    $("#triggerBlur").click(function() {
        filter.blur("outputImg", "outputImg");
    });

    $("#triggerGrayScale").click(function() {
        filter.grayScale("outputImg", "outputImg");
    });

    $("#triggerSepia").click(function() {
        filter.sepia("outputImg", "outputImg");
    });

    $("#triggerPixelize").click(function() {
        filter.pixelize("outputImg", "outputImg");
    });

    $("#triggerSharpen").click(function() {
        filter.sharpen("outputImg", "outputImg");
    });

    $("#triggerNegative").click(function() {
        filter.negative("outputImg", "outputImg");
    });

    // Binarization triggers
    $("#triggerTresh").click(function() {
        filter.thresholding("outputImg", "outputImg");
    });

    $("#triggerSobel").click(function() {
        filter.sobel("outputImg", "outputImg");
    });

    $("#triggerLaplace").click(function() {
        filter.laplace("outputImg", "outputImg");
    });

    // Morphological operations triggers
    $("#triggerDilate").click(function() {
        filter.dilate("outputImg", "outputImg", $("#kerSizeD").val(), $("#kerShapeD").val());
    });

    $("#triggerErode").click(function() {
        filter.erode("outputImg", "outputImg", $("#kerSizeE").val(), $("#kerShapeE").val());
    });

    // Color triggers


    // Tools triggers
    $("#triggerPen").click(function(){
        let pen = new tools.Pen();
        $("#penSize").css("display", "block");
        pen.color = "#" + $(".jscolor")[0].value;
        pen.init();
        pen.size = parseInt($("#inputSize")[0].value);

        //change pen color
        $("#penColor").change(function(){
            pen.color = "#" + $("#penColor")[0].value;
        });
        //change pen size
        $("#inputSize").change(function(){
            $("#size").val($("#inputSize")[0].value);
            pen.size = parseInt($("#size").val());
        });

        $("#size").change(function(){
            pen.size = parseInt($(this).val());
        });
    });

    $("#triggerCutImg").click(function(){
        let imgCutter = new tools.ImgCutter();
    });

    $("#outputImg").click(function(){
        // let rect = $("#outputImg")[0].getBoundingClientRect();
        // rect.offsetX
        $("#textTool").css("left", event.pageX);
        $("#textTool").css("top", event.pageY);
        $("#textTool").css("display", "flex");
    });
});

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})
