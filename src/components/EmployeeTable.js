import React, { useState } from "react";

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filtered = employees.filter((e) =>
    `${e.firstName} ${e.lastName} ${e.email} ${e.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <div className="table-header">
        <h2>Employees</h2>
        <input
          className="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button className="btn small" onClick={() => onEdit(emp)}>
                  Edit
                </button>
                <button
                  className="btn small danger"
                  onClick={() => onDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;