import { HabitCategory, HabitImpact, FeedbackMessage, HabitLoop } from '../types/habit';

interface HabitProfile {
  titlePattern: string[];
  category: HabitCategory;
  defaultImpact: HabitImpact;
  underlyingWhy: string;
  habitLoop: HabitLoop;
  frictionTactic: string;
  replacementAction: string;
  constructiveGuidance: {
    headline: string;
    quote: string;
    affirmation: string;
    tips: string[];
  };
}

export const KNOWN_HABIT_PROFILES: HabitProfile[] = [
  {
    titlePattern: ['doomscroll', 'social media', 'tiktok', 'instagram', 'reels', 'shorts', 'scrolling'],
    category: 'digital_distraction',
    defaultImpact: 'counterproductive',
    underlyingWhy: 'Variable reward schedules trigger intermittent dopamine spikes. The brain seeks instant novelty as an escape from fatigue, cognitive friction, or low stimulation.',
    habitLoop: {
      cue: 'Mental fatigue, task transition, or momentary boredom',
      craving: 'Instant novelty, sensory stimulation, passive entertainment',
      routine: 'Mindless infinite scrolling across feeds or short video loops',
      reward: 'Brief dopamine release accompanied by delayed guilt and brain fog',
    },
    frictionTactic: 'Turn phone display to grayscale, set app timers, or charge your device across the room.',
    replacementAction: 'Practice the "5-Breath Pause" and read 2 pages of a physical book or stretch for 90 seconds.',
    constructiveGuidance: {
      headline: 'Acknowledge the urge without self-blame',
      quote: '“Distraction is not a lack of willpower; it is an instinctual quest for dopamine when your brain feels drained.”',
      affirmation: 'I am in command of my attention. My peace of mind is worth more than algorithms.',
      tips: [
        'Close all social tabs and take 3 deep belly breaths to reset your prefrontal cortex.',
        'Drink a glass of cold water to physically break the hypnotic screen loop.',
        'Set a 15-minute physical timer if you truly wish to check updates later intentionally.',
      ],
    },
  },
  {
    titlePattern: ['procrastinat', 'delaying', 'putting off', 'avoiding task'],
    category: 'emotional_avoidance',
    defaultImpact: 'counterproductive',
    underlyingWhy: 'Procrastination is an emotional regulation problem, not poor time management. The amygdala perceives the task as daunting or risky, triggering an avoidance mechanism.',
    habitLoop: {
      cue: 'High-friction task, fear of imperfection, or ambiguous instructions',
      craving: 'Immediate relief from uncomfortable performance anxiety',
      routine: 'Organizing irrelevant items, checking email, or browsing random articles',
      reward: 'Temporary soothing of anxiety followed by mounting deadlines',
    },
    frictionTactic: 'Apply the 2-Minute Rule: Shrink the first step down until failure is impossible.',
    replacementAction: 'Commit to working for just 5 minutes with a Pomodoro timer, giving yourself permission to stop afterward.',
    constructiveGuidance: {
      headline: 'Progress over perfection',
      quote: '“You don’t have to feel like doing something in order to start doing it. Action creates motivation.”',
      affirmation: 'I do not fear imperfect beginnings. Small, steady efforts yield extraordinary results.',
      tips: [
        'Break your task into a micro-step: write just one sentence or open just one document.',
        'Forgive yourself for the delay—self-compassion reduces future procrastination.',
        'Set a 5-minute countdown and start immediately without waiting for mood alignment.',
      ],
    },
  },
  {
    titlePattern: ['late night', 'staying up', 'sleep late', 'bedtime procrastinat'],
    category: 'physical_vitality',
    defaultImpact: 'counterproductive',
    underlyingWhy: 'Revenge bedtime procrastination occurs when daily obligations leave you feeling lacking personal freedom, prompting you to reclaim leisure hours at night at the expense of sleep.',
    habitLoop: {
      cue: 'Exhaustion at night coupled with dissatisfaction about daytime leisure',
      craving: 'Autonomous personal time and uninterrupted entertainment',
      routine: 'Binge-watching videos or browsing in bed past midnight',
      reward: 'Illusion of regaining personal control followed by morning lethargy',
    },
    frictionTactic: 'Implement an automatic "Digital Sunset" alarm at 10:00 PM; leave screens outside the bedroom.',
    replacementAction: 'Schedule a 20-minute guilt-free guiltless joy window during the afternoon or early evening.',
    constructiveGuidance: {
      headline: 'Honor your need for restorative rest',
      quote: '“Sleep is the highest-leverage performance enhancer known to science.”',
      affirmation: 'Rest is not a reward I must earn; it is the vital foundation of my energy and clarity.',
      tips: [
        'Lower ambient room lighting and transition to warm amber light.',
        'Brew chamomile or peppermint tea as a tactile wind-down ritual.',
        'Keep a notebook by your bed to jot down lingering thoughts and park them until morning.',
      ],
    },
  },
  {
    titlePattern: ['stress eat', 'junk food', 'binge eat', 'sugar', 'snacking'],
    category: 'physical_vitality',
    defaultImpact: 'counterproductive',
    underlyingWhy: 'High stress releases cortisol, triggering biological cravings for calorie-dense, quick-digesting sugars to rapidly elevate serotonin and calm the nervous system.',
    habitLoop: {
      cue: 'Sudden surge of stress, work frustration, or boredom',
      craving: 'Rapid emotional soothing and oral comfort sensation',
      routine: 'Mindlessly grabbing processed snacks or sugary treats',
      reward: 'Quick serotonin spike followed by an energy crash and sluggishness',
    },
    frictionTactic: 'Keep high-sugar treats out of direct sight; keep washed fruits, nuts, and herbal infusions accessible.',
    replacementAction: 'Wait 10 minutes with a glass of water, or step outside for a brisk 3-minute walking reset.',
    constructiveGuidance: {
      headline: 'Nourish your nervous system gently',
      quote: '“Listen to the hunger of your soul versus the hunger of your body.”',
      affirmation: 'I listen to my body with loving awareness. I choose fuel that empowers my vitality.',
      tips: [
        'Ask yourself: “Am I physically hungry, or am I tired, lonely, or overwhelmed?”',
        'If overwhelmed, do 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s) to drop cortisol.',
        'Sip hot herbal tea to satisfy the oral comfort loop without metabolic turbulence.',
      ],
    },
  },
  {
    titlePattern: ['negative thought', 'self-critic', 'overthink', 'ruminat', 'imposter'],
    category: 'mindset_loop',
    defaultImpact: 'counterproductive',
    underlyingWhy: 'The negativity bias is an evolutionary survival mechanism that over-indexes on perceived threats, social judgment, and flaws to protect you from vulnerability.',
    habitLoop: {
      cue: 'Setback, critique, social comparison, or fatigue',
      craving: 'Certainty, emotional armor, and prevention of future errors',
      routine: 'Replaying past mistakes or anticipating worst-case scenarios',
      reward: 'Illusion of vigilance, which ironically paralyzes constructive action',
    },
    frictionTactic: 'Name your inner critic (e.g., “The Worrier”) to detach your true identity from the thoughts.',
    replacementAction: 'Write down the worry, ask “Is this 100% true right now?”, and list 3 things going well.',
    constructiveGuidance: {
      headline: 'Cognitive reframing in action',
      quote: '“You are the observer of your thoughts, not the prisoner of them.”',
      affirmation: 'I treat myself with the same kindness and grace I would offer to a cherished friend.',
      tips: [
        'Notice the inner voice and label it: “I notice I am experiencing self-judgment right now.”',
        'Counter each self-critical thought with one piece of concrete evidence of your competence.',
        'Physically shake out your shoulders and arms to release stored tension.',
      ],
    },
  },
];

