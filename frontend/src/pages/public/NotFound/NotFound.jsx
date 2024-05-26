import React from 'react';
import { Container, Header, Content, Button, FlexboxGrid, Panel } from 'rsuite';

const NotFound = () => {
  return (
    <Container>
      <FlexboxGrid justify="center" align="middle" style={{ height: '100vh' }}>
        <FlexboxGrid.Item colspan={12}>
          <Panel bordered style={{ padding: 40, textAlign: 'center', minHeight: '50vh' }}>
            <Header style={{ marginTop: 60 }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>404 - Página Não Encontrada</h2>
            </Header>
            <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
                Desculpe, a página que você está procurando não existe.
              </p>
              <Button appearance="primary" href="/" style={{ fontSize: '1rem', padding: '10px 20px' }}>
                Voltar para a Página Inicial
              </Button>
            </Content>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};

export default NotFound;
