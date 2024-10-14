import { API_URL } from "../constants/constants";

export async function imageFileBuilder(imageName: string) {
  const res = await fetch(`http://164.90.190.88:1313/Image/${imageName}`);
  const blob = await res.blob();

  try {
    const file = new File([blob], imageName, { type: blob.type });
    console.log(file);
    return file;
  } catch (error) {
    console.error("Error occured while trying to constuct a file from a given image", error);
    return null;
  }
}
