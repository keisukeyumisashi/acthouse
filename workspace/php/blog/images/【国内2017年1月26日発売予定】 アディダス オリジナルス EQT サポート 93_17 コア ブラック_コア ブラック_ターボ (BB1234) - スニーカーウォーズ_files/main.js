/*
* jquery-auto-height.js
*/
 (function($){
    $.fn.autoHeight = function(options){
        var op = $.extend({
        
            column  : 0,
            clear   : 0,
            height  : 'minHeight',
            reset   : '',
            descend : function descend (a,b){ return b-a; }
        
        },options || {}); 

        var self = $(this);
        var n = 0,
            hMax,
            hList = new Array(),
            hListLine = new Array();
            hListLine[n] = 0;

        self.each(function(i){
            if (op.reset == 'reset') {
                $(this).removeAttr('style');
            }
            var h = $(this).height();
            hList[i] = h;
            if (op.column > 1) {
                if (h > hListLine[n]) {
                    hListLine[n] = h;
                }
                if ( (i > 0) && (((i+1) % op.column) == 0) ) {
                    n++;
                    hListLine[n] = 0;
                };
            }
        });

        hList = hList.sort(op.descend);
        hMax = hList[0];
        
        var browser = $.browser.version;
        if (op.column > 1) {
            for (var j=0; j<hListLine.length; j++) {
                for (var k=0; k<op.column; k++) {
                    if (browser == '6.0') {
                        self.eq(j*op.column+k).height(hListLine[j]);
                        if (k == 0 && op.clear != 0) self.eq(j*op.column+k).css('clear','both');
                    } else {
                        self.eq(j*op.column+k).css(op.height,hListLine[j]);
                        if (k == 0 && op.clear != 0) self.eq(j*op.column+k).css('clear','both');
                    }
                }
            }
        } else {
            if (browser == '6.0') {
                self.height(hMax);
            } else {
                self.css(op.height,hMax);
            }
        }
    };
})(jQuery);

/*jqueryrotate*/

