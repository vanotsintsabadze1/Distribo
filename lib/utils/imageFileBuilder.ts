import { CDN_URL } from "../constants/constants";

export async function imageFileBuilder(imageName: string) {
  const res = await fetch(`${CDN_URL}/Image/${imageName}`, {
    cache: "no-cache",
  });
  const blob = await res.blob();
  // remove the . from the image type
  const type = blob.type.replace(".", "");

  try {
    const file = new File([blob], imageName, { type });
    return file;
  } catch (error) {
    console.error("Error occured while trying to constuct a file from a given image", error);
    return null;
  }
}
