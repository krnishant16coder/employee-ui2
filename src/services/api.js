const BASE_URL = "https://employe-azure-app-ard7fwggcghsf8cg.canadacentral-01.azurewebsites.net/api"; // update

export const createEmployee = async (data) => {
  const res = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getEmployees = async () => {
  const res = await fetch(`${BASE_URL}/employees`);

  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
};