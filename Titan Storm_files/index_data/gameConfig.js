//These represents various game mode and feature flags and settings for the core. They need to be declared here so that they are loaded ahead of the core or any other files that may need them.
// Example var gameConfigParameters = { way243 : true, test : 42  }; 
// The key value is specific to the configGame object and it's value can be overriden here. You can also add new member variables and values to the config object simply by including them in this list. 

var gameConfigParameters = {
    way243 : true,
    extraBet : false,
    gambleBtn : false
};
