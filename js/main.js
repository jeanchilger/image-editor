// main application object
function App(name) {
    this.name = name;
    this.loadImg = function () {

    },

    this.fuck = function () {
        alert("Fuck You!");
    }
};

// when the opencv.js was fully loaded
$("#opencvJSFile").ready(function () {
    var app = new App("asd");
});
