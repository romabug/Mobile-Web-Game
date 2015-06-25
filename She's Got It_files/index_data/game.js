game.account.setNumPaylines(20,20);
game.defaultStops = [0,7,8,8,0];

//var  languagePath = 'language/' + languageCode + '/';
// before integration 
 

var gAudioSettings = {
	resources: [ 'ShesGotIt.m4a', 'ShesGotIt.caf', 'ShesGotIt.mp3', 'ShesGotIt.wav' ],

	spritemap: { 'click': { 'start': 1.037, 'end': 1.382 },
	              'spin':  { 'start': 2.428, 'end': 5.183 },
				 'spin2':  { 'start': 6.233, 'end': 9.016 },
				 'win1':  { 'start': 10.012, 'end': 11.430 },  //- any win
				 'win2':  { 'start': 12.508, 'end': 16.368 }, //- x5 win, feature trigger/summary
				 
				 'featureloop': {'start': 32.742, 'end': 36.514, 'loop': true},//Pick Me Loop (while waiting for player selection) 
                 'freespin1': {'start': 17.238, 'end': 20.139},
				 'freespin2': {'start': 20.935, 'end': 23.801},
				 'prizerollup': {'start': 24.914, 'end': 26.708 },  //Win Dings 
				 'pickreveal': {'start': 37.516, 'end': 39.934}
	}
};        
 
var symbols;
var feature	= null;
var featureFPM = "";
var featurePair = "";
var gameTitleMovie;
var randomSprayAnim;
var featureTriggered = false;
var fgCW;
var featureResult;
   
var OpenStar;
var Singing;


   

// ---------------- Assets ----------------------------------
//
game.ASSET_MANAGER.queueFiles([
	'reelbg.jpg',
	'reelbgfree.jpg',
 	'symbols.png',
	'elements.png',
	'buttons_ui.png',
	'frame.jpg',
	'panel.png',
	'turndevice.png',
	'sym00.jpg',
 'symFeatureLoop.jpg',
 //'symFeatureLoop2.jpg',  
	'paylinesend.png',
    'big_win.png',
	'scatter.jpg',
	'gametitle01.png',
	'gametitle02.png',
	'gametitle03.png',
		'scatter.jpg',
'scatter_left.png',
'scatter_right.png',
'scatter_top.png',
'scatter_bottom.png' ,  
	   'girls.png','musicNotes.png'   
 	
]);

  InitFeatureAssets();
  
  var reelStrips = [
[6,4,0,7,5,9,2,8,4,7,1,8,4,6,3,5,9,2,7,9,8,3,6,7,8,10,5,9,8,3,5,6,9,10],
[4,8,0,5,6,9,2,4,5,6,8,3,7,4,9,10,7,6,9,3,5,6,9,1,7,4,5,2,9,8,4,10,8,7],
[5,8,0,4,5,10,7,6,3,7,9,3,6,9,2,8,4,1,7,8,3,5,9,2,8,6,10,9,4,1,7,6,2,9],
[7,4,0,8,6,3,5,8,2,9,6,1,9,7,8,1,6,7,3,9,8,10,7,5,2,4,9,3,5,4,1],
[5,9,0,4,6,3,8,7,2,4,7,1,4,5,3,6,9,2,6,8,1,6,7,2,5,7,8,3,9,5,10,9,8,1]
];
 

  var reelStripsFree = [
[6,4,0,7,5,9,2,8,4,7,1,8,4,6,3,5,9,2,7,9,8,3,6,7,8,10,5,9,8,3,5,6,9,10],
[4,8,0,5,6,9,2,4,5,6,8,3,7,4,9,10,7,6,9,3,5,6,9,1,7,4,5,2,9,8,4,10,8,7],
[5,8,0,4,5,10,7,6,3,7,9,3,6,9,2,8,4,1,7,8,3,5,9,2,8,6,10,9,4,1,7,6,2,9],
[7,4,0,8,6,3,5,8,2,9,6,1,9,7,8,1,6,7,3,9,8,10,7,5,2,4,9,3,5,4,1],
[5,9,0,4,6,3,8,7,2,4,7,1,4,5,3,6,9,2,6,8,1,6,7,2,5,7,8,3,9,5,10,9,8,1]
];   
   
     

//------------------ Test Functions -----------------------------------
var test = function()
{
	$("input[name='stops']").val("32;14;26;8;0");
 
};

var test2 = function() 
{
	$("input[name='stops']").val("2;0;0;0;2");
};

 

//---------Overridable functions ---------------------------------


game.api_processClick = function(coords)
{
    return	feature.processClick(coords);
};

game.api_processClickRelease = function(coords)
{
    return	feature.processClickRelease(coords);
};

game.api_buttonsUp = function()
{
    if (feature != null){
        feature.buttonsUp();
    }
};

game.api_changeOrientation = function()
{
    // Feature buttons
    feature.setSize((game.layout.symbolWidth*5) + (game.layout.reelGap*4) , game.layout.symbolHeight*3);
    feature.setPosition(game.layout.REELS.x,game.layout.REELS.y);
};

