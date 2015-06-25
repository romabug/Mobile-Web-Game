function WoodBar()
{  

	this.numOfWild = 0;
    this.visible = false;
 	 
 	var  wildsymbols = new GiveMeWildIcons();
	wildsymbols.x = 440 - 200;
	wildsymbols.y = 1;
	wildsymbols.visible = true;
	    
 this.showwildSymbols = function (GWW, posy) 
{    wildsymbols.clear();    
     wildID = [];
   	 var str = GWW;
	 var ram = 1;
	 for(var i = 0; i < str.length ; i ++)
	 {
	  if(str[i] > 15 )
	  { 
	     wildsymbols.wildicons[ram][str[i]].visible = true; 
		 wildID.push(parseInt(str[i]));
		 ram ++;
 	  }
	 }
	
	this.numOfWild = wildID.length;
	wildsymbols.x =  440 - ram*50 ;
 	wildsymbols.y  = posy ;
   
};   
   
	 
 
 
 var reTriggerGold =  new AF.Sprite(game.ASSET_MANAGER.getAsset('featuregold.png'), 1);//  reTriggerGold.scaleX = 0.3 ;  reTriggerGold.scaleY = 0.3 ;  
 
 reTriggerGold.x = 85;
  this.addChild(reTriggerGold);
 
 this.reTrigger = new AF.Text();
 this.reTrigger.setMixedFormat({
	size: 30,
	maxWidth:70,
	y: 7,
	x: 143,
	align: "left",
	color:"#FEFE00",
	stroke:"#DE2127 3"
});
this.addChild(this.reTrigger);

	 
this.showRetrigger = function () {
this.visible = true;
this.reTrigger.visible = true;
reTriggerGold.visible= true;	
}

this.hideRetrigger = function () {
this.reTrigger.visible = false;
reTriggerGold.visible= false;	
}	
 
	 
  var resultwood = new AF.Sprite(game.ASSET_MANAGER.getAsset('woodbar.png'), 1);
	resultwood.x = 252-40;
	resultwood.y = -4 + 60;
	this.addChild(resultwood);
	
	
  var woodfg = new AF.Sprite(game.ASSET_MANAGER.getAsset('woodbar.png'), 1);
    woodfg.x = 252-40;
    woodfg.y = -4;
    this.addChild(woodfg);
	

	/////////////////////////////////////////////////////////////
	// ADD SINGLE AND PLURAL TEXT TO CONTROL FEATURE SCREEN
	/////////////////////////////////////////////////////////////	
	var txt4 = new AF.Text();
    txt4.setMixedFormat(MESSAGE_INSTRUCTION_4);   // ARE WILD (fg)
	this.addChild(txt4);	

	var txt4_single = new AF.Text();
    txt4_single.setMixedFormat(MESSAGE_INSTRUCTION_4_SINGLE);   // IS WILD (fg)
	this.addChild(txt4_single);	
	/////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////

 	
 	this.addChild(wildsymbols);       
 
     
    var txt1 = new AF.Text();
    txt1.setMixedFormat(MESSAGE_INSTRUCTION_1);  //"Pick a character"
    this.addChild(txt1);

    var txt2 = new AF.Text();
    txt2.setMixedFormat(MESSAGE_INSTRUCTION_2);  // "X free games with"
    this.addChild(txt2);

    var txt3 = new AF.Text();
    txt3.setMixedFormat(MESSAGE_INSTRUCTION_3);   // WILD
    this.addChild(txt3);
	
	
this.freegames = new AF.Text();      
this.freegames.setMixedFormat(freegamestyle);  
this.freegames.text = "SSS";
this.addChild(this.freegames);	
 
 
this.setTxt3 = function(RAM) {
	txt3.x = 450+80 + 56 * RAM ;
} 
 
 
this.hideAll = function () {
//	darkbg.hide();
   woodfg.visible = false;
   
   /////////////////////////////////////////////////////////////
   // HIDE ALL FEATURE TEXT
   txt4.visible = false;   // ARE WILD (fg)
   txt4_single.visible = false; //IS WILD
   /////////////////////////////////////////////////////////////
 
   resultwood.visible = false;
   this.freegames.visible = false;  // X 
   txt1.visible = false;  //"Pick a character"
  txt2.visible = false; // "X free games with"
 txt3.visible = false;  //WILD
wildsymbols.visible = false;
	}	
	 

this.freeGameWoodShow = function () {
 // set position
  if ( game.freeGames.m_bInFreeGames || isShowWood)
 { 
 darkbg.show();
 topBar.visible = false;
 woodbar.showwildSymbols(featureCounter.GWW, 1);
  
 this.hideAll();


//set single or plural wild counter during the feature screen
/////////////////////////////////////////////////////////////
 if(woodbar.numOfWild > 1){
 	txt4.visible = true;	
 }else{
 	txt4_single.visible = true;	
 }
 /////////////////////////////////////////////////////////////
 
 
 woodfg.visible = true;
 this.visible = true;
 wildsymbols.visible = true;
  }else
  {
  this.hideAll();
   topBar.visible = true;
  }
}	
  	
 	
this.resultWoodShow = function () {
  this.hideAll();
 //  woodbar.showwildSymbols(featureCounter.GWW, 60);
 // set text position
 
  this.freegames.visible = true; 
 resultwood.visible = true;
 
 txt2.visible = true;
 txt3.visible = true;
 
  this.visible = true;
	}	
	
 

this.pickdiggertxtShow = function () {
	 this.hideAll();
	txt1.visible = true;
	 this.visible = true;
	}
 
	
	
	
 };
