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
        this.style.backgroundColor = "dodgerblue";
    });

    $(".top-bar-right-buttons").mouseup(function(){
        this.style.backgroundColor = this.parentElement.style.backgroundColor;
    });

    // $(".project").mouseenter(function(){
    //     this.style.height = "500px";
    //     this.style.width = "400px";
    // });

    // $(".project").mouseleave(function(){
    //     this.style.height = "400px";
    //     this.style.width = "300px";
    // });
});

var _hasBeenInShadow = false;

$( document ).ready(function() {
    HasScrollFromTheTop()
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
  }
