AF.Text.addFormat("touchme", {color:'#F3C1E7 0.2, #906 0.5', stroke:'#59003C 2, #FAE6F5 6'});
var pickpostionX;
var pickpostionY;
//PhotoshotBG
function backGroundSwitch()
{ 
    var dt = 100;	var DL =  2*170;
	AF.Movie.call(this, 50*dt+DL);
	
	this.skipHidden = false;
 	
	var  BG =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/photoshotbg.jpg'),1);//  
	this.addChild(BG); 

	var  cover =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/changeroom.jpg'),1);//  
	cover.y = 56;
	this.addChild(cover); 

	var autoPick =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/SkipBtn.png'),1);//  
	autoPick.x = 60 + 715;
	autoPick.y = 52 + 424;
	this.addChild(autoPick); 

	this.addTween(new AF.Tween(BG,  "alpha", 0).set(DL,0).set(dt*7+DL,1).set(dt*9+DL, 1 ).set(dt*11+DL, 1).set(dt*20,0));
	this.addTween(new AF.Tween(cover,  "alpha", 0).set(DL,0).set(dt*7+DL,1).set(dt*9+DL,1).set(dt*11+DL, 1).set(dt*20,0));
	this.addTween(new AF.Tween(autoPick,  "alpha", 0).set(DL,0).set(dt*7+DL,1).set(dt*9+DL,1).set(dt*11+DL, 1).set(dt*20,0)); 
  	//_______________________________________________________________
 	
	pickpostionX = 559+ game.layout.REELS.x   + Math.round(game.ASSET_MANAGER.getAsset('photoshot/mirrorbig.png').width/2);
	pickpostionY = 202 + Math.round(game.ASSET_MANAGER.getAsset('photoshot/mirrorbig.png').height/2);
 	
	var mirrorBox = new AF.Movie();
	mirrorBox.x = pickpostionX;
  	mirrorBox.y = pickpostionY;
	//console.log(">>>> pickpostionX "+pickpostionX+", pickpostionY "+pickpostionY);

	var mirror =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/mirrorbig.png'), 1);
	mirror.x = -Math.round(game.ASSET_MANAGER.getAsset('photoshot/mirrorbig.png').width/2);
	mirror.y =  -Math.round(game.ASSET_MANAGER.getAsset('photoshot/mirrorbig.png').height/2);

	mirrorBox.addChild(mirror); 
	this.addChild(mirrorBox);  
	
	var a = 0.5;
 
	this.addTween(new AF.Tween(mirrorBox,  "scaleX", 0.50).set(DL, 0.50).set(dt*9+DL, 1 , AF.Tween.POWERK,a )    );
	this.addTween(new AF.Tween(mirrorBox,  "scaleY", 0.71).set(DL, 0.71).set(dt*9+DL, 1 , AF.Tween.POWERK,a )     );  

 	this.addTween(new AF.Tween(mirrorBox,  "x", mirrorBox.x +99 ).set(DL, mirrorBox.x +99).set(dt*9+DL, mirrorBox.x , AF.Tween.POWERK,a )   );
 	this.addTween(new AF.Tween(mirrorBox,  "y", mirrorBox.y -61 ).set(DL, mirrorBox.y -61 ).set(dt*9+DL, mirrorBox.y -66, AF.Tween.POWERK,a ) );
 
	this.addTween(new AF.Tween(mirrorBox,  "alpha", 0).set(DL, 0).set(dt*9+DL, 1 , AF.Tween.POWERK,a  ).set(dt*11+DL, 1).set(dt*20,0));
 
  //_______________________________________________________________
	this.addAction(function()
	{ 
		game.messageBar.m_Text = "";
    	mirrorShow.hidemirror();
	}, 1); 	

	this.visible = 0;
 
	this.init = function()
	{
		this.visible = true;
		this.play(0);
	};
  
 	this.endme = function()
	{
		this.play(dt*11+DL+1);
	};
	
	this.hideSkip = function()
	{
		this.skipHidden = true;
		autoPick.visible = false;
	};
	
	this.showSkip = function()
	{
		this.skipHidden = false;
		autoPick.visible = true;
	};
	

 	//	mirrorShow.sparkleLight(4);
	// FTV do first good information analysis and storage , analysis of a time bonus PICK ( 0, meaning red ) , every PICK clothes.
 
 	this.addAction(function()
	{ 
		this.stop()	
		
		mirrorShow.setPosition();
		mirrorShow.turnOnWhiteLights(NUMBER_PICK);
	
		var tmp = parseInt(CFP_HL);
		if(tmp > 0) 
		{
			for(var i = 0; i <　EACH_WIN.length; i ++)
			{
				if(EACH_WIN[i] != "0" && i < tmp-1)	
					mirrorShow.greenOn(i+1);
				else if(EACH_WIN[i] == "0" && i < tmp-1)	
					mirrorShow.redOn(i+1);
			}
		} 
	 
		//now holly speak and dresses at mirror
		dressShow.init();
	}, dt*11+DL); 
	
	this.addAction(function()
	{ 
		this.stop(0);
	}, dt*21);
};
backGroundSwitch.prototype = new AF.Movie(); 
 
