 
///////// DRESS SHOW ////////////////////////////////////////////////
//("PEARL", "PURPLE", "BURLESQUE", "LINGERIE", "ORANGE", "COCKTAIL", "FLAMINGO", "RED", "FLAPPER", "PRINCESS");
 
var TXT_Mirror_WIN={
	text: "4",
	x:820,
	y:330,
	size:30,
	bold:false,
	hAlign: "center",
	color:" "
};
AF.Text.addFormat("mirror_win", {color:'#fcfcfc', stroke:'#cecece 2'});
AF.Text.addFormat("mirror_txt", {color:'#640d0d', stroke:'#cecece 3'});
  
function DressShow()
{
	var dt = 75;    var DL = 60*dt;  
	var total = 170*dt;
	var baseX = 744,  baseY = 202;
	AF.Movie.call(this, total);
	var nHollyDress;
  
	for (var i = 0; i < TXT_MIRROR.text.length; i++){
		var winBG = new AF.Text();//TXT_MIRROR
		setTextFormat(winBG, {
            text: TXT_MIRROR.text[i],
            y:baseY+15 + i*35,
            size: TXT_MIRROR.size
     	}, 1600);

        winBG.setTextFormat("mirror_txt");


        this.addChild(winBG); 
		//winBG.x = baseX;
		//winBG.y = baseY+20;
		this.addTween(new AF.Tween(winBG,  "alpha",0)
		.set(0, 0) //start
		.set( dt*40, 0 ).set( dt*43, 1) //Stay invisible till holly intro fades out
		.set( dt*50, 1) //call enable button after init
		.set( dt*52+1, 1 ).set( dt*52+2, 0)//fadeout
		//Next for win
		.set( dt*152, 0 ).set( dt*154, 1 )//fadein, meter needs new win value
		);
	
	}
     
	var speak =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/hollyicon.png'),1);
	this.addChild(speak);  
	speak.x = baseX-9;
	speak.y = baseY-5;  

	var opcty = 0.7;
	
	var winCountTxt = new AF.Text();		
	setTextFormat(winCountTxt, { y:330, size:34}, 20);  //x:790,
	winCountTxt.setTextFormat("mirror_win"); 
	winCountTxt.text = "0000";	
	winCountTxt.alpha = opcty;
	this.addChild(winCountTxt);
	this.visible = false;
	this.isFeatureEnd = false;
	
	var hollySayNo = new HollySayNo();
	this.addChild(hollySayNo);
	hollySayNo.x = 290;
	hollySayNo.y = 70;
	

	this.setWinTxt = function(str)
	{
		winCountTxt.text = game.account.getCurrencyString(str);
	};
	
	this.addTween(new AF.Tween(speak,  "alpha",0)
	//Holly Intro
	.set( 0, 0 ) //start
	.set( dt*5, 1 ) //holy fast fadein
	.set( dt*40,1 ).set( dt*43, 0 ) //hold holly 4sec then fade out
	//Next for win
	.set( dt*112, 0 ).set( dt*116, 1 )//quick fade in holly speek from win
	.set( dt*150, 1 ).set( dt*153, 0 )//hold holly 4sec then fade out
	);
 
 	//----------Meter text
	this.addTween(new AF.Tween(winCountTxt,  "alpha",0)
	.set(0, 0) //start
	.set( dt*40,0 ).set( dt*43, opcty) //Stay invisible till holly intro fades - crossfade in
	.set( dt*50, opcty) //call enable button after init
	.set( dt*52, opcty ).set( dt*52+1, 0)//fadeout
	//Next for win
	.set( dt*152, 0 ).set( dt*154, 1 )//fadein, meter needs new win value
	.set( dt*162, 1 ).set( dt*160, 0 ).set( dt*160, 0 )
	);
	
	this.addTween(new AF.Tween(winCountTxt,  "x", 790)
	.set(0, 790) //start;
	.set( dt*152, 790 ).set( dt*160, 450 )
	);
	
	this.addTween(new AF.Tween(winCountTxt,  "y", 330)
	.set(0, 330) //start;
	.set( dt*152, 330 ).set( dt*160, 450 )
	);
	
	/*this.addTween(new AF.Tween(winCountTxt,  "scaleX", winCountTxt.scaleX)
		.set(0, winCountTxt.scaleX) //start;
		.set( dt*152, winCountTxt.scaleX ).set( dt*160, 2 )
		);
		
	this.addTween(new AF.Tween(winCountTxt,  "scaleY", winCountTxt.scaleY)
		.set(0, winCountTxt.scaleY) //start;
		.set( dt*152, winCountTxt.scaleY ).set( dt*160, 2 )
		);*/
	//----------Meter text
	
	var dressImages = [];
	for( var i =0; i < 10; i++ )
	{
 		var tmp = i.toString();	
		dressImages[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/' + tmp + '.png'),1);
		this.addChild(dressImages[i]);  
		dressImages[i].x =  baseX-50 ;
		dressImages[i].y =  baseY-5 ;
		dressImages[i].visible =0;
		
		this.addTween(new AF.Tween(dressImages[i],  "alpha",0)
		.set(0, 0).set(dt*52+1, 0)//stay invisible
		.set( dt*54, 1 ) //quickly fade in
		.set( dt*110, 1 ).set(dt*113, 0 ));//stay solid for 5sec and fadeout
	};
	
	this.init = function()
	{
		winCountTxt.text = game.account.getCurrencyString(PWIN);// PWIN
		var mtw = 130;
		
		winCountTxt.scaleX = winCountTxt.scaleY = 1;
        winCountTxt.y = 330;
        winCountTxt.setTextFormat({rside:20});

        var w = winCountTxt.getWidth();
		//console.log(">>>>> wintext width "+w);
        if(w > mtw){
			//console.log(">>>>> wintext dynamic scale 1 "+winCountTxt.scaleX);
            winCountTxt.scaleX = winCountTxt.scaleY = mtw/w;
			//console.log(">>>>> wintext dynamic scale 2 "+winCountTxt.scaleX);
            winCountTxt.y = 320 + 50*(1-mtw/w);
           	winCountTxt.setTextFormat({rside:20/mtw*w});
        };
		
		this.visible = true;
		this.play(0);
		setTimeout(function(){
			game.playSound("letswinsomemore");
			//hulaWildMovie.endme();
		}, 700);	
	};	
  	
	this.closeme = function()
	{ 	 
		this.stop(0);
		this.visible = false; 
	};
	
	this.featureSkip = function()
	{ 	
		this.stop();
		if(touchMeAnim.time >0){	
				touchMeAnim.afterTouch();
		}
			setTimeout(function(){
			dressShow.play(dt*50-2);
		}, 1000);
	};
	
	this.showDressAfterPick = function(dress)
	{ 
		nHollyDress = dress;
		for(var i =0; i < 10; i++)
		{
 			dressImages[i].visible = 0;
   		}
   		dressImages[dress].visible = 1;
				
		this.play(dt*52+1);
		//fade out wintext, fade in dress icon
	};
	
	this.addAction(function()
	{ 
  		// after init() stop
   		this.stop();
		
   		if(this.isFeatureEnd)
   		{	
			photoShoot.disableBtn();
			//add moveTo here for interface fades?
			inPickFeature = true;
			
			freeGameWinSummary.summaryPanel.init();
			
			this.stop(0);
			//console.log(">>>>> DressShow() - FeatureEnd ");
	 	}
   		else
   		{
			//console.log(">>>>> DressShow() - photoShoot.enableBtn() ");
    		photoShoot.enableBtn();
			 
    	};
		//waiting for clicks
		//check for feature end start here	
	}, dt*50-1);  

	this.addAction(function()
	{ 	
		//console.log(">>>>> play holly walkin");
		if(isWinPick){
			hollyWalkIn.init(nHollyDress);
			game.playSound('pickwin');
		}
		else {
			hollySayNo.start();	
			arguments.callee.i = arguments.callee.i || 0;
			game.playSound((arguments.callee.i++ % 2)? 'imnotwearingthat' : 'notinthemoodforthatone');
		}
	}, dt*60 ); 
	
	this.addAction(function()
	{ 	
		//console.log(">>>>> play holly photos");
		if(isWinPick){
			takeaPhoto.start(nHollyDress);
			game.playSound('camera');
		}
	}, dt*90 );
	
	//stops at end of dress icon showing.
	this.addAction(function()
	{ 
		this.stop();
		//check for win, if when show holly speek icon with sound and then win meter
		if(isWinPick)
		{	
			//hollyspeek on win
			this.play( dt*110 );
			
			arguments.callee.i = arguments.callee.i || 0;
			game.playSound((arguments.callee.i++ % 2)? 'nicewin' : 'thatwasfun');
			
			//console.log(">>>>>> NUMBER_PICK = "+NUMBER_PICK+" pick = "+pickedNum);
			if(NUMBER_PICK != pickedNum){
				setTimeout(function()
				{
					//console.log(">>>>>> play pick voice after win");
					arguments.callee.i = arguments.callee.i || 0;
					game.playSound((arguments.callee.i++ % 2)? 'pickagain' : 'letstryagain');
				}, 1400);
			}
			
			//console.log(">>>> DressShow() addAction dt*120-1 - IS WIN PICK");
		}
		else
		{
			// skip win go back to enable button
			 this.play( dt*50-2 );
			 
			arguments.callee.i = arguments.callee.i || 0;
			game.playSound((arguments.callee.i++ % 2)? 'pickagain' : 'letstryagain');
			 
			 //console.log(">>>> DressShow() addAction dt*120-1 - IS NOT WIN PICK");
		}
		//else skip to winmeter.
		///fadeout dress icon 
	}, dt*110-1 );
	
	this.addAction(function()
	{ 
		//catch end of win cycle and start back again
		//this.stop();
		//var targetAmount =  Number(game.slotResult.currentWinAmount)+ Number(PICK_WIN_HL) ;
		game.startWinMeter( Number(TW-PICK_WIN_HL), TW ); 
		game.playSound('rollupshort');
		game.account.addWin(TW,PICK_WIN_HL);
		//game.account.update();
		
		setTimeout(function()
		{
			dressShow.play(dt*50-2);
		}, dt*32);
		
	}, dt*154 );
	
	this.addAction(function()
	{
		this.stop();
	}, dt*160-1);
};
DressShow.prototype = new AF.Movie();

////////HOLLY WALK IN ////////////////////
function HollyWalkIn()
{
	var dt = 75;  
	var DL = 2*dt;
	var Xtime = 6*dt;
	var Stime = 6*dt;
	AF.Movie.call(this, DL+Xtime+Stime + 21*dt);
	this.visible = 0;
	
	var x1 =90, x2 =485 ;
	var scale1 = 0.55, scale2 = 1;
	
	var hollySparkles = new SparkleHolly();
	this.addChild(hollySparkles);
	hollySparkles.x = 530;
	hollySparkles.y = 300;
	
	this.addTween(new AF.Tween(hollySparkles,  "alpha", 1).set(0,1).set(DL+Xtime+Stime+ 17.5*dt, 1).set(DL+Xtime+Stime+ 20.5*dt, 0) );
	
	var aHollyImages = [];
	for( var i =0; i < 10; i++ )
	{
 		var tmp = i.toString();	
		var hollyImage =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/' +tmp+tmp+tmp+ '.png'),1);
		var mystarBox = new AF.Movie();
		mystarBox.x = 300 -Math.round(game.ASSET_MANAGER.getAsset('photoshot/' +tmp+tmp+tmp+ '.png').width/2) 
		mystarBox.y = 480 -Math.round(game.ASSET_MANAGER.getAsset('photoshot/' +tmp+tmp+tmp+ '.png').width/2)
		
		hollyImage.x = -Math.round(game.ASSET_MANAGER.getAsset('photoshot/' +tmp+tmp+tmp+ '.png').width/2);
		hollyImage.y = -Math.round(game.ASSET_MANAGER.getAsset('photoshot/' +tmp+tmp+tmp+ '.png').height/2);
		mystarBox.addChild(hollyImage);
		
		aHollyImages[i] = mystarBox;
		this.addChild(aHollyImages[i]);  
		aHollyImages[i].visible = 0;
		
		this.addTween(new AF.Tween(aHollyImages[i],  "x", x1).set(DL, x1).set(DL+Xtime, x2).set(DL+Xtime+Stime, x2)  ); 
		this.addTween(new AF.Tween(aHollyImages[i],  "y", mystarBox.y+100).set(DL, mystarBox.y+100).set(DL+Xtime, mystarBox.y).set(DL+Xtime+Stime, mystarBox.y + 200)  );  
		this.addTween(new AF.Tween(aHollyImages[i],  "scaleX", scale1).set(DL, scale1).set(DL+Xtime, scale1).set(DL+Xtime+Stime, scale2));
		this.addTween(new AF.Tween(aHollyImages[i],  "scaleY", scale1).set(DL, scale1).set(DL+Xtime, scale1).set(DL+Xtime+Stime, scale2) );
		this.addTween(new AF.Tween(aHollyImages[i],  "alpha", 1).set(0, 1).set(DL+Xtime+Stime+ 17.5*dt, 1).set(DL+Xtime+Stime+ 20.5*dt, 0) );
	};
	
	this.init = function(dress)
	{
		this.visible = 1;	
		for(var i =0; i < 10; i++)
		{
 			aHollyImages[i].visible = 0;
   		}
   		aHollyImages[dress].visible = 1;
		this.play(0);
	};
	
	this.addAction(function()
	{ 
	  	//dynMask = 200;
		hollyWalkIn.setMask(200, 0, 640, 700);
		hollySparkles.openme();
	  
	}, DL+Xtime+dt*2 );    
	
    this.addAction(function()
	{ 
		hollySparkles.stopme();
	  	this.stop(0);
		this.visible = 0;
		hollyWalkIn.setMask(290, 0, 440, 700);
	  
	}, DL+Xtime+Stime + 21*dt-1 );    
};
HollyWalkIn.prototype = new AF.Movie();

function HollySayNo()
{
	var dt = 90;
	AF.Movie.call(this, 24*dt );
	this.visible = false;
	
	var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/nowin.png'),7);
	this.addChild(sprite);
	sprite.scaleX = sprite.scaleY = 1.15;
	
	this.addTween(new AF.SpriteTween(sprite, 0).set(0, "0,1,2,3,4,5,5,6,6,5,5,6,6,5,5,6,6,5,5,4,3,2,1,0", 24*dt));
	
	this.start = function()
	{
		this.play(0);
		this.visible = true;
	};
	
	this.addAction(function()
	{ 
		this.visible = false;
    	this.stop(0);	
	}, 24*dt  -1 ); 
}
HollySayNo.prototype = new AF.Movie();

//for behinf holly when she walks out
function SparkleHolly()
{
	var dt = 85;
	AF.Movie.call(this, 32*dt ); 
 
	var sparkle = new AF.Sprite(game.ASSET_MANAGER.getAsset('sparkleBurst.png'),1);
  
	var sparkleBox = new AF.Movie();
	sparkleBox.x = -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').width/2)  + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2) ;
	sparkleBox.y =  -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').width/2)  + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').height/2);

	sparkle.x = -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').width/2);
	sparkle.y = -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').height/2);
	
	sparkleBox.addChild(sparkle); 	
	this.addChild(sparkleBox);  
  
	this.addTween(new AF.Tween(sparkleBox,  "scaleX", 1.5).set(5*dt, 2.3));//.set(10*dt, 1.8) );
	this.addTween(new AF.Tween(sparkleBox,  "scaleY", 1.5).set(5*dt, 2.3));//.set(10*dt, 1.8) );
	
	this.addTween(new AF.Tween(sparkleBox,  "alpha", 0).set(0, 0).set(4*dt, 1 ).set(6*dt, 0 ) );

	this.openme = function()
	{
		this.play(0);
		this.visible = true;
	};
	
	this.stopme = function()
	{
		this.visible = true;
		this.stop(0);
	};	 

	this.addAction(function()
	{ 
    	this.play(0);	
	}, 6*dt  -1 ); 
};
SparkleHolly.prototype = new AF.Movie();


