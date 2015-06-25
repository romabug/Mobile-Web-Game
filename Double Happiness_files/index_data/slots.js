function SlotResult()
{
	this.winType = 0;
	this.winAmount = 0;
	this.currentWinAmount = 0;
	this.currentSpinWinAmount = 0; // The real value of "CW"
	this.numReels = 5;
	this.stops = new Array();
	this.numWinningPaylines = 0;
	this.numFreeGames = 0;
	this.freeGamesWon = 0;
	this.totalNumFreeGames = 0;
	this.bProcessed	  = true;
	this.betPerLine   = 0;
	this.linesBet     = 0;
	this.reelsBet     = 0;
	this.IFG		  = false;
	this.paylineWins  = new Array();
	this.paylineWins2 = new Array();
	this.winningPaylines = new Array();
	
	this.getFreeGamesLeft = function()
	{
		return this.numFreeGames;
	}
	
	this.clear = function()
	{
		this.winType = 0;
		this.winAmount = 0;
		this.currentWinAmount = 0;
		this.currentSpinWinAmount = 0;
		this.numReels = 5;
		this.numWinningPaylines = 0;
		this.numFreeGames = 0;
		this.freeGamesWon = 0;		
		this.totalNumFreeGames = 0;
		this.paylineWins.length = 0;
		this.paylineWins2.length = 0;
		this.bProcessed	 = true;
		this.IFG		  = false;
		this.winningPaylines.length = 0;
	}
};

//-----------------------------------------------
function Slot()
{
	this.currentSymbol = 0;
	this.L0sym = null;
	this.L1sym = null;
	this.L2sym = null;

	this.symbols   = new Array();
	this.L1symbols = new Array();
	this.L2symbols = new Array();
	
	this.symbolsToAnimate = new Array(); 	// This array is used when drawing the symbols 'false' in this array means the symbol should flash, and a 'true' means it should not flash because it animates.
	
	for(var i=0; i < symTextures.length; i++)
	{
		var a = new ngImage2(game.ASSET_MANAGER.getAsset(symTextures[i]));		// layer 0
		a.setAnimConfig(symSprites[i],symAnims[i]);
		if (typeof symAnimRate != "undefined") {
			if (symAnimRate[i] != null)
			{
				a.animRate = symAnimRate[i];
			}
		}
		
		this.symbols.push(a);
		
		var animateIt = false;
		if(symAnims[i].length > 1)  // see if there is more than 1 frame.
		{
			animateIt = true;
		}
		
		this.symbolsToAnimate.push(animateIt);

		var b = null;
		if( typeof symL1Textures != 'undefined' ) {		// layer 1
			if(symL1Textures[i] != null)
			{
				b = new ngImage2(game.ASSET_MANAGER.getAsset(symL1Textures[i]));
				b.setAnimConfig(symL1Sprites[i],symL1Anims[i]);
				if (typeof symL1AnimRate != "undefined") {
					if (symL1AnimRate[i] != null)
					{
						b.animRate = symL1AnimRate[i];
					}
				}
			}
		}
		this.L1symbols.push(b);
		
		var c = null;
		if( typeof symL2Textures != 'undefined' ) {		// layer 2
			if(symL2Textures[i] != null)
			{
				c = new ngImage2(game.ASSET_MANAGER.getAsset(symL2Textures[i]));
				c.setAnimConfig(symL2Sprites[i],symL2Anims[i]);
				if (typeof symL2AnimRate != "undefined") {
					if (symL2AnimRate[i] != null)
					{
						c.animRate = symL2AnimRate[i];
					}
				}
			}
		}
		this.L2symbols.push(c);
	}
	
	this.setSymbol = function(index)
	{
		this.currentSymbol 	= index;
		this.L0sym 	   		= this.symbols[index];
		this.L1sym         	= this.L1symbols[index]; 
		this.L2sym         	= this.L2symbols[index]; 
	}
	
	this.animates = function()
	{
		return this.symbolsToAnimate[this.currentSymbol];
	}
	
	this.draw = function(x,y)
	{
		this.L0sym.drawXY(x,y);
		
		if( this.L1sym != null) {
			this.L1sym.drawXY(x,y);
			
			if( this.L2sym != null) {
				this.L2sym.drawXY(x,y);
			}
		}
	}
	
/*	this.drawWithScale = function(x, y, zoomOffset)
	{
		ctx.save();
		
		//console.log((zoomOffset+symSprites[this.currentSymbol][0].w)+" "+(zoomOffset+symSprites[this.currentSymbol][0].h))
		ctx.translate(x + symSprites[this.currentSymbol][0].w/2, y + symSprites[this.currentSymbol][0].h/2);
		ctx.scale(1+ zoomOffset*2/symSprites[this.currentSymbol][0].w, 1+ zoomOffset*2/symSprites[this.currentSymbol][0].h);
		this.L0sym.drawXY(-symSprites[this.currentSymbol][0].w/2, -zoomOffset-symSprites[this.currentSymbol][0].w/2);
		ctx.restore();
	}
*/	
	this.update = function(deltaTime)
	{
		this.L0sym.update(deltaTime);
		
		if( this.L1sym != null) {
			this.L1sym.update(deltaTime);
			if( this.L2sym != null) {
				this.L2sym.update(deltaTime);
			}
		}
	}
	
	this.startAnim = function()
	{
		this.L0sym.startAnim(true,0);
		if( this.L1sym != null) {
			this.L1sym.startAnim(true,0);
			if( this.L2sym != null) {
				this.L2sym.startAnim(true,0);
			}
		}
	}
	
	this.stopAnim = function(reset)
	{
		for(var i=0; i < this.symbols.length; i++)
		{
			this.symbols[i].stopAnim(reset);
			if( this.L1sym != null) {
				this.L1sym.stopAnim(reset);
				if( this.L2sym != null) {
					this.L2sym.stopAnim(reset);
				}
			}
		}
	}
};

