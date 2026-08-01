import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getSellerAnalytics,
} from "../../services/sellerAnalyticsService";
import AnalyticsCards from "../components/SellerAnalytics/AnalyticsCards";
import BusinessPerformance from "../components/SellerAnalytics/BusinessPerformance";
import RevenueChart from "../components/SellerAnalytics/RevenueCharts";
import OrderStatusChart from "../components/SellerAnalytics/OrderStatusChart";
import RatingDistribution from "../components/SellerAnalytics/RatingDistribution";
import TopProducts from "../components/SellerAnalytics/TopProducts";
import ProductPerformance from "../components/SellerAnalytics/ProductPerformance";
import BusinessInsights from "../components/SellerAnalytics/BusinessInsights";

const SellerAnalytics = () => {

  const [loading, setLoading] =
    useState(true);

  const [analytics, setAnalytics] =
    useState(null);

const [range, setRange] = useState("30d");

useEffect(() => {

    loadAnalytics();

}, [range]);

  const loadAnalytics = async () => {

    try {

      const response =
        await getSellerAnalytics(range);

      setAnalytics(
        response.analytics
      );

    }

    catch (error) {

      toast.error(
        "Unable to load analytics."
      );

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div>

        <h1
          className="
          text-3xl
          font-black
          text-[#e5ecef]
          "
        >

          Seller Analytics

        </h1>

        <p
          className="
          mt-2
          text-[#9f9fa2]
          "
        >

          Monitor your store performance.

        </p>

      </div>

      {/* <AnalyticsHeader

    range={range}

    setRange={setRange}

/> */}

<AnalyticsCards analytics={analytics} />

<BusinessPerformance
    analytics={analytics}
/>   

<RevenueChart
    monthlyRevenue={
        analytics.monthlyRevenue
    }
/>

<div
  className="
  grid
  gap-6
  xl:grid-cols-2
  "
>

  <OrderStatusChart
    statusCount={analytics.statusCount}
  />

<RatingDistribution
    ratingDistribution={
      analytics.ratingDistribution
    }
  />

  <TopProducts

    products={analytics.topProducts}

/>
</div>

<ProductPerformance
    products={analytics.productPerformance}
/>

<BusinessInsights
    insights={analytics.businessInsights}
/>

</div>

  );

};

export default SellerAnalytics;