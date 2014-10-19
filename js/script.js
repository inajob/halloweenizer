$(function(){
  // init
  var fileInput = document.getElementById('fileInput');
  var canvas = document.getElementById('resultCanvas');
  var canvasOut = document.getElementById('afterCanvas');
  var ctx = canvas.getContext("2d");
  var ctxAfter = canvasOut.getContext("2d");
  fileInput.onchange = function() {
    var file = fileInput.files[0];
    new MegaPixImage(file).render(canvas, { width: 640 });
  };

  $('#halloweenize').click(function(){
    var w = $(canvas).width();
    var h = $(canvas).height();

    canvasOut.width = w;
    canvasOut.height = h;

    var image;
    var pixel;
    var r,g,b;
    image = ctx.getImageData(0,0,w,h); // get 1px
    for(var x = 0; x < w; x ++){
      for(var y = 0; y < h; y ++){
        r = image.data[(x + y * w) * 4]; // 0-255
        g = image.data[(x + y * w) * 4 + 1];
        b = image.data[(x + y * w) * 4 + 2];

        if(g > (r + b)/2){
          // green
          ctxAfter.fillStyle = 'rgb(' + 0 + ',' + (g) +',' + 0+ ')';
        }else if(r > (g + b)/2){
          // red -> orange
          ctxAfter.fillStyle = 'rgb(' + r + ',' + Math.max(r/2,(r+g+b)/2/3|0) +',' + 0+ ')';
        
        }else{
          if((r+g+b)/3 > 100){
            // lighter
            ctxAfter.fillStyle = 'rgb(' + r/2 + ',' + r + ',' + 0 + ')';
          }else{
            // darken
            ctxAfter.fillStyle = 'rgb(' + g + ',' + g + ',' + g + ')';
          }
        }
        ctxAfter.fillRect(x,y,1,1);
      }
    }
    $('#link').attr('href', canvasOut.toDataURL())
  });

  $('#tot').click(function(){
    var size = 70;
    ctxAfter.font = size + "px 'BradleyHandITCTT-Bold'";
    ctxAfter.fillStyle = 'black';
    ctxAfter.fillText("Trick or Treat?", 0, size);
    ctxAfter.strokeStyle = 'white';
    ctxAfter.strokeText("Trick or Treat?", 0, size);
    $('#link').attr('href', canvasOut.toDataURL())
  });
});
