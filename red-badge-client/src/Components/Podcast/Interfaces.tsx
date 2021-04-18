export interface IResult {
    _id: string,
    description: IDescription,
    images:IImages[],
    name: IName[],
    web_url:string
}

interface IDescription{
    main:string;
}

interface IImages{
    url: string
}

export interface IName{
    value:string
}