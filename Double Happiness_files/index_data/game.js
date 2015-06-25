game.account.setNumPaylines(25,25);
game.defaultStops = [0,0,0,0,0];

var RTP_VALUE = ['93.057%'];
var gAudioSettings = {
	resources: [ 'DoubleHappiness.caf', 'DoubleHappiness.mp3', 'DoubleHappiness.wav' ],
	spritemap: { 
		'click': { 'start': 0.907, 'end': 1.142 },
        // 'spin' -- removed
		'reelstop':  { 'start': 2.335, 'end': 3.923 },
		'win1':  { 'start': 4.890, 'end': 5.849 },
		'win2':  { 'start': 6.954, 'end': 11.009 },
        'srs1':  { 'start': 12.019, 'end': 12.598 },
        'srs2':  { 'start': 13.608, 'end': 14.127 },
        'srs3':  { 'start': 15.130, 'end': 15.679 },
        'srs4':  { 'start': 16.792, 'end': 17.341 },
        'srs5':  { 'start': 18.563, 'end': 19.105 },
		'featureTrBell':  { 'start': 20.137, 'end': 22.728 },
		'freespin1':  { 'start': 23.709, 'end': 26.132},
		'freespin2':  { 'start': 27.150, 'end': 29.551},
        'doubleWild':  { 'start': 30.590, 'end': 34.909},
		'rollup':  { 'start': 35.948, 'end': 38.254},
        'summary':  { 'start': 39.249, 'end': 43.297}
	}
};
 
var buttons_ui = 'language/'+windowObj.languageCode+'/buttons_ui.png';
// ---------------- Assets -------------------------------
game.ASSET_MANAGER.queueFiles([
	'reelbg.jpg',
    'reelbgfree.jpg',
	'gamename.png',
	'newbar.png',
	'symbols.jpg',
	'elements.png',
	buttons_ui,
	'btnsGlow.png',
	'game-settings.jpg',
	'turndevice.png',
	'sym00.jpg',
	'sym12.jpg',
	'paylinesend.png',
	'coin.png',
    'button_begin.png',
    'collide_x10.png',
    'start_feature.png',
    'win_feature.png',
    'intro_img.png',
    'scatter_grow.png',
    'summary_img.png',
    'frame.jpg',
    'intro.jpg'
]);

// ---------------- slots ---------------------
var reelStrips = [
	[5,8,2,10,11,3,6,5,10,4,8,3,6,12,9,1,11,5,7,3,8,0,9,1,10,2,11,5,8,1,9,4,10,5,6,2,11,1,8,6,12,10,4,9,0,11,2,8,1,9,5,11,2,10,1,9],
	[7,1,11,5,7,9,0,6,4,10,11,3,9,2,7,4,11,12,8,5,10,9,4,11,3,6,1,9,0,7,4,11,2,10,9,5,7,3,9,1,11,5,8,12,11,3,9,5,6,4,11,1,9,3,8,5,10],
	[11,4,10,1,7,2,9,5,10,1,8,7,2,6,4,10,3,7,12,8,6,0,10,7,2,8,3,11,10,4,6,2,7,0,8,3,9,5,10,1,8,7,2,10,3,8,1,7,4,10,8,0,11,5,6,2],
	[6,3,7,1,8,11,4,7,0,11,2,6,1,8,3,7,11,4,6,2,10,12,7,5,11,4,10,2,9,0,6,5,7,1,8,0,9,7,3,6,0,11,1,7,2,10,4,6,12,11,5,7,3,10,4,9,2,11],
	[5,8,4,9,0,7,10,3,9,4,8,10,2,7,0,9,6,1,8,3,7,2,6,4,11,9,12,8,3,6,5,10,11,1,7,3,9,0,10,5,6,2,11,7,12,9,4,10,0,8,5,7,9,3,11,1,10,7]
];

//------------------ Test Functions -----------------------------------
var test = function()
{   // test  21;6;21;8;4     9;17;18;18;7      2scatters
	$("input[name='stops']").val("21;6;21;8;4");
};

var test2 = function() 
{
	//$("input[name='stops']").val("4;10;3;21;7");
    $("input[name='stops']").val("13;17;18;21;7");
};

function sprintf(format, etc) {
	var arg = arguments;
	var i = 1;
	return format.replace(/%((%)|s)/g, function (m) { return m[2] || arg[i++] })
}

var symTextures = [], symSprites = [], symAnims = [];
for (var i=0; i<=12; i++)
{
	symTextures.push('symbols.jpg');
	symSprites.push([ {x:150*i,y:0,w:150,h:150} ]);
	symAnims.push( [ {t:0} ]);
}

var instructionsPopup;
var growSymbols;
var currentWin;
var rememberState;
var backToSpin = false;
var scatterTriggerComplete = true;
var winCelebrationsComplete = true;
var afterrecover = false;

