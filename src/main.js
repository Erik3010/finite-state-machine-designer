import "../css/style.css";
import FSMDesigner from "./FSMDesigner";

const btnExport = document.querySelector("#btn-export");
const canvas = document.querySelector("#canvas");

const designer = new FSMDesigner({ canvas });
designer.init();

btnExport.addEventListener("click", () => designer.exportToPNG());
