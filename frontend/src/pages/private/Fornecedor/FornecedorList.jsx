import { Button, Col, Panel, Row, Table, Input, IconButton, useToaster, Message } from 'rsuite';
import { Plus, Edit, Trash } from '@rsuite/icons';
import { Container } from 'rsuite';
import FornecedorForm from './FornecedorForm';
import { useEffect, useState } from 'react';
import FornecedorController from '@/controller/FornecedorController';

const FornecedorList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFornecedor, setSelectedFornecedores] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [fornecedores, setFornecedores] = useState();

  const toaster = useToaster();

  const init = async () => {
    try {
      const response = await FornecedorController.findMany();
      setFornecedores(response);
    } catch (error) {
      console.error('Erro ao buscar fornecedores', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleCreate = () => {
    setSelectedFornecedores([]);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = rowData => {
    setSelectedFornecedores(rowData);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleRemove = async rowData => {
    const { id } = rowData;
    const response = await FornecedorController.delete(id);
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
        <FornecedorForm
          showModal={showModal}
          onClose={handleAfterSubmit}
          isEdit={isEdit}
          initialData={selectedFornecedor}
        />
        <Panel bordered style={{ borderRadius: 10 }}>
          <Row style={{ textAlign: 'center' }}>
            <Col md={22}>
              <h3>Fornecedor</h3>
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
                    <Input type="text" placeholder="Nome do fornecedor"></Input>
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
                  <Table height={500} virtualized data={fornecedores}>
                    <Table.Column width={300} fixed="left">
                      <Table.HeaderCell>Cpf/Cpnj</Table.HeaderCell>
                      <Table.Cell dataKey="cpfCnpj" />
                    </Table.Column>
                    <Table.Column width={600} align="left" flexGrow={1}>
                      <Table.HeaderCell>Nome</Table.HeaderCell>
                      <Table.Cell dataKey="nome" />
                    </Table.Column>
                    <Table.Column width={350} align="left" flexGrow={1}>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.Cell dataKey="email" />
                    </Table.Column>
                    <Table.Column width={350} align="left" flexGrow={1}>
                      <Table.HeaderCell>Telefone</Table.HeaderCell>
                      <Table.Cell dataKey="telefone" />
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

export default FornecedorList;
