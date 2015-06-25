game.account.setNumPaylines(50,50); 
game.defaultStops = [12,19,31,48,18]; 

var RTP_VALUE
if(DecimalSeparator() == ",")
{
	RTP_VALUE = ['95,231%']; 
}else{
	RTP_VALUE = ['95.231%']; 
}
         
var gAudioSettings = {
	resources: [  'ExtraCashSnd.m4a', 'ExtraCashSnd.caf', 'ExtraCashSnd.mp3', 'ExtraCashSnd.wav' ],
	spritemap: { 
		'click': { 'start': 0.862, 'end': 1.205 },
		'spin':  { 'start': 2.206, 'end': 5.531 },
		'win1':  { 'start': 6.524, 'end': 7.886 },
		'win2':  { 'start': 8.810, 'end': 12.074 },
		'RepinLoop':  { 'start': 13.079 , 'end':18.877 },
		'freespin1':  { 'start': 19.862, 'end': 22.787 },
		'freespin2':  { 'start': 23.783, 'end': 27.366 },
		'winroll':  { 'start': 28.350, 'end': 29.679 },  
 		'r1':  {   'start': 30.677, 'end':31.225},
		'r2':  {  'start': 32.232 , 'end':32.763}, 
		'r3':  {  'start': 33.764 , 'end':34.261},
		'r4':  {  'start': 35.266 , 'end':35.800},
		'r5':  {  'start': 36.802 , 'end':37.309},
 	  'ThrowPaperMack0':  {  'start': 38.312, 'end':38.993},
     'RepinTrigger':  {  'start': 39.991, 'end':43.050},
    'ThrowPaperMack1':  {  'start': 44.070, 'end':44.906},	
    'ThrowPaperMack2':  {  'start': 45.915, 'end':46.655}  
	  	    
	}  
};
       
 
	 
game.ASSET_MANAGER.queueFiles([
	'reelbg.jpg',
	'reelbgfree.jpg',
	'gametitle01.png',
	'gametitle02.png',
	'tm.png',
	'symbols.jpg',  
	'elements.png',
	'buttons_ui.png',
	'frame.jpg',
	'panel.png',
	'panel.jpg',
	'turndevice.png',  	 
	'sym00_layer1.jpg',
	'Sym00_Left.png',
	'Sym00_Top.png',
	'scatter.jpg', 
	'scatter_top.png',
	'scatter_right.png',
    'sparkle.png', 
    'boy/Idle1.png',   
	'boy/Idle2_touchnose.jpg', 	
	'boy/Box.png',
	'boy/ThrowAnim.jpg',
	'boy/ThrowAnim_free.jpg',
    'boy/flying.png', 
	'boy/ThrowAnim_R.png',
	'boy/bigwin_jump_fg.jpg', 
    'boy/smallwin_base.jpg',
	'boy/bigwin_basegame.jpg', 
	'boy/headpart.png', 
    'boy/begin_respin.jpg',
	'boy/begin_respin_parts.png', 
    'boy/bigwin_jump_fg.jpg', 
	'paylinesend.png',  
	'BG_Pattern_free.jpg',
	'NewspaperFrame.png',
	'BigWin.png',
	'WinCelebration.png',  
	'boy/smallwin_fg.jpg', 
	'Respin.png'
	
]); 

  
 