/////////////TAKE A PHOTO //////////////////////////
function TakeaPhoto()
{
	var dt = 70;    var DL = 4*dt;  
	var total = 27*dt;
	AF.Movie.call(this, total);
	
	var lights = new AF.Movie();
	
	for(var c=0; c<3; c++)
	{
		for(var r=0; r<3; r++)
		{
			var light = new AF.Sprite(game.ASSET_MANAGER.getAsset('starflash.png'),1);
			light.x = -40 + c*350;
			light.y = -50 + r*170;
			light.scaleX = light.scaleY = 4.2;
			lights.addChild(light);
		}
	}
	this.addChild(lights);
	this.addTween(new AF.Tween(lights,  "alpha",0).set(dt*3, 0).set(dt*4, 1 ).set(dt*7, 0 ).set(dt*8, 1 ).set(dt*11, 0 ).set(dt*12, 1 ).set(dt*13, 0 )); 
	
	var set1 = [];
	var set2 = [];
	var set3 = [];
	var gap = 230;
	
	for( var i =0; i < 10; i++ )
	{
  		var tmp = i.toString();
		
		set3[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/'+tmp+'3.jpg'),1);
		set3[i].x = 574;  set3[i].y = 105;    set3[i].rotate = -13;
		this.addChild(set3[i]);  
		set3[i].visible = 0;
	
		set2[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/'+tmp+'2.jpg'),1);
		set2[i].x = 325;  set2[i].y = 80;  set2[i].rotate = 9;
		this.addChild(set2[i]);  
		set2[i].visible = 0;  
	   
		set1[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset('photoshot/'+tmp+'1.jpg'),1);
		set1[i].x = -50;   set1[i].y = 130;   set1[i].rotate = -18;
		this.addChild(set1[i]);  
		set1[i].visible = 0; 
		
		this.addTween(new AF.Tween(set3[i],  "alpha",0).set(DL, 0).set(DL+dt*1, 1 ).set(dt*23, 1 ).set(dt*26, 0 ) ); 
		this.addTween(new AF.Tween(set2[i],  "alpha",0).set(gap+DL, 0).set(gap+DL+dt*1, 1 ).set(dt*23, 1 ).set(dt*26, 0 ) ); 
		this.addTween(new AF.Tween(set1[i],  "alpha",0).set(2*gap+DL, 0).set(2*gap+DL+dt*1, 1 ).set(dt*23, 1 ).set(dt*26, 0 )  );  	
	};
	
	this.start = function(dress)
	{
		this.visible = 1;	
		for(var i =0; i < 10; i++)
		{
 			set3[i].visible = 0;
			set2[i].visible = 0;
			set1[i].visible = 0;
   		}
   		set3[dress].visible = 1;
		set2[dress].visible = 1;
		set1[dress].visible = 1;
		this.play(0);
	};
	
	this.addAction(function()
	{ 
    	this.stop(0);	
	}, dt*27-1 ); 
};
TakeaPhoto.prototype = new AF.Movie();

///////////////////////////////////////////
function MirrorShow()
{   
    var dt = 170;
	AF.Movie.call(this, 40*dt);	
	//this.visible = false;
	var posx = game.layout.REELS.x + 700 + 18 ;
	var posy = game.layout.REELS.y + 100;
	
	var mirrorbg =  new AF.Sprite(game.ASSET_MANAGER.getAsset('mirror.png'),1);
 	mirrorbg.x =  posx;
	mirrorbg.y =  posy;
	mirrorbg.visible = false;
	this.addChild(mirrorbg); 	
 	
	var light = [];  var sparkleLight = [];
	var greenlight = []; 
	var redlight = []; 
	var gap = 50;
	  
	this.addTween(new AF.Tween(mirrorbg,  "x", posx + 300).set(dt*8, posx, AF.Tween.BOUNCE).set(dt*10, posx ) );
	this.addTween(new AF.Tween(mirrorbg,  "alpha", 0).set(dt*6, 1).set(dt*10, 1 ).set(dt*12, 0 ) );
	  
	//-----light -------------------------------
	var baseX = 960,  baseY = 568;
	var lightX = [ baseX-95,  baseX-122,  baseX-130, baseX-122, baseX -98,  baseX -64, baseX-34,   baseX-24,baseX-37, baseX-66];
	var lightY = [baseY-189,   baseY-221,  baseY-270, baseY-312, baseY -348, baseY-352, baseY-322, baseY-267,baseY-212,baseY -186];

	for( var i= 1; i < 11; i++ )
	{	 
	greenlight[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset('twolights.png'),2);
	greenlight[i].frame = 0;
	greenlight[i].visible = false;
 
	redlight[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset('twolights.png'),2);
	redlight[i].frame = 1;
	redlight[i].visible = false;
 
	//////light  ///////////////
	light[i] = new FlashLights();
	light[i].visible = false;
 
	sparkleLight[i] = new SparkleLight();
	sparkleLight[i].visible = false;
 
	this.addChild(light[i]); 
	this.addChild(greenlight[i]); 	 	  
	this.addChild(redlight[i]); 	
	this.addChild(sparkleLight[i]); 	  
	};
 
	this.setPositionFG = function() 
	{
		for( var i= 1; i < 11; i++ )
	  	{	 
  	   		light[i].x =  lightX[i-1];
	  		light[i].y =  lightY[i-1];
 
 	   		sparkleLight[i].x =  lightX[i-1]+52 ;
	   		sparkleLight[i].y =  lightY[i-1]+49 ;
  		}	
	}; 
 
	var mynumber = new ShowMirrorNumber();
	mynumber.x =500 + 380;
	mynumber.y= 100 + 195;
 	this.addChild(mynumber); 	
  
	var baseX2 =  960;
	var baseY2 =  568 - 66;

	var lightX2 = [ baseX2-95-108,  baseX2-122 -138,  baseX2-130 -151, baseX2-122-141, baseX2 -98-105,  baseX2 -64-72, baseX2-34-34,   baseX2-24 -24, baseX2-37 -51+14, baseX2-66 -74 +5];
	var lightY2 = [baseY2-189 +96,  baseY2-221 + 84,  baseY2-270 + 63, baseY2-312+43,  baseY2 -348+30, baseY2-352 +31, baseY2-322+48, baseY2-267 + 60,baseY2-212 + 83,baseY2 -186+97];

	this.setPosition = function() 
	{
		for(var i= 1; i < 11; i++)
		{	 
 			greenlight[i].x =  lightX2[i-1]  -18;
			greenlight[i].y = lightY2[i-1] -19;
	  
			redlight[i].x =  lightX2[i-1] -18;
			redlight[i].y =  lightY2[i-1]-19;
	   
			light[i].x =  lightX2[i-1];
			light[i].y =  lightY2[i-1];
 
			sparkleLight[i].x =  lightX2[i-1]+52 ;
			sparkleLight[i].y =  lightY2[i-1]+49  ;	
		}	
	};

	//coming up 
	this.visible = 0;
 	this.show = function()
	{
    	this.visible = 1;
 		mirrorbg.visible = true;
		this.play(0);
		this.coloredLightsOff();
	};	 
 
	this.hidemirror = function()
	{
		//game.ui.btnSpin.setPosition(game.layout.SPIN_BTN2);   
		//if (!game.ui.state) 
		//game.ui.btnSpin.setPosition(game.ui.layout.SPIN_BTN); 
		lastReelAnim.hide();  
	   	lastReelAnimRespin.hide();
		this.coloredLightsOff();
		this.AllWhiteLightsOff();
		this.play(10*dt+1);  
	};	 

	this.addAction(function()
	{ 
		this.stop(0);
	}, 12*dt );  

	// for recovery
	this.hideFGmirror = function()
	{
		this.stop(0);
		mirrorbg.visible = false;
		this.coloredLightsOff();
		this.visible = 0;
		// this.turnOnWhiteLights(0);
		// this.visible = 0;
	};	 
 
	this.addAction(function()
	{ 
		if( isJustRecovery )
     	{   
			this.setPositionFG();
			this.turnOnWhiteLights(TKS_HL);
		}
		
		lastReelAnim.init();
		isJustRecovery = 0;
		this.stop();
		
	}, 10*dt );  
 
	/* 
	   this.addAction(function(){ 
	 
		if(lastReelAnim.time <=0)
		lastReelAnim.init();
		
	   }, 12*dt );  
	*/
 
	////-------TKS_HL --------------------------
	this.showNumber = function(num)
	{
   	 	// No longer set the new lights on the function , you only need a spark flashed in red , time to start the feature.
		sparkleLight[num].visible = true;
		sparkleLight[num].openme(); 
	
		mynumber.setText(num);
		mynumber.openme();
	}; 
  
	////TKS_HL
	this.turnOnWhiteLights = function(num)
	{  
   		// No longer set the new lights on the function , you only need a spark flashed in red , time to start the feature.
 		for(var i= 1; i < 11; i++)
		{
			light[i].visible = false;
			light[i].stop(0);
		}
 	   
	 	if(num > 0) 
	 	{  
	 		for(var i= 1; i <= num; i++)
			{ 
				light[i].visible = true;
		 		light[i].play();
	   		}
		}
 	};
 
	this.AllWhiteLightsOff = function()
	{  
   		// No longer set the new lights on the function , you only need a spark flashed in red , time to start the feature.
		for(var i= 1; i < 11; i++)
		{
			light[i].visible = false;
	  		//light[i].stop(0);
		}
	};
 
	this.coloredLightsOff = function()
	{
		for(var i = 1; i < 11; i++)
		{	
			greenlight[i].visible = false;
			redlight[i].visible = false;
		}
	};

	this.turnOffWhiteLights = function(num)
	{  
		light[num].visible = false;
		light[num].stop(0); 
	};

	this.sparkleLight = function(num)
	{
		sparkleLight[num].visible = true;
		sparkleLight[num].openme(); 
		this.turnOffWhiteLights(num);
	}; 

	this.greenOn = function(num) 
	{ 
		greenlight[num].visible = true;
		light[num].visible = false;
		light[num].stop(0); 
	};
 
	this.redOn = function(num) 
	{  
 		redlight[num].visible = true; 
		light[num].visible = false;
		light[num].stop(0);
	};
};
MirrorShow.prototype = new AF.Movie();

////////////////////////////////
function LastReelAnim()
{
	var dt = 120;
	AF.Movie.call(this,14*dt);  
 	this.visible = false;
	
 	var mybg =  new AF.Sprite(game.ASSET_MANAGER.getAsset('kiss_reel_effect_half.png'), 1);
	this.addChild(mybg); 	 
 
	mybg.scaleY = 2;    mybg.scaleX = 2;
 	mybg.x =  222 + 463 + 10;
	mybg.y = 59 + 31;
	    
	this.addTween(new AF.Tween(mybg,  "alpha", 0).set(dt*5,0.6).set(dt*9,0.6).set(dt*14,0.1) );
 
	this.init = function()     
	{
		if(mirrorShow.visible == 1)
		{
			this.visible = true;
			this.play(0);
		}
	};   

	this.hide = function()     
	{
		this.visible = false;
		this.stop(0);
   	};  
};
LastReelAnim.prototype = new AF.Movie();

/////////MIRROR////////////////////////////////////////////////
function FlashLights()
{
	var dt = 40;
	AF.Movie.call(this, 20*dt ); 
 
	var bombstar = new AF.Sprite(game.ASSET_MANAGER.getAsset('starflash.png'),1);
  
	var mystarBox = new AF.Movie();
	mystarBox.x =-Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2)  + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2) ;
	mystarBox.y = -Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2)  + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').height/2);

	bombstar.x = -Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2);
	bombstar.y = -Math.round(game.ASSET_MANAGER.getAsset('starflash.png').height/2);

	mystarBox.addChild(bombstar); 	
	this.addChild(mystarBox);  
  
	this.addTween(new AF.Tween(mystarBox,  "scaleX", 0.2).set(10*dt, 1.3).set(20*dt, 0.2) );
	this.addTween(new AF.Tween(mystarBox,  "scaleY", 0.2).set(10*dt, 1.3 ).set(20*dt, 0.2 ) );
	this.addTween(new AF.Tween(mystarBox,  "alpha", 1).set(10*dt,0.7 ).set(20*dt, 1 ) );
	this.addTween(new AF.Tween(mystarBox,  "rotate", 0).set(20*dt, 360 ));  
	   
	this.show = function()
	{
    	light.visible = true;
	};	 

	this.hide = function()
	{
   		light.visible = false;
	};	 
};
FlashLights.prototype = new AF.Movie();

