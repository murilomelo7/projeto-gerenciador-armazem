import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, useToaster, Message } from 'rsuite';
import { createSchema, updateSchema } from './schema/FornecedorSchema';
import { z } from 'zod';
import FornecedorController from '@/controller/FornecedorController';

const initData = {
  cpfCnpj: '',
  nome: '',
  telefone: '',
  email: '',
  observacao: '',
};

const FornecedorForm = ({ showModal, onClose, isEdit, initialData }) => {
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
        const response = await FornecedorController.create(formData);
        if (response && !response.error) {
          toaster.push(message('success', response.message), { placement: 'topEnd' });
          handleClose();
        } else {
          toaster.push(message('error', response.message), { placement: 'topEnd' });
        }
      } else {
        const response = await FornecedorController.update(formData);
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
          <Modal.Title>{isEdit ? 'Editar Fornecedor' : 'Criar Fornecedor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col sm={24}>
            <Form fluid onSubmit={handleSubmit}>
              <Row style={{ marginTop: 10 }}>
                <Col xs={12} sm={12}>
                  <Form.Group controlId="cpfCnpj">
                    <Form.ControlLabel>CPF/CNPJ</Form.ControlLabel>
                    <Form.Control
                      name="cpfCnpj"
                      accepter={Input}
                      placeholder={'CPF/CNPJ'}
                      maxLength={14}
                      onChange={value => handleChange(value, 'cpfCnpj')}
                      value={formData.cpfCnpj}
                    />
                    {errors.cpfCnpj && <div style={{ color: 'red' }}>{errors.cpfCnpj}</div>}
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12}>
                  <Form.Group controlId="nome">
                    <Form.ControlLabel>Nome do fornecedor</Form.ControlLabel>
                    <Form.Control
                      name="nome"
                      accepter={Input}
                      placeholder={'Nome do fornecedor'}
                      maxLength={80}
                      onChange={value => handleChange(value, 'nome')}
                      value={formData.nome}
                    />
                    {errors.nome && <div style={{ color: 'red' }}>{errors.nome}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col xs={12} sm={12}>
                  <Form.Group controlId="email">
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control
                      name="email"
                      accepter={Input}
                      placeholder={'Email'}
                      minLength={5}
                      maxLength={100}
                      onChange={value => handleChange(value, 'email')}
                      value={formData.email}
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12}>
                  <Form.Group controlId="telefone">
                    <Form.ControlLabel>Telefone</Form.ControlLabel>
                    <Form.Control
                      name="telefone"
                      accepter={Input}
                      placeholder={'Telefone'}
                      maxLength={14}
                      onChange={value => handleChange(value, 'telefone')}
                      value={formData.telefone}
                    />
                    {errors.telefone && <div style={{ color: 'red' }}>{errors.telefone}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col xs={24} sm={24}>
                  <Form.Group controlId="observacao">
                    <Form.ControlLabel>Observação</Form.ControlLabel>
                    <Form.Control
                      name="telefone"
                      accepter={Input}
                      placeholder={'Observação'}
                      maxLength={14}
                      onChange={value => handleChange(value, 'observacao')}
                      value={formData.observacao}
                    />
                    {errors.observacao && <div style={{ color: 'red' }}>{errors.observacao}</div>}
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

export default FornecedorForm;
