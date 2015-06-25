// This class represents the welcome screen
function Button4(config,buttonTxt)		// Draws buttons without an image using a gradient fill, and uses text on the button
{
  this.width  = config.width;
  this.height = config.height;
  this.radius = config.radius;
  this.X = 0;
  this.Y = 0;
  
  this.fillGrad 	= null;
  this.borderGrad 	= null;
  this.textCol 		= 'rgb(100,100,100)';
  
  this.isDown = false;
  this.isDisabled = false;

  this.scale = 0.9;

  this.hitPadding = 0; 	// Increases the size of the clickable area around the button. The number represents the number of pixels to grow the area all around the button. 

  this.txt = new Text();
  this.txt.font   = "24px arial";
  this.txt.align  = "center";
  this.txt.m_Color = '#FFFFFF';
  this.txt.stroke_0_Color = 'black';
  this.txt.stroke_0_Width = 3;
  this.txt.m_Text = buttonTxt;

  this.setPosition = function(position)
  {
    this.X = position.x;
    this.Y = position.y;
	
  	this.txt.setPosition({x:this.X + this.width/2, y:this.Y + this.height/2 + 10});		// TODO: Center in the button
  }
  
  this.setColours = function(fillGrad, borderGrad, textCol)
  {
	  this.fillGrad 	= fillGrad;
	  this.borderGrad 	= borderGrad;
	  this.textCol 		= textCol;
  }
  
  this.updateScale = function(deltaTime)
  {
	  if(this.isDown)
	  {
		  this.scale -= 0.01;
		  if(this.scale <= 0.7)
		  {
			  this.scale = 0.7;
		  }
	  }
  }

  this.draw = function()
  {
    try 
    {
    	if(this.isDisabled)
    	{
//			ctx.drawImage(this.image, this.dx, this.dy, this.dwidth, this.dheight, this.X, this.Y, this.dwidth, this.dheight);
    	}
    	else
    	{
		    welcome.welcomeCtx.lineWidth = 2;
		    welcome.welcomeCtx.strokeStyle = 'rgb(153, 189, 103)';
		  
 			var gradient = welcome.welcomeCtx.createLinearGradient(this.X, this.Y, this.X, this.Y+this.height);
			gradient.addColorStop(0, 'rgb(181,189,200)' );
			gradient.addColorStop(0.36, 'rgb(130,140,149)');
			gradient.addColorStop(1, 'rgb(40,52,59)');

 			var gradient2 = welcome.welcomeCtx.createLinearGradient(this.X, this.Y, this.X, this.Y+this.height);
			gradient2.addColorStop(0,'rgb(100,100,100)');
			gradient2.addColorStop(0.2,'rgb(100,100,100)');
			gradient2.addColorStop(0.8,'rgb(100,100,100)');
			gradient2.addColorStop(1,'rgb(0,0,0)'); 

			welcome.welcomeCtx.fillStyle   = gradient;	  
		  	welcome.welcomeCtx.strokeStyle = gradient2;

		    if(this.isDown)
		    {
			  welcome.welcomeCtx.fillRectR(this.X+4,this.Y+4,this.width-8,this.height-8,this.radius);
		  	  welcome.welcomeCtx.strokeRectR(this.X+4,this.Y+4,this.width-8,this.height-8,this.radius);
		  	  this.txt.draw(welcome.welcomeCtx);
		    }
		    else
		    {
			  welcome.welcomeCtx.fillRectR(this.X,this.Y,this.width,this.height,this.radius);
		  	  welcome.welcomeCtx.strokeRectR(this.X,this.Y,this.width,this.height,this.radius);
		  	  this.txt.draw(welcome.welcomeCtx);
		    }
	    }
    } 
    catch (e) 
    {
    };
  }
  
  this.isOver = function(mouseCoords)
  {
  	if(this.isDisabled)
  	{
  		return false;
  	}
  
  	if(mouseCoords.x > (this.X - this.hitPadding) && mouseCoords.x < (this.X + this.width + this.hitPadding) &&
  	   mouseCoords.y > (this.Y - this.hitPadding) && mouseCoords.y < (this.Y + this.height + this.hitPadding) )
  	 {
  	 	return true;
  	 }
  	 else
  	 {
  	 	return false;
  	 }
  }
  
};

