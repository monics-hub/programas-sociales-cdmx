import { loadCSV } from "./papaParse.js";
import { getElementByName, setFields, setMenuOptions, updateCharts } from "./renderer.js";
import { setupEventHandlers } from "./events.js";

async function main() {
    setFields(
        "Martes 30 de Marzo del 2021", 
        "Servicios médicos y medicamentos", 
        "Respaldo Venustiano Carranza Otorga Servicios de Atención a la Salud y Medicamentos", 
        "Se otorgarán servicios de salud básicos a los habitantes de la demarcación", 
        "4640000", 
        "20000",
        "Venustiano Carranza",
        "2021",
        "Salud",
    );

    try {
        const data = await loadCSV("programas-sociales.csv");
        setMenuOptions(data, "entidad", getElementByName("menuEntidad"));
        setupEventHandlers(data);

    } catch (error) {
        console.error("Error loading CSV:", error);
    }
}

main();

let lastOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'; 
function handleOrientationChange() { 
    const warning = document.querySelector('.rotate-warning');
    const isPortrait = window.innerHeight > window.innerWidth; 
    const currentOrientation = isPortrait ? 'portrait' : 'landscape'; 
    if (window.innerWidth < 768 && isPortrait) { 
      warning.style.display = 'flex'; 
    } else { 
      warning.style.display = 'none'; 
    } // Reload the page if orientation has changed 
    if (currentOrientation !== lastOrientation) { 
      lastOrientation = currentOrientation; 
      location.reload(); 
   }}

window.addEventListener('resize', handleOrientationChange);
window.addEventListener('orientationchange', handleOrientationChange);
document.addEventListener('DOMContentLoaded', handleOrientationChange);