
function RespinAnim()
{
	var dt = 110;
	AF.Movie.call(this, 40*dt);	
	
	var warnMsg =   new AF.Text();		this.addChild(warnMsg);  	
 	setTextFormat(warnMsg, TXT_RE_SPIN, 100);
 	warnMsg.setTextFormat("respin"); 
 	
	this.addTween(new AF.Tween(warnMsg,  "x", 1500).set(dt*18, 1500).set(dt*21, 340,AF.Tween.POWER, 1.2).set(dt*25, 430 )
	.set(dt*34, 430).set(dt*36, 490, AF.Tween.POWER, 1).set(dt*39, -600, AF.Tween.POWER, 5));

	this.playme = function() 
 	{
      this.visible = true;
	  this.play(0);
	  setTimeout(function()
		{
			game.playSound('respinscratch');
		}, 2300);
	  
 	};
 
 	this.addAction(function()
	{ 
    	HR_HL[0] = 0; 
	  	respinJustBegin = true;
     	game.startSpin();// delay longer....
  	}, 35*dt); 
 
  	this.addAction(function()
	{ 
 	this.endme();
 	}, 39*dt + 10); 
 	
 	this.endme = function() 
 	{
   		this.visible = false;
   		this.stop(0);
 	};	 
};
RespinAnim.prototype = new AF.Movie();

function TouchMeAnim()
{
	var dt = 90;
	AF.Movie.call(this, 61*dt);	
	
	var text = new AF.Text();
	this.addChild(text);  	
  
	setTextFormat(text, TXT_TOUCH_ME, 100);
 	text.setTextFormat("touchme"); 
 
 	var  arror =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/arrow.png'),1); 
    arror.x = 760 + 15;
	arror.y = 130 -48;
	this.addChild(arror); 
 
	var deep = 10;
 
	this.addTween(new AF.Tween(arror,  "alpha",0.5).set(5*dt, 1).set(10*dt, 0.5).set(15*dt, 1).set(20*dt, 0.5).set(23*dt, 0)    );
	this.addTween(new AF.Tween(arror,  "y", arror.y).set(5*dt, arror.y+deep).set(10*dt, arror.y).set(15*dt, arror.y+deep).set(20*dt, arror.y).set(23*dt, arror.y+deep)    );   
	this.addTween(new AF.Tween(text,  "alpha",0.5).set(5*dt, 1).set(10*dt, 0.5).set(15*dt, 1).set(20*dt, 0.5).set(23*dt, 0) );
  
	var sparkleBox = new AF.Movie();
	sparkleBox.x = 900 -Math.round(game.ASSET_MANAGER.getAsset('sparkly_element.png').width/2);
	sparkleBox.y = 400 -Math.round(game.ASSET_MANAGER.getAsset('sparkly_element.png').width/2);
	
	var sparkle = new AF.Sprite(game.ASSET_MANAGER.getAsset('sparkly_element.png'),1);
	sparkle.x = -Math.round(game.ASSET_MANAGER.getAsset('sparkly_element.png').width/2);
	sparkle.y = -Math.round(game.ASSET_MANAGER.getAsset('sparkly_element.png').height/2);
	
	sparkleBox.addChild(sparkle); 	
 	this.addChild(sparkleBox);  
  
	var clickDL = 21*dt +100;  
	var inview = 5*dt;
	this.addTween(new AF.Tween(sparkleBox,  "scaleX", 1).set(clickDL+2, 1).set(clickDL+inview, 1.6) );
	this.addTween(new AF.Tween(sparkleBox,  "scaleY", 1).set(clickDL+2, 1).set(clickDL+inview, 1.6 ) );
	this.addTween(new AF.Tween(sparkleBox,  "alpha", 0).set(clickDL+2, 0 ).set(clickDL+ 3*dt, 1 ).set(clickDL+inview-2*dt, 1 ).set(clickDL+inview , 0 ) );
	this.addTween(new AF.Tween(sparkleBox,  "rotate", 0).set(clickDL+2, 0 ).set(clickDL+inview, 45 ));  

	this.addAction(function()
	{ 
    	this.stop(0);
		this.visible = false;
    }, 33*dt);  
 
 	this.addAction(function()
	{ 
    	this.moveTo(0);
 	}, 20*dt);  
   
	this.afterTouch = function()
 	{
   		this.moveTo(21*dt+1);
  	};

	this.visible = 0;

	this.playme = function() 
	{
    	this.visible = true;
		this.play(0);
	};	 
};
TouchMeAnim.prototype = new AF.Movie();