Slot.prototype.drawSpecialSymbolBG = function(x,y){};

function Reel(visibleRows)
{
	// reel state
	var RS_STOPPED  = 0;		
	var RS_STARTING = 1;
	var RS_SPINNING = 2;
	var RS_STOPPING = 3;
	
	var NUM_SLOTS   = visibleRows + 2; //The number of slots has to be increased by 2 to show part symbols at the top and bottom while the reel animates
	var REEL_SPEED  = 1;
	var WINDUP_TIME = 200.0;
	var BOUNCE_TIME = 400.0;
	
	var BIG_NUMBER = 99999999;

	this.state          = RS_STOPPED;
	this.symbolHeight   = 0;
	this.bounceOffset   = 0;
	this.reelSpeed      = 100.0;

	this.bounceTime	= 0;
	this.Yoffset = 0;

	this.crankOffset = 0.0;

//-------------------------------------------------------
	this.newY = 0;
	this.requestStop = false;
	this.currentPositionInReel = 0;
	this.targetStopIndex = 0;
//-------------------------------------------------------

	this.X = 0;
	this.Y = 0;

	this.bounceMultiple = 1;

	this.reelStrip = new Array();
	this.slotShow = new Array(NUM_SLOTS);
	this.slots = new Array(NUM_SLOTS);
	
	for(var i = 0; i < NUM_SLOTS; i++) 
	{
		this.slotShow[i] = true;
		this.slots[i]    = new Slot();
	}

	this.isStopped = function() { return this.state == RS_STOPPED; }

	this.init = function(symheight) {
		this.symbolHeight = symheight;
	}

	this.showSlot = function(show,slot)
	{
		this.slotShow[slot] = show;
	}

	this.setFastSpin = function(fast)
	{
		if(fast) {
			WINDUP_TIME = 2.0;
			BOUNCE_TIME = 4.0;
			this.reelSpeed = 0.001;
		}
		else {
			WINDUP_TIME = 200.0;
			BOUNCE_TIME = 400.0;
			this.reelSpeed = 100.0;
		}
	}
	
	this.setPosition = function(x,y) {
		this.X = x;
		this.Y = y;
	}
	
	this.setReelStrip = function(reelstrip) {
		this.reelStrip = reelstrip;
		if(this.currentPositionInReel >= this.reelStrip.length) {			
			//GK: 250313 - added check to prevent indexing into the reel incorrectly when reels are swapped. 
			this.currentPositionInReel = this.reelStrip.length-1;
		}
	}
	
	this.setReelBounceMultiple = function(multiple) {
		this.bounceMultiple = multiple;
	}
	
	this.setOnScreenSymbols = function(offset) {
		for(var i=0; i< NUM_SLOTS; i++) {
			this.slots[i].setSymbol(Number(this.slots[i].currentSymbol)+offset);
		}
	}
	
	this.setState = function(newState) 	{
		if(newState != this.state)			// if it really is a new state
		{
			this.state = newState;
			switch(this.state)				// execute state entry code once.
			{
			case RS_STOPPED:
				this.bounceOffset = 0;
				break;
	
			case RS_STARTING:
				this.reelPositionStop = BIG_NUMBER;
				this.bounceOffset = 0;
				this.bounceTime = 0;	
				break;
	
			case RS_SPINNING:
				this.bounceOffset = 0;
				break;
	
			case RS_STOPPING:
				this.bounceOffset = 0;
				this.bounceTime = 0;	
				break;
			}
		}
	}

	
	this.draw = function(clip)	{
		for(var i=0; i< NUM_SLOTS; i++)
		{
			if(this.slotShow[i] || this.slots[i].currentSymbol == 0 || this.slots[i].animates()  )  
			{
				switch(clip) {
					case 0:
						//Draw all symboles all the time
						this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);

					break;
					case 1:
						//Draw all symboles when reel is spinning
						if (this.state != RS_STOPPED) {
							this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
						}
					break;
					case 2:
						//Draw all symboles when reel is stop
						if (this.state == RS_STOPPED) {
							this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
						}
					break;
					case 3:
						//Draw "on reel" symboles all the time
						if (i > 0 && i < NUM_SLOTS-1) {
							this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
						}
					break;
					case 4:
						//Draw "on reel" symboles when reel is spinning
						if (this.state != RS_STOPPED) {
							if (i > 0 && i < NUM_SLOTS-1) {
								this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
							}
						}
					break;
					case 5:
						//Draw "on reel" symboles when reel is stop
						if (this.state == RS_STOPPED) {
							if (i > 0 && i < NUM_SLOTS-1) {
								this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
							}
						}
					break;
					case 6:
						//Draw all symboles when reel is spinning; draw "on reel" symboles when reel is stop
						if (this.state != RS_STOPPED) {
								this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
						} else if (this.state == RS_STOPPED) {
							if (i > 0 && i < NUM_SLOTS-1) {
								this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
							}
						}
					break;
					case 7:
						//Draw "on reel" symboles when reel is spinning; draw all symboles when reel is stop
						if (this.state != RS_STOPPED) {
							if (i > 0 && i < NUM_SLOTS-1) {
								this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
							}
						} else if (this.state == RS_STOPPED) {
							this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
						}
					break;
					case 8:
						//Draw nothing
					break;
				}
				/*if (clip && this.state != RS_STOPPED)		// draw this on the clipping pass and draw all the slots
				{
					this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
				}
				else if((!clip && this.state == RS_STOPPED) && i > 0 && i < NUM_SLOTS-1)	// draw this on the non-clipping pass and only draw the visible rows
				{
					this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
				}*/
			}
/*else
			{
				ctx.globalAlpha = 0.5;
				this.slots[i].draw(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
				ctx.globalAlpha = 1.0;
			}*/
		}
	}
	


 
	
		this.drawSpecialSymbolBG = function(clip) {
		for(var i=0; i< NUM_SLOTS; i++)
		{
			if(this.slotShow[i] || this.slots[i].currentSymbol == 0 || this.slots[i].animates()  )  
			{
				if (clip)		// draw this on the clipping pass and draw all the slots
				{
		 this.slots[i].drawSpecialSymbolBG(this.X,this.Y+(i*this.symbolHeight) + this.newY + this.bounceOffset);
				}
 			}
 		}
	}
	
 	
	
	
	this.update = function(deltaTime)
	{
		for(var i = 0; i < this.slots.length; i++)
		{
			this.slots[i].update(deltaTime);	 //Update any image animations.
		}
		switch(this.state)
		{	
		case RS_STOPPED:
			this.bounceOffset = this.crankOffset;
			break;		
			
		case RS_STARTING:
			{
				// we do not need to look up symbols as the starting bounce code only moves the reels a little
				// bit and new symbols are not substituted for each slot during this time.
				this.bounceTime += deltaTime;
	
				// calculating the upwards bounce to start reels spinning
				var angle      = 180.0 * this.bounceTime / WINDUP_TIME;
				this.bounceOffset = - Math.round( Math.sin(deg2rad(angle))  * 30.0 ) * this.bounceMultiple;
	
				if(this.bounceTime > WINDUP_TIME)	// half the sinusoid
				{

					if(this.currentPositionInReel >= this.reelStrip.length) {			//GK: 250313 - added check to prevent indexing into the reel incorrectly when reels are swapped. 
						this.currentPositionInReel = this.reelStrip.length-1;
					}
					
					this.setState(RS_SPINNING);
				}
			}
			break;
	
		case RS_SPINNING:
			{
				this.newY += (deltaTime/this.reelSpeed) * this.symbolHeight;
				this.newY = Math.floor(this.newY);
				if(this.newY >= this.symbolHeight)
				{
					
					this.newY = this.newY % this.symbolHeight;
					
					if(NUM_SLOTS > 5)
					{
						this.slots[5].setSymbol(this.slots[4].currentSymbol);							/////////////////////
					}
		  			this.slots[4].setSymbol(this.slots[3].currentSymbol);
		  			this.slots[3].setSymbol(this.slots[2].currentSymbol);
		  			this.slots[2].setSymbol(this.slots[1].currentSymbol);
		  			this.slots[1].setSymbol(this.slots[0].currentSymbol);
		  			this.slots[0].setSymbol(this.reelStrip[this.currentPositionInReel]);


		  			this.currentPositionInReel--;
					if(this.currentPositionInReel < 0)
					{
			  			this.currentPositionInReel = this.currentPositionInReel + this.reelStrip.length; 
					}

//					var temp1 = this.currentPositionInReel + 5;			//////////////////////////
					var temp1 = this.currentPositionInReel + 5; //NUM_SLOTS;			/////GK: 150313 - returned it back to 5 to fix reel spin
					
					
					temp1 = temp1 % this.reelStrip.length;
					
		  			if(this.requestStop && this.targetStopIndex == temp1 )
		  			{
		  				this.newY = 0;
						this.requestStop = false;
						
						// The following forces the correct symbols to be displayed no matter what.


						if(NUM_SLOTS > 5)		// 4 rows
						{
							var temp = this.targetStopIndex-4;
							var temp2 = temp;
							if(temp < 0) {
								temp = this.targetStopIndex-4 + this.reelStrip.length;
								temp2 = temp;
							}
							this.slots[0].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
							
							temp = this.targetStopIndex-3;
							if(temp < 0) {
								temp = this.targetStopIndex-3 + this.reelStrip.length;
							}
							this.slots[1].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
	
	
							temp = this.targetStopIndex-2;
							if(temp < 0) {
								temp = this.targetStopIndex-2 + this.reelStrip.length;
							}
							this.slots[2].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
	
							temp = this.targetStopIndex-1;
							if(temp < 0) {
								temp = this.targetStopIndex-1 + this.reelStrip.length;
							}
							this.slots[3].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
							
							
							this.slots[4].setSymbol(this.reelStrip[this.targetStopIndex % this.reelStrip.length]);
	
//							this.slots[5].setSymbol(this.reelStrip[this.targetStopIndex % this.reelStrip.length]);		////////////////////////
							this.slots[5].setSymbol(this.reelStrip[temp2 % this.reelStrip.length]);		////Just reusing the top hidden symbols////////////////////////
						}
						else					// 3 rows
						{
							var temp = this.targetStopIndex-4;
							if(temp < 0) {
								temp = this.targetStopIndex-4 + this.reelStrip.length;
							}
							this.slots[0].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
							
							temp = this.targetStopIndex-3;
							if(temp < 0) {
								temp = this.targetStopIndex-3 + this.reelStrip.length;
							}
							this.slots[1].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
	
	
							temp = this.targetStopIndex-2;
							if(temp < 0) {
								temp = this.targetStopIndex-2 + this.reelStrip.length;
							}
							this.slots[2].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
	
							temp = this.targetStopIndex-1;
							if(temp < 0) {
								temp = this.targetStopIndex-1 + this.reelStrip.length;
							}
							this.slots[3].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
							
							this.slots[4].setSymbol(this.reelStrip[this.targetStopIndex % this.reelStrip.length]);
						}

						this.setState(RS_STOPPING);	
					}
				}
			}
			break;
	
		case RS_STOPPING:
			{
				// we do not need to look up symbols as the ending bounce code only moves the reels a little
				// bit and new symbols are not substituted for each slot during this time.
				this.bounceTime += deltaTime;
	
				// stopping bounce function
				var angle      = 360.0 * this.bounceTime / BOUNCE_TIME;
	
				this.bounceOffset = -Math.round((Math.sin(deg2rad(-angle*0.5)) * 90.0) * (360.0/(360.0+(angle*5.0)))) * this.bounceMultiple;
	
				if(this.bounceTime > BOUNCE_TIME)
				{
					this.setState(RS_STOPPED);
				}
			}
			break;
		}
	}
	
	this.setReel = function(reelStop)
	{
		this.targetStopIndex = (reelStop + 2) % this.reelStrip.length;
		
if(NUM_SLOTS > 5)		// 4 rows
{
		var temp = this.targetStopIndex-4;
		if(temp < 0) {
			temp = this.targetStopIndex-4 + this.reelStrip.length;
		}
		this.slots[0].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
		
		temp = this.targetStopIndex-3;
		if(temp < 0) {
			temp = this.targetStopIndex-3 + this.reelStrip.length;
		}
		this.slots[1].setSymbol(this.reelStrip[temp % this.reelStrip.length]);


		temp = this.targetStopIndex-2;
		if(temp < 0) {
			temp = this.targetStopIndex-2 + this.reelStrip.length;
		}
		this.slots[2].setSymbol(this.reelStrip[temp % this.reelStrip.length]);

		temp = this.targetStopIndex-1;
		if(temp < 0) {
			temp = this.targetStopIndex-1 + this.reelStrip.length;
		}
		this.slots[3].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
		
		
		this.slots[4].setSymbol(this.reelStrip[this.targetStopIndex % this.reelStrip.length]);
		
		this.slots[5].setSymbol(this.reelStrip[this.targetStopIndex % this.reelStrip.length]);		///////////////////////////////////
}
else
{
		var temp = this.targetStopIndex-4;
		if(temp < 0) {
			temp = this.targetStopIndex-4 + this.reelStrip.length;
		}
		this.slots[0].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
		
		temp = this.targetStopIndex-3;
		if(temp < 0) {
			temp = this.targetStopIndex-3 + this.reelStrip.length;
		}
		this.slots[1].setSymbol(this.reelStrip[temp % this.reelStrip.length]);


		temp = this.targetStopIndex-2;
		if(temp < 0) {
			temp = this.targetStopIndex-2 + this.reelStrip.length;
		}
		this.slots[2].setSymbol(this.reelStrip[temp % this.reelStrip.length]);

		temp = this.targetStopIndex-1;
		if(temp < 0) {
			temp = this.targetStopIndex-1 + this.reelStrip.length;
		}
		this.slots[3].setSymbol(this.reelStrip[temp % this.reelStrip.length]);
		
		
		this.slots[4].setSymbol(this.reelStrip[this.targetStopIndex % this.reelStrip.length]);
}
		
		
	}
	
	
	this.startSpin = function()
	{
		if(this.state == RS_STOPPED)	// can only start spinning if stopped
		{
			this.setState(RS_STARTING);
		}
	}
	
	this.stopSpin = function(reelStop)
	{
		if(this.state == RS_STOPPED)	// can only stop if started
			return;

		this.requestStop     = true;	
		var newStop = Number(reelStop)+2;				//This +2 was added to position the stops correctly when going from GDM to nextedge
		newStop = newStop % this.reelStrip.length;
		
		this.targetStopIndex = newStop; 
		this.currentPositionInReel = (this.targetStopIndex + 2) % this.reelStrip.length;
	}
	
	this.startAnim = function(slot)
	{
		this.slots[slot].startAnim();
	}
	
	this.stopAllAnims = function()
	{
		for(var i = 0; i < NUM_SLOTS; i++)
		{
			this.slots[i].stopAnim(true);
		}
	}

};

