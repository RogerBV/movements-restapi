function uploadDocument (objReader, request, response) {
    try {
        if (!request.files) {
            return response.status(500).send({ msg: "file is not found" })
        }
        // accessing the file
        const myFile = request.files.file;
        
        myFile.mv(`${objReader.directoryName}${objReader.path}${myFile.name}`, function (err) {
            if (err) {
                console.log(err)
                return response.status(500).send({ msg: "Error occured" });
            } else {
                objReader.readDocument(myFile.name, request.body.cardId);
            }
            // returing the response with file path and name
            return response.send({name: myFile.name, path: `/${myFile.name}`});
        });

    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    uploadDocument: uploadDocument,
}