function HoldReels() 
{ 	
	var dt = 100;
	AF.Movie.call(this, 40*dt);	
   
	var mask1 = new reelMaskA();  
	var mask2 = new reelMaskB();
	this.addChild(mask1);
	this.addChild(mask2);
	this.held = false;

	this.visible = false;

    var matrix = [];	
	for ( var c = 0; c < 5; c ++) 
	{    
		matrix[c] = [];
 		var sym ;
  		for (var r = 0; r < 3; r ++)  
		{
			matrix[c][r] = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'),15);
	  		matrix[c][r].x = game.layout.REELS.x + c * (game.layout.symbolWidth + game.layout.reelGap);
	  		matrix[c][r].y = game.layout.REELS.y +  r * game.layout.symbolHeight;
	  		matrix[c][r].visible = false;
	  		this.addChild(matrix[c][r]);
		}
	}
	
	this.drawSymbols = function(R1, R2)
	{
		mask1.drawMask(R1)
		mask2.drawMask(R2)
		   
		for ( var c = 0; c < 5; c ++ )
		{
			for ( var r = 0; r < 3; r ++ )  
			{ 
				if(game.reelMan.reels[c].slots[r+1].currentSymbol >= 13 && game.reelMan.reels[c].slots[r+1].currentSymbol <= 15)matrix[c][r].frame = 13;
				else matrix[c][r].frame = game.reelMan.reels[c].slots[r+1].currentSymbol;
				matrix[c][r].visible = false;
				
				if( c == R1 || c == R2  )
					matrix[c][r].visible = true;
			}
		}
	};	 
	
	this.init = function()
	{
  		if( HR_HL[0] )
		{ 
			this.held = true;
	 		isRespin = true;
			game.setState(SS_STOPPED);	
 			//game.ui.showWinMeter(false);	
 	 		//this.visible = true;
 	 		this.drawSymbols(HR_HL[1],HR_HL[2] );
 
	 		respinAnim.playme();
			
	 		if(	HR_HL[2] =="4"  && mirrorShow.time >20 && mirrorShow.visible==true )
	 		{
				var thismoment = lastReelAnim.time;
				lastReelAnimRespin.visible =1;
				lastReelAnimRespin.play(thismoment);
 			}
	  	}
		else
		{
			this.endme();
			lastReelAnimRespin.visible =0;
			lastReelAnimRespin.stop(0);
	  		isRespin = false;
			this.held = false;
			
			if(FID != null && FID[0] == 0){
				//console.log(">>>>>>>>>  disabled free game state");
				game.freeGames.m_bInFreeGames = false;
			}
		}
	};	
 
	this.endme = function()  
	{
		this.visible = false; 
	};	  
};
HoldReels.prototype = new AF.Movie();

function reelMaskA() 
{ 
	var bg =  new AF.Sprite(game.ASSET_MANAGER.getAsset('reelbgfree.jpg'), 1);
	this.addChild(bg); 
	
	this.drawMask = function(M) 
	{
		var mymask = game.layout.REELS.x + M * (game.layout.symbolWidth + game.layout.reelGap)
		this.setMask(mymask, game.layout.REELS.y,150, 430);
  	}
}; 
reelMaskA.prototype = new AF.Movie();

function reelMaskB() 
{
	var bg =  new AF.Sprite(game.ASSET_MANAGER.getAsset('reelbgfree.jpg'), 1);
	this.addChild(bg);
	
	this.drawMask = function(M)
	{
		var mymask = game.layout.REELS.x + M * (game.layout.symbolWidth + game.layout.reelGap)
		this.setMask(mymask, game.layout.REELS.y,150, 430);
	}
}; 
reelMaskB.prototype = new AF.Movie();

//------end respin-------------------

function HulaWild() //Expanding wild
{ 
	// 呼拉圈 //Hula hoop
	var dt = 100;            // flower_dt = 100;
	var mydelay = flower_timer ;   // flower_timer = 16x60;
	var mytime = 27*dt;           // Holly anima time
	var total = 27*dt;
	AF.Movie.call(this, total+1000 );  
   
	//alert (mydelay)
   	var hulagirl =  new AF.Sprite(game.ASSET_MANAGER.getAsset("expwild_middle.jpg"), 12);
	var left =  new AF.Sprite(game.ASSET_MANAGER.getAsset("expwild_left.png"), 12);
	var right =  new AF.Sprite(game.ASSET_MANAGER.getAsset("expwild_right.png"), 12);
   
	hulagirl.x = game.layout.REELS.x ;
	left.y = right.y = hulagirl.y = game.layout.REELS.y;
  
	left.x = game.layout.REELS.x - 36;
 	right.x = game.layout.REELS.x +  140; 
 
    this.addChild(hulagirl);     this.addChild(left);   this.addChild(right);  
  	this.visible = false;
 
 	//var str = "0,1,2,3,4,5,6,6,7,7,8,8,9,9,10,10,11,11";
	var str = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11";
	var myfadin = 700;
 
	this.addTween(new AF.SpriteTween(hulagirl, 0).set(0, str, 27*dt));  
	this.addTween(new AF.SpriteTween(left, 0).set(0,  str, 27*dt )); 
	this.addTween(new AF.SpriteTween(right, 0).set(0,  str, 27*dt));  //mydelay //total-1
	
	this.addTween(new AF.Tween(hulagirl, "alpha", 0).set(mydelay-myfadin, 0).set(mydelay-200, 1).set(total-1, 1).set(total, 1).set(total+1, 1).set(total+2, 1).set(total+300, 0)  ); 
	this.addTween(new AF.Tween(left, "alpha", 0).set(mydelay-myfadin, 0).set(mydelay-200, 1).set(total-1, 1).set(total, 1).set(total+1, 1).set(total+2, 1).set(total+300, 0)  ); 
	this.addTween(new AF.Tween(right, "alpha", 0).set(mydelay-myfadin, 0).set(mydelay-200, 1).set(total-1, 1).set(total, 1).set(total+1, 1).set(total+2, 1).set(total+300, 0)  ); 

    this.addAction(function()
	{ 
		this.moveTo(mydelay);
	}, mytime ); 
	
	this.addAction(function()
	{ 
		//this.stop();
		if(this != girl[0])hulaWildMovie.syncWilds()
				
	}, mydelay-1 ); 
	
	this.playme = function(frame) 
	{
		this.play(frame);
		this.visible = true;
		game.playSound('expwild');
		//this.hideholly2();
	};
  
  	this.stopme = function() 
	{   
		if( this.time >0 || this.visible )
	 	{
			this.stop();
			this.play(total+2);
       		//this.hideholly2();
	 	}
 	}; 
 
	this.afterSettingPage = function() 
	{   
		if(this.time >0 )
		this.stop(15*dt);
	};

   this.addAction(function()
   { 
   		this.stop(0);
		this.visible = false;
 	}, total+301 ); 
};
HulaWild.prototype = new AF.Movie();
 

