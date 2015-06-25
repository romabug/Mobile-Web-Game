//This class represents the promotional rounds that can be offered by a casino to a player

function FreeRounds()
{
	this.inFreeRounds 	 = false;		// whether free rounds is active or not
	this.betPerLine   	 = 0;			// the bet per line to use during free rounds
	this.linesBet     	 = 0;			// the number of lines to use during free rounds
	this.totalWin	  	 = 0;			// total accumulated win during free rounds
	this.roundsRemaining = 0;			// number of rounds remaining
	this.totalRounds  	 = 0;			// total number of rounds initially awarded
	this.showError		 = false;
	
	this.askYesNo		 = false;		// should the game ask the player to play free rounds or not.
	
	this.defaultBetPerLine    = 0;		// these are stored until the end of the free rounds so we can revert back to the defaults
	this.defaultLinesSelected = 0;
	
	this.roundNumberMeter 			= new Text();
	this.roundNumberMeter.font   	= "24px arial";
	this.roundNumberMeter.align  	= "left";
	this.roundNumberMeter.m_Color 	= '#ffffff';
	this.roundNumberMeter.m_Text  	= "";

	this.totalWinMeter 				= new Text();
	this.totalWinMeter.font   		= "24px arial";
	this.totalWinMeter.align  		= "left";
	this.totalWinMeter.m_Color 		= '#ffffff';
	this.totalWinMeter.m_Text  		= "";

	this.backSize = {x:0,y:0,w:960,h:30}; 
	
	this.requestOutro = false;		// set it to true when it is known that the outro should be shown when its time
	
	this.txtIntro      = ""; 
	this.txtOutroStart = ""; 
	this.txtOutroEnd   = ""; 
	this.txtError	   = ""; 
	this.txtDialogTite = ""; 
	this.txtWinMeterLabel = ""; 
	this.txtRoundNumberMeterLabel = ""; 
	this.gradient = {};
	
	// parses the string and inserts the parameter where it is needed.
	this.insertParam = function(str,parameter)
	{
		var pos = str.indexOf('%');
		var temp = "";
		if(pos != -1) {
			temp = str.slice(0,pos) + parameter + str.slice(pos+2);
			return temp;
		} else {	// parameter location not found so just return the string
			return str;
		}
	}

	this.insert2Param = function(str,parameter1,parameter2)
	{
		var pos = str.indexOf('%1');
		var temp = "";
		if(pos != -1) {
			temp = str.slice(0,pos) + parameter1 + str.slice(pos+2);
			pos = temp.indexOf('%2');
			var temp2 = "";
			if(pos != -1) {
				temp2 = temp.slice(0,pos) + parameter2 + temp.slice(pos+2);
				return temp2;
			} else {	// parameter location not found so just return the string
				return temp;
			}
		} else {	// parameter location not found so just return the string
			return str;
		}
	}

	
	this.init = function()
	{
		this.defaultLinesSelected = game.account.NUM_PAYLINES;		// remember the number of lines selected by default
		
		//Look up translations if they exist, if not use the following generic English strings
		this.txtIntro  = (typeof TXT_FR_INTRO === "undefined")? "Congratulations! <br> You have %1 Free Rounds.":TXT_FR_INTRO;
		this.txtIntroOne = (typeof TXT_FR_INTRO_ONE === "undefined")? "Congratulations! <br> You have %1 Free Round.":TXT_FR_INTRO_ONE;
		this.txtIntroGoodLuck = (typeof TXT_FR_INTRO_GOOD_LUCK === "undefined")? "<br>Good Luck!":TXT_FR_INTRO_GOOD_LUCK;
		this.txtIntroYesNoQuestion = (typeof TXT_FR_YES_NO_QUESTION === "undefined")? "<br>Play Free Rounds Now?":TXT_FR_YES_NO_QUESTION;
		this.txtOutroStart = (typeof TXT_FR_OUTRO_START === "undefined")?"Congratulations! <br> You have won %1 in Free Rounds.<br>":TXT_FR_OUTRO_START;  // shown only if you have won something
		this.txtOutroEnd   = (typeof TXT_FR_OUTRO_END === "undefined")?"Free rounds has now ended. <br> Funds will now be used from your account. <br> Your bet amount will now be reset <br> back to the default.":TXT_FR_OUTRO_END;
		this.txtError	   = (typeof TXT_FR_ERROR === "undefined")?"You were awarded Free Rounds, <br> but an error has occurred. <br> Please contact the Casino.":TXT_FR_ERROR;
		this.txtDialogTitle = (typeof TXT_FR_TITLE === "undefined")?"Free Rounds":TXT_FR_TITLE;
		this.txtWinMeterLabel = (typeof TXT_FR_WIN_METER_LABEL === "undefined")?"Total Free Rounds Win: ":TXT_FR_WIN_METER_LABEL;
		this.txtRoundNumberMeterLabel = (typeof TXT_FR_ROUND_NUMBER_METER_LABEL === "undefined")?"Free Rounds Remaining: %1":TXT_FR_ROUND_NUMBER_METER_LABEL;
//		this.txtRoundNumberMeterLabel = (typeof TXT_FR_ROUND_NUMBER_METER_LABEL === "undefined")?"Free Round: %1 of %2":TXT_FR_ROUND_NUMBER_METER_LABEL;

		this.roundNumberMeter.font   	= (typeof FREE_ROUND_METER_FONT_SIZE === "undefined")? "24px arial":FREE_ROUND_METER_FONT_SIZE;
		this.totalWinMeter.font   		= (typeof FREE_ROUND_METER_FONT_SIZE === "undefined")? "24px arial":FREE_ROUND_METER_FONT_SIZE;

		ctx.save();
		ctx.lineJoin="round";
		ctx.textAlign = this.roundNumberMeter.align;
		ctx.font = this.roundNumberMeter.font;
//		var txtWidth = ctx.measureText(this.insert2Param(this.txtRoundNumberMeterLabel, 999, 999)).width;
		var txtWidth = ctx.measureText(this.insertParam(this.txtRoundNumberMeterLabel, 999)).width;
		ctx.restore();

		this.roundNumberMeter.setPosition( {x:960 - txtWidth - 20,y: 568+24} );
		this.totalWinMeter.setPosition({x:50,y: 568 + 24} );
		this.backSize = {x:0,y:568,w:960,h:32};
		
		this.updateTotalWin();
//		this.roundNumberMeter.m_Text  = this.insert2Param(this.txtRoundNumberMeterLabel, (Number(this.totalRounds)-Number(this.roundsRemaining)),this.totalRounds);
		this.roundNumberMeter.m_Text  = this.insertParam(this.txtRoundNumberMeterLabel, Number(this.roundsRemaining));
		if(this.showError) {
			this.errorDlg();
			this.showError = false;
		}
		
		this.gradient = ctx.createLinearGradient(0, 568, 0, 568+32);
		this.gradient.addColorStop(0,'rgb(145,135,100)');
		this.gradient.addColorStop(0.5,'rgb(129,117,85)');
		this.gradient.addColorStop(1,'rgb(82,73,48)');

		this.gradientEnd = ctx.createLinearGradient(0, 568, 0, 568+32);
		this.gradientEnd.addColorStop(0,'rgb(249,246,146)');
		this.gradientEnd.addColorStop(0.5,'rgb(248,207,43)');
		this.gradientEnd.addColorStop(1,'rgb(121,37,20)');
		
	}
	
	// these are stored until the end of the free rounds so we can revert back to the defaults - called from recovery
	this.setDefaults = function(betPerLine, linesBet)
	{
		this.defaultBetPerLine    = betPerLine;		
		this.defaultLinesSelected = game.account.NUM_PAYLINES;
	}
	
	this.updateTotalWin = function()
	{
		if(this.inFreeRounds) { 
			this.totalWinMeter.m_Text = this.txtWinMeterLabel + game.account.getCurrencyString(this.totalWin);
		}
	}
	
	this.processMsg = function(pairs)
	{
		for(var i=0;i < pairs.length; i++)
		{
			var pair = pairs[i].split("=");
	
			switch(pair[0])
			{
				case "IFR":	
					this.inFreeRounds = Number(pair[1]) == 1;
//					console.log("IFR");
				break;
				
				case "FRBPL":
					this.betPerLine = Number(pair[1]);
					game.account.setBetPerLine(this.betPerLine);
				break;

				case "FRTW":
					this.totalWin = Number(pair[1]);
				break;

				case "FRR":
					this.roundsRemaining = Number(pair[1]);
//					this.roundNumberMeter.m_Text  = this.insert2Param(this.txtRoundNumberMeterLabel, (Number(this.totalRounds)-Number(this.roundsRemaining)),this.totalRounds);
					this.roundNumberMeter.m_Text  = this.insertParam(this.txtRoundNumberMeterLabel, Number(this.roundsRemaining));
				break;

				case "FRC":
					this.askYesNo = true;
				break;

				case "FRTR":
					this.totalRounds = Number(pair[1]);
				break;

				case "DB":		
					// in H5 we remember the default bet from the init message.
				break;
				
				case "LFR":
					if(this.roundsRemaining == 0) {
						this.requestOutro = true;
						game.ui.disableUI(true);		//This prevents the player from hitting the spin button before the Free Round summary is displayed.
					}
				break;

				case "FRABM":
					game.api_SetFreeRoundAnteBet(Number(pair[1]));  // What to set the free round ante bet to.
				break;
				
				case "BDD":
					this.defaultBetPerLine = Number(pair[1]);  //store this value for resetting later to default
				break;
				
				case "FRE":
					this.showError = true;		// show the error once we have the language loaded.
				break;
			}
		}
	};
	
	this.draw = function()
	{
		//draw the meters on top of the game
		if(this.inFreeRounds) {
			ctx.beginPath();
			ctx.rect(this.backSize.x, this.backSize.y, this.backSize.w, this.backSize.h);
			ctx.fillStyle = this.gradient; //'black';
			ctx.fill();			

			ctx.fillStyle = this.gradientEnd; //'black';
			ctx.beginPath();
			ctx.rect(this.backSize.x, this.backSize.y, 10, this.backSize.h);
			ctx.fill();			
			ctx.beginPath();
			ctx.rect(this.backSize.x+this.backSize.w-10, this.backSize.y, 10, this.backSize.h);
			ctx.fill();			

			this.roundNumberMeter.draw(ctx);
			this.totalWinMeter.draw(ctx);
		}
	}

	this.intro = function(recoverCallback)
	{
		if(typeof(game.ui.setFreeRounds) === "function") { 
			game.ui.setFreeRounds(this.inFreeRounds);		//tell the UI that we are in free rounds to disable some of the buttons.
		}

		if(this.inFreeRounds) {
			game.api_EnableFreeRoundAnteBet(true);		//disable super bet / ante bet UI
			var str = this.insertParam(this.roundsRemaining==1?this.txtIntroOne:this.txtIntro,this.roundsRemaining);
			
			if(this.askYesNo) {
				str += this.txtIntroYesNoQuestion;
			} else {
				str += this.txtIntroGoodLuck;
			}
			
			if(this.roundsRemaining==0) {
				recoverCallback();
			} else {
				if(this.askYesNo) {
					game.message.messageBox(this.txtDialogTitle, 
											str, 
											[game.message.BTN_YES,game.message.BTN_NO], 
											function(buttonID) {
												if(buttonID == game.message.BTN_YES) {		// Yes button pressed
													// do nothing and we play as normal in free rounds
												} else {									// No button pressed
													// we must enable everything and go back to normal non-free round game.
													game.account.setBetPerLine(game.freeRounds.defaultBetPerLine);				// reset to default bet
													game.account.paylinesSelected = game.freeRounds.defaultLinesSelected;		// reset to default bet
													if(typeof(game.ui.setFreeRounds) === "function") { 
														game.ui.setFreeRounds(false);
													}
													game.freeRounds.inFreeRounds = false;		// drop out of free rounds
													game.freeRounds.requestOutro = false;
													game.api_EnableFreeRoundAnteBet(false);
													game.checkLowBalance();
													game.changeOrientation(0);			// Used to rescale the game back to normal after free rounds. 
													// Send message to server to let it know that we have chosen NO on the "play free round" question. 
													windowObj.sendMsgToServer("&MSGID=FRREJECTED&");
												}
												game.message.SetFormat(false); 
												recoverCallback(); 
											});
					this.askYesNo = false;
				} else {
					game.message.messageBox(this.txtDialogTitle, str, [game.message.BTN_OK], function() {game.message.SetFormat(false); recoverCallback(); });
				}
				game.message.SetFormat(true);	
			}
		} else {
			recoverCallback();
		}
	}
	
	this.outro = function()
	{
		if(this.requestOutro) { // && !game.freeGames.m_bInFreeGames) {
			var str = "";
			
			if(this.totalWin > 0) {		// Add some text about your winnings. If you don't win, don't say anything about that. 
				str += this.insertParam(this.txtOutroStart, game.account.getCurrencyString(this.totalWin));
			}
			
			str += this.txtOutroEnd;
			game.message.messageBox(this.txtDialogTitle, 
									str, 
									[game.message.BTN_OK], 
									function() {		// Do all of the following after the OK button is pressed. 
										game.message.SetFormat(false); 
										game.freeRounds.requestOutro = false;

										game.freeRounds.inFreeRounds = false;		// drop out of free rounds
										game.account.setBetPerLine(game.freeRounds.defaultBetPerLine);				// reset to default bet
										game.account.paylinesSelected = game.freeRounds.defaultLinesSelected;		// reset to default bet
										if(typeof(game.ui.setFreeRounds) === "function") { 
											game.ui.setFreeRounds(false);
										}
										game.api_EnableFreeRoundAnteBet(false);
										game.changeOrientation(0);			// Used to rescale the game back to normal after free rounds. 
										game.checkLowBalance(); 
									});
			game.message.SetFormat(true);	//TODO: Set correct format for free rounds
		}
	}
	
	this.errorDlg = function()
	{
		game.message.messageBox("Error", this.txtError, [game.message.BTN_OK], function() {game.message.SetFormat(false); });
		game.message.SetFormat(true);	
	}
}
