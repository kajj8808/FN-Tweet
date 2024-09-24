interface AuthButtonProps {
  text: string;
  error?: string;
}
export default function AuthButton({ text, error }: AuthButtonProps) {
  return (
    <div className="flex flex-col gap-1">
      <button className="w-full bg-blue-500 py-3 text-center text-sm font-semibold transition-colors hover:bg-blue-600">
        {text}
      </button>
      {error ? (
        <span className="text-center text-xs text-red-500">{error}</span>
      ) : null}
    </div>
  );
}