game.api_parseFPM = function(FPM)
{
    featureFPM = FPM;
    if (feature != null)
    {
        feature.parseFPM(featureFPM);
    }
};

game.api_startGame = function()
{
 
 
};


game.api_parseCFP = function(CFP)
{
};

game.api_featureStart = function()
{
    sendFeatureStartMsg();
};

game.updateGameWinMeter = function()
{
    if (featureResult){
        game.account.addWin(featureResult.winAmount);
    } 
};

game.api_processFeatureMsg = function(msgid,pairs)
{
 
    var result = false;
    switch(msgid)
    {
	
	 
        case "FEATURE_START":

            featureResult = processFeatureMsg(pairs);
            result = true;
            break;

        case "FEATURE_PICK":
            featureResult = processFeatureMsg(pairs);
 
			
/*      
      feature.setState(feature.state == FS_PICK_LEFT?FS_PICK_LEFT:FS_PICK_RIGHT);
            if (feature.state == FS_PICK_LEFT){
                feature.pickSymbol1.setState(LS_REVEAL);
                feature.pickSymbol2.setState(LS_IDLE);
            } else {
                feature.pickSymbol1.setState(LS_IDLE);
                feature.pickSymbol2.setState(LS_REVEAL);
            }
			*/
			
			
			
  
            for(var i=0;i < pairs.length; i++)
            {
                var pair = pairs[i].split("=");
                if (pair[0] == "TW") {
                    game.slotResult.winAmount = Number(pair[1]);
                }
				
				
//new added...Figure out what the player picked


if(pair[0] == "FPM_1") {
  var picksMade = pair[1];
  
  if(Number(picksMade.charAt(picksMade.length-3)) == 0) {		// looking at the third last character as that's the last pick made
	  feature.setState(FS_PICK_LEFT);
  } else {
	  feature.setState(FS_PICK_RIGHT);
  }
}		

 			
				
				
				
				
            }

            this.stopSound();
            this.playSound("pickreveal");
            result = true;
            break;

        case "FEATURE_END":
            featureResult = processFeatureMsg(pairs);
            game.account.addWin(featureResult.winAmount);
            game.slotResult.winType = 0;
            result = true;
            feature.triggerFeature = true;

            if (game.freeGames.m_bInFreeGames) {

                for(var i=0;i < pairs.length; i++)
                {
                    var pair = pairs[i].split("=");

                    if (pair[0] == "TW") {
                        game.slotResult.winAmount = Number(pair[1]);
                    }
                }
            }

            break;
    }
    return result;
};

game.api_beginFeature = function()
{
    feature.m_TriggerTimer   = feature.TRIGGER_TIMER_DELAY;
    feature.setState(FS_INTRO);
    feature.triggerFeature = false;
};

game.api_featureUpdate = function(timeDelta)
{
    feature.update(timeDelta);

    if(timeDelta<100000)
        AF.Movie.update(timeDelta);

    randomSprayAnim.update(timeDelta);
};

game.api_drawFeature = function()
{
    feature.draw(ctx);
	
	 
};

game.api_drawLowerLevelFeature = function()
{

 
    if(!gameTitleMovie.playing) 
    {
        gameTitleMovie.draw(ctx);
    }
	
 
    symbols.draw(ctx);
 	
    // OpenStar.draw(ctx);
};
  
game.api_inFeature = function()
{
    return feature.inFeature;
};

game.api_parseFeaturePrizes = function(pair)
{
    featurePair = pair;
    featureTriggered = true;
    if (feature != null)
    {
        feature.clear();
        feature.parsePrizes(featurePair);
    }
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
};

function sprintf(format, etc) {
	var arg = arguments;
	var i = 1;
	return format.replace(/%((%)|s)/g, function (m) { return m[2] || arg[i++] })
}

var symTextures  = [],
	symSprites = [],
	symAnims = [];


//  Symbols
for (var i=0; i<=10; i++)
{
	symTextures.push('symbols.png');
	symSprites.push([ {x:150*i,y:0,w:150,h:150} ]);
	symAnims.push( [ {t:0} ]);
}