//-------------------------------------------------------------------------
function ReelManager()
{
	var NUM_REELS = 5;
	var NUM_ROWS  = 3;
	if(arguments.length > 0)
	{
		NUM_ROWS = Number(arguments[0]);
	}
	
	var RM_STOPPED = 0;
	var RM_SPINNING = 1;
	var RM_STOPPING = 2;
	var RM_WAITING_TO_STOP = 3;
	
	var INITIAL_STOP_DELAY = 300;
	var REEL_STOP_DELAY    = 300;
	
	this.state = RM_STOPPED;
	
	this.X = 0;
	this.Y = 0;
	
	this.reelStopSaved = new Array(5);
	
	this.stoppingTime = 0;
	this.reelStopIndex = 0;
	this.reels = new Array(NUM_REELS);
	this.numReels = NUM_REELS;
	this.numRows  = NUM_ROWS;
	
	this.crankOffset = 0.0;
	
	this.setInitialReelStopDelay = function(delay) {
		INITIAL_STOP_DELAY = delay;
	}
	
	this.getInitialReelStopDelay = function() {
		return INITIAL_STOP_DELAY;
	}
	
	this.setReelStopDelay = function(delay) {
		REEL_STOP_DELAY = delay;
	}
	
	this.getReelStopDelay = function() {
		return REEL_STOP_DELAY;
	}
	
	for(var i = 0; i < NUM_REELS; i++) 	{
		this.reels[i] = new Reel(NUM_ROWS);
	}

	this.init = function(stops) {
		for(var i=0; i<NUM_REELS; i++)
		{
			this.reels[i].setReel(Number(stops[i]));
		}
	}
	
	this.setFastSpin = function(fast) {
		if(fast) {
			INITIAL_STOP_DELAY = 3;
			REEL_STOP_DELAY    = 3;
		}
		else {
			INITIAL_STOP_DELAY = 300;
			REEL_STOP_DELAY    = 300;
		}
		for(var i=0; i<NUM_REELS; i++) {
			this.reels[i].setFastSpin(fast);
		}
	}
	
	this.setPosition = function(x,y,symWidth,symHeight,reelGap) {
		this.X = x;
		this.Y = y;
		
		for(var i=0; i<NUM_REELS; i++)
		{
			this.reels[i].setPosition( x+(i*(symWidth+reelGap)), y );
			this.reels[i].init(symHeight);
		}
	}
	
	this.setReelStrip = function(reel,strip) {
		this.reels[reel].setReelStrip(strip);
	}
	
	this.setOnScreenSymbols = function(offset)
	{
		for(var i=0; i<NUM_REELS; i++) {
			this.reels[i].setOnScreenSymbols(offset);
		}
	}
	
	this.setReelBounceMultiple = function(multiple)
	{
		for(var i=0; i<NUM_REELS; i++)
		{
			this.reels[i].setReelBounceMultiple(multiple);
		}
	}

	this.isStopped = function() {
		return this.state == RM_STOPPED;
	}
	
	this.isReelManagerStopping = function() {
		if(this.state == RM_STOPPING){
			return true;	
		}else{
			return false;	
		}
	};
	
	this.draw = function(clip) 	{
		for(var i=0; i<NUM_REELS; i++)
		{
			this.reels[i].draw(clip);
			
		}
	}
	
	this.drawSpecialSymbolBG = function(clip)
	{
		for(var i=0; i<NUM_REELS; i++)
		{
			this.reels[i].drawSpecialSymbolBG(clip);	
 		}  
	}
	
	this.update = function(deltaTime)
	{
		switch(this.state)
		{
		case RM_SPINNING:				// Reels spin until it is time to stop
			this.stoppingTime += deltaTime;

			//Check m_SlotResult data received bit (m_bProcessed), and if set, can start slowing reels down
			if(this.stoppingTime > INITIAL_STOP_DELAY && !game.slotResult.bProcessed)   // TODO GK put back in
			{
				this.state         = RM_STOPPING;
				this.stoppingTime  = 0;
				this.reelStopIndex = 0;
				game.slotResult.bProcessed = true;  //Finished processing the results   // TODO GK put back in
			}
			break;
	
		case RM_STOPPING:			   // Reel stopping sequence
			this.crankOffset = 0;
			this.stoppingTime += deltaTime;
	
			if(this.stoppingTime >= REEL_STOP_DELAY)
			{
				//Reel stops come from m_SlotResult.
				
				this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);    

				this.stoppingTime = 0;
				this.reelStopIndex++;
				if(this.reelStopIndex >= this.numReels)
				{
					this.state = RM_WAITING_TO_STOP;
				}
			}
			break;
	
		case RM_WAITING_TO_STOP:		// Wait for last reel to stop.
			{
				var allStopped = true;
	
				for(var i = 0; i < NUM_REELS; i++)
				{
					if(!this.reels[i].isStopped())
					{
						allStopped = false;
						break;
					}
				}
	
				if(allStopped)
				{
					this.state = RM_STOPPED;
				}
			}
			break;
		}
	
		for(var i=0; i<NUM_REELS; i++)
		{
			this.reels[i].update(deltaTime);
			this.reels[i].crankOffset = this.crankOffset;
		}
	}
	
	this.startReels = function()
	{
		if(this.state == RM_STOPPED)
		{
			for(var i = 0; i < NUM_REELS; i++)
			{
				this.reels[i].startSpin();
			}
			this.state        = RM_SPINNING;
			this.stoppingTime = 0;
		}
	}	
	
	
