game.account.setNumPaylines(25,25);
game.defaultStops = [8,5,5,5,5];
 var RTP_VALUE = ['94.921%'];
 
var gAudioSettings = {
	resources: [ 'WheresTheGold.m4a', 'WheresTheGold.mp3', 'WheresTheGold.wav' ],
	spritemap: { 
 
	  'click': { 'start':1.010 , 'end': 1.142},    //ok
	  // 'spin' -- removed
	  'reelstop' :	{ 'start': 2.153, 'end': 3.923 },
	  //'reelstop1':  { 'start': 2.055, 'end': 3.923 },
	  //'reelstop2':  { 'start': 2.497, 'end': 3.923 },
	  //'reelstop3':  { 'start': 2.801, 'end': 3.923 },
	  //'reelstop4':  { 'start': 3.148, 'end': 3.923 },
	  'reelstop1':  { 'start': 2.497, 'end': 3.923 },
	  'reelstop2':  { 'start': 2.801, 'end': 3.923 },
	  'reelstop3':  { 'start': 3.148, 'end': 3.923 },
	  'reelstop4':  { 'start': 3.400, 'end': 3.923 },
	  'win1':  { 'start':4.729 , 'end':5.695},     //ok
	  'win2':  { 'start':6.727 , 'end': 10.754},     //ok  
	  'srs1':  { 'start':11.760 , 'end': 12.726},    //ok
	  'srs2':  { 'start':13.714 , 'end': 14.658},    //ok
	  'srs3':  { 'start':15.677 , 'end': 16.576},    //ok
	  'srs4':  { 'start':17.591 , 'end': 18.504},    //ok  
	  'srs5':  { 'start':19.420 , 'end': 20.470},    //ok
	  'featureYiihaa': { 'start':21.459 , 'end': 23.947},  //ok  
	  'scatterAnim': { 'start':24.970 , 'end': 27.388},   // ok
	  'earthshake':  { 'start':30.102 , 'end': 33.064},   // ok
	  'cavebg':  { 'start':34.092 , 'end': 39.663},    
	  'getgold': { 'start':40.704 , 'end': 41.035},
	  
	  //	'digging': { 'start':42.036 , 'end': 42.976},
	  //    'diggerwin':  { 'start':43.977 , 'end': 46.760},   
	  
	  //------------------------------------
	  'dd7':  { 'start':42.016, 'end':  43.579},  //Dog Character Dig
	  'ww7':  { 'start':44.553, 'end':  47.902},    //Dog Character Dig win
	  
	  'dd6':  { 'start':48.883, 'end':  50.749}, //Hippy Character Dig
	  'ww6':  { 'start':51.767, 'end':  54.430}, //Hippy Character Win
	  
	  'dd5':  { 'start':55.433, 'end':  56.134}, //Blonde Character Dig
	  'ww5':  { 'start': 57.115, 'end': 60+ 0.006}, //Blonde Character Win 
	  
	  'dd3':  { 'start':60+ 0.980, 'end':  60+ 1.969}, //Prospector Character Dig
	  'ww3':  { 'start':60+ 2.927, 'end':  60+ 5.723}, //Prospector Character Win
	  
	  'dd2':  { 'start':60+ 6.704, 'end':  60+ 8.622}, //Scientist Character Dig 
	  'ww2':  { 'start':60+ 9.588, 'end':  60+ 11.521}, //Scientist Character Win 
	  
	  'dd1':  { 'start':60+ 12.502, 'end':  60+ 14.678},  //Gypsy Character Dig
	  'ww1':  { 'start':60+ 15.674, 'end':  60+ 18.115},  //Gypsy Character Win
	  
	  'dd4':  { 'start':60+ 19.133, 'end':  60+ 20.218}, //Butterfly Catcher Character Dig
	  'ww4':  { 'start':60+ 21.184, 'end':  60+ 22.740}, //Butterfly Catcher Character Win 
	  
	  'longrollup':  { 'start':60+ 23.721, 'end':  60+ 28.464},  //Long Rollup
	  'rollup':  { 'start':60+ 26.148, 'end':  60+ 28.464},   //Short Rollup
	  'windup': { 'start':60+ 29.343, 'end':  60+ 31.299} //Windup Whurr
     
	}
};
 
var buttons_ui = 'language/'+windowObj.languageCode+'/buttons_ui.png';
// ---------------- Assets -------------------------------
game.ASSET_MANAGER.queueFiles([
'reelbg.jpg', 
'diggers/1.png','diggers/2.png','diggers/3.png','diggers/4.png','diggers/5.png','diggers/6.png','diggers/7.png', 

'diggers/11.png','diggers/22.png','diggers/33.png','diggers/44.png','diggers/55.png','diggers/66.png','diggers/77.png',	

'diggers/111.png','diggers/222.png','diggers/333.png','diggers/444.png','diggers/555.png','diggers/666.png','diggers/777.png',		

'diggers/1111.png','diggers/2222.png','diggers/3333.png','diggers/4444.png','diggers/5555.png','diggers/6666.png','diggers/7777.png',	

'diggers/goldbit.png', 	'diggers/spotlight.png',   'diggers/selected.png', 


'icon/16.png',	'icon/17.png',	'icon/18.png',	'icon/19.png',	'icon/20.png',	'icon/21.png',	'icon/22.png',	'icon/23.png',	

'goldwilds/9.jpg',	'goldwilds/10.jpg',	'goldwilds/11.jpg',	'goldwilds/12.jpg',	'goldwilds/13.jpg',	'goldwilds/14.jpg',	'goldwilds/15.jpg',	'goldwilds/16.jpg',	    

'wildicons/16.png',	'wildicons/17.png',	'wildicons/18.png',	'wildicons/19.png',	'wildicons/20.png',	'wildicons/21.png',	'wildicons/22.png',	'wildicons/23.png',
'summary.jpg',
'starflash.png',

'newbar.png',
'symbols.png',
'elements.png',
buttons_ui,
'btnsGlow.png',
'game-settings.jpg',
'turndevice.png',

'sym12.jpg',
'paylinesend.png',
'coin.png',
'woodbar.png',
'leftpayline.jpg', 'rightpayline.jpg',

'featuregold.png',
'summary_img.png',
'frame.jpg', 'pickbox.gif',
"CoinShower.png"
 
]);



// ---------------- slots ---------------------

var reelStrips = [
[3,6,2,7,5,0,7,5,0,7,4,2,8,7,5,1,7,5,1,7,6,3,5,6,7,5,4,7,5],
[0,7,2,5,6,3,5,0,3,6,2,8,7,1,6,7,5,1,7,5,6,3,7,6,5,4,3,6,5],
[4,0,2,5,1,6,3,4,0,8,4,2,0,6,1,4,6,1,4,7,1,4,3,6,1,4,3,7],
[0,7,1,2,4,1,6,4,3,5,2,4,8,5,0,6,3,5,2,1,0,3,4,6],
[0,7,2,6,4,5,0,1,8,6,2,5,4,3,1,7,3,5,1,3,4,7,2,4,6]
 ];
 
  
  
