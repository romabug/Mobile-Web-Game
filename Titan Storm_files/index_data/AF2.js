(function() {

var Assert = {
    exists: function(o) {
        if (o === undefined || o == null) {
            throw new Error("Assertion error");
        }
    }
};

var AF = {};
AF.Assert = Assert;

function DObject() {
    this.x = 0;
    this.y = 0;
    this.visible = true;
    this.scaleX = 1;
    this.scaleY = 1;
    this.alpha = 1;
    this.rotate = 0;
    this.mask = null;
};

DObject.prototype.draw = function(ctx) {
    if (this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotate * Math.PI / 180);
        ctx.globalAlpha = ctx.globalAlpha * this.alpha;

        if (this.mask) {
            ctx.beginPath();
            ctx.rect(this.mask.x, this.mask.y, this.mask.width, this.mask.height);
            ctx.clip();
        }

        this.performDraw(ctx);

        ctx.restore();
    }
};

DObject.prototype.setMask = function(x, y, width, height) {
    this.mask = {
        x: x,
        y: y,
        width: width,
        height: height
    };
};

//should be overridden
DObject.prototype.performDraw = function(ctx) {};

//should be overridden
DObject.prototype.update = function(time) {};

//should be overridden
DObject.prototype.nextActionTime = function(overTime) {
    return overTime;
};

AF.DObject = DObject;

//----------------------------------

function Container() {
    DObject.call(this);
    this.children = [];
};

Container.prototype = new DObject();
AF.Container = Container;

Container.prototype.addChild = function(child) {
    Assert.exists(child);
    this.children.unshift(child);
};

Container.prototype.performDraw = function(ctx) {
    for (var i = this.children.length - 1; i >= 0; i--) {
        this.children[i].draw(ctx);
    }
};

Container.prototype.update = function() {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].update();
    }
};

Container.prototype.nextActionTime = function(overTime) {
    var min = overTime;
    for (var i = 0; i < this.children.length; i++) {
        min = this.children[i].nextActionTime(min);
    }
    return min;
};


//----------------------------------

function Sprite(image, framesCount) {
    DObject.call(this);
    this.frame = 0;
    this.image = image;
    this.framesCount = framesCount;
    this.width = image.width / framesCount;
    this.height = image.height;
};

Sprite.prototype = new DObject();
AF.Sprite = Sprite;

Sprite.prototype.performDraw = function(ctx) {
    this.frame = Math.floor(this.frame) % this.framesCount;
    var x = this.width * this.frame;
    ctx.drawImage(this.image,
        x, 0, this.width, this.height,
        0, 0, this.width, this.height);
};

//----------------------------------
function Text() {
    DObject.call(this);
    this.text = "";
    this.textFormat = {
        // NOTE: all converted to strings, 
        // if("false") === true 
        align: "left",
        bold: true,
        size: 12,
        font: "Arial",
        color: "#000000",
        lside: 0,
        rside: 100,
        textBaseline: "alphabetic",
        stroke: "",
        flashStyle: true
    };
    this.maxWidth = -1;
}

Text.formats = {};
Text.addFormat = function(name, format) {
    this.formats[name] = format;
};

Text.prototype = new DObject();
AF.Text = Text;

