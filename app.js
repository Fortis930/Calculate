// var arr = []

const e = require("express");

// arr.pop(); //뒤에서 뺴는거
// arr.unshift(); //앞에서 뺴는거
// arr.push(1);

// console.log(arr);

// null //개발자가 없는값으로 설정해주고 싶을때
// undefined //쓰레기값 자동으로 초기화 해주는 값(정의되지 않음)

// new Number(1);
// a.tostring == 1
// // == 암묵적 변환이후 비교, === 타입까지 비교

// var // 문제점 1.중복선언으로 값 덮어쓰기가 된다. 2.변수 호이스팅 : 할당이전에 사용가능 나머지는 해당 없음
// let //변수 자체를 바꿀수 있다.
// const //변수가 가리키는 값은 못바꿈. 상수값 오브젝트 키는 바꿀수 있음.

let PostfixNotation = []; //후위 표기법 환성본 저장
let stackOperator = []; //후위표기법 만들때 쓸 연산자 저장용 스택
let stackCalculatePostfix = []; //계산할때 필요한 숫자 저장용 스택
//스택 재사용해도 되는데 사용 목적이 달라서 2개 선언함.

let text; //계산식

function main (Formula1){
    console.log("start : " );
    splitFormula(Formula1);
    FormulaCalculate();
};

function splitFormula (formulatext){
    let CalculateComponent = [];
    while(!isEmpty(formulatext)){
        let i = 0;
        CalculateComponent[i] = formulatext.split("\\s");
        i++;
    }
    
    for(i=0; i < CalculateComponent.length; i++){
        if( CheckOperator(CalculateComponent[i]) ) {
            if(isEmpty(stackOperator)){
                stackOperator.push(CalculateComponent[i]);
            } else {
                if(PriorityOperator(stackOperator.peek()) < PriorityOperator(CalculateComponent[i])) {
                    stackOperator.push(CalculateComponent[i]);
                } else {
                    PostfixNotation.push(stackOperator.pop());
                    stackOperator.push(CalculateComponent[i]);
                }
            }
        } else {
            PostfixNotation.push(CalculateComponent[i]);
        }
    };
    while(!isEmpty(stackOperator)){
        PostfixNotation.push(CalculateComponent.pop());
    }
};

function FormulaCalculate () {
    for(i=0; i < PostfixNotation.length(); i++){
        let x,y;
        if(CheckOperator(PostfixNotation[i])){
            x = stackCalculatePostfix.pop();
            y = stackCalculatePostfix.pop();

            if(PostfixNotation[i].equals("+")){
                stackCalculatePostfix.push(y+x);
            } else if(PostfixNotation[i].equals("-")){
                stackCalculatePostfix.push(y-x);
            } else if(PostfixNotation[i].equals("*")){
                stackCalculatePostfix.push(y*x);
            } else if(PostfixNotation[i].equals("/")){
                stackCalculatePostfix.push(y/x);
            }
        } else {
            stackCalculatePostfix.push(PostfixNotation[i]);
        }
    }
    console.log(stackCalculatePostfix.pop());
}

function CheckOperator (operator) {
    switch(operator){
        case "+" :
        case "-" :
        case "*" :
        case "/" :
            return 1;
        default:
            return 0;
    }
};

function PriorityOperator (operator) {
    switch(operator){
        case "+" :
        case "-" :
            return 0;
        case "*" :
        case "/" :
            return 1;
        default:
            return -1;
    }
};

function isEmpty (array){
    if(Array.isArray(array) && array.length === 0){
        return true;
    }
    return false;
}