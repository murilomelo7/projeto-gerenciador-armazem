import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, SelectPicker } from 'rsuite';
import { createSchema, updateSchema } from './schema/UsuarioFormSchema';
import { z } from 'zod';
import UsuarioController from '@/controller/UsuarioController';
import PerfilController from '@/controller/PerfilController';
import EmpresaController from '@/controller/EmpresaController';

const initData = {
  nome: '',
  cpf: '',
  senha: '',
  email: '',
  usuario: '',
};

const UsuarioForm = ({ showModal, onClose, isEdit, initialData }) => {
  const [formData, setFormData] = useState(initData);
  const [errors, setErrors] = useState({});
  const [perfis, setPerfis] = useState([]);
  const [empresas, setEmpresas] = useState([]);

  const init = async () => {
    const perfisResponse = await PerfilController.getSelectData();
    setPerfis(perfisResponse);
    const empresasResponse = await EmpresaController.getSelectData();
    setEmpresas(empresasResponse);

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
        const response = await UsuarioController.create(formData);
        if (response) {
          handleClose();
        } else {
          console.log('erro');
        }
      } else {
        const response = await UsuarioController.update(formData);
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
        <Modal.Title>{isEdit ? 'Editar usuário' : 'Criar usuário'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col sm={24}>
          <Form fluid onSubmit={handleSubmit}>
            <Row style={{ marginTop: 10 }}>
              <Col xs={24} sm={24}>
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
              <Col xs={12} sm={12}>
                <Form.Group controlId="usuario">
                  <Form.ControlLabel>Usuário</Form.ControlLabel>
                  <Form.Control
                    name="usuario"
                    accepter={Input}
                    placeholder={'Usuário'}
                    onChange={value => handleChange(value, 'usuario')}
                    value={formData.usuario}
                  />
                  {errors.usuario && <div style={{ color: 'red' }}>{errors.usuario}</div>}
                </Form.Group>
              </Col>
              <Col xs={12} sm={12}>
                <Form.Group controlId="cpf">
                  <Form.ControlLabel>Cpf</Form.ControlLabel>
                  <Form.Control
                    name="cpf"
                    accepter={Input}
                    placeholder={'Cpf'}
                    onChange={value => handleChange(value, 'cpf')}
                    value={formData.cpf}
                  />
                  {errors.cpf && <div style={{ color: 'red' }}>{errors.cpf}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col xs={isEdit ? 24 : 12} sm={isEdit ? 24 : 12}>
                <Form.Group controlId="email">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control
                    name="email"
                    type="email"
                    accepter={Input}
                    placeholder={'Email'}
                    onChange={value => handleChange(value, 'email')}
                    value={formData.email}
                  />
                  {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </Form.Group>
              </Col>
              {!isEdit && (
                <Col xs={12} sm={12}>
                  <Form.Group controlId="senha">
                    <Form.ControlLabel>Senha</Form.ControlLabel>
                    <Form.Control
                      name="senha"
                      type="password"
                      disabled={isEdit ? true : false}
                      accepter={Input}
                      placeholder={'Senha'}
                      onChange={value => handleChange(value, 'senha')}
                      value={formData.senha}
                    />
                    {errors.senha && <div style={{ color: 'red' }}>{errors.senha}</div>}
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col xs={12} sm={12}>
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
              <Col xs={12} sm={12}>
                <Form.Group controlId="empresa_id">
                  <Form.ControlLabel>Empresa</Form.ControlLabel>
                  <Form.Control
                    name="empresa_id"
                    searchable={false}
                    accepter={SelectPicker}
                    placeholder={'Selecione'}
                    cleanable={false}
                    data={empresas}
                    style={{ width: 270 }}
                    onChange={value => handleChange(value, 'empresa_id')}
                    value={formData.empresa_id}
                  />
                  {errors.empresa_id && <div style={{ color: 'red' }}>{errors.empresa_id}</div>}
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

export default UsuarioForm;
