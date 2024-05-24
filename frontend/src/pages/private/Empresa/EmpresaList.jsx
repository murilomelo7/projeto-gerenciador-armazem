import { Button, Col, Panel, Row, Table, Input } from 'rsuite';
import { Link } from 'react-router-dom';
import { Container } from 'rsuite';
import EmpresaForm from './EmpresaForm';
import { useState } from 'react';

const EmpresaList = () => {
  const [showModal, setShowModal] = useState(false);

  const empresas = [
    { id: 1, name: 'Empresa 1', description: 'Descrição da Empresa 1' },
    { id: 2, name: 'Empresa 2', description: 'Descrição da Empresa 2' },
    { id: 3, name: 'Empresa 3', description: 'Descrição da Empresa 3' },
    { id: 4, name: 'Empresa 4', description: 'Descrição da Empresa 4' },
    { id: 5, name: 'Empresa 5', description: 'Descrição da Empresa 5' },
  ];

  return (
    <Container>
      <EmpresaForm showModal={showModal} onClose={() => setShowModal(false)} />
      <Panel bordered style={{ borderRadius: 10 }}>
        <Row style={{ textAlign: 'center' }}>
          <Col md={20}>
            <h2>Empresas</h2>
          </Col>
          <Col md={4}>
            <Button
              appearance="primary"
              style={{ width: '90px' }}
              onClick={() => {
                setShowModal(true);
              }}
            >
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
                    <Table.Cell dataKey="name" />
                  </Table.Column>
                  <Table.Column width={700} align="left" flexGrow={1}>
                    <Table.HeaderCell>Descrição</Table.HeaderCell>
                    <Table.Cell dataKey="description" />
                  </Table.Column>
                  <Table.Column width={200} fixed="right">
                    <Table.HeaderCell>Ações</Table.HeaderCell>
                    <Table.Cell>{rowData => <Link to={`/empresa/${rowData.id}`}>Detalhes</Link>}</Table.Cell>
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
