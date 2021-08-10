const { BrowserView, BrowserWindow, app } = require('electron')

function twoViews () {
  const win = new BrowserWindow({ width: 800, height: 600 })

  const view = new BrowserView({ useContentSize: true })
  win.addBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 800, height: 800 })
  view.setAutoResize({width:true , height:false});
  view.webContents.loadURL('https://google.com')

  app.on('window-all-closed', () => {
    win.removeBrowserView(view)
    app.quit()
  })
}

app.whenReady().then(twoViews)