function convertStrips(rs, wid) 
{
	var  myrs = rs; 
	var mywid = wid; 
  	
	for(var r = 0; r < 5;  r ++) 
	{
	   for(var s = 0; s < myrs[r].length ; s ++)
	   {
		   for(var w = 0;  w < mywid.length;  w ++ )
		   {
			   if(myrs[r][s] == mywid[w])
			     { myrs[r][s] =  myrs[r][s] + 9;   }
		   }
	   }	
 	}
 	
    return myrs;
};
 
 
 
game.api_switchReels = function(freeGames)
{    // console.log("switchReels-- wildID--" +  wildID)
 	theSymId =  converWilds(wildID);  
	reelStripsFree = []; 
	
var reelStripstmp = 
[
[3,6,2,7,5,0,7,5,0,7,4,2,8,7,5,1,7,5,1,7,6,3,5,6,7,5,4,7,5],
[0,7,2,5,6,3,5,0,3,6,2,8,7,1,6,7,5,1,7,5,6,3,7,6,5,4,3,6,5],
[4,0,2,5,1,6,3,4,0,8,4,2,0,6,1,4,6,1,4,7,1,4,3,6,1,4,3,7],
[0,7,1,2,4,1,6,4,3,5,2,4,8,5,0,6,3,5,2,1,0,3,4,6],
[0,7,2,6,4,5,0,1,8,6,2,5,4,3,1,7,3,5,1,3,4,7,2,4,6]
]; 
reelStripsFree = convertStrips(reelStripstmp, theSymId) ;
for(var i=0; i<(freeGames ? reelStripsFree : reelStrips).length; i++)
game.reelMan.setReelStrip(i,(freeGames ? reelStripsFree : reelStrips)[i]);

};
 
 

//------------------ Test Functions ---------------------------
var test = function()
{   // 1;1;1;2;1   big win
// 2 scatters  11;12;6;9;21
// 5 scatters  11;12;9;13;8

	$("input[name='stops']").val("11;12;6;9;21");
};

var test2 = function() 
{
    // 8;0;8;0;6  wild win
    $("input[name='stops']").val("11;12;9;17;2");
};

 

var symTextures = [], symSprites = [], symAnims = [];
for (var i=0; i<=18; i++)
{
	symTextures.push('symbols.png');
	symSprites.push([ {x:150*i,y:0,w:150,h:150} ]);
	symAnims.push( [ {t:0} ]);
}



var inFeature = false
var wildID = [];
var firstSpin = false;
var pickmepanel;
var growSymbols;
var currentWin;
var rememberState;
var scatterTriggerComplete = true;
var winCelebrationsComplete = true;
var afterrecover = false;
var afterrecover2 = false;
var reelStripsFree = [];
var theSymId = [];    
var featureFPM = "";
var isShowWood = false;
var diggspeed = 100;   // 100 is OK
var myextra = 1200;

var mysearchID = [];
var  diggersound = "";
var  diggerwinsound = "";
var canSRS = true;
 

/////////////////////////////////////////////////////////////////
//Get the total win from freegames and control the last free game
/////////////////////////////////////////////////////////////////
var fgCW = 0;
var isLastFreegGame = false;
/////////////////////////////////////////////////////////////////


var initAssets = function()
{   
 	apiExt("SET_MENU_BTN_SWITCH",false);

    game.meters.setBackground( [{p:0.0,col:'rgba(69,72,77,1)'}, {p:1.0,col:'rgba(0,0,0,1)'} ]);
	game.meters.setFontColour( '#FFFFFF','#FFCC40');
	
    game.playSound("click"); // for mobiles, no sound played before settings panel is opened

	game.layout.generatePaylineVectors();

	game.messageBar.align   = "center";
	game.messageBar.font    = MESSAGE_BAR_FONT;
	game.messageBar.m_Text  = TXT_SCROLL_WELCOME;
    
    game.idleTextDelay = 5000;
    game.idleTextTimer = game.idleTextDelay;
	
	game.imageReelBG        = game.ASSET_MANAGER.getAsset('reelbg.jpg');
	game.imageReelBGfree    = game.ASSET_MANAGER.getAsset('reelbg.jpg');
	game.imageGameName 		= null;
	game.imageSymbols      	= game.ASSET_MANAGER.getAsset('symbols.png');
	game.imageTurnDevice  	= game.ASSET_MANAGER.getAsset('turndevice.png');
	game.imageSprayAnim   	= game.ASSET_MANAGER.getAsset('coin.png');
	game.imagePaylineEnds 	= game.ASSET_MANAGER.getAsset('paylinesend.png');
	
    
    game.ui.initAssets(false);
	
	game.ui.btnLineUp.isDisabled = false;
    game.ui.btnLineDown.isDisabled = false;

	game.reelMan = new ReelManager();
	

	for(var i=0; i<reelStrips.length; i++){
		game.reelMan.setReelStrip(i,reelStrips[i]);
	}
		
        
    overridenFunctions.updateReelManager = game.reelMan.update;
    game.reelMan.update = reelManagerUpdate;
	

	layout = new Layout();
	layout.orient(0);
	
	  	
	featureCounter = new FeatureCounter();
    featureCounter.x = game.layout.REELS.x ;
    featureCounter.y = game.layout.REELS.y ;
	featureCounter.visible = false;
	AF.Movie.root.addChild(featureCounter);
 
  
	topBar = new TopBar();
    topBar.x = layout.TOP_MESSAGE_BAR.x;
    topBar.y = layout.TOP_MESSAGE_BAR.y;
	AF.Movie.root.addChild(topBar);
    topBar.showNextMessage();
	
	
	cavesound = new caveWaterSound();
 	AF.Movie.root.addChild(cavesound);
 	
 	
	starsmovie = new starsMovie();
    starsmovie.x = game.layout.REELS.x ;
    starsmovie.y = game.layout.REELS.y ;
	AF.Movie.root.addChild(starsmovie);
	
	
    wajinzi = new waJinZi();
    wajinzi.x = game.layout.REELS.x ;
    wajinzi.y = game.layout.REELS.y ;
    AF.Movie.root.addChild(wajinzi);
	
	
    shaking = new Shaking();
    //shaking.y = -54;
	AF.Movie.root.addChild(shaking);
	
	
	testme = new TestMe();
 	AF.Movie.root.addChild(testme);
	
 	
	
	woodbar = new WoodBar();
	AF.Movie.root.addChild(woodbar);
	
	darkbg = new DarkBG();
	AF.Movie.root.addChild(darkbg);
	
	
	timerbox = new TimerBox();
	AF.Movie.root.addChild(timerbox);
 
 	
    pickmepanel = new PickMePanel();
    pickmepanel.x = -30;
    pickmepanel.y = 10;
    AF.Movie.root.addChild(pickmepanel);


	
	if(featureFPM !=null && featureFPM !=""  && featureFPM != "|") {
	 	pickmepanel.picked = 1 + parseInt(featureFPM.split(";")[0]);
 		// console.log ("pickmepanel.picked # -->"+ pickmepanel.picked   );
   	};
  
  
       
	if(typeof restoreInfo  != "undefined")  
	{
	 	featureCounter.FT = restoreInfo.FT;
		featureCounter.CHD = restoreInfo.CHD;
		featureCounter.TBG = restoreInfo.TBG;
		featureCounter.GWW = restoreInfo.GWW;
		featureCounter.FBD = restoreInfo.FBD;
	   
		//getwildID(featureCounter.GWW);
		// console.log ("result.GWW --" + restoreInfo );	
		// console.log ("result.GWW --" + result.GWW );				
		// console.log ("result.FBD --" + result.FBD );		
		// console.log ("FT# untriggered // " +  featureCounter.FT);
		// console.log ("CHD# digger --" + featureCounter.CHD );				
		// console.log ("TBG# golds --" + featureCounter.TBG );

		featureCounter.show();
	}  

   	
	goldbitsmoive = new GoldBitsMoive();
    AF.Movie.root.addChild(goldbitsmoive);
 
	
	summaryPanel = new SummaryMovie(TXT_FREE_GAMES_SUMARY_TITLE, TXT_FREE_GAMES_TOTALWIN, TXT_FREE_GAMES_TOTALWIN_VALUE);
	AF.Movie.root.addChild(summaryPanel);

    
    if (game.recoverySlotResult.numFreeGames == 0){
   		//  pickmepanel.init();
    }
    
	
	symbols = new SymbolsMovie();
	symbols.x = game.layout.REELS.x;
	symbols.y = game.layout.REELS.y;
	AF.Movie.root.addChild(symbols);

	//featureTriggerSound = new FeatureTriggerSound();
	//AF.Movie.root.addChild(featureTriggerSound);
    
    
    featureReTriggerSound = new FeatureReTriggerSound();
    AF.Movie.root.addChild(featureReTriggerSound);

	
	randomSprayAnim = new RandomSprayAnim();
	randomSprayAnim.setAnimConfig();
 
       

	// ############################################################
    // Define stop reels sound
    // ############################################################
    /*var reelSetState = game.reelMan.reels[0].setState;
    game.reelMan.reels[0].setState = function (newState) {
        if (newState == this.state)
            return;

       /* if (this.state == 2 && newState == 3){

        	var reelStopSound;
        	for(var i=0;i<scatterReels.length;i++){
        		reelStopSound = i;
        		if(scatterReels[i] == -1) break;
        	}

			setTimeout(function(){
            	game.playSound('reelstop' + reelStopSound);
            }, reelStopSound * 500);    


        }
		
		
		 if (this.state == 2 && newState == 3){
            if(scatterReels[0]==-1)game.playSound('reelstop');
		 }

      	reelSetState.call(this, newState);
    }*/




	game.freeGames.RESPIN_TIMER_DELAY = 3500;
};

 
 

