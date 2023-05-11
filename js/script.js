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
      this.fourChildNode.style.color = "#FFD900";
  });

  $(".top-bar-right-buttons").mouseup(function(){
      this.style.backgroundColor = this.parentElement.style.backgroundColor;
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
const collectionN1 = document.getElementsByClassName("desc-project n1");

const collectionN2 = document.getElementsByClassName("desc-project n2");

var _n1Active = false;

var _n2Active = false;

var _currentUsedNumber = null;

var _isScrollBarred = null;

$(document).ready(function myFunction () {
  $(".button").mousedown(function(){
    var buttonNumber = FindButtonNumber(this,0);
    if(buttonNumber == _currentUsedNumber){
      CloseIndex(_currentUsedNumber);
      _currentUsedNumber = null;
    }
    else{
      OpenIndex(buttonNumber);
      CloseIndex(_currentUsedNumber);
      _currentUsedNumber = buttonNumber;
    }
  });
});


function FindButtonNumber(obj,i){
  if(obj.classList.contains("n"+i))
    return i;
  else
    return FindButtonNumber(obj,i+1);
}

function OpenIndex(i){
  var coll = document.getElementsByClassName("desc-project n"+i);
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

const sections = document.getElementsByClassName("section");

$(document).ready(function(){
	$(".button-nav").mousedown(function(){
	  if(this.classList.contains("plus")){
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
    console.log(currentPage);
	});
});

function HasReachedMax(i) {
  return sections.length-1 < i;
}

//#endregion