export type Address = {
  ID?: string;
  Country: string;
  Region?: string;
  City?: string;
  SubCity?: string;
  Woreda?: number;
  HouseNo?: string;
};

export const AddressFromJSON = (address: JSON): Address => {
  return {
    ID: address["addressId"],
    Country: address["country"],
    Region: address["region"],
    City: address["city"],
    SubCity: address["subCity"],
    Woreda: address["woreda"],
    HouseNo: address["houseNo"],
  };
};

export const AddressToJSON = (
  address: Address
): {
  addressId: string;
  country: string;
  region: string;
  city: string;
  subCity: string;
  woreda: number;
  houseNo: string;
} => {
  return {
    addressId: (address && address.ID) ?? "",
    country: (address && address.Country) ?? "",
    region: (address && address.Region) ?? "",
    city: (address && address.City) ?? "",
    subCity: (address && address.SubCity) ?? "",
    woreda: (address && address.Woreda) ?? 0,
    houseNo: (address && address.HouseNo.toString()) ?? "",
  };
};
