// 后端测试：node --test 自动运行。改出 bug 时这里会变红。
const test = require('node:test');
const assert = require('node:assert');
const server = require('./server');

let base;
test.before(() => new Promise((r) => server.listen(0, () => {
  base = `http://localhost:${server.address().port}`;
  r();
})));
test.after(() => server.close());

test('GET /api/todos 返回数组，且每项有 id/title/done', async () => {
  const res = await fetch(`${base}/api/todos`);
  assert.strictEqual(res.status, 200);
  const todos = await res.json();
  assert.ok(Array.isArray(todos));
  for (const t of todos) {
    assert.ok('id' in t && 'title' in t && 'done' in t);
  }
});

test('POST /api/todos 能新增一条', async () => {
  const res = await fetch(`${base}/api/todos`, {
    method: 'POST',
    body: JSON.stringify({ title: '测试任务' }),
  });
  assert.strictEqual(res.status, 201);
  const todo = await res.json();
  assert.strictEqual(todo.title, '测试任务');
  assert.strictEqual(todo.done, false);
});

test('首页能打开', async () => {
  const res = await fetch(`${base}/`);
  assert.strictEqual(res.status, 200);
});
