function FreeGamesMovie()
{
    var t = 120;
	AF.Movie.call(this, 10*t);
    
    var roamingWildStarted = false;
    
    var headStart1 = new StartRoamingWild();
    var headStart2 = new StartRoamingWild();
    this.addChild(headStart1);
    this.addChild(headStart2);
    
    var headWin1 = new RoamingWildWin();
    var headWin2 = new RoamingWildWin();
    this.addChild(headWin1);
    this.addChild(headWin2);
    
    var headCollide = new Collide10x();
    this.addChild(headCollide);
    
    this.showHeads = function()
    {
        headStart1.visible = true;
        headStart2.visible = true;
    }
    this.hideHeads = function()
    {
        headStart1.visible = false;
        headStart2.visible = false;
        headStart1.stop();
        headStart2.stop();
    }
    this.hideHeads1 = function()
    {
        headStart1.visible = false;
        headStart1.stop();
    }
    this.hideHeads2 = function()
    {
        headStart2.visible = false;
        headStart2.stop();
    }
	
	this.fadinHeads1 =function()
    {
		headWin1.fadin();
	}
	
		this.fadinHeads2 =function()
    {
		headWin2.fadin();
	}
	
    this.showHeads1Win = function()
    {
        headWin1.visible = true;
       headWin1.play(0);
 
    }
    this.showHeads2Win = function()
    {
        headWin2.visible = true;
          headWin2.play(0);
 
    }
    this.hideHeadsWin = function()
    {
        headWin1.visible = false;
        headWin1.stop();
        headWin2.visible = false;
        headWin2.stop();
    }
    this.showHeadsCollide = function()
    {
        game.playSound('doubleWild');
        headCollide.visible = true;
        headCollide.play(0);
    }
    this.hideHeadsCollide = function()
    {
        headCollide.visible = false;
        headCollide.stop();
    }
    this.playHeads = function()
    {
        this.hideHeadsCollide();
        this.hideHeadsWin();
        headStart1.play(0);
        headStart2.play(0);
        headStart1.visible = true;
        headStart2.visible = true;
    }
    this.moveHeads = function(positionHead1, positionHead2, firstStart)
    {
        var newPositionHead1 = positionHead1.split(";");
        var newPositionHead2 = positionHead2.split(";");
        this.hideHeadsCollide();
        this.hideHeadsWin();
        if (firstStart)
        {
            headStart1.x = (parseInt(newPositionHead1[0]) + 1) * (game.layout.symbolWidth + game.layout.reelGap) - 90;
            headStart2.x = (parseInt(newPositionHead2[0]) + 1) * (game.layout.symbolWidth + game.layout.reelGap) - 90;
            headStart1.y = parseInt(newPositionHead1[1]) * game.layout.symbolHeight;
            headStart2.y = parseInt(newPositionHead2[1]) * game.layout.symbolHeight;
            this.movingHead(headStart1.x, headStart1.x, headStart1.y, headStart1.y, headStart1);
            this.movingHead(headStart2.x, headStart2.x, headStart2.y, headStart2.y, headStart2);
        }
        else
        {
            this.movingHead(headStart1.x, ((parseInt(newPositionHead1[0]) + 1) * (game.layout.symbolWidth + game.layout.reelGap) - 90), headStart1.y, (parseInt(newPositionHead1[1]) * game.layout.symbolHeight), headStart1);
            this.movingHead(headStart2.x, ((parseInt(newPositionHead2[0]) + 1) * (game.layout.symbolWidth + game.layout.reelGap) - 90), headStart2.y, (parseInt(newPositionHead2[1]) * game.layout.symbolHeight), headStart2);
        }
        headWin1.x = headCollide.x = (parseInt(newPositionHead1[0]) + 1) * (game.layout.symbolWidth + game.layout.reelGap) - 90;
        headWin1.y = headCollide.y = parseInt(newPositionHead1[1]) * game.layout.symbolHeight;
        headWin2.x = (parseInt(newPositionHead2[0]) + 1) * (game.layout.symbolWidth + game.layout.reelGap) - 90;
        headWin2.y = parseInt(newPositionHead2[1]) * game.layout.symbolHeight;
        if (!firstStart)
        {
            this.playHeads();
        }
        this.play(0);
    }
    this.movingHead = function(lastPositionX, newPositionX, lastPositionY, newPositionY, content)
    {
        if (Math.round(Math.abs(lastPositionX-newPositionX)/(game.layout.symbolWidth + game.layout.reelGap))==1 || Math.round(lastPositionX-newPositionX)==0 || Math.round(Math.abs(lastPositionX-newPositionX)/(game.layout.symbolWidth + game.layout.reelGap))==0)
        {
            this.addTween(new AF.Tween(content,"x",lastPositionX).set(10*t,newPositionX));
        }
        else
        {
            if(lastPositionX-newPositionX>0)
            {
                this.addTween(new AF.Tween(content,"x",lastPositionX).set(5*t,1200).set(6*t,-400, AF.Tween.JUMP).set(10*t,newPositionX));
            }
            else
            {
                this.addTween(new AF.Tween(content,"x",lastPositionX).set(5*t,-400).set(6*t,1200, AF.Tween.JUMP).set(10*t,newPositionX));
            }
        }
        if (Math.round(Math.abs(lastPositionY-newPositionY)/game.layout.symbolHeight)==1 || Math.round(lastPositionY-newPositionY)==0 || Math.round(Math.abs(lastPositionY-newPositionY)/game.layout.symbolHeight)==0)
        {
            this.addTween(new AF.Tween(content,"y",lastPositionY).set(10*t,newPositionY));
        }
        else
        {
            if(lastPositionY-newPositionY>0)
            {
                this.addTween(new AF.Tween(content,"y",lastPositionY).set(5*t,1000).set(6*t,-300, AF.Tween.JUMP).set(10*t,newPositionY));
            }
            else
            {
                this.addTween(new AF.Tween(content,"y",lastPositionY).set(5*t,-300).set(6*t,1000, AF.Tween.JUMP).set(10*t,newPositionY));
            }
        }
    }
    this.addAction(function()
	{
		this.stop();
	}, 10*t-1);
}
FreeGamesMovie.prototype = new AF.Movie();



