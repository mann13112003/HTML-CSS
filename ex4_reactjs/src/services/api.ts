const API_URL = import.meta.env.VITE_API_URL;

interface ApiRequest<TBody = unknown> {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
}

export const apiRequest = async <TResponse, TBody = unknown>({
  path,
  method,
  body,
}: ApiRequest<TBody>): Promise<TResponse> => {
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (body) {
      if (method === "GET") {
        const queryString = new URLSearchParams(
          body as Record<string, string>
        ).toString();
        path += `?${queryString}`;
      }
      options.body = JSON.stringify(body);
    }
    const res = await fetch(`${API_URL}${path}`, options);
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    const data = (await res.json()) as TResponse;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
