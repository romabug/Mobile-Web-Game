// This file contains the API Extention function.
// This file contains generic get and set values and is intended to provide flexibility for particular integrations. 
// The paraName is a string representing the name of the parameter and paraValue is a string respresenting the value of that parameter.
// Depending on the specific parameter the function will return the specified value, the empty string, or 'error'.

//This file is customised for each customer
function apiExt(/*paraName, paraValue*/)
{
	//TODO: Set/get specific parameters
	if (arguments.length < 1) {
		return;
	} else {
		var paraName = arguments[0];
		var paraValue = arguments.length > 1?arguments[1]:"";
		
		switch(paraName)
		{
			case "JSON_TO_GDM_GSD":
				return translateGSD("JSON_GDM",paraValue);		// translate JSON string relating to game specific data into a GDM message snippet
			break;
			
			case "GDM_TO_JSON_GSD":
				return translateGSD("GDM_JSON",paraValue);		// translate GDM game specific data snippet into a JSON string
			break;
			
			case "AUTOPLAY_TOTAL":			//total number of autoplay games selected
				return game.autoPlayGamesToPlay;
			break;
	
			case "AUTOPLAY_CURRENT":		// the current autoplay game number
				return game.autoPlayGames;
			break;
	
			case "AUTOPLAY_MODE":			// whether autoplay is on or off. 
				return game.autoPlay;
			break;
			
			case "SET_BALANCE":
				setBalance(paraValue);
				return "";
			break;
	
			case "SET_HISTORY_MODE":
				game.setHistoryMode(Boolean(paraValue));
			break;
			
			case "SERVER_ERROR":
				if (typeof paraValue === "function") {
					handleServerError(paraValue);
				} else {
					handleServerError();
				}
				return "";
			break;
			
			case "SHOW_GAME_INFO":
				if (game.gameState == SS_STOPPED || game.gameState == SS_WIN_PAYLINE) {
					if (!(game.slotResult.winType & WT_PICK_FEATURE_TRIGGER) && !(game.slotResult.winType & WT_FEATURE_TRIGGER) && !game.autoPlay)
					game.uapi_info();
				}
			break;
			
			case "SET_MENU_BTN_SWITCH":
				game.ui.setHomeBtnMidRoundState(paraValue);
			break;
			
			case "MSG_POP_UP":
				if(arguments.length == 4) {
					handlePopUp(arguments[1], arguments[2], arguments[3]);			
				} else if (arguments.length == 3) {
					handlePopUp(arguments[1], arguments[2]);
				}
			break;
			
			case "CONFIRM_POP_UP":
					handleConfirmPopUp(arguments[1], arguments[2], arguments[3]);			
			break;
			
			case "SET_ONE_PICK_ME_GAME":		// 888 specific pick me feature hack - tell the game that we only have 1 pick me game because the game assumes there will be 2 
				feature.apiSetOneGame();
			break;
			
			case "SET_PICK_ME_WIN_AMOUNT":		// 888 specific pick me feature hack - tell the game the winning amount, 1st argument is the win amount, and the second is 0 or 1 depending on 
												// whether it is the first or second prize.
				feature.apiSetPrize(arguments[1], arguments[2]);
			break;
			
			case "SET_MAX_AUTOPLAYS":
				game.maxAutoPlays = 5 * Math.floor(Number(arguments[1] / 5));	
				// round it down to nearest 5
			break;
			
			case "PLAY_SLOT":
				handlePlaySlotPopUp(arguments[1], arguments[2], arguments[3]);
			break;
			
			case "SHOW_CASHIER_BUTTON":
				if (typeof game.ui.setCashierVisibility !== "undefined")
				{
					game.ui.setCashierVisibility(paraValue);	
				}
			break;
			
			case "SHOW_HOME_BUTTON":
				if (typeof game.ui.setHomeVisibility !== "undefined")
				{
					game.ui.setHomeVisibility(paraValue);	
				}
			break;

			case "SHOW_CLOCK":
				if (arguments[1] == true) {
					game.clock.enabled = true;	
				} else {
					game.clock.enabled = false;	
				}
			break;

			
			case "HIDE_PORTRAIT_MODE":
				if (typeof game.showPortraitMode !== "undefined") 
				{
					game.showPortraitMode(paraValue);
				}
			break;

			case "SHOW_RTP":
				if (arguments[1] == true) {
					game.showRTP = true;	
				} else {
					game.showRTP = false;	
				}
			break;

			
			case "SET_CLIENT_PLATFORM":
				if (typeof game.setGameClientPlatform !== "undefined") 
				{
					if (arguments.length == 3) {
						game.setGameClientPlatform(arguments[1], arguments[2]);
					} else if (arguments.length == 2) {
						game.setGameClientPlatform(arguments[1]);
					}
				}
			break;
			
			case "ENABLE_ALL_UI":
				{
					if (arguments[1] == true) {
						game.enableAllUI(true);
					} else {
						game.enableAllUI(false);	
					}
				}
			break;
			
			case "SET_MUTE":
			{
				if (arguments[1] == true) {
					game.ui.setMute(true);
				} else {
					game.ui.setMute(false);
				}
			}
			break;

			case "PAUSE_AUTOPLAY":
			{
				if (arguments[1] == true) {
//					game.autoPlayTimerStore = game.autoPlayTimer;		// remember the current setting
//					game.autoPlayTimer 		= Number.MAX_VALUE;			// set it to a huge value
				} else {
//					game.autoPlayTimer 		= game.autoPlayTimerStore;	// un-pausing so set it back to the original before the pause. 
				}
			}
			break;
			
			default:
				return "";
			break;
		}
	}
};

function setBalance(balanceValue)
{
	if (game.gameState == SS_STOPPED || game.gameState == SS_WIN_PAYLINE) {
		game.account.setBalance(Number(balanceValue));	
	}
	
}

function handleServerError()
{
	if (typeof TXT_ERROR_CONNECTION_FAILED === 'undefined') {
		if (arguments.length == 1) {
			game.message.messageBox(TXT_ERROR, TXT_ERROR_DEFAULT, [game.message.BTN_OK], arguments[0]);
		} else {
			game.message.messageBox(TXT_ERROR, TXT_ERROR_DEFAULT, [game.message.BTN_OK], function(){});
		}
	} else {
		if (arguments.length == 1) {
			game.message.messageBox(TXT_ERROR, TXT_ERROR_CONNECTION_FAILED, [game.message.BTN_OK], arguments[0]);
		} else {
			game.message.messageBox(TXT_ERROR, TXT_ERROR_CONNECTION_FAILED, [game.message.BTN_OK], function(){});
		}
	}
	
}

function handlePopUp()
{
	if (arguments.length == 3) {
		game.message.messageBox(arguments[0], arguments[1], [game.message.BTN_OK], arguments[2]);
	} else if (arguments.length == 2) {
		game.message.messageBox(arguments[0], arguments[1], [game.message.BTN_OK], function(){});
	}
}

function handleConfirmPopUp(caption, content, callback)
{
	game.message.messageBox(caption, content, [game.message.BTN_NO, game.message.BTN_OK], function(){
		if (arguments[0] == game.message.BTN_OK) {
			callback();
		}
	});
}

function handlePlaySlotPopUp(caption, content, callback)
{
	game.message.messageBox(caption, content, [game.message.BTN_YES, game.message.BTN_NO], function(){
		if (arguments[0] == game.message.BTN_YES) {
			callback();
		}
	});
}