(function($) {
var supportedCSS,styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
for (var a=0;a<toCheck.length;a++) if (styles[toCheck[a]] !== undefined) supportedCSS = toCheck[a];
// Bad eval to preven google closure to remove it from code o_O
// After compresion replace it back to var IE = 'v' == '\v'
var IE = eval('"v"=="\v"');

jQuery.fn.extend({
ImageRotate:function(parameters)
{
	// If this element is already a Wilq32.PhotoEffect object, skip creation
	if (this.Wilq32&&this.Wilq32.PhotoEffect) return;
	// parameters might be applied to many objects - so because we use them later - a fresh instance is needed 
	var paramClone = $.extend(true, {}, parameters); 
	return (new Wilq32.PhotoEffect(this.get(0),paramClone))._rootObj;
},
rotate:function(parameters)
{
	if (this.length===0||typeof parameters=="undefined") return;
	if (typeof parameters=="number") parameters={angle:parameters};
	var returned=[];
	for (var i=0,i0=this.length;i<i0;i++)
	{
	    var element=this.get(i);	
		if (typeof element.Wilq32 == "undefined") 
			returned.push($($(element).ImageRotate(parameters)));
		else 
            element.Wilq32.PhotoEffect._handleRotation(parameters);
	}
	return returned;
}
});

// Library agnostic interface

Wilq32=window.Wilq32||{};
Wilq32.PhotoEffect=(function(){

	if (supportedCSS) {
		return function(img,parameters){
			img.Wilq32 = {
				PhotoEffect: this
			};
            
            this._img = this._rootObj = this._eventObj = img;
            this._handleRotation(parameters);
		}
	} else {
		return function(img,parameters) {
			// Make sure that class and id are also copied - just in case you would like to refeer to an newly created object
            this._img = img;

			this._rootObj=document.createElement('span');
			this._rootObj.style.display="inline-block";
			this._rootObj.Wilq32 = 
				{
					PhotoEffect: this
				};
			img.parentNode.insertBefore(this._rootObj,img);
			
			if (img.complete) {
				this._Loader(parameters);
			} else {
				var self=this;
				// TODO: Remove jQuery dependency
				jQuery(this._img).bind("load", function()
				{
					self._Loader(parameters);
				});
			}
		}
	}
})();

Wilq32.PhotoEffect.prototype={
    _setupParameters : function (parameters){
		this._parameters = this._parameters || {};
        if (typeof this._angle !== "number") this._angle = 0 ;
        if (typeof parameters.angle==="number") this._angle = parameters.angle;
        this._parameters.animateTo = (typeof parameters.animateTo==="number") ? (parameters.animateTo) : (this._angle); 

		this._parameters.easing = parameters.easing || this._parameters.easing || function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; }
		this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
        this._parameters.callback = parameters.callback || this._parameters.callback || function(){};
        if (parameters.bind && parameters.bind != this._parameters.bind) this._BindEvents(parameters.bind); 
	},
	_handleRotation : function(parameters){
          this._setupParameters(parameters);
          if (this._angle==this._parameters.animateTo) {
              this._rotate(this._angle);
          }
          else { 
              this._animateStart();          
          }
	},

	_BindEvents:function(events){
		if (events && this._eventObj) 
		{
            // Unbinding previous Events
            if (this._parameters.bind){
                var oldEvents = this._parameters.bind;
                for (var a in oldEvents) if (oldEvents.hasOwnProperty(a)) 
                        // TODO: Remove jQuery dependency
                        jQuery(this._eventObj).unbind(a,oldEvents[a]);
            }

            this._parameters.bind = events;
			for (var a in events) if (events.hasOwnProperty(a)) 
				// TODO: Remove jQuery dependency
					jQuery(this._eventObj).bind(a,events[a]);
		}
	},

	_Loader:(function()
	{
		if (IE)
		return function(parameters)
		{
			var width=this._img.width;
			var height=this._img.height;
			this._img.parentNode.removeChild(this._img);
							
			this._vimage = this.createVMLNode('image');
			this._vimage.src=this._img.src;
			this._vimage.style.height=height+"px";
			this._vimage.style.width=width+"px";
			this._vimage.style.position="absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
			this._vimage.style.top = "0px";
			this._vimage.style.left = "0px";

			/* Group minifying a small 1px precision problem when rotating object */
			this._container =  this.createVMLNode('group');
			this._container.style.width=width;
			this._container.style.height=height;
			this._container.style.position="absolute";
			this._container.setAttribute('coordsize',width-1+','+(height-1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
			this._container.appendChild(this._vimage);
			
			this._rootObj.appendChild(this._container);
			this._rootObj.style.position="absolute"; // FIXES IE PROBLEM
			this._rootObj.style.width=width+"px";
			this._rootObj.style.height=height+"px";
			this._rootObj.setAttribute('id',this._img.getAttribute('id'));
			this._rootObj.className=this._img.className;			
		    this._eventObj = this._rootObj;	
		    this._handleRotation(parameters);	
		}
		else
		return function (parameters)
		{
			this._rootObj.setAttribute('id',this._img.getAttribute('id'));
			this._rootObj.className=this._img.className;
			
			this._width=this._img.width;
			this._height=this._img.height;
			this._widthHalf=this._width/2; // used for optimisation
			this._heightHalf=this._height/2;// used for optimisation
			
			var _widthMax=Math.sqrt((this._height)*(this._height) + (this._width) * (this._width));

			this._widthAdd = _widthMax - this._width;
			this._heightAdd = _widthMax - this._height;	// widthMax because maxWidth=maxHeight
			this._widthAddHalf=this._widthAdd/2; // used for optimisation
			this._heightAddHalf=this._heightAdd/2;// used for optimisation
			
			this._img.parentNode.removeChild(this._img);	
			
			this._aspectW = ((parseInt(this._img.style.width,10)) || this._width)/this._img.width;
			this._aspectH = ((parseInt(this._img.style.height,10)) || this._height)/this._img.height;
			
			this._canvas=document.createElement('canvas');
			this._canvas.setAttribute('width',this._width);
			this._canvas.style.position="relative";
			this._canvas.style.left = -this._widthAddHalf + "px";
			this._canvas.style.top = -this._heightAddHalf + "px";
			this._canvas.Wilq32 = this._rootObj.Wilq32;
			
			this._rootObj.appendChild(this._canvas);
			this._rootObj.style.width=this._width+"px";
			this._rootObj.style.height=this._height+"px";
            this._eventObj = this._canvas;
			
			this._cnv=this._canvas.getContext('2d');
            this._handleRotation(parameters);
		}
	})(),

	_animateStart:function()
	{	
		if (this._timer) {
			clearTimeout(this._timer);
		}
		this._animateStartTime = +new Date;
		this._animateStartAngle = this._angle;
		this._animate();
	},
_animate:function()
     {
         var actualTime = +new Date;
         var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

         // TODO: Bug for animatedGif for static rotation ? (to test)
         if (checkEnd && !this._parameters.animatedGif) 
         {
             clearTimeout(this._timer);
         }
         else 
         {
             if (this._canvas||this._vimage||this._img) {
                 var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                 this._rotate((~~(angle*10))/10);
             }
             var self = this;
             this._timer = setTimeout(function()
                     {
                     self._animate.call(self);
                     }, 10);
         }

         // To fix Bug that prevents using recursive function in callback I moved this function to back
         if (this._parameters.callback && checkEnd){
             this._angle = this._parameters.animateTo;
             this._rotate(this._angle);
             this._parameters.callback.call(this._rootObj);
         }
     },

	_rotate : (function()
	{
		var rad = Math.PI/180;
		if (IE)
		return function(angle)
		{
            this._angle = angle;
			this._container.style.rotation=(angle%360)+"deg";
		}
		else if (supportedCSS)
		return function(angle){
            this._angle = angle;
			this._img.style[supportedCSS]="rotate("+(angle%360)+"deg)";
		}
		else 
		return function(angle)
		{
            this._angle = angle;
			angle=(angle%360)* rad;
			// clear canvas	
			this._canvas.width = this._width+this._widthAdd;
			this._canvas.height = this._height+this._heightAdd;
						
			// REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
			this._cnv.translate(this._widthAddHalf,this._heightAddHalf);	// at least center image on screen
			this._cnv.translate(this._widthHalf,this._heightHalf);			// we move image back to its orginal 
			this._cnv.rotate(angle);										// rotate image
			this._cnv.translate(-this._widthHalf,-this._heightHalf);		// move image to its center, so we can rotate around its center
			this._cnv.scale(this._aspectW,this._aspectH); // SCALE - if needed ;)
			this._cnv.drawImage(this._img, 0, 0);							// First - we draw image
		}

	})()
}

if (IE)
{
Wilq32.PhotoEffect.prototype.createVMLNode=(function(){
document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
		try {
			!document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
			return function (tagName) {
				return document.createElement('<rvml:' + tagName + ' class="rvml">');
			};
		} catch (e) {
			return function (tagName) {
				return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
			};
		}		
})();
}

})(jQuery);


//hover
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

// JavaScript Document



	/*date calculate*/
	var currentDate = new Date();
	var pass = 72; //passage time
	var content = '<div class="newitem"><img src="'+domainurl+'image/gizagiza1.png" class="imgroute" alt="new"><span><img src="'+domainurl+'image/gizagizamoji1.png" alt="new"></span></div>';
	var hantei = null;
		
	/*date judge*/
	function newimage(str){
		newmarkAttr = $(str).find("p.time").text();
		newmarkAttr = newmarkAttr.replace(/ |\./g,':');
		time = newmarkAttr.split(":");
		entryDate = new Date(time[0], time[1]-1, time[2], time[3], time[4], 0);
		now = (currentDate.getTime() - entryDate.getTime())/(60*60*1000);
		now = Math.ceil(now);
		   if(now <= pass){
				return true;
			}else{
				return false;
			}
	}



	$(function(){
	
	/*Rotate action*/
	var angle = 0;
	setInterval(function(){
      angle+=3;
     $(".imgroute").rotate(angle);
	},50);
	
	// hide #back-top first
	$("#back-top").hide();
	
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 500);
			return false;
		});
	});
	
