import { useState } from "react";
import { Button,Modal } from "antd";
import { Form, Input, InputNumber} from 'antd';

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
        name={['name']}
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
        name={['lastname']}
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

      </Modal>
    </>




    )}

    export default CreateProfessional