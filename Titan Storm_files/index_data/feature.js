function TitanShow () {
  
 var titan = [];
	for (i=1; i <4; i++)
	{
 		titan[i] = new TitanFly();
		titan[i].visible = true;
        titan[i].x =  game.layout.REELS.x  + i*(game.layout.symbolWidth + game.layout.reelGap); 
	   this.addChild(titan[i]);	
 		}
		
	this.visible = false;	


this.position = function () {
   	for (var i =1; i < 4; i ++ ) {
   titan[i].y =  game.layout.REELS.y  +  scatterReels[i] * game.layout.symbolHeight ;
		}
 	
	}  
		
		
this.init = function()  
	{   
	 lightning.launch(); 
	 
	this.visible = true;

	 for (i=1; i <4; i++) {
		 titan[i].visible = true;
		  titan[i].showme();
		titan[i].play(0);  
	 
		} 
  };
  
	}
TitanShow.prototype = new AF.Movie(); 




function TitanFly() {
 
var dt = 75;
var alltime =  52 *dt;
var flyspeed = 22*dt;
var flashtime = 13 * dt;
 AF.Movie.call(this, alltime );
 
var titan_str = "0,1,2,3,4,5,6,7,8,9,10"; 
var  left_str = "2,2,2,2,2,2,2,2,0,1,02"; 
var right_str = "6,6,6,6,0,1,2,3,4,5,06";
var   top_str = "0,1,2,3,4,5,6,7,8,9,10"; 
var bottom_str= "0,1,2,3,4,5,6,7,8,9,10";  
 
var panelbg = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro/Sym12_Frame.png'),3);
panelbg.frame = 0;  panelbg.y = -66;
 this.addChild(panelbg);


var titanpunch = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro/Sym12.jpg'),11);
 
this.addChild(titanpunch);
this.addTween(new AF.SpriteTween(titanpunch, 0).set(flashtime, titan_str, flyspeed));  

var titanpunchleft = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro/Sym12_Left.png'),3);
     titanpunchleft.x = -30;    titanpunchleft.y = -75;   
 this.addChild(titanpunchleft);
 this.addTween(new AF.SpriteTween(titanpunchleft, 2).set(flashtime,left_str,flyspeed)); 

var titanpunchright = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro/Sym12_Right.png'),7);
   titanpunchright.x =150;  titanpunchright.y = -75;
this.addChild(titanpunchright);
this.addTween(new AF.SpriteTween(titanpunchright, 6).set(flashtime,right_str, flyspeed));      

 var titanpunchtop = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro/Sym12_Top.png'),11);
    titanpunchtop.y =   - 75;  
 this.addChild(titanpunchtop);
this.addTween(new AF.SpriteTween(titanpunchtop, 0).set(flashtime,top_str, flyspeed));   
 
   var titanbottom = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro/Sym12_Bottom.png'),11);
    titanbottom.y =  150;  
 this.addChild(titanbottom);
this.addTween(new AF.SpriteTween(titanbottom, 0).set(flashtime,bottom_str, flyspeed));   
 
 
 var firework = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro/Sym12_Break.png'),6);
firework.x = -50;  firework.y = -50;
this.addChild(firework);
this.addTween(new AF.SpriteTween(firework, 0).set(flashtime, "0-5", 10*dt));    



var titanbox = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro/Sym12_Frame.png'),3);
this.addChild(titanbox);
titanbox.y = -66;
this.addTween(new AF.SpriteTween(titanbox, 0).set(0, "0,0,2,2,1,1,2,2,1,1,2,2,1,1,0,0", flashtime));  

 this.addTween(new AF.Tween(titanpunch, "alpha", 1).set( 3*dt+flyspeed+flashtime + 3*dt, 1).set(alltime, 0) );   
this.addTween(new AF.Tween(titanpunchtop, "alpha", 1).set(3*dt+flyspeed+flashtime + 3*dt, 1).set(alltime, 0) );   
this.addTween(new AF.Tween(titanbottom, "alpha", 1).set(3*dt+flyspeed+flashtime + 3*dt, 1).set(alltime, 0) );   
this.addTween(new AF.Tween(panelbg, "alpha",1).set(3*dt+flyspeed+flashtime + 3*dt, 1).set(alltime, 0) );  
 
 
 this.addAction(function(){
titanbox.visible = false;
 },flashtime);   
 
 this.addAction(function(){
 firework.visible = false;
 }, 27*dt );   

this.addAction(function(){
this.visible = false;
this.stop(0);
   		
 timerbox.afterclickspin();  
  	 lpsound.stop(0); 
	 layerchange = false;
	 
 }, alltime -2); 
 

this.showme = function() {	
titanbox.visible = true;	
 firework.visible = true;	
 
	}; 
 

} 
TitanFly.prototype = new AF.Movie(); 




// ---------------------------------------     

function AbstractSymbol(symID) {
    var t = 35;
    AF.Movie.call(this, 30 * t);

    var body = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'), 14);
    body.frame = symID; 
    this.addChild(body);      

    var scaleTo = 1.1;  
    var dx = -game.layout.symbolWidth * (scaleTo - 1) * 0.5;
    var dy = -game.layout.symbolHeight * (scaleTo - 1) * 0.5;


     this.addTween(new AF.Tween(body, "scaleX", 1).set(4 * t, scaleTo).set(17 * t, 1).set(20 * t, 1).set(25 * t, 1)     );
    this.addTween(new AF.Tween(body, "scaleY", 1).set(4 * t, scaleTo).set(17 * t, 1).set(20 * t, 1).set(25 * t, 1)     );
    this.addTween(new AF.Tween(body, "x", 0).set(4* t, dx).set(17 * t, 0)      );
    this.addTween(new AF.Tween(body, "y", 0).set(4 * t, dy).set(17 * t, 0)     );
	

 
 this.addAction(function(){
 
if(scatterReels[1] >=0 && scatterReels[2] >= 0 &&  scatterReels[3] >= 0 && ! game.freeGames.m_bInFreeGames)
this.stop(0);
   
    },20 * t);  
 	
	
}
AbstractSymbol.prototype = new AF.Movie();



function WildAnimation()
{
 var t =  90 ;    var str = "0-13";  var strleft ="0-13"; 
AF.Movie.call(this, 15*t);
  
var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym00.jpg'),14);
var top = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym00_top.png'),1);
var bottom = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym00_bottom.png'),14);
var left = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym00_left.png'),14);
var right = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym00_right.png'),14);
 
 
sprite.y =  12;  sprite.x =  34 -24 +2;
top.y = 0;    top.x = -23  +1 ;  
bottom.y =  sprite.y + 126;   bottom.x =  top.x  ;
 
left.y =  12;  left.x = sprite.x -34    ; 
right.y = 12 ;  right.x = sprite.x + 126 -1  ;
 
 
this.addChild(sprite); 
this.addChild(top);  
this.addChild(bottom); 
this.addChild(left); 
this.addChild(right);


this.addTween(new AF.SpriteTween(top, 0).set(0, "0", 13*t));
this.addTween(new AF.SpriteTween(sprite, 0).set(0,str, 13*t));
this.addTween(new AF.SpriteTween(bottom, 0).set(0,str, 13*t));
this.addTween(new AF.SpriteTween(left, 0).set(0, strleft, 13*t));
this.addTween(new AF.SpriteTween(right, 0).set(0, strleft, 13*t));


this.hideme = function () {
this.stop(0) ;
};



this.addAction(function(){

if(scatterReels[1] >=0 && scatterReels[2] >= 0 &&  scatterReels[3] >= 0 && ! game.freeGames.m_bInFreeGames)
{ this.visible = false;
}
},0);  	
 
 
 
 
 this.addAction(function(){
  var istofreegame = scatterReels[1] >=0 && scatterReels[2] >= 0 &&  scatterReels[3] >= 0 && ! game.freeGames.m_bInFreeGames ;
  	 
	 if (istofreegame)
	   this.moveTo(1);  
	 
 	else if (WINLINES > 1) 
	   this.stop(0);  
  
    },13*t-1);  	
 
 
}
WildAnimation.prototype = new AF.Movie(); 


