
function FeatureResult()
{
	this.winType = 0;
	this.winAmount = 0;
	this.numReels = 5;
	this.stops =[];
	this.numWinningPaylines = 0;
	this.numFreeGames = 0;
	this.bProcessed	  = true;
	this.betPerLine   = 0;
	this.linesBet     = 0;
	
	this.paylineWins  = [];
	this.paylineWins2 = [];
	
	this.FPM = 0;

	this.getFreeGamesLeft = function()
	{
		return this.numFreeGames;
	};
	
	this.clear = function()
	{
		this.winType = 0;
		this.winAmount = 0;
		this.numReels = 5;
		this.numWinningPaylines = 0;
		this.numFreeGames = 0;
		this.paylineWins.length = 0;
		this.paylineWins2.length = 0;
		this.bProcessed	 = true;
	}
}



function RevealAnimation()

{ 
 
	 
 var	t = 40;
  AF.Movie.call(this,65*t);
  
   
	var star1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset('symFeatureCoin.png'), 1);
	star1.x = -Math.round(game.ASSET_MANAGER.getAsset('symFeatureCoin.png').width/2);
	star1.y = -Math.round(game.ASSET_MANAGER.getAsset('symFeatureCoin.png').height/2);
	
	var star1wrap = new AF.Movie();
	star1wrap.x = Math.round(game.ASSET_MANAGER.getAsset('symFeatureCoin.png').width/2);
	star1wrap.y = Math.round(game.ASSET_MANAGER.getAsset('symFeatureCoin.png').height/2);
 	
	star1wrap.addChild(star1);
     this.addChild(star1wrap);
 

 this.addTween(new AF.Tween(star1wrap,   "alpha" ).set(1*t, 0 ).set(15*t,1, AF.Tween.POWER, 0.3).set(t*65, 1)   );  
 this.addTween(new AF.Tween(star1wrap, "scaleX" ).set(1*t, 0).set(15*t, 1.5, AF.Tween.POWER, 0.3 ).set(t*65,1.5 )   );
 this.addTween(new AF.Tween(star1wrap, "scaleY" ).set(1*t, 0).set(15*t, 1.5 , AF.Tween.POWER, 0.3).set(t*65,1.5)   );   
 
/* 
     this.addAction(function()
    {
		parent.setState(LS_SHOW_PRIZE);   // tell the parent to show the text now
    }, 45*t );  */
 
 

	}
	
RevealAnimation.prototype = new AF.Movie();




//-------------------------------------------------
var LS_INIT = 0;
var LS_INTRO = 1;
var LS_PICK = 2;
var LS_REVEAL = 3;
var LS_SHOW_PRIZE = 4;
var LS_HIDE_PRIZE = 5;
var LS_IDLE = 6;
var LS_FINISHED_ROUND = 7;
var LS_REVEAL_WAIT = 8;
var LS_HISTORY_IDLE = 10;
var LS_HISTORY_AMOUNT = 11;




