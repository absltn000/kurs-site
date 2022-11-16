export class Article
{

  constructor(
      public page:string,
      public imageUrl:string,
      public header:string,
      public context:string,
      public authorId:number,
      public data:Date,
      public countViewes:number,
      public id?:number,
      public comments?:Comment[]
    ){}
}
export class Comment{
  constructor(
    public userId:number,
    public text:string
  ){}
}