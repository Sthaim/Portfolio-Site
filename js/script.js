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
      this.style.color = "#FFD900";
  });

  $(".top-bar-right-buttons").mouseup(function(){
      this.style.backgroundColor = this.parentElement.style.backgroundColor;
  });
});

var _hasBeenInShadow = false;

var _isTop = false;

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
    console.log("I stop scrolling");
    _canScroll = false;
    if(_notTimeout != null)
      clearTimeout(_notTimeout);
    _notTimeout = setTimeout(TimerScrollDisable, 1000);
  }

  if (document.documentElement.scrollTop == 0 && !_isTop) {
    _isTop = true;
  }
}

function TimerScrollDisable(){
  if(_canScroll == true) return;
  console.log("I can scroll");
  _canScroll=true;
  _notTimeout = null;
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