var girl = [];
// to control hula girls
function HulaWildMovie() //Expanding wild manager
{
	girl = [];
	this.wildReels = [];
	var hasLeft = false;
	
	for(var i = 0; i < 3; i++)
	{
    	girl[i] = new HulaWild();
		girl[i].x = (i+1)* (game.layout.symbolWidth  +  game.layout.reelGap);
 		this.addChild(girl[i]); 
	};
 
	this.init = function(holly) 
	{   
	   this.wildReels.push(holly);
	   
	   //if(i == 0){
		   girl[holly].playme(0);
	   //if(girl[i].time <=0)
	   //girl[i].playme(flower_timer);
	};
  
	this.afterSetting = function()
	{
		for(var i = 0; i < 3; i++) 
		{  
			girl[i].afterSettingPage();
 	  	}
	};
	
	this.syncWilds = function()
	{
		/*for(var i = 0; i < 3; i++)
		{
			if(girl[i].visible){
				girl[i].play();
				girl[i].play(2000);
			}
		};*/
		
		if(girl[0].playing && girl[2].visible)girl[2].play(girl[0].time);
		if(girl[0].playing && girl[1].visible)girl[1].play(girl[0].time);
		if(girl[1].playing && girl[2].visible)girl[2].play(girl[1].time);
	};
  
	this.endme = function() 
	{
		for(var w = 0; w < this.wildReels.length ; w ++ )
		{
			hulaWildMovie.setALLWilds(this.wildReels[w]+1); 
		}
 	
		// all the hula girl will stop at the same moment.	  
	  	for(var i = 0; i < 3; i++) 
	  	{ 
			if(girl[i].time >0)
		 	girl[i].stopme();
 	  	}
	  	hasLeft = false;
	    this.wildReels = [];   
	};
 
	this.setALLWilds = function(r)
	{
 		// 因为 reel 还没停下 的时候 holly已经出现， 无法判断 哪里是 wild
		// Because reel stop when holly has not yet appeared unable to determine where is the wild
    	fadeinout = 0 
 		// 替换symbols
		// Replace symbols
		for(var a = 0 ; a < 3; a++)
	  	{
      		for(var j = 1; j < 4; j++){
          		var thesym = game.reelMan.reels[r].slots[j];
 					if(a==0)
			  			thesym.setSymbol(0);
			  				else if(a==1)
			     				thesym.setSymbol(1);
			     					else if(a==2)
			        					thesym.setSymbol(2);
			}
		}  	
	};
};
HulaWildMovie.prototype = new AF.Movie();

// the basic flower animation
var flower_dt = 90;
var flower_timer = 16 * flower_dt;
 
function flowerGlow() //sparkle transition
{
	AF.Movie.call(this, flower_timer); 
    var pinkflower = [];
	this.played = false;
	var flower = ["transition_half_top.png","transition_half.png","transition_half_top.png"]
	
	for(var i =0; i<3; i++ )
	{
   		// 0 top,  1 middle, 2 button 
		pinkflower[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset(flower[i]), 5);
		pinkflower[i].x = game.layout.REELS.x  ;
 		pinkflower[i].visible = false;
 
		if(i<2) 
		{ 
			pinkflower[i].scaleX=2;
			pinkflower[i].scaleY=2;
			pinkflower[i].y = game.layout.REELS.y -25 ;
			pinkflower[i].x = game.layout.REELS.y -5 ;
		} 
		else
		{
			// grow from bottom		 
  			// pinkflower[i].scaleX= 2;
		   pinkflower[i].scaleY= -2;
		   pinkflower[i].scaleX= -2;
		   pinkflower[i].x = 30+  game.layout.REELS.x + game.layout.symbolWidth  ;  
		   pinkflower[i].y = 25+ game.layout.REELS.y + 3*game.layout.symbolWidth ; 
		}
 
		this.addChild(pinkflower[i]); 
 		this.addTween(new AF.SpriteTween(pinkflower[i], 0).set(0, "0,1,2,3,4",flower_timer -700  ));     
	};
 
 	this.addAction(function()
	{ 
 		this.stopme();
	}, flower_timer -45 );  
 
    this.stopme = function()
	{
		for(var i =0; i<3; i++ )
		{
		pinkflower[i].visible = false;
		this.stop(0);
		} 
	};

	this.init = function(pos)
	{
		//
		if(this.played)return;
		//this.stopme();
		
  		var tmp = null;
		tmp = SSS_HL;
	
		for( var i =0; i < tmp.length-1 ; i++ )
   		{  
    		var member = Number(tmp[i].split(";")[0] -1);
   		}
		
		if(pos >= 0)
        {
	    	pinkflower[pos].visible = true;  
		}
		
 		this.play(0);
		this.played = true;
		//console.log(">>>>>> Broken sym anim playing");   
	};
};
flowerGlow.prototype = new AF.Movie();

