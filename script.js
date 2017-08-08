$(document).ready(function() {

  var num = 16; //default
  createGrid(num);

  // set grid size
  $('.set').click(function() {
    var x = parseInt($('#grid-value').val(), 10);
    if(!$.isNumeric(x)) {
      x = 16;
    }
    emptyGrid();
    createGrid(x);
  });

  // empty grid
  function emptyGrid() {
    $('.grid').replaceWith('<div class="grid"></div>');
  }

  // create grid (16x16)
  function createGrid(num) {
    var $grid = $('.grid');
    for (i = 0; i < num; i++) {
      var row = '<div class="row">';
      for (j = 0; j < num; j++) {
        row += '<div class="square" data-count="0"></div>';
      }
      row += '</div>';
      $grid.append(row);
    }

    // make height=width
    var $rowWidth = $('.row').width();
    console.log($rowWidth);
    var $squareWidth = $rowWidth / num;
    console.log($squareWidth);
    $('.square').css({
      'width': $squareWidth + 'px',
      'height': $squareWidth + 'px'
    });

    // hover effect with gradient (black)
    $('.square').hover(function() {
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
  };

  // clear button
  $('.clear').click(function() {
    emptyGrid();
    createGrid(num);
  });
});
