//function to enable long clicks in floorplan
//credit to @tknp for the code enclosed

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
         //         $( elm ).off('click');
           //         evt.preventDefault();
           //       evt.stopImmediatePropagation();

                  $( elm).trigger( 'longClick');
               }, settings.delay, this);
         } 
      )
     .on( 'click mouseup tapend touchend', function(evt) {
        clearTimeout( timer);
            evt.stopImmediatePropagation();
       
             evt.preventDefault();
          //  evt.stopPropagation();

        if( haveLongClick) {
         // have already triggered long click
        } else {
           // return shortClick, shortMouseup etc
           $(this).trigger( 'short' + evt.type[0].toUpperCase() + evt.type.slice(1));
        } 
} 
     );.
    }  // $.fn.mayTriggerLongClicks
    
  } )( jQuery);
