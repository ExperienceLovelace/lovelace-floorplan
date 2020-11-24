// $ Longclick Lib
//
// Details: Function to enable long clicks in floorplan
// Credits: To @tknp for the code enclosed
//
// Original Version: query.longclick-1.0.js
// Source: https://github.com/vaidik/jquery-longpress

( function( $) {

  // -- variables --
  var  defaults = {
    NS: 'jquery.longclick-',
    delay: 400
  };


  // -- function --
  $.fn.mayTriggerLongClicks = function( options) {
    // alter settings according to options
    var settings = $.extend( defaults, options);
    // define long click based on mousedown and mouseup
    var timer;
    var haveLongClick;
    return $( this).on( 'mousedown tapstart touchstart', function(evt) {
      haveLongClick = false;
      timer = setTimeout( function( elm) {
                haveLongClick = true;
                $( elm).trigger( 'longClick');
             }, settings.delay, this);
       } 
    )
   .on( 'click mouseup tapend touchend', function(evt) {
      clearTimeout( timer);

      if( haveLongClick) {
       // have already triggered long click
      } else {
         // trigger shortClick, shortMouseup etc
         $(this).trigger( 'short' + evt.type[0].toUpperCase() + evt.type.slice(1));
      } 
} 
   ).
   on( 'tap touch mouseup tapend touchend', function( evt) {
         if (haveLongClick) {
           evt.preventDefault();
           evt.stopImmediatePropagation();
         }
    } 
   )
   . on( 'click', function( evt) {
           evt.preventDefault();
           evt.stopImmediatePropagation();
    }
  );
  }  // $.fn.mayTriggerLongClicks
  
} )( $);
