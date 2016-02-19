// jshint ignore: start


/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
  //'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' ||
       window.location.hostname === 'localhost' ||
       window.location.hostname.indexOf('127.') === 0)) {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: './'
    }).then(function(registration) {
      // Check to see if there's an updated version of service-worker.js with
      // new files to cache:
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
      if (typeof registration.update === 'function') {
        registration.update();
      }

      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function () {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function () {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');
            }
          };
        }
      };
    }).catch(function (e) {
      console.error('Error during service worker registration:', e);
    });
  }



// @dev   --> Andrew Starosciak
// @date  --> Sept. 20 2015
// @dept  --> Interactive Vest Advertising
/*--------------------------------------------------------------
# Globals
--------------------------------------------------------------*/
  var $sitetoolbar = $('.site-toolbar');
  var $body = $('body');


  // Shrink the height of the sitetoolbar when page scrolls down (below 225)
  $(window).on('scroll', function(e) {
    if($(window).scrollTop() > 225) {
      minifyToolbar(true)
    } else {
     minifyToolbar(false);
    }
  });

    // and on page load
    if($(window).scrollTop() > 225) {
      minifyToolbar(true)
    } else {
     minifyToolbar(false);
    }

    // helper
    function minifyToolbar(state) {
      if(state===true) {
        $sitetoolbar.addClass('mini');
      } else {
        $sitetoolbar.removeClass('mini');
      }
    }

/*--------------------------------------------------------------
# Secondary Pages - Services, Education, Staff
--------------------------------------------------------------*/
  $('.page-content').on('click', function(e) {
    var $e = $(e.target);
    if ($e.hasClass('fa-bars')) {
      openNav(true);      
    }
  });

  // Close nav clicking the shadowed mask
  $('.article-mask').on('click', function() {
    openNav(false);
  });

  // Open or close the navigation sidebar and masking
  function openNav(state) {
    if ( state === true ) {
      $('#main').addClass('open-nav');
      $body.scrollTo(330, 500).css('overflow', 'hidden');
      $('.site-toolbar').addClass('hide-toolbar');
      
    } else {
      $('#main').removeClass('open-nav');
      $('.site-toolbar').removeClass('hide-toolbar');
      $body.css('overflow', 'auto');
    }
  }



  // Services content : Event Handling
  $('#article-nav').on('click', function(e) {

    var $e = $(e.target);

    if ($e.data('link') != '') {
      $(this).find('li').removeClass('active');
      $e.addClass('active');
      //$body.scrollTo(410, 500)
      var BOMwidth = window.innerWidth;
      
      if(BOMwidth>1185) {
        $body.scrollTo(435, 500);
      } else {
        $body.scrollTo(435, 500);
      }
      

      NProgress.inc();

      // Swap out our content from our AJAX call via a .promise
      changeContent($e.data('link')).done(function(content) {

        //Append to the page and change the navigation too
        appendContent( $('#services-content'), content );
        document.location.hash=$e.data('link');
        NProgress.done();

      });
    }

   
  });

  // Helper Methods: AJAX Handling of Content Swapping 
  // @param: data-link must reference a html file in the components folder !!!
  function changeContent(link) {
    return $.ajax({
      url: 'components/'+link+'.html',
      success: function(result) {
        //
      }
    });
  }

  function appendContent($el, content) {
    var previous = $el.find('.article-wrapper');
      // Handle the previous element (could be customizedm more...)
      previous.fadeOut();
      // Add our new content to the page.
      $el.append(content);

      // Cleanup elements and animation properties
      setTimeout(function(){
        previous.remove();
        $('.article-wrapper').removeClass('animated').removeClass('fadeInDown').removeClass('delay-500');        
      }, 1000);
  }


var hash = document.location.hash;

