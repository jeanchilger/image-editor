function Pen(){
    let canvas = $("#outputImg")[0];
    let context = canvas.getContext('2d');
    let paint = false;
    let prevX = null;
    let prevY = null;

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

};
