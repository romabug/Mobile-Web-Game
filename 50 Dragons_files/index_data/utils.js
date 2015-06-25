//----------------- Asset manager -----------------------------------------
function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
	this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.queueFiles = function(paths) {
	for(var i=0;i < paths.length; i++)	{
		this.downloadQueue.push(paths[i]);
	}
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
}

AssetManager.prototype.downloadAll = function(downloadCallback,progressCallback) {
	var total = 1;
	if (this.downloadQueue.length === 0) {
      downloadCallback();
	}
	else
	{
		total = this.downloadQueue.length;
	}
	
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        var that = this;

		img.addEventListener("load", function() {
			that.successCount += 1;
			progressCallback(that.successCount,total);
			if (that.isDone()) {
				downloadCallback();
			}
		}, false);
		
		img.addEventListener("error", function(e) {
			that.errorCount += 1;
			
			var url = e.target.src;
			var arrUrl = url.split("/");
			console.log('Error!\n\nCould not find file: ' + arrUrl[arrUrl.length - 1] + ' on the server.');
			if (that.isDone()) {
				downloadCallback();
			}
		}, false);

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getAsset = function(path) {
	if( typeof(this.cache[path]) == 'undefined' )
	{
		console.log('Error!\n\nCould not find file: ' + path + ' in the Asset Manager.\nCheck to make sure it is included in the download queue.');
		return null;
	}
	else
	{
	    return this.cache[path];
	}
}
//----------------- Asset manager -----------------------------------------



function InRange(val,valMin,valMax)
{
	return (valMin <= val && val <= valMax);
}


//--------------------------------------------------------------
function ngImage(texture)
{
  	this.image  = texture; 
	this.frameCount = this.image.numframes;
	
  	this.width  = this.image.width / this.frameCount;
  	this.height = this.image.height;
  	this.X = 0;
  	this.Y = 0;  

	this.currentFrame   = 0;
	this.animRunning    = false;
	this.animRate       = 10;
	this.loop           = false;
	this.loopStartFrame = 0;
	this.elapsedTime    = 0;

	this.setPosition = function(x, y)
	{
	    this.X = x;
	    this.Y = y;
	}
  
  	this.startAnim = function(bLoop,frame)
  	{
  		this.loop = bLoop;
		if(InRange(frame,0,this.frameCount))
		{
			this.currentFrame = frame;
			this.elapsedTime  = frame * this.animRate * 1000;	
			this.animRunning  = true;
		}
  	}
  
  	this.stopAnim = function(reset)
  	{
  		this.animRunning = false;
  		if(reset)
  		{
  			this.currentFrame = 0;
  		}
  	}

	this.draw = function()
	{
	    try 
	    {
		  var width = this.width;
		  var height = this.height;
	      ctx.drawImage(this.image, (this.currentFrame * width), 0, width, height, this.X, this.Y, width, height);
	    } 
	    catch (e) {};
	}
	
	this.draw2 = function(frame,x,y)
	{
	    try 
	    {
		  var width = this.width;
		  var height = this.height;
	      ctx.drawImage(this.image, (frame * width), 0, width, height, x, y, width, height);
	    } 
	    catch (e) {};
	}
	
	
	
	this.update = function(deltaTime)
	{
		if(this.animRunning)
		{
			this.elapsedTime += deltaTime;
			// calculate the correct frame based on the elapsed time
			this.currentFrame = Math.round((((this.elapsedTime * this.animRate)/1000)));

			if(this.loop)
			{
				if(	this.loopStartFrame != 0 && this.currentFrame >= this.loopStartFrame)
				{
					this.currentFrame = (this.currentFrame % (this.frameCount-this.loopStartFrame)) + this.loopStartFrame;
				}
				else
				{
					this.currentFrame = this.currentFrame % this.frameCount;
				}
			}
			else
			{
				if(this.currentFrame >= this.frameCount)
				{
					this.currentFrame = this.frameCount - 1;
					this.animRunning = false;

//					FinishAnim();		  //GK 060711 - does not stop reset to the first frame at the end of the animation
	//				StopAnim();
				}
			}
		}
	}
}


//--------------------------------------------------------------
// 
function ngImage2(texture)
{
  	this.image  = texture; 
	this.frameCount = 0;
	
  	this.X = 0;
  	this.Y = 0;  

	this.currentFrame   = 0;
	this.animRunning    = false;
	this.animRate       = 10;
	this.loop           = false;
	this.loopStartFrame = 0;
	this.elapsedTime    = 0;
	this.actions		= null;
	this.nextActionIndex = 0;
	
	this.setAnimConfig = function(spriteDefs, config)
	{
		this.frameCount = config.length;
		
		this.textureIndexes = new Array();
		this.alpha    = new Array();
		this.xOffset  = new Array();
		this.yOffset  = new Array();
		this.scale    = new Array();
		this.rotation = new Array();
		this.actions  = new Array();
		
		for(var i=0; i < config.length; i++)
		{
			if(typeof config[i].t === "undefined") {
				this.textureIndexes.push(0);	// default value
			}
			else {
				this.textureIndexes.push(config[i].t);
			}
			
			if(typeof config[i].a === "undefined") {
				this.alpha.push(1.0);			// default value
			}
			else {
				this.alpha.push(config[i].a);
			}
			
			if(typeof config[i].x === "undefined") {
				this.xOffset.push(0);			// default value
			}
			else {
				this.xOffset.push(config[i].x);
			}
			
			if(typeof config[i].y === "undefined") {
				this.yOffset.push(0);			// default value
			}
			else {
				this.yOffset.push(config[i].y);
			}
			
			if(typeof config[i].s === "undefined") {
				this.scale.push(1.0);			// default value
			}
			else {
				this.scale.push(config[i].s);
			}
			
			if(typeof config[i].r === "undefined") {
				this.rotation.push(0);			// default value
			}
			else {
				this.rotation.push(config[i].r);
			}
			if(typeof config[i].l != "undefined") {
				this.loopStartFrame = i;
			}
			if(typeof config[i].a === "function") {
				this.actions.push({t: (i*1000)/this.animRate, f: config[i].a});
			}
		}
		
		this.spriteDefs = spriteDefs;
	}

	this.setPosition = function(x, y)
	{
	    this.X = x;
	    this.Y = y;
	}
  
  	this.startAnim = function(bLoop,frame)
  	{
  		this.loop = bLoop;
		if(InRange(frame,0,this.frameCount))
		{
			this.currentFrame = frame;
			this.elapsedTime  = frame * this.animRate * 1000;	
			this.animRunning  = true;
		}
  	}
  
  	this.stopAnim = function(reset)
  	{
  		this.animRunning = false;
  		if(reset)
  		{
  			this.currentFrame = 0;
			this.nextActionIndex = 0;
  		}
  	}
	
	this.stopAtlastFrame = function()
	{
		this.animRunning = false;
  		this.currentFrame = this.frameCount-1;
	}

	this.draw = function()
	{
	    try 
	    {
		  var oldAlpha = ctx.globalAlpha;
		  var frameScale = this.scale[this.currentFrame]; 
		  var tex = this.spriteDefs[ this.textureIndexes[this.currentFrame] ];
		  if (this.rotation[this.currentFrame]!= 0)
		  {
		  	ctx.save();
			ctx.translate(this.X + this.xOffset[this.currentFrame] + this.rotation[this.currentFrame].x, this.Y + this.yOffset[this.currentFrame] + this.rotation[this.currentFrame].y);
			ctx.rotate(Math.PI / 360 * this.rotation[this.currentFrame].rt);
			ctx.globalAlpha = this.alpha[this.currentFrame];
	        ctx.drawImage(this.image, 
					   tex.x,
					   tex.y,
					   tex.w,
					   tex.h,
					   -this.rotation[this.currentFrame].x, 
					   -this.rotation[this.currentFrame].y, 
					   tex.w * frameScale, 
					   tex.h  * frameScale);
			 ctx.restore();
		  } else {
		  	  ctx.globalAlpha = this.alpha[this.currentFrame];
			  ctx.drawImage(this.image, 
						   tex.x,
						   tex.y,
						   tex.w,
						   tex.h,
						   this.X + this.xOffset[this.currentFrame], 
						   this.Y + this.yOffset[this.currentFrame], 
						   tex.w * frameScale, 
						   tex.h  * frameScale);
		  }
		  ctx.globalAlpha = oldAlpha;
		  
	    } 
	    catch (e) {};
	}

	this.drawXY = function(x,y)
	{
	    try 
	    {
		  var oldAlpha = ctx.globalAlpha;
		  var frameScale = this.scale[this.currentFrame]; 
		  var tex = this.spriteDefs[ this.textureIndexes[this.currentFrame] ];
		  
		  ctx.globalAlpha = this.alpha[this.currentFrame];
	      ctx.drawImage(this.image, 
					   tex.x,
					   tex.y,
					   tex.w,
					   tex.h,
					   x + this.xOffset[this.currentFrame], 
					   y + this.yOffset[this.currentFrame], 
					   tex.w * frameScale, 
					   tex.h  * frameScale);
		  ctx.globalAlpha = oldAlpha;
	    } 
	    catch (e) {};
	}

	
	this.update = function(deltaTime)
	{
		if(this.animRunning)
		{
			this.elapsedTime += deltaTime;
			
			if (this.actions.length > this.nextActionIndex && this.elapsedTime >= this.actions[this.nextActionIndex].t)
			{
				this.actions[this.nextActionIndex].f.call(this);
				this.nextActionIndex++;
			}
			
			// calculate the correct frame based on the elapsed time
			this.currentFrame = Math.round((((this.elapsedTime * this.animRate)/1000)));

			if(this.loop)
			{
				if(	this.loopStartFrame != 0 && this.currentFrame >= this.loopStartFrame)
				{
					this.currentFrame = (this.currentFrame % (this.frameCount-this.loopStartFrame)) + this.loopStartFrame;
				}
				else
				{
					this.currentFrame = this.currentFrame % this.frameCount;
					if (this.currentFrame == 0)
					{
						this.nextActionIndex = 0;
					}
				}
			}
			else
			{
				if(this.currentFrame >= this.frameCount)
				{
					this.currentFrame = this.frameCount - 1;
					this.animRunning = false;
					this.nextActionIndex = 0;

//					FinishAnim();		  //GK 060711 - does not stop reset to the first frame at the end of the animation
	//				StopAnim();
				}
			}
		}
	}
}

function PopupBackground()
{
	this.draw = drawBackground;
	this.color = '#FFFFFF'
	
	this.colorStop_0 = null;
	this.colorStop_1 = null;
	this.colorStop_2 = null;
	
	this.X = 0;
	this.Y = 0;
	
	this.radius = 5;
	this.width = 100;
	this.height = 100;
	this.stokeWidth = 5;
	
	this.setPosition = function(x, y)
  	{
    	this.X = x;
    	this.Y = y;
  	}
	
	this.setStyle = function(format)
	{
		this.color		 = format.color;
		this.colorStop_0 = format.colorStop_0;
		this.colorStop_1 = format.colorStop_1;
		this.colorStop_2 = format.colorStop_2;
		
		this.radius		= format.radius;
		this.width 		= format.width;
		this.height 	= format.height;
		
		this.stokeWidth = format.stokeWidth;
		this.stokeColor = format.stokeColor;
		
	}
	
	function drawBackground (ctx) {
		ctx.beginPath();
		ctx.moveTo(this.X + this.radius, this.Y);
		ctx.lineTo(this.X  + this.width - this.radius, this.Y);
		ctx.quadraticCurveTo(this.X  + this.width, this.Y, this.X  + this.width, this.Y + this.radius);
		ctx.lineTo(this.X  + this.width, this.Y + this.height - this.radius);
		ctx.quadraticCurveTo(this.X  + this.width, this.Y + this.height, this.X  + this.width - this.radius, this.Y + this.height);
		ctx.lineTo(this.X  + this.radius, this.Y + this.height);
		ctx.quadraticCurveTo(this.X , this.Y + this.height, this.X , this.Y + this.height - this.radius);
		ctx.lineTo(this.X , this.Y + this.radius);
		ctx.quadraticCurveTo(this.X , this.Y, this.X  + this.radius, this.Y);
		ctx.closePath();
		
		if (this.colorStop_0 != null) {
			var fillgrd = ctx.createLinearGradient(this.X, this.Y, this.X, this.Y + this.height);
			fillgrd.addColorStop(this.colorStop_0[0], this.colorStop_0[1]);
			if (this.colorStop_1 != null) {
				fillgrd.addColorStop(this.colorStop_1[0], this.colorStop_1[1]);
			}
			if (this.colorStop_2 != null) {
				fillgrd.addColorStop(this.colorStop_2[0], this.colorStop_2[1]);
			}
			ctx.fillStyle = fillgrd;
		} else {
			ctx.fillStyle = this.color;
		}
		
		ctx.lineWidth = this.stokeWidth;
		ctx.strokeStyle = this.stokeColor;
		ctx.stroke();
		ctx.fill();
	}
}

//--------------------------------------------------------------

function Text()
{
	this.m_Text = "";	 
	this.m_Color = '#FFFFFF';
	this.draw = drawText;
	this.drawShadowed = drawTextShadowed;
	this.align = "right";
	this.font = null;
	this.fontStyle = null;
	this.fontWeight = null;
	this.fontSize = "15px";
	this.fontFamily = "arial";
	
	this.stroke_0_Color = null;
	this.stroke_0_Width = null;
	this.stroke_1_Color = null;
	this.stroke_1_Width = null;
	
	this.gradient_x0 = null;
	this.gradient_y0 = null;
	this.gradient_x1 = null;
	this.gradient_y1 = null;
	
	this.colorStop_0 = null;
	this.colorStop_1 = null;
	this.colorStop_2 = null;
	
	this.max_width = null;
	this.fontStr = "";
	
	
	this.X = 0;
  	this.Y = 0;  

  	this.setPosition = function(position)
  	{
    	this.X = position.x;
    	this.Y = position.y;
  	}
	
	this.setFormat = function(format)
	{
		this.align 		= format.align;
		this.m_Color 	= format.m_Color;
		this.fontStyle 	= format.font.fontStyle;
		this.fontWeight = format.font.fontWeight;
		this.fontSize 	= format.font.fontSize;
		this.fontFamily = format.font.fontFamily;
		

		this.stroke_0_Color = format.stroke_0_Color;
		this.stroke_0_Width = format.stroke_0_Width;
		this.stroke_1_Color = format.stroke_1_Color;
		this.stroke_1_Width = format.stroke_1_Width;
			
		this.gradient_x0 = format.gradient_x0;
		this.gradient_y0 = format.gradient_y0;
		this.gradient_x1 = format.gradient_x1;
		this.gradient_y1 = format.gradient_y1;
			
		this.colorStop_0 = format.colorStop_0;
		this.colorStop_1 = format.colorStop_1;
		this.colorStop_2 = format.colorStop_2;
		
		this.max_width = format.max_width;
		this.fontStr = "";
		this.fontStr += this.fontStyle == null?"":this.fontStyle+" ";
		this.fontStr += this.fontWeight == null?"":this.fontWeight+" ";
		this.fontStr += this.fontSize == null?"":this.fontSize+" ";
		this.fontStr += this.fontFamily == null?"":this.fontFamily+" ";
		this.fontStr = this.fontStr.length>0?this.fontStr.substring(0, this.fontStr.length-1):this.fontStr;
	
	}
	
	function drawText(ctx) 
	{
	  try {
		ctx.lineJoin="round";
		ctx.textAlign = this.align;
		ctx.font = this.fontStr == "" || this.fontStr == null? this.font: this.fontStr;
		
		//Support max_width feature
		if (this.max_width != null) {
			var fs = parseInt(this.fontSize.substring(0, this.fontStr.length-2));
			while (ctx.measureText(this.m_Text).width > this.max_width) {
				fs--;
				this.fontStr = "";
				this.fontStr += this.fontStyle == null?"":this.fontStyle+" ";
				this.fontStr += this.fontWeight == null?"":this.fontWeight+" ";
				this.fontStr += fs+"px ";
				this.fontStr += this.fontFamily == null?"":this.fontFamily+" ";
				this.fontStr = this.fontStr.length>0?this.fontStr.substring(0, this.fontStr.length-1):this.fontStr;
				ctx.font = this.fontStr;
			}
		}
		//Draw gradient
		if (this.gradient_x0 != null && this.gradient_y0 != null && this.gradient_x1 != null && this.gradient_y1 != null) {
			var grd=ctx.createLinearGradient(this.gradient_x0 + this.X - 5, this.gradient_y0 + this.Y - 20, this.gradient_x1 + this.X - 5, this.gradient_y1 + this.Y - 20);
			if (this.colorStop_0 != null) {
				grd.addColorStop(this.colorStop_0[0], this.colorStop_0[1])
			}
			if (this.colorStop_1 != null) {
				grd.addColorStop(this.colorStop_1[0], this.colorStop_1[1])
			}
			if (this.colorStop_2 != null) {
				grd.addColorStop(this.colorStop_2[0], this.colorStop_2[1])
			}
			ctx.fillStyle = grd;
		} else {
			ctx.fillStyle = this.m_Color;
		}
		
		//Draw strokes
		if (this.stroke_0_Color != null && this.stroke_0_Width != null) {
			ctx.strokeStyle = this.stroke_0_Color;
			ctx.lineWidth 	= this.stroke_0_Width;
			ctx.strokeText(this.m_Text, this.X, this.Y);
		}
		
		if (this.stroke_1_Color != null && this.stroke_1_Width != null) {
			ctx.strokeStyle = this.stroke_1_Color;
			ctx.lineWidth 	= this.stroke_1_Width;
			ctx.strokeText(this.m_Text, this.X, this.Y);
		}
		
		ctx.fillText(this.m_Text, this.X, this.Y);
 	  } catch(e){ };	
	}
	
	function drawTextShadowed(ctx) 
	{
		ctx.font = this.font;
		ctx.textAlign = this.align;	
		ctx.fillStyle = '#000000';
		
		ctx.fillText(this.m_Text, this.X+1, this.Y+1);
		
		ctx.fillStyle = this.m_Color;
		ctx.fillText(this.m_Text, this.X, this.Y);
	}
}


function TextFast(maxWidth,maxHeight)  //maximum size of text likely to be on canvas - for setting up the size of the internal off screen canvas (keep small to reduce memory usage Example 960x50)
{
	this.m_Text = "";	 
	this.m_Color = '#FFFFFF';
	this.draw = drawText;
	this.drawShadowed = drawTextShadowed;
	this.align = "right";
	this.font = null;
	this.fontStyle = null;
	this.fontWeight = null;
	this.fontSize = "15px";
	this.fontFamily = "arial";
	
	this.stroke_0_Color = null;
	this.stroke_0_Width = null;
	this.stroke_1_Color = null;
	this.stroke_1_Width = null;
	
	this.gradient_x0 = null;
	this.gradient_y0 = null;
	this.gradient_x1 = null;
	this.gradient_y1 = null;
	
	this.colorStop_0 = null;
	this.colorStop_1 = null;
	this.colorStop_2 = null;
	
	this.max_width = null;
	this.fontStr = "";
	
	this.X = 0;
  	this.Y = 0;  
	
	this.visible = true;
	
	var txtCanv = document.createElement('canvas'); // this is used for generating a set of textures for the payline ends
	//// you can uncomment the next line to display the hidden canvas, to help you debuging.
	//document.getElementsByTagName("body").item(0).appendChild(txtCanv);
	txtCanv.width  = maxWidth;
	txtCanv.height = maxHeight;
	var txtCtx     = txtCanv.getContext('2d');
	var txtWidth   = maxWidth;
	var txtHeight  = maxHeight;
	var txtHeight2 = maxHeight;
	var txtOffset  = 0;

  	this.setPosition = function(position)
  	{
    	this.X = position.x;
    	this.Y = position.y;
  	}
	
	this.setText = function(string)
	{
		this.m_Text = string;
		
		txtCtx.lineJoin="round";
//		txtCtx.textAlign = this.align;
		txtCtx.textAlign = "left";		//alignment is handled later 
		
		txtCtx.font = this.fontStr == "" || this.fontStr == null? this.font: this.fontStr;
		
		//Support max_width feature
		if (this.max_width != null) {
			var fs = parseInt(this.fontSize.substring(0, this.fontStr.length-2));
			while (txtCtx.measureText(this.m_Text).width > this.max_width) {
				fs--;
				this.fontStr = "";
				this.fontStr += this.fontStyle == null?"":this.fontStyle+" ";
				this.fontStr += this.fontWeight == null?"":this.fontWeight+" ";
				this.fontStr += fs+"px ";
				this.fontStr += this.fontFamily == null?"":this.fontFamily+" ";
				this.fontStr = this.fontStr.length>0?this.fontStr.substring(0, this.fontStr.length-1):this.fontStr;
				ctx.font = this.fontStr;
			}
		}
		//Draw gradient
		if (this.gradient_x0 != null && this.gradient_y0 != null && this.gradient_x1 != null && this.gradient_y1 != null) {
			var grd=txtCtx.createLinearGradient(this.gradient_x0 + this.X - 5, this.gradient_y0 + this.Y - 20, this.gradient_x1 + this.X - 5, this.gradient_y1 + this.Y - 20);
			if (this.colorStop_0 != null) {
				grd.addColorStop(this.colorStop_0[0], this.colorStop_0[1])
			}
			if (this.colorStop_1 != null) {
				grd.addColorStop(this.colorStop_1[0], this.colorStop_1[1])
			}
			if (this.colorStop_2 != null) {
				grd.addColorStop(this.colorStop_2[0], this.colorStop_2[1])
			}
			txtCtx.fillStyle = grd;
		} else {
			txtCtx.fillStyle = this.m_Color;
		}

		txtHeight = parseInt(this.font.substring(0, this.font.length-2));
		txtHeight2 = Math.floor(txtHeight * 1.3);
		
		if(txtHeight2 > txtCanv.height) {
			txtHeight2 = txtCanv.height;
		}
		
		var strokeW = 0;
		if (this.stroke_0_Width != null) {
			strokeW += Number(this.stroke_0_Width);
		}
		if (this.stroke_1_Width != null) {
			strokeW += Number(this.stroke_1_Width);
		}
		
		txtWidth  = txtCtx.measureText(this.m_Text).width + strokeW*2;
		
		txtCtx.clearRect(0, 0, txtCanv.width, txtCanv.height);
		
		//Draw strokes
		if (this.stroke_0_Color != null && this.stroke_0_Width != null) {
			txtCtx.strokeStyle = this.stroke_0_Color;
			txtCtx.lineWidth 	= this.stroke_0_Width;
			txtCtx.strokeText(this.m_Text, strokeW, txtHeight);
		}
		
		if (this.stroke_1_Color != null && this.stroke_1_Width != null) {
			txtCtx.strokeStyle = this.stroke_1_Color;
			txtCtx.lineWidth 	= this.stroke_1_Width;
			txtCtx.strokeText(this.m_Text, strokeW, txtHeight);
		}

		
		if(this.align == "center") {
			txtOffset = Math.floor(txtWidth/2);
		}

/*		
txtCtx.beginPath();
txtCtx.rect(0, 0, txtWidth,txtHeight); //txtCtx.measureText(this.m_Text).width, fs2);
txtCtx.lineWidth = 1;
txtCtx.strokeStyle = 'red';
txtCtx.stroke();
*/
		txtCtx.fillText(this.m_Text, strokeW, txtHeight);
	}
	
	this.setFormat = function(format)
	{
		this.align 		= format.align;
		this.m_Color 	= format.m_Color;
		this.fontStyle 	= format.font.fontStyle;
		this.fontWeight = format.font.fontWeight;
		this.fontSize 	= format.font.fontSize;
		this.fontFamily = format.font.fontFamily;

		this.stroke_0_Color = format.stroke_0_Color;
		this.stroke_0_Width = format.stroke_0_Width;
		this.stroke_1_Color = format.stroke_1_Color;
		this.stroke_1_Width = format.stroke_1_Width;
			
		this.gradient_x0 = format.gradient_x0;
		this.gradient_y0 = format.gradient_y0;
		this.gradient_x1 = format.gradient_x1;
		this.gradient_y1 = format.gradient_y1;
			
		this.colorStop_0 = format.colorStop_0;
		this.colorStop_1 = format.colorStop_1;
		this.colorStop_2 = format.colorStop_2;
		
		this.max_width = format.max_width;
		this.fontStr = "";
		this.fontStr += this.fontStyle == null?"":this.fontStyle+" ";
		this.fontStr += this.fontWeight == null?"":this.fontWeight+" ";
		this.fontStr += this.fontSize == null?"":this.fontSize+" ";
		this.fontStr += this.fontFamily == null?"":this.fontFamily+" ";
		this.fontStr = this.fontStr.length>0?this.fontStr.substring(0, this.fontStr.length-1):this.fontStr;
	}
	
	this.setVisibility = function(state) 
	{
		this.visible = state;
	}
	
	function drawText(ctx) 
	{
		if (this.visible) {
			var w = (txtWidth >= txtCanv.width)?txtCanv.width:txtWidth;
			var h = (txtHeight2 >= txtCanv.height)?txtCanv.height:txtHeight2;
			ctx.drawImage(txtCanv,0,0,w, h,this.X - txtOffset,this.Y - txtHeight, w, h);
		}
	}
	
	function drawTextShadowed(ctx) 
	{
		if (this.visible) {
			ctx.font = this.font;
			ctx.textAlign = this.align;	
			ctx.fillStyle = '#000000';
			
			ctx.fillText(this.m_Text, this.X+2, this.Y+2);
			
			ctx.fillStyle = this.m_Color;
			ctx.fillText(this.m_Text, this.X, this.Y);
		}
	}
}



function Message()
{
	this.BTN_NO = 0;
	this.BTN_YES = 1;
	this.BTN_CANCEL = 2;
	this.BTN_SUBMIT = 3;
	this.BTN_OK = 4;
	
	this.overlay = $("<div id='msgOverlay' class='msgOverlay'>").appendTo($("body"));
	this.msgBox = $("<div id='msgBox' class='msgBox'>").appendTo($("body"));
	
 	this.msgBox_2 = $("<div id='msgBox_2' class='msgBox_2' >").appendTo($("#msgBox"));
	
	this.captionDiv = $("<div id='msgCaption' class='msgCaption'>").appendTo(this.msgBox_2);
	this.contentDiv = $("<div id='msgContent' class='msgContent'>").appendTo(this.msgBox_2);
	this.buttonsDiv = $("<div id='msgButtons' class='msgButtons'>").appendTo(this.msgBox_2);
	this.callback = "";
	
	this.noBtn = $("<input type='button' class='msgButton' value='"+MESSAGE_BTN_NO+"'/>");
	this.yesBtn = $("<input type='button' class='msgButton' value='"+MESSAGE_BTN_YES+"'/>");
	this.cancelBtn = $("<input type='button' class='msgButton' value='"+MESSAGE_BTN_CANCEL+"'/>");
	this.submitBtn = $("<input type='button' class='msgButton' value='"+MESSAGE_BTN_SUBMIT+"'/>");
	this.okBtn = $("<input type='button' class='msgButton' value='"+MESSAGE_BTN_OK+"'/>");
	
	this.messageBox = function(caption, content, buttons, callback) {
		if (this.msgBox.css("display") == "none")
		{
			game.modalState++;	
		}
		this.captionDiv.html(caption);
		this.contentDiv.html(content);
		this.buttonsDiv.empty();
		this.callback = callback;
		
		var that = this;
		for(var i = 0; i<buttons.length; i++) {
			if (buttons[i] == this.BTN_NO) {
				this.buttonsDiv.append(this.noBtn.bind("click", function(){
											that.DoAction(that.BTN_NO);
										}));
			} else if (buttons[i] == this.BTN_YES) {
				this.buttonsDiv.append(this.yesBtn.bind("click", function(){
											that.DoAction(that.BTN_YES);
										}));
			} else if (buttons[i] == this.BTN_CANCEL) {
				this.buttonsDiv.append(this.cancelBtn.bind("click", function(){
											that.DoAction(that.BTN_CANCEL);
										}));
			} else if (buttons[i] == this.BTN_SUBMIT) {
				this.buttonsDiv.append(this.submitBtn.bind("click", function(){
											that.DoAction(that.BTN_SUBMIT);
										}));
			} else if (buttons[i] == this.BTN_OK) {
				this.buttonsDiv.append(this.okBtn.bind("click", function(){
											that.DoAction(that.BTN_OK);
										}));
			}
		}
		this.overlay.show();
		setTimeout(function(){
			that.msgBox.show();
		}, 200);
		this.msgBox.css("margin-top", -(this.msgBox.height()/2) + "px");
		$( "#msgBox_2" ).removeClass("msgBox_2");
	}

	this.SetFormat = function(freeRounds) {
		if (freeRounds) {
			$( "#msgBox_2" ).addClass("msgBox_2");
			$( "#msgBox" ).removeClass("msgBox");
 			$( "#msgBox" ).addClass("msgBoxFreeRounds");
 			
			$( "#msgCaption" ).removeClass("msgCaption");
			$( "#msgCaption" ).addClass("msgCaptionFreeRounds");
			$( "#msgContent" ).removeClass("msgContent");
			$( "#msgContent" ).addClass("msgContentFreeRounds");
			$( "#msgButtons" ).removeClass("msgButtons");
			$( "#msgButtons" ).addClass("msgButtonsFreeRounds");
			$("#msgButtons input").each(function(index, element) {
                $(element).addClass("msgButtonFreeRounds");
				$(element).removeClass("msgButton");
            });
		} else {
			$( "#msgBox_2" ).removeClass("msgBox_2");
			$( "#msgBox" ).addClass("msgBox");
			$( "#msgBox" ).removeClass("msgBoxFreeRounds");
			$( "#msgCaption" ).addClass("msgCaption");
			$( "#msgCaption" ).removeClass("msgCaptionFreeRounds");
			$( "#msgContent" ).addClass("msgContent");
			$( "#msgContent" ).removeClass("msgContentFreeRounds");
			$( "#msgButtons" ).addClass("msgButtons");
			$( "#msgButtons" ).removeClass("msgButtonsFreeRounds");
 			
			$("#msgButtons input").each(function(index, element) {
                $(element).addClass("msgButton");
				$(element).removeClass("msgButtonFreeRounds");
            });
		}	
	}
	
	this.DoAction = function(buttonItem) {
		this.Close();
		if (this.callback!="")
			this.callback(buttonItem);
	}
	
	this.Close = function() {
		this.overlay.hide();
		this.msgBox.hide();
		game.modalState--;
	}
	this.Hide = function()
	{
		
		if (this.msgBox.css("display") == "block")
		{
			this.overlay.css("visibility", "hidden");
			this.msgBox.css("visibility", "hidden");
		}
	}
	this.Show = function() {
		if (this.msgBox.css("display") == "block")
		{
			this.overlay.css("visibility", "visible");
			this.msgBox.css("visibility", "visible");
		}
	}
	this.setVisibility = function(visible)
	{
		if (visible)
		{
			this.Show();
		} else {
			this.Hide();
		}
		
	}
}


//--------------------------------------------------------------
function Account(startAmount,config)
{
	this.balance    = startAmount;
	this.way243 = false;
	if(config != null) {
		this.way243 	= config.way243;	// should we run in 243 way mode
	}
	this.newBalance = 0;
	this.betAmounts = new Array();
	this.winAmount  = 0;
	this.NUM_PAYLINES = 20;
	this.paylinesSelected = 20;
	
	
	this.betAmounts[0] = 1;
	this.betAmounts[1] = 2;
	this.betAmounts[2] = 5;
	this.betAmounts[3] = 10;
	this.betAmounts[4] = 20;
	
	this.currentBetIndex = 0;
	
	//243 way functionality
	this.reelsSelected = 5;
	this.way243BetMultiplier = [1,3,7,15,25]; //reelsSelected indexes into this array
	
	//Currency related details
	this.cur_cc = '';
	this.cur_ts = '';
	this.cur_ds = '';
	this.cur_wcs = '';
	this.cur_wcp = '';
	this.cur_fcs = '';
	this.cur_fcp = '';
	
	this.creditDenom = 1;
	this.displayAsCredits = false;
	this.baseValueInCents = true;
	this.switchToCents = true;
	this.fullPrecision = true;
	
	this.wholeSymbol = '';
	this.fractionalSymbol = '';
	
	this.superbet = 0;

	this.currentOnScreenBalance   = startAmount;		// What is currently on the balance meter (in credits)
	this.currentOnScreenWinAmount = 0;		// What is currently on the win meter (in credits)
	this.startOnScreenBalance     = 0;		// What is currently on the balance meter (in credits)
	this.startOnScreenWinAmount   = 0;		// What is currently on the win meter (in credits)
	this.targetOnScreenBalance    = 0;		// Where the balance meter needs to get to (in credits)
	this.targetOnScreenWinAmount  = 0;		// Where the win meter needs to get to (in credits)
	this.ROLLUP_TIME			  = 2000;
	this.rollUpCounter			  = this.ROLLUP_TIME;
	
	this.update = function(deltaTime) {
		if(this.rollUpCounter < this.ROLLUP_TIME) {
			this.rollUpCounter += deltaTime;
			if(this.rollUpCounter >= this.ROLLUP_TIME) {
				this.rollUpCounter = this.ROLLUP_TIME;
			}
			this.currentOnScreenWinAmount = ((this.rollUpCounter/this.ROLLUP_TIME)*(this.targetOnScreenWinAmount - this.startOnScreenWinAmount)) + this.startOnScreenWinAmount;
			this.currentOnScreenBalance   = ((this.rollUpCounter/this.ROLLUP_TIME)*(this.targetOnScreenBalance   - this.startOnScreenBalance))   + this.startOnScreenBalance;
		} 
	}

	this.recover = function(amount)
	{
		this.currentOnScreenWinAmount = amount;
		this.rollUpCounter 	= this.ROLLUP_TIME;
		
		this.winAmount = amount;
		this.balance   = this.newBalance;
	}

	this.addWin = function(amount)
	{
		this.startOnScreenWinAmount  = this.winAmount;
		this.targetOnScreenWinAmount = amount;
		this.startOnScreenBalance    = this.balance;
		this.targetOnScreenBalance   = this.newBalance;
		this.rollUpCounter 			 = 0;
		
		this.winAmount = amount;
		this.balance = this.newBalance;
	}
		
	this.clearWin = function()
	{
		this.winAmount = 0;
		this.startOnScreenWinAmount  = 0;
		this.targetOnScreenWinAmount = 0;
		this.currentOnScreenWinAmount = 0;
	}

	this.takeBet = function()
	{
		if(this.way243) {
			if(this.betAmounts[this.currentBetIndex] <= this.balance) {
				this.balance -= this.betAmounts[this.currentBetIndex]*(this.way243BetMultiplier[this.reelsSelected-1]);
				this.currentOnScreenBalance = this.balance;
			}
		}
		else {
			if(this.betAmounts[this.currentBetIndex] <= this.balance) {
				this.balance -= this.betAmounts[this.currentBetIndex]*(this.paylinesSelected + this.superbet);
				this.currentOnScreenBalance = this.balance;
			}
		}
	}
	
	this.setBalance = function(newBalance)		// Used by william hill's external heartbeat functionality
	{
		if(this.rollUpCounter == this.ROLLUP_TIME) {			// We ignore any requests during roll up. The next update, or bet message will set it correctly.
			this.balance = Number(newBalance);
			this.currentOnScreenBalance = Number(newBalance);
		}
	}
	
	this.snapMeters = function()	//In case the meters were rolling up, snap them to the new values
	{
		this.currentOnScreenBalance   = this.balance;
		this.currentOnScreenWinAmount = this.winAmount;
		this.rollUpCounter			  = this.ROLLUP_TIME;
	}
	
	this.setNumPaylines = function(count,selected)
	{
		this.NUM_PAYLINES = count;
		this.paylinesSelected = selected;		
	}

	this.setMaxPaylines = function()
	{
		this.paylinesSelected = this.NUM_PAYLINES;		
	}

	this.setMaxBet = function()
	{
		this.currentBetIndex = this.betAmounts.length -1;
	}
	
	this.setBetAmounts = function(amounts)	// sets up a new betAmounts array based on what we receive from the GDM server
	{
		this.betAmounts.length = 0;
		var bets = amounts.split("|");
		
		for(var i = 0; i < bets.length - 1; i++)	// there are 1 too many elements
		{
			this.betAmounts.push(Number(bets[i]));
		}
	}
	
	this.setCurrentBetAmount = function(amount)		// must be called after setBetAmounts
	{
		for(var i = 0; i < this.betAmounts.length - 1; i++)	// there are 1 too many elements
		{
			if(amount == this.betAmounts[i])
			{
				this.currentBetIndex = i;
				return;
			}
		}
	}
	
	this.getBetAmount = function()
	{
		if(this.way243) {
			return this.betAmounts[this.currentBetIndex]*(this.way243BetMultiplier[this.reelsSelected-1]);
		}
		else {
			return this.betAmounts[this.currentBetIndex]*(this.paylinesSelected + this.superbet);
		}
	}
	
	this.getScratchBetAmount = function()
	{
		return this.betAmounts[this.currentBetIndex];
	}
	
	this.getBetPerLine = function()
	{
		return this.betAmounts[this.currentBetIndex];
	}
	
	this.setBetPerLine = function(amount)
	{
		for(var i = 0; i < this.betAmounts.length; i++)
		{
			if(this.betAmounts[i] == amount)
			{
				this.currentBetIndex = i;
				break;
			}
		}
	}
	
	
	this.incBetIndex = function()
	{
		this.currentBetIndex++;
		this.currentBetIndex = this.currentBetIndex % this.betAmounts.length;
	}

	this.decBetIndex = function()
	{
		this.currentBetIndex--;
		if(this.currentBetIndex < 0)
		{
			this.currentBetIndex = this.betAmounts.length-1;
		}
	}

	
	this.getBetIndex = function()
	{
		return this.currentBetIndex;
	}
	
	this.getBetAmountsLength = function()
	{
		return this.betAmounts.length;
	}
	
	this.incPaylines = function()
	{
		switch(this.paylinesSelected)
		{
			case 1: this.paylinesSelected = 3; break;
			case 3: this.paylinesSelected = 5; break;
			case 5: this.paylinesSelected = 10; break;
			case 10: this.paylinesSelected = 15; break;
			case 15: this.paylinesSelected = 20; break;
			case 20: 
				if(this.NUM_PAYLINES > 20) {
					this.paylinesSelected = 25; 
				}
				else {
					this.paylinesSelected = 1; 
				}
			    break;
			case 25: 
				if(this.NUM_PAYLINES > 25) {
					this.paylinesSelected = 30; 
				}
				else {
					this.paylinesSelected = 1;
				}
				break;
			case 30: this.paylinesSelected = 40; break;
			case 40: this.paylinesSelected = 50; break;
			case 50: this.paylinesSelected = 1; break;
		}
	}

	this.decPaylines = function()
	{
		switch(this.paylinesSelected)
		{
			case 1: 
				if(this.NUM_PAYLINES > 25) {
					this.paylinesSelected = 50; 
				}
				else if(this.NUM_PAYLINES > 20) {
					this.paylinesSelected = 25; 
				}
				else {
					this.paylinesSelected = this.NUM_PAYLINES; 
				}
			    break;
			case 3: this.paylinesSelected = 1; break;
			case 5: this.paylinesSelected = 3; break;
			case 10: this.paylinesSelected = 5; break;
			case 15: this.paylinesSelected = 10; break;
			case 20: this.paylinesSelected = 15; break;
			case 25: this.paylinesSelected = 20; break;
			case 30: this.paylinesSelected = 25; break;
			case 40: this.paylinesSelected = 30; break;
			case 50: this.paylinesSelected = 40; break;
		}
	}

	// 243 way functionality
	this.incReels = function()
	{
		this.reelsSelected++;
		if(this.reelsSelected > 5) {
			this.reelsSelected = 1;
		}
	}
	
	this.decReels = function()
	{
		this.reelsSelected--;
		if(this.reelsSelected < 1) {
			this.reelsSelected = 5;
		}
	}
	

	

	this.canBet = function()
	{
		if(typeof game.freeRounds !== "undefined") {
			if(game.freeRounds.inFreeRounds) { //Yipee free money - allow the game to play
				return true;
			}
		}
		
		if(this.way243) {
			return 	this.betAmounts[this.currentBetIndex]*(this.way243BetMultiplier[this.reelsSelected-1]) <= this.balance;
		}
		else {
			return 	this.betAmounts[this.currentBetIndex]*(this.paylinesSelected + this.superbet) <= this.balance;
		}
	}
	
	
	this.getBalanceStr = function()
	{
		return this.getCurrencyString(this.balance);
	}
	
	this.getBetAmountStr = function()
	{
		if(this.way243) {
			return this.getCurrencyString(this.betAmounts[this.currentBetIndex]*(this.way243BetMultiplier[this.reelsSelected-1]));
		}
		else {
			return this.getCurrencyString(this.betAmounts[this.currentBetIndex]*(this.paylinesSelected + this.superbet));
		}
	}
	
	this.getScratchBetAmountStr = function()
	{
		return this.getCurrencyString(this.betAmounts[this.currentBetIndex]);
	}
	
	this.getBetPerLineStr = function()
	{
		return this.getCurrencyString(this.betAmounts[this.currentBetIndex]);
	}
	
	this.getWinAmountStr = function()
	{
		return this.getCurrencyString(this.winAmount);
	}
	
	
	this.getCurrencyString = function(credits)
	{
		//TODO: Return the correctly formatted currency string based on credits and server specified settings
		var sText;
		if (this.displayAsCredits) {
			sText = String(Math.floor(credits/creditDenom));
		} else {
			var nWhole;
			var nFraction;
				
			if (this.baseValueInCents) {
				credits /= 100;
			}
		
			nWhole = Math.floor(credits);
		
			// Round value to fix possible floating point bug
			nFraction = Math.round((credits-nWhole)*100);
				
			if (nFraction>=100) {
				nFraction = 0;
				nWhole++;
			}
				
			if (( this.cur_ts != null ) &&( this.cur_ts != "" ) ) {
				sText = this.InsertCommas(nWhole);
			} else {
				sText = nWhole;
			}
				
			if (nWhole > 0) {
				sText = this.AddWholeCurrencySymbol(sText, nFraction);
			} else {
				sText = this.AddFractionCurrencySymbol(nFraction);
			}
		}
		return sText;
	}
	
	/***********************************************************************
	Function: InsertCommas
		
	Inserts a thousand comma seperator. TODO: Need to set this up to use a 
	period instead of a comma for european style numbers.
		
	Parameters:
		The value to insert the commas into.
		
	Returns:
		The value as a string with commas inserted.
	***********************************************************************/
	this.InsertCommas = function (nWhole) {
		var sWholeStrOld;
		var sWholeStrNew="";
	
		sWholeStrOld = nWhole+"";
			
		var nCount = 0;
		var nCommaInc = 0;
		
		for ( nCommaInc = (sWholeStrOld.length -1); nCommaInc >=0; nCommaInc-- ) {
			nCount++;
			sWholeStrNew = sWholeStrOld.charAt(nCommaInc) + sWholeStrNew;
			if (( nCount%3 == 0 )&&(nCommaInc > 0 )) {
				sWholeStrNew = "" + this.cur_ts + sWholeStrNew;
			}
		}
			
		return sWholeStrNew;
	}//InsertCommas()
	
	/***********************************************************************
	Function: AddWholeCurrencySymbol
		
	Adds a whole currency symbol.
		
	Parameters:
		sWhole - The whole part of the meter value converted to a string.
		nFraction - The fractional part of the meter value.
		
	Returns:
		The value converted to a string with a whole currency symbol.
	***********************************************************************/
	
	this.AddWholeCurrencySymbol = function (sWhole, nFraction) {	
		var sText = "";
		
		if (nFraction > 0) {
			if (nFraction < 10) {
				sText = "" + this.cur_ds + "0" + nFraction;
			} else {
				sText = "" + this.cur_ds + nFraction;
			}
		} else if (this.fullPrecision) {
			sText = "" + this.cur_ds + "00";
		}

		sText = sWhole + sText;
		
		if(this.cur_wcp == "L") {
			sText = this.wholeSymbol + sText;
		} else if(this.cur_wcp == "R") {
			sText = sText + this.wholeSymbol;
		}
		
		return sText;
	}//AddWholeCurrencySymbol()
	

	/***********************************************************************
	Function: AddFractionCurrencySymbol
		
	Adds a fraction currency symbol.
		
	Parameters:
		nFraction - The fractional part of the meter value.
	
	Returns:
		The value converted to a string with a fraction currency symbol.
	***********************************************************************/
	this.AddFractionCurrencySymbol = function (nFraction) {
		var sText;
		//if (this.fractionalSymbol == "" || this.fractionalSymbol == " ") 
		//{
			
		//}
		
		if (!this.switchToCents) {
			if (nFraction < 10) {
				sText = "0" + this.cur_ds + "0" + nFraction;
			} else {
				sText = "0" + this.cur_ds + nFraction;
			}
			
			
			if (this.cur_wcp == "L") {
				sText = this.wholeSymbol + sText;
			} else {
				sText = sText + this.wholeSymbol;
			}
		} else {
			if (this.cur_fcp == "L")  {
				sText = this.fractionalSymbol + nFraction;
			} else {
				sText = nFraction + this.fractionalSymbol;
			}
		}
		
		return sText;
	}//AddFractionCurrencySymbol()
	
	
	
		
	
	
	// Set the server specified parameters
	/*	
	CUR=cc|ts|ds|wcs|wcp|fcs|fcp
	cc = currency code
	ts = thousands seperator
	ds = decimal seperator
	wcs = whole currency symbols - ASCII characters separated by ;
	wcp = whole currency symbols position (L=left, R=Right)
	fcs = fractional currency symbols - ASCII characters separated by ;
	fcp = fractional currency symbols position (L=left, R=Right)
	
	Example:CUR=ISO:GBP|,|.|71;66;80;|L|112;|RDisplays currency like this:GBP34,087.00	
	*/	
	
	this.setCurrency = function(currencyDef) 
	{
		var currencyDefArray = currencyDef.split("|");
		//TODO: Parse the currencyDefinition and assign to member variables:
		
		this.cur_cc  = currencyDefArray[0];
		this.cur_ts  = currencyDefArray[1];
		this.cur_ds  = currencyDefArray[2];
		this.cur_wcs = currencyDefArray[3];
		this.cur_wcp = currencyDefArray[4];
		this.cur_fcs = currencyDefArray[5];
		this.cur_fcp = currencyDefArray[6];
		
		if (this.cur_wcs!='') {
			var cur_wcs_array = this.cur_wcs.substr(0, this.cur_wcs.length-1).split(";");
			this.wholeSymbol = String.fromCharCode.apply(String, cur_wcs_array);
		}
		if (this.cur_fcs!='') {
			var cur_fcs_array = this.cur_fcs.substr(0, this.cur_fcs.length-1).split(";");
			this.fractionalSymbol = String.fromCharCode.apply(String, cur_fcs_array);	
		}
		
		//Set flag switchToCents to false when this.fractionalSymbol is blank
		if ($.trim(this.fractionalSymbol) == "") {
			this.switchToCents = false;
		}
	}
};

function SoundDialog(tctx)
{
	this.soundSelected = -1;
	this.textHeight = 15;
	this.buttonGap = 10;
	this.scale = 1;
	this.payWidth = 0;
	this.payHeight = 0;
		
	this.txt = new Text();
	this.txt.font   = "24px arial";
	this.txt.align  = "center";
	this.txt.m_Color = '#FFFFFF';
	this.txt.stroke_0_Color = 'black';
	this.txt.stroke_0_Width = 3;
	this.config = {};
	Object.getPrototypeOf(tctx).fillRectR = function(x,y,w,h,r) {
		if (typeof r === "undefined") {
			r = 5;
		}
		this.beginPath();
		this.moveTo(x + r, y);
		this.lineTo(x + w - r, y);
		this.quadraticCurveTo(x + w, y, x + w, y + r);
		this.lineTo(x + w, y + h - r);
		this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		this.lineTo(x + r, y + h);
		this.quadraticCurveTo(x, y + h, x, y + h - r);
		this.lineTo(x, y + r);
		this.quadraticCurveTo(x, y, x + r, y);
		this.closePath();
		this.fill();
	};	
	
	Object.getPrototypeOf(tctx).strokeRectR = function(x,y,w,h,r) {
		if (typeof r === "undefined") {
			r = 5;
		}
		this.beginPath();
		this.moveTo(x + r, y);
		this.lineTo(x + w - r, y);
		this.quadraticCurveTo(x + w, y, x + w, y + r);
		this.lineTo(x + w, y + h - r);
		this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		this.lineTo(x + r, y + h);
		this.quadraticCurveTo(x, y + h, x, y + h - r);
		this.lineTo(x, y + r);
		this.quadraticCurveTo(x, y, x + r, y);
		this.closePath();
		this.stroke();
	};
	
	this.drawDialog = function(config)
	{
		this.config = config;
		this.soundSelected = 0;
		this.payWidth   = config.W;
		this.payHeight  = config.H;
		this.txt.m_Text = TXT_USE_SOUND;
		this.txt.setPosition({x:config.X + 200, y:config.Y - 20 });
		this.txt.draw(tctx);
		var gradient  = tctx.createLinearGradient(config.X, this.payHeight*(1-this.scale)/2+config.Y, config.X, this.payHeight - this.payHeight*(1-this.scale)/2 + config.Y);
		gradient.addColorStop(0, 'rgb(181,189,200)' );
		gradient.addColorStop(0.36, 'rgb(130,140,149)');
		gradient.addColorStop(1, 'rgb(40,52,59)');
		
		
		var gradient2 = tctx.createLinearGradient(config.X, this.payHeight*(1-this.scale)/2+config.Y, config.X, this.payHeight - this.payHeight*(1-this.scale)/2 + config.Y);
		gradient2.addColorStop(0,'rgb(100,100,100)');
		gradient2.addColorStop(0.2,'rgb(100,100,100)');
		gradient2.addColorStop(0.8,'rgb(100,100,100)');
		gradient2.addColorStop(1,'rgb(0,0,0)'); 
		
		for(var i = 0; i < 2; i++)
		{
		   if (config.V == i)
		   {
				this.scale = 0.95;
				this.txt.font   = "22px arial";
		   }
		  tctx.beginPath();
		  tctx.lineWidth = 2;
		  tctx.strokeStyle = 'rgb(153, 189, 103)';
			 
		  tctx.fillStyle = gradient;	  
		  tctx.fillRectR(config.X+this.payWidth*(1-this.scale)/2 + (this.payWidth+this.buttonGap)*i, this.payHeight*(1-this.scale)/2 + config.Y, this.payWidth*this.scale, this.payHeight*this.scale,10);
		  tctx.strokeStyle = gradient2;
		  tctx.strokeRectR(config.X +this.payWidth*(1-this.scale)/2 + 1 + (this.payWidth+this.buttonGap)*i, this.payHeight*(1-this.scale)/2+config.Y, this.payWidth*this.scale-2, this.payHeight*this.scale-2,10);
		  
		  this.txt.m_Text = i==0?MESSAGE_BTN_YES:MESSAGE_BTN_NO;
		  this.txt.setPosition({x:config.X + (this.payWidth/2) + (this.payWidth+this.buttonGap)*i, y:((this.payHeight-this.textHeight)/2)+this.textHeight-2 + config.Y });
		  this.txt.draw(tctx);
		  this.scale = 1;
		  this.txt.font   = "24px arial";
		}
	}
	
	this.isOver = function(coords)
	{
		if (soundDialog.soundSelected == 0)
		{
			if (coords.x > this.config.X && coords.x < (this.config.X + this.config.W) &&
				coords.y > this.config.Y - 20 && coords.y < (this.config.Y + this.config.H - 20))
			{
				return 0;
			} else if (coords.x > this.config.X + this.config.W + 10 && coords.x < (this.config.X + this.config.W * 2 + 10) &&
				   coords.y > (this.config.Y - 20)  && coords.y < (this.config.Y + this.config.H - 20))
			{
				return 1;
			} else {
				return -1;
			}	
		} else {
			return -1;
		}
	}
	
	this.isClicked = function()
	{
		return this.config.V;
	}
}



//--------------------------------------------------------------
function Button(image,config)
{
  this.image = image;

  this.width  = config.nwidth;
  this.height = config.nheight;
  this.X = 0;
  this.Y = 0;
  

  this.nx = config.nx;
  this.ny = config.ny;
  this.nwidth  = config.nwidth;
  this.nheight = config.nheight;
  
  this.dx = config.dx;
  this.dy = config.dy;
  this.dwidth  = config.dwidth;
  this.dheight = config.dheight;
  
  this.ax = (config.ax=== "undefined")?0:config.ax;
  this.ay = (config.ay=== "undefined")?0:config.ay;
  this.awidth = (config.awidth=== "undefined")?0:config.awidth;
  this.aheight = (config.aheight=== "undefined")?0:config.aheight;
  
  this.isDown = false;
  this.isDisabled = false;
  this.isActive = false;

  this.visible = true;

  this.scale = 0.9;

  this.hitPadding = 0; 	// Increases the size of the clickable area around the button. The number represents the number of pixels to grow the area all around the button. 

  this.setPosition = function(position)
  {
    this.X = position.x;
    this.Y = position.y;
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
	// try 
	{
		var srcx, srcy, srcw,srch;
		
		if (this.isActive)
		{
			srcx = this.ax;
			srcy = this.ay;
			srcw = this.awidth;
			srch = this.aheight;
		}
		else if(this.isDisabled)
		{
			srcx = this.dx;
			srcy = this.dy;
			srcw = this.dwidth;
			srch = this.dheight;
		}
		else
		{
			srcx = this.nx;
			srcy = this.ny;
			srcw = this.nwidth;
			srch = this.nheight;
		}
		
		if(this.isDown)
		{
			ctx.drawImage(this.image, 
				srcx, srcy, srcw, srch,
				this.X+srcw/2*(1-this.scale), this.Y+srch/2*(1-this.scale), srcw*this.scale, srch*this.scale
			);
		}
		else
		{
			ctx.drawImage(this.image,srcx, srcy, srcw, srch, this.X, this.Y, srcw, srch);
		}
	} 
	// catch (e) {};
  }
  
  this.isOver = function(mouseCoords)
  {
  	if(this.isDisabled)
  	{
  		return false;
  	}
  
  	if(mouseCoords.x > (this.X - this.hitPadding) && mouseCoords.x < (this.X + this.nwidth + this.hitPadding) &&
  	   mouseCoords.y > (this.Y - this.hitPadding) && mouseCoords.y < (this.Y + this.nheight + this.hitPadding) )
  	 {
  	 	return true;
  	 }
  	 else
  	 {
  	 	return false;
  	 }
  }
  
};

//--------------------------------------------------------------
// config: width - width of button
// 		   height - height of button
//		   fillgrad - fill gradient
//		   strokegrad - outline gradient
//		   radius - corner rounding	
function Button2(config,buttonTxt)		// Draws buttons without an image using a gradient fill, and uses text on the button
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
		    ctx.lineWidth = 2;
		    ctx.strokeStyle = 'rgb(153, 189, 103)';
		  
 			var gradient = ctx.createLinearGradient(this.X, this.Y, this.X, this.Y+this.height);
			gradient.addColorStop(0, 'rgb(181,189,200)' );
			gradient.addColorStop(0.36, 'rgb(130,140,149)');
			gradient.addColorStop(1, 'rgb(40,52,59)');

 			var gradient2 = ctx.createLinearGradient(this.X, this.Y, this.X, this.Y+this.height);
			gradient2.addColorStop(0,'rgb(100,100,100)');
			gradient2.addColorStop(0.2,'rgb(100,100,100)');
			gradient2.addColorStop(0.8,'rgb(100,100,100)');
			gradient2.addColorStop(1,'rgb(0,0,0)'); 

			ctx.fillStyle   = gradient;	  
		  	ctx.strokeStyle = gradient2;

		    if(this.isDown)
		    {
			  ctx.fillRectR(this.X+4,this.Y+4,this.width-8,this.height-8,this.radius);
		  	  ctx.strokeRectR(this.X+4,this.Y+4,this.width-8,this.height-8,this.radius);
		  	  this.txt.draw(ctx);
		    }
		    else
		    {
			  ctx.fillRectR(this.X,this.Y,this.width,this.height,this.radius);
		  	  ctx.strokeRectR(this.X,this.Y,this.width,this.height,this.radius);
		  	  this.txt.draw(ctx);
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
//-----------------------------

//--------------------------------------------------------------
function Button3(image,config, ctx)
{
  this.image = image;

  this.width  = config.nwidth;
  this.height = config.nheight;
  this.X = 0;
  this.Y = 0;

  this.nx = config.nx;
  this.ny = config.ny;
  this.nwidth  = config.nwidth;
  this.nheight = config.nheight;
  
  this.dx = config.dx;
  this.dy = config.dy;
  this.dwidth  = config.dwidth;
  this.dheight = config.dheight;
  
  this.ax = (config.ax=== "undefined")?0:config.ax;
  this.ay = (config.ay=== "undefined")?0:config.ay;
  this.awidth = (config.awidth=== "undefined")?0:config.awidth;
  this.aheight = (config.aheight=== "undefined")?0:config.aheight;
  
  this.isDown = false;
  this.isDisabled = false;
  this.isActive = false;

  this.scale = 0.9;

  this.hitPadding = 0; 	// Increases the size of the clickable area around the button. The number represents the number of pixels to grow the area all around the button. 

  this.setPosition = function(position)
  {
    this.X = position.x;
    this.Y = position.y;
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
	// try 
	{
		var srcx, srcy, srcw,srch;
		
		if (this.isActive)
		{
			srcx = this.ax;
			srcy = this.ay;
			srcw = this.awidth;
			srch = this.aheight;
		}
		else if(this.isDisabled)
		{
			srcx = this.dx;
			srcy = this.dy;
			srcw = this.dwidth;
			srch = this.dheight;
		}
		else
		{
			srcx = this.nx;
			srcy = this.ny;
			srcw = this.nwidth;
			srch = this.nheight;
		}
		
		if(this.isDown)
		{
			ctx.drawImage(this.image, 
				srcx, srcy, srcw, srch,
				this.X+srcw/2*(1-this.scale), this.Y+srch/2*(1-this.scale), srcw*this.scale, srch*this.scale
			);
		}
		else
		{
			ctx.drawImage(this.image,srcx, srcy, srcw, srch, this.X, this.Y, srcw, srch);
		}
	} 
	// catch (e) {};
  }
  
  this.isOver = function(mouseCoords)
  {
  	if(this.isDisabled)
  	{
  		return false;
  	}
  
  	if(mouseCoords.x > (this.X - this.hitPadding) && mouseCoords.x < (this.X + this.nwidth + this.hitPadding) &&
  	   mouseCoords.y > (this.Y - this.hitPadding) && mouseCoords.y < (this.Y + this.nheight + this.hitPadding) )
  	 {
  	 	return true;
  	 }
  	 else
  	 {
  	 	return false;
  	 }
  }
  
};

//! Conversion between degrees and radians.
function deg2rad(degrees) 
{
	return degrees * (6.283185307179586476925286766559 / 360.0);
}

//! Conversion between radians and degrees.
function rad2deg(radians) 
{
	return radians * (360.0 / 6.283185307179586476925286766559 );
}


// function for calculating the canvas offset on screen so that we can properly work out mouse position clicks
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}


// --------------------------------------------------------------------
// converts the GDM winning symbol pattern to a NextEdge bitfield. Possible values for v1-v5 are only 0,1,2
var convertToBitfield = function(v1,v2,v3,v4,v5)
{
	var bits = new Array(4);
	bits[0] = [0x0001,0x0002,0x0004,0x0008,0x0010];
	bits[1] = [0x0020,0x0040,0x0080,0x0100,0x0200];
	bits[2] = [0x0400,0x0800,0x1000,0x2000,0x4000];
	bits[3] = [0x8000,0x10000,0x20000,0x40000,0x80000];

	var result = 0;
	
	if(v1 != -1)
	{
		result |= bits[v1][0];
	}
	if(v2 != -1)
	{
		result |= bits[v2][1];
	}
	if(v3 != -1)
	{
		result |= bits[v3][2];
	}
	if(v4 != -1)
	{
		result |= bits[v4][3];
	}
	if(v5 != -1)
	{
		result |= bits[v5][4];
	}
	
	return result;
};


	function RemoveDelimiter(sMessage,sDelimiter)
	{
		if ( sMessage.charAt(sMessage.length-1) == sDelimiter )
		{
			sMessage = sMessage.substr(0,sMessage.length-1);	
		}	
		return sMessage;
	}
	
	/***********************************************************************
		Function:   TranslateReelString
		Parameters: void
		Returns:    value of reel strips
	***********************************************************************/
	TranslateReelString = function(rs)
	{
			// 1;2;...;3|3;5;...;3;4|...|
		var src = rs;
		src = RemoveDelimiter(src,"|");

		var res = "";
		var reelNumber = 0;
		var reelSplit = "";

		var reels = new Array();
		reels = src.split("|");
		var hash = "";
		for (var reelIndex = 0; reelIndex < reels.length; reelIndex++)
		{
			var reel = reels[reelIndex];
			var symbols = new Array();
			var reelstrip = reel.split(">");
			reelstrip[1] = RemoveDelimiter(reelstrip[1],";");
			symbols = CreateDecodedString(reelstrip[1], 5, ";").split(";");

			var newReel = "";
			if (reel != "")
			{
				var reelSymbols = "";
				var dividor = "";
				for (var symbol = 0;  symbol < symbols.length; symbol++ )
				{
					if (symbols[symbol] != "")
					{
						reelSymbols = reelSymbols + dividor + symbols[symbol];
						dividor = ";";
					}
				}
				newReel = reelSplit + reelSymbols;
				reelSplit = "|";
				reelNumber++;

				res = res + newReel;
				//assign here to prevent the first character from being a #
				hash = "#";
			}
		}
		return res;
	}
	
	TranslateReplacedReelString = function(rs)
	{
			// 1;2;...;3|3;5;...;3;4|...|
		var src = rs;
		src = RemoveDelimiter(src,"|");

		var res = "";
		var reelNumber = 0;
		var reelSplit = "";

		var reels = new Array();
		reels = src.split("|");
		var hash = "#";
		for (var reelIndex = 0; reelIndex < reels.length; reelIndex++)
		{
			var reel = reels[reelIndex];
			var symbols = new Array();
			var reelstrip = reel.split(">");
			reelstrip[1] = RemoveDelimiter(reelstrip[1],";");
			symbols = CreateDecodedString(reelstrip[1], 5, ";").split(";");

			var newReel = "";
			if (reel != "")
			{
				var reelSymbols = "";
				var dividor = "";
				for (var symbol = 0;  symbol < symbols.length; symbol++ )
				{
					if (symbols[symbol] != "")
					{
						reelSymbols = reelSymbols + dividor + symbols[symbol];
						dividor = ";";
					}
				}
				newReel =  reelSymbols;
				res =   res + reelSplit + reelstrip[0] + hash + newReel;
				reelSplit = "|";
				reelNumber++;
			}
		}
		return res;
	}
	
	function CreateDecodedString(sEncodedString, nBitsPerNumber, sDelim)
	{
		var nEncodedArray = sEncodedString.split(sDelim);
		var sDecodedArray = new Array(nEncodedArray.length);
			
		var sDecodedString;

		//if (bEncoded == 1)
		//{			
			for (var i = 0; i < nEncodedArray.length; i++)
			{
				sDecodedArray[i] = DecodeReelStripNumbers(parseInt(nEncodedArray[i],36), nBitsPerNumber, ",");
			}
				
			sDecodedString = sDecodedArray.join(",");
				
			return sDecodedString;
		//}
		//else
		//{
		//	return sEncodedString;
		//}
	}
	
	function DecodeReelStripNumbers(nEncodedNumber, nBitsPerNumber, sDelim)
	{
		var sDecodedString = "";
		var nBitsPerNumberCount = 3;
			
		var nNumberCountMask = Math.pow(2,nBitsPerNumberCount) - 1;
		var nNumberCount = (nEncodedNumber & nNumberCountMask);
		var nShift = nBitsPerNumberCount;
			
		for (var nCount = 0; nCount < nNumberCount; nCount++)
		{
			var nNumberMask = Math.pow(2, nBitsPerNumber + nShift) - 1;
	
			sDecodedString += (nEncodedNumber & nNumberMask) >> nShift;
				
			nShift += nBitsPerNumber;
				
			if (nCount < nNumberCount - 1)
			{
				sDecodedString += sDelim;
			}
		}
			
		return sDecodedString;
	}
	
/**
	@private
	@name applyCanvasMask
	@function
	@description Use Canvas to apply an Alpha Mask to an <img>. Preload images first.
	@param {object} [image] The <img> to apply the mask
	@param {object} [mask] The <img> containing the PNG-24 mask image
	@param {int} [width] The width of the image (should be the same as the mask)
	@param {int} [height] The height of the image (should be the same as the mask)
	@param {boolean} [asBase64] Option to return the image as Base64
*/
function applyCanvasMask(image, mask, width, height, asBase64) {
	// check we have Canvas, and return the unmasked image if not
	if (!document.createElement('canvas').getContext && !asBase64) {
		return image;
	}
	else if (!document.createElement('canvas').getContext && asBase64) {
		return image.src;
	}
	
	
	var bufferCanvas = document.createElement('canvas');
	var buffer = bufferCanvas.getContext('2d');
	var bufferCanvasReturn = document.createElement('canvas');
	var ctx = bufferCanvasReturn.getContext('2d');
		
	var contents = null;
	var imageData = null;
	var alphaData = null;
		
	// set sizes to ensure all pixels are drawn to Canvas
	bufferCanvasReturn.width = width;
	bufferCanvasReturn.height = height;
	bufferCanvas.width = width;
	bufferCanvas.height = height * 2;
		
	// draw the base image
	buffer.drawImage(image, 0, 0);
	
	// draw the mask directly below
	buffer.drawImage(mask, 0, height);

	// grab the pixel data for base image
	contents = buffer.getImageData(0, 0, width, height);
	
	// store pixel data array seperately so we can manipulate
	imageData = contents.data;
	
	// store mask data
	alphaData = buffer.getImageData(0, height, width, height).data;
	
	// loop through alpha mask and apply alpha values to base image
	for (var i = 3, len = imageData.length; i < len; i = i + 4) {
		imageData[i] = alphaData[i];
	}

	// return the pixel data with alpha values applied
	if (asBase64) {
		ctx.clearRect(0, 0, width, height);
	}
	ctx.putImageData(contents, 0, 0);
	return bufferCanvasReturn;	
}

function parseErrorMsg(EID) {
	var errorStr = "";
	switch(EID)
	{
	case "ERROR":
	  errorStr = TXT_ERROR;
	  break;
	case "ERROR_PROTOCOL":
	  errorStr = TXT_ERROR_PROTOCOL;
	  break;
	case "ERROR_PROTOCOL_SEQUENCE":
	  errorStr = TXT_ERROR_PROTOCOL_SEQUENCE;
	  break;
	case "ERROR_UNKNOWN_PARAMETER":
	  errorStr = TXT_ERROR_UNKNOWN_PARAMETER;
	  break;
	case "ERROR_MISSING_PARAMETER":
	  errorStr = TXT_ERROR_MISSING_PARAMETER;
	  break;
	case "ERROR_PARAMETER_VALUE":
	  errorStr = TXT_ERROR_PARAMETER_VALUE;
	  break;
	case "ERROR_BET_LIMITS":
	  errorStr = TXT_ERROR_BET_LIMITS;
	  break;
	case "ERROR_LINES":
	  errorStr = TXT_ERROR_LINES;
	  break;
	case "ERROR_FEATURE_PARAMETERS":
	  errorStr = TXT_ERROR_FEATURE_PARAMETERS;
	  break;
	case "ERROR_JACKPOT":
	  errorStr = TXT_ERROR_JACKPOT;
	  break;
	case "ERROR_UNKNOWN":
	  errorStr = TXT_ERROR_UNKNOWN;
	  break;
	case "ERROR_NULL":
	  errorStr = TXT_ERROR_NULL;
	  break;
	case "ERROR_INSUFFICIENTFUNDS":
	  errorStr = TXT_ERROR_INSUFFICIENTFUNDS;
	  break;
	case "ERROR_STATESAVE":
	  errorStr = TXT_ERROR_STATESAVE;
	  break;
	case "ERROR_STARTGAME":
	  errorStr = TXT_ERROR_STARTGAME;
	  break;
	case "ERROR_ENDGAME":
	  errorStr = TXT_ERROR_ENDGAME;
	  break;
	case "ERROR_GAMENOTSUPPORTED":
	  errorStr = TXT_ERROR_GAMENOTSUPPORTED;
	  break;
	case "ERROR_TIMEOUT":
	  errorStr = TXT_ERROR_TIMEOUT;
	  break;
	case "ERROR_SERVLET":
	  errorStr = TXT_ERROR_SERVLET;
	  break;
	case "ERROR_GAMING_LIMITS":
	  errorStr = TXT_ERROR_GAMING_LIMITS;
	  break;
	case "ERROR_INVALID_SESSION":
	  errorStr = TXT_ERROR_INVALID_SESSION;
	  break;
	case "ERROR_ACCOUNT_BLOCKED":
	  errorStr = TXT_ERROR_ACCOUNT_BLOCKED;
	  break;
	case "ERROR_DEFAULT":
	  errorStr = TXT_ERROR_DEFAULT;
	  break;
	}
	return errorStr;
}

//Input:	 #C01[aaaaaaa#C02[bbbbbbb]cccc#C03[dddddd#C04[eeeeeeeeee]ddd]cccc]
//Output:	 <span class="txt_C01">aaaaaaa<span class="txt_C02">bbbbbbb</span>cccc<span class="txt_C03">dddddd<span class="txt_C04">eeeeeeeeee</span>ddd</span>cccc</span>
function parseTextFormatToCSS(text)
{
	if ($.isArray(text)) {
		$.each(text, function(index, value) {
			text[index] = parseTextFormatToCSS(text[index]);
		});
	} else {
		var start = text.indexOf("#C");
		var bracketStart = text.indexOf("[");
		if (start!=-1 && bracketStart!=-1) {
			var Tag = text.substring(start+1, bracketStart);
			text = text.replace("#"+Tag+"[", "<span class='txt_"+Tag+"'>");
			text = parseTextFormatToCSS(text);
		} else {
			text = text.replace(/]/g, "</span>");
		}
	}
	return text;
}

