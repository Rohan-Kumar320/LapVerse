import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { useWishlist } from "../context/WishlistContext";

import WishlistGrid from "../components/wishlist/WishlistGrid";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";
import WishlistSkeleton from "../components/wishlist/WishlistSkeleton";

const Wishlist = () => {
  const {
    wishlist,
    loading,
  } = useWishlist();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">

        <section className="mx-auto max-w-7xl px-6 py-12">

          <div className="mb-10">

            <h1 className="text-4xl font-bold">
              My Wishlist
            </h1>

            <p className="mt-2 text-text-secondary">
              {wishlist.length} saved item
              {wishlist.length !== 1 && "s"}
            </p>

          </div>

          {loading ? (

            <WishlistSkeleton />

          ) : wishlist.length === 0 ? (

            <EmptyWishlist />

          ) : (

            <WishlistGrid wishlist={wishlist} />

          )}

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Wishlist;