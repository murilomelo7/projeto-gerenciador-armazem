import { Button, Col, Panel, Row, Table, Input, IconButton } from 'rsuite';
import { Plus, Edit, Trash } from '@rsuite/icons';
import { Container } from 'rsuite';
import CategoriaForm from './CategoriaForm';
import { useState } from 'react';

const initData = {
  nome: '',
  acessos: '',
};
const CategoriaList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPerfil, setSelectedPerfil] = useState(initData);
  const [isEdit, setIsEdit] = useState(false);

  const categorias = [
    {
      id: 1,
      nome: 'Categoria 1',
      descricao: 'Descrição da categoria 1',
    },
    {
      id: 2,
      nome: 'Categoria 2',
      descricao: 'Descrição da categoria 2',
    },
  ];

  const handleCreate = () => {
    setSelectedPerfil(initData);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = rowData => {
    setSelectedPerfil(rowData);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleRemove = rowData => {
    console.log('removeu sa poha');
  };

  return (
    <Container>
      <CategoriaForm
        showModal={showModal}
        onClose={() => setShowModal(false)}
        isEdit={isEdit}
        initialData={selectedPerfil}
      />
      <Panel bordered style={{ borderRadius: 10 }}>
        <Row style={{ textAlign: 'center' }}>
          <Col md={22}>
            <h3>Categorias</h3>
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
                  <Input type="text" placeholder="Nome da categoria"></Input>
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
                  data={categorias}
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
                    <Table.HeaderCell>Acessos</Table.HeaderCell>
                    <Table.Cell dataKey="acessos" />
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

export default CategoriaList;
