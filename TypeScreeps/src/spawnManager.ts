/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnManager');
 * mod.thing == 'a thing'; // true
 */

class unitTemplate
{
    name: string;
    body: BodyPartConstant[];
    requiredEnergy: number;

    constructor( name: string, body: BodyPartConstant[], requiredEnergy:number ) {
        this.name           = name;
        this.body           = body;
        this.requiredEnergy = requiredEnergy;
      }
}

let t1HarvesterTemplate = new unitTemplate("t1Harvester", [WORK,MOVE,CARRY], 200);
let t2HarvesterTemplate = new unitTemplate("t2Harvester", [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], 550);
let t3HarvesterTemplate = new unitTemplate("t3Harvester", [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 800);

var harvesterTemplates: unitTemplate[] =
[
    t1HarvesterTemplate,
    t2HarvesterTemplate,
    t3HarvesterTemplate
];

let t1BuilderTemplate = new unitTemplate("t1Builder", [WORK,MOVE,CARRY], 200);
let t2BuilderTemplate = new unitTemplate("t2Builder", [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], 550);
let t3BuilderTemplate = new unitTemplate("t3Builder", [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 800);

var builderTemplates: unitTemplate[] =
[
    t1BuilderTemplate,
    t2BuilderTemplate,
    t3BuilderTemplate
];

let t1RepairerTemplate = new unitTemplate("t1Repairer", [WORK,MOVE,CARRY], 200);
let t2RepairerTemplate = new unitTemplate("t2Repairer", [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], 550);
let t3RepairerTemplate = new unitTemplate("t3Repairer", [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 800);

var repairerTemplates: unitTemplate[] =
[
    t1RepairerTemplate,
    t2RepairerTemplate,
    t3RepairerTemplate
];

let t1UpgraderTemplate = new unitTemplate("t1Upgrader", [WORK,MOVE,CARRY], 200);
let t2UpgraderTemplate = new unitTemplate("t2Upgrader", [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], 550);
let t3UpgraderTemplate = new unitTemplate("t3Upgrader", [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 800);

var upgraderTemplates: unitTemplate[] =
[
    t1UpgraderTemplate,
    t2UpgraderTemplate,
    t3UpgraderTemplate
];

module.exports = {

    spawnUnit: function(unitTemplate)
    {
        var spawnManager = require("spawnManager");
        switch(unitTemplate)
        {
            case "Harvester":
                spawnManager.spawnHarvester();
                break;
            case "Builder":
                spawnManager.spawnBuilder();
                break;
            case "Repairer":
                spawnManager.spawnRepairer();
                break;
            case "Upgrader":
                spawnManager.spawnUpgrader();
                break;
            default:
                console.log("No unitTemplate of type " + unitTemplate);
        }
    },

    //**************************************************
    // Spawning
    spawnHarvester: function()
    {
        var spawnManager = require("spawnManager");

        // Choose current template
        let currentTemplate: unitTemplate = harvesterTemplates[0];
        for( let i in harvesterTemplates)
        {
            if( spawnManager.getTotalEnergyCapacity() >=  harvesterTemplates[i].requiredEnergy )
            {
                currentTemplate = harvesterTemplates[i]
            }
            else break;
        }

        // Fix case in which you cannot spawn higher level creeps
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' );
        if( harvesters.length < 1 )
        //if( harvesters.length < 1 && spawnManager.getTotalCurrentEnergy < harvesterTemplates[1].requiredEnergy) TODO: fix this shit
        {
            currentTemplate = harvesterTemplates[0];
        }

        if(Memory.spawningInfo == true)
        {
            console.log("Chosen Harvester Template: " + currentTemplate.name + " [" + currentTemplate.body + "] (" + currentTemplate.requiredEnergy + ")");
        }

        if(spawnManager.getTotalCurrentEnergy() >= currentTemplate.requiredEnergy)
        {
            // Spawn Harvester based on chosen template
            let newName: string = currentTemplate.name + Game.time;
            let sourceID: string = spawnManager.getIdealSourceID();
            if( Game.spawns['Spawn1'].spawnCreep(
                currentTemplate.body,
                newName,
                {
                    memory: {role: 'harvester', source: sourceID}
                }) == OK )
            {
                console.log('Spawning new harvester: ' + newName);
            }
        }
        else if(Memory.spawningInfo == true)
        {
            console.log("Insufficient energy to spawn " + currentTemplate.name + ". Needed " + currentTemplate.requiredEnergy + " energy, but only had " + spawnManager.getTotalCurrentEnergy() + " total energy.");
        }

    },

    spawnBuilder: function()
    {
        var spawnManager = require("spawnManager");

        // Choose current template
        let currentTemplate: unitTemplate = builderTemplates[0];
        for( let i in builderTemplates)
        {
            if( spawnManager.getTotalEnergyCapacity() >=  builderTemplates[i].requiredEnergy )
            {
                currentTemplate = builderTemplates[i]
            }
            else break;
        }

        if(Memory.spawningInfo == true)
        {
        console.log("Chosen Builder Template: " + currentTemplate.name + " [" + currentTemplate.body + "] (" + currentTemplate.requiredEnergy + ")");
        }

        if(spawnManager.getTotalCurrentEnergy() >= currentTemplate.requiredEnergy)
        {
            // Spawn Builder based on chosen template
            let newName: string = currentTemplate.name + Game.time;
            let sourceID: string = spawnManager.getIdealSourceID();
            if( Game.spawns['Spawn1'].spawnCreep(
                currentTemplate.body,
                newName,
                {
                    memory: {role: 'builder', source: sourceID}
                }) == OK )
            {
                console.log('Spawning new builder: ' + newName);
            }
        }
        else if(Memory.spawningInfo == true)
        {
            console.log("Insufficient energy to spawn " + currentTemplate.name + ". Needed " + currentTemplate.requiredEnergy + " energy, but only had " + spawnManager.getTotalCurrentEnergy() + " total energy.");
        }
    },

    spawnRepairer: function()
    {
        var spawnManager = require("spawnManager");

        // Choose current template
        let currentTemplate: unitTemplate = repairerTemplates[0];
        for( let i in repairerTemplates)
        {
            if( spawnManager.getTotalEnergyCapacity() >=  repairerTemplates[i].requiredEnergy )
            {
                currentTemplate = repairerTemplates[i]
            }
            else break;
        }

        if(Memory.spawningInfo == true)
        {
        console.log("Chosen Repairer Template: " + currentTemplate.name + " [" + currentTemplate.body + "] (" + currentTemplate.requiredEnergy + ")");
        }

        if(spawnManager.getTotalCurrentEnergy() >= currentTemplate.requiredEnergy)
        {
            // Spawn Repairer based on chosen template
            let newName: string = currentTemplate.name + Game.time;
            let sourceID: string = spawnManager.getIdealSourceID();
            if( Game.spawns['Spawn1'].spawnCreep(
                currentTemplate.body,
                newName,
                {
                    memory: {role: 'repairer', source: sourceID}
                }) == OK )
            {
                console.log('Spawning new repairer: ' + newName);
            }
        }
        else if(Memory.spawningInfo == true)
        {
            console.log("Insufficient energy to spawn " + currentTemplate.name + ". Needed " + currentTemplate.requiredEnergy + " energy, but only had " + spawnManager.getTotalCurrentEnergy() + " total energy.");
        }
    },

    spawnUpgrader: function()
    {
        var spawnManager = require("spawnManager");

        // Choose current template
        let currentTemplate: unitTemplate = upgraderTemplates[0];
        for( let i in upgraderTemplates)
        {
            if( spawnManager.getTotalEnergyCapacity() >=  upgraderTemplates[i].requiredEnergy )
            {
                currentTemplate = upgraderTemplates[i]
            }
            else break;
        }

        if(Memory.spawningInfo == true)
        {
            console.log("Chosen Upgrader Template: " + currentTemplate.name + " [" + currentTemplate.body + "] (" + currentTemplate.requiredEnergy + ")");
        }

        if(spawnManager.getTotalCurrentEnergy() >= currentTemplate.requiredEnergy)
        {
            // Spawn Upgrader based on chosen template
            let newName: string = currentTemplate.name + Game.time;
            if( Game.spawns['Spawn1'].spawnCreep(
                currentTemplate.body,
                newName,
                {
                    memory: {role: 'upgrader'}
                }) == OK )
            {
                console.log('Spawning new upgrader: ' + newName);
            }
        }
        else if(Memory.spawningInfo == true)
        {
            console.log("Insufficient energy to spawn " + currentTemplate.name + ". Needed " + currentTemplate.requiredEnergy + " energy, but only had " + spawnManager.getTotalCurrentEnergy() + " total energy.");
        }
    },

    //**************************************************
    // Helper functions
    getTotalEnergyCapacity: function()
    {
        let totalEnergyCapacity: number = 0;
        for(let i in Game.structures)
        {
            // there has GOT to be a better way of doing this
            let currentStructure: Structure = Game.structures[i];
            currentStructure;
            let currentStructureType: string = Game.structures[i].structureType;
            if(currentStructure.isActive())
            {
                switch( currentStructureType )
                {
                    case STRUCTURE_SPAWN:
                        totalEnergyCapacity += (<StructureSpawn>(Game.getObjectById(currentStructure.id))).energyCapacity;
                        break;
                    case STRUCTURE_EXTENSION:
                        totalEnergyCapacity += (<StructureExtension>(Game.getObjectById(currentStructure.id))).energyCapacity;
                        break;
                    default:
                        break;
                }
            }
        }
        return totalEnergyCapacity;
    },

    getTotalCurrentEnergy: function()
    {
        let totalCurrentEnergy: number = 0;
        for(let i in Game.structures)
        {
            // there has GOT to be a better way of doing this
            let currentStructure: Structure = Game.structures[i];
            let currentStructureType: string = Game.structures[i].structureType;
            if(currentStructure.isActive())
            {
                switch( currentStructureType )
                {
                    case STRUCTURE_SPAWN:
                        totalCurrentEnergy += (<StructureSpawn>(Game.getObjectById(currentStructure.id))).energy;
                        break;
                    case STRUCTURE_EXTENSION:
                        totalCurrentEnergy += (<StructureExtension>(Game.getObjectById(currentStructure.id))).energy;
                        break;
                    default:
                        break;
                }
            }
        }
        return totalCurrentEnergy;
    },

    // This function needs a lot of work. It should get the closest source per spawn, determine how many open spots are by it, and how many creeps are currently harvesting each
    // It should fill up the closest source's slots, before assigning creeps to the next closest spawn.
    getIdealSourceID: function()
    {
        let sources: Source[] = Game.spawns["Spawn1"].room.find(FIND_SOURCES);
        let sourceID: string = sources[_.random(0,1)].id;
        return sourceID;
    }
};
