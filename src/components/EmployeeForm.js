import React, { useState, useEffect, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);

  // 🔔 Toast helper
  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 3000);
  };

  // 🔄 Fetch employees (FIXED with useCallback)
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      showToast("Failed to load employees", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔁 Load on mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // 📝 Handle form submit (Create + Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.email) {
      return showToast("First Name and Email are required", "error");
    }

    try {
      if (editingId) {
        await updateEmployee(editingId, form);
        showToast("Employee updated successfully", "success");
      } else {
        await createEmployee(form);
        showToast("Employee created successfully", "success");
      }

      resetForm();
      fetchEmployees();
    } catch {
      showToast("Operation failed", "error");
    }
  };

  // ✏️ Edit
  const handleEdit = (emp) => {
    setForm({
      firstName: emp.firstName || "",
      lastName: emp.lastName || "",
      email: emp.email || "",
      department: emp.department || "",
    });
    setEditingId(emp.id);
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      showToast("Employee deleted", "success");
      fetchEmployees();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  // 🔄 Reset form
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

      {/* FORM CARD */}
      <div className="card">
        <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
            <input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <button type="submit">
            {editingId ? "Update Employee" : "Add Employee"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn cancel"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* TABLE CARD */}
      {loading ? (
        <p className="info">Loading employees...</p>
      ) : (
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default EmployeeForm;