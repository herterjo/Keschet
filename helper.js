var currentPlayer = 0;
var units = [];

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
	return {
		x: Number.parseInt(positions[0]),
		y: Number.parseInt(positions[1])
	};
}

function setNextPlayer() {
	currentPlayer = (currentPlayer + 1) % playerCount;
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
}