var initAssets = function()
{
	game.meters.setBackground( [{p:0.0,col:'#ff0084'},{p:0.46,col:'#ff0084'},{p:0.51,col:'#ff47a3'}, {p:1.0,col:'#ff309b'} ]);
//	game.meters.setFontColour( '#000000','#FF0000');
	game.layout.generatePaylineVectors();
	
    feature	= new PickFeature();
    feature.init();
 	
    if (featureFPM != "")
    {
        feature.parseFPM(featureFPM);
    }
    if (featurePair != "")
    {
        feature.parsePrizes(featurePair);
    }

    game.messageBar.align   = "center";
	game.messageBar.font    = MESSAGE_BAR_FONT;	//Language specific - see language.js
	game.messageBar.m_Text  = TXT_SCROLL_MESSAGES[0];
	
	game.imageReelBG       = game.ASSET_MANAGER.getAsset('reelbg.jpg');
	game.imageReelBGfree   = game.ASSET_MANAGER.getAsset('reelbgfree.jpg');
	game.imageGameName     = null;//game.ASSET_MANAGER.getAsset('gamename.png');
	game.imageSymbols      = game.ASSET_MANAGER.getAsset('symbols.png');
	game.imageTurnDevice   = game.ASSET_MANAGER.getAsset('turndevice.png');
	game.imagePaylineEnds  = game.ASSET_MANAGER.getAsset('paylinesend.png');
    game.imageSprayAnim    = game.ASSET_MANAGER.getAsset('big_win.png');

	game.ui.initAssets();

	game.reelMan = new ReelManager();
	
	for(var i=0; i<reelStrips.length; i++)
		game.reelMan.setReelStrip(i,reelStrips[i]);

    randomSprayAnim = new RandomSprayAnim();
    randomSprayAnim.setAnimConfig();

    game.layout.orient(0);

    symbols = new SymbolsMovie();
    symbols.x = game.layout.REELS.x;
    symbols.y = game.layout.REELS.y;
    AF.Movie.root.addChild(symbols);

	freeGames = new FreeGames();

	AF.Movie.root.addChild(freeGames);
	if(restore_sss)
		game.api_parseSSS(restore_sss);

    gameTitleMovie = new GameTitleMovie();
    gameTitleMovie.x = 328;
    AF.Movie.root.addChild(gameTitleMovie);
	
   OpenStar = new OpenStar();
 	  OpenStar.y = 223;
   OpenStar.x = 323;
    AF.Movie.root.addChild(OpenStar);
 
};    

layout = new Layout();
layout.orient(0);

// -----------------------------------------------------------------------------

var autoDelayAfterFeature = false;

game.api_autoDelayAfterFeature = function()
{
	return autoDelayAfterFeature;
};

game.api_lastFreeGameFinish = function()
{
	autoDelayAfterFeature = true;

    if (feature == null || !featureTriggered) {
        setTimeout(function(){
            freeGames.summary();
            //game.stopSound();
            //game.playSound('win2');
        }, (game.slotResult.winType == 0)?0:game.WIN_METER_DISPLAY_TIME);
    }
};

game.api_drawWinAnim = function()
{
	if(gameTitleMovie.playing){
 
      
	    gameTitleMovie.draw(ctx);
    }
    freeGames.draw(ctx);
    randomSprayAnim.draw(ctx);
 
 // OpenStar.draw(ctx);


};

game.playWinSounds = function()

{
	
  var win = game.freeGames.m_bInFreeGames?  fgCW : this.slotResult.winAmount;
 
 if(this.slotResult.winType & WT_FEATURE_TRIGGER || win >= this.slotResult.linesBet * this.slotResult.betPerLine * 5) 
	{
  game.freeGames.m_bInFreeGames?  game.playSound('prizerollup'): game.playSound('win2'); 
 	
	}
	else if(win > 0) 
	{	
	  game.freeGames.m_bInFreeGames?  game.playSound('prizerollup'): game.playSound('win1'); 
 	
	}		
 	 //prizerollup
		
		
};

   

var spin_sound = 0;
game.api_playSpinSound = function () {
	switch (spin_sound) {
		case 0:   
		this.playSound ('spin'); 
		spin_sound =1;
		  break;
		  
		case 1:   
		 this.playSound ('spin2'); 
		 spin_sound = 0;
		 break;
 		
		}
 };
  

game.api_spinStarted = function()
{
 
 //	summary.init();  
 	
}




game.api_playFreeSpinSound = function(){
    arguments.callee.i = arguments.callee.i || 0;
    this.playSound((arguments.callee.i++ % 2)? 'freespin2' : 'freespin1');
};

game.playFeatureLoopSound = function(){
    this.playSound('featureloop');
};

game.updateIdleMessage = function(timeDelta)
{
    if(this.slotResult.winType & WT_PICK_FEATURE_TRIGGER) {
        return;
    }

    if(this.idleTextTimer >= 0)
    {
        this.idleTextTimer -= timeDelta;
        if(this.idleTextTimer <= 0)
        {
            this.startIdleMessages();
        }
    }
};

game.setGamesRemainingString = function()
{
    var gamesRemaining = this.slotResult.numFreeGames;

    if(this.slotResult.winType & WT_PICK_FEATURE_TRIGGER) {
        this.messageBar.m_Text = TXT_PICK_BONUS;
    } else {
        if(gamesRemaining == 1)
        {
            this.messageBar.m_Text = gamesRemaining + " " + TXT_GAME_REMAINING;
        }
        else
        {
            this.messageBar.m_Text = gamesRemaining + " " + TXT_GAMES_REMAINING;
        }
    }
};

