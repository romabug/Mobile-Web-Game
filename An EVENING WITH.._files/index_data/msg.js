
// MSG
var KissSym = [];  KissSym[0] = -1; KissSym[1] = -1;
var Scatter2 = 0; 
var iskeepbg = false; 
var respinJustBegin = false;
var IFG;
var playFreeGames = false;
var inRecovery = false;
var realFeatureEnd = true;
var nextFeatureID;
var featureID;
var isRespin = false;
var fadeinout = 0; 
var wildreel =[];
var alphaUP ;
var isBaseGameRespin = 0;
var specialhide;
var isJustRecovery = 0;
///////////////////////////////////////
var myStopTime = 5000; 
///////////////////////////////////////
var HR_HL  = [];    // hold reels
var RSA_HL = false;  //only at the spin of respin
var TRS_HL = null; // TRS=1 NORMAL TRS = 2 for last spin of fg
var SSS_HL = null;
var RIA_HL = 0;   //1 Animated hip shake or shake left and right  for reel4 or for reel2
var LEFT_RIGHT = -1;
var NWW  = null;
var TKS_HL = -1;         // the number of lights
var TKS_HL_TOP = false;
var BKS_HL = "";         // big kiss
var FID_HL = "";
// pick
var CFP_HL = 0;
var FPM_HL = 0;
var myCFP  = 1;
var PICK_WIN_HL = 0;
var NUMBER_PICK =0;
var EACH_WIN = [];
var dresses = [];

function reSetPickMsg() 
{
	myCFP = 1;	
	TKS_HL = -1;
};

function reSetHL() 
{
	// don't need to reset  var HR_HL  = []; 	
	SSS_HL = null;
	RSA_HL = false; 
	TRS_HL = null; 	
	RIA_HL = 0;
	BKS_HL = "0";
 	FID_HL = "";
	KissSym[0] = -1;
	KissSym[1] = -1;
};