function ScatterAnimation()
{
 	
}
ScatterAnimation.prototype = new AF.Movie();


function ScatterWildAnimation()
{
 var dt = 105;     AF.Movie.call(this,16*dt);  
 var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatterwild/Sym12_Animation.jpg'),16); 
this.addChild(sprite);

var str = "0-12,11-12,11-12,11-12,13-16"; 
   
 this.addTween(new AF.SpriteTween(sprite, 0).set(0, str, 16*dt));
 
  
}
ScatterWildAnimation.prototype = new AF.Movie();
 
    
 
 function setTextFormat(t, tf, rside){
    var prop, tsize;
    for (prop in tf){
        if (tf.hasOwnProperty(prop)){
            t[prop] = tf[prop];
        }
        if (prop == "size"){
            tsize = tf["size"];
        }
		if (prop == "color"){
            tColor = tf["color"];
        }
    }
    //t.setTextFormat("yellow");
    t.setTextFormat({
        size:parseInt(tsize),
        color:tColor,
		align:"center",
        rside:rside
    });
}


AF.Text.addFormat("offwhite1", {color:'#ffffff 0.2, #9c9c9c 0.5, #9a9a9a 0.6', stroke:'black 4'});
AF.Text.addFormat("gold1", {color:'#faeb00 0.2, #dc9000 0.5', stroke:'black 3'});


AF.Text.addFormat("offwhite2",  {color:'white ', stroke:'#ffffff 10'});
AF.Text.addFormat("gold2", {color:'white ', stroke:'#fdf7be 8'});

AF.Text.addFormat("offwhite_s", {color:'#ffffff 0.2, #9c9c9c 0.5, #9a9a9a 0.6', stroke:'black 4'});
AF.Text.addFormat("gold_s", {color:'#faeb00 0.2, #dc9000 0.5', stroke:'#585350 4'});

AF.Text.addFormat("offwhite_s2", {color:'white', stroke:' #ffffff 10'});
AF.Text.addFormat("gold_s2",{color:'white', stroke:'#fdf7be 8'});

AF.Text.addFormat("touchme", {color:'#f2f2f2 0.2,  #9a9a9a 0.6', stroke:' #242020 3'});

// =============================================================================
  

function LightFromReelsGap() {
 	
var dt = 61;     AF.Movie.call(this,100*dt);   this.visible = false;
var posy = -48;
var posx =  -6;

var dtgap1 = 1*dt;
var dtgap2 =  10*dt;
var dtgap3 =  20*dt;
var dtgap4 =  25*dt;  

// use to 0.3
var alpha1 = 0.6,  alpha2 = 0.6,  alpha3 = 0.6,  alpha4 = 0.6;
var frames  =  "0,0,0,0,1,1,1,1,1,1,1,2,2,2,3,3,3,2,3,2,3,2,3,2,3";  
var frames2  = "1,1,1,1,1,1,1,2,2,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3";  
 

var reelheight = 1.1 ;
var reelheight2 = 1.01 ;
    
 // 1st  2nd  shines
var ShineBox1 = new AF.Movie();
    ShineBox1.y =  Math.round( game.ASSET_MANAGER.getAsset('ReelShine.png').height/2 ) + posy ;
    ShineBox1.x = posx; 	
var Shine1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('ReelShine.png'), 4);
	Shine1.y =  -Math.round( game.ASSET_MANAGER.getAsset('ReelShine.png').height/2  );

   
var ShineBox2 = new AF.Movie();
  ShineBox2.y =  Math.round(game.ASSET_MANAGER.getAsset('ReelShine.png').height/2)  + posy ;
  ShineBox2.x = posx + 158; 	
var Shine2 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('ReelShine.png'), 4);
	Shine2.y =  -Math.round(game.ASSET_MANAGER.getAsset('ReelShine.png').height/2);
 
 	 
var ShineBox3 = new AF.Movie();
  ShineBox3.y =  Math.round(game.ASSET_MANAGER.getAsset('ReelShine.png').height/2)  + posy;
  ShineBox3.x =  posx + 300 + 16;
var Shine3 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('ReelShine.png'), 4);
	Shine3.y =  -Math.round(game.ASSET_MANAGER.getAsset('ReelShine.png').height/2);
 

var ShineBox4 = new AF.Movie();
  ShineBox4.y =  Math.round(game.ASSET_MANAGER.getAsset('ReelShine.png').height/2)  + posy ;
  ShineBox4.scaleX = -1;    ShineBox4.x = posx + 1117-150;
var Shine4 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('ReelShine.png'), 4);
	Shine4.y =  -Math.round(game.ASSET_MANAGER.getAsset('ReelShine.png').height/2);
 
 	ShineBox1.addChild(Shine1); 
    this.addChild(ShineBox1); 
   ShineBox2.addChild(Shine2); 
   this.addChild(ShineBox2);  
    ShineBox3.addChild(Shine3); 
    this.addChild(ShineBox3);  
   ShineBox4.addChild(Shine4); 
    this.addChild(ShineBox4);  
  
