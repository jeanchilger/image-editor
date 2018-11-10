function Tools(){
    let canvas = $("#outputImg")[0];
    this.Pen = function(){
        let context = canvas.getContext('2d');
        let paint = false;
        let prevX = null;
        let prevY = null;
        let color = "fff";
        let size = 5;
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

            context.lineWidth = this.size;
            context.beginPath();

            context.moveTo(this.prevX, this.prevY);
            context.lineTo(x,y);
            context.closePath();
            context.stroke();
        };

        this.drawPoint = function(x, y){
            context.beginPath();
            context.arc(x, y, this.size / 2, 0,2*Math.PI);
            context.strokeStyle = this.color;
            context.fillStyle = this.color;
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = this.color;
            //context.closePath();
            context.stroke();
        };

    },

    // CUT IMAGE
    this.ImgCutter = function(canvasId) {
        this.originX = null;
        this.originY = null;
        this.canvasId = canvasId;
        let rect = $("#outImgContainer")[0].getBoundingClientRect();
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
            $("#"+self.canvasId).unbind("mousedown", "mousemove", "mouseup");
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
            console.log(this.size+this.font);
            console.log(this.color);
            context.fillStyle = this.color;
            context.fillText($("#textContent").val(), this.x, this.y);
        };
    }
};
