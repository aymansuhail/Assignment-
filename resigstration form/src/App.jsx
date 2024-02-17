import React, { useState } from "react";
import Validpage from "./Validpage";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    country: "",
    age: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      const isValidEmail = /\S+@\S+\.\S+/.test(value);
      setErrors({
        ...errors,
        email: isValidEmail ? "" : "Invalid email format",
      });
    } else if (name === "password") {
      const isValidPassword = value.length >= 8;
      setErrors({
        ...errors,
        password: isValidPassword
          ? ""
          : "Password must be at least 8 characters long",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      setIsSubmitted(true);
    }
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => error === "");
  };

  return (
    <>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button type="submit" disabled={!isFormValid()}>
            Submit
          </button>
        </form>
      ) : (
        <Validpage />
      )}
    </>
  );
};

export default SignupForm;
