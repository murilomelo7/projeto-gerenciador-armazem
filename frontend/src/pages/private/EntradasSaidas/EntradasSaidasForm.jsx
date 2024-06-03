import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Message, Modal, Row, useToaster } from 'rsuite';
import { z } from 'zod';
import ControleProdutoController from '@/controller/ControleProdutoController';

const initData = {
  nome: '',
  acessos: '',
};

const EntradasSaidasForm = ({ showModal, onClose, isEdit, initialData }) => {
  const [formData, setFormData] = useState(initData);
  const [errors, setErrors] = useState({});

  const toaster = useToaster();

  const init = async () => {
    if (!isEdit) {
      setFormData(initData);
    } else {
      setFormData(initialData);
    }
  };

  useEffect(() => {
    init();
  }, [showModal]);

  const handleClose = () => {
    setErrors({});
    setFormData(initData);
    onClose();
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const schema = isEdit ? updateSchema : createSchema;
      schema.parse(formData);

      if (!isEdit) {
        const response = await ControleProdutoController.create(formData);
        if (response && !response.error) {
          toaster.push(message('success', response.message), { placement: 'topEnd' });
          handleClose();
        } else {
          toaster.push(message('error', response.message), { placement: 'topEnd' });
        }
      } else {
        const response = await ControleProdutoController.update(formData);
        if (response && !response.error) {
          toaster.push(message('success', response.message), { placement: 'topEnd' });
          handleClose();
        } else {
          toaster.push(message('error', response.message), { placement: 'topEnd' });
        }
      }
    } catch (e) {
      console.log(e);
      if (e instanceof z.ZodError) {
        const newErrors = {};
        e.errors.forEach(error => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const message = (type, message) => (
    <Message showIcon type={type} closable>
      {message}
    </Message>
  );

  return (
    <>
      {message}
      <Modal size="sm" open={showModal} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{isEdit ? 'Editar Perfil' : 'Criar Perfil'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col sm={24}>
            <Form fluid onSubmit={handleSubmit}>
              <Row style={{ marginTop: 10 }}>
                <Col xs={12} sm={12}>
                  <Form.Group controlId="nome">
                    <Form.ControlLabel>Nome</Form.ControlLabel>
                    <Form.Control
                      name="nome"
                      accepter={Input}
                      placeholder={'Nome'}
                      onChange={value => handleChange(value, 'nome')}
                      value={formData.nome}
                    />
                    {errors.nome && <div style={{ color: 'red' }}>{errors.nome}</div>}
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12}>
                  <Form.Group controlId="acessos">
                    <Form.ControlLabel>Acessos</Form.ControlLabel>
                    <Form.Control
                      name="acessos"
                      accepter={Input}
                      placeholder={'Acessos'}
                      onChange={value => handleChange(value, 'acessos')}
                      value={formData.acessos}
                    />
                    {errors.acessos && <div style={{ color: 'red' }}>{errors.acessos}</div>}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} appearance="primary">
            {isEdit ? 'Salvar Alterações' : 'Salvar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EntradasSaidasForm;
