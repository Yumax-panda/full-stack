/*
MIT License

Copyright (c) 2022 tandpfun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 
 */

type Skill = {
  name: string
  image: string
}

const url = (name: string) =>
  `https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/${name}.svg`

export const skills: Skill[] = [
  {
    name: 'AWS',
    image: url('AWS-Light'),
  },
  {
    name: 'Ableton',
    image: url('Ableton-Light'),
  },
  {
    name: 'ActivityPub',
    image: url('ActivityPub-Light'),
  },
  {
    name: 'Actix',
    image: url('Actix-Light'),
  },
  {
    name: 'Adonis',
    image: url('Adonis'),
  },
  {
    name: 'React',
    image: url('React-Light'),
  },
  {
    name: 'Next.js',
    image: url('NextJS-Light'),
  },
  {
    name: 'TypeScript',
    image: url('TypeScript'),
  },
  {
    name: 'JavaScript',
    image: url('JavaScript'),
  },
  {
    name: 'Python',
    image: url('Python-Light'),
  },
  {
    name: 'Firebase',
    image: url('Firebase-Light'),
  },
  {
    name: 'Node.js',
    image: url('NodeJS-Light'),
  },
  {
    name: 'Docker',
    image: url('Docker'),
  },
  {
    name: 'Git',
    image: url('Git'),
  },
  {
    name: 'Prisma',
    image: url('Prisma'),
  },
  {
    name: 'Discord Bot',
    image: url('DiscordBots'),
  },
  {
    name: 'HTML',
    image: url('HTML'),
  },
  {
    name: 'CSS',
    image: url('CSS'),
  },
  {
    name: 'Heroku',
    image: url('Heroku'),
  },
  {
    name: 'Vercel',
    image: url('Vercel-Light'),
  },
  {
    name: 'Material-UI',
    image: url('MaterialUI-Light'),
  },
  {
    name: 'FastAPI',
    image: url('FastAPI'),
  },
  {
    name: 'GitHub',
    image: url('Github-Light'),
  },
  {
    name: 'C',
    image: url('C'),
  },
  {
    name: 'C++',
    image: url('CPP'),
  },
  {
    name: 'Matlab',
    image: url('Matlab-Light'),
  },
  {
    name: 'Octave',
    image: url('Octave-Light'),
  },
  {
    name: 'PostgreSQL',
    image: url('PostgreSQL-Light'),
  },
  {
    name: 'Express',
    image: url('ExpressJS-Light'),
  },
  {
    name: 'Markdown',
    image: url('Markdown-Light'),
  },
  {
    name: 'Selenium',
    image: url('Selenium'),
  },
  {
    name: 'Tailwind CSS',
    image: url('TailwindCSS-Light'),
  },
  {
    name: 'VS Code',
    image: url('VSCode-Light'),
  },
  {
    name: 'Django',
    image: url('Django'),
  },
  {
    name: 'Flask',
    image: url('Flask-Light'),
  },
  {
    name: 'Supabase',
    image: url('Supabase-Light'),
  },
  {
    name: 'Go',
    image: url('GoLang'),
  },
  {
    name: 'Jest',
    image: url('Jest'),
  },
  {
    name: 'Postman',
    image: url('Postman'),
  },
]
