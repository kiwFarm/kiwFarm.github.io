// var space;

// function floatySpace() {
//   var colors = [
//     "#FF3F8E", "#04C2C9", "#2E55C1"
//   ];


//   space = new CanvasSpace("canvas", "#252934" ).display();
//   var form = new Form( space );

//   // Elements
//   var pts = [];
//   var center = space.size.$divide(1.8);
//   var angle = -(window.innerWidth * 0.5);
//   var count = window.innerWidth * 0.05;
//   if (count > 150) count = 150;
//   var line = new Line(0, angle).to(space.size.x, 0);
//   var mouse = center.clone();

//   var r = Math.min(space.size.x, space.size.y) * 1;
//   for (var i=0; i<count; i++) {
//     var p = new Vector( Math.random()*r-Math.random()*r, Math.random()*r-Math.random()*r );
//     p.moveBy( center ).rotate2D( i*Math.PI/count, center);
//     p.brightness = 0.1
//     pts.push( p );
//   }

//   // Canvas
//   space.add({
//     animate: function(time, fps, context) {

//       for (var i=0; i<pts.length; i++) {
//         // rotate the points slowly
//         var pt = pts[i];

//         pt.rotate2D( Const.one_degree / 20, center);
//         form.stroke( false ).fill( colors[i % 3] ).point(pt, 1);

//         // get line from pt to the mouse line
//         var ln = new Line( pt ).to( line.getPerpendicularFromPoint(pt));

//         // opacity of line derived from distance to the line
//         var opacity = Math.min( 0.8, 1 - Math.abs( line.getDistanceFromPoint(pt)) / r);
//         var distFromMouse = Math.abs(ln.getDistanceFromPoint(mouse))

//         if (distFromMouse < 50) {
//           if (pts[i].brightness < 0.3) pts[i].brightness += 0.015
//         } else {
//           if (pts[i].brightness > 0.1) pts[i].brightness -= 0.01
//         }

//         var color = "rgba(255,255,255," + pts[i].brightness +")"
//         form.stroke(color).fill( true ).line(ln);
//       }
//     },

//     onMouseAction: function(type, x, y, evt) {
//       if (type=="move") {
//         mouse.set(x,y);
//       }
//     },

//     onTouchAction: function(type, x, y, evt) {
//       this.onMouseAction(type, x, y);
//     }
//   });

//   space.bindMouse();
//   space.play();
// }

// floatySpace();

// $(window).resize(function(){
//   space.removeAll();
//   $('canvas').remove();
//   floatySpace();
// });





//ThreePixDroid (ромбовая сетка)

// (() => {

//   const cnv  = document.querySelector('canvas');
//   const ctx  = cnv.getContext('2d');

//   let cw, ch, cx, cy;
//   function resizeCanvas() {
//     cw = cnv.width  = innerWidth ;
//     ch = cnv.height = innerHeight;
//     cx = cw / 2;
//     cy = ch / 2;
//   }
//   resizeCanvas();
//   window.addEventListener(`resize`, resizeCanvas);

//   const cfg = {
//     hue         : 200,
//     bgFillColor : `rgba(50,50,50,.0)`,
//     dirsCount   : 4,
//     stepToTurn  : 20,
//     dotSize     : 2,
//     dotsCount   : 300,
//     dotVelocity : 2,
//     distance    : 200,
//     gradientLen : 5,
//     gridAngle   : 45
//   }

//   function drawRect(color, x, y, w, h, shadowColor, shadowBlur, gco) {
//     ctx.globalCompositeOperation = gco;
//     ctx.shadowColor = shadowColor || `black`;
//     ctx.shadowBlur  = shadowBlur  || 1;
//     ctx.fillStyle   = color;
//     ctx.fillRect(x, y, w, h);
//   }

//   class Dot {
//     constructor() {
//       this.pos     = {x: cx, y: cy};
//       this.dir     = cfg.dirsCount === 6 ? (Math.random() * 3 | 0) * 2
//                    : Math.random() * cfg.dirsCount | 0;
//       this.step    = 0;
//     }

