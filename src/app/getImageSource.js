export default function (windowWidth, sources) {

    let src;
    let shortestDistance = Infinity;

    sources.forEach((source) => {
        let d = windowWidth - source.minWidth;
        if (d >= 0 && d < shortestDistance) {
            shortestDistance = d;
            src = source.src;
        }
    });

    return src;

}