//----------------------------
game.api_startGame = function(){  

	// pickmepanel.init();
	// summaryPanel.play(0);
	// wajinzi.init();
	// starsmovie.init();
	// testme.play(0);
 
	woodbar.freeGameWoodShow();
 
 
	// shaking.init();
	woodbar.hideAll();
  
	timerbox.test();
 
 
	if( game.inRecovery){ 
		afterrecover = true;
	}
 	

	game.startIdleMessages(true);

 };



game.uapi_showSpinBtn = function(){
	return true;
};



var btnsEnable = false;
game.api_featureBtnDisable = function(){
    btnsEnable = false;
};


game.api_featureBtnEnable = function(canbet){
    if(canbet){
    	btnsEnable = true;
    }
};



game.uapi_showWinMeter = function(state) {
    
    if (!state && !winCelebrationsComplete && scatterTriggerComplete){
        
        winCelebrationsComplete = true;

        if (game.slotResult.winType & WT_PICK_FEATURE_TRIGGER){
            game.startFeature();
        } else {
            if (game.gameState != SS_FREEGAME_INTRO){
                game.setState(SS_FREEGAME_INTRO);
            }else {
             	game.setBShowFreeSpinBg(true);
             	//game.api_beforeFirstFreeGame();
            }
        }
    }
};



game.api_beforeFirstFreeGame = function()
{


	if (game.freeGames.m_bInFreeGames){
       this.startSpin();
	  //game.api_beginFeature();
	   //console.log(">>>> before first free game");
	   //spinningFeatureStopped = false;
    }
	

    ///////////////////////////////////////////////////////
    // Cancel autoplay nutton as soon as starts freegames
	game.autoPlay = false;
    game.requestToStopAutoPlay = false;
    game.ui.autoPlayMode = game.ui.AUTO_OFF;
    game.autoPlayGames = 0;
    ////////////////////////////////////////////////////////


};



game.api_changeOrientation = function()
{
	game.ui.layout.SPIN2_BTN = { x:690+20, y:819 };
    game.ui.layout.START_AUTOPLAY2_BTN = { x:690+20 , y:819 };
    game.ui.layout.STOP_AUTOPLAY2_BTN  = { x:722+20 , y:819 };
	game.ui.layout.GAMES_REMAINING2_METER = { x:785-1 , y:801 };
	
	// pickmepanel.canClick = false;
	
 	this.ui.layout.WIN_METER = this.layout.WIN_METER;
    this.ui.layout.WIN_METER_BG = this.layout.WIN_METER_BG;
   this.ui.winMeter.setPosition(this.layout.WIN_METER);
	
};

game.api_extendSpinMsg = function(msg)
{
	return msg ;
}

var autoDelayAfterFeature = false;
game.api_autoDelayAfterFeature = function()
{
	return autoDelayAfterFeature;
};


game.api_lastFreeGameFinish = function(){     


	// FID = 0|1| at last free spin
	// is there is a retrigger, a bug, sometimes not trigger summary
	if(!realFeatureEnd){
		//console.warn (" realFeatureEnd =   " + realFeatureEnd);
	 	return; 		
	}


		
	autoDelayAfterFeature = true;
	
    setTimeout(function(){
		
		woodbar.hideAll();
        summaryPanel.visible = true;
        summaryPanel.updateTotalWin(game.slotResult.totalWin);
        summaryPanel.play(0);
        game.messageBar.m_Text = TXT_FEATURE_COMPLETED;
    }, (game.slotResult.winType == 0)? 0:game.WIN_METER_DISPLAY_TIME);



    /////////////////////////////////////////	
	//set last freegame controls 
	//used to reset respin delay during update game
	isLastFreegGame = true;
	/////////////////////////////////////////

};

var spinningFeatureStopped = true;
game.api_spinningFeatureStopped = function()
{ 
  afterrecover2 = false;
  srs=0;
  //game.stopSound('reelstop2');
 // game.stopSound('reelstop3');
 // game.stopSound('reelstop4');
 //  console.warn (" /////" + pickmepanel.picked);
  //	if(pickmepanel.picked > 0 && afterrecover == true && game.slotResult.numFreeGames >1 &&  game.slotResult.numFreeGames == game.slotResult.totalNumFreeGames)
 

// to fix the recovery issue happen at the gap, "alert" to trigger it
  setTimeout ( function() {
	   if( afterrecover && game.slotResult.numFreeGames >1 &&  game.slotResult.numFreeGames == game.slotResult.totalNumFreeGames)
		  {
			spinningFeatureStopped = true;
		  game.startSpin();
		  pickmepanel.picked = -5; 
		  afterrecover = false;
		  }
 	
 }, 2000);   

///////////////////////////////////////////////////////////


	
    for(var i=0; i<5; ++i) {
        growSymbols[i].visible = false;
        growSymbols[i].stop(0);
    }
   
    if(!(this.slotResult.winType & WT_PICK_FEATURE_TRIGGER) && !game.freeGames.m_bInFreeGames)
        this.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;

    return spinningFeatureStopped;
};