var initAssets = function()
{   // apiExt("SET_MENU_BTN_SWITCH",false);
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
	game.imageReelBGfree    = game.ASSET_MANAGER.getAsset('reelbgfree.jpg');
	game.imageGameName = null;
	game.imageSymbols      = game.ASSET_MANAGER.getAsset('symbols.jpg');
	game.imageTurnDevice  = game.ASSET_MANAGER.getAsset('turndevice.png');
	game.imageSprayAnim   = game.ASSET_MANAGER.getAsset('coin.png');
	game.imagePaylineEnds = game.ASSET_MANAGER.getAsset('paylinesend.png');
    
    game.ui.initAssets(false);

	game.reelMan = new ReelManager();
	
	for(var i=0; i<reelStrips.length; i++)
		game.reelMan.setReelStrip(i,reelStrips[i]);
        
    overridenFunctions.updateReelManager = game.reelMan.update;
    game.reelMan.update = reelManagerUpdate;
    
    overridenFunctions.showSymbolsReelManager = game.reelMan.showSymbols;
    game.reelMan.showSymbols = showSymbolsReelManager;

	layout = new Layout();
	layout.orient(0);

	topBar = new TopBar();
    topBar.x = layout.TOP_MESSAGE_BAR.x;
    topBar.y = layout.TOP_MESSAGE_BAR.y;
	AF.Movie.root.addChild(topBar);
    topBar.showNextMessage();
    
    instructionsPopup = new InstructionsPopup();
    instructionsPopup.x = -30;
    instructionsPopup.y = 10;
    AF.Movie.root.addChild(instructionsPopup);
    
    fgIntroMovie = new IntroMovie(TXT_FREE_GAMES_INTRO_TITLE, TXT_FREE_GAMES_WON_VALUE, TXT_FREE_GAMES_WON_INTRO, TXT_FREE_GAMES_INTRO_TXT1, TXT_FREE_GAMES_INTRO_TXT2, TXT_FREE_GAMES_INTRO_TXT3,TXT_FREE_GAMES_INTRO_TXT4, TXT_FREE_GAMES_INTRO_TXT5);
	AF.Movie.root.addChild(fgIntroMovie);
    fgIntroMovie.visible = false;
	
	summaryPanel = new SummaryMovie(TXT_FREE_GAMES_SUMARY_TITLE, TXT_FREE_GAMES_TOTALWIN, TXT_FREE_GAMES_TOTALWIN_VALUE);
	AF.Movie.root.addChild(summaryPanel);

    if (game.recoverySlotResult.numFreeGames == 0){
        instructionsPopup.show();
    }
    
	freeGamesMovie = new FreeGamesMovie();
    freeGamesMovie.visible = false;
	AF.Movie.root.addChild(freeGamesMovie);
	
	symbols = new SymbolsMovie();
	symbols.x = game.layout.REELS.x;
	symbols.y = game.layout.REELS.y;
	AF.Movie.root.addChild(symbols);

    featureTriggerSound = new FeatureTriggerSound();
    AF.Movie.root.addChild(featureTriggerSound);
    
    featureReTriggerSound = new FeatureReTriggerSound();
    AF.Movie.root.addChild(featureReTriggerSound);

	randomSprayAnim = new RandomSprayAnim();
	randomSprayAnim.setAnimConfig();
	
    game.account.superbet = 5;
	game.account.superbetLines = 5;
	game.ui.doAnte(restoreInfo.ABPM);
        
	game.api_processClickRelease = function(coords)
	{
        instructionsPopup.processClick(coords);
	};
	game.api_processClick = function(coords)
	{

	};
	game.api_buttonsUp = function()
	{

	};

	var reelSetState = game.reelMan.reels[0].setState;
	game.reelMan.reels[0].setState = function(newState){
		if(newState == this.state)
			return;
		
		if (this.state == 2 && newState == 3 && !game.freeGames.m_bInFreeGames)
			game.playSound('reelstop');
			
		reelSetState.call(this,newState);
	}
};

showSymbolsReelManager = function (show, bitfield) {
    if (!show)
        symbols.showSymbols(bitfield);
    overridenFunctions.showSymbolsReelManager.call(this, show, bitfield);
};
showSymbolsReelManager.oldBitfield = null;

function BackToSpin()
{
    backToSpin = true;
    game.startSpin();
}
// -----------------------------------------------------------------------------


game.api_startGame = function()
{
	 

 
	
	 if( game.inRecovery)
        afterrecover = true;
 		game.startIdleMessages(true);

 };



game.uapi_showSpinBtn = function()
{
    return true;// !(/*introPanel.visible /*|| dicePanel.visible*//* ||*/ preIntroPanel.visible /*|| summaryPanel.visible*/)
};


