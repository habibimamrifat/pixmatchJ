export type TRole = "admin" | "user";
export type Tuser={
    name:string;
    email:string;
    password:string;
    role:TRole;
}
