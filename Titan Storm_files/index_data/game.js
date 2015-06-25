game.account.setNumPaylines(243,243);
game.defaultStops = [0,7,8,40,0];
var RTP_VALUE = ['95.453%']; 

var gAudioSettings = {
	resources: [ 'titanstorm.m4a', 'titanstorm.caf', 'titanstorm.mp3', 'titanstorm.wav' ],
spritemap: { 
			'click': { 'start': 0.832 , 'end':  1.129},
			'spin1':  { 'start': 2.127, 'end':  5.667},   
			'win1':  { 'start': 6.663 , 'end':   8.620},   
			'win2':  { 'start': 9.618 , 'end':   12.265},  
			'srs': {'start': 13.264 , 'end':   14.936},  
			'dingding': {'start': 15.927, 'end': 17.387},
			'freespin1': {'start': 18.381, 'end': 22.454},
			'freespin2': {'start': 23.447, 'end': 28.248 },
			'windup': {'start': 29.231, 'end': 33.832 },   
			'feature1': {'start': 34.812, 'end':41.742},    
			'windup2': {'start': 42.716, 'end':45.582 },    
			'five': {'start': 46.560, 'end': 49.650} 
 	}  
 }; 
 
   
 
// ---------------- Assets -------------------------------

var languagePath = 'language/' + windowObj.languageCode + '/';

game.ASSET_MANAGER.queueFiles([

languagePath + 'BigWin.png', 
'elements.png','DarkTint.png',
'reelbg.jpg',
'gamename.png',
'symbols.png',
'buttons_ui.png',
'FreeGame_BG.jpg',
'game-settings.jpg',
'turndevice.png',
'sym00.jpg',  'sym00_left.png','sym00_right.png','sym00_top.png','sym00_bottom.png',
'sym12.png',
'coin.png','x5.png',
'GameTitle.png', 
 'ReelShine.png', 'SRS_Single.png','TitanFeet.png',
'lightning/LightingStrike.png',  
'intro/Sym12_Frame.png','intro/Sym12.jpg','intro/Sym12_Bottom.png','intro/Sym12_Top.png','intro/Sym12_Break.png', 'intro/Sym12_Left.png', 'intro/Sym12_Right.png', 
'scatterwild/Sym12_Animation.jpg' ,
'Left_Electric.png','Right_Electric.png','Top_Electric.png',
 'Reels_Frame.png','ScrollMessage.png',	
'Top.png','Bottom.png',
 "icecrack/Bottom.png","icecrack/Top.png" ,"icecrack/Left.png","icecrack/Right.png","icecrack/Reels_1.jpg","icecrack/Reels_2.jpg","icecrack/Reels_3.jpg"   
    
]);

// ---------------- slots ---------------------

 
var reelStrips = [
[5,11,6,1,11,7,5,10,8,4,11,6,1,11,8,4,7,10,2,9,5,4,8,10,4,9,10,3,8,2,11,3],
[4,9,7,1,5,10,7,2,8,3,6,9,0,7,3,11,5,9,3,10,1,8,5,7,6,3,11,12,6,7,3,6,11,1,9,2,8,3,6,0,9,3,11,5,9,8,2,6,4,9,7,3,11,12,7,6,3],

[2,10,6,12,10,9,3,11,6,2,7,5,6,10,1,8,6,4,9,12,7,10,5,6,8,1,7,8,4,10,6,0,10,9,2,10,6,1,11,5,6,10,1,8,4,9,7,5,6,0,8,9,1,8,4,9],

[4,8,9,12,7,6,4,10,7,3,9,5,10,2,8,7,3,11,1,7,2,11,4,7,9,0,8,7,4,10,8,3,9,5,10,7,0,8,5,10,7,3,6,2,7],
[4,6,5,7,1,10,5,9,4,11,6,5,11,9,3,7,5,11,8,4,6,11,5,6,11,4,10,5,3,9,11,5,6,11,5,6,9,2,6,8,5]
   
];
 
