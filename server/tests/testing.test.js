const request = require('supertest');
const app = require('../servers/express');
const Playlists = require('../db/dao/playlistDao');

jest.mock('../db/dao/playlistDao');

beforeAll(async () => {
  Playlists.findPlaylists.mockResolvedValue({ songs: [
    {songName: 'song1', songUrl: 'www.song1.com'}, 
    {songName: 'song2', songUrl: 'www.song2.com'}, 
    {songName: 'song3', songUrl: 'www.song3.com'}, 
  ]})
})

describe('Testing it works', () => {
  test('Should return true', async () => {
    const response = await request(app)
      .get("/api/playlists/");
    expect(response.statusCode).toBe(200);
    expect(response.body.songs.length).toBe(3);
  })
})