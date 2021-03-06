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
    returnEnergy: function(creep: Creep)
    {
        let targets: Structure[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) =>
                {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity && structure.isActive();
                }
        });
        if(targets.length > 0)
        {
            targets.sort( (a, b) => (PathFinder.search(creep.pos, a.pos).path.length) - (PathFinder.search(creep.pos, b.pos).path.length) );

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
        let source: Source;
        if(creep.memory.source)
        {
             source = Game.getObjectById(creep.memory.source);
        }
        else source = Game.spawns["Spawn1"].pos.findClosestByRange(FIND_SOURCES);

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
    },

    repairStructure: function(creep: Creep, structure: Structure)
    {
        if(creep.repair(structure) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },

    awaitRenewing: function(creep: Creep, desiredTicks: number)
    {
        let spawn: StructureSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

        creep.moveTo(spawn,  {visualizePathStyle: {stroke: '#ffffff'}} );

        if(creep.ticksToLive >= desiredTicks)
        {
            return true;
        }
    }
};