var reelStripsFree = [
[5,11,6,1,11,7,5,10,8,4,11,6,1,11,8,4,7,10,2,9,5,4,8,10,4,9,10,3,8,2,11,3],
[4,9,7,1,5,10,7,2,8,3,6,9,13,7,3,11,5,9,3,10,1,8,5,7,6,3,11,13,6,7,3,6,11,1,9,2,8,3,6,13,9,3,11,5,9,8,2,6,4,9,7,3,11,13,7,6,3],
[2,10,6,13,10,9,3,11,6,2,7,5,6,10,1,8,6,4,9,13,7,10,5,6,8,1,7,8,4,10,6,13,10,9,2,10,6,1,11,5,6,10,1,8,4,9,7,5,6,13,8,9,1,8,4,9],
[4,8,9,13,7,6,4,10,7,3,9,5,10,2,8,7,3,11,1,7,2,11,4,7,9,13,8,7,4,10,8,3,9,5,10,7,13,8,5,10,7,3,6,2,7],
[4,6,5,7,1,10,5,9,4,11,6,5,11,9,3,7,5,11,8,4,6,11,5,6,11,4,10,5,3,9,11,5,6,11,5,6,9,2,6,8,5]
 
 ];

 
//------------------ Test Functions -----------------------------------


var test = function()
{
 
	$("input[name='stops']").val("25;38;32;2;25");  
};

var test2 = function() 
{
	$("input[name='stops']").val("26;17;48;37;28");
 
};

var ngHlp = {
	sprite: function (num,y,dx,w,h)
	{
		for (var i=0,res=[], y=y||0,dx=dx||150, w=w||150, h=h||150; i<num; res.push({x:dx*i,y:y,w:w,h:h}), i++){;}
		return res;
	},
	frames: function(from,to,dx,dy)
	{
		for (var i=from, res=[], dx=dx||0, dy=dy||0; i<=to; res.push({t:i,x:dx,y:dy}),i++){;}
		return res;
	}
}

function sprintf(format, etc) {
	var arg = arguments;
	var i = 1;
	return format.replace(/%((%)|s)/g, function (m) { return m[2] || arg[i++] })
}

var symTextures = [], symSprites = [], symAnims = [];

 
 
 for (var i=0; i<=13; i++)       
{
	symTextures.push('symbols.png');
	symSprites.push([ {x:150*i,y:0,w:150,h:150} ]);
	symAnims.push( [ {t:0} ]);    
}

 
var randomSprayAnim;
var restoreInfo = {};
var OAK = false; 
var first_sym  = [];
var first_a= 0; first_b =0; first_c = 0; 
var isfour = false;
var firstspinFG = false;
var afterFGdraw = false;
var  WINLINES = 0;
var lastwindup =1;
var layerchange = false;

