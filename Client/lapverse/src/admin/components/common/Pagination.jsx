const Pagination = ({
    page = 1,
    pages = 1,
    total = 0,
    limit = 10,
    onPageChange,
}) => {

    if (pages <= 1) return null;

    const startItem = (page - 1) * limit + 1;

    const endItem = Math.min(page * limit, total);

    const visiblePages = [];

    if (pages <= 7) {

        for (let i = 1; i <= pages; i++) {

            visiblePages.push(i);

        }

    }

    else {

        visiblePages.push(1);

        if (page > 4) {

            visiblePages.push("left");

        }

        const start = Math.max(2, page - 1);

        const end = Math.min(pages - 1, page + 1);

        for (let i = start; i <= end; i++) {

            visiblePages.push(i);

        }

        if (page < pages - 3) {

            visiblePages.push("right");

        }

        visiblePages.push(pages);

    }

    return (

        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row text-black">

            <p className="text-sm text-slate-600">

                Showing

                <span className="mx-1 font-semibold text-slate-900">

                    {startItem}

                </span>

                -

                <span className="mx-1 font-semibold text-slate-900">

                    {endItem}

                </span>

                of

                <span className="mx-1 font-semibold text-slate-900">

                    {total}

                </span>

                results

            </p>

            <div className="flex items-center gap-2">

                <button

                    disabled={page === 1}

                    onClick={() => onPageChange(page - 1)}

                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"

                >

                    Previous

                </button>

                {visiblePages.map((item, index) => {

                    if (item === "left" || item === "right") {

                        return (

                            <span

                                key={index}

                                className="px-2 text-slate-500"

                            >

                                ...

                            </span>

                        );

                    }

                    return (

                        <button

                            key={item}

                            onClick={() => onPageChange(item)}

                            className={`

                                h-10

                                w-10

                                rounded-xl

                                text-sm

                                font-semibold

                                transition

                                ${

                                    page === item

                                        ? "bg-blue-600 text-white shadow-md"

                                        : "border border-slate-200 bg-white hover:bg-slate-100"

                                }

                            `}

                        >

                            {item}

                        </button>

                    );

                })}

                <button

                    disabled={page === pages}

                    onClick={() => onPageChange(page + 1)}

                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"

                >

                    Next

                </button>

            </div>

        </div>

    );

};

export default Pagination;