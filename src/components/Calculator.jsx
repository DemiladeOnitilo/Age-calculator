import React, { useState } from "react";
import arrow from "../assets/images/icon-arrow.svg";

const Calculator = () => {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [errors, setErrors] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [age, setAge] = useState({
    days: "__",
    months: "__",
    years: "__",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { day, month, year } = formData;

    const currentYear = new Date().getFullYear();
    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);
    const newErrors = {
      day: "",
      month: "",
      year: "",
    };

    if (!dayNum) newErrors.day = "This field is required";
    else if (dayNum < 1 || dayNum > 31) newErrors.day = "Must be a valid day";

    if (!monthNum) newErrors.month = "This field is required";
    else if (monthNum > 12) newErrors.month = "Must be a valid Month";

    if (!yearNum) newErrors.year = "This field is required";
    else if (yearNum > currentYear) newErrors.year = "Must be in the past";

    if (
      dayNum > 31 &&
      (monthNum === 4 || monthNum === 6 || monthNum === 9 || monthNum === 11)
    )
      newErrors.day = "Must be a valid day";

    if (dayNum > 28 && monthNum === 2) newErrors.day = "Must be a valid day";

    setErrors(newErrors);

    if (Object.values(newErrors).every((val) => val === "")) {
      const birthDate = new Date(yearNum, monthNum - 1, dayNum);
      const today = new Date();
      const prevMonth = new Date(today.getFullYear, today.getMonth, 0);
      const dateInPrevMonth = prevMonth.getDate();

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (days < 0) {
        months -= 1;
        days += dateInPrevMonth;
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setAge({ years, months, days });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white lg:py-15 lg:px-10 px-7 py-10 lg:w-[840px] h-auto  w-full flex flex-col lg:gap-1 gap-20 rounded-xl lg:rounded-br-[170px] rounded-br-[130px]"
    >
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 lg:w-40">
          <label
            className={` ${
              errors.day ? "text-red-400" : "text-gray-500"
            } font-semibold`}
          >
            Day
          </label>
          <input
            name="day"
            type="number"
            onChange={handleChange}
            value={formData.day}
            placeholder="DD"
            className={`p-4 lg:text-4xl text-xl font-bold text-gray-500 w-full border  ${
              errors.day ? "border-red-400" : "border-gray-200"
            } rounded-xl outline-none focus:border-purple-500 cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {errors.day && (
            <span className="text-red-400 text-sm">{errors.day}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-40 ">
          <label
            className={`${
              errors.month ? "text-red-400" : "text-gray-500"
            } font-semibold`}
          >
            Month
          </label>
          <input
            name="month"
            type="number"
            onChange={handleChange}
            value={formData.month}
            placeholder="MM"
            className={`p-4 lg:text-4xl text-xl font-bold text-gray-500 w-full border ${
              errors.month ? "border-red-400" : "border-gray-200"
            } rounded-xl outline-none focus:border-purple-500 cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {errors.month && (
            <span className="text-red-400 text-sm">{errors.month}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-40 ">
          <label
            className={` ${
              errors.year ? "text-red-500" : "text-gray-500"
            } font-semibold`}
          >
            Year
          </label>
          <input
            name="year"
            type="number"
            onChange={handleChange}
            value={formData.year}
            placeholder="YYYY"
            className={`p-4 lg:text-4xl text-xl font-bold text-gray-500 w-full border ${
              errors.year ? "border-red-400" : "border-gray-200"
            } rounded-xl outline-none focus:border-purple-500 cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {errors && (
            <span className="text-red-400 text-sm">{errors.year}</span>
          )}
        </div>
      </div>
      <div className="flex items-center relative w-full">
        <div className="w-full bg-gray-200 h-[1px]"></div>
        <button className="absolute right-[40%] lg:relative lg:right-0 bg-purple-500 hover:bg-black cursor-pointer rounded-full p-6">
          <img src={arrow} alt="Arrow icon" className="lg:h-18 h-7" />
        </button>
      </div>
      <div className="flex flex-col w-full mb-10">
        <h1 className="lg:text-[110px] text-5xl font-bold text-purple-500 lg:h-30">
          {age.years} <span className="text-black">years</span>
        </h1>
        <h1 className="lg:text-[110px] text-5xl font-bold text-purple-500 lg:h-30">
          {age.months} <span className="text-black">months</span>
        </h1>
        <h1 className="lg:text-[110px] text-5xl font-bold text-purple-500 lg:h-30">
          {age.days} <span className="text-black">days</span>
        </h1>
      </div>
    </form>
  );
};

export default Calculator;
