//Create variables here
var dog, happyDog;
var database, foodS, foodStock;
var Dog;
function preload()
{
  //load images here
  happyDog = loadImage('happydog.png');
  dog = loadImage("Dog.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
   Dog = createSprite(250,250);

  Dog.addImage(dog);
  Dog.scale = 0.5;
 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  Dog.addImage(happyDog);
  
}
drawSprites();
if(foodS!== undefined){


  //add styles here
stroke("black");
text("food remaining " + foodS,250,20);
fill("red");
textSize(20);
}


}

function readStock(data){
  foodS=data.val();
  console.log(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}

