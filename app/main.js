/*jshint strict:false, browser:true */
(function bookmarklet() {
  var styleNode = document.createElement('style'),
    content = document.createTextNode('body { background: cornflowerblue; }');

  styleNode.appendChild(content);
  document.head.appendChild(styleNode);
  
  var COL_LENGTH = 45
  var tout = document.getElementsByName("content")[0];
  var drawing = false;
  var canvas = document.getElementById('canvas');
  var characters = [
    '.',
    ':',
    '+',
    'I',
    '?',
    'Z',
    '$',
    'M'
  ]
  
  function makeCell() {
    var div = document.createElement("div");
    div.style.color = "white";
    div.classList.add("point");
    div.innerHTML = characters[0];
    return div;
  }
  
  function makeClearfix() {
    var div = document.createElement("div");
    div.style.clear = "both";
    div.style.height = 0;
    return div;
  }
  
  function draw(el) {
    var index = characters.indexOf(el.innerHTML);
    if (el.style.color == "white") {
      el.style.color = "black";
    } else if (index < (characters.length - 1)){
      el.innerHTML = characters[index + 1];
    }
  }
  
  function erase(el) {
    el.style.color = 'white';
    el.innerHTML = '.';
  }
  
  for(var i = 0; i < 30; i++){
    for(var j = 0; j < COL_LENGTH; j++) {
      canvas.appendChild(makeCell());
    }
    canvas.appendChild(makeClearfix())
  }
  
  function tada(chars) {
    var lines = [];
    var output = "+--MY ART" + new Array(COL_LENGTH - 7).join('-') + '+\n';
    for (var i = 0; i < chars.length; i += COL_LENGTH) {
      output += '|' + chars.slice(i, i + COL_LENGTH).join('') + '|\n';
    }
    output += "+" + new Array(COL_LENGTH + 1).join('-') + '+\n';
    tout.value = tout.value + output;
  }
  
  var points = document.getElementsByClassName('point');
  
  var cursorFunction = draw;
  canvas.addEventListener('mousedown', function(e) {
    drawing = true;
  });
  document.getElementsByClassName('erase')[0].addEventListener('click', function(e) {
    cursorFunction = erase;
  });
  document.getElementsByClassName('draw')[0].addEventListener('click', function(e) {
    cursorFunction = draw;
  });
  document.getElementsByClassName('export')[0].addEventListener('click', function(e) {
    var stuff = [];
    var p = [].slice.call(points);
    p.forEach(function(el){
      if(el.style.color === 'white') {
        stuff.push(' ');
      } else {
        stuff.push(el.innerHTML);
      }
    });
    tada(stuff);
  });
  document.getElementsByClassName('clear')[0].addEventListener('click', function(e) {
    var p = [].slice.call(points);
    p.forEach(erase);
  });
  canvas.addEventListener('click', function(e) {
    cursorFunction = erase;
  });
  canvas.addEventListener('click', function(e) {
    cursorFunction = draw;
  });
  canvas.addEventListener('mouseup', function(e) {
    drawing = false;
  });
  canvas.addEventListener('mouseover', function(e) {
    var source = e.target;
    if (source.className === 'point') {
         drawing && cursorFunction(source);
    }
  });
}());
