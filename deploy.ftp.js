 var Client = require('ftp');
 var fs = require('fs');

  //  rmDir = function(dirPath, removeSelf) {
  //   if (removeSelf === undefined)
  //     removeSelf = true;
  //   try { var files = fs.readdirSync(dirPath); }
  //   catch(e) { return; }
  //   if (files.length > 0)
  //     for (var i = 0; i < files.length; i++) {
  //       var filePath = dirPath + '/' + files[i];
  //       if (fs.statSync(filePath).isFile())
  //         fs.unlinkSync(filePath);
  //       else
  //         rmDir(filePath);
  //     }
  //   if (removeSelf)
  //     fs.rmdirSync(dirPath);
  // };

  // createHtaccess = function(dirPath) {

  //   var stream = fs.createWriteStream(dirPath+'/hello.txt');
  //   stream.once('open', function(fd) {
  //     stream.write('Options +FollowSymLinks\n');
  //     stream.write('RewriteEngine on\n');
  //     stream.write('php_value date.timezone America/Kentucky/Louisville\n');
  //     stream.end();
  //   });
  //   console.log('htaccess was created [ x ]');

  // };
 
  var c = new Client();
  var pathofDir = '/reddy-dental.com/www/';
  c.on('ready', function() {

    c.put('dist', pathofDir, function(err) {
      if (err) {
        console.log(err);
      };
    });
    c.end();


    // c.cwd(pathofDir, function(err, currentDir) {
    //   c.put('dist', currentDir, function(err) {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    //   c.end();


    //   c.list(function(err,list) {
       
    //     //rmDir(pathofDir, false);
    //     //createHtaccess(pathofDir);

    //     console.dir(list);
    //     c.end();
    //   })
    // });


  });
  // connect to localhost:21 as anonymous 
  c.connect({
    host: '23.253.216.27',
    user: 'vest',
    secure: true,
    pasvTimeout: 20000,
    keepalive: 20000,
    secureOptions: { rejectUnauthorized: false },
    password: 'Ouliufo3'
  });

