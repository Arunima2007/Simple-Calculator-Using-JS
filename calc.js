let boxes=document.querySelectorAll(".box");
let calcoutput=document.querySelector(".calc-output");
let resetbtn=document.querySelector(".reset-btn");
let outputbtn=document.querySelector(".output-btn");
let delbtn=document.querySelector(".del-btn");
let facbtn=document.querySelector(".fac-btn");
var outputstr="";

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        delbtn.disabled=false;
        outputstr+=box.innerText;
        calcoutput.innerText=outputstr;
    });
});
resetbtn.addEventListener("click", () => {
    outputstr = "";
    calcoutput.innerText = "0";
    delbtn.disabled=false;
});

facbtn.addEventListener("click",()=>{
    let Numstr="";
    let i=outputstr.length-1;
    while(i>=0 && !isOperator(outputstr[i])){
        Numstr=outputstr[i]+Numstr;
        i--
    }
    let fact=1;
    for(let i=Number(Numstr);i>0;i--){
        fact*=i;
    }
    outputstr=outputstr.slice(0,i+1);
    outputstr=outputstr+String(fact);
})

const isOperator = (op) => {
    return ["+", "-", "×", "÷","^"].includes(op);
}
const precedence = (op) => {
    if(op==="^") return 3;
    if (op === "×" || op === "÷") return 2;
    if (op === "+" || op === "-") return 1;
    return 0;
}

const evaluate=(a, b, op)=>{
    if (op ==="+") return a + b;
    if (op === "-") return a - b;
    if (op === "×") return a * b;
    if (op === "÷") return a / b;
    if(op==="^") return a**b;
    return 0;
}

const evaluation = () => {
    const opstack = [];
    const oprstack = ["#"];
    
    let i = 0;
    while (i < outputstr.length) {
        let ch = outputstr[i];
        if (!isOperator(ch)) {
            let numStr = "";
            while (i < outputstr.length && !isOperator(outputstr[i])) {
                numStr += outputstr[i];
                i++;
            }
            opstack.push(Number(numStr));
            continue; 
        }

        let tok = ch;
        let opel = oprstack[oprstack.length - 1];
        if (precedence(tok) > precedence(opel)) {
            oprstack.push(tok);
        } else {
            while (
                oprstack.length > 0 &&
                precedence(tok) <= precedence(oprstack[oprstack.length - 1])
            ) {
                let op = oprstack.pop();
                let b = opstack.pop();
                let a = opstack.pop();
                opstack.push(evaluate(a, b, op));
            }
            oprstack.push(tok);
        }

        i++;
    }

    while (oprstack[oprstack.length - 1] !== "#") {
        let op = oprstack.pop();
        let b = opstack.pop();
        let a = opstack.pop();
        opstack.push(evaluate(a, b, op));
    }
    calcoutput.innerText = opstack.pop();
    delbtn.disabled=true;
}
outputbtn.addEventListener("click",evaluation);

delbtn.addEventListener("click",()=>{
    outputstr=outputstr.slice(0,outputstr.length-1);
    calcoutput.innerText=outputstr;
    console.log(outputstr)
});
