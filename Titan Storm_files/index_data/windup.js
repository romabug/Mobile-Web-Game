var playcount = -1;
function GrowSymbol()
{
	
var t = 75;
AF.Movie.call(this, 6*t);

var sprite0 = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'),14);  sprite0.frame =0;   
 var sprite12 = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.png'),14);   sprite12.frame =12;   
var sprite13 = new AF.Sprite(game.ASSET_MANAGER.getAsset('SRS_Single.png'),1); 

 
sprite13.visible = false; 
sprite0.visible  = false;
sprite12.visible = false;  
 
this.addChild(sprite13);
 this.addChild(sprite0);
this.addChild(sprite12);

this.addTween(new AF.Tween(sprite0, "scaleX", 0).set(0, 1).set(2*t, 1.5).set(5*t, 1));
this.addTween(new AF.Tween(sprite0, "scaleY", 0).set(0, 1).set(2*t, 1.5).set(5*t, 1));
 this.addTween(new AF.Tween(sprite0, "x", 0).set(0, 0).set(2*t, -35).set(5*t, 0));
this.addTween(new AF.Tween(sprite0, "y", 0).set(0, 0).set(2*t, -35).set(5*t, 0));

this.addTween(new AF.Tween(sprite12, "alpha", 1).set(0, 1).set(5*t-1, 1).set(5*t, 0));
this.addTween(new AF.Tween(sprite12, "scaleX", 0).set(0, 1).set(2*t, 1.5).set(5*t, 1));
this.addTween(new AF.Tween(sprite12, "scaleY", 0).set(0, 1).set(2*t, 1.5).set(5*t, 1));
 this.addTween(new AF.Tween(sprite12, "x", 0).set(0, 0).set(2*t, -35).set(5*t, 0));
this.addTween(new AF.Tween(sprite12, "y", 0).set(0, 0).set(2*t, -35).set(5*t, 0));

this.addTween(new AF.Tween(sprite13, "alpha", 1).set(0, 1).set(2*t, 0.6).set(4*t, 0));
this.addTween(new AF.Tween(sprite13, "scaleX", 0).set(0, 1).set(2*t, 2.5).set(5*t, 1));
this.addTween(new AF.Tween(sprite13, "scaleY", 0).set(0, 1).set(2*t, 2.5).set(5*t, 1));
 this.addTween(new AF.Tween(sprite13, "x", 0).set(0, 0).set(2*t, -85).set(5*t, 0));
this.addTween(new AF.Tween(sprite13, "y", 0).set(0, 0).set(2*t, -85).set(5*t, 0));

 this.playwild = function () {
sprite13.visible = false; 
sprite0.visible = true;
sprite12.visible = false;  
 	 }; 
	 
 this.playscatter = function () {
sprite13.visible = false; 
sprite0.visible = false;
sprite12.visible = true;  
 	 };

 this.playscatterwild = function () {
sprite13.visible = true; 
sprite0.visible = false;
sprite12.visible = false;  
 	 };
  	
this.addAction(function(){ 
this.visible = false; 
sprite13.visible = false; 
sprite0.visible = false;
sprite12.visible = false; 

}, 5*t); 
 }
GrowSymbol.prototype = new AF.Movie();


 
 function  HideSpecialSymbol (reel, sym, alp) {
 
 	 for ( var c =0; c <4; c ++)
	 {
	  game.reelMan.reels[reel].slots[c].symbols[sym].alpha = [alp];
	 } 
   
};
 
//-----------------------------------------
 
