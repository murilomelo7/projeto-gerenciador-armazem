import { Button, Col, Panel, Row, Table, Input, IconButton, Message, useToaster } from 'rsuite';
import { Plus, Edit, Trash } from '@rsuite/icons';
import { Container } from 'rsuite';
import UsuarioForm from './UsuarioForm';
import { useEffect, useState } from 'react';
import UsuarioController from '@/controller/UsuarioController';

const UsuarioList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const toaster = useToaster();

  const init = async () => {
    try {
      const response = await UsuarioController.findMany();
      setUsuarios(response);
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleCreate = () => {
    setSelectedUsuario([]);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = rowData => {
    rowData.empresa_id = rowData.empresaFk.id;
    rowData.perfil_id = rowData.perfilFk.id;
    setSelectedUsuario(rowData);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleRemove = async rowData => {
    const { id } = rowData;
    const response = await UsuarioController.delete(id);
    if (response && !response.error) {
      toaster.push(message('success', response.message), { placement: 'topEnd' });
      handleAfterSubmit();
    } else {
      toaster.push(message('error', response.message), { placement: 'topEnd' });
    }
  };

  const handleAfterSubmit = () => {
    setShowModal(false);
    init();
  };

  const message = (type, message) => (
    <Message showIcon type={type} closable>
      {message}
    </Message>
  );

  return (
    <>
      {message}
      <Container>
        <UsuarioForm showModal={showModal} onClose={handleAfterSubmit} isEdit={isEdit} initialData={selectedUsuario} />
        <Panel bordered style={{ borderRadius: 10 }}>
          <Row style={{ textAlign: 'center' }}>
            <Col md={22}>
              <h3>Usuários</h3>
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

          {/* <Panel header="Filtros" bordered style={{ borderRadius: 10, marginTop: 40 }}>
            <Row style={{ marginTop: 20 }}>
              <Col md={24}>
                <Row>
                  <Col md={12}>
                    <Input type="text" placeholder="Nome do usuário"></Input>
                  </Col>
                  <Col>
                    <Button appearance="primary" style={{ width: '90px' }}>
                      Filtrar
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Panel> */}
          <Row style={{ marginTop: 20 }}>
            <Col md={24}>
              <Panel header="Listagem" bordered style={{ borderRadius: 10 }}>
                <div style={{ overflowX: 'auto' }}>
                  <Table height={500} virtualized data={usuarios}>
                    <Table.Column width={100} fixed="left" align="center">
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.Cell dataKey="id" />
                    </Table.Column>
                    <Table.Column width={350} align="left" flexGrow={1}>
                      <Table.HeaderCell>Nome</Table.HeaderCell>
                      <Table.Cell dataKey="nome" />
                    </Table.Column>
                    <Table.Column width={350} align="left" flexGrow={1}>
                      <Table.HeaderCell>Usuário</Table.HeaderCell>
                      <Table.Cell dataKey="usuario" />
                    </Table.Column>
                    <Table.Column width={700} align="left" flexGrow={1}>
                      <Table.HeaderCell>Perfil</Table.HeaderCell>
                      <Table.Cell dataKey="perfilFk.nome" />
                    </Table.Column>
                    <Table.Column width={700} align="left" flexGrow={1}>
                      <Table.HeaderCell>Empresa</Table.HeaderCell>
                      <Table.Cell dataKey="empresaFk.nome" />
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
    </>
  );
};

export default UsuarioList;