//------------------------------------------------------------------
/**
 * Shows/hides the appropriate symbols specified in the bitfield. 
 * The LSB of the bitfield is the TLC of the slot display
 * slot display
 *  1  2  3  4  5
 *  6  7  8  9 10
 * 11 12 13 14 15
 * numbers represent bit numbers in the bit field.
 * \param show - Whether to show or hide the specified symbols in the bitfield.
 * \param bitfield - The bitfield representing the symbols.
 */
//------------------------------------------------------------------
	this.showSymbols = function(show,bitfield)
	{
		var bits = bitfield;
		for(var row = 0; row < NUM_ROWS; row++)
		{
			for(var i = 0; i < NUM_REELS; i++)
			{
				if(bits & 0x00000001)
				{
					this.reels[i].showSlot(show,row + 1); // +1 added because the first visible slot is 1
				}
				bits = bits>>1;
			}
		}
	}
	
	this.animateWins = function()
	{
		// We OR all the winning payline bitfields together so that we can turn on the animations
		// for all the winning symbols.
		var bitfield = 0;
	
		for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
		{
			bitfield |= game.slotResult.paylineWins[payline].second;
		}
	
		// now we tell each reel to animate the appropriate symbols.
		for(var row = 0; row < NUM_ROWS; row++)
		{
			for(var i = 0; i < NUM_REELS; i++)
			{
				if(bitfield & 0x00000001)
				{
					this.reels[i].startAnim(row + 1);	// +1 added because the first visible slot is 1
				}
				bitfield = bitfield>>1;
			}
		}
	}	
	
	this.stopAnims = function()
	{
		for(var i = 0; i < NUM_REELS; i++)
		{
			this.reels[i].stopAllAnims();
		}
	}
};