var reelStops = [ ];
var myrecovery = false;
reelManagerUpdate = function(deltaTime) {
	
var RM_SPINNING = 1;
var RM_STOPPING = 2;
var RM_WAITING_TO_STOP = 3;

var i;
for(i=0; i<5; i++) { 
 
var r = this.reels[i];
if (game.reelMan.reels[i].state == 3){

if (scatterReels[i] >= 0 && (3-i + getScattersCountBeforeReel(i)) >= 2)   {     
growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;

if(wild_scatter[i] ==0   && !game.freeGames.m_bInFreeGames)  
 {
	HideSpecialSymbol (i, 0, 0) ; 
 	 growSymbols[i].playwild();  
 }

else if(wild_scatter[i] ==12 &&   !game.freeGames.m_bInFreeGames)
 {
 		growSymbols[i].playscatter();	   
 }

else if( game.freeGames.m_bInFreeGames  )  growSymbols[i].playscatterwild();    
else ;    
				   
  	 growSymbols[i].visible = true; 
			
                 if (growSymbols[i].time <= 0) {
 					 
                    growSymbols[i].play(0);
 					game.playSound("srs");
                }
            }
        } else if (game.reelMan.reels[i].state == 0) 
		   {
             if (reelStops[i] != 1) {
                reelStops[i] = 1;
             }
		
			
	growSymbols[i].stop();
 	growSymbols[i].y = r.bounceOffset + scatterReels[i]*r.symbolHeight;  
 		 
			if(wild_scatter[i] ==0  && !game.freeGames.m_bInFreeGames)
			 {    growSymbols[i].playwild(); 
			     HideSpecialSymbol (i, 0, 1) ;  
			 }
  		
			 else if(wild_scatter[i] ==12  && !game.freeGames.m_bInFreeGames)             {
			  // growSymbols[i].playscatter();		
			  // HideSpecialSymbol (i, 12, 1) ;
			 }
			 else if( game.freeGames.m_bInFreeGames)    
			    growSymbols[i].visible = false; 
             else ;     
 
        }
    }

// -----------  end symbols growing   ---------------------------
 

    switch(this.state)
    {
        case RM_SPINNING:
                 this.stoppingTime += deltaTime;
 		  if(this.stoppingTime > 400 && !game.slotResult.bProcessed)
                {
                    this.state         = RM_STOPPING;
                    this.stoppingTime  = 0;
                    this.reelStopIndex = 0;
                    game.slotResult.bProcessed = true;
                }

                for(i=0; i<5; i++)
                {
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
     
            break;
 

        case RM_STOPPING: 
 	 
// get 2 scatter >>  
  if( this.reelStopIndex >2  && scatterReels[1] >=0 && scatterReels[2] >= 0 ) 
{    
  	  if(this.stoppingTime >= 4600) 
	  {
 
		  this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
 		  this.stoppingTime = 0;
		  this.reelStopIndex++;
		  if(this.reelStopIndex >= this.numReels)
		  {  this.state = RM_WAITING_TO_STOP; }
	  }
 
   if(this.reels[this.reelStopIndex-1].isStopped())  
    {   greyOutSymbols(true); 
        game.setBShowFreeSpinBg(true);  
 		
		for (i = 0; i < 5; i++) {
 		game.reelMan.reels[i].reelSpeed =  68.001;
           }    

		
   
	   if( game.reelMan.reels[3].isStopped()  &&  (!isfour || !game.freeGames.m_bInFreeGames) )   
	   {
		  if(this.stoppingTime >= 50)  
		     {  
			    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
			    this.stoppingTime = 0;
			    this.reelStopIndex++;
			    if(this.reelStopIndex >= this.numReels)
			    {  this.state = RM_WAITING_TO_STOP; }
		     }  
	   }  
	   else if( game.reelMan.reels[3].isStopped()  && isfour  && game.freeGames.m_bInFreeGames)
			{     HighLightSymbols(true);  
				 if (lastwindup > 0) { 
				  lastwindup --;
				  setTimeout (function() {
				game.setVolume(0.7); 	  game.playSound('windup2');  
					  }, 600)
				  	
					 
					  }
			
			     if(this.stoppingTime >= 2800)  
		     {  
			    this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
			    this.stoppingTime = 0;
			    this.reelStopIndex++;
			    if(this.reelStopIndex >= this.numReels)
			    {  this.state = RM_WAITING_TO_STOP; }
		     }  
			
			
			  }  
  
   }
 // ----- end greyOutSymbols
  
    	this.crankOffset = 0;
	    this.stoppingTime += deltaTime;
   
 	  for(i=0; i<5; i++)
	  {
		  this.reels[i].update(deltaTime);
		  this.reels[i].crankOffset = this.crankOffset;
	  }
 
    return;
  } ;
 
 
  
if( this.reelStopIndex >3 && isfour && game.freeGames.m_bInFreeGames)  
{    
 	 if(this.stoppingTime >= 3300)    
	  {  
		  this.reels[this.reelStopIndex].stopSpin(game.slotResult.stops[this.reelStopIndex]);
 		  this.stoppingTime = 0;
		  this.reelStopIndex++;
		  if(this.reelStopIndex >= this.numReels)
		  {
			  this.state = RM_WAITING_TO_STOP;
		  }
       }
	 
	 
	 if(game.reelMan.reels[3].isStopped() ) {  
	 HighLightSymbols(true);
	 
	 if (lastwindup > 0) { 
	    lastwindup -- ;
 		  setTimeout (function() {
			 game.setVolume(0.7);   game.playSound('windup2');   }, 600)
	 
	 }
  
	  }   
  
  	   
		this.crankOffset = 0;
		this.stoppingTime += deltaTime;
 
		 for(i=0; i<5; i++){
			this.reels[i].update(deltaTime);
			this.reels[i].crankOffset = this.crankOffset;
	    	}
 	 return;
 	
};
 
		   
 break;

 case RM_WAITING_TO_STOP:
            {
 
                var allStopped = true;

                for(i = 0; i < 5; i++){
                    if(!this.reels[i].isStopped()){
                        allStopped = false;
                        break;
                    }
                }

                if(allStopped){
                    this.state = 0;
                }

                for(i=0; i<5; i++){
                    this.reels[i].update(deltaTime);
                    this.reels[i].crankOffset = this.crankOffset;
                }
                return;
            }
            break;
    }
    overridenFunctions.updateReelManager.call(this, deltaTime);
};

 
 
   
 
var greyOutState = false;

function greyOutSymbols(value) {
	
	if (greyOutState == value) return;
	
    greyOutState = value;
 
  if (value)    lightfromreelsgap.init(); 

    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
 		    for(var s = 1; s < 12; s++){    
                var sym = game.reelMan.reels[i].slots[j].symbols[s];
                if (value) {
                  sym.alpha = [0.4]; //0.4
                 } else {
                   sym.alpha = [1];
                }
            }
        }
    }	
	
    
	
};

 

