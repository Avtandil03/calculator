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
  }

    function notNegative(number){
      if(number < 0)number = 0; 
      return number;      
    }

  /* resizin */

  for(let resizer of resizers){

    resizer.addEventListener("mousedown", mousedouwn );
    function mousedouwn(e) {
      let  currentResizer = e.target;

      window.addEventListener("mousemove" , mousemove);
      const rect = calculator.getBoundingClientRect();

      function mousemove(e) {
        const dynamicValue = {} ;
        switch (currentResizer.className) {          
          case "resizer n":
            dynamicValue.height = rect.bottom - e.clientY ;
            setPos(calculator , "top"); 
            break;
          case "resizer e":
            dynamicValue.width = e.clientX - rect.left ;
            break;
          case "resizer s":
            dynamicValue.height = e.clientY - rect.top;
            break;
          case "resizer w":
            dynamicValue.width = rect.right - e.clientX ;
            setPos(calculator , "top"); 
            setPos(calculator,"left"); ;
            break;
          case "resizer nw":
            dynamicValue.width = rect.right - e.clientX ;
            dynamicValue.height = rect.bottom - e.clientY ;
            setPos(calculator , "top"); 
            setPos(calculator,"left"); 
            break;
          case "resizer sw":
            dynamicValue.width = rect.right - e.clientX ;
            dynamicValue.height = e.clientY - rect.y ;
            setPos(calculator,"left"); ;
            break;
          case "resizer se":
            dynamicValue.width = e.clientX - rect.left ;
            dynamicValue.height = e.clientY - rect.top ;
            break;
          case "resizer ne":
            dynamicValue.width = e.clientX - rect.left ;
            dynamicValue.height = rect.bottom - e.clientY ;
            setPos(calculator , "top"); 
            break;
        }
        function setPos(element , value ){
          const heightLimiter = 500,
            widthLimiter = 320;

          if(value == "top"){
            element.style.top =
              dynamicValue.hegitight > heightLimiter
                ? notNegative(e.clientY) + "px"
                : rect.bottom - heightLimiter + "px";
          }else if( value == "left"){
            element.style.left =
              dynamicValue.width > widthLimiter
                ? notNegative(e.clientX) + "px"
                : rect.right - widthLimiter + "px";
          }
        }
        calculator.style.height = controlMinSize(dynamicValue.height, 500) + "px";
        calculator.style.width = controlMinSize(dynamicValue.width, 320) + "px";    
    
      }

      function controlMinSize(size, minSize ){
        if(minSize > size ){
          return minSize ;
        } else{
          return size;
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