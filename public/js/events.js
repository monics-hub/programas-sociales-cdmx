import { setFilteredData } from "./utils.js";
import { getElementByName, getElementValueByName, clearMenu, setMenuOptions, setFields, updateCharts } from "./renderer.js";

export function setupEventHandlers(data) {
    let entityData = data;
    let yearData = data;
    let sectionData = data;

    getElementByName("menuEntidad").addEventListener("click", () => {
        const selectedEntity = getElementValueByName("menuEntidad");
        entityData = setFilteredData(data, "entidad", selectedEntity);
        updateEntityMenu(entityData);
    });

    getElementByName("menuAgno").addEventListener("click", () => {
        const selectedYear = getElementValueByName("menuAgno");
        yearData = setFilteredData(entityData, "agno", selectedYear);
        updateYearMenu(yearData);
    });

    getElementByName("menuSeccion").addEventListener("click", () => {
        const selectedSection = getElementValueByName("menuSeccion");
        sectionData = setFilteredData(yearData, "seccion", selectedSection);
        updateSectionMenu(sectionData);
    });

    getElementByName("menuTitulo").addEventListener("click", () => {
        const selectedTitle = getElementValueByName("menuTitulo");
        updateTitleMenu(sectionData, selectedTitle);
    });

    getElementByName("buttonDescargar").addEventListener("click", () => {
        downloadPDF(sectionData);
    });

    getElementByName("checkboxEntity").addEventListener("click", () => {
        updateCharts(sectionData);
    });

    getElementByName("checkboxYear").addEventListener("click", () => {
        updateCharts(sectionData);
    });

    getElementByName("checkboxSection").addEventListener("click", () => {
        updateCharts(sectionData);
    });

    getElementByName("tableauViz").addEventListener("firstinteractive", () => {
        updateCharts(sectionData);
    });

   
}


function updateEntityMenu(filteredData) {
    clearMenu("menuAgno");
    clearMenu("menuSeccion");
    clearMenu("menuTitulo");
    setMenuOptions(filteredData, "agno", getElementByName("menuAgno"));
}


function updateYearMenu(filteredData) {
    console.log("Update Year Menu");
    clearMenu("menuSeccion");
    clearMenu("menuTitulo");
    setMenuOptions(filteredData, "seccion", getElementByName("menuSeccion"));
}


function updateSectionMenu(filteredData) {
    console.log("Update Section Menu");
    clearMenu("menuTitulo");
    setMenuOptions(filteredData, "titulo", getElementByName("menuTitulo"));
    
}


function updateTitleMenu(filteredData, title) {
    console.log("Update Title Menu");
    const row = filteredData.find(r => r.titulo === title) || filteredData[0];
    setFields(
        row.fecha_larga,
        title,
        row.subtitulo,
        row.descripcion,
        row.num_beneficiarios,
        row.presupuesto,
        row.entidad,
        row.agno,
        row.seccion
    );
    updateCharts(filteredData);
}


function downloadPDF(filteredData) {
    const title = getElementValueByName("menuTitulo");
    if (title !== "Todos los programas") {
        const link = filteredData.find(r => r.titulo === title)?.link_publicacion;
        if (link) window.open(link, "_blank");
    }
}