var initAssets = function()
{ 		
	game.meters.setBackground( [{p:0.0,col:'rgba(69,72,77,1)'}, {p:1.0,col:'rgba(0,0,0,1)'} ]);
 

    game.playSound("click");  
	game.layout.generatePaylineVectors();

	game.messageBar.align   = "center";
	game.messageBar.font    = MESSAGE_BAR_FONT;
    game.messageBar.m_Text = TXT_SCROLL_MESSAGES[0];
    game.idleTextDelay = 3000; 
    game.idleTextTimer = game.idleTextDelay;
    
 	game.imageReelBG        = game.ASSET_MANAGER.getAsset('reelbg.jpg');
	game.imageReelBGfree  = game.ASSET_MANAGER.getAsset('FreeGame_BG.jpg');
	game.imageGameName = null;
    game.imageSymbols      = game.ASSET_MANAGER.getAsset('symbols.png');
	game.imageTurnDevice  = game.ASSET_MANAGER.getAsset('turndevice.png');
	game.imageSprayAnim   = game.ASSET_MANAGER.getAsset('coin.png');
	
  	game.wildTop		  = game.ASSET_MANAGER.getAsset('Top.png');
	game.wildBottom		  = game.ASSET_MANAGER.getAsset('Bottom.png');
 
	game.ui.initAssets();
    game.ui.btnLineUp.isDisabled = true;
    game.ui.btnLineDown.isDisabled = true;
 
	game.reelMan = new ReelManager();
	
	game.ui.insufficientFundsTxt.m_Color = 'red';
	game.ui.insufficientFundsTxt.font = '26px arial'; 
 
//windup	
 
var growSymbols;
var totalScatters = 0;
var whizByAnimations = [];
var greyOutState = false;
var highlight = false;
var WSR;
var drops = 0;
var windup = false;
var myrecovery = false;

 
 
 
var  growSymbols = [];

for(var column = 0; column < 5; column++)
{
	growSymbols[column] = new GrowSymbol();
	growSymbols[column].x = column * (game.layout.symbolWidth + game.layout.reelGap);
	growSymbols[column].visible = false;
	
AF.Movie.root.addChild(growSymbols[column]);
}

overridenFunctions.updateReelManager = game.reelMan.update;
game.reelMan.update = reelManagerUpdate; 

 
 	
for(var i=0; i<reelStrips.length; i++)
game.reelMan.setReelStrip(i,reelStrips[i]);


layout = new Layout();
layout.orient(0);


lightfromreelsgap = new LightFromReelsGap();
lightfromreelsgap.y = layout.SMALL_PANEL.y;
AF.Movie.root.addChild(lightfromreelsgap);

lightning = new LightNing( );  
AF.Movie.root.addChild(lightning);

titanshow = new TitanShow();  
AF.Movie.root.addChild(titanshow);

lpsound = new LoopSound ();
AF.Movie.root.addChild(lpsound);

loopding = new LoopDing ();
AF.Movie.root.addChild(loopding);	


bWinTitle = new bigWinTitle();
AF.Movie.root.addChild(bWinTitle);
bWinTitle.y = game.ASSET_MANAGER.getAsset('reelbg.jpg').height;
bWinTitle.x =  71;


// win symbols

game.reelMan.showSymbols = reelManShowSymbols;  

symbolsmovie = new SymbolsMovie();
symbolsmovie.x = game.layout.REELS.x;
symbolsmovie.y = game.layout.REELS.y;
AF.Movie.root.addChild(symbolsmovie);  


symbolspopup = new SymbolsPopUp();
symbolspopup.x = game.layout.REELS.x;
symbolspopup.y = game.layout.REELS.y;
AF.Movie.root.addChild(symbolspopup);  




timerbox = new TimerBox();
AF.Movie.root.addChild(timerbox);

punchwall = new PunchWall();
AF.Movie.root.addChild(punchwall);

punchwallpng = new PunchWallPNG();
AF.Movie.root.addChild(punchwallpng);
 
introPanel = new IntroPanel();
introPanel.x = layout.SMALL_PANEL.x+26;
introPanel.y = layout.SMALL_PANEL.y;
AF.Movie.root.addChild(introPanel);

 introPanel2 = new IntroPanel2();
introPanel2.x = layout.SMALL_PANEL.x+26;
introPanel2.y = layout.SMALL_PANEL.y;
AF.Movie.root.addChild(introPanel2);

introPanel3 = new IntroPanel3();
introPanel3.x = layout.SMALL_PANEL.x+26;
introPanel3.y = layout.SMALL_PANEL.y;
AF.Movie.root.addChild(introPanel3);


randomSprayAnim = new RandomSprayAnim();
randomSprayAnim.setAnimConfig();

swordup = new SwordUp();
AF.Movie.root.addChild(swordup);

bigfive = new BigFive();
AF.Movie.root.addChild(bigfive);

 

summaryPanel = new SummaryPanel();
summaryPanel.x = 480;
summaryPanel.y = 90;
AF.Movie.root.addChild(summaryPanel);  

summaryPanel2 = new SummaryPanel2();
summaryPanel2.x = 480;
summaryPanel2.y = 90;
AF.Movie.root.addChild(summaryPanel2);  	

summaryPanelbg = new SummaryPanelBG();
summaryPanelbg.x = summaryPanel.x;
summaryPanelbg.y = summaryPanel.y;  

AF.Movie.root.addChild(summaryPanelbg);  


 titlemovie = new TitleMovie();
AF.Movie.root.addChild(titlemovie);

mybar = new MyBar();
 AF.Movie.root.addChild(mybar);



//electricbg
electricbg = new ElectricBG();
AF.Movie.root.addChild(electricbg);

 
randomSprayAnim = new RandomSprayAnim();
randomSprayAnim.setAnimConfig();

 
bgreels = new BgReels();
bgreels.x = game.layout.REELS.x - 52;
bgreels.y = game.layout.REELS.y - 4;  
AF.Movie.root.addChild(bgreels);

	
	
	game.api_drawSpecialSymbolBG = function () 
	{
		this.reelMan.drawSpecialSymbolBG(true);
	};  		
	
	game.api_processClickRelease = function(coords)
	{
 	};
	
	
	game.api_processClick = function(coords)
	{
		 if (introPanel.visible)
	   introPanel.processClick(coords);
 	};
	
	game.api_buttonsUp = function()
	{
 	};
	
	game.api_beforeFirstFreeGame = function () 
	{ 
 	};
	
  
     if(typeof restoreInfo.spinResult  != "undefined")
		game.api_processMsgEnd (restoreInfo.spinResult);
   
 	
};
// --------------------------------------------------------------------------- 
		
		game.uapi_showSpinBtn = function()
		{
		
		};
		
		game.uapi_showWinMeter = function() {};
		
		game.api_beginFeature = function()
		{
		  inFeature = true;
		};