function LastHollyKiss()
{
	var dt = 45;   
	var DL = 5*dt;    
  	AF.Movie.call(this,50*dt + DL);  
  	this.visible = 0;
  
	var rect = new AF.DObject();
	rect.performDraw = function()
	{    
	 	ctx.fillStyle =  "rgba(0,0,0,0.4) ";   
		ctx.fillRect(0,0,960,568);
 	};
	this.addChild(rect); 
	  
    this.addTween(new AF.Tween(rect, "alpha", 0).set(dt*5+DL , 1).set(dt*26+DL , 1).set(dt*8+28*dt, 0 )   );  
  
	var holly =  new AF.Sprite(game.ASSET_MANAGER.getAsset('holly_kiss.png'), 1);
	this.addChild(holly);  
	holly.x =  512 -166;
	holly.y =  313 -200;
 
	var starsBox = new AF.Movie();

	starsBox.x = 458-136- 68 + game.layout.REELS.x  + Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').width/2) ;
	starsBox.y = 318-130 + 18 + Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').height/2);

	var stars =  new AF.Sprite(game.ASSET_MANAGER.getAsset('sparkleBurst.png'), 1);
	stars.x = -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').width/2);
	stars.y =  -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').height/2);

	starsBox.addChild(stars); 
	this.addChild(starsBox);    

	var redkissBox = new AF.Movie();
	redkissBox.x = 460-136 - 68+ game.layout.REELS.x   + Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').width/2) ;
  	redkissBox.y = 315-100 + 48 + Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').height/2);
 
	var kiss =  new AF.Sprite(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png'), 1);
	kiss.x = -Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').width/2);
	kiss.y =  -Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').height/2);

	redkissBox.addChild(kiss); 
	this.addChild(redkissBox);  

 	this.addTween(new AF.Tween(holly,  "alpha", 0.1).set(dt*10+DL , 1).set(dt*30+DL , 1).set(dt*46+DL , 0 )    );
 	this.addTween(new AF.Tween(redkissBox,  "scaleX",0.1 ).set(dt*18+DL, 0.9 ).set(dt*8+28*dt+DL, 1.6 )    );
	this.addTween(new AF.Tween(redkissBox,  "scaleY", 0.1).set(dt*18+DL, 0.9 ).set(dt*8+28*dt+DL, 1.6 )     );  
	this.addTween(new AF.Tween(redkissBox,  "y", 240 ).set(dt*8+28*dt+DL, 460-136  )   );
	this.addTween(new AF.Tween(redkissBox,  "alpha", 0 ).set(dt*1+DL, 0).set(dt*25+DL, 1).set(dt*26+DL, 1).set(dt*8+28*dt+DL,0)     ); 
	this.addTween(new AF.Tween(starsBox,  "scaleX", 0.5).set(dt*8+DL, 0.8).set(dt*8+28*dt+DL, 1.5 )    );
	this.addTween(new AF.Tween(starsBox,  "scaleY", 0.5).set(dt*8+DL, 0.8).set(dt*8+28*dt+DL, 1.5 )   );  
	this.addTween(new AF.Tween(starsBox,  "alpha", 0 ).set(dt*10+DL-1, 0).set(dt*24+DL, 1).set(dt*8+28*dt+DL,0)     ); 
	//this.addTween(new AF.Tween(starsBox,  "y", 250).set(dt*8+28*dt+DL, 460-136   )     ); 
	
	this.addAction(function()
	{
		game.playSound('kisssrs');
		setTimeout(function(){ game.playSound('dingaction'); }, 1100);
 	}, dt*12+DL);   
 
	this.addAction(function()
	{
		if(/*game.freeGames.m_bInFreeGames && */BKS_HL == "1")
		{ 
			mirrorShow.setPositionFG();
 			mirrorShow.turnOnWhiteLights(TKS_HL);
			mirrorShow.showNumber(TKS_HL);
  		}
 	}, dt*30+DL);
 
	this.addAction(function()
	{
		this.stop(0);
		this.visible = 0;
	},dt*46+DL);
	  
	this.kissme = function() 
	{
		this.visible = 1;
		this.play(0);
	}
};
LastHollyKiss.prototype = new AF.Movie();
	
function WhizByAnimation()
{
    AF.Movie.call(this, 400);
 
    var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('whizzby.png'), 1);
    sprite.x = -20;
    this.addChild(sprite);

    this.addTween(new AF.Tween(sprite, "y", 0).set(0, -game.layout.symbolHeight*4).set(400, game.layout.symbolHeight*3));
 
	this.visible = false;
	 this.addAction(function()
    {
		this.visible = true;
		game.playSound('whizby');
	}, 2);

    this.addAction(function()
    {	
		this.visible = false;
        this.stop(0);
    }, 400-1);
}
WhizByAnimation.prototype = new AF.Movie();
  
