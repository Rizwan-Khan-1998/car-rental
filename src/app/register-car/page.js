"use client";

import { useState } from "react";
import Select from "react-select";
import {
  carCompanies,
  years,
  cities,
  fuelType,
  transmission,
  seats,
} from "@/app/register-car/constant";

export default function Page() {
  const [formData, setFormData] = useState({
   
  });
  console.log(formData);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/registered-cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const handleChange = (field) => (selectedOption) => {
    setFormData({
      ...formData,
      [field]: selectedOption ? selectedOption.value : "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor="brand">Brand:</label>
      <Select
        options={carCompanies}
        value={carCompanies.find((option) => option.value === formData.brand)}
        onChange={handleChange("brand")}
        isClearable
      />
      <label htmlFor="model">Model:</label>
      <Select
        options={
          carCompanies.find((option) => option.value === formData.brand)
            ?.models || []
        }
        value={
          carCompanies
            .find((company) => company.value === formData.brand)
            ?.models.find((model) => model.value === formData.model) || null
        }
        onChange={handleChange("model")}
        isClearable
        isDisabled={!formData.brand}
      />
      <label htmlFor="year">Year:</label>
      <Select
        options={years.map((year) => ({ value: year, label: year }))}
        value={
          formData.year ? { value: formData.year, label: formData.year } : null
        }
        onChange={handleChange("year")}
        isClearable
        isDisabled={!formData.model}
      />
      <label htmlFor="city">City:</label>
      <Select
        options={cities.map((city) => ({ value: city, label: city }))}
        value={
          formData.location
            ? { value: formData.location, label: formData.location }
            : null
        }
        onChange={handleChange("location")}
        isClearable
        isDisabled={!formData.year}
      />
      <label htmlFor="pricePerDay">Price per day:</label>
      <input
        type="number"
        id="pricePerDay"
        name="pricePerDay"
        value={formData.pricePerDay}
        onChange={handleInputChange}
        min="1"
        max="50000"
      />
      <label htmlFor="mileage">Mileage:</label>
      <input
        type="number"
        id="mileage"
        name="mileage"
        value={formData.mileage}
        onChange={handleInputChange}
        min="1"
        max="30"
      />
      <label htmlFor="fuelType">Fuel Type:</label>
      <Select
        options={fuelType.map((fuelType) => ({
          value: fuelType,
          label: fuelType,
        }))}
        value={
          formData.fuelType
            ? { value: formData.fuelType, label: formData.fuelType }
            : null
        }
        onChange={handleChange("fuelType")}
        isClearable
      />
      <label htmlFor="fuelType">Transmission:</label>
      <Select
        options={transmission.map((transmission) => ({
          value: transmission,
          label: transmission,
        }))}
        value={
          formData.transmission
            ? { value: formData.transmission, label: formData.transmission }
            : null
        }
        onChange={handleChange("transmission")}
        isClearable
        isDisabled={!formData.year}
      />
      <label htmlFor="fuelType">Seats:</label>
      <Select
        options={seats.map((seat) => ({ value: seat, label: seat }))}
        value={
          formData.seats
            ? { value: formData.seats, label: formData.seats }
            : null
        }
        onChange={handleChange("seats")}
        isClearable
        isDisabled={!formData.year}
      />
      <label htmlFor="fuelType">Air Condition:</label>
      <Select
        options={["Available", "Not Available"].map((status) => ({
          value: status,
          label: status,
        }))}
        value={formData.AC ? { value: formData.AC, label: formData.AC } : null}
        onChange={handleChange("AC")}
        isClearable
        isDisabled={!formData.year}
      />

      <button type="submit">Register</button>
    </form>
  );
}
