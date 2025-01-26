export const requestHeader: Record<string, string> = {
  Accept: "application/json",
  "Content-Type": "",
  Authorization: "",
};

/**
 *
 * @param {string} url
 * @param {"GET" | "POST" | "PATCH" | "PUT" | "DELETE"} method
 * @param {any} payload
 * @param {string} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Promise<any>
 */
export async function request<T>(
  url: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  payload: unknown,
  token: string,
  text: boolean = false,
  form: boolean = false
): Promise<T> {
  // Set Authorization Header if token is provided
  if (token) {
    requestHeader.Authorization = token;
  } else {
    delete requestHeader.Authorization;
  }

  // Adjust Content-Type based on form flag
  if (form) {
    delete requestHeader["Content-Type"];
  } else {
    requestHeader["Content-Type"] = "application/json";
  }

  try {
    const options: RequestInit = {
      method,
      headers: { ...requestHeader },
    };

    if (method !== "GET") {
      options.cache = "no-cache";

      if (form) {
        options.body = payload as FormData;
      } else {
        options.body = JSON.stringify(payload);
      }
    }

    const response = await fetch(url, options);

    if (text) {
      return response.text() as T;
    } else if (response.ok) {
      return response.json() as T;
    } else {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const data = await response.json();
        errorMessage = data?.message || errorMessage;
      } catch {
        // Handle empty or invalid JSON responses
      }
      throw new Error(errorMessage);
    }
  } catch (err) {
    console.error(`Request Error ${url}:`, err);
    throw err;
  }
}