function playWhizBy(reel, shift)
{
    if (whizByAnimations[reel].time <= 0  )
	{
		//console.log(">>>>>>>>>> PLAYING WHIZBY ANIM AND SOUND ON REEL "+reel);
    	whizByAnimations[reel].setMask(0, 0, game.imageReelBG.width, game.layout.symbolHeight*(shift+1));
       // whizByAnimations[reel].visible = true;
        if(!whizByAnimations[reel].playing)whizByAnimations[reel].play(0);
    }
};

var TXT_Mirror_NUM={
	text: "4",
 
	size:100,
	bold:true,
	hAlign: "center",
	color:" "
};

AF.Text.addFormat("mirror", {color:'white 0.7, #f8f7e2 0.4', stroke:'#ededeb 3'});
AF.Text.addFormat("respin", {color:'#fcf 0.2, #c09 0.5', stroke:'#7F1337 6, #FBD4E5 10'});
AF.Text.addFormat("summary", {color:'#fcf 0.2, #c09 0.5', stroke:'#7F1337 3, #FBD4E5 10'});
 
function setTextFormat(t, tf, rside)
{
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
};

//------grow kiss ---------------
function GrowKiss()
{
    var dt = 75;
    AF.Movie.call(this, 70*dt);

    var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'),15);
    sprite.frame = 14;
	this.visible= false;	
    this.addChild(sprite);  
 
 	var scaleTo = 1.6;
    var dx = -game.layout.symbolWidth * (scaleTo - 1) * 0.5; 
    var dy = -game.layout.symbolHeight * (scaleTo - 1) * 0.5 ;
 	
	this.addTween(new AF.Tween(sprite, "scaleX", 1).set(0, 1).set(2*dt, scaleTo).set(5*dt, 1));
	this.addTween(new AF.Tween(sprite, "scaleY", 1).set(0, 1).set(2*dt, scaleTo).set(5*dt, 1));
	this.addTween(new AF.Tween(sprite,  "alpha", 1).set(0, 1).set(2*dt, 1).set(5*dt, 1).set(7*dt, 0) );
	this.addTween(new AF.Tween(sprite, "x", 0).set(0, 0).set(2*dt, dx).set(5*dt, 0));
	this.addTween(new AF.Tween(sprite, "y", 0).set(0, 0).set(2*dt, dy).set(5*dt, 0));
 
	//------------ spakle show --------------------------
 
	var fireworkGrowBox = new AF.Movie();
	fireworkGrowBox.x = -30 + Math.round(game.ASSET_MANAGER.getAsset('sparkly_element.png').width/2) ;
	fireworkGrowBox.y = -20 + Math.round(game.ASSET_MANAGER.getAsset('sparkly_element.png').height/2);
 		
	var redlipBox = new AF.Movie();
	redlipBox.x = -30 +  4 + Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').width/2) ;
	redlipBox.y = -20 + 34 + Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').height/2);
	
	var firework =  new AF.Sprite(game.ASSET_MANAGER.getAsset('sparkly_element.png'), 1);
	firework.x = -Math.round(game.ASSET_MANAGER.getAsset('sparkly_element.png').width/2);
	firework.y =  -Math.round(game.ASSET_MANAGER.getAsset('sparkly_element.png').height/2);
	fireworkGrowBox.addChild(firework); 
	
	var redlip =  new AF.Sprite(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png'), 1);
	redlip.x = -Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').width/2);
	redlip.y =  -Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').height/2);	
	redlipBox.addChild(redlip); 
	
	this.addChild(fireworkGrowBox); 
	this.addChild(redlipBox);   
  
	var firebegin = 5*dt;   
	this.addTween(new AF.Tween(fireworkGrowBox,  "alpha", 0.8).set(firebegin-1, 0.8).set(firebegin, 1).set(firebegin+3*dt, 0.7).set(firebegin+8*dt, 0) );
	this.addTween(new AF.Tween(fireworkGrowBox,  "scaleX", 0).set(firebegin, 0).set(firebegin+3*dt,1).set(firebegin+7*dt,1.7).set(firebegin+8*dt,1.3) );
	this.addTween(new AF.Tween(fireworkGrowBox,  "scaleY", 0).set(firebegin, 0).set(firebegin+3*dt,1).set(firebegin+7*dt,1.7).set(firebegin+8*dt,1.3));
	 
	// a bit delay  
	var redlipbegin = firebegin + 2*dt; 
	this.addTween(new AF.Tween(redlipBox,  "alpha", 0).set(redlipbegin-1, 0).set(redlipbegin, 0.3).set(redlipbegin+5*dt, 0.8).set(redlipbegin+15*dt, 1).set(redlipbegin+19*dt, 0) );
	this.addTween(new AF.Tween(redlipBox,  "scaleX", 0).set(redlipbegin, 0).set(redlipbegin+5*dt,1).set(redlipbegin+10*dt,1.6).set(redlipbegin+15*dt,0.2).set(redlipbegin+19*dt,0.4) );
	this.addTween(new AF.Tween(redlipBox,  "scaleY", 0).set(redlipbegin, 0).set(redlipbegin+5*dt,1).set(redlipbegin+10*dt,1.6).set(redlipbegin+15*dt,0.2).set(redlipbegin+19*dt,0.4) );

	//---------fly to the mirror
 	var flybegin = redlipbegin+10*dt;
	this.addTween(new AF.Tween(redlipBox,  "x", redlipBox.x ).set(flybegin, redlipBox.x).set(flybegin + 5*dt,  redlipBox.x + 120) );
  
 	//this.addTween(new AF.Tween(fireworkGrowBox,  "y", fireworkGrowBox.y).set(dt*18, fireworkGrowBox.y - 150)    );
  
	this.setTarget = function(pos) 
 	{
 		var y =  -20 + 34 + Math.round(game.ASSET_MANAGER.getAsset('hm_kiss_lip.png').height/2);	 
	 
		if( pos ==0 ) 	 
    		this.posY = y +140 ;
        else if( pos ==1 )
            this.posY = y; 
		else if( pos ==2 )
			this.posY = y -140 ; 
 		
  		// Memory may become large；
		this.addTween(new AF.Tween(redlipBox,  "y", y ).set(flybegin, y ).set(flybegin + 5*dt, this.posY  ) );	 
	}
 
	this.addAction(function()
	{
  		if(1  /*game.freeGames.m_bInFreeGames  && !isRespin */)
    	{ 
 	 		if(TKS_HL && BKS_HL != "1")
	  		{
				game.playSound('dingaction');
		 		mirrorShow.setPositionFG();
				mirrorShow.turnOnWhiteLights(TKS_HL);
	    		mirrorShow.showNumber(TKS_HL);
	  		}
		}
	}, redlipbegin+19*dt);
	 
	this.addAction(function()
	{
		this.stop(0);
 		this.visible = false;
	}, 31*dt -2); 	
}
GrowKiss.prototype = new AF.Movie();

//---------------------------Free Game Intro Panel and Summary Panel---------------------------------------
AF.Text.addFormat("intro_style1", {color:'#996699', stroke:'#ffffff 5, #ddc2dd 10'});
AF.Text.addFormat("intro_style2", {color:'#ffffcc', stroke:'#333300 5, #d2a4b8 10'});
AF.Text.addFormat("intro_style3", {color:'#ffffff', stroke:'#333300 5, #d2a4b8 10'});
AF.Text.addFormat("intro_style4", {color:'#996699', stroke:'#ffffff 4, #ddc2dd 8'});
AF.Text.addFormat("intro_style5", {color:'gray 0.2, #c09 0.5', stroke:'#7F1337 2, #FBD4E5 10'});
 
AF.Text.addFormat("summary_style1", {color:'#996699', stroke:'#ffffff 5, #ddc2dd 10'});
AF.Text.addFormat("summary_style2", {color:'#ffffcc', stroke:'#333300 5, #d2a4b8 10'});
AF.Text.addFormat("summary_style3", {color:'#ffffff', stroke:'#333300 5, #d2a4b8 10'});
 
function IntroPanel()
{
	AF.Movie.call(this, 5700);
	
	var rect = new AF.DObject();
	rect.performDraw = function()
	{    
	 	ctx.fillStyle =  "rgba(0,0,0,0.4) ";   
		ctx.fillRect(0,0,960,568);
 	};
	this.addChild(rect); 
	
	var frame = new AF.Sprite(game.imageFrame, 1);
	frame.x = 105;
	frame.y = 95;
	this.addChild(frame);
 
	var text1 = new AF.Text();
  	this.addChild(text1);
	
	var text2 = new AF.Text();
 	this.addChild(text2);
	
	var text3 = new AF.Text();
 	this.addChild(text3);
	
	var text4 = new AF.Text();
 	this.addChild(text4);
	
	var text5 = new AF.Text();
 	this.addChild(text5);
	
 	var text6 = new AF.Text();
 	this.addChild(text6);
	
	var btnarea = {nx:0, ny:0, nwidth:960, nheight:568,  dx:0, dy:0, dwidth:960, dheight:568};  
	var screenBtn = new Button(null, btnarea);
	this.canClick  = false;
	
	setTextFormat(text1, TXT_FREE_GAMES_INTRO_TITLE, 100);
	text1.setTextFormat("intro_style1"); 
  
    setTextFormat(text2, TXT_FREE_GAMES_WON_POPUP, 100);
	text2.setTextFormat("intro_style2"); 
  
    setTextFormat(text3, TXT_COLLECT_KISSES_TO, 100);
	text3.setTextFormat("intro_style3"); 
  
    setTextFormat(text4, TXT_TAKE_WITH_YOU_TO_THE, 100);
	text4.setTextFormat("intro_style3"); 
  
  	setTextFormat(text5, TXT_PHOTOSHOOT_BONUS, 100);
  	text5.setTextFormat("intro_style3"); 
	
    setTextFormat(text6, TXT_TOUCH_ANYWHERE_TO_BEGIN, 100);
  	text6.setTextFormat("intro_style4"); 
	this.visible = false;
	
	this.addTween(new AF.Tween(frame, "alpha",0).set(800, 0).set(1300,1).set(4500, 1).set(5000,0));
	this.addTween(new AF.Tween(text1, "alpha",0).set(800, 0).set(1300,1).set(4500, 1).set(5000,0));
	this.addTween(new AF.Tween(text2, "alpha",0).set(800, 0).set(1300,1).set(4500, 1).set(5000,0));
	this.addTween(new AF.Tween(text3, "alpha",0).set(800, 0).set(1300,1).set(4500, 1).set(5000,0));
	this.addTween(new AF.Tween(text4, "alpha",0).set(800, 0).set(1300,1).set(4500, 1).set(5000,0));
	this.addTween(new AF.Tween(text5, "alpha",0).set(800, 0).set(1300,1).set(4500, 1).set(5000,0));	
	this.addTween(new AF.Tween(text6, "alpha",0).set(800, 0).set(1300,1).set(4500, 1).set(5000,0));		
	this.addTween(new AF.Tween(rect, "alpha", 0).set(0, 0).set(800,1).set(4500, 1).set(5600,0));
	
	this.processClickRelease = function(coords)
	{
		if (!this.canClick)
       		return;
  
		if( screenBtn.isOver(coords) )
		{
			//basegame respin
			this.canClick  = false;
			this.play(4500);
			game.startSpin();	
 	 	}
		pickedNum = 0;
  	};//processClickRelease

 	this.addAction(function()
	{
 		if(mirrorShow.time <=0)
			mirrorShow.show();
			
		game.autoPlay = false;
	  	game.requestToStopAutoPlay = false;
	  	game.ui.autoPlayMode = game.ui.AUTO_OFF;
	  	game.autoPlayGames = 0;
 	}, 1);  
	
	this.addAction(function()
	{
		this.stop();
		this.canClick = true;
		game.playSound("meetyouatthephotoshoot"); 
	}, 1300);

	this.addAction(function()
	{
		this.visible = false;
		this.stop(0);	 
	}, 5700-1);
}
IntroPanel.prototype = new AF.Movie();

function SummaryPanel()
{
	AF.Movie.call(this, 6000);
	
	var current = 0;
	var winAmount = 100;
	var increment = 1;
	
	var rect = new AF.DObject();
	rect.performDraw = function()
	{    
	 	ctx.fillStyle =  "rgba(0,0,0,0.4) ";   
		ctx.fillRect(0,0,960,568);
 	};
	this.addChild(rect); 
	
	var frame = new AF.Sprite(game.imageFrame, 1);
	frame.x = 105;
	frame.y = 95;
	this.addChild(frame);
 
	var text1 = new AF.Text();
  	this.addChild(text1);
	
	var text2 = new AF.Text();
 	this.addChild(text2);
	
	var text3 = new AF.Text();
	//setTextFormat(text3, {y:345, size:90}, 920);
	//text3.setTextFormat("summary_style3");
	var TXT_FREE_GAMES_SUMMARY_VAL = {
  	text: "000.00",
 	x: 41,
  	y: 335,
  	size:90,
  	maxWidth: 500,
  	rside: 845,
  	align: "center",
  	color: '#ffffff',
  	stroke: '#333300 5, #d2a4b8 10'
	};
	text3.setMixedFormat(TXT_FREE_GAMES_SUMMARY_VAL);
 	this.addChild(text3);
 
	setTextFormat(text1, TXT_SUMMARY_TITLE, 100);
  	text1.setTextFormat("summary_style1"); 
  
    setTextFormat(text2, TXT_SUMMARY_TOTAL, 100);
  	text2.setTextFormat("summary_style2"); 
  
    //setTextFormat(text3, TXT_SUMMARY_MONEY, 940);
	//setTextFormat(txtWinValue, {y:300, size:90}, 940);
  	
    this.addTween(new AF.Tween(rect, "alpha").set(0, 0).set(500,1).set(5000, 1).set(6000,0));
	this.addTween(new AF.Tween(frame, "alpha").set(0, 0).set(500,1).set(5000, 1).set(5700,0));
	this.addTween(new AF.Tween(text1, "alpha").set(0, 0).set(300,0).set(700,1).set(4500, 1).set(5500,0));
	this.addTween(new AF.Tween(text2, "alpha").set(0, 0).set(300,0).set(700,1).set(4500, 1).set(5500,0));
	this.addTween(new AF.Tween(text3, "alpha").set(0, 0).set(300,0).set(700,1).set(4500, 1).set(5500,0));
	
	this.init = function()
	{
    	//text3.text = game.account.getCurrencyString(winRoll);
		game.ui.showWinMeter(false);
		
		//var mtw = 500;
        //text3.text = game.account.getCurrencyString(winAmount);

        //text3.scaleX = text3.scaleY = 1;
        //text3.y = 345;
        //text3.setTextFormat({rside:930});

       /* var w = text3.getWidth();
        if (w > mtw) {
            text3.scaleX = text3.scaleY = mtw/w;
            text3.y = 280 + 80*(1-mtw/w);
            text3.setTextFormat({rside:641/mtw*w});
        }*/

		current = 0.00;
		winAmount = game.slotResult.winAmount;
		increment =  Math.floor(Math.max(37, winAmount / 100));
		text3.text = game.account.getCurrencyString("00000");//"000.00";
		text3.visible = false;
		
		this.visible = true;
		this.play(0);
		game.stopSound();
		game.stopSound();
		
		game.playSound('win4');
	};  
	
	this.addAction(function()
	{
 		if( winAmount<=0 )
		{
			this.moveTo(3000);
		}
		else
		{
		 	//game.playSound('dingding');
			game.freeGames.m_bInFreeGames = false;
			game.playSound('rolluplong');
		}
	}, 999);
		
	this.addAction(function()
	{
		current = Math.min(winAmount, current + increment);
		if(current > 0)text3.text = game.account.getCurrencyString(current);
		text3.visible = true;
		
		if(current<winAmount)
		{
			this.moveTo(1000);
		}
		else
		{
			this.moveTo(3000);
		}
	}, 1036);
	
	this.addAction(function()
	{
		game.playSound('seeyouatthenextshoot');
	}, 3005);
	
	this.addAction(function()
	{
	  	//fadeout related screens
		fgbg.closebg();
		photoshotBG.endme();
		mirrorShow.hideFGmirror();
		mirrorShow.hidemirror();
		//game.playSound('seeyouatthenextshoot');
	}, 4400);

/*	this.addAction(function()
	{
	  	game.playSound('win2');
	}, 5300);*/
	
	this.addAction(function()
	{
		//ForceReelSwap();
		dressShow.visible = false; 
		dressShow.stop(0);
		dressShow.isFeatureEnd = false;
		inPickFeature = false;	
      	this.visible = false;
		this.stop();
		
		RSid = "0";
		RID = "0";
		NRID = "0";
		game.api_switchReels();
				
		HLalpha = 1;
		autoDelayAfterFeature = false;
		reSetHL();
		game.slotResult.IFG = false;
		//inFeature = false; 
		
		//console.log(">>>>>> numWinLinesTemp in Summary End = "+numWinLinesTemp);
		if(numWinLinesTemp != null){
			game.slotResult.numWinningPaylines = numWinLinesTemp;
			game.slotResult.paylineWins = payWinsTemp;
			game.slotResult.paylineWins2 = payWinsTemp2;
			game.reelMan.animateWins;
		};


	}, 5999);	 
}
SummaryPanel.prototype = new AF.Movie();
 