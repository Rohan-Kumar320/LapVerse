import WishlistItem from "./WishlistItem";

const WishlistGrid = ({ wishlist }) => {
  return (
    <div className="space-y-6">
      {wishlist.map((item) => (
        <WishlistItem
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;