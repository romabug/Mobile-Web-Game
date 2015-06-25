function loadLanguage() 
{
	if (window.parent != window.self) // using the standard iFrame wrapper
	{
		if (window.parent.languageCode) 
		{
			document.write("<script type='text/javascript' src='language/" + window.parent.languageCode + "/language.js'><\/script>");	
		} 
		else 
		{
			document.write("<script type='text/javascript' src='language/en/language.js'><\/script>");
		}
	} 
	else		// using the Ajax wrapper
	{
		var root=document.getElementsByTagName('head')[0];
		var oS = document.createElement('script');
		oS.setAttribute('type','text/javascript');
		if (languageCode) 
		{ 
			oS.setAttribute('src',"language/" + languageCode + "/language.js");
		}
		else
		{
			oS.setAttribute('src',"language/en/language.js");
		}
		root.appendChild(oS)
		$(oS).load(function(){
			if(typeof window.load  == "function")
			{
				window.load();
				var links = $("head").find("link");
				if (links.size() == 0)
				{
					if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
						$("head").append('<link rel="stylesheet" type="text/css" id="commoncss" href="../common/common.css"/>');
					} else if ( navigator.userAgent.match(/iPad/i) ) {
						$("head").append('<link rel="stylesheet" type="text/css" id="commoncss" href="../common/common_ipad.css"/>');
					} else {
						$("head").append('<link rel="stylesheet" type="text/css" id="commoncss" href="../common/common_ipad.css"/>');
					}
					$("head").append('<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-iphone4.png" />');
				}
			}
		});
	}
}

loadLanguage();