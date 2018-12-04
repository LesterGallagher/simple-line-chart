import CanvasRenderer from './renderers/canvas.js';
import SvgRenderer from './renderers/svg.js';

const getRenderer = (target, options) => {
    if (typeof target === "string") {
        const selected = document.querySelector(target);
        return getRenderer(selected, options);
    } else if (target instanceof CanvasRenderingContext2D) {
        return new CanvasRenderer(target, options);
    } else if (target.tagName === "CANVAS") {
        const ctx = target.getContext("2d");
        return new CanvasRenderer(ctx, options);
    } else {
        return new SvgRenderer(target, options);
    }
};

class Chart {
    constructor(target, options) {
        const renderer = getRenderer(target, options);

        renderer.render();
    }
}

window['Chart'] = Chart;
