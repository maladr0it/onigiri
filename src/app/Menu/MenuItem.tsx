import React, { useState, useEffect } from "react";

import { db } from "../services";

interface Props {
  id: string;
}

export const MenuItem: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<db.FoodItemDoc>();

  useEffect(() => {
    const unsubscribe = db.listenForFoodItem(id, setData);

    return unsubscribe;
  }, [id]);

  return (
    <li>
      {data && (
        <>
          <p>{data.name}</p>
          <img src={data.image} />
        </>
      )}
    </li>
  );
};
