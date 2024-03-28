import supertest from 'supertest';
import fastify from '../server'; // Substitua pelo caminho do arquivo que exporta a função buildFastify


describe('Teste da rota GET `/usuario`', () => {

  beforeAll(async () => {
    await fastify.start();
  });

  afterAll(async () => {
    await fastify.close();
  });

  test('Deve retornar status 200 ao acessar a rota', async () => {
    const response = await supertest('http://localhost:3000').get('/usuario').expect(200);
    expect(response.status).toBe(200);
  });
});
