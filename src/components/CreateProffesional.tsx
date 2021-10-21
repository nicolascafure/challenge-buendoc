import { useState } from "react";
import { Button,Modal, Upload ,message} from "antd";
import { Form, Input, Select} from 'antd';
import { useMutation,  useQuery } from "react-query";
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





async function AddProfessional(data:any) {
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
    throw new Error ("Recuperando lista de profesionales")
  }
  return response.json()
}



const CreateProfessional : React.FunctionComponent = () => {
    const [visible, setVisible] = useState(false);


    
const mutation = useMutation(AddProfessional,{
onSettled:function(){
  console.log("final")
},

onSuccess:function(data){
  console.log("listo")
  console.log(data)
},

onError:function(){
  console.log("error")
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
      console.log(data)
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
        console.log(`selected ${value}`);
      }

    
      const lang = useQuery<ILanguaje[],Error>(['LANGUAJES'],fetchLanguajes)
      if(lang.isLoading){
        return <div>Cargando Lenguajes </div>
      
      }
      if (lang.isError){
        return <div>Error cargando Lenguajes</div>}


    return(<>
        <Button type="primary" onClick={() => setVisible(true)}>
        Nuevo Profesional
      </Button>
      <Modal
        title="Agregar nuevo profesional"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={800}
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
     
    

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>




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
      <Select mode="tags" 
        style={{ width: '100%' }}
        placeholder="Selecciona los idiomas que sabés"
        defaultValue={[]}
        onChange={handleChange}>
          {lang.data?.map(lenguaje=> <Option value={lenguaje.id}>{lenguaje.name}</Option>)}
          <Option value="china">China</Option>
          <Option value="argentina">Argentina</Option>
          <Option value="brasil">Brasil</Option>
        </Select>
      </Form.Item>

      </Modal>
    </>




    )}

    export default CreateProfessional