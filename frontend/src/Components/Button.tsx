type ButtonType = "button" | "submit";

function Button({ type, className = "" }: { type: ButtonType; className: string }) {
  return (
    <button
      type={type}
      className={`w-fit cursor-pointer bg-blue-500 text-white px-2 py-1 rounded-md ${className}`}
    >
      Submit
    </button>
  );
}

export default Button;
