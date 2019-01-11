 // Dora Jambor
 // March 2016
 //JS file for sketch board

 window.onload = function() {

        var myCanvas = document.getElementById("myCanvas");
        if(myCanvas){
                var isDown = false;
                var ctx = myCanvas.getContext("2d");
                var canvasX, canvasY;
                ctx.lineWidth = 3;

                // draw on canvas
                $(myCanvas)
                .mousedown(function(e){
                isDown = true;
                ctx.beginPath();
                canvasX = e.pageX - myCanvas.offsetLeft;
                canvasY = e.pageY - myCanvas.offsetTop;
                ctx.moveTo(canvasX, canvasY);
                })
                .mousemove(function(e){
                        if(isDown != false) {
                                canvasX = e.pageX - myCanvas.offsetLeft;
                                canvasY = e.pageY - myCanvas.offsetTop;
                                ctx.lineTo(canvasX, canvasY);
                                ctx.strokeStyle = "#000000";
                                ctx.stroke();
                                }
                        })
                .mouseup(function(e){
                        isDown = false;
                        ctx.closePath();
                });
        }
};
// resets canvas
function clearcanvas() {
    var myCanvas = document.getElementById('myCanvas'),
        ctx = myCanvas.getContext("2d");
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        document.getElementById("result").innerHTML = '';

        i = 0
}




