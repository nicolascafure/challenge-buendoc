import { useState } from "react";
import { Button,Modal, Upload ,message} from "antd";
import { Form, Input, Select} from 'antd';
import { useMutation,  useQuery,useQueryClient } from "react-query";
import { UploadOutlined } from '@ant-design/icons';


interface ILanguaje{
  id: number,
  name: string,
  code: string,
  is_active: boolean
  }
  



async function fetchLanguajes(){
  const response = await fetch(`http://challenge.radlena.com/api/v1/languages/`)
  if(!response.ok){
    throw new Error ("Recuperando lista de lenguajes")
  }
  return response.json()
}





async function PatchProfessional(data:any) {
  const formData = new FormData();
  formData.append("profile_image", data.profile_image.originFileObj)
  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  formData.append("email", data.email)
  const response= await fetch("http://challenge.radlena.com/api/v1/professionals/",{

    method:"POST",
    body: formData
  });
  if(!response.ok){
   
  if(response.status===400){
    throw new Error("El mail ya fue ingresado en la data");
  }else{
    throw new Error ("Recuperando lista de profesionales")}
  }
  return response.json()
}


async function AddLenguaje(data:any) {

  const response= await fetch("http://challenge.radlena.com/api/v1/professional-languages/",{
headers:{"Content-type":"application/json"},
    method:"POST",
    body: JSON.stringify(data)
  });
  if(!response.ok){
    throw new Error ("Recuperando lista lenguajes")
  }
  return response.json()
}



const EditProfessional : React.FunctionComponent = () => {
  const queryClient = useQueryClient()
    const [visible, setVisible] = useState(false);
const [lenguajes, setLenguajes] =useState([])

    
const mutation = useMutation(PatchProfessional,{

onSuccess:function(data){

if(lenguajes.length>0 ){

 lenguajes.forEach(lenguaje=>{
   const professionalId= data.id
   const result= lang.data?.find(lang=> lang.code===lenguaje)

const profesionalLang={
  
    "professional": {
      "first_name": "string",
      "last_name": "string",
      "email": "user@example.com"
    },
    "professional_id": professionalId,
    "language": {
      "name": "string",
      "code": "string",
      "is_active": true
    },
    "language_id": result?.id


  
}

mutationLanguajes.mutate(profesionalLang)
queryClient.invalidateQueries('PROFESSIONALS')
modalSucces("Profesional creado con exito")

  } )

}

},

onError:function(error){
  
  console.log(error)
}


})
  





const mutationLanguajes = useMutation(AddLenguaje,{
  onSettled:function(){
    console.log("final")
  },
  
  onSuccess:function(data){
    console.log(data)
  

  
  
  
  },
  
  onError:function(error){
    console.log(error)
  }
  
  
  })
    
  















 
    const layout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 12,
      },
    };

    
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };


    const { Option } = Select;






    const onFinish = (data:object) => {
      console.log(lenguajes)

     

     



       mutation.mutate(data)
      };
    
     const normFile = (e:any) => {
      console.log('Upload event:', e);
    
      if (Array.isArray(e)) {
        return e;
      }
    
      return e.file ;
    };

      function handleChange(value:any) {
        setLenguajes(value)
      }

    
      const lang = useQuery<ILanguaje[],Error>(['LANGUAJES'],fetchLanguajes)
      if(lang.isLoading){
        return <div>Cargando Lenguajes </div>
      
      }
      if (lang.isError){
        return <div>Error cargando Lenguajes</div>}


        function modalSucces(text:string) {
          Modal.success({
            content: text,
            onOk(){setVisible(false)}
          });
           
          }

          function modalError(text:any) {
            Modal.success({
              content: text,
            });
             
            }



    return(<>
        <Button type="primary" onClick={() => setVisible(true)}>
        Nuevo Profesional
      </Button>
   

<Modal
          visible={visible}
          title="Agregar nuevo profesional"
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={800}
          footer={[
            <Button key="back" onClick={() => setVisible(false)}>
              Cancelar
            </Button>,
         
          ]}
        >
         <Form {...layout}     onFinish={onFinish} validateMessages={validateMessages}>

         <Form.Item
        name="profile_image"
        label="Upload"
        getValueFromEvent={normFile}
     
      >
        <Upload   action="//jsonplaceholder.typicode.com/posts/"
          listType="picture"
         >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name={['first_name']}
        label="Nombre"
        rules={[
          {
            required: true,
          },
        ]}
      >
          <Input />
          </Form.Item>
   <Form.Item
        name={['last_name']}
        label="Apellido"
        rules={[
          {
            required: true,
          },
        ]}
      >

        <Input />
      </Form.Item>

      <Form.Item
        name={['email']}
        label="Email"
        rules={[
          {
            required: true,
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
     

      <Form.Item
        name="lenguajes"
        label="Idiomas"
        rules={[
          {
            required: true,
            message: 'Please select your favourite colors!',
            type: 'array',
          },
        ]}
      >
      <Select mode="multiple" 
        style={{ width: '100%' }}
        placeholder="Selecciona los idiomas que sabés"
        allowClear
        defaultValue={[]}
        onChange={handleChange}>
          {lang.data?.map(lenguaje=> <Option value={lenguaje.code}>{lenguaje.name}</Option>)}

        </Select>
      </Form.Item>

    

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Crear profesional
        </Button>
      </Form.Item>
    </Form>




   
      </Modal>
    </>




    )}

    export default EditProfessional