var TXT_LOADING 			= "Loading Game ...";
var TXT_GAME_OVER 			= "Game Over";
var TXT_SPIN_MSG			= "Good Luck!";
var TXT_GAME_REMAINING 		= "Free Game Remaining";
var TXT_GAMES_REMAINING 	= "Free Games Remaining";
var TXT_FREE_GAME_WON 		= "Free Game Won";
var TXT_FREE_GAMES_WON 		= "Free Games Won";
var TXT_OF_A_KIND 			= "OF A KIND";
var TXT_PAYS_ANY 				= "PAYS ANY";
var TXT_RETURN_TO_GAME		= "Return to Game";
var TXT_CONFIRM    			= "Confirm";
var TXT_USE_SOUND  			= "Play with Sound?";
var TXT_WARNING    			= "Warning";
var TXT_NOT_ENOUGH_BALANCE 	= "Not enough balance for the Bet";
var TXT_RECOVERING			= "Recovering...";
var TXT_CONNECTING_TO_SERVER = "Connecting to server...";

var TXT_RESPIN_WON 	     	= "Respin Won";
var TXT_FREE_GAME_WON2 	= "Free Game Won";  

var TXT_RTP_STRING			= "The Theoretical Return to Player is: %1";  

// for the following scroll messages, if the message is too long to fit into the message bar it can be broken onto consecutive lines. 
var TXT_SCROLL_MESSAGES = [
	"Extra! Extra! Read all about it!",
	"NEWSPAPER is WILD!",
	"SPECIAL LATE EDITION!",
	"Win FREE GAMES with 3 or more SCATTER",
	"STOP THE PRESSES!",
	"RE-SPIN for a SECOND CHANCE to WIN the Feature!",
	"Or RE-SPIN for the chance to WIN MORE Free Games!",
	"Extra! Extra!...Extra Cash!!",
	"What a scoop!",
	"Make the FRONT PAGE with a HEADLINE WIN!",
	"Stock market rallies...",
	"Wall Street riding high on EXTRA CASH!!",
	"Extra Extra WILDS means EXTRA EXTRA CASH!!",
	"Can you fill the reels with WILDS?"
];
var TXT_INTRO_MESSAGES = [
	"WIN 8 FREE GAMES!", "with HONEYCOMB that STICKS to the REELS!",
	"",
	"A Teddy Bear may appear after ANY spin","to add HONEYCOMB to the Reels!",
	"",
	"HONEYCOMB is WILD"
];

var TXT_GAME_RULES_HEADER = "GAME RULES";
var TXT_GAME_RULES_CONTENT = [
	"Play 1 to 50 lines",
	"Payouts are made according to the Paytable",
	"Payline wins are multiplied by the bet per payline",
	"Scatter wins are multiplied by the total bet",
	"Scatter wins are added to payline wins",
	"Highest win only on each selected payline",
	"Wins on different paylines are added",
	"All wins on selected paylines only except SCATTER",
	"All wins begin with leftmost reel and pay left to right on consecutive reels except SCATTER which pays any",
	"WILD substitutes for all symbols except SCATTER",
	"Malfunction voids all pays and plays"
];

var TXT_BEAR_WILD_HEADER = "FREE GAMES FEATURE";
var TXT_BEAR_WILD_CONTENT = [
	"8, 12 or 20 Free Games are awarded when 3, 4 or 5 SCATTER appear respectively at the completion of the Re-Spin Feature",
	"20 Free Games are awarded when 5 SCATTER appear during any Base game",
	"Any WILD appearing is held for remaining free games",
	"Free Games are played at the paylines and bet of the triggering game",
	"Free Games Feature cannot be retriggered"
];

var TXT_FREE_GAMES_HEADER = "RE-SPIN FEATURE";
var TXT_FREE_GAMES_FEATURE = [
	"The Re-Spin Feature is awarded when 2, 3 or 4 SCATTER appear during any Base game",
	"Reels with SCATTER appearing are held and all other reels are Re-Spun once",
	"Re-Spin Feature cannot be retriggered"
];

var TXT_EXTRA_WILD_HEADER = "EXTRA WILD";
var TXT_EXTRA_WILD_FEATURE = [
	"After any Base Game a WILD may be added to Reels 2, 3 and 4",
	"After any Free Game a WILD may be added to ANY reel"

];

var TXT_COPY_RIGHT_MESSAGES = "Copyright \u00A9 2014 NextGen Gaming ";
							   
var MESSAGE_BTN_NO 			= "No";
var MESSAGE_BTN_YES 		= "Yes";
var MESSAGE_BTN_CANCEL 		= "Cancel";
var MESSAGE_BTN_SUBMIT 		= "Submit";
var MESSAGE_BTN_OK 			= "OK";

var TXT_METERS_BALANCE = "Balance:";
var TXT_METERS_BET	   = "Total Bet:";
var TXT_METERS_WIN	   = "Win:";



