(function()
{

var Assert =
{
		exists : function(o)
		{
			if(o===undefined || o==null)
			{
				throw new Error("Assertion error");
			}
		}
};
	
var AF = {};
	
function DObject()
{
	this.x = 0;
	this.y = 0;
	this.visible = true;
	this.scaleX = 1;
	this.scaleY = 1;
	this.alpha  = 1;
	this.rotate = 0;
	this.flip = [1,1];
	this.mask = null;
};

DObject.prototype.draw = function()
{
	if(this.visible && this.alpha>0 && this.scaleX!=0 && this.scaleY!=0)
	{
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.scale(this.scaleX*this.flip[0], this.scaleY*this.flip[1]);
		ctx.rotate(this.rotate*Math.PI/180); 
		ctx.globalAlpha = ctx.globalAlpha * this.alpha;

		if(this.mask)
		{
			ctx.beginPath();
			ctx.rect(this.mask.x, this.mask.y, this.mask.width, this.mask.height);
			ctx.clip();
		}
		
		this.performDraw();
		
		ctx.restore();
	}
};

DObject.prototype.setMask = function(x,y,width,height)
{
	this.mask = {x:x,y:y,width:width,height:height};
};

//should be overridden
DObject.prototype.performDraw = function()
{
};

//should be overridden
DObject.prototype.update = function(time)
{
};

//should be overridden
DObject.prototype.nextActionTime = function(overTime)
{
	return overTime;
};

AF.DObject = DObject;

//----------------------------------

function Sprite(image, framesCount)
{
	DObject.call(this);
	this.frame = 0;
	this.image = image;
	this.framesCount = framesCount;
	this.width = image.width / framesCount;
	this.height= image.height;
};

Sprite.prototype = new DObject();
AF.Sprite = Sprite;

Sprite.prototype.performDraw = function()
{
	this.frame = Math.floor(this.frame) % this.framesCount;
	var x = this.width * this.frame;
	ctx.drawImage(	this.image,
					x, 0, this.width, this.height,
					0, 0, this.width, this.height);
};

//----------------------------------
function Text()
{
	DObject.call(this);
	this.text = "";
	this.vAlign = "bottom";
	this.hAlign = "left";
	
	this.bold = false;
	this.size = 12;
	this.font = "Arial";
	
	this.color = "#000000";
	this.strokeColor = null;
	this.stroke = [];
}

Text.prototype = new DObject();
AF.Text = Text;

Text.prototype.performDraw = function()
{
	ctx.textAlign = this.hAlign;
	ctx.textBaseline = this.vAlign;
	
	ctx.font = (this.bold ? "bold" : "normal")+" "+
			    this.size + "px "+
			   (this.font || "");
	
	if(this.stroke.length)
	{
		this.stroke.sort(function(a,b){return b[0]-a[0]});
		for (var i=0; i<this.stroke.length; i++)
		{
			ctx.lineWidth =this.stroke[i][0];
			ctx.strokeStyle = this.stroke[i][1];
			ctx.strokeText(this.text, 0, 0);
		}
	}
	
	// left for backwards compatibility
	if(this.strokeColor2)
	{
		ctx.lineWidth =8;
		ctx.strokeStyle = this.strokeColor2;
		ctx.strokeText(this.text, 0, 0);
	}
	
	if(this.strokeColor1)
	{
		ctx.lineWidth = 4;
		ctx.strokeStyle = this.strokeColor1;
		ctx.strokeText(this.text, 0, 0);
	}
	
	ctx.fillStyle = this.color;
	ctx.fillText(this.text, 0, 0);
};

Text.prototype.setProperties = function(properties)
{
	for(var name in properties)
	{
		this[name] = properties[name];
	}
};

//----------------------------------

function Rectangle(width, height, color)
{
	DObject.call(this);
	this.width = width;
	this.height= height;
	this.color = color;
};

Rectangle.prototype = new DObject();
AF.Rectangle = Rectangle;

Rectangle.prototype.performDraw = function()
{
	ctx.fillStyle = this.color;
	ctx.fillRect(0,0,this.width,this.height);
};

//----------------------------------

function Movie(duration)
{
	DObject.call(this);
	this.children = [];
	this.actions = [];
	this.tweens = [];
	
	this.time = 0;
	this.duration = duration;
	this.lastUpdatedTime = 0;
	
	//this.timeline = [];
	this.playing = false;
};

Movie.prototype = new DObject();
AF.Movie = Movie;

Movie.root = new Movie();
Movie.lastUpdatedTime = 0;

Movie.update = function(globalDelta)
{
	while(globalDelta>0)
	{
		delta = Movie.root.nextActionTime(globalDelta);
		Movie.lastUpdatedTime += delta;
		globalDelta -= delta;
		
		Movie.root.update();
	}
};

Movie.prototype.addChild = function(child)
{
	Assert.exists(child);
	this.children.unshift(child);
};

Movie.prototype.addAction = function(action, time)
{
	Assert.exists(action);
	Assert.exists(time);
	this.actions[time] = action;
};

Movie.prototype.nextActionTime = function(overTime)
{
	var min = overTime;
	if(this.playing)
	{
		for(var t in this.actions)
		{
			t = parseInt(t);
			if(t!=this.time)
			{
				min = Math.min(min, (t + this.duration - this.time) % this.duration);
			}
		}
	}
	for(var i=0;i<this.children.length;i++)
	{
		min = Math.min(min, this.children[i].nextActionTime(overTime));
	}
	return min;
};

Movie.prototype.moveTo = function(time)
{
	this.update();
	if(this.time != time || !this.playing)
	{
		this.time = time;
		if(this.actions[time])
		{
			this.actions[time].call(this);
		}
	}
};

Movie.prototype.update = function()
{
	if(this.lastUpdatedTime!=Movie.lastUpdatedTime)
	{
		var playTime = (Movie.lastUpdatedTime - this.lastUpdatedTime + this.time ) % this.duration;
		this.lastUpdatedTime=Movie.lastUpdatedTime;
		if(this.playing)
		{
			this.moveTo(playTime);
		}
		for(var i=0;i<this.children.length;i++)
		{
			this.children[i].update();
		}
	}
};

Movie.prototype.addTween = function(tween)
{
	this.tweens.push(tween);
};

Movie.prototype.play = function(time)
{
	if(time || time==0)
	{
		this.moveTo(time);
	}
	this.playing = true;
};

Movie.prototype.stop = function(time)
{
	if(time || time==0)
	{
		this.moveTo(time);
	}
	this.playing = false;
};

Movie.prototype.performDraw = function()
{
	for(var i=0;i<this.tweens.length;i++)
	{
		this.tweens[i].apply(this.time);
	}
	for(var i=this.children.length-1;i>=0;i--)
	{
		this.children[i].draw();
	}
};

//----------------------------------
function Tween(target, property, startValue)
{
	this.target = target;
	this.property = property;
	this.nodes = [{time:0, value:startValue || 0, method:Tween.LINEAR, args: []}];
};

AF.Tween = Tween;

Tween.LINEAR = function(a, b, x)
{
	return a*(1-x) + b*x;
};

Tween.JUMP = function(a, b, x)
{
	return x < 1 ? a : b;
};

Tween.POWER = function(a, b, x, pow)
{
	x = Math.pow(x, pow);
	return a*(1-x) + b*x;
};

Tween.POWERK = function(a, b, x, pow, kx, ky, x0, y0)
{
	var kx = kx || 1, ky = ky || 1,
	    x0 = x0 || 0, y0 = y0 || 0,
	    xx = (Math.pow(x*kx+x0,pow)+y0)*ky;
	return Tween.LINEAR(a, b, xx);
};

Tween.BOUNCE = function(a, b, x)
{
	// http://scripty2.com/doc/scripty2%20fx/s2/fx/transitions.html
	if ((x) < (1/2.75)) {
		var xx = (7.5625*x*x);
	} else if (x < (2/2.75)) {
		var xx = (7.5625*(x-=(1.5/2.75))*x + .75);
	} else if (x < (2.5/2.75)) {
		var xx = (7.5625*(x-=(2.25/2.75))*x + .9375);
	} else {
		var xx = (7.5625*(x-=(2.625/2.75))*x + .984375);
	}
  
	return Tween.LINEAR(a, b, xx);
};


Tween.SIN= function(a, b, x, pulses) {

	var xx = Math.sin((x*(pulses || 1))*Math.PI);
	return Tween.LINEAR(a, b, xx);
};
  
  
Tween.prototype.set = function(time, value, method)
{
	var node = {time:time, args:[]};
	if(value!==undefined)
	{
		node.value = value;
	}
	node.method = method || Tween.LINEAR;
	for(var i=3;i<arguments.length;i++)
	{
		node.args.push(arguments[i]);
	}
	
	this.nodes.push(node);
	this.nodes.sort(function(a,b){return a.time-b.time;});
	return this;
};

Tween.prototype.apply = function(time)
{
	var value;
	for(var i=0;i<this.nodes.length && this.nodes[i].time <= time;i++)
	{
		if(this.nodes[i].hasOwnProperty("value"))
		{
			value=this.nodes[i].value;
		}
	}
	if(i<this.nodes.length && this.nodes[i].hasOwnProperty("value"))
	{
		value = this.nodes[i].method.apply(this, 
				[value,
				 this.nodes[i].value,
				 (time - this.nodes[i-1].time)/(this.nodes[i].time - this.nodes[i-1].time)
				].concat(this.nodes[i].args));
	}
	if(this.property!="alpha" && this.property!="scaleX" && this.property!="scaleY")
	{
		value = Math.floor(value);
	}
	this.target[this.property] = value;
};

function SpriteTween(target, pattern, duration)
{
	Assert.exists(target);
	this.target = target;
	this.duration = duration;
	this.frames = [];
	
	var a = pattern.split(",");
	for(var i=0;i<a.length;i++)
	{
		var b = a[i].split("-");
		var x = parseInt(b.shift());
		this.frames.push(x);
		while(b.length>0)
		{
			var y = parseInt(b[0]);
			x += x < y ? 1 : -1;
			if(x==y)
			{
				b.shift();
			}
			this.frames.push(x);
		}
	}
};

AF.SpriteTween = SpriteTween;

SpriteTween.prototype.apply = function(time)
{
	var i = Math.min(this.frames.length-1, Math.floor(time / this.duration * this.frames.length));
	this.target["frame"] = this.frames[i];
};

window.AF = AF;

})();