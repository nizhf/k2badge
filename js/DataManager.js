const DataLoader  = function(language){
    let kaiNi = {};
    let abyssalDB = {};
    let shipDB = {};
    let shipTypes = {};
    let implications = {};
    let mstIdTable = {};
    let seasonal = {};
    let furniture = {};
    let lang = language;
    

    const loadShipData = function() {
        return $.getJSON((lang == "en") ? 'db.json?v=13' : 'dbj.json?v=13', (json) => {
            shipDB = json;
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    };

    const loadAbyssalData = function() {
        return $.getJSON((lang == "en") ? 'db2.json?v=13' : 'db2j.json?v=13', (json) => {
            abyssalDB = json;
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    };

    const loadSeasonalData = function() {
        return $.getJSON("seasonal.json", (json) => {
            videoData = json;
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    };

    const loadFurnitureData = function() {
        return $.getJSON("furniture.json", (json) => {
            videoData = json;
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    };

    const loadConversionData = function() {
        return $.getJSON("conversion.json", (json) => {
            mstIdTable = json.mstId2FleetIdTable;
            implications = json.implicationTable;
            shipTypes = json.shipTypes;
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    };
    
    const loadKaiNiData = function() {
        return $.getJSON("./data/kaini.json", (json) => {
            kaiNi = json;
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
            $("#buttons").html("Can't find Kanmusu DB, please contact Harvestasya or Nya-chan on Github");
        });
    };

    this.initData = function(callback) {
        $.when(loadShipData(), 
            loadAbyssalData(), 
            loadKaiNiData(), 
            loadConversionData())
        .done(callback)
        .fail(function() {
            $('#tabs').remove();
        });
    };

    this.getShips = function() { return shipDB;};
    this.getAbyssals = function() {return abyssalDB;};
    this.getSeasonals = function() {return seasonal;};
    this.getFurniture = function() {return furniture;};
    this.getMstIdTable = function() {return mstIdTable;};
    this.getShipTypes = function() {return shipTypes;};
    this.getImplications = function() {return implications;};
    this.getKaiNiData = function() {return kaiNi;};
}

/*Object.assign(Loader.prototype, {
    
})*/

const TabManager = function(loader) {
    let data = loader;
    let $infoTab = $('#ttkTab');
    let $fleetTab = $('#shipTab');
    let $kainiTab = $('#shipTab');

    const loadFlagTab = function() {

    };

    const loadKaiNiTab = function() {
        let kaini = data.getKaiNiData();
        let shipData = data.getShips();

        for(var shipType in kaini) {
            if(Object.keys(kaini[shipType]).length == 0) {
                continue;
            }
            let $shipOptions = $kainiTab.find("#" + shipType.toLowerCase() + " .shipOptions");
            let ships = kaini[shipType];

            for(var ship in ships) {
                let currentShip = ships[ship];
                let $newDiv = $('<div/>', {

                })
                let $inputSpan = $('<span/>', {});
                let $kainiInput = $('<input/>', {
                    id: ship,
                    name: ship,
                    type: "checkbox"
                });
                let $shipLabel = $('<label/>', {
                    "for": ship,
                    text: shipData[currentShip.base].full + " (" + currentShip.level + ")"
                });

                $inputSpan.append($kainiInput);
                $newDiv.append($inputSpan).append($shipLabel);

                if(currentShip.kai) $newDiv.addClass("kai");
                if(currentShip.blueprint) $newDiv.addClass("blueprint");
                if(currentShip.prototype) $newDiv.addClass("prototype");
                if(currentShip.actionReport) $newDiv.addClass("actreport");
                //if(currentShip.conversion) $newDiv.addClass("kai");
                $shipOptions.append($newDiv);
            }
        }

    };

    const loadFurnitureTab = function() {
        let furniture = data.getFurniture();

    };

    this.loadTabs = function() {
        loadKaiNiTab();
    }
} 