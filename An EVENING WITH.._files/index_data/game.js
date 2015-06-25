game.account.setNumPaylines(25,25);	 
game.defaultStops = [20,12,6,1,1];		 
var RTP_VALUE = ['95.083%'];
game.account.superbet = 5;
 
var languagePath = 'language/' + windowObj.languageCode + '/';
//32;6;12;6;28
var aSpinSounds = [ "spin1", "spin2", "spin3", "spin4", "spin5", "spin6", "spin7", "spin8", "spin5" ];
var gAudioSettings = {
	resources: [ 'HollyMadison-HTML5_Sound.m4a', 'HollyMadison-HTML5_Sound.mp3', 'HollyMadison-HTML5_Sound.wav' ],

	spritemap: { 'click':  { 'start': 0.999, 'end': 1.713 },
				 'spin1':  { 'start': 2.555, 'end': 6.997 },
				 'spin2':  { 'start': 7.980, 'end': 12.212 },
				 'spin3':  { 'start': 13.179, 'end': 17.893 },
				 'spin4':  { 'start': 18.843, 'end': 23.665 },
				 'spin5':  { 'start': 24.569, 'end': 29.096 },
				 'spin6':  { 'start': 30.059, 'end': 34.613 },
				 'spin7':  { 'start': 35.674, 'end': 40.169 },
				 'spin8':  { 'start': 41.453, 'end': 45.842 },
				 'win1':  { 'start': 46.799, 'end': 48.456 },
				 'win2':  { 'start': 49.433, 'end': 52.066 },
				 'win3':  { 'start': 55.043, 'end': 57.314 },
				 'win4':  { 'start': 58.291, 'end': 65.288 },
				 'expwild':  { 'start': 66.284, 'end': 67.679 },
				 'rollupshort':  { 'start': 70.699, 'end': 73.255 },
				 'rolluplong':  { 'start': 68.695, 'end': 73.255 },
				 'srs1':  { 'start': 74.349, 'end': 75.181 },
				 'srs2':  { 'start': 76.190, 'end': 77.251 },
				 'srs3':  { 'start': 78.306, 'end': 79.957 },
				 'srs4':  { 'start': 80.973, 'end': 82.604 },
				 'srs5':  { 'start': 83.574, 'end': 85.205 },
				 'respinscratch':  { 'start': 86.175, 'end': 87.963 },
				 'respinloop':  { 'start': 88.946, 'end': 96.965 },
				 'windup':  { 'start': 97.935, 'end': 101.545 },
				 'whizby':  { 'start': 102.508, 'end': 103.216 },
				 'freeloop': { 'start': 104.205, 'end': 115.186, 'loop': true},
				 'kisssrs': { 'start': 116.116, 'end': 119.051 },
				 'dingaction': { 'start': 120.001, 'end': 121.298 },
				 'camera': { 'start': 122.294, 'end': 123.926 },
				 'pickloop': {'start': 124.931, 'end': 132.944, 'loop': true},
				 'pickwin':  {'start': 133.933, 'end': 135.660},
				 'imnotwearingthat':  {'start': 136.728, 'end': 138.185},
				 'notinthemoodforthatone':  {'start': 139.178, 'end': 140.593},
				 'pickagain':  {'start': 141.589, 'end': 142.693},
				 'nicewin':  {'start': 143.656, 'end': 144.901},
				 'letstryagain':  {'start': 145.900, 'end': 147.109},
				 'thatwasfun':  {'start': 148.088, 'end': 149.258},
				 'letswinsomemore':  {'start': 150.208, 'end': 151.777},
				 'meetyouatthephotoshoot':  {'start': 152.737, 'end': 154.836},
				 'seeyouatthenextshoot':  {'start': 155.813, 'end': 157.962}
				 
				 }
};
 
// ---------------- Assets -------------------------------
game.ASSET_MANAGER.queueFiles([
		'reelbg.jpg',
		'reelbgfree.jpg',
		'gamename.png',
		'symbols.png',
		'elements.png',
		'panel.jpg',
		'panel.png',
		'buttons_ui.png',
		'frame.png',
		'turndevice.png',
		'coin.png',
		'paylinesend.png', 
		'expwild_left.png','expwild_middle.jpg','expwild_right.png',
		'mirror.png',
		'scatterPay.png',
		'titleanimation.png',
		'photoshot/photoshotbg.jpg',  'photoshot/changeroom.jpg',
		'photoshot/mirrorbig.png','photoshot/changeroom.jpg','photoshot/arrow.png','photoshot/SkipBtn.png',
		'BG_Pattern_free.jpg', 
		'transition_half.png','transition_half_top.png',
		'twolights.png',
		'doubleclick.png','hipbump.png', 'starflash.png',
		'sparkly_element.png','hm_kiss_lip.png',
		'sparkleBurst.png' ,'numberbg.png' , 'whizzby.png', 'holly_kiss.png', 'kiss_reel_effect_half.png',
		'photoshot/0.png','photoshot/000.png','photoshot/01.jpg','photoshot/02.jpg','photoshot/03.jpg',
		'photoshot/1.png','photoshot/111.png','photoshot/11.jpg','photoshot/12.jpg','photoshot/13.jpg',
		'photoshot/2.png','photoshot/222.png','photoshot/21.jpg','photoshot/22.jpg','photoshot/23.jpg',
		'photoshot/3.png','photoshot/333.png','photoshot/31.jpg','photoshot/32.jpg','photoshot/33.jpg',
		'photoshot/4.png','photoshot/444.png','photoshot/41.jpg','photoshot/42.jpg','photoshot/43.jpg',
		'photoshot/5.png','photoshot/555.png','photoshot/51.jpg','photoshot/52.jpg','photoshot/53.jpg',
		'photoshot/6.png','photoshot/666.png','photoshot/61.jpg','photoshot/62.jpg','photoshot/63.jpg',
		'photoshot/7.png','photoshot/777.png','photoshot/71.jpg','photoshot/72.jpg','photoshot/73.jpg',
		'photoshot/8.png','photoshot/888.png','photoshot/81.jpg','photoshot/82.jpg','photoshot/83.jpg',
		'photoshot/9.png','photoshot/999.png','photoshot/91.jpg','photoshot/92.jpg','photoshot/93.jpg',
		'photoshot/hollyicon.png',
		'photoshot/nowin.png',
		languagePath + 'BigWin.png'
		]);
 

