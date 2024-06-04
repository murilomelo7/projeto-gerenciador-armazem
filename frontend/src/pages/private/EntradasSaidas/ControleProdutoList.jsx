import { Button, Col, Panel, Row, Table, Input, IconButton } from 'rsuite';
import { Plus, Minus, Edit, Trash } from '@rsuite/icons';
import { Container } from 'rsuite';
import { useEffect, useState } from 'react';
import ProdutoController from '@/controller/ProdutoController';
import EntradasSaidasForm from './ControleProdutoForm';
import ControleProdutoController from '@/controller/ControleProdutoController';

const EntradasSaidasList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedControleProduto, setSelectedControleProduto] = useState([]);
  const [tipoControle, setTipoControle] = useState('');
  const [controleProduto, setControleProdutos] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const init = async () => {
    try {
      const response = await ControleProdutoController.findMany();
      setControleProdutos(response);
    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleEntrada = () => {
    setSelectedControleProduto([]);
    setIsEdit(false);
    setTipoControle('entrada');
    setShowModal(true);
  };

  const handleSaida = () => {
    setSelectedControleProduto([]);
    setIsEdit(false);
    setTipoControle('saida');
    setShowModal(true);
  };

  const handleEdit = rowData => {
    setSelectedControleProduto(rowData);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleRemove = async rowData => {
    const { id } = rowData;
    // const response = await CategoriaController.delete(id);
    // if (response) {
    //   handleAfterSubmit();
    // }
  };

  const handleAfterSubmit = () => {
    setShowModal(false);
    init();
  };

  return (
    <>
      <Container>
        <EntradasSaidasForm
          showModal={showModal}
          onClose={handleAfterSubmit}
          tipoControle={tipoControle}
          isEdit={isEdit}
          initialData={selectedControleProduto}
        />
        <Panel bordered style={{ borderRadius: 10 }}>
          <Row style={{ textAlign: 'center' }}>
            <Col md={22}>
              <h3>Entradas e saídas dos</h3>
            </Col>
          </Row>

          <Row>
            <Col md={20}></Col>
            <Col md={2}>
              <IconButton
                appearance="primary"
                color="green"
                icon={<Plus />}
                style={{ width: '100px' }}
                onClick={handleEntrada}
              >
                Entrada
              </IconButton>
            </Col>
            <Col md={2}>
              <IconButton
                appearance="primary"
                color="red"
                icon={<Minus />}
                style={{ width: '100px' }}
                onClick={handleSaida}
              >
                Saída
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
                  <Table height={500} virtualized data={controleProduto}>
                    <Table.Column width={100} fixed="left" align="center">
                      <Table.HeaderCell>Tipo</Table.HeaderCell>
                      <Table.Cell dataKey="tipo" />
                    </Table.Column>
                    <Table.Column width={700} align="left" flexGrow={1}>
                      <Table.HeaderCell>Produto</Table.HeaderCell>
                      <Table.Cell dataKey="produtoFk" />
                    </Table.Column>
                    <Table.Column width={350} align="left" flexGrow={1}>
                      <Table.HeaderCell>Quantidade</Table.HeaderCell>
                      <Table.Cell dataKey="quantidade" />
                    </Table.Column>
                    <Table.Column width={350} align="left" flexGrow={1}>
                      <Table.HeaderCell>Data lançamento</Table.HeaderCell>
                      <Table.Cell dataKey="createdAt" />
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

export default EntradasSaidasList;
