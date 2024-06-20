import supertest from 'supertest';
import Server from '../server';

const request = supertest(Server.fastify.server);

let token;
let idFornecedorUpdate;

beforeAll(async () => {
  await Server.start();

  const loginResponse = await request.post('/login').send({ usuario: 'teste', senha: 'admin' });
  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body).toHaveProperty('token');

  token = loginResponse.body.token;
});

afterAll(async () => {
  await Server.close();
});

describe('Fornecedor Routes ', () => {
  it('POST - Deve retornar 400 com o token não informado', async () => {
    const response = await request.post('/fornecedor');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 400 com o corpo da requisição não informado', async () => {
    const response = await request.post('/fornecedor').set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 400 com os dados inválidos', async () => {
    const response = await request.post('/fornecedor').send({}).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 200 com o cadastro realizado com sucesso', async () => {
    const response = await request
      .post('/fornecedor')
      .send({
        cpfCnpj: '10000000000',
        nome: 'Teste fornecedor',
        telefone: '999999999',
        email: 'fornecedor@skldnfsdk.com',
        observacao: 'Teste observação',
      })
      .set('token', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
    idFornecedorUpdate = response.body.data.id;
  });

  it('PUT - Deve retornar 400 com o token não informado', async () => {
    const response = await request.put(`/fornecedor/${idFornecedorUpdate}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 400 com o corpo da requisição ausente', async () => {
    const response = await request.put(`/fornecedor/${idFornecedorUpdate}`).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 400 com os dados inválidos', async () => {
    const response = await request.put(`/fornecedor/${idFornecedorUpdate}`).send({}).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 200 com dados atualizados com sucesso', async () => {
    const response = await request
      .put(`/fornecedor/${idFornecedorUpdate}`)
      .send({
        cpfCnpj: '100',
        nome: 'Teste fornecedor',
        telefone: '999999999',
        email: 'fornecedor@skldnfsdk.com',
        observacao: 'Teste observação',
      })
      .set('token', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
  });

  it('GET ONE - Deve retornar 200 com os dados', async () => {
    const response = await request.get('/fornecedor').set('token', token);
    expect(response.status).toBe(200);
  });

  it('GET ONE - Deve retornar 400 com o token não informado', async () => {
    const response = await request.get(`/fornecedor/${idFornecedorUpdate}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('GET ALL - Deve retornar 200 com os dados', async () => {
    const response = await request.get(`/fornecedor`).set('token', token);
    expect(response.status).toBe(200);
  });

  it('GET ALL - Deve retornar 400 com o token não informado', async () => {
    const response = await request.get('/fornecedor');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('DELETE - Deve retornar 200 com a confirmação', async () => {
    const response = await request.delete(`/fornecedor/${idFornecedorUpdate}`).set('token', token);
    expect(response.status).toBe(200);
  });

  it('DELETE - Deve retornar 400 com o token não informado', async () => {
    const response = await request.delete(`/fornecedor/${idFornecedorUpdate}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });
});