var gSymbols;
var growSymbols;
var totalScatters = 0;
var scatterReels = [];
var whizByAnimations = [];
var greyOutState = false;
var WSR;
var drops = 0;
var windup = false;
var respinflag = false;
var respinflagR = false;
var relive ;
  
 
var reelStrips = [
[2,8,3,7,5,6,4,10,11,6,4,10,9,1,8,0,6,10,1,8,4,10,5,7,2,9,4,7,2,9,3,8,7,1,9,5,8,3,10],
 [3,10,7,0,9,5,10,2,8,7,3,9,5,7,2,8,1,6,10,2,7,3,9,11,7,3,9,10,1,7,5,10,2,7,5,6,1,8,5,7,2,9,4,8,1,9,4,6,1,8,2,6,3,10,7,0,8,5,7,2,8,10,3,7,5,10,2,8,1,7,9,2,10,3,7,9,1,10,7,3,9,5,10,2,8,5,6,0,8,5,6,2,10,4,8,1,9,4,6,1,8,2,6],
[1,6,7,0,8,5,7,1,8,10,3,7,1,9,5,8,1,10,2,7,8,1,6,11,8,1,6,3,7,2,8,5,9,4,10,7,9,8,1,10,4,8,5,7,2,8,0,10,1,8,7,3,10,5,7,8,0,10,5,6,1,8,7,3,9,1,8,5,10,2,8,1,6,3,8,7,5,6,1,8,2,7,5,9,4,10,8,0,7,1,8,4,10,5,6,2,8,0,10,1,7,6,3,8],
[9,3,7,0,6,1,10,3,9,1,10,5,7,2,9,5,10,1,9,5,8,11,9,5,8,3,7,4,10,5,9,2,6,10,1,7,4,10,1,9,4,6,1,7,5,9,2,10,7,4,9,5,10,1,9,4,8,2,9,1,7,3,10,9,1,8,4,9,3,7,0,6,1,10,3,9,1,10,5,9,2,10,1,9,3,7,5,8,9,1,7,5,8,4,10,5,9,2,6,10,1,7,4,10,1,7,4,6,2,7,1,9,2,8,7,0,9,5,10,1,7,4,10,2,9,3,7,2,9,1,8,4],
[2,8,5,10,0,6,3,9,4,6,2,8,1,9,5,10,2,7,11,10,2,7,9,1,8,3,9,1,7,2,10,11,7,2,10,8,5,6,4,9,0,10,5,9,2,8,5,10,7,3,8,4,6,2,8,1,9,5,10,2,7,11,10,2,7,9,1,10,3,9,8,1,7,5,9,4,8,7,0,10,9]
 ];  

 
 var reelStripsRespin = [
[14,20,15,19,17,18,16,22,23,18,16,22,21,13,20,12,18,22,13,20,16,22,17,19,14,21,16,19,14,21,15,20,19,13,21,17,20,15,22],
[15,22,19,12,21,17,22,14,20,19,15,21,17,19,14,20,13,18,22,14,19,15,21,23,19,15,21,22,13,19,17,22,14,19,17,18,12,20,17,19,14,21,16,20,13,21,16,18,13,20,14,18,15,22,19,12,20,17,19,14,20,22,15,19,17,22,14,20,13,19,21,14,22,15,19,21,13,22,19,15,21,17,22,14,20,17,18,12,20,17,18,14,22,16,20,13,21,16,18,13,20,14,18],
[13,18,19,12,20,17,19,13,20,22,15,19,13,21,17,20,13,22,14,19,20,13,18,23,20,13,18,15,19,14,20,17,21,16,22,19,12,20,13,22,16,20,17,19,14,20,12,22,13,20,19,15,22,17,19,20,12,22,17,18,13,20,19,15,21,13,20,17,22,14,20,13,18,15,20,19,17,18,13,20,14,19,17,21,16,22,20,12,19,13,20,16,22,17,18,14,20,12,22,13,19,18,15,20],
[21,15,19,12,18,13,22,15,21,13,22,17,19,14,21,17,22,13,21,17,20,23,21,17,20,15,19,16,22,17,21,14,18,22,13,19,16,22,13,21,16,18,13,19,17,21,14,22,19,12,21,17,22,13,21,16,20,14,21,13,19,15,22,21,13,20,16,21,15,19,12,18,13,22,15,21,13,22,17,21,14,22,13,21,15,19,17,20,21,13,19,17,20,16,22,17,21,14,18,22,13,19,16,22,13,19,16,18,14,19,13,21,14,20,19,12,21,17,22,13,19,16,22,14,21,15,19,14,21,13,20,16],
[14,20,17,22,12,18,15,21,16,18,14,20,13,21,17,22,14,19,23,22,14,19,21,13,20,15,21,13,19,14,22,23,19,14,22,20,17,18,16,21,12,22,17,21,14,20,17,22,19,15,20,16,18,14,20,13,21,17,22,14,19,23,22,14,19,21,13,22,15,21,20,13,19,17,21,16,20,19,12,22,21]
 ];
 
 
 
 
var reelStripsFree = [
[2,8,3,7,5,6,4,10,11,6,4,10,9,1,8,0,6,10,1,8,4,10,5,7,2,9,4,7,2,9,3,8,7,1,9,5,8,3,10,2,8,3,7,5,6,4,10,11,6,4,10,9,1,8,5,6,10,1,8,4,10,5,7,2,9,4,7,2,9,3,8,7,1,9,5,8,3,10],
[3,10,7,0,9,5,10,2,8,7,3,9,5,7,2,8,1,6,10,2,7,3,9,11,7,3,9,10,1,7,5,10,2,7,5,6,1,8,5,7,2,9,4,8,1,9,4,6,1,8,2,6,3,10,7,4,8,5,7,2,8,10,3,7,5,10,2,8,1,7,9,2,10,3,7,9,1,10,7,3,9,5,10,2,8,5,6,7,8,5,6,2,10,4,8,1,9,4,6,1,8,2,6],
[1,6,7,0,8,5,7,1,8,10,3,7,1,9,5,8,1,10,2,7,8,1,6,11,8,1,6,3,7,2,8,5,9,4,10,7,9,8,1,10,4,8,5,7,2,8,6,10,1,8,7,3,10,5,7,8,2,10,5,6,1,8,7,3,9,1,8,5,10,2,8,1,6,3,8,7,5,6,1,8,2,7,5,9,4,10,8,2,7,1,8,4,10,5,6,2,8,9,10,1,7,6,3,8],
[9,3,7,0,6,1,10,3,9,1,10,5,7,2,9,5,10,1,9,5,8,11,9,5,8,3,7,4,10,5,9,2,6,10,1,7,4,10,1,9,4,6,1,7,5,9,2,10,7,4,9,5,10,1,9,4,8,2,9,1,7,3,10,9,1,8,4,9,3,7,8,6,1,10,3,9,1,10,5,9,2,10,1,9,3,7,5,8,9,1,7,5,8,4,10,5,9,2,6,10,1,7,4,10,1,7,4,6,2,7,1,9,2,8,7,0,9,5,10,1,7,4,10,2,9,3,7,2,9,1,8,4],
[2,8,5,10,0,6,3,9,4,6,2,8,1,9,5,10,2,7,11,10,2,7,9,1,8,3,9,1,7,2,10,11,7,2,10,8,5,6,4,9,7,10,5,9,2,8,5,10,7,3,8,4,6,2,8,1,9,5,10,2,7,11,10,2,7,9,1,10,3,9,8,1,7,5,9,4,8,7,3,10,9]
];
 
  




