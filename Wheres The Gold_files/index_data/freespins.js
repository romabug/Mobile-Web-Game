 
var SLIDER_EASE_IN = function(a, b, x)
{
    var xx = 1-Math.cos(x * 1);
    return AF.Tween.LINEAR(a, b, xx);
};
   
function  TestMe() 
{	 
var dt = 115;     AF.Movie.call(this, 11*dt ); 
var rect = new AF.DObject();
rect.performDraw = function()
{    
ctx.fillStyle = "black";  
for(i=0; i < 5; i++){
var posx = game.layout.REELS.x + i*(150 + game.layout.reelGap)
ctx.fillRect(posx, game.layout.REELS.y,150,450);
}
}; this.addChild(rect); 
 
 
var bombstar = new AF.Sprite(game.ASSET_MANAGER.getAsset('coin.png'),1);
//this.addTween(new AF.SpriteTween(bombstar, 0).set(dt*14,  "0,1,0,1,0,1,0,1,0,1",  17*dt)); 
var mystarBox = new AF.Movie();
mystarBox.x =-Math.round(game.ASSET_MANAGER.getAsset('coin.png').width/2) + 312 +Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2) ;
mystarBox.y = -Math.round(game.ASSET_MANAGER.getAsset('coin.png').width/2)  + 1+ Math.round(game.ASSET_MANAGER.getAsset('starflash.png').height/2);
bombstar.x = -Math.round(game.ASSET_MANAGER.getAsset('coin.png').width/2);
bombstar.y = -Math.round(game.ASSET_MANAGER.getAsset('coin.png').height/2);
mystarBox.addChild(bombstar); 	
this.addChild(mystarBox);  
  
//this.addTween(new AF.Tween(mystarBox,  "scaleX", 0).set(1, 0 ).set(dt*5, 2 ).set(dt*11, 0 )   );
//this.addTween(new AF.Tween(mystarBox,  "scaleY", 0).set(1, 0 ).set(dt*5, 2 ).set(dt*11, 0 )   );
 this.addTween(new AF.Tween(mystarBox,  "rotate", 0).set(1, 0 ).set(dt*11, 880,AF.Tween.BOUNCE ));
//this.addTween(new AF.Tween(mystarBox,  "x", 0).set(1, 110 ).set(dt*11, 780, AF.Tween.POWER, 11 ));    // 从慢到快的运动，1 匀速。
 
this.addTween(new AF.Tween(mystarBox,  "y", 0).set(1, 0 )
.set(dt*11,480, AF.Tween.BOUNCE ));    // 
  
 
 };
 
 TestMe.prototype = new AF.Movie(); 
 

 
//----------------------------------- 
 
