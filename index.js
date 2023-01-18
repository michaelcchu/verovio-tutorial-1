function start() {
    const tk = new verovio.toolkit();
    console.log("Verovio has loaded!");
    tk.setOptions({
        scale: 50,
        landscape: true,
        adjustPageWidth: true,
    });
    console.log("Verovio options:", tk.getOptions());
    console.log("Verovio default options:", tk.getDefaultOptions());
    fetch("https://www.verovio.org/examples/downloads/Schubert_Lindenbaum.mei")
    .then( (response) => response.text() )
    .then( (meiXML) => {
        const svg = tk.renderData(meiXML, {});
        document.getElementById("notation").innerHTML = svg;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    verovio.module.onRuntimeInitialized = start;
})