// to control  flower glow and other animations.
function WildsMovie()
{
	var dt = 100;
	AF.Movie.call(this,5*dt);  
  
    for(var i =0; i <3; i++)
	{ 
		//mywild[0]  1st reel   mywild[1]  2nd reel
 	    mywild[i] = new flowerGlow();
	    mywild[i].x = (i+1)*game.layout.symbolWidth;
        this.addChild(mywild[i]); 
	}  

	this.addAction(function()
	{ 
 		this.stop(0);
 	}, 2*dt );
 
	this.stopwilds = function()
 	{
     	for(var i =0; i <3; i++)
	 	{ 
 	    	mywild[i].stopme();
 	 	}
	};
};
WildsMovie.prototype = new AF.Movie();

function whichWild(SSSmsg)
{
	var tmp = null;
	tmp = SSSmsg; 
	//console.log("lenght--" + Number(str.length -1)  );

	/*for( var i =0; i < tmp.length-1 ; i++ )
	{  
		console.warn( "x--" +  Number(SSSmsg[i].split(";")[0]));
		console.warn( "y--" +  Number(SSSmsg[i].split(";")[1]));
	}*/
};

function ISleftRight() 
{
	var tmpp = "";
    tmpp = SSS_HL;
	//console.log(">>>> ISleftRight - SSS_HL = "+SSS_HL);
	//console.log(">>>>>> tmpp.length = "+tmpp.length);
	var LR = null;
	var LRcompare = null;
	
	for( var i =0; i < tmpp.length-1 ; i++ )  //2;0;1;,3;2;2
	{  
    	LR = Number(tmpp[i].split(";")[0] );
		if(tmpp.length-1 == 2)LRcompare = Number(tmpp[1].split(";")[0] );
		
		//console.log(">>>>>> LR = "+LR);
		//console.log(">>>>>> LRcompare = "+LRcompare);
	
		if(LR == "1" || LR == "3")
	 		return LR; 
		else if (LR == 2 && LRcompare != null){
			if(LR == 2 && LRcompare == 3);
			return LRcompare;
		}
		break;
	 
   	}
};

function HipLR() //BumBump Add Wild
{
	var dt = 60; 
	var str = "0,0,0,0,0,0,0,0, 1,1,1,1,1,  2,2,2,2,2,   1,1,1,1,1,1";
 	var flowertime = 12 * dt;
  	var delay2 = 20 * dt;
	var mainMovie = 30*dt;   //  begin from fadin   
	var endfade = 8*dt;
 	var total =   delay2 + mainMovie + endfade;
 	AF.Movie.call(this, total);  
	this.visible = false;

	//  left
	var Lholly1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("hipbump.png"), 3);
	Lholly1.x = game.layout.REELS.x  + 300 + 140;
	Lholly1.y = game.layout.REELS.y -57 ;
	this.addChild(Lholly1); 
	  
	this.addTween(new AF.SpriteTween(Lholly1, 0).set(delay2, str, mainMovie ));  
	this.addTween(new AF.Tween(Lholly1, "alpha", 0).set(delay2-8*dt, 0).set(delay2, 1).set(total-endfade, 1).set(total-2,0)  ); 
	this.addTween(new AF.Tween(Lholly1, "scaleX", -1).set(total-2, -1)  ); 

	//  right
	var Rholly1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("hipbump.png"), 3);
	Rholly1.x = game.layout.REELS.x  + 300;
	Rholly1.y = game.layout.REELS.y -57 ;
	this.addChild(Rholly1); 
  
	this.addTween(new AF.SpriteTween(Rholly1, 0).set(delay2, str, mainMovie ));  
	this.addTween(new AF.Tween(Rholly1, "alpha", 0).set(delay2-8*dt, 0).set(delay2, 1).set(total-endfade, 1).set(total-2,0)  ); 

	// flowers
	var pinkflower = [];
 
	for(i =1; i < 3; i++) 
	{
		pinkflower[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("transition_half.png"), 5);
		pinkflower[i].x = game.layout.REELS.x  ;
		//pinkflower[i].visible = false;

 		var flowstr = "0,1,2,3,4";  //"0,1,1,2,2,3,3,4,4";
		pinkflower[i].scaleX=2;
		pinkflower[i].scaleY=2;
		pinkflower[i].y = game.layout.REELS.y - 27  ;
		pinkflower[i].x = game.layout.REELS.y -130 + 270 + (i-1)*295 ;
 
 		this.addChild(pinkflower[i]); 
  	}
 
	var flowerDT = 13*dt;  //13
 
	this.addTween(new AF.SpriteTween(pinkflower[1], 0).set(delay2+ flowerDT, flowstr, flowertime ));    
 	this.addTween(new AF.Tween(pinkflower[1], "alpha", 0).set(delay2+ flowerDT-1, 0).set(delay2+ flowerDT, 1).set(delay2+flowerDT + flowertime -1, 1).set(delay2+flowerDT+ flowertime, 0));
 	this.addTween(new AF.SpriteTween(pinkflower[2], 0).set(delay2+flowerDT, flowstr, flowertime  ));     
	this.addTween(new AF.Tween(pinkflower[2], "alpha", 0).set(delay2+ flowerDT-1, 0).set(delay2+flowerDT, 1).set(delay2+flowerDT + flowertime -1, 1).set(delay2+flowerDT+ flowertime, 0));
 
	//////end flower ////////////////////////////////////////
	/*this.leftRight = function() {
	 
	   var tmp = null;
		tmp = SSS_HL;
		
	  for(var i =0; i < tmp.length-1 ; i++  )
	   {  
		var LR = Number(tmp[i].split(";")[0] );
	   }
	 
	 return LR;  
	}
	*/

	this.playme = function()
	{
		var LR = ISleftRight();
		
 	 	if( LR ==3 )
       	{ 
			Rholly1.visible = true;
         	pinkflower[2].visible = true; 
	   		Lholly1.visible = false;
		  	pinkflower[1].visible = false; 
		}
	   	else if( LR ==1 )
 	    {	 
			Lholly1.visible = true;
		  	pinkflower[1].visible = true;
		  	Rholly1.visible = false;
         	pinkflower[2].visible = false; 
		}
	
  		this.visible = true;
  		this.play(0); 
	 	//console.log("HOLLY HIP BUMP") 
		setTimeout(function(){game.playSound('dingaction');}, 1700); 
	};

	this.addAction(function()
	{ 
		var tmp =  ISleftRight();
		//console.log(">>>>> HIPBUMP ISleftRight "+tmp);
		hulaWildMovie.init(tmp-1); 
		alphaUP = true;
  		//console.log(">>>>>> play a wild movie");
	}, delay2 + flowertime);
   // }, delay2+4*dt + flowertime);   // holly chuxian 
	 
	this.clearall = function() 
	{
		Rholly1.visible = false;
		Lholly1.visible = false;
		pinkflower[1].visible = false;
		pinkflower[2].visible = false; 
	}; 
   
	this.addAction(function()
	{ 
		this.clearall();
	 	this.stop(0);
	 	this.visible = false;
 	}, total -1); 

};
HipLR.prototype = new AF.Movie();