this.addTween(new AF.SpriteTween(Shine1, 0).set(0, frames,  50*dt));
    
  this.addTween(new AF.Tween(ShineBox1,  "alpha", 0).set(dtgap1, 0).set(dtgap1+dt*1, alpha1).set(dtgap1+dt*2, alpha1).set(dtgap1+dt*3,1).set(dtgap1+dt*4,alpha1).set(dtgap1+dt*5, 1).set(dtgap1+dt*6, alpha1).set(dtgap1+dt*7, 1 ).set(dtgap1+dt*8,alpha1 ).set(dtgap1+dt*9, 1 ).set(dtgap1+dt*10,alpha1 ).set(dtgap1+dt*11, 1 ).set(dtgap1+dt*12,alpha1 ).set(dtgap1+dt*13, 1 ).set(dtgap1+dt*14,alpha1 ).set(dtgap1+dt*15, 1 ).set(dtgap1+dt*16,alpha1 ).set(dtgap1+dt*17, 1 ).set(dtgap1+dt*18,alpha1 ).set(dtgap1+dt*19, 1 ).set(dtgap1+dt*20, alpha1 ).set(dtgap1+dt*21, 1 ).set(dtgap1+dt*22,alpha1 ).set(dtgap1+dt*23, 1 ).set(dtgap1+dt*24,alpha1 ).set(dtgap1+dt*25, 1 ).set(dtgap1+dt*26,alpha1 ).set(dtgap1+dt*27, 1 ).set(dtgap1+dt*28,alpha1 ).set(dtgap1+dt*29, 1 ).set(dtgap1+dt*30, alpha1 ).set(dtgap1+dt*31, 1 ).set(dtgap1+dt*32,alpha1 ).set(dtgap1+dt*33, 1 ).set(dtgap1+dt*34,alpha1 ).set(dtgap1+dt*35, 1 ).set(dtgap1+dt*36,alpha1 ).set(dtgap1+dt*37, 1 ).set(dtgap1+dt*38,alpha1 ).set(dtgap1+dt*39, 1 ).set(dtgap1+dt*40, alpha1 ).set(dtgap1+dt*41, 1 ).set(dtgap1+dt*42,alpha1 ).set(dtgap1+dt*43, 1 ).set(dtgap1+dt*44,alpha1 ).set(dtgap1+dt*45, 1 ).set(dtgap1+dt*46,alpha1 ).set(dtgap1+dt*47, 1 ).set(dtgap1+dt*48,alpha1 ).set(dtgap1+dt*49, 0 ).set(dtgap1+dt*50, 0 )   );   
  
  this.addTween(new AF.Tween(ShineBox1,  "scaleY", 1).set(dtgap1+dt*13, 1).set(dtgap1+dt*19, 1.3).set(dtgap1+dt*20, 1).set(dtgap1+dt*47,reelheight).set(dtgap1+dt*50, 0)   );
 
 
 this.addTween(new AF.SpriteTween(Shine2, 0).set(dtgap2, frames,  50*dt)); 
  this.addTween(new AF.Tween(ShineBox2,  "alpha", 0).set(dtgap2, 0).set(dtgap2+dt*1, alpha2).set(dtgap2+dt*2, alpha2).set(dtgap2+dt*3,1).set(dtgap2+dt*4,alpha2).set(dtgap2+dt*5, 1).set(dtgap2+dt*6, alpha2).set(dtgap2+dt*7, 1 ).set(dtgap2+dt*8,alpha2 ).set(dtgap2+dt*9, 1 ).set(dtgap2+dt*10,alpha2 ).set(dtgap2+dt*11, 1 ).set(dtgap2+dt*12,alpha2 ).set(dtgap2+dt*13, 1 ).set(dtgap2+dt*14,alpha2 ).set(dtgap2+dt*15, 1 ).set(dtgap2+dt*16,alpha2 ).set(dtgap2+dt*17, 1 ).set(dtgap2+dt*18,alpha2 ).set(dtgap2+dt*19, 1 ).set(dtgap2+dt*20, alpha2 ).set(dtgap2+dt*21, 1 ).set(dtgap2+dt*22,alpha2 ).set(dtgap2+dt*23, 1 ).set(dtgap2+dt*24,alpha2 ).set(dtgap2+dt*25, 1 ).set(dtgap2+dt*26,alpha2 ).set(dtgap2+dt*27, 1 ).set(dtgap2+dt*28,alpha2 ).set(dtgap2+dt*29, 1 ).set(dtgap2+dt*30, alpha2 ).set(dtgap2+dt*31, 1 ).set(dtgap2+dt*32,alpha2 ).set(dtgap2+dt*33, 1 ).set(dtgap2+dt*34,alpha2 ).set(dtgap2+dt*35, 1 ).set(dtgap2+dt*36,alpha2 ).set(dtgap2+dt*37, 1 ).set(dtgap2+dt*38,alpha2 ).set(dtgap2+dt*39, 1 ).set(dtgap2+dt*40, alpha2 ).set(dtgap2+dt*41, 1 ).set(dtgap2+dt*42,alpha2 ).set(dtgap2+dt*43, 1 ).set(dtgap2+dt*44,alpha2 ).set(dtgap2+dt*45, 1 ).set(dtgap2+dt*46,alpha2 ).set(dtgap2+dt*47, 1 ).set(dtgap2+dt*48,alpha2 ).set(dtgap2+dt*49, 0).set(dtgap2+dt*50, 0 )   );   
  
 
  this.addTween(new AF.Tween(ShineBox2,  "scaleY", 1).set(dtgap2+dt*13, 1).set(dtgap2+dt*19, 1.3).set(dtgap2+dt*20, 1).set(dtgap2+dt*47,reelheight).set(dtgap2+dt*50, 0)   );
  

  
   this.addTween(new AF.SpriteTween(Shine3, 0).set(dtgap3, frames2,  50*dt)); 
  this.addTween(new AF.Tween(ShineBox3,  "alpha", 0).set(dtgap3, 0).set(dtgap3+dt*1, alpha3).set(dtgap3+dt*2, alpha3).set(dtgap3+dt*3,1).set(dtgap3+dt*4,alpha3).set(dtgap3+dt*5, 1).set(dtgap3+dt*6, alpha3).set(dtgap3+dt*7, 1 ).set(dtgap3+dt*8,alpha3 ).set(dtgap3+dt*9, 1 ).set(dtgap3+dt*10,alpha3 ).set(dtgap3+dt*11, 1 ).set(dtgap3+dt*12,alpha3 ).set(dtgap3+dt*13, 1 ).set(dtgap3+dt*14,alpha3 ).set(dtgap3+dt*15, 1 ).set(dtgap3+dt*16,alpha3 ).set(dtgap3+dt*17, 1 ).set(dtgap3+dt*18,alpha3 ).set(dtgap3+dt*19, 1 ).set(dtgap3+dt*20, alpha3 ).set(dtgap3+dt*21, 1 ).set(dtgap3+dt*22,alpha3 ).set(dtgap3+dt*23, 1 ).set(dtgap3+dt*24,alpha3 ).set(dtgap3+dt*25, 1 ).set(dtgap3+dt*26,alpha3 ).set(dtgap3+dt*27, 1 ).set(dtgap3+dt*28,alpha3 ).set(dtgap3+dt*29, 1 ).set(dtgap3+dt*30, alpha3 ).set(dtgap3+dt*31, 1 ).set(dtgap3+dt*32,alpha3 ).set(dtgap3+dt*33, 1 ).set(dtgap3+dt*34,alpha3 ).set(dtgap3+dt*35, 1 ).set(dtgap3+dt*36,alpha3 ).set(dtgap3+dt*37, 1 ).set(dtgap3+dt*38,alpha3 ).set(dtgap3+dt*39, 1 ).set(dtgap3+dt*40, alpha3 ).set(dtgap3+dt*41, 1 ).set(dtgap3+dt*42,alpha3 ).set(dtgap3+dt*43, 1 ).set(dtgap3+dt*44,alpha3 ).set(dtgap3+dt*45, 1 ).set(dtgap3+dt*46,alpha3 ).set(dtgap3+dt*47, 1 ).set(dtgap3+dt*48,alpha3 ).set(dtgap3+dt*49,1 ).set(dtgap3+dt*50, alpha3 ).set(dtgap3+dt*51, 1).set(dtgap3+dt*52, alpha3 ).set(dtgap3+dt*53, 1).set(dtgap3+dt*55, 0 ).set(dtgap3+dt*56, 0 ));   
  
 this.addTween(new AF.Tween(ShineBox3,  "scaleY", 0.3).set(dtgap3+dt*13, 1.5 ).set(dtgap3+dt*14, 1 ).set(dtgap3+dt*47, reelheight ).set(dtgap3+dt*50, reelheight ).set(dtgap3+dt*55, 1));
  
 	 
	 
	 
  this.addTween(new AF.SpriteTween(Shine4, 0).set(dtgap4, frames2,  50*dt));  
  this.addTween(new AF.Tween(ShineBox4,  "alpha", 0).set(dtgap4, 0).set(dtgap4+dt*1, alpha4).set(dtgap4+dt*2, alpha4).set(dtgap4+dt*3,1).set(dtgap4+dt*4,alpha4).set(dtgap4+dt*5, 1).set(dtgap4+dt*6, alpha4).set(dtgap4+dt*7, 1 ).set(dtgap4+dt*8,alpha4 ).set(dtgap4+dt*9, 1 ).set(dtgap4+dt*10,alpha4 ).set(dtgap4+dt*11, 1 ).set(dtgap4+dt*12,alpha4 ).set(dtgap4+dt*13, 1 ).set(dtgap4+dt*14,alpha4 ).set(dtgap4+dt*15, 1 ).set(dtgap4+dt*16,alpha4 ).set(dtgap4+dt*17, 1 ).set(dtgap4+dt*18,alpha4 ).set(dtgap4+dt*19, 1 ).set(dtgap4+dt*20, alpha4 ).set(dtgap4+dt*21, 1 ).set(dtgap4+dt*22,alpha4 ).set(dtgap4+dt*23, 1 ).set(dtgap4+dt*24,alpha4 ).set(dtgap4+dt*25, 1 ).set(dtgap4+dt*26,alpha4 ).set(dtgap4+dt*27, 1 ).set(dtgap4+dt*28,alpha4 ).set(dtgap4+dt*29, 1 ).set(dtgap4+dt*30, alpha4 ).set(dtgap4+dt*31, 1 ).set(dtgap4+dt*32,alpha4 ).set(dtgap4+dt*33, 1 ).set(dtgap4+dt*34,alpha4 ).set(dtgap4+dt*35, 1 ).set(dtgap4+dt*36,alpha4 ).set(dtgap4+dt*37, 1 ).set(dtgap4+dt*38,alpha4 ).set(dtgap4+dt*39, 1 ).set(dtgap4+dt*40, alpha4 ).set(dtgap4+dt*41, 1 ).set(dtgap4+dt*42,alpha4 ).set(dtgap4+dt*43, 1 ).set(dtgap4+dt*44,alpha4 ).set(dtgap4+dt*45, 1 ).set(dtgap4+dt*46,alpha4 ).set(dtgap4+dt*47, 1 ).set(dtgap4+dt*48,alpha4 ).set(dtgap4+dt*49, 0 ).set(dtgap4+dt*52, 0 )   );   
  
 this.addTween(new AF.Tween(ShineBox4,  "scaleY", 0.3).set(dtgap4+dt*13, 1.5 ).set(dtgap4+dt*14, 1 ).set(dtgap4+dt*47, reelheight ).set(dtgap4+dt*50, 1)   );
  
     

 

