function Tools(){
    this.Pen = function(){
        let canvas = $("#outputImg")[0];
        let context = canvas.getContext('2d');
        let paint = false;
        let prevX = null;
        let prevY = null;
        self = this;

        this.init = function(){

             $("#outputImg").mousedown(function(event){
                rect = $("#outputImg")[0].getBoundingClientRect();
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
            context.strokeStyle = "#df4b26";
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
            context.strokeStyle = "#df4b26";
            context.fillStyle = "#df4b26";
            context.lineWidth = 2;
            context.fill();
            //context.closePath();
            context.stroke();
        }

    },

    this.cutImage = function(inputImg, outputImg) {
        
    }
};
