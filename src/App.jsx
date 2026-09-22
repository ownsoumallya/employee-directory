import React, { useEffect, useState } from "react";
import "./App.css";

const emptyForm = {
  name: "",
  employeeId: "",
  department: "",
  gender: "",
  phone: "",
  localAddress: "",
  permanentAddress: "",
};

function App() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("farmEmployees");

    return savedEmployees
      ? JSON.parse(savedEmployees)
      : [
          {
            id: 1,
            name: "Rahul Das",
            employeeId: "EMP101",
            department: "Agriculture",
            gender: "Male",
            phone: "9876543210",
            localAddress: "Bishnupur, Bankura",
            permanentAddress: "Bankura, West Bengal",
          },
        ];
  });

  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [editId, setEditId] = useState(null);

  // Save employees whenever employee data changes
  useEffect(() => {
    localStorage.setItem("farmEmployees", JSON.stringify(employees));
  }, [employees]);

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update Employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.employeeId ||
      !formData.department ||
      !formData.gender ||
      !formData.phone ||
      !formData.localAddress ||
      !formData.permanentAddress
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editId !== null) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editId
            ? { ...employee, ...formData }
            : employee
        )
      );

      setEditId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        ...formData,
      };

      setEmployees([...employees, newEmployee]);
    }

    setFormData(emptyForm);
  };

  // Delete employee
  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((employee) => employee.id !== id)
      );
    }
  };

  // Edit employee
  const editEmployee = (employee) => {
    setFormData({
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress,
    });

    setEditId(employee.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setFormData(emptyForm);
  };

  // Search + Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.employeeId.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText);

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  // Get unique departments
  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="logo">
          🌾
        </div>

        <div>
          <h1>Farm Employee Directory</h1>
          <p>Employee Management System</p>
        </div>
      </header>

      {/* Dashboard Cards */}
      <section className="dashboard">

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div>
            <p>Total Employees</p>
            <h2>{employees.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div>
            <p>Departments</p>
            <h2>{departments.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔎</div>
          <div>
            <p>Showing</p>
            <h2>{filteredEmployees.length}</h2>
          </div>
        </div>

      </section>

      {/* Employee Form */}
      <section className="form-card">

        <div className="section-title">
          <div>
            <h2>
              {editId !== null
                ? "✏️ Edit Employee"
                : "➕ Add New Employee"}
            </h2>

            <p>
              {editId !== null
                ? "Update employee information"
                : "Enter employee details below"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="input-group">
              <label>Employee Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                placeholder="Example: EMP101"
                value={formData.employeeId}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Department</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resource">
                  Human Resource
                </option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div className="input-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="10 digit phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Local Address</label>

              <input
                type="text"
                name="localAddress"
                placeholder="Enter local address"
                value={formData.localAddress}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width">
              <label>Permanent Address</label>

              <input
                type="text"
                name="permanentAddress"
                placeholder="Enter permanent address"
                value={formData.permanentAddress}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-buttons">

            <button className="primary-btn" type="submit">
              {editId !== null
                ? "✓ Update Employee"
                : "＋ Add Employee"}
            </button>

            {editId !== null && (
              <button
                className="secondary-btn"
                type="button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>

      {/* Search */}
      <section className="directory">

        <div className="directory-header">

          <div>
            <h2>Employee Directory</h2>
            <p>Manage all farm employees</p>
          </div>

          <div className="filters">

            <div className="search-box">
              🔍
              <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
              }
            >
              <option value="All">All Departments</option>

              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* Employee Cards */}

        {filteredEmployees.length === 0 ? (
          <div className="no-data">
            <div>👤</div>
            <h3>No Employees Found</h3>
            <p>
              Try changing your search or department filter.
            </p>
          </div>
        ) : (

          <div className="employee-grid">

            {filteredEmployees.map((employee) => (

              <div className="employee-card" key={employee.id}>

                <div className="employee-top">

                  <div className="avatar">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{employee.name}</h3>
                    <span>{employee.employeeId}</span>
                  </div>

                </div>

                <div className="employee-details">

                  <div>
                    <small>Department</small>
                    <strong>🏢 {employee.department}</strong>
                  </div>

                  <div>
                    <small>Gender</small>
                    <strong>👤 {employee.gender}</strong>
                  </div>

                  <div>
                    <small>Phone</small>
                    <strong>📞 {employee.phone}</strong>
                  </div>

                  <div>
                    <small>Local Address</small>
                    <strong>📍 {employee.localAddress}</strong>
                  </div>

                  <div className="address">
                    <small>Permanent Address</small>
                    <strong>
                      🏠 {employee.permanentAddress}
                    </strong>
                  </div>

                </div>

                <div className="card-actions">

                  <button
                    className="edit-btn"
                    onClick={() => editEmployee(employee)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      <footer>
        🌾 Farm Employee Directory • 2026 Soumallya all rights reserved
      </footer>

    </div>
  );
}

export default App;