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
    var filter = new FilterManager();

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


});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

//Event listners - tools
//Pen
$("#triggerPen").click(function(){
    var pen = new Pen();
    var rect = $("#outputImg")[0].getBoundingClientRect();

    $("#outputImg").mousedown(function(event){
        pen.paint = true;
        pen.drawPoint(event.pageX - rect.left, event.pageY - rect.top);

        if(pen.prevX == null){
            pen.prevX = event.pageX - rect.left;
            pen.prevY = event.pageY - rect.top;
        }
    });

    $("#outputImg").mousemove(function(event){
        if (pen.paint){
            if(pen.prevX == null){
                pen.prevX = event.pageX - rect.left;
                pen.prevY = event.pageY - rect.top;
            }
            pen.draw(event.pageX - rect.left, event.pageY - rect.top);
            pen.prevX = event.pageX - rect.left;
            pen.prevY = event.pageY - rect.top;
        }

    });

    $("#outputImg").mouseup(function(event){
        pen.paint = false;
        pen.prevX = null;
    });

    $("#outputImg").mouseleave(function(event){
        pen.paint = false;
        pen.prevX = null;
        pen.prevY = null;
    });

});