game.startIdleMessages = function()
{
    game.startIdleMessages = startIdleMessages;
}

var startIdleMessages = function()
{
    if (!game.account.canBet() && !game.inRecovery && !game.historyMode) 
        game.messageBar.m_Text = TXT_GAME_OVER;
    else if ( !game.freeGames.m_bInFreeGames)
        delayMessageBoxBottom(TXT_SCROLL_PLAY_NOW);
};

game.updateIdleMessage = function(){};

game.api_drawWinAnim = function()
{

	topBar.draw(ctx);
	
	pickmepanel.draw(ctx);
	starsmovie.draw(ctx);	
	featureCounter.draw(ctx);
	
	woodbar.draw(ctx);
	goldbitsmoive.draw(ctx);
	
	
	shaking.draw(ctx);
	
	wajinzi.draw(ctx);
	
	
	summaryPanel.draw(ctx);
	randomSprayAnim.draw();
	//testme.draw(ctx); 
	 
/*	 
 if(myfar < 200)	
	{	 
var dd =setInterval(function() {
 ctx.beginPath();
ctx.moveTo(110,110);
myfar ++;
ctx.lineTo(myfar,110);
ctx.strokeStyle="green";
ctx.stroke();
 	      }, 1000) 
	}
 */
 
 
//----------------
 
 

//--------------------
 
	 
	 
};


var myfar = 111;


game.api_drawLowerLevelFeature = function()
{    
	
symbols.draw(ctx);   
};


game.api_drawBackground = function()
{    
	darkbg.draw(ctx);
  
};


game.api_drawFeature = function()
{

};



var MyTimer1 = 3000;


game.api_featureUpdate = function(deltaTime)	
// updating the background Flash
{     

	if(deltaTime<100000)
    {
		AF.Movie.update(deltaTime);
        topBar.updateDT(deltaTime);
    }
	
	randomSprayAnim.update(deltaTime);
	if (forcedMessage1 != null && forcedTimer >0 && !game.freeGames.m_bInFreeGames && this.slotResult.getFreeGamesLeft() == 0) 
	{
		forcedTimer -= deltaTime;
		game.messageBar.m_Text = forcedMessage1;
	} 
	else if (!game.freeGames.m_bInFreeGames)
	    {
		forcedMessage1 = null;
		forcedTimer = 2000;
		if (this.slotResult.getFreeGamesLeft() == 0) {
		//	game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
		}
	};




	/////////////////////////////////////////////////////////////////////////
    //reset spin again when it gets zero, increase the respin timer
    /////////////////////////////////////////////////////////////////////////
    if(game.freeGames.m_bInFreeGames && isBigWin() && !isLastFreegGame){
        if(game.freeGames.m_RespinTimer <= 0){
        	this.setGamesRemainingString();
            this.freeGames.DecFreeSpins();
			spinningFeatureStopped = true;
            this.startSpin();
        }
    }
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

	
	
//------set timer ----------
 
	
	
	
	
	
	
};




game.api_parseFPM = function(FPM)
{
    featureFPM = FPM;
 
 };

 

function getwildID(GWW)
{    
    var  tmp = [];
  	 var str = GWW;

	 for(var i = 0; i < str.length ; i ++)
	 {
	  if(str[i] > 15 )
	  { 
		 tmp.push(parseInt(str[i]));
 	  }
	 }
   wildID = tmp;
};

 


 function converWilds(goldwildID)  
{
   var tmp = goldwildID;
   var wilds = [];
 
   
  for (var i = 0; i < tmp.length; i ++ )
   {
 	  switch(tmp[i])
		{
 		  case 16:
          wilds.push(0);
		  break; 
		  
		  case 17:
			 wilds.push(2);
		  break;					
		  
	 	  case 18:
		   wilds.push(1);
		  break;
 		  
		  case 19:
		   wilds.push(3);
		  break;	
		  
		  case 20:
		   wilds.push(4);
		  break;	
		  
		  case 21:
		   wilds.push(6);
		  break;	
		  
		  case 22:
		   wilds.push(5);
		  break;	
		  
		  case 23:
		   wilds.push(7);
		  break;					
 		}
    }
		return  wilds ;
};

 


game.api_beginFeature = function()
{ 

  //when starts the feature means the freegame is over, so reset the control
  //we can have retrigger inside the freegame, specially during the last freegames
  isLastFreegGame = false;
  //spinningFeatureStopped = false;

  inFeature = true;	
    featureCounter.beginFeature();  
	
  if(featureCounter.FT > 0 || afterrecover)
  {
  pickmepanel.init()
  afterrecover = false;
  
  }
  else
  {
  shaking.init();     // only here
  }

 game.messageBar.m_Text = TXT_PICK_BONUS;
 //console.log(">>>>> beginFeature started");
  	
};



game.api_inFeature = function()
{  
   	return inFeature; 
};



game.api_processFeatureMsg = function (msgid,pairs) { 
        if(msgid=="FEATURE_START")
        {   
 	     pickmepanel.canPick = true;
        }
        if(msgid=="FEATURE_PICK")
        {
  		// get new message now	
	 	 game.slotResult = game.processMsg(pairs,0);
         game.freeRounds.processMsg(pairs);		
 		 cavesound.stopcavebg();
		// cavesound.playdigging(); 
			
	  if(featureCounter.TBG.length > 0  ) 	
	  {	
setTimeout(function() {
      getwildID(featureCounter.GWW);
	  
	  goldbitsmoive.showGoldResult(featureCounter.TBG,false);
	  goldbitsmoive.showIconResult(featureCounter.FBD, false);
	  woodbar.hideAll();

    //test
	//  goldbitsmoive.showWildIcon(false);   
	 
	  goldbitsmoive.playGoldsAnimation();    
	  //console.log ("featureCounter.pickRAM-" + featureCounter.pickRAM)

   	     },100) 
 		   
	  }
 		   
		   
        }	
        else if(msgid=="FEATURE_END")
        {
 	//	alert ("stop")
		  game.slotResult = game.processMsg(pairs,0);
		  game.slotResult.bProcessed = true;
 
		  
        }
        return false; 
}


game.api_processClickRelease = function(coords)
{
    pickmepanel.processClickRelease(coords);
};

game.api_processClick = function(coords)
{

};

game.api_buttonsUp = function()
{

};





