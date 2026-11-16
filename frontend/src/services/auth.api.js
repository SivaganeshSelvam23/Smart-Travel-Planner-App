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

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || "Login failed");
    error.status = response.status;
    error.errors = result.errors || [];
    throw error;
  }
  return result;
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });
  if (response.status === 401) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Unable to check authentication");
  }
  const result = await response.json();
  return result.user;
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Unable to log out");
  }
}