game.startIdleMessages = function()
{
    if(this.slotResult.winType & WT_PICK_FEATURE_TRIGGER) {
        this.messageBar.m_Text = TXT_PICK_BONUS;
        return;
    }

    this.idleTextTimer = this.idleTextDelay;
    this.idleTextIndex++;
    this.idleTextIndex = this.idleTextIndex % TXT_SCROLL_MESSAGES.length;
    this.messageBar.m_Text = TXT_SCROLL_MESSAGES[this.idleTextIndex];
}

game.manageFeatureEndState = function()
{
    featureTriggered = false;

    game.stopSound();

    if (game.freeGames.m_bInFreeGames && game.slotResult.numFreeGames <= 0) {

        this.setState(SS_FREEGAME_SUMMARY);

        game.stopSound();
        game.playSound('win2');

        setTimeout(function(){
            freeGames.summary();
        }, (game.slotResult.winType == 0)?0:game.WIN_METER_DISPLAY_TIME);
    }

    if (!game.freeGames.m_bInFreeGames) {
        game.playSound('win2');
    }
};

game.api_beforeFirstFreeGame = function()
{
    if (!game.freeGames.m_bInFreeGames)		// if we are not in free games yet.
	{
		game.reelMan.stopAnims();
		freeGames.intro();
        this.api_playFreeSpinSound();
	} 
	else 									// already in free games so don't show the intro screen.
	{
		this.startSpin();
	}
};
var restore_sss = "";
game.api_parseSSS = function(sss)
{
	if(typeof freeGames == "undefined")	// restore
		restore_sss = sss;
};

game.api_switchReels = function(freeGames)
{
	for(var i=0; i<(freeGames ? reelStripsFree : reelStrips).length; i++)
		game.reelMan.setReelStrip(i,(freeGames ? reelStripsFree : reelStrips)[i]);
};

 


var overridenFunctions = {};

overridenFunctions.recover = game.recover;
game.recover = function()
{

    if(this.recoverySlotResult.IFG)
    {
        this.freeGames.m_bInFreeGames = true;
    }

    overridenFunctions.recover.call(this);

    createPaylineTexture2();
};

overridenFunctions.processMsg = game.processMsg;
game.processMsg = function(pairs,freegame)
{
    for(var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf("=");
		var name = pairs[i].substr(0, pos);
		var value = pairs[i].substr(pos+1);
		switch(name)
		{
			case "WS":
				var winnings = value.split("|");
				for(var j=0;j<winnings.length-1;j++)
				{
					if(winnings[j].indexOf("-2")==0)
					{
						pairs[i]+= "-1"+winnings[j].substr(2)+"|";
					}
				}
				break;

			case "WC":
				var values = value.split("|");
				if(values[2]=="1")
				{
					pairs[i] = "WC="+values[0]+"|1|1|";
				}
				break;
				
			case "CW":
				fgCW = Number( value);
				break;
		}
	}

	return overridenFunctions.processMsg.call(this,pairs,freegame);
};

game.showHistoryPick = function(pickRounds, pickAmount, pickSide)
{
	feature.setHistoryPrize(pickAmount);

	if(pickRounds == 0) {						// Showing Pick Feature trigger
		feature.inFeature = false;
		return;
	}
	
	feature.inFeature = true;					// normal one or two picks
	feature.numRounds = pickRounds;
	if(pickSide == 0) {
		feature.pickHistorySide(0);
	} else {
		feature.pickHistorySide(1);
	}
}

overridenFunctions.startSpin = game.startSpin;
game.startSpin = function()
{
	overridenFunctions.startSpin.call(game);
};

overridenFunctions.startFeature = game.startFeature;
game.startFeature = function()
{
    if (feature.triggerFeature)
    {
        overridenFunctions.startFeature.call(this);
    }
};

// -----------------------------------------------------------------------------

