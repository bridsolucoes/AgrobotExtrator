var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Extrator - Cotações',
  description: 'Aplicação Utilizando Poppeteer para extração de cotações.',
  script: 'index.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Para instalar, descomente o comando abaixo.
// svc.install();

// Para desinstalar, descomente o comando abaixo.
svc.uninstall();