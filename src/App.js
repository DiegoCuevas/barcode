import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import Aea from "./Aea.js";

var JsBarcode = require("jsbarcode");
function App() {
  const [code, setCode] = useState([]);
  const genPdf = () => {
    const pdf = new jsPDF({
      orientation: "l",
      unit: "cm",
      format: [28, 21],
    });
    for (let i = 0; i < code.length; i++) {
      for (let j = 0; j < code[i].length; j++) {
        let canvas = document.createElement("canvas");
        JsBarcode(canvas, code[i][j], {
          format: "CODE128",
          height: 37,
          width: 1.7,
          displayValue: true,
          text: code[i][j].substring(1),
          textMargin: -4,
        });
        let img = canvas.toDataURL();
        if (j === 0) {
          pdf.addImage(img, 0.9, 2.25);
        }
        if (j === 1) {
          pdf.addImage(img, 6.552, 2.25);
        }
        if (j === 2) {
          pdf.addImage(img, 12.266, 2.25);
        }
        if (j === 3) {
          pdf.addImage(img, 17.96, 2.25);
        }
        if (j === 4) {
          pdf.addImage(img, 23.66, 2.25);
        }
        if (j === 5) {
          pdf.addImage(img, 0.9, 12.75);
        }
        if (j === 6) {
          pdf.addImage(img, 6.552, 12.75);
        }
        if (j === 7) {
          pdf.addImage(img, 12.266, 12.75);
        }
        if (j === 8) {
          pdf.addImage(img, 17.96, 12.75);
        }
        if (j === 9) {
          pdf.addImage(img, 23.66, 12.75);
        }
      }
      console.log(i);
      if (i === 999){ 
        pdf.save("test.pdf")
        break;
      }
      pdf.addPage();
    }
  };
  useEffect(() => {
    let i = 0;
    let len = 20000;
    let aea1 = [];
    for (; i < len; i++) {
      let n = i + 1;
      aea1.push( n > 10000 ? "*" + n : "*" + "0".repeat(5 - n.toString().length) + n);
    }
    let aea = aea1;
    let group2 = [];
    for (let i = 0; i < aea.length; i += 2000) {
      group2.push(aea.slice(i, i + 2000));
    }
    /* group all sub elements with the same index  */
    let group = [];
    for (let i = 0; i < group2.length; i++) {
      for (let j = 0; j < group2[i].length; j++) {
        if (group[j] === undefined) {
          group[j] = [];
        }
        group[j].push(group2[i][j]);
      }
    }
    setCode(group);
  }, []);
  return (
    <>
      <button className="App" onClick={() => genPdf()}>
        Download pdf
      </button>
      <img id="barcode" alt="aea" />
      <Aea></Aea>
    </>
  );
}

export default App;
