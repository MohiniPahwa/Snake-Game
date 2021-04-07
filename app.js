const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');

pen.fillStyle='green';

const W=1200;
const H=735;

//size of one cell of snake
const cs=67;

//score
let score;
//create one empty food object
let food=null;

// create a snake object
   const snake={
       initial_length:5,
     direction:'right',
       cells:[],
       createSnake: function() {
           for(let i=0;i<this.initial_length;i++){
               this.cells.push({
                   x:i,
                   y:0
               })
            }
       },
       drawSnake: function() {
           for(let cell of this.cells)
           {
           pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2);
       }
    },
       updateSnake: function() {
           let headX=this.cells[this.cells.length-1].x;
           let headY=this.cells[this.cells.length-1].y;
         //checking for food collision
         if(food.x==headX && food.y==headY){
             food=getRandomFood();
             score++;
         }
         else{
             this.cells.shift();
         }
         
           //creating x and y for the next cell after the snake head

           let nextX,nextY;
          
           if(this.direction== 'up')
           {
               nextX=headX;
               nextY=headY-1;
               if(nextY*cs<0)
               {
                   pen.fillText("Game Over",50,100)
                   clearInterval(id);
               }
           }
           else if(this.direction== 'down')
           {
               nextX=headX;
               nextY=headY+1;
               if(nextY*cs > H)
               {
                   pen.fillText("GameOver",50,100)
                   clearInterval(id);
               }
           }
           else if(this.direction== 'left')
           {
               nextX=headX-1;
               nextY=headY;
               if(nextX*cs<0)
               {
                pen.fillText("GameOver",50,100)
                clearInterval(id);
               }
           }
           else{
           nextX=headX+1;
           nextY=headY;
           if(nextX*cs>W)
           {
            pen.fillText("GameOver",50,100)
            clearInterval(id);
           }
           }
           //this.cells.shift(); // removing one cell from the beginning
           
           //adding a next cell inside a cell array
           this.cells.push({
               x:nextX,
               y:nextY
           })
       } 
   }



  //used to initialise the game

function init(){
    score=0;
    snake.createSnake();
    snake.drawSnake();
   
    food=getRandomFood();
    function keyPressed(e){
        if(e.key== 'ArrowUp'){
            snake.direction= 'up';
        }
       else if(e.key== 'ArrowDown'){
            snake.direction= 'down';
        }
        else if(e.key== 'ArrowLeft'){
            snake.direction= 'left';
        }
         else {
            snake.direction= 'right';
        }
    }
          document.addEventListener('keydown',keyPressed);
    
}

  //used to draw the object on canvas
function draw(){
    pen.clearRect(0,0,W,H);
    pen.fillStyle='lightgreen';
    pen.font = "40px sans-serif";
    pen.fillText(`Score: ${score}`, 50, 50);
    pen.fillStyle='red';
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
  pen.fillStyle='green';
    snake.drawSnake();
    pen.fillStyle="lightgreen";
   pen.fillText(`Snake Game`,950,50);
    
}
  //update the game object
function update(){
    snake.updateSnake();
    
}

function getRandomFood(){
    
    let foodX=Math.round(Math.random()*(W-cs)/cs);
    let foodY=Math.round(Math.random()*(H-cs)/cs);
const food={
    x:foodX,
    y:foodY
}
return food;
}

  //gameloop
function gameloop(){
   
    draw();
    update();

}
init(); //calling init function

const id=setInterval(gameloop,200);



