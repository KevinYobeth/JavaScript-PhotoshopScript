function saveJPEG(doc, saveFile, qty) {
    var saveOptions = new JPEGSaveOptions();
    saveOptions.embedColorProfile = true;
    saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    saveOptions.matte = MatteType.NONE;
    saveOptions.quality = qty;
    doc.saveAs(saveFile, saveOptions);
}

var nameLayer = activeDocument.layers[0];
var scoreLayer = activeDocument.layers[1];
app.displayDialogs = DialogModes.NO;

if (nameLayer.kind == 'LayerKind.TEXT') {

    var listName = new File("C:/Users/Kevin Claudine/Desktop/DIKLAT/name.txt");
    var listScore = new File("C:/Users/Kevin Claudine/Desktop/DIKLAT/score.txt");

    listName.open('r');
    listScore.open('r');

    var nama = "";
    var score = "";
    var counter = 1;

    while (!listName.eof && !listScore.eof) {

        nama = listName.readln();
        score = listScore.readln();

        //alert(nama);

        nameLayer.textItem.contents = nama;
        scoreLayer.textItem.contents = score;

        saveJPEG(app.activeDocument, new File('Export/' + nama + '.jpg'), 12);
        counter++;

    }

    alert(counter + " Exported");

    listName.close();
    listScore.close();

}

