import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping across the country.",
  },
  {
    icon: FiShield,
    title: "Secure Payments",
    description:
      "Your payments are protected with trusted gateways.",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description:
      "Simple return and replacement process.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description:
      "Friendly support whenever you need help.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-surface">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.3em] text-primary text-sm">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Shopping Made Easy
          </h2>

          <p className="text-text-secondary mt-5 max-w-2xl mx-auto">
            We provide an effortless shopping experience with
            premium laptops, secure payments, fast delivery,
            and dedicated customer support.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl bg-card border border-border p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
              >

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">

                  <Icon
                    size={30}
                    className="text-primary group-hover:scale-110 transition"
                  />

                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-text-secondary leading-7">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;