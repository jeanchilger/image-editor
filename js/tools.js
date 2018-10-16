function Tools(){
    this.paint = false;
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();

    this.addClick = function(event, x, y, dragging){
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    };

    this.redraw = function(event){
        var context = document.getElementById('outputImg').getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for(var i=0; i < clickX.length; i++) {
            context.beginPath();
            if(clickDrag[i] && i){
                context.moveTo(clickX[i-1], clickY[i-1]);
            }
            else{
                context.moveTo(clickX[i]-1, clickY[i]);
            }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
        }
    };

    this.drawPoint = function(x, y){
        var canvas = $("#outputImg")[0].getContext('2d');
        console.log(x,y);
        canvas.beginPath();
        canvas.moveTo(0,0);
        canvas.arc(x, y,40,0,2*Math.PI);
        canvas.stroke();
    };
};

$("#triggerPen").click(function(){
    var tools = new Tools();
    //tools.initPen();

    $("#outputImg").mousedown(function(event){
        //tools.paint = true;
        //tools.addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
        tools.drawPoint(event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
        console.log(event.pageX - this.offsetLeft - 116, event.pageY - this.offsetTop - 56);
        //tools.redraw();
    });

    $("#outputImg").mousemove(function(event){
        if (tools.paint){
            tools.addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
            tools.redraw();
        }
    });

    $("#outputImg").mouseup(function(event){
        tools.paint = false;
    });

    $("#outputImg").mouseleave(function(event){
        tools.paint = false;
    });

});
