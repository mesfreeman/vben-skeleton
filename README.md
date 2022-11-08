# vben-skeleton

一个基于 [vben-admin 2.8](https://github.com/vbenjs/vben-admin-thin-next) 版本封装的 WEB 项目骨架，旨在快速开启 WEB 相关的项目开发。

> 该项目为管理后台前端，配合后端服务 [gin-skeleton](https://github.com/mesfreeman/gin-skeleton) 项目，直接拥有一个完整的管理后台。

## 基础功能

* 移除国际化支持，简介项目结构
* 完善的系统管理模块，包括：账号管理、菜单管理、角色管理、操作日志等

## 使用说明

### 技术栈

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

### 开发编译

```bash
# 软件依赖
brew install node
npm install -g pnpm

# 安装依赖包
cd vben-skeleton && pnpm install

# 运行
pnpm serve

# 打包
pnpm build
```