var btnsEnable = false;
game.api_featureBtnDisable = function()
{
    btnsEnable = false;
};
game.api_featureBtnEnable = function(canbet)
{
    if(canbet)
        btnsEnable = true;
};



game.uapi_showWinMeter = function(state) {

    if (!state && !winCelebrationsComplete && scatterTriggerComplete){
        winCelebrationsComplete = true;

        if (game.slotResult.winType & WT_PICK_FEATURE_TRIGGER){
            game.startFeature();
        } else {
            if (game.gameState != SS_FREEGAME_INTRO){
                game.setState(SS_FREEGAME_INTRO);
 
            } else {
                game.setBShowFreeSpinBg(true);
              //  game.api_beforeFirstFreeGame();
 
            }
        }
    }
};



game.api_beforeFirstFreeGame = function()
{
    /*if (!winCelebrationsComplete){
        return;
    }*/
	
	if (!this.freeGames.m_bInFreeGames && !game.inRecovery)		// if we are not in free games yet.
	{
        var firstPositionHead1 = this.slotResult.WIP[0].split(";");
        var firstPositionHead2 = this.slotResult.WIP[1].split(";");
        freeGamesMovie.moveHeads(positionsProvider(firstPositionHead1[0], firstPositionHead1[1]), positionsProvider(firstPositionHead2[0], firstPositionHead2[1]), true);
       
        fgIntroMovie.updateFreeGamesWin(game.slotResult.freeGamesWon);
		
	setTimeout( function(){
		fgIntroMovie.visible = true;
        fgIntroMovie.play(0);
		}, 5000) ;	
	
		
		
        playFreeGames = true;
	}
    else if (!game.inRecovery)
    {
        game.startSpin();
    }



    //cancel the autoplay button during freegames
    //new requirement
    resetAutoPlay();

};



// As a new requirement, the autoplay button should be canceled as soon as trigger the freegames
function resetAutoPlay(){
    game.autoPlay = false;
    game.requestToStopAutoPlay = false;
    game.ui.autoPlayMode = game.ui.AUTO_OFF;
    game.autoPlayGames = 0;
}



game.api_beginFeature = function()
{
    if (!winCelebrationsComplete){
        return;
    }
	inFeature = true;	
};

game.api_changeOrientation = function()
{
	game.ui.layout.SPIN2_BTN = { x:690+20, y:819 };
    game.ui.layout.START_AUTOPLAY2_BTN = { x:690+20 , y:819 };
    game.ui.layout.STOP_AUTOPLAY2_BTN  = { x:722+20 , y:819 };
	game.ui.layout.GAMES_REMAINING2_METER = { x:785-1 , y:801 };
};

game.api_extendSpinMsg = function(msg)
{
	return msg +(game.account.superbet?"ABPM=5":"") ;
}

var autoDelayAfterFeature = false;
game.api_autoDelayAfterFeature = function()
{
	return autoDelayAfterFeature;
};

game.api_lastFreeGameFinish = function()
{
    setTimeout(function(){
        summaryPanel.visible = true;
        summaryPanel.updateTotalWin(game.slotResult.totalWin);
        summaryPanel.play(0);
        game.messageBar.m_Text = TXT_FEATURE_COMPLETED;
    }, (game.slotResult.winType == 0)? 0:game.WIN_METER_DISPLAY_TIME);
};

game.api_spinningFeatureStopped = function()
{
 	
    for(var i=0; i<5; ++i) {
        growSymbols[i].visible = false;
        growSymbols[i].stop(0);
    }
    if(!(this.slotResult.winType & WT_PICK_FEATURE_TRIGGER) && !game.freeGames.m_bInFreeGames)
        this.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;

    return true/* !fireworks.isAnimating*/;
};

game.startIdleMessages = function()
{
    game.startIdleMessages = startIdleMessages;
}

var startIdleMessages = function()
{
    if (!game.account.canBet() && !game.inRecovery && !game.historyMode){
        game.messageBar.m_Text = TXT_GAME_OVER;
    }else if (!game.freeGames.m_bInFreeGames && !game.inRecovery){
        delayMessageBoxBottom(TXT_SCROLL_PLAY_NOW);
        //  game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
    }
        
};

game.updateIdleMessage = function(){};

game.api_drawWinAnim = function()
{
    fgIntroMovie.draw(ctx);
    summaryPanel.draw(ctx);
	topBar.draw(ctx);
	randomSprayAnim.draw();
};

game.api_drawLowerLevelFeature = function()
{
	symbols.draw(ctx);
    instructionsPopup.draw(ctx);
 
};

game.api_drawFeature = function()
{
    freeGamesMovie.draw(ctx);
};

