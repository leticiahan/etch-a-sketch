$(document).ready(function() {

  // create grid (16x16)
  var $grid = $('.grid');
  for (i = 0; i < 16; i++) {
    var row = '<div class="row">';
    for (j = 0; j < 16; j++) {
      row += '<div class="square" data-count="0"></div>';
    }
    row += '</div>';
    $grid.append(row);
  }

  // make height=width
  var $squareWidth = $('.square').width();
  $('.square').css({
    'height': $squareWidth + 'px'
  });

  // hover effect with gradient (black)
  $('.square').mouseover(function() {
      $(this).addClass('black');
      var count = parseInt($(this).data('count'), 10) + 1;
      $(this).data('count', count);
      var opacity = 0.1;
      if($(this).data('count') <= 10) {
      	$(this).css({
        'opacity': opacity * $(this).data('count')
        });
      }
    });


});