//--------------------------------------------------------
function Payline(x,y,colour, points)
{
	this.X = x;
	this.Y = y;
	
	this.disabled = false;
	this.colour = colour;
	this.points = points;
	this.show   = false;
	
	this.update = function(deltaTime)
	{
	}
	
	this.showLine = function(bShow)
	{
		this.show = bShow;
	}

	this.disable = function(bDisable)
	{
		this.disabled = bDisable;
	}
	
	this.draw = function() 
	{
		if(this.show)
		{
			var len = this.points.length;
			if(len >= 2)
			{
				ctx.lineWidth = 7;
				ctx.strokeStyle = "rgb(0,0,0)";
				ctx.lineJoin = 'round';
				ctx.beginPath();
				ctx.moveTo(this.points[0].x+this.X,this.points[0].y+this.Y);
				for(var i = 1; i < len; i++)
				{
					ctx.lineTo(this.points[i].x+this.X,this.points[i].y+this.Y);
				}
				ctx.stroke();
			
				ctx.lineWidth = 5;
				ctx.strokeStyle = this.colour;
				ctx.beginPath();
				ctx.moveTo(this.points[0].x+this.X,this.points[0].y+this.Y);
				for(var i = 1; i < len; i++)
				{
					ctx.lineTo(this.points[i].x+this.X,this.points[i].y+this.Y);
				}
				ctx.stroke();
			}
		}
	}
};



