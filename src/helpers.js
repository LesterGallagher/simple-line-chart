
export const plot = (options, renderingContext) => {
    const { width, height } = renderingContext;
    const padding = {
        top: 10,
        left: 15,
        right: 10,
        bottom: 20
    };
    
    const contentWidth = width - padding.left - padding.right;
    const contentHeight = height - padding.top - padding.bottom;

    const min = options.min || Math.min(...[].concat(...options.data.map(x => x.data.map(point => point.value))));
    const max = options.max || Math.max(...[].concat(...options.data.map(x => x.data.map(point => point.value))));
    const a = -min;
    const b = contentHeight / (max - min);

    const ySteps = Math.floor(contentHeight / 20);
    const yValSteps = Math.round(contentHeight / ySteps / 5) * 5;

    const series = options.data.map(series => {
        return series.data.map((point, i, arr) => {
            const x = i / (arr.length - 1) * contentWidth + padding.left;
            const y = contentHeight + padding.top - (point.value + a) * b;
            return { x, y };
        });
    });

    const xAxisLabels = options.labels.map((label, i, self) => {
        const x = i / (self.length - 1) * contentWidth + padding.left;
        return { label: label, x, y: height - 2 };
    });

    const yAxisLabels = [];
    for(let y = 0; y < contentHeight + padding.top; y += yValSteps) {
        const top = contentHeight - y + padding.top;
        yAxisLabels.push({ x: 2, y: top, label: y })
    }
    return { series, a, b, min, max, xAxis: { labels: xAxisLabels }, yAxis: { labels: yAxisLabels } };
};

export const loopThroughPoints = (options, cb) => {
    options.data.forEach(series => {
        series.data.forEach((point, i, arr) => cb(point, i, arr, series));
    });
};