// On page load for secondary stuff
  if(document.location.pathname === '/services' || document.location.pathname === '/services.html' ) {

    if(document.location.hash === '') {
      $('.sidebar-list li').first().addClass('active');
      changeContent( 'general-dentistry' ).done(function(content) {
        appendContent( $('#services-content'), content )
      });
    } else {
      var cleanedHash = hash.replace('#', '');
      $('.sidebar-list li[data-link="'+cleanedHash+'"]').addClass('active');
      changeContent( cleanedHash ).done(function(content) {
        appendContent( $('#services-content'), content )
      });
    }

  } 
  else if (document.location.pathname === '/health' || document.location.pathname === '/health.html' ) {
    if (document.location.hash === '') {
      $('.sidebar-list li').first().addClass('active');
      changeContent( 'education-brush-teeth' ).done(function(content) {
        appendContent( $('#services-content'), content )
      });
    } else {
      var cleanedHash = hash.replace('#', '');
      $('.sidebar-list li[data-link="'+cleanedHash+'"]').addClass('active');
      changeContent( cleanedHash ).done(function(content) {
        appendContent( $('#services-content'), content )
      });
    }
  }
  else if (document.location.pathname === '/financial-options.html' || document.location.pathname === '/financial-options')  {
    $('.sidebar-list li').first().addClass('active');
  }
  else if (document.location.pathname === '/staff.html' || document.location.pathname === '/staff') {
    $('.sidebar-list li').on('click', function(e) {
      var $this = $(this);
      var staff = $this.data('staff');
      $(window).scrollTo($('#'+staff), {
        duration: 400
      });
    });
  }

/*--------------------------------------------------------------
# Index Contact Form
--------------------------------------------------------------*/
if (document.location.pathname === '/') {
  $("form").validate({
    rules: {
      name: {
        required: true
      },
      phone: {
        required: true
      },
      email: {
        required: true
      }
    },

    messages: {
      name: "Please specify your name.",
      phone: "Please specify your phone number.",
      email: 'Please enter your email address.'
    }
  });

  $('#index-contact-form').on('submit', function(e) {
    e.preventDefault();

    var $this = $(this);
    var isValid = $this.valid();

    if (isValid) {

      var contact = {
        action: 'contact',
        name: $('#name').val(),
        phone: $('#phone').val(),
        email: $('#email').val(),
        preference: $('input[name="preferance"]:checked').val()
      }

      // ajax 
      $.ajax({
        type: 'POST',
        beforeSend: function(x) {
          if (x && x.overrideMimeType) {
           x.overrideMimeType("application/j-son;charset=UTF-8");
          }
        },
        dataType: "json",
        url: "ajax/contact.ajax.php",
        data: { contact : JSON.stringify(contact) },
        success: function(msg) {
          if (msg.hasOwnProperty('success')) {
           success();
          }
        }
      });
      

      function success() {
        swal({
          title : "Success",
          text: "You will be contacted within one business day."+['<ul class="calendar-alert">',
          '<li>Monday: 9:00 AM – 5:00 PM</li>',
          '<li>Tuesday: 9:00 AM – 5:00 PM</li>',
          '<li>Wednesday: (By appointment) 9:00 AM – 12:00 PM</li>',
          '<li>Thursday: 9:00 AM – 5:00 PM</li>',
          '<li>Friday: Closed</li>',
          '<li>Saturday: Closed</li>',
          '<li>Sunday: Closed',
          '</ul>'].join(''),
          html: true
          });
        $('#name').val('');
        $('#phone').val('');
        $('#email').val('');
        $('input[type="radio"]').removeAttr('checked');
      }
    }

  })
/* --------------------------------------------------------------
client testimonials
-------------------------------------------------------------- */
  
var $items = $('.quote-block .comment');

function getRandomItem() {
  return $items.eq(Math.floor($items.length * Math.random()));
}

getRandomItem().show();

setInterval(function() {
  var $outgoing = $items.filter(':visible');
  var $incoming = getRandomItem();
  $outgoing.fadeOut(1000, function() {
    $incoming.fadeIn(1000);
  });
}, 6000);
    
}
    