function FingerLR()
{ 
	var dt = 60; 
	var strL = "0,0,0,0,0,0,0,0, 1,1,1,1,1,  2,2,2,2,2,   1,1,1,1,1,1";
	var strR = "0,0,0,0,0,0,0,0, 3,3,3,3,3,  4,4,4,4,4,   3,3,3,3,3,3";
 	var flowertime = 12 * dt;
  	var delay2 = 15 * dt;
	var mainMovie = 30*dt;   //  begin from fadin   
	var endfade = 8 *dt;
 	var total =   delay2 + mainMovie + endfade;
 
	AF.Movie.call(this, total);  
 	this.visible = false;

	//  left
	var Lholly1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("doubleclick.png"), 5);
	Lholly1.x = game.layout.REELS.x  + 300 -84;
	Lholly1.y = game.layout.REELS.y -3 ;
	this.addChild(Lholly1); 
  
	this.addTween(new AF.SpriteTween(Lholly1, 0).set(delay2, strL, mainMovie ));  
	this.addTween(new AF.Tween(Lholly1, "alpha", 0).set(delay2-8*dt, 0).set(delay2, 1).set(total-endfade, 1).set(total-2,0)  ); 
 
	//  right
	var Rholly1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("doubleclick.png"), 5);
	Rholly1.x = game.layout.REELS.x  + 300 -84;
	Rholly1.y = game.layout.REELS.y -3 ;
	this.addChild(Rholly1); 
  
	this.addTween(new AF.SpriteTween(Rholly1, 0).set(delay2, strR, mainMovie ));  
	this.addTween(new AF.Tween(Rholly1, "alpha", 0).set(delay2-8*dt, 0).set(delay2, 1).set(total-endfade, 1).set(total-2,0)  ); 

	// flowers
  	var pinkflower = [];
	var flowstr = "0,1,2,3,4"; //"0,1,1,2,2,3,3,4,4";
	for( i =1; i < 3; i++ ) 
	{
		pinkflower[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("transition_half_top.png"), 5);
		pinkflower[i].x = game.layout.REELS.x ;
 		//pinkflower[i].visible = false;
		pinkflower[i].scaleX=2;
		pinkflower[i].scaleY=2;
		pinkflower[i].y = game.layout.REELS.y - 27  ;
		pinkflower[i].x = game.layout.REELS.y -130 + 270 + (i-1)*295 ;
 
		this.addChild(pinkflower[i]); 
	}
 
	var flowerDT = 13*dt; 
	this.addTween(new AF.SpriteTween(pinkflower[1], 0).set(delay2+ flowerDT, flowstr, flowertime  ));    
	this.addTween(new AF.Tween(pinkflower[1], "alpha", 0).set(delay2+ flowerDT-1, 0).set(delay2+ flowerDT, 1).set(delay2+flowerDT + flowertime -1, 1).set(delay2+flowerDT+ flowertime, 0));
	this.addTween(new AF.SpriteTween(pinkflower[2], 0).set(delay2+flowerDT, flowstr, flowertime  ));     
	this.addTween(new AF.Tween(pinkflower[2], "alpha", 0).set(delay2+ flowerDT-1, 0).set(delay2+flowerDT, 1).set(delay2+flowerDT + flowertime -1, 1).set(delay2+flowerDT+ flowertime, 0));
 
	//////end flower ////////////////////////////////////////
	/*this.leftRight = function() {
	   var tmp = null;
		tmp = SSS_HL;
		
	  for(var i =0; i < tmp.length-1 ; i++  )
	   {  
		var LR = Number(tmp[i].split(";")[0] );
		
		if(LR =="1" || LR =="3")
		 return LR;  
	   }
	}*/  

	this.playme = function()
	{
		var LR =  ISleftRight();
		
		if( LR ==3 )
		{ 
			Rholly1.visible = true;
			pinkflower[2].visible = true; 
			 
			Lholly1.visible = false;
			pinkflower[1].visible = false;
		}
		else if( LR ==1 )
		{	 
			Lholly1.visible = true;
			pinkflower[1].visible = true;
			  
			Rholly1.visible = false;
			pinkflower[2].visible = false; 
		}
		
		this.visible = true;
		this.play(0); 
		//console.log("HOLLY FingerLR POINT");
		setTimeout(function(){ game.playSound('dingaction'); }, 1800); 
 	};

	this.addAction(function()
	{ 
		var tmp = ISleftRight();
		//console.log(">>>>> FINGER ISleftRight "+tmp);
    	hulaWildMovie.init(tmp-1); 
		alphaUP = true;
		//console.log(">>>>>> play a wild movie");  //30;12;7;1;15
  	}, delay2-400 + flowertime);   // holly chuxian 
	 
	this.clearall = function() 
	{
    	Rholly1.visible = false;
		Lholly1.visible = false;
		pinkflower[1].visible = false;
		pinkflower[2].visible = false; 
	};  
   
	this.addAction(function()
	{ 
		this.clearall();
		this.stop(0);
		this.visible = false;
	}, total -1);  
};
FingerLR.prototype = new AF.Movie();

