import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Message, Modal, Row, SelectPicker, useToaster } from 'rsuite';
import { z } from 'zod';
import ControleProdutoController from '@/controller/ControleProdutoController';
import ProdutoController from '@/controller/ProdutoController';
import FornecedorController from '@/controller/FornecedorController';

const initData = {
  quantidade: 0,
};

const EntradasSaidasForm = ({ showModal, onClose, tipoControle, isEdit, initialData }) => {
  const [formData, setFormData] = useState(initData);
  const [errors, setErrors] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const toaster = useToaster();

  const init = async () => {
    const produtosResponse = await ProdutoController.getSelectData();
    setProdutos(produtosResponse);
    const fornecedoresResponse = await FornecedorController.getSelectData();
    setFornecedores(fornecedoresResponse);

    if (!isEdit) {
      setFormData({ tipo: tipoControle, ...initData });
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
      // const schema = isEdit ? updateSchema : createSchema;
      // schema.parse(formData);

      if (!isEdit && tipoControle === 'entrada') {
        const response = await ControleProdutoController.entrada(formData);
        if (response && !response.error) {
          toaster.push(message('success', response.message), { placement: 'topEnd' });
          handleClose();
        } else {
          toaster.push(message('error', response.message), { placement: 'topEnd' });
        }
      } else if (isEdit && tipoControle === 'entrada') {
        const response = await ControleProdutoController.update(formData);
        if (response && !response.error) {
          toaster.push(message('success', response.message), { placement: 'topEnd' });
          handleClose();
        } else {
          toaster.push(message('error', response.message), { placement: 'topEnd' });
        }
      } else if (!isEdit && tipoControle === 'saida') {
        const response = await ControleProdutoController.saida(formData);
        if (response && !response.error) {
          toaster.push(message('success', response.message), { placement: 'topEnd' });
          handleClose();
        } else {
          toaster.push(message('error', response.message), { placement: 'topEnd' });
        }
      } else if (isEdit && tipoControle === 'saida') {
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
      <Modal size="lg" open={showModal} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{!isEdit ? 'Novo ' : 'Editar'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col sm={24}>
            <Form fluid onSubmit={handleSubmit}>
              <Row style={{ marginTop: 10 }}>
                <Col xs={4} sm={4}>
                  <Form.Group controlId="tipo">
                    <Form.ControlLabel>Tipo</Form.ControlLabel>
                    <Form.Control
                      name="tipo"
                      searchable={false}
                      accepter={SelectPicker}
                      placeholder={'Selecione'}
                      cleanable={false}
                      disabled={true}
                      data={[
                        { label: 'Entrada', value: 'entrada' },
                        { label: 'Saída', value: 'saida' },
                      ]}
                      style={{ width: 270 }}
                      onChange={value => handleChange(value, 'tipo')}
                      value={formData.tipo}
                    />
                    {errors.tipo && <div style={{ color: 'red' }}>{errors.tipo}</div>}
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6}>
                  <Form.Group controlId="produto_id">
                    <Form.ControlLabel>Produto</Form.ControlLabel>
                    <Form.Control
                      name="produto_id"
                      searchable={false}
                      disabled={isEdit}
                      accepter={SelectPicker}
                      placeholder={'Selecione'}
                      cleanable={false}
                      data={produtos}
                      style={{ width: 270 }}
                      onChange={value => handleChange(value, 'produto_id')}
                      value={formData.produto_id}
                    />
                    {errors.produto_id && <div style={{ color: 'red' }}>{errors.produto_id}</div>}
                  </Form.Group>
                </Col>
                {tipoControle === 'entrada' && (
                  <Col xs={6} sm={6}>
                    <Form.Group controlId="fornecedor_id">
                      <Form.ControlLabel>Fornecedor</Form.ControlLabel>
                      <Form.Control
                        name="fornecedor_id"
                        searchable={false}
                        disabled={isEdit}
                        accepter={SelectPicker}
                        placeholder={'Selecione'}
                        cleanable={false}
                        data={fornecedores}
                        style={{ width: 270 }}
                        onChange={value => handleChange(value, 'fornecedor_id')}
                        value={formData.fornecedor_id}
                      />
                      {errors.fornecedor_id && <div style={{ color: 'red' }}>{errors.fornecedor_id}</div>}
                    </Form.Group>
                  </Col>
                )}
                <Col xs={6} sm={6}>
                  <Form.Group controlId="quantidade">
                    <Form.ControlLabel>Quantidade</Form.ControlLabel>
                    <Form.Control
                      name="quantidade"
                      accepter={InputNumber}
                      disabled={isEdit}
                      placeholder={'Quantidade'}
                      onChange={value => handleChange(value, 'quantidade')}
                      value={formData.quantidade}
                    />
                    {errors.quantidade && <div style={{ color: 'red' }}>{errors.quantidade}</div>}
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
