main();

function main() {
    const formulaText: string = '1 + 2 * 3 / 4';
    const postfixNotations = convertStrToPostfix(formulaText);
    const result = calculateFormula(postfixNotations);
    console.log('result', result);
}

function convertStrToPostfix(formulaText: string): string[] {
    const calculateComponents = formulaText.split(' ');
    const operatorStack: string[] = [];
    const postfixNotations: string[] = [];

    for (const calculateComponent of calculateComponents) {
        if (!isOperator(calculateComponent)) {
            postfixNotations.push(calculateComponent);
            continue;
        }

        const operator = calculateComponent;
        if (operatorStack.length === 0) {
            operatorStack.push(operator);
            continue;
        }

        if (
            getOperatorPriority(operatorStack[operatorStack.length - 1]) <
            getOperatorPriority(operator)
        ) {
            operatorStack.push(operator);
            continue;
        }

        postfixNotations.push(operatorStack.pop() as string);
        operatorStack.push(operator);
    }

    while (operatorStack.length > 0) {
        postfixNotations.push(operatorStack.pop() as string);
    }

    return postfixNotations;
}

function calculateFormula(postfixNotations: string[]): number {
    const calculationStack: number[] = [];
    for (const postfixNotation of postfixNotations) {
        if (!isOperator(postfixNotation)) {
            calculationStack.push(Number(postfixNotation));
            continue;
        }

        const x = calculationStack.pop() || -1;
        const y = calculationStack.pop() || -1;

        if (postfixNotation === '+') {
            calculationStack.push(y + x);
        } else if (postfixNotation === '-') {
            calculationStack.push(y - x);
        } else if (postfixNotation === '*') {
            calculationStack.push(y * x);
        } else if (postfixNotation === '/') {
            calculationStack.push(y / x);
        }
    }

    return calculationStack.pop() || -1;
}

function isOperator(operator: string): boolean {
    const operators: string[] = ['+', '-', '*', '/'];
    return operators.includes(operator);
}

function getOperatorPriority(operator: string): number {
    const priorityMap: Record<string, number> = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1,
    };
    return priorityMap[operator] || -1;
}
