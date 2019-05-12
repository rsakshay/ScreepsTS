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
        // Memory.shouldBuildRoads = buildingManager.getBuildingsHaveChanged();

        if(Memory.shouldBuildRoads == true)
        {
            buildingManager.buildRoads();
            Memory.shouldBuildRoads = false;
        }

    },

    buildRoads: function()
    {
        var buildingManager = require("buildingManager");
        buildingManager.buildRoadsBetweenBuildings("spawn", "controller");
        buildingManager.buildRoadsBetweenBuildings("spawn", "extension");

        let spawns: Structure[] = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_SPAWN);
        for(var i in spawns)
        {
            buildingManager.buildRoadsAroundLocation(spawns[i].room, spawns[i].pos, 1);
        }

        let extensions: Structure[] = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_EXTENSION);
        for(var i in extensions)
        {
            buildingManager.buildRoadsAroundLocation(extensions[i].room, extensions[i].pos, 1);
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

    buildRoadsAroundLocation: function(room: Room, centerPosition: RoomPosition, radius: number)
    {
        let xSize: number = radius;
        let ySize: number = radius;

        let xMinOffset: number = xSize * -1;
        let xMaxOffset: number = xSize;
        let yMinOffset: number = ySize * -1;
        let yMaxOffset: number = ySize;
        let xRange: number[] = _.range(xMinOffset, xMaxOffset + 1);
        let yRange: number[] = _.range(yMinOffset, yMaxOffset + 1);

        for(var j in xRange)
        {
            for(var k in yRange)
            {
                let constructPos: RoomPosition = new RoomPosition(centerPosition.x, centerPosition.y, room.name);
                constructPos.x = centerPosition.x + xRange[j];
                constructPos.y = centerPosition.y + yRange[k];
                constructPos.createConstructionSite(STRUCTURE_ROAD);
            }
        }
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
    },
};
