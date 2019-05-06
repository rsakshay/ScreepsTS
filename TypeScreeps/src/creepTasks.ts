/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnManager');
 * mod.thing == 'a thing'; // true
 */


module.exports = {

    // Returns held energy to a spawn, extension, or tower
    returnEnergy: function(creep)
    {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) =>
                {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity && structure.isActive();
                }
        });
        if(targets.length > 0)
        {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },

    // Harvests the nearest source by path
    harvestEnergy:function(creep)
    {
        // var source = Game.spawns["Spawn1"].pos.findClosestByPath(FIND_SOURCES);
        var source = Game.spawns["Spawn1"].pos.findClosestByRange(FIND_SOURCES);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },

    buildNearestConstructionSite: function(creep)
    {
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(target)
        {
            if(creep.build(target) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};
