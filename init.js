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
        addFigureTd(getUnitByName("thief0P" + i), tr);
        addFigureTd(getUnitByName("thief1P" + i), tr);
        figuresTable.appendChild(tr);
        tr = document.createElement("tr");
        addFigureTd(getUnitByName("thief2P" + i), tr);
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

function addFigureTd(unit, tr) {
    var td = document.createElement("td");
    td.classList.add("home-field");
    td.id = unit.name;
    td.innerText = unit.type;
    td.addEventListener("click", function(evt) { onCellClick(evt.target.id); });
    tr.appendChild(td);
    return tr;
}

function initUnits() {
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
}

function getUnit(name, type, controllingPlayer) {
	return {name: name, type: type, controllingPlayer: controllingPlayer, pos: null};
}