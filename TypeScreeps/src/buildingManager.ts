/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('memoryManager');
* mod.thing == 'a thing'; // true
*/

module.exports = {
    createRoadsFromSpawnToController: function()
    {

        for(var i in Game.structures)
        {
            let origin = Game.structures[i].pos;
            let goal = Game.structures[i].room.controller.pos;
            PathFinder.search(origin, goal).path.forEach(pos=>pos.createConstructionSite(STRUCTURE_ROAD));
        }

    }
};
