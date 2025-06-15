import fs from 'fs-extra'

const response = await fetch(
    'https://api.github.com/repos/Sonolus/i18n/contributors?anon=true&per_page=100',
)

const contributors = (await response.json())
    .map((entry) =>
        entry.type === 'User' ? entry.login : entry.type === 'Anonymous' ? entry.name : undefined,
    )
    .filter((line) => line && line !== 'mt-gitlocalize')
    .sort()

fs.outputJsonSync('./src/contributors.json', contributors, { spaces: 4 })
