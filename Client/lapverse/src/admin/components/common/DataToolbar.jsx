import {
  FiSearch,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

const DataToolbar = ({
  title,
  subtitle,
  search,
  onSearchChange,
  filters = [],
  loading = false,
  actions,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="flex flex-col gap-6 border-b border-slate-200 p-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-black text-slate-900">
            {title}
          </h1>

          <p className="mt-2 text-slate-500">
            {subtitle}
          </p>

        </div>

        <div className="flex flex-wrap items-center gap-3">

          {actions}

        </div>

      </div>

      {/* Toolbar */}

      <div className="p-6">

        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

          {/* Search */}

          <div className="relative w-full xl:max-w-lg">

            <FiSearch
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search users..."
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                pl-14
                pr-5
                text-slate-900
                outline-none
                transition
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100
              "
            />

          </div>

          {/* Right Side */}

          <div className="flex flex-wrap items-center gap-4">

            {filters.map((filter) => (

              <div
                key={filter.name}
                className="flex flex-col"
              >

                <label className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                  {filter.label || filter.name}

                </label>

                <select
                  value={filter.value}
                  onChange={(e) =>
                    filter.onChange(
                      e.target.value
                    )
                  }
                  className="
                    h-12
                    min-w-[160px]
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-slate-800
                    outline-none
                    transition
                    hover:border-slate-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                >

                  {filter.options.map((option) => (

                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>

                  ))}

                </select>

              </div>

            ))}

            <button
              disabled={loading}
              className="
                flex
                h-12
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >

              <FiRefreshCw
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh

            </button>

            <button
              className="
                flex
                h-12
                items-center
                gap-2
                rounded-xl
                bg-slate-900
                px-6
                font-semibold
                text-white
                transition
                hover:bg-black
              "
            >

              <FiDownload />

              Export

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DataToolbar;