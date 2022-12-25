export async function fetchAPI<T>(
  endpoint: string,
  {
    token = null,
    options = {},
  }: {
    token?: string | null;
    options?: RequestInit;
  }
): Promise<T> {
  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };

  const apiUrl = process.env.API_URL || "http://localhost:7000";
  const url = `${apiUrl}/api/${endpoint}`;

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`An error occured please try again`);
  }
  return await response.json();
}

export async function postApi<T, I extends {}>(
  endpoint: string,
  inputs: I
): Promise<T> {
  return fetchAPI(endpoint, {
    options: {
      method: "POST",
      body: JSON.stringify(inputs),
    },
  });
}
