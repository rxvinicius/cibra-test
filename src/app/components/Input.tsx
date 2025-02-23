const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="border border-gray-300 rounded p-2 w-full" />
);

export { Input };

export default Input;
