import supertest from 'supertest';
import Server from '../server';

const request = supertest(Server.fastify.server);

let token;
let idCategoriaUpdate;

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

describe('Categoria Routes ', () => {
  it('POST - Deve retornar 400 com o token não informado', async () => {
    const response = await request.post('/categoria');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 400 com o corpo da requisição não informado', async () => {
    const response = await request.post('/categoria').set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 400 com os dados inválidos', async () => {
    const response = await request.post('/categoria').send({}).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 200 com o cadastro realizado com sucesso', async () => {
    const response = await request
      .post('/categoria')
      .send({
        codigo: '100',
        nome: 'Teste categoria',
        descricao: 'Teste descrição',
      })
      .set('token', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
    idCategoriaUpdate = response.body.data.id;
  });

  it('PUT - Deve retornar 400 com o token não informado', async () => {
    const response = await request.put(`/categoria/${idCategoriaUpdate}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 400 com o corpo da requisição ausente', async () => {
    const response = await request.put(`/categoria/${idCategoriaUpdate}`).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 400 com os dados inválidos', async () => {
    const response = await request.put(`/categoria/${idCategoriaUpdate}`).send({}).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 200 com dados atualizados com sucesso', async () => {
    const response = await request
      .put(`/categoria/${idCategoriaUpdate}`)
      .send({
        codigo: '123',
        nome: 'teste',
      })
      .set('token', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
  });

  it('GET ONE - Deve retornar 200 com os dados', async () => {
    const response = await request.get('/categoria').set('token', token);
    expect(response.status).toBe(200);
  });

  it('GET ONE - Deve retornar 400 com o token não informado', async () => {
    const response = await request.get(`/categoria/${idCategoriaUpdate}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('GET ALL - Deve retornar 200 com os dados', async () => {
    const response = await request.get(`/categoria`).set('token', token);
    expect(response.status).toBe(200);
  });

  it('GET ALL - Deve retornar 400 com o token não informado', async () => {
    const response = await request.get('/categoria');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('DELETE - Deve retornar 200 com a confirmação', async () => {
    const response = await request.delete(`/categoria/${idCategoriaUpdate}`).set('token', token);
    expect(response.status).toBe(200);
  });

  it('DELETE - Deve retornar 400 com o token não informado', async () => {
    const response = await request.delete(`/categoria/${idCategoriaUpdate}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });
});