overridenFunctions.processServerMsg = processServerMsg;
processServerMsg = function(msg)
{
	// use for free game, trigger and spins
	
	communicator.processResponse(msg);
	
    reSetHL(); 

    var pairs = msg.split("&");
    for(var i=0;i<pairs.length;i++)
    {
        var pos = pairs[i].indexOf("=");
        var name = pairs[i].substr(0, pos);
        var value = pairs[i].substr(pos+1);
		
        switch(name)
        {
            case "CW":
                currentWin = Number(value);
                fgCW = Number(value);
            break;
        }
    }
    overridenFunctions.processServerMsg.call(this, msg);
};
var TW;
var PICKfeature = null;
overridenFunctions.processMsg = game.processMsg;
game.processMsg = function(pairs,freegame)
{
	var result = overridenFunctions.processMsg.call(this,pairs,freegame);
 
	currentWin = 0;
	fgCW = 0;	
	result.FT = 0 ;
	RID = null;
	NRID = null;
	PWIN = 0;
	FID = null;
	TW = null;
	PICKfeature = null;
	CFGG = null;
  
	for(var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf("=");
		var name = pairs[i].substr(0, pos);
		var value = pairs[i].substr(pos+1);
		
		switch(name)
		{
		   case "FID":
				/* if(value == "0|1|")
                   realFeatureEnd = false;
					else 
					realFeatureEnd = true;*/
 				 if( value == "2|" )FID_HL	="2";
				 FID = value.split("|");
			break;	

			//  FPM_3   FPM_1     Feature Picks Made   Already pick projects
			//-----  FPM_fid=p1;p2;pn|   /fid = feature id   /p1 = pick value for pick 1   /p2 = pick value for pick 2  /pn = pick value for pick n
			//  CFP_3      Current Feature Pick  Followed by the cumulative current pick of the project, the first 2
			//  CFR_3=1     ## Dresses? Clothes
			//  FTV_3    pick Before you begin，and recovery Especially when data
			//  FTV_fid=wa;np;n;a;b;c;d;   wa - Feature Game Win Amount  /np - Number of Picks  /n - number of feature values  /a;b;c;d;- Feature Values.
			// 	FTV_1=4000;4;4;    1000;2000;1000;0; Total pick4 times in total win 4000     
			case "RID":
				RID = Number(value);
				//RSid = RID;
				//console.log(">>>> RID = "+RID);
				break;
			case "NRID":
				NRID = Number(value);
				//console.log(">>>> NRID = "+NRID);
				break;
            case "CFG":
                 var values = value.split(";");
                // console.log("pf_CFG-->"+ value);	
                 break;
			case "TW":
                 TW = Number(value);	
                 break;
            case "FS_3":
                 var values = value.split(";");
                // console.log("pf_FS_3-->"+ value);
                 break;
            case "FTV_3": //FTV_3=62800;4;8;15700;15700;15700;15700;2;9;5;7;  //first '4' is num picks, last four in this case are dresses
                 var myFTV = value.split(";");
                // console.log("pf_FTV_3-->"+ myFTV + "type-" + typeof(myFTV));
             	 //   game.slotResult.winType = 2;
			 	 // pickFeatureTrigger = true;	 
		 		 EACH_WIN = [];
		 
				 for(var ii=3; ii < Number(myFTV[1])+3; ii ++)
				 {
			 		EACH_WIN.push(myFTV[ii]);
		  		 }
		 		// console.log("@@win      "+ EACH_WIN );
				 
		 		 dresses = [];
		 		 for(var jj=Number(myFTV[1])+3; jj < myFTV.length-1; jj ++)
				 {
			 		dresses.push(myFTV[jj]);
		  		 }
		  		 NUMBER_PICK = dresses.length;
		  		// console.log("@@dress   "+dresses + "   len-" + NUMBER_PICK);				 
			break;
            case "FPM_3":
                  FPM_HL = 0;
                  FPM_HL = value.split(";");
                 // console.log("###pf_FPM_3--> "+ FPM_HL)
            break;		
			case "CFP_3":
				 PICKfeature = -1;
                 CFP_HL = 0;
 				 CFP_HL = value.split(";");
				 
				 if(CFP_HL == 0)
				 myCFP = 1;
		 		 else 
			 	 myCFP = CFP_HL; 
				// console.log("CFP_HL###pf_CFP_3-->"+  CFP_HL  );
				 pickedNum = parseInt(CFP_HL-1);
           	break;
            case "TFW":
                 var values = value.split(";");
              //  console.log("pf_TFW-->"+ value)
            break;	
            case "FP":
                 var values = value.split(";");
                // console.log("pf_FP-->"+ value)
            break;						 
            case "CW":
                 var values = value.split(";");
				 PICK_WIN_HL = value.split(";");
				 
               //  console.log(" PICK_WIN_HL-->"+ PICK_WIN_HL);
            break;
			case "CFGG":
			CFGG = Number(value);
            break;					 			 
			// GSD=RSA~1     
			// GSD=TKS~4  ~1,2,3    kiss  (In freegames time , TKS 1,2,3 denote the number of light bulbs, if the increase in the quantity of each bulb , no kiss）    		  
			// GSD=RIA~1  ,2,3      wild animation Hip , hit the right- left
			// GSD=BKS~1          	big kiss for last spin
			// GSD=HR~1;2;#TRS~1    HOLD REELS 1,2        RE-SPIN
			// GSD=RSA~1  #TRS~1    the  new  respin
			// GSD=PICKWIN~4900   	In the pick time, this pick to win money
			// NWW   ????  There appears 2 scatters + wilds of spin
			// before free game, pop up panel.  click then start the 1 free game.
			//1 pick ---> sent-->  MSGID=FEATURE_PICK&CFG=3&FP=1|1|0,3|&  
			//then receive--> FID=3|2|&CFG=3&FS_3=1&NFR_3=1&FPM_3=0,3;|&CFR_3=1&CFP_3=2&CW=9850&NFG=0&TFG=11&CFGG=11
				
		  	case "SSS":
  				SSS_HL = value.split("|");
			//	console.log(">>>>>> SSS Recorded "+SSS_HL);
				SSS_RECOVER = value.split("|");
				var msgtmp	= value.split("|");
				wildreel =[];
				specialhide = parseInt( ISleftRight() ) -1; 
 
    			for( var r =0; r < msgtmp.length-1 ; r++  )
   				{  
    				//  LEFT_RIGHT = Number(msgtmp[i].split(";")[0]);
					//  console.log("LEFT_RIGHT--" + LEFT_RIGHT);
					// var member = Number(msgtmp[i].split(";")[0] -1); 
 					wildreel.push(Number(msgtmp[r].split(";")[0] -1));
	 				// console.warn("member --" + Number(msgtmp[r].split(";")[0] -1)  );  
   				} 
   			break;	
			case "GSD":
 	  			var gsData = value.split("#");
	  			for( var j=0;j<gsData.length;j++ )
	 			{
		  			var gsName = gsData[j].split("~")[0];
		  			var gsValue = gsData[j].split("~")[1];
					switch(gsName)
					{
						case "RIA":  
               			RIA_HL = gsValue;
 		       			//console.log("msg--RIA --" + RIA_HL);  
			   			fadeinout  = 0;
						HLalpha = 1;
				
			   			if(RIA_HL >0)
               			{ 
			     			fadeinout  = 1 ;
			     			HLalpha = 0.99;	
				 			alphaUP = false;
			   			}
						/*    GSD=RIA~1   Animated hip shake or shake left and right for reel4 or for reel2
							  GSD=RIA~2   Point left or right point  RIA With the value of pre- beautiful animation for reel2 
							  RIA~4   （2-4reels  Beauty play left and right double play animation）
						*/
						break;
						
						//---------RE SPIN-------------------------------------------
						case "HR":  
						result.HR = gsValue;
						HR_HL[0] = 1;
						HR_HL[1] = result.HR[0];
						HR_HL[2] = result.HR[2];
						//console.log("HR_HL--"+ HR_HL)
						break;	
						case "RSA":   
							result.RSA = gsValue;
							RSA_HL = true;      //RSA~1    only at RESPIN
							//console.warn( RSA_HL + "--RSA_HL--" + result.RSA  );  
						break;			  
						case "TRS":   // TRS=1 NORMAL TRS = 2 for last spin of fg
							result.TRS = gsValue;
						//	console.warn("result.TRS--" + result.TRS);
							TRS_HL = gsValue;	
						break;			  
						//---------RE SPIN-------------------------------------------
						
						case "TKS":    // KISS
							result.TKS = gsValue;
							TKS_HL = gsValue;
						//	console.warn("result.TKS--" + result.TKS); 
							if(TKS_HL >=10)		
							{ 
								TKS_HL_TOP = true;
								//alert( " TKS_HL_TOP = true ")
							}
							else
							{
								TKS_HL_TOP = false;
							}
						break;	
						case "BKS":  
						BKS_HL = gsValue;
 		    
     					/*if(BKS_HL == "1")
   						{
 							console.log(" bg fadin, KISS ME is coming...")
   						}*/
						break;			  
		  
						// FGTW=4400	   free game total win only at free spins.
						// TW=19600   total win, ..for sum up of each free spins.
						// TW=19600   total win, only at pick PPfeature...for sum up of each picks. 
						// PICKWIN    current pick win, at pick PPfeature... for each pick
						
 		  				case "FGWIN":  
			  				result.PICKWIN = gsValue;
							PWIN = gsValue;
						break;			  
						case "FT":  
			  				result.FT = gsValue;
 			  				if(result.FT)
			  				{
			  					if( typeof featureCounter == "undefined" ) 
			  						restoreInfo.FT =  gsValue;
			  					else
			  						featureCounter.FT = gsValue;
			   				}
			  			break;
		  			}
	  			} //for
  			break; //End GSD                  
            case "R":
				inRecovery = true;
			break;      
            case "SUB":
                result.wildSubstitute = parseInt(value);
            break;
		}
	}
	
	//console.log(">>>>>>>>>> PICKfeature = "+PICKfeature);
	RSid = RID;
	//game.api_switchReels();
	if(NRID != null)RSid = NRID;
	
	return result;
};

