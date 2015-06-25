// This class handles all the UI elements
function ui(config)
{
	this.disableAllUI = false;
	this.way243 = config.way243;				// tells the UI to use 243 way functionality
	this.extraBet = config.extraBet;	// ante bet
	
	this.layout     = new UILayout(config);		// layout

	this.AUTO_OFF 				= 0;
	this.AUTO_WAITING_TO_START 	= 1;
	this.AUTO_PLAYING 			= 2;
	this.AUTO_WAITING_TO_STOP 	= 3;

	this.AUDIO_DISABLED = 0;
	this.AUDIO_ON	    = 1;
	this.AUDIO_MUTED    = 2;
    
    this.SPIN_BTN_ALPHA_MIN = 0.4;  // cycle from
    this.SPIN_BTN_ALPHA_MAX = 1.2;    // cycle to
    this.SPIN_BTN_ALPHA_MIN_SHOW = 0.4; // alpha can't be smaller tan this
    this.SPIN_BTN_ALPHA_MAX_SHOW = 1; // alpha can't be bigger tan this
    this.SPIN_BTN_ALPHA_DELTA_PLUS = 0.02;
    this.SPIN_BTN_ALPHA_DELTA_MINUS = -0.01;

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
	this.btnSpinGlow = {};
	this.btnStartAutoPlay = {};
	this.btnStopAutoPlay = {};
	
	this.btnGamble = {};
	
    this.btnAnteChoice = {};

	this.imgPanel = {};
	this.imgElements = {};

    this.spinBtnAlpha = this.SPIN_BTN_ALPHA_MAX;
    this.spinBtnAlphaDelta = this.SPIN_BTN_ALPHA_DELTA_MINUS ;

	this.initAssets = function()
	{
        if(typeof game.uapi_showSpinBtnOnSettingsPanel === "undefined") {
            game.uapi_showSpinBtnOnSettingsPanel = function(){return false};
        }
		var buttonsImg = game.ASSET_MANAGER.getAsset(buttons_ui);
		
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
				this.btnLineUp.isDisabled   = true;
				this.btnLineDown.isDisabled = true;
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
		this.btnSpinGlow 	  = game.ASSET_MANAGER.getAsset('btnsGlow.png');
		this.btnStartAutoPlay 	  = new Button(buttonsImg,this.layout.btnStartAutoPlay); 
		this.btnStopAutoPlay 	  = new Button(buttonsImg,this.layout.btnStopAutoPlay); 
		
		this.btnGamble 	  = new Button(buttonsImg,this.layout.btnGamble); 

        if(this.extraBet)
        {
            this.btnAnteChoice = new Button( game.ASSET_MANAGER.getAsset('antebetspinbtn.png'),this.layout.btnAnteChoice); 
            this.btnAnteChoice.canClick = true;
        }
		
		this.imgPanel     = game.ASSET_MANAGER.getAsset('game-settings.jpg');
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
		// this.autoPlayGamesRemainingMeter.font   = "45px arial";
		this.autoPlayGamesRemainingMeter.font   = "30px arial";
		this.autoPlayGamesRemainingMeter.align  = "center";
		this.autoPlayGamesRemainingMeter.m_Color = '#000000';
		
        if(this.extraBet)
        {
            this.playExtra1 = new Text();
            this.playExtra1.font = "22px arial";
            this.playExtra1.align = "center";
            this.playExtra1.m_Color = '#FFFFFF';
            this.playExtra1.m_Text = TXT_PLAY_EXTRA_1;
            
            this.playExtra2 = new Text();
            this.playExtra2.font = "22px arial";
            this.playExtra2.align = "center";
            this.playExtra2.m_Color = '#FFFFFF';
            this.playExtra2.m_Text = TXT_PLAY_EXTRA_2;
        }

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
		this.insufficientFundsTxt.m_Text = TXT_NOT_ENOUGH_BALANCE;
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
        if(this.extraBet)
            this.btnAnteChoice.setPosition(this.layout.ANTE_CHOICE_BTN);
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
		
        if(this.extraBet)
        {
            this.playExtra1.setPosition(this.layout.PLAY_EXTRA_1);
            this.playExtra2.setPosition(this.layout.PLAY_EXTRA_2);
        }
	}


	this.processClick = function(coords)
	{
		if(this.disableAllUI) {
			return;
		}

		if(this.btnHome.isOver(coords)) {		// the home button can be pressed any time and is always shown
			this.btnHome.isDown = true;
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
			if(this.btnCashier.isOver(coords)) {		
				this.btnCashier.isDown = true;
				return;
			}
		}

		if(this.state == 1)	// only these buttons work when the panel is shown
		{
			if(this.extraBet && this.btnAnteChoice.isOver(coords) && this.btnAnteChoice.canClick) {
				this.btnAnteChoice.isDown = true;
				return;
			}
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
			this.btnGamble.setPosition(this.layout.GAMBLE_BTN); 
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
		
		if(this.state == 0 && game.uapi_showSpinBtn())		// only these buttons work when the panel is hidden
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
			
			if(this.btnCashier.isOver(coords) && this.btnCashier.isDown) 	{
				game.uapi_cashier();
				evt.preventDefault();
				return;
			}
		}
		
		if(this.state == 1)	// only these buttons work when the panel is shown
		{
			if(this.extraBet && this.btnAnteChoice.isOver(coords) && this.btnAnteChoice.isDown){
				this.doAnte(!game.account.superbet);
                game.playSound('click');	
				return;
			}

			if(this.btnLineUp.isOver(coords) && this.btnLineUp.isDown) 	{
                if(this.way243) {
                     game.uapi_reelUp(true);
                } 
                else {
                     game.uapi_lineUp(true);
                }
				this.doAnte(false);
				return;
			}
			if(this.btnLineDown.isOver(coords) && this.btnLineDown.isDown) 	{
				if(this.way243) {
					game.uapi_reelDown(true);
				}
				else {
					game.uapi_lineDown(true);
				}
				this.doAnte(false);
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
			
            if(game.uapi_showSpinBtnOnSettingsPanel())
            {

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
		
	}
	this.doAnte = function(on)
	{
        if(!this.extraBet)
            return;

		this.btnAnteChoice.isActive = on;

		if(on)
		{
			game.account.superbet = game.account.superbetLines;
			
			game.account.paylinesSelected = game.account.NUM_PAYLINES;
			game.ui.insufficientFunds = !game.account.canBet();
			game.ui.setMeterText("lines",game.account.paylinesSelected);
			createPaylineTexture2();
			
			var btnSpinLayout= this.layout.btnSpinAnte;
			var btnStartAutoPlayLayout= this.layout.btnStartAutoPlayAnte;
		}
		else
		{
			game.account.superbet = 0;

			var btnSpinLayout= this.layout.btnSpin;
			var btnStartAutoPlayLayout= this.layout.btnStartAutoPlay;
		}
		
		for (var prop in btnSpinLayout) 
			if (btnSpinLayout.hasOwnProperty(prop)) 
				this.btnSpin[prop] = btnSpinLayout[prop];

		for (var prop in btnStartAutoPlayLayout) 
			if (btnStartAutoPlayLayout.hasOwnProperty(prop)) 
				this.btnStartAutoPlay[prop] = btnStartAutoPlayLayout[prop];

		game.paylineShowDelay = 2000;
		game.setState(SS_STOPPED);
		// game.showSelectedLines();
		game.account.clearWin();
        
        game.uapi_superbetChanged(on);
	};
	
	this.buttonsUp = function()
	{
		if(this.btnSpin.isDown)
        {
            this.spinBtnAlpha = this.SPIN_BTN_ALPHA_MAX;
            this.spinBtnAlphaDelta = this.SPIN_BTN_ALPHA_DELTA_MINUS ;
        }
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
		this.btnAnteChoice.isDown = false;
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
		this.btnAnteChoice.canClick = true;
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
		this.btnAnteChoice.canClick = false;
		if (this.disableHomeBtnMidRound) {
			this.btnHome.isDisabled = true;
		}
		if (this.showCashierBtn) {
			this.btnCashier.isDisabled = true;
		}
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
				
                if(game.uapi_showSpinBtn() && !this.btnSpin.isDisabled)
                {
                    this.spinBtnAlpha += this.spinBtnAlphaDelta;
                    
                    if(this.spinBtnAlpha >this.SPIN_BTN_ALPHA_MAX)
                        this.spinBtnAlphaDelta = this.SPIN_BTN_ALPHA_DELTA_MINUS;
                    else if(this.spinBtnAlpha < this.SPIN_BTN_ALPHA_MIN)
                        this.spinBtnAlphaDelta = this.SPIN_BTN_ALPHA_DELTA_PLUS;
                }
                else
                {
                    this.spinBtnAlpha = this.SPIN_BTN_ALPHA_MAX;
                    this.spinBtnAlphaDelta = this.SPIN_BTN_ALPHA_DELTA_MINUS ;
                }
                
                if(game.uapi_showSpinBtn())
                {
                         
                    var oldAlpha = ctx.globalAlpha;
                    ctx.globalAlpha = Math.max(Math.min(this.spinBtnAlpha,this.SPIN_BTN_ALPHA_MAX_SHOW), this.SPIN_BTN_ALPHA_MIN_SHOW);
                    switch(this.autoPlayMode)
                    {
                        case this.AUTO_OFF:		// No autoplay
                            if(!this.btnSpin.isDisabled)  // TODO: Show disabled state for play button when there is insufficient funds
                            {
                                if(this.btnSpin.isDown)
                                {
                                    var temp = ctx.globalAlpha;
                                    ctx.globalAlpha = this.SPIN_BTN_ALPHA_MAX_SHOW;
                                    this.btnSpin.draw();
                                    ctx.globalAlpha = temp;
                                }
                                else
                                    this.btnSpin.draw();
                                
                                
                                if(!this.btnSpin.isDown)
                                    ctx.drawImage(this.btnSpinGlow,  this.layout.SPIN_BTN_GLOW.x,  this.layout.SPIN_BTN_GLOW.y);
                               else
                                    ctx.drawImage(this.btnSpinGlow, 
                                        0, 0,
                                        this.layout.SPIN_BTN_GLOW.w, this.layout.SPIN_BTN_GLOW.h,
                                        this.layout.SPIN_BTN_GLOW.xd,  this.layout.SPIN_BTN_GLOW.yd,
                                        this.layout.SPIN_BTN_GLOW.wd,  this.layout.SPIN_BTN_GLOW.hd
                                    );
                                
                                if(config.gambleBtn)
                                    this.btnGamble.draw();
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
                }

				if(this.winMeterShow)
				{
					var oldAlpha = ctx.globalAlpha;
					ctx.globalAlpha = 0.8;
					ctx.drawImage(this.imgElements, 0, 0, 568, 72, this.layout.WIN_METER_BG.x, this.layout.WIN_METER_BG.y, this.layout.WIN_METER_BG.w, this.layout.WIN_METER_BG.h);
					ctx.globalAlpha = oldAlpha;
					this.winMeter.draw(ctx);
				}
				if (this.showCashierBtn && !this.btnCashier.isDisabled) {
					this.btnCashier.draw();
				}
			break;
			
			case 1: // panel
				ctx.drawImage(this.imgPanel, this.layout.PANEL.x, this.layout.PANEL.y);
				
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
				
				switch(this.audioState)
				{
					case this.AUDIO_DISABLED:
						this.btnMuteOff.draw();
					break;
					
					case this.AUDIO_ON:
						this.btnMute.draw();
					break;
					
					case this.AUDIO_MUTED:
						this.btnMuteOff.draw();
					break;
				}
				
				this.btnInfo.draw();
//				this.btnHome.draw();
				this.btnClose.draw();
				
				this.linesMeter.draw(ctx);
				this.betMeter.draw(ctx);
				this.autoPlayMeter.draw(ctx);
				
                if(this.extraBet)
                {
                    this.playExtra1.draw(ctx);
                    this.playExtra2.draw(ctx);
                    this.btnAnteChoice.draw();
                }
                
                if(this.way243)
                {
                    ctx.drawImage(
                        game.ASSET_MANAGER.getAsset("Reels.png"),
                        (game.account.reelsSelected-1)*this.layout.LINE_WAY243.w, 0, this.layout.LINE_WAY243.w, this.layout.LINE_WAY243.h, 
                        this.layout.LINE_WAY243.x, this.layout.LINE_WAY243.y, this.layout.LINE_WAY243.w*this.layout.LINE_WAY243.s, this.layout.LINE_WAY243.h*this.layout.LINE_WAY243.s
                    ); 
                }


                if(game.uapi_showSpinBtnOnSettingsPanel())
                {
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
                }
				
			break;
		}
		
		if (!this.disableHomeBtnMidRound) {
			this.btnHome.draw();
		} else if (!this.btnHome.isDisabled) {
			this.btnHome.draw();
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
	
	// tells the UI to display the large WIN meter
	this.showWinMeter = function(state)
	{
		this.winMeterShow = state;
        game.uapi_showWinMeter(state)
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