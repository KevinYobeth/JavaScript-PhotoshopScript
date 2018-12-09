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

if (layer.kind == 'LayerKind.TEXT') {

    var loc = new File("c:/Users/Kevin Claudine/Desktop/Certificate/list.txt");
   
    loc.open('r');
    var str = "";
    var counter = 1;
    while (!loc.eof){

        str = loc.readln();
        layer.textItem.contents = str;
        saveJPEG( app.activeDocument, new File('Export/' + str + '.jpg'), 12 );
        counter++;
       
    }

    loc.close();

};  