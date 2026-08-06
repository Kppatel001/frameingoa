import QRCode from "qrcode";
import { loadImage } from "./image";

// Returns an <img> element of a brand-tinted QR code, ready to drawImage.
export async function makeQrImage(
  text: string,
  dark = "#04120C",
  light = "#FFD43B"
): Promise<HTMLImageElement> {
  const url = await QRCode.toDataURL(text, {
    errorCorrectionLevel: "M",
    margin: 1,
    scale: 8,
    color: { dark, light },
  });
  return loadImage(url);
}
