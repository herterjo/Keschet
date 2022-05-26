function selectStartingUnit(id) {
	var clickedUnit = getUnitByName(id);
	if (!clickedUnit || clickedUnit.pos) {
		return;
	}
	if (clickedUnit.controllingPlayer !== currentPlayer) {
		return;
	}
	selectedUnit = clickedUnit;
    document.getElementById(id).classList.remove("background-" + getPlayerColor(selectedUnit.controllingPlayer));
	currentClickFunc = placeStartingUnit;
}

function placeStartingUnit(id) {
	if (!selectedUnit) {
		alert("Error, no unit selected");
		return;
	}
	if (!isId(id) || !canPlaceStartingUnit(id)) {
		return;
	}
	
	placeUnit(selectedUnit, id);
    var originalElem = document.getElementById(selectedUnit.name);
    originalElem.removeEventListener("click", onCellClick);
    selectedUnit = null;
	setNextPlayer();
	addTurn();
    var allHavePos = units.every(function (u) {return u.pos;});
    if (allHavePos) {
        
    } else {
        currentClickFunc = selectStartingUnit;
    }
}

function canPlaceStartingUnit(id) {
	var selectedField = getUnitByPlace(id);
	if (selectedField) {
		return false;
	}
	if (turnNumber >= placingTurnLimit * playerCount) {
		return true;
	}
	var pos = getPos(id);
	return currentPlayer === 0 && pos.y < placingFieldLimit 
		|| currentPlayer === 1 && pos.y > (fieldDimensions - placingFieldLimit - 1);
}

function placeUnit(unit, id) {
    removeUnit(unit);

	var pos = getPos(id);
	unit.pos = pos;
	var htmlId = getId(id);
	document.getElementById(htmlId).classList.add("background-" + getPlayerColor(unit.controllingPlayer));
	document.getElementById(htmlId).innerText = unit.type;
}

function removeUnit(unit) {
    if (!unit.pos) {
        return;
    }
    var oldId = getId(unit.pos);
	var oldElement = document.getElementById(oldId);
	if (oldElement) {
		oldElement.classList.remove("background-" + getPlayerColor(unit.controllingPlayer));
		oldElement.innerText = null;
	}
}