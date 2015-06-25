var TXT_LOADING 			= "Loading...";
var TXT_GAME_OVER 			= "Game Over";
var TXT_SPIN_MSG			= "Good Luck!";
var TXT_GAME_REMAINING 		= "Free Game Remaining";
var TXT_GAMES_REMAINING 	= "Free Games Remaining";
var TXT_FREE_GAME_WON 		= "Free Game Won";
var TXT_FREE_GAMES_WON 		= "Free Games Won";
var TXT_OF_A_KIND 			= "OF A KIND";
var TXT_PAYS_ANY 			= "PAYS ANY";
var TXT_RETURN_TO_GAME		= "Return to Game";
var TXT_CONFIRM    			= "Confirm";
var TXT_USE_SOUND  			= "Play with sound?";
var TXT_WARNING    			= "Warning";
var TXT_NOT_ENOUGH_BALANCE 	= "Not enough balance for the Bet";
var TXT_RECOVERING			= "Recovering...";
var TXT_CONNECTING_TO_SERVER = "Connecting to server...";

var TXT_PICK_BONUS          = "CONGRATULATIONS! PICK to WIN!";
var TXT_PICK_ME             = "PICK ME";
var TXT_PICK_AGAIN          = "Pick Again";

// for the following scroll messages, if the message is too long to fit into the message bar it can be broken onto consecutive lines. 
var TXT_SCROLL_MESSAGES = 	[
				
				"Look for 3 or more TV scattered Left to Right",	
				"WIN 12 Free Games with TRIPLED PRIZES!",					
				"Who's that GIRL? She's WILD!",
				"Check out the latest CHART TOPPER",
				"OUT NOW on LP and Cassette",
				"She's the UK's TOP POP STAR, and SHE's GOT IT!",
				"Hey DJ, PUMP UP THE VOLUME!",
				"There's a PARTY in the HOUSE",
				"Don't stop DANCING!", 
				"She's your fire, YOUR DESIRE!" ,
				"PICK to WIN when GIRL lands on reels 1 and 5!"    
				
				];    
var TXT_INTRO_MESSAGES = [""];

var TXT_GAME_RULES_HEADER = "GAME RULES";
var TXT_GAME_RULES_CONTENT = [
                            "Play 1 to 20 paylines",
                            "Payouts are made according to the Paytable",
                            "Payline wins are multiplied by the amount staked per payline",
                            "Scatter wins are multiplied by the total amount staked",
                            "Scatter wins are added to payline wins",
                            "Highest win only on each selected payline",
							"Wins on different paylines are added",
                            "All wins occur on selected lines except Scattered TV",
                            "All symbols pay Left to Right including Scattered TV",
                            "GIRL substitutes for all symbols except Scattered TV" 
                           
						];

var TXT_FREE_GAMES_HEADER = "FREE GAMES FEATURE";
var TXT_FREE_GAMES_FEATURE = [
     "A Free Game Feature is triggered when 3 or more Scattered TV appear left to right",
     "12 Free Games are awarded during which all prizes are tripled",
     "The feature can be retriggered",
     "Free Games are played at the lines and bet of the trigger game",
     "Free Game wins are added to payline and scatter wins"
						    ];

var TXT_PICK_HEADER = "PICK AND WIN FEATURE";
var TXT_PICK_FEATURE = [
                        "The Pick and Win Feature is awarded when GIRL appears anywhere on Reels 1 and 5 at the same time",
                        "Pick one of the triggering symbols to reveal a prize",
                        "Pick again may also be awarded",
                        "Win up to 100 times your triggering bet",
                        "All prizes are multiplied by the triggering bet",
                        "The Pick and Win Feature can be won during the Free Games Feature"
];  

var TXT_WILD_RULE 			= "GIRL substitutes for all symbols except Scattered TV";
var TXT_SCATTER_RULE 		= "Scatter wins are multiplied by the total amount staked";
							   

var TXT_SUMMARY_CONGRATULATIONS={
	text: "CONGRATULATIONS!",
	x:400,
	y:120,
	size:60,
	bold:true,
	hAlign: "center",
	color:"#FFCC02",
	stroke: [[7,'#19308e']]
};
var TXT_SUMMARY_TOTAL_WIN={
	text: "TOTAL WIN",
	x:400,
	y:210,
	size:46,
	hAlign: "center",
	color:"#FFFFFF",
	stroke: [[6,'#19308e']]
};
var TXT_SUMMARY_VAL={
	text: "0",
	x:400,
	y:360,
	size:100,
	bold:true,
	hAlign: "center",
	color:"#FFCC02",
	stroke: [[12,'#19308e']]  
};



var TXT_FREE_GAMES_INTRO_TITLE={
	text: "CONGRATULATIONS!",
	x:400,
	y:120,
	size:60,
	bold:true,
	hAlign: "center",
	color:"#FFCC02",
	stroke: [[7,'#19308e']]
};
var TXT_FREE_GAMES_INTRO_WON={
	text: "%s FREE GAMES WON",
	x:400,
	y:200,
	size:44,
	hAlign: "center",
	color:"#FFFFFF",
	stroke: [[5,'#19308e']]
};
var TXT_FREE_GAMES_INTRO_TEXT_1={
    text: "All Prizes TRIPLED!",
    x:400,
    y:300,
    size:44,
    hAlign: "center",
    color:"#FFFFFF",
    stroke: [[5,'#19308e']]
};
var TXT_FREE_GAMES_INTRO_TEXT_2={
    text: "Good Luck",
    x:400,
    y:400,
    size:44,
    hAlign: "center",
    color:"#FFFFFF",
    stroke: [[5,'#19308e']]
};

