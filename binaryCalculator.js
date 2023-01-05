const input = document.getElementById('res');
const ids = ['btn0', 'btn1', 'btnSum', 'btnSub', 'btnMul', 'btnDiv', 'btnClr'];
const buttons = document.querySelectorAll(
    ids.map(id => `#${id}`).join(', ')
);

// Loop over buttons and add click event.
// If user click to clear button remove inputs innertext, if not add its inner text to inputs innertext. 
for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];

    btn.addEventListener('click', function (e) {
        btn.id == 'btnClr' ? input.innerText = '' :
        input.innerText += e.target.innerText
    });
};

// Add click event to equals button.
document.getElementById('btnEql').addEventListener('click', function (e) {
    const text = input.innerText;
    // Create an object of functions that perform operations. 
    // Keys are operators and values are functions.
    const make_operation = {
        '+': (x, y) => { return x + y },
        '-': (x, y) => { return x - y },
        '*': (x, y) => { return x * y },
        '/': (x, y) => { return x / y },
    };

    // If there is no operator, it will not throw an error.
    if (!/[^\w\s]/.exec(text)) return;
    // Filter operators from inputs innertext.
    const operator = /[^\w\s]/.exec(text)[0];

    // Filter digits from inputs innertext.
    const numbers = text.split(/[+\//\-*]/);
    if (numbers.length < 2) return;

    // Convert binary to decimal, to be able to make operations.
    const operand1_dec = parseInt(numbers[0], 2);
    const operand2_dec = parseInt(numbers[1], 2);

    let result = make_operation[operator[0]](operand1_dec, operand2_dec);

    // Convert operations results to binary. 
    result = (result >>> 0).toString(2);
    input.innerText = result;
});