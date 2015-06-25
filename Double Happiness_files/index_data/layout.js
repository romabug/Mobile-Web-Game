function Layout(orientDir)
{
	this.REELS = {x:91,y:58};
	
	this.orientation   = 0;
	this.symbolWidth   = 150;
	this.symbolHeight  = 150;
	this.reelGap	   = 7; // the number of pixels between reels
	this.canvasYoffset = 32; 
	
	this.paylineEndWidth  = 35;
	this.paylineEndHeight = 25;

	this.paylineColours = [	
		"rgb(4, 193, 203)",
		"rgb(209, 1, 191)",
		"rgb(212, 2, 3)",
		"rgb(39, 208, 19)",
		"rgb(0, 115, 0)",
		"rgb(209, 174, 2)",
		"rgb(223, 96, 0)",
		"rgb(39, 107, 224)",
		"rgb(131, 1, 172)",
		"rgb(2, 1, 206)",
		"rgb(186, 43, 211)",
		"rgb(157, 160, 153)",
		"rgb(182, 80, 2)",
		"rgb(8, 165, 228)",
		"rgb(221, 141, 101)" ,
		"rgb(194, 80, 101)" ,
		"rgb(96, 3, 214)" ,
		"rgb(235, 0, 128)" ,
		"rgb(2, 216, 153)" ,
		"rgb(180, 210, 14)" ,
		"rgb(230, 224, 3)" ,
		"rgb(91, 231, 82)" ,
		"rgb(246, 0, 55)" ,
		"rgb(241, 135, 3)" ,
		"rgb(250, 101, 244)" 
	];
	
	this.payLineEndsLeft  = { x:40, y:64 };
	this.payLineEndsRight = { x:884, y:64 };

	this.paylineEndPositions = [ 
		[{x:0,y:209},{x:50,y:209}],
		[{x:50,y:70}],	
		[{x:50,y:349}],	
		[{x:0,y:0}],
		[{x:0,y:418}],
		[{x:50,y:0}],	
		[{x:50,y:418}],	//7
		[{x:50,y:244}],
		[{x:0,y:244}],		
		[{x:0,y:70}],	
		[{x:0,y:349}],
		[{x:50,y:104}],		//12
		[{x:50,y:313}],
		[{x:50,y:139}],
		[{x:50,y:279}],		//15
		[{x:0,y:139}],
		[{x:0,y:279}],
		[{x:0,y:104}],
		[{x:0,y:313}],
		[{x:50,y:174}],		//20
		[{x:0,y:174}],
		[{x:50,y:35}],
		[{x:0,y:383}],
		[{x:0,y:35}],
		[{x:50,y:383}]

	];

	this.paylineShapes = [ 
						[1,1,1,1,1],
						[0,0,0,0,0],
						[2,2,2,2,2],
						[0,1,2,1,0],
						[2,1,0,1,2],
						
						[0,0,1,0,0],
						[2,2,1,2,2],
						[1,2,2,2,1],
						[1,0,0,0,1],
						[0,1,1,1,0],
						
						[2,1,1,1,2],
						[0,1,0,1,0],
						[2,1,2,1,2],
						[1,0,1,0,1],
						[1,2,1,2,1],
						
						[1,1,0,1,1],
						[1,1,2,1,1],
						[0,2,0,2,0],
						[2,0,2,0,2],
						[1,0,2,0,1],
						
						[1,2,0,2,1],
						[0,0,2,0,0],
						[2,2,0,2,2],
						[0,2,2,2,0],
						[2,0,0,0,2]
						];

	// Each payline vector consists of 8 points (0..7). First point (0) is next to the payline end, 2nd point (1) is 20 pixels from the payline end with same y value
	// next 5 points represent the centers of the 5 reels. Last point (7) is at the end of the reel strip whose y value is the same as the last 7th point - this makes the end of the vector horizontal
	// The modifier allows you to adjust each of the points on the symbols for better visual quality of the vector. (vector points 2,3,4,5,6) 
	// 0 = symbol center - vector point is centered vertically on the symbol - the defafult
	// 1 = same height as the payline end - vector point y value matches the payline end height
	// 2 = average of the points one the left and right (used to remove doglegs) - the vector point is calculated so that the points on the left and right appear to be joined by a straight line
	
	// Note: paylines originating on the right hand side are "drawn" from right to left and those on the left are "drawn" left to right.
	
	this.paylinePointModifier = [ 
							[1,1,1,1,1],
							[1,1,1,1,1],
							[1,1,1,1,1],
							[1,2,0,0,0],
							[1,2,0,0,0],

							[1,1,0,0,0],
							[1,1,0,0,0],
							[1,0,0,0,1],
							[2,0,0,0,0],
							[1,0,0,0,0],

							[1,0,0,0,0],
							[1,0,0,0,0],
							[1,0,0,0,0], 
							[1,0,0,0,0],
							[1,0,0,0,0],

							[1,1,0,0,0],
							[1,1,0,0,0],
							[1,0,0,0,0],
							[1,0,0,0,0],
							[1,0,0,0,0],

							[1,0,0,0,0],
							[1,1,0,1,1],
							[1,1,0,1,1],
							[1,0,0,0,0],
							[1,0,0,0,0]
							];


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
			this.height = 568;
			this.GAME_NAME = {x:355,y:-30};
			this.TOP_MESSAGE_BAR = {x:179,y:9};
			this.STARBURST = {x:251,y:-1};
			this.SMALL_PANEL = {x:82,y:46};
			this.REELBG = {x:0, y: 0};
			this.BTNBG = {x:0, y: 492};
			this.NUM_LINES_METER = {x:714,y:120};
			this.MESSAGE_BAR = {x:480,y:542};
			this.SPIN_BTN = {x:660,y:1320};
			this.BET_BTN = {x:800,y:40};
			this.LINE_BTN = {x:650,y:40};
			this.RULES_BTN = {x:650,y:180};
			this.AUTOPLAY_BTN = {x:800,y:180};
			this.MENU_BTN = {x:1,y:2};
		break;

		}
	}
}



