//#region Buttons
$(document).ready(function(){
  $(".top-bar-right-buttons").mouseenter(function(){
      var fourChildNode = this.querySelector('.nav-bar');
      fourChildNode.style.width = "100%";
  });
  $(".top-bar-right-buttons").mouseleave(function(){
      var fourChildNode = this.querySelector('.nav-bar');
      fourChildNode.style.width = "0";
  });

  $(".top-bar-right-buttons").mousedown(function(){
      $(this).find("h2").css("color" ,"#FFD900");
  });

  $(".top-bar-right-buttons").mouseup(function(){
    $(this).find("h2").css("color" ,"#fefefe");
  });
});
//#endregion

//#region Block scroll


var _canScroll = true;

var _notTimeout;

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

window.addEventListener(wheelEvent, PreventScroll,{passive: false});
window.addEventListener('DOMMouseScroll', PreventScroll, false); // older FF
window.addEventListener('touchmove', PreventScroll, wheelOpt); // mobile
window.addEventListener('keydown', PreventScrollForScrollKeys, false);

function PreventScroll(e){
  if(_canScroll == true) return;
  e.preventDefault();
}

function PreventScrollForScrollKeys(e){
  if(_canScroll == true) return;
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}


function TimerScrollDisable(){
  if(_canScroll == true) return;
  _canScroll=true;
  _notTimeout = null;
}

//#endregion

//#region Effect top of page
var _hasBeenInShadow = false;

var _isTop = false;

$( document ).ready(function() {
  HasScrollFromTheTop();
});
  
window.onscroll = function() {HasScrollFromTheTop()};

function HasScrollFromTheTop() {
  if (document.documentElement.scrollTop != 0 && !_hasBeenInShadow) {
    _hasBeenInShadow = true;
    document.getElementById("top-bar").id = "top-bar-shadow";
  }
  else if (document.documentElement.scrollTop == 0 && _hasBeenInShadow){
    _hasBeenInShadow = false;
    document.getElementById("top-bar-shadow").id = "top-bar";
  }

  if (document.documentElement.scrollTop != 0 && _isTop) {
    _isTop = false;
    window.scrollTo(0, Position(document.getElementById("anchor-about-me")));
    _canScroll = false;
    if(_notTimeout != null)
      clearTimeout(_notTimeout);
    _notTimeout = setTimeout(TimerScrollDisable, 1000);
  }

  if (document.documentElement.scrollTop == 0 && !_isTop) {
    _isTop = true;
  }
}


function Position(obj){
  var currenttop = 0;
  if (obj.offsetParent){
   do{
    currenttop += obj.offsetTop;
   }while ((obj = obj.offsetParent));
    return [currenttop];
   }
}

//#endregion

//#region Opening under project
var _currentUsedNumber = null;

$(document).ready(function myFunction () {
  $(".button").mousedown(function(){
    var buttonNumber = FindButtonNumber($(this));
    if(buttonNumber == _currentUsedNumber){
      CloseIndex(_currentUsedNumber);
      _currentUsedNumber = null;
    }
    else{
      OpenIndex(buttonNumber);
      CloseIndex(_currentUsedNumber);
      _currentUsedNumber = buttonNumber;
      ButtonToggleOnMinMax();
    }
  });
});


function FindButtonNumber(obj,i=0){
  if(obj.hasClass("n"+i))
    return i;
  else
    return FindButtonNumber(obj,i+1);
}

function OpenIndex(i){
  var coll = document.getElementsByClassName("desc-project n"+i);
  UpdateSections(i);
  ResetPosition();
  for (const box of coll) {
        box.classList.add('opened');
      }
}

function CloseIndex(i){
  var coll = document.getElementsByClassName("desc-project n"+i); 
  for (const box of coll) {
        box.classList.remove('opened');
      }
}


//#endregion

//#region Sliding div

var currentPage = 0;

var sections = 0;

function UpdateSections(i){
  sections = document.getElementsByClassName("section n"+i).length;
}

$(document).ready(function(){
  UpdateSectionWidth();
	$(".button-nav").mousedown(function(){
	  if(this.classList.contains("plus")){
      //console.log(currentPage + " is the current page. " + sections.length + " is the max");
	    if (HasReachedMax(currentPage+1)){
  	    return;
  	  }
      currentPage++;
  		$(this).parent().find('.parent-sliding').css({"right": 100 * currentPage + "%"});
		}
		else{
  	  if (currentPage <= 0)
  	    return;
  	  currentPage--;
  		$(this).parent().find('.parent-sliding').css({"right": 100 * currentPage + "%"});
		}
    ButtonToggleOnMinMax();
	});

  $(".button-close").mousedown(function(){
	  CloseIndex(_currentUsedNumber);
      _currentUsedNumber = null;
	});
});

function ResetPosition(){
  currentPage = 0;
  $('.parent-sliding').css({"right": 100 * currentPage + "%"});
}

function UpdateSectionWidth(){
    var parentSlidings = document.querySelectorAll(".parent-sliding");
    for (var i = 0, len = parentSlidings.length; i < len; i++) {
      var nIndex = FindButtonNumber($(parentSlidings[i]).parent());
      var offset = document.querySelectorAll(".section.n"+nIndex).length;
      $(parentSlidings[i]).css({"width": 100 * offset + "%"});
    }
}

function ButtonToggleOnMinMax(){
  if(_currentUsedNumber == null) return;
  var minusButton = document.querySelector(".button-nav:not(.plus).n"+_currentUsedNumber);
  if(currentPage == 0){
    if(!minusButton.classList.contains("out"))
      minusButton.classList.add("out");
  }
  else{
    if(minusButton.classList.contains("out"))
      minusButton.classList.remove("out");
  }
  var plusButton = document.querySelector(".button-nav.plus.n"+_currentUsedNumber);
  if(HasReachedMax(currentPage+1)){
    if(!plusButton.classList.contains("out"))
      plusButton.classList.add("out");
  }
  else{
    if(plusButton.classList.contains("out"))
      plusButton.classList.remove("out");
  }       
}
function HasReachedMax(i) {
  return sections-1 < i;
}

//#endregion