function PickMePanel ()
{
  	//game.layout.REELS.x + column * (game.layout.symbolWidth + game.layout.reelGap);
  	var pickpostionX = game.layout.REELS.x + 57 + 14; 
	var pickpostionY = game.layout.REELS.y + 38;
	var boxW  = 127;
	var boxH  = 400;
	var boxG  = 15;
	var bntBackground = [];
	var button = [];
	var btnarea = {nx:0, ny:0, nwidth:boxW-30, nheight:boxH,  dx:0, dy:0, dwidth:boxW, dheight:boxH};  
	
	  this.canPick = false;
	  this.canClick  = false;   
	  this.picked = -5;  
	  
  
    this.showbutton = function()
    {
 	 for (var i=1; i < 6; i ++) {  
		 bntBackground[i].visible = true;
	    }
  	};
	
   for (var i =1; i < 6; i++) {
 	var newX =  pickpostionX + (i-1)*(boxW+boxG);
 	bntBackground[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset('pickbox.gif'),1);
	bntBackground[i].x = newX;
	bntBackground[i].y = pickpostionY;
	 bntBackground[i].visible = false;
 	this.addChild(bntBackground[i]); 
  
    button[i] = new Button(null, btnarea);
    button[i].setPosition({x:newX, y:pickpostionY});	
 
  };

 
 ///------------------------------------------------
 
  this.init = function()
 {
	  game.autoPlay = false;
	  game.requestToStopAutoPlay = false;
	  game.ui.autoPlayMode = game.ui.AUTO_OFF;
	  game.autoPlayGames = 0;   
	 
 //  console.log("pickmepanel.init --pick->" + pickmepanel.picked)
 featureCounter.setDiggerPosx(featureCounter.CHD);

 featureCounter.showDiggers();
  woodbar.pickdiggertxtShow(); 
  topBar.visible = false;

	
      this.visible = true;
	  this.showbutton(); 
 	  
	  realFeatureEnd = true;	

   
// if already picked at recovery  
  if(pickmepanel.picked != null && pickmepanel.picked != "" && pickmepanel.picked >= 0   )
  {
 
	  featureCounter.spotLightOn(pickmepanel.picked ); 
	  goldbitsmoive.showGoldResult(featureCounter.TBG, true);  
	  goldbitsmoive.showIconResult(featureCounter.FBD, true);
	  goldbitsmoive.showWildIcon(true);   // the wild icon picked.
      woodbar.resultWoodShow();  
 
	  
	   featureCounter.setWinDigger(pickmepanel.picked);
        featureCounter.play(180*diggspeed + myextra) ;
	  
	  this.canClick = false;
	  this.canPick = false; 
	  
	   afterrecover2 = true; 
 
   
  }else
  {  
    	  this.canClick = true;
	  this.canPick = true;  
	  	  
	  setTimeout(function() {
		 cavesound.playcavebg();   
		  }, 1000)
	  
  }
  
 
//------------------------------------------------ 
  
    if(!this.inRestore)
	{ 
	 
		 if (!game.featureStarted)  
			windowObj.sendMsgToServer("&MSGID=FEATURE_START&CFG=0&");
		 else{
			 // should be a bug
 	 
 	//  this.canClick = false;
	//  this.canPick = false;  
		 }
  	}  
	
	
 };
	 
 	
    this.hidebutton = function()
    {
  	  this.canPick = false;
      this.canClick = false;
 	  
	   this.visible = false;
 
	 for (var i=1; i < 6; i ++) {  
		 bntBackground[i].visible = false;
	    }
 	};
	
 
	
//------------- click function  ---------------------------------------
	
this.processClick = function(coords)
{
 };
 
 ////////////////////// ////////////////////////////////////////////

 
 this.processClickRelease = function(coords)
{
 	
	if (!this.canClick || !this.visible || !this.canPick)
	  return;
		
      coords.y-=8;
 	  if (this.visible)
	  {
 	   for (var i =1; i < 6; i++) {
			var myid = i-1;
			if(button[i].isOver(coords))
			{
			  var featureID = 0;
			  this.hidebutton();    
			  diggersound = "dd"+mysearchID[myid+1];
 				  
			  windowObj.sendMsgToServer("&MSGID=FEATURE_PICK&CFG="+featureID+"&FP=1|1|" + myid + "|&");
					  
			  featureCounter.spotLightOn(myid+1);
 			   featureCounter.pickRAM = myid +1;
   			   featureCounter.play(0);
    	
break;
			}
		}
 	  }
 	  
	  
	  
  };
	
}
PickMePanel.prototype = new AF.Movie()

 
 
 
  
 

