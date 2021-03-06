var formidable = require("formidable");
var fs = require("fs");

function start(response){
    console.log("request handler 'start' is called");

    //exec("ls -lah", function (error, stdout, stderr) {
    //    response.writeHead(200, {"Content-Type": "text/plain"});
    //    response.write(stdout);
    //    response.end();
    //});

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';


    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function upload(response, request){
    console.log("request handler 'upload' is called");
    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.write(querystring.parse(postData).text);
    //response.end();
    var form = new formidable.IncomingForm();

    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "C:/tmp/test.jpg");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("C:/tmp/test.jpg", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;