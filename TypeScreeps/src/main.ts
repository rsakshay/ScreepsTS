var roleHarvester   = require('role.harvester' );
var roleUpgrader    = require('role.upgrader'  );
var roleBuilder     = require('role.builder'   );
var roleRepairer    = require('role.repairer'  );
var memoryManager   = require("memoryManager"  );
var spawnManager    = require("spawnManager"   );
var buildingManager = require("buildingManager");
var gameInitializer = require("gameInitializer");

var isInitialized: boolean = false;

export const loop = function ()
{
    //**************************************************
    // Global Variables
    var totalDesiredHarvesters    = 2;
    var totalDesiredBuilders      = 1;
    var totalDesiredRepairers     = 0;
    var totalDesiredUpgraders     = 1;



    //**************************************************
    // Initialize Game
    if(!isInitialized)
    {
        gameInitializer.initializeGame();
        isInitialized = true;
    }

    //**************************************************
    memoryManager.clearDeadCreepFromMemory();

    //**************************************************
    // Tower Logic

    /*
    var tower = Game.getObjectById('4d9e744f97ce66886a77ac96');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    */

    //**************************************************
    // Manage Buildings
    buildingManager.updateBuildings();

    let spawns = Game.spawns;
    for(var i in spawns)
    {
        for(var j in Game.creeps)
        {
            (<StructureSpawn>spawns[i]).renewCreep(Game.creeps[j]);
        }

    }


    //**************************************************
    // Auto spawn Creeps
    var harvesters    = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'   );
    var builders      = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'     );
    var repairers     = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'    );
    var upgraders     = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'    );
    //console.log('Harvesters: ' + harvesters.length);
    //console.log('Builders: '   + builders.length  );
    //console.log('Upgraders: '  + upgraders.length );

    //var extensions = _.filter(Game.structures, (Structure) => Structure.structureType == "STRUCTURE+EXTENSION" );
    //var extensions = Game.structures;

    if(harvesters.length < totalDesiredHarvesters)
    {
        spawnManager.spawnUnit("Harvester");
    }

    if(builders.length < totalDesiredBuilders && harvesters.length >= totalDesiredHarvesters)
    {
        spawnManager.spawnUnit("Builder");
    }

    if(repairers.length < totalDesiredRepairers && harvesters.length >= totalDesiredHarvesters && builders.length >= totalDesiredBuilders)
    {
        spawnManager.spawnUnit("Repairer");
    }

    if(upgraders.length < totalDesiredUpgraders && harvesters.length >= totalDesiredHarvesters && builders.length >= totalDesiredBuilders)
    {
        spawnManager.spawnUnit("Upgrader");
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    //**************************************************
    // Assign roles
    for(var name in Game.creeps)
    {
        let creep: Creep = Game.creeps[name];
        if(creep.memory.role == 'harvester')
        {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader')
        {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder')
        {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer')
        {
            roleRepairer.run(creep);
        }
    }
}
