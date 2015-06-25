// This class handles all the UI elements
function ui()
{
	this.layout     = new UILayout();		// layout

	this.disableAllUI = false;
	this.spinBtnAlpha = 0.6;
	this.AUTO_OFF 				= 0;
	this.AUTO_WAITING_TO_START 	= 1;
	this.AUTO_PLAYING 			= 2;
	this.AUTO_WAITING_TO_STOP 	= 3;

	this.AUDIO_DISABLED = 0;
	this.AUDIO_ON	    = 1;
	this.AUDIO_MUTED    = 2;

	this.state = 0; 				// 0 = button panel hidden, 1 = button panel displayed
	this.autoPlayMode = this.AUTO_OFF;	
	this.audioState   = this.AUDIO_ON;			
	
	this.insufficientFunds = false;
	this.disableHomeBtnMidRound = true;			// true by default - Changed my mind 4/9/13 moving forward this will be the default. QA can now set this during spins for debugging.
	this.showCashierBtn = false;
	
	this.winMeterShow = false;	// whether the win meter is shown or not.
	
	this.btnLineUp   = {};
	this.btnLineDown = {};
	this.btnBetUp   = {};
	this.btnBetDown = {};
	this.btnAutoUp   = {};
	this.btnAutoDown = {};

	this.btnMute = {};
	this.btnMuteOff = {};
	this.btnInfo = {};
	this.btnHelp = {};
	this.btnHome = {};
	this.btnSettings = {};
	this.btnClose = {};
	this.btnCashier = {};
	
	this.btnSpin = {};
	this.btnStartAutoPlay = {};
	this.btnStopAutoPlay = {};
	
	
	
	this.imgPanel = {};
	this.imgElements = {};

	this.inFreeRounds = false;
	this.lineSelection = true;
	
	this.setFreeRounds = function(freeRounds)
	{
		this.inFreeRounds = freeRounds;
		if(this.inFreeRounds) {
			this.btnLineUp.isDisabled = true;
			this.btnLineDown.isDisabled = true;
			this.btnBetUp.isDisabled = true;
			this.btnBetDown.isDisabled = true;
			this.btnAutoUp.isDisabled = true;
			this.btnAutoDown.isDisabled = true;
		} else {
			if(this.lineSelection) {		// for those games that don't let you change the number of paylines
				this.btnLineUp.isDisabled = false;
				this.btnLineDown.isDisabled = false;
			}
			this.btnBetUp.isDisabled = false;
			this.btnBetDown.isDisabled = false;
			this.btnAutoUp.isDisabled = false;
			this.btnAutoDown.isDisabled = false;
		}
	}

	this.initAssets = function()
	{
		var buttonsImg = game.ASSET_MANAGER.getAsset('buttons_ui.png');
		
		this.btnLineUp    = new Button(buttonsImg,this.layout.btnUp); 
		this.btnLineDown  = new Button(buttonsImg,this.layout.btnDown); 
		this.btnBetUp     = new Button(buttonsImg,this.layout.btnUp); 
		this.btnBetDown   = new Button(buttonsImg,this.layout.btnDown); 
		this.btnAutoUp    = new Button(buttonsImg,this.layout.btnUp); 
		this.btnAutoDown  = new Button(buttonsImg,this.layout.btnDown); 

		if(arguments.length > 0)		// if false is passed as a parameter then disable the line up and down buttons. If there is no parameter then enable them as normal.
		{
			if(Boolean(arguments[0]) == false)
			{
				this.btnLineUp.visible 		= false;
				this.btnLineDown.visible 	= false;
				this.btnLineUp.isDisabled 	= true;
				this.btnLineDown.isDisabled = true;
				this.lineSelection = false;			// need to remember this for when switching back from free rounds.
			}
		}

		this.btnMute 	  = new Button(buttonsImg,this.layout.btnMute); 
		this.btnMuteOff	  = new Button(buttonsImg,this.layout.btnMuteOff); 
		this.btnInfo 	  = new Button(buttonsImg,this.layout.btnInfo); 
		this.btnHome 	  = new Button(buttonsImg,this.layout.btnHome); 
		this.btnSettings  = new Button(buttonsImg,this.layout.btnSettings); 
		this.btnClose 	  = new Button(buttonsImg,this.layout.btnClose); 
		this.btnCashier   = new Button(buttonsImg,this.layout.btnCashier); 

		this.btnHome.hitPadding    = this.layout.hitPadding;
		this.btnSettings.hitPadding = this.layout.hitPadding;
		this.btnClose.hitPadding    = this.layout.hitPadding;
		this.btnCashier.hitPadding    = this.layout.hitPadding;

		this.btnSpin 	  = new Button(buttonsImg,this.layout.btnSpin); 
		this.btnStartAutoPlay 	  = new Button(buttonsImg,this.layout.btnStartAutoPlay); 
		this.btnStopAutoPlay 	  = new Button(buttonsImg,this.layout.btnStopAutoPlay); 
		
		this.imgPanel     = game.ASSET_MANAGER.getAsset('panel.png');
		this.imgElements  = game.ASSET_MANAGER.getAsset('elements.png');
		
		this.linesMeter 	 	= new Text();
		this.linesMeter.font 	= "45px arial";
		this.linesMeter.align   = "center";
		
		this.betMeter 			= new Text();
		this.betMeter.font  	= "40px arial";
		this.betMeter.align   	= "center";

		this.autoPlayMeter 	    = new Text();
		this.autoPlayMeter.font = "45px arial";
		this.autoPlayMeter.align   	= "center";
		
		this.autoPlayGamesRemainingMeter 		= new Text();
		this.autoPlayGamesRemainingMeter.font   = "45px arial";
		this.autoPlayGamesRemainingMeter.align  = "center";
		this.autoPlayGamesRemainingMeter.m_Color = '#000000';

		this.winMeter 		 = new Text();
		if (typeof WIN_METER_FONT === "undefined") {
			this.winMeter.font   = "48px arial";
		}
		else {
			this.winMeter.font = WIN_METER_FONT;
		}
		this.winMeter.align  = "center";
		this.winMeter.m_Text = "WIN: OOPS!";
		this.winMeter.m_Color = '#FFFF00';
		
		this.insufficientFundsTxt = new Text();
		this.insufficientFundsTxt.font   = "28px arial";
		this.insufficientFundsTxt.align  = "center";
		this.insufficientFundsTxt.m_Color = '#000000';
		if (typeof TXT_NOT_ENOUGH_BALANCE_WH_SETTING === 'undefined') {
			this.insufficientFundsTxt.m_Text = TXT_NOT_ENOUGH_BALANCE;
		} else {
			this.insufficientFundsTxt.m_Text = TXT_NOT_ENOUGH_BALANCE_WH_SETTING;
		}
	}

	this.changeOrientation = function(orient)
	{
		this.layout.orient(orient);
		
		this.btnLineUp.setPosition(this.layout.LINE_UP_BTN);
		this.btnLineDown.setPosition(this.layout.LINE_DOWN_BTN);
		this.btnBetUp.setPosition(this.layout.BET_UP_BTN);
		this.btnBetDown.setPosition(this.layout.BET_DOWN_BTN);
		this.btnAutoUp.setPosition(this.layout.AUTO_UP_BTN);
		this.btnAutoDown.setPosition(this.layout.AUTO_DOWN_BTN);
		this.btnMute.setPosition(this.layout.MUTE_BTN);
		this.btnMuteOff.setPosition(this.layout.MUTE_BTN);
		this.btnInfo.setPosition(this.layout.INFO_BTN);
		this.btnHome.setPosition(this.layout.HOME_BTN);
		this.btnSettings.setPosition(this.layout.SETTINGS_BTN);
		this.btnClose.setPosition(this.layout.CLOSE_BTN);
		this.btnCashier.setPosition(this.layout.CASHIER_BTN);
		
		if(this.state == 1)
		{
			this.positionPlayButtons(true);
		}
		else
		{
			this.positionPlayButtons(false);
		}
		
		this.linesMeter.setPosition(this.layout.LINES_METER);
		this.betMeter.setPosition(this.layout.BET_METER);
		this.autoPlayMeter.setPosition(this.layout.AUTOPLAY_METER);
		this.winMeter.setPosition(this.layout.WIN_METER);
		this.insufficientFundsTxt.setPosition(this.layout.INSUFFICIENT_FUNDS);

	}


	this.processClick = function(coords)
	{
		if(this.disableAllUI) {
			return;
		}

		if(this.btnHome.isOver(coords)) {		
			this.btnHome.isDown = true;
			return;
		}
		
		if(this.btnCashier.isOver(coords)) {		
			this.btnCashier.isDown = true;
			return;
		}
		
		if(this.state == 0)		// only these buttons work when the panel is hidden
		{
			switch(this.autoPlayMode)
			{
				case this.AUTO_OFF:
				if(this.btnSpin.isOver(coords)) {
					this.btnSpin.isDown = true;
					return;
				}
				break;
				
				case this.AUTO_WAITING_TO_START:
				if(this.btnStartAutoPlay.isOver(coords)) {
					this.btnStartAutoPlay.isDown = true;
					return;
				}
				break;
				
				case this.AUTO_PLAYING:
				if(this.btnStopAutoPlay.isOver(coords)) {
					this.btnStopAutoPlay.isDown = true;
					return;
				}
				break;
			}
			
			if(this.btnSettings.isOver(coords)) {
				this.btnSettings.isDown = true;
				return;
			}
		}

		if(this.state == 1)	// only these buttons work when the panel is shown
		{
			if(this.btnLineUp.isOver(coords)) {
				this.btnLineUp.isDown = true;
				return;
			}
			if(this.btnLineDown.isOver(coords)) {
				this.btnLineDown.isDown = true;
				return;
			}
			if(this.btnBetUp.isOver(coords)) {
				this.btnBetUp.isDown = true;
				return;
			}
			if(this.btnBetDown.isOver(coords)) {
				this.btnBetDown.isDown = true;
				return;
			}
			if(this.btnAutoUp.isOver(coords)) {
				this.btnAutoUp.isDown = true;
				return;
			}
			if(this.btnAutoDown.isOver(coords)) {
				this.btnAutoDown.isDown = true;
				return;
			}
			
			if(this.audioState == this.AUDIO_ON)
			{
				if(this.btnMute.isOver(coords)) {
					this.btnMute.isDown = true;
					return;
				}
			}
			else if(this.audioState == this.AUDIO_MUTED)
			{
				if(this.btnMuteOff.isOver(coords)) {
					this.btnMuteOff.isDown = true;
					return;
				}
			}
			if(this.btnInfo.isOver(coords)) {
				this.btnInfo.isDown = true;
				return;
			}
			if(this.btnClose.isOver(coords)) {
				this.btnClose.isDown = true;
				return;
			}
			
			
			switch(this.autoPlayMode)
			{
				case this.AUTO_OFF:
				if(this.btnSpin.isOver(coords)) {
					this.btnSpin.isDown = true;
					return;
				}
				break;
				
				case this.AUTO_WAITING_TO_START:
				if(this.btnStartAutoPlay.isOver(coords)) {
					this.btnStartAutoPlay.isDown = true;
					return;
				}
				break;
				
				case this.AUTO_PLAYING:
				if(this.btnStopAutoPlay.isOver(coords)) {
					this.btnStopAutoPlay.isDown = true;
					return;
				}
				break;
			}
		}
		
		
	}

	// update position of buttons	
	this.positionPlayButtons = function(onPanel)
	{
		if(onPanel) {		// show the buttons here on the panel
			this.btnSpin.setPosition(this.layout.SPIN2_BTN); 
			this.btnStartAutoPlay.setPosition(this.layout.START_AUTOPLAY2_BTN); 
			this.btnStopAutoPlay.setPosition(this.layout.STOP_AUTOPLAY2_BTN); 
			this.autoPlayGamesRemainingMeter.setPosition(this.layout.GAMES_REMAINING2_METER);
		}
		else {		// show the buttons here on the main screen
			this.btnSpin.setPosition(this.layout.SPIN_BTN); 
			this.btnStartAutoPlay.setPosition(this.layout.START_AUTOPLAY_BTN); 
			this.btnStopAutoPlay.setPosition(this.layout.STOP_AUTOPLAY_BTN); 
			this.autoPlayGamesRemainingMeter.setPosition(this.layout.GAMES_REMAINING_METER);
		}
	}
	
	
	this.refreshPlayButton = function()
	{
		var numGames = game.uapi_getAutoPlayGames();
		if( numGames > 0)
		{
			this.autoPlayMode = this.AUTO_WAITING_TO_START;
		}
		else
		{
			this.autoPlayMode = this.AUTO_OFF;
		}
		this.setMeterText("autoGame",numGames);
	}
	
	this.processClickRelease = function(coords,evt)
	{
		if(this.disableAllUI) {
			return;
		}

		if(this.btnHome.isOver(coords) && this.btnHome.isDown) 	{
			game.uapi_home();
			evt.preventDefault();
			return;
		}
		
		if(this.btnCashier.isOver(coords) && this.btnCashier.isDown) 	{
			game.uapi_cashier();
			evt.preventDefault();
			return;
		}
		
		if(this.state == 0)		// only these buttons work when the panel is hidden
		{
			switch(this.autoPlayMode)
			{
				case this.AUTO_OFF:
				if(this.btnSpin.isOver(coords) && this.btnSpin.isDown) 	{
					game.uapi_play();
					return;
				}
				break;
				
				case this.AUTO_WAITING_TO_START:
				if(this.btnStartAutoPlay.isOver(coords) && this.btnStartAutoPlay.isDown) 	{
					game.uapi_startAutoplay();
					this.btnStopAutoPlay.isDisabled = false;
					return;
				}
				break;
				
				case this.AUTO_PLAYING:
				if(this.btnStopAutoPlay.isOver(coords) && this.btnStopAutoPlay.isDown) 	{
					game.uapi_stopAutoplay();
					this.btnStopAutoPlay.isDisabled = true;
					return;
				}
				break;
				
			}
			
			if(this.btnSettings.isOver(coords) && this.btnSettings.isDown) 	{
				this.state = 1;
				game.uapi_openPanel();
				this.positionPlayButtons(true);
				return;
			}
			
		}
		
		if(this.state == 1)	// only these buttons work when the panel is shown
		{
			if(this.btnLineUp.isOver(coords) && this.btnLineUp.isDown) 	{
				game.uapi_lineUp(true);
				return;
			}
			if(this.btnLineDown.isOver(coords) && this.btnLineDown.isDown) 	{
				game.uapi_lineDown(true);
				return;
			}
			if(this.btnBetUp.isOver(coords) && this.btnBetUp.isDown) 	{
				game.uapi_betUp(true);
				return;
			}
			if(this.btnBetDown.isOver(coords) && this.btnBetDown.isDown) 	{
				game.uapi_betDown(true);
				return;
			}
			
			if(this.btnAutoUp.isOver(coords) && this.btnAutoUp.isDown) 	{
				game.uapi_autoplayUp(true);
				this.refreshPlayButton();
				return;
			}
			
			if(this.btnAutoDown.isOver(coords) && this.btnAutoDown.isDown) 	{
				game.uapi_autoplayDown(true);
				this.refreshPlayButton();
				return;
			}
			
			if(this.audioState == this.AUDIO_ON)
			{
				if(this.btnMute.isOver(coords) && this.btnMute.isDown) 	{
					this.audioState = this.AUDIO_MUTED;
					game.uapi_mute(true);
					return;
				}
			}
			else if(this.audioState == this.AUDIO_MUTED)
			{
				if(this.btnMuteOff.isOver(coords) && this.btnMuteOff.isDown) 	{
					this.audioState = this.AUDIO_ON;
					game.uapi_mute(false);
					return;
				}
			}
			if(this.btnInfo.isOver(coords) && this.btnInfo.isDown) 	{
				game.uapi_info(0);
				return;
			}
			
			if(this.btnClose.isOver(coords) && this.btnClose.isDown) 	{
				this.state = 0;
				game.uapi_closePanel(true);
				this.positionPlayButtons(false);
				return;
			}
			
			// Play button on the Panel			
			switch(this.autoPlayMode)
			{
				case this.AUTO_OFF:
				if(this.btnSpin.isOver(coords) && this.btnSpin.isDown) 	{
					this.state = 0;
					game.uapi_closePanel(false);
					this.positionPlayButtons(false);
					game.uapi_play();
					return;
				}
				break;
				
				case this.AUTO_WAITING_TO_START:
				if(this.btnStartAutoPlay.isOver(coords) && this.btnStartAutoPlay.isDown) 	{
					this.state = 0;
					game.uapi_closePanel(false);
					this.positionPlayButtons(false);
					game.uapi_startAutoplay();
					this.btnStopAutoPlay.isDisabled = false;
					return;
				}
				break;
				
				case this.AUTO_PLAYING:
				if(this.btnStopAutoPlay.isOver(coords) && this.btnStopAutoPlay.isDown) 	{
					game.uapi_stopAutoplay();
					this.btnStopAutoPlay.isDisabled = true;
					return;
				}
				break;
				
			}
		}
		
	}
	
	this.buttonsUp = function()
	{
		this.btnSpin.isDown = false;
		this.btnStartAutoPlay.isDown = false;
		this.btnStopAutoPlay.isDown = false;
		this.btnLineUp.isDown = false;
		this.btnLineDown.isDown = false;
		this.btnBetUp.isDown = false;
		this.btnBetDown.isDown = false;
		this.btnAutoUp.isDown = false;
		this.btnAutoDown.isDown = false;
		this.btnMute.isDown = false;
		this.btnMuteOff.isDown = false;
		this.btnInfo.isDown = false;
		this.btnHome.isDown = false;
		this.btnSettings.isDown = false;
		this.btnClose.isDown = false;
		this.btnCashier.isDown = false;
	}
	
	this.setMeterText = function(meterId, text)
	{
		switch(meterId)
		{
			case "lines": this.linesMeter.m_Text = text; break;
			case "bet": this.betMeter.m_Text = text; break;
			case "autoplay": this.autoPlayMeter.m_Text = text; break;
			case "autoGame": this.autoPlayGamesRemainingMeter.m_Text = text; break;
			case "win" : this.winMeter.m_Text = text; break;
		}
	}
	
	this.enable = function(canBet)
	{
		if(canBet) 											// if can bet
		{
			this.btnSpin.isDisabled = false;		
			this.btnStartAutoPlay.isDisabled = false;	
			this.btnStopAutoPlay.isDisabled = false;	
		}
		else																// can't bet
		{
			//this.message.messageBox("Warning", "No enough balance.", [message.BTN_YES], "");
			this.btnSpin.isDisabled = true;		
			this.btnStartAutoPlay.isDisabled = true;		
		}
		this.btnSettings.isDisabled = false;									// turn on all buttons
		if (this.disableHomeBtnMidRound) {
			this.btnHome.isDisabled = false;
		}
		if (this.showCashierBtn) {
			this.btnCashier.isDisabled = false;
		} else {
			this.btnCashier.isDisabled = true;
		}
	}
	
	this.disable = function()
	{
		this.btnSpin.isDisabled = true;	
		this.btnSettings.isDisabled = true;									// turn on all buttons
		if (this.disableHomeBtnMidRound) {
			this.btnHome.isDisabled = true;
		}
		if (this.showCashierBtn) {
			this.btnCashier.isDisabled = true;
		}
		
//			this.btnLine.isDisabled = true;		
//			this.btnBet.isDisabled = true;		
//			this.btnAutoPlay.isDisabled = true;
//			this.btnRules.isDisabled = true;		
//			this.btnMenu.isDisabled = true;
	}
	
	this.draw = function()
	{
		
		if(this.disableAllUI) {
			return;
		}
		
		
		switch(this.state)
		{
			case 0:
				if(!this.btnSettings.isDisabled)
				{
					this.btnSettings.draw();
				}
				
			    var oldAlpha = ctx.globalAlpha;

				ctx.globalAlpha = this.spinBtnAlpha;
				switch(this.autoPlayMode)
				{
					case this.AUTO_OFF:		// No autoplay
					if(!this.btnSpin.isDisabled)  // TODO: Show disabled state for play button when there is insufficient funds
					{
						this.btnSpin.draw();
					}
					break;
					
					case this.AUTO_WAITING_TO_START:		// Waiting to start autoplay
					this.btnStartAutoPlay.draw();
					this.autoPlayGamesRemainingMeter.draw(ctx);
					break;
					
					case this.AUTO_PLAYING:		// In autoplay mode
					if(game.uapi_getAutoPlayGames() > 0)										// If number of autoplay games left to play is 0 then hide the button. Bug 22283 - GK 290513
					{
						this.btnStopAutoPlay.draw();
						this.autoPlayGamesRemainingMeter.draw(ctx);
					}
					break;
					
					case this.AUTO_WAITING_TO_STOP:		// In autoplay mode after the stop button was pressed
//					this.btnStopAutoPlay.draw();					// Turned off disabled autoplay stop button due to bug: 22085 - GK 080413
//					this.autoPlayGamesRemainingMeter.draw(ctx);
					break;
				}
			   ctx.globalAlpha = oldAlpha;

				if(this.winMeterShow)
				{
					var oldAlpha = ctx.globalAlpha;
					ctx.globalAlpha = 0.8;
					ctx.drawImage(this.imgElements, 0, 0, 568, 72, this.layout.WIN_METER_BG.x, this.layout.WIN_METER_BG.y, this.layout.WIN_METER_BG.w, this.layout.WIN_METER_BG.h);
					ctx.globalAlpha = oldAlpha;
					this.winMeter.draw(ctx);
				}
			break;
			
			case 1:
				ctx.drawImage(this.imgPanel, this.layout.PANEL.x, this.layout.PANEL.y);
				
				ctx.drawImage(this.imgElements, this.layout.defaultSubPanel.x, this.layout.defaultSubPanel.y, this.layout.defaultSubPanel.w, this.layout.defaultSubPanel.h, 
								this.layout.defaultSubPanelLeftPos.x, this.layout.defaultSubPanelLeftPos.y, this.layout.defaultSubPanel.w, this.layout.defaultSubPanel.h);	
								
				ctx.drawImage(this.imgElements, this.layout.defaultSubPanel.x, this.layout.defaultSubPanel.y, this.layout.defaultSubPanel.w, this.layout.defaultSubPanel.h, 
								this.layout.defaultSubPanelMidPos.x, this.layout.defaultSubPanelMidPos.y, this.layout.defaultSubPanel.w, this.layout.defaultSubPanel.h);	
								
				ctx.drawImage(this.imgElements, this.layout.defaultSubPanel.x, this.layout.defaultSubPanel.y, this.layout.defaultSubPanel.w, this.layout.defaultSubPanel.h, 
								this.layout.defaultSubPanelRightPos.x, this.layout.defaultSubPanelRightPos.y, this.layout.defaultSubPanel.w, this.layout.defaultSubPanel.h);	
				
				ctx.drawImage(this.imgElements, this.layout.defaultAutoplayIcon.x, this.layout.defaultAutoplayIcon.y,  this.layout.defaultAutoplayIcon.w, this.layout.defaultAutoplayIcon.h, 
							  this.layout.defaultAutoplayIconPos.x, this.layout.defaultAutoplayIconPos.y, this.layout.defaultAutoplayIcon.w, this.layout.defaultAutoplayIcon.h);	// autoplay
		
				ctx.drawImage(this.imgElements, this.layout.defaultLinesIcon.x, this.layout.defaultLinesIcon.y,  this.layout.defaultLinesIcon.w, this.layout.defaultLinesIcon.h, 
							  this.layout.defaultLinesIconPos.x, this.layout.defaultLinesIconPos.y, this.layout.defaultLinesIcon.w, this.layout.defaultLinesIcon.h);	// autoplay
		
				ctx.drawImage(this.imgElements, this.layout.defaultBetIcon.x, this.layout.defaultBetIcon.y,  this.layout.defaultBetIcon.w, this.layout.defaultBetIcon.h, 
							  this.layout.defaultBetIconPos.x, this.layout.defaultBetIconPos.y, this.layout.defaultBetIcon.w, this.layout.defaultBetIcon.h);	// autoplay
				
				if(	this.insufficientFunds )
				{
					this.insufficientFundsTxt.draw(ctx);
					this.linesMeter.m_Color    = '#666666';
					this.betMeter.m_Color 	   = '#666666';
					this.autoPlayMeter.m_Color = '#666666';
				}
				else
				{
//					ctx.drawImage(this.imgElements, 281, 340, 76, 66, 427 + this.layout.PANEL.x, 452 + this.layout.PANEL.y, 76, 66);	// NGG logo		Don't draw the logo anymore
					this.linesMeter.m_Color    = '#FFFFFF';
					this.betMeter.m_Color 	   = '#FFFFFF';
					this.autoPlayMeter.m_Color = '#FFFFFF';
				}
				if(this.btnLineUp.visible) {
					this.btnLineUp.draw();
				}
				if(this.btnLineDown.visible) {
					this.btnLineDown.draw();
				}
				this.btnBetUp.draw();
				this.btnBetDown.draw();
				this.btnAutoUp.draw();
				this.btnAutoDown.draw();
				
				//Overwriten by building script for WH, this will hide the mute button for WH
				var hideMuteBtnWH = false;
				
				switch(this.audioState)
				{
					case this.AUDIO_DISABLED:
						if (!hideMuteBtnWH) {
							this.btnMuteOff.draw();
						}
					break;
					
					case this.AUDIO_ON:
						this.btnMute.draw();
					break;
					
					case this.AUDIO_MUTED:
						this.btnMuteOff.draw();
					break;
				}
				
				this.btnInfo.draw();
				this.btnClose.draw();
				
				this.linesMeter.draw(ctx);
				this.betMeter.draw(ctx);
				this.autoPlayMeter.draw(ctx);
				
				
				switch(this.autoPlayMode)
				{
					case this.AUTO_OFF:		// No autoplay
					this.btnSpin.draw();
					break;
					
					case this.AUTO_WAITING_TO_START:		// Waiting to start autoplay
					this.btnStartAutoPlay.draw();
					this.autoPlayGamesRemainingMeter.draw(ctx);
					break;
					
					case this.AUTO_PLAYING:		// In autoplay mode
					this.btnStopAutoPlay.draw();
					this.autoPlayGamesRemainingMeter.draw(ctx);
					break;
					
					case this.AUTO_WAITING_TO_STOP:		// In autoplay mode after the stop button was pressed
					this.btnStopAutoPlay.draw();
					this.autoPlayGamesRemainingMeter.draw(ctx);
					break;
				}
				
			break;
		}
		
		if (!this.disableHomeBtnMidRound) {
			this.btnHome.draw();
		} else if (!this.btnHome.isDisabled) {
			this.btnHome.draw();
		}
		if (this.showCashierBtn && !this.btnCashier.isDisabled) {
			this.btnCashier.draw();
		}
	}
	
	// this function is called once the user decided to use the audio or not
	// if the user chose no to audio then we permanently disable the mute/normal functionality
	this.enableAudio = function(state)
	{
		if(state)
		{
			this.audioState = this.AUDIO_ON;
			this.btnMute.isDisabled    = false;
			this.btnMuteOff.isDisabled = false;
		}
		else
		{
			this.audioState = this.AUDIO_DISABLED;
			this.btnMute.isDisabled    = true;
			this.btnMuteOff.isDisabled = true;
		}
	}
	
	// Allows us to mute the sound externally
	this.setMute = function(mute)
	{
		if(this.audioState != this.AUDIO_DISABLED) {
			if(mute) {
				this.audioState = this.AUDIO_MUTED;
			} else {
				this.audioState = this.AUDIO_ON;
			}
			game.uapi_mute(mute);
		} else {
			game.uapi_mute(true);	// Audio is disabled so we always return muted
		}
	}
	
	// tells the UI to display the large WIN meter
	this.showWinMeter = function(state)
	{
		this.winMeterShow = state;
	}
	
	// Disables all UI with the exception of the home button. This is used in the History mode
	this.disableUI = function(state)
	{
		this.disableAllUI = state;
	}
	
	// Set home button switch function
	this.setHomeBtnMidRoundState = function(state)
	{
		this.disableHomeBtnMidRound = state;
	}
	
	//Show or hide Cashier controller. Set bool to true to show and false to hide 
	this.setCashierVisibility = function(bool)
	{
		this.showCashierBtn = bool;
	}
	
};