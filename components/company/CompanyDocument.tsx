import { Plus, X } from "lucide-react";

interface CompanyDocumentProps {
  inputRef: React.RefObject<HTMLInputElement>;
  documents: File[];
  setDocuments: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function CompanyDocument({ inputRef, documents, setDocuments }: CompanyDocumentProps) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setDocuments((prev) => [...prev, ...Array.from(files)]);
    }
  }

  function onDocumentRemove(index: number) {
    setDocuments((prev) => prev.filter((_, idx) => idx !== index));

    if (inputRef.current?.files) {
      const newFiles = new DataTransfer();
      documents.forEach((file) => newFiles.items.add(file));
      inputRef.current.files = newFiles.files;
    }
  }
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold">Additional Documents (Optional, not implemented on backend yet):</span>
      <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-3">
        {documents.map((document, idx) => (
          <div
            key={idx}
            className="relative flex h-32 w-32 flex-col items-center justify-center rounded-md bg-gray-100 px-2"
          >
            <span className="text- text-lg font-bold">{(document.size / 1024 / 1024).toFixed(2)} MB</span>
            <span className="w-full truncate text-xs font-medium text-blue-800">{document.name}</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[.6rem] font-medium uppercase tracking-wider text-gray-400">
              Click to preview
            </span>
            <button onClick={() => onDocumentRemove(idx)} className="absolute right-2 top-2 rounded-md bg-black/40 p-1">
              <X size={15} color="white" />
            </button>
          </div>
        ))}
        <label
          htmlFor="companyDocuments"
          className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md"
        >
          <Plus size={25} />
        </label>
        <input
          ref={inputRef}
          type="file"
          name="companyDocuments"
          id="companyDocuments"
          className="hidden"
          onChange={handleFileChange}
          accept="application/pdf"
          multiple
        />
      </div>
    </div>
  );
}
