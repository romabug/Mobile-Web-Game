function UILayout()
{
	this.orientation   = 0;
    this.LINE_WAY243 = {x:102, y:82, w:178,h:89, s:0.9};
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
	this.btnCashier 	 = {nx:192,ny:327,nwidth:72,nheight:71,dx:538,dy:327,dwidth:72,dheight:71};

    this.hitPadding = 20; // was 20

    this.orient = function(direction)
    {
        this.orientation = direction;
//		switch(direction)
//		{
//		case 0:
//		case 1:
//		case 2:
        this.PANEL 		   = {x:21,y:3};
        this.LINE_UP_BTN   = {x:165 + this.PANEL.x,y:285 + this.PANEL.y};
        this.LINE_DOWN_BTN = {x:45 + this.PANEL.x,y:285 + this.PANEL.y};
        this.BET_UP_BTN    = {x:460 + this.PANEL.x,y:285 + this.PANEL.y};
        this.BET_DOWN_BTN  = {x:340 + this.PANEL.x,y:285 + this.PANEL.y};
        this.AUTO_UP_BTN   = {x:755 + this.PANEL.x,y:285 + this.PANEL.y};
        this.AUTO_DOWN_BTN = {x:635 + this.PANEL.x,y:285 + this.PANEL.y};

        this.MUTE_BTN 	   = {x:115 + this.PANEL.x,y:412 + this.PANEL.y};
        this.INFO_BTN 	   = {x:395	+ this.PANEL.x,y:410 + this.PANEL.y};
        this.HOME_BTN 	   = {x:-17 + this.PANEL.x,y:1 + this.PANEL.y};
        this.SETTINGS_BTN  = {x:866 + this.PANEL.x,y:1 + this.PANEL.y};
        this.CLOSE_BTN     = {x:866 + this.PANEL.x,y:1 + this.PANEL.y};
		this.CASHIER_BTN   = {x:-17 + this.PANEL.x,y:494 + this.PANEL.y};
		
        this.SPIN_BTN = { x:768, y:436 };
        this.START_AUTOPLAY_BTN = { x:768 , y:436 };
        this.STOP_AUTOPLAY_BTN  = { x:768 , y:436 };

        this.SPIN2_BTN = { x:685, y:402 };
        this.START_AUTOPLAY2_BTN = { x:685 , y:402 };
        this.STOP_AUTOPLAY2_BTN  = { x:722 , y:402 };

        this.GAMES_REMAINING_METER  = { x:864 , y:515 };
        this.GAMES_REMAINING2_METER = { x:780 , y:490 };

        this.LINES_METER 	= {x:165 + this.PANEL.x,y:245 + this.PANEL.y};
        this.BET_METER 		= {x:465 + this.PANEL.x,y:243 + this.PANEL.y};
        this.AUTOPLAY_METER = {x:760 + this.PANEL.x,y:245 + this.PANEL.y};
        this.WIN_METER 		= {x:430,y:494};
        this.WIN_METER_BG	= {x:140,y:440,w:568,h:72};

        this.INSUFFICIENT_FUNDS = {x:470 + this.PANEL.x, y:50 + this.PANEL.y};
//		break;
//		}
    }
}

