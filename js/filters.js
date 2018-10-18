function FilterManager() {
    this.grayScale = function(inputImg, outputImg) {
        /*
         * inputImg -> (string) the id of the canvas that contains the source image.
         * outputImg -> (string) the id of the canvas that is the destination.
         * Converts the inputImg to gray scale and put it in outputImg.
        */
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        console.log(dst);

        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow(outputImg, dst);

        dst.delete();
        src.delete();
    },

    this.sepia = function(inputImg, outputImg) {
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
    },

    this.dilate = function(inputImg, outputImg, kerSize, kerShape) {
        let size = new cv.Size(parseInt(kerSize, 10), parseInt(kerSize, 10));
        let shape = parseInt(kerShape, 10);
        let kernel = cv.getStructuringElement(shape, size);
        let src = cv.imread("inputImg");

        cv.dilate(src, src, kernel);
        cv.imshow(outputImg, src);
        src.delete();
    },

    this.erode = function(inputImg, outputImg, kerSize, kerShape) {
        let size = new cv.Size(parseInt(kerSize, 10), parseInt(kerSize, 10));
        let shape = parseInt(kerShape, 10);
        let kernel = cv.getStructuringElement(shape, size);
        let src = cv.imread("inputImg");

        cv.erode(src, src, kernel);
        cv.imshow(outputImg, src);
        src.delete();
    },

    this.sharpen = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);

        let array = [
                    [0, -1, 0],
                    [-1, 5, -1],
                    [0, -1, 0]
                ]; //acertar esse filtro
        let kernel = cv.matFromArray(3, 3, cv.CV_8UC1, array);

        let anchor = new cv.Point(-1, -1);
        cv.filter2D(src, src, cv.CV_8UC1, kernel,
                    anchor, 0, cv.BORDER_DEFAULT);
        cv.imshow(outputImg, src);

        src.delete();
        kernel.delete();
    },

    this.pixelize = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);

        console.log('image width: ' + src.cols + '\n' +
            'image height: ' + src.rows + '\n' +
            'image size: ' + src.size().width + '*' + src.size().height + '\n' +
            'image depth: ' + src.depth() + '\n' +
            'image channels ' + src.channels() + '\n' +
            'image type: ' + src.type() + '\n');

        let reduce = 10;
        let small_size = new cv.Size(parseInt(src.rows/reduce),
                                     parseInt(src.cols/reduce));
        let small = new cv.Mat(small_size, src.type());
        let normal = new cv.Mat(src.size(), src.type());

        cv.resize(src, small, small.size(), 0, 0, cv.INTER_NEAREST);
        cv.resize(small, normal, normal.size(), 0, 0, cv.INTER_NEAREST);

        cv.imshow(outputImg, normal);

        src.delete();
        small.delete();
        normal.delete();
    }
};