//------------------ Test Functions -----------------------------------
var test = function () {
        $("input[name='stops']").val("14;37;23;49;62");
    };

var test2 = function () {
        $("input[name='stops']").val("36;37;34;49;15");
    };

var ngHlp = {
    sprite: function (num, y, dx, w, h) {
        for (var i = 0, res = [], y = y || 0, dx = dx || 150, w = w || 150, h = h || 150; i < num; res.push({
            x: dx * i,
            y: y,
            w: w,
            h: h
        }), i++) {;
        }
        return res;
    },
    frames: function (from, to, dx, dy) {
        for (var i = from, res = [], dx = dx || 0, dy = dy || 0; i <= to; res.push({
            t: i,
            x: dx,
            y: dy
        }), i++) {;
        }
        return res;
    }
}

function sprintf(format, etc) {
    var arg = arguments;
    var i = 1;
    return format.replace(/%((%)|s)/g, function (m) {
        return m[2] || arg[i++]
    })
}


var symTextures = [],
    symSprites = [],
    symAnims = [];
for (var i = 0; i <= 23; i++) {
    symTextures.push('symbols.jpg');
    symSprites.push([{
        x: 137 * i,
        y: 0,
        w: 137,
        h: 110
    }]);
    symAnims.push([{
        t: 0
    }]);
}



game.api_runSpinningStoppedFeature = function () {

    if (!game.freeGames.m_bInFreeGames && game.slotResult.numFreeGames == 1 && featureID == 0) game.setBShowFreeSpinBg(true);
    game.stopSound();

    if (game.freeGames.m_bInFreeGames && featureID == 0) {

        if (totalScatters == 2) {

            for (var i = 0; i < reelStrips.length; i++) {
                game.reelMan.setReelStrip(i, reelStrips[i]);
            }

            game.reelMan.setOnScreenSymbols(-12);
            respinflag = false;
            FlagscatterReelsR = false;
            respinflagR = false;
            respintitle.gametitle();

            for (var i = 0; i < 5; i++)
            game.reelMan.reels[i].reelSpeed = 100.0;

        }
    }

};

 

game.api_spinningFeatureStopped = function () {

    if (game.freeGames.m_bInFreeGames && featureID == 1 && totalScatters != 2 && (freeGamesTriggered == 8 || freeGamesTriggered == 12 || (totalfreegame == 21 && freeGamesTriggered == 20))) {

        for (var i = 0; i < reelStrips.length; i++) {
            game.reelMan.setReelStrip(i, reelStrips[i]);
        }
        game.reelMan.setOnScreenSymbols(-12);

        for (var i = 0; i < 5; i++)
        game.reelMan.reels[i].reelSpeed = 100.0;

        freeGamesTriggered = 0;
        totalfreegame = 0;
        respinflag = true;
        FlagscatterReelsR = false;
        respinflagR = false;
        respintitle.gametitle();
        game.playSound('win2');

        setTimeout(function () {
            game.ui.showWinMeter(false);
            intro.init();
        }, 300);

    }




    if (!game.freeGames.m_bInFreeGames && game.slotResult.numFreeGames == 1 && featureID == 0) {
        TXT_FREE_GAME_WON = TXT_RESPIN_WON;
        game.reelMan.stopAnims();
        respintitle.play(0);
        setTimeout(function () {
            extraextra.play(0);
        }, 10)

    }


    windup = false;
    for (i = 0; i < 5; ++i) {
        growSymbols[i].visible = false;
        growSymbols[i].stop(0);
    }
    return boythrowit.isHoneyThrown;

};



game.api_freeSpinBgChangeAction = function (freeSpinBg) {
    if (!freeSpinBg) $("body").css("background-image", "url('BG_Pattern.jpg')");
    else $("body").css("background-image", "url('BG_Pattern_free.jpg')");
}


