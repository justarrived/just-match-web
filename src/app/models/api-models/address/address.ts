// API attribute interfaces
interface AddressApiAttributes {
  city: string;
  countryCode: string;
  id: string;
  latitude: number;
  longitude: number;
  municipality: string;
  postalCode: string;
  state: string;
  street1: string;
  street2: string;
}

// Client interfaces
export interface Address extends AddressApiAttributes {
}

// Factories
export class AddressFactory {
  public static createAddress(jsonObject?: any): Address {
    if (!jsonObject) {
      return;
    }

    return {
      city: jsonObject.city,
      countryCode: jsonObject.country_code,
      id: jsonObject.id,
      latitude: jsonObject.latitude,
      longitude: jsonObject.longitude,
      municipality: jsonObject.municipality,
      postalCode: jsonObject.postal_code,
      state: jsonObject.state,
      street1: jsonObject.street1,
      street2: jsonObject.street2,
    };
  }
}
