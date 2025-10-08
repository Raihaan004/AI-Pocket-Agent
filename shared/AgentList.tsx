
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
  {
    id: 5,
    name: 'Math Solver',
    desc: 'Solve and explain math problems.',
    image: require('./../assets/images/mathsolver.png'),
    initialText: 'Solve: 2x + 5 = 15.',
    prompt: 'You are a math assistant. Solve problems and explain step by step.',
    type: 'image+text',
    featured: false
  },
  {
    id: 6,
    name: 'Caption Generator',
    desc: 'Create captions for social media.',
    image: require('./../assets/images/caption.png'),
    initialText: 'A picture of a puppy playing in the park.',
    prompt: 'You are a caption generator. Create short, catchy captions with hashtags.',
    type: 'image+text',
    featured: false
  },
  {
    id: 7,
    name: 'Grammar Fixer',
    desc: 'Fix grammar and spelling errors.',
    image: require('./../assets/images/grammar.png'),
    initialText: 'I going to office yesterday.',
    prompt: 'You are a grammar assistant. Correct grammar and spelling without changing meaning.',
    type: 'chat',
    featured: false
  },
  {
    id: 8,
    name: 'Fitness Coach',
    desc: 'Get workouts and diet tips.',
    image: require('./../assets/images/fitness.png'),
    initialText: 'Create a 4-day workout plan for weight loss.',
    prompt: 'You are a fitness assistant. Suggest workouts and meal plans.',
    type: 'chat',
    featured: false
  },
  {
    id: 9,
    name: 'Code Assistant',
    desc: 'Write and debug code.',
    image: require('./../assets/images/code.png'),
    initialText: 'Write a Python function to check if a number is prime.',
    prompt: 'You are a coding assistant. Generate and explain code.',
    type: 'chat',
    featured: false
  },
  {
    id: 10,
    name: 'Research Assistant',
    desc: 'Summarize and organize information.',
    image: require('./../assets/images/research.png'),
    initialText: 'Summarize key points from an article about climate change.',
    prompt: 'You are a research assistant. Summarize and simplify information.',
    type: 'chat',
    featured: false
  },
  {
    id: 11,
    name: 'Storyteller',
    desc: 'Create stories or poems.',
    image: require('./../assets/images/story.png'),
    initialText: 'Tell a short bedtime story about a dragon and a princess.',
    prompt: 'You are a storyteller. Write imaginative stories for kids and adults.',
    type: 'chat',
    featured: false
  },
  {
    id: 12,
    name: 'Email Generator',
    desc: 'Draft professional emails.',
    image: require('./../assets/images/email.png'),
    initialText: 'Write a professional email to a client about project updates.',
    prompt: 'You are an email assistant. Write clear, concise emails.',
    type: 'chat',
    featured: false
  }
];
