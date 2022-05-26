var selectedUnit = null;
var currentClickFunc = null;
var turnNumber = 0;

window.onload = function() {
	initField();
	currentClickFunc = selectStartingUnit;
};

function onCellClick(id) {
	if (!currentClickFunc || !id) {
		return;
	}
	currentClickFunc(id);
}
