function renderCycle() {
    function emptyUnitFields() {
        var tds = document.getElementsByTagName("td");
        for (var i = 0; i < tds.length; i++) {
            var td = tds[i];
            for (var j = 0; j < playerCount; j++) {
                var playerColor =  getPlayerColor(j);
                td.classList.remove("background-" + playerColor);
                td.classList.remove("selected-" + playerColor);
            }
            td.classList.remove("can-choose");
            td.classList.remove("can-place");
            td.classList.remove("can-be-taken");
            if (!td.classList.contains("home-field")) { 
                td.innerText = "";
            }
        }
    }
    
    function renderUnits() {
        for (var i = 0; i < units.length; i++) {
            var unit = units[i];
            var playerColor =  getPlayerColor(unit.controllingPlayer);
            var htmlElem = null;
            if (unit.pos) {
                var id = getId(unit.pos);
                htmlElem = document.getElementById(id);
            } else {
                htmlElem = document.getElementById(unit.name);
            }
            if (selectedUnit && unit.name === selectedUnit.name) {
                htmlElem.classList.add("selected-" + playerColor);
            } else if (canBeTakenIds.includes(htmlElem.id)) {
                htmlElem.classList.add("can-be-taken");
            } else {
                htmlElem.classList.add("background-" + playerColor);
            }
            htmlElem.innerText = unit.type;
            if (!selectedUnit && currentPlayer === unit.controllingPlayer 
                && (isInPlacingPhase && !unit.pos || !isInPlacingPhase && unit.pos)) {
                htmlElem.classList.add("can-choose");
            }
        }
    }

    function renderStartPlacings() {
        document.querySelectorAll("#playingField td").forEach(function(cell) {
            var id = cell.id;
            if (canPlaceStartingUnit(id)) {
                cell.classList.add("can-place");
            }
        });
    }
    
    function renderStatistics() {
        document.getElementById("turn").innerText = turnNumber + 1;
        document.getElementById("player").innerText = currentPlayer + 1;
        document.getElementById("selectedUnit").innerText = selectedUnit ? selectedUnit.type : "";
    }

    function getPlayerColor(player) {
        return "p-" + player;
    }

    function renderSelectedPlacings() {
        document.querySelectorAll("#playingField td").forEach(function(cell) {
            var id = cell.id;
            if (placingIds.includes(id)) {
                cell.classList.add("can-place");
            }
        });
    }

    emptyUnitFields();
    renderUnits();
    renderStatistics();
    if (selectedUnit && isInPlacingPhase) {
        renderStartPlacings();
    }
    if (selectedUnit && !isInPlacingPhase) {
        renderSelectedPlacings();
    }
}