function TopBar()
{
	AF.Movie.call(this,3000);
	
    var forcedMessage=null;// text to force
    var timeSinceUpdate = 0;
    var messageCounter = 0;
    
    this.delayMessages = false;

    var bg =  new AF.Sprite(game.ASSET_MANAGER.getAsset('newbar.png'), 1);
	this.addChild(bg);
    
    var txt = new AF.Text();
    txt.setMixedFormat(TXT_SCROLL_MESSAGES_TOP_FORMAT);
	this.addChild(txt);
    
    this.showNextMessage = function()
    {
        if(forcedMessage)
        {
            txt.text = forcedMessage;
            forcedMessage= null;
        }
        else
        {
            txt.text = TXT_SCROLL_MESSAGES_TOP[messageCounter % TXT_SCROLL_MESSAGES_TOP.length];
            messageCounter ++;
        }
        timeSinceUpdate = 0;
    };
    
    this.forceMessage = function(newTxt)
    {
        forcedMessage = newTxt;
        this.delayMessages = false;
        this.showNextMessage();
    };
    
    this.updateDT = function(dt)
    {
        timeSinceUpdate += dt;
        if(timeSinceUpdate > game.idleTextDelay && !this.delayMessages)
        {
            this.showNextMessage();
        }
    }
}
TopBar.prototype = new AF.Movie();

overridenFunctions.setBShowFreeSpinBg = game.setBShowFreeSpinBg;
game.setBShowFreeSpinBg = function(bShowFreeSpinBg)
{
    if (!winCelebrationsComplete){
        return;
    }

    overridenFunctions.setBShowFreeSpinBg.call(this, bShowFreeSpinBg);
};

function FeatureTriggerSound()
{
    var durationBell = Math.round(gAudioSettings.spritemap.featureYiihaa.end*1000 - gAudioSettings.spritemap.featureYiihaa.start*1000 + 500);
	
    AF.Movie.call(this, durationBell );

    this.addAction(function(){
     //   game.playSound('featureYiihaa');
	}, 10);

    this.addAction(function(){
        this.stop(0);
        this.visible = false;
        showWinCelebration();
	}, durationBell -1);
    
    this.visible = false;
    this.init = function()
    {
        this.visible = true;
        this.play(0);
    };
    
    this.end = function()
    {
        this.visible = false;
        this.stop(0);
    };
}
FeatureTriggerSound.prototype = new AF.Movie();


function FeatureReTriggerSound()
{
   var durationBell = Math.round(gAudioSettings.spritemap.featureYiihaa.end*1000 - gAudioSettings.spritemap.featureYiihaa.start*1000 + 500);

	AF.Movie.call(this, durationBell*2);

    this.addAction(function(){
        game.playSound('featureYiihaa');
	}, 10);
 

    this.addAction(function(){
        this.stop(0);
	}, durationBell*2 -1);
    
   
    this.init = function()
    {
   //    game.freeGames.m_TriggerTimer = durationBell*2;
 	    this.visible = true;  
        this.play(0);
 		
    };
}
FeatureReTriggerSound.prototype = new AF.Movie();

// -----------------------------------------------------------------------------

function WildSymbol()
{
 	var t = 100;
	AF.Movie.call(this, 17*t);	
	
var s = [];
for(i = 9; i < 17; i ++)
{
    var image ="goldwilds/"+i+".jpg";	
	s[i] = new AF.Sprite(game.ASSET_MANAGER.getAsset(image),11);	
	s[i].visible = false;
	this.addChild(s[i]);
 	this.addTween(new AF.SpriteTween(s[i]).set(t, "0-10,5-10", 17*t)); 
 }
	
 	
this.showwild = function (ID) {
  
  for(i = 9; i < 17; i ++)
  {  s[i].visible = false;
  }
	s[ID].visible = true;
};	 
		
 

	
};
WildSymbol.prototype = new AF.Movie();

function ScatterSymbol()
{
	var t = 95;
	AF.Movie.call(this, 23*t);	
	
	var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym12.jpg'),19);
	this.addChild(sprite);
	
    this.addTween(new AF.SpriteTween(sprite).set(t, "15,15,16,16,17,17,18,18,0-14", 23*t));
	
 	    
 	
};
ScatterSymbol.prototype = new AF.Movie(); 
 
 
 