var initAssets = function () {
	game.meters.setBackground( [{p:0.0,col:'rgba(98,106,132,1)'}, {p:1.0,col:'rgba(23,9,32,1)'} ]);
//	game.meters.setFontColour( '#000000','#FF0000');
        game.layout.generatePaylineVectors();

        game.messageBar.align = "center";
        game.messageBar.font = MESSAGE_BAR_FONT;
        game.messageBar.m_Text = TXT_SCROLL_MESSAGES[0];
        game.imageReelBG = game.ASSET_MANAGER.getAsset('reelbg.jpg');
        game.imageReelBGfree = game.ASSET_MANAGER.getAsset('reelbgfree.jpg');
        game.imageGameName = null;
        game.imageSymbols = game.ASSET_MANAGER.getAsset('symbols.jpg');
        game.imageTurnDevice = game.ASSET_MANAGER.getAsset('turndevice.png');
        game.imageSprayAnim = game.ASSET_MANAGER.getAsset('WinCelebration.png');
        game.imagePaylineEnds = game.ASSET_MANAGER.getAsset('paylinesend.png');
        game.ui.initAssets();
        game.ui.imgPanel = game.ASSET_MANAGER.getAsset('panel.jpg');
        game.ui.insufficientFundsTxt.m_Color = 'yellow';
        game.reelMan = new ReelManager(4);

        for (var i = 0; i < reelStrips.length; i++)
        game.reelMan.setReelStrip(i, reelStrips[i]);

        layout = new Layout();
        layout.orient(0);

        intro = new Intro();
        summary = new Summary();

        summary.visible = false;
        intro.visible = false;

        AF.Movie.root.addChild(intro);
        AF.Movie.root.addChild(summary);

        bWinTitle = new bigWinTitle();
        AF.Movie.root.addChild(bWinTitle);
        bWinTitle.y = game.ASSET_MANAGER.getAsset('reelbg.jpg').height;
        bWinTitle.x = (game.ASSET_MANAGER.getAsset('reelbg.jpg').width / 2) - 341;

        title = new Title();
        titleGrow = new TitleGrow();
        titleGrow.visible = false;
        title.x = titleGrow.x = layout.GAME_NAME.x;
        title.y = titleGrow.y = layout.GAME_NAME.y;
        AF.Movie.root.addChild(title);
        AF.Movie.root.addChild(titleGrow);

        flying = [];
        for (i = 0; i < 5; i++) {
            flying[i] = new Flying();
            AF.Movie.root.addChild(flying[i]);
        }

        extraextra = new ExtraExtra();
        AF.Movie.root.addChild(extraextra);

        respinlook = new RespinLook();
        AF.Movie.root.addChild(respinlook);

        respintitle = new Respintitle();
        respintitle.x = layout.GAME_NAME.x;
        respintitle.y = layout.GAME_NAME.y;
        AF.Movie.root.addChild(respintitle);

        winjumpFG = new WinJumpFG();
        AF.Movie.root.addChild(winjumpFG);

        touchnose = new TouchNose();
        AF.Movie.root.addChild(touchnose);

        wintouchhat = new WinTouchHat();
        AF.Movie.root.addChild(wintouchhat);

        wintouchhatfg = new WinTouchHatfg();
        AF.Movie.root.addChild(wintouchhatfg);

        winlookright = new WinLookRight();
        AF.Movie.root.addChild(winlookright);

        throwintropaper = new ThrowIntroPaper();
        AF.Movie.root.addChild(throwintropaper);

        growscatter = new GrowScatter();
        AF.Movie.root.addChild(growscatter);

        rollingscatters = new RollingScatters();
        rollingscatters.x = layout.REELS.x;
        rollingscatters.y = layout.REELS.y;
        rollingscatters.visible = false;
        AF.Movie.root.addChild(rollingscatters);

        boyWrap = new AF.Movie();
        boyWrap.setMask(0, 0, game.ASSET_MANAGER.getAsset('reelbg.jpg').width, 
		game.ASSET_MANAGER.getAsset('reelbg.jpg').height);
        AF.Movie.root.addChild(boyWrap);

        Kickoff = new Kickoff();
        Kickoff.visible = false;
        boyWrap.addChild(Kickoff);

        boythrowit = new BoyThrowIt();
        AF.Movie.root.addChild(boythrowit);

        newsboybg = new newsboyBG();
        AF.Movie.root.addChild(newsboybg);
        newsboybg.play(0);

        randomSprayAnim = new RandomSprayAnim();
        randomSprayAnim.setAnimConfig();

        var nosetime = new NoseTime();
		
		timerbox = new TimerBox();
        AF.Movie.root.addChild(timerbox);
		
 

        overridenFunctions.updateReelManager = game.reelMan.update;
        game.reelMan.update = reelManagerUpdate;



        if (restoreInfo.WS) {
            rollingscatters.setWinSymbols(restoreInfo.WS);
            boythrowit.setWinSymbols(restoreInfo.WS);
        }

        if (restoreInfo.GSD) boythrowit.setStickyHoney(restoreInfo.GSD);

        if (restoreInfo.SSS) boythrowit.setThrowHoney(restoreInfo.SSS);

        setTimeout(function () {
            boythrowit.throwHoney();
        }, 1000);

        scatterReelsR = [];
        FlagscatterReelsR = false;




        game.reelMan.startReels = function () {
            var RM_STOPPED = 0;
            var RM_SPINNING = 1;
            var NUM_REELS = 5;

            if (this.state == RM_STOPPED) {

                for (var i = 0; i < NUM_REELS; i++) {

                    if (!game.freeGames.m_bInFreeGames && game.slotResult.numFreeGames == 1 
					&& featureID == 0) {
                        if (game.inRecovery) {
                            var a = getscatterReels(game.slotResult);
                            FlagscatterReelsR = true;
                        }

                        for (i = 0; i < 5; i++) {
                            if (scatterReels[i] == -1 || game.inRecovery) {
                                if (!game.inRecovery) this.reels[i].reelSpeed = 75;
                                this.reels[i].startSpin();
                            }
                        }


                        if (FlagscatterReelsR) {
                            for (i = 0; i < 5; i++) {
                                if (scatterReelsR[i] == -1) this.reels[i].startSpin();
                            }
                        }
                    } else if (game.inRecovery && (freeGamesTriggered == 8 || freeGamesTriggered == 12
					 || (totalfreegame == 21 && freeGamesTriggered == 20))) {} 
					 else this.reels[i].startSpin();
                }

                this.state = RM_SPINNING;
                this.stoppingTime = 0;
            }
        };


    };


 
 