this.init = function()   // to play it.
	{ this.visible = true;
		this.play(0);  };

this.addAction(function(){ 
 game.playSound('windup'); 
 
}, 2); 	

this.addAction(function(){ 
 this.stop(0); 
 this.visible = false; 
 }, 100*dt-1); 


} 
LightFromReelsGap.prototype = new AF.Movie(); 
 

 
 
// =============================================================================

var flashme = [];

function LightNing()
{
 var t = 35; 	
 var str =  "0-4,4-7,4-7,4-7,4-7,1,0" ;
 var xyzoom = 2;
  
AF.Movie.call(this, 140*t);
this.visible = false;
 
 var light = []; 
	
  var getlight = game.ASSET_MANAGER.getAsset('lightning/LightingStrike.png');
	
 	light[1] = new AF.Sprite(getlight, 8);
    this.addChild(light[1]); 
	light[1].x = 260;  
	light[1].scaleX = light[1].scaleY = xyzoom;
  	
	this.addTween(new AF.SpriteTween(light[1], 0).set(0, str, 22*t));
  	this.addTween(new AF.Tween(light[1],  "alpha", 1).set(22*t,1).set(22*t+1,0) );  
	
    light[2] = new AF.Sprite(getlight, 8);
    this.addChild(light[2]);
	light[2].x = 410;   
	light[2].scaleX = light[2].scaleY = xyzoom;
   	this.addTween(new AF.Tween(light[2],  "alpha", 1).set(22*t,1).set(22*t+1,0) );  
	this.addTween(new AF.SpriteTween(light[2], 0).set(0, str, 22*t));
   
    light[3] = new AF.Sprite(getlight, 8);
    this.addChild(light[3]);
	light[3].x = 570;    
	light[3].scaleX = light[3].scaleY = xyzoom;
 	this.addTween(new AF.SpriteTween(light[3], 0).set(0, str, 22*t));
   	this.addTween(new AF.Tween(light[3],  "alpha", 1).set(22*t,1).set(22*t+1,0) );  
		
  this.setposition = function (p1, p2, p3) {
	  // update basey
  var basey =   -game.layout.REELS.y-game.layout.symbolHeight*2;
  	  light[1].y = basey + 150* p1;
	   light[2].y = basey + 150*p2; 
	  	light[3].y = basey + 150*p3;
		
	  };
	  

//----------------------------------------  


 var flashscatter = [];
 var flashwild = [];
  var spritescatter = [];
  
  var spriteswild = [];
 

for (var i =1; i < 4; i ++ ) {   
   
spritescatter[i] = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym12.png'), 6);    
spriteswild[i] =  new WildAnimation();

 
spritescatter[i].x =  -5 + game.layout.REELS.x  + i*(game.layout.symbolWidth + game.layout.reelGap);  

 spriteswild[i].x =  game.layout.REELS.x  + i*(game.layout.symbolWidth + game.layout.reelGap);  

spritescatter[i].visible = false;   spriteswild[i].visible = false;

this.addChild(spritescatter[i]);  this.addChild(spriteswild[i]);

this.addTween(new AF.SpriteTween(spritescatter[i], 0).set(22*t, "0,0,0,1,1,1,2,2,2,3,3,4,4,5,5,3,4,5,3,4,5,3,4,5,4,4,3,3,2,2,2,1,1,1,0,0,0,1,1,1,2,2,2,3,3,4,4,5,5,3,4,5,3,4,5,3,4,5,3,4,5,3,4,5,3,4,5,3,4,5", 139*t));
}

  
 
this.setsymbolposition = function () {
	for (var i =1; i < 4; i ++ ) {
spritescatter[i].y = 5+ game.layout.REELS.y  + scatterReels[i]*game.layout.symbolHeight;  	

spriteswild[i].y =   game.layout.REELS.y  + scatterReels[i]*game.layout.symbolHeight;  	 	
 
     }
	
}; 
 
 
 
 
this.setflashsymbols = function () {
  
 for (var i =1; i < 4; i ++ ) {  
 
  
 if (wild_scatter[i])   {
 	     spritescatter[i].visible = true;  
		 spriteswild[i].visible = false;  
 		  }
		 else{
 		       spritescatter[i].visible = false;  
			   
			   spriteswild[i].play(0);  
			   spriteswild[i].visible = true;  
  			 }
       };
 };
 
 
 

  this.scatterwildinit = function()  
	{ 
	  this.setsymbolposition();
 	  this.setflashsymbols();
 	
	this.visible = true;
	this.play(22*t +1);    
 	
  timerbox.icebreak();
  game.playSound("feature1");
   // game.stopSound();
 }; 
 
 
 
 	this.addAction(function(){
 	game.ui.showWinMeter(false);	
//	game.stopSound();	
		
	}, 0);

   
  
  this.launch = function()  
	{ 
    this.setposition (scatterReels[1],scatterReels[2],scatterReels[3]); 
  
   	this.visible = true;
 	this.play(0);  
   // game.stopSound();
 		};
		
		
  this.addAction(function(){
    this.visible = false;
    this.stop(0);
	
 	}, 22*t);  
	   		
 
 this.hideme = function () {
  for (var i =1; i < 4; i ++ ) {  
    spriteswild[i].stop(0);  
   }; 
	 
	 };
 
 
		
  this.addAction(function(){
 //		 game.playSound("feature1");   
 
 
 	}, 22*t+5);  
	   		
 

this.addAction(function(){ 
this.stop(0);
this.visible = false;

  for (var i =1; i < 4; i ++ ) {  
    spriteswild[i].stop(0);  
   };
  
  
}, 140*t-1); 
  
    
}
LightNing.prototype = new AF.Movie();






 
function PunchWallPNG() {
 var dt = 165;     AF.Movie.call(this,60*dt);   
   this.visible = false;
	
var      str_left = "3,3,3,3,3,0,0"; 
var     str_right = "3,3,3,3,3,0,0"; 
var       str_top = "3,3,3,3,3,0,0"; 
var    str_bottom = "2,2,2,2,2,0,0"; 

var     str_left2 = "1,2,3,3,3,3,3,3";    
var    str_right2 = "1,2,3,3,3,3,3,3";  
var      str_top2 = "1,2,3,3,3,3,3,3"; 
var   str_bottom2 = "1,2,2,2,2,2,2,2"; 
	
 
var toppt = new AF.Sprite(game.ASSET_MANAGER.getAsset('icecrack/Top.png'), 4); 
  toppt.x = 0; toppt.y = 70 -70;
   
var bottompt = new AF.Sprite(game.ASSET_MANAGER.getAsset('icecrack/Bottom.png'), 3);  
  bottompt.x = 0;  bottompt.y = 70 + 457;
 
var left = new AF.Sprite(game.ASSET_MANAGER.getAsset('icecrack/Left.png'), 4);
 left.x= 40 -  40;   left.y = 70;  
 
var right = new AF.Sprite(game.ASSET_MANAGER.getAsset('icecrack/Right.png'), 4);   
 right.x= 40 + 880;   right.y = 70;
   
 
this.addTween(new AF.SpriteTween(left, 3).set(0, str_left, 6*dt));   
this.addTween(new AF.SpriteTween(right, 3).set(0, str_right, 6*dt)); 
this.addTween(new AF.SpriteTween(toppt, 3).set(0, str_top, 6*dt));

this.addTween(new AF.SpriteTween(bottompt, 2).set(0, str_bottom, 6*dt)); 
 
this.addTween(new AF.SpriteTween(left, 3).set(6*dt, str_left2, 6*dt));   
this.addTween(new AF.SpriteTween(right, 3).set(6*dt, str_right2, 6*dt)); 

this.addTween(new AF.SpriteTween(toppt, 3).set(6*dt, str_top2, 6*dt));
this.addTween(new AF.SpriteTween(bottompt, 2).set(6*dt, str_bottom2, 6*dt)); 
  
 
  this.addChild(toppt);   
 this.addChild(bottompt);   
  this.addChild(left);   
 this.addChild(right);   
 
 
this.addAction(function(){ 
   this.visible = false; 
 this.stop(0);
  }, 20*dt-1); 	
	
	
this.addAction(function(){ 
 layerchange = true; 
  }, 9*dt); 		
	
   
	
 this.init = function () 
	{ this.visible = true;
		this.play(0);  
 };
 
} 
PunchWallPNG.prototype = new AF.Movie(); 

 


 
function PunchWall() {
 var dt = 165;     AF.Movie.call(this,60*dt);     this.visible = false;

     var   strwall1= "0,0,1,1,2,3,4";  
    var   strwall2 = "0,1,2,2,3,3,4,4";    
    var   strwall3 = "0,1,2,2,2,2,3,4,5,6";   
 
var wall1 = new AF.Sprite(game.ASSET_MANAGER.getAsset('icecrack/Reels_1.jpg'), 5);  
var wall2 = new AF.Sprite(game.ASSET_MANAGER.getAsset('icecrack/Reels_2.jpg'), 5);   
var wall3 = new AF.Sprite(game.ASSET_MANAGER.getAsset('icecrack/Reels_3.jpg'), 7);    

wall1.y = 70;   wall1.x = 40;    
wall2.y = 70;   wall2.x = 40;  wall2.visible = false;
wall3.y = 70;   wall3.x = 40;   wall3.visible = false;  
this.addChild(wall3);  this.addChild(wall2);    this.addChild(wall1);
 
this.addTween(new AF.Tween(wall1, "alpha", 0).set(1*dt, 0.2).set(2*dt, 0.3).set(3*dt,0.5).set(4*dt,1)  );  
this.addTween(new AF.SpriteTween(wall1, 0).set(0, strwall1, 6*dt));
this.addTween(new AF.SpriteTween(wall2, 0).set(6*dt, strwall2, 6*dt)); 
this.addTween(new AF.SpriteTween(wall3, 0).set(12*dt, strwall3, 8*dt));


this.addAction(function(){ 
if(wall1.visible == false){
wall1.visible = true;   
 
}

},1); 


this.addAction(function(){ 
lightning.hideme(); 
},3*dt); 

this.addAction(function(){ 
wall1.visible = false;  wall2.visible = true;

},6*dt);  


this.addAction(function(){ 
wall2.visible = false;  wall3.visible = true;
},12*dt);   
 

this.init = function()   // to play it.
{ this.visible = true;
this.play(0);  
game.ui.showWinMeter(false);		
};

 this.addAction(function(){ 
bgreels.visible = false;

},7*dt); 	 

 
this.addAction(function(){ 
  swordup.show();
bgreels.visible = true;
}, 20*dt +1); 	


this.addAction(function(){ 
this.visible = false; 
 
wall2.visible = false;
wall3.visible = false;
this.stop(0);
 }, 40*dt-1); 
  

} 
PunchWall.prototype = new AF.Movie(); 

   
   

