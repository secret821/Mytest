const { POP } = require("../EdPopAction");

var popArr = [];
var popId = 0;
function showPop(state, action) {
    const { data } = action;
    let a = popArr.slice(0)
    console.log("show个pop之前，先让我看看属性-----》",a)
    if (data) popArr.push(data)
    let b = popArr.slice(0)
    console.log("show个pop，我看看属性--->",b)
    popId++;
    var popState = Object.assign({}, state, { popArr, popId });
    return popState
}

function closePop(state, action) {
    const { data } = action;
    const { closeAll, popId } = data;
    if (closeAll) popArr.splice(0);
    else {
        if (popId) popArr.splice(data, 1);
        else popArr.splice(popArr.length - 1, 1);
    }
    var popState = Object.assign({}, state, { popArr });
    return popState
}

export function changePop(state = {}, action) {
    console.log('changePopReducer--->', state, action)
    var popState = {};
    switch (action.type) {
        case POP.SHOW_POP:
            popState = showPop(state, action)
            return popState;
        case POP.CLOSE_POP:
            popState = closePop(state, action)
            return popState;
        default:
            return state;
    }
}