var inFeature = false
game.api_inFeature = function()
{
	return instructionsPopup.visible;
};

game.api_featureUpdate = function(deltaTime)	// updating the background Flash
{
	if(deltaTime<100000)
    {
		AF.Movie.update(deltaTime);
        topBar.updateDT(deltaTime);
    }
	
	randomSprayAnim.update(deltaTime);
	if (forcedMessage1 != null && forcedTimer >0 && !game.freeGames.m_bInFreeGames && this.slotResult.getFreeGamesLeft() == 0) {
		forcedTimer -= deltaTime;
		game.messageBar.m_Text = forcedMessage1;
	} else if (!game.freeGames.m_bInFreeGames){
		forcedMessage1 = null;
		forcedTimer = 2000;
		if (this.slotResult.getFreeGamesLeft() == 0) {
		//	game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
		}
	}
};


function DelaySpinButton(mytime) 
{
	    var delaytime = mytime;
		game.ui.btnSpin.setPosition(game.layout.SPIN_BTN); 
		game.ui.layout.SPIN_BTN_GLOW =   { x:-815, y:208,  w:159, h:149}; 
	  
	    setTimeout (  function (){
          //means not show the button if the settings page is opened
          if (!game.ui.state){
            game.ui.btnSpin.setPosition(game.ui.layout.SPIN_BTN); 
          }
		  game.ui.layout.SPIN_BTN_GLOW =   { x:815, y:208,  w:159, h:149}; 
		}, delaytime)	 
 };




var fgCW;
var soundRecovery = false;
game.playWinSounds = function()
{
	var win = game.freeGames.m_bInFreeGames?  fgCW : game.slotResult.winAmount;
    var bet = (game.slotResult.linesBet+game.account.superbet) * game.slotResult.betPerLine;

	if(win<=0 && !soundRecovery)
        return;
    
    if (scatterTriggerComplete){
        game.playBigWinCelebration();
    }
    
	if(win >=  bet * 20 && !soundRecovery) {
		randomSprayAnim.init().startAnim();
		 DelaySpinButton(3500); 
	}
        
    soundRecovery= false;
	
	if(!game.freeGames.m_bInFreeGames)
	{
        if (this.slotResult.winType & WT_FEATURE_TRIGGER )
            featureTriggerSound.init();
        else if(win >= bet * 5) {
			this.playSound('win2');
			  DelaySpinButton(3000); 
		}
		else if(win > 0) {
			this.playSound('win1');
			  DelaySpinButton(100); 
		}
	}
    else if (this.slotResult.winType & WT_FEATURE_TRIGGER )
    {
      featureReTriggerSound.init();
    }
    else
    {
        if(!checkCollaide(game.slotResult.WP[0].split(";"), game.slotResult.WP[1].split(";")))
        {
            if(win >= bet * 5) {
                this.playSound('win2');
				 DelaySpinButton(3000); 
			}
            else if(win > 0){
                this.playSound('win1');
				DelaySpinButton(100); 
			}
        }
    }
    
    if (this.slotResult.freeGamesWon != 1 || win <= 0 || GSDData["SR"] == undefined) {
        game.showBannerMessage();
    }
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
		this.stopSound();
		this.myPlayer.play(soundID);
	}
};
game.setVolume = function(volume)
{
	if(this.soundsLoaded)
	{
		this.myPlayer.setVolume(volume);
	}
};
	
game.api_playFreeSpinSound = function(){
	arguments.callee.i = arguments.callee.i || 0;
	this.playSound((arguments.callee.i++ % 2)? 'freespin2' : 'freespin1');
}


game.api_runSpinningStoppedFeature = function()
{
    if(IFG==1)
    {
        var newPositionHead1CheckWin = game.slotResult.WP[0].split(";");
        var newPositionHead2CheckWin = game.slotResult.WP[1].split(";");
        
        if (newPositionHead2CheckWin[0]==newPositionHead1CheckWin[0] && newPositionHead2CheckWin[1]==newPositionHead1CheckWin[1])
        {
            freeGamesMovie.hideHeadsWin();
            freeGamesMovie.hideHeads();
            freeGamesMovie.showHeadsCollide();
            for (var row = 0; row < 3; row++) {
                for (var column = 0; column < 5; column++) {
                    if (newPositionHead1CheckWin[0]==column && newPositionHead1CheckWin[1]==row)
                    {
                        game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 0;
                    }
                }
            }
        }
    }
	
 	  
	
	 
}
game.api_animateWins = function()
{
	symbols.animateWins();
};