WoodBar.prototype = new AF.Movie(); 
 
 
 
 
function caveWaterSound()
 {
    AF.Movie.call(this,20000  ); 
     
  this.playcavebg = function () 
  {
	  this.play(5);
  }; 
  
  this.stopcavebg = function () 
  {   
     this.stop(0);
  };
         
 this.addAction(function(){ 
 game.playSound('cavebg');
 
  },5);   
  
/*  
   this.addAction(function(){ 
   game.playSound('getgold');
  },1115);   
  */
  
  
 this.addAction(function(){ 
 
  this.moveTo(3);
  },5871);   
  
  //------------ digging --------
  
   this.playdigging = function () 
  {
	  this.play(6000);
  }; 
  
  this.stopdigging = function () 
  { 
     this.stop(0);
  };
         
 this.addAction(function(){ 
 //game.playSound('digging');
  },6001);   
  
 this.addAction(function(){ 
  this.moveTo(6000);
  },6000 + 942);    
  
  
  
      

 };
caveWaterSound.prototype = new AF.Movie();  
 



 function FeatureCounter()
{
    //actuall time-  22 seconds
    var dt = 10*diggspeed;     AF.Movie.call(this,25*dt  ); 
	
	this.FT = 0;  // un trigger pick
	this.CHD = [];  // diggers
	this.TBG = [];  // each golds
	this.GWW = []; 
	this.FBD = []; 
	
	this.icons = [];
	
	var digger = [];
	var winner = [];
	var diggertag = [];
	var bluetag = [];
	var spotlight = [];
	var selected = [];
	var goldshower = [];
  
 	
//------------------------
 this.setDiggerPosx = function (CHD) {
 

 
  var tmp = CHD;
 //if ( tmp == "undefined") {console.warn ("CHD is wrong"); return;}
 	
   	var pickpostionX =   57 + 14; 
	var pickpostionY =   - 30;	
	 var myframes =1, myframes2 =1  ;   
	 var xx , yy , xx2, yy2, xx3, yy3, basey = 130;
    var showerx = -30, showery = -70;
	
  for (var i =1; i < 6; i ++ )
  { 
    var aa = tmp[i-1].toString(); 
  	var diggerimage  = "diggers/" + aa +".png";  
	var diggertagimage =   "diggers/" + aa+aa +".png";  
	var bluetagimage =   "diggers/" + aa+aa+aa +".png";  
	var winnerimage =   "diggers/" + aa+aa+aa+aa +".png"; 
  
    mysearchID[i]=aa;
	
switch(aa)
{
case "1":
myframes = 11;  myframes2 =7  ; xx = -10; yy =basey ;     xx2 = -10;    yy2 =basey -80 ;  xx3=   62  ; yy3 =   194 ;   break;
case "2":
myframes = 13; myframes2 = 8 ;  xx = -30; yy =basey -1 ;  xx2 = -30;    yy2 =basey -88 ;  xx3=   11  ; yy3 =   262 ;   break;
case "3":
myframes = 7;  myframes2 = 9 ; xx = 46;  yy =basey ;    xx2 = 46;    yy2 =basey -59 ;   xx3=   69  ; yy3 =   218 ;   break;
case "4":
myframes = 9;  myframes2 = 8 ; xx = -18;  yy =basey -117;  xx2 = -18 + 13;  yy2 =basey-117 + 15 ; xx3=   66  ; yy3 =   125 ;     break;
case "5":
myframes = 6; myframes2 =  9; xx = 51; yy =basey  - 39 ; xx2 = 51 - 59;  yy2 =basey - 39; xx3=   73  ; yy3 =   234 ;     break;
case "6":
myframes = 8; myframes2 =  5; xx = 30; yy =basey - 31;  xx2 = 30;  yy2 =basey - 31 ; xx3=   48  ; yy3 =   278 ;     break;
case "7":
myframes = 6; myframes2 =  6; xx = 57; yy =basey + 44;  xx2 = 57; yy2 =basey  + 44 + 6; xx3=   58  ; yy3 =   287 ;    break;
};
 
	
	digger[i]  =  new AF.Sprite(game.ASSET_MANAGER.getAsset(diggerimage), myframes);
 	digger[i].x =  xx + (i-1)*(127+15);  
    digger[i].y = yy; 
	digger[i].frame = 0;
 	
	myframes = myframes -1;
	var playframes = "0-"+ myframes +  ",0-"+ myframes +  ",0-"+ myframes +",0-"+ myframes+",0-"+ myframes+",0-"+ myframes+",0-"+ myframes+",0-"+ myframes+",0-"+ myframes+",0-"+ myframes+",0-"+ myframes+",0-"+ myframes+",0-"+ myframes+",0-"+ myframes +"0,0,0,0";	
	
	  this.addTween(new AF.SpriteTween(digger[i], 0).set(120,playframes, 18*dt-1+ myextra)); 
 // this.addTween(new AF.SpriteTween(digger[i], 0).set(18*dt,"0-0", 4*dt)); 
  	
	//--------  gold shower
 
   goldshower[i] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("CoinShower.png"), 14);
  	this.addChild(goldshower[i]);
 	goldshower[i].x = xx3 + (i-1)*142 + showerx + 46;
	goldshower[i].y = yy3 + showery ;
	goldshower[i].visible = false;
    this.addTween(new AF.SpriteTween(goldshower[i]).set(420, "0-13,0-13,0-13,0-13,0-13,0-13,0-13,0-13,0-13,0-13,0-13,0-13", 18*dt-5+ myextra));
	
  	
	// -------- winner ----	---------------------------------
 
 	winner[i]  =  new AF.Sprite(game.ASSET_MANAGER.getAsset(winnerimage), myframes2);
	winner[i].x = xx2 + (i-1)*(127+15);       winner[i].y = yy2; 
    winner[i].visible = false;
 	this.addChild( winner[i] );
	
	myframes2 = myframes2 -1;
	var playframes2 = "0-"+ myframes2 + ",0-"+ myframes2+  ",0-"+ myframes2 +  ",0-"+ myframes2 +",0-"+ myframes2+",0-"+ myframes2+",0-"+ myframes2 ;		
		
   this.addTween(new AF.SpriteTween(winner[i], 0).set(18*dt+ myextra , playframes2, 4*dt )); 
 
 
	//---------------------------------------
 	
	diggertag[i]  =  new AF.Sprite(game.ASSET_MANAGER.getAsset(diggertagimage), 1);
	diggertag[i].x = - 28 + pickpostionX + (i-1)*(125+17);     
	diggertag[i].y = 240 + 52;
  	
    bluetag[i]  =  new AF.Sprite(game.ASSET_MANAGER.getAsset(bluetagimage), 1);
	bluetag[i].x = - 28 + pickpostionX + (i-1)*(125+17);      
	bluetag[i].y = 240 + 52;
	bluetag[i].visible = false;
	
	 this.addChild( diggertag[i] );	
	this.addChild( bluetag[i] );	
 		this.addChild( digger[i] );

  	
   spotlight[i]  =  new AF.Sprite(game.ASSET_MANAGER.getAsset( "diggers/spotlight.png"), 1);
	spotlight[i].x =  pickpostionX - 33 + (i-1)*(127+15);    spotlight[i].y = 90 -57 -66;
	spotlight[i].alpha = 0.6 ;
	spotlight[i].visible = false;
 	this.addChild( spotlight[i] );	
  	
	
	 selected[i]  =  new AF.Sprite(game.ASSET_MANAGER.getAsset( "diggers/selected.png"), 1);
	selected[i].x =  pickpostionX - 33 + (i-1)*(127+15);    selected[i].y = 140 + 191;
	selected[i].visible = false;
 	this.addChild( selected[i] );	
	
    } 
  };
 
 
 
   
   this.addAction(function(){ 
  for(var i =1;  i< 6; i++)
  	goldshower[i].visible = true;
   }, 420);    
 
 
   this.addAction(function(){ 
 
     cavesound.stopcavebg();
	 
  for(var i =1;  i< 6; i++)
  	goldshower[i].visible = false;
	
  },18*dt+ myextra );  
  
  
 this.addAction(function(){ 

  game.playSound(diggerwinsound); 
 	
  },18*dt+ myextra  +5 );    
  
    


