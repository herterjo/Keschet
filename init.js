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