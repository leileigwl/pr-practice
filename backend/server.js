// 后端：极简待办 API（无依赖，node server.js 即可）
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
let todos = [
  { id: 1, title: '读懂 Pull Request', done: false },
  { id: 2, title: '制造一次合并冲突', done: false },
];

function sendJSON(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  // API 路由
  if (req.url === '/api/todos' && req.method === 'GET') {
    return sendJSON(res, 200, todos);
  }
  if (req.url === '/api/todos' && req.method === 'POST') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const { title } = JSON.parse(body || '{}');
      const todo = { id: Date.now(), title, done: false };
      todos.push(todo);
      sendJSON(res, 201, todo);
    });
    return;
  }
  // 其余请求返回前端静态文件
  const file = req.url === '/' ? 'index.html' : req.url.slice(1);
  const full = path.join(__dirname, '..', 'frontend', file);
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
