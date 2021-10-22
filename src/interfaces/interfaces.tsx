export interface ILanguaje{
    id: number,
    name: string,
    code: string,
    is_active: boolean
    }


    export interface IProfessional {
        email: string;
        first_name: string;
        id: number;
        is_active: boolean;
        last_name: string;
        profile_image: string;
      }


       export interface IProfessional{
        email:string,
        first_name: string,
        id: number,
        is_active: boolean,
        last_name: string,
        profile_image:string
        }
        
        export interface IResults{
        count: number,
          results: IProfessional[],
          next: string,
          previus:any
        
        }
        