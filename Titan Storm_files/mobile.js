// JavaScript Document

var userAgent 		= navigator.userAgent.toLowerCase();
var androidversion  = 0;
			
if( userAgent.indexOf("android") >= 0 )
{
	androidversion = parseFloat(userAgent.slice(userAgent.indexOf("android")+8)); 
}			
			
var ios = (/iphone|ipad|ipod/i.test(userAgent));
var android = (/Android/i.test(userAgent));
var chrome	= (/chrome/i.test(userAgent));
var iphone = (/iphone/i.test(userAgent));
var ios_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent) && !window.navigator.standalone;
var iphone_uiwebview = (/(iphone).*AppleWebKit(?!.*Safari)/i.test(userAgent)) && !window.navigator.standalone;
								 
var iosVer = parseFloat(
	('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
	.replace('undefined', '3_2').replace('_', '.').replace('_', '')
	) || -1;
			
var ios7URLAppear = true;


var gameiframe = null;
var viewportmeta = document.querySelector('meta[name="viewport"]');
if (navigator.userAgent.match(/iPhone/i)|| (android && chrome)) {
	if (viewportmeta /*&& !iphone_uiwebview*/) {
		viewportmeta.content = 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=no';
	}
}

var iframeHeightOffset = 0;  //Iframe height offset

// Helper function to parse the URL parameters.
function gup( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
	return "";
  else
	return results[1];
};


// ---------- IOS8 Specific HACK to get around touch not working inside an iFrame. ----------------------------------				
function processTouchStartIOS8(e) {
	if(!gameiframe.contentWindow.game.showRules) {
		gameiframe.contentWindow.game.processClick({x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY},e);
	}
}
 
function processTouchEndIOS8(e) {
	if(!gameiframe.contentWindow.game.showRules) {
		gameiframe.contentWindow.game.processClickRelease({x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY},e);
		gameiframe.contentWindow.game.buttonsUp();
	}
}

function processTouchMoveIOS8(e) {
	$(gameiframe.contentWindow).scrollTop(200); //({x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY},e); //TODO: Not working yet.
	if(!gameiframe.contentWindow.game.showRules && gameiframe.contentWindow.game.processMouseOver !== "undefined") {
		gameiframe.contentWindow.game.processMouseOver({x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY},e);
	}
}
// ---------- IOS8 Specific HACK to get around touch not working inside an iFrame. ----------------------------------				



//This function is called every time the orientation changes or the window is re-sized.
function orientationChange()
{
	setiFrameSize();
	if (ios) {
		iosOrientationChange();
	}
	else {
		androidOrientationChange();
	}
}

//Set the size of the iFrame to the screen size
function setiFrameSize()
{
	if(ios)
	{
		var fullscreen = window.navigator.standalone;
		var iosHeight = 0;
		if (iphone) {
			if (document.documentElement.clientWidth <= 568) {
				
				gameiframe.width = document.documentElement.clientWidth * 2; //screen.width;
				if (!fullscreen && document.documentElement.clientHeight != 320) {
					if (iosVer >= 7) {
						iosHeight = document.documentElement.clientHeight*2;
					} else {
						iosHeight = document.documentElement.clientHeight*2 + 120;
					}
				} 
				else {
					iosHeight = document.documentElement.clientHeight*2; 
				}
			} else {
				gameiframe.width = document.documentElement.clientWidth; //screen.width;
				if (!fullscreen  && document.documentElement.clientHeight != 640) {
					iosHeight = document.documentElement.clientHeight + 120; 
					if (iosVer >= 7) {
						if (document.documentElement.clientHeight == 552) {
							iosHeight = 640;
						} else {
							iosHeight = document.documentElement.clientHeight;		
						}
					}
				}
				else {
					iosHeight = document.documentElement.clientHeight; 
				}
			}
			gameiframe.height = iosHeight+2;
		} else {
			gameiframe.width  = document.documentElement.clientWidth; //screen.width;
			gameiframe.height = document.documentElement.clientHeight; 
		}
	}
	else if(android) { 
		if(androidversion < 4.0) {
			gameiframe.width  = screen.width;
			if(window.devicePixelRatio == 1) {
				gameiframe.height = window.outerHeight * 2;  //45 is the top bar height of android device;
			}
			else {
				gameiframe.height = window.outerHeight * 1.5  - window.screenTop * 1.5;
			}
		}
		else {
			gameiframe.width  = document.documentElement.clientWidth; 
			if (chrome || androidversion > 4.1) {
				//Tested on Samsung S4
				gameiframe.height = document.documentElement.clientHeight+1;
			} else {
				gameiframe.height = screen.height - window.screenTop;
			}
		}
	}
	else {
		gameiframe.width  = document.documentElement.clientWidth; 
		gameiframe.height = document.documentElement.clientHeight; 
		gameiframe.height -= iframeHeightOffset; //Iframe height
	}
}

// Do iOs specific orientation change
function iosOrientationChange()
{	
	if ($.isFunction(gameiframe.contentWindow.changeOrientation))
	{
		// ---------- GAME API ----------------
		if (gameiframe.contentWindow.iPhoneiOS7AboveBrowserMode) {
			if (iphone_uiwebview) {
				gameiframe.contentWindow.iPhoneiOS7AboveBrowserMode = false;
			}
		}
		gameiframe.contentWindow.changeOrientation(window.orientation);  // tell the game what the new size of the iFrame is
	}
	setTimeout(function () {
		if (ios && iosVer <8) {
			window.scrollTo(0, 1);
		}
			
	}, 1000);
}

// Do Android specific orientation change
function androidOrientationChange()
{
	if ($.isFunction(gameiframe.contentWindow.changeOrientation)) {
		if (screen.width > screen.height) {
		// ---------- GAME API ----------------
			gameiframe.contentWindow.changeOrientation(90);
		} else if (screen.width < screen.height) {
		// ---------- GAME API ----------------
			gameiframe.contentWindow.changeOrientation(0);
		}
	}
	setTimeout(function () {
		window.scrollTo(0, 1);
	}, 300);
}


function nggGameReady() {
	if (ios) {
		iosOrientationChange();
	} 
	else {
		androidOrientationChange();
	}
	gameiframe.contentWindow.focus();
}

function nggGetSize() {
	return {w:gameiframe.width, h:gameiframe.height};
}

$(window).bind("resize", function() {
	orientationChange();
}).bind("orientationchange", function() {
	//Fix orientation change event issue on ios
	if (ios) {
		//On 30 April 2015 by Minmin Tao
		//Fix scale issue on iPhone IOS 8.3 with standalone mode.
		if (window.navigator.standalone && iosVer == 8.3 && navigator.userAgent.match(/iPhone/i)) {
			if (viewportmeta) {
				viewportmeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
			}
		}
		orientationChange();
	}
});

function initIframe() {
	if (arguments.length > 0) {
		iframeHeightOffset = arguments[0];
	}
	setiFrameSize();
	if (iosVer >= 7 && iphone && !iphone_uiwebview && !window.navigator.standalone) {
		handleIOS7();
		setInterval(handleIOS7, 200);
	}
	/*if (iphone_uiwebview) {
		$("html").css({"-webkit-transform": "scale(0.5)", 
					   "-webkit-transform-origin-x": 0, 
					   "-webkit-transform-origin-y": 0});	
	}*/
	
	
	if(iosVer >= 8 && window.navigator.standalone) {				
		window.addEventListener( 'touchstart', processTouchStartIOS8, true ); 
		window.addEventListener( 'touchend', processTouchEndIOS8, true ); 
		window.addEventListener( 'touchmove', processTouchMoveIOS8, true ); 
	}
	
}

var handleIOS7 = function(e){
	if (window.innerHeight < window.innerWidth) {
		if ($("#Mask").size() == 0) {
			$("<div>").attr("id", "Mask")
						.on("touchstart", maskTouchStart)
						.on("touchend", maskTouchEnd)
						.on("touchmove", maskTouchMove)
						.css({"filter": 	"alpha(opacity=90)",
							"opacity":	"0.9",
							"position":	"absolute", 
							"top":		"0px",
							"left":		"0px", 
							"background":"#333", 
							"width":	"100%",
							"height":	"100%", 
							"display":	"none",
							"z-index": "997"
						})
						.height(gameiframe.height)
						.appendTo($("body"));
						
			$("<div>").attr("id", "swipearrow")
						.css({
							"position":	"absolute",
							"left":		"50%",
							"top":		"50%",
							"margin-left": "-94px",
							"margin-top": "-310px",
							"visibility":"hidden",
							"z-index": "998"			
						}).append($("<img>")
								.attr("src", "transarrow.png")
								.css({"pointer-events": "none"})
						).appendTo($("#Mask"));
			
			
			$("<div>").attr("id", "swipeup")
						.css({
							"position":	"absolute",
							"left":		"50%",
							"top":		"60%",
							"margin-left": "-10px",
							"margin-top": "-80px",
							"visibility":"hidden",
							"z-index": "999"
						}).append($("<img>").attr("src", "transfinger.png")).appendTo($("#Mask"));
			if (iosVer >= 8) {
				$("#Mask").css("height", "120%");
				$("#swipearrow").css("margin-top", "-380px");
			}
		}
		if (typeof gameiframe.contentWindow.game !== "undefined") {
			if (gameiframe.contentWindow.game.showRules) return;
		}
		if (window.innerHeight < document.documentElement.clientHeight /*&& !ios7URLAppear*/) {
			if (!ios7URLAppear) {
				$(document).off('touchmove');
			}
			
			ios7URLAppear = true;
			//trigger URL Appear event
			if (!maskPressed) {
				$("#Mask").css({"display": "block", "filter": "alpha(opacity=85)", "opacity": "0.85"});
				$("#swipeup").css("visibility", "visible");
				$("#swipearrow").css({"visibility": "visible"});
			
				 $( "#swipeup" ).animate({
					top: "15%",
					opacity: 0	 
				 }, 1500, function(){
					$(this).css("top", "60%");
					$(this).css("opacity", 1);
				 });
				$(window).scrollTop(0,200);
			} else if ($("#swipeup").css("visibility") == "visible"){
				$("#swipeup").css("visibility", "hidden");
				//$("#swipearrow").css("visibility", "hidden");
				$("#swipeup" ).stop();
			}
		} else if (window.innerHeight >= document.documentElement.clientHeight && ios7URLAppear) {
			ios7URLAppear = false;
			//trigger full screen event
			
			$("#Mask").css("display", "none");
			$("#swipeup").css("visibility", "hidden");
			$(gameiframe.contentWindow.document).on('touchmove', function(e) {	
				if (typeof gameiframe.contentWindow.game !== "undefined") {
					if (gameiframe.contentWindow.game.showRules) return;
				}
				e.preventDefault();
			});
			$(document).on('touchmove', function(e) {
				e.preventDefault();
			});
		}
	} else {
		$("#Mask").css("display", "none");
		$("#swipeup").css("visibility", "hidden");
		$("#swipearrow").css("visibility", "hidden");
	}
}
var maskPressed = false;
var maskTouchStart = function () {
	maskPressed = true;
	//$("#Mask").css({"filter": "alpha(opacity=70)", "opacity": "0.7"});
	if ($("#swipeup").css("visibility") == "visible") {
		$("#swipeup").css("visibility", "hidden");	
		//$("#swipearrow").css("visibility", "hidden");	
	}
}
var maskTouchEnd = function() {
	maskPressed = false;
}
var maskTouchMove = function() {
	$("#swipearrow").css("visibility", "hidden");
}