function Intro ()
{
	AF.Movie.call(this,7200);
	
	var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset('frame.jpg'), 1);
	this.addChild(bg);
	
	var textProperties = 
	{
		hAlign : "center",
		vAlign : "bottom",
		font : "Arial",
		size  : 25,
		strokeColor1 : "#000000"
	};
	
    var prop;

	var txt1 = new AF.Text();
	this.addChild(txt1);
	for (prop in TXT_FREE_GAMES_INTRO_TITLE)
	{
		if (TXT_FREE_GAMES_INTRO_TITLE.hasOwnProperty(prop)) 
			txt1[prop] = TXT_FREE_GAMES_INTRO_TITLE[prop];
	}
	
	var won = new AF.Text();
	this.addChild(won);
	for (prop in TXT_FREE_GAMES_INTRO_WON)
	{
		if (TXT_FREE_GAMES_INTRO_WON.hasOwnProperty(prop)) 
			won[prop] = TXT_FREE_GAMES_INTRO_WON[prop];
	}  

    var txt2 = new AF.Text();
    this.addChild(txt2);
    for (prop in TXT_FREE_GAMES_INTRO_TEXT_1)
    {
        if (TXT_FREE_GAMES_INTRO_TEXT_1.hasOwnProperty(prop))
            txt2[prop] = TXT_FREE_GAMES_INTRO_TEXT_1[prop];
    }

    var txt3 = new AF.Text();
    this.addChild(txt3);
    for (prop in TXT_FREE_GAMES_INTRO_TEXT_2)
    {
        if (TXT_FREE_GAMES_INTRO_TEXT_2.hasOwnProperty(prop))
            txt3[prop] = TXT_FREE_GAMES_INTRO_TEXT_2[prop];
    }
	  

 
    var sprite1 = new AF.Sprite(game.ASSET_MANAGER.getAsset('girls.png'),1);
	sprite1.y = 16 ;
   this.addChild(sprite1);  
	 
 this.addTween(new AF.Tween(sprite1, "x" ).set(0,35).set(2000, 95 ,AF.Tween.POWER, 0.6 )  );
 this.addTween(new AF.Tween(sprite1, "alpha" ).set(0,0).set(150,1 ).set(1500,1 ).set(2000,0)  );	 
	   

	this.addTween(new AF.Tween(bg, "alpha", 0).set( 1, 0).set(200, 1).set(6700, 1).set(7200, 0));
	this.addTween(new AF.Tween(txt1, "alpha", 0).set(2200, 0).set(2900, 1).set(6500, 1).set(7000, 0));
	this.addTween(new AF.Tween(txt2, "alpha", 0).set(2200, 0).set(2900, 1).set(6500, 1).set(7000, 0));
	this.addTween(new AF.Tween(txt3, "alpha", 0).set(2200, 0).set(2900, 1).set(6500, 1).set(7000, 0));
	this.addTween(new AF.Tween(won, "alpha", 0).set(2200, 0).set(2900, 1).set(6500, 1).set(7000, 0));
	
	this.init = function()
	{  symbols.visible = false ;
        this.visible = true;
		this.play(0);
		won.text = sprintf(TXT_FREE_GAMES_INTRO_WON.text, game.slotResult.totalNumFreeGames);
	};
	
	this.addAction(function(){
		this.visible = false;
		this.stop();
		symbols.visible = true;   
		game.startSpin();
	}, 7200-1);
}
Intro.prototype = new AF.Movie();

// -----------------------------------------------------------------------------

function Summary()
{  
	AF.Movie.call(this,6200);

	var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset('frame.jpg'), 1);
	this.addChild(bg);  

    var prop;

	var txt1 = new AF.Text();
	this.addChild(txt1);
	for (prop in TXT_SUMMARY_CONGRATULATIONS)
	{
		if (TXT_SUMMARY_CONGRATULATIONS.hasOwnProperty(prop)) 
			txt1[prop] = TXT_SUMMARY_CONGRATULATIONS[prop];
	}
		
	var txt2 = new AF.Text();
	this.addChild(txt2);
	for (prop in TXT_SUMMARY_TOTAL_WIN)
	{
		if (TXT_SUMMARY_TOTAL_WIN.hasOwnProperty(prop)) 
			txt2[prop] = TXT_SUMMARY_TOTAL_WIN[prop];
	}
	
	prize = new AF.Text();
	this.addChild(prize);
	for (prop in TXT_SUMMARY_VAL)
	{
		if (TXT_SUMMARY_VAL.hasOwnProperty(prop)) 
			prize[prop] = TXT_SUMMARY_VAL[prop];
	}


	this.addTween(new AF.Tween(bg,    "alpha", 0).set(800, 0).set(1300, 1).set(5700, 1).set(6200, 0));
	this.addTween(new AF.Tween(txt1,  "alpha", 0).set(1000, 0).set(1500, 1).set(5500, 1).set(6000, 0));
	this.addTween(new AF.Tween(txt2,  "alpha", 0).set(1000, 0).set(1500, 1).set(5500, 1).set(6000, 0));
	this.addTween(new AF.Tween(prize, "alpha", 0).set(1000, 0).set(1500, 1).set(5500, 1).set(6000, 0));

	this.init = function()
	{  symbols.visible = false ;
        this.visible = true;
		this.play(0);
	};
	
	this.addAction(function(){
		prize.text = game.account.getCurrencyString(0);

        game.playSound("prizerollup");

		if(game.slotResult.winAmount>0)
		{
			var winDelta = game.slotResult.winAmount / 20;
			setTimeout(function(){
				arguments.callee.i = arguments.callee.i || 0;
				if(arguments.callee.i<=20)
				{
					prize.text = game.account.getCurrencyString(Number(winDelta*arguments.callee.i));
					arguments.callee.i ++;
					
					setTimeout(arguments.callee,50);
				} else {
                    game.stopSound();
                    game.playSound("win2");
                }
			},50);
		}
	}, 1000);


	this.addAction(function(){
		symbols.visible = true;   
		
		this.visible = false;
		this.stop();
		game.freeGames.m_bInFreeGames = false;
		autoDelayAfterFeature = false;

        game.setState(SS_WIN_PAYLINE);
        game.bShowFreeSpinBg = false;
		
	 //	game.playSound("win2");      

	}, 6200-1);
}
Summary.prototype = new AF.Movie();

