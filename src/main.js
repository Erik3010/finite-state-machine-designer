import "../css/style.css";
import FSMDesigner from "./FSMDesigner";

const canvas = document.querySelector("#canvas");

const designer = new FSMDesigner({ canvas });
designer.init();
