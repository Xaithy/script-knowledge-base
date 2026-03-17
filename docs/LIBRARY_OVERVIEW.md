# Library Overview

## MainSettings Class

Main control panel for scenario creator convenience. Settings defined here override counterparts elsewhere.

### InnerSelf Configuration

```javascript
MainSettings.InnerSelf = {
  // List NPC names for brain simulation
  IMPORTANT_SCENARIO_CHARACTERS: "Leah, Lily, Lydia",
  
  // Enable/disable systems
  IS_INNER_SELF_ENABLED_BY_DEFAULT: true,
  IS_AC_ENABLED_BY_DEFAULT: false,
  
  // Player character settings
  PREDETERMINED_PLAYER_CHARACTER_NAME: "",
  
  // Story perspective (1=first, 2=second, 3=third)
  FIRST_SECOND_OR_THIRD_PERSON_POV: 2,
  
  // Context allocation
  PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 30,
  NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS: 5,
  
  // Visual indicators
  ACTIVE_CHARACTERS_VISUAL_INDICATOR_SYMBOL: "🎭",
  
  // Thought formation
  THOUGHT_FORMATION_CHANCE_PER_TURN: 60,
  
  // UI preferences
  IS_CONFIG_CARD_PINNED_BY_DEFAULT: false,
  IS_DEBUG_MODE_ENABLED_BY_DEFAULT: false
};
