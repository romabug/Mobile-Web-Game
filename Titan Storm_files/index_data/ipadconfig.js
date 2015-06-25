function correctIphoneHelpText() {
	
	if (navigator.userAgent.match(/iPhone/i)) {
		$(".titlerules, .titlefree, .rules, .titlefeature, .titlesuperbet, .titleowlbonus").css("font-size", "44px");
		$(".count, .amount, .helptext").css("font-size", "24px");
//		$(".ofakind").css("font-size", "24px");
	}		
}