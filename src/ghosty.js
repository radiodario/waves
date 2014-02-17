var height = window.innerHeight - 20;
var width = window.innerWidth - 20;
var margin = 800;

var ghostyUrl= 'https://dl.dropboxusercontent.com/u/5746285/ghosty.png'




var ghost = new Image()
ghost.src = ghostyUrl;

var frameCount = 0;
var iterations = 0;
var mouseX = 0;
var mouseY = 0;

var w = 10;
var r = 20;
var g = 20;
var b = 20;

function mapR(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

var container = document.querySelector('.background');
container.style.height = height + 'px';
container.style.width = width + 'px';

var canvas = document.createElement('canvas');
canvas.height = height;
canvas.width = width;
container.appendChild(canvas);

var ctx = canvas.getContext('2d');


function drawRect(x , y) {
  

  // var rgb = 'rgba(' + r +', '+ g +', '+ b + ', 0.71)';
  // ctx.fillStyle = rgb;
  
  
  // ctx.beginPath();
  // ctx.lineTo(x + w/2 + 0.5, y + 0.5      );
  // ctx.lineTo(x + 0.5,       y + w   + 0.5);
  // ctx.lineTo(x - w   + 0.5, y + w   + 0.5);
  // ctx.lineTo(x - w/2 + 0.5, y + 0.5      );
  // ctx.closePath();

  
  // ctx.fill();

  // ctx.stroke();

  ctx.drawImage(ghost, x-margin, y);
  
}




canvas.addEventListener('mousemove', function(event) {
  mouseX = event.offsetX
  mouseY = event.offsetY

});

function calculateX() {
  return frameCount+iterations;
}

function calculateY() {
  var angle = mapR(frameCount, 0, height, 0, 2*Math.PI);
  
  return height/2 - (Math.cos(angle)*height/3)
}


function fade() {
  var opacity = Math.random();
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(" + 0 + ',' + 0 + ',' + 0 + ',' + 0.051 +" )";
  ctx.fill();

}

var particleSystem = function() {
 
  var particles = [];
  var max_particles = 10000;
  
  return {
    drawParticles : function() {
       ctx.beginPath();


      for (var i = 0, len = particles.length; i < len; i++) {
        if (i == 0) {}
          ctx.moveTo(particles[i][0], particles[i][1]);
        
        ctx.lineTo(
          particles[i][0]+mapR(Math.random(), 0, 1, -w, w), 
          particles[i][1]+mapR(Math.random(), 0, 1, -w, w)
          );
       
        // drawRect(particles[i][0], particles[i][1]);

      }
      // ctx.closePath();
      ctx.strokeStyle = '#fadfda';
      ctx.stroke();

    },
    
    updateParticles: function() {
      if (particles.length < max_particles) {
        this.addParticle(frameCount%width,calculateY());
      }
      for (var i = 0; i < particles.length; i++) {
        if (particles[i][0]>= 0) {
          particles[i][0]-= 10;
        } else {
          particles.splice(i, 1);
        }
      }
      
    },
    
    addParticle: function(x, y) {

      particles.push([width, y]);
    }
    
  }
  
}

system = particleSystem();
system.updateParticles();

var opacity = 0;


function animate() {
  fade();

  opacity += 0.1;
  container.style.opacity = opacity / 100;


  w = 10 * Math.random()

  system.drawParticles();
  system.updateParticles();

  r = Math.ceil(mapR(frameCount,0, width, 0 , 255));
  g = Math.ceil(mapR(frameCount,0, width, 0 , 255));
  b = Math.ceil(mapR(frameCount,0, width, 0 , 255));
  
  frameCount+= 6;


  var x = calculateX();
  var y = mapR(calculateY(), 100, 600, 0, height);
  // drawRect(x, y);
 
  if (iterations > width)
    iterations = 1;
  // if (frameCount > width + margin*2) {
  //   iterations += 1;
  //   frameCount = iterations;
  // }

  requestAnimationFrame(animate);
}

var requestID = window.requestAnimationFrame(animate);

