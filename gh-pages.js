var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'main',
        repo: 'https://github.com:Tanukitown/DSR-sim.git',
        user: {
            name: 'Tanukitown',
            email: 'kevin.mcguffin@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)