game.api_processFeatureMsg = function (msgid,pairs) { 
        if(msgid=="FEATURE_START")
        {
         }
		 
        if(msgid=="FEATURE_PICK")
        {
                windowObj.sendMsgToServer("&MSGID=FEATURE_END&CFG=0&");
        }	
        else if(msgid=="FEATURE_END")
        {
                game.slotResult = game.processMsg(pairs,0);
                game.slotResult.bProcessed = true;
         }
        return false; 
}


var autoDelayAfterFeature = false;
game.api_autoDelayAfterFeature = function()
{
	return autoDelayAfterFeature || game.winMeterIncrementCounter<game.WIN_ROLLUP_TIME;
};


game.api_lastFreeGameFinish = function()
{
 autoDelayAfterFeature = true;

 timerbox.summary();
 
 };


 
game.api_drawBackground = function()
{
 	bgreels.draw(ctx);
};


 game.api_drawLowerLevelFeature = function()
{	
 
electricbg.draw(ctx);
 mybar.draw(ctx); 

if (layerchange) {
 //------wild animation--------
 symbolsmovie.draw(ctx);  
 swordup.draw(ctx);
titlemovie.draw(ctx);     
lightning.draw(ctx);
punchwall.draw(ctx);	 
punchwallpng.draw(ctx);	
 bigfive.draw(ctx);	
 }

};

//   TEXT MESSAGE HERE  ///
 
game.api_drawWinAnim = function()
{
//	console.log("layerchange--" + layerchange);
	
	
if (!layerchange) 
{
 symbolsmovie.draw(ctx);  
 swordup.draw(ctx);
titlemovie.draw(ctx);     
lightning.draw(ctx);
punchwall.draw(ctx);	 
punchwallpng.draw(ctx);	
 bigfive.draw(ctx);		
 
};
	
	
	
 symbolspopup.draw(ctx);   
randomSprayAnim.draw();
summaryPanelbg.draw(ctx);	
summaryPanel2.draw(ctx);
summaryPanel.draw(ctx);
randomSprayAnim.draw();
introPanel2.draw(ctx);
introPanel.draw(ctx);
introPanel3.draw(ctx);
bWinTitle.draw(ctx);	 
titanshow.draw(ctx);	


lightfromreelsgap.draw(ctx);
};



 
var inFeature = false
game.api_inFeature = function()
{
	return inFeature;
};

game.uapi_drawAnteChoiceBtn = function()
{
 }


var dada = 0.001;
game.api_featureUpdate = function(deltaTime)	 
{
/*	
	if(dada < 112.2) dada +=0.1; else  dada = 0.01;
 
 
   for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
 		    for(var s = 0; s < 13; s++){    
                var sym = game.reelMan.reels[i].slots[j].symbols[s];
 					sym.xOffset = [dada];
              }
        }
  }
 
 */
 
 
	
	
	if(deltaTime<100000)
    {
		AF.Movie.update(deltaTime);
     }
	
	randomSprayAnim.update(deltaTime);
};

var fgCW;
var soundRecovery = false;


