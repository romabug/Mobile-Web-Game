game.account.setNumPaylines(50,50);
game.defaultStops = [0,8,10,15,20];

var RTP_VALUE = ['94.711%'];
var gAudioSettings = {
	resources: [ '50Dragons.caf', '50Dragons.mp3', '50Dragons.wav' ],



spritemap: {
	
      'click':       { 'start':   0.754, 'end': 1.026 },
 	  
		'reelstop':    { 'start': 2.026, 'end': 3.553 },
        'win1':        { 'start': 4.563, 'end': 5.534 },
        'win2':        { 'start': 6.632, 'end': 10.654 },

		'srs1':        { 'start': 11.678, 'end': 12.235 },
        'srs2':        { 'start': 13.269, 'end': 13.747 },
        'srs3':        { 'start': 14.776, 'end': 15.295 },

		'featureTr':   { 'start': 16.330, 'end': 18.880 },	//   	Feature Trigger Bell
		'featureIntro':{ 'start': 19.871, 'end': 24.451 },	// Feature trigger Intro
        'rollup':      { 'start': 25.585, 'end': 27.867 },
		'dragonRoar':  { 'start': 28.888, 'end': 31.889 },

        'reelstop2':  { 'start': 32.863, 'end': 34.069 },
        'reelstop3':  { 'start': 35.056, 'end': 35.939 },
        'reelstop4':  { 'start': 36.933, 'end': 37.463 },
        'reelstop5':   { 'start': 38.461, 'end': 38.689 },
		'windup':   { 'start': 39.593, 'end': 41.508 }
    }
};

var buttons_ui = 'language/'+windowObj.languageCode+'/buttons_ui.png';

// ---------------- Assets -------------------------------
game.ASSET_MANAGER.queueFiles([
    buttons_ui,
    'summary_BIG.png',
    'summary_dragon.png',
    'symbol_scatter.jpg',
    'symbol_dragon.png',
    'symbol_pearl.jpg',
    'coin.png',
    'payline.png',
    'turndevice.png',
    'game-settings.jpg',
    'btnsGlow.png',
    'elements.png',
    'newbar.png',
    'symbols.png',
    'background.jpg',
    'wild.png',
    'button_begin.png',
    'scatter.png',
    'summary_begin.png'
]);

var CFGG  = -1; //Current Free Game
var FGT = 0;
var fgCW;
var canSRS = true;
var win2_timeOut;

var growSymbols;
var totalScatters = 0;
var scatterReels = [];
var greyOutState = false;
var WSR;

var topBar;
var introPanel;
var summaryPanel;
var symbols;
var instructionsPopup;

var overridenFunctions = {};

var reelStrip0 = [9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStrip1 = [9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0];
var reelStrip2 = [9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0];
var reelStrip3 = [7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0];
var reelStrip4 = [7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0];

//  Free Game Spin 1  
var reelStripFG1_0 = [9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG1_1 = [9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0];
var reelStripFG1_2 = [9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0];
var reelStripFG1_3 = [7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0];
var reelStripFG1_4 = [7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0];

//  Free Game Spin 2  
var reelStripFG2_0 = [9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG2_1 = [9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0];
var reelStripFG2_2 = [9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0];
var reelStripFG2_3 = [7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0];
var reelStripFG2_4 = [7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0];

//  Free Game Spin 3   
var reelStripFG3_0 = [9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG3_1 = [9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0];
var reelStripFG3_2 = [9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0];
var reelStripFG3_3 = [7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0];
var reelStripFG3_4 = [7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0];

//  Free Game Spin 4   
var reelStripFG4_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG4_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0];
var reelStripFG4_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0];
var reelStripFG4_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0];
var reelStripFG4_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0];

//  Free Game Spin 5   
var reelStripFG5_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG5_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0];
var reelStripFG5_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0];
var reelStripFG5_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0];
var reelStripFG5_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0];

//  Free Game Spin 6   
var reelStripFG6_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG6_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0];
var reelStripFG6_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0];
var reelStripFG6_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0];
var reelStripFG6_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0];

//  Free Game Spin 7   
var reelStripFG7_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG7_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0];
var reelStripFG7_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0];
var reelStripFG7_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0];
var reelStripFG7_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0];

//  Free Game Spin 8   
var reelStripFG8_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG8_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0,0];
var reelStripFG8_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0,0];
var reelStripFG8_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0,0];
var reelStripFG8_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0,0];

//  Free Game Spin 9   
var reelStripFG9_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG9_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0,0,0];
var reelStripFG9_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0,0,0];
var reelStripFG9_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0,0,0];
var reelStripFG9_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0,0,0];

//  Free Game Spin 10   
var reelStripFG10_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG10_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG10_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG10_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG10_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0,0,0,0];

//  Free Game Spin 11
var reelStripFG11_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG11_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG11_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG11_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG11_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0,0,0,0,0];

//  Free Game Spin 12   
var reelStripFG12_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG12_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG12_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG12_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG12_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0,0,0,0,0,0];


