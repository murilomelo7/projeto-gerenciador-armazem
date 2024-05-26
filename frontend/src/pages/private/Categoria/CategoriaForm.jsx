import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, SelectPicker } from 'rsuite';
import { createSchema, updateSchema } from './schema/CategoriaSchema';
import { z } from 'zod';

const initData = {
  nome: '',
  descricao: '',
};

const CategoriaForm = ({ showModal, onClose, isEdit, initialData }) => {
  const [formData, setFormData] = useState(initData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleClose = () => {
    setErrors({});
    setFormData(initData);
    onClose();
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    try {
      const schema = isEdit ? updateSchema : createSchema;
      schema.parse(formData);
      console.log(formData);
      handleClose();
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

  return (
    <Modal size="sm" open={showModal} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Editar Categoria' : 'Criar Categoria'}</Modal.Title>
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
  );
};

export default CategoriaForm;