function FingerComb()
{
	var dt = 60; 
	var str = "0,0,0,0,0,0,   1,1,1,  2,2,2,2,2,2,2,2,2,   0,0,0,0,0,0,0,0,0,0,    3,3,3,3,3,    4,4,4,4,4,4,4,    0,0,0,0,0,0,0,0,0";
 	var flowertime = 12 * dt;
  	var delay2 = 12 * dt;
	var mainMovie = 49*dt;   //  begin from fadin 
	var endfade = 8 *dt;
 	var total =   delay2 + mainMovie + endfade;
	
 	AF.Movie.call(this, total);  
	this.visible = false;
  
 	// hip left right
	var holly4 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("doubleclick.png"), 5);
	holly4.x = game.layout.REELS.x  + 300 -84;
	holly4.y = game.layout.REELS.y -3 ;
	this.addChild(holly4); 
	  
	this.addTween(new AF.SpriteTween(holly4, 0).set(delay2, str, mainMovie ));  
	this.addTween(new AF.Tween(holly4, "alpha", 0).set(delay2, 1).set(total-endfade, 1).set(total-2,0)  ); 

	// flowers
	var pinkflower = [];
 
	for(i =1; i < 3; i++) 
	{
		pinkflower[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("transition_half_top.png"), 5);
		pinkflower[i].x = game.layout.REELS.x ;
		//pinkflower[i].visible = false;
		var flowstr = "0,1,2,3,4"; //"0,1,1,2,2,3,3,4,4";
 
		pinkflower[i].scaleX=2;
		pinkflower[i].scaleY=2;
		pinkflower[i].y = game.layout.REELS.y    ;
		pinkflower[i].x = game.layout.REELS.y -130 + 270 + (i-1)*295 ;
 
		this.addChild(pinkflower[i]); 
	};
 
	this.addTween(new AF.SpriteTween(pinkflower[1], 0).set(delay2+ 9*dt, flowstr, flowertime  ));     
	this.addTween(new AF.Tween(pinkflower[1], "alpha", 0).set(delay2+ 9*dt-1, 0).set(delay2+ 9*dt, 1).set(delay2+ 9*dt + flowertime -1, 1).set(delay2+ 9*dt + flowertime, 0));
	
	var flowerRdelay = delay2+mainMovie- 16*dt;
	
	this.addTween(new AF.SpriteTween(pinkflower[2], 0).set(flowerRdelay, flowstr, flowertime +3*dt  ));     
	this.addTween(new AF.Tween(pinkflower[2], "alpha", 0).set(flowerRdelay-1, 0).set(flowerRdelay+ 9*dt, 1).set(flowerRdelay+ 2*dt + flowertime-1, 1).set(flowerRdelay+ 3*dt + flowertime, 0));  
	//////end flower ////////////////////////////////////////

	this.playme = function()
	{
		this.visible = true;
		this.play(0);
 		//console.log(" ^^^ FINGER  COMBE");
		setTimeout(function(){game.playSound('dingaction');}, 1200); 
	}
 
	this.addAction(function()
	{ 
		hulaWildMovie.init(0);
		setTimeout(function(){game.playSound('dingaction');}, 1550); 
   	}, delay2 -6*dt+ flowertime);  
 
 	this.addAction(function()
	{ 
 		hulaWildMovie.init(2); 
		alphaUP = true;
	}, delay2+ 19*dt + flowertime);   // holly chuxian 
	 
 	this.addAction(function()
	{ 
		this.stop(0);
		this.visible = false;
	}, total -1); 
}
FingerComb.prototype = new AF.Movie();

