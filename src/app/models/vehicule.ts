import { User } from "./person";

export class Vehicule{
    public carburant:string="-";
    public moteur:string="v6";
    public anneeConstruit:number=2000;
    public proprio?:User;
}