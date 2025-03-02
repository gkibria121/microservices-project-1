function Input({ name }: { name: string }) {
  return (
    <input
      type="text"
      name={name}
      className="border px-2 py-1 border-slate-300 border-sm rounded-md"
    />
  );
}

export default Input;
