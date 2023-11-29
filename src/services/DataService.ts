// receives url and returns the result (either data or throws an error)

import { ACCESS_TOKEN } from "../env/enviroment";

class DataService {
  constructor(private baseUrl: string) {}

  async fetchData<T>(url: string) {
    try {
      const response = await fetch(`${this.baseUrl}${url}}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data: T = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default DataService;