function Welcome()
{
	this.welcomeCanv = document.createElement('canvas'); // off screen canvas for the meters for efficiency

	var WELCOME_WIDTH  = 700;
	var WELCOME_HEIGHT = 400;
	
	this.welcomeCanv.width  = WELCOME_WIDTH;
	this.welcomeCanv.height = WELCOME_HEIGHT;
	this.welcomeCtx     = this.welcomeCanv.getContext('2d');
	
	//TODO: Do all initialization here
	this.WS_LOADING = 0;
	this.WS_AUDIO   = 1;
	this.WS_LOADED  = 2;
	this.WS_WAITING_FOR_INIT  = 3;
	this.WS_WAITING_FOR_SOUND = 4;
	
	this.userAgent = navigator.userAgent.toLowerCase();
	this.Android = (/Android/i.test(this.userAgent)); 
	this.AndroidVer = -1;
	if(this.Android)
	{
		this.AndroidVer = parseFloat(this.userAgent.slice(this.userAgent.indexOf("android")+8)); 
	}	
	
	this.state = this.WS_LOADING;		//0 = loading bar, 1 = Audio question, 2 = loading complete
	
	this.waitForSoundToLoad = false;			// If we want to wait for the sound to finish loading before jumping into the game
	
	var that = this;
	this.nameY = -1000; 
	this.nameLoaded = false;
	
	this.gameName = new Image();
	this.gameName.onload = function() { 
		var pageHeight = c.height; //Number(windowObj.getSize().h);
		var middle = Math.floor(pageHeight/2);
		that.nameY = middle - that.gameName.height - that.gameNameOffset; 
		that.nameLoaded = true;
	};
	this.gameName.src = "gamename.png";

	this.yesButton = new Button4({width:200,height:60,radius:10},MESSAGE_BTN_YES,this.welcomeCtx);
	this.noButton  = new Button4({width:200,height:60,radius:10},MESSAGE_BTN_NO,this.welcomeCtx);
		
	this.welcomeTxt = new Text();
	this.welcomeTxt.font   			= "32px arial";
	this.welcomeTxt.align  			= "center";
	this.welcomeTxt.stroke_0_Color 	= 'black';
	this.welcomeTxt.stroke_0_Width 	= 4;
	
	this.copyrightTxt = new Text();
	this.copyrightTxt.font   		= "18px arial";
	this.copyrightTxt.align  		= "center";
	this.copyrightTxt.m_Color 		= '#DDDDDD';
	this.copyrightTxt.stroke_0_Color = '#303030';
	this.copyrightTxt.stroke_0_Width = 3;
	this.copyrightTxt.m_Text 		 = TXT_COPY_RIGHT_MESSAGES; //Copyright 2012 Nextgen Gaming
	
	this.welcomeMessageTxtY = 0; 

	this.soundTxt = new Text();
	this.soundTxt.font   			= "24px arial";
	this.soundTxt.align  			= "center";
	this.soundTxt.m_Color 			= '#FFFFFF';
	this.soundTxt.stroke_0_Color 	= 'black';
	this.soundTxt.stroke_0_Width 	= 2;
	this.soundTxt.m_Text 			= TXT_USE_SOUND;

	this.soundTxt2 = new Text();
	this.soundTxt2.font   			= "24px arial";
	this.soundTxt2.align  			= "center";
	this.soundTxt2.m_Color 			= '#FFFFFF';
	this.soundTxt2.stroke_0_Color 	= 'black';
	this.soundTxt2.stroke_0_Width 	= 2;
	this.soundTxt2.m_Text 			= TXT_USE_SOUND;

// -----------------------------------------------------------------------
	this.progressBarPercent = 0;		//0.0 - 1.0
	this.progressBarWidth   = 350;
	this.progressBarHeight  = 5;
	this.progressBarX  		= 20;
	this.progressBarY  		= 20;
	this.gameNameOffset		= 50;

	this.loadingTxt = new Text();
	this.loadingTxt.font   			= "24px arial";
	this.loadingTxt.align  			= "center";
	this.loadingTxt.m_Color 		= '#FFFFFF';
	this.loadingTxt.stroke_0_Color 	= 'black';
	this.loadingTxt.stroke_0_Width 	= 2;
	this.loadingTxt.m_Text 			= TXT_LOADING;

	this.loadingSoundTxt = new Text();
	this.loadingSoundTxt.font  			= "24px arial";
	this.loadingSoundTxt.align 			= "center";
	this.loadingSoundTxt.m_Color 		= '#FFFFFF';
	this.loadingSoundTxt.stroke_0_Color = 'black';
	this.loadingSoundTxt.stroke_0_Width = 2;
	this.loadingSoundTxt.m_Text 		= TXT_LOADING; //"Loading Sound...";


	this.loadingPercentTxt = new Text();
	this.loadingPercentTxt.font   			= "24px arial";
	this.loadingPercentTxt.align  			= "center";
	this.loadingPercentTxt.m_Color 			= '#FFFFFF';
	this.loadingPercentTxt.stroke_0_Color 	= 'black';
	this.loadingPercentTxt.stroke_0_Width 	= 2;
	this.loadingPercentTxt.m_Text 			= "0%";
	
	this.gameLoaded = function()
	{
		return this.state == this.WS_LOADED;
	}
	
	this.soundFinishedLoading = function()
	{
		this.state = this.WS_LOADED;
	}

	this.scale     = 1.0;
	this.MAX_SCALE = 1.0;
	this.Xoffset   = 0;
	this.Yoffset   = 0;
	
	this.calculateScale = function(w_width,w_height)	// calculate the new screen size and offset based on the given window width and height
	{
		var aspectRatio = w_width/w_height;
		
		if(aspectRatio > WELCOME_WIDTH/WELCOME_HEIGHT)	// need to center the game with side bars
		{
			this.scale    = w_height/WELCOME_HEIGHT; 
			if(this.scale > this.MAX_SCALE) {
				this.scale = this.MAX_SCALE;
			}
			var newWidth = WELCOME_WIDTH*this.scale;
			this.Xoffset  = (w_width/2) - (newWidth/2);
			this.Yoffset = w_height/2 - (WELCOME_HEIGHT/2)*this.scale;
		}
		else  // need to make it full width with space at the bottom.
		{
			this.scale = w_width/WELCOME_WIDTH;
			if(this.scale > this.MAX_SCALE) {
				this.scale = this.MAX_SCALE;
			}
			this.Xoffset = w_width/2 - (WELCOME_WIDTH/2)*this.scale;
			this.Yoffset = (w_height/2) - ((WELCOME_HEIGHT/2)*this.scale) ;
		}
	}
	

	this.layout = function()
	{
		var pageWidth  = c.width; 
		var pageHeight = c.height; 

		this.calculateScale(pageWidth,pageHeight);

		var middle = Math.floor(pageHeight/2);

		this.progressBarY = WELCOME_HEIGHT/2 + 20;		// where on the page the loading bar and Audio question goes
		
		this.loadingTxt.setPosition({x:WELCOME_WIDTH/2,y:WELCOME_HEIGHT/2});
		this.loadingSoundTxt.setPosition({x:WELCOME_WIDTH/2,y:WELCOME_HEIGHT/2});
		this.progressBarX = WELCOME_WIDTH/2 - this.progressBarWidth/2;
		this.loadingPercentTxt.setPosition({x:WELCOME_WIDTH/2,y:this.progressBarY + 50});
		
		this.yesButton.setPosition({x:WELCOME_WIDTH/2 - 210,y:WELCOME_HEIGHT/2 + 20});
		this.noButton.setPosition({x:WELCOME_WIDTH/2 + 10,y:WELCOME_HEIGHT/2 + 20});
		
		this.soundTxt.setPosition({x:WELCOME_WIDTH/2,y:WELCOME_HEIGHT/2});
		this.soundTxt2.setPosition({x:WELCOME_WIDTH/2,y:WELCOME_HEIGHT/2});
		this.copyrightTxt.setPosition({x:WELCOME_WIDTH/2, y:WELCOME_HEIGHT - 20});
	}
	
	
	this.draw = function()
	{
		if(this.state == this.WS_LOADED){
			return;
		}

		this.welcomeCtx.clearRect(0,0,WELCOME_WIDTH-1, WELCOME_HEIGHT);

		this.welcomeCtx.save();
		this.welcomeCtx.shadowColor = "black";
		this.welcomeCtx.shadowBlur = 5;
		this.welcomeCtx.shadowOffsetX = 4;
		this.welcomeCtx.shadowOffsetY = 4;
		
		if(this.nameLoaded) {
			this.welcomeCtx.drawImage(this.gameName, (WELCOME_WIDTH/2) - (this.gameName.width/2), WELCOME_HEIGHT/2 - this.gameName.height - 40);
		}
	
		this.welcomeCtx.restore();
		
		this.copyrightTxt.draw(this.welcomeCtx);
		
		ctx.save();
		ctx.setTransform(1,0,0,1,0,0);
		ctx.clearRect(0,0,c.width-1, c.height);
		ctx.restore();
		
		if (c.style.opacity == 1) {
			c.style.opacity = 0.99;
		} else {
			c.style.opacity = 1;
		}
		
		/*if (this.Android && this.AndroidVer != 4.3 && this.AndroidVer != 4.4 )
		{
			var w = c.width;
  			c.width = 1;
  			c.width = w;
		}*/
		
		switch(this.state)
		{
			case this.WS_LOADING:
			case this.WS_WAITING_FOR_INIT:
			{
				this.welcomeCtx.save();
				this.welcomeCtx.beginPath();
				this.welcomeCtx.rect(this.progressBarX , this.progressBarY , this.progressBarWidth , this.progressBarHeight );
				this.welcomeCtx.fillStyle = 'black';
				this.welcomeCtx.fill();
	
				this.welcomeCtx.shadowColor = "white";
				this.welcomeCtx.shadowBlur = 5;
				this.welcomeCtx.shadowOffsetX = 0;
				this.welcomeCtx.shadowOffsetY = 0;
				
				var gg = this.welcomeCtx.createLinearGradient(this.progressBarX, this.progressBarY, this.progressBarWidth * this.progressBarPercent + this.progressBarX, this.progressBarY);
				gg.addColorStop(0, '#C0C0ff');
				gg.addColorStop(1.0, '#ffffff');
	
				this.welcomeCtx.fillStyle = gg;
	
				this.welcomeCtx.beginPath();
				this.welcomeCtx.rect(this.progressBarX, this.progressBarY, this.progressBarWidth * this.progressBarPercent, this.progressBarHeight);
				this.welcomeCtx.fill();
	
				var x = this.progressBarWidth * this.progressBarPercent + this.progressBarX;
				var y = this.progressBarY + (this.progressBarHeight/2);
				var size = 5;
	
				var g = this.welcomeCtx.createRadialGradient(x,y,size, x,y, size*3);
				g.addColorStop(0,"rgba(255,255,255,1)");
				g.addColorStop(1.0,"rgba(255,255,255,0)");
				
				var g2 = this.welcomeCtx.createRadialGradient(x-5,y,size, x-5,y, size*2);
				g2.addColorStop(0,"rgba(255,255,255,1)");
				g2.addColorStop(1.0,"rgba(255,255,255,0)");
	
				var g3 = this.welcomeCtx.createRadialGradient(x-10,y,size, x-10,y, 8);
				g3.addColorStop(0,"rgba(255,255,255,1)");
				g3.addColorStop(1.0,"rgba(255,255,255,0)");
				
				this.welcomeCtx.fillStyle = g;
				this.welcomeCtx.beginPath();
				this.welcomeCtx.arc(x, y, size*3, 0, Math.PI*2, false);
				this.welcomeCtx.fill();    
				
				this.welcomeCtx.fillStyle = g2;
				this.welcomeCtx.beginPath();
				this.welcomeCtx.arc(x-5, y, size*2, 0, Math.PI*2, false);
				this.welcomeCtx.fill();    
				
				this.welcomeCtx.fillStyle = g3;
				this.welcomeCtx.beginPath();
				this.welcomeCtx.arc(x-10, y,8, 0, Math.PI*2, false);
				this.welcomeCtx.fill();    
				
				this.welcomeCtx.restore();
				
				this.welcomeCtx.save();
				this.welcomeCtx.shadowColor = "black";
				this.welcomeCtx.shadowBlur = 5;
				this.welcomeCtx.shadowOffsetX = 2;
				this.welcomeCtx.shadowOffsetY = 2;
	
				this.loadingTxt.draw(this.welcomeCtx);
				this.loadingPercentTxt.draw(this.welcomeCtx);
				this.welcomeCtx.restore();
			}
			break;
			
			case this.WS_WAITING_FOR_SOUND:
			{
				this.welcomeCtx.save();
				this.welcomeCtx.shadowColor = "black";
				this.welcomeCtx.shadowBlur = 5;
				this.welcomeCtx.shadowOffsetX = 2;
				this.welcomeCtx.shadowOffsetY = 2;
	
				this.loadingSoundTxt.draw(this.welcomeCtx);
				this.welcomeCtx.restore();
			}
			break;
			
			case this.WS_AUDIO:
			{
				this.welcomeCtx.save();
				this.welcomeCtx.shadowColor = "black";
				this.welcomeCtx.shadowBlur = 5;
				this.welcomeCtx.shadowOffsetX = 2;
				this.welcomeCtx.shadowOffsetY = 2;
	
				this.soundTxt2.draw(this.welcomeCtx);
				this.welcomeCtx.restore();
				this.yesButton.draw();
				this.noButton.draw();
			}
			break;
		}
		
		ctx.drawImage(this.welcomeCanv,0,0,WELCOME_WIDTH,WELCOME_HEIGHT,this.Xoffset,this.Yoffset,WELCOME_WIDTH*this.scale,WELCOME_HEIGHT*this.scale);
	}
	
	this.updateProgressBar = function(count, total)
	{
		this.progressBarPercent = ((Number(count)+1)/Number(total));
		if(this.progressBarPercent >= 1.0)
		{
			this.progressBarPercent = 1.0;
		}
		
		this.loadingPercentTxt.m_Text = Math.floor(this.progressBarPercent*100)+"%";
		
		if(count >= total) {
			if(this.state == this.WS_LOADING)
			{
				this.state = this.WS_WAITING_FOR_INIT;
				this.loadingTxt.m_Text = TXT_CONNECTING_TO_SERVER;
			}
        }
		this.draw();
		if(typeof(windowObj.updateProgress) === "function") {
			windowObj.updateProgress(count,total);		//used to inform the 888 wrapper that we are loading the assets. 
		}
	}
	
	this.initComplete = function()
	{
		this.state = this.WS_AUDIO;
		this.draw();
	}

	this.translateCoords = function(coords) {
		return {x:Math.floor((coords.x - this.Xoffset) / this.scale), y: Math.floor((coords.y - this.Yoffset) / this.scale) };
	}
	

	this.processClick = function(coords,evt)
	{
		var newCoords = this.translateCoords(coords);
		if(this.state == this.WS_AUDIO)
		{
			evt.preventDefault();

			if(this.yesButton.isOver(newCoords)) {
				this.yesButton.isDown = true;
				this.draw();
				if(this.waitForSoundToLoad) {
					this.state = this.WS_WAITING_FOR_SOUND;
				}
				else {
					this.state = this.WS_LOADED;
				}
				return 1;
			}
			if(this.noButton.isOver(newCoords)) {
				this.noButton.isDown = true;
				this.draw();
				this.state = this.WS_LOADED;
				return 0;
			}
		}
		return -1;
	}
	
	this.processClickRelease = function(coords)
	{
		var newCoords = this.translateCoords(coords);
		if(this.state == this.WS_AUDIO)
		{

			if(this.yesButton.isOver(newCoords) && this.yesButton.isDown) 	{
				this.yesButton.isDown = false;
				this.draw();
				c.style.opacity = 1;
				return;
			}
			if(this.noButton.isOver(newCoords) && this.noButton.isDown) 	{
				this.noButton.isDown  = false;
				this.draw();
				c.style.opacity = 1;
				return;
			}
		}
	}
	
	this.drawTimerID = 0;
	
	this.startDraw = function() 
	{
		this.drawTimerID = setInterval( function() { welcome.draw(); },100);
	}

	this.stopDraw = function() 
	{
		clearInterval(this.drawTimerID);
	}
	
	this.buttonsUp = function()
	{
//		if(this.state == this.WS_AUDIO)
//		{
//			this.yesButton.isDown = false;
//			this.noButton.isDown  = false;
//			this.draw();
//		}
	}
}


