# Weapp Launcher

![Kapture 2023-07-24 at 23.53.50](https://cdn.jsdelivr.net/gh/zb81/blog-assets/images/Kapture%202023-07-24%20at%2023.53.50.gif)

1. install

```bash
# pnpm
pnpm add weapp-launcher -D

# npm
npm install weapp-launcher -D

# yarn
yarn add weapp-launcher -D
```

2. set `scripts`

```
{
  "scripts": {
    // ...
    "dev": "weapp-launcher"
    // ...
  }
}
```

3. run

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
```

> `weapp-launcher.config.json` will be generated and saved in `cwd` on the first run.
>
>
> ```json
> {
>   "script": "dev",
>   "devtoolPath": "/Applications/wechatwebdevtools.app"
> }
> ```
>
> Wechat Devtool will launch automatically when the build completed.

> 📢 The developer tools' path **CANNOT** contain spaces!!!
