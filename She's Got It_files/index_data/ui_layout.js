function UILayout()
{
	this.orientation   = 0;

	this.btnUp 		 = {nx:192,ny:0,nwidth:119,nheight:91,dx:538,dy:0,dwidth:119,dheight:91};
	this.btnDown 	 = {nx:192,ny:92,nwidth:119,nheight:91,dx:538,dy:92,dwidth:119,dheight:91};
	this.btnMuteOff  = {nx:242,ny:396,nwidth:103,nheight:104,dx:588,dy:396,dwidth:103,dheight:104};
	this.btnMute     = {nx:135,ny:396,nwidth:103,nheight:104,dx:481,dy:396,dwidth:103,dheight:104};
	this.btnInfo 	 = {nx:0,ny:396,nwidth:133,nheight:103,dx:339,dy:396,dwidth:133,dheight:103};
	this.btnHome 	 = {nx:192,ny:256,nwidth:72,nheight:71,dx:538,dy:256,dwidth:72,dheight:71};
	this.btnSettings = {nx:192,ny:184,nwidth:72,nheight:72,dx:538,dy:184,dwidth:72,dheight:72};
	this.btnClose    = {nx:263,ny:184,nwidth:72,nheight:72,dx:609,dy:184,dwidth:72,dheight:72};
	this.btnSpin 	 = {nx:0,ny:0,nwidth:191,nheight:131,dx:346,dy:0,dwidth:191,dheight:131};
	this.btnStartAutoPlay = {nx:0,ny:132,nwidth:191,nheight:131,dx:346,dy:132,dwidth:191,dheight:131};
	this.btnStopAutoPlay  = {nx:0,ny:264,nwidth:191,nheight:131,dx:346,dy:264,dwidth:191,dheight:131};
	this.btnCashier 	  = {nx:192,ny:327,nwidth:72,nheight:71,dx:538,dy:327,dwidth:72,dheight:71};
	
	this.defaultPanelPos 				= {x:21 , y:3};
	
	this.defaultGamesRemainingMeterPos  = {x:864, y:515};
	this.defaultGamesRemaining2MeterPos = {x:786, y:498};

	this.defaultLineUpBtnPos			= {x:176 + this.defaultPanelPos.x, y:290 + this.defaultPanelPos.y};
	this.defaultLineDownBtnPos			= {x:39  + this.defaultPanelPos.x, y:281 + this.defaultPanelPos.y};
	this.defaultBetUpBtnPos			    = {x:473 + this.defaultPanelPos.x, y:290 + this.defaultPanelPos.y};
	this.defaultBetDownBtnPos  			= {x:337 + this.defaultPanelPos.x, y:281 + this.defaultPanelPos.y};
	this.defaultAutoUpBtnPos   			= {x:769 + this.defaultPanelPos.x, y:290 + this.defaultPanelPos.y};
	this.defaultAutoDownBtnPos 			= {x:633 + this.defaultPanelPos.x, y:281 + this.defaultPanelPos.y};

	this.defaultMuteBtnPos	   			= {x:113 + this.defaultPanelPos.x, y:434 + this.defaultPanelPos.y};
	this.defaultInfoBtnPos 	   			= {x:400 + this.defaultPanelPos.x, y:434 + this.defaultPanelPos.y};
	this.defaultHomeBtnPos 	   			= {x:-17 + this.defaultPanelPos.x, y:1   + this.defaultPanelPos.y};
	this.defaultSettingsBtnPos  		= {x:866 + this.defaultPanelPos.x, y:1   + this.defaultPanelPos.y};
	this.defaultCloseBtnPos     		= {x:866 + this.defaultPanelPos.x, y:1   + this.defaultPanelPos.y};
	this.defaultCashierBtnPos   		= {x:-17 + this.defaultPanelPos.x, y:494 + this.defaultPanelPos.y};

	this.defaultSpinBtnPos 				= {x:768, y:436 };
	this.defaultStartAutoplayBtnPos	 	= {x:768, y:436 };
	this.defaultStopAutoplayBtnPos	  	= {x:768, y:436 };
	
	this.defaultSpin2BtnPos				= {x:690, y:419 };
	this.defaultStartAutoplay2BtnPos 	= {x:690, y:419 };
	this.defaultStopAutoplay2BtnPos  	= {x:722, y:419 };

	this.defaultLinesMeterPos 			= {x:165 + this.defaultPanelPos.x, y:232 + this.defaultPanelPos.y};
	this.defaultBetMeterPos 			= {x:465 + this.defaultPanelPos.x, y:230 + this.defaultPanelPos.y};
	this.defaultAutoplayMeterPos 		= {x:765 + this.defaultPanelPos.x, y:232 + this.defaultPanelPos.y};

	this.defaultWinMeterPos 			= {x:430, y:494};
	this.defaultWinMeterBGPos 			= {x:140, y:440, w:568, h:72};

	this.defaultInsufficientFundsPos 	= {x:470 + this.defaultPanelPos.x, y:50  + this.defaultPanelPos.y};

	this.defaultSubPanel 				= {x:0, y:72, w:281, h:341};
	this.defaultSubPanelLeftPos 		= {x:26   + this.defaultPanelPos.x, y:71 + this.defaultPanelPos.y};	
	this.defaultSubPanelMidPos 			= {x:323  + this.defaultPanelPos.x, y:71 + this.defaultPanelPos.y};	
	this.defaultSubPanelRightPos 		= {x:620  + this.defaultPanelPos.x, y:71 + this.defaultPanelPos.y};	
	

	this.defaultAutoplayIcon			= {x:281, y:72, w:180, h: 81};	
	this.defaultAutoplayIconPos			= {x:671 + this.defaultPanelPos.x, y:81 + this.defaultPanelPos.y};							
			
	this.defaultLinesIcon				= {x:281, y:154, w:150, h:58};
	this.defaultLinesIconPos			= {x:87 + this.defaultPanelPos.x, y:92 + this.defaultPanelPos.y};
	
	this.defaultBetIcon					= {x:281, y:212, w:100, h:69};
	this.defaultBetIconPos				= {x:408 + this.defaultPanelPos.x, y:86 + this.defaultPanelPos.y};
	
	
					  

	this.setUI3Layout = function() {
		this.defaultPanelPos 				= {x:21 , y:3};
		
		this.defaultGamesRemainingMeterPos  = {x:864, y:515 - 55};
		this.defaultGamesRemaining2MeterPos = {x:786, y:498 - 55};
	
		this.defaultLineUpBtnPos			= {x:176 + this.defaultPanelPos.x, y:290 + this.defaultPanelPos.y - 55};
		this.defaultLineDownBtnPos			= {x:39  + this.defaultPanelPos.x, y:281 + this.defaultPanelPos.y - 55};
		this.defaultBetUpBtnPos			    = {x:473 + this.defaultPanelPos.x, y:290 + this.defaultPanelPos.y - 55};
		this.defaultBetDownBtnPos  			= {x:337 + this.defaultPanelPos.x, y:281 + this.defaultPanelPos.y - 55};
		this.defaultAutoUpBtnPos   			= {x:769 + this.defaultPanelPos.x, y:290 + this.defaultPanelPos.y - 55};
		this.defaultAutoDownBtnPos 			= {x:633 + this.defaultPanelPos.x, y:281 + this.defaultPanelPos.y - 55};
	
		this.defaultMuteBtnPos	   			= {x:113 + this.defaultPanelPos.x, y:434 + this.defaultPanelPos.y - 55};
		this.defaultInfoBtnPos 	   			= {x:400 + this.defaultPanelPos.x, y:434 + this.defaultPanelPos.y - 55};
		this.defaultHomeBtnPos 	   			= {x:-17 + this.defaultPanelPos.x, y:1   + this.defaultPanelPos.y};
		this.defaultSettingsBtnPos  		= {x:866 + this.defaultPanelPos.x, y:1   + this.defaultPanelPos.y};
		this.defaultCloseBtnPos     		= {x:866 + this.defaultPanelPos.x, y:1   + this.defaultPanelPos.y};
//		this.defaultCashierBtnPos   		= {x:-17 + this.defaultPanelPos.x, y:494 + this.defaultPanelPos.y - 55};
		this.defaultCashierBtnPos   		= {x:70 + this.defaultPanelPos.x, y:1 + this.defaultPanelPos.y };
	
		this.defaultSpinBtnPos 				= {x:768, y:436 - 55};
		this.defaultStartAutoplayBtnPos	 	= {x:768, y:436 - 55};
		this.defaultStopAutoplayBtnPos	  	= {x:768, y:436 - 55};
		
		this.defaultSpin2BtnPos				= {x:690, y:419 - 55};
		this.defaultStartAutoplay2BtnPos 	= {x:690, y:419 - 55};
		this.defaultStopAutoplay2BtnPos  	= {x:722, y:419 - 55};
	
		this.defaultLinesMeterPos 			= {x:165 + this.defaultPanelPos.x, y:232 + this.defaultPanelPos.y - 55};
		this.defaultBetMeterPos 			= {x:465 + this.defaultPanelPos.x, y:230 + this.defaultPanelPos.y - 55};
		this.defaultAutoplayMeterPos 		= {x:765 + this.defaultPanelPos.x, y:232 + this.defaultPanelPos.y - 55};
	
		this.defaultWinMeterPos 			= {x:430, y:494};
		this.defaultWinMeterBGPos 			= {x:140, y:440, w:568, h:72};
	
		this.defaultInsufficientFundsPos 	= {x:470 + this.defaultPanelPos.x, y:530  + this.defaultPanelPos.y};
		
		this.defaultSubPanel 				= {x:0, y:72, w:281, h:341};
		this.defaultSubPanelLeftPos 		= {x:26   + this.defaultPanelPos.x, y:71 + this.defaultPanelPos.y - 50};	
		this.defaultSubPanelMidPos 			= {x:323  + this.defaultPanelPos.x, y:71 + this.defaultPanelPos.y - 50};	
		this.defaultSubPanelRightPos 		= {x:620  + this.defaultPanelPos.x, y:71 + this.defaultPanelPos.y - 50};	
		
		this.defaultAutoplayIcon			= {x:281, y:72, w:180, h: 81};	
		this.defaultAutoplayIconPos			= {x:671 + this.defaultPanelPos.x, y:81 + this.defaultPanelPos.y - 55};							
		this.defaultLinesIcon				= {x:281, y:154, w:150, h:58};
		this.defaultLinesIconPos			= {x:87 + this.defaultPanelPos.x, y:92 + this.defaultPanelPos.y - 55};
		this.defaultBetIcon					= {x:281, y:212, w:100, h:69};
		this.defaultBetIconPos				= {x:408 + this.defaultPanelPos.x, y:86 + this.defaultPanelPos.y - 55};
	}
	




	this.hitPadding = 20; // was 20

	this.orient = function(direction)
	{
		this.orientation = direction;
//		switch(direction)
//		{
//		case 0:
//		case 1:
//		case 2:

			this.setUI3Layout();

			this.PANEL 		   			= this.defaultPanelPos;
			this.LINE_UP_BTN   			= this.defaultLineUpBtnPos; 
			this.LINE_DOWN_BTN 			= this.defaultLineDownBtnPos;
			this.BET_UP_BTN    			= this.defaultBetUpBtnPos;
			this.BET_DOWN_BTN  			= this.defaultBetDownBtnPos;
			this.AUTO_UP_BTN   			= this.defaultAutoUpBtnPos;
			this.AUTO_DOWN_BTN 			= this.defaultAutoDownBtnPos;
			
			this.MUTE_BTN 	   			= this.defaultMuteBtnPos;
			this.INFO_BTN 	   			= this.defaultInfoBtnPos;
			this.HOME_BTN 	   			= this.defaultHomeBtnPos;
			this.SETTINGS_BTN  			= this.defaultSettingsBtnPos;
			this.CLOSE_BTN     			= this.defaultCloseBtnPos;
			this.CASHIER_BTN   			= this.defaultCashierBtnPos;
			
			this.SPIN_BTN 				= this.defaultSpinBtnPos;
			this.START_AUTOPLAY_BTN 	= this.defaultStartAutoplayBtnPos;
			this.STOP_AUTOPLAY_BTN  	= this.defaultStopAutoplayBtnPos;
			
			this.SPIN2_BTN 				= this.defaultSpin2BtnPos;
			this.START_AUTOPLAY2_BTN 	= this.defaultStartAutoplay2BtnPos;
			this.STOP_AUTOPLAY2_BTN  	= this.defaultStopAutoplay2BtnPos;

			this.GAMES_REMAINING_METER  = this.defaultGamesRemainingMeterPos;
			this.GAMES_REMAINING2_METER = this.defaultGamesRemaining2MeterPos;

			this.LINES_METER 			= this.defaultLinesMeterPos;
			this.BET_METER 				= this.defaultBetMeterPos;
			this.AUTOPLAY_METER 		= this.defaultAutoplayMeterPos;
			this.WIN_METER 				= this.defaultWinMeterPos;
			this.WIN_METER_BG			= this.defaultWinMeterBGPos;

			this.INSUFFICIENT_FUNDS 	= this.defaultInsufficientFundsPos;
			
//		break;
//		}
	}
}