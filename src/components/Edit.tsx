import { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { Form, Input, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UploadOutlined } from "@ant-design/icons";

type EditProps = {
  id: number;
  showEdit: boolean;
};

interface ILanguaje {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
}

interface IProfessional {
  email: string;
  first_name: string;
  id: number;
  is_active: boolean;
  last_name: string;
  profile_image: string;
}

async function PatchProfessional(data: any) {
  const formData = new FormData();
  formData.append("profile_image", data.profile_image.originFileObj);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("email", data.email);
  const response = await fetch(
    `http://challenge.radlena.com/api/v1/professionals/${data.id}/`,
    {
      method: "PATCH",
      body: formData,
    }
  );
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("El mail ya fue ingresado en la data");
    } else {
      throw new Error("Recuperando lista de profesionales");
    }
  }
  return response.json();
}


const EditProfessional: React.FC<EditProps> = ({ id, showEdit }) => {
  const queryClient = useQueryClient();



  const mutation = useMutation(PatchProfessional, {
    onSuccess: function (data) {
          queryClient.invalidateQueries("PROFESSIONALS");
          modalSucces("Profesional modificado con exito");
     
    },

    onError: function (error) {
      console.log(error);
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
    const newData={
      "first_name":data.first_name,
      "last_name": data.last_name,
      "id":id,
      "profile_image": data.profile_image,
      "email" :data.email

  }
    mutation.mutate(newData);
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e.file;
  };


  function modalSucces(text: string) {
    Modal.success({
      content: text,
    });
  }

 

  return (
    <>
      <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name="profile_image"
          label="Upload"
          getValueFromEvent={normFile}
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