/*
	$("#radiocheck label").click(function(){
		$(this).parent().find("input").attr("checked", true);
			var dispc = $("#radiocheck").css("display");
			if(dispc != 'none'){
				$("#radiocheck").stop().hide("blind",500);
			}
		var tmp = $("input[name=search_select]:checked").val();

		if(tmp=="search_item"){
		$("#search-form").attr("action",domainurl+"items/search");
		}else{
		$("#search-form").attr("action",domainurl+"shops/search");
		}

		$('input[id=search-query]').focus();
		
    }).hover(function(){
	 	$(this).css("cursor","pointer");
			  },
		function(){
		$(this).css("cursor","default");

    });

		$('input[id=search-query]').focus(function(){
			$(this).addClass('focused');
			
			var dispc = $("#radiocheck").css("display");
			
			if(dispc == 'none'){
				$("#radiocheck").stop().show("blind",500);
			}
			
		}).blur(function(){
			$(this).removeClass('focused');


		});
$("#wrap").click(function(){ 
			var dispc = $("#radiocheck").css("display");
			if(dispc != 'none'){
				$("#radiocheck").stop().hide("blind",500);
			}
   });
   
		$('#search-query').dblclick(function () {
					var dispc = $("#radiocheck").css("display");

			if(dispc == 'none'){
				$("#radiocheck").stop().show("blind",500);
			}
   });*/

