const request = require('supertest');
const app = require('../../servers/express');
const Playlists = require('../../db/dao/playlistDao');

jest.mock('../../db/dao/playlistDao');

beforeAll(async () => {
  Playlists.findPlaylists.mockResolvedValue(
    {
      playlists: [
        { 
          playListName: "playlist1",
          songs: [
            {songName: 'song1', songUrl: 'www.song1.com'}, 
            {songName: 'song2', songUrl: 'www.song2.com'}, 
            {songName: 'song3', songUrl: 'www.song3.com'}, 
          ]
        },
        { 
          playListName: "playlist2",
          songs: [
            {songName: 'song1', songUrl: 'www.song1.com'}, 
            {songName: 'song2', songUrl: 'www.song2.com'}, 
            {songName: 'song3', songUrl: 'www.song3.com'}, 
          ]
        }
      ]
    }
  )
  Playlists.findPlaylistById.mockResolvedValue(
    { 
      playListName: "playlist1",
      songs: [
        {songName: 'song1', songUrl: 'www.song1.com'}, 
        {songName: 'song2', songUrl: 'www.song2.com'}, 
        {songName: 'song3', songUrl: 'www.song3.com'}, 
      ]
    }
  )
  Playlists.createPlaylist.mockResolvedValue({ _id: "newPlaylistId"});
})

describe('Testing Playlists API Routes', () => {
  test('Get All Playlists', async () => {
    const response = await request(app)
      .get("/api/playlists/");
    expect(response.statusCode).toBe(200);
    expect(response.body.playlists.length).toBe(2);
    expect(Playlists.findPlaylists.mock.calls.length).toBe(1);
  });
  test('Get Playlist by id', async () => {
    const response = await request(app)
      .get("/api/playlists/123");
    expect(response.statusCode).toBe(200);
    expect(response.body.songs.length).toBe(3);
    expect(Playlists.findPlaylistById.mock.calls.length).toBe(1);  
  });
  test('Create a playlist', async () => {
    const response = await request(app)
      .post("/api/playlists/")
      .send({ 
        playlistName: "playlist1",
        songs: [
          {songName: 'song1', songUrl: 'www.song1.com'}, 
          {songName: 'song2', songUrl: 'www.song2.com'}, 
          {songName: 'song3', songUrl: 'www.song3.com'}, 
        ]
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBe("newPlaylistId");
    expect(Playlists.createPlaylist.mock.calls.length).toBe(1);  
  });
})