game.playWinSounds = function()
{
game.setVolume(1);
var win = game.freeGames.m_bInFreeGames?  fgCW : this.slotResult.winAmount;
var bet = game.account.getBetAmount();

var isgofreegame  =   scatterReels[1] >=0 && scatterReels[2] >= 0 &&  scatterReels[3] >= 0  ; 

var isfg = game.freeGames.m_bInFreeGames ;

var isstopwin = false;

if(OAK &&  game.freeGames.m_bInFreeGames)  
{  
bigfive.init(); 
 isstopwin = true; 
}  	 
    
    
  if(win <= bet * 5 && !isgofreegame)
 { 
      if(!isstopwin) 
	  {
        electricbg.init();
 	   this.playSound(isfg? "dingding": "win1");  
		 
	  }   
 	 
  }   
  
 else if(win < bet * 10 && !isgofreegame)
 {    if(!isstopwin) 
      {
	  this.playSound(isfg? "dingding": "win2");
	  titlemovie.init();  
	  electricbg.init();
 	  }  
 		
 }   

else if(win >= bet * 10 && !isgofreegame) {
     if(!isstopwin) 
	 {
	   this.playSound(isfg? "dingding": "win2");
	   titlemovie.init();
	   electricbg.init();
       bWinTitle.init();
	    randomSprayAnim.init().startAnim();
	 }  
  	 }

// after 2nd wind up during FG, but not win 5 of kind 
else if(win >= bet * 2 && isgofreegame && game.freeGames.m_bInFreeGames) {
     if(!isstopwin) 
	 {
 		this.playSound('dingding');   
	   titlemovie.init();
	   electricbg.init();

	 }  
}	 
	 
  
 if(OAK)  OAK =false;
 
 };
 
  
game.api_playSpinSound = function () {
	   this.playSound('spin1'); 
 
	};  
   


 
game.playSound = function(soundID) {
    if(soundID == "spin")
        return;
     
	if(this.soundsLoaded && !this.mute) {
		this.stopSound();
		this.myPlayer.play(soundID);
	}
};



game.setVolume = function(volume)
{
	if(this.soundsLoaded)
	{
		//this.myPlayer.setVolume(volume);
	}
};
	
game.api_playFreeSpinSound = function(){
	 	 lpsound.stop(0); 
		 
	arguments.callee.i = arguments.callee.i || 0;
	this.playSound((arguments.callee.i++ % 2)? 'freespin2' : 'freespin1');
}


game.api_runSpinningStoppedFeature = function()
{    
}

 
game.updateFGAlpha = function (timeDelta) {
 
 
  var isgofreegame  =   scatterReels[1] >=0 && scatterReels[2] >= 0 &&  scatterReels[3] >= 0  ; 
  
  if( game.inRecovery ) { 	
  if(!isgofreegame)   this.FGAlpha = 1.0; 
  }
 
 if (this.bShowFreeSpinBg) {
	if (this.FGAlpha < 1.0) {
		this.FGAlpha += 0.05;
 
		
		if (this.FGAlpha >= 1.0) {
			this.FGAlpha = 1.0;
		}
	}
} else {
	if (this.FGAlpha > 0.0) {
		this.FGAlpha -= 0.05;
 
		
		if (this.FGAlpha <= 0.0) {
			this.FGAlpha = 0.0;
		}
	}
 }
};
 

 
game.api_spinningFeatureStopped = function()
{
 	afterFGdraw = false;
   
 if (scatterReels[1] >=0 && scatterReels[2] >= 0 &&  scatterReels[3] >= 0 && ! game.freeGames.m_bInFreeGames ) 
     {    lightning.scatterwildinit(); 
 	   }  

 if(!game.freeGames.m_bInFreeGames &&  game.slotResult.numFreeGames == 0)
     { game.setBShowFreeSpinBg(false);    }     
 
 
//retrigger freegame !!  BUG
if (game.slotResult.freeGamesWon && WT_FEATURE_TRIGGER && game.freeGames.m_bInFreeGames) {
   timerbox.retrigger();  
}    

	
firstspinFG	 = false;
 //windup
	windup = false;
    greyOutSymbols(false);
 	HighLightSymbols(false);
    wild_scatter = []; 
 
    for(i=0; i<5; ++i) {
     growSymbols[i].visible = false;
     growSymbols[i].stop(0);
	}
    
   return true;
};

 

