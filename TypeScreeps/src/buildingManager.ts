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
        Memory.shouldBuildRoads = buildingManager.getBuildingsHaveChanged();

        if(Memory.shouldBuildRoads == true)
        {
            buildingManager.buildRoadsBetweenBuildings("spawn", "controller");
            buildingManager.buildRoadsBetweenBuildings("spawn", "extension");
            Memory.shouldBuildRoads = false;
        }
    },

    buildRoadsBetweenBuildings: function(originBuilding: string, destinationBuilding: string)
    {
        let spawns:       Structure[] = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_SPAWN      );
        let extensions:   Structure[] = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_EXTENSION  );
        let controllers:  Structure[] = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER );

        let origins     : Structure[];
        let destinations: Structure[];

        switch(originBuilding)
        {
            case "spawn":
            {
                origins = spawns;
                break;
            }
            case "extension":
            {
                origins = extensions;
                break;
            }
            default:
            {
                console.log("Error: No match for origin.")
                return;
            }
        }

        switch(destinationBuilding)
        {
            case "extension":
            {
                destinations = extensions;
                break;
            }
            case "controller":
            {
                destinations = controllers;
                break;
            }
            default:
            {
                console.log("Error: No match for destination.")
                return;
            }
        }

        for(var i in origins)
        {
            for(var j in destinations)
            {
                PathFinder.search(origins[i].pos, destinations[j].pos).path.forEach(pos=>pos.createConstructionSite(STRUCTURE_ROAD));
            }
        }
        return;
    },

    getBuildingsHaveChanged: function()
    {
        let currentTickStructures = Game.structures;
        let numberOfCurrentTickStructures: number = 0;
        let structuresInMemory: {[structureId: string]: Structure} = Memory.structures;
        let numberOfStructuresInMemory: number = 0;
        let haveBuildingsChanged: boolean = false;

        for(var i in structuresInMemory)
        {
            numberOfStructuresInMemory++;
        }
        for(var i in currentTickStructures)
        {
            numberOfCurrentTickStructures++;
        }

        for(var i in structuresInMemory)
        {
            let isCurrentBuildingInMemory: boolean = false;

            for(var j in currentTickStructures)
            {
                if(structuresInMemory[i].id == currentTickStructures[j].id)
                {
                    isCurrentBuildingInMemory = true;
                    break;
                }
            }

            if(!isCurrentBuildingInMemory)
            {
                haveBuildingsChanged = true;
                break;
            }
        }

        if(numberOfStructuresInMemory != numberOfCurrentTickStructures)
        {
            haveBuildingsChanged = true;
        }

        if(haveBuildingsChanged)
        {
            console.log("Buildings have changed.");
            Memory.shouldBuildRoads = true;
            Memory.structures = currentTickStructures;
            return true;
        }
        else
        {
            // console.log("Buildings are the same.");
            return false;
        }
    }
};
