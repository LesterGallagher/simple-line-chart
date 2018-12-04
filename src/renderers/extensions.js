export const relativeCoords = event => {
    var bounds = event.target.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;
    return { x: x, y: y };
};