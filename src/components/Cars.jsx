"use client";
import { useEffect, useState } from "react";

export default function Cars() {
  const [cars, setCars] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/registered-cars");
        const result = await response.json();
        setCars(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  console.log(cars);

  return (
    <div>
      {cars ? (
        cars.map((car, index) => (
          <div key={index}>
            <h2>{car.brand}</h2>
            <p>Model: {car.model}</p>
            <p>Year: {car.year}</p>
            <p>Location: {car.location}</p>
       
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
