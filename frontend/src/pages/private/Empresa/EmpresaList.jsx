import { Button, Col, Panel, Row, Table, Input, IconButton } from 'rsuite';
import { Plus, Edit, Trash } from '@rsuite/icons';

import { Container } from 'rsuite';
import EmpresaController from '@/controller/EmpresaController';
import EmpresaForm from './EmpresaForm';
import { useEffect, useState } from 'react';

const EmpresaList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [empresas, setEmpresas] = useState([]);

  const init = async () => {
    try {
      const response = await EmpresaController.findMany();
      setEmpresas(response);
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleCreate = () => {
    setSelectedEmpresa();
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = rowData => {
    setSelectedEmpresa(rowData);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleRemove = async rowData => {
    const { id } = rowData;
    const response = await EmpresaController.delete(id);
    if (response) {
      handleAfterSubmit();
    }
  };

  const handleAfterSubmit = () => {
    setShowModal(false);
    init();
  };

  return (
    <Container>
      <EmpresaForm showModal={showModal} onClose={handleAfterSubmit} isEdit={isEdit} initialData={selectedEmpresa} />
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
                <Table height={500} virtualized data={empresas}>
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
