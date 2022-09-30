module.exports = {
    apps: [
      {
        name: 'ClasificadosAPI',
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: 'dist/main.js',
        args: 'start'
      }
    ]
  }