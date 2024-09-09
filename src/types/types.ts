export interface Contact {
    id: number,
    firstName: string,
    lastName: string,
    status: "active" | "inactive"
}

export interface HistoricalData {
    cases: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
}

export interface Country {
    country: string;
    countryInfo: {
      _id: string;
      lat: number;
      long: number;
    };
    active: number;
    recovered: number;
    deaths: number;
  }