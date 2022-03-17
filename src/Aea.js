import { jsPDF } from "jspdf";
import { useEffect } from "react";

function Aea() {
  var JsBarcode = require("jsbarcode");
  const code = [
    { code: "*00001" },
    { code: "*02001" },
    { code: "*04001" },
    { code: "*06001" },
    { code: "*08001" },
    { code: "*10001" },
    { code: "*12001" },
    { code: "*14001" },
    { code: "*16001" },
    { code: "*18001" },
  ];
  const genPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "cm",
      format: [20, 30],
    });

    var arrayImg = code.map((item) => {
      let img = document.createElement("canvas");
      JsBarcode(img, item.code, {
        format: "CODE128",
        height: 100,
        width: 3,
        displayValue: true,
      });
      return img.toDataURL();
    });
    // groupArray array three by three
    var groupArray = [];
    for (let i = 0; i < arrayImg.length; i += 5) {
      groupArray.push(arrayImg.slice(i, i + 5));
    }
    console.log(groupArray);
    for (let i = 0; i < groupArray.length; i++) {
      if (i === 0) {
        doc.addImage(groupArray[i][0], 10, 10, 5, 10, 90);
        doc.addImage(groupArray[i][1], 20, 30);
        doc.addImage(groupArray[i][2], 20, 40);
        doc.addImage(groupArray[i][3], 20, 50);
        doc.addImage(groupArray[i][4], 20, 65);
      } else {
        doc.addImage(groupArray[i][0], 20, 10);
        doc.addImage(groupArray[i][1], 20, 30);
        doc.addImage(groupArray[i][2], 20, 40);
        doc.addImage(groupArray[i][3], 20, 50);
        doc.addImage(groupArray[i][4], 20, 65);
      }
    }
    doc.save("otro_modelo.pdf");
  };
  useEffect(() => {
    JsBarcode("#barcode", "000001", {
      format: "CODE128",
      height: 41,
      width: 2.05,
      displayValue: true,
    });
  }, []);
  return (
    <>
      <div onClick={() => genPdf()}>Download pdf 2</div>
      <img id="barcode" alt="aea" />
    </>
  );
}

export default Aea;