function SwordUp() {
	
 var dt = 85;     AF.Movie.call(this,30*dt);    this.visible = false;
    
var titanbg =   new AF.Sprite(game.ASSET_MANAGER.getAsset('FreeGame_BG.jpg'), 1);     
     titanbg.frame = 1;   
	 

 var messagebar =   new AF.Sprite(game.ASSET_MANAGER.getAsset('ScrollMessage.png'), 1); 
 messagebar.y = game.layout.REELS.y + 454;
 messagebar.x = game.layout.REELS.x ;  

 

var titan =   new AF.Sprite(game.ASSET_MANAGER.getAsset('icecrack/Reels_3.jpg'), 7);     
titan.frame = 6;  titan.x =40;   titan.y = 70;
	 
 
 this.addChild(titanbg);
 this.addChild(titan);
    this.addChild(messagebar);    
    
// titan fade in.   
this.addTween(new AF.Tween(titanbg, "alpha", 1).set(25*dt, 0)); 
this.addTween(new AF.Tween(titan, "alpha", 1).set(18*dt, 0)); 
	
 this.init = function()   
	{ this.visible = true;
		this.play(0); 
 		//	game.ui.showWinMeter(true);	
 	  };	 
   	
    this.addAction(function () {
 	    this.visible = false;
		this.stop(0);
		
      },30*dt -1); 
	  
this.show = function () {
	this.visible = true;
 	  introPanel.init();
    introPanel2.init();
	  introPanel3.init();
 	
	};	  
 	
 
} 
SwordUp.prototype = new AF.Movie(); 
 
 
 //========================================= 
 