var intro;
var summary;

// -----------------------------------------------------------------------------
function FreeGames()
{
	AF.Movie.call(this);

	intro = new Intro();
	summary = new Summary();

    intro.x = summary.x = (game.ASSET_MANAGER.getAsset('reelbg.jpg').width - game.ASSET_MANAGER.getAsset('frame.jpg').width) /2 ;
	intro.y = summary.y = (game.ASSET_MANAGER.getAsset('reelbg.jpg').height - game.ASSET_MANAGER.getAsset('frame.jpg').height) /2  ;
	intro.visible = false;

	summary.visible = false;

	this.addChild(intro);
	this.addChild(summary);

	this.intro = function()
	{
        intro.init();
	};
	
	this.summary = function()
	{
		summary.init();
	};
}
FreeGames.prototype = new AF.Movie();


// --- FEATURE ---

var sendFeatureStartMsg = function()
{
    if (!game.featureStarted) {
        feature.ignoreInput = true;
        var msg = "&MSGID=FEATURE_START&CFG=1&";
        windowObj.sendMsgToServer(msg);
    }
};



var sendFeaturePickMsg = function(picknumber,selection)
{
    feature.ignoreInput = true;
    var msg = "&MSGID=FEATURE_PICK&CFG=1&FP=1|" + picknumber + "|" + selection + "|&";
    windowObj.sendMsgToServer(msg);
};

var sendFeatureEndMsg = function()
{
    feature.ignoreInput = true;
    var msg = "&MSGID=FEATURE_END&CFG=1&";
    windowObj.sendMsgToServer(msg);
};


    

function OpenStar()
{
  //symFeatureCoin.png
  
 
 var	t = 16;
  AF.Movie.call(this,65*t);

  
 var sprite1 = new AF.Sprite(game.ASSET_MANAGER.getAsset('symFeatureLoop.jpg'),13);
   this.addChild(sprite1);  
  //   this.addTween(new AF.Tween(sprite1,"scaleX",1).set(222,2).set(1000,1));
	this.addTween(new AF.SpriteTween(sprite1, "0-12 ",65*t));    
	
  
 var music = new AF.Sprite(game.ASSET_MANAGER.getAsset('musicNotes.png'),7);
   this.addChild(music);  
   music.x = 43;
   music.y = -48; 		
 
 this.addTween(new AF.SpriteTween(music, "0-7",35*t)); 
 
    
	var star1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('symFeatureCoin.png'), 1);
	star1.x = -Math.round(game.ASSET_MANAGER.getAsset('symFeatureCoin.png').width/2);
	star1.y = -Math.round(game.ASSET_MANAGER.getAsset('symFeatureCoin.png').height/2);
	
	var star1wrap = new AF.Movie();
	star1wrap.x = Math.round(game.ASSET_MANAGER.getAsset('symFeatureCoin.png').width/2);
	star1wrap.y = Math.round(game.ASSET_MANAGER.getAsset('symFeatureCoin.png').height/2);
 	
	star1wrap.addChild(star1);
     this.addChild(star1wrap);
	 
 
 

 this.addTween(new AF.Tween(star1wrap,   "alpha" ).set(19*t, 0.1 ).set(20*t, 0.1 ).set(30*t,0.7, AF.Tween.JUMP ).set(45*t,0.9 ).set(t*65, 0.6 ).set(t*65, 0)  );
 this.addTween(new AF.Tween(star1wrap, "scaleX" ).set(19*t, 0.1 ).set(20*t, 0.1).set(30*t, 1, AF.Tween.JUMP ).set(t*45, 2.5 ).set(t*65,0.5 ).set(t*65,0 ));
 this.addTween(new AF.Tween(star1wrap, "scaleY" ).set(19*t, 0.1 ).set(20*t, 0.1).set(30*t, 1 , AF.Tween.JUMP).set(t*45, 2.5 ).set(t*65,0.5 ).set(t*65,0 ));  
  
 this.addTween(new AF.Tween(star1wrap,   "rotate" ).set(19*t, 33 ).set(t*65, 200 )  );

  
 


     this.addAction(function() {
		 
       this.stop(0);
	//    this.visible = false; 
		
    }, 65*t-1 );  
 	
} 
  

OpenStar.prototype = new AF.Movie();





function Singing()
{
	t = 16;
  AF.Movie.call(this,65*t);
 var sprite1 = new AF.Sprite(game.ASSET_MANAGER.getAsset('symFeatureLoop.jpg'),13);
	
    this.addChild(sprite1);  
 
  var music = new AF.Sprite(game.ASSET_MANAGER.getAsset('musicNotes.png'),7);
   this.addChild(music);  
   music.x = 43;
   music.y = -48; 		
 
 this.addTween(new AF.SpriteTween(music, "0-7",85*t)); 
 
 //   this.addTween(new AF.Tween(sprite1,"scaleX",1).set(222,2).set(1000,1));
	this.addTween(new AF.SpriteTween(sprite1, "0-12 ",65*t));   
 
	
/*    this.addAction(function()
    {
       this.stop(0); 
//	   this.visible = false;
     },  799);*/
	
 }