//  Free Game Spin 13   
var reelStripFG13_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG13_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG13_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG13_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG13_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//  Free Game Spin 14   
var reelStripFG14_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG14_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG14_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG14_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG14_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//  Free Game Spin 15   
var reelStripFG15_0 =[9,10,1,1,1,1,1,8,12,11,4,6,3,9,12,11,2,6,4,6,3,9,2,8,5,6,2,10,3,7,5,10,3,8,4,11,2,8,3,6,5,10,12,9,2];
var reelStripFG15_1 =[9,10,1,1,1,1,1,8,4,11,12,9,3,11,5,7,2,11,5,7,3,9,2,7,5,6,2,9,4,7,5,11,3,8,4,11,2,7,4,11,3,7,12,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG15_2 =[9,10,1,1,1,1,1,8,3,11,12,6,3,8,4,7,2,6,4,6,3,7,2,8,5,6,2,10,4,7,5,10,3,8,4,6,2,8,4,6,5,10,12,7,5,8,7,5,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG15_3 =[7,9,1,1,1,1,1,6,3,11,4,2,9,5,3,10,2,6,3,10,2,7,4,11,3,10,2,8,3,9,2,8,5,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reelStripFG15_4 =[7,9,1,1,1,1,1,8,5,11,4,6,8,2,10,5,8,6,2,10,4,7,3,11,8,2,9,3,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//------------------ Test Functions -----------------------------------
var test = function()
{
	$("input[name='stops']").val("6;43;8;3;14");
	// free game   6;43;8;3;14
	// small win 10;34;14;29;20
};

var test2 = function()
{
	$("input[name='stops']").val("0;0;0;0;0");
	// all dragons 0;0;0;0;0 
	// big win 10;33;13;9;20
};

var symTextures = [], symSprites = [], symAnims = [];

var symTextures = [
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png',
    'symbols.png'
];

var symSprites = [
    [ {x:0,   y:0,w:150,h:112} ], //Pearl (Wild)
    [ {x:149, y:0,w:150,h:112} ], //Dragon
    [ {x:299, y:0,w:150,h:112} ], //Phoenix
    [ {x:448, y:0,w:150,h:112} ], //Tiger
    [ {x:599, y:0,w:150,h:112} ], //Carp
    [ {x:749, y:0,w:150,h:112} ], //Bat
    [ {x:899, y:0,w:150,h:112} ], //A(Ace)
    [ {x:1049,y:0,w:150,h:112} ], //K
    [ {x:1199,y:0,w:150,h:112} ], //Q
    [ {x:1349,y:0,w:150,h:112} ], //J
    [ {x:1499,y:0,w:150,h:112} ], //10
    [ {x:1649,y:0,w:150,h:112} ], //9
    [ {x:1799,y:0,w:150,h:112} ]  //Ingot (Scatter)
];

var symAnims = [
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ],
    [ {t:0} ]
];

var initAssets = function()
{
	game.meters.setBackground( [{p:0.0,col:'rgba(69,72,77,1)'}, {p:1.0,col:'rgba(0,0,0,1)'} ]);
	game.meters.setFontColour( '#FFFFFF','#FFCC40');
	
	
    game.playSound("click"); // for mobiles, no sound played before settings panel is opened

    game.layout.generatePaylineVectors();

	game.messageBar.align   = "center";
	game.messageBar.font    = MESSAGE_BAR_FONT;
    game.messageBar.m_Text  = TXT_SCROLL_WELCOME;

	game.imageReelBG      = game.ASSET_MANAGER.getAsset('background.jpg');
	game.imageReelBGfree  = game.ASSET_MANAGER.getAsset('background.jpg');
	game.imageGameName = null;
	game.imageSymbols     = game.ASSET_MANAGER.getAsset('symbols.png');
	game.imageTurnDevice  = game.ASSET_MANAGER.getAsset('turndevice.png');
	game.imageSprayAnim   = game.ASSET_MANAGER.getAsset('coin.png');
	game.imagePaylineEnds = game.ASSET_MANAGER.getAsset('payline.png');
 
	game.ui.initAssets();

	game.reelMan = new ReelManager(4);
    game.reelMan.setReelStrip(0, reelStrip0);
    game.reelMan.setReelStrip(1, reelStrip1);
    game.reelMan.setReelStrip(2, reelStrip2);
    game.reelMan.setReelStrip(3, reelStrip3);
    game.reelMan.setReelStrip(4, reelStrip4);

    overridenFunctions.updateReelManager = game.reelMan.update;
    game.reelMan.update = reelManagerUpdate;

	layout = new Layout();
	layout.orient(0);
			
	//game.ui.layout.SPIN_BTN = { x:-500, y:436 };
	 	
 
    topBar = new TopBar();
    topBar.x = layout.TOP_MESSAGE_BAR.x;
    topBar.y = layout.TOP_MESSAGE_BAR.y;
    AF.Movie.root.addChild(topBar);
	
	topBar.showNextMessage();
	

    instructionsPopup = new InstructionsPopup();
	instructionsPopup.x = 32;
	
    AF.Movie.root.addChild(instructionsPopup);

    if (game.recoverySlotResult.numFreeGames == 0){
        instructionsPopup.show();
    }

	introPanel = new IntroPanel();
	introPanel.x =  layout.SMALL_PANEL.x;
	introPanel.y =  layout.SMALL_PANEL.y;
	AF.Movie.root.addChild(introPanel);

	summaryPanel = new SummaryPanel();
	summaryPanel.x =  layout.SMALL_PANEL.x;
	summaryPanel.y =  layout.SMALL_PANEL.y;
	AF.Movie.root.addChild(summaryPanel);

	symbols = new SymbolsMovie();
	symbols.x = game.layout.REELS.x;
	symbols.y = game.layout.REELS.y;
	AF.Movie.root.addChild(symbols);

    featureTriggerSound = new FeatureTriggerSound();
    AF.Movie.root.addChild(featureTriggerSound);

	randomSprayAnim = new RandomSprayAnim();
	randomSprayAnim.setAnimConfig();
	
	dragonsymboldelay  = new DragonSymbolDelay();
	AF.Movie.root.addChild(dragonsymboldelay); 
 
 
	game.api_processClickRelease = function(coords)
	{
        instructionsPopup.processClick(coords);
        introPanel.processClickRelease(coords);
	};
	game.api_processClick = function(coords)
	{
		introPanel.processClick(coords);
	};
	game.api_buttonsUp = function()
	{
		introPanel.buttonsUp();
	};

	var reelSetState = game.reelMan.reels[0].setState;
	game.reelMan.reels[0].setState = function(newState){
		if(newState == this.state)
			return;


        if (this.state == 2 && newState == 3){
            if(scatterReels[0]==-1 || !canSRS) game.playSound('reelstop');
           
        }
		reelSetState.call(this,newState);
	}
};
// -----------------------------------------------------------------------------

game.uapi_showSpinBtn = function()
{
    return !(introPanel.visible || summaryPanel.visible)
};

game.uapi_showWinMeter = function() {};

game.api_extendSpinMsg = function(msg)
{
	return msg + "ABPM=0" ;
}

var autoDelayAfterFeature = false;
game.api_autoDelayAfterFeature = function()
{
	return autoDelayAfterFeature;
};

game.api_beforeFirstFreeGame = function()
{
    if (!game.freeGames.m_bInFreeGames)		// if we are not in free games yet.
    {
        introPanel.init();
    }
    else 									// already in free games so don't show the intro screen.
    {
        this.startSpin();
    }
	
	game.autoPlay = false;
    game.requestToStopAutoPlay = false;
    game.ui.autoPlayMode = game.ui.AUTO_OFF;
    game.autoPlayGames = 0;
};

game.api_lastFreeGameFinish = function()
{
	autoDelayAfterFeature = true;

	setTimeout(function(){
		summaryPanel.init();
	}, (game.freeGames.m_bInFreeGames?  fgCW : game.slotResult.winAmount)?game.WIN_METER_DISPLAY_TIME:0);
};

game.api_processMsgEnd = function(result)
{
    if (game.reelMan.reels == undefined) return;

    for(i = 0; i < 5; i++) {
        scatterReels[i] = -1;
        for(var row = 0; row < 4; ++row){
            var rs = game.reelMan.reels[i].reelStrip;
            var sp = parseInt(result.stops[i]) + row - 1;

            if (sp > rs.length) sp -= rs.length;
            if (sp < 0) sp += rs.length;

            var sym = parseInt(rs[sp]);

            if(sym == 12){
                totalScatters++;
                scatterReels[i] = row;
                break;
            }
        }
    }
};



game.api_runSpinningStoppedFeature = function()
{
 
// hide spin buttons 
 
 	var win = game.freeGames.m_bInFreeGames?  fgCW : this.slotResult.winAmount;
    var bet = (game.slotResult.linesBet) * game.slotResult.betPerLine;	
	
	if(win >0 && win <= bet * 5 && !game.freeGames.m_bInFreeGames  )  {
	 
	  game.ui.btnSpin.setPosition(game.layout.SPIN_BTN); 
	  game.ui.layout.SPIN_BTN_GLOW =   { x:-815, y:208,  w:159, h:149};
	
		 setTimeout (  function ()
		 {
			// console.log(">>>> game.ui.imgPanel.visable = "+game.ui.state);
			 if (!game.ui.state){
				 game.ui.btnSpin.setPosition(game.ui.layout.SPIN_BTN); 
				}
			 game.ui.layout.SPIN_BTN_GLOW =   { x:815, y:208,  w:159, h:149};
			}, 3000)	 
	}
	  

	
	if( win > bet * 5 && !game.freeGames.m_bInFreeGames  )  {
	
		game.ui.btnSpin.setPosition(game.layout.SPIN_BTN); 
		game.ui.layout.SPIN_BTN_GLOW =   { x:-815, y:208,  w:159, h:149}; 
	  
	 setTimeout (  function (){
		if (!game.ui.state){
				 game.ui.btnSpin.setPosition(game.ui.layout.SPIN_BTN); 
				}
		game.ui.layout.SPIN_BTN_GLOW =   { x:815, y:208,  w:159, h:149}; 
		 }, 5000)	 
		 
	}
};  

game.api_spinningFeatureStopped = function()
{


	greyOutSymbols(false);
    for(i=0; i<5; ++i) {
        growSymbols[i].visible = false;
        growSymbols[i].stop(0);
    }
    return true;
	


	
};

game.api_drawWinAnim = function()
{
    topBar.draw(ctx);
	introPanel.draw(ctx);
	summaryPanel.draw(ctx);

	randomSprayAnim.draw();
};

game.api_drawLowerLevelFeature = function()
{
	symbols.draw(ctx);
    instructionsPopup.draw(ctx);
};

game.api_inFeature = function()
{
    return instructionsPopup.visible;
};

game.api_featureUpdate = function(deltaTime)	// updating the background Flash
{
	if(deltaTime<100000){
		AF.Movie.update(deltaTime);
		
		  topBar.updateDT(deltaTime);
		
    }
	randomSprayAnim.update(deltaTime);
};


game.playWinSounds = function()
{
	var win = game.freeGames.m_bInFreeGames?  fgCW : this.slotResult.winAmount;
    var bet = (game.slotResult.linesBet) * game.slotResult.betPerLine;

// this.slotResult.linesBet * this.slotResult.betPerLine * 10 

/*
	if(win >= bet * 5)
	{	randomSprayAnim.init().startAnim();
  dragonsymboldelay.play(0);
 		 game.playSound('win2');  }
		 */
		 
		 

	if(!game.freeGames.m_bInFreeGames)
	{
        if (this.slotResult.winType & WT_FEATURE_TRIGGER ){


            featureTriggerSound.init(1);

        } else if(this.slotResult.winAmount >= bet * 5) {

            if(isDragonWin())
                {  
                    game.playSound('dragonRoar');
					srsplaying = false;
                    win2_timeOut = setTimeout(function(){
                        game.playSound('win2');
						srsplaying = false;
						if(win >= bet * 20)
            			randomSprayAnim.init().startAnim();
                    }, 3500);
                } else {
                    game.playSound('win2');
					srsplaying = false;
 					if(win >= bet * 20)
            			randomSprayAnim.init().startAnim();
					
                }

        } else if(this.slotResult.winAmount > 0) {

            if(isDragonWin())
            {
                game.playSound('dragonRoar');
            	srsplaying = false;    
				setTimeout(function(){
                    game.playSound('win1');
                	srsplaying = false;
				}, 3500);
            } else {
                game.playSound('win1');
            	srsplaying = false;
			}
        }
	} else{
		
		
		// new added
		if(win >= bet * 20)  {
			randomSprayAnim.init().startAnim();
			
			dragonsymboldelay.play(0);
			game.playSound('win2');
			srsplaying = false;
		}	
		  
		
		

        if (this.slotResult.winType & WT_FEATURE_TRIGGER ){

            featureTriggerSound.init(2);

        }else if(win>0 &&  win < bet * 20) {

            this.playSound('win1'); 
			srsplaying = false;
        }
    }

    var bnrMsg = null;
    if(win<bet)
        ;
    else if(win < bet* 5 )
        bnrMsg = TXT_CONGRATS_X1_X4;
    else if(win < bet* 10)
        bnrMsg = TXT_CONGRATS_X5_X9;
    else if(win < bet* 25)
        bnrMsg = TXT_CONGRATS_X10_X24;
    else if(win < bet* 35)
        bnrMsg = TXT_CONGRATS_X25_X34;
    else if(win < bet* 50)
        bnrMsg = TXT_CONGRATS_X35_X49;
    else if(win >=  bet* 50)
        bnrMsg = TXT_CONGRATS_X50;    

    if(bnrMsg)  {

    //  topBar.forceMessage(bnrMsg[Math.floor(Math.random() *bnrMsg.length)]); 
 
     BottomBarforceMessage (bnrMsg[Math.floor(Math.random() *bnrMsg.length)]);
	 } 
	 
};

 
 
 game.playSound = function(soundID)
{
    if(soundID == "spin")
        return;

    if(soundID == "click") // low balance, change net limit
    {
        game.startIdleMessages();
        game.ui.showWinMeter(false);
    }

    if(this.soundsLoaded && !this.mute) {
		//this.stopSound();
		this.myPlayer.play(soundID);
	}
}; 




/*
game.playSound = function(soundID) {
	
	if(this.soundsLoaded && !this.mute) {
		this.stopSound();
		this.myPlayer.play(soundID);
	}
};
	*/






game.startIdleMessages = function()
{
    game.startIdleMessages = startIdleMessages;
}

var startIdleMessages = function(initial)
{

    if (!game.account.canBet() && !game.inRecovery && !game.historyMode)
        game.messageBar.m_Text = TXT_GAME_OVER;
    else if ( !game.freeGames.m_bInFreeGames && !initial && game.account.canBet() ){
        delayMessageBoxBottom(TXT_SCROLL_PLAY_NOW);
	}else if(!game.account.canBet()){
		game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW; 	
	}
    //TODO - DELAY
    //add delay for play now only if get win message, other wise keep the same behaviour
		
};


game.updateIdleMessage = function(){};

game.api_startGame = function()
{
// hide spin btn and auto btn at panel
		  
/*game.ui.layout.SPIN2_BTN =  { x:-690+20, y:419 };
game.ui.layout.START_AUTOPLAY2_BTN = { x:-690+20 , y:419 };
game.ui.layout.STOP_AUTOPLAY2_BTN  = { x:-722+20 , y:419 };
game.ui.layout.GAMES_REMAINING2_METER = { x:-785-1 , y:501 };*/
/*
game.ui.layout.SPIN2_BTN =  { x:-1000, y:419 };
game.ui.layout.START_AUTOPLAY2_BTN = { x:-1000, y:419 };
game.ui.layout.STOP_AUTOPLAY2_BTN  = { x:-1000, y:419 };
game.ui.layout.GAMES_REMAINING2_METER = { x:-1000, y:419 };*/

game.ui.positionPlayButtons (false); 
  
 
     game.startIdleMessages(true);
	
 // summaryPanel.init();  

  //   introPanel.init();
};
  
game.api_animateWins = function()
{
	symbols.animateWins();
};
game.api_stopWinAnims = function()
{
	symbols.stopWinAnims();

    //the play now was appearing before the reel stops
    //dont need to add delay for it
    if(!(game.slotResult.winType & WT_PICK_FEATURE_TRIGGER) && !game.slotResult.numFreeGames && game.account.canBet())
        game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
		
};

game.api_spinStarted = function()
{
	
// summaryPanel.init();  

 
	
    totalScatters = 0;
    scatterReels = [];
	reelStops = [0,0,0,0,0];

    clearTimeout(win2_timeOut);
    //game.stopSound();

    if(game.freeGames.m_bInFreeGames)
    {
        setGamesRemainingString(!game.inRecovery, false);
    }
	

};

setGamesRemainingString = function(decrease, immediately)
{
    var gamesRemaining = game.slotResult.numFreeGames-(decrease?1:0);

    if(gamesRemaining<0)
        return;

    var txt = null;

    if(game.inRecovery && gamesRemaining == 0)
        txt = TXT_SPIN_MSG;
    else if(gamesRemaining == 0)
        txt = TXT_LAST_FREE_GAME;
    else if(gamesRemaining == 1)
       txt = gamesRemaining + " " + TXT_GAME_REMAINING;
	   
/* 	setTimeout (function () {  
	  txt = gamesRemaining + " " + TXT_GAMES_REMAINING;
	     } , 1000)
		 */
		 
	 
    else if (!game.inRecovery)
       txt = gamesRemaining + " " + TXT_GAMES_REMAINING;
	   
	   
/*	setTimeout (function () {  
	  txt = gamesRemaining + " " + TXT_GAMES_REMAINING;
	     } , 1000)
 */
    

    //setTimeout(function(){
       if(txt != null)game.messageBar.m_Text  = txt;
    //}, immediately? 0 : 1000);

}

game.setGamesRemainingString = function()
{
};

overridenFunctions.processServerMsg = processServerMsg;
processServerMsg = function(msg)
{
	var pairs = msg.split("&");
	for(var i=0;i<pairs.length;i++)
	{
		var pair = pairs[i].split("=");

		if( pair[0] == "MSGID" &&
			["INIT","BET","FREE_GAME"].indexOf(pair[1])<0)
		{
			overridenFunctions.processServerMsg.call(window,msg);
			return;
		}
	}

    CFGG  = -1;
    FGT = 0;
    var TFG = 0;

	for(var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf("=");
		var name = pairs[i].substr(0, pos);
		var value = pairs[i].substr(pos+1);
		switch(name)
		{
			case "CW":
				fgCW = Number( value);
				break;

			case "CFGG":
				CFGG = Number(value);
				break;

            case "FGT":
                FGT = Number(value);
                break;

            case "TFG":
                TFG = Number(value);
                break;
		}
	}

	overridenFunctions.processServerMsg.call(window,msg);

    if(TFG >= 15 && FGT == 0){
        canSRS = false;
    }  else {
        canSRS = true;
    }



};

overridenFunctions.recover = game.recover;
game.recover = function()
{
    overridenFunctions.recover.call(this);
    createPaylineTexture2();
};

overridenFunctions.allowBetUI = game.allowBetUI;
game.allowBetUI = function()
{
    overridenFunctions.allowBetUI.call(this);
    if(!game.account.canBet())game.messageBar.m_Text = TXT_NOT_ENOUGH_BALANCE;     
};


function InstructionsPopup ()
{
    AF.Container.call(this);
    this.visible = false;

    var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_begin.png'), 1);
    bg.x = 250;
    bg.y = 100;
    this.addChild(bg);

    var scatter = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter.png'), 1);
    scatter.x = 371.5;
    scatter.y = 160;
    this.addChild(scatter);

    var bntBackground = new AF.Sprite(game.ASSET_MANAGER.getAsset('button_begin.png'), 1);
    bntBackground.x = 400.5;
    bntBackground.y = 375;
    this.addChild(bntBackground);

    var txt1 = new AF.Text();
    txt1.setMixedFormat(MESSAGE_INSTRUCTION_1);
    this.addChild(txt1);

    var txt2 = new AF.Text();
    txt2.setMixedFormat(MESSAGE_INSTRUCTION_2);
    this.addChild(txt2);

    var txt3 = new AF.Text();
    txt3.setMixedFormat(MESSAGE_INSTRUCTION_3);
    this.addChild(txt3);

    var bntTxt = new AF.Text();
    bntTxt.setMixedFormat(MESSAGE_BTN_BEGIN);
    this.addChild(bntTxt);

// nwidth  the area for click

    var btnLayout = {nx:0, ny:0, nwidth:92, nheight:40,  dx:0, dy:0, dwidth:92, dheight:40};
    var button = new Button(null, btnLayout);
	
 //  button.setPosition({x:282, y:100});    the lefttop of the popup panel
    button.setPosition({x:430, y:375});  

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
    AF.Movie.call(this, 3000);
	
    var forcedMessage=null;// text to force
    var timeSinceUpdate = 0;


    var messageCounter = 0;

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
       game.messageBar.m_Text = forcedMessage;
 	   
	   // this.showNextMessage();
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



function BottomBarforceMessage (newTxt) {
	// forcedMessage = newTxt;
        this.delayMessages = false;
       game.messageBar.m_Text = newTxt;
 	
	};




function IntroPanel()
{
	AF.Movie.call(this, 5000);

	this.visible = false;

	var bg =  new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_BIG.png'), 1);
	this.addChild(bg);

    var leftDragon =  new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_dragon.png'), 1);
    this.addChild(leftDragon);
    leftDragon.x = -100;
    leftDragon.y = 35;

    var rightDragon =  new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_dragon.png'), 1);
    this.addChild(rightDragon);
    rightDragon.x = 822;
    rightDragon.y = 35;
    rightDragon.scaleX = -1;

    var wild =  new AF.Sprite(game.ASSET_MANAGER.getAsset('wild.png'), 1);
    this.addChild(wild);
    wild.x = 288;
    wild.y = 160;

	var txt1 = new AF.Text();
	this.addChild(txt1);
    txt1.setMixedFormat(TXT_SELECT_FG_1);
    var txt2 = new AF.Text();
	this.addChild(txt2);
    txt2.setMixedFormat(TXT_SELECT_FG_2);
	var txt3 = new AF.Text();
	this.addChild(txt3);
    txt3.setMixedFormat(TXT_SELECT_FG_3);
    var txt4 = new AF.Text();
    this.addChild(txt4);
    txt4.setMixedFormat(TXT_SELECT_FG_4);
    var txt5 = new AF.Text();
    this.addChild(txt5);
    txt5.setMixedFormat(TXT_SELECT_FG_5);

	this.addTween(new AF.Tween(bg, "alpha", 0).set(800, 1).set(4200, 1, AF.Tween.JUMP).set(5000, 0));
    this.addTween(new AF.Tween(leftDragon, "alpha", 0).set(800, 1).set(4200, 1, AF.Tween.JUMP).set(5000, 0));
    this.addTween(new AF.Tween(rightDragon, "alpha", 0).set(800, 1).set(4200, 1, AF.Tween.JUMP).set(5000, 0));
    this.addTween(new AF.Tween(wild, "alpha", 0).set(800, 1).set(4200, 1, AF.Tween.JUMP).set(5000, 0));

	this.addTween(new AF.Tween(txt1, "alpha", 0).set(200, 0, AF.Tween.JUMP).set(1000, 1).set(4000, 1, AF.Tween.JUMP).set(4800, 0));
	this.addTween(new AF.Tween(txt2, "alpha", 0).set(200, 0, AF.Tween.JUMP).set(1000, 1).set(4000, 1, AF.Tween.JUMP).set(4800, 0));
	this.addTween(new AF.Tween(txt3, "alpha", 0).set(200, 0, AF.Tween.JUMP).set(1000, 1).set(4000, 1, AF.Tween.JUMP).set(4800, 0));
    this.addTween(new AF.Tween(txt4, "alpha", 0).set(200, 0, AF.Tween.JUMP).set(1000, 1).set(4000, 1, AF.Tween.JUMP).set(4800, 0));
    this.addTween(new AF.Tween(txt5, "alpha", 0).set(200, 0, AF.Tween.JUMP).set(1000, 1).set(4000, 1, AF.Tween.JUMP).set(4800, 0));

	this.addAction(function()
    {
        setGamesRemainingString(false, true);
        this.canClick = true;
	}, 1000-1);

	this.addAction(function()
    {

        setGamesRemainingString(false, true);

        game.startSpin();
        this.stop(0);


        this.visible=false;
        this.canClick = false;
        this.isDown = false;

    }, 5000-1);

	this.init = function()
	{
        game.playSound('featureIntro');
		srsplaying = false;
		this.canClick = false;
		this.isDown = false;
        this.visible = true;
        this.play(0);
	}
	this.processClick = function()
	{
		if (!this.canClick || !this.visible)
			return;

		this.isDown = true;
	};

	this.processClickRelease = function()
	{
		if (!this.canClick || !this.visible || !this.isDown || this.time>4000)
			return;

		this.moveTo(4000);
	};

	this.buttonsUp = function()
	{
		this.isDown = false;
	};
}
IntroPanel.prototype = new AF.Movie();


function SummaryPanel ()
{
	AF.Movie.call(this,6900);

    var bg =  new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_BIG.png'), 1);
    this.addChild(bg);

    var leftDragon =  new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_dragon.png'), 1);
    this.addChild(leftDragon);
    leftDragon.x = -100;
    leftDragon.y = 35;

    var rightDragon =  new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_dragon.png'), 1);
    this.addChild(rightDragon);
    rightDragon.x = 822;
    rightDragon.y = 35;
    rightDragon.scaleX = -1;


    var txt1 = new AF.Text();
    txt1.setMixedFormat(TXT_FREE_GAMES_SUMMARY_1);
    this.addChild(txt1);

	var txt2 = new AF.Text();
    txt2.setMixedFormat(TXT_FREE_GAMES_SUMMARY_2);
	this.addChild(txt2);

    var prize = new AF.MoneyText();
    prize.maxWidth = 500;
	prize.setTextFormat
	({
        size:76,
        align:"center",
        color:'#fef8ff 0, #fad85d 0.4, #c59409 1',
        stroke:'#000000 6'
	});
    prize.x = 312;
    prize.y = 260;
	prize.text = "000.00";
	this.addChild(prize);

	this.addTween(new AF.Tween(bg,  "alpha", 0).set(500, 0).set(1000, 1).set(6400, 1).set(6900, 0));
	this.addTween(new AF.Tween(leftDragon,  "alpha", 0).set(500, 0).set(1000, 1).set(6400, 1).set(6900, 0));
    this.addTween(new AF.Tween(rightDragon,  "alpha", 0).set(500, 0).set(1000, 1).set(6400, 1).set(6900, 0));

    this.addTween(new AF.Tween(txt1,  "alpha", 0).set(700, 0).set(1000, 1).set(6200, 1).set(6700, 0));
    this.addTween(new AF.Tween(txt2,  "alpha", 0).set(700, 0).set(1000, 1).set(6200, 1).set(6700, 0));
	this.addTween(new AF.Tween(prize, "alpha", 0).set(700, 0).set(1000, 1).set(6200, 1).set(6700, 0));

	var win;
	var winDelta;
	var winRoll;
    this.visible = false;

	this.init = function()
	{
		this.visible = true;
		this.play(0);

		win =  game.slotResult.winAmount;
        winDelta = Math.max(37, win / 20);
        winRoll = 0;
        prize.text = game.account.getCurrencyString(winRoll);
	};

	this.addAction(function(){

        game.messageBar.m_Text  = TXT_FEATURE_COMPLETED;

        if(win<=0)
			this.moveTo(3000);
		else
			game.playSound('rollup');
			srsplaying = false;
	}, 999);


	this.addAction(function(){
		winRoll = Math.min(win, winRoll + winDelta);
		prize.text = game.account.getCurrencyString(winRoll);
		if(winRoll<win)
		{
			this.moveTo(1000);
		}
		else
		{
			this.moveTo(3000);
		}
	}, 1060);

	this.addAction(function(){
		game.stopSound();
	}, 3000);

	this.addAction(function(){
		this.visible = false;
		this.stop();
		game.freeGames.m_bInFreeGames = false;
		autoDelayAfterFeature = false;
		game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
		gameConfig.drawPaylines = true;     
		
	}, 6900-1);
	
	
	this.addAction(function(){
		 
		gameConfig.drawPaylines = false;   
		 
	}, 1);
	
 
	
	
}
SummaryPanel.prototype = new AF.Movie();

function WildSymbol()
{
    var t = 120;
    AF.Movie.call(this, 15*t);

    var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbol_pearl.jpg'),15);
    this.addChild(sprite);

    this.addTween(new AF.SpriteTween(sprite).set(0, "0-14", 15*t));

    this.addAction(function(){
        this.play(0);
    }, 15*t - 1);
}
WildSymbol.prototype = new AF.Movie();





function DragonSymbol()
{
	
    var t = 120;
    AF.Movie.call(this, 16*t);

    var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbol_dragon.png'),16);
   this.addChild(sprite);

   this.addTween(new AF.SpriteTween(sprite).set(0, "0-15", 16*t));
  
    this.addAction(function(){
        this.play(0);
    }, 16*t - 1);
	
	
	
}
DragonSymbol.prototype = new AF.Movie();

  
   

function DragonSymbolDelay()
{
    var t = 120;
 
    AF.Movie.call(this, 53*t);

 
 this.addAction(function(){ 
 
  if(game.freeGames.m_bInFreeGames){
 
 	 game.freeGames.m_RespinTimer  = 5900;  
	 console.warn ("making BUGS");
 	  }
  
	},  t-1);    	
	
 
 

 this.addAction(function(){ 
	
    if(game.freeGames.m_bInFreeGames){
			
 if( !game.slotResult.numFreeGames == 0)  game.startSpin(); 
	 	 
   this.stop(0);     	
   
   }
  
  
 	}, 40*t-1);  	 
	
 
	
}
DragonSymbolDelay.prototype = new AF.Movie();

 
 
 
 




function ScatterSymbol()
{
	var t = 75;
	AF.Movie.call(this, 18*t);

	var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'),13);
	bg.frame = 12;
	this.addChild(bg);

	var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbol_scatter.jpg'),18);
	this.addChild(sprite);

	this.addTween(new AF.Tween(sprite,  "alpha", 0).set(t, 1));
	this.addTween(new AF.SpriteTween(sprite).set(t, "0-17", 18*t));

	this.addAction(function(){
		this.moveTo(t);
	}, 18*t - 1);
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
		for(var row = 0; row < 4; row++)
		{
			var slot = {};

            slot["00"] = new WildSymbol();
            slot["00"].x = column * (game.layout.symbolWidth + game.layout.reelGap);
            slot["00"].y = row * game.layout.symbolHeight;
            slot["00"].visible = false;
            this.addChild(slot["00"]);

            slot["01"] = new DragonSymbol();
            slot["01"].x = column * (game.layout.symbolWidth + game.layout.reelGap) - 7;
            slot["01"].y = row * game.layout.symbolHeight- 14.5;
            slot["01"].visible = false;
            this.addChild(slot["01"]);

			slot["12"] = new ScatterSymbol();
			slot["12"].x = column * (game.layout.symbolWidth + game.layout.reelGap);
			slot["12"].y = row * game.layout.symbolHeight;
			slot["12"].visible = false;
			this.addChild(slot["12"]);

			matrix[column].push(slot);
		}

        growSymbols[column] = new GrowSymbol();
        growSymbols[column].x = column * (game.layout.symbolWidth + game.layout.reelGap)+1;
        growSymbols[column].visible = false;
        this.addChild(growSymbols[column]);


	}

	this.animateWins = function()
	{
		var bitfield = 0;

		for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
		{
			bitfield |= game.slotResult.paylineWins[payline].second;
		}

        for(var row = 0; row < 4; row++)
		{
			for(var column = 0; column < 5; column++)
			{
				var symbol;
				var symbolId = game.reelMan.reels[column].slots[row+1].currentSymbol;
				if(bitfield & 0x00000001)
				{
                    if(symbolId == 0)
                    {
                        symbol = matrix[column][row]["00"];
                        symbol.visible = true;
                        symbol.play(0);

                    }  else if(symbolId == 1){

                        symbol = matrix[column][row]["01"];
                        symbol.visible = true;
                        symbol.play(0);

                    }else if(symbolId == 12){

                        symbol = matrix[column][row]["12"];
                        symbol.visible = true;
                        symbol.play(0);
                    }
                }
				bitfield = bitfield>>1;
			}
		}

        var win = game.freeGames.m_bInFreeGames?  fgCW : game.slotResult.winAmount;
        var bet = (game.slotResult.linesBet) * game.slotResult.betPerLine;

       /* if(win >= bet * 20)
            randomSprayAnim.init().startAnim();*/

    };

	this.stopWinAnims = function()
	{
		for(var row = 0; row < 4; row++)
		{
			for(var column = 0; column < 5; column++)
			{
				var slot = matrix[column][row];

                slot["00"].stop(0);
                slot["00"].visible = false;

                slot["01"].stop(0);
                slot["01"].visible = false;

                slot["12"].stop(0);
				slot["12"].visible = false;
			}
		}
	};
};
SymbolsMovie.prototype = new AF.Movie();

function isDragonWin()
{
    var bitfield = 0;

    for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
    {
        bitfield |= game.slotResult.paylineWins[payline].second;
    }

    for(var row = 0; row < 4; row++)
    {
        for(var column = 0; column < 5; column++)
        {
            var symbolId = game.reelMan.reels[column].slots[row+1].currentSymbol;
            if(bitfield & 0x00000001)
            {
                if(symbolId == 1){
                    return true;
                }
            }
            bitfield = bitfield>>1;
        }
    }
    return false;
}

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

game.api_switchReels = function(free)
{
    switchReels(free);
}


//---------Switch between base game reel strips and free game reel strips. Called when reels need to be switched -------
var switchReels = function(swap)
{
    if(swap)
    {

        var freeGameNumber;
        if(game.inRecovery)
            freeGameNumber= CFGG;
        else
            freeGameNumber= 1 + CFGG;

        var reel0 = eval("reelStripFG"+freeGameNumber+"_0");
        var reel1 = eval("reelStripFG"+freeGameNumber+"_1");
        var reel2 = eval("reelStripFG"+freeGameNumber+"_2");
        var reel3 = eval("reelStripFG"+freeGameNumber+"_3");
        var reel4 = eval("reelStripFG"+freeGameNumber+"_4");

        game.reelMan.setReelStrip(0,reel0);
        game.reelMan.setReelStrip(1,reel1);
        game.reelMan.setReelStrip(2,reel2);
        game.reelMan.setReelStrip(3,reel3);
        game.reelMan.setReelStrip(4,reel4);
    }
    else
    {
        game.reelMan.setReelStrip(0,reelStrip0);
        game.reelMan.setReelStrip(1,reelStrip1);
        game.reelMan.setReelStrip(2,reelStrip2);
        game.reelMan.setReelStrip(3,reelStrip3);
        game.reelMan.setReelStrip(4,reelStrip4);
    }
}

var reelStops = [1,1,1,1,1];
var srsplaying = false;
reelManagerUpdate = function(deltaTime) {

    var RM_SPINNING = 1;
    var RM_STOPPING = 2;
    var RM_WAITING_TO_STOP = 3;
	
    var i;
	
    for(i=0; i<5; i++) {

        var r = this.reels[i];

        if (game.reelMan.reels[i].state == 3){
            if (scatterReels[i] >= 0 && (4-i + getScattersCountBeforeReel(i)) >= 2) {  //Wrong conditon
				if (2-i + getScattersCountBeforeReel(i) >= 2) {
					growSymbols[i].visible = true;
				
					growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
					if (growSymbols[i].time <= 0) {
						game.playSound('srs'+(1+i));
						growSymbols[i].play(0);
						srsplaying = true;
					}
				} else {
					if ((!game.isSoundPlaying() || srsplaying) && firstSoundPlayed) {	
						var reel_sound = 'reelstop'+i;
						game.stopSound();
						game.playSound(reel_sound);
						srsplaying = false;
						break;
					}
				}
                
            } else {
				if (i < 4 && game.reelMan.reels[i].state == RM_WAITING_TO_STOP) {
						if ((!game.isSoundPlaying() || srsplaying) && firstSoundPlayed) {	
							var reel_sound = 'reelstop'+i;
							game.stopSound();
							game.playSound(reel_sound);
							srsplaying = false;
							break;
						}	
					
				}
			}
        } else if (game.reelMan.reels[i].state == 0 && i < 3) {
			
            if (reelStops[i] != 1) {
                reelStops[i] = 1;
                if (i < 2 && getScattersCountBeforeReel(i+1) >= 2 && i < 2){
                    setTimeout(function(){
                        if(FGT != 0)game.playSound("windup");
						srsplaying = false;
                    }, 500);
					setTimeout(function(){
						game.stopSound();
                        game.playSound("reelstop4");
						srsplaying = false;
                    }, 2500);
                }
            }
            growSymbols[i].stop(0);
            growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
        }
    }
	
    switch(this.state)
    {
        case RM_SPINNING:
            if (WSR >= 0) {
                this.stoppingTime += deltaTime;

                //- Increase delay for stacked wilds anticipation
                if(this.stoppingTime > 3000 && !game.slotResult.bProcessed)
                {
                    this.state         = RM_STOPPING;
                    this.stoppingTime  = 0;
                    this.reelStopIndex = 0;
                    game.slotResult.bProcessed = true;
                }

                for(i=0; i<5; i++)
                {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;

        case RM_STOPPING:
		
            //- If 2 scatters landed on reels
            if(getScattersCountBeforeReel(this.reelStopIndex) >= 2){
				//console.log(">>>> Symbols going Gray");
                //- If previous reel is stopped
                if(this.reels[this.reelStopIndex-1].isStopped() && !game.freeGames.m_bInFreeGames) {
                    greyOutSymbols(true);
					
                }

                for(i = this.reelStopIndex-1; i < 5; i++) {
                    if (this.reels[i].slots[0].currentSymbol == 11 && !game.freeGames.m_bInFreeGames){
                        if (i == this.reelStopIndex-1){
                           // playWhizBy(i, scatterReels[i]);
                        } else {
                            //playWhizBy(i, 2);
                        }
                    }
                }

                this.crankOffset = 0;
                this.stoppingTime += deltaTime;

                //- Increase stop time for windable reel
                if(this.stoppingTime >= 2500 && this.reelStopIndex == 2){
                    //Reel stops come from m_SlotResult.
                    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);

                    this.stoppingTime = 0;
                    this.reelStopIndex++;
					
                } else if(this.stoppingTime >= 300 && this.reelStopIndex !=2)
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
                if(getScattersCountBeforeReel(this.reelStopIndex) >= 2){
                    for(i = this.reelStopIndex-1; i < 5; i++) {
                        if (this.reels[i].slots[0].currentSymbol == 11 && !game.freeGames.m_bInFreeGames){
                            if (i == this.reelStopIndex-1 && scatterReels[i] != -1){
                                //playWhizBy(i, scatterReels[i]);
                            } else {
                               // playWhizBy(i, 2);
                            }
                        }
                    }
                }

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

function greyOutSymbols(value) {
	
	if (greyOutState == value) return;
    greyOutState = value;
	//if(greyOutState)windup = true;

    //for(var i = 0; i < 5; i++){
	    /*for(var j = 0; j < 5; j++){
            for(var s = 0; s < 12; s++){
                var sym = game.reelMan.reels[2].slots[j].symbols[s];
                if (value) {
                  sym.alpha = [0.55]; //0.4
                } else {
                   sym.alpha = [1];
                }
            }
        }*/
    //}	
};

function drawBlackAndWhite(image) {
	/*var data = undefined;
	i = 0;
	
	imagedata = ctx.getImageData(0,0, ctx.width, ctx.height);
	data = imagedata.data;
	
	for(i=0; i<data.length - 4; i+=4){
		average = (data[i]+data[i+1]+data[i+2]) /3;
		data[i] = average;
		data[i+1] = average;
		data[i+2] = average;	
	}
	ctx.putImageData(imagedata,0,0);*/
}

function getScattersCountBeforeReel(reel){
    var result = 0;
	//console.log(">>>>> getScattersCountBeforeReel");
    for (var i = 0; i < reel; ++i){
        if (scatterReels[i] >= 0){
			
            result++;
        }
    }
    return result;
}

function getScattersCount() {
	var result = 0;
	//console.log(">>>>> getScattersCountBeforeReel");
    for (var i = 0; i < 5; ++i){
        if (scatterReels[i] >= 0){
			
            result++;
        }
    }
    return result;
}


function GrowSymbol()
{
    var t = 75;
    AF.Movie.call(this, 6*t);

    var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'),13);
    sprite.frame = 12;
    this.addChild(sprite);

	var scaleTo = 1.5;
    var dx = -game.layout.symbolWidth * (scaleTo - 1) * 0.5;
    var dy = -game.layout.symbolHeight * (scaleTo - 1) * 0.5;
	
	this.addTween(new AF.Tween(sprite, "scaleX", 1).set(0, 1).set(2*t, scaleTo).set(5*t, 1));
    this.addTween(new AF.Tween(sprite, "scaleY", 1).set(0, 1).set(2*t, scaleTo).set(5*t, 1));

    this.addTween(new AF.Tween(sprite, "x", 0).set(0, 0).set(2*t, dx).set(5*t, 0));
    this.addTween(new AF.Tween(sprite, "y", 0).set(0, 0).set(2*t, dy).set(5*t, 0));
	
//    this.addTween(new AF.Tween(sprite, "scaleX", 0).set(0, 1).set(2*t, 1.5).set(5*t, 1));
//    this.addTween(new AF.Tween(sprite, "scaleY", 0).set(0, 1).set(2*t, 1.5).set(5*t, 1));

//    this.addTween(new AF.Tween(sprite, "x", 0).set(0, 0).set(2*t, -37).set(5*t, 0));
//    this.addTween(new AF.Tween(sprite, "y", 0).set(0, 0).set(2*t, -28).set(5*t, 0));


    this.addAction(function(){
        this.stop(0);
        this.visible= 0;
    }, 6*t -1);


}
GrowSymbol.prototype = new AF.Movie();


function FeatureTriggerSound()
{
    var playingNumber = 0;

    var durationBell = Math.round(gAudioSettings.spritemap.featureTr.end*1000 - gAudioSettings.spritemap.featureTr.start*1000 + 1);
    var durationAward = Math.round(gAudioSettings.spritemap.featureTr.end*1000 - gAudioSettings.spritemap.featureTr.start*1000 + 1);

    AF.Movie.call(this, durationBell + durationAward );

    this.addAction(function(){
        game.playSound('featureTr');
    }, 1);

    this.addAction(function(){
        if(playingNumber == 1) {
            this.stop(0);
            this.visible = false;
        } else{
            game.playSound('featureTr');
        }

    }, durationBell);

    this.addAction(function(){
        this.stop(0);
        this.visible = false;
    }, durationBell + durationAward -1);

    this.visible = false;
    this.init = function(value)
    {
        playingNumber = value;

        game.freeGames.m_TriggerTimer = durationBell + durationAward;
        this.visible = true;
        this.play(0);
    };
}
FeatureTriggerSound.prototype = new AF.Movie();





// #############################################################################################
// #############################################################################################
// 
// DELAY MESSAGES AUXILIAR FUNCTIONS
//
// #############################################################################################
// #############################################################################################


//create a delay based on the wins
//if its a simple win create a time to show the shower and then swap the message for play now
//during big win we have to keep this interval longer until finish the shower.
//if there is no win, just swap the message immediatelly
function delayMessageBoxBottom(message){

    var delayMessage;
    var isDradonWin = isDragonWin();


    if(isBigWin()){
        delayMessage =  3500;
        //just add extra delay when get the lion animation
        if(isDradonWin) delayMessage = delayMessage + 1500;
    }else if(isWin()){
        delayMessage =  3000;
        //just add extra delay when get the lion animation
        if(isDradonWin) delayMessage = delayMessage + 1000;
    }else{
        delayMessage = 0;   
    }

    
    if(delayMessage > 0){
        setTimeout (function () {
            game.messageBar.m_Text = message;  
        } , delayMessage)
    }else{
        if (game.account.canBet())game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;     
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