game.playBigWinCelebration = function(){

    var win = game.freeGames.m_bInFreeGames?  currentWin : game.slotResult.winAmount;
    bet = game.account.betAmounts[game.account.currentBetIndex]*Number(game.account.way243BetMultiplier[game.account.reelsSelected-1]);

    if((this.slotResult.winType & WT_FEATURE_TRIGGER ) || win >= bet*20){
        randomSprayAnim.init().startAnim();
    }
}

game.api_stopWinAnims = function()
{
	symbols.stopWinAnims();
    if(!(game.slotResult.winType & WT_PICK_FEATURE_TRIGGER) && !game.slotResult.numFreeGames)
        game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
    topBar.showNextMessage();
};

var overridenFunctions = {};

overridenFunctions.startSpin = game.startSpin;
game.startSpin = function()
{
    var win = game.freeGames.m_bInFreeGames?  fgCW : game.slotResult.winAmount;
    var bet = (game.slotResult.linesBet+game.account.superbet) * game.slotResult.betPerLine;
    if (IFG==1 && win>=(bet * 5) && !checkCollaide(game.slotResult.WP[0].split(";"), game.slotResult.WP[1].split(";")) && !backToSpin)
    {
        setTimeout(function() 
        {
            BackToSpin();
        }, 3000);
    }
    else
    {
        backToSpin = false;
        if(playFreeGames)
        {
            freeGamesMovie.playHeads();
        }
        else
        {
            freeGamesMovie.visible = false;
        }
        overridenFunctions.startSpin.call(this);
    }
}

overridenFunctions.uapi_betUp = game.uapi_betUp;
game.uapi_betUp = function(cycle) {
	overridenFunctions.uapi_betUp.call(this, cycle);
    freeGamesMovie.visible = false;
    for (var row = 0; row < 3; row++) {
          for (var column = 0; column < 5; column++) {
            game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 1;
         }
    }
}

overridenFunctions.uapi_betDown = game.uapi_betDown;
game.uapi_betDown = function(cycle) {
	overridenFunctions.uapi_betDown.call(this, cycle);
    freeGamesMovie.visible = false;
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
			//	console.log ("22SS_WIN_PAYLINE_FREEGAMES");
            }
        } else if (this.slotResult.IFG && this.slotResult.FID != 0){
            this.setState(SS_FREEGAME_SUMMARY);
			//	console.log ("33SS_FREEGAME_SUMMARY");
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
var playFreeGames = false;
var inRecovery = false;
var scatterReels = [];
var totalScatters = 0;

overridenFunctions.processServerMsg = processServerMsg;
processServerMsg = function(msg){
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
        }
    }

    overridenFunctions.processServerMsg.call(this, msg);
}

overridenFunctions.processMsg = game.processMsg;
game.processMsg = function(pairs,freegame)
{
    var result = overridenFunctions.processMsg.call(this,pairs,freegame);
    result.totalWin = 0;
    result.wildSubstitute = 0;
    result.freeGamesTriggered = 0;
    inRecovery = false;
    result.WIP = [];
    result.WP = [];
    
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
				else
					symbols.setWinSymbols(value);

				var winnings = value.split("|");
				break;
                
			case "CW":
                currentWin = Number(value);
				fgCW = Number(value);
				break;
				
			case "GSD":
				var gsData = value.split("#");
    			for(var j=0;j<gsData.length;j++)
    			{
    				var gsName = gsData[j].split("~")[0];
    				var gsValue = gsData[j].split("~")[1];
    				switch(gsName)
    				{
    				case "WIP":
                        result.WIP = gsValue.split("|");
    				break;
    				case "WP":
                        result.WP = gsValue.split("|");
    				break;
    				}
    			}
                newPositionsRecieved(result.WP[0], result.WP[1]);
				break;

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
        soundRecovery = true;
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

            if(sym == 12){
                totalScatters++;
                scatterReels[i] = row;
                break;
            }
        }
    }
	
/*	console.log( "scatterReels ///  " +scatterReels );
 	   var aaa = game.slotResult.WP[0].split(";");
       var bbb = game.slotResult.WP[1].split(";");
 	 console.log("this.slotResult.WIP[0].split  --" + aaa);
 	console.log("this.slotResult.WIP[1].split  --" +  bbb  );
	*/
	
	
};

function newPositionsRecieved(newPosition1, newPosition2)
{
    if(game.freeGames.m_bInFreeGames && freeGamesMovie.roamingWildStarted)
    {
        freeGamesMovie.moveHeads(newPosition1, newPosition2, false);
    }
}

