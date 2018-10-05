function FilterManager() {
    this.grayScale = function(inputImg, outputImg) {
        /*
         * inputImg and outputImg -> string
         * */

        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow(outputImg, dst);
    },

    this.sepia  = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();
        console.log(src.data32S[0]);

    },

    this.fuck = function () {
        alert("Fuck Ya!!");
    }
};