export const PRODUCTIVE_AFFIRMATIONS = [
  {
    headline: 'Magnificent Momentum!',
    quote: '“Success is the product of daily habits—not once-in-a-lifetime transformations.” — James Clear',
    affirmation: 'Every intentional act strengthens my character and propels my future self forward.',
    tips: [
      'Take 5 seconds to genuinely celebrate this win—internal pride reinforces positive neuro-pathways.',
      'Notice how clear and energized your mind feels right now.',
      'Ride this wave into your next scheduled commitment with quiet confidence.',
    ],
  },
  {
    headline: 'You Cast a Vote for Excellence!',
    quote: '“We are what we repeatedly do. Excellence, then, is not an act, but a habit.” — Will Durant',
    affirmation: 'I am deliberate with my time and disciplined in my focus. My compound growth is unstoppable.',
    tips: [
      'Log this streak and honor the discipline it took to show up today.',
      'Stay humble and consistent: small continuous drops fill the entire ocean.',
      'Hydrate and stretch before transitioning to your next focus block.',
    ],
  },
  {
    headline: 'Pure Mastery & Focus!',
    quote: '“Your life does not get better by chance; it gets better by change.” — Jim Rohn',
    affirmation: 'I thrive in deep presence. I transform potential into impactful reality.',
    tips: [
      'You just proved to yourself that you possess the willpower to act purposefully.',
      'Anchor this positive emotion into your mental memory bank.',
      'Keep your workspace clean and prepared for your next productive session.',
    ],
  },
];

