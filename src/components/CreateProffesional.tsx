import { useState } from "react";
import { Button, Modal, Upload, Form, Input, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UploadOutlined } from "@ant-design/icons";
import {
  AddProfessional,
  AddLenguaje,
  fetchLanguajes,
} from "../services/services";
import { ILanguaje } from "../interfaces/interfaces";
import { useForm } from "antd/lib/form/Form";

const CreateProfessional: React.FunctionComponent = () => {
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [lenguajes, setLenguajes] = useState([]);
  const [form] = Form.useForm();
  const mutation = useMutation(AddProfessional, {
    onSuccess: function (data) {
      if (lenguajes.length > 0) {
        lenguajes.forEach((lenguaje) => {
          const professionalId = data.id;
          const result = lang.data?.find((lang) => lang.code === lenguaje);

          const profesionalLang = {
            professional: {
              first_name: "string",
              last_name: "string",
              email: "user@example.com",
            },
            professional_id: professionalId,
            language: {
              name: "string",
              code: "string",
              is_active: true,
            },
            language_id: result?.id,
          };

          mutationLanguajes.mutate(profesionalLang);
     
         
        });
        queryClient.invalidateQueries("PROFESSIONALS");
        form.resetFields()
        modalSucces("Profesional creado con exito");
      }
    },

    onError: function (error) {
      console.log(error);
      modalError(
        "Ocurrio un error al modificar el profesional : posible email repetido"
      );
    },
  });

  const mutationLanguajes = useMutation(AddLenguaje)
 
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

  const { Option } = Select;

  const onFinish = (data: object) => {
    mutation.mutate(data);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e.file;
  };

  function handleChange(value: any) {
    setLenguajes(value);
  }

  const lang = useQuery<ILanguaje[], Error>(["LANGUAJES"], fetchLanguajes);
  if (lang.isLoading) {
    return <div>Cargando Lenguajes </div>;
  }
  if (lang.isError) {
    return <div>Error cargando Lenguajes</div>;
  }

  function modalSucces(text: string) {
    Modal.success({
      content: text,
      onOk() {
        setVisible(false);
      },
    });
  }

  function modalError(text: any) {
    Modal.error({
      content: text,
    });
  }

  return (
    <>
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
        <Form
        form={form}
          {...layout}
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={{
            "first_name" :"",
            "last_name" :"",
            "profile_image":"",
            "email":"",
            "lenguajes": []
            
          }
          }
        >
          <Form.Item
            name="profile_image"
            label="Imagen de perfil"
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
              multiple={false}
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

          <Form.Item
            name="lenguajes"
            label="Idiomas"
            rules={[
              {
                required: true,
                message: "Porfavor selecciona los idiomas que sabes",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Selecciona los idiomas que sab??s"
              allowClear
              onChange={handleChange}
            >
              {lang.data?.map((lenguaje) => (
                <Option key={lenguaje.code} value={lenguaje.code}>{lenguaje.name}</Option>
              ))}
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
  );
};

export default CreateProfessional;