game.api_processMsgEnd = function (result) {
 
     if (game.reelMan.reels == undefined) return;
 
    for (i = 0; i < 5; i++) {

         scatterReels[i] = -1;
         for (var row = 0; row < 4; ++row) {

            var rs = game.reelMan.reels[i].reelStrip;
            var sp = parseInt(result.stops[i]) + row - 1;

            if (sp > rs.length) sp -= rs.length;
            if (sp < 0) sp += rs.length;
             var sym = parseInt(rs[sp]);
 
            var isrespin = (game.freeGames.m_bInFreeGames && featureID == 0) || (game.freeGames.m_bInFreeGames && featureID == 1 && (freeGamesTriggered == 8 || freeGamesTriggered == 12 || (totalfreegame == 21 && freeGamesTriggered == 20))) ? true : false;


            if ((sym == 11 || sym == 23) && (game.inRecovery || !game.freeGames.m_bInFreeGames || isrespin)) {
                totalScatters++;
                scatterReels[i] = row;
                 break;
            }
        }
    }
};




var autoDelayAfterFeature = false;
game.api_autoDelayAfterFeature = function () {
    return autoDelayAfterFeature;
};


game.api_changeOrientation = function () {
    this.ui.layout.WIN_METER = this.layout.WIN_METER;
    this.ui.layout.WIN_METER_BG = this.layout.WIN_METER_BG;
    this.ui.winMeter.setPosition(this.layout.WIN_METER);
};





game.api_beforeFirstFreeGame = function () {
     game.setBShowFreeSpinBg(true);

    if (game.slotResult.numFreeGames == 20 && totalfreegame == 20 && freeGamesTriggered == 20)
     {
         game.reelMan.stopAnims();
        game.playSound('win2');
        intro.init();

    } else
     {
        this.startSpin();
     }
 };


 game.api_lastFreeGameFinish = function () {
    autoDelayAfterFeature = true;
     if (game.freeGames.m_bInFreeGames && featureID == 0) {
        summary.jumptoend();

    } else {
       //  setTimeout(function () {
       //   summary.init();  }, (game.slotResult.winType == 0) ? 0 : game.WIN_METER_DISPLAY_TIME);
			 
	 if(game.slotResult.winType == 0)  
	         { summary.init();  }
	 else
	          {  timerbox.summary(); }
			 
			 
    }

};


 game.api_startGame = function () {

};

 
game.api_spinStarted = function () {
 //	timerbox.summary(); 
  
    if (game.inRecovery) {
         if (game.freeGames.m_bInFreeGames && featureID == 1 && totalScatters != 2 && (freeGamesTriggered == 8 || freeGamesTriggered == 12 || (totalfreegame == 21 && freeGamesTriggered == 20)))  respinflagR = true;
      
	    clearInterval(window.subdt);
     }

     TXT_FREE_GAME_WON = TXT_FREE_GAME_WON2;
      gameConfig.drawPaylines = true;
      if (game.freeGames.m_bInFreeGames && featureID == 0) {
        game.reelMan.init(myreelstop);
     }

     rollingscatters.spinStarted(game.inRecovery);
    boythrowit.spinStarted(game.inRecovery);

     clearInterval(window.subdt);

     if (game.freeGames.m_bInFreeGames && game.inRecovery) {
        newsboybg.newsboy.visible = false;
        Kickoff.boykick.visible = false;
    }

    isFirstSpin = false;
    totalScatters = 0;
   // scatterReels = [];
 
}


 game.api_startSpinAction = function () {
     var isrespin = (game.freeGames.m_bInFreeGames && featureID == 0) || (game.freeGames.m_bInFreeGames && featureID == 1 && (freeGamesTriggered == 8 || freeGamesTriggered == 12 || (totalfreegame == 21 && freeGamesTriggered == 20))) ? true : false;

    if (isrespin) game.messageBar.m_Text = "";
 };

 
