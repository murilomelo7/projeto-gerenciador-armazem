import tap from 'tap';
import supertest from 'supertest'
import buildFastify from 'fastify'

tap.test('GET `/` usuario', async (t) => {
  const fastify = buildFastify()

  t.teardown(() => fastify.close())
  
  await fastify.ready()
  
  const response = await supertest(fastify.server)
    .get('/usuario')
    .expect(200)
  t.deepEqual(response.body, { hello: 'world' })
})
