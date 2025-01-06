import React, { useState } from "react";

type FormProps = {
  lat: number;
  lon: number;
};

const Form = ({ lat, lon }: FormProps) => {
  const [area, setArea] = useState("tokyo");
  const [houseArea, setHouseArea] = useState(0);
  const [afterYear, setAfterYear] = useState(0);
  const [PTN2020, setPTN2020] = useState(0);
  const [landPrice, setLandPrice] = useState(0);
  const [madoriNumberAll, setMadoriNumberAll] = useState(0);
  const [floorCount, setFloorCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);

  const handleSubmit = async () => {
    console.log(
      area,
      houseArea,
      afterYear,
      PTN2020,
      landPrice,
      madoriNumberAll,
      floorCount,
      roomCount
    );
    const sendData = {
      area: area,
      house_area: houseArea,
      after_year: afterYear,
      lat: lat,
      lon: lon,
      PTN_2020: PTN2020,
      landprice: landPrice,
      madori_number_all: madoriNumberAll,
      floor_count: floorCount,
      room_count: roomCount,
    };
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <input
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <input
        type="number"
        value={houseArea}
        onChange={(e) => setHouseArea(Number(e.target.value))}
      />
      <input
        type="number"
        value={afterYear}
        onChange={(e) => setAfterYear(Number(e.target.value))}
      />
      <input
        type="number"
        value={PTN2020}
        onChange={(e) => setPTN2020(Number(e.target.value))}
      />
      <input
        type="number"
        value={landPrice}
        onChange={(e) => setLandPrice(Number(e.target.value))}
      />
      <input
        type="number"
        value={madoriNumberAll}
        onChange={(e) => setMadoriNumberAll(Number(e.target.value))}
      />
      <input
        type="number"
        value={floorCount}
        onChange={(e) => setFloorCount(Number(e.target.value))}
      />
      <input
        type="number"
        value={roomCount}
        onChange={(e) => setRoomCount(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>予測</button>
    </>
  );
};

export default Form;