game.api_startGame = function()
{
  game.idleTextTimer = game.idleTextTimer -2100;
};


game.api_stopWinAnims = function()
{
 };


game.api_spinStarted = function()
{	
  
 //reset message bar
 //setGamesRemainingString(!game.inRecovery, false);
 
 game.setVolume(1);
  lastwindup = 1 ;
  layerchange = false;
 
   symbolsmovie.visible = true;

for (i = 0; i < 5; i++) {
game.reelMan.reels[i].reelSpeed =  game.freeGames.m_bInFreeGames ? 75.001 : 88.001;
game.reelMan.reels[i].startSpin();  
 } 
 

	
//windup
    if(!game.inRecovery)
     {   totalScatters = 0;
	     scatterReels = [];
         wild_scatter = [];
 	 }
   
   
  if( game.inRecovery)  
	 myrecovery = true;
	 else  myrecovery = false;
     
 };


game.api_switchReels = function(freeGames)
{
  for(var i=0; i<(freeGames ? reelStripsFree : reelStrips).length; i++)
game.reelMan.setReelStrip(i,(freeGames ? reelStripsFree : reelStrips)[i]);
 };

 
game.api_changeOrientation = function () {
    this.ui.layout.WIN_METER = this.layout.WIN_METER;
    this.ui.layout.WIN_METER_BG = this.layout.WIN_METER_BG;
   this.ui.winMeter.setPosition(this.layout.WIN_METER);
   
//   this.ui.layout.INSUFFICIENT_FUNDS = {x:470 , y:10 };   
   
   
};


 
var scatterReels = [];
var wild_scatter = [];
var playcount = 0;
 
game.api_processMsgEnd = function(result)
{
    if (game.reelMan.reels == undefined) 
    {
        restoreInfo.spinResult = result;
        return;
    }
    
 
//windup

    if(game.inRecovery)
   {  totalScatters = 0;
   isfour = false;
   }
   
    
 first_a = 0; first_b = 0; first_c = 0;
 for (var row = 0;  row < 3; row ++ )
	 {
		  var rs5 = game.reelMan.reels[0].reelStrip;
		  var sp5 = parseInt(result.stops[0]) + row - 1;
		   if (sp5 > rs5.length) sp5 -= rs5.length;
		  if (sp5 < 0) sp5 += rs5.length;
			first_sym[row] = parseInt(rs5[sp5]);
	 }
 
     for(i = 0; i < 5; i++) {
        scatterReels[i] = -1;
		wild_scatter[i] = -1;   
		var ta=0; tb=0; tc =0; 
		  
        for(var row = 0; row < 3; ++row)
 		{
            var rs = game.reelMan.reels[i].reelStrip;
            var sp = parseInt(result.stops[i]) + row - 1;

            if (sp > rs.length) sp -= rs.length;
            if (sp < 0) sp += rs.length;

            var sym = parseInt(rs[sp]);
 				  if(  sym == 12 || sym == 0 || sym == 13 )
					 {	
						totalScatters++; 
						scatterReels[i] = row;
 					    wild_scatter[i] = sym;  
 					 }
					 
  	if(i < 4)	  
	 { 		 
	  if(  sym == first_sym[0] || sym == 13 ||  sym == 12 || sym == 0 )  {ta ++; first_a ++; }
	  if(  sym == first_sym[1] || sym == 13 ||  sym == 12 || sym == 0 )  {tb ++; first_b ++; }
	  if(  sym == first_sym[2] || sym == 13 ||  sym == 12 || sym == 0 )  {tc ++; first_c ++; }
	 } 
             } 
 		    if(ta >1 ) { first_a = first_a -1 ;}
			if(tb >1 ) { first_b = first_b -1 ;}
			if(tc >1 ) { first_c = first_c -1 ;}  
  };
  
 isfour = first_a > 3 || first_b > 3  || first_c > 3;  
 
 
 if (!game.freeGames.m_bInFreeGames ) {
 	   for(var i =0; i < scatterReels.length; i ++) {
 	 }
  }
  
 	
};   // end api_processMsgEnd

 