function getScattersCountBeforeReel(reel){
    var result = 0;
 
    for (var i = 0; i < reel; ++i){
 
	    if (scatterReels[i] >= 0){
             result++; }
     }
    return result;
}



var highlight = false;
function HighLightSymbols(value) {
 
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
 		    for(var s = 0; s < 13; s++){    
                var sym = game.reelMan.reels[i].slots[j].symbols[s];
                if (value) {
                  sym.alpha = [0.3]; //0.4
				  
 				 if (first_a > 3 && first_sym[0] == s ) sym.alpha = [1];
				 if (first_b > 3 && first_sym[1] == s ) sym.alpha = [1];
				 if (first_c > 3 && first_sym[2] == s ) sym.alpha = [1];
 				  
                } else {
                   sym.alpha = [1];
                }
            }
        }
    }	
  	 
};



 

function LoopSound () {
	
var l1 = 4068-90;
var l2 = 4796 -160;	

  AF.Movie.call(this, l1+ l2 + 2);  
	
this.addAction(function(){ 
 	game.playSound('freespin1');
}, 1);    
 	
	
	
this.addAction(function(){ 
 	game.playSound('freespin2');
}, l1);   


this.addAction(function(){ 
 		this.moveTo(1);
},   l1 + l2 );   
 
 	
};
 LoopSound.prototype = new AF.Movie();