this.setWinDigger = function (ID) {
   var myid =parseInt(ID)  	;
 	//console.log ( "-myid-" + "~~>"+ myid);
	
	diggerwinsound = "ww"+ mysearchID[myid];
 	
	winner[myid].visible = true;
	digger[myid].visible = false;
  
   
 };
  
  
 
  
  
this.addAction(function(){ 
 
  inFeature = false;
  this.visible = false;
  isShowWood = true;
  //this.stop(0);
  
  pickmepanel.visible = false;
  pickmepanel.canClick = false;
  featureCounter.hideDiggers();	 
   
  pickmepanel.picked = -5;
  
  featureCounter.hideDiggers();
  goldbitsmoive.hideme();
     
     woodbar.freeGameWoodShow();
 
 },22*dt  + 1 + myextra);      
 
 
 this.addAction(function(){ 
  this.stop(0); 
    isShowWood = false;
	
   windowObj.sendMsgToServer("&MSGID=FEATURE_END&CFG=0&");   
  },23*dt+ myextra  );      
 
 

this.spotLightOn = function (n) {
	 var i = n;
	 bluetag[i].visible = true; 
	 spotlight[i].visible = true;
	  selected[i].visible = true;
};

 
this.pickRAM = -5 ;


 
this.showDiggers = function () {
	 for (var i =1; i < 6; i ++ ) {
		 digger[i].visible = true;
		    diggertag[i].visible = true;
		//	goldshower[i].visible = true;
			//   bluetag[i].visible = true;
	 }
		  starsmovie.init();  
	 
};

