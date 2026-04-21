import React, { useState, useEffect } from "react";
import { createEmployee, getEmployees } from "../services/api";

const EmployeeForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [employees, setEmployees] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // 🔥 Load data on page load
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (e) {
      setErr("Failed to load employees");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.department) {
      return "All fields are required";
    }
    if (!form.email.includes("@")) return "Invalid email";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    const validationError = validate();
    if (validationError) {
      setErr(validationError);
      return;
    }

    try {
      await createEmployee(form);
      setMsg("Employee created!");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });

      fetchEmployees(); // 🔥 refresh table
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Employee Management</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />

        <button type="submit">Add Employee</button>
      </form>

      {msg && <p className="success">{msg}</p>}
      {err && <p className="error">{err}</p>}

      {/* TABLE */}
      <h3>Employee List</h3>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4">No data</td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeForm;