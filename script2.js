// $(function() {
//   var isMobile;
//   if (
//     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//       navigator.userAgent
//     )
//   ) {
//     isMobile = true;

//     // Mobile height fix
//     $('.height-fix').each(function() {
//       var h = $(this).height();
//       $(this).height(h);
//     });
//   }

//   // RESIZE RESETS
//   $(window).resize(function() {
//     posFilterBar($('.filter').first());
//   });

//   // Sticky Nav on Mobile
//   if (isMobile) {
//     $('nav').addClass('fixed');
//   } else {
//     $('nav').addClass('desk');
//   }

//   // NAV POSITION
//   var navPos = $('nav').position().top;
//   var lastPos = 0;
//   var lockTimer;

//   $(window).on('scroll', function() {
//     var pos = $(window).scrollTop();
//     var pos2 = pos + 50;
//     var scrollBottom = pos + $(window).height();

//     if (!isMobile) {
//       if (pos >= navPos + $('nav').height() && lastPos < pos) {
//         $('nav').addClass('fixed');
//       }
//       if (pos < navPos && lastPos > pos) {
//         $('nav').removeClass('fixed');
//       }
//       lastPos = pos;
//     }

//     // Link Highlighting
//     if (pos2 > $('#home').offset().top) {
//       highlightLink('home');
//     }
//     if (pos2 > $('#about').offset().top) {
//       highlightLink('about');
//     }
//     if (pos2 > $('#portfolio').offset().top) {
//       highlightLink('portfolio');
//     }
//     if (pos2 > $('#blog').offset().top) {
//       highlightLink('blog');
//     }
//     if (
//       pos2 > $('#contact').offset().top ||
//       pos + $(window).height() === $(document).height()
//     ) {
//       highlightLink('contact');
//     }

//     // Prevent Hover on Scroll
//     clearTimeout(lockTimer);
//     if (!$('body').hasClass('disable-hover')) {
//       $('body').addClass('disable-hover');
//     }

//     lockTimer = setTimeout(function() {
//       $('body').removeClass('disable-hover');
//     }, 500);
//   });

//   function highlightLink(anchor) {
//     $('nav .active').removeClass('active');
//     $('nav')
//       .find('[dest="' + anchor + '"]')
//       .addClass('active');
//   }

//   // EVENT HANDLERS
//   $('.page-link').click(function() {
//     var anchor = $(this).attr('dest');
//     $('.link-wrap').removeClass('visible');

//     $('nav span').removeClass('active');
//     $('nav')
//       .find('[dest="' + anchor + '"]')
//       .addClass('active');

//     $('html, body').animate(
//       {
//         scrollTop: $('#' + anchor).offset().top
//       },
//       400
//     );
//   });

//   $('.mdi-menu').click(function() {
//     $('.link-wrap').toggleClass('visible');
//   });

//   $('.blog-wrap').hover(
//     function() {
//       $('.blog-wrap')
//         .not(this)
//         .addClass('fade');
//       $(this).addClass('hover');
//     },
//     function() {
//       $(this).removeClass('hover');
//       $('.blog-wrap').removeClass('fade');
//     }
//   );

//   posFilterBar($('.filter').first());

//   $('.filter').click(function() {
//     posFilterBar(this);
//   });

//   function posFilterBar(elem) {
//     var origin = $(elem)
//       .parent()
//       .offset().left;
//     var pos = $(elem).offset().left;
//     $('.float-bar').css({
//       left: pos - origin,
//       width: $(elem).innerWidth()
//     });
//     $('.float-bar .row').css('left', (pos - origin) * -1);
//   }

//   // GALLERY
//   $('#gallery').mixItUp({});

//   function mixClear() {
//     setTimeout(function() {
//       $('#gallery').removeClass('waypoint');
//     }, 2000);
//   }

//   // SCROLL ANIMATIONS
//   function onScrollInit(items, elemTrigger) {
//     var offset = $(window).height() / 1.6;
//     items.each(function() {
//       var elem = $(this),
//         animationClass = elem.attr('data-animation'),
//         animationDelay = elem.attr('data-delay');

//       elem.css({
//         '-webkit-animation-delay': animationDelay,
//         '-moz-animation-delay': animationDelay,
//         'animation-delay': animationDelay
//       });

//       var trigger = elemTrigger ? trigger : elem;

//       trigger.waypoint(
//         function() {
//           elem.addClass('animated').addClass(animationClass);
//           if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
//         },
//         {
//           triggerOnce: true,
//           offset: offset
//         }
//       );
//     });
//   }

//   setTimeout(function() {
//     onScrollInit($('.waypoint'));
//   }, 10);

//   // CONTACT FORM
//   $('#contact-form').submit(function(e) {
//     e.preventDefault();

//     $.ajax({
//       url: 'https://formspree.io/mattwilliams85@gmail.com',
//       method: 'POST',
//       data: { message: $('form').serialize() },
//       dataType: 'json'
//     }).done(function(response) {
//       $('#success').addClass('expand');
//       $('#contact-form')
//         .find('input[type=text], input[type=email], textarea')
//         .val('');
//     });
//   });

//   $('#close').click(function() {
//     $('#success').removeClass('expand');
//   });
// });




(function(){

    let twoCanvas = document.querySelector('.three-page').appendChild(canvas),
    ctx = twoCanvas.getContext('2d'),
    w = twoCanvas.width = innerWidth,
    h = twoCanvas.height = innerHeight,
    particles = [],
    properties = {
        bgColor             : 'rgba(13, 13, 15, 1)',
        particleColor       : 'rgba( 34, 165, 255 , 1)',
        particleRadius      : 3,
        particleCount       : 60,
        particleMaxVelocity : 0.5,
        lineLength          : 150,
        particleLife        : 6,
    };

    // document.querySelector('body').appendChild(canvas);

    window.onresize = function(){
        w = twoCanvas.width = innerWidth,
        h = twoCanvas.height = innerHeight;        
    }

    class Particle{
        constructor(){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.life = Math.random()*properties.particleLife*60;
        }
        position(){
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX*=-1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY*=-1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        reCalculateLife(){
            if(this.life < 1){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.life = Math.random()*properties.particleLife*60;
            }
            this.life--;
        }
    }

    function reDrawBackground(){
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines(){
        let x1, y1, x2, y2, length, opacity;
        for(let i in particles){
            for(let j in particles){
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if(length < properties.lineLength){
                    opacity = 1-length/properties.lineLength;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = 'rgba( 34, 165, 255 , '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function reDrawParticles(){
        for(let i in particles){
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    }

    function loop(){
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init(){
        for(let i = 0 ; i < properties.particleCount ; i++){
            particles.push(new Particle);
        }
        loop();
    }

    init();

}())