function LoopDing () {
	
var l1 = 881;
 
  AF.Movie.call(this, l1 * 2);  

 
 
this.addAction(function(){ 
//	 game.stopSound();
  	game.playSound('dingding');
}, 1);    	
	
this.addAction(function(){ 
//	 game.stopSound();
	game.playSound('dingding');
}, l1);   
  
	
this.addAction(function(){ 
 this.stop(0);
}, l1 * 2 -1);     
	
};
 LoopDing.prototype = new AF.Movie();

 



function TimerBox()
{
 var dt = 100; 
    
 var summary = 20 * dt;
 var retrigger  = 30 * dt;
 var afterclickspin = 7 * dt;
 var stopwinmovie = 2 * dt;
 var icebreak = 23*dt;
 var titanfly = 11 * dt;
 
 
 var mytimer = summary + retrigger + afterclickspin + stopwinmovie + icebreak + titanfly ;
 
 AF.Movie.call(this, mytimer);  
 
this.summary = function () { this.play(0); } 
 this.addAction(function(){ 
   summaryPanel2.init(); 
   summaryPanel.init(); 
  this.stop(0);  },    summary -1);   
 
this.retrigger = function () { this.play(summary);	 } 
 this.addAction(function(){ 
    game.startSpin();
    this.stop(0);       }, summary + retrigger -1 );  
  
this.afterclickspin = function () {  this.play(summary + retrigger); } 
 this.addAction(function(){ 
     game.startSpin();
     this.stop(0);        }, summary + retrigger + afterclickspin -1 );  
   
this.stopwinmovie = function () {  this.play(summary + retrigger + afterclickspin); } 
 this.addAction(function(){ 
 
 this.stop(0);        }, summary + retrigger + afterclickspin + stopwinmovie -1 );  


this.icebreak = function () {  this.play(summary + retrigger + afterclickspin+stopwinmovie); } 

 this.addAction(function(){ 
  punchwall.init();  
  punchwallpng.init(); 
	  
  this.stop(0);        },-1 + summary + retrigger + afterclickspin + stopwinmovie + icebreak );    


this.titanfly = function () {  this.play(summary + retrigger + afterclickspin+stopwinmovie + icebreak ); } 

 this.addAction(function(){ 

       titanshow.position();
     titanshow.init();
	 layerchange = true;
	     firstspinFG = true;  
 
	  
  this.stop(0);        },-1 + summary + retrigger + afterclickspin + stopwinmovie + icebreak + titanfly );  

  
  
};
 TimerBox.prototype = new AF.Movie();
 
 
 
 
  
