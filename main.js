let intialState = 0;


// Create Button and text elements

function createButton(label, func) {
    let button = document.createElement('button');
    let buttonTextNode = document.createTextNode(label);
    button.appendChild(buttonTextNode);

    button.addEventListener('click', function() {
        func();
    });

    return button;
}

function createCounterText(text) {
    let counter = document.createElement('p');
    let counterTextNode = document.createTextNode(`Counter: ${text}`);
    counter.appendChild(counterTextNode);

    return counter;

}


// Create view 

const MESSAGES = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT'
}


function view(dispatch, state) {
    let component = document.createElement('div');
    component.classList.add('outer-div');

    component.appendChild(createCounterText(state));
    component.appendChild(createButton('+', () => {
        dispatch(MESSAGES.ADD);
    } ));
    component.appendChild(createButton('-', () => {
        dispatch(MESSAGES.SUBTRACT);
    } ));
    
    return component;

}


// updateState function

function updatedState(msg, state) {
    switch(msg) {
        case 'ADD':
            return state + 1;
        case 'SUBTRACT':
            return state - 1;
        default:
            return state;
    }
}


// append view to DOM



function app(intialState, updatedState, view, node) {
    let state = intialState;
    let currentview = view(dispatch, state);
    let currentCounterText = createCounterText(intialState);
    node.appendChild(currentview);

    function dispatch(msg) {

        state = updatedState(msg, state);
        const updatedview = view(dispatch, state);
        node.replaceChild(updatedview, currentview);
        currentview = updatedview;
        

    }


}

const rootNode = document.getElementById('app');

app(intialState, updatedState, view, rootNode);

