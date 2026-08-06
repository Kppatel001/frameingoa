// Image loading (with HEIC support) + crop helpers shared by both studios.

export async function fileToImage(file: File): Promise<HTMLImageElement> {
  let blob: Blob = file;
  const isHeic =
    /heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);
  if (isHeic) {
    const heic2any = (await import("heic2any")).default as (o: {
      blob: Blob; toType?: string; quality?: number;
    }) => Promise<Blob | Blob[]>;
    const out = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
    blob = Array.isArray(out) ? out[0] : out;
  }
  const url = URL.createObjectURL(blob);
  try {
    return await loadImage(url);
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}

export interface Area { x: number; y: number; width: number; height: number; }

// Render the cropped area from react-easy-crop into a square canvas we can reuse.
export function cropToCanvas(
  img: HTMLImageElement,
  area: Area,
  size = 900
): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    img,
    area.x, area.y, area.width, area.height,
    0, 0, size, size
  );
  return c;
}

// For the cropper: returns a persistent display URL + the decoded image.
// Caller is responsible for revoking the URL when replacing/unmounting.
export async function fileToCropSource(
  file: File
): Promise<{ url: string; image: HTMLImageElement }> {
  let blob: Blob = file;
  const isHeic =
    /heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);
  if (isHeic) {
    const heic2any = (await import("heic2any")).default as (o: {
      blob: Blob; toType?: string; quality?: number;
    }) => Promise<Blob | Blob[]>;
    const out = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
    blob = Array.isArray(out) ? out[0] : out;
  }
  const url = URL.createObjectURL(blob);
  const image = await loadImage(url);
  return { url, image };
}
