function Layout(orientDir)
{
	this.REELS = {x:103,y:87};
	
	this.orientation   = 0;
	this.symbolWidth   = 142;
	this.symbolHeight  = 142;
	this.reelGap	   = 7; // the number of pixels between reels
	this.canvasYoffset = 46; //32
	
	this.paylineEndWidth  = 1;
	this.paylineEndHeight = 33;
	this.paylineEndFontSize = 20;
 
 	//this.payLineEndsLeft  = { x:45 +30+40,  y:72};
	//this.payLineEndsRight = { x:870-30-40,  y:72};
	
	this.payLineEndsLeft  = { x:103, y:72 };
	this.payLineEndsRight = { x:841, y:72 };
 
	this.paylineColours = [	"rgb(153, 189, 103)",
							"rgb(0, 160, 198)",
							"rgb(255, 187, 189)",
							"rgb(255, 219, 13)",
							"rgb(230, 0, 0)",
							"rgb(160, 31, 130)",
							"rgb(97, 172, 196)",
							"rgb(239, 129, 33)",
							"rgb(194, 150, 53)",
							"rgb(26, 139, 69)",
							"rgb(136, 114, 168)",
							"rgb(212, 92, 147)",
							"rgb(140, 182, 125)",
							"rgb(237, 212, 137)",
							"rgb(182, 141, 50)" ,
							"rgb(60, 175, 195)" ,
							"rgb(167, 48, 139)" ,
							"rgb(231, 143, 116)" ,
							"rgb(231, 152, 182)" ,
							"rgb(31, 103, 160)" ,
							"rgb(255, 0, 0)" ,
							"rgb(227, 236, 75)" ,
							"rgb(196, 225, 67)" ,
							"rgb(0, 160, 198)" ,
							"rgb(129, 84, 166)" 
						];

	this.paylineEndPositions = [ //71//213//355
		[{x:0,y:213},{x:50,y:213}], //1
		[{x:50,y:71}], //2
		[{x:0,y:355}], //3
		[{x:0,y:71}], //4
		[{x:0,y:355}], //5
		[{x:50,y:71}], //6
		[{x:50,y:355}], //7
		[{x:50,y:213}], //8
		[{x:50,y:213}], //9
		[{x:0,y:213}], //10
		[{x:0,y:213}], //11
		[{x:0,y:71}], //12
		[{x:0,y:355}], //13
		[{x:0,y:213}], //14
		[{x:0,y:213}], //15
		[{x:50,y:71}], //16
		[{x:50,y:355}], //17
		[{x:50,y:355}], //18
		[{x:0,y:355}], //19
		[{x:0,y:71}], //20
		[{x:50,y:355}], //21
		[{x:50,y:213}], //22
		[{x:50,y:213}], //23
		[{x:0,y:71}], //24
		[{x:50,y:71}] //25
	];
		
 		/*[{x:0,y:209},{x:50,y:209}],   //1  ##  left middle && right middle
 	    [{x:50,y:70}],   //2
		[{x:0,y:349}],   //3
		[{x:0,y:70}],   //4
		[{x:0,y:349}],  //5
		[{x:50,y:70}],   //6
		[{x:50,y:349}],  //7
		[{x:50,y:209}],  //8
		[{x:50,y:209}],  //9
		[{x:0,y:209}],  // 10
		[{x:0,y:209}], // 11
		[{x:0,y:70}], // 12   ## left top
		[{x:0,y:349}], // 13  ##  left bottom
		[{x:0,y:209}], // 14
		[{x:0,y:209}], // 15
		[{x:50,y:70}], // 16
		[{x:50,y:349}], // 17
		[{x:50,y:349}], // 18  ##  right bottom
		[{x:0,y:349}], // 19
		[{x:0,y:70}],   // 20
		[{x:50,y:349}],  // 21
		[{x:50,y:209}],   // 22
		[{x:50,y:209}],  // 23
		[{x:0,y:70}],   // 24
		[{x:50,y:70}]    // 25  ##  right top*/


	this.paylineShapes = [ 
		[1,1,1,1,1],
		[0,0,0,0,0],
		[2,2,2,2,2],
		[0,1,2,1,0],
		[2,1,0,1,2],
		
		[0,0,1,0,0],
		[2,2,1,2,2],
		[1,0,0,0,1],
		[1,2,2,2,1],
		[1,0,1,0,1],
		
		[1,2,1,2,1],
		[0,1,0,1,0],
		[2,1,2,1,2],
		[1,1,0,1,1],
		[1,1,2,1,1],
		
		[0,1,1,1,0],
		[2,1,1,1,2],
		[0,1,2,2,2],
		[2,1,0,0,0],
		[0,2,0,2,0],
		
		[2,0,2,0,2],
		[1,0,2,0,1],
		[1,2,0,2,1],
		[0,0,1,2,2],
		[2,2,1,0,0]
	];

						/*[1,1,1,1,1],
						[0,0,0,0,0],
						[2,2,2,2,2],
						[0,1,2,1,0],
						[2,1,0,1,2],
						
						[0,0,1,0,0],
						[2,2,1,2,2],
						[1,0,0,0,1],
						[1,2,2,2,1],
						[1,0,1,0,1],
						
						[1,2,1,2,1],
						[0,1,0,1,0],
						[2,1,2,1,2],
						[1,1,0,1,1],
						[1,1,2,1,1],
						
						[0,1,1,1,0],
						[2,1,1,1,2],
						[0,1,2,2,2],
						[2,1,0,0,0],
						[0,2,0,2,0],
						
						[2,0,2,0,2],
						[1,0,2,0,1],
						[1,2,0,2,1],
						[0,0,1,2,2],
						[2,2,1,0,0]*/

	// Each payline vector consists of 8 points (0..7). First point (0) is next to the payline end, 2nd point (1) is 20 pixels from the payline end with same y value
	// next 5 points represent the centers of the 5 reels. Last point (7) is at the end of the reel strip whose y value is the same as the last 7th point - this makes the end of the vector horizontal
	// The modifier allows you to adjust each of the points on the symbols for better visual quality of the vector. (vector points 2,3,4,5,6) 
	// 0 = symbol center - vector point is centered vertically on the symbol - the defafult
	// 1 = same height as the payline end - vector point y value matches the payline end height
	// 2 = average of the points one the left and right (used to remove doglegs) - the vector point is calculated so that the points on the left and right appear to be joined by a straight line
	
	// Note: paylines originating on the right hand side are "drawn" from right to left and those on the left are "drawn" left to right.
	
	this.paylinePointModifier = [ 
		[1,1,1,1,1], //1
		[1,1,1,1,1], //2
		[1,1,1,1,1], //3
		[1,2,0,0,0], //4
		[1,2,0,0,0], //5

		[1,1,0,0,0], //6
		[1,1,0,0,0], //7
		[1,0,0,0,0], //8
		[1,0,0,0,0], //9
		[1,0,0,0,0], //10

		[1,0,0,0,0], //11
		[1,0,0,0,0], //12
		[1,0,0,0,0], //13
		[1,1,0,0,0], //14
		[1,1,0,0,0], //15

		[1,0,0,0,0], //16
		[1,0,0,0,0], //17
		[1,1,1,0,0], //18
		[1,2,0,0,0], //19
		[1,0,0,0,0], //20

		[0,0,0,0,0], //21
		[0,0,0,0,0], //22
		[0,0,0,0,0], //23
		[1,1,2,0,0], //24
		[1,1,0,0,0] //25
	];

		
							/*[1,1,1,1,1],
							[1,1,1,1,1],
							[1,1,1,1,1],
							[1,2,0,0,0],
							[1,2,0,0,0],

							[0,0,0,0,0],
							[1,1,0,0,0],
							[1,0,0,0,0],
							[1,0,0,0,0],
							[0,0,0,0,0],

							[0,0,0,0,0],
							[1,0,0,0,0],
							[1,0,0,0,0],
							[0,0,0,0,0],
							[0,0,0,0,0],

							[0,0,0,0,0],
							[0,0,0,0,0],
							[1,1,1,0,0],
							[0,0,0,0,0],
							[0,0,0,0,0],

							[2,0,0,0,0],
							[2,0,0,0,0],
							[2,0,0,0,0],
							[0,0,0,0,0],
							[1,1,0,0,0]*/
							

	this.generatePaylineVectors = function()
	{
		this.paylines = createPaylineVectors(this.paylineShapes, 
											 this.paylinePointModifier, 
											 this.paylineEndPositions, 
											 this.paylineEndWidth, 
											 this.paylineEndHeight, 
											 this.REELS, 
											 this.payLineEndsLeft, 
											 this.payLineEndsRight, 
											 this.reelGap, 
											 this.symbolWidth,  
											 this.symbolHeight  );
	}

	this.orient = function(direction)
	{
		this.orientation = direction;
		switch(direction)
		{
		case 0:
		case 1:
		case 2:
			this.width  = 960;
			this.height = 492;
			this.GAME_NAME = {x:242,y:0};
			this.REELBG = {x:0, y: 0};
			this.BTNBG = {x:0, y: 492};
			this.REELS = {x:103,y:87};
			this.NUM_LINES_METER = {x:714,y:120};
			this.MESSAGE_BAR = {x:475,y:548};
			this.SPIN_BTN = {x:560,y:1320};
			this.SPIN_BTN2 = {x:-560,y:1320};
			this.BET_BTN = {x:800,y:40};
			this.LINE_BTN = {x:650,y:40};
			this.RULES_BTN = {x:650,y:180};
			this.AUTOPLAY_BTN = {x:800,y:180};
			this.MENU_BTN = {x:1,y:2};
			this.WIN_METER 		= {x:466,y:505};
			this.WIN_METER_BG	= {x:229,y:460,w:492,h:58}; 
		break;

		}
	}
}

