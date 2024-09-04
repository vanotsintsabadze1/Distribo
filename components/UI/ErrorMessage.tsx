interface ErrorMessageProps {
  error: string[] | number[] | undefined;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    error && (
      <div className="flex w-full">
        <p className="text-xs font-semibold text-red-600">{error[0]}</p>
      </div>
    )
  );
}
