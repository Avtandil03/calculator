document.addEventListener("DOMContentLoaded", (event) => {

  const calculator = document.querySelector(".calculator"),
  systemMenu = document.querySelector(".calculator__sysMenu"),
  hideBtn = systemMenu.querySelector(".hideBtn"),
  minimizeBtn = systemMenu.querySelector(".minimizeBtn"),
  closeBtn = systemMenu.querySelector(".closeBtn");

  let isDown,
  offset ;

  systemMenu.addEventListener("mousedown", function (e) {
    if(e.target != hideBtn & e.target != minimizeBtn & e.target != closeBtn){
      isDown = true;
      offset = [
        calculator.offsetTop - e.clientY,
        calculator.offsetLeft - e.clientX
      ];
      console.log(e.target)
    }
  }, true);

  document.addEventListener("mouseup", function(){
    isDown = false;
  },false)
    
  document.addEventListener("mousemove", function (e){

    if(isDown){
      calculator.style.top = notNegative(e.clientY + offset[0]) + "px";
      calculator.style.left = notNegative(e.clientX + (offset[1])) + "px";
    }

  },true);


  function notNegative(number){
    if(number < 0){
      number = 0;
    }
      
    return number;    
  }





});