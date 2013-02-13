    /*
      Changes to poppler.js from test runner:
        * remove last 3 lines, of prepare-run-print
      Fixes after closure compiler:
        * replace TOTAL_STACK with 1024*1024
    */

    // Wrapper around Poppler
    function pdf_to_image(data) {
      _STDIO.prepare('input.pdf', data);
      run(['-scale-to', '800', '-f', '1', '-l', '1', 'input.pdf', 'filename']);
      var ppm = _STDIO.streams[_STDIO.filenames['*s-0*d.']].data;

      // Convert ppm
      var image = {};
      var str = intArrayToString(ppm.slice(100));
      var m = /^P6\n(\d+) (\d+)\n255\n.*/.exec(intArrayToString(ppm));
      if (!m) {
        alert('Output does not seem valid: ' + ppm.slice(0,100));
        throw 'fail';
      }
      image.width = m[1];
      image.height = m[2];
      var dataIndex = -1;
      for (var i = 0; i < 3; i++) {
        dataIndex = ppm.indexOf(10, dataIndex+1);
      }
      image.data = ppm.slice(dataIndex+1); // not terribly memory efficient

      return image;
    }

    // print function which the runtime will call. We figure out the image dimensions from there
    function print(text) {
      document.getElementById('output').innerHTML += text + '<br>';
    }

    function render(url) {
      // Demo image by default
      var data = DEMO_FILE;

      // If given a URL, fetch it
      if (url && url[0] != '(') {
        try {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.send(null);
          var buffer = xhr.mozResponseArrayBuffer;
          if (buffer) data = new Uint8Array(buffer);
        } catch(e) {
          alert('Could not load URL: ' + e);
          return;
        }
      }

      document.getElementById('output').innerHTML = '';

      var image = pdf_to_image(data);

      if (image.data.length != image.height*image.width*3) {
        alert('Image sizes are not valid: ' + [image.data.length, image.height, image.width*3]);
        throw 'fail';
      }

      var canvas = document.getElementById('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      var ctx = canvas.getContext('2d');
      var canvasImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
          var base = (y*canvas.width + x)*4;
          var base2 = (y*canvas.width + x)*3;
          canvasImage.data[base + 0] = image.data[base2 + 0];
          canvasImage.data[base + 1] = image.data[base2 + 1];
          canvasImage.data[base + 2] = image.data[base2 + 2];
          canvasImage.data[base + 3] = 255;
        }
      }
      ctx.putImageData(canvasImage, 0, 0);
    }