Singing.prototype = new AF.Movie();  

  
  

function GameTitleMovie()
{
  
 	var dt = 180;
	AF.Movie.call(this,dt*6);
 	
	var title1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle01.png'), 1);
	this.addChild(title1);

	var title1GrowWrap = new AF.Movie();
	title1GrowWrap.x = Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').width/2);
	title1GrowWrap.y = Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').height/2);

	var title1Grow =  new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle01.png'), 1);
	title1Grow.x = -Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').width/2);
	title1Grow.y = -Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').height/2);
	title1GrowWrap.addChild(title1Grow);

	
	var title2 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle02.png'), 1);
	title2.x = game.ASSET_MANAGER.getAsset('gametitle01.png').width;
	this.addChild(title2);

	var title2GrowWrap = new AF.Movie();
	title2GrowWrap.x = Math.round(game.ASSET_MANAGER.getAsset('gametitle02.png').width/2) + game.ASSET_MANAGER.getAsset('gametitle01.png').width;
	title2GrowWrap.y = Math.round(game.ASSET_MANAGER.getAsset('gametitle02.png').height/2);

	var title2Grow =  new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle02.png'), 1);
	title2Grow.x = -Math.round(game.ASSET_MANAGER.getAsset('gametitle02.png').width/2);
	title2Grow.y = -Math.round(game.ASSET_MANAGER.getAsset('gametitle02.png').height/2);
	title2GrowWrap.addChild(title2Grow);
	
	
	var title3 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle03.png'), 1);
	title3.x =  game.ASSET_MANAGER.getAsset('gametitle01.png').width + game.ASSET_MANAGER.getAsset('gametitle02.png').width;
	this.addChild(title3);

	var title3GrowWrap = new AF.Movie();
	title3GrowWrap.x = Math.round(game.ASSET_MANAGER.getAsset('gametitle03.png').width/2) + game.ASSET_MANAGER.getAsset('gametitle01.png').width + game.ASSET_MANAGER.getAsset('gametitle02.png').width;
	title3GrowWrap.y = Math.round(game.ASSET_MANAGER.getAsset('gametitle03.png').height/2);

	var title3Grow =  new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle03.png'), 1);
	title3Grow.x = -Math.round(game.ASSET_MANAGER.getAsset('gametitle03.png').width/2);
	title3Grow.y = -Math.round(game.ASSET_MANAGER.getAsset('gametitle03.png').height/2);
	title3GrowWrap.addChild(title3Grow);
	
	
	this.addChild(title1GrowWrap);
	this.addChild(title2GrowWrap);
	this.addChild(title3GrowWrap);

	
	this.addTween(new AF.Tween(title1,  "alpha", 1).set(1, 0, AF.Tween.JUMP).set(dt*2, 1, AF.Tween.JUMP));
	this.addTween(new AF.Tween(title1GrowWrap,  "alpha", 0).set(1, 1, AF.Tween.JUMP).set(dt*2, 0, AF.Tween.JUMP));
	this.addTween(new AF.Tween(title1GrowWrap,  "scaleX", 1).set(dt, 1.5).set(dt*2, 1));
	this.addTween(new AF.Tween(title1GrowWrap,  "scaleY", 1).set(dt, 1.5).set(dt*2, 1));

	this.addTween(new AF.Tween(title2,  "alpha", 1).set(dt*2, 0, AF.Tween.JUMP).set(dt*4, 1, AF.Tween.JUMP));
	this.addTween(new AF.Tween(title2GrowWrap,  "alpha", 0).set(dt*2, 1, AF.Tween.JUMP).set(dt*4, 0, AF.Tween.JUMP));
	this.addTween(new AF.Tween(title2GrowWrap,  "scaleX", 1).set(dt*2, 1, AF.Tween.JUMP).set(dt*3, 1.5).set(dt*4, 1));
	this.addTween(new AF.Tween(title2GrowWrap,  "scaleY", 1).set(dt*2, 1, AF.Tween.JUMP).set(dt*3, 1.5).set(dt*4, 1));
	
	this.addTween(new AF.Tween(title3,  "alpha", 1).set(dt*4, 0, AF.Tween.JUMP).set(dt*6, 1, AF.Tween.JUMP));
	this.addTween(new AF.Tween(title3GrowWrap,  "alpha", 0).set(dt*4, 1, AF.Tween.JUMP).set(dt*6, 0, AF.Tween.JUMP));
	this.addTween(new AF.Tween(title3GrowWrap,  "scaleX", 1).set(dt*4, 1, AF.Tween.JUMP).set(dt*5, 1.5).set(dt*6, 1));
	this.addTween(new AF.Tween(title3GrowWrap,  "scaleY", 1).set(dt*4, 1, AF.Tween.JUMP).set(dt*5, 1.5).set(dt*6, 1));

 
 
 
    this.addAction(function()
    {   
        this.stop(0); 
		
    },  dt*6-1);  
}