Text.prototype.performDraw = function(ctx) {
    ctx.textAlign = "left";
    ctx.textBaseline = this.textBaseline;
    ctx.lineJoin = "round";

    if (this.textFormat.flashStyle) {
        this.text = this.text.toString();
        
        this.text = this.text.replace(/#(C\d)+\[([^\]]+)\]/gi, '<f name="$1">$2</f>');

        if (typeof this.linebreak !== "undefined")
            this.text = this.text.replace(/&lt;BR&gt;/g, ("<n px='" + this.linebreak + "'/>"));
    }

    var text = $("<f/>").append(this.text);
    for (var p in this.textFormat) {
        text.attr(p, this.textFormat[p]);
    }

    var lines = [[[]]];
    this._parseElement(text[0], lines, this.textFormat);

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        ctx.translate(0, this._getLineHeight(line));

        for (var j = 0; j < line.length; j++) {
            var segment = line[j];
            if (segment.length > 0) {
                // clone formats since they will be changed
                if (this.maxWidth > 0) {
                    for (var k = 0; k < segment.length; k++)
                        segment[k].format = $.extend({}, segment[k].format);
                }

                var stringWidth;
                do {
                    stringWidth = this._getSegmentWidth(ctx, segment);

                    if (this.maxWidth > 0 && stringWidth > this.maxWidth) {
                        for (var k = 0; k < segment.length; k++)
                            segment[k].format.size--
                    } else
                        break;
                } while (true)

                var align = segment[0].format.align;
                var lSide = parseInt(segment[0].format.lside);
                var rSide = parseInt(segment[0].format.rside);
                var x = align == "left" ? lSide : align == "right" ? rSide - stringWidth : (lSide + rSide - stringWidth) / 2;

                stringWidth = 0;
                for (var k = 0; k < segment.length; k++) {
                    var block = segment[k];
                    var format = block.format;

                    this._applyFont(ctx, format);

                    if (format.stroke) {
                        var strokes = [];
                        var tmp = format.stroke.split(",");
                        for (var l = 0; l < tmp.length; l++) {
                            var stroke = tmp[l].trim().split(/\s+/);
                            strokes.push({
                                color: stroke[0],
                                width: stroke[1]
                            });
                        }
                        strokes.sort(function(a, b) {
                            return b.width - a.width
                        });
                        for (var l = 0; l < strokes.length; l++) {
                            var stroke = strokes[l];
                            ctx.lineWidth = stroke.width;
                            ctx.strokeStyle = stroke.color;
                            ctx.strokeText(block.text, x + stringWidth, 0);
                        }
                    }

                    this._applyColor(ctx, format);
                    ctx.fillText(block.text, x + stringWidth, 0);

                    stringWidth += ctx.measureText(block.text).width
                }
            }
        }
    };
};

Text.prototype._parseElement = function(node, lines, format) {
    switch (node.nodeName) {
        case "F":
            var formatName = $(node).attr("name");
            format = $.extend({}, format, formatName ? Text.formats[formatName] : {});
            for (var i = 0; i < node.attributes.length; i++) {
                var attr = node.attributes.item(i);
                if (attr.name == "align" && format.align != attr.value && !(lines[lines.length - 1].length == 1 && lines[lines.length - 1][0].length == 0)) {
                    lines[lines.length - 1].push([]);
                }
                if (attr.name != "name") {
                    format[attr.name] = attr.value;
                }
            }
            for (var i = 0; i < node.childNodes.length; i++) {
                this._parseElement(node.childNodes[i], lines, format);
            }
            break;
        case "N":
            var newLine = [[]];
            var px = $(node).attr("px");
            if (!isNaN(px)) {
                newLine.px = parseInt(px);
            }
            lines.push(newLine);
            break;
        case "#text":
            var segment = lines[lines.length - 1];
            segment[segment.length - 1].push({
                text: $(node).text(),
                format: format
            });
            break;
    }
};

Text.prototype._getLineHeight = function(line) {
    if (line.hasOwnProperty("px")) {
        return line.px;
    }
    var height = 0;
    for (var i = 0; i < line.length; i++) {
        var segment = line[i];
        for (var j = 0; j < segment.length; j++) {
            height = Math.max(height, segment[j].format.size);
        }
    }
    return height;
};

Text.prototype._getSegmentWidth = function(ctx, segment) {
    var width = 0;
    for (var i = 0; i < segment.length; i++) {
        var block = segment[i];
        this._applyFont(ctx, block.format);
        width += ctx.measureText(block.text).width;
    }
    return width;
}

Text.prototype._applyFont = function(ctx, format) {
    if (typeof format.bold == "string")
        format.bold = (format.bold === "false" ? false : true);

    ctx.font = (format.bold ? "bold" : "normal") + " " +
        format.size + "px " +
        (format.font || "");
};

Text.prototype._applyColor = function(ctx, format) {
    var color = format.color;
    colorStops = color.split(",");
    if (colorStops.length == 1) {
        ctx.fillStyle = color;
    } else {
        var gradient = ctx.createLinearGradient(0, -format.size, 0, format.size);
        for (var i = 0; i < colorStops.length; i++) {
            var colorStop = colorStops[i].trim().split(/\s+/);
            gradient.addColorStop(colorStop[1], colorStop[0]);
        }
        ctx.fillStyle = gradient;
    }
};

Text.prototype.setTextFormat = function(format) {
    Assert.exists(format);
    if (typeof format == "string") {
        format = Text.formats[format];
    }
    for (var p in format) {
        this.textFormat[p] = format[p];
    }
};

AF.Text.prototype.setMixedFormat = function(format) {
    AF.Assert.exists(format);
    if (typeof format == "string") {
        format = Text.formats[format];
    }
    for (var p in format) {
        if (["x", "y", "text", "maxWidth", "linebreak", "scaleX", "scaleY", "textBaseline"].indexOf(p) > -1)
            this[p] = format[p];
        else
            this.textFormat[p] = format[p];
    }
};

