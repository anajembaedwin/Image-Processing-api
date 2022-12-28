import request from 'supertest';
import app from '../index';



describe('Test the /api endpoint', () => {
    it('should return "server working"', async () => {
      const response = await request(app).get('/api');
      expect(response.status).toEqual(200);
      expect(response.text).toEqual('server working');
    });
});
  