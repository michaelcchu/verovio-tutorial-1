function start() {
    const tk = new verovio.toolkit();
    console.log("Verovio has loaded!");

    const zoom = 80;
    const pageHeight = document.body.clientHeight * 100 / zoom; 
    const pageWidth = document.body.clientWidth * 100 / zoom;
    tk.setOptions({
        scale: zoom,
        landscape: true,
        pageHeight: pageHeight,
        pageWidth: pageWidth,
        svgAdditionalAttribute: ["note@pname", "note@oct"]
    });
    console.log("Verovio options:", tk.getOptions());
    console.log("Verovio default options:", tk.getDefaultOptions());
    fetch("https://www.verovio.org/examples/downloads/Schubert_Lindenbaum.mei")
    .then( (response) => response.text() )
    .then( (meiXML) => {
        const svg = tk.renderData(meiXML, {});
        document.getElementById("notation").innerHTML = svg;
        
        const rests = document.querySelectorAll('g.rest');
        for (const rest of rests) {
            rest.style.fill = "dodgerblue";
        }

        const c5s = document.querySelectorAll('g[data-pname="c"][data-oct="5"]');
        for (const c5 of c5s) {
            c5.style.fill = "orange";
        }

        const verses = document.querySelectorAll('g.verse');
        for (const verse of verses) {
            const attr = tk.getElementAttr(verse.id);
            if (attr.n && attr.n > 1) { verse.style.fill = "darkcyan";}
        }
    });


}

document.addEventListener("DOMContentLoaded", () => {
    verovio.module.onRuntimeInitialized = start;
})