function CFreeGames()
{
	this.RESPIN_TIMER_DELAY = 1500;
    this.TRIGGER_TIMER_DELAY = 5000;

	this.m_bInFreeGames = false;
	this.m_NumFreeGamesAwarded = 0;
	this.m_NumGamesLeft = 0;
	this.m_BetAmount = 0;
	this.m_WinAccumulatedTotal = 0;

    this.m_TriggerTimer = this.TRIGGER_TIMER_DELAY;
	this.m_RespinTimer  = this.RESPIN_TIMER_DELAY;

	this.SetFreeSpins = function(count)
	{
		this.m_NumGamesLeft = count;
	}
	
	this.DecFreeSpins = function()
	{
		if(this.m_NumGamesLeft > 0)
		{
			this.m_NumGamesLeft--;
		}
		return this.m_NumGamesLeft;
	}
};


function createPaylineVectors(  paylineShapes, 
							    paylinePointModifier, 
							    paylineEndPositions, 
								paylineEndWidth, 
								paylineEndHeight, 
								REELS, 
								payLineEndsLeft, 
								payLineEndsRight, 
								reelGap, 
								symbolWidth,  
								symbolHeight  )
	{
		var paylines = new Array();
		
		for(var i = 0; i <paylineShapes.length; i++)	// for each of the paylines
		{
			var vector = new Array(8);

			var x,y;
			
			if(paylineEndPositions[i][0].x == 0)		// on the left hand side so draw the vector from right to left
			{
				x = paylineEndWidth - (REELS.x - payLineEndsLeft.x);;
				y = paylineEndPositions[i][0].y + (paylineEndHeight / 2) - (REELS.y - payLineEndsLeft.y);
				
				vector[0] = {x:x,y:y};	// vector start
				vector[1] = {x:x+20,y:y};	// vector start
							
				for(var j=0; j < paylineShapes[i].length; j++)	// for each of the reels
				{
					vector[j+2] = {x:((symbolWidth + reelGap)*j) + (symbolWidth/2) ,y: (symbolHeight * paylineShapes[i][j]) + (symbolHeight/2) };
				}
					
				vector[7] = {x:(symbolWidth+reelGap)*5 ,y:vector[6].y};    // vector end
					
				for(var j=0; j < paylineShapes[i].length; j++)	// for each of the reels
				{
					switch(paylinePointModifier[i][j])
					{
						case 1:
							vector[j+2].y = y;
						break;

						case 2:
							if(j<4) {
								if(paylinePointModifier[i][j+1] == 1) {
									vector[j+2] = {x: (vector[j+1].x + vector[j+3].x)/2 ,y: (vector[j+1].y + y)/2 };
								} else {
									vector[j+2] = {x: (vector[j+1].x + vector[j+3].x)/2 ,y: (vector[j+1].y + vector[j+3].y)/2 };
								}
							} else {
								vector[j+2] = {x: (vector[j+1].x + vector[j+3].x)/2 ,y: (vector[j+1].y + vector[j+3].y)/2 };
							}
						break;
					}
				}
				vector[7] = {x:paylineEndPositions[i].length>1?payLineEndsRight.x - REELS.x:symbolWidth*5+reelGap*4 ,y:vector[6].y};    // vector end
			}
			else		// on the right hand side so draw the vector from right to left
			{
				x = payLineEndsRight.x - REELS.x;
				y = paylineEndPositions[i][0].y + (paylineEndHeight / 2) - (REELS.y - payLineEndsRight.y);
				
				vector[0] = {x:x,y:y}; // vector start
				vector[1] = {x:x-20,y:y}; // vector start
							
				for(var j = 0; j < paylineShapes[i].length; j++)	// for each of the reels
				{
					vector[j+2] = {x:((symbolWidth + reelGap)*(4-j)) + (symbolWidth/2) ,y: (symbolHeight * paylineShapes[i][4-j]) + (symbolHeight/2) };
				}
				
				vector[7] = {x:0 ,y:vector[6].y};  // vector end
				
				for(var j=0; j < paylineShapes[i].length; j++)	// for each of the reels
				{
					switch(paylinePointModifier[i][j])
					{
						case 1:
							vector[j+2].y = y;
						break;

						case 2:
							vector[j+2] = {x: (vector[j+1].x + vector[j+3].x)/2 ,y: (vector[j+1].y + vector[j+3].y)/2 };
						break;
					}
				}
				vector[7] = {x:0 ,y:vector[6].y};  // vector end
				
			}
			
			paylines.push(vector);
		}
		
		return paylines;
	}


