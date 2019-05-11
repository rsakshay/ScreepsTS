var creepTasks = require("creepTasks");

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep)
    {

        if(creep.memory.upgrading && creep.carry.energy == 0)
        {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity)
	    {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

        if(!creep.memory.renewing && creep.ticksToLive < 100)
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
        else if(creep.memory.upgrading)
	    {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else
        {
            creepTasks.harvestEnergy(creep);
        }
	}
};

module.exports = roleUpgrader;
