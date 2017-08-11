$(document).ready(function() {

  // input placeholders disappear on focus
  $(function() {
    $('#custom-color').data('holder', $('#custom-color').attr('placeholder'));
    $('#custom-color').focusin(function() {
      $(this).attr('placeholder', '');
    });
    $('#custom-color').focusout(function() {
      $(this).attr('placeholder', $(this).data('holder'));
    });
    $('#grid-value').data('holder', $('#grid-value').attr('placeholder'));
    $('#grid-value').focusin(function() {
      $(this).attr('placeholder', '');
    });
    $('#grid-value').focusout(function() {
      $(this).attr('placeholder', $(this).data('holder'));
    });
  });

  var num = 16; //default
  createGrid(num);

  $('.default, .random, .rainbow, .set-color').hover(function(){
    $(this).animate({top: "+=10"});},
  function(){$(this).animate({top: "-=10"});}
);




  var colorOption = 'black'; //default

  // color: black (w/ gradient) -- fix: don't add class
  $('.default').click(function() {
    colorOption = 'black';
    if (!$(this).hasClass('black')) {
      $(this).addClass('black');
    }
    $('.random, .rainbow, .set-color').css({
      'background-color': '#fff',
      'border': 1 + 'px solid #000'
    });
  });

  // color: random
  var randomSquareColor;
  $('.random').click(function() {
    if ($('.default').hasClass('black')) {
      $('.default').removeClass('black');
    }
    $('.rainbow, .set-color').css({
      'background-color': '#fff',
      'border': 1 + 'px solid #000'
    });
    randomSquareColor = setRandomColor();
    colorOption = 'randomColor';
    $(this).css({
      'background-color': randomSquareColor,
      'border': 1 + 'px solid ' + randomSquareColor
    });
  });

  // color: rainbow
  var rainbowArray = ['C263A2', 'EC689F', 'F68A45', 'F6D55C',
    'C4D561', '73C173', '3D9CA6', '71C4D2'
  ];
  $('.rainbow').click(function() {
    if ($('.default').hasClass('black')) {
      $('.default').removeClass('black');
    }
    $('.random, .set-color').css({
      'background-color': '#fff',
      'border': '1px solid #000'
    });
    colorOption = 'rainbowColor';
    $(this).css({
      'background-color': getRainbow(),
      'border': '1px solid ' + getRainbow()
    });
  });

  // color: customization
  /* to do:
  6. button changes the square color
  */
  var names = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];

  $('#custom-color').keyup(changeFontColor);

  var customSquareColor;
  $("#customize").click(function(){
    var color = $('#custom-color').val().trim();
    var formattedColor = color.replace(/([a-z])([A-Z])/g, '$1$2').toLowerCase();
    var rxValidHex = /^#(?:[0-9a-f]{3}){1,2}$/i;
    if(rxValidHex.test(color) || jQuery.inArray(formattedColor, names) !== -1){
  	customSquareColor = color;
  } else {
  	$('#custom-color').css('border-bottom', '2px solid red');
    $('#custom-color').effect('shake', {distance: 5, times:3}, 75);
    customSquareColor = 'white';
  }
  colorOption = 'customColor';
});

function changeFontColor() {
  var color = $('#custom-color').val().trim();
  var formattedColor = color.replace(/([a-z])([A-Z])/g, '$1$2').toLowerCase();
  var rxValidHex = /^#(?:[0-9a-f]{3}){1,2}$/i;
  if (rxValidHex.test(color) || jQuery.inArray(formattedColor, names) !== -1) {
    $('#custom-color').css({
      'color': color,
      'border-bottom': '2px solid ' + color
    });
    $('#customize').css({
      'background-color': color,
      'border': '1px solid ' + color
    });
  } else {
    $('#custom-color').css({
      'color': 'black',
      'border-bottom': '2px solid black'
    });
    $('#customize').css({
      'background-color': '#fff',
      'border': '1px solid ' + '#000'
    });
  }
  //
  if ($('.default').hasClass('black')) {
    $('.default').removeClass('black');
  }
  $('.random, .rainbow').css({
    'background-color': '#fff',
    'border': '1px solid #000'
  });
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

function getRainbow() {
  var randomRainbow = '#' +
    rainbowArray[Math.floor(Math.random() * rainbowArray.length)];
  return randomRainbow;
}

// set grid size
$('.set').click(function() {
  var x = parseInt($('#grid-value').val(), 10);
  num = x;
  if (!$.isNumeric(num)) {
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
    var count = parseInt($(this).data('count'), 10) + 1;
    $(this).data('count', count);
    // if black
    if(colorOption == 'randomColor'){
      $(this).css('background-color', randomSquareColor);
    } else if(colorOption == 'rainbowColor'){
      $(this).css('background-color', getRainbow());
    } else if(colorOption == 'customColor'){
      $(this).css('background-color', customSquareColor);
    } else {
      $(this).css('background-color', 'black');
    }
    var opacity = 0.1;
    if ($(this).data('count') <= 10) {
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
