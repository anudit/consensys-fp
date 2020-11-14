// check if touch device
function isTouchDevice(){
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function(query) {
      return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }

  // add class for body
  if (isTouchDevice()) {
    $('body').addClass('touch-device');

    // navigation
    $('.nav-link-drop').on('click', function(e){
      e.preventDefault();
      $(this).next().toggleClass('visible');
    });
  }

  var accordionItem = $('.accordion-item'),
      accordionHead = $('.accordion-head');

  accordionHead.on('click', function(){
    accordionItem.removeClass('active');
    $(this).parent().addClass('active');
  });