game.api_switchReels = function (freeGames) {
     if (featureID == 0) {
         for (var i = 0; i < (freeGames ? reelStripsRespin : reelStrips).length; i++)
        game.reelMan.setReelStrip(i, (freeGames ? reelStripsRespin : reelStrips)[i]);
     } else {
        for (var i = 0; i < (freeGames ? reelStripsFree : reelStrips).length; i++)
        game.reelMan.setReelStrip(i, (freeGames ? reelStripsFree : reelStrips)[i]);
    }


 
    if (game.inRecovery && (freeGamesTriggered == 8 || freeGamesTriggered == 12 || (totalfreegame == 21 && freeGamesTriggered == 20))) {
         for (var i = 0; i < (freeGames ? reelStripsRespin : reelStrips).length; i++)
        game.reelMan.setReelStrip(i, (freeGames ? reelStripsRespin : reelStrips)[i]);
         game.reelMan.init(myreelstop);
     }
 };


 
game.api_animateWins = function () {
     rollingscatters.start();
    boythrowit.animateWins();
}


 game.api_stopWinAnims = function () {
     if (!game.freeGames.m_bInFreeGames && game.inRecovery) return;
     rollingscatters.spinStarted(game.inRecovery);
    boythrowit.spinStarted(game.inRecovery);
}

game.api_drawLowerLevelFeature = function () {
	boythrowit.draw();
	newsboybg.draw();
	title.draw();
	rollingscatters.draw();
	boyWrap.draw();
	titleGrow.draw();
	
	for (i = 0; i < 5; i++) {
	flying[i].draw();
	}
	
	wintouchhat.draw();
	wintouchhatfg.draw();
	winlookright.draw();
	winjumpFG.draw();
	throwintropaper.draw();
	touchnose.draw();
	growscatter.draw();
	randomSprayAnim.draw();
	respinlook.draw();
	bWinTitle.draw();
	respintitle.draw();
 
}
game.api_drawWinAnim = function () {
    intro.draw();
    summary.draw();
    randomSprayAnim.draw();

}

game.api_featureUpdate = function (deltaTime)  
{
    if (deltaTime < 100000) AF.Movie.update(deltaTime);
     randomSprayAnim.update(deltaTime);
}


 
var fgCW;
 game.playWinSounds = function () {
     var win = game.freeGames.m_bInFreeGames ? fgCW : this.slotResult.winAmount;
     var bfrespin = !game.freeGames.m_bInFreeGames && game.slotResult.numFreeGames == 1 && featureID == 0 ? 1 : 0;
 
    if (win < this.slotResult.linesBet * this.slotResult.betPerLine * 2)
     {
        this.playSound('winroll');
     }

 
     if (win >= this.slotResult.linesBet * this.slotResult.betPerLine * 2 && win < this.slotResult.linesBet * this.slotResult.betPerLine * 5 && bfrespin < 1 && !respinflag)

    {
        if (!game.freeGames.m_bInFreeGames) {
             wintouchhat.visible = true;
            wintouchhat.play(0);
        } else {
             wintouchhatfg.visible = true;
            wintouchhatfg.play(0);
         }
     }



    if (win >= this.slotResult.linesBet * this.slotResult.betPerLine * 5 && win < this.slotResult.linesBet * this.slotResult.betPerLine * 10 && bfrespin < 1 && !respinflag) {

        if (!game.freeGames.m_bInFreeGames) {
             winlookright.visible = true; 
            winlookright.play(0);
            titleGrow.init();

        } else {
             winjumpFG.visible = true;
            winjumpFG.play(0);
             titleGrow.init();
         }
     }

 
     if (win >= this.slotResult.linesBet * this.slotResult.betPerLine * 5 && win < this.slotResult.linesBet * this.slotResult.betPerLine * 10 && bfrespin < 1 && !respinflag) {

        if (!game.freeGames.m_bInFreeGames) {
             winlookright.visible = true;  
            winlookright.play(0);
            titleGrow.init();
         } else {
             winjumpFG.visible = true;
            winjumpFG.play(0);
             titleGrow.init();
         }

    }

 

    if (win >= this.slotResult.linesBet * this.slotResult.betPerLine * 10 && bfrespin < 1 && !respinflag)
     {
         if (!game.freeGames.m_bInFreeGames) {
             winlookright.visible = true;  
            winlookright.play(0);
            titleGrow.init();
             if (!(freeGamesTriggered == 20 && totalfreegame == 20)) {
                bWinTitle.init();
                randomSprayAnim.init().startAnim();
            }
 
        } else {
             winjumpFG.visible = true;
            winjumpFG.play(0);
            titleGrow.init();
         }
    }


    if (respinflag);
    respinflag = false;
 
};



