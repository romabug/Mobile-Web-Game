
/*
 * A wrapper for howler HTML5 sound library with some functionalities: 
 *
 *		1: Convert the in game audio settings into the format required by new library;
 *		2: Provide the same API calls as old old library, so that there is no game specific changes and very minor core changes;
 *		3: Support polyphonic playback;
 *
 */

 
function howlerWrapper() 
{
	this.howler;
	var settings = {urls:[],
					sprite:{},
					onpause: function(){} 
	};
	var currentSoundArray = [];	//recent played sounds
	var pausedSoundArray = [];	//Paused sounds
	
	//Convert audio settings to accetable format.
	this.gAudioSettingsConvertion = function(gAudioSettings) {
		
		for (var i = 0; i < gAudioSettings.resources.length; i++ ) {
			settings.urls.push(gAudioSettings.resources[i]);
		}
		
		var jsonStr = "{";
		$.each(gAudioSettings.spritemap, function(key, val) {
			if (val.loop == true) {
				jsonStr += "'"+key+"': ["+ Math.round(val.start*1000)+", "+Math.round((val.end - val.start)*1000)+", true],";	
			} else {
				jsonStr += "'"+key+"': ["+ Math.round(val.start*1000)+", "+Math.round((val.end - val.start)*1000)+"],";
			}
		});
		jsonStr = jsonStr.substring(0, jsonStr.length - 1);
		jsonStr +="}";
		settings.sprite = eval('('+jsonStr+')');
		return settings;
	}
	
	//Initialize the sound library
	this.player = function(gAudioSettings)
	{
		settings = this.gAudioSettingsConvertion(gAudioSettings);
		this.howler = new Howl(settings);
	}
	
	//Play a new sound or resume the playing sound(s)
	this.play = function()
	{
		if (this.howler == null) {
			this.howler = new Howl(settings);
		}
		if (arguments.length > 0) {
			//Normal play
			var currentSprite = arguments[0];
			//Get the current playing sounds and save to currentSoundArray
			currentSoundArray = this.updateActiveNode();
			//Play a new sound
			this.howler.play(currentSprite, function(soundId){
				//Save the sound with soundId
				currentSoundArray.push([soundId, currentSprite]);
			});
		} else{
			//resume sounds
			if (pausedSoundArray.length == 0) {
				this.stop();
			} else {
				for (var i = 0; i < pausedSoundArray.length; i++) {
					if (settings.sprite[pausedSoundArray[i][1]].length == 3 && settings.sprite[pausedSoundArray[i][1]][2]) {
						//Resume loop sound: stop it first, then start from the begining. there is an library issue to resume loop sound.
						this.howler.stop(pausedSoundArray[i][0]).play(pausedSoundArray[i][1], function(soundId) {
							//Save the sound with soundId
							currentSoundArray.push([soundId, pausedSoundArray[i][1]]);
						});
						
					} else {
						//Resume a playing sound
						this.howler.play(pausedSoundArray[i][1], pausedSoundArray[i][0]);
						//Save the sound with soundId
						currentSoundArray.push(pausedSoundArray[i]);
					}
				}
				pausedSoundArray = [];
			}
		}
	}
	
	//Stop the current playing sound(s)
	this.stop = function()
	{
		if (this.howler == null) {
			return;
		} else if (arguments.length > 0) {
			var newSoundArray = [];
			for (var i = 0; i < currentSoundArray.length; i++) {
				if (currentSoundArray[i][1] == arguments[0]) {
					this.howler.stop(currentSoundArray[i][0]);
				} else {
					newSoundArray.push(currentSoundArray[i]);
				}
			}
			currentSoundArray = newSoundArray;
		} else {
			this.howler.stop();
			pausedSoundArray = [];
			currentSoundArray = [];
		}
	}
	
	
	//Pause the current playing sound(s)
	this.pause = function()
	{
		if (this.howler == null || pausedSoundArray.length > 0) return;
		var activenode = this.howler._activeNode();
		while(activenode) {
			var soundId = activenode.id;
			for (var i = 0; i < currentSoundArray.length; i++) {
				if (currentSoundArray[i][0] == soundId) {
					pausedSoundArray.push(currentSoundArray[i]);
					break;
				}
			}
			
			this.howler.pause(soundId);
			activenode = this.howler._activeNode();
		}
		currentSoundArray = [];
	}
	
	//Get the current playing sound(s)
	this.updateActiveNode = function()
	{
		var current = [];
		var activenode;
		if (this.howler == null) {
			return current;
		}
		for (var i=0; i<this.howler._audioNode.length; i++) {
			if (!this.howler._audioNode[i].paused) {
				activenode = this.howler._audioNode[i];
				for (var j = 0; j < currentSoundArray.length; j++) {
					if (currentSoundArray[j][0] == activenode.id) {
						current.push(currentSoundArray[j]);
						break;
					}
				}
			}
		}
		return current;
	}
	
	this.update = function(timeDelta){}
	
	//Resume current playing sound(s)
	this.resume = function(){
		this.play();
	};
	
	//Check whether there are any sound(s) is (are) playing 
	this.isPlaying = function()
	{
		if (this.howler == null) {
			return false;
		} else {
			return this.updateActiveNode().length > 0?true:false;
		}
	}
	
	//Off load current sound object
	this.unload = function()
	{
		this.howler.unload();
		pausedSoundArray = [];
		currentSoundArray = [];
		this.howler = null;
	}
	
	//Set sound volume
	this.setVolume = function(vol)
	{
		this.howler.volume(vol);
	}
}

//Sound Stopped function executes when any sound finished playing.
soundStopped = function(){}