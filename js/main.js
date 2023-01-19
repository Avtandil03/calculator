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
  clearMemory = document.querySelector("#clearMemory"),
  memoryRecall = document.querySelector("#callFromMemory"),
  saveMemory = document.querySelector("#saveMemory"),
  addMemory = document.querySelector("#addMemory"),
  subMemory = document.querySelector("#subMemory"),
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
  rightContainer = document.querySelector(".calculator__rightContainer"),

  numberBtn = document.querySelectorAll("[data-number-btn]"),
  operatorBtn = document.querySelectorAll("[data-operator-btn]"),
  percentBtn = document.querySelector("#percentBtn"),
  clearCurrentScreenBtn = document.querySelector("#clearCurrentScreenBtn"),
  clearAllBtn = document.querySelector("#clearAllBtn"),
  backspaceBtn = document.querySelector("#backspaceBtn"),
  dividedBy1Btn = document.querySelector("#dividedBy1Btn"),
  degreeBtn = document.querySelector("#degreeBtn"),
  squareRootBtn = document.querySelector("#squareRootBtn"),
  invertorBtn = document.querySelector("#invertorBtn"),
  equalBtn = document.querySelector("#equalBtn"),
  deleteBtn = document.querySelector(".deleteBtn");


  /* calculator functional */
  let history = [];
  let memory = [];

  class Calculator  {
    constructor(currentScreen, lastScreen, historyJournal, memoryJournal){
      this.currentScreen = currentScreen;
      this.lastScreen = lastScreen;
      this.historyJournal = historyJournal;
      this.memoryJournal = memoryJournal;
      this.clearAll();

      this.tempHistory = {
        lastOperand: "2",
        operator: "+",
        currentOperand: "4",
        answear: "6"
      }
    }

    clear(){
      this.currentOperand = "0";
      this.currentScreenUpdate(this.currentOperand);
    }

    clearAll(){
      this.currentOperand = "0";
      this.lastOperand = "";
      this.answear = 0;
      this.lastScreen.innerText = "";
      this.operator = "";
      this.lastOperandFloat = 0;
      this.answear = 0;
      this.currentOperandFloat = 0;
      this.currentScreenUpdate(this.currentOperand);
    }

    backspace(){
      this.currentOperand = this.currentOperand.slice(0, -1);
      if(this.currentOperand == "") this.currentOperand = "0"
      this.currentScreenUpdate(this.currentOperand);
    }

    toPassNo(number){
      if( number == "." && this.currentOperand.includes(".")
          || number == "0" && this.currentOperand === "0"){
        return;
      }
      if(this.currentOperand == "0" && number != "."){
        this.currentOperand = "";
      }
      this.currentOperand = this.currentOperand + number;      
      this.currentScreenUpdate(this.currentOperand);
    }

    chooseOperator(operator){
      if(this.loopInWork){
        this.compute(this.operator);
      }
      if(this.currentOperand !== 0 && this.lastOperand == ""){
       this.lastOperand = this.currentOperand; 
      }
      this.operator = operator;
      lastScreen.innerHTML = `${this.lastOperand} ${this.operator}`;
      this.currentScreenUpdate(this.currentOperand);     
      this.lastOperandFloat = parseFloat(this.lastOperand); 
      this.currentOperand = 0;
      this.loopInWork = true;
    }

    compute(operator){  
      if(this.currentOperandFloat !== this.answear ||  this.loopInWork){        
      this.currentOperandFloat =(this.currentOperand !== 0)? parseFloat(this.currentOperand): parseFloat(currentScreen.innerHTML)
      };
      switch (operator) {
        case "÷":
          this.answear = this.lastOperandFloat / this.currentOperandFloat;
          break;
        case "×":
          this.answear = this.lastOperandFloat * this.currentOperandFloat;
          break;
        case "-":
          this.answear = this.lastOperandFloat - this.currentOperandFloat;
          break;
        case "+":
          this.answear = this.lastOperandFloat + this.currentOperandFloat;
          break; 
        case "":
          if(this.lastOperandFloat){            
          this.lastScreenUpdate(`${this.subOperandFloat} =`);
          }else{
          this.lastScreenUpdate(`${this.currentOperandFloat} =`);
          }
          return;       
        case "1/(":
          this.answear = 1 / this.lastOperandFloat;
          break;
        case "sqr(":
          this.answear = Math.pow(this.subOperandFloat, 2);
          break;
        case "√(":
          this.answear =  Math.sqrt(this.subOperandFloat);
          break;
      }
      if(operator == "1/(" || operator == "sqr(" || operator == "√("){    
        if(lastScreen.innerHTML == "") {
        this.lastScreenUpdate(`${operator}${this.subOperandFloat})`);   
        this.lastOperandFloat = this.answear;
        }else{
        this.lastScreenUpdate(`${this.lastOperandFloat}${this.operator}${operator}${this.subOperandFloat})`);  
        this.currentOperandFloat = this.answear;           
        }
        this.lastOperand = this.answear;
        return;
      }
      this.lastScreenUpdate(`${this.lastOperandFloat} ${operator} ${this.currentOperandFloat} =`);
      this.lastOperandFloat = this.answear;
      this.lastOperand = this.answear;
      this.currentScreenUpdate(this.answear);  
      this.loopInWork = false;
    }
    computePercent(){
      this.currentOperand = this.lastOperandFloat / 100 * +this.currentOperand;
      this.compute(this.operator);
    }
    computeSubOperations(typeOperation ){
      this.subOperandFloat = parseFloat(currentScreen.innerHTML);
      this.compute(typeOperation);
    }

    currentScreenUpdate(value = 0){        
      currentScreen.innerHTML = value;   
    }
    lastScreenUpdate(value = ""){
      lastScreen.innerHTML = value;
    }

    setHistory(num){
      if(history.length > 20){
        history.splice(0, 1);
        num = num - 1;
      }
      history[num] = {
        expression : lastScreen.innerHTML,
        answear: currentScreen.innerHTML
      }
      // console.log(`${history[num].expression} ${history[num].answear} `);
      this.addHistoryEl(history[num]);
    }
    addHistoryEl(object){
      const wrapper = document.createElement("div"),
        expression = document.createElement("p"),
        answear = document.createElement("p");

      wrapper.classList.add("journalWrapper");
      expression.classList.add("expression");
      answear.classList.add("answear");

      wrapper.appendChild(expression);
      wrapper.appendChild(answear);
      historyJournal.prepend(wrapper);

      let arr = historyJournal.querySelectorAll(".journalWrapper");
      if(arr.length > 0 && document.querySelector(".historyJournal__empty")){
        document.querySelector(".historyJournal__empty").style.display = "none";
      } 
      if(arr.length > 19){
        arr[arr.length - 1].remove();
      }

      expression.innerText = object.expression;
      answear.innerText = object.answear;
    }
    setMemory(num){
      memory[num] = currentScreen.innerHTML;
      this.addMemoryEl(memory[num])
    }
    addMemoryEl(value){
      const wrapper = document.createElement("div"),
        btnWrapper = document.createElement("div"),
        memoryValue = document.createElement("p"),
        clearBtn = document.createElement("button"),
        addBtn = document.createElement("button"),
        subBtn = document.createElement("button");
      wrapper.classList.add("journalWrapper");
      btnWrapper.classList.add("memoryBtns");
      memoryValue.classList.add("memoryValue");
      clearBtn.classList.add("memoryBtn");
      addBtn.classList.add("memoryBtn");
      subBtn.classList.add("memoryBtn");

      wrapper.appendChild(memoryValue);
      wrapper.appendChild(btnWrapper);
      btnWrapper.appendChild(clearBtn);
      btnWrapper.appendChild(addBtn);
      btnWrapper.appendChild(subBtn);
      memoryJournal.prepend(wrapper);
      clearBtn.innerText = "MC";
      addBtn.innerText = "M+";
      subBtn.innerText = "M-";

      let arr = memoryJournal.querySelectorAll(".journalWrapper");
      if(arr.length > 0 && document.querySelector(".memoryJournal__empty")){
        document.querySelector(".memoryJournal__empty").style.display = "none";
      }
      memoryValue.innerText = value;
    }
    updateLastMemoryEl(value){
      memoryJournal.querySelector(".journalWrapper .memoryValue").innerText = value;
    }
    addLastMemory(){
      if(memory.length > 0){        
      memory[memory.length - 1] = (+memory[memory.length - 1] + +currentScreen.innerHTML) + "";
      }else{
        this.setMemory(memory.length); 
      }
      this.updateLastMemoryEl(memory[memory.length - 1]);
    }
    subLastMemory(value){
      if(memory.length > 0){        
        memory[memory.length - 1] = (+memory[memory.length - 1] - +currentScreen.innerHTML) + "";
        }else{
          this.setMemory(memory.length); 
        }
        this.updateLastMemoryEl(memory[memory.length - 1]);      
    }
    clearJournals(clearHistory){
      if(clearHistory) {
        history = [];      
        historyJournal.querySelectorAll(".journalWrapper").forEach((e)=>{ 
          e.remove();
        })
        document.querySelector(".historyJournal__empty").style.display = "block";
      }else{
        memory = [];      
        memoryJournal.querySelectorAll(".journalWrapper").forEach((e)=>{
          e.remove();
        })        
        document.querySelector(".memoryJournal__empty").style.display = "block";
      }
    }
  }

  const _calculator = new Calculator(currentScreen, lastScreen, historyJournal, memoryJournal);

  numberBtn.forEach(btn => {
    btn.addEventListener("click", ()=>{
      _calculator.toPassNo(btn.innerText)
    });
  })
  operatorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      _calculator.chooseOperator(btn.innerText);
    })
  })
  clearAllBtn.addEventListener("click", ()=>{
    _calculator.clearAll();
  } );
  clearCurrentScreenBtn.addEventListener("click", () => {
    _calculator.clear();
  })
  backspaceBtn.addEventListener("click", () => {
    _calculator.backspace();
  })
  equalBtn.addEventListener("click", ()=> {
    _calculator.compute(_calculator.operator);
    _calculator.setHistory(history.length);
  })
  percentBtn.addEventListener("click", ()=>{
    _calculator.computePercent();
  })
  deleteBtn.addEventListener("click", ()=> {
    _calculator.clearJournals(historyJournal.classList.contains("active"));
    updateMemoryBtnsStatus();
  })
  saveMemory.addEventListener("click", ()=> {
    _calculator.setMemory(memory.length);
    updateMemoryBtnsStatus();
  })
  subMemory.addEventListener("click", ()=>{
    _calculator.subLastMemory();
    updateMemoryBtnsStatus();
  })
  addMemory.addEventListener("click", ()=>{
    _calculator.addLastMemory();
    updateMemoryBtnsStatus();
  })
  historyJournal.addEventListener("click", e=>{
    returnValueFrom(e, historyJournal, ["answear", "expression"]);
  })
  memoryJournal.addEventListener("click", e=>{
    returnValueFrom(e, memoryJournal, ["memoryValue", "memoryBtns"])
  })
  memoryRecall.addEventListener("click", ()=>{
    _calculator.currentOperand = memory[memory.length -1];
    _calculator.currentScreenUpdate(_calculator.currentOperand);
  })
  clearMemory.addEventListener("click", ()=>{    
    _calculator.clearJournals(false);
    updateMemoryBtnsStatus();
  })
  dividedBy1Btn.addEventListener("click", ()=>{
    _calculator.computeSubOperations("1/(");
  })
  degreeBtn.addEventListener("click", ()=>{
    _calculator.computeSubOperations("sqr(");
  })
  squareRootBtn.addEventListener("click", ()=>{
    _calculator.computeSubOperations("√(");
  })
  invertorBtn.addEventListener("click", ()=>{
    if(_calculator.currentOperand = currentScreen.innerHTML){
      _calculator.currentOperand = invertNum(_calculator.currentOperand)
      _calculator.currentScreenUpdate(_calculator.currentOperand);
    }else{
      currentScreen.innerHTML = invertNum(currentScreen.innerHTML);
    }
  });
  function invertNum(value){
    return (+ value * -1) + "";
  }
  memoryJournal.addEventListener("click", e=>{
    let clickedWrapper;
    const target = e.target ;

    if(target.classList.contains("memoryBtns") || target.classList.contains("memoryValue")){
      clickedWrapper = target.parentElement;
    }else if(target.classList.contains("memoryBtn")){
      clickedWrapper = target.parentElement.parentElement;
    }

    const journalList = memoryJournal.querySelectorAll(".journalWrapper");
    let wrapperNum ;
    for (let i = 0; i < journalList.length; i++) {
      if(journalList[i] == clickedWrapper){
        wrapperNum = i;
      }      
    }
    let memoryNum = memory.length - 1 - wrapperNum;
    const thisValue = journalList[wrapperNum].querySelector("p");
    
    if(target.classList.contains("memoryBtn")){
      switch (target.innerText) {
        case "MC":
          journalList[wrapperNum].remove();
          memory.splice(memoryNum, 1);
          _calculator.clearJournals(false);
          break;
        case "M+":
          memory[memoryNum] = +memory[memoryNum] + +currentScreen.innerHTML + "";
          thisValue.innerText = memory[memoryNum];
          break;
        case "M-":
          memory[wrapperNum] = +memory[memoryNum] - +currentScreen.innerHTML + "";
          thisValue.innerText = memory[memoryNum];
          break;
      }
    }
  })

  

  function returnValueFrom(e,journal, childClasses){
    const target = e.target;
    let clickedElement ;
    if(target.classList.contains("journalWrapper") && target){
      clickedElement = target;
    }else if(target.classList.contains(childClasses[0]) || target.classList.contains(childClasses[1])){
      clickedElement = target.parentElement;
    }
    
    if(clickedElement){
      if(journal == historyJournal) {
        _calculator.lastScreenUpdate(clickedElement.querySelector("." + childClasses[1]).innerText);
      }
      _calculator.currentScreenUpdate(clickedElement.querySelector("." + childClasses[0]).innerText);
      _calculator.currentOperand = clickedElement.querySelector("." + childClasses[0]).innerText;
    }
  }
  function updateMemoryBtnsStatus() {
    const changeBtns = [memoryJournalBtn, clearMemory, memoryRecall];
    console.log(memory)
    changeBtns.forEach(btn => {
      if(memory.length > 0){
        btn.classList.remove("notActiveBtn");
      }else{
        btn.classList.add("notActiveBtn");
      }
    })

  }

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
    
    if(e.target != hideBtn && e.target != minimizeBtn && e.target != closeBtn ){
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
        if(dynamicValue.width && !onTopOtherBtn.classList.contains("active")) {
          displayRightContainer(calculator.clientWidth);
        }
        if(currentScreen.classList.contains("resizingOnHeight")) {
          onTopStylesSet();
        }else{
          calculator.querySelectorAll("#percentBtn, #dividedBy1Btn, #degreeBtn, #squareRootBtn").forEach((e)=>{
            e.classList.remove("immediatelyHide") ;
          });
        }
        
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

      function scaleY(x , x1, x2, y1, y2){
        return (x-x1)*(y2-y1)/(x2-x1)+y1;
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
  let prevois = {firstValue: false};
  function onTopOtherMode() {
    let rect = calculator.getBoundingClientRect();
    calculator.classList.remove("maximized");    
    const changingElements = calculator.querySelectorAll(".sysMenu__leftContainer, .hideBtn, .minimizeBtn, .header, .header__menuBtn,  .header__title, .header__journalBtn, .screen__last, .memory__buttons");
    onTopOtherBtn.classList.toggle("active");
    if(onTopOtherBtn.classList.contains("active")){
      minWidth = 160;
      minHeight = 200;
      maxWidth = 500;
      maxHeight = 500;
      if(prevois.firstValue){
        setPrevoisSizes();
      }else{
        calculator.style.width = "320px";
        calculator.style.height = "394px";
        calculator.style.top = "30px";
        calculator.style.left = (document.body.clientWidth - 350) + "px";
        prevois.firstValue = true;
      }
      rightContainer.classList.add("hidden");
      changingElements.forEach((e)=>{
         e.classList.add("immediatelyHide") ;
      });
      currentScreen.classList.add("resizingOnHeight");
      currentScreen.style = `font-size: 28px;`;
      onTopOtherBtn.style = "position: absolute ; left: 2px ; top: -30px ;";
    } else {
      setPrevoisSizes();
      minWidth = 320;
      minHeight = 500;
      maxWidth = document.body.clientWidth;
      maxHeight = document.body.clientHeight;
      changingElements.forEach((e)=>{
         e.classList.remove("immediatelyHide");
      });
      if(calculator.clientWidth > minWidth + 245) rightContainer.classList.remove("hidden");
      currentScreen.style = `font-size: 46px;  `;
      currentScreen.classList.remove("resizingOnHeight");
      onTopOtherBtn.style = "position: initial ; left: auto ; top: auto ;";
    }
    
    fixPrevoisSizes(rect);
  }

  function setPrevoisSizes(){
    calculator.style.width = prevois.width ;
    calculator.style.height = prevois.height ;
    calculator.style.top = prevois.top ;
    calculator.style.left = prevois.left ;   
  }

  function fixPrevoisSizes(rect){
    prevois.width = rect.width + "px";
    prevois.height = rect.height + "px";
    prevois.top = rect.top + "px";
    prevois.left = rect.left + "px"; 
  }

  function onTopStylesSet(){
    currentScreen.style = `font-size:${scaleY(calculator.clientHeight,160,500,18,38)}px;`;
    if(calculator.clientHeight < 400){
      calculator.querySelectorAll("#percentBtn, #dividedBy1Btn, #degreeBtn, #squareRootBtn").forEach((e)=>{
        e.classList.add("immediatelyHide") ;
      });
    }else{
      calculator.querySelectorAll("#percentBtn, #dividedBy1Btn, #degreeBtn, #squareRootBtn").forEach((e)=>{
        e.classList.remove("immediatelyHide") ;
      });
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