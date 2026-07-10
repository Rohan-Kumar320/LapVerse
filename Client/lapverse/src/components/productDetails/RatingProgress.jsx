const RatingProgress = ({
    stars,
    count,
    total,
}) => {

    const percentage =
        total === 0
            ? 0
            : (count / total) * 100;

    return (

        <div className="flex items-center gap-4">

            <span className="w-8 font-medium">
                {stars}★
            </span>

            <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">

                <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

            <span className="w-10 text-right text-sm text-text-secondary">
                {count}
            </span>

        </div>

    );

};

export default RatingProgress;