function PickSymbol()
{   
	this.posX = 0;
	this.posY = 0;
	
	this.state = LS_INIT;
	
	this.showScroll = {};
	this.throwCoins = {};
	this.introAnim = {};

	this.timer = 0;
	
	this.pickMeTxt  = new Text();
 
	this.pickMeTxt.m_Text  = TXT_PICK_ME;
	this.prizeTxt = new Text();
	this.pickAgainTxt = new Text();
	this.pickAgainTxt.m_Text = TXT_PICK_AGAIN;
	this.pickAgain = false;
	

// pick again  text style    
    this.pickagianTextFormat = {
 "align": "center",
            "font": {'fontWeight':' ', 'fontSize':'22px', 'fontFamily':'Arial'},
			"m_Color": "#f211db",
			"stroke_0_Color": "#f4d20c",
			"stroke_0_Width": 6,
			"stroke_1_Color": "#3e3c3e",
			"stroke_1_Width": 2,
			"gradient_x0": null,
			"gradient_y0": 0,
			"gradient_x1": 0,
			"gradient_y1": 0,
			"colorStop_0": [0.5, " "],
			"colorStop_1": [0.3, " "],
			"colorStop_2": [0.1, ""],
            "max_width": 150
	};	
	  
	
	
	
// pick me text	
	this.pickTextFormat = {
			"align": "center",
            "font": {'fontWeight':' ', 'fontSize':'22px', 'fontFamily':'Arial'},
			"m_Color": "#f211db",
			"stroke_0_Color": "#f4d20c",
			"stroke_0_Width": 8,
			"stroke_1_Color": "#3e3c3e",
			"stroke_1_Width": 2,
			"gradient_x0": null,
			"gradient_y0": 0,
			"gradient_x1": 0,
			"gradient_y1": 0,
			"colorStop_0": [0.5, " "],
			"colorStop_1": [0.3, " "],
			"colorStop_2": [0.1, ""],
            "max_width": 150

	};

// $40 text style  
    this.prizeTextFormat = {
			"align": "center",
            "font": {'fontWeight':'bold', 'fontSize':'37px', 'fontFamily':'Arial'},
			"m_Color": "#ffffff",
			"stroke_0_Color": "#19308e",
			"stroke_0_Width": 5,
			"stroke_1_Color": null,
			"stroke_1_Width": null,
			"gradient_x0": null,
			"gradient_y0": 0,
			"gradient_x1": 0,
			"gradient_y1": 0,
			"colorStop_0": [0, "#fe7700"],
			"colorStop_1": [0.3, "#fe9000"],
			"colorStop_2": [1, "#fec000"],
            "max_width": 150
	};

	this.pickMeTxt.setFormat(this.pickTextFormat);
	this.pickAgainTxt.setFormat(this.pickagianTextFormat);
	this.prizeTxt.setFormat(this.prizeTextFormat);

	this.btnLayout = {nx:0,ny:0,nwidth:150,nheight:150,dx:0,dy:0,dwidth:150,dheight:150};
	this.button    = new Button(null,this.btnLayout);
	
	this.clear = function()
	{
		this.state = LS_INIT;
		this.timer = 0;
		this.pickAgain = false;
	};
	
	this.setPosition = function(x,y)
	{
		this.posX = x;
		this.posY = y;	

	//	this.showScroll.setPosition(x,y);
	this.showScroll.x = x;
	this.showScroll.y = y;
	
        this.throwCoins.x = x;
        this.throwCoins.y = y;
	//	this.introAnim.setPosition(x, y);
        	this.introAnim.x = x;
            this.introAnim.y = y;

		this.pickMeTxt.setPosition({x:x+75,y:y+130});
		this.prizeTxt.setPosition({x:x+75,y:y+95});
		this.pickAgainTxt.setPosition({x:x+75,y:y+103});
		
		this.button.setPosition({x:x,y:y});  
	};
	
	this.setPrize = function(prizeStr,pickAgain)
	{
		this.prizeTxt.m_Text = prizeStr;
		this.pickAgain = pickAgain;
	};
	
	this.setPrizePosition = function()
	{
		if(this.pickAgain) {
			this.prizeTxt.setPosition({x:this.posX+75,y:this.posY+75});  // need to move it up to fit in text below
		} else {
			this.prizeTxt.setPosition({x:this.posX+75,y:this.posY+95});  // need to move it up to fit in text below
		}
	};
	
	
	
	this.init = function()
	{
  	  this.showScroll = new Singing();
	  this.introAnim = new OpenStar();
	  
 // alert ("55 new OpenStar()");                
	  
	  
	   AF.Movie.root.addChild(this.introAnim);  
	    
		this.throwCoins = new RevealAnimation();
		
	 //   this.introAnim = new ngImage(introAnim);
 	     
	}; 
	
	this.setState = function(newState)
	
	{   
        if(newState != this.state)
		{
			this.state = newState;
            switch(this.state)
			{
				case LS_INTRO:
 
                 this.introAnim.play(0);
	 				
				break;
				
				case LS_PICK:
 				
                    this.throwCoins.stop(0);
                    this.showScroll.play(0);
				break;
				
				case LS_REVEAL_WAIT:
				break;
				
				case LS_REVEAL:
					this.timer = 1200;  // length of anim
	 
					
                    this.throwCoins.play(0);
					if(this.pickAgain)
					{
						this.prizeTxt.setPosition({x:this.posX+75,y:this.posY+75});  // need to move it up to fit in text below
					}
					else
					{
						this.prizeTxt.setPosition({x:this.posX+75,y:this.posY+95});  // need to move it up to fit in text below
					}
				break;
				case LS_SHOW_PRIZE:
					this.timer = 1200;  // length of anim
 
                    game.updateGameWinMeter();
				break;
				
				case LS_HIDE_PRIZE:
                    if(this.pickAgain){
                        game.stopSound();
                        game.playFeatureLoopSound();
                    }
				break;
				
				case LS_IDLE:
                    this.throwCoins.time = 75*20;    
				break;
				
				case LS_HISTORY_AMOUNT:
				break;
				
			}
		}
	};
	
	this.update = function(timeDelta)
	{
	
	// console.log (this.introAnim.playing );  
	
		switch(this.state)
		{
			case LS_INTRO:
 
				// if(!this.introAnim.animRunning)
            if( !this.introAnim.playing ) 
				{
					
 //	console.log ("introAnim stop --> to state (LS_PICK)");
					
					this.setState(LS_PICK);
				}  
			break;
			
			case LS_REVEAL:
			
			
 	if(this.timer > 0)
				{
					this.timer -= timeDelta;
					if(this.timer <= 0)
					{
						this.timer = 0;
					}
				}
				if(this.timer == 0)
				{
					this.setState(LS_SHOW_PRIZE); 
				}
				
 		
				
				
			break;
			
			case LS_SHOW_PRIZE:
			
			// new added for  888
			  //  game.updateGameWinMeter();
			
				if(this.timer >= 0)
				{
					this.timer -= timeDelta;
					if(this.timer < 0)
					{
						this.setState(LS_HIDE_PRIZE);
						this.timer = 0;
					}
				}
			break;
			
			case LS_HIDE_PRIZE:

				this.setState(LS_FINISHED_ROUND);

			break;
		}

		this.showScroll.update(timeDelta);
        this.throwCoins.update();
        this.introAnim.update(timeDelta);
	};
	
	this.isRoundFinished = function()
	{
		return this.state == LS_FINISHED_ROUND;
	};
	
	this.draw = function(ctx)
	{
        switch(this.state)
		{
			case LS_INTRO:
				this.introAnim.draw(ctx);
				 
			break;
			
			case LS_PICK:
				this.showScroll.draw(ctx);
				ctx.lineJoin="round";
				this.pickMeTxt.draw(ctx);
			break;
			
			case LS_REVEAL_WAIT:
			case LS_REVEAL:
                this.throwCoins.draw(ctx);
			break;
			
			case LS_SHOW_PRIZE:
				this.throwCoins.draw(ctx);
				
	// old		if (this.throwCoins.time < 40*60 && this.throwCoins.time > 1*65)		
				
				if (1)  // when to show price
				
				{
					this.prizeTxt.draw(ctx);	  
					if(this.pickAgain)
					{
						this.pickAgainTxt.draw(ctx);
					}
				}
			break;
			
			case LS_HIDE_PRIZE:
				this.throwCoins.draw(ctx);
			break;
			
			case LS_HISTORY_AMOUNT:
//				this.throwCoins.draw(ctx);
				
				this.prizeTxt.draw(ctx);	  
				if(this.pickAgain) {
					this.pickAgainTxt.draw(ctx);
				}
			break;
			
			case LS_IDLE:
				this.throwCoins.draw(ctx);
			break;
			
			case LS_FINISHED_ROUND:
				this.throwCoins.draw(ctx);
			break;
		}
	}
}

