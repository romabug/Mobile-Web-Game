
var isWinPick = false;
var photoshotBG;
function PhotoShoot()
{   
    var dt = 100;
	AF.Movie.call(this, 40*dt);	
	
	this.canPick   = false;
	this.canClick  = false;   
	this.picked = -5;  
	 
	photoshotBG = new backGroundSwitch();
    this.addChild(photoshotBG);   

	 //var touchMeAnim; = new TouchMeAnim();
    //this.addChild(touchMeAnim);   

	//-------------BUTTONS  ----------------
 	var boxW  = game.ASSET_MANAGER.getAsset('photoshot/mirrorbig.png').width-30;
	var boxH  = game.ASSET_MANAGER.getAsset('photoshot/mirrorbig.png').height-40;

    var btnarea = {nx:0, ny:0, nwidth:boxW, nheight:boxH,  dx:0, dy:0, dwidth:boxW, dheight:boxH};  
	var mirror = new Button(null, btnarea);
	mirror.setPosition({x:670, y:170});
	
	//----Skip Button----
	var skipbtnarea = {nx:0, ny:0, nwidth:55, nheight:30,  dx:0, dy:0, dwidth:55, dheight:30};
	var skip = new Button(null, skipbtnarea);
	skip.setPosition({x:775, y:476});
 
	this.processClickRelease = function(coords)
	{
		if (!this.canClick || !this.canPick)
       		return;
  		var tmp;
		var msg;
		
		if( mirror.isOver(coords) )
		{
			this.disableBtn();
			game.playSound('dingaction');
			tmp = myCFP -1; 
			msg = "&MSGID=FEATURE_PICK&CFG=3&FP=1|"+myCFP+"|"+tmp+","+myCFP+"|&";
			windowObj.sendMsgToServer(msg);	  
			//console.log("current pick--" +myCFP  + "/TKS_HL-" + TKS_HL);  
			//console.log(">>>>> pick msg sent to server " +msg); 
		
			if(touchMeAnim.time >0){	
				touchMeAnim.afterTouch();
				//photoshotBG.hideSkip();
			}
			return;
 	 	};
		
		if( skip.isOver(coords) )
		{
			this.disableBtn();
			tmp = myCFP -1;
			//console.log(">>>>> SKIP!");
			//console.log("current pick--" +myCFP  + "/TKS_HL-" + TKS_HL);
		
			msg = "&MSGID=FEATURE_PICK&CFG=3&FP=1|"+myCFP+"|840523|&"; //if skip 840523 as last value
			windowObj.sendMsgToServer(msg);
			game.playSound('dingaction');
			//console.log(">>>>> skip msg sent to server " +msg);  
			return;
 	 	};
  	};//processClickRelease
 
	this.enableBtn = function()
	{
		photoshotBG.showSkip();
		//bntBackground.visible = true;
		this.canPick   = true;
		this.canClick  = true; 
		touchMeAnim.playme(); 
	};
 
	this.disableBtn = function()
	{
		photoshotBG.hideSkip();
   	  	this.canPick   = false;
		this.canClick  = false;    
	}; 

	this.recoveryLaunch = function()
	{    
		photoshotBG.init();     // new backGroundSwitch, dressShow.init(); canclick=true
		mirrorShow.hideFGmirror();
		inPickFeature = true;
	 // The amount needed to win to get freegame
 	 // Need to add a line of text  “make a selection”
	 	//console.log("RECOVERY-LAUNCH REATURE") ; 
		game.WIN_METER_DISPLAY_TIME = 3500;
	};

	this.FeatureStart = function()
	{    
  		// add time delay for the below settings.
		game.stopSound();
		game.stopSound();
		game.playSound("pickloop");
		
		photoshotBG.init();
		photoshotBG.showSkip();
		//game.reelMan.stopAnims();
		//symbolsmovie.stopAnims();
		
		//game.api_switchReels();
		
		inPickFeature = true;
 		// The amount needed to win to get freegame
		// Need to add a line of text  “make a selection”
		//console.log("get--FEATURE_START") ;
		game.WIN_METER_DISPLAY_TIME = 3500;
	};

	this.FeaturePick = function()
	{
		// after received the featurePick message from server
		var str = FPM_HL.toString();
		//console.log(">>>>> FPM_HL toString FeaturePick = "+str);
		var srch = str.search("840523");
		//console.log(">>>>> FPM_HL search FeaturePick = "+srch);

		if(srch != -1){
			var tmp = EACH_WIN.length;
			if(tmp > 0) 
			{ 
				//mirrorShow.sparkleLight(tmp-1);
				for(var i = 0; i <　EACH_WIN.length; i ++)
				{
					if(EACH_WIN[i] != "0" && i < tmp)	
					{
						mirrorShow.greenOn(i+1);
					}
					else if(EACH_WIN[i] == "0" && i < tmp)	
					{ 	
						mirrorShow.redOn(i+1);
					}
				}
 			}
			game.playSound('pickwin');
			return;
		};
		
		isWinPick = false;
		var dress = dresses[CFP_HL-2];
		//console.log(">>>> desses length AFTER select " +dresses.length + " Dress chosen = "+dress);
		
		//set var to show if there is a WIN pick or not.
		isWinPick = ( EACH_WIN[CFP_HL-2] != 0 );
		//console.log(">>>>>> isWinPick = "+isWinPick);
		dressShow.showDressAfterPick(dress);
			
		// String analysis , show what clothes , show what model, show what money, how much money in total 
		// Mirror appear clothes
		// holly animation out
		// photoshoot animation begins
		// holly mirror speech
		// Money went to win meter there.
		 
		//---lights control ----
		var tmp = parseInt(CFP_HL);
		if(tmp > 0) 
		{ 
			mirrorShow.sparkleLight(tmp-1);
 
			for(var i = 0; i <　EACH_WIN.length; i ++)
			{
				if(EACH_WIN[i] != "0" && i < tmp-1)	
				{
		  			mirrorShow.greenOn(i+1);
 				}
				else if(EACH_WIN[i] == "0" && i < tmp-1)	
		  		{ 	
		    		mirrorShow.redOn(i+1);
 		  		}
 			}
 		}
 		//---End lights control ---- 
		//console.log("get--FEATURE_PICK") ;
 		
		//move rollup to photoshotanim.js to after holly after win pic.
		//var targetAmount =  Number(game.winMeterLastAmount)+ Number(PICK_WIN_HL) ;
		//game.startWinMeter( Number(game.winMeterLastAmount),targetAmount );  
	};
	 
	this.FeatureEnd = function()
	{
 		dressShow.isFeatureEnd = true;
 		photoShoot.disableBtn();

		//console.log("get--FEATURE_END...now received FeatureEnd msg, do sth..") ;
		game.WIN_METER_DISPLAY_TIME = 5000; 
		// spin btn back
	};
};
PhotoShoot.prototype = new AF.Movie();
