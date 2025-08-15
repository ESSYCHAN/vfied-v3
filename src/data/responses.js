// VFIED Friend Responses - The voice of your food friend

export const FRIEND_RESPONSES = {
    // Mood-based responses
    TIRED: [
      "You look exhausted. Sometimes the best self-care is not thinking about food and just ordering something good.",
      "Tired vibes detected. Your energy matters more than cooking tonight. Let's get you fed with minimal effort.",
      "I see that tired energy. You've done enough today - let food come to you.",
      "Exhausted? Perfect. Time to use technology for what it's meant for: getting food without leaving your couch."
    ],
  
    STRESSED: [
      "Stress eating is real and it's human. Comfort food won't fix everything, but it'll help you get through today.",
      "Stressed? Food can be medicine. Let's find something that tastes good and doesn't add to your stress.",
      "I see that stress. Your body wants quick energy and comfort. Let's give it what it needs.",
      "Stress mode activated. Comfort food isn't weakness - it's survival. Here's what actually helps."
    ],
  
    LAZY: [
      "Lazy day vibes? Perfect. The goal is maximum satisfaction with absolute minimum effort.",
      "Lazy days are for easy food. No shame in the simple pleasure game.",
      "Zero effort food incoming. Sometimes the best meal requires opening exactly one package.",
      "Lazy day energy detected. Let's find food that matches your current commitment level."
    ],
  
    POST_WORKOUT: [
      "Nice workout! Your muscles are probably screaming for protein right now. Let's feed them something that doesn't suck.",
      "Post-workout fuel time. Your body earned some good food - let's give it what it actually needs.",
      "Workout complete! Now for the fun part - eating food that helps your muscles recover.",
      "You crushed that workout. Time to crush some protein that actually tastes good."
    ],
  
    CELEBRATING: [
      "You're celebrating! Fuck the rules, get the good stuff. Life's too short for sad celebration food.",
      "Celebration mode! This is not the time for restraint. Get whatever makes you happy.",
      "You're celebrating something good! Food is part of joy - lean into it completely.",
      "Party time! Celebration calories are imaginary calories. Science doesn't count them."
    ],
  
    HUNGOVER: [
      "Hungover? Been there. Your body needs grease, salt, and forgiveness. Here's what actually works.",
      "Hangover recovery mode. Your body is dehydrated and sad. Let's fix the sad part with food.",
      "The classic hangover situation. Grease + salt + carbs = science. Don't question it, just do it.",
      "Rough night? Your body is asking for specific things right now. Trust the grease."
    ],
  
    HEALTHY_STREAK: [
      "You've been crushing it! Let's keep this momentum going with food that doesn't feel like punishment.",
      "Healthy streak detected! Here's how to stay on track without hating your life.",
      "You're doing great with the healthy choices. Let's find something good that keeps the streak alive.",
      "Healthy mode engaged! Food that's good for you AND actually tastes good coming up."
    ],
  
    DEFAULT: [
      "Let's figure out what your body actually wants right now.",
      "Time to make a food decision that'll make you happy.",
      "What sounds good? Let's find something that hits the spot.",
      "Food time! Let's get you something satisfying."
    ]
  };
  
  // Context-aware responses based on time, weather, etc.
  export const CONTEXTUAL_RESPONSES = {
    FRIDAY_NIGHT: [
      "It's Friday night! Weekend rules are in effect. Get whatever makes you happy.",
      "Friday vibes call for Friday food. This is not a drill - treat yourself.",
      "End of the week energy. You've earned whatever you're craving right now."
    ],
  
    RAINY_DAY: [
      "Rainy day = comfort food weather. Your body knows what it wants.",
      "It's raining, which means the universe is telling you to get cozy food.",
      "Rainy weather activated comfort food protocols. Lean into it."
    ],
  
    LATE_NIGHT: [
      "Late night food hits different. No judgment, just satisfaction.",
      "It's late, normal rules don't apply. Get what sounds good.",
      "Late night energy. Sometimes weird food combinations are exactly right."
    ],
  
    MORNING: [
      "Morning food confusion is real. Breakfast? Lunch? Just eat what sounds good.",
      "Morning vibes. Your body's been fasting all night - feed it something good.",
      "Too early for decisions? Let me help you figure out morning food."
    ]
  };
  
  // Decision confirmation responses
  export const CONFIRMATION_RESPONSES = [
    "Perfect choice!",
    "Exactly what you need.",
    "Your body will thank you.",
    "Smart move.",
    "That's the one.",
    "Nailed it.",
    "Good call.",
    "Yes! That's what I'm talking about.",
    "Couldn't agree more.",
    "You know yourself well."
  ];
  
  // Encouragement responses after food selection
  export const POST_DECISION_RESPONSES = [
    "Decision made, overthinking stopped. Go enjoy your food!",
    "Perfect! Now stop second-guessing yourself and go eat.",
    "Great choice! Food anxiety officially canceled for today.",
    "You chose well. Trust your instincts and enjoy every bite.",
    "Boom! One less decision to stress about. Time to eat!",
    "Food decision: complete. Guilt level: zero. Satisfaction incoming.",
    "Smart choice! Your future self will thank you for not overthinking this."
  ];
  
  // Try again responses
  export const TRY_AGAIN_RESPONSES = [
    "No worries! Let's find something that hits different.",
    "Fair enough! How about we try a different vibe?",
    "Not feeling it? Let's explore other options.",
    "All good! Sometimes the first suggestion isn't the one.",
    "Different mood? Let's find something that matches your energy better."
  ];
  
  // Insight responses (when showing patterns)
  export const INSIGHT_RESPONSES = {
    PATTERN_RECOGNITION: [
      "I notice you always feel good after {food} when you're {mood}. Your body knows what it wants.",
      "Based on your history, {food} tends to hit the spot when you're feeling {mood}.",
      "Pattern alert: You've chosen {food} the last 3 times you felt {mood} - and loved it every time.",
      "Your past self recommends {food} for this exact situation. Trust the data."
    ],
  
    GUILT_BUSTING: [
      "You've felt guilty about {food} 5 times this month and felt fine afterward every single time.",
      "Reality check: Your 'bad' food choices don't actually make you feel bad. The guilt does.",
      "Your guilt accuracy rate about food: 12%. Your body's satisfaction rate: 94%. Trust your body.",
      "Fun fact: You've ordered {food} 8 times this year and felt great 7 of those times. The guilt is lying to you."
    ],
  
    ENCOURAGEMENT: [
      "You're doing better than you think. Food stress is fake stress.",
      "Your relationship with food is more balanced than your brain tells you.",
      "Quick reminder: You're human, humans eat food, this is normal.",
      "Plot twist: There are no food police, and you're not breaking any real rules."
    ]
  };
  
  // Special occasion responses
  export const SPECIAL_OCCASION_RESPONSES = {
    BIRTHDAY: [
      "It's your birthday! Calories don't count, rules don't apply. Get whatever makes you happiest.",
      "Birthday vibes! The universe owes you good food today.",
      "Birthday mode: activated. Treat yourself like the special human you are."
    ],
  
    MONDAY: [
      "Monday energy requires Monday food. Comfort is not negotiable.",
      "It's Monday. Your body needs extra care today. Food is care.",
      "Monday mood detected. Let's ease into the week with something good."
    ],
  
    PAYDAY: [
      "Payday energy! Time to upgrade your usual food game.",
      "Fresh money, fresh food possibilities. What sounds good?",
      "Payday vibes call for payday food. Treat yourself!"
    ]
  };
  
  // Helper functions
  export const getRandomResponse = (responseArray) => {
    if (!responseArray || responseArray.length === 0) return "Let's find you some good food!";
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };
  
  export const getMoodResponse = (mood) => {
    const moodResponses = FRIEND_RESPONSES[mood.toUpperCase()] || FRIEND_RESPONSES.DEFAULT;
    return getRandomResponse(moodResponses);
  };
  
  export const getContextualResponse = (context) => {
    const contextResponses = CONTEXTUAL_RESPONSES[context.toUpperCase()];
    return contextResponses ? getRandomResponse(contextResponses) : null;
  };
  
  export const getConfirmationResponse = () => {
    return getRandomResponse(CONFIRMATION_RESPONSES);
  };
  
  export const getPostDecisionResponse = () => {
    return getRandomResponse(POST_DECISION_RESPONSES);
  };
  
  export const getTryAgainResponse = () => {
    return getRandomResponse(TRY_AGAIN_RESPONSES);
  };
  
  // Context detection helpers
  export const detectContext = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const contexts = [];
  
    // Time-based contexts
    if (hour >= 22 || hour <= 6) contexts.push('LATE_NIGHT');
    if (hour >= 6 && hour <= 10) contexts.push('MORNING');
    if (day === 5 && hour >= 17) contexts.push('FRIDAY_NIGHT');
    if (day === 1) contexts.push('MONDAY');
  
    // Weather context (would integrate with weather API)
    // For now, random chance of rainy day
    if (Math.random() < 0.3) contexts.push('RAINY_DAY');
  
    return contexts;
  };
  
  export const getSmartResponse = (mood, userContext = {}) => {
    // Try to get a contextual response first
    const contexts = detectContext();
    for (const context of contexts) {
      const contextResponse = getContextualResponse(context);
      if (contextResponse) return contextResponse;
    }
  
    // Fall back to mood-based response
    return getMoodResponse(mood);
  };