const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (

    <div className="space-y-2">

      {label && (

        <label
          className="
            block
            text-sm
            font-medium
            text-text
          "
        >

          {label}

        </label>

      )}

      <input

        {...props}

        className={`
          w-full
          rounded-2xl
          border
          px-5
          py-4
          text-sm
          bg-background
          transition-all
          duration-300
          outline-none

          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-border focus:border-primary"
          }

          focus:ring-4
          focus:ring-primary/10

          placeholder:text-text-secondary/60

          ${className}
        `}

      />

      {error && (

        <p className="text-xs text-red-500">

          {error}

        </p>

      )}

    </div>

  );
};

export default Input;