// middle HOLLY FADE IN FADE OUT
function GirlWildShow() //Seems to manage whole add wild animation
{
	// RIA	 = 4 ,  play for 4 seconds
	var dt = 60;
	AF.Movie.call(this,45*dt);  
 	/* 		 
	  GSD=RIA~1   Animated hip shake or shake left and right  for reel4 or for reel2
	  GSD=RIA~2   Point left or right with the value of the point RIA front animation beauty  for reel2 
	  RIA~4   （2-4reels  Beauty play left and right double play animation）
	*/
	var hollyhip = new HipLR();
 	var hollyfinger = new FingerLR();
	var hollycomb = new FingerComb();
	var lastkiss =  new LastHollyKiss();
  
  	this.addChild(hollyhip); 
 	this.addChild(hollyfinger); 
  	this.addChild(hollycomb); 
    this.addChild(lastkiss);   
	
	this.BGfadeout = function() 
	{  
		if(HLalpha <= 0.99  &&  HLalpha >= 0.4 && !alphaUP)
	 	{ 
	  		if ( HLalpha >= 0.75 && HLalpha <= 0.85 )
	   		{ 
	      		girlWildShow.init();  	
	   		}
	   		HLalpha -=0.01;	 
     		lastReelAnim.hide();  
	 	}
	 	else if(HLalpha < 1  && alphaUP)
		{ 
			HLalpha +=0.01;
		 	if(HLalpha > 0.8)
		    {  
				if(mirrorShow.visible ==true && mirrorShow.time >10 )
				lastReelAnim.init(); 
			} 
		 
			if(HLalpha >=1)
		    {  
				HLalpha =1;
			}
		}
 
		for(var i = 0; i < 5; i++)
		{
        	for(var j = 0; j < 5; j++)
			{
				for(var s = 0; s < 15; s++)
				{    
					var sym = game.reelMan.reels[i].slots[j].symbols[s];
 					sym.alpha = [HLalpha];  
			   	}
            }
        }
	};//BGfadeout
 
	this.kiss = function()
	{
		if(BKS_HL == "1")
		{
			lastkiss.kissme();  
		}
	};
    
	this.init = function()
 	{	
 		if(RIA_HL == 0)
		{ 
			HLalpha = 1;
	   		return;
		}
 
		if(RIA_HL == 1)
		{
	   		if(hollyhip.time <=0)
 	    		hollyhip.playme();   
 	   	}
		else if(RIA_HL == 2)
		{
	    	if(hollyfinger.time <=0)
          		hollyfinger.playme(); 
		}
		else if(RIA_HL ==4)
		{ 
			if(hollycomb.time <=0)  
       			hollycomb.playme();
	
			//if(hollyfinger.time <=0)
   			//hollyfinger.playme(); 
  	 	}
	};//init 
 
	this.stopgirl = function()
	{

	};
 
	this.addAction(function()
	{ 
		//symbols appearing to solid
		alphaUP = true;
		HLalpha = 0.0401;  
	}, dt*35 );  
	
    this.addAction(function()
	{ 
  		this.stop(0);
	}, dt*40 -2 ); 
}
GirlWildShow.prototype = new AF.Movie();

function FGBG()
{
	var dt = 75;
	AF.Movie.call(this,20*dt);  
 
    var FGbg =  new AF.Sprite(game.ASSET_MANAGER.getAsset('reelbgfree.jpg'), 1);
	this.visible = false; 
	this.addChild(FGbg);  
	this.addTween(new AF.Tween(FGbg,  "alpha", 0).set(4*dt, 1).set(6*dt, 1).set(11*dt, 0) );
 
	this.addAction(function()
	{
		this.stop(5*dt);
	}, 5*dt +10);  
 
	this.addAction(function()
	{ 
  		this.stop(0);
	  	this.visible = false; 
	},	11*dt); 
 
	this.showbg = function(show) 
	{
		if(show)
		{   
	   		if(this.time <=0)
	   		{
				this.visible = true; 
	    		this.play(0);
				$("body").css("background-image", "url('BG_Pattern_free.jpg')");
 	   		}
 		}
  	};
  
	this.setbg = function() 
	{   
		this.visible = true; 
		this.play(5*dt+10);
	};
   	
	this.closebg = function() 
	{
   		this.play(6*dt);
		$("body").css("background-image", "url('BG_Pattern.jpg')");
		//console.log(">>>>>> CLOSE BG >>>>>");
 	};  
};
FGBG.prototype = new AF.Movie();

function TitleMovie()
{
	var dt = 100;
	AF.Movie.call(this,20*dt+1);  
  
	var title =  new AF.Sprite(game.ASSET_MANAGER.getAsset('titleanimation.png'), 2);
	title.frame = 0;
	title.x = 222+33;
  
	this.addChild(title);  

	var str = "0,1,1,0";
	this.addTween(new AF.SpriteTween(title, 0).set(0, str, 20*dt  ));    
	this.addTween(new AF.Tween(title,  "alpha", 1).set(5*dt, 0.5).set(10*dt, 1).set(15*dt, 0.5).set(20*dt, 1)        );
  
	this.init = function() 
 	{
	 	this.play(0);
	}
	
	this.addAction(function()
	{ 
 		this.stop(0);
	}, dt*20 );  
};
TitleMovie.prototype = new AF.Movie();