//// FIRE OUT WITH NUMBER COME OUT
function SparkleLight()
{
	var dt = 80;
	AF.Movie.call(this, 32*dt ); 
 
	var sparkle = new AF.Sprite(game.ASSET_MANAGER.getAsset('sparkleBurst.png'),1);
  
	var sparkleBox = new AF.Movie();
	sparkleBox.x = -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').width/2)  + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2) ;
	sparkleBox.y =  -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').width/2)  + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').height/2);

	sparkle.x = -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').width/2);
	sparkle.y = -Math.round(game.ASSET_MANAGER.getAsset('sparkleBurst.png').height/2);
	
	sparkleBox.addChild(sparkle); 	
	this.addChild(sparkleBox);  
  
	this.addTween(new AF.Tween(sparkleBox,  "scaleX", 0.1).set(5*dt, 0.4).set(10*dt, 0.5) );
	this.addTween(new AF.Tween(sparkleBox,  "scaleY", 0.1).set(5*dt, 0.4).set(10*dt, 0.5 ) );
	
	this.addTween(new AF.Tween(sparkleBox,  "alpha", 0.5).set(4*dt, 1 ).set(7*dt, 1 ).set(10*dt, 0 ) );
	this.addTween(new AF.Tween(sparkleBox,  "rotate", 0).set(10*dt, 110 ));  

	this.openme = function()
	{
		this.visible = true;
		this.play(0);
	};	 

	this.addAction(function()
	{ 
    	this.stop(0);
    	this.visible = false;	
	}, 10*dt  -1 ); 
};
SparkleLight.prototype = new AF.Movie();

