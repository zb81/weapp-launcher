# Weapp Launcher

<img src="https://cdn.jsdelivr.net/gh/zb81/blog-assets/images/202307242341736.png"/>

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
> ```json
> {
>   "script": "dev",
>   "devtoolPath": "/Applications/wechatwebdevtools.app",
>   "appid": "xxx"
> }
> ```
>
> Wechat Devtool will be opened automatically when the build completed.