this.hideDiggers = function () {
	//  bg.visible = false; 
 
	 for (var i =1; i < 6; i ++ ) {
		 digger[i].visible = false;
		  winner[i].visible = false;
		 	diggertag[i].visible = false;
		    bluetag[i].visible = false;
			spotlight[i].visible = false;
			selected[i].visible = false;
			featureCounter.TBG = [] ;
			goldshower[i].visible = false;
	 }
	 
	 starsmovie.starstop();  
	   DelaySpinButton(3000); 
};

//--------------------------
 
	this.show = function()
	{
	 this.visible = true;   
	 woodbar.reTrigger.text = "X "+ this.FT;
	
		if(this.FT>0)
		 {	
		 woodbar.showRetrigger();
		afterrecover = true; 
		 }
		else
			woodbar.hideRetrigger();
 	}
	
	this.beginFeature = function()
	{ 
 //	 if(!game.inRecovery)
		this.FT --;
		
		this.show();
	}
 	
	
 }
FeatureCounter.prototype = new AF.Movie();



// test it


   function  waJinZi() 
 {	 
 var dt = 75;     AF.Movie.call(this, 17*dt ); 
 
 var bg =  new AF.Sprite(game.ASSET_MANAGER.getAsset("frame.jpg"), 1);
  	this.addChild(bg);
  	// pickpostionX + (i-1)*(127+15); 
	var gapx = 142;
	var basey = 130 ;
	
 var d1 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("diggers/1.png"), 11);
  	 d1.x =  -10  ;  d1.y =  basey; 	
  	this.addChild(d1 );
	
 var d2 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("diggers/2.png"), 13);
  	 d2.x = -30 + gapx;  d2.y =  basey -1; 	
  	this.addChild(d2 );	

 var d3 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("diggers/3.png"), 7);
  	 d3.x = 46 + 2*gapx ;  d3.y =  basey; 	
  this.addChild(d3 );	

 var d4 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("diggers/4.png"), 9);
  	 d4.x = -20 + 3*gapx ;  d4.y =  basey -117; 	
 //  this.addChild(d4 );	
   
   var d5 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("diggers/5.png"), 6);
  	 d5.x = 51  + 4*gapx ;  d5.y =  basey - 39; 	
 //  this.addChild(d5 );	 
 
    var d6 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("diggers/6.png"), 8);
  	 d6.x = 30  + 3 *gapx ;  d6.y =  basey - 31; 	
   this.addChild(d6 );	 
   
     var d7 =  new AF.Sprite(game.ASSET_MANAGER.getAsset("diggers/7.png"), 6);
  	 d7.x = 57  + 4 *gapx ;  d7.y =  basey  + 44; 	
   this.addChild(d7 );	  
 

 this.addTween(new AF.SpriteTween(d1, 0).set(0,"0,1,2,2,3,3,4,5", 17*dt)); 		
 this.addTween(new AF.SpriteTween(d2, 0).set(0,"0,1,2,2,3,3,4,5", 17*dt)); 	
  this.addTween(new AF.SpriteTween(d3, 0).set(0,"0,1,2,2,3,3,4,5", 17*dt)); 	
   this.addTween(new AF.SpriteTween(d4, 0).set(0,"0,1,2,2,3,3,4,5", 17*dt)); 
   this.addTween(new AF.SpriteTween(d5, 0).set(0,"0,1,2,2,3,3,4,5", 17*dt));  
     this.addTween(new AF.SpriteTween(d6, 0).set(0,"0,1,2,2,3,3,4,5", 17*dt));  
	    this.addTween(new AF.SpriteTween(d7, 0).set(0,"0,1,2,2,3,3,4,5", 17*dt));

// 40    70

