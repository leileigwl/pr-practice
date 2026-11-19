# pr-practice

练习 Fork → 分支 → Pull Request → 冲突 → 合并 的小项目。

```
frontend/   前端（HTML + JS，只调用 /api）
backend/    后端（Node 原生 http，无依赖）
```

运行：`cd backend && node server.js`，打开 http://localhost:3000

分支：
- `main`：稳定版，只通过 PR 合并
- `dev`：日常开发集成分支
- `feature-done-toggle`：仓库主人正在做的“勾选完成”功能（改了 frontend/app.js 的列表渲染那一行）
