import React, { useState } from "react";

type FormProps = {
  lat: number;
  lon: number;
};

const Form = ({ lat, lon }: FormProps) => {
  const [houseArea, setHouseArea] = useState(0);
  const [afterYear, setAfterYear] = useState(0);
  const [madoriNumberAll, setMadoriNumberAll] = useState(0);
  const [floorCount, setFloorCount] = useState(0);

  const [predictPrice, setPredictPrice] = useState("");

  const handleSubmit = async () => {
    console.log(houseArea, afterYear, madoriNumberAll, floorCount);
    const sendData = {
      area: "tokyo",
      house_area: houseArea,
      after_year: afterYear,
      lat: lat,
      lon: lon,
      PTN_2020: 4069.4293,
      landprice: 719000,
      madori_number_all: madoriNumberAll,
      floor_count: floorCount,
      room_count: madoriNumberAll,
    };
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    console.log(result.prediction[0][0]);
    setPredictPrice(result.prediction[0][0]);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label>建物面積（平米）</label>
          <input
            type="number"
            value={houseArea}
            onChange={(e) => setHouseArea(Number(e.target.value))}
            className="border p-2 rounded mb-2 w-full"
          />
          <label>築年数（年）</label>
          <input
            type="number"
            value={afterYear}
            onChange={(e) => setAfterYear(Number(e.target.value))}
            className="border p-2 rounded mb-2 w-full"
          />
          <label>部屋の数（室）</label>
          <input
            type="number"
            value={madoriNumberAll}
            onChange={(e) => setMadoriNumberAll(Number(e.target.value))}
            className="border p-2 rounded mb-2 w-full"
          />
          <label>階数（階）</label>
          <input
            type="number"
            value={floorCount}
            onChange={(e) => setFloorCount(Number(e.target.value))}
            className="border p-2 rounded mb-2 w-full"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            予測
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">
            予想価格：{predictPrice.toLocaleString()}万円
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;
