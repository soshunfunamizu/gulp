(function($) {
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
    
    
    
    
    
    //toggle
    
    $(function(){
      $(document).on('click','.js_toggle_button',function(){
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
    
    
      //↓ここから追加しました
    
    

    
    
    //TOPページスライダー
    
    if($('body#index').length){
     $(document).ready(function(){
        $('.p-hero__visual__list').after('<div id="slide-counter" class="p-slide__counter"><span></span><div class="p-slider__arrow"><div id="p-prev_btn"></div><div id="p-next_btn"></div></div></div></div>');
        var slider = $('.js-bxslider__hero').bxSlider({
          mode: 'fade',
          speed: 1500,
          pause: 7000,
          auto: true,
          pager: false,
          controls: true,
          touchEnabled: false,
          useCSS: false,
          preventDefaultSwipeY:false,
          nextSelector:'#p-next_btn',
          prevSelector:'#p-prev_btn',
          nextText:'<div class="__arrow"></div>',
          prevText:'<div class="__arrow __reverse"></div>',
          onSliderLoad: function(currentIndex) {
            $('#slide-counter span').text(currentIndex + 1);
          },
          onSlideBefore: function($slideElement, oldIndex, newIndex) {
            this.stopAuto();
            this.startAuto();
            $('#slide-counter span').text(newIndex + 1);
            $('#p-prev_btn').css('pointer-events', 'none');
            $('#p-next_btn').css('pointer-events', 'none');
          },
          onSlideAfter: function(){
            $('#p-prev_btn').css('pointer-events', 'auto');
            $('#p-next_btn').css('pointer-events', 'auto');
          }
        });
            // 画面リサイズ時にスライド幅を再設定
            $(window).on('resize', function(){
              var windowWidth = $(window).width();
              console.log('TOPページで動いています')
              $('.bxslider li').width(windowWidth)
            });
            $('#slide-counter').append(slider.getSlideCount());
     });
    }
    
    //ハンバーガーメニュー用
    
    $(function(){
      $('.l-header__humburger').hover(      
        function () {
        $(".l-header__humberger__nav").css("transition", "all 0.25s ease-out");
      },
      function () {
        $(".l-header__humberger__nav").css("transition", "all 0s");
      }
    );
    })
    
    //お問い合わせページで使用
    
    
    
    $(function () {
      var btn = $('.p-button.__form');
      btn.prop("disabled", true).addClass("js-no-click");
    
      $("#check-1")
        .change(function () {
          if ($(this).prop("checked") == false) {
            btn.prop("disabled", true).addClass("js-no-click");
          } else {
            btn.prop("disabled", false).removeClass("js-no-click");
          }
        })
        .triggerHandler("change");
    });
    
    
    //フォームバリテーション↓
    
    
    $(window).load(function () {
      if ($('#mw_wp_form_mw-wp-form-10').length) {
        //必須項目
        $('.p-required').attr({'required': 'required'});
    
        //お電話番号
        $('input[name="tel"]').attr({ 'type': 'tel', 'pattern': '\\d{2,4}-?\\d{2,4}-?\\d{3,4}', 'title': '電話番号のご入力をお願いいたします' });
        $('input[name="tel"]').keyup(function () {
          this.value = this.value.replace(/[^0-9-_]+/i, '');
          var currentval = $(this).val();
          if (currentval.length > 15) { $(this).val(currentval.substr(0, 15)); }
        });
    
        //メールアドレス
        $('input[name="mail"]').attr('type', 'email');
    
        //↓未入力箇所があればエラーを出す
              $('.p-required').on('blur',function(){
              let value = $(this).val();
              if (value == "" || !value.match(/[^\s\t]/)) {
                  $(this).parent('.p-form__text').addClass("js_error");
                  $(this).next('.p-error__text').css('display',"block");
              }else{
                $(this).parent('.p-form__text').removeClass("js_error");
                $(this).next('.p-error__text').css('display',"none");
              }
          });
        //↓未入力箇所が入力されるとエラーを削除する
          $('.p-required').on('input',function(){
            let value = $(this).val();
            if (!value.match(/[^\s\t]/)){
              $(this).parent('.p-form__text').addClass("js_error");
              $(this).next('.p-error__text').css('display',"block");
            }else{
              $(this).parent('.p-form__text').removeClass("js_error");
              $(this).next('.p-error__text').css('display',"none");
            }
          });
    
      }
      if ($('#mw_wp_form_mw-wp-form-10').length && $('.error').length || $("#sc_contact").length) {
        setTimeout(function () {
          if ($('.error').length) {
            var target = $('.error').eq(0).offset().top - ($(window).height() / 2);
          }
          else if($("#sc_contact").length) {
            var target = $("#sc_contact").offset().top - ($(window).innerHeight() - $("#sc_contact").height()) / 2;
          }
          $("html, body").animate({ scrollTop: target }, 500, "swing");
        }, 100);
      }
    });
    
    


    //375px以下の対応
    
    !(function () {
      const viewport = document.querySelector('meta[name="viewport"]');
      function switchViewport() {
        const value =
          window.outerWidth > 375
            ? 'width=device-width,initial-scale=1'
            : 'width=375';
        if (viewport.getAttribute('content') !== value) {
          viewport.setAttribute('content', value);
        }
      }
      addEventListener('resize', switchViewport, false);
      switchViewport();
    })();
    
    
    }(jQuery));
    
    