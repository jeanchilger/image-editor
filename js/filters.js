function FilterManager() {
    this.grayScale = function (inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow(outputImg, dst);
    },

    this.fuck = function () {
        alert("Fuck Ya!!");
    }
};