// ---------------- slots ---------------------
/*var reelStrips = [
[3,7,11,6,12,9,4,7,8,13,7,8,4,11,7,5,8,12,4,8,11,6,9,12,5,8,12,6,9,10,4,9,10,5,12,9,6,10,7,5,12,9,6,10],
[11,12,0,11,12,6,11,12,3,9,12,13,9,12,3,9,12,6,9,12,5,10,12,4,10,11,5,7,10,6,8,7,5,8,12,6,7,8,5],
[6,9,8,5,7,12,1,7,12,3,8,9,5,10,11,13,10,11,4,8,11,6,7,8,3,11,5,9,3,8,11,4,10,11,5,10,6,7,4,9,12,6,9,5,7,12],
[11,12,2,11,12,3,9,10,6,7,10,5,10,8,13,10,8,4,12,9,6,8,7,5,12,9,4,7,6,12,4],
[3,9,7,6,9,4,10,11,5,9,10,6,11,12,4,8,9,6,11,5,10,4,9,8,6,11,5,8,10,4,8,6,7,11,3,10,11,13,10,11,4,9,10,6,9,8,5,7,11,6,9,3,10,4,8,9,6,7]
];

// in free games, got a respin, have to use this reelstrip, with no KISS 
var reelStripsRespin = [
[3,7,11,6,12,9,4,7,8,13,7,8,4,11,7,5,8,12,4,8,11,6,9,12,5,8,12,6,9,10,4,9,10,5,12,9,6,10,7,5,12,9,6,10],
[11,12,0,11,12,6,11,12,3,9,12,13,9,12,3,9,12,6,9,12,5,10,12,4,10,11,5,7,10,6,8,7,5,8,12,6,7,8,5],
[6,9,8,5,7,12,1,7,12,3,8,9,5,10,11,13,10,11,4,8,11,6,7,8,3,11,5,9,3,8,11,4,10,11,5,10,6,7,4,9,12,6,9,5,7,12],
[11,12,2,11,12,3,9,10,6,7,10,5,10,8,13,10,8,4,12,9,6,8,7,5,12,9,4,7,6,12,4],
[3,9,7,6,9,4,10,11,5,9,10,6,11,12,4,8,9,6,11,5,10,4,9,8,6,11,5,8,10,4,8,6,7,11,3,10,11,13,10,11,4,9,10,6,9,8,5,7,11,6,9,3,10,4,8,9,6,7]
];

var reelStripsFree = [
[3,7,11,6,12,9,4,7,8,13,7,8,4,11,7,5,8,12,4,8,11,6,9,12,5,8,12,6,9,10,4,9,10,5,12,9,6,10,7,5,12,9,6,10],
[11,12,0,11,12,6,11,12,3,9,12,13,9,12,3,9,12,6,9,12,5,10,12,4,10,11,5,7,10,6,8,7,5,8,12,6,7,8,5],
[6,9,8,5,7,12,1,7,12,3,8,9,5,10,11,13,10,11,4,8,11,6,7,8,3,11,5,9,3,8,11,4,10,11,5,10,6,7,4,9,12,6,9,5,7,12],
[11,12,2,11,12,3,9,10,6,7,10,5,10,8,13,10,8,4,12,9,6,8,7,5,12,9,4,7,6,12,4],
[3,9,14,6,9,4,10,14,5,9,10,6,11,14,4,8,9,6,14,5,10,4,9,8,6,11,5,14,10,4,8,6,7,11,3,10,11,13,10,11,4,9,14,6,9,8,5,7,11,6,14,3,10,4,8,9,6,7] 
];
*/
var communicator = new nggSlotCommunicator();
var RID = null;
var NRID = null;
var RSid = "0";
var PWIN = "0";
var FID = null;
//var reelStrips = [];
var reelStripChanges = [];

var feature	= null;
var aScatterCount = [];
var totalScatterAnims = 0;

var spinningFeatureStopped = true;
var totalScatters = 0;
var scatterReels = [];
 
var cageReels = [];
var whizByAnimations = [];
var whizByContainer;
var growSymbols;
 
var greyOutState = false;
var mywild =[];
var inPickFeature = false;
var touchMeAnim;
var bigWinTitle;
var pickedNum = 0;
var SSS_RECOVER = null;
var CFGG = null;


//------------------ Test Functions -----------------------------------
var test = function()
{
	$("input[name='stops']").val("1;1;9;3;42");   // 15;12;16;1;1    respin   // 35;16;13;30;26 kiss
};

var test2 = function() 
{
	$("input[name='stops']").val("9;10;15;1;1");    // fee games 10;12;16;1;1
	// 3 WILDS 1;1;6;3;42    // respin 15;12;16;1;1
};

var symTextures = [], symSprites = [], symAnims = []; 
for (var i=0; i<22; i++)       
{
	symTextures.push('symbols.png');
	
	if(i >= 13 && i <= 15)symSprites.push([ {x:142*13,y:0,w:142,h:142} ]);
	else if(i >= 16 && i <= 21)symSprites.push([ {x:142*14,y:0,w:142,h:142} ]);
	else symSprites.push([ {x:142*i,y:0,w:142,h:142} ]);
	
	symAnims.push( [ {t:0} ]);    
}

