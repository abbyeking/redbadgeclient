export interface IResult {
    shows: any,
    id: string,
    description: IDescription,
    images:IImages[],
    name: IName[],
    web_url:string,
    publisher: string,
    pid: string
}

interface IDescription {
    main: string;
}

interface IImages{
    url: string
}

export interface IName{
    value:string
}