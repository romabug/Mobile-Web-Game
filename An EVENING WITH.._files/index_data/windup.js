
//////////////////////////////////////////////////
function  HideSpecialSymbol (reel, sym, alp) 
{
	for ( var c =0; c <4; c ++)
	{
		game.reelMan.reels[reel].slots[c].symbols[sym].alpha = [alp];
	}  
};

var middlePlayed = false;
var reelStops = [1,1,1,1,1];
var srs = 0;
var wildplaying = 0;
reelManagerUpdate = function(deltaTime) 
{
    var RM_STOPPED = 0;
	var RM_SPINNING = 1;
    var RM_STOPPING = 2;
    var RM_WAITING_TO_STOP = 3;
	var SPIN_DELAY = 300;
	var windup = false;
 
	var myswitch = false;
    var i;
	var w;

    for(i=0; i<5; i++)
	{  
        var r = this.reels[i];

        if (game.reelMan.reels[i].state == 3)
		{
			if(i==4 && KissSym[0] >=0 && game.freeGames.m_bInFreeGames)
			{
				//console.log(">>>>>>> grow kiss!!!");
				if (growKiss.time > 1  ) 
				{
                	growKiss.visible = true;
				} 
			    else if(growKiss.time <= 0)
			   	{
					growKiss.x = game.layout.REELS.x  + 4 * (game.layout.symbolWidth + game.layout.reelGap );
					growKiss.y = game.layout.REELS.y +  r.bounceOffset   + KissSym[0]* game.layout.symbolWidth;
						
					growKiss.setTarget(KissSym[0]);
		   			growKiss.play(0);   
					game.playSound("kisssrs"); 
				}
 			}
			
			/*if(i < 5 && this.reelStopIndex-1 != HR_HL[2] && this.reelStopIndex-1 != HR_HL[1] && isRespin && !fadeinout)
			{
					//setTimeout(function()
					//{
						console.log(">>>>>>> Windup Sound C");
                        game.playSound("windup");
                   // }, 700);
			}
			//console.log(">>>>>>> Windup Output i = "+i+" this.reelStopIndex "+(this.reelStopIndex-1)+" HR_HL[2] "+HR_HL[2]+" HR_HL[1] "+HR_HL[1]+" fadeinout "+fadeinout);*/
				
			//if ( scatterReels[i] >= 0 && (4-i + getScattersCountBeforeReel(i)) >= 0   )  
			if (scatterReels[i] >= 0 && (5-i + getScattersCountBeforeReel(i) >= 2) )        
			{ 
				if (growSymbols[i].time > 30)
				{
					growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
					growSymbols[i].visible = true;
 					  
					if( isRespin ) 
					{
						growSymbols[HR_HL[1]].visible = false;
						growSymbols[HR_HL[2]].visible = false;
					}
 					// May be a problem  	
					// HideSpecialSymbol (i, 13, 0); 
				}
				else if (growSymbols[i].time <= 0)
				{
                	growSymbols[i].play(0);
					// console.log("growSymbols[i].time <= 0" ) ;
					//if(!isRespin){
					if(i != HR_HL[2] && i != HR_HL[1] && isRespin){
						srs++;
						game.playSound("srs"+(srs));
						//console.log(">>>>> SRS "+srs+" played Respin");
					} else if(!isRespin){
						srs++;
						game.playSound("srs"+(srs));
						//console.log(">>>>> SRS "+srs+" played nonRespin");
					}
                }
            }
        }
		else if (game.reelMan.reels[i].state == 0 /*&& !game.freeGames.m_bInFreeGames*/) 
		{
			var myreel = i;
		 	if(RIA_HL == 0 ) 
	      	{
				//RIA_HL = null;
 				for(var k = 0; k < wildreel.length; k++)
				{  
			    	var member = wildreel[k];
					if( SSS_HL != null && myreel == member +1  && mywild[member].time <=0 )//
					{   
 			   	    	var mypos = Number(SSS_HL[k].split(";")[1]) ;
						//console.log(">>>>>> broken WILD");

						if(!mywild[member].played){
 				    	mywild[member].init(mypos);  //mypos
 				    	hulaWildMovie.init(member);	
						}
 				   	} 
				}
			}
			else if(RIA_HL ==4) 
			{
		 		for(var k = 0; k < wildreel.length; k++)
		   		{  
		     		var member = wildreel[k];
  
				  	if( SSS_HL != null && myreel == member +1  && mywild[member].time <=0 )
					{   
						var mypos = Number(SSS_HL[k].split(";")[1]) ;
						
						if(member == 1 && member != null && !middlePlayed)
						{
					   		mywild[1].init(0); //STOP FROM PLAYING TWICE!!
							hulaWildMovie.init(1);
							middlePlayed = true;
							//console.log(">>>>>> broken WILD 2"); 
						}
					} 
				}
 			}
		 	else if( RIA_HL ==1 || RIA_HL ==2 ) 
			{
				for(var k = 0; k < wildreel.length; k++)
				{  
					var member = wildreel[k];
  
					if( SSS_HL != null && myreel == member +1  && mywild[member].time <=0 )
					{   
						var mypos = Number(SSS_HL[k].split(";")[1]) ;
						
						if(member != specialhide && !middlePlayed)
						{
					   		mywild[member].init(mypos);
							hulaWildMovie.init(member);
							middlePlayed = true; 
							//console.log(">>>>>> broken WILD 3");
						}  
					} 
				}   
			};
	
			if(myreel ==4)
			{   
				SSS_HL = null;  
			}; 
			
			if (reelStops[i] != 1)
			{
				//console.log(">>>>>>> Windup Sound A - i  = "+i);
                reelStops[i] = 1;
                if (i < 4 && getScattersCountBeforeReel(i+1) >= 2 && !isRespin && !fadeinout) 
				{
					//console.log(">>>>>>> Windup Sound B");
                    setTimeout(function()
					{
						
                        game.playSound("windup");
                    }, 700);
                }
				else if(i < 4 && this.reelStopIndex != HR_HL[2] && this.reelStopIndex != HR_HL[1] && isRespin && !fadeinout)
				{
					//setTimeout(function()
					//{
						//console.log(">>>>>>> Windup Sound C");
                        game.playSound("windup");
                   // }, 700);
				}
				//console.log(">>>>>>> Windup Output i = "+i+" this.reelStopIndex "+(this.reelStopIndex-1)+" HR_HL[2] "+HR_HL[2]+" HR_HL[1] "+HR_HL[1]+" fadeinout "+fadeinout);
            }
			
			
            growSymbols[i].stop(0);
            growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;
        }
    }; //for	
	
	//// HOLLY FADE IN OUT	
	if(fadeinout ==1)
	{
		for (f = 0; f < 5; f++) 
		{
 			game.reelMan.reels[f].reelSpeed = 85;
		}    
		
		switch (this.state)
		{
        	case RM_SPINNING:
				this.stoppingTime += deltaTime;
				if (this.stoppingTime > 3000 && !game.slotResult.bProcessed)
				{
                    this.state = RM_STOPPING;
                    this.stoppingTime = 0;
                    this.reelStopIndex = 0;
                    game.slotResult.bProcessed = true;
                }

                for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            break;
			case RM_STOPPING:

	     	//---------    
			 	//if(HLalpha < 0.8) { //NOTE -  ENABLE WHIZBY FOR WHEN Holly appears
				if(isRespin)
				{	 
					this.crankOffset = 0;
					SPIN_DELAY = 350;
						for(w = 0; w < 5; w++) //this.reelStopIndex
						{
						//if(this.reelStopIndex == 0)console.log(">>>> RM_STOPPING  w = "+w+" this.reelStopIndex "+this.reelStopIndex);
							if (this.reels[w].slots[1].currentSymbol >= 13 && this.reels[w].slots[1].currentSymbol <= 15)
							{
								//console.log(">>>> RM_STOPPING  w = "+w+" & this.reelStopIndex-1$ = "+(this.reelStopIndex-1));
								if (w == this.reelStopIndex-1 && w != HR_HL[2] && w != HR_HL[1])
								{
									if(scatterReels[w] != -1 && !this.reels[this.reelStopIndex-1].isStopped()){
										playWhizBy(w, scatterReels[w]);
										//console.log(">>>>>    START WHIZBY scatterReels ######% $"+w);
									}
									else
									{
										if(!this.reels[w].isStopped())
										{
											playWhizBy(w, 2); //bug here preset with stop 38;24;17;13;36
											//console.log(">>>>>    START WHIZBY scatterReels ****&&^^$ "+w);
										}
									}
								} 
								else if(w != HR_HL[2] && w != HR_HL[1])
								{
									if (!this.reels[w].isStopped())
									{
										playWhizBy(w, 2);
										//console.log(">>>>>    START WHIZBY !2! @@@@$ - "+w);
									}
								}
							}
						}
				}
				else
				{
					if(getScattersCountBeforeReel(this.reelStopIndex) >= 2)
					{
						this.crankOffset = 0;
						SPIN_DELAY = 350;
						if(this.reels[this.reelStopIndex-2].isStopped()) 
						{
							//windup = true;
							fgbg.showbg(true);	
						}
						
						for(w = 0; w < 5; w++) 
						{
							if (this.reels[w].slots[1].currentSymbol >= 13 && this.reels[w].slots[1].currentSymbol <= 15 && windup)
							{
								if (w == this.reelStopIndex-1)
								{
									if(scatterReels[w] != -1)playWhizBy(w, scatterReels[w]);
									else playWhizBy(w, 2);
									//console.log(">>>>>    START WHIZBY scatterReels "+w);
								} 
								else if(w != HR_HL[2] && w != HR_HL[1])
								{
									if (!this.reels[w].isStopped())
									{
										playWhizBy(w, 2);
										//playWhizBy(w, scatterReels[this.reelStopIndex-1]);
										//console.log(">>>>>    START WHIZBY !2! - "+w);
									}
								}
						 	}
						}	
					}	
				}
				// };		
 			//--------------	
				this.crankOffset = 0;
				this.stoppingTime += deltaTime;
				var SPIN_TIME = 400;
				if(getScattersCountBeforeReel(this.reelStopIndex) >= 2)SPIN_TIME = 1000;
	
				if (this.stoppingTime >= SPIN_TIME) //350
				{
					this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
					this.stoppingTime = 0;
					this.reelStopIndex++;
					if (this.reelStopIndex >= this.numReels)
					{
						this.state = RM_WAITING_TO_STOP;
					}
				}
				for (i = 0; i < 5; i++)
				{
					this.reels[i].update(deltaTime);
					this.reels[i].crankOffset = this.crankOffset;
				}
				return;
			break;
			case RM_WAITING_TO_STOP:
            {
				if(getScattersCountBeforeReel(this.reelStopIndex) >= 0){
					//console.log(">>>>>>> getScattersCountBeforeReel(this.reelStopIndex) = "+getScattersCountBeforeReel(this.reelStopIndex-1));
					//console.log(">>>>>>> this.reelStopIndex = "+this.reelStopIndex);
                    for(w = 0; w < 5; w++) {
                        if (this.reels[w].slots[1].currentSymbol >= 13 && this.reels[w].slots[1].currentSymbol <= 15){
							//console.log(">>>> RM_WAITING_TO_STOP  w = "+w+" & this.reelStopIndex = "+this.reelStopIndex);
                            //if (w == this.reelStopIndex && scatterReels[w] != -1 && w != HR_HL[2] && w != HR_HL[1]){ //check here if there is only one scatter behind me
							if (w == this.reelStopIndex-1 && w != HR_HL[2] && w != HR_HL[1]){
								if(scatterReels[w] != -1)playWhizBy(w, scatterReels[w]);
								else playWhizBy(w, 2);
                                //playWhizBy(w, scatterReels[w]);
								//game.playSound('whizby');
								//console.log(">>>>> A!!!! playing whizby "+w);
                            }
                        }
                    }
                }
				
                 var allStopped = true;
                 for (i = 0; i < 5; i++) 
				 {
                    if (!this.reels[i].isStopped())
					{
                        allStopped = false;
                        break;
                    }
                }
       			if (allStopped) 
				{
  					if( getScattersCountBeforeReel(5) >= 2 && fgbg.time <=0 )
			  		{   
						fgbg.showbg(true);
					}
					this.state = 0;
					fadeinout  =0; 
                }
                for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;
        }
	} 	

	/////  respin  /////////////
	else if(isRespin)
	{
		for (var z = 0; z < 5; z++) 
		{
 			game.reelMan.reels[z].reelSpeed = 90;
      	}    
		
		switch (this.state) 
		{
        	case RM_SPINNING:
				this.stoppingTime += deltaTime;
				if (this.stoppingTime > 1000 && !game.slotResult.bProcessed)
				{
                    this.state = RM_STOPPING;
                    this.stoppingTime = 0;
                    this.reelStopIndex = 0;
                    game.slotResult.bProcessed = true;
                }

                for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            break;
        	case RM_STOPPING:
				this.crankOffset = 0;
					SPIN_DELAY = 1000;
	
					for(w = 0; w < 5; w++) //this.reelStopIndex
					{
						//if(this.reelStopIndex == 0)console.log(">>>> RM_STOPPING  w = "+w+" this.reelStopIndex "+this.reelStopIndex);
						if (this.reels[w].slots[1].currentSymbol >= 13 && this.reels[w].slots[1].currentSymbol <= 15)
						{
							//console.log(">>>> RM_STOPPING  w = "+w+" & this.reelStopIndex-1 = "+(this.reelStopIndex-1));
							if (w == this.reelStopIndex-1 && w != HR_HL[2] && w != HR_HL[1])
							{
								if(scatterReels[w] != -1 && !this.reels[this.reelStopIndex-1].isStopped()){
									playWhizBy(w, scatterReels[w]);
									//console.log(">>>>>    START WHIZBY scatterReels ######% "+w);
								}
								else
								{
									if(!this.reels[w].isStopped())
									{
										playWhizBy(w, 2); //bug here preset with stop 38;24;17;13;36
										//console.log(">>>>>    START WHIZBY scatterReels ****&&^^ "+w);
									}
								}
							} 
							else if(w != HR_HL[2] && w != HR_HL[1])
							{
								if (!this.reels[w].isStopped())
								{
									playWhizBy(w, 2);
									//console.log(">>>>>    START WHIZBY !2! @@@@ - "+w);
								}
							}
						}
					}
		   
					this.crankOffset = 0;
					this.stoppingTime += deltaTime;
					
					if (this.stoppingTime >= 1500)
					{
						this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
						this.stoppingTime = 0;
						this.reelStopIndex++;
						if (this.reelStopIndex >= this.numReels)
						{
							this.state = RM_WAITING_TO_STOP;
						}
					}
					for (i = 0; i < 5; i++)
					{
						this.reels[i].update(deltaTime);
						this.reels[i].crankOffset = this.crankOffset;
					}
					return;
				//}
            break;
			case RM_WAITING_TO_STOP: //last reel stop
            {
				if(getScattersCountBeforeReel(this.reelStopIndex) >= 0){
                    for(w = 0; w < 5; w++) {
                        if (this.reels[w].slots[1].currentSymbol >= 13 && this.reels[w].slots[1].currentSymbol <= 15){
							//console.log(">>>> RM_WAITING_TO_STOP  w = "+w+" & this.reelStopIndex = "+this.reelStopIndex);
                            //if (w == this.reelStopIndex && scatterReels[w] != -1 && w != HR_HL[2] && w != HR_HL[1]){ //check here if there is only one scatter behind me
							if (w == this.reelStopIndex-1 && w != HR_HL[2] && w != HR_HL[1]){
								if(scatterReels[w] != -1)playWhizBy(w, scatterReels[w]);
								else playWhizBy(w, 2);
								//console.log(">>>>> A!!!! playing whizby "+w);
                            }
                        }
                    }
                }
				
                 var allStopped = true;
                 for (i = 0; i < 5; i++) {
                    if (!this.reels[i].isStopped()) {
                        allStopped = false;
                        break;
                    }
                }

                if (allStopped) {
                    this.state = 0;
					if(game.slotResult.totalNumFreeGames != 1 ){
						setTimeout( function(){ game.playSound('freeloop') }, 800);
					};
                }

                for (i = 0; i < 5; i++) {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
			
                return;
            }
            break;
        }
	} 	

	///////// normal ////////////////
	else if(fadeinout == 0)
	{
		for (var c = 0; c < 5; c++) 
 		game.reelMan.reels[c].reelSpeed = 100;
		
		switch(this.state)
    	{
        case RM_STOPPING:
			this.crankOffset = 0;
           // this.stoppingTime += deltaTime;
			SPIN_DELAY = 350;
           if(getScattersCountBeforeReel(this.reelStopIndex) >= 2)
		   {
			//- If previous reel is stopped
				if(this.reels[this.reelStopIndex-2].isStopped()) 
				{
                   	windup = true;
					fgbg.showbg(true);	
               	}
				SPIN_DELAY = 2500;

               /*for(w = this.reelStopIndex-1; w < 5; w++) {
                    if (this.reels[w].slots[0].currentSymbol >= 13 && this.reels[w].slots[0].currentSymbol <= 15 && windup){ // && windup
                        if (w == this.reelStopIndex-1){
                           	playWhizBy(w, scatterReels[w]);
							//game.playSound('whizby');
							console.log(">>>>> A* playing whizby "+w);
                        } else {
								playWhizBy(w, 2);
								//game.playSound('whizby');
								console.log(">>>>> B* playing whizby "+w);
                        }
                    }
                }*/
				for(w = 0; w < 5; w++) {
					 if (this.reels[w].slots[1].currentSymbol >= 13 && this.reels[w].slots[1].currentSymbol <= 15 && windup){
						if (w == this.reelStopIndex-1){
								if(scatterReels[w] != -1 && !this.reels[w].isStopped())playWhizBy(w, scatterReels[w]);
								else if(!this.reels[w].isStopped())playWhizBy(w, 2);
								//console.log(">>>>>    START WHIZBY scatterReels "+w);
							} 
							else if(w != HR_HL[2] && w != HR_HL[1])
							{
								if (!this.reels[w].isStopped())
								{
									playWhizBy(w, 2);
									//playWhizBy(w, scatterReels[this.reelStopIndex-1]);
									//console.log(">>>>>    START WHIZBY !2! - "+w);
								}
							
							}
					 }
				}

                this.crankOffset = 0;
                this.stoppingTime += deltaTime;

                //- Increase stop time for windable reel
                if(this.stoppingTime >= 3200){ //2800
                    //Reel stops come from m_SlotResult.
                    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);

                    this.stoppingTime = 0;
                    this.reelStopIndex++;
                    if(this.reelStopIndex >= this.numReels){
                        this.state = RM_WAITING_TO_STOP;
                    }
                }

                for(i=0; i<5; i++){
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            } 
			else if(  getScattersCountBeforeReel(this.reelStopIndex) > 0 && (scatterReels[this.reelStopIndex] >= 0 && (4-this.reelStopIndex + getScattersCountBeforeReel(this.reelStopIndex)) >= 2)  && !game.freeGames.m_bInFreeGames)
			{
                this.crankOffset = 0;
                this.stoppingTime += deltaTime;

                if(this.stoppingTime >= SPIN_DELAY)
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

                for(i=0; i<5; i++){
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;

        	case RM_WAITING_TO_STOP:
            {
                if(getScattersCountBeforeReel(this.reelStopIndex-1) >= 2){
					//console.log(">>>>>>> getScattersCountBeforeReel(this.reelStopIndex) = "+getScattersCountBeforeReel(this.reelStopIndex-1));
					//console.log(">>>>>>> this.reelStopIndex = "+this.reelStopIndex);
                    for(w = this.reelStopIndex-1; w < 5; w++) {
                        if (this.reels[w].slots[1].currentSymbol >= 13 && this.reels[w].slots[1].currentSymbol <= 15){
                            if (w == this.reelStopIndex-1 && scatterReels[w] != -1){ //check here if there is only one scatter behind me
                                playWhizBy(w, scatterReels[w]);
								//game.playSound('whizby');
								//console.log(">>>>> A!!!! playing whizby "+w);
                            } else {
                                playWhizBy(w, 2);
								//game.playSound('whizby');
								//console.log(">>>>> B playing whizby "+w);
                            }
                        }
                    }
                }

                var allStopped = true;

                for(i = 0; i < 5; i++){
                    if(!this.reels[i].isStopped()){
                        allStopped = false;
                        break;
                    }
                }

                if(allStopped){
                    this.state = 0;
					if(getScattersCountBeforeReel(5) >= 2)fgbg.showbg(true);
                }

                for(i=0; i<5; i++){
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;
		}
	}
	overridenFunctions.updateReelManager.call(this, deltaTime);
};

function greyOutSymbols(value) {

    if (greyOutState == value) return;
    greyOutState = value;

    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            for(var s = 0; s < 22; s++){
                var sym = game.reelMan.reels[i].slots[j].symbols[s];
                if (value && s != 13 && s != 14 && s != 15 ) {
                   sym.alpha = [1];
                } else {
                   sym.alpha = [1];
                }
            }
        }
    }
};

function getScattersCountBeforeReel(reel){
    var result = 0;
    for (var i = 0; i < reel; ++i)
	{
        if (scatterReels[i] >= 0)
		{
            result++;
        }
    }
	//console.log(">>>>>>>> scatterReels[] = "+scatterReels);
    return result;
};

function GrowSymbol()
{
    var dt = 75;
    AF.Movie.call(this, 6*dt);

    var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'),15);
    sprite.frame = 13;
    this.addChild(sprite);  
 
 	var scaleTo = 1.55;
    var dx = -35;//game.layout.symbolWidth * (scaleTo - 1) * 0.5; 
    var dy = -35;//game.layout.symbolHeight * (scaleTo - 1) * 0.5 ;
 
	this.addTween(new AF.Tween(sprite, "scaleX", 1).set(0, 1).set(2*dt, scaleTo).set(5*dt, 1));
	this.addTween(new AF.Tween(sprite, "scaleY", 1).set(0, 1).set(2*dt, scaleTo).set(5*dt, 1));

	this.addTween(new AF.Tween(sprite, "x", 0).set(0, 0).set(2*dt, dx).set(5*dt, 0));
	this.addTween(new AF.Tween(sprite, "y", 0).set(0, 0).set(2*dt, dy).set(5*dt, 0));
 
 
    this.addAction(function(){
 		
	this.stop(0);
    this.visible= false;	
 		
    }, 6*dt -1);
 	
};
GrowSymbol.prototype = new AF.Movie();