var overridenFunctions = {};
var triAnimWin;
var freeGameIntro;
var freeGameWinSummary;
var autoDelayAfterFeature = false; 
var spinningFeatureStopped = true;
var winPickMeInLastFreeGame = false;
var randomSprayAnim;
var dynMask = 290;

var initAssets = function()
{  apiExt("SET_MENU_BTN_SWITCH",false);
	
	game.meters.setBackground( [{p:0.0,col:'#6C2B8D'}, {p:1.0,col:'#220D4D'} ]);
	game.meters.setFontColour( '#D9DC1F','#ffffff');
	
	game.layout.generatePaylineVectors();
	
	//game.playSound("click");
	
/*	if (feature == null)
	{
		PPfeature	= new PickFeature();
	}
	PPfeature.init();*/
	
	game.messageBar.align   = "center";
	game.messageBar.font    = MESSAGE_BAR_FONT;	//Language specific - see language.js
	game.messageBar.m_Text  = TXT_SCROLL_MESSAGES[0];	
	game.imageReelBG       = game.ASSET_MANAGER.getAsset('reelbg.jpg');
	game.imageReelBGfree   = game.ASSET_MANAGER.getAsset('reelbg.jpg');//game.ASSET_MANAGER.getAsset('reelbgfree.jpg');
	game.imageGameName     = null;
	game.imagePandaGameName= game.ASSET_MANAGER.getAsset('gamename.png');
 	game.imageNameAnim	   = game.ASSET_MANAGER.getAsset('titleanimation.png');
	game.imageFrame 	   = game.ASSET_MANAGER.getAsset('frame.png');
	game.imageSymbols      = game.ASSET_MANAGER.getAsset('symbols.png');
	game.imageTurnDevice   = game.ASSET_MANAGER.getAsset('turndevice.png');
	game.imageSprayAnim    = game.ASSET_MANAGER.getAsset('coin.png');
    game.imagePaylineEnds = game.ASSET_MANAGER.getAsset('paylinesend.png');
	game.ui.initAssets();
    game.ui.imgPanel = game.ASSET_MANAGER.getAsset('panel.jpg');
	game.reelMan = new ReelManager();
	
	//for(var i=0; i < reelStrips.length; i++)
	//game.reelMan.setReelStrip(i,reelStrips[i]);

	overridenFunctions.updateReelManager = game.reelMan.update;
	game.reelMan.update = reelManagerUpdate;
	
	//Getting Reels from server via communicator
	for(var id=0; id<5; id++){
		reelStripChanges[String(id)] = communicator.getMarker("RST_"+id);
		for(var j=0; j<5; j++){
			//console.log(">>>>>>> RST_id"+id+" = "+reelStripChanges[String(id)][j]);
		}
		//console.log(" ");
		//reelStripChanges["1"] = communicator.getMarker("RST_1");
	};
	
	if(!game.inRecovery){
			RSid = "0";
			for(var i=0; i<5; i++)
        	game.reelMan.setReelStrip(i,reelStripChanges["0"][i]);
			//console.log(">>>>>>>> switch regular");
		}
		else if(game.inRecovery && RID==2){ //recovery so kisses don't show that may have landed.
			for(var i=0; i<4; i++)
        	game.reelMan.setReelStrip(i,reelStripChanges[String(RID)][i]);
			//5th reel kisses
			game.reelMan.setReelStrip(i,reelStripChanges[String(0)][4]);
			//console.log(">>>>>>>> switch kiss real");
		} else {
			for(var i=0; i<5; i++)
        	game.reelMan.setReelStrip(i,reelStripChanges[String(RID)][i]);
			//console.log(">>>>>>>> switch regular recovery");
		};
	
	whizByContainer = new AF.Container();
    AF.Movie.root.addChild(whizByContainer);
		 
 	for(i = 0; i < 5; i++) 
 	{
		  var whizby = new WhizByAnimation();
		  whizby.visible = false;
		  whizby.x = game.layout.REELS.x + i*(game.layout.symbolHeight + game.layout.reelGap);
		  whizby.y = game.layout.REELS.y;
		  
		  whizByContainer.setMask(0, game.layout.REELS.y, game.imageReelBG.width, game.layout.symbolHeight*3);
		  
		  whizByContainer.addChild(whizby);
		  whizByAnimations.push(whizby);
    }
	
  //  overridenFunctions.showSymbols = game.reelMan.showSymbols;
  //  game.reelMan.showSymbols = reelManShowSymbols;

	titlemovie = new TitleMovie();
	AF.Movie.root.addChild(titlemovie);
	
	bigWinTitle = new BigWinAnim();
	bigWinTitle.y = game.ASSET_MANAGER.getAsset('reelbg.jpg').height;
	bigWinTitle.x = (game.ASSET_MANAGER.getAsset('reelbg.jpg').width/2-215);
		 
	fgbg = new FGBG();
	AF.Movie.root.addChild(fgbg);
		
	growKiss = new GrowKiss();
	AF.Movie.root.addChild(growKiss);  
		
	symbolsmovie = new SymbolsMovie();
	symbolsmovie.x = game.layout.REELS.x;
	symbolsmovie.y = game.layout.REELS.y;
	AF.Movie.root.addChild(symbolsmovie);  
				
	holdreels = new HoldReels();
	AF.Movie.root.addChild(holdreels); 
		
	lastReelAnim = new LastReelAnim();
	AF.Movie.root.addChild(lastReelAnim); 
		 
	lastReelAnimRespin = new LastReelAnim();
	AF.Movie.root.addChild(lastReelAnimRespin);  

	respinAnim = new RespinAnim();
	respinAnim.y = -25;
	AF.Movie.root.addChild(respinAnim); 
		
	wildsMovie = new WildsMovie();
	AF.Movie.root.addChild(wildsMovie); 

//candyScatter = new CandyScatter();
//AF.Movie.root.addChild(candyScatter); 

	photoShoot = new PhotoShoot();
	AF.Movie.root.addChild(photoShoot); 
	
	mirrorShow = new MirrorShow();
	AF.Movie.root.addChild(mirrorShow); 
	
	dressShow = new DressShow();
	AF.Movie.root.addChild(dressShow); 
	
	hollyWalkIn = new HollyWalkIn();
	hollyWalkIn.setMask(290, 0, 440, 700);
	AF.Movie.root.addChild(hollyWalkIn); 
	
	takeaPhoto = new TakeaPhoto();
	AF.Movie.root.addChild(takeaPhoto); 
	 
	girlWildShow = new GirlWildShow();
	AF.Movie.root.addChild(girlWildShow); 
		
	hulaWildMovie = new HulaWildMovie();
	AF.Movie.root.addChild(hulaWildMovie); 
			
	freeGameIntro = new AF.Movie();
	AF.Movie.root.addChild(freeGameIntro);
	
	touchMeAnim = new TouchMeAnim();
	AF.Movie.root.addChild(touchMeAnim);
 
	freeGameIntro.introPanel = new IntroPanel();
	freeGameIntro.introPanel.visible = false;
	freeGameIntro.addChild(freeGameIntro.introPanel);
	
	freeGameWinSummary = new AF.Movie();
	AF.Movie.root.addChild(freeGameWinSummary);
	
	freeGameWinSummary.summaryPanel = new SummaryPanel();
	freeGameWinSummary.summaryPanel.visible = false;
	freeGameWinSummary.addChild(freeGameWinSummary.summaryPanel);
	
	randomSprayAnim = new RandomSprayAnim();
	randomSprayAnim.setAnimConfig();

 	// game.GDMUpdateWin = GDMUpdateWin;
	if( game.inRecovery ) 
 	{    
        //console.log("inRecovery--add recovery functions here");
 	   if( game.featureStarted )	
	   {
		   numWinLinesTemp = game.slotResult.numWinningPaylines;
		   payWinsTemp = game.slotResult.paylineWins;
		   payWinsTemp2 = game.slotResult.paylineWins2;
		   photoShoot.recoveryLaunch(); 
	   }
	}
	
	var IF_Text_Format = {
	"custom": {
		"align": "center",
		"m_Color": "#D8D8D8",
		"font": {
			"fontStyle": null,
			"fontWeight": null,
			"fontSize": WIN_METER_FONT,  //46px
			"fontFamily": "arial"
		},
		
		"stroke_0_Color": "#00BFFF", // #424242
		"stroke_0_Width": "2",
		"stroke_1_Color": null,
		"stroke_1_Width": null,
		"gradient_x0": null,  // relative positions
		"gradient_y0": null,
		"gradient_x1": null,
		"gradient_y1": null,
		"colorStop_0": null,
		"colorStop_1": null,
		"colorStop_2": null,
		"max_width": null
		}
	};
	//game.ui.winMeter.m_Color = '#E6E6E6';
	game.ui.winMeter.setFormat(IF_Text_Format.custom); 
};