//    w 95    h  213
 
   
	var showerx = 45- 40, showery = -70;
		
	var goldshower = [];
   goldshower[1] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("CoinShower.png"), 14);
  	this.addChild(goldshower[1]);
 	goldshower[1].x = showerx + 62;
	goldshower[1].y = showery  + 194 ;
    this.addTween(new AF.SpriteTween(goldshower[1]).set(0, "1-14", 14*dt));
	
	
 
   goldshower[2] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("CoinShower.png"), 14);
  // 	this.addChild(goldshower[2]);
 	goldshower[2].x = showerx + 106 ;
	goldshower[2].y = showery +70 ;
    this.addTween(new AF.SpriteTween(goldshower[2]).set(0, "1-14", 14*dt));
	
	 
   goldshower[3] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("CoinShower.png"), 14);
   	this.addChild(goldshower[3]);
 	goldshower[3].x = showerx + 290 ;
	goldshower[3].y = showery +35 ;
    this.addTween(new AF.SpriteTween(goldshower[3]).set(0, "1-14", 14*dt));
	
	
		 
   goldshower[4] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("CoinShower.png"), 14);
   	this.addChild(goldshower[4]);
 	goldshower[4].x = showerx + 430 ;
	goldshower[4].y = showery  -90 ;
    this.addTween(new AF.SpriteTween(goldshower[4]).set(0, "1-14", 14*dt));
 
			 
   goldshower[5] =  new AF.Sprite(game.ASSET_MANAGER.getAsset("CoinShower.png"), 14);
   	this.addChild(goldshower[5]);
 	goldshower[5].x = showerx + 580 ;
	goldshower[5].y = showery  +40 ;
    this.addTween(new AF.SpriteTween(goldshower[5]).set(0, "1-14", 14*dt));
	
	
	
			  
	  
   this.init =  function() {
    this.visible = true;
	this.play(0);
   };
    
	
	this.starstop = function() {
  };
	
  this.visible = false;
 };
 waJinZi.prototype = new AF.Movie(); 










