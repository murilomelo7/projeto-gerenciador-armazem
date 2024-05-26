import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, SelectPicker } from 'rsuite';
import { createSchema, updateSchema } from './schema/EmpresaFormSchema';
import { z } from 'zod';

const initData = {
  tipo: '',
  cpfCnpj: '',
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  cep: '',
  estado: '',
  cidade: '',
};

const EmpresaForm = ({ showModal, onClose, isEdit, initialData }) => {
  const [formData, setFormData] = useState(initData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    console.log('formData', formData); // Verifica o estado atualizado de formData
  }, [formData]);

  console.log(formData);

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
      console.log('jabedjkfnsdf');
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
    <Modal size="lg" open={showModal} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Editar Empresa' : 'Criar Empresa'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col sm={24}>
          <Form fluid onSubmit={handleSubmit}>
            <Row style={{ marginTop: 10 }}>
              <Col xs={12} sm={6}>
                <Form.Group controlId="tipo">
                  <Form.ControlLabel>Tipo</Form.ControlLabel>
                  <Form.Control
                    name="tipo"
                    searchable={false}
                    accepter={SelectPicker}
                    placeholder={'Selecione'}
                    cleanable={false}
                    data={[
                      { label: 'Jurídica', value: 'J' },
                      { label: 'Fisíca', value: 'F' },
                    ]}
                    style={{ width: 222 }}
                    onChange={value => handleChange(value, 'tipo')}
                    value={formData.tipo}
                  />
                  {errors.tipo && <div style={{ color: 'red' }}>{errors.tipo}</div>}
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="cpfCnpj">
                  <Form.ControlLabel>CPF/CNPJ</Form.ControlLabel>
                  <Form.Control
                    name="cpfCnpj"
                    accepter={Input}
                    placeholder={'CPF/CNPJ'}
                    onChange={value => handleChange(value, 'cpfCnpj')}
                    value={formData.cpfCnpj}
                  />
                  {errors.cpfCnpj && <div style={{ color: 'red' }}>{errors.cpfCnpj}</div>}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12}>
                <Form.Group controlId="nome">
                  <Form.ControlLabel>Nome da empresa</Form.ControlLabel>
                  <Form.Control
                    name="nome"
                    accepter={Input}
                    placeholder={'Nome da empresa'}
                    onChange={value => handleChange(value, 'nome')}
                    value={formData.nome}
                  />
                  {errors.nome && <div style={{ color: 'red' }}>{errors.nome}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col xs={12} sm={6}>
                <Form.Group controlId="email">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control
                    name="email"
                    accepter={Input}
                    placeholder={'Email'}
                    onChange={value => handleChange(value, 'email')}
                    value={formData.email}
                  />
                  {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="telefone">
                  <Form.ControlLabel>Telefone</Form.ControlLabel>
                  <Form.Control
                    name="telefone"
                    accepter={Input}
                    placeholder={'Telefone'}
                    onChange={value => handleChange(value, 'telefone')}
                    value={formData.telefone}
                  />
                  {errors.telefone && <div style={{ color: 'red' }}>{errors.telefone}</div>}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12}>
                <Form.Group controlId="endereco">
                  <Form.ControlLabel>Endereço</Form.ControlLabel>
                  <Form.Control
                    name="endereco"
                    accepter={Input}
                    placeholder={'Endereço'}
                    onChange={value => handleChange(value, 'endereco')}
                    value={formData.endereco}
                  />
                  {errors.endereco && <div style={{ color: 'red' }}>{errors.endereco}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col xs={12} sm={6}>
                <Form.Group controlId="CEP">
                  <Form.ControlLabel>CEP</Form.ControlLabel>
                  <Form.Control
                    name="cep"
                    accepter={Input}
                    placeholder={'CEP'}
                    onChange={value => handleChange(value, 'cep')}
                    value={formData.cep}
                  />
                  {errors.cep && <div style={{ color: 'red' }}>{errors.cep}</div>}
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="estado">
                  <Form.ControlLabel>Estado</Form.ControlLabel>
                  <Form.Control
                    name="estado"
                    accepter={Input}
                    placeholder={'Estado'}
                    onChange={value => handleChange(value, 'estado')}
                    value={formData.estado}
                  />
                  {errors.estado && <div style={{ color: 'red' }}>{errors.estado}</div>}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12}>
                <Form.Group controlId="cidade">
                  <Form.ControlLabel>Cidade</Form.ControlLabel>
                  <Form.Control
                    name="cidade"
                    accepter={Input}
                    placeholder={'Cidade'}
                    onChange={value => handleChange(value, 'cidade')}
                    value={formData.cidade}
                  />
                  {errors.cidade && <div style={{ color: 'red' }}>{errors.cidade}</div>}
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

export default EmpresaForm;
