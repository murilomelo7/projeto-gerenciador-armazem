import { Button, Col, Panel, Row, Table, Input, IconButton } from 'rsuite';
import { Plus, Edit, Trash } from '@rsuite/icons';
import { Link } from 'react-router-dom';
import { Container } from 'rsuite';
import EmpresaForm from './EmpresaForm';
import { useState } from 'react';

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

  const handleRemove = rowData => {
    console.log('removeu sa poha');
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
          <Col md={22}>
            <h3>Empresas</h3>
          </Col>
        </Row>

        <Row>
          <Col md={22}></Col>
          <Col md={2}>
            <IconButton
              appearance="primary"
              color="green"
              icon={<Plus />}
              style={{ width: '90px' }}
              onClick={handleCreate}
            >
              Novo
            </IconButton>
          </Col>
        </Row>

        <Panel header="Filtros" bordered style={{ borderRadius: 10, marginTop: 40 }}>
          <Row style={{ marginTop: 20 }}>
            <Col md={24}>
              <Row>
                <Col md={12}>
                  <Input  type="text" placeholder="Nome da empresa"></Input>
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
                  <Table.Column width={100} fixed="left" align="center">
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
                  <Table.Column width={100} fixed="right">
                    <Table.HeaderCell align="center">Ações</Table.HeaderCell>
                    <Table.Cell style={{ alignItems: 'center', paddingTop: 10 }}>
                      {rowData => (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <IconButton
                            size={'sm'}
                            color="violet"
                            appearance="ghost"
                            onClick={() => handleEdit(rowData)}
                            icon={<Edit />}
                          ></IconButton>
                          <IconButton
                            size={'sm'}
                            color="red"
                            appearance="ghost"
                            onClick={() => handleRemove(rowData)}
                            icon={<Trash />}
                          ></IconButton>
                        </div>
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