overridenFunctions.recover = game.recover;
game.recover = function()
{
    overridenFunctions.recover.call(this);
    if (inRecovery && game.slotResult.WIP.length>0 && IFG==1)
    {
        this.slotResult = this.recoverySlotResult;
        var firstPositionHead1 = this.slotResult.WP[0];
        var firstPositionHead2 = this.slotResult.WP[1];
        freeGamesMovie.moveHeads(firstPositionHead1, firstPositionHead2, true);
        playFreeGames = true;
        freeGamesMovie.visible = true;
        freeGamesMovie.roamingWildStarted = true;
        freeGamesMovie.showHeads();
        freeGamesMovie.playHeads();
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
 
    if (!game.inRecovery){
        totalScatters = 0;
        scatterReels = [];
    }
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
    else if(win < (bet+game.account.superbet)* 5)
        bnrMsg = TXT_CONGRATS_X1_X4;
    else if(win < (bet+game.account.superbet)* 10)
        bnrMsg = TXT_CONGRATS_X5_X9;
    else if(win < (bet+game.account.superbet)* 20)
        bnrMsg = TXT_CONGRATS_X10_X19;
    else if(win < (bet+game.account.superbet)* 35)
        bnrMsg = TXT_CONGRATS_X20_X34;
    else if(win < (bet+game.account.superbet)* 50)
        bnrMsg = TXT_CONGRATS_X35_X49;
    else if(win >=  (bet+game.account.superbet)* 50)
        bnrMsg = TXT_CONGRATS_X50;
        
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
    // server issue, furing restoration win always=0 (even if there is a win)
    if(inRecovery)
        return;

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

function InstructionsPopup ()
{
    AF.Container.call(this);
    this.visible = false;

    var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset('frame.jpg'), 1);
    bg.x = 155;
    bg.y = 100;
    this.addChild(bg);
    
    var nameIntro = new AF.Sprite(game.ASSET_MANAGER.getAsset('gamename.png'), 1);
    nameIntro.x = 305;
    nameIntro.y = 60;
    nameIntro.scaleX = nameIntro.scaleY = 0.7;
    this.addChild(nameIntro);

    var scatter = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.jpg'), 13);
    scatter.frame = 12;
    scatter.x = 433;
    scatter.y = 200;
    this.addChild(scatter);

    var bntBackground = new AF.Sprite(game.ASSET_MANAGER.getAsset('button_begin.png'), 1);
    bntBackground.x = 467;
    bntBackground.y = 455;
    this.addChild(bntBackground);
    
    var imgIntro = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro_img.png'), 1);
    imgIntro.x = 775;
    imgIntro.y = 355;
    imgIntro.scaleX = imgIntro.scaleY = 0.85;
    this.addChild(imgIntro);

    var txt1 = new AF.Text();
    txt1.setMixedFormat(MESSAGE_INSTRUCTION_1);
    this.addChild(txt1);

    var txt2 = new AF.Text();
    txt2.setMixedFormat(MESSAGE_INSTRUCTION_2);
    this.addChild(txt2);

    var txt3 = new AF.Text();
    txt3.setMixedFormat(MESSAGE_INSTRUCTION_3);
    this.addChild(txt3);
    
    var txt4 = new AF.Text();
    txt4.setMixedFormat(MESSAGE_INSTRUCTION_4);
    this.addChild(txt4);
	
	var txt5 = new AF.Text();
    txt5.setMixedFormat(MESSAGE_INSTRUCTION_5);
    this.addChild(txt5);

    var bntTxt = new AF.Text();
    bntTxt.setMixedFormat(MESSAGE_BTN_BEGIN);
    this.addChild(bntTxt);

    var btnLayout = {nx:0, ny:0, nwidth:184, nheight:80,  dx:0, dy:0, dwidth:184, dheight:80};
    var button = new Button(null, btnLayout);
    button.setPosition({x:421, y:435});

    this.show = function()
    {
        this.visible = true;
    };

    this.hide = function()
    {
        this.visible = false;
    };

    this.processClick = function(coords)
    {
        coords.y-=8;
        if (this.visible){
            if(button.isOver(coords)){
                this.hide();
            }
        }
    };
}
InstructionsPopup.prototype = new AF.Container();

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
    var durationBell = Math.round(gAudioSettings.spritemap.featureTrBell.end*1000 - gAudioSettings.spritemap.featureTrBell.start*1000 + 500);
	
    AF.Movie.call(this, durationBell );

    this.addAction(function(){
        game.playSound('featureTrBell');
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
    var durationBell = Math.round(gAudioSettings.spritemap.featureTrBell.end*1000 - gAudioSettings.spritemap.featureTrBell.start*1000 + 500);

	AF.Movie.call(this, durationBell*2);

    this.addAction(function(){
        game.playSound('featureTrBell');
	}, 10);
    
    this.addAction(function(){
        game.playSound('featureTrBell');
	}, durationBell); 

    this.addAction(function(){
        this.stop(0);
        this.visible = false;
	}, durationBell*2 -1);
    
    this.visible = false;
    this.init = function()
    {
       game.freeGames.m_TriggerTimer = durationBell*2;
 	    this.visible = true;  
        this.play(0);
 
		
    };
}
FeatureReTriggerSound.prototype = new AF.Movie();

// -----------------------------------------------------------------------------

function WildSymbol()
{
	var t = 140;
	AF.Movie.call(this, 17*t);	
	
	var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym00.jpg'),14);
	this.addChild(sprite);
	
    this.addTween(new AF.SpriteTween(sprite).set(t, "0-2,2-11,11-13,0", 17*t));
};
WildSymbol.prototype = new AF.Movie();

function ScatterSymbol()
{
	var t = 60;
	AF.Movie.call(this, 16*t);	
	
	var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym12.jpg'),8);
	this.addChild(sprite);
	
    this.addTween(new AF.SpriteTween(sprite).set(t, "0-7,7-0", 16*t));
};
ScatterSymbol.prototype = new AF.Movie();

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
            
            slot["0"] = new WildSymbol();
			slot["0"].x = column * (game.layout.symbolWidth + game.layout.reelGap);
			slot["0"].y = row * game.layout.symbolHeight;
			slot["0"].visible = false;
			this.addChild(slot["0"]);
			
			slot["12"] = new ScatterSymbol();
			slot["12"].x = column * (game.layout.symbolWidth + game.layout.reelGap);
			slot["12"].y = row * game.layout.symbolHeight;
			slot["12"].visible = false;
			this.addChild(slot["12"]);
			
			matrix[column].push(slot);
		}
        
        growSymbols[column] = new GrowSymbol();
        growSymbols[column].x = column * (game.layout.symbolWidth + game.layout.reelGap);
        growSymbols[column].visible = false;
        this.addChild(growSymbols[column]);
	}
    
    var WS = '';
	this.setWinSymbols = function(val)
	{
		WS = val;
	}
	
	this.animateWins = function()
	{

		var bitfield = 0;

		for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
		{
			bitfield |= game.slotResult.paylineWins[payline].second;
		} 

		for(var row = 0; row < 3; row++)
		{
			for(var column = 0; column < 5; column++)
			{
				var symbol;
				var symbolId = game.reelMan.reels[column].slots[row+1].currentSymbol;
				if(bitfield & 0x00000001)
				{
				    if(IFG==1)
                    {
                
                        game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 1;
                        
	  var newPositionHead1CheckWin = game.slotResult.WP[0].split(";");
	  var newPositionHead2CheckWin = game.slotResult.WP[1].split(";");
	  
                        if (newPositionHead1CheckWin[0]==column && newPositionHead1CheckWin[1]==row && (!checkCollaide(newPositionHead1CheckWin, newPositionHead2CheckWin)))
                        {
                            freeGamesMovie.showHeads1Win();
                           freeGamesMovie.hideHeads1();
  game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 0;

//-------------				
  if(symbolId ==12 /* && game.slotResult.winType & WT_FEATURE_TRIGGER */)	
 {
 
	 freeGamesMovie.fadinHeads1();
     freeGamesMovie.hideHeads1();
	 
  game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 1;	
 
     symbol = matrix[column][row]["12"];
 
  }
  		 
							 
                        }
                        else if (newPositionHead2CheckWin[0]==column && newPositionHead2CheckWin[1]==row && (!checkCollaide(newPositionHead1CheckWin, newPositionHead2CheckWin)))
                        {
                            freeGamesMovie.showHeads2Win();
                            freeGamesMovie.hideHeads2();
  game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 0;

//-------------				
  if(symbolId ==12/* && game.slotResult.winType & WT_FEATURE_TRIGGER */)	 
  {
	 	
	 freeGamesMovie.fadinHeads2(); 
     freeGamesMovie.hideHeads2(); 
	   
  game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 1;	
  	
   	symbol = matrix[column][row]["12"];		
	
					
  }
  
  
                        }
                        else
                        {
                            if(symbolId == 0)
        						symbol = matrix[column][row]["0"];
                            else if(symbolId == 12)
        						symbol = matrix[column][row]["12"];
                        }
                    }
                    else
                    {
    				    if(symbolId == 0)
    						symbol = matrix[column][row]["0"];
                        else if(symbolId == 12)
    						symbol = matrix[column][row]["12"];
                    }
					
					if(symbol)
					{
						symbol.visible = true;
						symbol.play(0);
					}
				}
                else
                {
                    if(IFG!=1 && game.slotResult.freeGamesTriggered>0)
                    {
                        if(symbolId == 12)
				            symbol = matrix[column][row]["12"];
                    }
					
					if(symbol)
					{
						symbol.visible = true;
						symbol.play(0);
					}
                }
                
				bitfield = bitfield>>1;
			}
			
		}

	};
	
    
    //////////////////////////
    this.showSymbols = function (bits) {
        var lines = WS.split("|");
          
        for (var row = 0; row < 3; row++) {
          for (var column = 0; column < 5; column++) {
            var slot = matrix[column][row];
            if ((bits & 0x00000001)) {
                var symID = game.reelMan.reels[column].slots[row + 1].currentSymbol;
                if(IFG==1 && symID == 0)
                {
                    game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 0;
                }
            }
            bits = bits >> 1;
          }
        }
    };
    /////////////////////////////////////////
    
	this.stopWinAnims = function()
	{
		for(var row = 0; row < 3; row++)
		{
			for(var column = 0; column < 5; column++)
			{
				var slot = matrix[column][row];
                
                slot["0"].stop(0);
				slot["0"].visible = false;
				
				slot["12"].stop(0);
				slot["12"].visible = false;
			}
		}
	};
};