//--------------------------Game API Definitions----------------  
game.api_drawBackground = function()
{ 
	fgbg.draw(ctx);
	lastReelAnim.draw(ctx);
}; 

game.api_drawLowerLevelFeature = function()
{
	whizByContainer.draw(ctx); 	
	titlemovie.draw(ctx);  
	holdreels.draw(ctx);
  	lastReelAnimRespin.draw(ctx);
	//PPfeature.draw();	
    game.ui.btnLineUp.isDisabled = true;
	game.ui.btnLineDown.isDisabled = true;
    game.ui.btnLineUp.visible = false;
	game.ui.btnLineDown.visible = false;
	symbolsmovie.draw(ctx);	  
};

game.api_drawFeature = function()
{
	// on top of payline
	wildsMovie.draw(ctx);
	hulaWildMovie.draw(ctx);
	girlWildShow.draw(ctx);   // click left..click right
};
 
game.api_drawWinAnim = function()
{
	photoShoot.draw(ctx);
	mirrorShow.draw(ctx);
	dressShow.draw(ctx);
	touchMeAnim.draw(ctx);
	hollyWalkIn.draw(ctx);	
	takeaPhoto.draw(ctx);
	growKiss.draw(ctx);
	freeGameIntro.draw(ctx);
	freeGameWinSummary.draw(ctx);
	randomSprayAnim.draw();
	bigWinTitle.draw(ctx);
	respinAnim.draw(ctx);
};

game.api_resetWinMeterTimer = function()
{
	if(this.slotResult.winType & WT_PICK_FEATURE_TRIGGER)
	{
		//this.winMeterIncrementCounter 	= 1000;	
		//this.winMeterDisplayCounter = 1000;
		game.WIN_METER_DISPLAY_TIME = 3500;
	}
};

overridenFunctions.uapi_betUp = game.uapi_betUp;
game.uapi_betUp = function(cycle)
{
	hulaWildMovie.afterSetting();
 	overridenFunctions.uapi_betUp.call(this, cycle);
	this.snapWinMeter();
};

overridenFunctions.uapi_betDown = game.uapi_betDown;
game.uapi_betDown = function(cycle) 
{
	hulaWildMovie.afterSetting();
	overridenFunctions.uapi_betDown.call(this, cycle);
	this.snapWinMeter();
};