function SummaryMovie(text1, text2, text3)
{
	AF.Movie.call(this,6000);
    
    var panel = new PopupPanel("summary.jpg");
	panel.x = game.layout.REELS.x;
 	panel.y = game.layout.REELS.y;
	this.addChild(panel);
    
    this.panel = panel;
    var win;
    var winDelta;
	var winRoll;
    
    var txt1 = new AF.Text();
    var txt2 = new AF.Text();
    var valueTotalWin = new AF.Text();
    
    txt1.setMixedFormat(text1);
    txt2.setMixedFormat(text2);
    valueTotalWin.setMixedFormat(text3);
    
    this.panel.addChild(txt1);
    this.panel.addChild(txt2);
    this.panel.addChild(valueTotalWin);
  


this.addTween(new AF.Tween(txt1, "alpha").set(400,0).set(1000,1).set(2999,1).set(4000,1).set(5000,0)); 
this.addTween(new AF.Tween(txt2, "alpha").set(400,0).set(1000,1).set(2999,1).set(4000,1).set(5000,0));	
this.addTween(new AF.Tween(valueTotalWin, "alpha").set(400,1).set(1000,1).set(2999,1).set(4000,1).set(5000,0));
this.addTween(new AF.Tween(panel, "alpha").set(400,0).set(1000,1).set(2999,1).set(4000,1).set(5000,0));
    
	    
    this.addAction(function()
	{
      gameConfig.drawPaylines = false;  
	}, 20);
	
	
	
    this.addAction(function()
	{
		if(win<=0)
			this.moveTo(1950);
		else
            game.playSound('rollup');
	}, 999);
    
    this.addAction(function(){
		winRoll = Math.min(win, winRoll + winDelta);
		valueTotalWin.text = game.account.getCurrencyString(winRoll);
		if(winRoll<win)
		{
			this.moveTo(1000);
		}
		else
		{
			this.moveTo(1950);
		}
	}, 1060);
    
    this.addAction(function(){
 			//	darkbg.hide();
	}, 2000);
	
	
	this.addAction(function(){
 
    //  game.playSound(diggerwinsound);
 	}, 4000);
	
	
    this.addAction(function()
	{
         inFeature = false;
        playFreeGames = false;
        game.freeGames.m_bInFreeGames = false;
        game.setBShowFreeSpinBg(false);
   
        IFG=0;
		this.visible = false;
		this.stop();
        game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
		
		topBar.visible = true;
        gameConfig.drawPaylines = true;  
		
		
	}, 5000);
    
    this.updateTotalWin= function(newTotalWin)
	{
        win = newTotalWin;
        winDelta = Math.max(27, win / 30);
		winRoll = 0.1;
        valueTotalWin.text = game.account.getCurrencyString(0);
	};
}
SummaryMovie.prototype = new AF.Movie();

function PopupPanel(image)
{
	AF.Movie.call(this);
	
	var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset(image),1);
	this.addChild(bg);
};
PopupPanel.prototype = new AF.Movie();




function DelaySpinButton(mytime) 
{
	    var delaytime = mytime;
		game.ui.btnSpin.setPosition(game.layout.SPIN_BTN); 
		game.ui.layout.SPIN_BTN_GLOW =   { x:-815, y:208,  w:159, h:149}; 
	  
	 setTimeout (  function (){
		game.ui.btnSpin.setPosition(game.ui.layout.SPIN_BTN); 
		game.ui.layout.SPIN_BTN_GLOW =   { x:815, y:208,  w:159, h:149}; 
		 }, delaytime)	 
 };



