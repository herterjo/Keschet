const idDivider = "_";
const unitTypes = {
	emperor: "Emperor",
	general: "General",
	scholar: "Scholar",
	merchant: "Merchant",
	thieve: "Thieve",
	lance: "Lancer",
	archer: "Archer",
	spearman: "Spearman"
};
const playerCount = 2;
const fieldDimensions = 10;
const placingFieldLimit = 3;
const placingTurnLimit = 2;

var currentPlayer = 0;
var units = [];

for (var i = 0; i < playerCount; i++) {
    units.push(getUnit("emperor0P" + i, unitTypes.emperor, i));
	units.push(getUnit("general0P" + i, unitTypes.general, i));
	units.push(getUnit("scholar0P" + i, unitTypes.scholar, i));
	units.push(getUnit("merchant0P" + i, unitTypes.merchant, i));
	units.push(getUnit("merchant1P" + i, unitTypes.merchant, i));
	units.push(getUnit("thieve0P" + i, unitTypes.thieve, i));
	units.push(getUnit("thieve1P" + i, unitTypes.thieve, i));
	units.push(getUnit("thieve2P" + i, unitTypes.thieve, i));
	units.push(getUnit("lance0P" + i, unitTypes.lance, i));
	units.push(getUnit("lance1P" + i, unitTypes.lance, i));
	units.push(getUnit("lance2P" + i, unitTypes.lance, i));
	units.push(getUnit("lance3P" + i, unitTypes.lance, i));
	units.push(getUnit("archer0P" + i, unitTypes.archer, i));
	units.push(getUnit("archer1P" + i, unitTypes.archer, i));
	units.push(getUnit("archer2P" + i, unitTypes.archer, i));
	units.push(getUnit("archer3P" + i, unitTypes.archer, i));
	units.push(getUnit("archer4P" + i, unitTypes.archer, i));
	units.push(getUnit("spearman0P" + i, unitTypes.spearman, i));
	units.push(getUnit("spearman1P" + i, unitTypes.spearman, i));
	units.push(getUnit("spearman2P" + i, unitTypes.spearman, i));
	units.push(getUnit("spearman3P" + i, unitTypes.spearman, i));
	units.push(getUnit("spearman4P" + i, unitTypes.spearman, i));
	units.push(getUnit("spearman5P" + i, unitTypes.spearman, i));
    units.push(getUnit("spearman6P" + i, unitTypes.spearman, i));
	units.push(getUnit("spearman7P" + i, unitTypes.spearman, i));
}

function getId(x, y) {
	if (isId(x)) {
		return x;
	}
	if (!Number.isInteger(x)) {
		y = x.y;
		x = x.x;
	}
	return x + idDivider + y;
}

function idEquals(first, second) {
	return getId(first) === getId(second);
}

function getPos(id) {
    if (typeof id !== typeof "") {
        return id;
    }
	var positions = id.split(idDivider);
	return {x: positions[0], y: positions[1]};
}

function addFigureTd(unit, tr) {
    var td = document.createElement("td");
    td.classList.add("background-" + getPlayerColor(unit.controllingPlayer));
    td.classList.add("home-field");
    td.id = unit.name;
    td.innerText = unit.type;
    td.addEventListener("click", function(evt) { onCellClick(evt.target.id); });
    tr.appendChild(td);
    return tr;
}

function initField() {
    var playinghField = document.getElementById("playingField");
	for (var y = 0; y < fieldDimensions; y++){
		var tr = document.createElement("tr");
		for (var x = 0; x < fieldDimensions; x++){
			var td = document.createElement("td");
			td.id = getId(x, y);
			td.addEventListener("click", function(evt) { onCellClick(evt.target.id); });
			tr.appendChild(td);
		}
		playinghField.appendChild(tr);
	}

    for (var i = 0; i < playerCount; i++) {
        var figuresTable = document.getElementById("figuresP" + i);
        var tr = document.createElement("tr");
        addFigureTd(getUnitByName("emperor0P" + i), tr);
        addFigureTd(getUnitByName("general0P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("scholar0P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("merchant0P" + i), tr);
        addFigureTd(getUnitByName("merchant1P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("thieve0P" + i), tr);
        addFigureTd(getUnitByName("thieve1P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("thieve2P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("lance0P" + i), tr);
        addFigureTd(getUnitByName("lance1P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("lance2P" + i), tr);
        addFigureTd(getUnitByName("lance3P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("archer0P" + i), tr);
        addFigureTd(getUnitByName("archer1P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("archer2P" + i), tr);
        addFigureTd(getUnitByName("archer3P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("archer4P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("spearman0P" + i), tr);
        addFigureTd(getUnitByName("spearman1P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("spearman2P" + i), tr);
        addFigureTd(getUnitByName("spearman3P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("spearman4P" + i), tr);
        addFigureTd(getUnitByName("spearman5P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("spearman6P" + i), tr);
        addFigureTd(getUnitByName("spearman7P" + i), tr);
        figuresTable.appendChild(tr);
    }
}

function getPlayerColor(player) {
	return "p-" + player;
}

function getUnit(name, type, controllingPlayer) {
	return {name: name, type: type, controllingPlayer: controllingPlayer, pos: null};
}

function setNextPlayer() {
	currentPlayer = (currentPlayer + 1) % playerCount;
    document.getElementById("player").innerText = currentPlayer + 1;
}

function getUnitByName(name) {
	return units.find(function(u) {return name === u.name; });
}

function getUnitByPlace(id) {
	return units.find(function(u) {return u.pos && idEquals(id, u.pos); });
}

function isId(id) {
    if (typeof id !== typeof "") {
        return false;
    }
    var splitted = id.split(idDivider);
    if (splitted.length !== 2) {
        return false;
    }
    return isInFieldSingle(splitted[0])
        && isInFieldSingle(splitted[1])
}

function isInFieldSingle(x) {
    var parsed = Number.parseInt(x);
    return Number.isInteger(parsed) && parsed >= 0 && parsed < fieldDimensions;
}

function addTurn() {
    turnNumber++;
    document.getElementById("turn").innerText = turnNumber + 1;
}