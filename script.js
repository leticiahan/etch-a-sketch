$(document).ready(function() {

  var num = 16; //default
  createGrid(num);

  var colorOption = 'black';

  // color: black (w/ gradient)
  $('.default').click(function() {
    colorOption = 'black';
    if(!$(this).hasClass(colorOption)){
      $(this).addClass(colorOption);
    }
    emptyGrid();
    createGrid(num);
  });

  // color: random
  $('.random').click(function() {
    setRandomColor();
    colorOption = 'randomColor';  // need class for randomColor
    if(!$(this).hasClass(colorOption)){
      $(this).addClass(colorOption);
    }
    if($('.default').hasClass('black')){
      $('.default').removeClass('black');
    }
    emptyGrid();
    createGrid(num);
  });

  function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var k = 0; k < 6; k++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomColor() {
  var hexColor = getRandomColor();
  $(".randomColor").css({'background-color': hexColor});
}

  // set grid size
  $('.set').click(function() {
    var x = parseInt($('#grid-value').val(), 10);
    num = x;
    if(!$.isNumeric(num)) {
      x = 16;
    }
    emptyGrid();
    createGrid(num);
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

    // hover effect
    $('.square').hover(function() {
        $(this).addClass(colorOption);
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
