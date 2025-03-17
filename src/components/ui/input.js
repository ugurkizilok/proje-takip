export function Input({ className, ...props }) {
    return (
      <input
        className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  }
  