var TXT_FREE_GAMES_INTRO_TITLE={
	text: "BONUS",
	x:10,
	y:-28,
	size:45,
	bold:true,
	hAlign: "center",
	color:"#d11748",
	stroke: [[4,'#4b3a17']]
};
var TXT_FREE_GAMES_INTRO_WON={
	text: "%s FREE GAMES WON!",
	x:10,
	y:8,
	size:21,
	bold:true,
	hAlign: "center",
	color:"#fed533",
	stroke: [[3,'#4b3a17']]
}; 
var TXT_FREE_GAMES_INTRO_DESCR1={
	text: "Any WILD appearing",
	x:20,
	y:61,
	size:15,
	hAlign: "center",
	color:"#FFFFFF",
	stroke: [[3,'#3d3d3b']]
};
var TXT_FREE_GAMES_INTRO_DESCR2={
	text: "is HELD for the remaining Free Games",
	x:20,
	y:83,
	size:15,
	hAlign: "center",
	color:"#FFFFFF",
	stroke: [[3,'#3d3d3b']]
};


var TXT_SUMMARY_CONGRATULATIONS={
	text: "CONGRATULATIONS!",
	x:545,
	y:220,
	size:56,
	bold:true,
	hAlign: "center",
	color:"#ffea00",
	stroke: [[4,'#000']]
	
};
var TXT_SUMMARY_TOTAL_WIN={
	text: "TOTAL WIN",
	x:535,
	y:280,
	size:50,
	bold:true,
	hAlign: "center",
	color:"#FFFFFF",
	stroke: [[4,'#000']]
};
var TXT_SUMMARY_VAL={
	text: "0",
	x:535,
	y:440,
	size:90, 
	bold:true,
	hAlign: "center",
	color:"#ffea00",
	stroke: [[4,'#000']]
};  

 
 


var TXT_ERROR						= "Error";
var TXT_ERROR_PROTOCOL				= "Unknown protocol message";
var TXT_ERROR_PROTOCOL_SEQUENCE		= "Incorrect Sequence of messages";
var TXT_ERROR_UNKNOWN_PARAMETER		= "Unknown parameter in protocol";
var TXT_ERROR_MISSING_PARAMETER		= "Missing parameter in protocol";
var TXT_ERROR_PARAMETER_VALUE		= "Parameter Values is wrong";
var TXT_ERROR_BET_LIMITS			= "Bet amount out of limits";
var TXT_ERROR_LINES					= "Incorrect number of lines";
var TXT_ERROR_FEATURE_PARAMETERS	= "Feature Parameters incorrect";
var TXT_ERROR_JACKPOT				= "Unknown Jackpot error";
var TXT_ERROR_UNKNOWN				= "Unknown error";
var TXT_ERROR_NULL					= "Server communications lost";
var TXT_ERROR_INSUFFICIENTFUNDS		= "Not enough balance for the Bet";
var TXT_ERROR_STATESAVE				= "Error trying to save the state";
var TXT_ERROR_STARTGAME				= "Error trying to start the game";
var TXT_ERROR_ENDGAME				= "Error trying to end the game";
var TXT_ERROR_GAMENOTSUPPORTED		= "Game isn't supported by the system";
var TXT_ERROR_TIMEOUT				= "You have been disconnected from the Server.  Please restart the game.";
var TXT_ERROR_SERVLET				= "Server communications lost";
var TXT_ERROR_DEFAULT				= "Server communications lost";
var TXT_ERROR_GAMING_LIMITS			= "Gaming limits reached";
var TXT_ERROR_INVALID_SESSION		= "Player session is not valid";
var TXT_ERROR_ACCOUNT_BLOCKED		= "Player account locked";

var TXT_FR_INTRO     				= "Congratulations! <br> You have %1 Free Rounds.";
var TXT_FR_INTRO_ONE 				= "Congratulations! <br> You have %1 Free Round.";
var TXT_FR_INTRO_GOOD_LUCK 			= "<br>Good Luck!";
var TXT_FR_YES_NO_QUESTION 			= "<br>Play Free Rounds Now?";
var TXT_FR_OUTRO_START 				= "Congratulations! <br> You have won %1 in Free Rounds.<br>";
var TXT_FR_OUTRO_END 				= "Free Rounds has now ended. <br> Funds will now be used from your account. <br> Your bet amount will now be reset <br> back to the default.";
var TXT_FR_ERROR 					= "You were awarded Free Rounds, <br> but an error has occurred. <br> Please contact the Casino.";
var TXT_FR_TITLE 					= "Free Rounds";
var TXT_FR_WIN_METER_LABEL 			= "Total Free Rounds Win: ";
var TXT_FR_ROUND_NUMBER_METER_LABEL = "Free Rounds Remaining: %1";

var TXT_WILD = "WILD";
var TXT_WILD_RULE = "Substitutes for all symbols except SCATTER";
var TXT_SCATTER = "SCATTER";
var TXT_SCATTER_RULE = "Scatter wins are multiplied by the total bet";

//=================== DO NOT TRANSLATE BELOW THIS LINE =============================================


