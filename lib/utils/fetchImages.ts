// Since setState functions have to be serialized, using "use client" declaration will throw an error, since this function will only itself be able to be used in a client environment.
import toast from "react-hot-toast";
import { API_URL } from "../constants/constants";

interface FetchImagesProps {
  images: ImageResponsePayload[];
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
  setImagesAsURLs?: React.Dispatch<React.SetStateAction<string[]>>;
}

export async function fetchImages({ images, setFiles, setImagesAsURLs }: FetchImagesProps) {
  try {
    images.forEach(async (image) => {
      const res = await fetch(`${API_URL}/v1/Image/${image.url}`, {
        method: "GET",
      });

      const data = await res.blob();
      const file = new File([data], image.id);
      const url = URL.createObjectURL(data);

      setFiles && setFiles((prev) => [...prev, file]);
      setImagesAsURLs && setImagesAsURLs((prev) => [...prev, url]);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSingleImage(imageURL: string, setImageAsURL: React.Dispatch<React.SetStateAction<string>>) {
  try {
    const res = await fetch(`${API_URL}/v1/Image/${imageURL}`, {
      method: "GET",
    });

    const data = await res.blob();
    const file = new File([data], imageURL);
    const url = URL.createObjectURL(data);

    setImageAsURL(url);
  } catch (error) {
    console.error(error);
  }
}