//----------------------------------

function MoneyText() {
    Text.call(this);
    this.maxWidth = -1;
}

MoneyText.prototype = new Text();
AF.MoneyText = MoneyText;

MoneyText.prototype.performDraw = function(ctx) {
    var format = $.extend({}, this.textFormat);

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.lineJoin = "round";
    ctx.translate(0, format.size);

    do {
        this._applyFont(ctx, format);
        var width = ctx.measureText(this.text).width;
        format.size--;
    }
    while (this.maxWidth != -1 && width > this.maxWidth);

    var align = format.align;
    var lSide = parseInt(format.lside);
    var rSide = parseInt(format.rside);
    var x = align == "left" ? lSide : align == "right" ? rSide - width : (lSide + rSide - width) / 2;

    if (format.stroke) {
        var strokes = [];
        var tmp = format.stroke.split(",");
        for (var l = 0; l < tmp.length; l++) {
            var stroke = tmp[l].trim().split(/\s+/);
            strokes.push({
                color: stroke[0],
                width: stroke[1]
            });
        }
        strokes.sort(function(a, b) {
            return b.width - a.width
        });
        for (var l = 0; l < strokes.length; l++) {
            var stroke = strokes[l];
            ctx.lineWidth = stroke.width;
            ctx.strokeStyle = stroke.color;
            ctx.strokeText(this.text, x, 0);
        }
    }

    this._applyColor(ctx, format);
    ctx.fillText(this.text, x, 0);

};

function Rectangle(width, height, color) {
    DObject.call(this);
    this.width = width;
    this.height = height;
    this.color = color;
};

Rectangle.prototype = new DObject();
AF.Rectangle = Rectangle;

Rectangle.prototype.performDraw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
};

//----------------------------------

function Movie(duration) {
    Container.call(this);
    this.actions = [];
    this.tweens = [];

    this.time = 0;
    this.duration = duration;
    this.lastUpdatedTime = 0;

    this.playing = false;
};

Movie.prototype = new Container();
AF.Movie = Movie;

Movie.root = new Movie();
Movie.lastUpdatedTime = 0;

Movie.update = function(globalDelta) {
    while (globalDelta > 0) {
        delta = Movie.root.nextActionTime(globalDelta);
        Movie.lastUpdatedTime += delta;
        globalDelta -= delta;

        Movie.root.update();
    }
};

Movie.prototype.addAction = function(action, time) {
    Assert.exists(action);
    Assert.exists(time);
    this.actions[time] = action;
};

Movie.prototype.nextActionTime = function(overTime) {
    var min = overTime;
    if (this.playing) {
        for (var t in this.actions) {
            t = parseInt(t);
            if (t != this.time) {
                min = Math.min(min, (t + this.duration - this.time) % this.duration);
            }
        }
    }
    return Container.prototype.nextActionTime.call(this, min);
};

Movie.prototype.moveTo = function(time) {
    this.update();
    if (this.time != time || !this.playing) {
        this.time = time;
        if (this.actions[time]) {
            this.actions[time].call(this);
        }
    }
};

Movie.prototype.update = function() {
    if (this.lastUpdatedTime != Movie.lastUpdatedTime) {
        var playTime = (Movie.lastUpdatedTime - this.lastUpdatedTime + this.time) % this.duration;
        this.lastUpdatedTime = Movie.lastUpdatedTime;
        if (this.playing) {
            this.moveTo(playTime);
        }
    }
    Container.prototype.update.call(this);
};

Movie.prototype.addTween = function(tween) {
    this.tweens.push(tween);
};

Movie.prototype.play = function(time) {
    if (time || time == 0) {
        this.moveTo(time);
    }
    this.playing = true;
};

Movie.prototype.stop = function(time) {
    if (time || time == 0) {
        this.moveTo(time);
    }
    this.playing = false;
};

Movie.prototype.performDraw = function(ctx) {
    for (var i = 0; i < this.tweens.length; i++) {
        this.tweens[i].apply(this.time);
    }
    Container.prototype.performDraw.call(this, ctx);
};

//----------------------------------
function Tween(target, property, startValue) {
    this.target = target;
    this.property = property;
    this.nodes = [{
        time: 0,
        value: startValue || 0,
        method: Tween.LINEAR,
        args: []
    }];
};

AF.Tween = Tween;

Tween.LINEAR = function(a, b, x) {
    return a * (1 - x) + b * x;
};

Tween.JUMP = function(a, b, x) {
    return x < 1 ? a : b;
};

Tween.POWER = function(a, b, x, pow) {
    x = Math.pow(x, pow);
    return a * (1 - x) + b * x;
};