game.api_startGame = function()
{
	// hollyWalkIn.play(0);
  	 //takeaPhoto.start(0);
	// 	freeGameIntro.introPanel.visible = true;
	//	freeGameIntro.introPanel.play(0);	
	// respinAnim.playme();
	
	//hollyWalkIn.init(6);
	
	/*setTimeout(function(){
		 //dressShow.FlywinSpeak();
    	//game.ui.btnSpin.setPosition(game.layout.SPIN_BTN2); 
	
		 // recovery
		//if (!game.ui.state) 
		//	  game.ui.btnSpin.setPosition(game.ui.layout.SPIN_BTN); 	
 		}, 5500)	*/
	
   if(game.inRecovery)
   {
    isJustRecovery =1;
    //fgbg.setbg(); 
   };
 
	//  mirrorShow.show(); 	
	//	mirrorShow.show();
	// girlWildShow.init();  	
  	// respinAnim.play(0);
	
 	/*if(!game.inRecovery)
       CFP_HL = 1;
    else
	   console.warn("CFP_HL--" + CFP_HL);
   */
 	// candyScatter.playme();
 	//	randomSprayAnim.init().startAnim();
	//  hulaWildMovie.init(2);     // which one to be play, 0 first one, 1 second
};

game.api_spinStarted = function()
{
	//growKiss.play(0);
	middlePlayed = false;
	reelStops = [0,0,0,0,0];
	fadeinout  = 0 ;
	wildplaying = 0;
	
	
	if (!game.inRecovery){
        totalScatters = 0;
        scatterReels = [];
		hulaWildMovie.endme();
    }
	
	if(game.inRecovery){
		//console.log(">>>>>> RECOVER WILDS 1 ");
		SSS_HL = SSS_RECOVER;
		for(i=0; i<5; i++)
		{
			for(var k = 0; k < wildreel.length; k++)
			{  
				//console.log(">>>>>> RECOVER WILDS 2 - SSS_RECOVER = "+SSS_RECOVER); 
				var member = wildreel[k];
				if( SSS_RECOVER != null && i == member +1 )//
				{   
					var mypos = Number(SSS_RECOVER[k].split(";")[1]) ;
					
						mywild[member].init(mypos);
 				    	hulaWildMovie.init(member);
								
				}
			}
		}
		fgbg.showbg(true);
		numWinLinesTemp = game.slotResult.numWinningPaylines;
		payWinsTemp = game.slotResult.paylineWins;
		payWinsTemp2 = game.slotResult.paylineWins2;
		//console.log(">>>>>> numWinLinesTemp on Spin started "+numWinLinesTemp);
		

		/*if(FID == "2|" && CFGG==0)
		{
			freeGameIntro.introPanel.visible = true;
			freeGameIntro.introPanel.play(0);
		}*/
	}
	
	if(game.freeGames.m_bInFreeGames && !isRespin && isJustRecovery)
    { 
		if(mirrorShow.time <=0)mirrorShow.show();
	  
		//if(TKS_HL)
	 	// mirrorShow.turnOnWhiteLights(TKS_HL);
	}
};

game.api_startSpinAction = function()
{
	srs = 0;
	reelStops = [0,0,0,0,0];
	if(holdreels.held)holdreels.visible = true;
	//if(!game.isSoundPlaying() && game.freeGames.m_bInFreeGames && !isRespin)game.playSound('freeloop');
	//after message received
 	//freeGameWinSummary.summaryPanel.init();
	var i;
	for(i=0; i<mywild.length; i++)
	{
		mywild[i].played = false;
	}
};

game.api_fastFeatureTransition = function()
{    
  
};

game.api_runSpinningStoppedFeature = function()
{  
	girlWildShow.kiss();
	//if(getScattersCountBeforeReel(5)<=2 || !HR_HL[0] || !game.freeGames.m_bInFreeGames )
  	
	if(!game.slotResult.IFG && game.slotResult.numFreeGames ==1) 
 	    isBaseGameRespin = 1;	
	else if(game.slotResult.IFG && game.slotResult.numFreeGames >1)
		isBaseGameRespin = 0;	
   
   //console.log(">>>>>> game.slotResult.IFG "+game.slotResult.IFG+" isJustRecovery "+isJustRecovery+" isBaseGameRespin "+isBaseGameRespin);
	//if( isBaseGameRespin && getScattersCountBeforeReel(5)<=2 && !HR_HL[0] && !isJustRecovery  )
	if( isBaseGameRespin && getScattersCountBeforeReel(5)<=2 && !HR_HL[0]  )
    {  
		//console.log(">>>>>>>> **** CLOSE FG BACKGROUND **** <<<<<<<<<<<<");
	  fgbg.closebg();  
    }
	
	if(game.freeGames.m_bInFreeGames)
 	{
		/*console.log(">>>>>>> **** kiss reel switch");
		var lastStrip = [3,9,7,6,9,4,10,11,5,9,10,6,11,12,4,8,9,6,11,5,10,4,9,8,6,11,5,8,10,4,8,6,7,11,3,10,11,13,10,11,4,9,10,6,9,8,5,7,11,6,9,3,10,4,8,9,6,7] ;

 		KissSym[0] = -1;

	    for(i = 4; i < 5; i++) 
	   	{
         	for(var row = 0; row < 3; ++row){
            		var rs = game.reelMan.reels[i].reelStrip;
             		var sp = parseInt(game.slotResult.stops[i]) + row - 1;

             		if (sp > rs.length) sp -= rs.length;
            		if (sp < 0) sp += rs.length;
					
            		var sym = parseInt(rs[sp]);
 			  		
					//if(sym == 14)
					if(sym > 15)
					{
 			  			KissSym[0] = parseInt(row);
			  			KissSym[1] = parseInt(lastStrip[sp]);
						//KissSym[1] = parseInt(rs[sp]);
						console.log(">>>>>> replaceing syms");
			   			break;
  					}
        	 }
		}*/
   		//	if(reelkiss > -1)
		//  alert(reelkiss);
 	}
	// Only in summary panel Closed again after the end of fg
	//console.warn("KissSym[0]--> " + KissSym[0] + "  KissSym[1]-->" + KissSym[1]);
 
 	if( KissSym[0] >= 0) 
	{
		for(var j = 1; j < 4; j++)
		{
        	var thesym = game.reelMan.reels[4].slots[j];
			var tmp =	 KissSym[0] +1 ;
			//console.log(tmp);
			 
			if( j == tmp)
			{ 
 				thesym.setSymbol(KissSym[1]);
				//console.log(">>>>>> swicth symbols kisses***");
  		   	}
			//	 break;
		}
	}
    // wildsMovie.stopwilds(); 
};

