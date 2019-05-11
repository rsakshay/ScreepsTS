var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep: Creep)
    {
        var creepTasks = require("creepTasks");
        var roleRepairer = require("role.repairer");

        // Set states
        if(creep.memory.repairing && creep.carry.energy == 0)
        {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }

        let structuresNeedingRepair: Structure[] = roleRepairer.getBuildingsBelowPercentHealth(0.25);

        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity && structuresNeedingRepair.length > 0)
        {
            creep.memory.repairing = true;
            creep.say('🚧 repairing');
        }

        if(!creep.memory.renewing && creep.ticksToLive < 50)
        {
            creep.memory.renewing = true;
            creep.say("⚕️ renew");
        }

        // Behavior
        if(creep.memory.renewing)
        {
            if(creepTasks.awaitRenewing(creep, 250))
            {
                creep.memory.renewing = false;
            }
        }
        else if(creep.memory.repairing)
        {
            creepTasks.repairStructure(creep, structuresNeedingRepair[0]);
        }
        else if( creep.carry.energy != creep.carryCapacity )
        {
            creepTasks.harvestEnergy(creep);
        }
        else creepTasks.returnEnergy(creep);
    },

    getBuildingsBelowPercentHealth: function(percentThreshold: number)
    {
        let structures: Structure[] = Game.spawns["Spawn1"].room.find(FIND_MY_STRUCTURES);
        let structuresBelowThreshold: Structure[] = [];
        for(var i in structures)
        {
            if(structures[i].hits < (structures[i].hitsMax * percentThreshold))
            {
                structuresBelowThreshold.push(structures[i])
            }
        }
        return structuresBelowThreshold;
    }
};

module.exports = roleRepairer;
