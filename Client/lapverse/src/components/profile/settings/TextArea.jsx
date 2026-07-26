const TextArea = ({
  label,
  error,
  maxLength,
  value = "",
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

      <textarea

        {...props}

        value={value}

        maxLength={maxLength}

        className={`
          min-h-[140px]
          w-full
          resize-none
          rounded-2xl
          border
          border-border
          bg-background
          px-5
          py-4
          text-sm
          leading-7
          outline-none
          transition-all
          duration-300

          placeholder:text-text-secondary/60

          focus:border-primary
          focus:ring-4
          focus:ring-primary/10

          ${className}
        `}

      />

      <div className="flex items-center justify-between">

        {error ? (

          <p className="text-xs text-red-500">

            {error}

          </p>

        ) : (

          <span />

        )}

        {maxLength && (

          <span
            className="
              text-xs
              text-text-secondary
            "
          >

            {value.length}/{maxLength}

          </span>

        )}

      </div>

    </div>

  );

};

export default TextArea;