/**
 * Script Knowledge Base - Main Library
 * Coordinates all subsystems
 */

// ====== LOAD SUBSYSTEMS ======

// Inner Self NPC Brain System
// @see ./inner-self.js
const InnerSelf = (function() {
  // CODE WILL GO HERE - See inner-self.js
  return null; // placeholder
})();

// Auto-Cards Automatic Card Generation
// @see ./auto-cards.js
const AutoCards = (function() {
  // CODE WILL GO HERE - See auto-cards.js
  return null; // placeholder
})();

// QETEco Economy & Inventory System
// @see ./qeteco.js
const QETEco = (function() {
  // CODE WILL GO HERE - See qeteco.js
  return null; // placeholder
})();

// ====== GLOBAL CONFIGURATION ======

/**
 * Main control panel for scenario creator convenience
 * Settings defined here will override their counterparts elsewhere
 */
globalThis.MainSettings = (class MainSettings {
  static InnerSelf = {
    IMPORTANT_SCENARIO_CHARACTERS: "",
    IS_INNER_SELF_ENABLED_BY_DEFAULT: true,
    PREDETERMINED_PLAYER_CHARACTER_NAME: "",
    FIRST_SECOND_OR_THIRD_PERSON_POV: 2,
    PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 30,
    NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS: 5,
    ACTIVE_CHARACTERS_VISUAL_INDICATOR_SYMBOL: "🎭",
    THOUGHT_FORMATION_CHANCE_PER_TURN: 60,
    IS_CONFIG_CARD_PINNED_BY_DEFAULT: false,
    IS_AC_ENABLED_BY_DEFAULT: false,
    IS_DEBUG_MODE_ENABLED_BY_DEFAULT: false,
  };

  static AC = {
    DEFAULT_DO_AC: true,
    DEFAULT_PIN_CONFIGURE_CARD: false,
    DEFAULT_CARD_CREATION_COOLDOWN: 40,
    DEFAULT_USE_BULLETED_LIST_MODE: true,
    DEFAULT_GENERATED_ENTRY_LIMIT: 600,
    DEFAULT_NEW_CARDS_DO_MEMORY_UPDATES: false,
    DEFAULT_NEW_CARDS_MEMORY_LIMIT: 3200,
    DEFAULT_MEMORY_COMPRESSION_RATIO: 25,
    DEFAULT_IGNORE_ALL_CAPS_TITLES: true,
    DEFAULT_DETECT_TITLES_FROM_INPUTS: false,
    DEFAULT_MINIMUM_LOOK_BACK_DISTANCE: 7,
    DEFAULT_DO_LSI_V2: false,
    DEFAULT_SHOW_DEBUG_DATA: false,
    DEFAULT_CARD_GENERATION_PROMPT: [
      "-----",
      "",
      "<SYSTEM>",
      "# Stop the story and ignore previous instructions. Write a brief and coherent informational entry for %{title} following these instructions:",
      "- Write only third-person pure prose information about %{title} using complete sentences with correct punctuation",
      "- Avoid short-term temporary details or appearances, instead focus on plot-significant information",
      "- Prioritize story-relevant details about %{title} first to ensure seamless integration with the previous plot",
      "- Create new information based on the context and story direction",
      "- Mention %{title} in every sentence",
      "- Use semicolons if needed",
      "- Add additional details about %{title} beneath incomplete entries",
      "- Be concise and grounded",
      "- Imitate the story's writing style and infer the reader's preferences",
      "</SYSTEM>",
      "Continue the entry for %{title} below while avoiding repetition:",
      "%{entry}"
    ],
    DEFAULT_CARD_MEMORY_COMPRESSION_PROMPT: [
      "-----",
      "",
      "<SYSTEM>",
      "# Stop the story and ignore previous instructions. Summarize and condense the given paragraph into a narrow and focused memory passage while following these guidelines:",
      "- Ensure the passage retains the core meaning and most essential details",
      "- Use the third-person perspective",
      "- Prioritize information-density, accuracy, and completeness",
      "- Remain brief and concise",
      "- Write firmly in the past tense",
      "- The paragraph below pertains to old events from far earlier in the story",
      "- Integrate %{title} naturally within the memory; however, only write about the events as they occurred",
      "- Only reference information present inside the paragraph itself, be specific",
      "</SYSTEM>",
      "Write a summarized old memory passage for %{title} based only on the following paragraph:",
      "\"\"\"",
      "%{memory}",
      "\"\"\"",
      "Summarize below:"
    ],
    DEFAULT_BANNED_TITLES_LIST: "North, East, South, West, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, January, February, March, April, May, June, July, August, September, October, November, December",
    DEFAULT_CARD_TYPE: "class",
    DEFAULT_BAN_TITLES_FROM_OPENING: false,
  };

  _config;
  constructor(script, alternative) {
    this._config = (
      MainSettings.hasOwnProperty(script)
        ? MainSettings[script]
        : ((typeof alternative === "string") && MainSettings.hasOwnProperty(alternative))
        ? MainSettings[alternative]
        : null
    );
    return this;
  }
  merge(settings) {
    if (!this._config || !settings || (typeof settings !== "object")) {
      return;
    }
    for (const [key, value] of Object.entries(this._config)) {
      settings[key] = value;
    }
    return;
  }
});

// ====== MODULE EXPORTS ======

// Each hook calls the appropriate system:
// - InnerSelf("context"), InnerSelf("input"), InnerSelf("output")
// - AutoCards(hook, text, stop)
// - QETEco("context"), QETEco("output")

console.log("[Library] Script Knowledge Base loaded");