var overridenFunctions = {};
 
 
overridenFunctions.updateIdleMessage = game.updateIdleMessage;
game.updateIdleMessage = function(timeDelta)
{
	if(timeDelta<100000)
        overridenFunctions.updateIdleMessage.call(this,timeDelta);
}


restoreInfo.ABPM = false;
 

var featureID;
var nextFeatureID;
var realFeatureEnd = true;
overridenFunctions.processServerMsg = processServerMsg;
processServerMsg = function(msg)
{
	var pairs = msg.split("&");
    // console.log(pairs);
	for(var i=0;i<pairs.length;i++)
	{
		var pair = pairs[i].split("=");
		
		if( pair[0] == "MSGID" && 
			["INIT","BET","FEATURE_PICK","FREE_GAME"].indexOf(pair[1])<0)
		{
			overridenFunctions.processServerMsg.call(window,msg);
			return;
		}
	}

 
	
	realFeatureEnd = true;
	var NFG = -1;
	var TFG  = -1;
	var CFGG  = -1;
	var FS_0 = false;
	var IFG = false;	
	var FTV_1 = false;
 
 	var ABPM = false;
	for(var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf("=");
		var name = pairs[i].substr(0, pos);
		var value = pairs[i].substr(pos+1);
		switch(name)
		{
			case "ABPM":
				ABPM = !!value;
				break;

			case "IFG":
				IFG = !!value;
				break;
				
           case "WC":
		        var values = value.split("|");
				WINLINES = values[0];
	 
				break;	
				
			
			case "CW":
				fgCW = Number( value)
				break;

            case "RB":
				restoreInfo.reelsSelected = Number( value)
				break;

			case "FID":
                if(value == "0|1|")
                    realFeatureEnd = false;

				var values = value.split("|");

				if (values[0] != "")
					featureID = Number(values[0]);
				if (values[1] != "")
					nextFeatureID = Number(values[1]);
				else
					nextFeatureID = -1;
				break;

			case "GSD":
                var v = value.split("~")[0];
  		     	if(v == "OAK")  OAK = true;
 				break;
			
			case "NFG":
				NFG = Number(value)
				break;
			case "TFG":
				TFG = Number(value)
				break;
			case "CFGG":
				CFGG = Number(value)
				break;
				
			case "FS_0":
				FS_0 = Number(value)
				break;

			case "FTV_1":
				FTV_1 = true;
		}
	}

	overridenFunctions.processServerMsg.call(window,msg);

	if(game.inRecovery)
	{
        soundRecovery = true;
		restoreInfo.ABPM = ABPM;
		inFeature = IFG;
 
	}
        
    var win = game.freeGames.m_bInFreeGames?  fgCW : game.slotResult.winAmount;
    var bet = game.account.getBetAmount();
 
};

overridenFunctions.recover = game.recover;


game.recover = function()
{
    overridenFunctions.recover.call(this);
    createPaylineTexture2();
};


 

function HideScatterWild(firstspinFG) 
{
	var value = firstspinFG;
	if(value) 
{
      for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
 		    for(var s = 0; s < 13; s++){    
                var sym = game.reelMan.reels[i].slots[j].symbols[s];
				if(s == 0 || s ==12) 
				sym.alpha = [0];
				else 
				sym.alpha = [1];
  
            }
        }
    }	
 }
};

 

Slot.prototype.drawSpecialSymbolBG = function(x,y)
{
 if (  game.freeGames.m_bInFreeGames && this.currentSymbol == 13)  
 	{
 		ctx.drawImage(game.wildTop, x, y-75);
		ctx.drawImage(game.wildBottom, x, y+150);
	}
   else if (firstspinFG && (this.currentSymbol == 0 || this.currentSymbol == 12)) 
 	{   HideScatterWild(firstspinFG) ;
 		ctx.drawImage(game.wildTop, x, y-75);
		ctx.drawImage(game.wildBottom, x, y+150);  
	}
	
	   else if (afterFGdraw  && this.currentSymbol == 13) 
 	{    
 		ctx.drawImage(game.wildTop, x, y-75);
		ctx.drawImage(game.wildBottom, x, y+150);  
	}  
  }

 
 
 