//---------------------------------------------------------------
// Language specific format information
var METER_BALANCE_WIDTH		= '40%';
var METER_BET_WIDTH			= '28%';
var METER_WIN_WIDTH			= '30%';
var METER_LABEL_SIZE_L		= '20px';
var METER_LABEL_SIZE_P		= '14px';
var METER_VALUE_SIZE_L		= '20px';
var METER_VALUE_SIZE_P		= '14px';

var MESSAGE_BAR_FONT		= '21px arial';

// Change in orientation - landscape = 1, portrait = 0 
function orientationChangeLanguage(landscape) {
	if(landscape) {
		$("span.meterLabel").css("font-size", METER_LABEL_SIZE_L);
		$("span.meterValue").css("font-size", METER_VALUE_SIZE_L);
	}
	else {
		$("span.meterLabel").css("font-size", METER_LABEL_SIZE_P);
		$("span.meterValue").css("font-size", METER_VALUE_SIZE_P);
	}
}


function formatLanguage() {
	$("#field_balance").width(METER_BALANCE_WIDTH);
	$("#field_bet").width(METER_BET_WIDTH);
	$("#field_win").width(METER_WIN_WIDTH);
	
	$("span.meterLabel").css("font-size", METER_LABEL_SIZE_L);
	$("span.meterValue").css("font-size", METER_VALUE_SIZE_L);
}

function loadHelpLanguage() {
	if ($(".exitHelp").size() > 0)
		$(".exitHelp").val(TXT_RETURN_TO_GAME);
	
	if ($("#txtwild").size() > 0)
		$("#txtwild").html(TXT_WILD);
	if ($(".wildrule").size() > 0) 
		$(".wildrule").html(TXT_WILD_RULE);
	
	if ($("#txtscatter").size() > 0)
		$("#txtscatter").html(TXT_SCATTER);
	if ($(".scatterrule").size() > 0) 
		$(".scatterrule").html(TXT_SCATTER_RULE);
	
	if ($(".ofakind").size() > 0) 
		$(".ofakind").html(TXT_OF_A_KIND);

	if ($(".paysany").size() > 0) 
		$(".paysany").html(TXT_PAYS_ANY);

	if ($(".titlerules").size() > 0)
		$(".titlerules").html(TXT_GAME_RULES_HEADER);
		
	if ($(".titlefree").size() > 0)
		$(".titlefree").html(TXT_FREE_GAMES_HEADER);
		
	if ($(".titleextrawild").size() > 0)
		$(".titleextrawild").html(TXT_EXTRA_WILD_HEADER);

	if ($(".titlebearwild").size() > 0)
		$(".titlebearwild").html(TXT_BEAR_WILD_HEADER);
	
	$("#gamerulestext").find("li").remove();
	$.each(TXT_GAME_RULES_CONTENT, function(index, value) {
		$("#gamerulestext").append($("<li>").html(value))
	});
	
	$("#freegamestext").find("li").remove();
	$.each(TXT_FREE_GAMES_FEATURE, function(index, value) {
		$("#freegamestext").append($("<li>").html(value))
	});
	
	$("#extrawildtext").find("li").remove();
	$.each(TXT_EXTRA_WILD_FEATURE, function(index, value) {
		$("#extrawildtext").append($("<li>").html(value))
	});
	
	$("#bearwildtext").find("li").remove();
	$.each(TXT_BEAR_WILD_CONTENT, function(index, value) {
		$("#bearwildtext").append($("<li>").html(value))
	});
}

$(function() {
	correctIphoneHelpText = function()
	{
		if (navigator.userAgent.match(/iPhone/i))
		{
			$(".titlerules, .titlefree, .rules, .titlefeature, .titleextrawild, .titlebearwild").css("font-size", "44px");
			$(".count, .amount, .helptext, .exitHelp").css("font-size", "24px");
			$(".ofakind, .paysany").css("font-size", "18px");
			$(".wildrule, .scatterrule").css("font-size", "18px");
			$("#helpDiv1").find(".helpblockbackground").css("height", "200px");
			$("#helpDiv2").find(".helpblockbackground:lt(5)").css("height", "240px");
			$("#helpDiv2").find(".helpblockbackground:gt(4)").css("height", "210px");
			$("#helpDiv2").find(".helpblockbackground").css("width", "116px");
		}
		else
		{
			$("#helpDiv1").find(".helpblockbackground").css("height", "170px");
			$("#helpDiv2").find(".helpblockbackground:lt(5)").css("height", "220px");
			$("#helpDiv2").find(".helpblockbackground:gt(4)").css("height", "195px");
			$("#helpDiv2").find(".helpblockbackground").css("width", "116px");
		}
	}
	
	oldWelcome = Welcome;
	Welcome = function()
	{
		oldWelcome.call(this);
		
		// if (navigator.userAgent.match(/iPhone/i))
		this.welcomeTxt.font = "25px arial";
		
		this.soundTxt.font    = "32px arial";
		this.soundTxt.m_Color = "#FFFF00";
	};
});

formatLanguage();