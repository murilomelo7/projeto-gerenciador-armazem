import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, SelectPicker } from 'rsuite';
import { createSchema, updateSchema } from './schema/ProdutoFormSchema';
import { z } from 'zod';
import ProdutoController from '@/controller/ProdutoController';
import CategoriaController from '@/controller/CategoriaController';

const initData = {
  codigo: '',
  nome: '',
  descricao: '',
  quantidade_produto: '',
  //   data_validade:
};

const ProdutoForm = ({ showModal, onClose, isEdit, initialData }) => {
  const [formData, setFormData] = useState(initData);
  const [errors, setErrors] = useState({});
  const [categorias, setCategorias] = useState([]);

  const init = async () => {
    const categoriasResponse = await CategoriaController.getSelectData();
    setCategorias(categoriasResponse);

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
        const response = await ProdutoController.create(formData);

        console.log(response);
        if (response) {
          handleClose();
        } else {
          console.log('erro');
        }
      } else {
        const response = await ProdutoController.update(formData);

        if (response) {
          handleClose();
        } else {
          console.log('erro');
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

  return (
    <Modal backdrop="static" size="sm" open={showModal} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Editar Produto' : 'Criar Produto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col sm={24}>
          <Form fluid onSubmit={handleSubmit}>
            <Row style={{ marginTop: 10 }}>
              <Col xs={6} sm={6}>
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
              <Col xs={18} sm={18}>
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
            </Row>

            <Row style={{ marginTop: 10 }}>
              <Col xs={24} sm={24}>
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
            <Row style={{ marginTop: 10 }}>
              <Col xs={12} sm={12}>
                <Form.Group controlId="categoria_id">
                  <Form.ControlLabel>Categoria</Form.ControlLabel>
                  <Form.Control
                    name="categoria_id"
                    searchable={false}
                    accepter={SelectPicker}
                    placeholder={'Selecione'}
                    cleanable={false}
                    data={categorias}
                    style={{ width: 270 }}
                    onChange={value => handleChange(value, 'categoria_id')}
                    value={formData.categoria_id}
                  />
                  {errors.categoria_id && <div style={{ color: 'red' }}>{errors.categoria_id}</div>}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12}>
                <Form.Group controlId="quantidade_produto">
                  <Form.ControlLabel>Quantidade</Form.ControlLabel>
                  <Form.Control
                    name="quantidade_produto"
                    accepter={InputNumber}
                    placeholder={'Quantidade'}
                    onChange={value => handleChange(value, 'quantidade_produto')}
                    value={formData.quantidade_produto}
                  />
                  {errors.quantidade_produto && <div style={{ color: 'red' }}>{errors.quantidade_produto}</div>}
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

export default ProdutoForm;
