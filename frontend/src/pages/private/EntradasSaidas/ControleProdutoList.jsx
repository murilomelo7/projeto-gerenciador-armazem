import { Button, Col, Panel, Row, Table, Input, IconButton, SelectPicker, DatePicker, Form } from 'rsuite';
import { Plus, Minus, Edit, Trash, Visible, History, Search } from '@rsuite/icons';
import { Container } from 'rsuite';
import { useEffect, useState } from 'react';
import ProdutoController from '@/controller/ProdutoController';
import EntradasSaidasForm from './ControleProdutoForm';
import ControleProdutoController from '@/controller/ControleProdutoController';
import { format } from 'date-fns';
import FornecedorController from '@/controller/FornecedorController';

const EntradasSaidasList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedControleProduto, setSelectedControleProduto] = useState([]);
  const [tipoControle, setTipoControle] = useState('');
  const [controleProduto, setControleProdutos] = useState();
  const [formDataFilter, setFormDataFilter] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [isEdit, setIsEdit] = useState(false);

  const init = async () => {
    try {
      const produtosResponse = await ProdutoController.getSelectData();
      setProdutos(produtosResponse);
      const fornecedoresResponse = await FornecedorController.getSelectData();
      setFornecedores(fornecedoresResponse);
      const categoriasResponse = await FornecedorController.getSelectData();
      setCategorias(categoriasResponse);

      const response = await ControleProdutoController.findMany();

      console.log(response);

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
    setTipoControle(rowData.tipo);
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

  const handleFilter = async () => {};

  const handleChangeFilter = (value, name) => {
    setFormDataFilter({ ...formDataFilter, [name]: value });
  };

  const handleAfterSubmit = () => {
    setShowModal(false);
    init();
  };

  const DateCell = ({ rowData, dataKey, ...props }) => (
    <Table.Cell {...props}>
      {rowData[dataKey] ? format(new Date(rowData[dataKey]), 'dd/MM/yyyy HH:mm:ss') : ''}
    </Table.Cell>
  );

  const TypeCell = ({ rowData, dataKey, ...props }) => {
    const borderColor = rowData[dataKey] === 'entrada' ? '#3fab45' : '#e63f30';
    return (
      <Table.Cell {...props}>
        <div
          style={{
            border: `2px solid ${borderColor}`,
            borderRadius: '5px',
            width: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {rowData[dataKey] === 'entrada' ? 'Entrada' : 'Saída'}
        </div>
      </Table.Cell>
    );
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
              <h3>Entradas e saídas dos produtos</h3>
            </Col>
          </Row>

          <Row>
            <Col md={20}></Col>
            <Col md={2}>
              <IconButton
                appearance="primary"
                color="green"
                icon={<Plus />}
                style={{ width: '100%' }}
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
                style={{ width: '100%' }}
                onClick={handleSaida}
              >
                Saída
              </IconButton>
            </Col>
          </Row>

          <Panel header="Filtros" bordered style={{ borderRadius: 10, marginTop: 40 }}>
            <Col md={24}>
              <Form fluid onSubmit={handleFilter}>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="tipo">
                      <Form.ControlLabel>Tipo</Form.ControlLabel>
                      <Form.Control
                        name="tipo"
                        searchable={false}
                        accepter={SelectPicker}
                        placeholder={'Selecione'}
                        // cleanable={false}
                        data={[
                          { label: 'Entrada', value: 'entrada' },
                          { label: 'Saída', value: 'saida' },
                        ]}
                        style={{ width: '100%' }}
                        onChange={value => handleChangeFilter(value, 'tipo')}
                        value={formDataFilter.tipo}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="produto_id">
                      <Form.ControlLabel>Produto</Form.ControlLabel>
                      <Form.Control
                        name="produto_id"
                        // searchable={false}
                        accepter={SelectPicker}
                        placeholder={'Selecione'}
                        cleanable={true}
                        data={produtos}
                        style={{ width: '100%' }}
                        onChange={value => handleChangeFilter(value, 'produto_id')}
                        value={formDataFilter.produto_id}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="fornecedor_id">
                      <Form.ControlLabel>Fornecedor</Form.ControlLabel>
                      <Form.Control
                        name="fornecedor_id"
                        searchable={false}
                        disabled={isEdit}
                        accepter={SelectPicker}
                        placeholder={'Selecione'}
                        cleanable={false}
                        data={fornecedores}
                        style={{ width: '100%' }}
                        onChange={value => handleChangeFilter(value, 'fornecedor_id')}
                        value={formDataFilter.fornecedor_id}
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col md={4}></Col>
                  <Col md={4}></Col> */}
                </Row>
                <Row style={{ marginBottom: 20 }}>
                  <Col md={22}></Col>
                  <Col md={2}>
                    <IconButton
                      title="Filtrar"
                      size={'md'}
                      color="cyan"
                      appearance="primary"
                      onClick={handleFilter}
                      icon={<Search />}
                    >
                      Filtrar
                    </IconButton>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Panel>
          <Row style={{ marginTop: 20 }}>
            <Col md={24}>
              <Panel header="Listagem" bordered style={{ borderRadius: 10 }}>
                <div style={{ overflowX: 'auto' }}>
                  <Table height={400} virtualized data={controleProduto}>
                    <Table.Column width={150} fixed="left" align="center">
                      <Table.HeaderCell>Tipo</Table.HeaderCell>
                      <TypeCell dataKey="tipo" />
                    </Table.Column>
                    <Table.Column width={700} align="left" flexGrow={1}>
                      <Table.HeaderCell>Produto</Table.HeaderCell>
                      <Table.Cell dataKey="produtoFk.nome" />
                    </Table.Column>
                    <Table.Column width={350} align="center" flexGrow={1}>
                      <Table.HeaderCell>Quantidade</Table.HeaderCell>
                      <Table.Cell dataKey="quantidade" />
                    </Table.Column>
                    <Table.Column width={350} align="center" flexGrow={1}>
                      <Table.HeaderCell>Preço Unitário</Table.HeaderCell>
                      <Table.Cell dataKey="quantidade" />
                    </Table.Column>
                    <Table.Column width={350} align="center" flexGrow={1}>
                      <Table.HeaderCell>Preço total</Table.HeaderCell>
                      <Table.Cell dataKey="quantidade" />
                    </Table.Column>
                    <Table.Column width={350} align="left" flexGrow={1}>
                      <Table.HeaderCell>Data lançamento</Table.HeaderCell>
                      <DateCell dataKey="createdAt" />
                    </Table.Column>
                    <Table.Column width={100} fixed="right">
                      <Table.HeaderCell align="center">Ações</Table.HeaderCell>
                      <Table.Cell style={{ alignItems: 'center', paddingTop: 10 }}>
                        {rowData => (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IconButton
                              title="Visualizar"
                              size={'sm'}
                              color="green"
                              appearance="ghost"
                              onClick={() => handleEdit(rowData)}
                              icon={<Visible />}
                            ></IconButton>
                            <IconButton
                              title="Estornar"
                              size={'sm'}
                              color="orange"
                              appearance="ghost"
                              onClick={() => handleRemove(rowData)}
                              icon={<History />}
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
