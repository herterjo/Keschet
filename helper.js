const idDivider = "_";
const unitTypes = {
	emperor: "Emperor",
	general: "General",
	scholar: "Scholar",
	merchant: "Merchant",
	thief: "Thief",
	lancer: "Lancer",
	archer: "Archer",
	spearman: "Spearman"
};
const playerCount = 2;
const fieldDimensions = 10;
const placingFieldLimit = 3;
const placingTurnLimit = 1;

var currentPlayer = 0;
var units = [];

for (var i = 0; i < playerCount; i++) {
    units.push(getUnit("emperor0P" + i, unitTypes.emperor, i));
	units.push(getUnit("general0P" + i, unitTypes.general, i));
	units.push(getUnit("scholar0P" + i, unitTypes.scholar, i));
	units.push(getUnit("merchant0P" + i, unitTypes.merchant, i));
	units.push(getUnit("merchant1P" + i, unitTypes.merchant, i));
	units.push(getUnit("thief0P" + i, unitTypes.thief, i));
	units.push(getUnit("thief1P" + i, unitTypes.thief, i));
	units.push(getUnit("thief2P" + i, unitTypes.thief, i));
	units.push(getUnit("lance0P" + i, unitTypes.lancer, i));
	units.push(getUnit("lance1P" + i, unitTypes.lancer, i));
	units.push(getUnit("lance2P" + i, unitTypes.lancer, i));
	units.push(getUnit("lance3P" + i, unitTypes.lancer, i));
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
	return {
		x: Number.parseInt(positions[0]),
		y: Number.parseInt(positions[1])
	};
}

function getUnit(name, type, controllingPlayer) {
	return {name: name, type: type, controllingPlayer: controllingPlayer, pos: null};
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