game.api_spinningFeatureStopped = function()
{  
	//hulaWildMovie.setALLWilds(3);
	//hulaWildMovie.syncWilds();
	//console.log(">>>>>> autoplayDelayEnabled "+autoDelayAfterFeature);
	respinJustBegin = false;
	srs = 0;
 	//if(!game.isSoundPlaying() && game.freeGames.m_bInFreeGames && !isRespin)game.playSound('freeloop');  //FID[0]!=0
 	if(!game.freeGames.m_bInFreeGames && game.slotResult.numFreeGames == 0   )
	{
		game.setBShowFreeSpinBg(false);    
    }     

	//If there are two change wild, SSS The long string of 8 SSS[8]
	/* 
 		if(game.featureStarted)
		game.startFeature();
	*/
 
 	// windup
 	//greyOutSymbols(false);
    for(i=0; i<5; ++i)
    {
        growSymbols[i].visible = false;
        growSymbols[i].stop(0);
    }
  	holdreels.init();  	
  
  	return spinningFeatureStopped  
};

overridenFunctions.playSpinSound = game.playSpinSound;
var sSpinPlaying = 0;
game.playSpinSound = function()
{
		if(!game.freeGames.m_bInFreeGames){
			game.stopSound();
			
			if(sSpinPlaying < 9)
			{
				game.stopSound();
				game.playSound(aSpinSounds[sSpinPlaying]);
				sSpinPlaying++;
			}
			else
			{
				game.stopSound();
				sSpinPlaying = 0;
				game.playSound(aSpinSounds[sSpinPlaying]);
			}
		}
		
		if(isRespin){
			if(game.isSoundPlaying){
				game.stopSound();
				game.stopSound();
			}
			game.playSound('respinloop');
		}
};

game.api_lastFreeGameFinish = function()
{ 	
	//game.freeGames.m_bInFreeGames = false;
 	//autoDelayAfterFeature = true;
	game.messageBar.m_Text = "";
};

game.api_beforeFirstFreeGame = function()
{
		if (FID[0]== "2" && mirrorShow.time <=0)		// if we are not in free games yet. FID_HL == "2"
		{
			//game.reelMan.stopAnims();
			//symbolsmovie.stopAnims();
			freeGameIntro.introPanel.visible = true;
			freeGameIntro.introPanel.play(0);
			game.stopSound();
			game.stopSound();
			game.playSound("freeloop");	
		} 
		else 									// already in free games so don't show the intro screen.
		{
			this.startSpin();
		}
};

/*game.api_processClick = function(coords)
{
	// photoShoot.processClickRelease(coords);
}*/


game.api_processClickRelease = function(coords)
{
 	if(photoShoot.visible)photoShoot.processClickRelease(coords);
	if(freeGameIntro.introPanel.visible)freeGameIntro.introPanel.processClickRelease(coords);
};

game.api_buttonsUp = function()
{
 
};

game.api_changeOrientation = function()
{
	this.ui.layout.WIN_METER = this.layout.WIN_METER;
    this.ui.layout.WIN_METER_BG = this.layout.WIN_METER_BG;
	this.ui.winMeter.setPosition(this.layout.WIN_METER);
};

game.api_animateWins = function()
{
	symbolsmovie.animasStart();
}; 

game.api_stopWinAnims = function()
{
 	symbolsmovie.stopAnims();
};

game.api_autoDelayAfterFeature = function()
{
	return autoDelayAfterFeature;
};

// earlier than api_featureStart
game.api_beginFeature = function()
{
 	//console.log("api_beginFeature,  set Trigger timer delay");
    game.freeGames.m_TriggerTimer = 500;   
	// photoShoot.FeatureStart();      
};

game.api_IsBonusFeatureTriggered = function()
{
	// trigger LAUNCH animation
	// console.log("api_IsBonusFeatureTriggered");
};

var payWinsTemp = null;
var payWinsTemp2 = null;
var numWinLinesTemp = null;
game.api_featureStart = function()
{  
	numWinLinesTemp = game.slotResult.numWinningPaylines;
	payWinsTemp = game.slotResult.paylineWins;
	payWinsTemp2 = game.slotResult.paylineWins2;
	
	//console.log(">>>> numWinLinesTemp = "+numWinLinesTemp);
	//console.log(">>>> payWinsTemp = "+payWinsTemp);
	
	sendFeatureStartMsg();
	inPickFeature = true;
};