function  GoldBitsMoive() 
{
 var dt = 175;     AF.Movie.call(this,10*dt + 3*dt );   //this.visible = false;
 var goldbox = [];
 var iconbox = [];
  var boxmargin = 142;
 var goldX = 91 + 50 - 3,     goldY = 230 + 210 + 53;
 var iconX = 91 + 130,     iconY = 230 + 210 + 53 -1 ;
 
 this.pickedicon =[];
 
  
 for(var i = 1; i < 6; i ++)
 {
  goldbox[i] = new GiveMeGold();
   goldbox[i].x =  boxmargin * (i-1)  + goldX;
   goldbox[i].y =  goldY;
   goldbox[i].visible = false;
  this.addChild(goldbox[i]);   
 };
 
 
  for(var i = 1; i < 6; i ++)
 {
   iconbox[i] = new GiveMeIcons();
   iconbox[i].x =  boxmargin *  (i-1) + iconX;
   iconbox[i].y = iconY;
   iconbox[i].visible = false;
  this.addChild(iconbox[i]);    
 };
 
// weizhi  
var  wildicon = new GiveMeWildIcons();
  wildicon.x = 130 + 285;
  wildicon.y =   100 - 40;
wildicon.visible = true;
this.addChild(wildicon);    



  
   
 this.showWildIcon = function (SHOW) 
{     
     wildicon.clear();

      var visible = SHOW;
	  var tmp =  goldbitsmoive.showIconResult(featureCounter.FBD, true);
	  var myoption ;
	  
	  wildicon.visible = true;
 	
	if(featureCounter.pickRAM > -5)
	   myoption = featureCounter.pickRAM ;
	   else
	   myoption = pickmepanel.picked ;
	
 
	 var golds =  featureCounter.TBG;
 	 woodbar.freegames.text =  golds[myoption-1]; 
 
 
	 
	   var mypicked =  tmp[myoption] ;
	   var ram = -1;
	   
 	   for( i =1; i <mypicked.length+1 ; i ++) 
	   {
 		wildicon.wildicons[i][mypicked[i-1]].visible = visible; 
		ram ++;
 	   }
	   

	   woodbar.setTxt3(ram); 
 
 
}; 
 
 
 
 this.showWildIconByClick = function (RAM) 
{   
 var golds =  featureCounter.TBG;
 	woodbar.freegames.text =  golds[pick-1];
 	 wildicon.visible = true;
	 
	var tmp =  goldbitsmoive.showIconResult(featureCounter.FBD);
	var pick = RAM;
    
 	  
	 if(pick > -5)
	 {  
	   var mypicked =  tmp[pick] ;
 	   for( i =1; i <mypicked.length+1 ; i ++) 
	   {
 		wildicon.wildicons[i][mypicked[i-1]].visible = true; 
 	   }

	}
 }; 

 

this.hideWildIcon =  function () { 
wildicon.visible = false; 
 woodbar.hideAll();
 
};
 
// find icons return  outputwildicon

this.clearIconResult = function ()
{
	 for (var i=1; i <6 ; i ++)     
      iconbox[i].clear();
 }


 this.showIconResult = function (FBD, SHOW)
 {  
    var tmp = FBD.toString() ;
	var tmp2 = tmp.split(";");
	var aa = [];
	var myicon = [];
	var outputwildicon = [];
	var visible = SHOW;

 	
if(tmp == "" || tmp =="undefine" ) {
	//console.log ("tmp = FBD.toString() not exit!!!")
	return; }	
 
  //  --------  TEST IT   ------------------	
 	 
 for (var i=1; i <6 ; i ++)     
  {	
     iconbox[i].clear();
	 
     iconbox[i].visible = true;
  	 aa[i] = [];	
	 aa[i] = tmp2[i-1].split(",") ;
	 
	 var mylength = aa[1].length;
 		 
     myicon[i] = [];
      var tmp3 = [];
	   outputwildicon[i] = [];
	
	 for (var j =0; j < mylength; j ++)
	 {
	   if(aa[i][j] != "99" && aa[i][j] != "0")
	   { 
	      tmp3.push(aa[i][j]);
   		  var  l = tmp3.length ; 
		  
     if(visible)
	 iconbox[i].icons[l][aa[i][j]].visible = true;
	 else
	 iconbox[i].icons[l][aa[i][j]].visible = false;
	
      outputwildicon[i].push(aa[i][j]);
  
  	   }
 	 }
      
 } 
  
  
/*  
console.log ("--" + tmp2[0] );
console.log ("--" + tmp2[1] );
console.log ("--" + tmp2[2] );
console.log ("--" + tmp2[3] );
console.log ("--" + tmp2[4] );
 
*/ 
 
 
 
  return  outputwildicon  ;
 };
  
  


 
this.showGoldResult = function (TBG, SHOW) 
{var visible = SHOW;
 var boxcontent = TBG;
  
 for(var i = 1; i < 6; i ++)
 {
  var n = parseInt(boxcontent[i-1]) ;
  goldbox[i].drawMe(n, visible); 
  goldbox[i].visible = true;
  } 	
}; 



//----------hard code animation----------------------------

 this.playGoldsAnimation = function ()
 {  
 	var tmp = featureCounter.FBD.toString() ;
	var tmp2 = tmp.split(";");
	var aa = [];
	
	 for (var i=1; i <6; i ++){
	  aa[i] = tmp2[i-1].split(",") ;
 	 }
	 
	 var goldRam = [0,0,0,0,0,0];
	 var iconRam = [0,0,0,0,0,0];
	 
	 var aaLen = aa[1].length;
	 
 
 
 var jj =0;
 var mytimer = setInterval(function() {
	 
	 //if (jj == aaLen -1 ) 
 	 if (jj == aaLen  ) 
	{
	 // console.log ("MISSION OK OK, jj=" + jj)
	 
	  clearInterval(mytimer); 
	  clearInterval(soundtimer); 
 
	  // show the freegames, wild icons
	  goldbitsmoive.showWildIcon(true);
	  woodbar.resultWoodShow();
	  
	  featureCounter.setWinDigger(featureCounter.pickRAM);
  	  featureCounter.play(180*diggspeed + myextra) ;
 	  	  
	  featureCounter.pickRAM = -5;
      pickmepanel.picked  = -5;
	  
	  return;          
   
	}
	 
	  for (var i=1; i <6; i ++){
 	   if( aa[i][jj] == "99" )
	   { goldRam[i] = goldRam[i]  +1;
         goldbox[i].gold[goldRam[i]].visible = true;
 	   } 
	   
	   else  if( aa[i][jj] != "99" && aa[i][jj] != "0" )
	   {
	   iconRam[i] = iconRam[i] +1;
	   iconbox[i].icons[iconRam[i]][aa[i][jj]].visible = true;
		  
	   }  
	   
	   var Pdigger = featureCounter.pickRAM;
	   if(aa[Pdigger][jj] == "99"  || aa[Pdigger][jj] != "0")
	     game.playSound('getgold');
	 }
 	    jj = jj + 1;

 	// if(jj < aaLen)
	// setTimeout(function() { game.playSound(diggersound);    }, myPeriod) ;
 	 
 	 }, 170*diggspeed/aaLen);
 
 
 //-------soundroop---------------------------------------------------------
	 
    var myPeriod = 1500;

	if(diggersound == "dd1")
	myPeriod = 2200;	
	
	else if(diggersound == "dd2")
	myPeriod = 2300;
	
	else if(diggersound == "dd3")
	myPeriod = 1000;
	
	else if(diggersound == "dd4")
	myPeriod = 1200;
	
	else  if(diggersound == "dd5")
	myPeriod = 800;
	
	else if(diggersound == "dd6")
	myPeriod = 1763;
	
	else if(diggersound == "dd7")
	myPeriod = 1600;
	
	 
 var soundtimer = setInterval(function() { 
 	  game.playSound(diggersound);      }, myPeriod);
	 
	 
	 
   setTimeout(function() { game.playSound(diggersound);    }, 100) ; 
  
    
 };

 

//----------------------------------------------------------

 
 this.hideme = function (TBG) 
{
   for(var i = 1; i < 6; i ++){
   goldbox[i].visible = false;
   iconbox[i].visible = false;
   }
     
    this.hideWildIcon(); 
 };
  
 
this.clearResult = function () 
{
 var boxcontent = [1,1,1,1,1];
 for(var i = 1; i < 6; i ++)
 {
  var n = parseInt(boxcontent[i-1]) ;
 // goldbox[i].drawMe(n+1);
  };
}; 
    
   	 
};
GoldBitsMoive.prototype = new AF.Movie(); 
 
 
 
 
 function  GiveMeGold() 
 {
	var dt = 175;     AF.Movie.call(this,10*dt + 3*dt );   //this.visible = false;
	var space = Math.round(game.ASSET_MANAGER.getAsset('diggers/goldbit.png').width);
 	 
this.gold = [];  
 
for(var i=1; i < 11 ; i++)
{
  this.gold[i]  =new AF.Sprite(game.ASSET_MANAGER.getAsset('diggers/goldbit.png'), 1);	
  this.gold[i].visible = false;
	} 
	
	
	
for (var i =1; i < 11; i ++ )
{ 
   
  if(i<5) 
  {
   this.gold[i].y = - i * space;
  }
	else if (i<9)
	{
	 this.gold[i].x =    space ;    
     this.gold[i].y =   -  (i-4) * space;
 	}
	 	else if (i<12)
		{
		 this.gold[i].x =    2*space ;    
		 this.gold[i].y =   - (i-8) * space;
		}
	
   this.addChild( this.gold[i] );   
 
 }
 	
  
  
this.drawMe = function (n,SHOW) {
var Num = n;
var visible = SHOW;

//clear
for (var i =1; i < 11; i ++ )
{ 
 this.gold[i].visible = false;
}


for (var i =1; i <= Num; i ++ )
{ 
 this.gold[i].visible = visible;
}
 
};
 	  
 


  this.hidegoldbits = function() {
  for (var i =1; i <11; i ++)
   this.gold[i].visible = false;
	  };
 	 
	 
};
 GiveMeGold.prototype = new AF.Movie();
 
 
 
 
