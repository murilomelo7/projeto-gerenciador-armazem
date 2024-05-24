import { useState } from 'react';
import { Button, Col, Input, Modal, Row } from 'rsuite';

const EmpresaForm = ({ showModal, onClose }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSalvar = () => {
    console.log('Nome:', nome);
    console.log('Descrição:', descricao);
    onClose();
  };

  return (
    <Modal size="1000px" open={showModal} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Nova Empresa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col sm={24}>
          {' '}
          {/* Adicione um container Col */}
          <Row>
            <Col sm={12}>
              <p>Nome da empresa</p>
              <Input value={nome} onChange={value => setNome(value)} placeholder="Nome da empresa" />
            </Col>
            <Col sm={12}>
              <p>Descrição</p>
              <Input value={descricao} onChange={value => setDescricao(value)} placeholder="Descrição da empresa" />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <p>Outro campo</p>
              <Input
                value={'aaaaaaaaa'}
                // onChange={(value) => setOutroCampo(value)}
                placeholder="Outro campo"
              />
            </Col>
            <Col sm={12}>
              <p>Mais um campo</p>
              <Input
                value={'aaaaaaaaa'}
                // onChange={(value) => setMaisUmCampo(value)}
                placeholder="Mais um campo"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <p>Outro campo</p>
              <Input
                value={'aaaaaaaaa'}
                // onChange={(value) => setOutroCampo(value)}
                placeholder="Outro campo"
              />
            </Col>
            <Col sm={12}>
              <p>Mais um campo</p>
              <Input
                value={'aaaaaaaaa'}
                // onChange={(value) => setMaisUmCampo(value)}
                placeholder="Mais um campo"
              />
            </Col>
          </Row>
        </Col>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSalvar} appearance="primary">
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmpresaForm;
