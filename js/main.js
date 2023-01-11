document.addEventListener("DOMContentLoaded", () => {

  const calculator = document.querySelector(".calculator"),
  systemMenu = document.querySelector(".calculator__sysMenu"),
  hideBtn = systemMenu.querySelector(".hideBtn"),
  minimizeBtn = systemMenu.querySelector(".minimizeBtn"),
  closeBtn = systemMenu.querySelector(".closeBtn"),
  modeMenuBtn = document.querySelector(".header__menuBtn"),
  onTopOtherBtn = document.querySelector(".header__onTopOtherBtn"),
  journalBtn = document.querySelector(".header__journalBtn"),
  lastScreen = document.querySelector(".screen__last"),
  currentScreen = document.querySelector(".screen__current"),
  memoryBtns = document.querySelectorAll(".memoryBtn"),
  memoryJournalBtn = document.querySelector("#memoryJournalBtn"),
  historyJournal = document.querySelector(".historyJournal"),
  memoryJournal = document.querySelector(".memoryJournal"),
  modeHistory = document.querySelector(".modeHistory"),
  modeMemory = document.querySelector(".modeMemory"),
  mainBtnsWrapper = document.querySelector(".main__buttons"),
  calcBtnOnBottom = document.querySelector(".calculatorIcon"),
  calcBtnOnstyle = document.querySelector(".calulatorIcon__bottom"),
  modalCloser = document.querySelector(".modalCloser"),
  modeMenu = document.querySelector(".modeMenu"),
  resizers = document.querySelectorAll(".resizer"),
  leftContainer = document.querySelector(".calculator__leftContainer"),
  rightContainer = document.querySelector(".calculator__rightContainer");

  // 
  let minWidth = 320 ,
    minHeight = 500,
    maxWidth = document.body.clientWidth,
    maxHeight = document.body.clientHeight;


  /* drag&drop calculator */

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

  function notNegative(value) {
    if (value < 0) value = 0;
    return value;
  }

  /* resizing */

  for(let resizer of resizers){

    resizer.addEventListener("mousedown", (e)=>{
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
        function setPos(element, value) {
          if (value == "top"){
            if(dynamicValue.height > minHeight){
              if( dynamicValue.height > maxHeight){
                element.style.top = rect.bottom - maxHeight + "px";
              }else{
                element.style.top = notNegative(e.clientY) + "px";
              }
            }else {
              element.style.top = rect.bottom - minHeight + "px";
            }            
          } else if (value == "left"){

            if(dynamicValue.width > minWidth){
              if( dynamicValue.width > maxWidth){
                element.style.left = rect.right - maxWidth + "px";
              }else{
                element.style.left = notNegative(e.clientX) + "px"
              }
            }else {
              element.style.left = rect.right - minWidth + "px";
            } 
          }
        }
        calculator.style.height = controlMinSize(dynamicValue.height, minHeight, maxHeight) + "px";
        calculator.style.width = controlMinSize(dynamicValue.width, minWidth, maxWidth) + "px"; 
        if(dynamicValue.width & !onTopOtherBtn.classList.contains("active")) {
          displayRightContainer(controlMinSize(dynamicValue.width, minWidth, maxWidth));
        }
        if(currentScreen.classList.contains("resizingOnHeight")) {
          currentScreen.style = 
          `font-size:${scaleY(controlMinSize(dynamicValue.height, minHeight, maxHeight),160,500,18,38)}px;    margin-top: 0 !important; `;
        }
        
      }

      function scaleY(x, x1, x2, y1, y2){
        return (x-x1)*(y2-y1)/(x2-x1)+y1;
      }

      function controlMinSize(size, minSize , maxSize ){
        if(minSize > size ){
          return minSize ;
        } else if(maxSize < size){
          return maxSize;
        }
        else{
          return size;
        }
      }

      window.addEventListener("mouseup" , mouseup);
      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    } );
  }


  /* calculator events */
  calculator.addEventListener("click", (e) => {

    switch (e.target) {
      case modeMenuBtn:
        modeMenu.classList.toggle("hidden");
        modalCloser.classList.toggle("hidden");
        modeMenuBtn.classList.toggle("float");
        break;
      case hideBtn:
          calculator.classList.add("hidden");
          calcBtnOnstyle.style.width = "87%";
          calcBtnOnBottom.style = "background-color:transparent";
          transitionRegulator(calculator,200);
        break;
      case minimizeBtn:
        calculator.classList.toggle("maximized");
        minimizeBtn.classList.toggle("maximized");
        let rect = calculator.getBoundingClientRect();
        displayRightContainer(rect.width);
        break;
      case closeBtn:
        calcBtnOnstyle.style.display = "none";
        calcBtnOnBottom.style = "background-color:transparent"
        calculator.classList.add("closed");
        transitionRegulator(calculator, 200);
        break  
      case modalCloser: 
        modalCloser.classList.add("hidden");
        rightContainer.classList.remove("show");        
        rightContainer.classList.add("hidden");
        modeMenu.classList.add("hidden");
    }
  });
  
  /* history-memory modal */

  function displayRightContainer(width = 320){
    if(width <= (minWidth + 245)){
      rightContainer.classList.add("hidden");      
      journalBtn.style.display = "block";      
      memoryJournalBtn.style.display = "block";
    }else {      
      journalBtn.style.display = "none";
      leftContainer.after(rightContainer);
      rightContainer.classList.remove("hidden");
      rightContainer.classList.remove("show");
      modalCloser.classList.add("hidden");
      memoryJournalBtn.style.display = "none";
      turnHistoryModes();
    }
  }

  journalBtn.addEventListener("click", function(){
    openRightContainer();
    turnHistoryModes();
  })
  memoryJournalBtn.addEventListener("click", function(){
    openRightContainer();
    turnMemoryMode();
  });

  function openRightContainer(){
    mainBtnsWrapper.append(rightContainer);
    rightContainer.classList.remove("hidden")
    modalCloser.classList.toggle("hidden");
    rightContainer.classList.toggle("show");
  }

  /* history & memory modes */

  modeHistory.addEventListener("click", turnHistoryModes);

  function turnHistoryModes() {
    turnModes(modeHistory, modeMemory);
    turnModes(historyJournal, memoryJournal);
  }

  modeMemory.addEventListener("click", turnMemoryMode);

  function turnMemoryMode(){
    turnModes(modeMemory, modeHistory);
    turnModes(memoryJournal, historyJournal);
  } 
  function turnModes( turnOnMode , turnOffMode){  
    turnOnMode.classList.add("active");
    turnOffMode.classList.remove("active");
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

  /* onTopOthers mode */

  onTopOtherBtn.addEventListener("click", onTopOtherMode);
  function onTopOtherMode() {

    onTopOtherBtn.classList.toggle("active");
    if(onTopOtherBtn.classList.contains("active")){      
      minWidth = 160;
      minHeight = 160;
      maxWidth = 500;
      maxHeight = 500;
      calculator.style.width = "320px";
      calculator.style.height = "394px";
      calculator.style.top = "30px";
      calculator.style.left = (document.body.clientWidth - 350) + "px";
      calculator.querySelectorAll(".sysMenu__leftContainer, .hideBtn, .minimizeBtn, .header, .header__menuBtn,  .header__title, .header__journalBtn, .screen__last, .memory__buttons, #percentBtn, #dividedBy1Btn, #degreeBtn, #squareRootBtn").forEach((e)=>{
         e.classList.add("immediatelyHide") ;
      });
       currentScreen.style = `font-size: 38px; margin-top: 0; `;
       currentScreen.classList.add("resizingOnHeight");
       onTopOtherBtn.style = "position: absolute ; left: 2px ; top: -30px ;";
    } else{
      minWidth = 320;
      minHeight = 500;
      maxWidth = document.body.clientWidth;
      maxHeight = document.body.clientHeight;
    }

  }

  

  /* animation calcBtnOnBottom */
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

});