import 'zx/globals'
import fs from 'fs-extra'

const path = './src/contributors.json'

const excludes = [
    // Bots
    'mt-gitlocalize',
    'gitlocalize-app[bot]',

    // Duplicates
    // - Ataberk
    'Chidori',
    'Umay',
    // - bpforest
    '한승준',
    // - Burrito
    'NonSpicyBurrito',
    // - ドマオー
    'Dosugamea',
    // - Nanashi.
    'sevenc-nanashi',
    'Nanashi',
    // - LittleYang0531
    '优秀的小杨同学',
]

const contributors = [
    ...new Set([...fs.readJsonSync(path), ...(await $`git log --pretty="%aN"`).stdout.split('\n')]),
]
    .filter((line) => !!line)
    .filter((line) => !excludes.includes(line))
    .sort()

fs.outputJsonSync(path, contributors, { spaces: 4 })
