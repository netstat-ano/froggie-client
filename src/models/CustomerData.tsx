class CustomerData {
    name: string;
    surname: string;
    address: string;
    postalCode: string;
    city: string;
    constructor(
        name: string,
        surname: string,
        address: string,
        postalCode: string,
        city: string
    ) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
    }
}
export default CustomerData;