//------------------------------------------------------------------
 
  function  GiveMeIcons() 
 {
	var dt = 175;     AF.Movie.call(this,10*dt + 3*dt );   //this.visible = false;
	var space = Math.round(game.ASSET_MANAGER.getAsset('icon/17.png').width);
     this.icons = [];   
   
 	for (var i =1; i < 4; i ++ )
	 { 
	  this.icons[i] =[];
	  for(var j =16; j < 24; j++ ) 
		{
		var aa = j.toString(); 
		var iconsimage  = "icon/" + aa +".png";  
		this.icons[i][j]  = new AF.Sprite(game.ASSET_MANAGER.getAsset(iconsimage), 1);
 		this.icons[i][j].y = -i*space;
		this.icons[i][j].visible = false;
 		this.addChild( this.icons[i][j] );   
		}
 	 }

	
	 
this.clear = function () {
	for (var i =1; i < 4; i ++ )
	 { 
	  for(var j =16; j < 24; j++ ) 
		{
         this.icons[i][j].visible = false;
		}
	 }
	
}	 
	 
	 
 
 };
 GiveMeIcons.prototype = new AF.Movie();
 
 
 
 
  function  GiveMeWildIcons() 
 {
	var dt = 175;     AF.Movie.call(this,10*dt + 3*dt );   //this.visible = false;
	var wildiconspace = 6 + Math.round(game.ASSET_MANAGER.getAsset('wildicons/17.png').width);
     this.wildicons = [];  
 
   
 	for (var i =1; i < 4; i ++ )
	 { 
	  this.wildicons[i] =[];
	  for(var j =16; j < 24; j++ ) 
		{
		var aa = j.toString(); 
		var wildiconsimage  = "wildicons/" + aa +".png";  
		this.wildicons[i][j]  = new AF.Sprite(game.ASSET_MANAGER.getAsset(wildiconsimage), 1);
 		this.wildicons[i][j].x = i*wildiconspace;
	    this.wildicons[i][j].visible = false;
 	 	this.addChild( this.wildicons[i][j] );   
		}
 	 }
 
 
 this.clear = function () {
 	 for (var i =1; i < 4; i ++ )
		 { 
		  for(var j =16; j < 24; j++ ) 
		   this.wildicons[i][j].visible = false;
		 }
 }
 
 
 };
 GiveMeWildIcons.prototype = new AF.Movie(); 
 
 
 
  
  function  starsFlash(x,y,size,rotate,time) 
 {	 
var dt = 55;     AF.Movie.call(this, 31*dt ); 
 
var bombstar = new AF.Sprite(game.ASSET_MANAGER.getAsset('starflash.png'),1);
//this.addTween(new AF.SpriteTween(bombstar, 0).set(dt*14,  "0,1,0,1,0,1,0,1,0,1",  17*dt)); 
 
var mystarBox = new AF.Movie();
mystarBox.x =-Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2) + x + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2) ;
mystarBox.y = -Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2) + y + Math.round(game.ASSET_MANAGER.getAsset('starflash.png').height/2);