function RoamingWildWin()
{
	var t = 200;
	AF.Movie.call(this, 20*t);	
	
	var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('win_feature.png'),6);
    sprite.x = -13;
    sprite.y = -9;
	this.addChild(sprite);
	
	
   var sprite2 = new AF.Sprite(game.ASSET_MANAGER.getAsset('win_feature.png'),6);
    sprite2.x = -13;
    sprite2.y = -9;
	this.addChild(sprite2);
 	
	
	
this.addTween(new AF.SpriteTween(sprite).set(t, "0-5,4,3,2,1", 10*t));
this.addTween(new AF.Tween(sprite, "alpha", 1).set(1, 1).set(10*t-1,1).set(10*t,0) );  

this.addTween(new AF.SpriteTween(sprite2).set(10*t+t, "0-5,4,3,2,1", 10*t));
this.addTween(new AF.Tween(sprite2, "alpha", 0).set( 10*t-1, 0).set( 10*t, 1).set(15*t, 0.2).set(20*t-2, 1).set(20*t-1, 0) );   
 
 
 
 
 
 this.fadin = function() {
 
	 this.play(10*t);
	 };
   
     
    this.addAction(function()
	{ 
		this.play(0);
	}, 10*t-1);
	
  this.addAction(function()
	{   
 
 		this.play(0);
	}, 20*t-1);
	
	
	
};
RoamingWildWin.prototype = new AF.Movie();





function Collide10x()
{
	var t = 180;
	AF.Movie.call(this, 13*t);	
	
	var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('collide_x10.png'),8);
    sprite.x = -48;
    sprite.y = 19;
	this.addChild(sprite);
	
    this.addTween(new AF.SpriteTween(sprite).set(t, "0-7,7-4,1", 13*t));
};
Collide10x.prototype = new AF.Movie();

function StartRoamingWild()
{
    var t = 150;
	AF.Movie.call(this, 8*t);	
	
	var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('start_feature.png'),8);
	this.addChild(sprite);
	
    this.addTween(new AF.SpriteTween(sprite).set(t, "0-7", 8*t));


	
	
    this.addAction(function()
	{
		this.stop(0);
	}, 8*t-1);
};
StartRoamingWild.prototype = new AF.Movie();  

function positionsProvider(positionReel, positionRow)
{
    var startPositionHold = Math.random()*2;
    var generatedPostions = "";
    if (startPositionHold == 0)
    {
        generatedPostions = positionReel + ";" + firstPosition(positionRow, 2);
    }
    else
    {
        generatedPostions = firstPosition(positionReel, 4) + ";" + positionRow;
    }
    return generatedPostions;
}
		
function firstPosition(position, maxPoint)
{
    var startPositionMoving = Math.random()*2;
    var newPosition = parseInt(position) + (startPositionMoving == 0 ? 1 : -1);
    if (newPosition == -1)
    {
        newPosition = maxPoint;
    }
    if (newPosition == (maxPoint + 1))
    {
        newPosition = 0;
    }
    return newPosition;
}

