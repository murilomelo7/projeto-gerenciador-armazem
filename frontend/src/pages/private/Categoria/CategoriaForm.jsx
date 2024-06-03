import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, useToaster, Message } from 'rsuite';
import { createSchema, updateSchema } from './schema/CategoriaSchema';
import { z } from 'zod';
import CategoriaController from '@/controller/CategoriaController';

const initData = {
  codigo: '',
  nome: '',
  descricao: '',
};

const CategoriaForm = ({ showModal, onClose, isEdit, initialData }) => {
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
        const response = await CategoriaController.create(formData);
        if (response && !response.error) {
          toaster.push(message('success', response.message), { placement: 'topEnd' });
          handleClose();
        } else {
          toaster.push(message('error', response.message), { placement: 'topEnd' });
        }
      } else {
        const response = await CategoriaController.update(formData);
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
        if (e instanceof z.ZodError) {
          const newErrors = {};
          e.errors.forEach(error => {
            newErrors[error.path[0]] = error.message;
          });
          setErrors(newErrors);
        }
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
      <Modal backdrop="static" size="md" open={showModal} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{isEdit ? 'Editar Categoria' : 'Criar Categoria'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col sm={24}>
            <Form fluid onSubmit={handleSubmit}>
              <Row style={{ marginTop: 10 }}>
                <Col xs={4} sm={4}>
                  <Form.Group controlId="codigo">
                    <Form.ControlLabel>Código</Form.ControlLabel>
                    <Form.Control
                      name="codigo"
                      accepter={Input}
                      placeholder={'Código'}
                      onChange={value => handleChange(value, 'codigo')}
                      value={formData.codigo}
                    />
                    {errors.codigo && <div style={{ color: 'red' }}>{errors.codigo}</div>}
                  </Form.Group>
                </Col>
                <Col xs={10} sm={10}>
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
                <Col xs={10} sm={10}>
                  <Form.Group controlId="descricao">
                    <Form.ControlLabel>Descrição</Form.ControlLabel>
                    <Form.Control
                      name="descricao"
                      accepter={Input}
                      placeholder={'Descrição'}
                      onChange={value => handleChange(value, 'descricao')}
                      value={formData.descricao}
                    />
                    {errors.descricao && <div style={{ color: 'red' }}>{errors.descricao}</div>}
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

export default CategoriaForm;
