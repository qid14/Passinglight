export class Book{
	public bookid:string;
	public bookname:string;
	public author:string;
	public version:string;
	public price:string;
	public location:string;

	constructor(data:any={}){
		this.bookname= data.bookname || 'Queen of the Dark Chamber',
		this.author = data.author || 'Christina Tsai',
		this.version = data.version || '2016',
		this.price = data.price || '2.99',
		this.location = data.location || 'Plano'
	}

	public getBook(){
		return this.bookid;
	}
	public getBookName(){
		return this.bookname;
	}
}