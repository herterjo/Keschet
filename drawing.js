var placingIds = [];
var canBeTakenIds = [];

function getPossibleMoves(unit) {
    const emperorDistance = 4;
    const generalDistance = 10;
    const scholarDistance = 2;
    const archerDistance = 6;
    const thiefDistance = 1;
    const spearmanDistance = 2;
    const lancerDistance = 10;
    const merchantDistance = 10;
    const scholarProtectionDistance = 1;
    const merchantToEmperorDistance = 1;
    function isPosOnField(pos) {
        return pos && isCoordOnField(pos.x) && isCoordOnField(pos.y);
    }

    function isCoordOnField(coord) {
        return coord >= 0 && coord < fieldDimensions;
    }

    function getStandardMoves(unit, range, vertical, horizontal, diagonal) {
        var ret = {standard: [], taking: []};
        var pos = unit.pos;
        if (!pos) {
            return ret;
        }

        if (vertical) {
            ret = addMoves(unit.controllingPlayer, pos, range, 0, 1, ret);
            ret = addMoves(unit.controllingPlayer, pos, range, 0, -1, ret);
        }

        if (horizontal) {
            ret = addMoves(unit.controllingPlayer, pos, range, 1, 0, ret);
            ret = addMoves(unit.controllingPlayer, pos, range, -1, 0, ret);
        }

        if (diagonal) {
            ret = addMoves(unit.controllingPlayer, pos, range, 1, 1, ret);
            ret = addMoves(unit.controllingPlayer, pos, range, -1, -1, ret);
            ret = addMoves(unit.controllingPlayer, pos, range, 1, -1, ret);
            ret = addMoves(unit.controllingPlayer, pos, range, -1, 1, ret);
        }
        ret.standard = ret.standard.filter(isPosOnField);
        ret.taking = ret.taking.filter(isPosOnField);
        return ret;
    }

    function concatMoves(first, second){
        return {
            standard: distinctPositions(first.standard.concat(second.standard)),
            taking: distinctPositions(first.taking.concat(second.taking))
        };
    }

    function distinctPositions(positions) {
        return positions.reduce(function(prev, curr) {
            if (!prev.some(function(pos){
                return idEquals(pos, curr);
            })) {
                prev.push(curr);
            }
            return prev;
        }, []);
    }

    function addMoves(controllingPlayer, pos, range, xMod, yMod, orig) {
        var newMoves = getMovesSingle(controllingPlayer, pos, range, xMod, yMod);
        return concatMoves(orig, newMoves);
    }

    function getMovesSingle(controllingPlayer, pos, range, xMod, yMod) {
        var standardMoves = [];
        var takingMoves = [];
        for (var i = 1; i <= range; i++) {
            var x = pos.x + (xMod * i);
            var y = pos.y + (yMod * i);
            var id = getId(x, y);
            var occupyingUnit = getUnitByPlace(id);
            if (!occupyingUnit) {
                standardMoves.push({x: x, y: y});
            }
            if (occupyingUnit.controllingPlayer === controllingPlayer) {
                break;
            }
            if (!isProtected(x, y, occupyingUnit.controllingPlayer)) {
                takingMoves.push({x: x, y: y});
            }
            break;
        }
        return {standard: standardMoves, taking: takingMoves};
    }

    function isProtected(x, y, player) {
        for (let i = 1; i <= scholarProtectionDistance; i++) {
            var isDistanceProtected = isOwnScholar(x, y + i, player)
                && isOwnScholar(x, y - i, player)
                && isOwnScholar(x + i, y, player)
                && isOwnScholar(x - i, y, player)
                && isOwnScholar(x + i, y + i, player)
                && isOwnScholar(x - i, y - i, player)
                && isOwnScholar(x + i, y - i, player)
                && isOwnScholar(x - i, y + i, player);
            if (isDistanceProtected) {
                return true;
            }
        }
        return false;
    }

    function isOwnScholar(x, y, searchedPlayer) {
        var unit = getUnitByPlace(getId(x, y));
        return unit 
            && unit.controllingPlayer === searchedPlayer 
            && unit.type === unitTypes.scholar;
    }

    function getAdditionalToEmperorMoves(unit) {
        var ret = {standard: [], taking: []};
        var pos = unit.pos;
        if (!pos) {
            return ret;
        }
        var emperor = units.find(function(u) {
            return u.type === unitTypes.emperor 
                && u.controllingPlayer === unit.controllingPlayer
                && u.pos;
        });
        if (!emperor) {
            return ret;
        }
        var adjacentToEmperor = getStandardMoves(emperor, merchantToEmperorDistance, true, true, true);
        adjacentToEmperor.standard = adjacentToEmperor.standard.filter(function(adjPos){
            return isInUnobstructedLine(pos, adjPos, unit.controllingPlayer);
        });
        adjacentToEmperor.taking = adjacentToEmperor.taking.filter(function(adjPos){
            return isInUnobstructedLine(pos, adjPos, unit.controllingPlayer);
        });
    }

    function isInUnobstructedLine(startingPos, endPos, controllingPlayer) {
        var deltaX = startingPos.x - endPos.x;
        var deltaY = startingPos.x - endPos.y;
        if (deltaX !== 0 && deltaY !== 0 && Math.abs(deltaX) !== Math.abs(deltaY)) {
            return false;
        }
        var max = Math.max(deltaX, deltaY);
        var xMod = deltaX < 0 ? 1 : -1;
        var yMod = deltaY < 0 ? 1 : -1;
        for (var i = 1; i < max; i++) {
            var checkPos = {x: startingPos.x + (xMod * i), y: startingPos.y + (yMod * i)};
            var unit = getUnitByPlace(checkPos);
            if (unit) {
                return false;
            }
        }
        var unitOnEndPos = getUnitByPlace(endPos);
        return !unitOnEndPos || unitOnEndPos.controllingPlayer !== controllingPlayer;
    }

    switch (unit.type) {
        case unitTypes.emperor:
            return getStandardMoves(unit, emperorDistance, true, true, true);
        case unitTypes.general:
            return getStandardMoves(unit, generalDistance, true, true, true);
        case unitTypes.scholar:
            return getStandardMoves(unit, scholarDistance, true, true, true);
        case unitTypes.archer:
            return getStandardMoves(unit, archerDistance, true, true, false);
        case unitTypes.thief:
            return getStandardMoves(unit, thiefDistance, true, true, true);
        case unitTypes.spearman:
            return getStandardMoves(unit, spearmanDistance, true, true, false);
        case unitTypes.lancer:
            return getStandardMoves(unit, lancerDistance, false, false, true);
        case unitTypes.merchant:
            var merchantMoves = getStandardMoves(unit, merchantDistance, true, true, true);
            var additionalMerchantMoves = getAdditionalToEmperorMoves(unit);
            return concatMoves(merchantMoves, additionalMerchantMoves);
    }
    throw "Piece not implemented";
}