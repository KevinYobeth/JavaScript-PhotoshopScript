if (app.documents.length > 0) {
    var myDocument = app.activeDocument;
    var theName = myDocument.name.match(/(.*)\.[^\.]+$/)[1];
    var thePath = myDocument.path;
    var theLayer = myDocument.activeLayer;

    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;

    if (theLayer.kind != "LayerKind.SMARTOBJECT") {
        alert("selected layer is not a smart object")
    } else {
        if ($.os.search(/windows/i) != -1) {
            var theFiles = File.openDialog("please select files", "*.psd;*.tif;*.jpg", true)
        } else {
            var theFiles = File.openDialog("please select files", getFiles, true)
        };
        if (theFiles) {
            for (var m = 0; m < theFiles.length; m++) {

                theLayer = replaceContents(theFiles[m], theLayer);
                var theNewName = theFiles[m].name.match(/(.*)\.[^\.]+$/)[1];

                myDocument.saveAs((new File(thePath + "/" + (m + 1) + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            }
        }
    }
};

function getFiles(theFile) {
    if (theFile.name.match(/\.(psd|tif|jpg)$/i) != null || theFile.constructor.name == "Folder") {
        return true
    };
};

function replaceContents(newFile, theSO) {
    app.activeDocument.activeLayer = theSO;

    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc3.putPath(idnull, new File(newFile));
    var idPgNm = charIDToTypeID("PgNm");
    desc3.putInteger(idPgNm, 1);
    executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
    return app.activeDocument.activeLayer
};