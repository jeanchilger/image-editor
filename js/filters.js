function FilterManager() {
// FILTERS
    this.blur = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        let ksize = new cv.Size(3, 3);

        cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
    },

    this.grayScale = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

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

    this.morphTransform = function(inputImg, outputImg, morphType, kerSize, kerShape) {
        let src = cv.imread("inputImg");
        let dst = new cv.Mat();

        let size = new cv.Size(parseInt(kerSize, 10), parseInt(kerSize, 10));
        let shape = parseInt(kerShape, 10);
        let kernel = cv.getStructuringElement(shape, size);

        cv.morphologyEx(src, dst, parseInt(morphType, 10), kernel);

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
    };

    this.dilate = function(inputImg, outputImg, kerSize, kerShape) {
        let src = cv.imread("inputImg");
        let dst = new cv.Mat();

        let size = new cv.Size(parseInt(kerSize, 10), parseInt(kerSize, 10));
        let shape = parseInt(kerShape, 10);
        let kernel = cv.getStructuringElement(shape, size);

        cv.dilate(src, dst, kernel);

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
    },

    this.erode = function(inputImg, outputImg, kerSize, kerShape) {
        let src = cv.imread("inputImg");
        let dst = new cv.Mat();

        let size = new cv.Size(parseInt(kerSize, 10), parseInt(kerSize, 10));
        let shape = parseInt(kerShape, 10);
        let kernel = cv.getStructuringElement(shape, size);

        cv.erode(src, dst, kernel);

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
    },

    this.sharpen = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        let array = [
                    [-1, -1, -1],
                    [-1, 9, -1],
                    [-1, -1, -1]
                ];
        let kernel = cv.matFromArray(3, 3, cv.CV_8U, array);

        let anchor = new cv.Point(-1, -1);
        cv.filter2D(src, dst, cv.CV_8U, kernel,
                    anchor, 0, cv.BORDER_DEFAULT);

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
        kernel.delete();
    },

    this.negative = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = src.clone();

        let ch = src.channels();
        for (var i = 0; i < src.size().width * src.size().height * 4; i+=ch) { // each pixel
            let r = 255 - src.data[i];

            let g = 255 - src.data[i+1];

            let b = 255 - src.data[i+2];

            dst.data[i] = r;
            dst.data[i+1] = g;
            dst.data[i+2] = b;
        }

        cv.imshow(outputImg, dst);
        src.delete();
        dst.delete();
    },

    this.pixelize = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);

        let reduce = 5;
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
    },

// BINARIZATION
    this.thresholding = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.adaptiveThreshold(dst, dst, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C,
                             cv.THRESH_BINARY, 3, 2);

        cv.imshow(outputImg, dst);

        src.delete();
        dsr.delete();
    },

    this.sobel = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        let ksize = new cv.Size(3, 3);
        cv.GaussianBlur(src, src, ksize, 0, 0, cv.BORDER_DEFAULT);

        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

        //SOBEL
        let gradx = new cv.Mat(), grady = new cv.Mat();
        cv.Sobel(src, gradx, cv.CV_8U, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
        cv.Sobel(src, grady, cv.CV_8U, 0, 1, 3, 1, 0, cv.BORDER_DEFAULT);

        let absgx = new cv.Mat(), absgy = new cv.Mat();
        cv.convertScaleAbs(gradx, absgx);
        cv.convertScaleAbs(grady, absgy);

        cv.addWeighted(absgx, 0.5, absgy, 0.5, 0, dst);

        cv.imshow(outputImg, dst);

        src.delete();
        gradx.delete(); grady.delete();
        absgx.delete(); absgy.delete();
        dst.delete();
    },

    this.laplace = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        let ksize = new cv.Size(3, 3);
        cv.GaussianBlur(src, src, ksize, 0, 0, cv.BORDER_DEFAULT);

        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

        //LAPLACE
        cv.Laplacian(src, dst, cv.CV_8U, 1, 1, 0, cv.BORDER_DEFAULT);

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
    };

    this.canny = function(inputImg, outputImg) {
        let src = cv.imread(inputImg);
        let dst = new cv.Mat();

        let ksize = new cv.Size(5, 5);

        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

        cv.Canny(src, dst, 50, 100, 3, true);

        cv.imshow(outputImg, dst);
        src.delete();
        dst.delete();
    };

// MORPHOLOGICAL OPERATIONS
    this.dilate = function(inputImg, outputImg, kerSize, kerShape) {
        let src = cv.imread("inputImg");
        let dst = new cv.Mat();

        let size = new cv.Size(parseInt(kerSize, 10), parseInt(kerSize, 10));
        let shape = parseInt(kerShape, 10);
        let kernel = cv.getStructuringElement(shape, size);

        cv.dilate(src, dst, kernel);

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
    },

    this.erode = function(inputImg, outputImg, kerSize, kerShape) {
        let src = cv.imread("inputImg");
        let dst = new cv.Mat();

        let size = new cv.Size(parseInt(kerSize, 10), parseInt(kerSize, 10));
        let shape = parseInt(kerShape, 10);
        let kernel = cv.getStructuringElement(shape, size);

        cv.erode(src, dst, kernel);

        cv.imshow(outputImg, dst);

        src.delete();
        dst.delete();
    }
};
