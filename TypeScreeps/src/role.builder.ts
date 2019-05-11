var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep: Creep)
    {
        var creepTasks = require("creepTasks");

        // Set states
        if(creep.memory.building && creep.carry.energy == 0)
        {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        let constructionSites: number = 0;
        for(var i in Game.constructionSites)
        {
            i;
            constructionSites++;
        }

        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && constructionSites > 0)
        {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(!creep.memory.renewing && creep.ticksToLive < 25)
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
        else if(creep.memory.building)
        {
            creepTasks.buildNearestConstructionSite(creep);

        }
        else if( creep.carry.energy != creep.carryCapacity )
        {
            creepTasks.harvestEnergy(creep);
        }
        else creepTasks.returnEnergy(creep);
    }
};

module.exports = roleBuilder;
