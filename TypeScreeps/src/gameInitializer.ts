/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('spawnManager');
* mod.thing == 'a thing'; // true
*/


module.exports = {

    initializeGame: function()
    {
        Memory.spawningInfo = false;
        Memory.structures = Game.structures;
    }
};
