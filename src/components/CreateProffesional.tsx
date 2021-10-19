import { useState } from "react";
import { Button,Modal } from "antd";

const CreateProfessional : React.FunctionComponent = () => {
    const [visible, setVisible] = useState(false);

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
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>




    )}

    export default CreateProfessional