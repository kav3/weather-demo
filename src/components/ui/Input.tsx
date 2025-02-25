export const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );