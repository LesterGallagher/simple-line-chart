import { plot, loopThroughPoints } from '../helpers.js';
import { relativeCoords } from './extensions.js';

export default class SvgRenderer {
    constructor(svg, options) {
        this.svg = svg;
        this.options = options;
        this.rendered = false;
    }

    render() {
        if (this.rendered) return;
        this.rendered = true;
        const { svg, options } = this;
        const renderingContext = {
            width: +svg.clientWidth,
            height: +svg.clientHeight
        };
        const plotted = plot(options, renderingContext);
        const { series, min, max, a, b, xAxis, yAxis } = plotted;
        options.data.forEach((origSeries, i) => {
            const d = series[i].map(
                (c, j) => (j === 0 ? "M" : "L") + c.x + " " + c.y
            ).join('');

            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            path.setAttribute("d", d);
            path.setAttribute("fill", 'none');
            path.setAttribute('stroke-width', origSeries['lineWidth'])
            path.setAttribute("stroke", origSeries['lineColor']);
            path.setAttribute('stroke-opacity', origSeries['lineOpacity']);
            path.setAttribute('stroke-dasharray', origSeries['lineDash'] && origSeries['lineDash'].join(' '));
            path.style.visibility = origSeries['hidden'] ? 'hidden' : 'visible';
            svg.appendChild(path);
        });

        for(let i = 0; i < xAxis.labels.length; i++) {
            const text = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );
            text.textContent = xAxis.labels[i].label;
            text.setAttribute('x', xAxis.labels[i].x);
            text.setAttribute('y', xAxis.labels[i].y);
            text.setAttribute('text-anchor', 'middle');
            svg.appendChild(text);
        }

        for(let i = 0; i < yAxis.labels.length; i++) {
            const text = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );
            text.textContent = yAxis.labels[i].label;
            text.setAttribute('x', yAxis.labels[i].x);
            text.setAttribute('y', yAxis.labels[i].y);
            text.setAttribute('alignment-baseline', 'middle')
            svg.appendChild(text);
        }

        const setPosition = e => {
            this.position = relativeCoords(e);
        }

        svg.addEventListener('mousemove',setPosition);
        svg.addEventListener('touchmove', setPosition);
    }

    getDataAtMouseHover() {
        if (!this.position) return null;
        
    }
}