SymbolsMovie.prototype = new AF.Movie();

function GrowSymbol()
{
    var t = 75;
    AF.Movie.call(this, 6*t);

    var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter_grow.png'),1);

    this.addChild(sprite);
    this.addTween(new AF.Tween(sprite, "scaleX", 0).set(0, 1).set(2*t, 1.5).set(5*t, 1));
    this.addTween(new AF.Tween(sprite, "scaleY", 0).set(0, 1).set(2*t, 1.5).set(5*t, 1));
    this.addTween(new AF.Tween(sprite, "x", 0).set(0, 0).set(2*t, -35).set(5*t, 0));
    this.addTween(new AF.Tween(sprite, "y", 0).set(0, 0).set(2*t, -35).set(5*t, 0));
}

GrowSymbol.prototype = new AF.Movie();

// -----------------------------------------------------------------------------
function checkCollaide(newPositionHead1CheckWin, newPositionHead2CheckWin)
{
    if (newPositionHead2CheckWin[0]==newPositionHead1CheckWin[0] && newPositionHead2CheckWin[1]==newPositionHead1CheckWin[1])
    {
        return true;
    }
    else
    {
        return false;
    }
}

reelManagerUpdate = function(deltaTime) {

    var RM_SPINNING = 1;
    var RM_STOPPING = 2;
    var RM_WAITING_TO_STOP = 3;

    var i;

    for(i=0; i<5; i++) {

        var r = this.reels[i];

        if (game.reelMan.reels[i].state == 3){
            if (scatterReels[i] >= 0 && ((getScattersCountBeforeReel(i)) > 0 || i == 0)) {
                if (growSymbols[i].time > 30){
                    growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
                    growSymbols[i].visible = true;
                } else if (growSymbols[i].time <= 0) {
                    growSymbols[i].play(0);
                    game.playSound("srs"+(i+1));
                }
            }
        } else if (game.reelMan.reels[i].state == 0) {
            growSymbols[i].stop(0);
            growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
        }
    }

    switch(this.state)
    {
        case RM_STOPPING:
            //- If 2 scatters landed on reels
            if(getScattersCountBeforeReel(this.reelStopIndex) >= 2){

                this.crankOffset = 0;
                this.stoppingTime += deltaTime;

                //- Increase stop time for windable reel
                if(this.stoppingTime >= 2500){
                    //Reel stops come from m_SlotResult.
                    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);

                    this.stoppingTime = 0;
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

                if(this.stoppingTime >= 1000)
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
        } else {
            return 0;
        }
    }
    return result;
}

