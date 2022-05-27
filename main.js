var selectedUnit = null;
var currentClickFunc = null;
var turnNumber = 0;

window.onload = function() {
	initField();
	renderCycle();
	currentClickFunc = selectStartingUnit;
};

function onCellClick(id) {
	if (!currentClickFunc || !id) {
		return;
	}
	currentClickFunc(id);
}

function unselectUnit() {
	selectedUnit = null;
	placingIds = [];
	canBeTakenIds = [];
	renderCycle();
	currentClickFunc = isInPlacingPhase ? selectStartingUnit : selectBoardUnit;
}

//Debugging
function placeRandom() {
	turnNumber = playerCount;
	for (var i = 0; i < units.length; i++) {
		var id;
		do {
			var x = Math.floor(Math.random() * fieldDimensions);
			var y = Math.floor(Math.random() * fieldDimensions);
			id = getId(x, y);
		} while(!isId(id) || !canPlaceStartingUnit(id))
		units[i].pos = getPos(id);
	}
	isInPlacingPhase = false;
	currentClickFunc = selectBoardUnit;
	renderCycle();
}