function IntroMovie(text1, text2, text3, text4, text5, text6, text7, text8)
{
	AF.Movie.call(this,8000);
    
    var panel = new PopupPanel("frame.jpg");
	panel.x = 120;
	panel.y = 95;
	this.addChild(panel);
    
    this.panel = panel;
    
    var txt1 = new AF.Text();
    var txt2 = new AF.Text();
    var txt3 = new AF.Text();
    var txt4 = new AF.Text();
    var txt5 = new AF.Text();
    var txt6 = new AF.Text();
    var txt7 = new AF.Text();
    var txt8 = new AF.Text();
    
    txt1.setMixedFormat(text1);
    txt2.setMixedFormat(text2);
    txt3.setMixedFormat(text3);
    txt4.setMixedFormat(text4);
    txt5.setMixedFormat(text5);
    txt6.setMixedFormat(text6);
    txt7.setMixedFormat(text7);
    txt8.setMixedFormat(text8);
    
    this.panel.addChild(txt1);
    this.panel.addChild(txt2);
    this.panel.addChild(txt3);
    this.panel.addChild(txt4);
    this.panel.addChild(txt5);
    this.panel.addChild(txt6);
    this.panel.addChild(txt7);
    this.panel.addChild(txt8);
    
    var img = new AF.Sprite(game.ASSET_MANAGER.getAsset('intro_img.png'),1);
	img.x = 80;
	img.y = -40;
	img.scaleX = -0.85;
	img.scaleY = 0.85;
	this.panel.addChild(img);
    
    var imgWild = new AF.Sprite(game.ASSET_MANAGER.getAsset('start_feature.png'),8);
	imgWild.frame = 0;
	imgWild.x = 355+parseInt(WILD_MERGE_X);
	imgWild.y = 125+parseInt(WILD_MERGE_Y);
	imgWild.scaleX = imgWild.scaleY = 0.7;
	this.panel.addChild(imgWild);
    
	this.addTween(new AF.Tween(panel, "alpha").set(1000,1).set(7000).set(8000,0));
    
    this.updateFreeGamesWin = function(freeGamesWin)
	{
        txt2.text = freeGamesWin;
	};
	
    this.addAction(function()
	{
        freeGamesMovie.visible = true;
        freeGamesMovie.roamingWildStarted = true;
		this.visible = false;
        this.stop();
        freeGamesMovie.showHeads();
        game.startSpin();
	}, 7999);
}
IntroMovie.prototype = new AF.Movie();

function SummaryMovie(text1, text2, text3)
{
	AF.Movie.call(this,10100);
    
    var panel = new PopupPanel("frame.jpg");
	panel.x = 120;
	panel.y = 95;
	this.addChild(panel);
    
    this.panel = panel;
    var win;
    var winDelta;
	var winRoll;
    
    var txt1 = new AF.Text();
    var txt2 = new AF.Text();
    var valueTotalWin = new AF.Text();
    
    txt1.setMixedFormat(text1);
    txt2.setMixedFormat(text2);
    valueTotalWin.setMixedFormat(text3);
    
    this.panel.addChild(txt1);
    this.panel.addChild(txt2);
    this.panel.addChild(valueTotalWin);
    
    var img = new AF.Sprite(game.ASSET_MANAGER.getAsset('summary_img.png'),1);
	img.x = 605;
	img.y = 240;
	img.scaleX = img.scaleY = 0.85;
	this.panel.addChild(img);
    
	this.addTween(new AF.Tween(panel, "alpha").set(1000,1).set(9100).set(10100,0));
    
    this.addAction(function()
	{
		if(win<=0)
			this.moveTo(1950);
		else
            game.playSound('rollup');
	}, 999);
    
    this.addAction(function(){
		winRoll = Math.min(win, winRoll + winDelta);
		valueTotalWin.text = game.account.getCurrencyString(winRoll);
		if(winRoll<win)
		{
			this.moveTo(1000);
		}
		else
		{
			this.moveTo(1950);
		}
	}, 1060);
    
    this.addAction(function(){
		game.stopSound();
        game.playSound('summary');
	}, 2000);
	
    this.addAction(function()
	{
        freeGamesMovie.roamingWildStarted = false;
        inFeature = false;
        playFreeGames = false;
        game.freeGames.m_bInFreeGames = false;
        game.setBShowFreeSpinBg(false);
        backToSpin = true;
        IFG=0;
		this.visible = false;
		this.stop();
        game.messageBar.m_Text = TXT_SCROLL_PLAY_NOW;
	}, 10099);
    
    this.updateTotalWin= function(newTotalWin)
	{
        win = newTotalWin;
        winDelta = Math.max(37, win / 20);
		winRoll = 0.1;
        valueTotalWin.text = game.account.getCurrencyString(0);
	};
}
SummaryMovie.prototype = new AF.Movie();

function PopupPanel(image)
{
	AF.Movie.call(this);
	
	var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset(image),1);
	this.addChild(bg);
};
PopupPanel.prototype = new AF.Movie();