game.api_processMsgEnd = function(result)
{
	//---------------------------------------------------------	
	if (game.reelMan.reels == undefined) return;
	//if(game.freeGames.m_bInFreeGames)
 	//{
		//console.log(">>>>>>> **** kiss reel switch");
		var lastStrip = [3,9,7,6,9,4,10,11,5,9,10,6,11,12,4,8,9,6,11,5,10,4,9,8,6,11,5,8,10,4,8,6,7,11,3,10,11,13,10,11,4,9,10,6,9,8,5,7,11,6,9,3,10,4,8,9,6,7] ;

 		KissSym[0] = -1;

	    //for(i = 4; i < 5; i++) 
	   	//{
         	for(var row = 0; row < 3; ++row){
            		var rs = game.reelMan.reels[4].reelStrip;
					var sp = parseInt(result.stops[4]) + row - 1;
					//var rs = [3,9,16,6,9,4,10,20,5,9,10,6,11,21,4,8,9,6,20,5,10,4,9,8,6,11,5,17,10,4,8,6,7,11,3,10,11,15,10,11,4,9,19,6,9,8,5,7,11,6,18,3,10,4,8,9,6,7];
					//var sp = parseInt(game.slotResult.stops[4]) + row - 1;

             		if (sp > rs.length) sp -= rs.length;
            		if (sp < 0) sp += rs.length;
					
            		var sym = parseInt(rs[sp]);
 			  		
					//if(sym == 14)
					if(sym > 15)
					{
 			  			KissSym[0] = parseInt(row);
			  			KissSym[1] = parseInt(lastStrip[sp]);
						//KissSym[1] = parseInt(rs[sp]);
			   			break;
  					}
        	 }
		//}
   		//	if(reelkiss > -1)
		//  alert(reelkiss);
 	//}

    for(i = 0; i < 5; i++) {
        scatterReels[i] = -1;
        for(var row = 0; row < 3; ++row){
            var rs = game.reelMan.reels[i].reelStrip;
            var sp = parseInt(result.stops[i]) + row - 1;

            if (sp > rs.length) sp -= rs.length;
            if (sp < 0) sp += rs.length;

            var sym = parseInt(rs[sp]);

            if(sym == 13 ||  sym == 14 || sym == 15){
                totalScatters++;
				totalScatterAnims++;
                scatterReels[i] = row;
                break;
            }
        }
    }
};
