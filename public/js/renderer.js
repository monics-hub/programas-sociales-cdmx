const menuEntidad = document.getElementById("entidad-select");
const menuAgno = document.getElementById("agno-select");
const menuSeccion = document.getElementById("seccion-select");
const menuTitulo = document.getElementById("titulo-select");
const buttonDescargar = document.getElementById("download-button");
const labelTitulo = document.getElementById("program-title");
const labelFecha = document.getElementById("program-date");
const labelSubtitulo = document.getElementById("program-subtitle");
const labelDescripcion = document.getElementById("program-description");
const cardImpacto = document.getElementById("impact-value");
const cardPresupuesto = document.getElementById("budget-value");
const checkboxEntity = document.getElementById("maintain-entity");
const checkboxYear = document.getElementById("maintain-year");
const checkboxSection = document.getElementById("maintain-section");
const checkboxLabelEntity = document.getElementById("checkbox-label-entity");
const checkboxLabelYear = document.getElementById("checkbox-label-year");
const checkboxLabelSection = document.getElementById("checkbox-label-section");
const tableauViz = document.getElementById("chart");

export function getElementByName(elementName) {
  // INPUT: elementName (string)
  // OUTPUT: domElement
  switch (elementName) {
    case "menuEntidad":
        return menuEntidad;
    case "menuAgno":
        return menuAgno;
    case "menuSeccion":
        return menuSeccion;
    case "menuTitulo":
        return menuTitulo;
    case "buttonDescargar":
        return buttonDescargar;
    case "labelTitulo":
        return labelTitulo;
    case "labelFecha":
        return labelFecha;
    case "labelSubtitulo":
        return labelSubtitulo;
    case "labelDescripcion":
        return labelDescripcion;
    case "cardImpacto":
        return cardImpacto;
    case "cardPresupuesto":
        return cardPresupuesto;
    case "checkboxEntity":
        return checkboxEntity;
    case "checkboxYear":
        return checkboxYear;
    case "checkboxSection":
        return checkboxSection;
    default:
        console.warn(`Unknown element name: ${elementName}`);
        return null;
  }
}


export function getElementValueByName(elementName){
    // INPUT: elementName (string)
    // OUTPUT: menuValue (string)
    const element = getElementByName(elementName);
    return(element.value);
}


export function setFields(fecha, titulo, subtitulo, descripcion, num_beneficiarios, presupuesto, entidad, agno, seccion){
    labelFecha.textContent = fecha + '.';
    labelTitulo.textContent = titulo + '.';
    labelSubtitulo.textContent = subtitulo + '.';
    labelDescripcion.textContent = descripcion + '.';
    cardImpacto.textContent = Number(num_beneficiarios).toLocaleString('es-MX');
    cardPresupuesto.textContent = `$${Number(presupuesto).toLocaleString('es-MX')}`;
    checkboxLabelEntity.textContent = "Sólo " + entidad;
    checkboxLabelYear.textContent = "Sólo " + agno;
    checkboxLabelSection.textContent = "Sólo " + seccion;
}


export function clearMenu(elementName){
    // elementName: string
    const menu = getElementByName(elementName);
    menu.innerHTML = "";
}


export function setMenuOptions(filteredData, columnName, menuElement){
    // Clear currrent options
    menuElement.innerHTML = "";

    // Add default placeholder option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccione una opción…";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    menuElement.appendChild(defaultOption);

    if (menuElement != menuTitulo){
        const allOption = document.createElement("option");
        allOption.value = "all";
        allOption.textContent = "Todas las opciones";
        menuElement.appendChild(allOption);
    }
    
    const values = [...new Set(filteredData.map(row => row[columnName]))];
    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        menuElement.appendChild(option);
    })
}


export async function updateCharts(data) {
    const workbook = tableauViz.workbook;
    const dashboard = workbook.activeSheet;
    
    const title = labelTitulo.textContent.slice(0, -1);
    const row = data.find(r => r.titulo === title);

    // First clear existing filters
    dashboard.worksheets.forEach(sheet => {
        sheet.clearFilterAsync("Entidad");
        sheet.clearFilterAsync("Agno");
        sheet.clearFilterAsync("Seccion");
    });

    if (checkboxEntity.checked){
        dashboard.worksheets.forEach(sheet => {
        sheet.applyFilterAsync("Entidad", [row.entidad], "replace")});
    }
    if (checkboxYear.checked){
        dashboard.worksheets.forEach(sheet => {
        sheet.applyFilterAsync("Agno", [row.agno], "replace")});
    }
    if (checkboxSection.checked){
        dashboard.worksheets.forEach(sheet => {
        sheet.applyFilterAsync("Seccion", [row.seccion], "replace")});
    }
}