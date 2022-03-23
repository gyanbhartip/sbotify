import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientID = process.env.REACT_APP_clientID;
const redirectUri = 'http://localhost:3000/';
const scopes = ['user-library-read', 'playlist-read-private', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'user-follow-read', 'streaming', 'app-remote-control', 'user-top-read', 'user-read-recently-played'];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

export const axiosCall = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
});

export const setClientToken = (token) => {
    axiosCall.interceptors.request.use(
        async (config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        }
    );
};