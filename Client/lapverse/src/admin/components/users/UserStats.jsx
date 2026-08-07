import {
  FiUsers,
  FiUserCheck,
  FiShield,
  FiAlertCircle,
} from "react-icons/fi";

const UserStats = ({ overview }) => {

  const stats = [

    {
      title: "Users",
      value: overview.totalUsers,
      icon: <FiUsers size={24} />,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "bg-blue-500",
    },

    {
      title: "Sellers",
      value: overview.totalSellers,
      icon: <FiUserCheck size={24} />,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "bg-emerald-500",
    },

    {
      title: "Admins",
      value: overview.totalAdmins,
      icon: <FiShield size={24} />,
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
      accent: "bg-violet-500",
    },

    {
      title: "Deletion Requests",
      value: overview.deletionRequests || 0,
      icon: <FiAlertCircle size={24} />,
      bg: "bg-rose-50",
      iconColor: "text-rose-600",
      accent: "bg-rose-500",
    },

  ];

  return (

    <div
      className="
      grid
      gap-6
      sm:grid-cols-2
      xl:grid-cols-4
    "
    >

      {stats.map((item) => (

        <div

          key={item.title}

          className="
          group
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-neutral-200
          bg-white
          p-6
          shadow-lg
          shadow-black/5
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "

        >

          <div
            className={`
            absolute
            left-0
            top-0
            h-full
            w-1
            ${item.accent}
          `}
          />

          <div
            className="
            flex
            items-start
            justify-between
          "
          >

            <div>

              <p
                className="
                text-sm
                font-medium
                uppercase
                tracking-[0.18em]
                text-neutral-500
              "
              >

                {item.title}

              </p>

              <h2
                className="
                mt-5
                text-4xl
                font-black
                text-neutral-900
              "
              >

                {item.value.toLocaleString()}

              </h2>

            </div>

            <div
              className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              ${item.bg}
              ${item.iconColor}
            `}
            >

              {item.icon}

            </div>

          </div>

          <div
            className="
            mt-6
            h-1
            w-full
            rounded-full
            bg-neutral-100
          "
          >

            <div
              className={`
              h-full
              w-1/2
              rounded-full
              ${item.accent}
            `}
            />

          </div>

        </div>

      ))}

    </div>

  );

};

export default UserStats;