//     redrawDot() {
//       let xy       = Math.abs(this.pos.x - cx) + Math.abs(this.pos.y - cy);
//       let makeHue  = (cfg.hue + xy / cfg.gradientLen ) % 360;
//       let color    = `hsl(${ makeHue }, 100%, 50%)`;
//       let blur     = cfg.dotSize - Math.sin(xy / 8) * 2;
//       let size     = cfg.dotSize;// - Math.sin(xy / 9) * 2 + Math.sin(xy / 2);
//       let x        = this.pos.x - size / 2;
//       let y        = this.pos.y - size / 2;

//       drawRect(color, x, y, size, size, color, blur, `lighter`);
//     }

//     moveDot() {
//       this.step++;
//       this.pos.x += dirsList[this.dir].x * cfg.dotVelocity;
//       this.pos.y += dirsList[this.dir].y * cfg.dotVelocity;
//     }

//     changeDir() {
//       if (this.step % cfg.stepToTurn === 0) {
//         this.dir     = Math.random() > 0.5 ? (this.dir + 1) % cfg.dirsCount : (this.dir + cfg.dirsCount - 1) % cfg.dirsCount;
//       }
//     }

//     killDot(id) {
//       let percent = Math.random() * Math.exp(this.step / cfg.distance);
//       if (percent > 100) {
//         dotsList.splice(id, 1);
//       }
//     }
//   }

//   let dirsList = [];
//   function createDirs() {
//     for (let i = 0 ; i < 360 ; i+= 360 / cfg.dirsCount) {
//       let angle = cfg.gridAngle + i;
//       let x = Math.cos(angle * Math.PI / 180);
//       let y = Math.sin(angle * Math.PI / 180);
//       dirsList.push({x: x, y: y});
//     }    
//   }
//   createDirs();

//   let dotsList = [];
//   function addDot() {
//     if (dotsList.length < cfg.dotsCount && Math.random() > .8) {
//       dotsList.push( new Dot() );
//       cfg.hue = (cfg.hue + 1) % 360 ;
//     }
//   }

//   function refreshDots() {
//     dotsList.forEach( (i, id) => { 
//       i.redrawDot();
//       i.moveDot();
//       i.changeDir();
//       i.killDot(id)
//     } );
//   }
// function loop() {
//     drawRect(cfg.bgFillColor, 0, 0, cw, ch, 0, 0, `normal`);
//     addDot();
//     refreshDots();

//     requestAnimationFrame(loop);
//   }
//   loop();

// })();





//ThreePixDroid (круги)

// (() => {
//   const cnv = document.querySelector(`canvas`);
//   const ctx = cnv.getContext(`2d`);

//   function init() {
//     cnv.width  = innerWidth;
//     cnv.height = innerHeight;
//   }
//   init();

//   const numberOfRings     = 6;
//   const ringRadiusOffset  = 7;
//   const ringRadius        = 300;
//   const waveOffset        = 15;
//   const colors            = [`#771111`, `#bb1111`, `#ff1111`, `#771111`, `#bb1111`, `#ff1111`];
//   let startAngle          = 0;

//   function updateRings() {
//     for (let i = 0; i < numberOfRings; i++) {
//       let radius = i * ringRadiusOffset + ringRadius;
//       let offsetAngle = i * waveOffset * Math.PI / 180;
//       drawRing(radius, colors[i], offsetAngle);
//     }

//     startAngle >= 360? startAngle = 0 : startAngle++;
//   }

//   let centerX = cnv.width  / 2;
//   let centerY = cnv.height / 2;

//   const maxWavesAmplitude = 17;
//   const numberOfWaves     = 7;

//   function drawRing(radius, color, offsetAngle) {
//     ctx.strokeStyle = color;
//     ctx.lineWidth   = 4;

//     ctx.beginPath();
    
//     for (let j = -180; j < 180; j++) {
//       let currentAngle  = (j + startAngle) * Math.PI / 180;
//       let displacement  = 0;
//       let now = Math.abs(j);

//       if (now > 70) {
//         displacement = (now - 70) / 70;
//       }

//       if (displacement >= 1) {
//         displacement = 1;
//       }