Tween.POWERK = function(a, b, x, pow, kx, ky, x0, y0) {
    var kx = kx || 1,
        ky = ky || 1,
        x0 = x0 || 0,
        y0 = y0 || 0,
        xx = (Math.pow(x * kx + x0, pow) + y0) * ky;
    return Tween.LINEAR(a, b, xx);
};

Tween.BOUNCE = function(a, b, x) {
    // http://scripty2.com/doc/scripty2%20fx/s2/fx/transitions.html
    if ((x) < (1 / 2.75)) {
        var xx = (7.5625 * x * x);
    } else if (x < (2 / 2.75)) {
        var xx = (7.5625 * (x -= (1.5 / 2.75)) * x + .75);
    } else if (x < (2.5 / 2.75)) {
        var xx = (7.5625 * (x -= (2.25 / 2.75)) * x + .9375);
    } else {
        var xx = (7.5625 * (x -= (2.625 / 2.75)) * x + .984375);
    }
    return Tween.LINEAR(a, b, xx);
};

Tween.SIN = function(a, b, x, pulses) {
    var xx = -Math.sin((x * (pulses || 1) + 0.5) * Math.PI);
    return Tween.LINEAR(a, b, xx);
};


Tween.prototype.set = function(time, value, method) {
    var node = {
        time: time,
        args: []
    };
    if (value !== undefined) {
        node.value = value;
    }
    node.method = method || Tween.LINEAR;
    for (var i = 3; i < arguments.length; i++) {
        node.args.push(arguments[i]);
    }

    this.nodes.push(node);
    this.nodes.sort(function(a, b) {
        return a.time - b.time;
    });
    return this;
};

Tween.prototype.apply = function(time) {
    var value;
    for (var i = 0; i < this.nodes.length && this.nodes[i].time <= time; i++) {
        if (this.nodes[i].hasOwnProperty("value")) {
            value = this.nodes[i].value;
        }
    }
    if (i < this.nodes.length && this.nodes[i].hasOwnProperty("value")) {
        value = this.nodes[i].method.apply(this, [value,
 this.nodes[i].value,
            (time - this.nodes[i - 1].time) / (this.nodes[i].time - this.nodes[i - 1].time)
].concat(this.nodes[i].args));
    }
    if (this.property != "alpha" && this.property != "scaleX" && this.property != "scaleY" && this.property != "rotate") {
        value = Math.round(value);
    }
    this.target[this.property] = value;
};

function SpriteTween(target, firstFrame) {
    Assert.exists(target);
    this.target = target;
    this.firstFrame = firstFrame || 0;
    this.segments = [];
}

AF.SpriteTween = SpriteTween;

SpriteTween.prototype.set = function(startTime, pattern, duration) {
    var segment = {
        duration: duration,
        frames: []
    };
    var a = pattern.split(",");
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split("-");
        var x = parseInt(b.shift());
        segment.frames.push(x);
        while (b.length > 0) {
            var y = parseInt(b[0]);
            x += x < y ? 1 : -1;
            if (x == y) {
                b.shift();
            }
            segment.frames.push(x);
        }
    }
    this.segments[startTime] = segment;
    return this;
};

SpriteTween.prototype.apply = function(time) {
    var t = -1;
    for (var i in this.segments) {
        if (i > time) {
            break;
        }
        t = i;
    }
    if (t == -1) {
        this.target["frame"] = this.firstFrame;
    } else {
        var frames = this.segments[t].frames;
        var duration = this.segments[t].duration;
        time -= t;
        this.target["frame"] = frames[Math.min(frames.length - 1, Math.floor(time / duration * frames.length))];
    }
};

function BufferedPanel(width, height) {
    Container.call(this);
    this.width = width;
    this.height = height;
    this.buffer = null;
};

BufferedPanel.prototype = new Container();
AF.BufferedPanel = BufferedPanel;

BufferedPanel.prototype.performDraw = function(ctx) {
    if (this.useBuffer()) {
        if (!this.buffer) {
            this.buffer = document.createElement("canvas");
            this.buffer.width = this.width;
            this.buffer.height = this.height;
            Container.prototype.performDraw.call(this, this.buffer.getContext("2d"));
        }
        ctx.drawImage(this.buffer, 0, 0);
    } else {
        this.buffer = null;
        Container.prototype.performDraw.call(this, ctx);
    }
};

BufferedPanel.prototype.reset = function() {
    this.buffer = null;
};

BufferedPanel.prototype.useBuffer = function() {
    return true;
};

window.AF = AF;

})();