function Clock() {
	this.enabled = false;	//OFF by default
	this.timeStr = "";
	this.text = new TextFast(80,30);
	this.text.font   = "20px arial";
	this.text.align  = "left";
	this.text.m_Color = '#FFFFFF';
	this.UPDATE_FREQUENCY  = 1000;		// how often (ms) we check the time
	this.updateCounter 	   = this.UPDATE_FREQUENCY;
	this.position = {x:830,y:20};	// default position on screen
	
	//set up the clock and format
	this.init = function(pos) {
		var d = new Date();
		this.timeStr = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
		this.text.setText(this.timeStr);
//		if($("#clock").length) {
//			$("#clock").text(this.timeStr);
//		}

		if(!(typeof pos === "undefined")) {		// if they are defined then use them
			this.position = pos;
		}
		this.text.setPosition(this.position);
	}
	
	this.update = function(deltaTime) {
		this.updateCounter -= deltaTime;
		if(this.updateCounter <= 0) {
			var d = new Date();
			this.timeStr = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
			if(this.timeStr != this.text.m_Text) {
				this.text.setText(this.timeStr);
//				if($("#clock").length) {
//					$("#clock").text(this.timeStr);
//				}
			}
			this.updateCounter = this.UPDATE_FREQUENCY;
		}
	}
	
	this.draw = function() {
		if(this.enabled) {
			//draw background
			ctx.beginPath();
			ctx.rect(this.position.x-5, this.position.y-20, 60, 24);
			ctx.fillStyle = "rgba(0,0,0,0.4)";
			ctx.fill();		
			
			//draw text on top
			this.text.draw(ctx);
		}
	}
}