//-------------------------------------------------------------------------------------------------------------------
// Common to all games
var MESSAGE_BTN_NO 			= "No";
var MESSAGE_BTN_YES 		= "Yes";
var MESSAGE_BTN_CANCEL 		= "Cancel";
var MESSAGE_BTN_SUBMIT 		= "Submit";
var MESSAGE_BTN_OK 			= "OK";

var TXT_METERS_BALANCE 		= "Balance:";
var TXT_METERS_BET	   		= "Total Bet:";
var TXT_METERS_WIN	   		= "Win:";

var TXT_WILD 				= "WILD";
var TXT_SCATTER 			= "SCATTER";

//var TXT_COPY_RIGHT_MESSAGES = "Copyright \u00A9 2013 NextGen Gaming ";
var TXT_COPY_RIGHT_MESSAGES = " ";	//888 requested there should be no copyright message for this game.

// 888 Specific home button menu items
var TXT_MENU_BACK			= "BACK";
var TXT_MENU_LOBBY			= "LOBBY";
var TXT_MENU_CASHIER		= "CASHIER";
var TXT_MENU_HELP			= "HELP";

//------------------------------------------------------------------------------------------------------
// Error messages - Common to all games 

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

//=================== DO NOT TRANSLATE BELOW THIS LINE =============================================

//---------------------------------------------------------------
// Language specific format information
//
// ----- Size of meter fields --------------
// these should add up to 98% as 2% is reserved for padding.
var METER_BALANCE_WIDTH		= '38%';
var METER_BET_WIDTH			= '30%';
var METER_WIN_WIDTH			= '30%';
var METER_LABEL_SIZE_L		= '24px';
var METER_LABEL_SIZE_P		= '17px';
var METER_VALUE_SIZE_L		= '24px';
var METER_VALUE_SIZE_P		= '17px';

// sizes of other fonts
var MESSAGE_BAR_FONT		= '24px arial';
var WIN_METER_FONT          = '42px arial';

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

// This function is called when this file is loaded. 
function formatLanguage() {
	$("#field_balance").width(METER_BALANCE_WIDTH);
	$("#field_bet").width(METER_BET_WIDTH);
	$("#field_win").width(METER_WIN_WIDTH);
	
	$("span.meterLabel").css("font-size", METER_LABEL_SIZE_L);
	$("span.meterValue").css("font-size", METER_VALUE_SIZE_L);
}

//-------------------------------------------------------------------							   
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

    if ($(".titlepick").size() > 0)
        $(".titlepick").html(TXT_PICK_HEADER);
	
	$("#gamerulestext").find("li").remove();
	$.each(TXT_GAME_RULES_CONTENT, function(index, value) {
		$("#gamerulestext").append($("<li>").html(value))
	});
	
	$("#freegamestext").find("li").remove();
	$.each(TXT_FREE_GAMES_FEATURE, function(index, value) {
		$("#freegamestext").append($("<li>").html(value))
	});
    $("#picktext").find("li").remove();
    $.each(TXT_PICK_FEATURE, function(index, value) {
        $("#picktext").append($("<li>").html(value))
    });
}


$(function() {
	correctIphoneHelpText = function()
	{
		if (navigator.userAgent.match(/iPhone/i))
		{
			$(".titlerules, .titlefree, .rules, .titlefeature, .titlepick").css("font-size", "30px");
			$(".count, .amount, .helptext, .exitHelp").css("font-size", "24px");
			$(".ofakind, .paysany").css("font-size", "18px");
			$(".wildrule, .scatterrule").css("font-size", "18px");
			$("#helpDiv1").find(".helpblockbackground").css("width", "430px");
			$("#helpDiv1").find(".helpblockbackground").css("height", "225px");

			$("#helpDiv2").find(".helpblockbackground").css("height", "135px");
			$("#helpDiv2").find(".helpblockbackground").css("width", "230px");
            $("#helpDiv2").find(".helpblockbackground>table:lt(2)").css("margin-top", "20px");
            $("#helpDiv2").find(".helpblockbackground>table:gt(1)").css("margin-top", "20px");

            $("#helpDiv3").find(".helpblockbackground").css("height", "135px");
            $("#helpDiv3").find(".helpblockbackground").css("width", "230px");
            $("#helpDiv3").find(".helpblockbackground>table:lt(2)").css("margin-top", "10px");
            $("#helpDiv3").find(".helpblockbackground>table:gt(1)").css("margin-top", "10px");
		}
        else
        {
            $("#helpDiv1").find(".helpblockbackground").css("height", "210px");
            $("#helpDiv2").find(".helpblockbackground").css("height", "135px");
            $("#helpDiv3").find(".helpblockbackground").css("height", "135px");

            $("#helpDiv2").find(".helpblockbackground>table:lt(2)").css("margin-top", "30px");
            $("#helpDiv2").find(".helpblockbackground>table:gt(1)").css("margin-top", "30px");

            $("#helpDiv3").find(".helpblockbackground>table:lt(2)").css("margin-top", "15px");
            $("#helpDiv3").find(".helpblockbackground>table:gt(1)").css("margin-top", "15px");

        }
	}

	oldWelcome = Welcome;
	Welcome = function()
	{
		oldWelcome.call(this);
		
		if (navigator.userAgent.match(/iPhone/i))
			this.welcomeTxt.font = "25px arial";
		
		this.soundTxt.font    = "32px arial";
		this.soundTxt.m_Color = "#FFFF00";
	};
});

formatLanguage();
