export function Card({ children, className, ...props }) {
    return (
      <div className={`rounded-lg border bg-white p-4 shadow ${className}`} {...props}>
        {children}
      </div>
    );
  }
  