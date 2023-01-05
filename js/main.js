document.addEventListener("DOMContentLoaded", (event) => {

  const calculator = document.querySelector(".calculator"),
  systemMenu = document.querySelector(".calculator__sysMenu"),
  hideBtn = systemMenu.querySelector(".hideBtn"),
  minimizeBtn = systemMenu.querySelector(".minimizeBtn"),
  closeBtn = systemMenu.querySelector(".closeBtn"),
  calcBtnOnBottom = document.querySelector(".calculatorIcon"),
  calcBtnOnstyle = document.querySelector(".calulatorIcon__bottom"),
  resizers = document.querySelectorAll(".resizer");


  /* Перетаскивание калькулятора мышкой */


  systemMenu.addEventListener("mousedown", mousedown);
  function mousedown(e){
    let isDown = true;
    const rect = calculator.getBoundingClientRect();
    const overflow = {
      x : e.clientX - rect.x,
      y : e.clientY - rect.y
    }      
    
    if(e.target != hideBtn & e.target != minimizeBtn & e.target != closeBtn ){
      document.body.addEventListener("mousemove", mousemove);
    }      
    function mousemove(e) {
      console.log(rect.right)
      if(isDown){
      calculator.style.left = notNegative((e.clientX - overflow.x)) + "px";
      calculator.style.top = notNegative((e.clientY - overflow.y)) + "px";
      }
    }

    document.addEventListener("mouseup", mouseup);    
    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      isDown = false;
    }

    function notNegative(number){
      if(number < 0)number = 0; 
      return number;      
    }
  }


  /* resizin */

  for(let resizer of resizers){

    resizer.addEventListener("mousedown", mousedouwn );
    function mousedouwn(e) {
      let  currentResizer = e.target;
      const rect = calculator.getBoundingClientRect();

      window.addEventListener("mousemove" , mousemove);

      function mousemove(e) {
        switch (currentResizer.className) {
          
          case "resizer n":
            calculator.style.top = e.clientY + "px";
            calculator.style.height = rect.bottom - e.clientY + "px";
            break;
          case "resizer e":
            calculator.style.width = e.clientX - rect.left + "px";
            break;
          case "resizer s":
            calculator.style.height = e.clientY - rect.top + "px";
            break;
          case "resizer w":
            calculator.style.left = e.clientX + "px";
            calculator.style.width = rect.right - e.clientX + "px";
            break;
          case "resizer nw":
            calculator.style.top = e.clientY + "px";
            calculator.style.left = e.clientX + "px";
            calculator.style.width = rect.right - e.clientX + "px";
            calculator.style.height = rect.bottom - e.clientY + "px";
            break;
          case "resizer sw":
            calculator.style.left = e.clientX + "px";
            calculator.style.width = rect.right - e.clientX + "px";
            calculator.style.height = e.clientY - rect.y + "px";
            break;
          case "resizer se":
            calculator.style.width = e.clientX - rect.left + "px";
            calculator.style.height = e.clientY - rect.top + "px";
            break;
          case "resizer ne":
            calculator.style.top = e.clientY + "px";
            calculator.style.width = e.clientX - rect.left + "px";
            calculator.style.height = rect.bottom - e.clientY + "px";
            break;
        }
      }

      window.addEventListener("mouseup" , mouseup);
      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    }
  }

  /* animation bottomModal */
  calcBtnOnBottom.addEventListener("mouseenter",(e)=>{
    calcBtnOnstyle.style.width = "100%";
  },true)
  calcBtnOnBottom.addEventListener("mouseleave",(e)=>{
    if(calculator.className != "calculator"){
      calcBtnOnstyle.style.width = "87%";
    }
  },true)



  /* hide calculator */

  hideBtn.addEventListener("click", function(){
    calculator.classList.add("hidden");
    calcBtnOnstyle.style.width = "87%";
    calcBtnOnBottom.style = "background-color:transparent";
    transitionRegulator(calculator,200);
  },true)

  calcBtnOnBottom.addEventListener("click", function(){
    calcBtnOnstyle.style.display = "block"; 
    if(calculator.classList.contains("closed")){
      calculator.classList.remove("closed");      
      calcBtnOnBottom.style = "background-color:rgba(255, 255, 255, 0.25)"; 
    }else{
      calculator.classList.toggle("hidden");
      calcBtnOnBottom.style = "background-color:rgba(255, 255, 255, 0.25)"; 
      calcBtnOnstyle.style.width = "100%";
    }
    if (calculator.classList.contains("hidden")) {
        calcBtnOnBottom.style = "background-color:transparent";
    }
    transitionRegulator(calculator,200);  
  })
    
  function transitionRegulator(element, delay){
    element.style.transition = `${delay}ms`;
    setTimeout(() => {
      element.style.transition = `0ms`;
    }, delay);
  }

  /* close calculator */
  closeBtn.addEventListener("click", function(){
    calcBtnOnstyle.style.display = "none";
    calcBtnOnBottom.style = "background-color:transparent"
    calculator.classList.add("closed");
    transitionRegulator(calculator, 200);

  },true)

  /* make calculator resizible */














});