game.playWinSounds = function()
{

	//game.stopSound();
	// delay added to freegame respin during the big win celebration
    var bigWinDelayFreeGameRespin = 3500;


	//no win just cancel the logic
	if(!isWin()) return;


	//feature sound is high priority
    if (this.slotResult.winType & WT_FEATURE_TRIGGER){
		
		featureReTriggerSound.init();
    
    //then big win is the second priority
    }else if(isBigWin()) {

       //delay the big win 
       //update feature need to check if the timer is zero and then start it again
       if(game.freeGames.m_bInFreeGames) game.freeGames.m_RespinTimer = bigWinDelayFreeGameRespin;
       	
       //play coin shower for big win
       randomSprayAnim.init().startAnim();
       //big win tune
       game.playSound('win2');

    //as last priority comes the normal win tune
    }else{

    	//normal win tune
		game.playSound('win1');
        
    }



    if (this.slotResult.freeGamesWon != 1 || win <= 0 || GSDData["SR"] == undefined) {
        game.showBannerMessage();
    }


    /*

	var win = game.freeGames.m_bInFreeGames?  fgCW : game.slotResult.winAmount;
    var bet =  game.slotResult.linesBet  * game.slotResult.betPerLine;

	if(win<=0 && !soundRecovery)
        return;
    
    if (scatterTriggerComplete){
        game.playBigWinCelebration();
    }
    
	if(win >=  bet * 20 && !soundRecovery) {
		 randomSprayAnim.init().startAnim();
		 console.warn ("--randomSprayAnim.init()");
		 DelaySpinButton(3500); 
	}
        
    soundRecovery= false;
	
	if(!game.freeGames.m_bInFreeGames || game.freeGames.m_bInFreeGames)
	{
        if (this.slotResult.winType & WT_FEATURE_TRIGGER )
             { 
 
			//   windowObj.sendMsgToServer("&MSGID=FEATURE_START&CFG=0&");
			  
			 }
        else if(win >= bet * 5) {
			
			this.playSound('win2');

			if(!game.freeGames.m_bInFreeGames){
				DelaySpinButton(3000); 
			}else{
				DelaySpinButton(3500); 
			}
       
 			  
		}
		else if(win > 0) {
			this.playSound('win1');
			
			if(!game.freeGames.m_bInFreeGames){
				DelaySpinButton(500);
			}else{
				DelaySpinButton(1000);
			}

		}
	}
    else if (this.slotResult.winType & WT_FEATURE_TRIGGER )
    {
      featureReTriggerSound.init();
    }

	if (this.slotResult.freeGamesWon != 1 || win <= 0 || GSDData["SR"] == undefined) {
        game.showBannerMessage();
    }

 	*/
    
    
};

game.playSound = function(soundID) {
    if(soundID == "spin")
        return;
        
    if(soundID == "click") // low balance, change net limit
    {
        game.startIdleMessages();
        game.ui.showWinMeter(false);		
    }

	if(this.soundsLoaded && !this.mute) {
		this.myPlayer.play(soundID);
	}
};
 
	
game.api_playFreeSpinSound = function(){
	//arguments.callee.i = arguments.callee.i || 0;
	//this.playSound((arguments.callee.i++ % 2)? 'freespin2' : 'freespin1');
}


game.api_runSpinningStoppedFeature = function()
{
 	 
}

 
game.playBigWinCelebration = function(){


}

 

var overridenFunctions = {};

overridenFunctions.startSpin = game.startSpin;
game.startSpin = function()
{
         overridenFunctions.startSpin.call(this);
 }

overridenFunctions.uapi_betUp = game.uapi_betUp;
game.uapi_betUp = function(cycle) {
	overridenFunctions.uapi_betUp.call(this, cycle);
 
    for (var row = 0; row < 3; row++) {
          for (var column = 0; column < 5; column++) {
            game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 1;
         }
    }
}

overridenFunctions.uapi_betDown = game.uapi_betDown;
game.uapi_betDown = function(cycle) {
	overridenFunctions.uapi_betDown.call(this, cycle);
 
    for (var row = 0; row < 3; row++) {
          for (var column = 0; column < 5; column++) {
            game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 1;
         }
    }
}

overridenFunctions.changeOrientation = game.changeOrientation;
game.changeOrientation = function(orient)
{
    overridenFunctions.changeOrientation.call(this, orient);
    if (typeof MESSAGE_BAR_LANG !== 'undefined'){
        game.messageBar.setPosition(MESSAGE_BAR_LANG);
    }
};

overridenFunctions.startFeature = game.startFeature;
game.startFeature = function()
{
    if (winCelebrationsComplete) {
        overridenFunctions.startFeature.call(this);
    }
}

overridenFunctions.updateGame = game.updateGame;
game.updateGame = function(timeDelta)
{
    if(!loaded){return;}
    if(c.width < c.height){return;}

    if (game.gameState == SS_PICK_FEATURE && !this.api_inFeature()) {

        if (game.commsState != CS_INIT_1) {
            game.updateHTMLMeters();
        }

        game.allowBetUI();
        game.api_featureUpdate(timeDelta);
        game.updateWinMeter(timeDelta);
        game.updateFGAlpha(timeDelta);

        if(this.slotResult.getFreeGamesLeft()){
            if (winCelebrationsComplete && game.gameState == SS_PICK_FEATURE){
                this.setState(SS_WIN_PAYLINE_FREEGAMES);
 
            }
        } else if (this.slotResult.IFG && this.slotResult.FID != 0){
            this.setState(SS_FREEGAME_SUMMARY);
 
        } else {
             this.setBShowFreeSpinBg(false);
        }

        return;
    }
    overridenFunctions.updateGame.call(this, timeDelta);
}

overridenFunctions.updateIdleMessage = game.updateIdleMessage;
game.updateIdleMessage = function(timeDelta)
{
	if(timeDelta<100000)
        overridenFunctions.updateIdleMessage.call(this,timeDelta);
}
 

var restoreInfo = {
	ABPM: true
};
 



var IFG;
var FGT;
var playFreeGames = false;
var inRecovery = false;
var scatterReels = [];
var totalScatters = 0;
var realFeatureEnd = true;
var nextFeatureID;
var featureID;

var digger;    //CHD~5:3:2:1:4 
var mygold;   //TBG~9:10:5:6:7   




overridenFunctions.processServerMsg = processServerMsg;
processServerMsg = function(msg){

	FGT = 0;
    var pairs = msg.split("&");
    for(var i=0;i<pairs.length;i++)
    {
        var pos = pairs[i].indexOf("=");
        var name = pairs[i].substr(0, pos);
        var value = pairs[i].substr(pos+1);
        switch(name)
        {
            case "CW":
                currentWin = Number(value);
                fgCW = Number(value);
                break;
			case "FGT":
                FGT = Number(value);
                break;
        }
    }

    overridenFunctions.processServerMsg.call(this, msg);
	
	if(FGT == 0){
        canSRS = false;
    }  else {
        canSRS = true;
    }
}

overridenFunctions.processMsg = game.processMsg;

 