/* --------------------------------------------------------------
end of Homepage
-------------------------------------------------------------- */

if (document.location.pathname === '/survey' || document.location.pathname === '/survey.html') {

  $('#customer-survey').on('submit', function(e) {
    e.preventDefault();

    var $this = $(this);

      var survey = {
        action: 'survey',
        1: $('input[name="1"]:checked').val(),
        2: $('input[name="2"]:checked').val(),
        3: $('input[name="3"]:checked').val(),
        4: $('input[name="4"]:checked').val(),
        comment: $('textarea').val(),
        name: $('#name').val()
      }

      $.ajax({
        type: 'POST',
        beforeSend: function(x) {
          if (x && x.overrideMimeType) {
           x.overrideMimeType("application/j-son;charset=UTF-8");
          }
        },
        dataType: "json",
        url: "ajax/survey.ajax.php",
        data: { survey : JSON.stringify(survey) },
        success: function(msg) {
          if (msg.hasOwnProperty('success')) {
           success();
          }
        }
      });

      function success() {
        swal({
          title : "Success",
          text: "Thank you for your time and feedback, we greatly appreciate it.",
          html: true
          });
        $('input[type="radio"]').removeAttr('checked');
        $('textarea').val('');
        $('#name').val('');
      }

  })

}

/*--------------------------------------------------------------
# Site wide
--------------------------------------------------------------*/

  // Modal Stuff
  $('#call-office, .phone').on('click', function() {
    $('.ui.modal.call').modal('show');
  });

  $('.close-modal').on('click', function(e) {
    e.preventDefault();
    $('.ui.modal.call').modal('hide');
    if (document.location.pathname === '/') {
      $body.scrollTo(document.getElementById('index-contact'), { duration: 1000});
    } else {
      document.location = '/#index-contact';
    }

    var $siteNav = $('.site-toolbar');

    if ( $siteNav.hasClass('nav-toggled') ) {
      $siteNav.removeClass('nav-toggled');
      $('#site-navigation').removeClass('toggled');
      $body.css('overflow-y', 'auto');
      //$('.menu-toggle').removeClass('svg-menu-toggled');
      $('.menu-toggle').click();
    }
  })

  // Add Buisness time to modal of business hours
  // -- down in our google map function


  // Animated SVG Menu Hamburger Icon
  $('button.menu-toggle').on('click',function(){
     var $sitetoolbar = $('.site-toolbar');

      if($(this).hasClass('svg-menu-toggled')){
        $(this).removeClass('svg-menu-toggled');
        $body.css('overflow-y', 'auto');

        var s = new Snap('#MobileMenuIcon line.tbar');
        var bbox = s.getBBox();
        s.animate( { transform: 't0,18 s1,1, r' + 0+' 21 6'  }, 300, mina.easeout, function(){
          s.animate( { transform: 't0,1 s1,1, r' + 0+' 24 4' }, 400, mina.easeinout );
        } );

        var s2 = new Snap('#MobileMenuIcon line.bbar');
        s2.animate( { transform: 't0,-18 s1,1, r' + 0+' 21 6'  }, 300, mina.easeout, function(){
          s2.animate( { transform: 't0,0 s1,1, r' + 0+' 24 4' }, 400, mina.easeinout );

        } );

        var s3 = new Snap('#MobileMenuIcon line.mbar');
        s3.animate( { transform: 's1,1'  }, 200, mina.easeout, function(){
        } );

        $sitetoolbar.removeClass('nav-toggled');

      }else{
        $(this).addClass('svg-menu-toggled');
        $body.css('overflow-y', 'hidden');

        var s = new Snap('#MobileMenuIcon line.tbar');
        var bbox = s.getBBox();
        s.animate( { transform: 't0,18 s1,1, r' + 0+' 21 6'  }, 300, mina.easeout, function(){
          s.animate( { transform: 't0,18 s1,1, r' + 45+' 24 4' }, 400, mina.easeinout );
        } );

        var s2 = new Snap('#MobileMenuIcon line.bbar');
        s2.animate( { transform: 't0,-18 s1,1, r' + 0+' 21 6'  }, 300, mina.easeout, function(){
          s2.animate( { transform: 't0,-18 s1,1, r' + '-45'+' 24 39' }, 500, mina.easeinout );
        } );

        var s3 = new Snap('#MobileMenuIcon line.mbar');
        s3.animate( { transform: 's0,1'  }, 200, mina.easeout, function(){
        } );

        $sitetoolbar.addClass('nav-toggled');
      }
  });


  // Google maps
  function initMap() {
    var myLatLng = {lat: 38.245152, lng: -85.564981};

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      scrollwheel: false,
      zoom: 16,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      }
    });

    var customMapType = new google.maps.StyledMapType(
      [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}]
      );
    var customMapTypeId = 'custom_style';

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

   var infowindow = new google.maps.InfoWindow();
   var service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId: 'ChIJ2UcikJyfaYgRImNExfQ7ruE'
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: '/images/icons/tooth.png'
        });

        // Google Maps onClick event
        google.maps.event.addListener(marker, 'click', function() {

          var styles = {
            h1 : 'line-height: 20px; margin-bottom: 2px; color: #333',
            address : 'font-size: 14px; font-weight: 300; line-height: 18px; margin-bottom: 5px; color: #333;'
          }

          var address_url = 'https://www.google.com/maps/dir//Dr.+Pooja+K.+Reddy,+DMD,+10224+Shelbyville+Rd,+Louisville,+KY+40223/@38.245152,-85.564981,15z/data=!4m12!1m3!3m2!1s0x0:0xe1ae3bf4c5446322!2sDr.+Pooja+K.+Reddy,+DMD!4m7!1m0!1m5!1m1!1s0x88699f9c902247d9:0xe1ae3bf4c5446322!2m2!1d-85.564981!2d38.245152';
          
          if(place.opening_hours.open_now) {
            var operation = '<span style="color: #666;">Open today</span> <a href="https://www.google.com/maps/place/Dr.+Pooja+K.+Reddy,+DMD/@38.2450708,-85.5648917,16z/data=!4m6!1m3!3m2!1s0x0:0xe1ae3bf4c5446322!2sDr.+Pooja+K.+Reddy,+DMD!3m1!1s0x0:0xe1ae3bf4c5446322" style="text-decoration: none; color: #3A84DF;"> 9:00 am - 5:00 pm</a>';
          } else {
            var operation = '<a href="https://www.google.com/maps/place/Dr.+Pooja+K.+Reddy,+DMD/@38.2450708,-85.5648917,16z/data=!4m6!1m3!3m2!1s0x0:0xe1ae3bf4c5446322!2sDr.+Pooja+K.+Reddy,+DMD!3m1!1s0x0:0xe1ae3bf4c5446322" style="text-decoration: none; color: #3A84DF;"> Currently Closed </a>';
          }

          var infoContent = ['',
            '<div class="cards-wrapper">',              
              '<h1 style="',styles.h1,'"">', place.name, '</h1>',
              '<div class="address" style="', styles.address,'">',
                place.address_components[0].long_name, ' ', place.address_components[1].short_name, '<br/>',
                place.address_components[2].long_name, ', ', place.address_components[3].short_name, ' ', place.address_components[5].long_name,
              '</div>',
              '<div class="operation" style="font-size:12px; line-height: 15px;">',operation,'</div>',
              '<div class="left" class="phone">502-245-1237</div>',              
              '<div class="directions pull-right"><a href="'+address_url+'"><i class="fa fa-compass"></i> <span>Directions</span> </a></div>',
            '</div>'].join('');

          infowindow.setContent(infoContent);
          infowindow.open(map, this);      

        });
   
      function infoWindow() {
         var styles = {
            h1 : 'line-height: 20px; margin-bottom: 2px; color: #333',
            address : 'font-weight: 300; line-height: 18px; margin-bottom: 5px; color: #333;'
          }

          var address_url = 'https://www.google.com/maps/dir//Dr.+Pooja+K.+Reddy,+DMD,+10224+Shelbyville+Rd,+Louisville,+KY+40223/@38.245152,-85.564981,15z/data=!4m12!1m3!3m2!1s0x0:0xe1ae3bf4c5446322!2sDr.+Pooja+K.+Reddy,+DMD!4m7!1m0!1m5!1m1!1s0x88699f9c902247d9:0xe1ae3bf4c5446322!2m2!1d-85.564981!2d38.245152';
          
          if(place.opening_hours.open_now) {
            var operation = '<span style="color: #666;">Open today</span> <a href="https://www.google.com/maps/place/Dr.+Pooja+K.+Reddy,+DMD/@38.2450708,-85.5648917,16z/data=!4m6!1m3!3m2!1s0x0:0xe1ae3bf4c5446322!2sDr.+Pooja+K.+Reddy,+DMD!3m1!1s0x0:0xe1ae3bf4c5446322" style="text-decoration: none; color: #3A84DF;"> 9:00 am - 5:00 pm</a>';
          } else {
            var operation = '<a href="https://www.google.com/maps/place/Dr.+Pooja+K.+Reddy,+DMD/@38.2450708,-85.5648917,16z/data=!4m6!1m3!3m2!1s0x0:0xe1ae3bf4c5446322!2sDr.+Pooja+K.+Reddy,+DMD!3m1!1s0x0:0xe1ae3bf4c5446322" style="text-decoration: none; color: #3A84DF;"> Currently Closed </a>';
          }

          var infoContent = ['',
            '<div class="cards-wrapper">',              
              '<h1 style="',styles.h1,'"">', place.name, '</h1>',
              '<div class="address" style="', styles.address,'">',
                place.address_components[0].long_name, ' ', place.address_components[1].short_name, '<br/>',
                place.address_components[2].long_name, ', ', place.address_components[3].short_name, ' ', place.address_components[5].long_name,
              '</div>',
              '<div class="operation" style="font-size:12px; line-height: 15px;">',operation,'</div>',
              '<div class="left" class="phone">502-245-1237</div>',              
              '<div class="directions pull-right"><a href="'+address_url+'"><i class="fa fa-compass"></i> <span>Directions</span> </a></div>',
            '</div>'].join('');

          infowindow.setContent(infoContent);
          infowindow.open(map, marker);
      }

      // Grab our Schedule From Places Object and append to our Modal
      //console.log(place);

      // var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var officeHours = '';
      var now = new Date();

      // place.opening_hours.periods.forEach(function(e, i) {

      //   var open = day[e.open.day] + ' ' + getStandardTime(e.open.hours) + ':' + getMinutes(e.open.minutes) + ' ' + getTimeStamp(e.open.hours);
      //   var close = getStandardTime(e.close.hours) + ':' + getMinutes(e.close.minutes) + ' ' + getTimeStamp(e.close.hours);
      //   officeHours += '<li>' + open + ' - ' + close + '</li>';
      // });

      var officeHours = [];

      place.opening_hours.weekday_text.forEach(function(e, i) {
        if (i === 2) {
          officeHours.push('<li>Wednesday: (By appointment) 9:00 AM – 12:00 PM</li>');
        } else {
          officeHours.push('<li>'+e+'</li>');  
        }
              
      });
      officeHours[now.getDay() -1] = '<div class="today">'+officeHours[now.getDay() -1]+'</div>';

      $('.modal-week').append(officeHours);

      function getCallMessage(state) {
        if (state) {
          return '<div class="">We are open, and ready to take your call!</div>';
        } else {
         return '<div class="">Our office is currently closed, we will return your call as quickly as possible.</div>';
        }
      }

      $('#day-message').append(getCallMessage(place.opening_hours.open_now));

      

      infoWindow();

      }
    });

    
  }

  //initMap();
  window.initMap = initMap;

})();
