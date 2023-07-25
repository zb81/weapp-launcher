#!/usr/bin/env node
import { resolve } from 'path'
import { exec } from 'child_process'
import { platform } from 'os'
import { exists, readFile, writeFile } from 'fs-extra'
import consola from 'consola'
import { enquirerConfig } from './config'

const configPath = resolve(process.cwd(), 'weapp-launcher.config.json')

interface LauncherConfig {
  script: string
  devtoolPath: string
}

let openDevtool = true

async function cli() {
  let config: LauncherConfig
  let devCliPath: string

  try {
    // get existed config in cwd
    if (await exists(configPath)) {
      config = JSON.parse(await readFile(configPath, { encoding: 'utf-8' }))
    }
    else {
      // enquirer and save
      config = await enquirerConfig()
      writeFile(configPath, JSON.stringify(config, null, 2))
    }

    // exec script

    // open devtool
    if (platform() === 'win32') {
      // windows
      devCliPath = resolve(config.devtoolPath, 'cli.bat')
    }
    else if (platform() === 'darwin') {
      // MacOS
      devCliPath = resolve(config.devtoolPath, 'Contents/MacOS/cli')
    }
    else {
      consola.error('只支持 Windows 或 MacOS')
      throw new Error('Unknown os')
    }

    const buildSp = exec(`npm run ${config.script}`)
    buildSp.stdout.on('data', (data) => {
      const info = data.toString()
      consola.log(info)
      if (info.includes('Compiled successfully') && openDevtool) {
        exec(`${devCliPath} open --project ${resolve(process.cwd(), 'dist', 'dev', 'mp-weixin')}`)
        openDevtool = false
      }
    })
  }
  catch (e) {
    consola.error('Error')
    process.exit(1)
  }
}

cli()