//-----------------------------------------------------------------------------------------
var FS_INIT = 0;
var FS_INTRO = 1;
var FS_PICK = 2;
var FS_PICK_LEFT = 3;
var FS_PICK_RIGHT = 4;
var FS_END = 5;
var FS_RECOVER = 6;

function PickFeature()
{

    this.TRIGGER_TIMER_DELAY = 5000;
	this.posX = 0;
	this.posY = 0;
	this.width = 0;
	this.height = 0;

	this.inFeature = false;				// = true when the feature is active
	this.m_TriggerTimer = this.TRIGGER_TIMER_DELAY;
	
	this.pickPosition_1 = 0;	// which reel stop the symbols should appear on 0 = top, 1 = middle, 2 = bottom
	this.pickPosition_2 = 0;
	
	this.prize_first  = "";
	this.prize_second = "";
	this.numRounds = 0;
	this.ignoreInput = false;
	this.state = FS_INIT;
	
	this.timer = 3000;
	
	this.currentPick = 0;
	this.numPicks = 0;
	
  this.pickSymbol1 = new PickSymbol();
 this.pickSymbol2 = new PickSymbol();
	
	this.triggerFeature	= true;

	this.setSize = function(width, height)
	{
		this.width  = width;
		this.height = height;
	};
	
	this.setPosition = function(x,y)
	{
		this.posX = x;
		this.posY = y;	
		
	 	this.pickSymbol1.setPosition(this.posX, this.posY + this.pickPosition_1*150);
		this.pickSymbol2.setPosition(this.posX + this.width - 150, this.posY + this.pickPosition_2*150);
	};
	
	this.setPickPositions = function(pos1, pos2)	// pos1 and pos2 can be 0,1 or 2 
	{
		this.pickPosition_1 = pos1;
		this.pickPosition_2 = pos2;
		this.setPosition(this.posX, this.posY);
	};
	
	// if amount2 = 0, then only 1 pick happens
	this.setPrizes = function(amount1, amount2)
	{
		this.prize_first  = game.account.getCurrencyString(amount1);
		if(amount2 == 0) 
		{
			this.numRounds = 1;
			this.prize_second = game.account.getCurrencyString(amount1);
		}
		else 
		{
			this.numRounds = 2;
			this.prize_second = game.account.getCurrencyString(amount2);
		}
	};
	
	this.setHistoryPrize = function(amount)
	{
		this.prize_first   = game.account.getCurrencyString(amount);
		this.prize_second  = game.account.getCurrencyString(amount);
	};
	
	//This function is only called by the bridge in the 888 integration as we cannot know the wins ahead of time. 
	// amount - is the prize for the pick, index = 0 the first prize, and index = 1, the second prize.
	this.apiSetPrize = function(amount,index)
	{
 //	if(Number(index) == 0) {
			this.prize_first  = game.account.getCurrencyString(Number(amount));
 	//	console.log("First Prize---: " + this.prize_first);
 //		} else {
			this.prize_second = game.account.getCurrencyString(Number(amount));
 	//	console.log("Second Prize---: " + this.prize_second);  
 	}
//	};      

	//This function is only called by the bridge in the 888 integration to tell us that there is only one game remaining
	this.apiSetOneGame = function()
	{
		//Turn off Pick again,
		this.pickSymbol1.pickAgain = false;	// don't know which one it is, but we turn off both
		this.pickSymbol2.pickAgain = false;
		// Change number of rounds.
		this.numRounds = 1;
	};	
	
	
	
	
	
	
	
	
	
	
	

	this.clear = function()					// reset everything in the feature
	{
        this.pickSymbol1.clear();
		this.pickSymbol2.clear();
		this.numRounds = 0;
		this.state = FS_INIT;
		this.timer = 3000;
		this.numPicks = 0;
		this.m_TriggerTimer = this.TRIGGER_TIMER_DELAY;
		this.pickPosition_1 = 0;	// which reel stop the symbols should appear on 0 = top, 1 = middle, 2 = bottom
		this.pickPosition_2 = 0;
		this.prize_first  = "";
		this.prize_second = "";
	};
	
	this.init = function()
	{
 
 

		this.pickSymbol1.init();
		this.pickSymbol2.init();  
	};    
	
	this.setState = function(newState)
	{
        if(newState != this.state)
		{
			this.state = newState;
            switch(this.state)
			{
				case FS_INTRO:

                    if (!feature.inFeature/* && !game.freeGames.m_bInFreeGames*/) {
                        game.playFeatureLoopSound();

                        if (this.FPM.length > 0) {

                            this.numRounds = this.numRounds - (this.FPM.length - 1);
                            this.numPicks = this.FPM.length-1;

                            this.setState(FS_RECOVER);
                            feature.inFeature = true;
                            break;
                        }
                    }

					// For feature recovery
					feature.inFeature = true;
					if (this.numRounds - this.FPM.length == 0) 
					{
						this.setState(FS_END);
						break;
					} else if (this.FPM.length > 0) {
						this.numRounds = this.numRounds - this.FPM.length;
						this.numPicks = this.FPM.length;
					}
					//console.log ( " pickSymbol1.setState(LS_INTRO) ");
					this.pickSymbol1.setState(LS_INTRO);
					this.pickSymbol2.setState(LS_INTRO);
				break; 
				
				case FS_RECOVER:
                    if (this.FPM[this.FPM.length-1] == 0) {

                        if(this.numRounds == 2) {
                            this.pickSymbol1.setPrize(this.prize_first,true);
                        } else {
                            this.pickSymbol1.setPrize(this.prize_second,false);
                        }
                        this.pickSymbol1.setState(LS_REVEAL);
                        this.pickSymbol2.setState(LS_IDLE);
                    } else {
                        if(this.numRounds == 2) {
                            this.pickSymbol2.setPrize(this.prize_first,true);
                        } else {
                            this.pickSymbol2.setPrize(this.prize_second,false);
                        }
                        this.pickSymbol1.setState(LS_IDLE);
                        this.pickSymbol2.setState(LS_REVEAL);
                    }

                    game.stopSound();
                    game.playSound("pickreveal");

                    this.FPM = 0;
                    this.numPicks++;  

                    break;
				
				case FS_PICK_LEFT:
					if(this.numRounds == 2) {
						this.pickSymbol1.setPrize(this.prize_first,true);
						
		 this.pickSymbol1.throwCoins.visible = true ;			
      this.pickSymbol2.throwCoins.visible = false ;  
 
				
						
					}
					else {
						this.pickSymbol1.setPrize(this.prize_second,false);
					
      this.pickSymbol1.throwCoins.visible = true ;			
      this.pickSymbol2.throwCoins.visible = false ;
						
					}
					
		//non-888  			this.pickSymbol1.setState(LS_REVEAL_WAIT);
					this.pickSymbol1.setState(LS_REVEAL);
					this.pickSymbol2.setState(LS_IDLE);
		
		//			this.numPicks++;
		//			sendFeaturePickMsg(this.numPicks, 0);
				break;
				
				case FS_PICK_RIGHT:
					if(this.numRounds == 2) {
						this.pickSymbol2.setPrize(this.prize_first,true);
 	
	     this.pickSymbol2.throwCoins.visible = true ;			
        this.pickSymbol1.throwCoins.visible = false ;						
						
					}
					else {
						this.pickSymbol2.setPrize(this.prize_second,false);
      this.pickSymbol2.throwCoins.visible = true ;			
      this.pickSymbol1.throwCoins.visible = false ;	 
				
					}
				// non-888	this.pickSymbol2.setState(LS_REVEAL_WAIT);
					
						this.pickSymbol2.setState(LS_REVEAL);
					this.pickSymbol1.setState(LS_IDLE); 
		//			this.numPicks++;
		//			sendFeaturePickMsg(this.numPicks, 1);
				break;
				
 		
				
				
				case FS_END:
					this.m_TriggerTimer = this.TRIGGER_TIMER_DELAY;
					sendFeatureEndMsg();		//TODO: PUT BACK IN
					this.inFeature = false; // we are done
					//game.account.addWin(game.slotResult.winAmount); //TODO: PUT BACK IN

                    game.manageFeatureEndState();

					break;
			}
		}
	};
	
	
	this.pickHistorySide = function(side)
	{
		if(side == 0) { // left
			if(this.numRounds == 2) {
				this.pickSymbol1.setPrize(this.prize_first,true);
			}
			else {
				this.pickSymbol1.setPrize(this.prize_second,false);
			}
			
			this.pickSymbol1.setState(LS_HISTORY_AMOUNT);
			this.pickSymbol1.setPrizePosition();
			this.pickSymbol2.setState(LS_HISTORY_IDLE);
//            this.pickSymbol1.throwCoins.time = 75*20;    
//			this.pickSymbol1.throwCoins.visible = true;			
//			this.pickSymbol1.throwCoins.play(0);

		} else {		// right		
			if(this.numRounds == 2) {
				this.pickSymbol2.setPrize(this.prize_first,true);
			}
			else {
				this.pickSymbol2.setPrize(this.prize_second,false);
			}
			
			this.pickSymbol1.setState(LS_HISTORY_IDLE);
			this.pickSymbol2.setPrizePosition();
			this.pickSymbol2.setState(LS_HISTORY_AMOUNT);
//            this.pickSymbol2.throwCoins.time = 75*20;    
//			this.pickSymbol2.throwCoins.visible = true;			
//			this.pickSymbol2.throwCoins.play(0);
		}
	}

	
	this.processClick = function(coords)
	{
		if(this.inFeature)
		{
			if(!this.ignoreInput)
			{
				if(this.pickSymbol1.button.isOver(coords))
				{
					this.pickSymbol1.button.isDown = true;
				//		playEffect('click');
					return;
				}
				if(this.pickSymbol2.button.isOver(coords))
				{
					this.pickSymbol2.button.isDown = true;
				//		playEffect('click');
					return;
				}
			}
		}
	};

	this.processClickRelease = function(coords)
	{
		if(this.inFeature)
		{
			if(this.state == FS_PICK)	// only listen to buttons in the PICK state
			{
				if(!this.ignoreInput)
				{
					if(this.pickSymbol1.button.isOver(coords) && this.pickSymbol1.button.isDown)
					{
		//				this.imageList[i].startAnim(true,0);
		//				this.currentPick = i;
		//				feature.currentPick = i;
						feature.ignoreInput = true;
			//			this.setState(FS_PICK_LEFT);
			
			//for 888			
					this.numPicks++;
                    sendFeaturePickMsg(this.numPicks, 0);		
						
						
						return;
					}
					if(this.pickSymbol2.button.isOver(coords) && this.pickSymbol2.button.isDown)
					{
		//				this.imageList[i].startAnim(true,0);
		//				this.currentPick = i;
		//				feature.currentPick = i;
						feature.ignoreInput = true;
			//			this.setState(FS_PICK_RIGHT);
					
					// for 888	
							this.numPicks++;
						sendFeaturePickMsg(this.numPicks, 1);	
						
						return;  
					}	
				}
			}
		}
	};

	this.buttonsUp = function()
	{
		if(this.inFeature)
		{
			this.pickSymbol1.button.isDown = false;
			this.pickSymbol2.button.isDown = false;
		}
	};
	
	this.update = function(timeDelta)
	{
       if(this.inFeature)
	  {
		this.pickSymbol1.update(timeDelta);
		this.pickSymbol2.update(timeDelta);

		switch(this.state)
		{
            case FS_INTRO:
//				this.timer = this.timer - timeDelta;
//			if(this.timer < 0)
//				{
//					this.timer = 0;
//					this.setState(FS_PICK);
//				}
				if(this.pickSymbol1.state == LS_PICK && this.pickSymbol2.state == LS_PICK)
				{
					this.setState(FS_PICK);
				}
			break;
			
			case FS_RECOVER:
                if(this.pickSymbol1.state == LS_FINISHED_ROUND || this.pickSymbol2.state == LS_FINISHED_ROUND)
                {
                    this.numRounds--;
                    if(this.numRounds == 0)
                    {
                        this.setState(FS_END);
                    } else {
                        this.setState(FS_INTRO);
                    }
                }
			break;
			
			case FS_PICK_LEFT:
				if(this.pickSymbol1.isRoundFinished())
				{
					this.numRounds--;
					if(this.numRounds == 0) // no second prize
					{
						//go to end of feature
                        this.setState(FS_END);
					}
					else
					{
						//go do the second pic
						this.setState(FS_INTRO);
					}
				}
			break;

			case FS_PICK_RIGHT:
				if(this.pickSymbol2.isRoundFinished())
				{
					this.numRounds--;
					if(this.numRounds == 0) // no second prize
					{
						//go to end of feature
                        this.setState(FS_END);
					}
					else
					{
						//go do the second pic
						this.setState(FS_INTRO);
					}
				}
			break;
		}
	  }
	};
	
	this.draw = function(ctx)
	{
		if(this.inFeature)
		{
			ctx.globalAlpha = 0.7;		// draw greyed out background
			ctx.fillStyle = '#404040';
			ctx.fillRect(feature.posX,feature.posY,feature.width,feature.height);
			ctx.globalAlpha = 1.0;
	 
			this.pickSymbol1.draw(ctx);
		 	this.pickSymbol2.draw(ctx);
		}
	};
	
	this.parsePrizes = function (values) {
        var val = values.split(";");
		this.setPickPositions(Number(val[3]), Number(val[4]));
		var numValues = Number(val[2]);
		if(numValues == 3)
		{
			this.setPrizes(Number(val[5]), 0);
		}
		else if(numValues == 4)
		{
			this.setPrizes(Number(val[5]), Number(val[6]));
		}
	};
	
	this.parseFPM = function (FPM) {
		this.FPM = [];
		var temp = null;
		if (FPM != "")
		{
			var aa = FPM.split("|")[0];
			temp = aa.split(";");	
		}
		for (var i = 0; i < temp.length; i++) 
		{
			if (temp[i] != "") 
			{
				this.FPM.push(Number(temp[i]));
			}
		}
	};
	
	this.animateWins = function () {
		var animationArray = [];
		if (game.slotResult.numWinningPaylines == 0)
		{
			for(var row = 0; row < 3; row++)
			{
				if(game.reelMan.reels[0].slots[row+1].currentSymbol == 0)
				{
					animationArray.push(row+1);
				}
				if(game.reelMan.reels[4].slots[row+1].currentSymbol == 0)
				{
					animationArray.push(row+1);
				}
			}
		}
		if (animationArray.length == 2) {
			game.reelMan.reels[0].startAnim(animationArray[0]);
			game.reelMan.reels[4].startAnim(animationArray[1]);
		}
	}
}