export function diagnoseActivity(
  title: string,
  explicitImpact?: HabitImpact,
  categoryInput?: HabitCategory
): {
  impact: HabitImpact;
  category: HabitCategory;
  underlyingWhy?: string;
  replacementStrategy?: string;
  feedback: FeedbackMessage;
} {
  const lowerTitle = title.toLowerCase();

  // Find matching profile from behavioral dictionary
  const match = KNOWN_HABIT_PROFILES.find((p) =>
    p.titlePattern.some((term) => lowerTitle.includes(term))
  );

  let impact: HabitImpact = explicitImpact || (match ? match.defaultImpact : 'productive');
  let category: HabitCategory = categoryInput || (match ? match.category : 'focus_deep_work');

  // If counter-productive / bad habit
  if (impact === 'counterproductive') {
    if (match) {
      return {
        impact: 'counterproductive',
        category,
        underlyingWhy: match.underlyingWhy,
        replacementStrategy: `Friction: ${match.frictionTactic} | Replacement: ${match.replacementAction}`,
        feedback: {
          type: 'compassionate_guidance',
          headline: match.constructiveGuidance.headline,
          quote: match.constructiveGuidance.quote,
          affirmation: match.constructiveGuidance.affirmation,
          actionableTips: match.constructiveGuidance.tips,
        },
      };
    } else {
      return {
        impact: 'counterproductive',
        category,
        underlyingWhy:
          'This habit likely serves as a coping mechanism for underlying fatigue, cognitive friction, or emotional discomfort.',
        replacementStrategy:
          'Apply the 2-minute pause: observe the physical sensation of the craving, drink a glass of water, and switch to a low-friction productive micro-step.',
        feedback: {
          type: 'compassionate_guidance',
          headline: 'Compassionate Realignment',
          quote: '“A slip is not a fall; it is simply an invitation to understand yourself better.”',
          affirmation: 'I am learning and evolving. Every moment is a clean slate to begin anew.',
          actionableTips: [
            'Avoid harsh self-criticism—it actually drains dopamine and triggers more avoidance.',
            'Identify the environmental cue: what sparked this activity just now?',
            'Take 3 slow grounding breaths and choose one tiny positive action right now.',
          ],
        },
      };
    }
  }

  // If neutral
  if (impact === 'neutral') {
    return {
      impact: 'neutral',
      category: categoryInput || 'wellness_rest',
      underlyingWhy: 'A balanced daily routine includes non-demanding maintenance and restful pauses.',
      replacementStrategy: 'Keep this activity within an intentional time boundary to avoid drift.',
      feedback: {
        type: 'celebration',
        headline: 'Mindful Daily Balance',
        quote: '“Life is a balance of holding on and letting go.” — Rumi',
        affirmation: 'I move through my day with clarity, allowing healthy space for rest and recovery.',
        actionableTips: [
          'Ensure this activity refreshed your reserves rather than draining your mental bandwidth.',
          'Check your upcoming priorities to align with your top goals for today.',
        ],
      },
    };
  }

  // Otherwise Productive
  const randomPositive =
    PRODUCTIVE_AFFIRMATIONS[Math.floor(Math.random() * PRODUCTIVE_AFFIRMATIONS.length)];

  return {
    impact: 'productive',
    category,
    feedback: {
      type: 'celebration',
      headline: randomPositive.headline,
      quote: randomPositive.quote,
      affirmation: randomPositive.affirmation,
      actionableTips: randomPositive.tips,
    },
  };
}