bombstar.x = -Math.round(game.ASSET_MANAGER.getAsset('starflash.png').width/2);
bombstar.y = -Math.round(game.ASSET_MANAGER.getAsset('starflash.png').height/2);

mystarBox.addChild(bombstar); 	
 this.addChild(mystarBox);  
 
//   this.addTween(new AF.Tween(mystarBox,  "alpha", 0).set(  dt*time-1, 0 ).set(   dt*time, 1 ).set(dt*(time+5), 0 )   ); 
this.addTween(new AF.Tween(mystarBox,  "scaleX", 0).set(dt*time-1, 0 ).set(dt*(time+5), size ).set(dt*(time+7), 0 )   );
this.addTween(new AF.Tween(mystarBox,  "scaleY", 0).set(dt*time-1, 0 ).set(dt*(time+5), size ).set(dt*(time+7), 0 )   );
this.addTween(new AF.Tween(mystarBox,  "rotate", 0).set(dt*time-1, 0 ).set(dt*(time+5), rotate ));
 
 
 this.addAction(function(){ 
 this.moveTo(0);
 },31*dt-1); 
 
 
 };
 starsFlash.prototype = new AF.Movie(); 
 


//-----------------------------------------------------

  
   function  starsMovie() 
 {	 
 //var dt = 50;    
  //AF.Movie.call(this, 9*dt ); 
 var star = []
 
 
 
 var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset('frame.jpg'), 1);
     bg.visible = false;
     this.addChild(bg);
 
 var timegap = 3;
 var topy = -15;
                      //(x,y,size,rotate,time)    
					  // time up to 24
star[0] = new starsFlash(0,0,3,180,3);  star[0].visible = false;

star[1] = new starsFlash(41,140+topy,1.5,  90, 3);
star[2]  = new starsFlash(592,206+topy,0.8, 90, 6);
star[3]  = new starsFlash(715,137+topy,1.5, 90, 9);
star[4]  = new starsFlash(306,226+topy,1, 90, 12);
star[5]  = new starsFlash(177,91+topy,1.5,  90, 16);
star[6]  = new starsFlash(462,100+topy,0.8, 90, 20);
star[7] = new starsFlash(590,208+topy,1,  90, 24);
     
this.addChild(star[0] );	
this.addChild(star[1] ); 
this.addChild(star[2] ); 
this.addChild(star[3] );
this.addChild(star[4] ); 
this.addChild(star[5] ); 
this.addChild(star[6] ); 
this.addChild(star[7] );	


 //     star[1]  = new starsFlash(180,84,2,180,5);
//  this.addChild(star[1] ); 
   
   this.init =  function() {
	    this.visible = true;
		  bg.visible = true;
	   for(i = 0; i < star.length ; i ++)
	    star[i].play(0);
 
   };
    
	this.starstop = function() {
	  this.visible = false;
	   bg.visible = false;
	  for(i = 0; i < star.length ; i ++)
	    star[i].stop(0);
		
		};
	
 
 };
 starsMovie.prototype = new AF.Movie(); 
 
 
///-----------------------------------------------------
 
 
function TimerBox()
{
 var dt = 100; 
 
 var delay = []; 
  
   delay[1] = 20 * dt;
   delay[2] = 50 * dt;
   delay[3] = 80 * dt;
   
  var mytimer = 0;
   for( var i =1; i <= delay.length ; i ++)
    {   mytimer +=  delay[i] ;  
	}
	
	
var delaytag = [];  
  for (var c = 1;  c <= delay.length-1;  c ++)	
   {   
  var tmpsum = 0;
  for( var i =1; i <= c ; i ++)
    {  var tmp = delay[i];
	  // delaytag[c] = tmp;
	  tmpsum +=  tmp;
	}	
    delaytag[c] = tmpsum;	  	
}
   

 
	
 AF.Movie.call(this, mytimer);  
 
 this.test = function () {
 

 };
 
 
this.delaygg = function () { this.play(0); };

this.addAction(function(){ 
	 // console.log("gggg");
   this.stop(0);  },   delaytag[1]-1);  
   

this.delay50 = function () { this.play(delaytag[1] ); } 
this.addAction(function(){ 
 //  summaryPanel2.init(); 
   this.stop(0);  },   delaytag[2]-1);      
    

this.delay80 = function () { this.play(delaytag[2] ); } 
this.addAction(function(){ 
 //  summaryPanel2.init(); 
   this.stop(0);  },   delaytag[3]-1);   
 
  
  
};
 TimerBox.prototype = new AF.Movie();