const BASE_URL = "https://employe-azure-app-ard7fwggcghsf8cg.canadacentral-01.azurewebsites.net/api"; // update

export const getEmployees = async () => {
  const res = await fetch(`${BASE_URL}/employees`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const createEmployee = async (data) => {
  const res = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateEmployee = async (id, data) => {
  const res = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const deleteEmployee = async (id) => {
  const res = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
};