const axios = require('axios');
const router = require('express').Router();
const HOST = 'https://eartickling.auth0.com';
const env = process.env;
const CLIENT_ID = env.AUTH0_CLIENT_ID;
const CLIENT_SECRET = env.AUTH0_CLIENT_SECRET;
const REDIRECT_URI = env.AUTH0_REDIRECT_URI;

router.post('/start', (req, res) => {
    axios({
        baseURL: HOST,
        url: '/passwordless/start',
        method: 'POST',
        data: Object.assign({}, req.body, {
            client_id: CLIENT_ID,
            connection: 'sms',
            send: 'code'
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        validateStatus: status => status === 200
    })
    .then((response) => {
        // {
        //     "_id": "5a30943c7cd31262975d4e8f",
        //     "phone_number": "+13476019737",
        //     "request_language": "en-US,en;q=0.9",
        //     "phone_verified": false
        // }
        res.send(response.data);
    })
    .catch((error) => {
        console.log('error', error);
        res.send(error);
    });
});

router.post('/validate', (req, res) => {
    axios({
        baseURL: HOST,
        url: '/oauth/token',
        method: 'POST',
        data: Object.assign({}, req.body, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'password',
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        validateStatus: status => status === 200
    })
    .then((response) => {
        console.log(response);

        // {
        //     access_token: '-aj5cAFY1orQgqGqSZ9Q8PcqgwmrpO1h',
        //     id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qUXdNek5ETTBKRE56TkdOelkyTVVJME5UbENRMFl3TjBJd01rWTRSREkyTlRGRFJESXdOUSJ9.eyJuaWNrbmFtZSI6IisxMzQ3NjAxOTczNyIsIm5hbWUiOiIrMTM0NzYwMTk3MzciLCJwaWN0dXJlIjoiaHR0cHM6Ly9jZG4uYXV0aDAuY29tL2F2YXRhcnMvMS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxNy0xMi0zMVQyMDozMTozMC4zMDhaIiwicGhvbmVfbnVtYmVyIjoiKzEzNDc2MDE5NzM3IiwiaXNzIjoiaHR0cHM6Ly9lYXJ0aWNrbGluZy5hdXRoMC5jb20vIiwic3ViIjoic21zfDVhMzA5NDNjN2NkMzEyNjI5NzVkNGU4ZiIsImF1ZCI6InZNWHBpMmxEaTFWd09NWXVNOGRsQ0o0WDNrNGFvejllIiwiaWF0IjoxNTE0NzUyMjkwLCJleHAiOjE1MTQ3ODgyOTB9.SByE6lWYwqIqrmytbcOeYAsANgOky29D-tZtNoyLxdMiJuamIqcSnL_m4ikJU7xoFzYxiBvhIUeOTpm38NYmoLtWA2XWPM6Rvs5nZB_iTdwno6947vNz9rRzzfRSgR5rA5HEb93Um-1EAdaUNnHlsFEJJq-IHG_miLhc7byFHAZ99vs-AI_lZY9bUEOpF11BA2B-yjfkDJPWuNsQACsJA_y6Ox0lr7kq4YOatiBOpZbj1Ecq3cLK8FAahyBAZY4Od91ATfN-6SVR2-YKNAjuDOfFB4JJI7bzBSHqeBRGhdKzPO3c2_pEr5mAHVEUibt6sF4XRVzdqJayUqSxk-XvGA',
        //     scope: 'openid profile email address phone',
        //     expires_in: 86400,
        //     token_type: 'Bearer'
        // }

        res.send(response.data);
    })
    .catch((error) => {
        console.log('error', error);
        res.send(error);
    });

});

module.exports = router;
