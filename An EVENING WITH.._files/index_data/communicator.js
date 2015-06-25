function nggSlotCommunicator() {
  var m_aServerResponse = [];
  var m_cResponse = {
    "RID": 0, //Current Reel Strip ID
    "NRID": 0 //Next Reel Strip ID 
  };

  var self = this;
  // self.m_cResponse = m_cResponse;
  
  var isServerResponded = false;

  self.processResponse = function (msg) {
    if (msg == null || msg == "" || msg == "&") {
      // null message from server. Do fatal unkown Error.
      msg = "&MSGID=ERROR&EID=ERROR_NULL&";
    }

    var cUserData = new Object();
    m_aServerResponse = msg.split(/&|=/);
    var sMsgId = getMessageValue("MSGID");
    switch (sMsgId) {
      case "INIT":
        ProcessSpinResponse();
        ProcessInitResponse();
        break;
      case "REELSTRIP":
        ProcessReelStripResponse();
        break;

      case "BET":
      case "FREE_GAME":
        ProcessSpinResponse();
        break;
    }
    
    isServerResponded = true;
    
    
    // console.log(JSON.parse(JSON.stringify(m_cResponse))); // to clone obj
    // console.log(msg);
  };
  
  
  self.getMarker = function(marker) {
    return m_cResponse[marker];
  };
  
  self.spinStarted = function () {
    isServerResponded = false;
  };
  self.serverResponded = function () {
    return isServerResponded;
  };

  
  self.GSDParser = function(obj) {
    return obj;
  };

  
  
  //----------========== Commons ==========----------

  function getMessageValue(id) {
    for (var i = 0; i < m_aServerResponse.length; i++) {
      if (m_aServerResponse[i] == id) {
        return m_aServerResponse[i + 1];
      }
    }
    return "";
  }

  function removeDelimiter(sMessage, sDelimiter) {
    if (sMessage.charAt(sMessage.length - 1) == sDelimiter) {
      sMessage = sMessage.substr(0, sMessage.length - 1);
    }
    return sMessage;
  }
  self.removeDelimiter = removeDelimiter;
  
  

  //----------========== ProcessReelStripResponse ==========----------

  function ProcessReelStripResponse() {
    m_cResponse["MSG"] = "REELSTRIP";

    // Get the Base Strips
    if (getMessageValue("RST_0")) {
      m_cResponse["RST_0"] = TranslateReelString();
    }
    
    // Get the Changes
    GetReelStripChanges();
  }

  function TranslateReelString() {
    // 1;2;...;3|3;5;...;3;4|...|
    var src = getMessageValue("RST_0");
    src = removeDelimiter(src, "|");
    var res = [];
    var reelNumber = 0;
    var reelSplit = "";

    var reels = [];
    reels = src.split("|");
    for (var reelIndex = 0; reelIndex < reels.length; reelIndex++) {
      var reel = reels[reelIndex];
      var reelstrip = reel.split(">");
      reelstrip[1] = removeDelimiter(reelstrip[1], ";");
      var symbols = CreateDecodedString(reelstrip[1], 5, ";").split(";");
      res[reelIndex] = symbols.map(Number);
    }
    return res;
  }



  function GetReelStripChanges() {
    if (!getMessageValue("RSIDS")) {
      return;
    }

    var sRSIDS = removeDelimiter(getMessageValue("RSIDS"), "|");
    var aRSCIDS = sRSIDS.split("|");

    m_cResponse["RSIDS"] = aRSCIDS.map(Number);

    for (var nID = 0; nID < aRSCIDS.length; nID++) {
      if (aRSCIDS[nID] == "0") {
        continue;
      }
        
      //  deep clone array
      var aNewStrips = JSON.parse(JSON.stringify(m_cResponse["RST_0"]));
      
      // alternative clone
      // var aNewStrips = [];
      // for (var i = 0; i < m_cResponse["RST_0"].length; i++) {
        // aNewStrips[i] = m_cResponse["RST_0"][i].slice(0)
      // }
      
      var sFullChanges = getMessageValue("RST_" + aRSCIDS[nID]);
      if ( sFullChanges != "" ) {
        aNewStrips = GetFullStripsChanged(aNewStrips, sFullChanges);
      }

      var sSymbolChanges = getMessageValue("RSC_" + aRSCIDS[nID]);
      if ( sSymbolChanges != "" ) {
        aNewStrips = GetSymbolsChanged(aNewStrips, sSymbolChanges);
      }
      m_cResponse["RST_" + aRSCIDS[nID]] = aNewStrips;
    }
  }

  function GetFullStripsChanged(aNewStrips, sChanges) {
    sChanges = removeDelimiter(sChanges, "|");
    var aChangeReelStrips = sChanges.split("|");

    for (var nChangedReel = 0; nChangedReel < aChangeReelStrips.length; nChangedReel++) {
      var aChangeStrip = aChangeReelStrips[nChangedReel].split(">");
      var nReel = Number(aChangeStrip[0]);
      var symbols = CreateDecodedString(aChangeStrip[1], 5, ";").split(";");
      aNewStrips[nReel] = symbols.map(Number);
    }

    return aNewStrips;
  }


  function GetSymbolsChanged(aNewStrips, sChanges) {
    sChanges = removeDelimiter(sChanges, "|");
    var aChangeReelStrips = sChanges.split("|");

    for (var nChangedReel = 0; nChangedReel < aChangeReelStrips.length; nChangedReel++) {
      var aChangeStrip = aChangeReelStrips[nChangedReel].split(">");
      var nReel = Number(aChangeStrip[0]);
      var aChanges = removeDelimiter(aChangeStrip[1], ";").split(";");
      for (var nChange = 0; nChange < aChanges.length; nChange++) {
        var aIndivChange = CreateDecodedString(aChanges[ nChange ], 10, ":").split( ":" );
        var nPos = Number(aIndivChange[0]);
        var nSymbol = Number(aIndivChange[1]);
        aNewStrips[nReel][nPos] = nSymbol;
      }
    }

    return aNewStrips;
  }


  function CreateDecodedString(sEncodedString, nBitsPerNumber, sDelim) {
    var bEncoded = Number(getMessageValue("ENC"));
    var nEncodedArray = sEncodedString.split(sDelim);
    var sDecodedArray = [];

    var sDecodedString;

    if (bEncoded == 1) {
      for (var i = 0; i < nEncodedArray.length; i++) {
        sDecodedArray[i] = DecodeReelStripNumbers(parseInt(nEncodedArray[i], 36), nBitsPerNumber, sDelim);
      }

      sDecodedString = sDecodedArray.join(sDelim);
      return sDecodedString;
    } else {
      return sEncodedString;

    }
  }


  function DecodeReelStripNumbers(nEncodedNumber, nBitsPerNumber, sDelim) {
    var sDecodedString = "";
    var nBitsPerNumberCount = 3;

    var nNumberCountMask = Math.pow(2, nBitsPerNumberCount) - 1;
    var nNumberCount = (nEncodedNumber & nNumberCountMask);
    var nShift = nBitsPerNumberCount;

    for (var nCount = 0; nCount < nNumberCount; nCount++) {
      var nNumberMask = Math.pow(2, nBitsPerNumber + nShift) - 1;

      sDecodedString += (nEncodedNumber & nNumberMask) >> nShift;

      nShift += nBitsPerNumber;

      if (nCount < nNumberCount - 1) {
        sDecodedString += sDelim;
      }
    }
    return sDecodedString;
  }

  

  //----------========== ProcessSpinResponse ==========----------

  function ProcessSpinResponse() {
    m_cResponse["MSG"] = "BET";
    m_cResponse["RID"] = Number(getMessageValue("RID")); // Current Reel Strip ID
    m_cResponse["NRID"] = Number(getMessageValue("NRID")); // Next Reel Strip ID
    m_cResponse["CW"] = Number(getMessageValue("CW")); // Current Win Amount
    m_cResponse["TW"] = Number(getMessageValue("TW")); // Total Win Amount
    m_cResponse["FGT"] = Number(getMessageValue("FGT")); // Free Games Triggered
    
    m_cResponse["GSD"] = getMessageValue("GSD"); // Game Specific Data
    // m_cResponse["GSD"] = "STAGE~2#TRIGGERS~2,2,0,0,0,2000;5,5,0,-1,-1,100;#NSTAGE~2"; // Game Specific Data
    // console.warn("GSD is hardcoded")
    if(m_cResponse["GSD"]){
      var sGSDataArray = m_cResponse["GSD"].split("#");
      var sGSData = {};

      for (var i = 0; i < sGSDataArray.length; i++){
        sGSDataArray[i] = sGSDataArray[i].split("~");
        sGSData[sGSDataArray[i][0]] = sGSDataArray[i][1];
      }
      
      // game specific parsing
      sGSData = self.GSDParser(sGSData);
      
      m_cResponse["GSD"] = sGSData;
    }
  }

  

  //----------========== ProcessInitResponse ==========----------

  function ProcessInitResponse() {
    m_cResponse["MSG"] = "INIT";

    if (getMessageValue("ABM")) {
      m_cResponse["ABM"] = removeDelimiter(getMessageValue("ABM"), "|").split("|").map(Number); // Ante Bet Multiples
      
      // not used on server side
      // m_cResponse["ABRSC"] = removeDelimiter(getMessageValue("ABRSC"), "|").split("|").map(Number); // Ante Bet Reel Strip Change IDs
    }
  }
}