function IntroPanel()
{
 var dt = 75;
 AF.Movie.call(this, 60*dt);  
 this.visible = false;
 
 var darktint = new AF.Sprite(game.ASSET_MANAGER.getAsset('DarkTint.png'), 1);
      darktint.x = - (layout.SMALL_PANEL.x+26 );
    darktint.y = - layout.SMALL_PANEL.y;
	darktint.scaleX = 2;  	darktint.scaleY = 2;
  
  var tintopacity =0.6;
     this.addChild(darktint);   
 
     var txt1 = new AF.Text();
 	setTextFormat(txt1, TXT_FEATURE_INTRO_1, 700);
	   txt1.setTextFormat("offwhite1"); 
    this.addChild(txt1);

    var won = new AF.Text();
 	setTextFormat(won, TXT_FEATURE_INTRO_2, 700);
	 won.setTextFormat("gold1"); 
    this.addChild(won);
    
	 
    var descr1 = new AF.Text();
 	setTextFormat(descr1, TXT_FEATURE_INTRO_3, 700);
	 descr1.setTextFormat("gold1"); 
    this.addChild(descr1);

 	var descr3 = new AF.Text();
 	setTextFormat(descr3, TXT_FEATURE_INTRO_5, 700);
	   descr3.setTextFormat("gold1"); 
 //   this.addChild(descr3);
  
 	this.addTween(new AF.Tween(darktint, "alpha", 0).set(22*dt, tintopacity).set(42*dt, tintopacity).set(47*dt, 0));
  	
	this.addTween(new AF.Tween(txt1,      "alpha", 0).set(22*dt, 1).set(42*dt, 1).set(47*dt, 0));
    this.addTween(new AF.Tween(won,      "alpha", 0).set(22*dt, 1).set(42*dt, 1).set(47*dt, 0));
 	this.addTween(new AF.Tween(descr1,  "alpha", 0).set(22*dt, 1).set(42*dt, 1).set(47*dt, 0));
	this.addTween(new AF.Tween(descr3,  "alpha", 0).set(22*dt, 1).set(42*dt, 1).set(47*dt, 0));	
	
 
   this.init = function () {
    this.canClick = false;
      
        this.play(0);
     this.visible = true;
     }; 
	 

 this.addAction(function () {
    
    }, 11);
	

    this.addAction(function () {
 			this.canClick = true;
             this.stop(); 
  	 lpsound.play(0); 
 
	  
     }, 23*dt);		
	
	
	
    this.processClick = function (coords) {

        if (this.visible ) {
			
 	if (!this.canClick || !this.visible)  return;

  		   this.play(42*dt);  // go ahead with the last part of animation
		   introPanel2.hide(); introPanel3.hide();
		   
		   
      this.canClick = false; 
  		 swordup.init();
	
           }
    };
	
  
	
    this.addAction(function () {
 	    this.visible = false;
        this.stop(0);
        timerbox.titanfly();
		
     }, 60*dt -1); 
	
 
	
      
 
}
IntroPanel.prototype = new AF.Movie();

 

function IntroPanel2()
{
 var dt = 75;
 AF.Movie.call(this,60*dt);  
 this.visible = false;
 
     var txt1 = new AF.Text();
 	setTextFormat(txt1, TXT_FEATURE_INTRO_1, 700);
	   txt1.setTextFormat("offwhite2"); 
    this.addChild(txt1);

    var won = new AF.Text();
 	setTextFormat(won, TXT_FEATURE_INTRO_2, 700);
	 won.setTextFormat("gold2"); 
    this.addChild(won);
    
	 
    var descr1 = new AF.Text();
 	setTextFormat(descr1, TXT_FEATURE_INTRO_3, 700);
	 descr1.setTextFormat("gold2"); 
    this.addChild(descr1);

 	var descr3 = new AF.Text();
 	setTextFormat(descr3, TXT_FEATURE_INTRO_5, 700);
	   descr3.setTextFormat("offwhite2"); 
  
 
	this.addTween(new AF.Tween(txt1,      "alpha", 0).set(22*dt, 1).set(42*dt, 1).set(47*dt, 0));
    this.addTween(new AF.Tween(won,      "alpha", 0).set(22*dt, 1).set(42*dt, 1).set(47*dt, 0));
 	this.addTween(new AF.Tween(descr1,  "alpha", 0).set(22*dt, 1).set(42*dt, 1).set(47*dt, 0));
	this.addTween(new AF.Tween(descr3,  "alpha", 0).set(22*dt, 1).set(42*dt, 1).set(47*dt, 0));	
 	 
	    this.addAction(function () {
              this.stop(); 
     }, 41*dt);	 
	
	
	
   this.hide = function () {
         this.play(42*dt);
     }; 
	 

   this.init = function () {
 
        this.visible = true;
        this.play(0);
     }; 
	 
     this.addAction(function () {
   
	    this.visible = false;
        this.stop(0);
     }, 60*dt -1); 
  
}
IntroPanel2.prototype = new AF.Movie();





function IntroPanel3()
{
 var dt = 75;
 AF.Movie.call(this,60*dt);  
 this.visible = false;
 
 	var descr3 = new AF.Text();
 	setTextFormat(descr3, TXT_FEATURE_INTRO_5, 700);
	   descr3.setTextFormat("touchme"); 
    this.addChild(descr3);
    
	this.addTween(new AF.Tween(descr3,  "alpha", 0).set(22*dt, 1).set(25*dt, 1).set(30*dt, 0.3).set(41*dt, 1).set(42*dt, 1).set(47*dt, 0));	
 

	 
	    this.addAction(function () {
           		this.moveTo(25*dt);
     }, 41*dt);	 
	
	
	
   this.hide = function () {
         this.play(42*dt);
     }; 
	 

   this.init = function () {
 
        this.visible = true;
        this.play(0);
     }; 
	 
 	
    this.addAction(function () {
   
	    this.visible = false;
        this.stop(0);
     }, 60*dt -1); 
  
}
IntroPanel3.prototype = new AF.Movie();


 

 //====================================== 
 
 


function BigFive() {

 var dt = 85;
 AF.Movie.call(this, 36*dt);  
 this.visible = false;

 	var fiveGrowBox = new AF.Movie();
	fiveGrowBox.x =370+ Math.round(game.ASSET_MANAGER.getAsset('x5.png').width/2) ;
	fiveGrowBox.y =315 + Math.round(game.ASSET_MANAGER.getAsset('x5.png').height/2);
	
	
    var five =  new AF.Sprite(game.ASSET_MANAGER.getAsset('x5.png'), 1);
	five.x = -Math.round(game.ASSET_MANAGER.getAsset('x5.png').width/2);
	five.y =  -Math.round(game.ASSET_MANAGER.getAsset('x5.png').height/2);
 
	fiveGrowBox.addChild(five); 
    this.addChild(fiveGrowBox);  
  
 
 this.addTween(new AF.Tween(fiveGrowBox,  "alpha", 1).set(dt*9, 1).set(dt*9, 1).set(dt*13, 0)    );
 this.addTween(new AF.Tween(fiveGrowBox,  "scaleX", 0.3).set(dt*12, 2 ).set(dt*13, 0.7).set(dt*18, 0)    );
 this.addTween(new AF.Tween(fiveGrowBox,  "scaleY", 0.3).set(dt*12, 2 ).set(dt*13, 0.7).set(dt*18, 0)    );
 
  this.addTween(new AF.Tween(fiveGrowBox,  "y", fiveGrowBox.y).set(dt*18, fiveGrowBox.y - 150)    );
 
  

this.addAction(function(){ 
  this.visible = false; 
 }, 18*dt-1); 
 
 
this.init = function()   // to play it.
{ 
this.visible = true;
this.play(0); 
game.playSound('five'); 


 
var isretrigger = scatterReels[1] >=0 && scatterReels[2] >= 0 &&  scatterReels[3] >= 0 && game.freeGames.m_bInFreeGames ;	 

  game.freeGames.m_RespinTimer = isretrigger ? 1500:3500  ;   
 
};
 
  
 
this.addAction(function(){ 
	   
   if (!game.slotResult.numFreeGames == 0)
	{
   game.startSpin();   
 	
	};  
   
   this.stop(0); 
  
 }, 33*dt-1);  

} 
BigFive.prototype = new AF.Movie(); 

 


// ===================================================== 


