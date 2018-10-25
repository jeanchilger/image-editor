function Tools(){
    this.Pen = function(){
        let canvas = $("#outputImg")[0];
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

    };

    this.ImgCutter = function() {
        // usa div e quando tira faz com rect
        this.originX = null;
        this.originY = null;
        let rect = $("#outputImg")[0].getBoundingClientRect();
        this.offsetX = rect.left;
        this.offsetY = rect.top;

        this.ctx = $("#outputImg")[0].getContext("2d");
        this.active = false;

        let self = this;

        $("#outputImg").mousedown(function(event) {
            self.originX = event.pageX;
            self.originY = event.pageY;

            self.ctx.rect(self.originX - self.offsetX, self.originY - self.offsetY, 1, 1);
            self.ctx.stroke();
            self.active = true;
        });

        $("#outputImg").mousemove(function(event) {
            if (self.active) {
                let width = event.pageX - self.originX;
                let height = event.pageY - self.originY;

            }
        });

        $("#outputImg").mouseup(function(event) {
            self.active = false;
        });
    }
};
