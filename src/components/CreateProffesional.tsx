import { useState } from "react";
import { Button,Modal } from "antd";
import { Form, Input,  message} from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const CreateProfessional : React.FunctionComponent = () => {
    const [visible, setVisible] = useState(false);

 
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

    const  beforeUpload = (a:any) => {
      if (Array.isArray(a)) {
        return a;
      }
    
      return a && a.fileList;
    }

    const normFile = (e:any) => {
      console.log('Upload event:', e);
    
      if (Array.isArray(e)) {
        return e;
      }
    
      return e && e.fileList;
    };



    const onFinish = (data:object) => {
        console.log(data);
      };
    

    



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
         <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
        name="profile_image"
        label="Upload"
        rules={[
          {
            required: true,
          },
        ]}
        
      >
        
        <Input type="file" />
      </Form.Item>
     
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

      </Modal>
    </>




    )}

    export default CreateProfessional