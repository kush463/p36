//Create variables here
var dog , dogImage1 , dogImage2;
var happyDog;
var foodS;
var database;
var foodStock;

function preload()
{
	//load images here
   dogImage1=loadImage("images/dogImg.png");
   dogImage2=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 400);

  database = firebase.database();

  dog = createSprite(500,500);
  dog.addImage(dogImage1);
  dog.scale=0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObject = new Food();
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);

  feedTime= database.ref("feedTime");
  feedTime.on("value",function(data){
    lastFed : data.val();
  });

  if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM", 350,30);
     }
     else if(lastFed===0){ 
       text("Last Feed : 12 AM",350,30); }
      else{ text("Last Feed : "+ lastFed + " AM", 350,30); }

  textSize(15);
  fill("lightyellow");
  text("Food Remaining:"+foodS, 430, 50);
  textSize(20);
  text("Press UP_ARROW key to feed the Dog", 20, 50);
  
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage2);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage1);
  }
  
  drawSprites();
}

function readStock(data){

  foodS = data.val(); 
  foodObject.updatefoodStock(foodS);
}

function feedDog(){ 
  dog.addImage(happyDog); 
  var food_stock_val = foodObj.getfoodStock(); 

  if(food_stock_val <= 0){ 
    foodObj.updatefoodStock(food_stock_val *0); }
    else{ foodObj.updatefoodStock(food_stock_val -1); } 
    
  database.ref('/').update({ Food:foodObj.getfoodStock(), FeedTime:hour() }) 
  }

  function addFoods(){ 
    foodS++; 
    database.ref('/').update({ Food:foodS }) 
  }

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  
  database.ref('/').update({
    'Food': x
  })
}