game.playSound = function (soundID) {

    if (this.soundsLoaded && !this.mute) {
        this.stopSound();
        this.myPlayer.play(soundID);
    }
};



game.api_playFreeSpinSound = function () {
     if (game.freeGames.m_bInFreeGames && featureID == 1) {
         arguments.callee.i = arguments.callee.i || 0;
        this.playSound((arguments.callee.i++ % 2) ? 'freespin2' : 'freespin1');
     } else {
         this.playSound('RepinLoop');
     }
 }



 game.updateFGAlpha = function (timeDelta) {
     if (this.bShowFreeSpinBg) {
        if (this.FGAlpha < 1.0) {
            this.FGAlpha += 0.1;
            if (this.FGAlpha >= 1.0) {
                this.FGAlpha = 1.0;
            }
        }
    } else {
        if (this.FGAlpha > 0.0) {
            this.FGAlpha -= 0.1;
            if (this.FGAlpha <= 0.0) {
                this.FGAlpha = 0.0;
            }
        }
    }

 
};


game.setVolume = function (volume) {
    if (this.soundsLoaded) {
        this.myPlayer.setVolume(volume);
    }
};


var overridenFunctions = {};
var restoreInfo = {};
var serverFGChoice;
var featureTrigger;
var featureID = -1;
var freeGamesTriggered = 0;
var totalfreegame = 0;
var RESP = 0;
var respinID = -1;
var restoreFeatureTrigger = false;
var holdReels = [];
var IFG = false;
var FS = false;
var inRecovery = false;
var slotResult = {};
var myreelstop = [];
var myrespin = false;


overridenFunctions.processMsg = game.processMsg;

game.processMsg = function (pairs, freegame) {
    //   CFGG = -1;
    var FGT = 0;
    var TFG = 0;

    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf("=");
        var name = pairs[i].substr(0, pos);
        var value = pairs[i].substr(pos + 1);
        switch (name) {

         case "FID":
            var values = value.split("|");
            if (values[0] != "") featureID = Number(values[0]);
              break;

         case "RS":
             {
                myreelstop = value.split("|");
            }
            break;


         case "TFG":
            TFG = Number(value);
            totalfreegame = Number(value);
              break;


        case "FGT":
            freeGamesTriggered = Number(value);
             break;


         case "WS":
            if (typeof rollingscatters == "undefined")  
            restoreInfo.WS = value;
            else {
                rollingscatters.setWinSymbols(value);
                boythrowit.setWinSymbols(value);
            }
             break;

        case "CW":
            fgCW = Number(value)
            break;

        case "GSD":

            var v = value.split("~")[1];
            if (typeof boythrowit == "undefined")  
            restoreInfo.GSD = v;
            else boythrowit.setStickyHoney(v);

            break;


        case "SSS":

             if (typeof boythrowit == "undefined")  
            restoreInfo.SSS = value;
            else var inrespin = (game.freeGames.m_bInFreeGames && featureID == 1 && totalScatters != 2 && (freeGamesTriggered == 8 || freeGamesTriggered == 12)) || (game.freeGames.m_bInFreeGames && featureID == 0) ? 1 : 0;

             if (!inrespin && !game.inRecovery) {
                boythrowit.setThrowHoney(value);

                setTimeout(function () {
                     boythrowit.throwHoney();
                 }, 1000);
             }
             break;

        }
    }
    var result = overridenFunctions.processMsg.call(this, pairs, freegame);
    return result;
 
};


overridenFunctions.drawPaylineEnds = game.drawPaylineEnds;
game.drawPaylineEnds = function () {
    overridenFunctions.drawPaylineEnds.call(this);
}
   

