import { Button, Modal, Upload,Form, Input  } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { UploadOutlined } from "@ant-design/icons";
import {PatchProfessional} from "../services/services"
import { IProfessional} from "../interfaces/interfaces";
type EditProps = {
  id: number;
  setShowEdit: Function;
};


const EditProfessional: React.FC<EditProps> = ({ id, setShowEdit }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const mutation = useMutation(PatchProfessional, {
    onSuccess: function () {
      queryClient.invalidateQueries("PROFESSIONALS");
      modalSucces("Profesional modificado con exito");
      setShowEdit(false);
      form.resetFields()
    },

    onError: function (error) {
      console.log(error);
      modalError(
        "Ocurrio un error al modificar el profesional : posible email repetido"
      );
    },
  });


  

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 12,
    },
  };

  const validateMessages = {
    required: "${label} es requerido",
    types: {
      email: "${label} No es un mail valido!",
    },
  };

  const onFinish = (data: IProfessional) => {
    const newData = {
      first_name: data.first_name,
      last_name: data.last_name,
      id: id,
      profile_image: data.profile_image,
      email: data.email,
    };
    mutation.mutate(newData);

  
  };



  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e.file;
  };


  function modalError(text: any) {
    Modal.error({
      content: text,
    });
  }

  function modalSucces(text: string) {
    Modal.success({
      content: text,
    });
  }
 

  return (
    <>
      <Form
      form={form}
        {...layout}
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          "first_name" :"",
          "last_name" :"",
          "email":"",
          "lenguajes": []
          
        }
        }

      >
        <Form.Item
          name="profile_image"
          label="Upload"
          getValueFromEvent={normFile}
          valuePropName="file"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture"
            
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name={["first_name"]}
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
          name={["last_name"]}
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
          name={["email"]}
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Modificar Profesional
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProfessional;