// Sends pixel data to server for the NN
function send() {
        i = 0
        var myCanvas = document.getElementById("myCanvas");
        ctx = myCanvas.getContext("2d");
        input_data = ctx.getImageData(0, 0, 400, 400).data
        var pixels = []
        var res = []
        // console.log(input_data)
        for(var i = 0; i < input_data.length; i = i+4) {
                // convert RGBA to grey scale -> single value (0 0 0 255 is black and 0 0 0 0 is white)
                res  = 0.21*input_data[i] + 0.72*input_data[i+1] + 0.07*input_data[i+2]
                // if opacity is large it's black -> should return num close to 1 (to fire)
                if (input_data[i+3] > 200) {
                        res = 230.0
                }
                // res = 255 - res

                // scale to [0,1]
                res/= 255.0
                pixels.push(res)
        }

		console.log(pixels);

        $.ajax({
                method: "POST",
                url: "/sketch",
                processData: false,
                contentType: "application/json",
                data: JSON.stringify(pixels),
                success: function(data) {
                        console.log(data)

                        var res = data;

                document.getElementById("result").innerHTML = res;
                console.log(res)
                console.log(typeof res)
                if (res == 'MENU' && $('#header').length === 0 && $('#bigall').length != 0)
                {
                 $('#bigall').prepend('<header class="header" id="header" data-myKey="2"><h1 class="logo"><a class="t-link" href="#0">Command to HTMl</a></h1><nav class="main-nav"><a class="main-nav__link t-main-nav-link t-link" href="#0">About Us</a><a class="main-nav__link t-main-nav-link t-link" href="#0">Connect</a><a class="main-nav__link t-main-nav-link t-link" href="#0">Team</a></nav></header>');
                 //$('#bigall').sortChildrenByDataKey('myKey', true);
                   //var dat = '<header class="header" id="header" data-myKey="2"><h1 class="logo"><a class="t-link" href="#0">Command to HTMl</a></h1><nav class="main-nav"><a class="main-nav__link t-main-nav-link t-link" href="#0">About Us</a><a class="main-nav__link t-main-nav-link t-link" href="#0">Connect</a><a class="main-nav__link t-main-nav-link t-link" href="#0">Team</a></nav></header>'  ;
                   //var insbef = '#about';
                   //var insaft = '#abc';
                  // addData(insbef, dat, insaft)

                 }

                  if (res == 'TEXT' && $('#about').length === 0 && $('#bigall').length != 0)
                {
                 // $('#bigall').append('<section class="section hero" id="about" data-myKey="3"><h2 class="hero__heading t-heading">Landing  <span class="hero__heading__drop t-heading-light">Page Demo</span></h2><p class="hero__tagline">An attempt to convert command to html</p></section>');
                  //$('#bigall').sortChildrenByDataKey('myKey', true);
                  var dat = '<section class="section hero" id="about" data-myKey="3"><h2 class="hero__heading t-heading">Landing  <span class="hero__heading__drop t-heading-light">Page Demo</span></h2><p class="hero__tagline">An attempt to convert command to html</p></section>' ;
                   var insbef = '#menu';
                   var insaft = '#header';
                    addData(insbef, dat, insaft)
                }

                  if (res == 'ABOUT' && $('#menu').length === 0 && $('#bigall').length != 0)
                {
                //  $('#bigall').append('<section class="section articles" id="menu" data-myKey="4"><header class="article__header" id="img_class"><h2 class="article__header__heading t-section-heading">Heading  <span class="t-heading-light"> <span class="article__header__heading__drop"></span></span></h2><article class="article"><h3 class="article__heading">About us</h3><p class="article__content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum iusto, repudiandae nemo pariatur quos, voluptatem quisquam perferendis</p><a class="article__link t-link t-mini-link" href="#0">Discover</a></article></header></section>');
                  //$('#bigall').sortChildrenByDataKey('myKey', true);
                   var dat = '<section class="section articles" id="menu" data-myKey="4"><header class="article__header" id="img_class"><h2 class="article__header__heading t-section-heading">Heading  <span class="t-heading-light"> <span class="article__header__heading__drop"></span></span></h2><article class="article"><h3 class="article__heading">About us</h3><p class="article__content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum iusto, repudiandae nemo pariatur quos, voluptatem quisquam perferendis</p><a class="article__link t-link t-mini-link" href="#0">Discover</a></article></header></section>' ;
                   var insbef = '#team';
                   var insaft = '#about';
                    addData(insbef, dat, insaft)
                }

                  if (res == 'IMG' && $('#myimg').length === 0 && $('#bigall').length != 0)
                {
                  $('#img_class').append('<article class="article" id="myimg"><img class="article__image" src="https://images.unsplash.com/photo-1529604811361-f024e9ebbd9e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=56020728e1b2579c95c34d2692d09edf&auto=format&fit=crop&w=1078&q=80" alt="#0"><h3 class="article__heading">Wild Ibiza</h3></article>');

                }

                   if (res == 'TEAM' && $('#team').length === 0  && $('#bigall').length != 0)
                {
                   var dat = '<section class="section articles" id="team" data-myKey="5"><header class="article__header"><h2 class="article__header__heading t-section-heading">OUR TEAM<span class="t-heading-light"><span class="article__header__heading__drop"></span></span></h2><div  class="article"><div class="slider--teams"><div class="slider--teams__team"><ul id="list" class="cf"><li><figure class="active"><div><div></div></div><figcaption><h2>Billie</h2><p>Head of Team</p></figcaption></figure></li><li><figure><div><div></div></div><figcaption><h2>Roger</h2><p>Art Director</p></figcaption></figure></li><li><figure><div><div></div></div><figcaption><h2>Wendy</h2><p>Designer</p></figcaption></figure></li><li><figure><div><div></div></div><figcaption><h2>Bill</h2><p>Development</p></figcaption></figure></li><li><figure><div><div></div></div><figcaption><h2>Lorraine</h2><p>Front-End Development</p></figcaption></figure></li><li><figure><div><div></div></div><figcaption><h2>Wesley</h2><p>Marketing Lead</p></figcaption></figure></li></ul></div></div></article></header></section>';
                   var insbef = '#contact';
                   var insaft = '#menu';
                //  $('#bigall').append();
                  //$('#bigall').sortChildrenByDataKey('myKey', true);
                  addData(insbef, dat, insaft)
                 var sliderTeam = (function(document, $) {


  var $sliderTeams = $('.slider--teams'),
      $list = $('#list'),
      $listItems = $('#list li'),
      $nItems = $listItems.length,
      $nView = 3,
      autoSlider,
      $current = 0,
      $isAuto = true,
      $acAuto = 2500,

      _init = function() {
        _initWidth();
        _eventInit();
      },

      _initWidth = function() {
        $list.css({
          'margin-left': Math.floor(100 / $nView) + '%',
          'width': Math.floor(100 * ($nItems / $nView)) + '%'
        });
        $listItems.css('width', 100 / $nItems + '%');
        $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
      },

      _eventInit = function() {

        window.requestAnimFrame = (function() {
          return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
        })();

        window.requestInterval = function(fn, delay) {
            if( !window.requestAnimationFrame       &&
                !window.webkitRequestAnimationFrame &&
                !window.mozRequestAnimationFrame    &&
                !window.oRequestAnimationFrame      &&
                !window.msRequestAnimationFrame)
                    return window.setInterval(fn, delay);
            var start = new Date().getTime(),
            handle = new Object();

            function loop() {
                var current = new Date().getTime(),
                delta = current - start;
                if(delta >= delay) {
                    fn.call();
                    start = new Date().getTime();
                }
                handle.value = requestAnimFrame(loop);
            };
            handle.value = requestAnimFrame(loop);
            return handle;
        }

        window.clearRequestInterval = function(handle) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
            clearInterval(handle);
        };

        $.each($listItems, function(i) {
          var $this = $(this);
          $this.on('touchstart click', function(e) {
            e.preventDefault();
            _stopMove(i);
            _moveIt($this, i);
          });
        });

        autoSlider = requestInterval(_autoMove, $acAuto);
      },

      _moveIt = function(obj, x) {

        var n = x;

        obj.find('figure').addClass('active');
        $listItems.not(obj).find('figure').removeClass('active');

        $list.velocity({
          translateX: Math.floor((-(100 / $nItems)) * n) + '%',
          translateZ: 0
        }, {
          duration: 1000,
          easing: [400, 26],
          queue: false
        });

      },

      _autoMove = function(currentSlide) {
        if ($isAuto) {
          $current = ~~(($current + 1) % $nItems);
        } else {
          $current = currentSlide;
        }
        console.log($current);
        _moveIt($listItems.eq($current), $current);
      },

      _stopMove = function(x) {
        clearRequestInterval(autoSlider);
        $isAuto = false;
        _autoMove(x);
      };

  return {
    init: _init
  };

})(document, jQuery);
    sliderTeam.init();


                }

                   if (res == 'CONTACT' && $('#contact').length === 0 && $('#bigall').length != 0)
                {
                  //$('#bigall').append('<section class="section articles" id="contact" data-myKey="6"><header class="article__header"><h2 class="article__header__heading t-section-heading">CONTACT  US<span class="t-heading-light"> <span class="article__header__heading__drop"></span></span></h2><article class="article"><div class="element"><img src="https://images.unsplash.com/photo-1507180227420-b70574277395?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cdf650a94b70570e2fadb9a8144368b9&auto=format&fit=crop&w=1900&q=80" alt="" class="bag" ></div><section class="section2 clearfix" id="map_class"><div class="col2 column2 last"><div class="sec2innercont"><div class="sec2addr"><p>45 BC, a Latin professor at Hampden-Sydney College in Virginia</p><p><span class="collig">Phone :</span> +91 976885083</p><p><span class="collig">Email :</span> vivek.mengu016@gmail.com</p><p><span class="collig">Fax :</span> +91 9768850839</p></div></div><div class="sec2contactform"><h3 class="sec2frmtitle">Want to Know More?? Drop Us a Mail</h3><form action=""><div class="clearfix"><input class="col2 first" type="text" placeholder="FirstName"><input class="col2 last" type="text" placeholder="LastName"></div><div class="clearfix"><input  class="col2 first" type="Email" placeholder="Email"><input class="col2 last" type="text" placeholder="Contact Number"></div><div class="clearfix"><textarea name="textarea" id="" cols="30" rows="7">Your message here...</textarea></div><div class="clearfix"><input type="submit" value="Send"></div></form></div></div></section></article></header></section>');
                 // $('#bigall').sortChildrenByDataKey('myKey', true);
                   var dat = '<section class="section articles" id="contact" data-myKey="6"><header class="article__header"><h2 class="article__header__heading t-section-heading">CONTACT  US<span class="t-heading-light"> <span class="article__header__heading__drop"></span></span></h2><article class="article"><div class="element"><img src="https://images.unsplash.com/photo-1507180227420-b70574277395?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cdf650a94b70570e2fadb9a8144368b9&auto=format&fit=crop&w=1900&q=80" alt="" class="bag" ></div><section class="section2 clearfix" id="map_class"><div class="col2 column2 last"><div class="sec2innercont"><div class="sec2addr"><p>45 BC, a Latin professor at Hampden-Sydney College in Virginia</p><p><span class="collig">Phone :</span> +91 976885083</p><p><span class="collig">Email :</span> vivek.mengu016@gmail.com</p><p><span class="collig">Fax :</span> +91 9768850839</p></div></div><div class="sec2contactform"><h3 class="sec2frmtitle">Want to Know More?? Drop Us a Mail</h3><form action=""><div class="clearfix"><input class="col2 first" type="text" placeholder="FirstName"><input class="col2 last" type="text" placeholder="LastName"></div><div class="clearfix"><input  class="col2 first" type="Email" placeholder="Email"><input class="col2 last" type="text" placeholder="Contact Number"></div><div class="clearfix"><textarea name="textarea" id="" cols="30" rows="7">Your message here...</textarea></div><div class="clearfix"><input type="submit" value="Send"></div></form></div></div></section></article></header></section>' ;
                   var insbef = '#footer';
                   var insaft = '#team';
                    addData(insbef, dat, insaft)
                }


                   if (res == 'MAP' && $('#mapy').length === 0 && $('#bigall').length != 0)
                {
                  $('#map_class').prepend('<div class="col2 column1 first" id="mapy"><div class="sec2map" style="overflow:hidden;height:550px;width:100%;"><div id="map"></div><script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script></div></div>');
                   setTimeout(
    function() {
     init();
    }, 5000);
                    }


                   if (res == 'FOOTER' && $('#footer').length === 0 && $('#bigall').length != 0)
                {
                  $('#mybody').append('<footer class="footer-distributed" id="footer" data-myKey="7"><div class="footer-right"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a><a href="#"><i class="fa fa-github"></i></a></div><div class="footer-left"><p class="footer-links"><h3 class="article__heading" style="color:white">Command to code</h3><p>An attempt &copy; 2018</p></div></footer>');
                  //$('#bigall').sortChildrenByDataKey('myKey', true);

                }

                 if (res = 'BANNER' && $('#bigall').length === 0)
                {
                 // $('#mybody').prepend();
                  $('<div class="bigall" id="bigall"></div>').insertAfter('.top');

                }

                }
        });
}


