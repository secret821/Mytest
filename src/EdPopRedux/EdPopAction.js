const POP = {
    SHOW_POP:'SHOW_POP',
    CLOSE_POP:'CLOSE_POP'
}

const SHOW_POP = data => ({
    type: 'SHOW_POP',
    data
});

const CLOSE_POP = data => ({
    type: 'CLOSE_POP',
    data
});
export {
    POP,
    SHOW_POP,
    CLOSE_POP
}