//------------------------------------RandomSprayAnim------------------------------ 
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
			var yy = 0;
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
		
		this.sprayCoinArray = new Array(15);
		for (var i = 0; i<this.sprayCoinArray.length; i++) {
			this.sprayCoinArray[i] = new ngImage2(game.imageSprayAnim);
		}
	}
					   
	this.init = function()
	{
		//this.sprayCoinArray = new Array(15);
		var reelWidth = game.layout.symbolWidth*5 + game.layout.reelGap*4;
		var posArray = [0,120];
		
		for (var i = 0; i<this.sprayCoinArray.length; i++) {
			//this.sprayCoinArray[i] = new ngImage2(game.imageSprayAnim);
			var ran = Math.floor(Math.random()*2);
			this.sprayCoinArray[i].setAnimConfig([{x:posArray[ran],y:0,w:120,h:120}], this.animconfig[Math.floor(Math.random()*this.animconfig.length)]);
			this.sprayCoinArray[i].setPosition(
				game.layout.REELS.x + (reelWidth/this.sprayCoinArray.length)*i + Math.floor(Math.random()*(reelWidth/this.sprayCoinArray.length))-20, 
				game.layout.REELS.y + 300 + Math.floor(Math.random()*30));
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
					this.sprayCoinArray[i].draw(ctx);
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

function CandyScatter()  
{
	var dt = 180;
	AF.Movie.call(this, 9*dt);  
	this.visible = false;
	 
/*  var intro =  new AF.Sprite(game.ASSET_MANAGER.getAsset("scatterPay.png"), 8);
   intro.x =  - 40;
   intro.y = -51;
     this.addChild(intro); 
   
   	this.addTween(new AF.SpriteTween(intro, 0).set(0,"0-2", 3*dt ));  
	this.addTween(new AF.Tween(intro, "alpha", 1).set(3*dt-1, 1).set(3*dt, 0));  
*/	
	var scatter =  new AF.Sprite(game.ASSET_MANAGER.getAsset("scatterPay.png"), 14);
	scatter.x =  -40 +3;
	scatter.y = -51-8;
    this.addChild(scatter);  
 
 	this.addTween(new AF.SpriteTween(scatter, 0).set(2*dt, "0-13,13,13,13,13,13,13,13,13 ", 8*dt ));  
 
  	this.addAction(function()
	{ 
      this.moveTo(2*dt);
	},8*dt); 
	   
};
CandyScatter.prototype = new AF.Movie();

////////////// SYMBOLS MOVIES ///////////////////
function SymbolsMovie()
{
    AF.Movie.call(this);
    var matrix = [];  
	growSymbols = [];
 
    for(var column = 0; column < 5; column++)
    {
        matrix.push([]);
        for(var row = 0; row < 3; row++)
        {
          var slot = {};
 
		  slot["11"] = new CandyScatter();
		  slot["11"].x = column * (game.layout.symbolWidth + game.layout.reelGap) ;
		  slot["11"].y = row * game.layout.symbolHeight;
		  slot["11"].visible = false;
		  this.addChild(slot["11"]);

		  matrix[column].push(slot);
        }
		
		//windup		
		growSymbols[column] = new GrowSymbol();
		growSymbols[column].x =  column * (game.layout.symbolWidth + game.layout.reelGap);
		growSymbols[column].visible = false;
		this.addChild(growSymbols[column]);
    };
	
	this.animasStart = function()
	{
		var bitfield = 0;
        for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
        {
            bitfield |= game.slotResult.paylineWins[payline].second;
        }

        var isWildWin = false;
        for(var row = 0; row < 3; row++)
        {
            for(var column = 0; column < 5; column++)
            {
			var symbol;
			var symbolId = game.reelMan.reels[column].slots[row+1].currentSymbol;

                if(bitfield & 0x00000001)
                {
                     if(symbolId >= 13 && symbolId <= 15){
                        symbol = matrix[column][row]["11"];
                        symbol.visible = true;
                        symbol.play(0);
                    }
                }
              	bitfield = bitfield>>1;
             }
		}  
	};
  
	// symbolsmovie.stopAnims();
  	this.stopAnims = function() {
    for( var row = 0; row < 3; row++ )
        {
            for(var column = 0; column < 5; column++)
            {
                var slot = matrix[column][row];
				slot["11"].stop(0);
				slot["11"].visible = false;
            }
        }  
   } 
};
SymbolsMovie.prototype = new AF.Movie();

//-----------------BigWin Text--------------------//
function BigWinAnim()
{
	var dt = 85; //100
	AF.Movie.root.addChild(this);
	AF.Movie.call(this,50*dt);

	var bWinWrap = new AF.Movie();
	bWinWrap.x = Math.round(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png').width/2);
	bWinWrap.y = Math.round(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png').height/2);

	var bWinGrow =  new AF.Sprite(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png'), 1);
	bWinGrow.x = -Math.round(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png').width/2);
	bWinGrow.y = -Math.round(game.ASSET_MANAGER.getAsset(languagePath + 'BigWin.png').height/2);
	bWinWrap.addChild(bWinGrow);
	
	this.addChild(bWinWrap);
	
	//tweens
	this.addTween(new AF.Tween(bWinWrap,  "alpha", 0)
	.set(dt*5, 1, AF.Tween.LINIAR)
	.set(dt*22, 1,   AF.Tween.JUMP)
	.set(dt*30, 0, AF.Tween.LINIAR));
	
	this.addTween(new AF.Tween(bWinWrap, "y", 0)
	.set(dt*5, -300, AF.Tween.LINIAR)
	.set(dt*22, -300, AF.Tween.JUMP)
	.set(dt*30, 0, AF.Tween.LINIAR));
	
	this.addTween(new AF.Tween(bWinWrap, "scaleX", 0).set(5*dt, 1)
	.set(7*dt, 1.3).set(9*dt, 2).set(11*dt, 1.3).set(13*dt, 2).set(14*dt, 2).set(17*dt, 1.3)
	.set(19*dt, 1.5).set(20*dt, 1.2).set(dt*30, 0));
	this.addTween(new AF.Tween(bWinWrap, "scaleY", 0).set(5*dt, 1)
	.set(7*dt, 1.3).set(9*dt, 2).set(11*dt, 1.3).set(13*dt, 2).set(14*dt, 2).set(17*dt, 1.3)
	.set(19*dt, 1.5).set(20*dt, 1.2).set(dt*30, 0));
	
	this.start = function()
	{
		this.visible=true;
		this.play(0);
	}

	this.addAction(function(){
		this.visible=false;
		this.stop(0);
	}, dt*50-1);
}
BigWinAnim.prototype = new AF.Movie();