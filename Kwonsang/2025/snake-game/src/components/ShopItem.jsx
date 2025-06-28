import React from "react";

export const ShopItem = ({ item, owned, coins, onPurchase, onSelect }) => {
  const handleClick = () => {
    if (!owned && coins >= item.price) {
      onPurchase();
    } else if (owned) {
      onSelect();
    }
  };

  return (
    <div
      className="item"
      onClick={handleClick}
      style={{
        background: item.backColor,
        borderColor: item.backBorder,
      }}
    >
      <div className="snake" style={{ backgroundColor: item.snake }} />
      <div className="apple" style={{ backgroundColor: item.apple }} />
      {!owned && (
        <div className="price" style={{ color: item.text }}>
          {item.price}C
        </div>
      )}
    </div>
  );
};