GameTitleMovie.prototype = new AF.Movie();

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
                if (j>=12)
                {
                    this.animconfig[i][j] = {t:j-12,s:1-(i/10), a:((this.animconfig[i].length - 1 - j)*0.3),x:0,y:yy};
                } else {
                    this.animconfig[i][j] = {t:j,s:1-(i/10), a:1,x:0,y:yy};
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
    };

    this.init = function()
    {
        this.sprayCoinArray = new Array(12);
        var reelWidth = game.layout.symbolWidth*5 + game.layout.reelGap*4;

        for (var i = 0; i<this.sprayCoinArray.length; i++) {
            this.sprayCoinArray[i] = new ngImage2(game.imageSprayAnim);

            var sprites = [];
            var anims = [];

            for (var k=0; k<12; k++)
            {
                sprites.push({x:130*k,y:0,w:130,h:134});
                anims.push({t:k});
            }

            this.sprayCoinArray[i].setAnimConfig(sprites, this.animconfig[Math.floor(Math.random()*this.animconfig.length)]);

            this.sprayCoinArray[i].setPosition(
                game.layout.REELS.x + (reelWidth/this.sprayCoinArray.length)*i + Math.floor(Math.random()*(reelWidth/this.sprayCoinArray.length))-60,
                game.layout.REELS.y + 120 + Math.floor(Math.random()*30));
        }
        return this;
    };

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
    };
    this.draw = function(ctx)
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
    };
    this.sprayStartAnim = function(spray)
    {
        spray.startAnim(false, 0);
    };

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

 
  
function ScatterSymbol()
{ 
    var t = 38; 
    AF.Movie.call(this, 22*t);    
	
	var frms  = "0-15" ;
	
 var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter.jpg'),16);
     this.addChild(sprite);     	
	 
 var sprite_up = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter_top.png'),16);
  this.addChild(sprite_up);  
  sprite_up.y =  -43;
      this.addTween(new AF.SpriteTween(sprite_up, frms, 20*t));
  
 var sprite_buttom = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter_bottom.png'),16);
   this.addChild(sprite_buttom);  
   sprite_buttom.y = 150;
        this.addTween(new AF.SpriteTween(sprite_buttom, frms, 20*t));
   
 var sprite_left = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter_left.png'),16);
   this.addChild(sprite_left);
   sprite_left.x = -21 ;
     
        this.addTween(new AF.SpriteTween(sprite_left, frms, 20*t));
   
 var sprite_right = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter_right.png'),16);
  this.addChild(sprite_right); 
  sprite_right.x = 150;
   
     this.addTween(new AF.SpriteTween(sprite_right, frms, 20*t));
  

 
 // 	sprite2.x = -35;
 // 	sprite2.y = -50;  
 
    
    this.addTween(new AF.SpriteTween(sprite, frms, 20*t));
	
  
}  

ScatterSymbol.prototype = new AF.Movie();

function WildSymbol() 
{
    var t = 75;      
    AF.Movie.call(this, 23*t);    

    var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym00.jpg'),23);
    this.addChild(sprite);

    this.addTween(new AF.SpriteTween(sprite, "0-22", 23*t));  
}

WildSymbol.prototype = new AF.Movie();


function SymbolsMovie()
{
    AF.Movie.call(this);
    var matrix = [];

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
    }

    game.api_animateWins = function()
    {
        feature.animateWins();

        var bitfield = 0;

        for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
        {
            bitfield |= game.slotResult.paylineWins[payline].second;
        }

        var isWildWin = false;
        // now we tell each reel to animate the appropriate symbols.
        for(var row = 0; row < 3; row++)
        {
            for(var column = 0; column < 5; column++)
            {
                var symbol;
                var symbolId = game.reelMan.reels[column].slots[row+1].currentSymbol;

                if(bitfield & 0x00000001)
                {
                    if(symbolId == 0)
                    {
                        isWildWin = true;
                        symbol = matrix[column][row]["00"];
                        symbol.visible = true;
   
				    symbol.play(0);
                    } else if(symbolId == 10){
                        symbol = matrix[column][row]["11"];
                        symbol.visible = true;
                        symbol.play(0);
                    }
                }
                bitfield = bitfield>>1;
            }
        }

        var win = game.freeGames.m_bInFreeGames?  fgCW : this.slotResult.winAmount;

        if (win >= 2 * this.slotResult.linesBet * this.slotResult.betPerLine || isWildWin)
            gameTitleMovie.play(0);
				
			 	OpenStar.play(0);				 

        if((win >= 5 * this.slotResult.linesBet * this.slotResult.betPerLine) && !game.freeGames.m_bInFreeGames){
				
            randomSprayAnim.init().startAnim();
        }
    };  
   
    game.api_stopWinAnims = function()
    {
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