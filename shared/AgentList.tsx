export const Agents = [
  {
    id: 1,
    name: 'Writing Assistant',
    desc: 'Write, rewrite, and fix texts quickly.',
    image: require('./../assets/images/agent_1.png'),
    initialText: 'Write an email requesting leave from my manager for two days.',
    prompt: 'You are a writing assistant. Help users write, rewrite, summarize, or improve any text.',
    type: 'chat',
    featured: true
  },
  {
    id: 2,
    name: 'Image Generator',
    desc: 'Create images from text prompts.',
    image: require('./../assets/images/agent_2.png'),
    initialText: 'A futuristic city skyline at sunset in cyberpunk style.',
    prompt: 'You are an AI image generator. Convert text into creative images.',
    type: 'image',
    featured: true
  },
  {
    id: 3,
    name: 'Translations',
    desc: 'Translate text accurately between languages.',
    image: require('./../assets/images/agent_3.png'),
    initialText: 'Translate "Good morning, how are you?" into French.',
    prompt: 'You are a translation expert. Translate text while keeping meaning intact.',
    type: 'translation',
    featured: true
  },
  {
    id: 4,
    name: 'Productivity Coach',
    desc: 'Plan tasks and improve focus.',
    image: require('./../assets/images/agent_4.png'),
    initialText: 'Create a daily to-do list for working on a project deadline.',
    prompt: 'You are a productivity assistant. Help users plan tasks and manage time efficiently.',
    type: 'chat',
    featured: true
  },
 
];
