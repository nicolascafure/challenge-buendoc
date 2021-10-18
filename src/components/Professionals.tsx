import { useQuery } from "react-query";
import { Table, Tag, Space } from 'antd';

interface IProfessional{
email:string,
first_name: string,
id: number,
is_active: boolean,
last_name: string,
profile_image:string
}

interface IResults{
count: number,
  results: IProfessional[],
  next: string,
  previus:any

}



async function fetchProfessionals(){
  const response = await fetch("http://challenge.radlena.com/api/v1/professionals/")
  if(!response.ok){
    throw new Error ("Recuperando lista de profesionales")
  }
  return response.json()
}


const Professionals : React.FunctionComponent = () => {

const query = useQuery<IResults,Error>("PROFESSIONALS" , fetchProfessionals)
if(query.isLoading){
  return <div>Cargando profesionales </div>
}
if (query.isError){
  return <div>Error cargando profesionales</div>
}



const columns = [
  {
    title: 'Nombre',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Apellido',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Profile',
    key: 'profile_image',
    dataIndex: 'profile_image',
    render: (img:string) => (
      <>
       <img src={img}></img>
      </>
    ),
  }
];










    return (<div>

  {query.data?.results.map(professional=><p>{professional.email}</p>)}



  <Table columns={columns} dataSource={query.data?.results} />,







  </div>




    );
};

export default Professionals;