// -----------  win symbols	-----------  -----------  -----------  -----
 
 reelManShowSymbols = function (show, bitfield) {
    if (!show){ 
	symbolsmovie.showSymbols(bitfield); 
	};
        
};
reelManShowSymbols.oldBitfield = null; 
  
   
   
  
//   win symbols	
 function SymbolsMovie()
{
    AF.Movie.call(this);
    var matrix = [];
    growSymbols = [];
	
    for(var column = 0; column < 5; column++)
    {
        matrix.push([]);
        for(var row = 2; row >= 0; row--)
        {
            var sym;
            var slot = {};
             for (var i = 0; i < 15; i++) {
                if (i == 0)
                        sym = new WildAnimation();
                 else if (i == 12)
                        sym = new ScatterAnimation();
 
                      else if (i == 13)
                          sym = new ScatterWildAnimation();
                         else
				           sym = new AbstractSymbol(i);   
 
 
                sym.x = column * (game.layout.symbolWidth + game.layout.reelGap);
                sym.y = row * game.layout.symbolHeight;
                sym.visible = false;
                 slot[i] = sym;
                this.addChild(sym);
            }

            matrix[column][row] = slot;
        }
		
  
//windup 
/*growSymbols[column] = new GrowSymbol();
growSymbols[column].x = column * (game.layout.symbolWidth + game.layout.reelGap);
growSymbols[column].visible = false;
this.addChild(growSymbols[column]); */
  
	}






    game.api_animateWins = function()
    {
        var bitfield = 0;
		var afterlightning =  scatterReels[1] >=0 && scatterReels[2] >= 0 &&  scatterReels[3] >= 0 && ! game.freeGames.m_bInFreeGames ;

        for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
        {
            bitfield |= game.slotResult.paylineWins[payline].second;
        }

        var isWildWin = false;
        // now we tell each reel to animate the appropriate symbols.
        for(var row = 0; row < 3; row++)
        {
            for(var column = 0; column < 5; column++)
            {
                var symbol;
                var symbolId = game.reelMan.reels[column].slots[row+1].currentSymbol;
				

                if(bitfield & 0x00000001)
                {
                   if(symbolId  == 0)
                   {
                             isWildWin = true;
                            symbol = matrix[column][row][0];
                       
					    if(!afterlightning) {
 							symbol.visible = true;
                            symbol.play(0, column);
 							}
                     } 
					
 			
                    else if(symbolId == 12){
                        symbol = matrix[column][row][12];
 			    
				  if (!afterlightning) {
                           symbol.visible = true;
                           symbol.play(0);
			           }
                   } 
					
					else if(symbolId == 13){
                        symbol = matrix[column][row][13];
                   
                            symbol.visible = true;
                            symbol.play(0);
               
                   } 
				   
				   
				   else {
       game.reelMan.reels[column].slots[row+1].symbols[symbolId].alpha[0] = 0;
	   
           symbol = matrix[column][row][symbolId];
               
			   if (afterlightning) 
			     {
			       symbol.visible = true; 
 				   symbol.play(0, column);  
 
 				 }
			   else
			       {
                   symbol.visible = true;
                   symbol.play(0, column);  
 				   }
 							
                    }
                }
			
				   
                bitfield = bitfield>>1;
            }
        }
 
    };
	

    var gNumCycles = -1;
	
	//	this.reelMan.showSymbols(true,0xffffffff);
    this.showSymbols = function (bits) {

        if (game.gNumCycles < 1 || game.slotResult.numWinningPaylines < 2)
            return;

        if(gNumCycles == game.gNumCycles)
            return;
        gNumCycles = game.gNumCycles;

        var bitfield = 0;

        for(var payline = 0; payline < game.slotResult.numWinningPaylines; payline++)
        {
            bitfield |= game.slotResult.paylineWins[payline].second;
        }

        for(var r = 0; r < 3; r++)
        {
            for(var c = 0; c < 5; c++)
            {
                if(bitfield & 0x00000001)
                {
                    var symbolId = game.reelMan.reels[c].slots[r+1].currentSymbol;
                    var matr = matrix[c][r];

                    matr[symbolId].visible = true;
                    matr[symbolId].play(0);
		
////////// recent add	//////////// FIX BUG
			      if(symbolId >0 )
			      game.reelMan.reels[c].slots[r+1].symbols[symbolId].alpha[0] = 0;	
              
			    }
                bitfield = bitfield>>1;
            }
        } 



       for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 5; column++) {  
                var slot = matrix[column][row];
				var symbolId = 	game.reelMan.reels[column].slots[row+1].currentSymbol;
                if (!(bits & 0x00000001)) {
					if(symbolId != 0){
			
                    slot[game.reelMan.reels[column].slots[row + 1].currentSymbol].visible = false;
                    slot[game.reelMan.reels[column].slots[row + 1].currentSymbol].stop(0);
  	 game.reelMan.reels[column].slots[row + 1].symbols[game.reelMan.reels[column].slots[row + 1].currentSymbol].alpha[0] = 1;
					}
                }
                bits = bits >> 1;
            }
        }
 		
		
    };

    this.stopWildAnims = function()
    {
 
         for(var row = 0; row < 3; row++)
        {
            for(var column = 0; column < 5; column++)
            {
                var sym = game.reelMan.reels[column].slots[row + 1];
                sym.symbols[sym.currentSymbol].alpha[0] = 1;

                var slot = matrix[column][row];
              
			    for (var i = 0; i < 15; i++) {
					if (i == 0) {
                    slot[i].stop(0);
                   	slot[i].visible = false;
					}
					
                }

            }
        }
    };

    game.api_stopWinAnims = function()
    {

         for(var row = 0; row < 3; row++)
        {
            for(var column = 0; column < 5; column++)
            {
                var sym = game.reelMan.reels[column].slots[row + 1];
                sym.symbols[sym.currentSymbol].alpha[0] = 1;

                var slot = matrix[column][row];
                for (var i = 0; i < 15; i++) {
                    slot[i].stop(0);
                    slot[i].visible = false;
                }
            }
        }
    };

	
}
SymbolsMovie.prototype = new AF.Movie();
 
  
 //---- END -- SymbolsMovie ------------------------------------
 
 
 
  function SymbolsPopUp()
{
    AF.Movie.call(this);
 
    growSymbols = [];
	
    for(var column = 0; column < 5; column++)
    {
 growSymbols[column] = new GrowSymbol();
growSymbols[column].x = column * (game.layout.symbolWidth + game.layout.reelGap);
growSymbols[column].visible = false;
this.addChild(growSymbols[column]); 
  
	}
 	
};
SymbolsPopUp.prototype = new AF.Movie();
 

 
 
 
 
 
 //---------------
 
 
 function RandomSprayAnim()
{
	this.sprayCoinArray = null;
	this.animconfig = new Array(6);
	this.setAnimConfig = function()
	{
		var moveStep = 8;
		for (var i = 0; i < this.animconfig.length; i++)
		{
			var moveGap = 11;
			var yy = 0;
			this.animconfig[i] = new Array(17);
			for (var j = 0; j < this.animconfig[i].length; j++)
			{
				if (j>=13)
				{
					this.animconfig[i][j] = {t:0,s:1-(i/10), a:((this.animconfig[i].length - 1 - j)*0.3),x:0,y:yy};	
				} else {
					this.animconfig[i][j] = {t:0,s:1-(i/10), a:1,x:0,y:yy};
				}
				moveGap--;
				yy = yy - moveStep*moveGap;
				if (moveGap == 1) 
				{
					moveGap--;
				}
			}
			moveStep--;
		}
	}
					   
	this.init = function()
	{
		this.sprayCoinArray = new Array(15);
		var reelWidth = game.layout.symbolWidth*5 + game.layout.reelGap*4;
		
		for (var i = 0; i<this.sprayCoinArray.length; i++) {
			this.sprayCoinArray[i] = new ngImage2(game.imageSprayAnim);
			this.sprayCoinArray[i].setAnimConfig([{x:0,y:0,w:game.imageSprayAnim.width,h:game.imageSprayAnim.height}], this.animconfig[Math.floor(Math.random()*this.animconfig.length)]);
			this.sprayCoinArray[i].setPosition(
				game.layout.REELS.x + (reelWidth/this.sprayCoinArray.length)*i + Math.floor(Math.random()*(reelWidth/this.sprayCoinArray.length)), 
				game.layout.REELS.y + 300 + Math.floor(Math.random()*30));
		}
		return this;
	}
	
	this.update = function(timeDelta)
	{
		if (this.sprayCoinArray!= null)
		{	
			for (var i = 0; i<this.sprayCoinArray.length; i++) {
				if (this.sprayCoinArray[i].animRunning)
				{
					this.sprayCoinArray[i].update(timeDelta);
				}
			}
		}
	}
	
	this.draw = function()
	{
		if (this.sprayCoinArray!= null)
		{	
			for (var i = 0; i<this.sprayCoinArray.length; i++) {
				if (this.sprayCoinArray[i].animRunning)
				{
					this.sprayCoinArray[i].draw();
				}
			}
		}
	}
	this.sprayStartAnim = function(spray)
	{
		spray.startAnim(false, 0);
	}
	
	this.startAnim = function()
	{
		if (this.sprayCoinArray!= null)
		{	
			for (var i = 0; i<this.sprayCoinArray.length; i++) {
				var sp = this.sprayCoinArray[i];
				setTimeout(this.sprayStartAnim, Math.floor(Math.random()*1000), sp);
			}
		}
	}
}
