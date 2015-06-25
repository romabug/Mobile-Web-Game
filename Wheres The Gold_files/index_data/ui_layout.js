function UILayout(params)
{
	this.orientation   = 0;

	this.btnUp 		 = {nx:290,ny:0,nwidth:124,nheight:91,dx:290+487,dy:0,dwidth:124,dheight:91};
	this.btnDown 	 = {nx:290,ny:92,nwidth:124,nheight:91,dx:290+487,dy:92,dwidth:124,dheight:91};
	this.btnMuteOff  = {nx:281,ny:317,nwidth:103,nheight:102,dx:281+487,dy:317,dwidth:103,dheight:102};
	this.btnMute     = {nx:384,ny:317,nwidth:103,nheight:102,dx:384+487,dy:317,dwidth:103,dheight:102};
	this.btnInfo 	 = {nx:145,ny:317,nwidth:135,nheight:102,dx:145+487,dy:317,dwidth:135,dheight:102};
	this.btnHome 	 = {nx:389,ny:182,nwidth:70,nheight:70,dx:389+487,dy:182,dwidth:70,dheight:70};
    this.btnSettings = {nx:310,ny:184,nwidth:70,nheight:70,dx:310+487,dy:184,dwidth:70,dheight:70};
	this.btnClose    = {nx:415,ny:72,nwidth:70,nheight:70,dx:415+487,dy:72,dwidth:70,dheight:70};
    
    var spinW = 144, spinH = 137;
	this.btnSpin 	 = {nx:0,ny:0,nwidth:spinW,nheight:spinH,dx:0+487,dy:0,dwidth:spinW,dheight:spinH};
	this.btnSpinAnte= {nx:145,ny:0,nwidth:spinW,nheight:spinH,dx:145+487,dy:0,dwidth:spinW,dheight:spinH};
	this.btnStartAutoPlay = {nx:145,ny:142,nwidth:spinW,nheight:spinH,dx:145+487,dy:142,dwidth:spinW,dheight:spinH};
	this.btnStartAutoPlayAnte = {nx:0,ny:142,nwidth:spinW,nheight:spinH,dx:0+487,dy:142,dwidth:spinW,dheight:spinH};
	this.btnStopAutoPlay  = {nx:0,ny:284,nwidth:spinW,nheight:spinH,dx:0+487,dy:284,dwidth:spinW,dheight:spinH};
	this.btnCashier 	 = {nx:15,ny:420,nwidth:70,nheight:70,dx:15+487,dy:420,dwidth:70,dheight:70};    
	this.btnAnteChoice = {ax:0,ay:0,awidth:110,aheight:50, nx:110,ny:0,nwidth:110,nheight:50, dx:0,dy:0,dwidth:110,dheight:50};
	    
    this.btnGamble = {ax:323,ay:254,awidth:134,aheight:63, nx:323,ny:254,nwidth:134,nheight:63, dx:323,dy:254,dwidth:134,dheight:63};
	
    this.hitPadding = 20;

	this.orient = function(direction)
	{
		this.orientation = direction;
        this.PANEL = {x:0,y:0};
        this.LINE_DOWN_BTN	= {x:49+10 + this.PANEL.x + 5,y:281 + this.PANEL.y + 4};
        this.LINE_UP_BTN		= {x:186-10 + this.PANEL.x + 5,y:290 + this.PANEL.y + 4};
        this.BET_DOWN_BTN	= {x:347+10 + this.PANEL.x + 5,y:281 + this.PANEL.y + 4};
        this.BET_UP_BTN		= {x:486-10 + this.PANEL.x + 5,y:290 + this.PANEL.y + 4};
        this.AUTO_DOWN_BTN	= {x:645+10 + this.PANEL.x + 5,y:281 + this.PANEL.y + 4};
        this.AUTO_UP_BTN		= {x:780-10 + this.PANEL.x + 5,y:290 + this.PANEL.y + 4};
        
        this.LINE_WAY243 = {x:102, y:82, w:178,h:89, s:0.9};

        if(params.extraBet)
        {
            this.MUTE_BTN 	   = {x:35 + this.PANEL.x + 5,y:434 + this.PANEL.y + 4};
            this.INFO_BTN 	   = {x:185	+ this.PANEL.x + 5,y:434 + this.PANEL.y + 4};
        }
        else
        {
            this.MUTE_BTN 	   = {x:35+100 + this.PANEL.x + 5,y:434 + this.PANEL.y + 4};
            this.INFO_BTN 	   = {x:185+225	+ this.PANEL.x + 5,y:434 + this.PANEL.y + 4};
        }
        this.HOME_BTN 	   = {x:this.PANEL.x ,y:this.PANEL.y};
        this.SETTINGS_BTN  = {x:883 + this.PANEL.x + 5,y:this.PANEL.y};
        this.CLOSE_BTN     = {x:883 + this.PANEL.x + 5,y:this.PANEL.y};
		this.CASHIER_BTN   = {x:0,y:498};
        
		this.SPIN_BTN = { x:817, y:211 };
        this.SPIN_BTN_GLOW = { x:815, y:208,  w:159, h:149};
        var s = 0.9; // scale calculations
        this.SPIN_BTN_GLOW.wd = this.SPIN_BTN_GLOW.w*s;
        this.SPIN_BTN_GLOW.hd = this.SPIN_BTN_GLOW.h*s;
        this.SPIN_BTN_GLOW.xd = this.SPIN_BTN_GLOW.x+(this.SPIN_BTN_GLOW.w - this.SPIN_BTN_GLOW.wd)/2;
        this.SPIN_BTN_GLOW.yd = this.SPIN_BTN_GLOW.y+(this.SPIN_BTN_GLOW.h - this.SPIN_BTN_GLOW.hd)/2;
        
        this.GAMBLE_BTN = { x:3, y:250 };
        
        this.START_AUTOPLAY_BTN = { x:768+49 , y:436-225 };
        this.STOP_AUTOPLAY_BTN  = { x:768+49 , y:436-225 };

        this.ANTE_CHOICE_BTN = { x:414-5+16, y:450-4 };
        this.SPIN2_BTN = { x:690+20, y:419 };
        this.START_AUTOPLAY2_BTN = { x:690+20 , y:419 };
        this.STOP_AUTOPLAY2_BTN  = { x:722+20 , y:419 };

        this.GAMES_REMAINING_METER  = { x:862+23+5 , y:518-220-4 };
        this.GAMES_REMAINING2_METER = { x:785-1 , y:501 };

        this.LINES_METER		= {x:178 + this.PANEL.x + 5,y:232 + this.PANEL.y + 4};
        this.BET_METER 		= {x:478 + this.PANEL.x + 5,y:230 + this.PANEL.y + 4};
        this.AUTOPLAY_METER	= {x:770 + this.PANEL.x + 5,y:232 + this.PANEL.y + 4};
        this.WIN_METER		= {x:475,y:505};
        this.WIN_METER_BG		= {x:109,y:452,w:742,h:65};
        this.INSUFFICIENT_FUNDS = {x:470 + this.PANEL.x + 5, y:50 + this.PANEL.y + 4};
        this.PLAY_EXTRA_1 = {x:478 + this.PANEL.x, y:435 + this.PANEL.y};
        this.PLAY_EXTRA_2 = {x:478 + this.PANEL.x, y:525 + this.PANEL.y};
	}
}