//       let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
//       let x = centerX + Math.cos(currentAngle) * waveAmplitude;
//       let y = centerY + Math.sin(currentAngle) * waveAmplitude;
//       j > -180? ctx.lineTo(x, y) : ctx.moveTo(x, y);

//     }
//     ctx.closePath();
//     ctx.stroke();
//   }

//   function loop() {
//     cnv.width |= 0; // ctx.clearRect(0, 0, cnv.width, cnv.height);
//     updateRings();
//     requestAnimationFrame(loop);
//   }
//   loop();

//   window.addEventListener(`resize`, init);

// })();



// ThreePixDroid (волны)

(() => {

    const properties = {
        spaceDiameter  : 32,    //диаметр пространства точки
        dotDiameter    : 12,    //диаметр самой точки
        wavelength     : 600,   //длинна волны
        velocity       : .02,   //скорость по умолчанию .02
        direction      : 1,     //направление (1: из центра, -1: в центр)
        displacement   : 1      //смещение (0: отключить, 1: включить)
    }

    const canvas = document.querySelector('canvas');        //создаём Canvas
    const ctx = canvas.getContext('2d');                    //получаем контекст

    let w = canvas.width = innerWidth;                      //ширина равна ширине области просмотра
    let h = canvas.height = innerHeight;                    //высота равна высоте области просмотра

    let dotsList;                                           //переменная для хранения списка точек

    // canvas.style.background = 'rgba(17, 17, 23 ,1)';        //цвет canvas
    document.querySelector('body').appendChild(canvas);     //добавляем canvas в body

    window.onresize = function() {                          //обновляем размеры Canvas если меняется размер окна
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
        init();
    }

    class Dot {                                             //конструктор точки
        constructor(x, y, num) {
            this.x = x;
            this.y = y;
            this.radius = properties.dotDiameter / 2;
            this.scale = getDistance(x, y) / properties.wavelength;
            this.text = num;
        }

        update() {
            this.resize();
            this.draw();
        }

        resize() {
            this.scale = this.scale - properties.velocity * properties.direction;
        }

        draw() {

            let s = ( 1 - Math.abs(Math.sin(this.scale)));
            let o = (1 - s) * 255;
            let r = this.radius * s;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, r, 0, 2 * Math.PI, false);
            ctx.closePath();
            // ctx.fillStyle = 'rgba( 255,'+ o +', '+ o +', '+ s +')';
            // ctx.fillStyle = 'rgba( 255,'+ "128" +', '+ o +', '+ s +')';
            ctx.fillStyle = 'rgba( 0,'+ '200' +', '+ '255' +', '+ s +')';
            ctx.fill();
            // ctx.fillText(this.text, this.x, this.y);
        }
    }

    init();
    function init() {
        dotsList = [];

        const dotsCountX = w / properties.spaceDiameter | 0; //Math.floor(w / properties.spaceDiameter);
        const dotsCountY = h / properties.spaceDiameter | 0;
        const startX = (properties.spaceDiameter + w - dotsCountX * properties.spaceDiameter) / 2;
        const startY = (properties.spaceDiameter + h - dotsCountY * properties.spaceDiameter) / 2;

        let displacement = properties.spaceDiameter / 4 * properties.displacement;

        for ( let j = 0; j < dotsCountY; j++) {
            displacement = - displacement;
            let y = startY + j * properties.spaceDiameter;
            for (let i = 0; i < dotsCountX; i++) {
                let x = startX + i * properties.spaceDiameter + displacement;
                dotsList.push(new Dot(x, y, j + i));
            }
        }
    }

    loop();
    function loop() {
        ctx.clearRect(0, 0, w, h);

        for (let a in dotsList) {
            dotsList[a].update();
        }

        requestAnimationFrame(loop);            //зацикливаем loop();
    }

    function getDistance(x, y) {                    //      получаем расстояние от центра области просмотра до точки ...
        let dx = w / 2 - x;                         //  ... используя теорему Пифагора
        let dy = h / 2 - y;                         //      https://www.youtube.com/watch?v=MX6xpzsTfpM
        return Math.sqrt((dx * dx) + (dy * dy));    //
    }

})();