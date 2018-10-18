function FilterManager() {
    this.grayScale = function(inputImg, outputImg) {
        /*
         * inputImg and outputImg -> string
         * */

        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow(outputImg, dst);

        dst.delete();
        src.delete();
    },

    this.sepia = function(inputImg, outputImg) {
        /*
         Applies the sepia filter.
         inputImg -> string, outputImg -> string;
        */

        let src = cv.imread(inputImg);
        let dst = src.clone();

        let ch = src.channels();
        for (var i = 0; i < src.size().width * src.size().height * 4; i+=ch) { // each pixel
            let r = src.data[i] * 0.393 + src.data[i+1] * 0.769 + src.data[i+2] * 0.189;
            if (r > 255) r = 255;

            let g = src.data[i] * 0.349 + src.data[i+1] * 0.686 + src.data[i+2] * 0.168;
            if (g > 255) g = 255;

            let b = src.data[i] * 0.272 + src.data[i+1] * 0.534 + src.data[i+2] * 0.131;
            if (b > 255) b = 255;

            dst.data[i] = r;
            dst.data[i+1] = g;
            dst.data[i+2] = b;
        }

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
    }
};
