import { plot, loopThroughPoints } from '../helpers.js';

export default class CanvasRenderer {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
    }

    render() {
        const { ctx, options } = this;
        const renderingContext = {
            width: +ctx.canvas.clientWidth,
            height: +ctx.canvas.clientHeight
        };
        const plotted = plot(options, renderingContext);
        const { series, min, max, a, b } = plotted;
        options.data.forEach((origSeries, i) => {
            if (origSeries.hidden) return;
            ctx.save();
            ctx.beginPath();
            series[i].forEach((c, j) => {
                if (j === 0) ctx.moveTo(c.x, c.y);
                else ctx.lineTo(c.x, c.y);
            });
            ctx.strokeStyle = origSeries['lineColor'];
            ctx.globalAlpha = origSeries['lineOpacity'];
            ctx.lineWidth = origSeries['lineWidth'];
            origSeries['lineDash'] !== undefined && ctx.setLineDash(origSeries['lineDash']);
            ctx.stroke();
            ctx.restore();
        });
    }
};