game.processMsg = function(pairs,freegame)
{
 	
    var result = overridenFunctions.processMsg.call(this,pairs,freegame);
    result.totalWin = 0;
    result.wildSubstitute = 0;
    result.freeGamesTriggered = 0;
	
	result.GWW = [];
	result.FBD = [];
    result.CHD = [];
    result.TBG = [];
	result.FT = 0 ;
    
    currentWin = 0;
    
    fgCW = 0;
	
 

	for(var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf("=");
		var name = pairs[i].substr(0, pos);
		var value = pairs[i].substr(pos+1);
		switch(name)
		{
			case "WS":
				if(typeof symbols == "undefined")
                    restoreInfo.WS = value;
				//else
				//	symbols.setWinSymbols(value);

				var winnings = value.split("|");
				break;
                
			case "CW":
                currentWin = Number(value);
				fgCW = Number(value);
				break;
				
 			
		   case "FID":
                if(value == "0|1|")
                    realFeatureEnd = false;
					else 
					realFeatureEnd = true;
					

				var values = value.split("|");

				if (values[0] != "")
					featureID = Number(values[0]);
				if (values[1] != "")
					nextFeatureID = Number(values[1]);
				else
					nextFeatureID = -1; 
				break;	
				 
 				 		
    case "GSD":
 
	  var gsData = value.split("#");
	  for(var j=0;j<gsData.length;j++)
	  {
		  var gsName = gsData[j].split("~")[0];
		  var gsValue = gsData[j].split("~")[1];
		  switch(gsName)
		  {
		  case "GWW":
			  result.GWW = gsValue.split(":");
 			  if(typeof featureCounter == "undefined") 
			  {restoreInfo.GWW =  result.GWW;
			   getwildID(restoreInfo.GWW);
			  }
			  else 
			  {
			  featureCounter.GWW = result.GWW;
 		      getwildID(featureCounter.GWW);
			  }
		  break;
		  
		  
		  case "TBG":
  		 
			  result.TBG = gsValue.split(":");
              if(typeof featureCounter == "undefined") 
 			  restoreInfo.TBG =  result.TBG;
 			  else  
 			  featureCounter.TBG = result.TBG;
   
  		  break;
		  
		  
		  case "FBD":
			  result.FBD = gsValue.split(":");
 			  if(typeof featureCounter == "undefined") 
			  restoreInfo.FBD =  result.FBD;
			  else
			  featureCounter.FBD = result.FBD;
 		  break;				  		

		  case "CHD":
			  result.CHD = gsValue.split(":");
			  
			  if(typeof featureCounter == "undefined") 
			  restoreInfo.CHD =  result.CHD;
			  else
			  featureCounter.CHD = result.CHD;
 
 		  break;
 		  
   		  
		  //number of re-trigger 
		  case "FT":  
			  result.FT = gsValue;
 			  if(result.FT)
			  {
			  if(typeof featureCounter == "undefined") 
			  restoreInfo.FT =  gsValue;
			  else
			  featureCounter.FT = gsValue;
			   }
			  
 		  break;
		  
		  
		  }
	  }
	  
  break;
  
			  
 ////////////////////////////////////////////////////

 
			case "IFG":
				IFG = Number(value);
				break;
                                
            case "R":
				inRecovery = true;
				break;
                
            case "FGT":
                result.freeGamesTriggered = Number(value);
                break;
                
            case "TW":
                result.totalWin = parseInt(value);
                break;
                
            case "SUB":
                result.wildSubstitute = parseInt(value);
                break;

		}
	}
    
    if(game.inRecovery){
		inFeature = IFG;
    }
    
    if (result.freeGamesTriggered>1 || result.freeGamesWon > 1) {
        winCelebrationsComplete = false;
        scatterTriggerComplete = false;
    } else {
        winCelebrationsComplete = true;
        scatterTriggerComplete = true;
    }
	
	return result;
};

game.api_processMsgEnd = function(result)
{
     if (game.reelMan.reels == undefined) return;

    for(i = 0; i < 5; i++) {
        scatterReels[i] = -1;
        for(var row = 0; row < 3; ++row){
            var rs = game.reelMan.reels[i].reelStrip;
            var sp = parseInt(result.stops[i]) + row - 1;

            if (sp >= rs.length) sp -= rs.length;
            if (sp < 0) sp += rs.length;

            var sym = parseInt(rs[sp]);

            if(sym == 8){
                totalScatters++;
                scatterReels[i] = row;
                break;
            }
        }
    }
	
 };

 

overridenFunctions.recover = game.recover;
game.recover = function()
{
    overridenFunctions.recover.call(this);
    if (inRecovery /*&& game.slotResult.WIP.length>0 */ && IFG==1)
    {
        this.slotResult = this.recoverySlotResult;
          playFreeGames = true;
         if(game.slotResult.numWinningPaylines>0)
        {
            fgCW = game.slotResult.totalWin;
        }
        inRecovery = false;
        game.api_processMsgEnd(this.slotResult);
    }
    if(inRecovery)
    {
        this.slotResult = this.recoverySlotResult;
        game.api_processMsgEnd(this.slotResult);
    }

    createPaylineTexture2();
};

game.api_spinStarted = function()
{  
	reelStops = [0,0,0,0,0];
      if ( game.freeGames.m_bInFreeGames  ) 
     darkbg.show();
 

 if ( !game.freeGames.m_bInFreeGames  ) 
  {
	  setTimeout(function() {
	  darkbg.hide();     }, 800) 
  }
  
  
  
/* 
console.log ("FT# untriggered // " +  featureCounter.FT);
console.log ("CHD# digger --" + featureCounter.CHD );				
console.log ("TBG# golds --" + featureCounter.TBG );
console.log ("featureCounter.GWW --" + featureCounter.GWW );				
console.log ("featureCounter.FBD --" + featureCounter.FBD );		
 
*/

 

  wildID = [];

 woodbar.freeGameWoodShow();
 featureCounter.show();

 
 // pickmepanel.init();
 
    if (!game.inRecovery){
        totalScatters = 0;
        scatterReels = [];
    }else
	 featureCounter.FT = restoreInfo.FT;
	
 	

	
	
    for (var row = 0; row < 3; row++) {
          for (var column = 0; column < 5; column++) {
            game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 1;
         }
    }
    setGamesRemainingString(!game.inRecovery);
};
overridenFunctions.setGamesRemainingString = game.setGamesRemainingString;
game.setGamesRemainingString = function()
{
    overridenFunctions.setGamesRemainingString.call(this);
    if (!this.freeGames.m_bInFreeGames)
    {
        this.messageBar.m_Text = this.slotResult.freeGamesWon + " " + TXT_FREE_GAMES_WON;
    }
}

setGamesRemainingString = function(decrease, immediately)
{
    var gamesRemaining = game.slotResult.numFreeGames-(decrease?1:0);
    
    if(gamesRemaining<0)
        return;

    var txt;

    if(game.inRecovery && (gamesRemaining == 0 || (gamesRemaining == 1 && game.slotResult.freeGamesWon == 1))){
        txt = TXT_SPIN_MSG;
    } else if(gamesRemaining == 0){
        txt = TXT_LAST_FREE_GAME;
    } else if(gamesRemaining == 1){
        txt = gamesRemaining + " " + TXT_GAME_REMAINING;
    } else {
        if (game.slotResult.freeGamesWon == 1){
            gamesRemaining--;
        }
        txt = gamesRemaining + " " + TXT_GAMES_REMAINING;
    }
    if(game.inRecovery)
    {
        txt = TXT_RECOVERING;
    }

    game.messageBar.m_Text  = (txt == "")? game.messageBar.m_Text: txt;
}

