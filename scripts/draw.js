var draw = {
    queueCanvas : document.getElementById("queueCanvas"),
    holdCanvas : document.getElementById("holdCanvas"),
    draw : function(x, y, xPos, yPos, color, canvasType) {
        /*draw
        argument 0 = x
        argument 1 = y
        argument 2 = xPos
        argument 3 = yPos
        argument 4 = color
        argument 5 = canvasType
        */
        var ctx = canvasType.getContext("2d");
        
        ctx.fillStyle = color;
        
        //darken the color if it is not part of the current piece in the tetrisBoard.canvas
        if(canvasType == tetrisBoard.canvas){
            if(xPos > 0 || yPos > 0){
                ctx.globalAlpha = 0.9; //set transparity if ghost piece
            }
            for(var i = 0; i <= 3; i++) {
                
                if (!((x - 1 ) / 24 == tetris.piece.oldX[i]) || !((y - 1 ) / 24 == tetris.piece.oldY[i])){
                    ctx.fillStyle = shadeColor(color, -0.15);
                    
                    
                }else {
                    //break out of loop once matched
                    ctx.fillStyle = color;
                    break;
                }
            }
        }
        
        ctx.fillRect(x + xPos*24, y + yPos*24, 24, 24);
        
        ctx.beginPath();
        ctx.rect(x + xPos*24, y + yPos*24, 24, 24);
        ctx.stroke();
        
        ctx.globalAlpha = 1; //return to normal
},
    drawS : function(x, y, canvasType) {
        //draw S
        this.draw(x, y, 2, 1, "#69BE28", canvasType);
        this.draw(x, y, 1, 1, "#69BE28", canvasType);
        this.draw(x, y, 1, 2, "#69BE28", canvasType);
        this.draw(x, y, 0, 2, "#69BE28", canvasType);
    },
    drawZ : function(x, y, canvasType) {
        //draw Z
        this.draw(x, y, 0, 1, "#ED2939", canvasType);
        this.draw(x, y, 1, 1, "#ED2939", canvasType);
        this.draw(x, y, 1, 2, "#ED2939", canvasType);
        this.draw(x, y, 2, 2, "#ED2939", canvasType);
    },
    drawI : function(x, y, canvasType) {
        //draw I
        this.draw(x, y, 0, 1, "#009FDA", canvasType);
        this.draw(x, y, 1, 1, "#009FDA", canvasType);
        this.draw(x, y, 2, 1, "#009FDA", canvasType);
        this.draw(x, y, 3, 1, "#009FDA", canvasType);
    },
    drawT : function(x, y, canvasType) {
        //draw T
        this.draw(x, y, 1, 1, "#952D98", canvasType);
        this.draw(x, y, 0, 2, "#952D98", canvasType);
        this.draw(x, y, 1, 2, "#952D98", canvasType);
        this.draw(x, y, 2, 2, "#952D98", canvasType);
    },
    drawJ : function(x, y, canvasType) {
        //draw L
        this.draw(x, y, 0, 1, "#0065BD", canvasType);
        this.draw(x, y, 0, 2, "#0065BD", canvasType);
        this.draw(x, y, 1, 2, "#0065BD", canvasType);
        this.draw(x, y, 2, 2, "#0065BD", canvasType);
    },
    drawL : function(x, y, canvasType) {
        //draw L
        this.draw(x, y, 2, 1, "#FF7900", canvasType);
        this.draw(x, y, 0, 2, "#FF7900", canvasType);
        this.draw(x, y, 1, 2, "#FF7900", canvasType);
        this.draw(x, y, 2, 2, "#FF7900", canvasType);
    },
    drawO : function(x, y, canvasType) {
        //draw O
        this.draw(x, y, 1, 1, "#FECB00", canvasType);
        this.draw(x, y, 1, 2, "#FECB00", canvasType);
        this.draw(x, y, 2, 1, "#FECB00", canvasType);
        this.draw(x, y, 2, 2, "#FECB00", canvasType);
    },
    clearCanvas : function(canvasType) {
        var ctx = canvasType.getContext("2d");
        ctx.clearRect(0,0, canvasType.width, canvasType.height);
    }
};