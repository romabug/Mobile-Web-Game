 function newsboyBG() {
     var dt = 100;
     var mytime = 18 * dt;

     AF.Movie.call(this, mytime);

     var box = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/Box.png'), 1);
     box.x = 1;
     box.y = 470;
     this.addChild(box);
     this.newsboyFG = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/Idle1.png'), 4);
     this.newsboyFG.x = -7;
     this.newsboyFG.y = 203;
     this.addChild(this.newsboyFG);
     var FGplay = "0,0,1,1,2,2,3,3,3,3,3,3,3,3,3,3,2,2,1,1,0,0";
     var BSplay = "0,0,1,1,2,2,3,3,3,3,3,3,3,3,3,3,2,2,1,1,0,0";
     this.addTween(new AF.SpriteTween(this.newsboyFG, FGplay, mytime));

     this.newsboy = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/Idle1.png'), 4);
     this.newsboy.x = -7;
     this.newsboy.y = 203;
     this.addChild(this.newsboy);
     this.addTween(new AF.SpriteTween(this.newsboy, BSplay, mytime));

  }
  newsboyBG.prototype = new AF.Movie();



 function WinJumpFG() {
      var dt = 125;
     AF.Movie.call(this, 33 * dt);
     this.visible = false;
     this.winjumppink = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/bigwin_jump_fg.jpg'), 10);
     this.winjumppink.y = 165;
     this.addChild(this.winjumppink);
     this.addTween(new AF.SpriteTween(this.winjumppink, "0-9", 10 * dt));

     this.addAction(function () {
         game.playSound('win2');
     }, 1);

     this.addAction(function () {
         this.visible = false;
         game.freeGames.m_RespinTimer = 5900;
     }, 10 * dt - 1);

     this.addAction(function () {
         if (!game.slotResult.numFreeGames == 0)
             game.startSpin();
         this.stop(0);
     }, 33 * dt - 1);

 }
 WinJumpFG.prototype = new AF.Movie();



 function ExtraExtra() {
     var dt = 135;
     AF.Movie.call(this, 30 * dt);

     this.addAction(function () {
         game.stopSound();
     }, 1);

     this.addAction(function () {
         game.playSound('RepinTrigger');
     }, 4 * dt);


     this.addAction(function () {
         respinlook.visible = true;
         respinlook.play(0);
     }, 9 * dt);


     this.addAction(function () {
         game.startSpin();
         this.visible = false;
         this.stop(0);

     }, 30 * dt - 1);

 }
 ExtraExtra.prototype = new AF.Movie();




 function RespinLook() {
     var dt = 135;
     AF.Movie.call(this, 14 * dt);
     this.visible = false;
     var lookleftright = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/begin_respin.jpg'), 14);
     lookleftright.y = 193;
     this.addChild(lookleftright);
     this.addTween(new AF.SpriteTween(lookleftright, "0-13", 14 * dt));

     this.addAction(function () {
         this.stop(0);
         this.visible = false;
     }, 14 * dt - 1);

 }
 RespinLook.prototype = new AF.Movie();




 function TouchNose() {
     var dt = 125;
     AF.Movie.call(this, 9 * dt);
     this.visible = false;
     var nose = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/Idle2_touchnose.jpg'), 9);
     nose.y = 203;
     this.addChild(nose);

     this.addTween(new AF.SpriteTween(nose, "0-8", 9 * dt));
     this.addAction(function () {

         this.stop(0);
         this.visible = false;
     }, 9 * dt - 1);

 }

 TouchNose.prototype = new AF.Movie();




 function WinTouchHat() {

     var dt = 75;
     AF.Movie.call(this, 10 * dt);
     this.visible = false;
     var hat = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/smallwin_base.jpg'), 10);
     hat.y = 202;
     this.addChild(hat);
     this.addTween(new AF.SpriteTween(hat, "0-9", 10 * dt));
	 
     this.addAction(function () {
         game.playSound('win1');
     }, dt);

     this.addAction(function () {
         this.stop(0);
         this.visible = false;
     }, 10 * dt - 1);
 }
 WinTouchHat.prototype = new AF.Movie();




 function WinTouchHatfg() {
     var dt = 75;
     AF.Movie.call(this, 10 * dt);
     this.visible = false;
     var hat = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/smallwin_fg.jpg'), 10);
     hat.y = 202;
     this.addChild(hat);
     this.addTween(new AF.SpriteTween(hat, "0-9", 10 * dt));

     this.addAction(function () {
         game.playSound('win1');
     }, dt);


     this.addAction(function () {
         this.stop(0);
         this.visible = false;

     }, 10 * dt - 1);
 }
 WinTouchHatfg.prototype = new AF.Movie();



 function WinLookRight() {

     var dt = 75;
     AF.Movie.call(this, 22 * dt);
     this.visible = false;
     var lookright = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/bigwin_basegame.jpg'), 11);
     lookright.y = 192;
     this.addChild(lookright);
     this.addTween(new AF.SpriteTween(lookright, "0,0,1,1,2,2,3,3,4,4,5,5,6,6,6,7,7,7,8,8,9,10", 22 * dt));
     var parthead = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/headpart.png'), 3);
     parthead.x = 163;
     parthead.y = 219;
     this.addChild(parthead);
     this.addTween(new AF.SpriteTween(parthead, "0,0,1,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ", 22 * dt));

     this.addAction(function () {
         game.playSound('win2');
     }, 2);


     this.addAction(function () {
         this.stop(0);
         this.visible = false;

     }, 22 * dt - 1);
 }
 WinLookRight.prototype = new AF.Movie();




 function Flying() {

     var dt = 27 
     AF.Movie.call(this, dt * 11);
     this.visible = false;

     this.flying = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/flying.png'), 1);
     this.flying.x = -Math.round(game.ASSET_MANAGER.getAsset('boy/flying.png').width / 2);
     this.flying.y = -Math.round(game.ASSET_MANAGER.getAsset('boy/flying.png').height / 2);

     var flyingwrap = new AF.Movie();
     flyingwrap.x = 91 + Math.round(game.ASSET_MANAGER.getAsset('boy/flying.png').width / 2);
     flyingwrap.y = 264 + Math.round(game.ASSET_MANAGER.getAsset('boy/flying.png').width / 2);

     flyingwrap.addChild(this.flying);
     this.addChild(flyingwrap);

     this.wildsymbol = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.jpg'), 24);
     this.wildsymbol.frame = 24;
     this.addChild(this.wildsymbol);

     this.setaim = function (x, y, f) {
         this.aimx = x;
         this.aimy = y;
         this.wildsymbol.x = x;
         this.wildsymbol.y = y;
         this.flytime = dt * 8; 

         if (this.aimx > 600)
             this.flytime = dt * 10 + 20;

         this.addTween(new AF.Tween(flyingwrap, "alpha", 0).set(dt * 2 - 15, 1).set(dt * 8 - 15, 1).set(dt * 8 - 11, 0));
         this.addTween(new AF.Tween(flyingwrap, "x", flyingwrap.x).set(this.flytime, this.aimx + 62));
         this.addTween(new AF.Tween(flyingwrap, "y", flyingwrap.y).set(this.flytime, this.aimy + 50));
         this.addTween(new AF.Tween(flyingwrap, "rotate").set(this.flytime, -240));
         this.addTween(new AF.Tween(flying, "scaleX", 1).set(dt, 1).set(dt * 2, 1.1).set(dt * 3, 1.2).set(dt * 8, 1.2).set(dt * 11, 1.3));
         this.addTween(new AF.Tween(flying, "scaleY", 1).set(dt, 1).set(dt * 2, 1.1).set(dt * 3, 1.2).set(dt * 8, 1.2).set(dt * 11, 1.3));

         this.addAction(function () {
             this.wildsymbol.visible = true;
         }, this.flytime);

     };

     this.addAction(function () {
         this.visible = true;
         this.wildsymbol.visible = false;

     }, 1);


     this.addAction(function () {
         this.stop(0);
     }, dt * 11 - 1);


 }
 Flying.prototype = new AF.Movie();




 function ThrowIntroPaper() {
     var dt = 85
     AF.Movie.call(this, dt * 15);
     this.visible = false;
     var boykick2 = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/ThrowAnim_free.jpg'), 11);

     boykick2.y = 197;
     this.addChild(boykick2);
     var playstyle = " 0,1,2,3,4,4,5,5,7,7,8,8,9,10 ";
     this.addTween(new AF.SpriteTween(boykick2, playstyle, dt * 15));


     this.addAction(function () {
         this.visible = false;
         this.stop(0);
     }, dt * 15 - 1);

 }
 ThrowIntroPaper.prototype = new AF.Movie();




 function Intro() {

     var timegap = 185;
     AF.Movie.call(this, 4900 + timegap);

     var bg1 = new AF.Sprite(game.ASSET_MANAGER.getAsset('NewspaperFrame.png'), 1);
     bg1.x = -Math.round(game.ASSET_MANAGER.getAsset('NewspaperFrame.png').width / 2);
     bg1.y = -Math.round(game.ASSET_MANAGER.getAsset('NewspaperFrame.png').height / 2);

     var bgwrap = new AF.Movie();
     bgwrap.x = Math.round(game.ASSET_MANAGER.getAsset('NewspaperFrame.png').width / 2);
     bgwrap.y = Math.round(game.ASSET_MANAGER.getAsset('NewspaperFrame.png').height / 2);

     bgwrap.addChild(bg1);
     this.addChild(bgwrap);

     var txt1 = new AF.Text();
     bgwrap.addChild(txt1);

     for (var prop in TXT_FREE_GAMES_INTRO_TITLE) {
         if (TXT_FREE_GAMES_INTRO_TITLE.hasOwnProperty(prop))
             txt1[prop] = TXT_FREE_GAMES_INTRO_TITLE[prop];
     }

     var won = new AF.Text();
     bgwrap.addChild(won);

     for (var prop in TXT_FREE_GAMES_INTRO_WON) {
         if (TXT_FREE_GAMES_INTRO_WON.hasOwnProperty(prop))
             won[prop] = TXT_FREE_GAMES_INTRO_WON[prop];
     }

     var descr1 = new AF.Text();
     bgwrap.addChild(descr1);

     for (var prop in TXT_FREE_GAMES_INTRO_DESCR1) {
         if (TXT_FREE_GAMES_INTRO_DESCR1.hasOwnProperty(prop))
             descr1[prop] = TXT_FREE_GAMES_INTRO_DESCR1[prop];
     }

     var descr2 = new AF.Text();
     bgwrap.addChild(descr2);

     for (var prop in TXT_FREE_GAMES_INTRO_DESCR2) {
         if (TXT_FREE_GAMES_INTRO_DESCR2.hasOwnProperty(prop))
             descr2[prop] = TXT_FREE_GAMES_INTRO_DESCR2[prop];
     }




     this.addTween(new AF.Tween(bgwrap, "rotate", 0).set(499 + timegap, 180).set(500 + timegap, 180).set(1000 + timegap, 0).set(4400 + timegap, 0).set(4900 + timegap, 0));

     this.addTween(new AF.Tween(bgwrap, "x", 49).set(500 + timegap, 150).set(1000 + timegap, 536, AF.Tween.POWER, 1.8).set(4900 + timegap, 536));
     this.addTween(new AF.Tween(bgwrap, "y", 347).set(500 + timegap, 347).set(1000 + timegap, 300, AF.Tween.POWER, 1.8).set(4900 + timegap, 300));

     this.addTween(new AF.Tween(bgwrap, "scaleX", 0.5).set(500 + timegap, 0.5).set(1000 + timegap, 1.4, AF.Tween.POWER, 1.35).set(1020 + timegap, 1.25).set(1100 + timegap, 1.15).set(1180 + timegap, 1.4).set(4900 + timegap, 1.4));
     this.addTween(new AF.Tween(bgwrap, "scaleY", 0.5).set(500 + timegap, 0.5).set(1000 + timegap, 1.4, AF.Tween.POWER, 1.35).set(1020 + timegap, 1.25).set(1100 + timegap, 1.25).set(1180 + timegap, 1.4).set(4900 + timegap, 1.4));

     this.addTween(new AF.Tween(bgwrap, "alpha", 0).set(480 + timegap, 0).set(490 + timegap, 0.1).set(500 + timegap, 1).set(1000 + timegap, 1).set(4300 + timegap, 1).set(4900 + timegap, 0));


     this.init = function () {
         this.visible = true;
         this.play(0);
         won.text = sprintf(TXT_FREE_GAMES_INTRO_WON.text, game.slotResult.freeGamesWon);
     };

     this.addAction(function () {
         newsboybg.newsboy.visible = false;

     }, 1);


     this.addAction(function () {
         throwintropaper.visible = true;
         throwintropaper.play(0);

     }, 1 + timegap - 184);


     this.addAction(function () {
         Kickoff.boykick.visible = false;

     }, 500);


     this.addAction(function () {
         this.visible = false;
         this.stop();

         boythrowit.visible = true;
         rollingscatters.visible = true;
         game.startSpin();

     }, 4900 + timegap - 1);
 }
 Intro.prototype = new AF.Movie();




 function Summary() {
     AF.Movie.call(this, 5900);

     var posx = 187,
         posy = 78;
     var bg = new AF.Sprite(game.ASSET_MANAGER.getAsset('frame.jpg'), 1);
     bg.x = posx;
     bg.y = posy;
     this.addChild(bg);

     var bg2 = new AF.Sprite(game.ASSET_MANAGER.getAsset('frame.jpg'), 1);
     bg2.x = posx + 357 * 2;  
     bg2.y = posy;

     this.addChild(bg2);

     var txt1 = new AF.Text();
     this.addChild(txt1);
     for (var prop in TXT_SUMMARY_CONGRATULATIONS) {
         if (TXT_SUMMARY_CONGRATULATIONS.hasOwnProperty(prop))
             txt1[prop] = TXT_SUMMARY_CONGRATULATIONS[prop];
     }

     var txt2 = new AF.Text();
     this.addChild(txt2);
     for (var prop in TXT_SUMMARY_TOTAL_WIN) {
         if (TXT_SUMMARY_TOTAL_WIN.hasOwnProperty(prop))
             txt2[prop] = TXT_SUMMARY_TOTAL_WIN[prop];
     }

     prize = new AF.Text();
     this.addChild(prize);
     for (var prop in TXT_SUMMARY_VAL) {
         if (TXT_SUMMARY_VAL.hasOwnProperty(prop))
             prize[prop] = TXT_SUMMARY_VAL[prop];
     }


     this.addTween(new AF.Tween(bg2, "scaleX", -1).set(5900, -1));
     this.addTween(new AF.Tween(bg, "alpha", 0).set(300, 0).set(800, 1).set(5400, 1).set(5880, 0));
     this.addTween(new AF.Tween(bg2, "alpha", 0).set(300, 0).set(800, 1).set(5400, 1).set(5880, 0));
     this.addTween(new AF.Tween(txt1, "alpha", 0).set(500, 0).set(1000, 1).set(5200, 1).set(5700, 0));
     this.addTween(new AF.Tween(txt2, "alpha", 0).set(500, 0).set(1000, 1).set(5200, 1).set(5700, 0));
     this.addTween(new AF.Tween(prize, "alpha", 0).set(1, 0).set(1000, 0).set(1001, 1).set(5200, 1).set(5700, 0));

     var currVolume;
     var win;
     var winDelta;
     var winRoll;
     this.init = function () {
         this.visible = true;
         this.play(0);
         currVolume = 0.9;
         win = game.slotResult.winAmount;
         winDelta = Math.max(37, win / 20);
         winRoll = 0;
         prize.text = game.account.getCurrencyString(winRoll);
     };


     this.addAction(function () {
         boythrowit.visible = false;
         rollingscatters.visible = false;

     }, 500);




     this.addAction(function () {
         if (win <= 0) {
             this.moveTo(3000);
         } else {
             game.playSound('winroll');
         }
     }, 999);


     this.addAction(function () {
         winRoll = Math.min(win, winRoll + winDelta);
         prize.text = game.account.getCurrencyString(winRoll);
         if (winRoll < win) {
             this.moveTo(1000);
         } else {
             this.moveTo(3000);
         }
     }, 1060);
	 

     this.addAction(function () {
	 	prize.text = game.account.getCurrencyString(win); 
          game.playSound('win2');
     }, 3000);
	 
	 
  this.addAction(function () {
	 	prize.text = game.account.getCurrencyString(win); 
      }, 3005);


     this.jumptoend = function () {
         this.moveTo(5900 - 1);

     };


     this.addAction(function () {
         this.visible = false;
         this.stop();
         game.freeGames.m_bInFreeGames = false;
         autoDelayAfterFeature = false;
         newsboybg.newsboy.visible = true;
         Kickoff.boykick.visible = true;
         boythrowit.visible = true;
         rollingscatters.visible = true;

     }, 5900 - 1);
 }
 Summary.prototype = new AF.Movie();


 function Respintitle() {
     var dt = 75;
     AF.Movie.call(this, 35 * dt);
     this.visible = false;

     var title1GrowWrap = new AF.Movie();

     title1GrowWrap.x = Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').width / 2);
     title1GrowWrap.y = Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').height / 2);

     var title1Grow = new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle01.png'), 1);
     title1Grow.x = -Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').width / 2);
     title1Grow.y = -Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').height / 2);

     var title2Grow = new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle02.png'), 1);
     title2Grow.x = -Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').width / 2) + game.ASSET_MANAGER.getAsset('gametitle01.png').width;
     title2Grow.y = -Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').height / 2);

     title1GrowWrap.addChild(title1Grow);
     title1GrowWrap.addChild(title2Grow);
     this.addChild(title1GrowWrap);

     var respinGrowWrap = new AF.Movie();
     respinGrowWrap.x = 90 + Math.round(game.ASSET_MANAGER.getAsset('Respin.png').width / 2);
     respinGrowWrap.y = 22 + Math.round(game.ASSET_MANAGER.getAsset('Respin.png').height / 2);

     var respinGrow = new AF.Sprite(game.ASSET_MANAGER.getAsset('Respin.png'), 1);
     respinGrow.x = -Math.round(game.ASSET_MANAGER.getAsset('Respin.png').width / 2);
     respinGrow.y = -Math.round(game.ASSET_MANAGER.getAsset('Respin.png').height / 2);

     respinGrowWrap.addChild(respinGrow);
     this.addChild(respinGrowWrap);

     this.addTween(new AF.Tween(title1GrowWrap, "alpha", 1).set(5 * dt, 0).set(25 * dt, 0).set(26 * dt, 0.1).set(30 * dt, 1));
     this.addTween(new AF.Tween(title1GrowWrap, "scaleY", 1).set(5 * dt, 0).set(25 * dt, 0).set(26 * dt, 0.1).set(30 * dt, 1));

     this.addTween(new AF.Tween(respinGrowWrap, "alpha", 0).set(dt * 4, 0, AF.Tween.JUMP).set(dt * 5, 0.5).set(dt * 7, 0.8).set(dt * 10, 1).set(dt * 13, 1).set(dt * 18, 1).set(dt * 21, 1).set(dt * 24, 1).set(dt * 27, 0));
     this.addTween(new AF.Tween(respinGrowWrap, "scaleX", 1).set(dt * 5, 0.58, AF.Tween.JUMP).set(dt * 7, 1.7).set(dt * 10, 0.7).set(dt * 13, 1).set(dt * 18, 1).set(dt * 21, 0.7).set(dt * 24, 1.7).set(dt * 27, 0.15));
     this.addTween(new AF.Tween(respinGrowWrap, "scaleY", 1).set(dt * 5, 0.78, AF.Tween.JUMP).set(dt * 7, 0.7).set(dt * 10, 1.7).set(dt * 13, 1).set(dt * 18, 1).set(dt * 21, 1.77).set(dt * 24, 0.07).set(dt * 27, 1.12));

     this.addAction(function () {
         title.visible = false;
         this.visible = true;
     }, 1);


     this.addAction(function () {
         this.stop();
     }, 14 * dt);


     this.gametitle = function () {
         this.visible = true;
         this.play(18 * dt);
     };


     this.addAction(function () {
         this.stop(0);
         this.visible = false;
         title.visible = true;

     }, 35 * dt - 1);

 }
 Respintitle.prototype = new AF.Movie();




 function Title() {
     AF.Movie.call(this);
     var tm = new AF.Sprite(game.ASSET_MANAGER.getAsset('tm.png'), 1);
     tm.x = 196 + 156;
     tm.y = 55;
     this.addChild(tm);

     var title1 = new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle01.png'), 1);
     this.addChild(title1);

     var title2 = new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle02.png'), 1);
     title2.x = game.ASSET_MANAGER.getAsset('gametitle01.png').width;
     this.addChild(title2);

 }
 Title.prototype = new AF.Movie();



 function TitleGrow() {
     var dt = 200;
     AF.Movie.call(this, dt * 6);

     var tm = new AF.Sprite(game.ASSET_MANAGER.getAsset('tm.png'), 1);
     tm.x = 196 + 156;
     tm.y = 55;
     this.addChild(tm);

     var title1 = new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle01.png'), 1);
     this.addChild(title1);

     var title1GrowWrap = new AF.Movie();
     title1GrowWrap.x = Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').width / 2);
     title1GrowWrap.y = Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').height / 2);

     var title1Grow = new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle01.png'), 1);
     title1Grow.x = -Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').width / 2);
     title1Grow.y = -Math.round(game.ASSET_MANAGER.getAsset('gametitle01.png').height / 2);
     title1GrowWrap.addChild(title1Grow);

     var title2 = new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle02.png'), 1);
     title2.x = game.ASSET_MANAGER.getAsset('gametitle01.png').width;
     this.addChild(title2);

     var title2GrowWrap = new AF.Movie();
     title2GrowWrap.x = Math.round(game.ASSET_MANAGER.getAsset('gametitle02.png').width / 2) + game.ASSET_MANAGER.getAsset('gametitle01.png').width;
     title2GrowWrap.y = Math.round(game.ASSET_MANAGER.getAsset('gametitle02.png').height / 2);

     var title2Grow = new AF.Sprite(game.ASSET_MANAGER.getAsset('gametitle02.png'), 1);
     title2Grow.x = -Math.round(game.ASSET_MANAGER.getAsset('gametitle02.png').width / 2);
     title2Grow.y = -Math.round(game.ASSET_MANAGER.getAsset('gametitle02.png').height / 2);
     title2GrowWrap.addChild(title2Grow);

     this.addChild(title1GrowWrap);
     this.addChild(title2GrowWrap);

     this.addTween(new AF.Tween(title1, "alpha", 1).set(1, 0, AF.Tween.JUMP).set(dt * 2, 1, AF.Tween.JUMP));
     this.addTween(new AF.Tween(title1GrowWrap, "alpha", 0).set(1, 1, AF.Tween.JUMP).set(dt * 2, 0, AF.Tween.JUMP));
     this.addTween(new AF.Tween(title1GrowWrap, "scaleX", 1).set(dt, 1.5).set(dt * 2, 1));
     this.addTween(new AF.Tween(title1GrowWrap, "scaleY", 1).set(dt, 1.5).set(dt * 2, 1));
     this.addTween(new AF.Tween(title2, "alpha", 1).set(dt * 2, 0, AF.Tween.JUMP).set(dt * 4, 1, AF.Tween.JUMP));
     this.addTween(new AF.Tween(title2GrowWrap, "alpha", 0).set(dt * 2, 1, AF.Tween.JUMP).set(dt * 4, 0, AF.Tween.JUMP));
     this.addTween(new AF.Tween(title2GrowWrap, "scaleX", 1).set(dt * 2, 1, AF.Tween.JUMP).set(dt * 3, 1.5).set(dt * 4, 1));
     this.addTween(new AF.Tween(title2GrowWrap, "scaleY", 1).set(dt * 2, 1, AF.Tween.JUMP).set(dt * 3, 1.5).set(dt * 4, 1));

     this.init = function () {
         this.visible = true;
         this.play(0);
         title.visible = false;
     }

     this.addAction(function () {
         title.visible = true;
         this.visible = false;
         this.stop(0);
     }, dt * 6 - 1);
 }
 TitleGrow.prototype = new AF.Movie();



 function RollingPaper() {
     var dt = 100;
     AF.Movie.call(this, 11 * dt)

     this.trigger = false;
     var scatter = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter.jpg'), 14);
     this.addChild(scatter);
     this.addTween(new AF.SpriteTween(scatter, "0-13", dt * 11));

     var scattertop = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter_top.png'), 14);
     scattertop.y = -68;

     this.addChild(scattertop);
     this.addTween(new AF.SpriteTween(scattertop, "0-13", dt * 11));

     var scatterright = new AF.Sprite(game.ASSET_MANAGER.getAsset('scatter_right.png'), 14);
     scatterright.x = 137;
     this.addChild(scatterright);

     this.addTween(new AF.SpriteTween(scatterright, "0-13", dt * 11));


 }
 RollingPaper.prototype = new AF.Movie();




 function PaperDance() {
     var dt = 100;
     AF.Movie.call(this, dt * 14);

     var frs = "0-12,12";

     var bgSprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('sym00_layer1.jpg'), 13);
     this.addChild(bgSprite);
     this.addTween(new AF.SpriteTween(bgSprite, frs, dt * 14));

     var bgSprite_top = new AF.Sprite(game.ASSET_MANAGER.getAsset('Sym00_Top.png'), 13);
     bgSprite_top.x = -24;
     bgSprite_top.y = -30;
     this.addChild(bgSprite_top);

     this.addTween(new AF.SpriteTween(bgSprite_top, frs, dt * 14));

     var bgSprite_left = new AF.Sprite(game.ASSET_MANAGER.getAsset('Sym00_Left.png'), 13);
     bgSprite_left.x = -24;
     this.addChild(bgSprite_left);
     this.addTween(new AF.SpriteTween(bgSprite_left, frs, dt * 14));


 }
 PaperDance.prototype = new AF.Movie();




 function GrowScatter()

 {
     growSymbols = [];
     for (var column = 0; column < 5; column++) {
         growSymbols[column] = new GrowSymbol();
         growSymbols[column].x = 187 + column * (game.layout.symbolWidth + game.layout.reelGap);
         growSymbols[column].visible = false;
         this.addChild(growSymbols[column]);
     };

 }
 GrowScatter.prototype = new AF.Movie();



 function GrowSymbol() {

     var t = 75;
     AF.Movie.call(this, 6 * t);

     var sprite = new AF.Sprite(game.ASSET_MANAGER.getAsset('symbols.jpg'), 24);
     sprite.frame = 11;
     this.addChild(sprite);

     this.addTween(new AF.Tween(sprite, "scaleX", 0).set(0, 1).set(2 * t, 1.5).set(5 * t, 1));
     this.addTween(new AF.Tween(sprite, "scaleY", 0).set(0, 1).set(2 * t, 1.5).set(5 * t, 1));
     this.addTween(new AF.Tween(sprite, "x", 0).set(0, 0).set(2 * t, -35).set(5 * t, 0));
     this.addTween(new AF.Tween(sprite, "y", 0).set(0, 0).set(2 * t, -35).set(5 * t, 0));
     this.addTween(new AF.Tween(sprite, "alpha", 0).set(1, 1).set(2 * t, 1).set(3 * t, 0));

     this.addAction(function () {
         this.visible = false;

     }, 4 * t);


 }
 GrowSymbol.prototype = new AF.Movie();



 function NoseTime() {

     this.dt = setInterval(function () {
         window.subdt = setTimeout(function () {

             if (!game.freeGames.m_bInFreeGames || !(!game.freeGames.m_bInFreeGames && game.slotResult.numFreeGames == 1 && featureID == 0)) {

                 if (touchnose) {
                     touchnose.visible = true;
                     touchnose.play(0);
                 }
             };

         }, 13000);
     }, 13000);

 }




 function bigWinTitle() {
     var dt = 80;
     AF.Movie.call(this, 50 * dt);

     var bWinWrap = new AF.Movie();
     bWinWrap.x = Math.round(game.ASSET_MANAGER.getAsset('BigWin.png').width / 2) + 170;
     bWinWrap.y = Math.round(game.ASSET_MANAGER.getAsset('BigWin.png').height / 2);

     var bWinGrow = new AF.Sprite(game.ASSET_MANAGER.getAsset('BigWin.png'), 1);
     bWinGrow.x = -Math.round(game.ASSET_MANAGER.getAsset('BigWin.png').width / 2);
     bWinGrow.y = -Math.round(game.ASSET_MANAGER.getAsset('BigWin.png').height / 2);
     bWinWrap.addChild(bWinGrow);

     this.addChild(bWinWrap);

     this.addTween(new AF.Tween(bWinWrap, "y", 0)
         .set(dt * 5, -300)
         .set(dt * 25, -300)
         .set(dt * 30, 0));



     this.addTween(new AF.Tween(bWinWrap, "scaleX", 0).set(5 * dt, 1.3).set(7 * dt, 1.1).set(9 * dt, 1).set(11 * dt, 1.1).set(13 * dt, 1.3).set(15 * dt, 1.1).set(17 * dt, 1).set(19 * dt, 1.1).set(21 * dt, 1.3).set(dt * 30, 0));

     this.addTween(new AF.Tween(bWinWrap, "scaleY", 0).set(5 * dt, 1.3).set(7 * dt, 1.1).set(9 * dt, 1).set(11 * dt, 1.1).set(13 * dt, 1.3).set(15 * dt, 1.1).set(17 * dt, 1).set(19 * dt, 1.1).set(21 * dt, 1.3).set(dt * 30, 0));


     this.addAction(function () {
         gameConfig.drawPaylines = false;
     }, 1);


     this.init = function () {
         this.visible = true;
         this.play(0);
     }

     this.addAction(function () {
         gameConfig.drawPaylines = true;
     }, dt * 15);


     this.addAction(function () {
         this.visible = false;
         this.stop(0);
     }, dt * 50 - 1);
 }
 bigWinTitle.prototype = new AF.Movie();


 
 function RandomSprayAnim() {
     this.sprayCoinArray = null;
     this.animconfig = new Array(6);
     this.setAnimConfig = function () {
         var moveStep = 8;
         for (var i = 0; i < this.animconfig.length; i++) {
             var moveGap = 11;
             var yy = 330;
             this.animconfig[i] = new Array(17);
             for (var j = 0; j < this.animconfig[i].length; j++) {
                 if (j >= 12) {
                     this.animconfig[i][j] = {
                         t: j % 4,

                         s: 1 - (i / 10),
                         a: ((this.animconfig[i].length - 1 - j) * 0.3),
                         x: 0,
                         y: yy
                     };
                 } else {
                     this.animconfig[i][j] = {
                         t: j % 4,
                         s: 1 - (i / 10),
                         a: 1,
                         x: 0,
                         y: yy
                     };
                 }
                 moveGap--;
                 yy = yy - moveStep * moveGap;
                 if (moveGap == 1) {
                     moveGap--;
                 }
             }
             moveStep--;
         }
     };

     this.init = function () {
         this.sprayCoinArray = new Array(14);
         var reelWidth = game.layout.symbolWidth * 5 + game.layout.reelGap * 4;

         for (var i = 0; i < this.sprayCoinArray.length; i++) {
             this.sprayCoinArray[i] = new ngImage2(game.imageSprayAnim);

             var sprites = [];
             var anims = [];

             for (var k = 0; k < 4; k++) {
                 sprites.push({
                     x: 89 * k,
                     y: 0,
                     w: 89,
                     h: 86
                 });
                 anims.push({
                     t: k
                 });
             }

             this.sprayCoinArray[i].setAnimConfig(sprites, this.animconfig[Math.floor(Math.random() * this.animconfig.length)]);

             this.sprayCoinArray[i].setPosition(
	   game.layout.REELS.x + (reelWidth / this.sprayCoinArray.length) * i + Math.floor(Math.random() * (reelWidth / this.sprayCoinArray.length)) - 60,
	   game.layout.REELS.y + 120 + Math.floor(Math.random() * 30));
         }
         return this;
     };

     this.update = function (timeDelta) {
         if (this.sprayCoinArray != null) {
             for (var i = 0; i < this.sprayCoinArray.length; i++) {
                 if (this.sprayCoinArray[i].animRunning) {
                     this.sprayCoinArray[i].update(timeDelta);
                 }
             }
         }
     };
     this.draw = function (ctx) {
         if (this.sprayCoinArray != null) {
             for (var i = 0; i < this.sprayCoinArray.length; i++) {
                 if (this.sprayCoinArray[i].animRunning) {
                     this.sprayCoinArray[i].draw(ctx);
                 }
             }
         }
     };
     this.sprayStartAnim = function (spray) {
         spray.startAnim(false, 0);
     };

     this.startAnim = function () {
         if (this.sprayCoinArray != null) {
             for (var i = 0; i < this.sprayCoinArray.length; i++) {
                 var sp = this.sprayCoinArray[i];
                 setTimeout(this.sprayStartAnim, Math.floor(Math.random() * 1000), sp);
             }
         }
     }
 }



  function BoyThrowIt()  
     {
         AF.Movie.call(this, 1000);

         var self = this;

         var symbols = [];
         for (var i = 0; i < 5; i++) {
             symbols[i] = [];
             for (var j = 0; j < 4; j++) {
                 symbols[i][j] = new PaperDance();  
                 symbols[i][j].x = layout.REELS.x + (layout.reelGap + layout.symbolWidth) * i;
                 symbols[i][j].y = layout.REELS.y + layout.symbolHeight * j;
                 symbols[i][j].visible = false;
                 this.addChild(symbols[i][j]);
              }
         }


         Kickoff.splash = function () {
             self.stickyHoneySplash.call(self)
         };


         var box = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/Box.png'), 1);
         box.x = 1;
         box.y = 470;
         this.addChild(box);
 
         this.addAction(function () {
              Kickoff.visible = true;
          }, 1);

         this.addAction(function () {
             Kickoff.play(0);
         }, 10);


         this.addAction(function () {
             if (Kickoff.honeys > 0)
                 this.moveTo(401);
 
         }, 600);


         this.addAction(function () {
             Kickoff.visible = false;
             this.stop();
             this.isHoneyThrown = true;
         }, 1000 - 1);

          var splashes = [];
          this.setThrowHoney = function (str) {

              this.isHoneyThrown = false;
             Kickoff.honeys = 0;
             for (var i = 0, r = str.split("|"); i < r.length; i++) {
                 var pair = r[i].split(";");
                 pair = pair.map(Number);
                 symbols[pair[0]][pair[1]].visible = false;
                 symbols[pair[0]][pair[1]].sticky = false;
                 splashes.push(pair);
                 Kickoff.honeys++;


                 switch (Kickoff.honeys) {

                 case 1:

                     flying[i] = new Flying();
                     AF.Movie.root.addChild(flying[i]);
                     flying[i].setaim(symbols[pair[0]][pair[1]].x, symbols[pair[0]][pair[1]].y);

                     break;

                 case 2:
                     flying[i] = new Flying();
                     AF.Movie.root.addChild(flying[i]);
                     flying[i].setaim(symbols[pair[0]][pair[1]].x, symbols[pair[0]][pair[1]].y);


                     break;

                 case 3:
                     flying[i] = new Flying();
                     AF.Movie.root.addChild(flying[i]);
                     flying[i].setaim(symbols[pair[0]][pair[1]].x, symbols[pair[0]][pair[1]].y);

                     break;

                 case 4:
                     flying[i] = new Flying();
                     AF.Movie.root.addChild(flying[i]);
                     flying[i].setaim(symbols[pair[0]][pair[1]].x, symbols[pair[0]][pair[1]].y);
                     break;

                 case 5:
                     flying[i] = new Flying();
                     AF.Movie.root.addChild(flying[i]);
                     flying[i].setaim(symbols[pair[0]][pair[1]].x, symbols[pair[0]][pair[1]].y);
                     break;

                 }

             }
         };


          this.stickyHoneySplash = function () {
             var sym = splashes.shift();

             symbols[sym[0]][sym[1]].visible = true;
             symbols[sym[0]][sym[1]].sticky = true;
          }


          this.setStickyHoney = function (str) {
             console.log("setStickyHoney=", str);
             for (var i = 0, r = str.split("|"); i < r.length; i++) {
                 var pair = r[i].split(";");
                 pair = pair.map(Number);
                  symbols[pair[0]][pair[1]].sticky = true;
             }
         };


 
         this.setWinSymbols = function (WS) {  
              var lines = WS.split("|");
              for (var j = 0; j < lines.length - 1; j++) {
                 var sym = lines[j].split(";");

                 sym = sym.map(Number);
                  if (sym[0] < 0)
                     continue;

                 for (var i = 0; i < 5; i++)
                      if (sym[i + 2] >= 0)
                          symbols[i][sym[i + 2]].iswin = true;

             }
         };


         this.animateWins = function () {
             for (var i = 0; i < 5; i++) {
                 for (var j = 0; j < 4; j++) {
                     if (game.reelMan.reels[i].slots[j + 1].currentSymbol == 0)
                         symbols[i][j].visible = true;
 
                     if (symbols[i][j].visible) {
                          if (!game.freeGames.m_bInFreeGames)
                             game.reelMan.reels[i].slots[j + 1].setSymbol(0);
                      }


                     if (symbols[i][j].iswin && symbols[i][j].visible) {
                         symbols[i][j].play(0);
 
                     }
                 }
             }
         };


         this.spinStarted = function (recovery) {
             for (var i = 0; i < 5; i++) {
                 for (var j = 0; j < 4; j++)  
                 {
                     symbols[i][j].stop(0);

                     if (!recovery)
                         symbols[i][j].iswin = false;
 
                     if (game.freeGames.m_bInFreeGames && symbols[i][j].sticky) {
                         symbols[i][j].visible = true;
                     } else {
                         symbols[i][j].visible = false;
                         symbols[i][j].sticky = false;
                     }
                 }
             }
         };

 

         this.throwHoney = function () {
              if (splashes.length) {
                 this.visible = true;
                 this.play(0);
             }
         };

         this.isHoneyThrown = true;
     }
 BoyThrowIt.prototype = new AF.Movie();




 function Kickoff() {
     var dt = 74  
     AF.Movie.call(this, dt * 18);

     this.honeys = 0;
     this.flyflag = 0;
     this.wildflag = 0;

     this.splash = function () {};
      var frms = " 0-10";

     this.boykickFG = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/ThrowAnim_free.jpg'), 11);
     this.boykickFG.y = 197;
     this.addChild(this.boykickFG);
     this.addTween(new AF.SpriteTween(this.boykickFG, frms, dt * 14));


     this.boykick = new AF.Sprite(game.ASSET_MANAGER.getAsset('boy/ThrowAnim.jpg'), 11);
     this.boykick.y = 197;
     this.addChild(this.boykick);
     this.addTween(new AF.SpriteTween(this.boykick, frms, dt * 14));

     this.addAction(function () {
          if (this.honeys > 0)
             this.wildflag = this.honeys;

     }, 2);


     this.addAction(function () {
 
         switch (this.honeys) {

         case 0:
              break;

         case 1:
              switch (this.flyflag) {

             case 0:
                 flying[0].play(0);
                 game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));
                 this.honeys = this.honeys - 1;
                  break;

              case 1:

                 flying[1].play(0);
                  game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));
                 this.honeys = this.honeys - 1;
                 this.flyflag = 0;
                  break;

              case 12:
                 flying[1].play(0);
                  setTimeout(function () {
                     flying[2].play(0);
                     game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));
                 }, 68);

                 this.honeys = this.honeys - 1;
                 this.flyflag = 0;
                  break;
 
             case 23:
                 flying[2].play(0);
                  setTimeout(function () {
                     flying[3].play(0);
                     game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));
                 }, 68);

                 this.honeys = this.honeys - 1;
                 this.flyflag = 0;
                  break;

              case 234:

                 flying[2].play(0);

                 setTimeout(function () {
                     flying[3].play(0);
                     game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));
                 }, 58);

                 setTimeout(function () {
                     flying[4].play(0);
                     game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));
                 }, 78);


                 this.honeys = this.honeys - 1;
                 this.flyflag = 0;
                  break;
              }

             break;


          case 2:
 
             flying[0].play(0);
             game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));
             this.honeys = this.honeys - 1;
             this.flyflag = 1;

              break;

         case 3:

             this.flyflag = 12;
             flying[0].play(0);
             game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));
             this.honeys = this.honeys - 2;
 
             break;

         case 4:
             this.flyflag = 23;
             flying[0].play(0);

             setTimeout(function () {
                 flying[1].play(0);
                 game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));

             }, 68);
 
             this.honeys = this.honeys - 3;
 
             break;

         case 5:

             this.flyflag = 234;

             flying[0].play(0);

             setTimeout(function () {
                 flying[1].play(0);
                 game.playSound('ThrowPaperMack' + (Math.floor(Math.random() * 3)));

             }, 58);

             this.honeys = this.honeys - 4;
              break;

         }
      }, dt * 9);
 

     this.addAction(function () {

         if (this.honeys > 0)
             this.moveTo(2 * dt);
      }, dt * 13 - 8);

 
     this.addAction(function () {
         this.visible = false;
         this.stop(0);

         for (i = 0; i < 4; i++) {
             flying[i].visible = false;
          }
 
         for (i = 0; i < this.wildflag; i++) {
             this.splash();
         }

          this.wildflag = 0;

     }, dt * 15 - 1);

 }

 Kickoff.prototype = new AF.Movie();

 

 function getScattersCountBeforeReel(reel) {
     var result = 0;
      for (var i = 0; i < reel; ++i) {

         if (FlagscatterReelsR) {
             if (scatterReelsR[i] >= 0) {
                 result++;
             }

         } else {

             if (scatterReels[i] >= 0) {
                 result++;
             }
          }
      }
     return result;
 }




 function getscatterReels(result) {
     if (game.reelMan.reels == undefined) return;

     for (i = 0; i < 5; i++) {
         scatterReelsR[i] = -1;
          for (var row = 0; row < 4; ++row) {

             var rs = game.reelMan.reels[i].reelStrip;
             var sp = parseInt(result.stops[i]) + row - 1;

             if (sp > rs.length) sp -= rs.length;
             if (sp < 0) sp += rs.length;

             var sym = parseInt(rs[sp]);
              var isrespin = (game.freeGames.m_bInFreeGames && featureID == 0) || (game.freeGames.m_bInFreeGames && featureID == 1 && (freeGamesTriggered == 8 || freeGamesTriggered == 12 || (totalfreegame == 21 && freeGamesTriggered == 20))) ? true : false;

             if ((sym == 11 || sym == 23) && (!game.freeGames.m_bInFreeGames || isrespin)) {
                 totalScatters++;
                 scatterReelsR[i] = row;
  
                 break;
             }
         }
     }
 
 };
 
 
 
 function TimerBox()
{
 var dt = game.WIN_METER_DISPLAY_TIME;
 AF.Movie.call(this, dt + 1);  
 
this.summary = function () {
  this.play(0);	
	};

 this.addAction(function(){ 
  summary.init(); 
  this.stop(0);
     },  dt);   
   
};
 TimerBox.prototype = new AF.Movie();