game.showBannerMessage = function(){

    var win = (game.freeGames.m_bInFreeGames || game.slotResult.IFG)?  currentWin : game.slotResult.winAmount;
    var bet = game.account.betAmounts[game.account.currentBetIndex]*Number(game.account.way243BetMultiplier[game.account.reelsSelected-1]);

    var bnrMsg = null;
    if(win<bet)
        ;
    else if(win <  bet * 10)
        bnrMsg = TXT_CONGRATS_X1_X4;
    else if(win <  bet * 20)
        bnrMsg = TXT_CONGRATS_X5_X9;
    else if(win >=  bet * 20)
        bnrMsg = TXT_CONGRATS_X10_X19; 
		
		
  /*  else if(win < (bet+game.account.superbet)* 35)
        bnrMsg = TXT_CONGRATS_X20_X34;
    else if(win < (bet+game.account.superbet)* 50)
        bnrMsg = TXT_CONGRATS_X35_X49;
    else if(win >=  (bet+game.account.superbet)* 50)
        bnrMsg = TXT_CONGRATS_X50;*/
        
    if(bnrMsg)
    {
        //topBar.forceMessage(bnrMsg[Math.floor(Math.random()*bnrMsg.length)]);
        //topBar.delayMessages = true;
		BottomBarforceMessage (bnrMsg[Math.floor(Math.random() *bnrMsg.length)]);
    }
}

var forcedMessage1 = null;
var forcedTimer = 2000;

function BottomBarforceMessage (newTxt) {
	// 
	if (!game.freeGames.m_bInFreeGames)
       forcedMessage1 = newTxt; 
	else {
		game.messageBar.m_Text = newTxt;
	}
};

game.api_resetWinMeterTimer = function()
{
    // we have last free spin with NO win + next free spin selection screen should be shown
    if(this.winMeterCurrentAmount == this.winMeterTargetAmount)	
    {	
        this.winMeterDisplayCounter = 0;
        this.ui.showWinMeter(false);
        this.redraw = 1;			// need to redraw the background to hide all evidence.
        this.freeGames.m_TriggerTimer = 0;
        fastFeatureTransition = true;
    }
};

var fastFeatureTransition = false;
game.api_fastFeatureTransition = function()
{
    var ret = fastFeatureTransition;
    fastFeatureTransition = false;
    return ret;
}

// =============================================================================

 


// -----------------------------------------------------
function GrowSymbol()
{
    var t = 75;
    AF.Movie.call(this, 6*t);

  //  var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('featuregold.png'),1);
 //    this.addChild(sprite);
 
}

GrowSymbol.prototype = new AF.Movie();




