'use strict';




var wW = window.innerWidth;
var wH = window.innerHeight;


function SoundMeter(context) {
  this.context = context;
  this.instant = 0.0;
  this.slow = 0.0;
  this.clip = 0.0;
  this.script = context.createScriptProcessor(2048, 1, 1);
  var that = this;
  this.script.onaudioprocess = function(event) {
    var input = event.inputBuffer.getChannelData(0);
    var i;
    var sum = 0.0;
    var clipcount = 0;
    for (i = 0; i < input.length; ++i) {
      sum += input[i] * input[i];
      if (Math.abs(input[i]) > 0.99) {
        clipcount += 1;
      }
    }
  



    

    var vol_init = Math.sqrt(sum / input.length)
    var vol_circle = vol_init * 6.5;
    var vol_inner_circle = vol_init * 10;
    var vol_outer_circle = vol_init * 20;

    var vol = vol_init * 10000;
    draw(vol)



    // TEXT
    // if (vol_init > 0.05 && vol_init < 0.1) {
    //   $('.ears, .pen').css({
    //       'color':  '#f1818a',
    //       '-webkit-text-stroke-width': '1px',
    //       '-webkit-text-stroke-color': 'black'
    //   });
    // } else 
    if (vol_init > 0.15) {
      $('.ears, .pen').css({
          'color':  '#f1818a',
          // '-webkit-text-stroke-width': '0px',
      });
    } else {
      $('.ears, .pen').css({
        'color':  '#283885',
      });
    }

    // CIRCLES
    $('.circle_inner').css('transform', 'scale(' + vol_inner_circle + ')' );
    $('.circle_outer').css('transform', 'scale(' + vol_outer_circle + ')' );

    if (vol_circle < 0.075) {
      $('.circle').css('transform', 'scale(0.7)' );
    } else {
      $('.circle').css('transform', 'scale(' + vol_circle + ')' );
    }

    if (vol_init > 0.15) {
      $('body').css('background-color', '#283885')
    } else if (vol_init > 0.2) {
      $('body').css('background-color', 'white')
    } else {
      $('body').css('background-color', '#f1818a')
    }
  };
}

SoundMeter.prototype.connectToSource = function(stream, callback) {
  console.log('SoundMeter connecting');
  try {
    this.mic = this.context.createMediaStreamSource(stream);
    this.mic.connect(this.script);
    this.script.connect(this.context.destination);
    if (typeof callback !== 'undefined') {
      callback(null);
    }
  } catch (e) {
    console.error(e);
    if (typeof callback !== 'undefined') {
      callback(e);
    }
  }
};
SoundMeter.prototype.stop = function() {
  this.mic.disconnect();
  this.script.disconnect();
};





function setup() {
  createCanvas(windowWidth, windowHeight);
}


var centerW = wW / 2;
var centerH = wH / 2;

function draw(vol) {

  if (vol > 1500) {
   clear()
  }



  var c_bg = color(241, 129, 138);
  var c_fg = color(235, 235, 235);

  fill(c_fg);
  noStroke();

  if (vol > 200) {
    ellipse(randomNum(0,wW), randomNum(0,wH), 200);
  }


}


function mousePressed() {
  clear();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}








