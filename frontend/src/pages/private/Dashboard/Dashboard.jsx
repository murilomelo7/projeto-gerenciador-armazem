import Layout from '@/components/Layout/Layout';
import BarChart from '@/components/Chart/BarChart';
import PieChart from '@/components/Chart/PieChart';

import { useEffect, useState } from 'react';
import ControleProdutoController from '@/controller/ControleProdutoController';
import { Col, Container, Panel, Row, Table } from 'rsuite';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';

const Dashboard = () => {
  const [controleProduto, setControleProduto] = useState([]);

  const init = async () => {
    const controleProdutoResponse = await ControleProdutoController.findMany({ limit: 10 });
    setControleProduto(controleProdutoResponse);
  };

  useEffect(() => {
    init();
  }, []);

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
            width: '40p50px',
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
        <Panel>
          <Row style={{ textAlign: 'center' }}>
            <Col md={24}>
              <h1>Dashboard</h1>
            </Col>
          </Row>
        </Panel>
        <Panel>
          <Row style={{ textAlign: 'center' }}>
            <Col md={12}>
              <Panel header="Gráfico de Entradas e Saídas" bordered style={{ borderRadius: 10 }}>
                <BarChart />
              </Panel>
            </Col>
            <Col md={12}>
              <Panel  header="Últimas entradas e saídas" bordered style={{ borderRadius: 10 }}>
                <Table height={290} data={controleProduto}>
                  <Table.Column width={100}>
                    <Table.HeaderCell>Tipo</Table.HeaderCell>
                    <TypeCell dataKey="tipo" />
                  </Table.Column>
                  <Table.Column width={100} align="left" flexGrow={1}>
                    <Table.HeaderCell>Produto</Table.HeaderCell>
                    <Table.Cell dataKey="produtoFk.nome" />
                  </Table.Column>
                  <Table.Column width={100} align="center" flexGrow={1}>
                    <Table.HeaderCell>Quantidade</Table.HeaderCell>
                    <Table.Cell dataKey="quantidade" />
                  </Table.Column>
                  <Table.Column width={350} align="center" flexGrow={1}>
                    <Table.HeaderCell>Valor unidade</Table.HeaderCell>
                    <Table.Cell dataKey="valor_unidade" />
                  </Table.Column>
                  <Table.Column width={100} align="center" flexGrow={1}>
                    <Table.HeaderCell>Valor total</Table.HeaderCell>
                    <Table.Cell dataKey="valor_total" />
                  </Table.Column>
                </Table>
              </Panel>
            </Col>
          </Row>
        </Panel>
      </Container>
    </>
  );
};

export default Dashboard;