// -----------------------------------------------------------------------------
var srsplaying = false;
var reelStopPlaying = false;
var lastSRS = 0;
var srs=0;
var reelStops = [0,0,0,0,0];
reelManagerUpdate = function(deltaTime) {

	var RM_SPINNING = 1;
    var RM_STOPPING = 2;
    var RM_WAITING_TO_STOP = 3;
	var SPIN_DELAY = 300;

	var i;
    for(i=0; i<5; i++) {

        var r = this.reels[i];

        if (game.reelMan.reels[i].state == 3){
            if (scatterReels[i] >= 0 && (4-i + getScattersCountBeforeReel(i)) >= 2) {
                if (growSymbols[i].time > 30){
                    growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
                    growSymbols[i].visible = true;
                } else if (growSymbols[i].time <= 0) {
					//game.stopSound(); only stop sound on first scatter....
					if(!srsplaying)game.stopSound();
                    growSymbols[i].play(0);
                   	srs++;
					game.playSound("srs"+(srs));
					srsplaying = true;
                }
            } else if(scatterReels[i] >= 0 && i > 2){
				if (growSymbols[i].time > 30){
                    growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
                    growSymbols[i].visible = true;
                } else if (growSymbols[i].time <= 0) {
					//game.stopSound(); only stop sound on first scatter....
                    growSymbols[i].play(0);
					//if(scatterReels[this.reelStopIndex] >= 0){
						//setTimeout( function(){ game.playSound('reelstop4'); }, 200); 
					//}
					//console.log(">>>>>> PALYED SCATTER LAND NON SRS");
					game.playSound('reelstop4');
                }
			}
        } else if (game.reelMan.reels[i].state == 0) {
			if (reelStops[i] != 1) {
                reelStops[i] = 1;
                if (i <= 3 && getScattersCountBeforeReel(i+1) >= 2){
                    setTimeout(function(){
                        game.playSound("windup");
						//console.log(">>>>> played windup sound");
                    }, 100);
                }
            }
            growSymbols[i].stop(0);
            growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
			reelStopPlaying = false;
			
			
        /*} else if (game.reelMan.reels[i].state == 3 && scatterReels[i] == -1) {
					var reel_sound = String('reelstop'+i);
					console.log(">>>>>> play "+reel_sound);
				if(!reelStopPlaying){
					reelStopPlaying = true;
					game.playSound(reel_sound);
				}
		}		if(game.reelMan.reels[4].state == 0){
			srsplaying = false;
		}*/
		} 

    }
	
    switch(this.state)
    {
        case RM_STOPPING:
			this.crankOffset = 0;
           // this.stoppingTime += deltaTime;
			SPIN_DELAY = 300;
           if(getScattersCountBeforeReel(this.reelStopIndex) >= 2){

                //- If previous reel is stopped
				SPIN_DELAY = 1500;

                this.crankOffset = 0;
                this.stoppingTime += deltaTime;

                //- Increase stop time for windable reel
                if(this.stoppingTime >= 2000){ //2800
                    //Reel stops come from m_SlotResult.
                    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
					
                    this.stoppingTime = 0;
					if(scatterReels[this.reelStopIndex] == -1){
						setTimeout( function(){ game.playSound('reelstop4'); }, 500); 
					}
                    this.reelStopIndex++;
                    if(this.reelStopIndex >= this.numReels){
                        this.state = RM_WAITING_TO_STOP;
                    }
                }

                for(i=0; i<5; i++){
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            } else if(  getScattersCountBeforeReel(this.reelStopIndex) > 0 &&
                        (scatterReels[this.reelStopIndex] >= 0 && (4-this.reelStopIndex + getScattersCountBeforeReel(this.reelStopIndex)) >= 2)){

                this.crankOffset = 0;
                this.stoppingTime += deltaTime;

                if(this.stoppingTime >= 300)
                {
                    //Reel stops come from m_SlotResult.
                    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
                    this.stoppingTime = 0;
                    this.reelStopIndex++;
                    if(this.reelStopIndex >= this.numReels)
                    {
                        this.state = RM_WAITING_TO_STOP;
                    }
                }

                for(i=0; i<5; i++){
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            } else if( scatterReels[this.reelStopIndex] == -1 ){
				
				this.crankOffset = 0;
               this.stoppingTime += deltaTime;
			  // console.log('>>>>>>>>> GOT HERE 1');

                if(this.stoppingTime >= SPIN_DELAY)
                {
                    //Reel stops come from m_SlotResult.
                    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
					//console.log('>>>>>>>>> GOT HERE 2');
                    this.stoppingTime = 0;
					//if(getScattersCountBeforeReel(4) != 0){
						if(scatterReels[this.reelStopIndex] == -1){
							setTimeout( function(){ game.playSound('reelstop4'); }, 500); 
						}
					//}
                    this.reelStopIndex++;
                    if(this.reelStopIndex >= this.numReels)
                    {
                        this.state = RM_WAITING_TO_STOP;
                    }
                }
				
                for(i=0; i<5; i++){
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
			}
            break;

        case RM_WAITING_TO_STOP:
            {

                var allStopped = true;

                for(i = 0; i < 5; i++){
                    if(!this.reels[i].isStopped()){
                        allStopped = false;
                        break;
                    }
                }

                if(allStopped){
                    this.state = 0;
                }

                for(i=0; i<5; i++){
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;
    }

    overridenFunctions.updateReelManager.call(this, deltaTime);
};

function getScattersCountBeforeReel(reel){
    var result = 0;
    for (var i = 0; i < reel; ++i){
        if (scatterReels[i] >= 0){
            result++;
        }
    }
    return result;
};
 


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
 
AF.Text.prototype.setMixedFormat = function(format)
{
	AF.Assert.exists(format);
	if(typeof format == "string")
	{
		format = Text.formats[format];
	}
	for(var p in format)
	{
        if(p == "x" || p=="y" || p =="text")
            this[p] = format[p];
        else
            this.textFormat[p] = format[p]; 
	}
};

/*overridenFunctions.startWinMeter = game.startWinMeter;
game.startWinMeter = function(startAmount, targetAmount)
{
 	
    if (startAmount >= targetAmount || !scatterTriggerComplete || game.ui.winMeterShow){
 
	 if(!afterrecover)
     this.setState(SS_WIN_PAYLINE);  
	 else 
	     afterrecover = false; 
	  
	   return;   
    }
  
 overridenFunctions.startWinMeter.call(this, startAmount, targetAmount);
}*/

function showWinCelebration()
{
    scatterTriggerComplete = true;

    if(game.slotResult.getFreeGamesLeft())
    {
        var win = game.freeGames.m_bInFreeGames?  currentWin : game.slotResult.winAmount;
        var bet = game.account.betAmounts[game.account.currentBetIndex]*Number(game.account.way243BetMultiplier[game.account.reelsSelected-1]);

        if((game.slotResult.winType & WT_FEATURE_TRIGGER ) || win >= bet*20){
            game.playSound('win2');
        } else if(win > 0){
            game.playSound('win1');
        }

        game.playBigWinCelebration();

        game.startWinMeter(game.winMeterLastAmount,game.account.winAmount);
    }
    else if (game.freeGames.m_bInFreeGames)
    {
        game.playWinSounds();
        game.startWinMeter(game.winMeterLastAmount,game.account.winAmount);
        game.winMeterLastAmount = 0;
    }
    else
    {
        game.playWinSounds();
        game.startWinMeter(0,game.account.winAmount);
        this.winMeterLastAmount = 0;
    }
}




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

            slot["00"] = new WildSymbol();
            slot["00"].x = column * (game.layout.symbolWidth + game.layout.reelGap);
            slot["00"].y = row * game.layout.symbolHeight;
            slot["00"].visible = false;
            this.addChild(slot["00"]); 

            slot["11"] = new ScatterSymbol();
            slot["11"].x = column * (game.layout.symbolWidth + game.layout.reelGap) ;
            slot["11"].y = row * game.layout.symbolHeight;
            slot["11"].visible = false;
            this.addChild(slot["11"]);

            matrix[column].push(slot);
        }
		
growSymbols[column] = new GrowSymbol();
growSymbols[column].x = column * (game.layout.symbolWidth + game.layout.reelGap);
growSymbols[column].visible = false;
this.addChild(growSymbols[column]);
 		
    }

    game.api_animateWins = function()
    {

	 for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
                 var sym = game.reelMan.reels[i].slots[j];
                 if (sym.currentSymbol == 0)
				 sym.setSymbol(17);
         }
    }	 

	
 	 

        var bitfield = 0;

        for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
        {
            bitfield |= game.slotResult.paylineWins[payline].second;
        }

        var isWildWin = false;
		var tempsym = [];
        // now we tell each reel to animate the appropriate symbols.
        for(var row = 0; row < 3; row++)
        {
            for(var column = 0; column < 5; column++)
            {
                var symbol;
                var symbolId = game.reelMan.reels[column].slots[row+1].currentSymbol;

                if(bitfield & 0x00000001)
                {
                    if(symbolId > 8 && symbolId < 17 )
                    {
                      isWildWin = true;
                      symbol = matrix[column][row]["00"];
                      symbol.visible = true;
					  symbol.showwild(symbolId);
 				      symbol.play(0); 
					  
                    } else if(symbolId == 8)
					
					{  
                        symbol = matrix[column][row]["11"];
                         symbol.play(0);
						 
						tempsym.push(symbol) ;
						 
					//	symbol.visible = true;
					 if(!afterrecover2) 
 					    game.playSound('featureYiihaa');
		
						
		 if(!afterrecover2) 
		{ 			
		  setTimeout(function() {   
			for(var i = 0; i < tempsym.length ; i++)	
			tempsym[i].visible = true;		
			 game.playSound('scatterAnim'); 	
			 }, 2620) ;
		}
 						
                    }
					
					
                }
                bitfield = bitfield>>1;
            }
        }

 
      
    };  
   
    game.api_stopWinAnims = function()
    {
		if(!(game.slotResult.winType & WT_PICK_FEATURE_TRIGGER) && !game.slotResult.numFreeGames)
        game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
        topBar.showNextMessage();
		
 		
		
        for(var row = 0; row < 3; row++)
        {
            for(var column = 0; column < 5; column++)
            {
                var slot = matrix[column][row];
			 
 
                slot["00"].stop(0);
                slot["00"].visible = false;

                slot["11"].stop(0);
                slot["11"].visible = false; 
            }
        }
    };
}

SymbolsMovie.prototype = new AF.Movie();


  
 


// #############################################################################################
// #############################################################################################
// 
// GENERIC FUNCTIONS
//
// #############################################################################################
// #############################################################################################


//create a delay based on the wins
//if its a simple win create a time to show the shower and then swap the message for play now
//during big win we have to keep this interval longer until finish the shower.
//if there is no win, just swap the message immediatelly
function delayMessageBoxBottom(message){

    var delayMessage;

    if(isBigWin()){
        delayMessage =  3500;
    }else if(isWin()){
        delayMessage =  3000;
    }else{
        delayMessage = 0;   
    }

    
    if(delayMessage > 0){
        setTimeout (function () {
            game.messageBar.m_Text = message;  
        } , delayMessage)
    }else{
        game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;     
    }
    
}


function isBigWin(){
    var isBigWin = false;
    var win = game.freeGames.m_bInFreeGames?  fgCW : game.slotResult.winAmount;
    var bet = (game.slotResult.linesBet) * game.slotResult.betPerLine;
    if(win >= bet * 5) isBigWin = true;
    return isBigWin;
}


function isWin(){
    var isWin = false;
    var win = game.freeGames.m_bInFreeGames?  fgCW : game.slotResult.winAmount;
    if(win > 0) isWin = true;
    return isWin;
}


