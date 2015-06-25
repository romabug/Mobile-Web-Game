function Layout(orientDir)
{
    this.REELS = {x:89,y:53};

    this.orientation   = 0;
    this.symbolWidth   = 150;
    this.symbolHeight  = 112;
    this.reelGap	   = 8; // the number of pixels between reels
    this.canvasYoffset = 32;

    this.paylineEndWidth  = 30;
    this.paylineEndHeight = 18;

    this.paylineColours = [	"rgb(3,152,165)",//1
        "rgb(165,2,141)",
        "rgb(174,2,2)",
        "rgb(11,164,5)",
        "rgb(2,2,134)",

        "rgb(166,121,2)",//6
        "rgb(183,42,1)",
        "rgb(13,55,192)",
        "rgb(68,1,111)",
        "rgb(133,173,5)",

        "rgb(134,14,169)",//11
        "rgb(106,110,101)",
        "rgb(128,31,2)",
        "rgb(2,103,185)",
        "rgb(185,85,48)",

        "rgb(152,31,46)",//16
        "rgb(41,1,165)",
        "rgb(202,1,69)",
        "rgb(2,177,96)",
        "rgb(118,154,4)",

        "rgb(2,2,139)",//21
        "rgb(39,192,33)",
        "rgb(218,0,17)",
        "rgb(218,78,2)",
        "rgb(240,56,228)",

        "rgb(201,53,4)",//26
        "rgb(10,50,184)",
        "rgb(74,2,119)",
        "rgb(116,156,0)",
        "rgb(161,2,138)",

        "rgb(54,116,116)",//31
        "rgb(170,0,0)",
        "rgb(2,132,145)",
        "rgb(165,0,141)",
        "rgb(170,1,1)",

        "rgb(8,158,2)",//36
        "rgb(1,1,124)",
        "rgb(156,113,1)",
        "rgb(73,168,0)",
        "rgb(2,2,172)",

        "rgb(8,165,18)",//41
        "rgb(233,1,19)",
        "rgb(222,81,2)",
        "rgb(245,57,234)",
        "rgb(5,157,172)",

        "rgb(195,89,51)",//46
        "rgb(143,31,46)",
        "rgb(20,0,136)",
        "rgb(208,2,72)",
        "rgb(5,185,106)"
    ];

    this.payLineEndsLeft  = { x:53, y:64 };
    this.payLineEndsRight = { x:877, y:64 };

    this.paylineEndPositions = [
        [{x:0,y:0}],   //1
        [{x:0,y:18}],  //2
        [{x:0,y:36}],  //3
        [{x:0,y:54}],  //4
        [{x:0,y:72}],  //5

        [{x:0,y:90}],  //6
        [{x:50,y:0}],  //7
        [{x:50,y:18}], //8
        [{x:50,y:36}], //9
        [{x:50,y:54}], //10

        [{x:50,y:72}], //11
        [{x:50,y:90}], //12
        [{x:0,y:108}], //13
        [{x:0,y:126}], //14
        [{x:0,y:144}], //15

        [{x:0,y:162}], //16
        [{x:0,y:180}], //17
        [{x:0,y:198}], //18
        [{x:50,y:108}],//19
        [{x:50,y:126}],//20

        [{x:50,y:144}],//21
        [{x:50,y:162}],//22
        [{x:50,y:180}],//23
        [{x:50,y:198}],//24
        [{x:50,y:216}],//25

        [{x:0,y:216}], //26
        [{x:0,y:234}], //27
        [{x:0,y:252}], //28
        [{x:0,y:270}], //29
        [{x:0,y:288}], //30

        [{x:0,y:306}], //31
        [{x:0,y:324}], //32
        [{x:50,y:234}],//33
        [{x:50,y:252}],//34
        [{x:50,y:270}],//35

        [{x:50,y:288}],//36
        [{x:50,y:306}],//37
        [{x:50,y:324}],//38
        [{x:0,y:342}], //39
        [{x:0,y:360}], //40

        [{x:0,y:378}], //41
        [{x:0,y:396}], //42
        [{x:0,y:414}], //43
        [{x:0,y:432}], //44
        [{x:50,y:342}],//45

        [{x:50,y:360}],//46
        [{x:50,y:378}],//47
        [{x:50,y:396}],//48
        [{x:50,y:414}],//49
        [{x:50,y:432}] //50
    ];


    this.paylineShapes = [
        [0,0,0,0,0],//1
        [0,0,1,0,0],
        [0,1,1,1,0],
        [0,1,2,1,0],
        [0,1,0,1,0],  

        [0,0,0,1,0],//6
        [0,1,0,0,0],
        [0,0,1,1,0],
        [0,1,1,0,0],
        [0,0,2,0,0],

        [0,0,2,1,0],//11
        [0,1,2,0,0],
        [1,1,1,1,1],
        [1,1,2,1,1],
        [1,1,0,1,1],

        [1,2,2,2,1],//16
        [1,0,0,0,1],
        [1,2,1,2,1],
        [1,0,1,0,1],
        [1,1,1,2,1],
   
        [1,1,1,0,1],//21
        [1,2,1,1,1],
        [1,0,1,1,1],
        [1,2,0,2,1],
        [1,0,2,0,1],

        [2,2,2,2,2],//26
        [2,2,3,2,2],
        [2,2,1,2,2],
        [2,3,3,3,2],
        [2,1,1,1,2],

        [2,3,2,3,2],//31
        [2,1,2,1,2],
        [2,2,2,3,2],
        [2,2,2,1,2],
        [2,3,2,2,2],

        [2,1,2,2,2],//36
        [2,3,1,3,2],
        [2,1,3,1,2],
        [3,3,3,3,3],
        [3,3,2,3,3],

        [3,2,2,2,3],//41
        [3,2,1,2,3],
        [3,2,3,2,3],
        [3,3,3,2,3],
        [3,2,3,3,3],

        [3,3,2,2,3],//46
        [3,2,2,3,3],
        [3,3,1,3,3],
        [3,3,1,2,3],
        [3,2,1,3,3]
    ];

    // Each payline vector consists of 8 points (0..7). First point (0) is next to the payline end, 2nd point (1) is 20 pixels from the payline end with same y value
    // next 5 points represent the centers of the 5 reels. Last point (7) is at the end of the reel strip whose y value is the same as the last 7th point - this makes the end of the vector horizontal
    // The modifier allows you to adjust each of the points on the symbols for better visual quality of the vector. (vector points 2,3,4,5,6)
    // 0 = symbol center - vector point is centered vertically on the symbol - the defafult
    // 1 = same height as the payline end - vector point y value matches the payline end height
    // 2 = average of the points one the left and right (used to remove doglegs) - the vector point is calculated so that the points on the left and right appear to be joined by a straight line

    // Note: paylines originating on the right hand side are "drawn" from right to left and those on the left are "drawn" left to right.

    this.paylinePointModifier = [
        [0,0,0,0,0],  //1
        [0,0,0,0,0],
        [1,0,0,0,0],
        [1,2,0,2,1],
        [1,0,0,0,0],

        [0,0,0,0,0],  //6
        [1,1,1,0,0],
        [2,0,0,0,0],
        [1,1,0,0,0],
        [1,1,0,0,0],

        [1,2,0,0,0],  //11
        [0,0,0,2,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [1,1,0,0,0],

        [1,0,0,0,0],  //16
        [1,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [1,0,0,0,0],

        [1,0,0,0,0],  //21
        [1,1,1,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
        [2,0,0,0,0],

        [0,0,0,0,0],  //26
        [0,0,0,0,0],
        [1,1,0,0,0],
        [1,0,0,0,0],
        [1,0,0,0,0],

        [0,0,0,0,0],  //31
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],

        [0,0,0,0,0], //36
        [0,0,0,0,0],
        [2,0,0,0,0],
        [0,0,0,0,0],
        [1,1,0,0,0],

        [1,0,0,0,0], //41
        [1,2,0,2,0],
        [2,0,0,0,0],
        [0,2,0,0,0],
        [0,0,0,0,0],

        [1,0,0,0,0], //46
        [1,1,0,0,0],
        [1,1,0,0,0],
        [2,2,0,0,0],
        [0,0,0,2,0]
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
						/*this.SPIN2_BTN = { x:-1000, y:419 };
			this.START_AUTOPLAY2_BTN = { x:-1000 , y:419 };
			this.STOP_AUTOPLAY2_BTN  = { x:-1000, y:419 };
      this.GAMES_REMAINING2_METER = { x:-1000, y:419 };*/
	  
            case 1:
						/*this.SPIN2_BTN = { x:-1000, y:419 };
			this.START_AUTOPLAY2_BTN = { x:-1000 , y:419 };
			this.STOP_AUTOPLAY2_BTN  = { x:-1000, y:419 };
      this.GAMES_REMAINING2_METER = { x:-1000, y:419 };*/
			
            case 2:
				//this.SPIN2_BTN = { x:-1000, y:419 };
				//this.START_AUTOPLAY2_BTN = { x:-1000 , y:419 };
				//this.STOP_AUTOPLAY2_BTN  = { x:-1000, y:419 };
      			//this.GAMES_REMAINING2_METER = { x:-1000, y:419 }; 
                this.width  = 960;
                this.height = 568;
                this.GAME_NAME = {x:302,y:-8};
                this.TOP_MESSAGE_BAR = {x:179,y:0};
                this.SMALL_PANEL = {x:119,y:57};
                this.REELBG = {x:0, y: 0};
                this.BTNBG = {x:0, y: 492};
                this.NUM_LINES_METER = {x:714,y:120};
                this.MESSAGE_BAR = {x:480,y:538};
                this.SPIN_BTN = {x:660,y:1320}; 
                this.BET_BTN = {x:800,y:40};
                this.LINE_BTN = {x:650,y:40};
                this.RULES_BTN = {x:650,y:180};
                this.AUTOPLAY_BTN = {x:800,y:180};
                this.MENU_BTN = {x:1,y:2};
				
            //this.SPIN_BTN = { x:-500, y:436 };
/*			

	this.SPIN_BTN_GLOW = { x:-815, y:208,  w:159, h:149};
 				
		this.SPIN2_BTN = { x:-1000, y:419 };
			this.START_AUTOPLAY2_BTN = { x:-1000 , y:419 };
			this.STOP_AUTOPLAY2_BTN  = { x:-1000, y:419 };
      this.GAMES_REMAINING2_METER = { x:-1000, y:419 };
 */
				 
                break; 

        }
    }
}
