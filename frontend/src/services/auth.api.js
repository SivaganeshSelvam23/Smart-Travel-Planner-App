const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(formData) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.message || "Registartion failed");
    error.status = response.status;
    error.errors = result.errors || [];
    throw error;
  }
  return result;
}
