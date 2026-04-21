import React, { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../services/api";
import EmployeeTable from "./EmployeeTable";
import Toast from "./Toast";

const EmployeeForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ msg: "", type: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      showToast("Failed to load employees", "error");
    }
  };

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateEmployee(editingId, form);
        showToast("Employee updated", "success");
      } else {
        await createEmployee(form);
        showToast("Employee created", "success");
      }

      resetForm();
      fetchEmployees();
    } catch {
      showToast("Operation failed", "error");
    }
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setEditingId(emp.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await deleteEmployee(id);
      showToast("Deleted successfully", "success");
      fetchEmployees();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
    setEditingId(null);
  };

  return (
    <div className="page">
      <Toast message={toast.msg} type={toast.type} />

      <div className="card">
        <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <input
              value={form.firstName}
              placeholder="First Name"
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              value={form.lastName}
              placeholder="Last Name"
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>

          <input
            value={form.email}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            value={form.department}
            placeholder="Department"
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <button>{editingId ? "Update" : "Create"}</button>

          {editingId && (
            <button type="button" onClick={resetForm} className="btn cancel">
              Cancel
            </button>
          )}
        </form>
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeeForm;