import { useQuery } from "react-query";
import { Table, Tag, Space , Pagination} from 'antd';
import { useState ,useEffect} from "react";

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



async function fetchProfessionals(pageN:number){
  const response = await fetch(`http://challenge.radlena.com/api/v1/professionals/?page=${pageN}`)
  if(!response.ok){
    throw new Error ("Recuperando lista de profesionales")
  }
  return response.json()
}


const Professionals : React.FunctionComponent = () => {

  const [page, setPage] = useState(1)

const query = useQuery<IResults,Error>(['PROFESSIONALS', page],()=>fetchProfessionals(page), { keepPreviousData : true })
if(query.isLoading){
  return <div>Cargando profesionales </div>

}
if (query.isError){
  return <div>Error cargando profesionales</div>
}


 
const columns = [
  {
    title: 'Profile',
    key: 'profile_image',
    dataIndex: 'profile_image',
    render: (img:string) => (
      <><div className="data-profile-img">
       <img src={img}></img>
       </div>
      </>
    ),
  },
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
  
];










    return (<div>





  <Table columns={columns} dataSource={query.data?.results} pagination={false}  />,
  <Pagination onChange={(pageone)=>{
    setPage(pageone)
  }} total={query.data?.count} />






  </div>




    );
};

export default Professionals;