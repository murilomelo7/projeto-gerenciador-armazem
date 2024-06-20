import supertest from 'supertest';
import Server from '../server';

const request = supertest(Server.fastify.server);

let token;
let idProdutoUpdate;
let idCategoria;

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
});

afterAll(async () => {
  await request.post(`/categoria/${idCategoria}`).set('token', token);

  await Server.close();
});

describe('Produto Routes ', () => {
  it('POST - Deve retornar 400 com o token não informado', async () => {
    const response = await request.post('/produto');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 400 com o corpo da requisição não informado', async () => {
    const response = await request.post('/produto').set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 400 com os dados inválidos', async () => {
    const response = await request.post('/produto').send({}).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('POST - Deve retornar 200 com o cadastro realizado com sucesso', async () => {
    const response = await request
      .post('/produto')
      .send({
        codigo: '100',
        nome: 'Teste produto',
        descricao: 'Teste descrição',
        categoria_id: idCategoria,
        quantidade_produto: 10,
      })
      .set('token', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
    idProdutoUpdate = response.body.data.id;
  });

  it('PUT - Deve retornar 400 com o token não informado', async () => {
    const response = await request.put(`/produto/${idProdutoUpdate}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 400 com o corpo da requisição ausente', async () => {
    const response = await request.put(`/produto/${idProdutoUpdate}`).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 400 com os dados inválidos', async () => {
    const response = await request.put(`/produto/${idProdutoUpdate}`).send({}).set('token', token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('PUT - Deve retornar 200 com dados atualizados com sucesso', async () => {
    const response = await request
      .put(`/produto/${idProdutoUpdate}`)
      .send({
        codigo: '123',
        nome: 'teste',
        categoria_id: idCategoria,
        quantidade_produto: 10,
      })
      .set('token', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
  });

  //   it('GET ONE - Deve retornar 200 com os dados', async () => {
  //     const response = await request.get('/produto').set('token', token);
  //     expect(response.status).toBe(200);
  //   });

  //   it('GET ONE - Deve retornar 400 com o token não informado', async () => {
  //     const response = await request.get(`/produto/${idProdutoUpdate}`);
  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty('error', 'Bad Request');
  //   });

  //   it('GET ALL - Deve retornar 200 com os dados', async () => {
  //     const response = await request.get(`/produto/${idProdutoUpdate}`).set('token', token);
  //     expect(response.status).toBe(200);
  //   });

  //   it('GET ALL - Deve retornar 400 com o token não informado', async () => {
  //     const response = await request.get('/produto');

  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty('error', 'Bad Request');
  //   });

  //   it('DELETE - Deve retornar 400 com o token não informado', async () => {
  //     const response = await request.delete(`/produto/${idProdutoUpdate}`);

  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty('error', 'Bad Request');
  //   });

  //   it('DELETE - Deve retornar 200 com a confirmação', async () => {
  //     const response = await request.delete(`/produto/${idProdutoUpdate}`).set('token', token);
  //     expect(response.status).toBe(200);
  //   });
});