function Shaking()
{
 	var dt = 100;
	AF.Movie.call(this, 60*dt);	
	this.visible = false;
	var shakinggap = 8;
	
	
    var shakebg = new AF.Sprite(game.ASSET_MANAGER.getAsset('reelbg.jpg'),1);
	shakebg.x = 0;
	shakebg.y = -54;
   //shakebg.alpha = 0.7;
	this.addChild(shakebg);
 	
	 var barBG =  new AF.Sprite(game.ASSET_MANAGER.getAsset('newbar.png'), 1);
	 barBG.x = layout.TOP_MESSAGE_BAR.x;
	 barBG.y = layout.TOP_MESSAGE_BAR.y;
	this.addChild(barBG);
	
	 var txt1 = new AF.Text();
    txt1.setMixedFormat(TXT_SCROLL_MESSAGES_TOP_FORMAT);
	txt1.x = layout.TOP_MESSAGE_BAR.x ;
	txt1.y = layout.TOP_MESSAGE_BAR.y + 6;
	var txtposy = layout.TOP_MESSAGE_BAR.y + 6;
	
	  txt1.text = TXT_SCROLL_MESSAGES_TOP[1];
	 	this.addChild(txt1);
		
		
	 var txt2 = new AF.Text();
	 txt2.setMixedFormat(TXT_SCROLL_MESSAGES_TOP_FORMAT);
	  txt2.text = TXT_SCROLL_PLAY_NOW; 
	  txt2.x = 200 -19;
	    txt2.y = MESSAGE_BAR_LANG.y -22;
     var txtposy2 = MESSAGE_BAR_LANG.y -22;
	 this.addChild(txt2);
	 
	 
  var left =  new AF.Sprite(game.ASSET_MANAGER.getAsset('leftpayline.jpg'), 1);
     left.x =game.layout.payLineEndsLeft.x +1; 
     left.y =game.layout.payLineEndsLeft.y +2; 
	 var leftposy = game.layout.payLineEndsLeft.y +2;  	
	 this.addChild(left); 
	 
	 
	  var right =  new AF.Sprite(game.ASSET_MANAGER.getAsset('rightpayline.jpg'), 1);
 		right.x =	game.layout.payLineEndsRight.x +1; 
		right.y =	game.layout.payLineEndsRight.y +2;	 
		 var rightposy = game.layout.payLineEndsRight.y +2;	 
 	this.addChild(right); 
	
	
	
	// {x:483,y:535};
	 
      var matrix = [];	
	  for ( var c = 0; c < 5; c ++) 
	  {    
	      matrix[c] = [];
 		  var sym ;
  		  for (var r = 0; r < 3; r ++)  
		  {
		  matrix[c][r] = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'),18);
		   matrix[c][r].frame = game.reelMan.reels[c].slots[r+1].currentSymbol;
		  matrix[c][r].x = game.layout.REELS.x + c * (game.layout.symbolWidth + game.layout.reelGap);
	 	  matrix[c][r].y = game.layout.REELS.y +  r * game.layout.symbolHeight;
		  this.addChild(matrix[c][r]);
		  }
 	  }
  	

 this.drawSymbols = function() {
	  for ( var c = 0; c < 5; c ++) {
    		 for (var r = 0; r < 3; r ++)  
  		   matrix[c][r].frame = game.reelMan.reels[c].slots[r+1].currentSymbol;
	  }
  };	
 
 //----------------------------------------------
 
   var bombstar = new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_img.png'),2);
   this.addTween(new AF.SpriteTween(bombstar, 0).set(dt*14,  "0,1,0,1,0,1,0,1,0,1",  17*dt)); 
   this.addTween(new AF.Tween(bombstar,  "alpha", 0).set(dt*14-1, 0).set(dt*14, 1).set(dt*17-1, 1).set(dt*17+1, 0) );
 
 	var mystarBox = new AF.Movie();
	mystarBox.x = 360+ Math.round(game.ASSET_MANAGER.getAsset('summary_img.png').width/4) ;
	mystarBox.y = 195 + Math.round(game.ASSET_MANAGER.getAsset('summary_img.png').height/2);
	
 bombstar.x = -Math.round(game.ASSET_MANAGER.getAsset('summary_img.png').width/4);
 bombstar.y = -Math.round(game.ASSET_MANAGER.getAsset('summary_img.png').height/2);

mystarBox.addChild(bombstar); 	
 
 this.addChild(mystarBox);  
 
this.addTween(new AF.Tween(mystarBox,  "alpha", 0).set(dt*14-1, 1).set(dt*14, 1).set(dt*17, 1).set(dt*17+1, 0) );

this.addTween(new AF.Tween(mystarBox,  "scaleX", 1).set(dt*14, 1 ).set(dt*17, 24 ));

this.addTween(new AF.Tween(mystarBox,  "scaleY", 1).set(dt*14, 1 ).set(dt*17, 24 ));

 
 
  //---------  ----------------------------------------
  		 
	this.init = function() {
		
	  game.autoPlay = false;
	  game.requestToStopAutoPlay = false;
	  game.ui.autoPlayMode = game.ui.AUTO_OFF;
	  game.autoPlayGames = 0;   
		
 	 	this.drawSymbols();		
	 	this.visible = true;
 		this.play(0);
 			game.playSound('earthshake');
		
		
var myposy =  game.layout.REELS.y + 40;
		
 var timer1 = setInterval(function() {
	 
	  setTimeout(function () {
 	  shakebg.y = -54 + shakinggap;	
	  barBG.y = layout.TOP_MESSAGE_BAR.y  + shakinggap;
	  txt1.y = txtposy  + shakinggap;
	  txt2.y = txtposy2  + shakinggap;
	  left.y = 58 + shakinggap;
	  right.y = 58 + shakinggap;
	  
	  for ( var c = 0; c < 5; c ++) {
	  for (var r = 0; r < 3; r ++)  
	  matrix[c][r].y =  game.layout.REELS.y +  r * game.layout.symbolHeight + shakinggap;
	  }
 	  },50) 
		
	  setTimeout(function () {
	  shakebg.y =  -54 -shakinggap;		
	  barBG.y = layout.TOP_MESSAGE_BAR.y  - shakinggap;
	   txt1.y =  txtposy - shakinggap;
	   txt2.y = txtposy2 - shakinggap;
	   	  left.y = 58 - shakinggap;
	     right.y = 58 - shakinggap;
	  
	  for ( var c = 0; c < 5; c ++) {
	  for (var r = 0; r < 3; r ++)  
	  matrix[c][r].y =  game.layout.REELS.y +  r * game.layout.symbolHeight-shakinggap  ;
	  }
 	  },100)	
  }, 101)
  
  
  
  
setTimeout(function () {
 	  shakebg.y =  -54;	
	   txt1.y =  txtposy  ;
	   txt2.y =  txtposy2 ;
	   	  left.y = 58  ;
	     right.y = 58 ;
	  
	  for ( var c = 0; c < 5; c ++) {
    	  for (var r = 0; r < 3; r ++)  
	      matrix[c][r].y = game.layout.REELS.y +  r * game.layout.symbolHeight;
	     }
  	  	
 clearInterval(timer1);
 
},1500)

 };
	 
 	
	
   this.addAction(function()
	{
 	pickmepanel.init();
 	}, 17*dt -2 ); 
	
	
	   this.addAction(function()
	{  this.visible = false;
       this.stop(0);
  	}, 17*dt +1 ); 	 	 
 		   
   
   this.addAction(function()
	{
   this.visible = false;
   this.stop(0);
 	}, 40*dt -1); 	 
 	 
 
};

Shaking.prototype = new AF.Movie();


 
  function DarkBG()
{  
 	AF.Movie.call(this);
 	var rect = new AF.DObject();
	
	rect.performDraw = function()
	{    
 		ctx.fillStyle = "black";  
		for(i=0; i < 5; i++){
		var posx = game.layout.REELS.x + i*(150 + game.layout.reelGap)
 		ctx.fillRect(posx, game.layout.REELS.y,150,450);
 		}
 
 	};
	this.visible = false;
	this.addChild(rect); 
  
	
this.show = function() {
this.visible = true;
}

this.hide = function() {
this.visible = false;
}	
	
 };
DarkBG.prototype = new AF.Movie(); 
 