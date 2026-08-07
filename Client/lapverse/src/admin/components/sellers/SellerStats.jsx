const SellerStats = ({ sellers }) => {

    const total = sellers.length;

    const active = sellers.filter(

        seller => seller.accountStatus === "Active"

    ).length;

    const suspended = sellers.filter(

        seller => seller.accountStatus === "Suspended"

    ).length;

    const deleted = sellers.filter(

        seller => seller.accountStatus === "Deleted"

    ).length;

    const cards = [

        {

            title: "Total Sellers",

            value: total,

        },

        {

            title: "Active",

            value: active,

        },

        {

            title: "Suspended",

            value: suspended,

        },

        {

            title: "Deleted",

            value: deleted,

        },

    ];

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 text-black">

            {

                cards.map(card => (

                    <div

                        key={card.title}

                        className="rounded-[30px] bg-white p-6 shadow-lg"

                    >

                        <p className="text-sm text-slate-500">

                            {card.title}

                        </p>

                        <h2 className="mt-2 text-3xl font-black">

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

};

export default SellerStats;