function InitFeatureAssets()
{
	game.ASSET_MANAGER.queueFiles([ 'symFeatureLoop.jpg','symFeatureCoin.png' ]);
}

// --------------------------------------------------------------------
// parse the GDM message from the server and convert it to a NextEdge slotResult
var processFeatureMsg = function(pairs)
{
 
	var result = new FeatureResult();
	result.clear();
	
	var winAmount   = 0;
	var winAmountFG = 0;
	var winType     = 0;
	var betPerLine  = 0;
	var linesBet    = 0;
	var numWinningPaylines = 0;
	var scatterWin         = 0;
	var freegameTrigger    = 0;
	var numFreeGames       = 0;
	var winningPaylines    = [];
	
	var winningPaylineIndexes   = [];
	var scatterBitfield         = 0;
	var winningPaylineBitfield  = [];
	var winningPaylineBitfield2 = [];

    var i;

	for(i=0;i < pairs.length; i++)
	{
		var pair = pairs[i].split("=");

		switch(pair[0])
		{
			case "B":	// balance
				game.account.newBalance = Number(pair[1]); //TODO: add updating of balance until after spin is complete
			break;
			
			case "BPL":
				betPerLine = Number(pair[1]);
			break;
			
			case "LB":
				linesBet = Number(pair[1]);
			break;
			
			case "RS":	// reel stops
			{
				result.stops = pair[1].split("|");
			}
			break;
			
			case "TW":	//total win
				winAmount = Number(pair[1]);
			break;
			
			case "FGTW":	//this free game total win
				winAmountFG = Number(pair[1]);
			break;
			
			case "WC":	// win count
			{
				var counts = pair[1].split("|");
				numWinningPaylines = Number(counts[0]);
				scatterWin = Number(counts[1]); 
				freegameTrigger = Number(counts[2]); 
			}
			break;

			case "WS":	
			
			// winning paylines - includes scatters, and feature triggers
				winningPaylines = pair[1].split("|");
			break;
			
			case "NFG":
				numFreeGames = Number(pair[1]);
			break;
		}
	}

	betAmount = betPerLine * linesBet;

	// calculate win type
	if(numWinningPaylines > 0)
	{
		if(0 < winAmount && winAmount <= (betAmount * 5))
		{
			winType |= WT_SMALL_WIN;
		}
		else if((betAmount * 5) < winAmount && winAmount <= (betAmount * 25))
		{
			winType |= WT_MEDIUM_WIN;
		}
		else if(winAmount > (betAmount * 25))
		{
			winType |= WT_LARGE_WIN;
		}
	}
	
	if(scatterWin)
	{
		winType |= WT_SCATTER_WIN;
	}

	if(freegameTrigger)
	{
		winType |= WT_FEATURE_TRIGGER;
	}

	if(scatterWin)	
	{
		result.numWinningPaylines = numWinningPaylines + 1;	// winning paylines + scatter
	}
	else	
	{
		result.numWinningPaylines = numWinningPaylines;		// winning paylines only
	}

	for(i = 0; i < winningPaylines.length - 1; i++)
	{
		var values = winningPaylines[i].split(";");
		var bitfield  = convertToBitfield(values[2],values[3],values[4],values[5],values[6]);
		var bitfield2 = 0;
		
		if(values[0] == -1)
			// scatter win
		{
			scatterBitfield = bitfield;
		}
		else	
		// regular payline win or feature trigger
		{
			if(values[0] != -2) // is not a feature trigger
			{
				winningPaylineIndexes.push(values[0]);		//payline index
				winningPaylineBitfield.push(bitfield);
				winningPaylineBitfield2.push(bitfield2);
			}
		}
	}

	if(scatterWin)
	{
		result.paylineWins.push({first:-1, second:scatterBitfield});	// symbols to flash
		result.paylineWins2.push({first:-1, second:scatterBitfield});	// symbols to animate
	}

	if(numWinningPaylines > 0)
	{
		for(i = 0; i < numWinningPaylines; i++)
		{
			result.paylineWins.push({first:winningPaylineIndexes[i], second:winningPaylineBitfield[i]});	
			// symbols to flash
			result.paylineWins2.push({first:winningPaylineIndexes[i], second:winningPaylineBitfield2[i]});	
			// symbols to animate
		}
	}

	result.linesBet     = linesBet;
	result.betPerLine   = betPerLine;
	result.numFreeGames = numFreeGames;
	result.winAmount    = winAmount;
	result.winType      = winType;
	result.bProcessed   = false;
	feature.ignoreInput = false;
	return result;
};