game.api_processFeatureMsg = function(msgid,pairs)
{
	var result = false;
	var tmp = myCFP -2;
	var str;
	var srch;
	
	switch(msgid)
	{
		case "FEATURE_START":
        	photoShoot.FeatureStart(); 
			return true;
		break;
		case "FEATURE_PICK":
			game.slotResult = game.processMsg(pairs,0);
			game.slotResult.bProcessed = true;
        	photoShoot.FeaturePick();
		break;		
		case "FEATURE_END":
        	photoShoot.FeatureEnd();
			
			game.freeRounds.processMsg(pairs);
			game.freeRounds.updateTotalWin();								
			game.freeRounds.outro();

			str = FPM_HL.toString();
			srch = str.search("840523");
			if(srch != -1 )dressShow.featureSkip();
			
			//console.log(">>>>> process FEATURE_END message returned from server");
			inPickFeature = true;
			reSetPickMsg();
			return result;
		break;		
	}
	
	str = FPM_HL.toString();
	srch = str.search("840523");
	//console.log(">>>>>> 840523 present in retrun message = "+srch);
	 
	if(myCFP-1 == TKS_HL || srch != -1 )
	{
		photoShoot.disableBtn();
		inPickFeature = true;	
		//console.log(">>>>> going to SEND feature end to server"  );  		 
		sendFeatureEndMsg();
	};
	
	return result;
};

var sendFeatureStartMsg = function()
{
	if (!game.featureStarted) {
 	  	var msg = "&MSGID=FEATURE_START&CFG=3&";
	  	windowObj.sendMsgToServer(msg);
	}
};

var sendFeaturePickMsg = function(picknumber,selection)
{
 	var msg = "&MSGID=FEATURE_PICK&CFG=3&FP=1|" + picknumber + "|" + selection + "|&";
	windowObj.sendMsgToServer(msg);
	//GN=aneveningwithhollymadison&PID=Ne7777ming&MSGID=FEATURE_PICK&CFG=3&FP=1|4|3,3|&
	//3,3是 selection
};

var sendFeatureEndMsg = function()
{
	//PPfeature.ignoreInput = true;
	var msg = "&MSGID=FEATURE_END&CFG=3&";
	windowObj.sendMsgToServer(msg);
	
	//GN=aneveningwithhollymadison  MSGID=FEATURE_END&CFG=3&
};

game.updateIdleMessage = function(timeDelta)
{
    if(this.idleTextTimer >= 0)
    {
        this.idleTextTimer -= timeDelta;
        if(this.idleTextTimer <= 0)
        {
            this.startIdleMessages();
        }
    } 
};

game.api_inFeature = function()
{
	// return true;
	// sendFeatureStartMsg();
	// alert ("game.api_inFeature ")
	//return PPfeature.inFeature;
	return inPickFeature;
}

function ForceReelSwap()
{
	for(var i=0; i < reelStrips.length; i++)
	game.reelMan.setReelStrip(i,reelStrips[i]);	
	
	//console.log(">>>>> forced reel swap");
};

game.api_switchReels = function(freeGames)
{
	
	if(!game.inRecovery && RSid != null){	
		//console.log(">>>> RID = "+RID);
		//console.log(">>>> NRID (Switched to this reel)= "+RSid);
		for(var i=0; i<5; i++){
		 game.reelMan.setReelStrip(i,reelStripChanges[String(RSid)][i]);		 
		}
	}
	//console.log(">>>>>>> RSid in game.api_switchReels = "+RSid);
	
	
	// 	if(HR_HL[0])  respinJustBegin 

	/*if(!isRespin)
	{
 		for(var i=0; i<(freeGames ? reelStripsFree : reelStrips).length; i++)
		game.reelMan.setReelStrip(i,(freeGames ? reelStripsFree : reelStrips)[i]);
	}*/
	
	// with no KISS 	
	if( (freeGames && respinJustBegin) || (freeGames && BKS_HL == "1") || (freeGames && TKS_HL_TOP) || (game.inRecovery && freeGames ) ) 
	{
		//for(var i=0; i<reelStripsRespin.length; i++)
		//game.reelMan.setReelStrip(i,reelStripsRespin[i]);	
		//
		TKS_HL_TOP = false;
		BKS_HL == "0" ; 
    }
};

game.api_freeSpinBgChangeAction = function(freeSpinBg)
{	
	/*if(!freeSpinBg) {
		$("body").css("background-image", "url('BG_Pattern.jpg')");
	} else{
		$("body").css("background-image", "url('BG_Pattern_free.jpg')");
	}	*/
};

var HLalpha = 1;
game.api_featureUpdate = function(deltaTime)	// updating the background Flash
{
 	if(deltaTime<100000)
        AF.Movie.update(deltaTime);

    randomSprayAnim.update(deltaTime);
	
	// --------------  symbols fade out ------- ------- ------- 
	if(HLalpha < 1)
  	girlWildShow.BGfadeout();	
};

//---------------------------------------------------------------------

