export class Reader {
    public username: string;
    public password:string;
    public firstname: string;
    public lastname: string;
    public middlename: string;
    public email: string;
    public phonenumber: string;
    public church: string;
    public groups: string;
    public memo: string;
    // public gender:boolean,
    // public birth:string,
    // public createdate: string;
    // public updatedate: string;
    public connected: boolean = false;

    constructor(data: any = {}) {
        this.username = data.username || '',
        this.password = data.password || this.username
            this.firstname = data.firstname || '',
            this.lastname = data.lastname || '',
            this.middlename = data.middlename || '',
            this.email = data.email || '',
            this.phonenumber = data.phonenumber || '',
            this.church = data.church || '',
            this.memo = data.memo || ''



    }
    public getName() {
        return this.firstname + ' ' + this.lastname;
    }

    public getUserName() {
        return this.username;
    }
}