import { FiCalendar } from "react-icons/fi";

const AnalyticsHeader = ({ range, setRange }) => {

  return (

    <div
      className="
      mb-8
      flex
      flex-col
      gap-6
      md:flex-row
      md:items-center
      md:justify-between
      "
    >

      {/* Left */}

      <div>

        <h1
          className="
          text-4xl
          font-black
          tracking-tight
          text-[#0F3040]
          "
        >

          Analytics Dashboard

        </h1>

        <p
          className="
          mt-2
          text-lg
          text-[#464858]
          "
        >

          Monitor your store performance and business insights.

        </p>

      </div>

      {/* Right */}

      <div
        className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-[#ECE7E4]
        bg-white
        px-5
        py-3
        shadow-sm
        "
      >

        <FiCalendar
          className="
          text-[#659287]
          "
          size={20}
        />

        <select

          value={range}

          onChange={(e) =>
            setRange(e.target.value)
          }

          className="
          cursor-pointer
          bg-transparent
          font-semibold
          text-[#0F3040]
          outline-none
          "

        >

          <option value="7d">

            Last 7 Days

          </option>

          <option value="30d">

            Last 30 Days

          </option>

          <option value="90d">

            Last 3 Months

          </option>

          <option value="365d">

            Last 12 Months

          </option>

        </select>

      </div>

    </div>

  );

};

export default AnalyticsHeader;