import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function downloadInvoicePdf(el: HTMLElement, filename: string) {
  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: "#fffdf8",
    useCORS: true,
    logging: false,
    windowWidth: Math.max(el.scrollWidth, 794),
  });
  const img = canvas.toDataURL("image/jpeg", 0.93);
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgH = (canvas.height * pageW) / canvas.width;
  let remaining = imgH;
  let offset = 0;
  pdf.addImage(img, "JPEG", 0, offset, pageW, imgH);
  remaining -= pageH;
  while (remaining > 4) {
    offset -= pageH;
    pdf.addPage();
    pdf.addImage(img, "JPEG", 0, offset, pageW, imgH);
    remaining -= pageH;
  }
  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
