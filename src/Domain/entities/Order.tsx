import { Address } from './Address';
import { Product } from './Product';
import { User } from './User';

export interface Order {
    id?:            string;
    id_client:      string;
    id_delivery?:   string;
    id_address:     string;
    lat?:           number;
    lng?:           number;
    status?:        string;
    timestamp?:     number;
    client?:        User;
    delivery?:      User;
    address?:       Address;
    products:       Product[];
}