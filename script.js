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
    //emptyGrid();
    //createGrid(num);
    $('.random').css({
      'background-color': '#fff',
      'border': 1 + 'px solid #000'
    });
    $('.rainbow').css({
      'background-color': '#fff',
      'border': 1 + 'px solid #000'
    });
  });

  // color: random
  var randomSquareColor;
  $('.random').click(function() {
    if($('.default').hasClass('black')){
      $('.default').removeClass('black');
    }
    $('.rainbow').css({
      'background-color': '#fff',
      'border': 1 + 'px solid #000'
    });
    colorOption = 'randomColor';
    randomSquareColor = setRandomColor();
    $(this).css({
      'background-color': randomSquareColor,
      'border': 1 + 'px solid ' + randomSquareColor
    });
    //emptyGrid();
    //createGrid(num);
  });

  // color: rainbow
  var rainbowArray = ['C263A2', 'EC689F', 'F68A45', 'F6D55C',
                      'C4D561', '73C173', '3D9CA6', '71C4D2'];
  $('.rainbow').click(function() {
    colorOption = 'rainbowColor';
    if($('.default').hasClass('black')){
      $('.default').removeClass('black');
    }
    $('.random').css({
      'background-color': '#fff',
      'border': 1 + 'px' + ' solid #000'
    });
    $(this).css({
      'background-color': getRainbow(),
      'border': 1 + 'px' + ' solid ' + getRainbow()
    });
  });

  function getRainbow() {
    var randomRainbow = '#' +
      rainbowArray[Math.floor(Math.random() * rainbowArray.length)];
    return randomRainbow;
  }

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
  return hexColor;
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
        if($(this).hasClass('randomColor')) {
          $(this).css({
            'background-color': randomSquareColor
          });
        }
        if($(this).hasClass('rainbowColor')) {
          $(this).css({
            'background-color': getRainbow()
          })
        }
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