//////////////////////////////////////////////
//// FIRE OUT WITH NUMBER COME OUT
 
function ShowMirrorNumber()
{
	var dt = 80;  
	var delay = 2*dt;   
	AF.Movie.call(this, 14*dt+ delay ); 
 
	var mirrorTXT =   new AF.Text();		
	setTextFormat(mirrorTXT, TXT_Mirror_NUM, 0);
	mirrorTXT.setTextFormat("mirror"); 
	mirrorTXT.text = 0;
 
	var mirrorTXTbg = new AF.Sprite(game.ASSET_MANAGER.getAsset('numberbg.png'),1);
	var TXTBox = new AF.Movie();
  
    this.visible = false;
 
	mirrorTXTbg.x = -Math.round(game.ASSET_MANAGER.getAsset('numberbg.png').width/2);
	mirrorTXTbg.y = -Math.round(game.ASSET_MANAGER.getAsset('numberbg.png').height/2);  
	  
	mirrorTXT.x =  30 -Math.round(game.ASSET_MANAGER.getAsset('numberbg.png').width/2);
	mirrorTXT.y = -23 -Math.round(game.ASSET_MANAGER.getAsset('numberbg.png').height/2);  
	  
	TXTBox.x = -Math.round(game.ASSET_MANAGER.getAsset('numberbg.png').width/2)  + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2) ;
	TXTBox.y =  -Math.round(game.ASSET_MANAGER.getAsset('numberbg.png').width/2)  + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').height/2);
 
	//TXTBox.addChild(mirrorTXTbg); 	
	TXTBox.addChild(mirrorTXT); 
	this.addChild(TXTBox);  
	 	   
	this.addTween(new AF.Tween(TXTBox,  "scaleX", 0).set(delay, 0.6).set(delay+6*dt, 1).set(delay+9*dt,1.2) );
	this.addTween(new AF.Tween(TXTBox,  "scaleY", 0).set(delay, 0.6).set(delay+6*dt, 1).set(delay+9*dt, 1.2 ) );
	this.addTween(new AF.Tween(TXTBox,  "alpha", 0).set(delay-1, 0).set(delay, 0.4).set(delay+6*dt, 1 ).set(delay+9*dt, 0 ));
 
	this.setText = function(txt) 
	{      
		mirrorTXT.text = txt;
	};
 
	this.openme = function()
	{
		this.visible = true;
		this.play(0);
	};	 

	this.addAction(function()
	{ 
    	this.stop(0);
    	this.visible = false;
	},delay+ 10*dt -1 ); 
};
ShowMirrorNumber.prototype = new AF.Movie();


