export class Reader {
  constructor(
    public readerid: string,
    public firstname: string,
    public lastname: string,
    public email:string,
    public middlename?: string,
    public church?:string,
    public groups?:string,    
    public phonenumber?:string,
    public memo?:string
  ) {  }
}