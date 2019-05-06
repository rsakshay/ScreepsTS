/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('memoryManager');
* mod.thing == 'a thing'; // true
*/


module.exports = {

    updateBuildings: function()
    {
        var buildingManager = require("buildingManager");

        if(Memory.shouldBuildRoads = true)
        {
            buildingManager.createRoadsFromSpawnToController();
        }
    },

    createRoadsFromSpawnToController: function()
    {
        let spawns = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_SPAWN );

        for(var i in spawns)
        {
            let origin = spawns[i].pos;
            let goal = spawns[i].room.controller.pos;
            PathFinder.search(origin, goal).path.forEach(pos=>pos.createConstructionSite(STRUCTURE_ROAD));
            Memory.shouldBuildRoads = false;
        }

        return;
    },

    getBuildingsHaveChanged: function()
    {
        let previousTickStructures = Game.structures;
        let currentTickStructures  = Game.structures;

        if(previousTickStructures == currentTickStructures)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
};