/*		$(".item_button,#itemjson").hover(function() {
			$(this).stop().animate({backgroundColor: "#808080"}, 450);
        },function() {
			$(this).stop().animate({backgroundColor: "#000" }, 450);
        });*/

     $("#logogroup h1 img").hover(function(){
		$(this).stop().animate({opacity:0.5}, 450);
			  },
		function(){
		$(this).stop().animate({opacity:1}, 450);
    });
	
     /*$(".pagenate .top_archive_right_img,.pagenate .top_archive_left_img").hover(function(){
		$(this).stop().animate({opacity:0.5}, 450);
			  },
		function(){
		$(this).stop().animate({opacity:1}, 450);
    });*/



/*     $("#back-top").hover(function(){
		$(this).find("img").stop().animate({opacity:1}, 450);
		$(this).find("a").stop().animate({color: "#000000"}, 450);
			  },
		function(){
		$(this).find("img").stop().animate({opacity:0.5}, 450);
		$(this).find("a").stop().animate({color: "#A1A1A1"}, 450);
    });*/



/*	$('#top,#sitemap,#rss,#contact,#shopping,#about').append('<span class="hover"></span>').each(function () {
	  		var $span = $('> span.hover', this).css('opacity', 0);
	  		$(this).hover(function () {
	    		$span.stop().fadeTo(500, 1);
	 		}, function () {
	   	$span.stop().fadeTo(500, 0);
	  		});
		});
		*/


	$(".disnon").css("display","none");
	
	
//マウスオーバー時
function megaHoverOver(){
		$(this).find(".disnon").slideToggle("slow");
		$(this).prev(".menuBottomTitle").find("span").addClass('hover').css('color', '#000');
		$(this).find("li a").css('color', '#000');
}
//On Hover Out
function megaHoverOut(){
		$(this).find(".disnon").slideToggle("slow");
		$(this).prev(".menuBottomTitle").find("span").removeClass('hover').css('color', '#a1a1a1');
		$(this).find("li a").css('color', '#a1a1a1');
}

	var config = { 
	     sensitivity: 2,
     interval: 0,   
     over: megaHoverOver, // function = onMouseOver callback (REQUIRED)    
     timeout: 500, // number = milliseconds delay before onMouseOut    
     out: megaHoverOut // function = onMouseOut callback (REQUIRED)    
	};
	
	$(".B_menu_archive,.B_menu_category,.B_menu_tagcloud,.B_menu_colorcloud").hoverIntent(config); 

/*	
	$(".B_menu_archive,.B_menu_category,.B_menu_tagcloud,.B_menu_colorcloud").hover(function(){
		$(this).find(".disnon").slideToggle("slow");
		$(this).prev(".menuBottomTitle").find("span").addClass('hover').css('color', '#000');
		$(this).find("li a").css('color', '#000');
		},function(){
		$(this).find(".disnon").slideToggle("slow");
		$(this).prev(".menuBottomTitle").find("span").removeClass('hover').css('color', '#a1a1a1');
		$(this).find("li a").css('color', '#a1a1a1');
			});*/
	//$(".col2topbox:nth-child(2n),.col4topbox:nth-child(4n)").css("margin-right", "0px");
	//$(".col2:nth-child(2n),.col4:nth-child(4n)").css("margin-right", "0px");
	//$(".item_small_img li:nth-child(4n)").css("margin-right", "0px");

	$(".col5_ranking:nth-child(5n),.col5_ranking_recommend:nth-child(5n)").css("margin-right", "-2px");

     $(".col2topbox,.col4topbox,.col5_ranking").click(function(){
		window.open($(this).find("a").attr("href"), '_self');
         return false;
    });
     $(".col5_ranking_recommend").click(function(){
		window.open($(this).find("a").attr("href"), '_target');
         return false;
    });

     $(".col2topbox,.col4topbox,.col5_ranking,.col5_ranking_recommend").hover(function(){
	 	$(this).css("cursor","pointer").addClass("hoverblock");
			  },
		function(){
		$(this).css("cursor","default").removeClass("hoverblock");
    });

	$('.col2topbox').each(function(){
			hantei = newimage($(this));
			if(hantei){
				$(this).children(".image_large").append(content);
			}
	});
	$('.col4topbox').each(function(){
			hantei = newimage($(this));
			if(hantei){
				$(this).children(".image_thumb").append(content);
			}
	});

	});