function Meters() {
	var meterCanv = document.createElement('canvas'); // off screen canvas for the meters for efficiency

	var METERS_WIDTH  = 960;
	var METERS_HEIGHT = 32;
	var VALUE_PADDING = 5; // The gap in pixels between meter label and start of meter value
	
	var labelTxtHeight	= 24;
	var valueTxtHeight	= 24;
	var labelPosY		= 26;
	var valuePosY		= 26;
	
	meterCanv.width  = METERS_WIDTH;
	meterCanv.height = METERS_HEIGHT;
	var meterCtx     = meterCanv.getContext('2d');

	this.textBalanceLabel 			= new Text();
	this.textBalanceLabel.align  	= "left";
	this.textBalanceLabel.m_Color 	= 'yellow';

	this.textBetLabel 				= new Text();
	this.textBetLabel.align  		= "left";
	this.textBetLabel.m_Color 		= 'yellow';

	this.textWinLabel 				= new Text();
	this.textWinLabel.align  		= "left";
	this.textWinLabel.m_Color 		= 'yellow';

	this.textBalanceValue 			= new Text();
	this.textBalanceValue.align  	= "left";
	this.textBalanceValue.m_Color 	= '#FFFFFF';

	this.textBetValue 				= new Text();
	this.textBetValue.align  		= "left";
	this.textBetValue.m_Color 		= '#FFFFFF';

	this.textWinValue 				= new Text();
	this.textWinValue.align  		= "left";
	this.textWinValue.m_Color 		= '#FFFFFF';

	var fillgrd = {}; //meterCtx.createLinearGradient(0, 0, 0, METERS_HEIGHT);

	// gradientDef is the gradient definition. 
	// Format: [{p:0,col:'#FFFFFF'},{p:0.5,col:'#FF66FF'},{p:1.0,col:'#FF6666'}]
	// for solid colour just make the gradient have uniform colour
	this.setBackground = function(gradientDef) {
		fillgrd = meterCtx.createLinearGradient(0, 0, 0, METERS_HEIGHT);
		for(var i=0; i < gradientDef.length; i++) {
			fillgrd.addColorStop(gradientDef[i].p, gradientDef[i].col);
		}
	}

	//can override the default colour scheme
	this.setFontColour = function(labelCol, valueCol) {
		this.textBalanceLabel.m_Color = labelCol;
		this.textBetLabel.m_Color	  = labelCol;
		this.textWinLabel.m_Color	  = labelCol;

		this.textBalanceValue.m_Color = valueCol;
		this.textBetValue.m_Color	  = valueCol;
		this.textWinValue.m_Color	  = valueCol;
	}

	this.refreshTexture = function() {
		//draw the background
		meterCtx.beginPath();
		meterCtx.rect(0, 0, METERS_WIDTH, METERS_HEIGHT);
		meterCtx.fillStyle = fillgrd;
		meterCtx.fill();		
		
		//draw the text on top
		this.textBalanceLabel.drawShadowed(meterCtx);
		this.textBetLabel.drawShadowed(meterCtx);
		this.textWinLabel.drawShadowed(meterCtx);
		this.textBalanceValue.drawShadowed(meterCtx);
		this.textBetValue.drawShadowed(meterCtx);
		this.textWinValue.drawShadowed(meterCtx);
	}
	
	this.setMeterLabels = function(balance,bet,win) {
		this.textBalanceLabel.m_Text = balance;
		this.textBetLabel.m_Text     = bet;
		this.textWinLabel.m_Text 	 = win;

		labelTxtHeight = Number(METER_LABEL_SIZE_L.slice(0,-2));
		valueTxtHeight = Number(METER_VALUE_SIZE_L.slice(0,-2));

		labelPosY = METERS_HEIGHT - ((METERS_HEIGHT - labelTxtHeight) / 2) - 4;	// - 4 is a correction to center the txt vertically
		valuePosY = METERS_HEIGHT - ((METERS_HEIGHT - valueTxtHeight) / 2) - 4;

		// set the correct sized fonts
		this.textBalanceLabel.font  = METER_LABEL_SIZE_L +" arial";
		this.textBetLabel.font   	= METER_LABEL_SIZE_L +" arial";
		this.textWinLabel.font   	= METER_LABEL_SIZE_L +" arial";

		this.textBalanceValue.font  = METER_VALUE_SIZE_L +" arial";
		this.textBetValue.font   	= METER_VALUE_SIZE_L +" arial";
		this.textWinValue.font   	= METER_VALUE_SIZE_L +" arial";

		// calculate where to position the meter labels
		var percent = 2;	// 2% by default from the left edge
		var posX1 = Math.floor(METERS_WIDTH * (percent / 100));
		this.textBalanceLabel.setPosition({x:posX1,y:labelPosY});
		
		var percent2 = Number(METER_BALANCE_WIDTH.slice(0,-1));
		var posX2 = Math.floor(METERS_WIDTH * ((percent + percent2) / 100));
		this.textBetLabel.setPosition({x:posX2,y:labelPosY});

		var percent3 = Number(METER_BET_WIDTH.slice(0,-1));
		var posX3 = Math.floor(METERS_WIDTH * ((percent + percent2 + percent3) / 100));
		this.textWinLabel.setPosition({x:posX3,y:labelPosY});
		
		//set the correct font in the context so we can calculate its size
		meterCtx.lineJoin	= "round";
		meterCtx.textAlign 	= "left";		//alignment is handled later 
		meterCtx.font 		= this.textBalanceLabel.font;
		
		// now calculate where to draw the meter values
		var posX = meterCtx.measureText(this.textBalanceLabel.m_Text).width + posX1 + VALUE_PADDING ;	// add a 10 pixel gap after the label
		this.textBalanceValue.setPosition({x:posX,y:valuePosY});

		posX = meterCtx.measureText(this.textBetLabel.m_Text).width + posX2 + VALUE_PADDING ;	// add a 10 pixel gap after the label
		this.textBetValue.setPosition({x:posX,y:valuePosY});

		posX = meterCtx.measureText(this.textWinLabel.m_Text).width + posX3 + VALUE_PADDING ;	// add a 10 pixel gap after the label
		this.textWinValue.setPosition({x:posX,y:valuePosY});
		
		this.refreshTexture();
	}
	
	this.setMeterBalanceValue = function(balance) {
		this.textBalanceValue.m_Text = balance;
	}

	this.setMeterBetValue = function(bet) {
		this.textBetValue.m_Text = bet;
	}

	this.setMeterWinValue = function(win) {
		this.textWinValue.m_Text = win;
	}
	
	this.draw = function() {
		ctx.drawImage(meterCanv,0,-32);
	}
}

//Returns appropriate deciaml seperator based on language code
function DecimalSeparator()
{
	var lc = windowObj.languageCode;
		lc = lc.substring(0,2);
	var seperator;
	
	switch(lc)
	{
		case "en":
		case "ja":
		case "ko":
		case "zh":
			seperator = ".";
			break;
        default:
			seperator = ",";
	}
	return seperator;
};