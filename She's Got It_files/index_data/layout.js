function Layout(orientDir)
{
	this.REELS = {x:88,y:60};
	
	this.orientation   = 0;
	this.symbolWidth   = 150;
	this.symbolHeight  = 150;
	this.reelGap	   = 8; // the number of pixels between reels
	this.canvasYoffset = 32; 
	
	this.paylineEndWidth  = 35;
	this.paylineEndHeight = 35;
	this.paylineEndFontSize = 20;
	
	// the following payline co-ordinates are relative to this.REELS
	this.paylines = [   
		[{x:-8, y:225}, {x:790, y:225}],
		[{x:0, y:50}, {x:790, y:50}],
		[{x:-8, y:398}, {x:784, y:398}],
		[{x:-8, y:50}, {x:36, y:50}, {x:390, y:372}, {x:710, y:74}, {x:784, y:74}],
		[{x:-8, y:434}, {x:18, y:434}, {x:390, y:74}, {x:755, y:434}, {x:784, y:434}],

		[{x:0, y:74}, {x:230, y:74}, {x:390, y:226}, {x:606, y:18}, {x:790, y:18}],
		[{x:0, y:372}, {x:230, y:372}, {x:390, y:226}, {x:578, y:400}, {x:790, y:400}],
		[{x:0, y:226}, {x:74, y:226}, {x:230, y:74}, {x:550, y:74}, {x:672, y:190},  {x:790, y:190}],
		[{x:0, y:226}, {x:74, y:226}, {x:230, y:372}, {x:550, y:372}, {x:672, y:260}, {x:790, y:260}],
		[{x:-8, y:190}, {x:112, y:190}, {x:230, y:74}, {x:390, y:226}, {x:550, y:74}, {x:710, y:225}, {x:784, y:225}],

		[{x:-8, y:260}, {x:112, y:260}, {x:230, y:372}, {x:390, y:226}, {x:550, y:372}, {x:710, y:225}, {x:784, y:225}],
		[{x:-8, y:88}, {x:76, y:88}, {x:230, y:226}, {x:390, y:74}, {x:550, y:226}, {x:710, y:74}, {x:784, y:74}],
		[{x:-8, y:366}, {x:90, y:366}, {x:230, y:226}, {x:390, y:372}, {x:550, y:226}, {x:694, y:372}, {x:784, y:372}],
		[{x:-8, y:160}, {x:34, y:160}, {x:300, y:160}, {x:390, y:74}, {x:550, y:226}, {x:784, y:226}],
		[{x:-8, y:294}, {x:34, y:294}, {x:302, y:294}, {x:390, y:372}, {x:550, y:226}, {x:784, y:226}],

		[{x:0, y:74}, {x:74, y:74}, {x:230, y:226}, {x:550, y:226}, {x:658, y:120}, {x:790, y:120}],
		[{x:0, y:372}, {x:84, y:372}, {x:230, y:226}, {x:550, y:226}, {x:654, y:330}, {x:790, y:330}],
		[{x:0, y:74}, {x:74, y:74}, {x:390, y:364}, {x:790, y:364}],
		[{x:-8, y:330}, {x:126, y:330}, {x:390, y:74}, {x:784, y:74}],
		[{x:-8, y:122}, {x:74, y:122}, {x:230, y:372}, {x:390, y:74}, {x:545, y:372}, {x:700, y:74}, {x:784, y:74}],

		[{x:0, y:366}, {x:74, y:366}, {x:230, y:74}, {x:390, y:372}, {x:545, y:74}, {x:700, y:434}, {x:790, y:434}],
		[{x:0, y:226}, {x:74, y:226}, {x:230, y:74}, {x:390, y:372}, {x:545, y:74}, {x:654, y:294}, {x:790, y:294}],
		[{x:0, y:226}, {x:74, y:226}, {x:230, y:372}, {x:390, y:74}, {x:545, y:372}, {x:654, y:154}, {x:790, y:154} ],
		[{x:-8, y:16}, {x:180, y:16}, {x:552, y:372}, {x:784, y:372}],
		[{x:-8, y:372}, {x:230, y:372}, {x:534, y:86}, {x:790, y:86}]
	];

	this.paylineColours = [	
		"rgb(153, 189, 103)",
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


	this.payLineEndsLeft  = { x:25, y:66 };
	this.payLineEndsRight = { x:899, y:66 };

	this.paylineEndPositions = [ 
						  [{x:0,y:184}],	//1
						  [{x:50,y:46}],	//2
						  [{x:50,y:368}],	//3
						  [{x:0,y:0}],		//4
						  [{x:0,y:322}],	//5
						  [{x:50,y:0}],		//6
						  [{x:50,y:414}],	//7
						  [{x:50,y:184}],	//8
						  [{x:50,y:230}],	//9
						  [{x:0,y:92}],		//10
						  [{x:0,y:276}],	//11
						  [{x:0,y:46}],		//12
						  [{x:0,y:368}],	//13
						  [{x:0,y:138}],	//14
						  [{x:0,y:230}],	//15
						  [{x:50,y:138}],	//16
						  [{x:50,y:276}],	//17
						  [{x:50,y:322}],	//18
						  [{x:0,y:414}],	//19
						  [{x:50,y:92}]		//20
						    ];

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
						[0,2,0,2,0]
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
							[2,0,0,0,0],
							[1,2,0,0,0],

							[0,0,0,0,0],
							[0,0,0,0,0],
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
							[0,0,0,0,0],
							[0,2,0,0,0],
							[0,0,0,0,0]
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
			this.height = 492;
			this.GAME_NAME = {x:346,y:0};
			this.REELBG = {x:0, y: 0};
			this.MESSAGE_BAR = {x:430,y:548};
			this.SPIN_BTN = {x:660,y:1320};
		break;
        }
	}
}

