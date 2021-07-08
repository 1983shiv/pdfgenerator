var fs = require('fs')
// const fs = require('fs');
// const JSZip = require("jszip");
// import JSZip from 'jszip'


export default doczip = async () => {

    // var path = 'C:/Work/vuejs/hitch/makedoc/download';
    fs.writeFile('download/mynewfile3.txt', 'This is my text', function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });

    // Initialise the zip file
    // const zip = new JSZip();

    // Make a new text file with the text Hello World
    // zip.file(`${this.heading}.pdf`, doc);

    // Make a new folder called images with a picture called shapes
    // const documents = zip.folder("documents");
    // zip.folder("filder").file("hello.txt", "Hello World\n");

    // // Convert the zip file into a buffer
    // const content = await zip.generateAsync({ type: "nodebuffer" });

    

    // // Save the zip file
    // fs.writeFileSync("example.zip", content);

})();
