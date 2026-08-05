const { portfolioKnowledge, buildKnowledgePrompt } = require('../data/portfolioKnowledge');

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s+./@-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function hasWord(text, words) {
  return words.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(text));
}

/**
 * Keyword-grounded answers so the bot works without an LLM key.
 */
function localAnswer(message) {
  const q = normalize(message);

  if (!q) {
    return 'Ask me about Zohaib’s skills, experience, projects, education, or how to contact him.';
  }

  if (hasWord(q, ['hello', 'hi', 'hey', 'salam', 'assalam'])) {
    return `Hey — I’m Zohaib’s portfolio assistant. Ask about his work, stack, projects, or how to reach him.`;
  }

  if (includesAny(q, ['who are you', 'what are you', 'your name', 'bot'])) {
    return `I’m an AI assistant for Muhammad Zohaib’s portfolio. I answer from his real profile details only.`;
  }

  if (includesAny(q, ['email', 'mail', 'contact', 'phone', 'number', 'reach', 'hire', 'available', 'availability'])) {
    return [
      `You can reach Zohaib at ${portfolioKnowledge.email} or ${portfolioKnowledge.phone}.`,
      `He’s based in ${portfolioKnowledge.location}.`,
      portfolioKnowledge.availability,
      `LinkedIn: ${portfolioKnowledge.linkedin}`,
    ].join('\n');
  }

  if (includesAny(q, ['where', 'location', 'based', 'live', 'city', 'lahore', 'pakistan'])) {
    return `Zohaib is based in ${portfolioKnowledge.location}.`;
  }

  if (includesAny(q, ['experience', 'work', 'job', 'intern', 'company', 'hof', 'wpwizard', 'career'])) {
    return [
      'Recent experience:',
      ...portfolioKnowledge.experience.map(
        (item) =>
          `• ${item.role} at ${item.company} (${item.duration})${item.location ? ` — ${item.location}` : ''}`,
      ),
    ].join('\n');
  }

  if (includesAny(q, ['educat', 'degree', 'university', 'college', 'school', 'study', 'studied', 'bs'])) {
    return [
      'Education:',
      ...portfolioKnowledge.education.map(
        (item) => `• ${item.qualification} — ${item.institution} (${item.period})`,
      ),
    ].join('\n');
  }

  if (includesAny(q, ['project', 'portfolio', 'neurostar', 'wordpress', 'centerpeak', 'built', 'build'])) {
    return [
      'Selected projects:',
      ...portfolioKnowledge.projects.map((item) => {
        const live = item.liveUrl ? ` — ${item.liveUrl}` : '';
        return `• ${item.title}: ${item.description}${live}`;
      }),
    ].join('\n');
  }

  if (includesAny(q, ['skill', 'stack', 'tech', 'technolog', 'react', 'next', 'node', 'mongo', 'tool'])) {
    return [
      'Core stack:',
      `• Frontend: ${portfolioKnowledge.skills.frontend.join(', ')}`,
      `• Backend & CMS: ${portfolioKnowledge.skills.backend.join(', ')}`,
      `• Tools: ${portfolioKnowledge.skills.tools.join(', ')}`,
      `• Deploy: ${portfolioKnowledge.skills.deploy.join(', ')}`,
    ].join('\n');
  }

  if (includesAny(q, ['language', 'urdu', 'english', 'punjabi', 'speak'])) {
    return [
      'Spoken languages:',
      ...portfolioKnowledge.languages.map((item) => `• ${item.name} — ${item.level}`),
    ].join('\n');
  }

  if (includesAny(q, ['github', 'linkedin', 'social', 'resume', 'cv'])) {
    return [
      `GitHub: ${portfolioKnowledge.github}`,
      `LinkedIn: ${portfolioKnowledge.linkedin}`,
      `Resume: ${portfolioKnowledge.resumeUrl}`,
    ].join('\n');
  }

  if (includesAny(q, ['codivz', 'about', 'summary', 'intro', 'who is zohaib', 'tell me about'])) {
    return `${portfolioKnowledge.summary}\nCurrently: ${portfolioKnowledge.currentRole}.`;
  }

  return [
    'I can help with Zohaib’s experience, skills, projects, education, languages, or contact details.',
    'Try asking: “What is his stack?” or “How can I contact him?”',
  ].join('\n');
}

async function llmAnswer(message, history = []) {
  const groqKey = process.env.GROQ_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!groqKey && !openAiKey) return null;

  const system = buildKnowledgePrompt();
  const messages = [
    { role: 'system', content: system },
    ...history
      .slice(-8)
      .map((item) => ({
        role: item.role === 'assistant' ? 'assistant' : 'user',
        content: String(item.content || '').slice(0, 800),
      })),
    { role: 'user', content: String(message).slice(0, 800) },
  ];

  if (groqKey) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
        temperature: 0.3,
        max_tokens: 350,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq request failed: ${errText.slice(0, 180)}`);
    }

    const payload = await response.json();
    return payload.choices?.[0]?.message?.content?.trim() || null;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.3,
      max_tokens: 350,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI request failed: ${errText.slice(0, 180)}`);
  }

  const payload = await response.json();
  return payload.choices?.[0]?.message?.content?.trim() || null;
}

async function answerChat({ message, history }) {
  try {
    const llm = await llmAnswer(message, history);
    if (llm) {
      return { reply: llm, mode: 'llm' };
    }
  } catch (error) {
    console.error(`[chat] LLM fallback: ${error.message}`);
  }

  return { reply: localAnswer(message), mode: 'local' };
}

module.exports = {
  answerChat,
  localAnswer,
};
