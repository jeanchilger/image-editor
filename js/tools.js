function Tools(){
    this.Pen = function(){
        let canvas = $("#outputImg")[0];
        let context = canvas.getContext('2d');
        let paint = false;
        let prevX = null;
        let prevY = null;
        let color = "#000";
        let self = this;

        this.init = function(){

             $("#outputImg").mousedown(function(event){
                let rect = $("#outputImg")[0].getBoundingClientRect();
                self.paint = true;
                self.drawPoint(event.pageX - rect.left, event.pageY - rect.top);
                if(self.prevX == null){
                    self.prevX = event.pageX - rect.left;
                    self.prevY = event.pageY - rect.top;
                }
             });

             $("#outputImg").mousemove(function(event){
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

             $("#outputImg").mouseup(function(event){
                self.paint = false;
                self.prevX = null;
             });

            $("#outputImg").mouseleave(function(event){
                self.paint = false;
                self.prevX = null;
                self.prevY = null;
            });

        };

        this.draw = function(x, y){
            context.strokeStyle = this.color;
            context.lineJoin = "round";
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(this.prevX, this.prevY);
            context.lineTo(x,y);
            context.closePath();
            context.stroke();
        };

        this.drawPoint = function(x, y){
            context.beginPath();
            context.arc(x, y, 2, 0,2*Math.PI);
            context.strokeStyle = this.color;
            context.fillStyle = this.color;
            context.lineWidth = 2;
            context.fill();
            //context.closePath();
            context.stroke();
        };

    };

    this.ImgCutter = function(canvasId) {
        // usa div e quando tira faz com rect
        this.originX = null;
        this.originY = null;
        this.canvasId = canvasId;
        let rect = $("#"+canvasId)[0].getBoundingClientRect();
        this.offsetX = rect.left;
        this.offsetY = rect.top;

        this.ctx = $("#"+canvasId)[0].getContext("2d");
        this.active = false;

        let self = this;

        $("#"+self.canvasId).mousedown(function(event) {
            self.originX = event.pageX;
            self.originY = event.pageY;
            self.$cropArea = $("<div>", {id:"cropArea", "class":"crop-area"}, "</div>");
            $("#"+self.canvasId).before(self.$cropArea);
            self.active = true;
        });

        $("#"+self.canvasId).mousemove(function(event) {
            if (self.active) {
                let width = event.pageX - self.originX;
                let height = event.pageY - self.originY;
                self.$cropArea.css({"width":Math.abs(width), "height":Math.abs(height)});
                let top = (height < 0) ? (event.pageY - self.offsetY) : (self.originY - self.offsetY);
                let left = (width < 0) ? (event.pageX - self.offsetX) : (self.originX - self.offsetX);

                self.$cropArea.css({"top":top, "left":left});
            }
        });

        $("#"+self.canvasId).mouseup(function(event) {
            self.active = false;
            // let width = event.pageX - self.originX;
            // let height = event.pageY - self.originY;
            //
            // let src = cv.imread(self.canvasId);
            // let rect = new cv.Rect(self.originX - self.offsetX, self.originY - self.offsetY, width, height);
            // let croppedImg = new cv.Mat();
            // croppedImg = src.roi(rect);
            $("#cropArea").remove();
            // cv.imshow(self.canvasId, croppedImg);
        });
    }
};
