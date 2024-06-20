import supertest from 'supertest';
import Server from '../server';

const request = supertest(Server.fastify.server);

beforeAll(async () => {
  await Server.start();
});

afterAll(async () => {
  await Server.close();
});

describe('Login Routes', () => {
  it('Retorna 200 para um login válido de admin com o token', async () => {
    const response = await request.post('/login').send({ usuario: 'admin', senha: 'admin' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Retorna 200 para um login válido de cliente com o token', async () => {
    const response = await request.post('/login').send({ usuario: 'teste', senha: 'admin' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Retorna 400 por falta do campo usuário', async () => {
    const response = await request.post('/login').send({ senha: 'admin' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('Retorna 400 por falta do campo senha', async () => {
    const response = await request.post('/login').send({ usuario: 'admin' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('Retorna 400 por falta do campo senha', async () => {
    const response = await request.post('/login').send({ usuario: 'admin' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('Retorna 400 por enviar o usuário com string vazia', async () => {
    const response = await request.post('/login').send({ usuario: '', senha: 'admin' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('Retorna 400 por enviar a senha com string vazia', async () => {
    const response = await request.post('/login').send({ usuario: 'teste', senha: '' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });

  it('Retorna 404 por não encontrar o usuário', async () => {
    const response = await request.post('/login').send({ usuario: 'teste123456', senha: 'admin' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Not Found');
  });

  it('Retorna 400 pela senha incorreta', async () => {
    const response = await request.post('/login').send({ usuario: 'teste', senha: 'admin123456' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Bad Request');
  });
});