function SummaryPanel ()
{
	AF.Movie.call(this,5900);
 	this.visible = false;
 
    var txt1 = new AF.Text();
    setTextFormat(txt1, TXT_FEATURE_SUMMARY_1, 0);
    txt1.setTextFormat("offwhite_s");
    this.addChild(txt1);

    var txt2 = new AF.Text();
    setTextFormat(txt2, TXT_FEATURE_SUMMARY_2, 0);
	    txt2.setTextFormat("gold_s");
    this.addChild(txt2);

    var prize = new AF.Text();
   setTextFormat(prize, {y:230, size:80}, 0);
   
   
	prize.setTextFormat("gold_s");
    this.addChild(prize);
  
 		
	this.addTween(new AF.Tween(txt1,  "alpha", 0).set(500, 0).set(1000, 1).set(5200, 1).set(5700, 0));
	this.addTween(new AF.Tween(txt2,  "alpha", 0).set(500, 0).set(1000, 1).set(5200, 1).set(5700, 0));
	this.addTween(new AF.Tween(prize, "alpha", 0).set(1, 0).set(1000, 0).set(1001, 1).set(5200, 1).set(5700, 0)); 
    
       
	var currVolume;
	var win;
	var winDelta;
	var winRoll;
	this.init = function()
	{
		this.visible = true;
		this.play(0);
		summaryPanelbg.init();
		
		currVolume = 0.9;
		win =  game.slotResult.winAmount;
		winDelta = Math.max(37, win / 30);
		winRoll = 1;	      	
 	prize.text = game.account.getCurrencyString(winRoll);
	game.ui.showWinMeter(false);	
	};  
	
 
	
	this.addAction(function(){
 
		if(win<=0)
		{
			this.moveTo(3000);
	
		}
		else
		{
			game.playSound('dingding');
		}
	}, 999);

	
	this.addAction(function(){
		winRoll = Math.min(win, winRoll + winDelta);
	 	prize.text = game.account.getCurrencyString(winRoll);
		if(winRoll<win)
		{
			this.moveTo(1000);
		}
		else
		{
			this.moveTo(3000);
		}
	}, 1060);

	this.addAction(function(){
	  	game.playSound('win2');
	}, 3000);
	
	
	
 this.addAction(function(){
		summaryPanelbg.fadeout(); 
	}, 3100); 

 
 	
 this.jumptoend = function()
	{
		this.moveTo(5900-1);
  	};  
	
	
	this.addAction(function(){
 
		game.freeGames.m_bInFreeGames = false;
		autoDelayAfterFeature = false;
		inFeature = false; 
		 afterFGdraw = true; 
 	
	}, 5700);	
	
	
 
	this.addAction(function(){
      	this.visible = false;
		this.stop();
 
		game.freeGames.m_bInFreeGames = false;
		autoDelayAfterFeature = false;
		inFeature = false; 
		summaryPanelbg.visible = false; 
		
 	}, 5900-1);
 
 
}
SummaryPanel.prototype = new AF.Movie();

 
 
 

function SummaryPanel2 ()
{
	AF.Movie.call(this,5900);
 	this.visible = false;
 
    var txt1 = new AF.Text();
    setTextFormat(txt1, TXT_FEATURE_SUMMARY_1, 0);
    txt1.setTextFormat("offwhite_s2");
    this.addChild(txt1);

    var txt2 = new AF.Text();
    setTextFormat(txt2, TXT_FEATURE_SUMMARY_2, 0);
	    txt2.setTextFormat("gold_s2");
    this.addChild(txt2);

    var prize = new AF.Text();
   setTextFormat(prize, {y:230, size:80}, 0);
   
   
	prize.setTextFormat("gold_s2"); 
    this.addChild(prize);
  
 		
	this.addTween(new AF.Tween(txt1,  "alpha", 0).set(500, 0).set(1000, 1).set(5200, 1).set(5700, 0));
	this.addTween(new AF.Tween(txt2,  "alpha", 0).set(500, 0).set(1000, 1).set(5200, 1).set(5700, 0));
	this.addTween(new AF.Tween(prize, "alpha", 0).set(1, 0).set(1000, 0).set(1001, 1).set(5200, 1).set(5700, 0)); 
    
       
	var currVolume;
	var win;
	var winDelta;
	var winRoll;
	this.init = function()
	{
		this.visible = true;
		this.play(0);
		summaryPanelbg.init();
		
		currVolume = 0.9;
		win =  game.slotResult.winAmount;
		winDelta = Math.max(37, win / 30);
		winRoll = 1;	      	
 	prize.text = game.account.getCurrencyString(winRoll);
	game.ui.showWinMeter(false);	 
	};  
	
 
	
	this.addAction(function(){
 
		if(win<=0)
		{
			this.moveTo(3000);
	
		}
		else
		{
			//game.playSound('dingding');
		}
	}, 999);

	
	this.addAction(function(){
		winRoll = Math.min(win, winRoll + winDelta);
	 	prize.text = game.account.getCurrencyString(winRoll);
		if(winRoll<win)
		{
			this.moveTo(1000);
		}
		else
		{
			this.moveTo(3000);
		}
	}, 1060);

	this.addAction(function(){
	  	game.playSound('win2');
	}, 3000);
	
	
	
 this.addAction(function(){
		summaryPanelbg.fadeout(); 
	}, 3100); 

 
 	
 this.jumptoend = function()
	{
		this.moveTo(5900-1);
  	};  
	
	
	this.addAction(function(){
 
		game.freeGames.m_bInFreeGames = false;
		autoDelayAfterFeature = false;
		inFeature = false; 
		 afterFGdraw = true; 
 	
	}, 5700);	
	
	
 
	this.addAction(function(){
      	this.visible = false;
		this.stop();
 
		game.freeGames.m_bInFreeGames = false;
		autoDelayAfterFeature = false;
		inFeature = false; 
		summaryPanelbg.visible = false; 
		
 	}, 5900-1);
 
 
}
SummaryPanel2.prototype = new AF.Movie();

  
 
 
 

function SummaryPanelBG ()
{
	AF.Movie.call(this,5900);
	
	this.visible = false;
	
	 var darktint = new AF.Sprite(game.ASSET_MANAGER.getAsset('DarkTint.png'), 1);
      darktint.x = -480  ;
    darktint.y = - 90 ;
		darktint.scaleX = 2;  	darktint.scaleY = 2;
 
      this.addChild(darktint);  
	   
  this.addTween(new AF.Tween(darktint, "alpha", 0).set(1, 0).set(999,0.7).set(1000, 0.7).set(5200, 0.7).set(5700, 0)); 
  
  this.init = function () {
	  this.visible = true;
	  this.play(0);
 	  };
	  
  this.fadeout = function () {
	  	this.moveTo(3000);
 	  };	
	  
	this.addAction(function(){
        this.stop();
	}, 1000);	  
 
	
	this.addAction(function(){
      	this.visible = false;
		this.stop();
 	}, 5900-1);	
		  		
  
      
 }
SummaryPanelBG.prototype = new AF.Movie();
 
 


// -----------------------------------------------------------------------------
  

function TitleMovie()
{
  var dt = 75;     AF.Movie.call(this,20*dt);  
  var delay = 1*dt; 
  
   
 	var titleGrowBox = new AF.Movie();
titleGrowBox.x = game.layout.REELS.x + 245 + Math.round(game.ASSET_MANAGER.getAsset('GameTitle.png').width/2) ;
  
titleGrowBox.y =  -11 +  Math.round(game.ASSET_MANAGER.getAsset('GameTitle.png').height/2);
 	
var title =  new AF.Sprite(game.ASSET_MANAGER.getAsset('GameTitle.png'), 1);
title.x = -Math.round(game.ASSET_MANAGER.getAsset('GameTitle.png').width/2);
title.y =  -Math.round(game.ASSET_MANAGER.getAsset('GameTitle.png').height/2);

titleGrowBox.addChild(title); 
this.addChild(titleGrowBox);  
  
  
  this.addTween(new AF.Tween(titleGrowBox,  "scaleX", 1).set(dt*6+delay, 1).set(dt*8+delay, 0.9).set(dt*10+delay, 1.5 ).set(dt*11+delay, 0.9 ).set(dt*12+delay,1).set(dt*13+delay, 0.9 ).set(dt*14+delay, 1 )           );
 
 this.addTween(new AF.Tween(titleGrowBox,  "scaleY", 1).set(dt*6+delay, 1).set(dt*8+delay, 0.9).set(dt*10+delay, 1.5 ).set(dt*11+delay, 0.9 ).set(dt*12+delay, 1 ).set(dt*13+delay, 0.9 ).set(dt*14+delay, 1 )            );
 
    
   
   
   
 this.init = function()     
	{
	 this.play(0);
 
 	};   
 
 
 
   
  this.addAction(function(){ 
  	 this.stop(0);
 }, dt*20 -2 ); 
  
};