function RollingScatters()  
{
    AF.Movie.call(this)
     var scatters = [];
    for (var i = 0; i < 5; i++) {
        var b = new RollingPaper();
        b.x = (layout.reelGap + layout.symbolWidth) * i;
        b.visible = false;
        scatters.push(b) ;
        this.addChild(b);
     }

    this.trigger = false;
     this.setWinSymbols = function (WS) {
         var lines = WS.split("|");
        for (var j = 0; j < lines.length - 1; j++) {
            var symbols = lines[j].split(";");
            symbols = symbols.map(Number);
             if (symbols[0] >= 0) continue;
             this.trigger = (symbols[0] == -2);
             for (var i = 0; i < scatters.length; i++) {
                if (symbols[i + 2] >= 0) 
                {
                    scatters[i].visible = true;
                    scatters[i].y = layout.symbolHeight * symbols[i + 2];
                } else scatters[i].visible = false;
            }
        }
    };



    this.start = function () {
         if (this.trigger && game.slotResult.numFreeGames != game.slotResult.totalNumFreeGames) this.trigger = false;
         var play = false;
        for (var i = 0; i < scatters.length; i++) {
            if (scatters[i].visible) {
                play = true;
                scatters[i].play(0);
                scatters[i].trigger = this.trigger;
 
            }
        }

        if (!play) return;
        this.visible = true;
    };

    this.spinStarted = function (recovery) {
        if (recovery) return;
         for (var i = 0; i < scatters.length; i++) {
            scatters[i].visible = false;
        }
        this.visible = false;
    };
}
RollingScatters.prototype = new AF.Movie();


 
var reelStops = [];

reelManagerUpdate = function (deltaTime) {

    var RM_SPINNING = 1;
    var RM_STOPPING = 2;
    var RM_WAITING_TO_STOP = 3;
     var i;

     for (i = 0; i < 5; i++) {
         var r = this.reels[i];
         if (game.reelMan.reels[i].state == 3) {
             if (scatterReels[i] >= 0 || (FlagscatterReelsR && scatterReelsR[i] >= 0)) {
                 if (FlagscatterReelsR) {
                     growSymbols[i].y = 78 + r.bounceOffset + scatterReelsR[i] * r.symbolHeight;
                 } else {
                    growSymbols[i].y = 78 + r.bounceOffset + scatterReels[i] * r.symbolHeight;
                }


                 if (i == 4 && getScattersCountBeforeReel(i) == 0) {
                    growSymbols[i].visible = false;

                } else {
                    if (growSymbols[i].time <= 0) {
                         growSymbols[i].visible = true;
                        growSymbols[i].play(0);
                        game.playSound("r" + (1 + i));
                    }
                }


            }
        } else if (game.reelMan.reels[i].state == 0) {
             if (reelStops[i] != 1) {
                reelStops[i] = 1;

                if (i < 4 && getScattersCountBeforeReel(i + 1) >= 2) {
                    setTimeout(function () {
                        game.playSound("RepinLoop");
                    }, 10);
                }
            }
            growSymbols[i].stop(0);
         }
    }


     if (!respinflagR && ((game.freeGames.m_bInFreeGames && featureID == 1 && totalScatters != 2 && (freeGamesTriggered == 8 || freeGamesTriggered == 12)) || (game.freeGames.m_bInFreeGames && featureID == 0)))
     {
         switch (this.state) {
        case RM_SPINNING:
            if (WSR >= 0) {
                this.stoppingTime += deltaTime;

                 if (this.stoppingTime > 1000 && !game.slotResult.bProcessed) {
                    this.state = RM_STOPPING;
                    this.stoppingTime = 0;
                    this.reelStopIndex = 0;
                    game.slotResult.bProcessed = true;
                }

                for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;

        case RM_STOPPING:
       
                 this.crankOffset = 0;
                this.stoppingTime += deltaTime;

                 if (this.stoppingTime >= 1500) {
                    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
                    this.stoppingTime = 0;
                    this.reelStopIndex++;
                    if (this.reelStopIndex >= this.numReels) {
                        this.state = RM_WAITING_TO_STOP;
                    }
                }

                 for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
  
            break;
			

        case RM_WAITING_TO_STOP:
            {
                 var allStopped = true;
                 for (i = 0; i < 5; i++) {
                    if (!this.reels[i].isStopped()) {
                        allStopped = false;
                        break;
                    }
                }

                if (allStopped) {
                    this.state = 0;
                }

                for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;
        }
 
    };  



     if (respinflagR) {
        switch (this.state) {
        case RM_SPINNING:
            if (WSR >= 0) {
                this.stoppingTime += deltaTime;
                 if (this.stoppingTime > 1 && !game.slotResult.bProcessed) {
                    this.state = RM_STOPPING;
                    this.stoppingTime = 0;
                    this.reelStopIndex = 0;
                    game.slotResult.bProcessed = true;
                }

                for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;

        case RM_STOPPING:
        
                 this.crankOffset = 0;
                this.stoppingTime += deltaTime;
                 if (this.stoppingTime >= 1) {
                     this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
                     this.stoppingTime = 0;
                    this.reelStopIndex++;
                    if (this.reelStopIndex >= this.numReels) {
                        this.state = RM_WAITING_TO_STOP;
                    }
                }

                 for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
     
 
            break;

        case RM_WAITING_TO_STOP:
            {
                 var allStopped = true;
                 for (i = 0; i < 5; i++) {
                    if (!this.reels[i].isStopped()) {
                        allStopped = false;
                        break;
                    }
                }

                if (allStopped) {
                    this.state = 0;
                }

                for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;
        }
 
    };

     overridenFunctions.updateReelManager.call(this, deltaTime);
};

 