var roleHarvester   = require('role.harvester' );
var roleUpgrader    = require('role.upgrader'  );
var roleBuilder     = require('role.builder'   );
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
    var totalDesiredBuilders      = 2;
    var totalDesiredUpgraders     = 2;



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


    //**************************************************
    // Auto spawn Creeps
    var harvesters    = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'   );
    var builders      = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'     );
    var upgraders     = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'    );
    //console.log('Harvesters: ' + harvesters.length);
    //console.log('Builders: '   + builders.length  );
    //console.log('Upgraders: '  + upgraders.length );

    //var extensions = _.filter(Game.structures, (Structure) => Structure.structureType == "STRUCTURE+EXTENSION" );
    //var extensions = Game.structures;

    for(var i in Game.structures.length)
    {
        console.log( Game.structures[i] );
    }


    if(harvesters.length < totalDesiredHarvesters)
    {
        spawnManager.spawnUnit("Harvester");
    }

    if(builders.length < totalDesiredBuilders && harvesters.length >= totalDesiredHarvesters)
    {
        spawnManager.spawnUnit("Builder");
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
        var creep = Game.creeps[name];
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
    }
}
