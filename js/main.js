// main application object
function App(name) {
    this.loadImg = function () {

    },

    this.fuck = function () {
        alert("Fuck You!");
    }
};

// when the opencv.js was fully loaded
$("#opencvJSFile").ready(function () {
    var app = new App();
    var c = document.getElementById('mainDraw');
    var ctx = c.getContext("2d");
    console.log(ctx);
});
