var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep)
    {
        var creepTasks = require("creepTasks");

        // Set state
        if(creep.memory.transferring && creep.carry.energy == 0)
	    {
            creep.memory.transferring = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity)
	    {
	        creep.memory.transferring = true;
	        creep.say('💰 transfer');
	    }

        // Behavior
	    if(!creep.memory.transferring)
	    {
            creepTasks.harvestEnergy(creep);
        }

        else creepTasks.returnEnergy(creep);
	}
};

module.exports = roleHarvester;
