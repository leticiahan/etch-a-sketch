$(document).ready(function() {
  // create grid (16x16)
  var $grid = $('.grid');
  for (i = 0; i < 16; i++) {
    var row = '<div class="row">';
    for (j = 0; j < 16; j++) {
      row += '<div class="square"></div>';
    }
    row += '</div>';
    $grid.append(row);
  }
  // make height=width
  var $squareWidth = $('.square').width();
  $('.square').css({
    'height': $squareWidth + 'px'
  });

  // create hover effect: color-black;
  $('.square').hover(function() {
    $(this).css({'background-color': '#000'});
  })

});
