const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

const { user } = require('./model');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    domain: 'localhost'
  })
);

app.use(async function (req, res, next) {
  const token = req.cookies.loginToken;

  if (!token) {
    res.json({
      status: 401
    });
  } else {
    const row = await user.findOne({
      where: {
        userId: token
      }
    });

    if (row) {
      req.user = row;
      next();
    } else {
      res.json({
        status: 401
      });
    }
  }
});

app.get('/api/userinfo', async function (req, res) {
  console.log(req.user);
  const row = await user.findOne({
    where: {
      userId: req.user.userId
    }
  });

  if (row) {
    res.json({
      status: 0,
      msg: 'ok',
      userId: req.cookies,
      data: row
    });
  } else {
    res.json({
      status: 1,
      msg: '查询用户资料错误'
    });
  }
});

app.post('/api/logout', async function (req, res) {});

app.post('/api/register', async function (req, res) {
  const { username, password } = req.body;
  const row = await user.findOne({
    where: {
      username
    }
  });

  if (row) {
    res.json({
      status: 1,
      msg: '用户名重复'
    });
  } else {
    await user.create({
      username,
      password
    });
  }
});

app.post('/api/login', async function (req, res) {
  const { username, password } = req.body;
  const row = await user.findOne({
    where: {
      username,
      password
    }
  });

  if (row) {
    res.cookie('loginToken', row.userId, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true
    });

    res.json({
      status: 0,
      msg: '登录成功',
      data: row.userId
    });
  } else {
    res.status(401).json({
      status: 401,
      msg: '登录'
    });
  }
});

app.listen(8080, () => {
  console.log('server running at: http://localhost:8080');
});
