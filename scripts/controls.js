//automatic key press
window.addEventListener('keyup', function(event) { key.onKeyUp(event); }, false);
window.addEventListener('keydown', function(event) { key.onKeyDown(event); }, false);

var key = {
  pressed: {},

  left: 37,
  up: 38,
  right: 39,
  down: 40,
  control: 17,
  command: 91,
  space: 32,
  shift: 16,
  
  onKeyDown: function(event) {
      window.dokeydown(event.keyCode);
      this.pressed[event.keyCode] = (new Date).getTime(); //set it to milliseconds
  },
  
  onKeyUp: function(event) {
      window.dokeyup(event.keyCode);
      delete this.pressed[event.keyCode];
  },
  
  moveLeft: function() {
    //check if no collision left
        if(key.pressed[key.left] > 0) {
            if(!tetris.piece.checkCollision(2)){
                player.tspinRotate = false; //not tspin if moved
                
                tetris.piece.lockdown();

                tetris.piece.x--;
                tetris.ghost.update();
                tetris.piece.update();
                tetris.drawBoard();
            }
            this.canMoveLeft = setTimeout(key.moveLeft, settings.arr);
        }
  },
  
  moveRight: function() {
    //check if no collision right
        if(key.pressed[key.right] > 0) {
            if(!tetris.piece.checkCollision(0)){
                player.tspinRotate = false; //not tspin if moved
                
                tetris.piece.lockdown();

                tetris.piece.x++;
                tetris.ghost.update();
                tetris.piece.update();
                tetris.drawBoard();
            }
            this.canMoveRight = setTimeout(key.moveRight, settings.arr);
        }
  },
};


//single key press

dokeydown = function(e) {
    switch (e) {
        case key.control:
        //control
        case key.command:
        //command
            if(key.pressed[key.control] == undefined && key.pressed[key.command] === undefined ) {
                if(tetris.piece.canRotate(-1)) {
                    
                    tetris.piece.rotationLimit++; //lock down rotation limit
                    clearTimeout(tetris.piece.lockDownTimer);
                    tetris.piece.lockDownTimer = false;
                    
                    tetris.piece.angle--;
                    if(tetris.piece.angle < 0){
                        tetris.piece.angle = 3;
                    }

                    player.tspinRotate = true; //detect rotate
                    
                    tetris.piece.lockdown();

                    tetris.ghost.update();
                    tetris.piece.update();
                    tetris.drawBoard();
                }
            }
        break;
        case key.left:
        //left
            if(key.pressed[key.left] === undefined){
                key.canMoveLeft = setTimeout(key.moveLeft, settings.das);
                //check if no collision left
                if(!tetris.piece.checkCollision(2)){
                    tetris.piece.rotationLimit++; //lock down rotation limit
                    clearTimeout(tetris.piece.lockDownTimer);
                    tetris.piece.lockDownTimer = false;
                    
                    player.tspinRotate = false; //clear tspin rotate, not tpsin if move left/right
                    
                    tetris.piece.lockdown();

                    tetris.piece.x--;
                    tetris.ghost.update();
                    tetris.piece.update();
                    tetris.drawBoard();
                }
                delete key.pressed[key.right];
            }
        break;
        case key.space:
            if(key.pressed[key.space] === undefined){
            //spacebar
            
                //check if no collision left
                while(!tetris.piece.checkCollision(1)) {
                    player.tspinRotate = false; //reset tspin
                    tetris.piece.y++;
                }
                tetris.ghost.update();
                tetris.piece.update();
                tetris.drawBoard();
                tetris.piece.die();
            }
        break;
        case key.shift:
        //shift
            if(key.pressed[key.shift] === undefined) {
                player.tspinRotate = false; //not tspin if new piece comes
                tetris.hold();
            }
        break;
        case key.up:
            if(key.pressed[key.up] === undefined) {
                if(tetris.piece.canRotate(1)) {
                    
                    tetris.piece.rotationLimit++; //lock down rotation limit
                    clearTimeout(tetris.piece.lockDownTimer);
                    tetris.piece.lockDownTimer = false;
                    
                    tetris.piece.angle++;
                    if(tetris.piece.angle > 3){
                        tetris.piece.angle = 0;
                    }
                    
                    player.tspinRotate = true; //detect rotate
                    
                    tetris.piece.lockdown();

                    tetris.ghost.update();
                    tetris.piece.update();
                    tetris.drawBoard();
                }
            }
            break;
        case key.right:
            //check if no collision right
            if(key.pressed[key.right] === undefined){
                key.canMoveRight = setTimeout(key.moveRight, settings.das);
                if(!tetris.piece.checkCollision(0)){
                    tetris.piece.rotationLimit++; //lock down rotation limit
                    clearTimeout(tetris.piece.lockDownTimer);
                    tetris.piece.lockDownTimer = false;
                    
                    player.tspinRotate = false; //not tspin if move right
                    
                    tetris.piece.lockdown();

                    tetris.piece.x++;
                    tetris.ghost.update();
                    tetris.piece.update();
                    tetris.drawBoard();
                }
                delete key.pressed[key.left];
            }
            break;
        case key.down:
            if(key.pressed[key.down] === undefined) {
                //check if no collision down
                if(!tetris.piece.checkCollision(1)){
                    clearInterval(tetris.piece.interval);
                    tetris.piece.interval = setInterval(tetris.piece.gravityInterval, settings.gravity);

                    tetris.piece.y++;
                    
                    //reset lockdown timer and rotation limit if reach a new lowest line
                    if(tetris.piece.y > tetris.piece.lowestLine){
                        tetris.piece.lowestLine = tetris.piece.y;
                        tetris.piece.rotationLimit = 0;
                        clearTimeout(tetris.piece.lockDownTimer);
                        tetris.piece.lockDownTimer = false;
                    }
                    
                    player.tspinRotate = false; //not tspin if move down

                    tetris.piece.lockdown();

                    tetris.ghost.update();
                    tetris.piece.update();
                    tetris.drawBoard();
                }
            }
        break;
    }
};

dokeyup = function(e) {
    switch (e) {
        case key.down:
            clearInterval(tetris.piece.interval);
            
            tetris.piece.interval = setInterval(tetris.piece.gravityInterval, 1000);
            break;
        case key.left:
            clearTimeout(key.canMoveLeft);
            break;
        case key.right:
            clearTimeout(key.canMoveRight);
            break;
        
    }
};