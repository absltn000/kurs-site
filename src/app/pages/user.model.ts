export class User
{

  constructor(
    public name:string,
    public surname:string,
    public mail:string,
    public password:string,
    public gender: string,
    public image?:any,
    public age?:Date,
    public id?:number,
    public writenArticlesId?:number[],
    public banArticlesId?:number[],
    public favouriteArticleId?:number[],
    public countViewes?:number
    ){}
    static of(obj: any) {
      return new User(obj.name ?? 'Name', obj.surname ?? 'Surname', obj.mail ?? '', obj.password ?? '', obj.gender ?? '',
      obj.image??'');
    }
}