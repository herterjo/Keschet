var isInPlacingPhase = true;
function selectStartingUnit(id) {
	var clickedUnit = getUnitByName(id);
	if (!clickedUnit || clickedUnit.pos) {
		return;
	}
	if (clickedUnit.controllingPlayer !== currentPlayer) {
		return;
	}
	selectedUnit = clickedUnit;
	renderCycle();
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
	renderCycle();
    var allHavePos = units.every(function (u) {return u.pos;});
    if (allHavePos) {
        isInPlacingPhase = false;
		currentClickFunc = function() {};
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
	var pos = getPos(id);
	unit.pos = pos;
}