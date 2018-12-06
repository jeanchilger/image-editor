function Tools(){
    // Global variable??
    let canvas = $("#outputImg")[0];
    this.Pen = function(){
        let paint = false;
        let prevX = null;
        let prevY = null;
        let color = "fff";
        let size = 5;
        let self = this;

        this.init = function(){
            self.context = canvas.getContext('2d');
            $("#outputImg").on("mousedown", function(event) {
                // if (self.alive) {
                    let rect = $("#outputImg")[0].getBoundingClientRect();
                    self.paint = true;
                    self.drawPoint(event.pageX - rect.left, event.pageY - rect.top);
                    if(self.prevX == null){
                        self.prevX = event.pageX - rect.left;
                        self.prevY = event.pageY - rect.top;
                    }
                // }
            });

             $("#outputImg").on("mousemove", function(event) {
                 rect = $("#outputImg")[0].getBoundingClientRect();
                 if (self.paint){
                    if(self.prevX == null){
                        self.prevX = event.pageX - rect.left;
                        self.prevY = event.pageY - rect.top;
                    }
                    self.draw(event.pageX - rect.left, event.pageY - rect.top);
                    self.prevX = event.pageX - rect.left;
                    self.prevY = event.pageY - rect.top;
                }
             });

             $("#outputImg").on("mouseup", function(event) {
                self.paint = false;
                self.prevX = null;
             });

            $("#outputImg").on("mouseleave", function(event) {
                self.paint = false;
                self.prevX = null;
                self.prevY = null;
            });

        };

        this.draw = function(x, y){

            self.context.strokeStyle = this.color;
            self.context.lineJoin = "round";

            self.context.lineWidth = this.size;
            self.context.beginPath();

            self.context.moveTo(this.prevX, this.prevY);
            self.context.lineTo(x,y);
            self.context.closePath();
            self.context.stroke();

        };

        this.drawPoint = function(x, y){
            self.context.beginPath();
            self.context.arc(x, y, this.size / 2, 0,2*Math.PI);
            self.context.strokeStyle = this.color;
            self.context.fillStyle = this.color;
            self.context.fill();
            self.context.lineWidth = 2;
            self.context.strokeStyle = this.color;
            //context.closePath();
            self.context.stroke();
        };

        this.destroy = function() {
            $("#outputImg").off("mousedown");
            $("#outputImg").off("mousemove");
            $("#outputImg").off("mouseup");
            $("#outputImg").off("mouseleave");

            self.paint = false;
            // self.alive = false;
            self.prevX = null;
            self.prevY = null;
            $("#penSize").css("display", "none");
        };
    };

    // RESIZE IMAGE
    this.ResizeImg = function(canvasId) {
        /*
         * Object responsable for resize a image.
         * The id of the canvas is passed for allow get it.
         * */

        this.canvasId = canvasId;
        this.modalSRC = `
        <div class="modal fade" id="resizeModal" tabindex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCenterTitle">Resize Image</h5>
                        <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </a>
                    </div>

                    <div class="modal-body">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="ratioLocked">
                            <label class="custom-control-label" for="ratioLocked">Lock proportion</label>
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="heightSize">Height</label>
                            <input type="number" class="form-control" id="heightSize" min="1">
                            <label for="widthSize">Width</label>
                            <input type="number" class="form-control" id="widthSize" min="1">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="triggerResizeImg">Resize</button>
                    </div>
                </div>
             </div>
        </div>`;
        let self = this;

        this.initModal = function() {
            /*
             * Displays the modal with the options to resize the image.
             * */

            $("html").append(self.modalSRC);
            let width = $("#"+self.canvasId).width();
            let height = $("#"+self.canvasId).height();
            self.ratio = parseFloat(width) / parseFloat(height);
            $("#widthSize").val(width);
            $("#heightSize").val(height);
            $("#resizeModal").modal();
        },

        this.doResize = function() {
            /*
             * Adds the event listeners to the ALREADY CREATED modal.
             * */

            $("#triggerResizeImg").click(function() {
                let src = cv.imread(self.canvasId);
                let dst = new cv.Mat();
                let size = new cv.Size(parseInt($("#widthSize").val()),
                                       parseInt($("#heightSize").val()));
                cv.resize(src, dst, size, 0, 0, cv.INTER_AREA);
                cv.imshow(self.canvasId, dst);

                src.delete();
                dst.delete();
            });

            $("#ratioLocked").change(function() {
                let width = parseInt($("#widthSize").val());
                let height = parseInt($("#heightSize").val());
                self.ratio = parseFloat(width) / parseFloat(height);
            });

            $("#heightSize").change(function() {
                if ($("#ratioLocked").is(":checked")) {
                    let width = Math.ceil($("#heightSize").val() * self.ratio);
                    $("#widthSize").val(width);
                }
            });

            $("#widthSize").change(function() {
                if ($("#ratioLocked").is(":checked")) {
                    let height = Math.ceil($("#widthSize").val() / self.ratio);
                    $("#heightSize").val(height);
                }
            });
        }
    }

    // ROTATE
    this.RotateImg = function(canvasId) {
        /*
         * Object responsable for rotate a image.
         * The id of the canvas is passed for allow get it.
         * */

        this.canvasId = canvasId;
        this.modalSRC = `
        <div class="modal fade" id="rotateModal" tabindex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCenterTitle">Rotate Image</h5>
                        <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </a>
                    </div>

                    <div class="modal-body">
                        <div class="form-group">
                            <label for="angle">Angle (in degrees)</label>
                            <input type="number" class="form-control" id="angle" min="1">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="triggerRotateImg">Rotate</button>
                    </div>
                </div>
             </div>
        </div>`;
        let self = this;

        this.initModal = function() {
            /*
             * Displays the modal with the options to rotate the image.
             * */

            $("html").append(self.modalSRC);

            $("#rotateModal").modal();
        },

        this.doRotation = function() {
            /*
             * Adds the event listeners to the ALREADY CREATED modal.
             * */

            $("#triggerRotateImg").click(function() {
                let src = cv.imread(self.canvasId);
                let dst = new cv.Mat();

                let center = new cv.Point(src.cols / 2, src.rows / 2);
                let dsize = new cv.Size(src.rows, src.cols);

                let transform = cv.getRotationMatrix2D(center, parseInt($("#angle").val()), 1);
                cv.warpAffine(src, dst, transform, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
                cv.imshow(self.canvasId, dst);

                src.delete();
                dst.delete();
            });
        }
    }

    // CUT IMAGE
    this.ImgCutter = function(canvasId) {
        /*
         * Object responsable for cut a image in a marked region.
         */
        this.originX = null;
        this.originY = null;
        this.canvasId = canvasId;
        let rect = $("#outImgContainer")[0].getBoundingClientRect();
        this.offsetX = rect.left;
        this.offsetY = rect.top;

        this.ctx = $("#"+canvasId)[0].getContext("2d");
        this.active = false;

        let self = this;

        $("#"+self.canvasId).on("mousedown", function(event) {
            self.originX = event.pageX;
            self.originY = event.pageY;
            self.$cropArea = $("<div>", {id:"cropArea", "class":"crop-area"}, "</div>");
            $("#"+self.canvasId).before(self.$cropArea);
            self.active = true;
        });

        $("#"+self.canvasId).on("mousemove", function(event) {
            if (self.active) {
                let width = event.pageX - self.originX;
                let height = event.pageY - self.originY;
                self.$cropArea.css({"width":Math.abs(width), "height":Math.abs(height)});
                let top = (height < 0) ? (event.pageY - self.offsetY) : (self.originY - self.offsetY);
                let left = (width < 0) ? (event.pageX - self.offsetX) : (self.originX - self.offsetX);

                self.$cropArea.css({"top":top, "left":left});
            }
        });

        $("#"+self.canvasId).on("mouseup", function(event) {
            self.active = false;
            let width = event.pageX - self.originX;
            let height = event.pageY - self.originY;

            let rectOffset = $("#"+self.canvasId)[0].getBoundingClientRect();
            let top = (height < 0) ? (event.pageY - rectOffset.top) : (self.originY - rectOffset.top);
            let left = (width < 0) ? (event.pageX - rectOffset.left) : (self.originX - rectOffset.left);

            let src = cv.imread(self.canvasId);
            let rect = new cv.Rect(left, top, Math.abs(width), Math.abs(height));
            let croppedImg = new cv.Mat();
            croppedImg = src.roi(rect);
            $("#cropArea").remove();
            cv.imshow(self.canvasId, croppedImg);

            $("#"+self.canvasId).off("mousedown");
            $("#"+self.canvasId).off("mousemove");
            $("#"+self.canvasId).off("mouseup");
        });
    };

    this.Text = function(){
        let type = false;
        let x = null;
        let y = null;
        let font;
        let size;
        let color;

        this.write = function(){
            var context = canvas.getContext("2d");
            context.font = this.size+this.font;
            //context.font = "30px Comic Sans MS";
            context.fillStyle = this.color;
            context.fillText($("#textContent").val(), this.x, this.y);
        };
    };

    this.HorizontalFlip = function(canvasId) {
        /*
         * Object responsable for perform the horizontal flip.
        */

        this.canvasId = canvasId;

        let src = cv.imread(canvasId);
        let dst = new cv.Mat();

        cv.flip(src, dst, 1);

        cv.imshow(canvasId, dst);

        src.delete();
        dst.delete();
    };

    this.VerticalFlip = function(canvasId) {
        /*
         * Object responsable for perform the vertical flip.
        */

        this.canvasId = canvasId;

        let src = cv.imread(canvasId);
        let dst = new cv.Mat();

        cv.flip(src, dst, 0);

        cv.imshow(canvasId, dst);

        src.delete();
        dst.delete();
    };

};