game.playWinSounds = function()
{
	//console.log(">>>>> win Sound");
	var win = this.slotResult.winAmount;
	var scatterWin = (this.slotResult.winType & WT_FEATURE_TRIGGER) && FID[0]!=0;
	
	if(win >= this.slotResult.linesBet * this.slotResult.betPerLine * 2)
	{
		if(!titlemovie.playing && game.slotResult.currentSpinWinAmount != 0)titlemovie.init();
	};
	
	//win 0-0.8
	if(win > this.slotResult.linesBet * this.slotResult.betPerLine * 0 && win <= this.slotResult.linesBet * this.slotResult.betPerLine * 0.8)
	{
		if(!game.freeGames.m_bInFreeGames){
			game.playSound('win1');
			//console.log(">>>>> win1 sound ");
		}
	};
	
	//win 0.81-2
	if(win > this.slotResult.linesBet * this.slotResult.betPerLine * 0.8 && win <= this.slotResult.linesBet * this.slotResult.betPerLine * 2 && !scatterWin)
	{
		if(!game.freeGames.m_bInFreeGames){
			game.playSound('win2');
			//console.log(">>>>> win2 sound ");
		}
	};
	
	//win 2.01-6 or feature
	if(win > this.slotResult.linesBet * this.slotResult.betPerLine * 2 && win <= this.slotResult.linesBet * this.slotResult.betPerLine * 6 || scatterWin)
	{
		if(!game.freeGames.m_bInFreeGames){
			game.playSound('win3');
			//console.log(">>>>> win3 sound ");
		}
	};
	
	//BigWin 6.01+
	if(win > this.slotResult.linesBet * this.slotResult.betPerLine * 6 && !game.freeGames.m_bInFreeGames)
	{
		game.playSound('win4');
		//console.log(">>>>> win4 sound ");
	};
	
	if(win >= this.slotResult.linesBet * this.slotResult.betPerLine * 15 && !game.freeGames.m_bInFreeGames)
	{	
		randomSprayAnim.init().startAnim();
		setTimeout(function(){
			bigWinTitle.start();
			},500);
	};
	
	if(game.freeGames.m_bInFreeGames && !inPickFeature)
	{
		//if(!game.inRecovery){
			if(game.slotResult.currentSpinWinAmount != 0)game.playSound('rollupshort');
			//console.log(">>>>>>>>>>>> DINGS!!!");
		//}
		//console.log(">>>>> rollup1 sound ");
	};
		
};

AF.Text.prototype.getWidth = function()
{
    var maxWidth = 0;
    var text = $("<f/>").append(this.text);
    for(var p in this.textFormat)
    {
        text.attr(p, this.textFormat[p]);
    }

    var lines = [[[]]];
    this._parseElement(text[0], lines, this.textFormat);

    for(var i=0;i<lines.length;i++)
    {
        var line = lines[i];
        for(var j=0;j<line.length;j++)
        {
            var segment = line[j];
            if(segment.length > 0)
            {
                var width = this._getSegmentWidth(ctx, segment);
                maxWidth = width > maxWidth ? width : maxWidth;
            }
        }
    }

    return maxWidth;
};

AF.Text.prototype.getHeight = function()
{
    var maxHeight = 0;
    var text = $("<f/>").append(this.text);
    for(var p in this.textFormat)
    {
        text.attr(p, this.textFormat[p]);
    }

    var lines = [[[]]];
    this._parseElement(text[0], lines, this.textFormat);

    if (lines.length > 0){
        maxHeight = lines.length * this._getLineHeight(lines[0]);
    }

    return maxHeight;
};

//----------SCROLL MESSAGES - FREEGAMES
overridenFunctions.startIdleMessages = game.startIdleMessages;
game.startIdleMessages = function()
{
	//console.log(">>>>>> StartIdleMessage "+game.slotResult.numFreeGames+" "+game.slotResult.IFG);
	if(game.slotResult.numFreeGames == 0 && game.slotResult.IFG)
	{
		game.messageBar.m_Text = "";
		return;
	}
	overridenFunctions.startIdleMessages.call(this);
};

var is_freeGameWonMessage_completed = false;
overridenFunctions.setFreeGameWonMessage = game.setFreeGameWonMessage;
game.setFreeGameWonMessage = function()
{
    //if(scatterFruitPositions.length>0 || wildFruitPositions.length>0  ) return;
    is_freeGameWonMessage_completed = true;
    overridenFunctions.setFreeGameWonMessage.call(this);
};

function setFreeGameWonMessageAfterDelay()
{
    is_freeGameWonMessage_completed = true;
    overridenFunctions.setFreeGameWonMessage.call(game);
};

game.setFreeGameWonMessage = function()		// allows this to be overwridden for re-spins
{
	if(game.slotResult.winType & WT_FEATURE_TRIGGER && FID[0] != 1 && FID[0] != 0)
	{
		if(game.slotResult.freeGamesWon == 1) {
				game.messageBar.m_Text = game.slotResult.freeGamesWon + " " + TXT_FREE_GAME_WON;
		}
		else if (game.slotResult.freeGamesWon > 1){
				game.messageBar.m_Text = game.slotResult.freeGamesWon + " " + TXT_FREE_GAMES_WON;
		}
	}
	else if(FID != null)
	{
		if(FID[0] == 1 || FID[0] == 0)
		game.messageBar.m_Text = "";
	}
};

game.setGamesRemainingString = function()
{
    if (!game.freeGames.m_bInFreeGames){
        return;
    }

    var gamesRemaining = this.slotResult.numFreeGames;

    if(this.slotResult.winType & WT_FEATURE_TRIGGER && game.gameState == SS_WIN_PAYLINE_FREEGAMES)
    {
            if(!game.freeGames.m_bInFreeGames && !is_freeGameWonMessage_completed) //before intro window
            {
                return;
            } else  if(!is_freeGameWonMessage_completed) {
                gamesRemaining-=10;
            }
    }	
    if(gamesRemaining == 1)
    {
		if(game.gameState == SS_SPINNING  && FID[0] != 0){
		game.messageBar.m_Text =  TXT_FREE_GAME_END;
		}
    }
    else 
    {
		if(game.gameState == SS_SPINNING && FID[0] != 1){
			
			var remainder = game.slotResult.totalNumFreeGames % 10;
			
			game.messageBar.m_Text =  TXT_FREE_GAME+ " " +String((game.slotResult.totalNumFreeGames-game.slotResult.numFreeGames+1) - remainder)+ " " 
			+TXT_FREE_GAME_OF+ " " +String(game.slotResult.totalNumFreeGames - remainder); 
		}
		else if(FID[0] == 1)
		{
			game.messageBar.m_Text = "";
		}
    }
};
