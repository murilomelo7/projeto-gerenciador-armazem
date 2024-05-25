import { Button, Col, Panel, Row, Table, Input } from 'rsuite';
import { Link } from 'react-router-dom';
import { Container } from 'rsuite';
import EmpresaForm from './EmpresaForm';
import { useState } from 'react';
import EditIcon from '@rsuite/icons/legacy/Edit';

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
const EmpresaList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(initData);
  const [isEdit, setIsEdit] = useState(false);

  const empresas = [
    {
      id: 1,
      tipo: 'J',
      cpfCnpj: '1234567890123',
      nome: 'EmpresaTeste',
      email: 'email@email.com',
      telefone: '234234234',
      endereco: 'sla',
      cep: '2387492',
      estado: '423424',
      cidade: '234234',
    },
    {
      id: 2,
      tipo: 'J',
      cpfCnpj: '1234567890123',
      nome: 'EmpresaTeste',
      email: 'email@email.com',
      telefone: '234234234',
      endereco: 'sla',
      cep: '2387492',
      estado: '423424',
      cidade: '234234',
    },
    // { id: 2, name: 'Empresa 2', description: 'Descrição da Empresa 2' },
    // { id: 3, name: 'Empresa 3', description: 'Descrição da Empresa 3' },
    // { id: 4, name: 'Empresa 4', description: 'Descrição da Empresa 4' },
    // { id: 5, name: 'Empresa 5', description: 'Descrição da Empresa 5' },
  ];

  const handleCreate = () => {
    setSelectedEmpresa(initData);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = rowData => {
    setSelectedEmpresa(rowData);
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <Container>
      <EmpresaForm
        showModal={showModal}
        onClose={() => setShowModal(false)}
        isEdit={isEdit}
        initialData={selectedEmpresa}
      />
      <Panel bordered style={{ borderRadius: 10 }}>
        <Row style={{ textAlign: 'center' }}>
          <Col md={20}>
            <h2>Empresas</h2>
          </Col>
          <Col md={4}>
            <Button appearance="primary" style={{ width: '90px' }} onClick={handleCreate}>
              <strong>Novo</strong>
            </Button>
          </Col>
        </Row>

        <Panel header="Filtros" bordered style={{ borderRadius: 10, marginTop: 40 }}>
          <Row style={{ marginTop: 20 }}>
            <Col md={24}>
              <Row>
                <Col md={12}>
                  <Input type="text" placeholder="Nome da empresa"></Input>
                </Col>
                <Col>
                  <Button appearance="primary" style={{ width: '90px' }}>
                    Filtrar
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
        <Row style={{ marginTop: 20 }}>
          <Col md={24}>
            <Panel header="Listagem" bordered style={{ borderRadius: 10 }}>
              <div style={{ overflowX: 'auto' }}>
                <Table
                  height={600}
                  bordered
                  cellBordered
                  autoHeight
                  affixHeader
                  affixHorizontalScrollbar
                  data={empresas}
                >
                  <Table.Column width={200} align="center" flexGrow={1}>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.Cell dataKey="id" />
                  </Table.Column>
                  <Table.Column width={700} align="left" flexGrow={1}>
                    <Table.HeaderCell>Nome</Table.HeaderCell>
                    <Table.Cell dataKey="nome" />
                  </Table.Column>
                  <Table.Column width={700} align="left" flexGrow={1}>
                    <Table.HeaderCell>Cpf/Cnpj</Table.HeaderCell>
                    <Table.Cell dataKey="cpfCnpj" />
                  </Table.Column>
                  <Table.Column width={200} fixed="right">
                    <Table.HeaderCell>Ações</Table.HeaderCell>
                    <Table.Cell style={{ alignItems: 'center', paddingTop: 10 }}>
                      {rowData => (
                        <Button onClick={() => handleEdit(rowData)}>
                          <EditIcon />
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Column>
                </Table>
              </div>
            </Panel>
          </Col>
        </Row>
      </Panel>
    </Container>
  );
};

export default EmpresaList;
