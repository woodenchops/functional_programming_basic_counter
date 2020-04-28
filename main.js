const intialState = 0;


// Create Button and text elements

function createButton(label, func) {
    const button = document.createElement('button');
    const buttonTextNode = document.createTextNode(label);
    button.appendChild(buttonTextNode);

    button.addEventListener('click', function() {
        func();
    });

    return button;
}

function createCounterText(text) {
    const counter = document.createElement('p');
    const counterTextNode = document.createTextNode(`Counter: ${text}`);
    counter.appendChild(counterTextNode);

    return counter;

}


// Create view 

const MESSAGES = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT'
}


function view(dispatch, state) {
    const component = document.createElement('div');
    component.classList.add('outer-div');

    component.appendChild(createCounterText(state));

    component.appendChild(createButton('+', function() {
        dispatch(MESSAGES.ADD);
    } ));

    component.appendChild(createButton('-', function() {
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
    node.appendChild(currentview);

    function dispatch(msg) {

        state = updatedState(msg, state); // changes the counter 
        const updatedview = view(dispatch, state); // updates the compomenent with new counter value
        node.replaceChild(updatedview, currentview); // replaces old component with new component
        currentview = updatedview; // see note below ***:
        
        /*
        
        NOTE:

        re-assigns the currentview to the updatedview - 
        so that every time the dispatch func is called, 'currentview' is constantlt being updated -
        this means that the replaceChild method knows which node to overide with the updated node e.g 'updatedview'
        
        node.replaceChild(updatedview == 'NEW', currentview == 'OLD');

        */

    }


}

const rootNode = document.getElementById('app');

app(intialState, updatedState, view, rootNode);

