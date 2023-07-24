import { resolve } from 'path'
import consola from 'consola'
import { existsSync, readFile } from 'fs-extra'
import { prompt } from 'enquirer'

async function getAllScripts() {
  try {
    const json = await readFile(resolve(process.cwd(), 'package.json'), { encoding: 'utf-8' })
    return Object.keys(JSON.parse(json).scripts)
  }
  catch (e) {
    consola.error('package.json 解析失败')
    process.exit(1)
  }
}

export async function enquirerConfig() {
  const choices = await getAllScripts()
  const { script } = await prompt<{ script: string }>({
    name: 'script',
    type: 'select',
    message: '请选择运行脚本',
    required: true,
    choices,
  })

  let devtoolPath: string
  while (true) {
    const { _path } = await prompt<{ _path: string }>({
      name: '_path',
      type: 'input',
      message: '请输入微信开发者工具的安装路径',
      required: true,
    })
    if (!existsSync(_path)) {
      consola.error('该路径不存在，请重新输入')
    }
    else {
      devtoolPath = _path
      break
    }
  }

  const { appid } = await prompt<{ appid: string }>({
    name: 'appid',
    type: 'input',
    required: true,
    message: '请输入 appid',
  })

  return { script, devtoolPath, appid }
}
