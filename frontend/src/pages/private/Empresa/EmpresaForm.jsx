import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Message, Modal, Row, SelectPicker, useToaster } from 'rsuite';
import { createSchema, updateSchema } from './schema/EmpresaFormSchema';
import { z } from 'zod';
import EmpresaController from '@/controller/EmpresaController';
import PerfilController from '@/controller/PerfilController';

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
  const [perfis, setPerfis] = useState([]);

  const toaster = useToaster();

  const init = async () => {
    const perfisResponse = await PerfilController.getSelectData();
    setPerfis(perfisResponse);

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
        const response = await EmpresaController.create(formData);

        if (response) {
          toaster.push(message('success', response.message), { placement: 'topEnd' });
          handleClose();
        } else {
          toaster.push(message('error', response.message), { placement: 'topEnd' });
        }
      } else {
        const response = await EmpresaController.update(formData);
        if (response) {
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
      <Modal backdrop="static" size="lg" open={showModal} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title style={{ fontSize: 22 }}>{isEdit ? 'Editar Empresa' : 'Criar Empresa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col sm={24}>
            <Form fluid onSubmit={handleSubmit}>
              <Row>
                <Col
                  xs={24}
                  sm={24}
                  style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Form.ControlLabel style={{ fontSize: 16 }}>Dados empresa</Form.ControlLabel>
                </Col>
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
                      maxLength={14}
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
                      maxLength={80}
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
                      minLength={5}
                      maxLength={100}
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
                      maxLength={14}
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
                      minLength={9}
                      maxLength={9}
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
                      minLength={2}
                      maxLength={2}
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
              {!isEdit && (
                <Row style={{ marginTop: 20 }}>
                  <Col
                    xs={24}
                    sm={24}
                    style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Form.ControlLabel style={{ fontSize: 16 }}>Dados usuário</Form.ControlLabel>
                  </Col>

                  <Col xs={6} sm={6}>
                    <Form.Group controlId="nomeUsuario">
                      <Form.ControlLabel>Nome do cliente</Form.ControlLabel>
                      <Form.Control
                        name="nomeUsuario"
                        accepter={Input}
                        placeholder={'Nome do cliente'}
                        maxLength={40}
                        onChange={value => handleChange(value, 'nomeUsuario')}
                        value={formData.nomeUsuario}
                      />
                      {errors.nomeUsuario && <div style={{ color: 'red' }}>{errors.nomeUsuario}</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={6}>
                    <Form.Group controlId="usuario">
                      <Form.ControlLabel>Usuário</Form.ControlLabel>
                      <Form.Control
                        name="usuario"
                        accepter={Input}
                        placeholder={'Usuário do cliente'}
                        maxLength={40}
                        onChange={value => handleChange(value, 'usuario')}
                        value={formData.usuario}
                      />
                      {errors.usuario && <div style={{ color: 'red' }}>{errors.usuario}</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={6}>
                    <Form.Group controlId="cpf">
                      <Form.ControlLabel>Cpf</Form.ControlLabel>
                      <Form.Control
                        name="cpf"
                        accepter={Input}
                        placeholder={'Cpf do cliente'}
                        maxLength={11}
                        onChange={value => handleChange(value, 'cpf')}
                        value={formData.Cpf}
                      />
                      {errors.cpf && <div style={{ color: 'red' }}>{errors.cpf}</div>}
                    </Form.Group>
                  </Col>

                  <Col xs={6} sm={6}>
                    <Form.Group controlId="perfil_id">
                      <Form.ControlLabel>Perfil</Form.ControlLabel>
                      <Form.Control
                        name="perfil_id"
                        searchable={false}
                        accepter={SelectPicker}
                        placeholder={'Selecione'}
                        cleanable={false}
                        data={perfis}
                        style={{ width: 270 }}
                        onChange={value => handleChange(value, 'perfil_id')}
                        value={formData.perfil_id}
                      />
                      {errors.perfil_id && <div style={{ color: 'red' }}>{errors.perfil_id}</div>}
                    </Form.Group>
                  </Col>
                </Row>
              )}
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

export default EmpresaForm;
