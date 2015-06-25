function Layout(orientDir)
{
	this.REELS = {x:187,y:78};
	
	this.orientation   = 0;
	this.symbolWidth   = 137;
	this.symbolHeight  = 110;
	this.reelGap	   = 7; // the number of pixels between reels
	this.canvasYoffset = 32;  
	
	this.paylineEndWidth  = 20; 
	this.paylineEndHeight = 17;
	this.paylineEndFontSize  = 15;
	
     this.paylineColours = [	"rgb(127,150,68)",//1
        "rgb(80,189,215)",
        "rgb(247,176,212)",
        "rgb(254,226,49)",
        "rgb(247,65,55)",

        "rgb(187,37,143)",//6
        "rgb(143,201,220)",
        "rgb(249,127,42)",
        "rgb(232,152,19)",
        "rgb(76,168,99)",

        "rgb(160,110,180)",//11
        "rgb(216,94,157)",
        "rgb(181,216,120)",
        "rgb(215,196,112)",
        "rgb(195,154,33)",

        "rgb(80,175,172)",//16
        "rgb(164,40,144)",
        "rgb(239,150,109)",
        "rgb(250,207,228)",
        "rgb(45,111,174)",

        "rgb(247,82,71)",//21
        "rgb(224,229,81)",
        "rgb(225,240,81)",
        "rgb(92,184,207)",
        "rgb(153,11,180)",

        "rgb(215,52,135)",//26
        "rgb(155,199,58)",
        "rgb(236,193,67)",
        "rgb(174,213,82)",
        "rgb(124,108,55)",

        "rgb(198,190,64)",//31
        "rgb(226,179,210)",
        "rgb(218,240,171)",
        "rgb(232,58,96)",
        "rgb(255,255,68)",

        "rgb(243,58,150)",//36
        "rgb(50,145,112)",
        "rgb(113,133,180)",
        "rgb(237,176,15)",
        "rgb(166,221,234)",

        "rgb(244,214,52)",//41
        "rgb(235,94,172)",
        "rgb(198,60,12)",
        "rgb(143,211,206)",
        "rgb(198,175,36)",

        "rgb(160,202,225)",//46
        "rgb(250,149,12)",
        "rgb(238,142,51)",
        "rgb(149,209,200)",
        "rgb(208,232,183)"
    ];

  	this.payLineEndsLeft  = { x:164, y:74 };
	this.payLineEndsRight = { x:901, y:74 };

    this.paylineEndPositions = [

	  [{x:0,y:162}],// 1
	  [{x:50,y:54}],// 2
	  [{x:50,y:270}],// 3
	  [{x:0,y:396}],// 4
	  [{x:0,y:36}],// 5
	  [{x:50,y:396}],// 6
	  [{x:50,y:126}],// 7
	  [{x:0,y:270}],// 8
	  [{x:50,y:36}],// 9
	  [{x:0,y:126}],// 10
	  [{x:50,y:234}],// 11
	  [{x:0,y:198}],// 12
	  [{x:50,y:306}],// 13
	  [{x:0,y:360}],// 14
	  [{x:50,y:0}],// 15
	  [{x:50,y:414}],// 16
	  [{x:0,y:54}],// 17
	  [{x:50,y:378}],// 18
	  [{x:50,y:18}],// 19
	  [{x:50,y:342}],// 20
	  [{x:0,y:0}],// 21
	  [{x:0,y:414}],// 22
	  [{x:50,y:72}],// 23
	  [{x:0,y:432}],// 24
	  [{x:0,y:18}],// 25
	  [{x:0,y:342}],// 26
	  [{x:0,y:72}],// 27
	  [{x:0,y:378}],// 28
	  [{x:50,y:90}],// 29 
	  [{x:50,y:432}],// 30
	  [{x:0,y:90}],// 31
	  [{x:50,y:360}],// 32
	  [{x:0,y:144}],// 33
	  [{x:50,y:216}],// 34
	  [{x:50,y:144}],// 35
	  [{x:0,y:288}],// 36
	  [{x:50,y:180}],// 37
	  [{x:50,y:252}],// 38
	  [{x:0,y:108}],// 39
	  [{x:50,y:288}],// 40
	  [{x:0,y:216}],// 41
	  [{x:0,y:234}],// 42
	  [{x:50,y:162}],// 43
	  [{x:50,y:324}],// 44
	  [{x:0,y:180}],// 45
	  [{x:0,y:306}],// 46
	  [{x:50,y:198}],// 47
	  [{x:0,y:324}],// 48
	  [{x:50,y:108}],// 49
	  [{x:0,y:252}]// 	50
	   
		   ];


 
 this.paylineShapes = [
 
	[1,1,1,1,1],	//	1
	[0,0,0,0,0],	//	2
	[2,2,2,2,2],//3
	[3,3,3,3,3],//4
	[0,1,2,1,0],//5
	
	[3,2,1,2,3],//6
	[1,2,3,2,1],//7
	[2,1,0,1,2],//8
	[0,1,0,1,0],//9
	[1,2,1,2,1],//10
	
	[2,3,2,3,2],//11
	[1,0,1,0,1],//12
	[2,1,2,1,2],//13
	[3,2,3,2,3],//14
	[0,0,1,0,0],//15
	
	[3,3,2,3,3],//16
	[0,0,2,0,0],//17
	[3,3,1,3,3],//18
	[0,1,1,1,0],//19
	[3,2,2,2,3],//20
	
	[0,2,0,2,0],//21
	[3,1,3,1,3],//22  
	[0,2,3,2,0],//23
	[3,1,0,1,3],//24
	[0,2,2,2,0],//25
	
	[3,1,1,1,3],//26
	[0,3,0,3,0],//27
	[3,0,3,0,3],//28
	[0,3,1,3,0],//29
	[3,0,2,0,3],//30
	
	[0,3,3,3,0],//31
	[3,0,0,0,3],//32
	[1,0,0,0,1],//33
	[2,3,3,3,2],//34
	[1,0,2,0,1],//35
	
	[2,3,1,3,2],//36
	[1,1,0,1,1],//37
	[2,2,3,2,2],//38
	[1,1,2,1,1],//39
	[2,2,1,2,2],//40
	
	[1,1,3,1,1],//41
	[2,2,0,2,2],//42
	[1,2,2,2,1],//43
	[2,1,1,1,2],//44
	[1,3,1,3,1],//45
	
	[2,0,2,0,2],//46
	[1,3,2,3,1],//47
	[2,0,1,0,2],//48
	[1,3,3,3,1],//49
	[2,0,0,0,2]	//	50 
 
     ];

    // Each payline vector consists of 8 points (0..7). First point (0) is next to the payline end, 2nd point (1) is 20 pixels from the payline end with same y value
    // next 5 points represent the centers of the 5 reels. Last point (7) is at the end of the reel strip whose y value is the same as the last 7th point - this makes the end of the vector horizontal
    // The modifier allows you to adjust each of the points on the symbols for better visual quality of the vector. (vector points 2,3,4,5,6)
    // 0 = symbol center - vector point is centered vertically on the symbol - the defafult
    // 1 = same height as the payline end - vector point y value matches the payline end height
    // 2 = average of the points one the left and right (used to remove doglegs) - the vector point is calculated so that the points on the left and right appear to be joined by a straight line

    // Note: paylines originating on the right hand side are "drawn" from right to left and those on the left are "drawn" left to right.

    this.paylinePointModifier = [
     	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],


          	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],

         	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],

         	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],

     	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],

         	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],

       	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],

         	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],

        	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],

          	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
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
			this.GAME_NAME = {x:354,y:1};
			this.REELBG = {x:0, y: 0};
			this.BTNBG = {x:0, y: 492};
			this.NUM_LINES_METER = {x:714,y:120};
			this.MESSAGE_BAR = {x:470,y:552};
			this.SPIN_BTN = {x:660,y:1320};
			this.BET_BTN = {x:800,y:40};
			this.LINE_BTN = {x:650,y:40};
			this.RULES_BTN = {x:650,y:180};
			this.AUTOPLAY_BTN = {x:800,y:180};
			this.MENU_BTN = {x:1,y:2};
      		this.WIN_METER 		= {x:466,y:494};
			this.WIN_METER_BG	= {x:186,y:440,w:562,h:72}; 
 
			
                break;

        }
    }
}


 