TitleMovie.prototype = new AF.Movie();
 

 
 
 
function MyBar()
{
   
 var messagebar =   new AF.Sprite(game.ASSET_MANAGER.getAsset('ScrollMessage.png'), 1); 
 messagebar.y = game.layout.REELS.y + 454;
 messagebar.x = game.layout.REELS.x ;  
   this.addChild(messagebar);  
 
   
};

MyBar.prototype = new AF.Movie();
 
 
 
 
 
 
 
 
 


function RandomSprayAnim()
{
	this.sprayCoinArray = null;
	this.animconfig = new Array(6);
	this.setAnimConfig = function()
	{
		var moveStep = 8;
		for (var i = 0; i < this.animconfig.length; i++)
		{
			var moveGap = 11;
			var yy = 200;
			this.animconfig[i] = new Array(17);
			for (var j = 0; j < this.animconfig[i].length; j++)
			{
				if (j>=13)
				{
					this.animconfig[i][j] = {t:0,s:1-(i/10), a:((this.animconfig[i].length - 1 - j)*0.3),x:0,y:yy};	
				} else {
					this.animconfig[i][j] = {t:0,s:1-(i/10), a:1,x:0,y:yy};
				}
				moveGap--;
				yy = yy - moveStep*moveGap;
				if (moveGap == 1) 
				{
					moveGap--;
				}
			}
			moveStep--;
		}
	}
					   
	this.init = function()
	{
		this.sprayCoinArray = new Array(15);
		var reelWidth = game.layout.symbolWidth*5 + game.layout.reelGap*4;
		
		for (var i = 0; i<this.sprayCoinArray.length; i++) {
			this.sprayCoinArray[i] = new ngImage2(game.imageSprayAnim);
			this.sprayCoinArray[i].setAnimConfig([{x:0,y:0,w:game.imageSprayAnim.width,h:game.imageSprayAnim.height}], this.animconfig[Math.floor(Math.random()*this.animconfig.length)]);
			this.sprayCoinArray[i].setPosition(
				game.layout.REELS.x + (reelWidth/this.sprayCoinArray.length)*i + Math.floor(Math.random()*(reelWidth/this.sprayCoinArray.length))-20, 
				game.layout.REELS.y + 150 + Math.floor(Math.random()*30));
		}
		return this;
	}
	
	this.update = function(timeDelta)
	{
		if (this.sprayCoinArray!= null)
		{	
			for (var i = 0; i<this.sprayCoinArray.length; i++) {
				if (this.sprayCoinArray[i].animRunning)
				{
					this.sprayCoinArray[i].update(timeDelta);
				}
			}
		}
	}
	this.draw = function()
	{
		if (this.sprayCoinArray!= null)
		{	
			for (var i = 0; i<this.sprayCoinArray.length; i++) {
				if (this.sprayCoinArray[i].animRunning)
				{
					this.sprayCoinArray[i].draw();
				}
			}
		}
	}
	this.sprayStartAnim = function(spray)
	{
		spray.startAnim(false, 0);
	}
	
	this.startAnim = function()
	{
		if (this.sprayCoinArray!= null)
		{	
			for (var i = 0; i<this.sprayCoinArray.length; i++) {
				var sp = this.sprayCoinArray[i];
				setTimeout(this.sprayStartAnim, Math.floor(Math.random()*1000), sp);
			}
		}
	}
}

 


// ========================================================================== 

function ElectricBG() {

var dt = 55;     AF.Movie.call(this,25*dt);    this.visible = false;
 
 var leftlight = new AF.Sprite(game.ASSET_MANAGER.getAsset('Left_Electric.png'), 4);    leftlight.y = game.layout.REELS.y ;
 
    this.addChild(leftlight);
  
 var rightlight = new AF.Sprite(game.ASSET_MANAGER.getAsset('Right_Electric.png'), 4);  
 rightlight.x  = 960 -90  ;
     rightlight.y = game.layout.REELS.y ;
 
     this.addChild(rightlight);  
   
var toplight = new AF.Sprite(game.ASSET_MANAGER.getAsset('Top_Electric.png'), 4); 
  this.addChild(toplight);
     
     var left =  "0-3,2-3,3-1,3-0" ;
  var right =  "0-3,2-3,3-1,3-0" ;
  var  top = "0-3,1-3,3-2,1-3" ;
 
 
  this.addTween(new AF.SpriteTween(leftlight, 0).set(0, left, 24*dt));
  this.addTween(new AF.SpriteTween(rightlight, 0).set(0, right, 24*dt));
    this.addTween(new AF.SpriteTween(toplight, 0).set(0, top,24*dt));
   

this.init = function()   // to play it.
	{ this.visible = true;
		this.play(0);  };
 
this.addAction(function(){ 
 this.stop(0); 
 this.visible = false; 
 
 }, 25*dt-1); 
  

} 
ElectricBG.prototype = new AF.Movie(); 






function BgReels() {

var dt = 75;     AF.Movie.call(this,30*dt);    
  var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset('Reels_Frame.png'), 1); 
  
 this.addChild(bg); 
 
 
 this.hidebg = function() {
	bg.visible = false; 
	 };

 this.showbg = function() {
	bg.visible = true; 
	 };	 
 
} 
BgReels.prototype = new AF.Movie(); 







 function bigWinTitle() {
     var dt = 80;
     AF.Movie.call(this, 50 * dt);
       this.visible = false;
 	   
     var bWinWrap = new AF.Movie();
      bWinWrap.x = Math.round(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png').width / 2) + 170;
     bWinWrap.y = Math.round(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png').height / 2);

     var bWinGrow =  new AF.Sprite(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png'), 1);
     bWinGrow.x = -Math.round(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png').width / 2);
     bWinGrow.y = -Math.round(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png').height / 2);
     bWinWrap.addChild(bWinGrow);

     this.addChild(bWinWrap);

     this.addTween(new AF.Tween(bWinWrap, "y", -230)
         .set(dt * 5, -300)
         .set(dt * 25, -300)
         .set(dt * 30, -300));


     this.addTween(new AF.Tween(bWinWrap, "alpha", 0).set(5 * dt, 1).set(21 * dt,1).set(dt * 30, 0));
	 
	 
     this.addTween(new AF.Tween(bWinWrap, "scaleX", 0).set(5 * dt, 1.3).set(7 * dt, 1.1).set(9 * dt, 1).set(11 * dt, 1.1).set(13 * dt, 1.3).set(15 * dt, 1.1).set(17 * dt, 1).set(19 * dt, 1.1).set(21 * dt, 1.3).set(dt * 30, 1.7));

     this.addTween(new AF.Tween(bWinWrap, "scaleY", 0).set(5 * dt, 1.3).set(7 * dt, 1.1).set(9 * dt, 1).set(11 * dt, 1.1).set(13 * dt, 1.3).set(15 * dt, 1.1).set(17 * dt, 1).set(19 * dt, 1.1).set(21 * dt, 1.3).set(dt * 30, 1.7));


      this.init = function () {
         this.visible = true;
         this.play(0);  
     }

 
     this.addAction(function () {
         this.visible = false;
         this.stop(0);
     }, dt * 50 - 1);
 }
 bigWinTitle.prototype = new AF.Movie();


 