function Circle(r, color)
{
	AF.DObject.call(this);
	this.radius = r;
};
Circle.prototype = new AF.DObject();
AF.Circle = Circle;
Circle.prototype.performDraw = function(ctx)
{
	ctx.beginPath();
	ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
	ctx.closePath();
	ctx.fillStyle = "#999999";
	ctx.lineWidth=5;
	ctx.strokeStyle="#FE0000";
	ctx.stroke()
	ctx.fill();
};

Circle.prototype.isOver = function(coords)
{
	// NO SCALES HERE
	return (Math.sqrt(Math.pow(coords.x - this.x, 2) + Math.pow(coords.y - this.y, 2))<this.radius);
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

/*
// server issue, furing restoration win always=0 (even if there is a win)
overridenFunctions.startWinMeter = game.startWinMeter;
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
}
*/

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
    var win = game.freeGames.m_bInFreeGames?  freeGameCurrentWin : game.slotResult.winAmount;
    var bet = (game.slotResult.linesBet) * game.slotResult.betPerLine;
    if(win >= bet * 5) isBigWin = true;
    return isBigWin;
}


function isWin(){
    var isWin = false;
    var win = game.freeGames.m_bInFreeGames?  freeGameCurrentWin : game.slotResult.winAmount;
    if(win > 0) isWin = true;
    return isWin;
}
