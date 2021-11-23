(function($) {

"use strict";

var myBreakPoint = 840;

//ブラウザ判定

var ua = navigator.userAgent.toLowerCase();
var ver = navigator.appVersion.toLowerCase();

// IE(11以外)
var isMSIE = (ua.indexOf('msie') > -1) && (ua.indexOf('opera') == -1);
// IE6
var isIE6 = isMSIE && (ver.indexOf('msie 6.') > -1);
// IE7
var isIE7 = isMSIE && (ver.indexOf('msie 7.') > -1);
// IE8
var isIE8 = isMSIE && (ver.indexOf('msie 8.') > -1);
// IE9
var isIE9 = isMSIE && (ver.indexOf('msie 9.') > -1);
// IE10
var isIE10 = isMSIE && (ver.indexOf('msie 10.') > -1);
// IE11
var isIE11 = (ua.indexOf('trident/7') > -1);
// IE
var isIE = isMSIE || isIE11;
// Edge
var isEdge = (ua.indexOf('edge') > -1);

// Google Chrome
var isChrome = (ua.indexOf('chrome') > -1) && (ua.indexOf('edge') == -1);
// Firefox
var isFirefox = (ua.indexOf('firefox') > -1);
// Safari
var isSafari = (ua.indexOf('safari') > -1) && (ua.indexOf('chrome') == -1);
// Opera
var isOpera = (ua.indexOf('opera') > -1);

$(document).ready(function(){
  if (isOpera) {
    $("body").addClass("js_isOpera");
  } else if (isIE) {
    $("body").addClass("js_isIe");
  } else if (isChrome) {
    $("body").addClass("js_isChrome");
  } else if (isSafari) {
    $("body").addClass("js_isSafari");
  } else if (isEdge) {
    $("body").addClass("js_isEdge");
  } else if (isFirefox) {
    $("body").addClass("js_isFirefox");
  } else {
    return false;
  }
});


  //デバイス判定
  var _ua = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());

$(document).ready(function(){
  if(_ua.Mobile){
  //この中のコードはスマホにのみ適用
  　$('body').addClass("js_isMobile");
  }else if(_ua.Tablet){
  //この中のコードはタブレットにのみ適用
  　$('body').addClass("js_isTablet");
  }else{
  　$('body').addClass("js_isPc");
  }
});

if(navigator.platform.indexOf("Win") != -1){
  $('body').addClass('js_isWin');
}else{
  $('body').addClass('js_isNotWin');
}

//Prevent users form submitting a from by enter key.
/*$(function(){
  if($('#contact').length){
    $(document).ready(function() {
      $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    });
  }
});*/

/*$(function(){
  $('.js_slick').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 3000,
    fade: true,
    responsive: [
    {
      breakpoint: 840,
      sttings: {
        dots: false,
      }
    }]
  });
});*/

//スクロール禁止処理

function scroll_disable(){
  var scroll = $(window).scrollTop();
  $('body').css({'cssText': 'top: ' + -scroll +'px !important;'});
  $('body').addClass('js_noScroll');
}

function scroll_enable(){
  var scroll = $('body').css('top');
  scroll = scroll.replace(/px/g,'');
  scroll = scroll*-1
  $('body').removeClass('js_noScroll');
  $('body').css('top','auto');
  document.body.scrollTop = document.documentElement.scrollTop = scroll;
}

//ナビ関連

var navigationOpenFlag = false;
var navButtonFlag = true;

    //ハンバーガーメニュー
    $(function(){

      $(document).on('click','.l-header__humburger',function(){
        if(navButtonFlag){
          spNavInOut.switch();
          //一時的にボタンを押せなくする
          setTimeout(function(){
            navButtonFlag = true;
          },400);
          navButtonFlag = false;
        }
      });
    });

//spナビ開く処理
function spNavIn(){
  scroll_disable();
  $('body').removeClass('js_humburgerClose');
  $('body').addClass('js_humburgerOpen');
  setTimeout(function(){
    navigationOpenFlag = true;
  },200);
}

//spナビ閉じる処理
function spNavOut(){
  $('body').removeClass('js_humburgerOpen');
  $('body').addClass('js_humburgerClose');
  scroll_enable();
  setTimeout(function(){
    $(".uq_spNavi").removeClass("js_appear");
  },200);
  navigationOpenFlag = false;
}

//spナビ開閉処理
var spNavInOut = {
  switch:function(){
    if($('body.spNavFreez').length){
      return false;
    }
    if($('body').hasClass('js_humburgerOpen')){
     spNavOut();
    } else {
     spNavIn();
    }
  }
};

//1スクロール判定
$(function(){
  $( window ).scroll( function(){
    var scroll = $(window).scrollTop();
    if (scroll > 10) {
      $("body").addClass("js_oneScroll");
    } else {
      $("body").removeClass("js_oneScroll");
    }
  });
});



/*Setting sub thumbnails total height eaqual to main thumbnail height*/

$(function(){
  
  function heightBalancer(){
    var parentHeight = $('#itemDetail-cont .itemThumb-wrap .itemThumb-main img').height();
    
    $('#itemDetail-cont .itemThumb-wrap .itemThumb ul li').each(function(){
      $(this).css('height',(parentHeight - 20) / 3);
    });
  }
  
  if($('.itemThumb-main').length){

    var w = window.innerWidth;

    if(w > myBreakPoint) {
      $(document).ready(function() {
         heightBalancer();
         setTimeout(function(){
          heightBalancer();
         },1000);
      });
    }

    $(window).resize(function(){
      var w = window.innerWidth;
      console.log(w);
      if(w > myBreakPoint) {
        heightBalancer();
      } else {
        $('#itemDetail-cont .itemThumb-wrap .itemThumb ul li').height('auto');
      }
    });
    
  }
  
});




//Adjust iframe height
$(function()
{

$(window).on('message', function(event)
{
  //if (event.originalEvent.origin != 'https://www.goshu.co.jp') return;
  
  console.log(event.originalEvent.data);
  
  $('#'+event.originalEvent.data['slug']).css(
    {
      'width': '100%',
      'height': event.originalEvent.data['height']
    });
  });

});


//Adding some contents to cartarea
$(function(){
  if($('.infoArea').length){
    //$('.cartArea').append('<div class="el_button op_contact"><div class="el_button_wrapper">お問い合わせ</div></div>');
    $('.infoArea').append('<a href="/specified-commercial-transaction-law#returns" class="cartArea_note">返品についての詳細はこちら</a>');
  }
});

//Hide unnecessary elements.

$(function(){
  /*var str = $('.selectbox').text().replace(/表示切替：/g, '');
  $('.selectbox').text(str);*/
  console.log($('.selectbox').text());
  $('.selectbox').text().replace(/：/g, '');
});

//Relocate sales period texts.

$(function(){
  var target =  $('section#itemDetail-wrap table.spec tr.date td');
  if(target.length){
    var text = target.html();
    console.log(text);
    $('section#itemDetail-wrap table.price').append('<div class="el_salesPeriod"><div class="el_salesPeriod_ttl">販売期間:</div><div class="el_salesPeriod_text">'+text+'</div></div>');
  }
});

//add phone number

function isPhone(){
  return (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0);
}

$(function(){
  if(!isPhone())
    return
  $('span[data-action=call]').each(function(){
    var $ele = $(this);
    $ele.wrap('<a href="tel:' + $ele.data('tel') + '"></a>');
  });
});


//toggle

$(function(){
  $(document).on('click','.js_toggle_button',function(){
    console.log("クリックされた")
    /*$(this).parents('.js_toggle_parent').removeClass('js_active');
    $(this).parents('.js_toggle_parent').find('.js_toggle_target').stop().slideUp(200);*/
    if($(this).parents('.js_toggle_parent').hasClass('js_active')){
      $(this).parents('.js_toggle_parent').removeClass('js_active');
      $(this).parents('.js_toggle_parent').find('.js_toggle_target').stop().slideUp(350);
    } else {
      $(this).parents('.js_toggle_parent').addClass('js_active');
      $(this).parents('.js_toggle_parent').find('.js_toggle_target').stop().slideDown(350);
    }
  }).triggerHandler('click');
});


//return to page top

$(function(){
  var syncerTimeout = null ;
  $( function(){
    $(document).on('click','.js_returnToTop',function(){
      $( 'html,body' ).animate( {scrollTop:0} , 'slow' ) ;
    });
  });
});

//smooz scroll

function getFirstScrollable(selector){
  var $scrollable;

  $(selector).each(function(){
    var $this = $(this);
    if( $this.scrollTop() > 0 ){
      $scrollable = $this;
      return false;
    }else{
      $this.scrollTop(1);
      if( $this.scrollTop() > 0 ){
        $scrollable = $this;
        return false;
      }
      $this.scrollTop(0);
    }
  });


  return $scrollable;
}

function smoozScroll($target){

  if($('body.is_humburger_open').length){
    spNavInOut.switch();
  }


  var $win = $(window),
      $doc = $(document),
      $scrollElement = getFirstScrollable("html,body"),
      mousewheel = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";

    var top;

    var w = $(window).width();

    if( $target.size() < 1 ) return false;

    top = $target.offset().top;
    top = Math.min(top, $doc.height() - $win.height());

    $doc.on(mousewheel, function(e){ e.preventDefault(); });

    $scrollElement.stop().animate({scrollTop: top - 0}, 600, "linear", function(){
      $doc.off(mousewheel);
    });
};

  $(function(){

    var $win = $(window),
        $doc = $(document);

      $doc.on("click", "a[href^=\\#]", function(e){
        /*if($(this).data('option')){
          if($(this).data('option') === "close_selector"){
            $('.js_pullDownParent').removeClass('js_fire');
          }
        }*/
        var $target = $(this.hash),
            top;

        smoozScroll($target);

        return false;
      });
  });



}(jQuery));
