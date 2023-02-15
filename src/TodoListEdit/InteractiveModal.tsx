import React, { forwardRef, useImperativeHandle, useState } from "react";
import {  Modal } from "antd";

type EditTypeModalProps = {
  name: string;
  children: React.ReactNode;
};

const InteractiveModal = forwardRef((props: EditTypeModalProps, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal,
  }));


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal 
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Done"
      title={props.name}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
        {props.children}
    </Modal>
  );

});

export default InteractiveModal;