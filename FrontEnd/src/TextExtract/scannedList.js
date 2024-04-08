import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const ScrollableCardList = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState(items);

  const handleRemoveItem = (index) => {
    const newItems = [...visibleItems];
    newItems.splice(index, 1);
    setVisibleItems(newItems);
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
      {visibleItems.map((item, index) => (
        <Card key={index} style={{ margin: "10px", borderRadius: "40px" }}>
          <CardContent>
            <Typography>{item}</Typography>
            <IconButton
              style={{ float: "right" }}
              onClick={() => handleRemoveItem(index)}
            >
              <CloseIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ScrollableCardList;
