function saveJPEG( doc, saveFile, qty ) {  
    var saveOptions = new JPEGSaveOptions( );  
    saveOptions.embedColorProfile = true;  
    saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
    saveOptions.matte = MatteType.NONE;  
    saveOptions.quality = qty;   
    doc.saveAs( saveFile, saveOptions);  
}

var layer = activeDocument.layers[0];
app.displayDialogs = DialogModes.NO;

var start = 201;
var end = 250;

if (layer.kind == 'LayerKind.TEXT') {
    for (var i = start; i <= end; i++) {

        var number;

        if (i < 10){
            number = "000" + i;
        } else if (i < 100){
            number = "00" + i;
        } else if (i < 1000){
            number = "0" + i;
        } else {
            number = i;
        }

    layer.textItem.contents = number.toString();
    
    saveJPEG( app.activeDocument, new File('Export/' + number + '.jpg'), 12 );
    };
};  