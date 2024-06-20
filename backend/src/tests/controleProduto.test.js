import supertest from 'supertest';
import Server from '../server';

const request = supertest(Server.fastify.server);

let token;
let idCategoria;
let idProduto;
let idFornecedor;
let idEntrada;
let idSaida;

beforeAll(async () => {
  await Server.start();

  const loginResponse = await request.post('/login').send({ usuario: 'teste', senha: 'admin' });
  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body).toHaveProperty('token');

  token = loginResponse.body.token;

  const dadosCategoria = await request
    .post('/categoria')
    .send({
      codigo: '100',
      nome: 'Teste categoria',
      descricao: 'Teste descrição',
    })
    .set('token', token);

  expect(dadosCategoria.status).toBe(200);
  expect(dadosCategoria.body).toHaveProperty('data');
  expect(dadosCategoria.body.data).toHaveProperty('id');

  idCategoria = dadosCategoria.body.data.id;

  const dadosProduto = await request
    .post('/produto')
    .send({
      codigo: '100',
      nome: 'Teste produto',
      descricao: 'Teste descrição',
      categoria_id: idCategoria,
      quantidade_produto: 1000,
    })
    .set('token', token);

  expect(dadosProduto.status).toBe(200);
  expect(dadosProduto.body).toHaveProperty('data');
  expect(dadosProduto.body.data).toHaveProperty('id');

  idProduto = dadosProduto.body.data.id;

  const dadosFornecedor = await request
    .post('/fornecedor')
    .send({
      cpfCnpj: '10000000000',
      nome: 'Teste fornecedor',
      telefone: '999999999',
      email: 'fornecedor@skldnfsdk.com',
      observacao: 'Teste observação',
    })
    .set('token', token);

  expect(dadosFornecedor.status).toBe(200);
  expect(dadosFornecedor.body).toHaveProperty('data');
  expect(dadosFornecedor.body.data).toHaveProperty('id');

  idFornecedor = dadosFornecedor.body.data.id;
});

afterAll(async () => {
  await Server.close();
});

describe('Controle produto Routes', () => {
  it('POST - ENTRADA -  Deve retornar 400 com o token não informado', async () => {
    const response = await request.post('/controle-produto/entrada');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - ENTRADA -  Deve retornar 400 com o corpo da requisição não informado', async () => {
    const response = await request.post('/controle-produto/entrada').set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - ENTRADA -  Deve retornar 400 com os dados inválidos', async () => {
    const response = await request.post('/controle-produto/entrada').send({}).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - ENTRADA -  Deve retornar 200 com a entrada realizada com sucesso', async () => {
    const response = await request
      .post('/controle-produto/saida')
      .send({
        tipo: 'saida',
        produto_id: idProduto,
        fornecedor_id: idFornecedor,
        quantidade: 10,
        valor_total: 1000,
        valor_unidade: 10,
      })
      .set('token', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
    idEntrada = response.body.data.id;
  });

  it('POST - SAIDA -  Deve retornar 400 com o token não informado', async () => {
    const response = await request.post('/controle-produto/saida');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - SAIDA -  Deve retornar 400 com o corpo da requisição não informado', async () => {
    const response = await request.post('/controle-produto/saida').set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - SAIDA -  Deve retornar 400 com os dados inválidos', async () => {
    const response = await request.post('/controle-produto/saida').send({}).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - SAIDA -  Deve retornar 200 com a saida realizada com sucesso', async () => {
    const response = await request
      .post('/controle-produto/saida')
      .send({
        tipo: 'saida',
        produto_id: idProduto,
        quantidade: 10,
        valor_total: 1000,
        valor_unidade: 10,
      })
      .set('token', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
    idSaida = response.body.data.id;
  });

  it('GET ALL-  Deve retornar 400 com o token não informado', async () => {
    const response = await request.get('/controle-produto');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('GET ENTRADA-  Deve retornar 200 com os dados da entrada', async () => {
    const response = await request.get(`/controle-produto/${idEntrada}`).set('token', token);
    expect(response.status).toBe(200);
  });

  it('GET SAÍDA-  Deve retornar 200 com os dados da entrada', async () => {
    const response = await request.get(`/controle-produto/${idSaida}`).set('token', token);
    expect(response.status).toBe(200);
  });
});
