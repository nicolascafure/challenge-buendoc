import { useQuery, useMutation ,useQueryClient} from "react-query";
import { Table, Pagination, Button, Modal} from 'antd';
import { useState } from "react";
import CreateProfessional from "./CreateProffesional";
import Edit from "./Edit";
import {deleteProfesional,fetchProfessionals} from "../services/services"


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




const Professionals : React.FunctionComponent = () => {
  const [showEdit, setShowEdit] = useState(false)
  const[proffesionalId, setId]=useState(1)

  const queryClient = useQueryClient()

  const [page, setPage] = useState(1)
  const deleteMutate= useMutation(deleteProfesional,{
    onSettled:function(){
      console.log("final")
    },
    
    onSuccess:function(data){
      queryClient.invalidateQueries('PROFESSIONALS')
      modalSucces("Profesional eliminado")
    
  
    
    
    
    },
    
    onError:function(error){
      console.log(error)
    }
    
    
    })

const eliminarProfesional=(id:number)=>{
  deleteMutate.mutate(id)
}


const query = useQuery<IResults,Error>(['PROFESSIONALS', page],()=>fetchProfessionals(page), { keepPreviousData : true })
if(query.isLoading){
  return <div>Cargando profesionales </div>

}
if (query.isError){
  return <div>Error cargando profesionales</div>
}


function modalSucces(text:string) {
  Modal.success({
    content: text,
  
  })}

  const modalEdit=(id:number)=>{
    setId(id)
    setShowEdit(true)
  }

  const cancelEditModal=()=>{
    setShowEdit(false)




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

  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },

  {
    title: 'Acciones',
    dataIndex: 'id',
    key: 'id',
    render:(id:1) =><><Button onClick={()=>modalEdit(id)} type="primary">Editar</Button><Button type="primary" danger onClick={()=>eliminarProfesional(id)} >Eliminar</Button></>
  },
  
];










    return (<div>




<CreateProfessional/>
  <Table columns={columns} dataSource={query.data?.results} pagination={false}  />,
  <Pagination onChange={(pageone)=>{
    setPage(pageone)
  }} total={query.data?.count} />



<Modal
          visible={showEdit}
          title="Editar profesional"
          onOk={() => setShowEdit(false)}
          onCancel={() => cancelEditModal()}
          width={800}
          footer={[
            <Button key="back" onClick={() => cancelEditModal()}>
              Cancelar
            </Button>,
         
          ]}>

<Edit id={proffesionalId} setShowEdit={setShowEdit}></Edit>


          </Modal>






  </div>




    );
};

export default Professionals;