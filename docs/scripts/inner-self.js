/**
     * Inner Self v1.0.0
     * Made by LewdLeah on January 3, 2026
     * Gives story characters the ability to learn, plan, and adapt over time
     * Inner Self is free and open-source for anyone! ❤️
     */
    static InnerSelf = {
    // Default settings for scenario creators to modify:

    // List the first name of every scenario NPC whose brain should be simulated by Inner Self:
    IMPORTANT_SCENARIO_CHARACTERS: ""
    // (write a comma separated list of names inside the "" like so: "Leah, Lily, Lydia")
    ,
    // Is Inner Self already enabled when the adventure begins?
    IS_INNER_SELF_ENABLED_BY_DEFAULT: true
    // (true or false)
    ,
    // Is the player character's first name known in advance? Ignore this setting if unsure
    PREDETERMINED_PLAYER_CHARACTER_NAME: ""
    // (any name inside the "" or leave empty)
    ,
    // Is the adventure intended for 1st, 2nd, or 3rd person gameplay?
    FIRST_SECOND_OR_THIRD_PERSON_POV: 2
    // (1, 2, or 3)
    ,
    // What (maximum) percentage of "Recent Story" context should be repurposed for NPC brains?
    PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 30
    // (1 to 95)
    ,
    // How many actions back should Inner Self look for character name triggers?
    NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS: 5
    // (1 to 250)
    ,
    // Symbol used to visually display which NPC brain is currently triggered?
    ACTIVE_CHARACTERS_VISUAL_INDICATOR_SYMBOL: "🎭"
    // (any text/emoji inside the "" or leave empty)
    ,
    // When possible, what percentage of turns should involve an attempt to form a new thought?
    THOUGHT_FORMATION_CHANCE_PER_TURN: 60
    // (0 to 100)
    ,
    // Is the "Configure Inner Self" story card pinned near the top of the in-game list?
    IS_CONFIG_CARD_PINNED_BY_DEFAULT: false
    // (true or false)
    ,
    // Is AC already enabled when the adventure begins?
    IS_AC_ENABLED_BY_DEFAULT: false
    // (true or false)
    ,
    // Should Inner Self model task outputs be displayed inline with the adventure text itself?
    IS_DEBUG_MODE_ENABLED_BY_DEFAULT: false
    // (true or false)
    ,
    }; //——————————————————————————————————————————————————————————————————————————————

    /**
     * AC v1.1.3
     * Made by LewdLeah on May 21, 2025
     * This AI Dungeon script automatically creates and updates plot-relevant story cards while you play
     * General-purpose usefulness and compatibility with other scenarios/scripts were my design priorities
     * AC is fully open-source, please copy for use within your own projects! ❤️
     */
    static AC = {
    // Is AC already enabled when the adventure begins?
    DEFAULT_DO_AC: true
    // (true or false)
    ,
    // Pin the "Configure Auto-Cards" story card at the top of the player's story cards list?
    DEFAULT_PIN_CONFIGURE_CARD: false
    // (true or false)
    ,
    // Minimum number of turns in between automatic card generation events?
    DEFAULT_CARD_CREATION_COOLDOWN: 40
    // (0 to 9999)
    ,
    // Use a bulleted list format for newly generated card entries?
    DEFAULT_USE_BULLETED_LIST_MODE: true
    // (true or false)
    ,
    // Maximum allowed length for newly generated story card entries?
    DEFAULT_GENERATED_ENTRY_LIMIT: 600
    // (200 to 2000)
    ,
    // Do newly generated cards have memory updates enabled by default?
    DEFAULT_NEW_CARDS_DO_MEMORY_UPDATES: false
    // (true or false)
    ,
    // Default character limit before the card's memory bank is summarized?
    DEFAULT_NEW_CARDS_MEMORY_LIMIT: 3200
    // (1750 to 9900)
    ,
    // Approximately how much shorter should recently compressed memories be? (ratio = 10 * old / new)
    DEFAULT_MEMORY_COMPRESSION_RATIO: 25
    // (20 to 1250)
    ,
    // Ignore all-caps during title candidate detection?
    DEFAULT_IGNORE_ALL_CAPS_TITLES: true
    // (true or false)
    ,
    // Should player input actions (Do/Say/Story) be considered during title detection?
    DEFAULT_DETECT_TITLES_FROM_INPUTS: false
    // (true or false)
    ,
    // How many (minimum) actions in the past does Auto-Cards look for named entities?
    DEFAULT_MINIMUM_LOOK_BACK_DISTANCE: 7
    // (2 to 88)
    ,
    // Is Live Script Interface v2 enabled?
    DEFAULT_DO_LSI_V2: false
    // (true or false)
    ,
    // Should the "Debug Data" story card be visible?
    DEFAULT_SHOW_DEBUG_DATA: false
    // (true or false)
    ,
    // AI prompt used to generate new story card entries?
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
    ] // (mimic this multi-line "text" format)
    ,
    // AI prompt used to summarize a given story card's memory bank?
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
    ] // (mimic this multi-line "text" format)
    ,
    // Titles banned from future card generation attempts?
    DEFAULT_BANNED_TITLES_LIST: (
        "North, East, South, West, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, January, February, March, April, May, June, July, August, September, October, November, December"
    ) // (mimic this comma-list "text" format)
    ,
    // Default story card "type" used by Auto-Cards? (does not matter)
    DEFAULT_CARD_TYPE: "class"
    // ("text")
    ,
    // Should titles mentioned in the "opening" plot component be banned from future card generation by default?
    DEFAULT_BAN_TITLES_FROM_OPENING: false
    // (true or false)
    ,
    }; //——————————————————————————————————————————————————————————————————————————————

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

//—————————————————————————————————————————————————————————————————————————————————————

/**
 * Inner Self v1.0.0
 * Made by LewdLeah on January 3, 2026
 * Gives story characters the ability to learn, plan, and adapt over time
 * Inner Self is free and open-source for anyone! ❤️
 */
function InnerSelf(hook) {
    "use strict";
    /**
     * Scenario-level default settings
     * Creators modify these before publishing
     * Players modify these in-game via the config card
     */
    const S = {
    // Default settings for scenario creators to modify:

    // List the first name of every scenario NPC whose brain should be simulated by Inner Self:
    IMPORTANT_SCENARIO_CHARACTERS: ""
    // (write a comma separated list of names inside the "" like so: "Leah, Lily, Lydia")
    ,
    // Is Inner Self already enabled when the adventure begins?
    IS_INNER_SELF_ENABLED_BY_DEFAULT: true
    // (true or false)
    ,
    // Is the player character's first name known in advance? Ignore this setting if unsure
    PREDETERMINED_PLAYER_CHARACTER_NAME: ""
    // (any name inside the "" or leave empty)
    ,
    // Is the adventure intended for 1st, 2nd, or 3rd person gameplay?
    FIRST_SECOND_OR_THIRD_PERSON_POV: 2
    // (1, 2, or 3)
    ,
    // What (maximum) percentage of "Recent Story" context should be repurposed for NPC brains?
    PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 30
    // (1 to 95)
    ,
    // How many actions back should Inner Self look for character name triggers?
    NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS: 5
    // (1 to 250)
    ,
    // Symbol used to visually display which NPC brain is currently triggered?
    ACTIVE_CHARACTERS_VISUAL_INDICATOR_SYMBOL: "🎭"
    // (any text/emoji inside the "" or leave empty)
    ,
    // When possible, what percentage of turns should involve an attempt to form a new thought?
    THOUGHT_FORMATION_CHANCE_PER_TURN: 60
    // (0 to 100)
    ,
    // Is the "Configure Inner Self" story card pinned near the top of the in-game list?
    IS_CONFIG_CARD_PINNED_BY_DEFAULT: false
    // (true or false)
    ,
    // Is AC already enabled when the adventure begins?
    IS_AC_ENABLED_BY_DEFAULT: false
    // (true or false)
    ,
    // Should Inner Self model task outputs be displayed inline with the adventure text itself?
    IS_DEBUG_MODE_ENABLED_BY_DEFAULT: false
    // (true or false)
    ,
    }; //——————————————————————————————————————————————————————————————————————————————

    const version = "v1.0.0";
    // Validate that all required AI Dungeon global properties exist
    // Without these, Inner Self literally cannot function
    if (
        !globalThis.state || (typeof state !== "object") || Array.isArray(state)
        || !globalThis.info || (typeof info !== "object") || Array.isArray(info)
        || !Array.isArray(globalThis.storyCards)
        || (typeof addStoryCard !== "function")
        || !Array.isArray(globalThis.history)
        || (typeof text !== "string")
    ) {
        // Something is seriously broken in AID
        log("unexpected error");
        globalThis.text ||= " ";
        return;
    }
    

  // ==================== QET MODULE (integrated; no extra Input/Context/Output tabs) ====================
  // Lightweight quality/perspective helper. Configurable via state.QET or MainSettings("QET").
  (function(){
    // Allow scenario-level overrides via MainSettings if present
    const defaults = { ENABLED: true, ENFORCE_POV: true, USE_FRONT_MEMORY: true };
    try {
      if (typeof globalThis.MainSettings === 'function') {
        // If creator defined MainSettings.QET, merge it into defaults
        const ms = new MainSettings('QET');
        if (ms && ms.merge) {
          const box = { ...defaults };
          ms.merge(box); // copy into box keys if provided
          Object.assign(defaults, box);
        }
      }
    } catch(_) {}
    // Persistent per-adventure toggles
    state.QET ||= { enabled: defaults.ENABLED, enforcePOV: defaults.ENFORCE_POV, useFrontMemory: defaults.USE_FRONT_MEMORY };

    // Expose a single function in the current scope (not global) for InnerSelf to call
    globalThis.QET = function(hook, t, st, ctx){
      try {
        const S = state.QET || {enabled:true,enforcePOV:true,useFrontMemory:true};
        if (!S.enabled) return (hook === 'context') ? [t, st] : t;
        if (hook === 'input') {
          const lower = (t||'').trim().toLowerCase();
          if (/^\/qet\s+off\b/.test(lower)) { state.QET.enabled = false; return '\u200B'; }
          if (/^\/qet\s+on\b/.test(lower))  { state.QET.enabled = true;  return '\u200B'; }
          if (/^\/qet\s+pov\s*[123]\b/.test(lower)) {
            const n = parseInt(lower.replace(/.*pov\s*/,''),10);
            if (Number.isInteger(n) && 1<=n && n<=3) { state.QET.enforcePOV = true; state.QET.pov = n; }
            return '\u200B';
          }
          return t;
        }
        if (hook === 'context') {
          const cfg = (ctx && ctx.config) || {};
          const pov = (state.QET.pov || cfg.pov || 2);
          if (state.QET.useFrontMemory && globalThis.state && globalThis.state.memory) {
            const owner = (cfg.player && String(cfg.player).trim()) || 'the protagonist';
            const povWord = ({1:'first',2:'second',3:'third'})[pov] || 'second';
            const hint = `[QET] Keep strictly ${povWord}-person perspective for ${owner}.`;
            const fm = String(state.memory.frontMemory||'');
            // Prevent runaway growth by ensuring uniqueness and trimming
            if (!fm.includes(hint)) {
              state.memory.frontMemory = (fm? (fm+"\n"):"") + hint;
              if (state.memory.frontMemory.length>900) {
                state.memory.frontMemory = state.memory.frontMemory.split('\n').slice(-3).join('\n');
              }
            }
          }
          return [t, st];
        }
        if (hook === 'output') {
          // Mild cleanup of meta artifacts not already handled
          t = (t||'');
          t = t.replace(/\b(STRICT OUTPUT FORMAT|EXACT SHAPE)\b[\s\S]*$/gmi,'');
          // Optional gentle PoV nudge (only if tiny and safe)
          if (state.QET.enforcePOV) {
            const pov = (state.QET.pov || (ctx&&ctx.config&&ctx.config.pov) || 2);
            if (pov===2) { /* no automatic conversion; InnerSelf already guides PoV */ }
          }
          return t.trim();
        }
      } catch(_) {}
      return (hook === 'context') ? [t, st] : t;
    }
  })();
  // ==================== END QET MODULE ====================
/**
     * Recursively merges source object into target object
     * Only copies properties that are undefined in target
     * Nested objects get their own recursive treatment
     * @param {Object} target - The object to merge into
     * @param {Object} source - The object to merge from
     * @returns {Object} The mutated target object
     */
    const deepMerge = (target = {}, source = {}) => {
        // Walk through every key in the source
        for (const key in source) {
            // Source value is a nested object, so recurse
            if (source[key] && (typeof source[key] === "object") && !Array.isArray(source[key])) {
                if (!target[key] || (typeof target[key] !== "object")) {
                    // Target doesn't have this key or it's not an object
                    target[key] = {};
                }
                deepMerge(target[key], source[key]);
            } else if (target[key] === undefined) {
                // Only copy if target doesn't already have this key
                target[key] = source[key];
            }
        }
        return target;
    };
    /**
     * Persistent state of Inner Self stored in the adventure's state object
     * This survives across turns
     * @type {Object}
     */
    const IS = state.InnerSelf = deepMerge(state.InnerSelf || {}, {
        // Zero-width encoded thought labels for context injection
        encoding: "",
        // Currently triggered agent name (empty string = none)
        agent: "",
        // Monotonically increasing thought label counter
        label: 0,
        // Hash of recent history to detect retry or erase + continue turns
        hash: "",
        // Total number of brain operations performed across all agents
        ops: 0,
        // Auto-Cards integration state
        AC: {
            // This helps avoid calling AC API functions more than necessary
            enabled: false,
            // External use of the AC API force-installs so it just works
            forced: false,
            // NGL this one didn't need to be stateful but I didn't feel like declaring a local so whatevs
            // Basically AC sets this to true when it does stuff, so Inner Self can inhibit itself
            event: false
        }
    });
    /**
     * Checks if Auto-Cards is available in the global scope
     * @returns {boolean} true if Auto-Cards is installed and callable
     */
    const hasAutoCards = () => (typeof globalThis.AutoCards === "function");
    const u = "qm`x/`hetofdno/bnl.qsnghmd.MdveMd`i".replace(/./g, c => String.fromCharCode(c.charCodeAt()^1));
    if (IS.AC.enabled && (typeof hook === "string") && (hook !== "context") && hasAutoCards()) {
        // Delegate to Auto-Cards for non-context hooks when enabled
        try {
            text = AutoCards(hook, text);
        } catch (error) {
            log(error.message);
        }
    }
    /**
     * Generates a simple hashcode of the last 50 actions in history
     * Used to detect retry or erase + continue turns
     * @returns {string} Hexadecimal hash string
     */
    const historyHash = () => {
        let n = 0;
        // Grab the last 50 actions and stringify them
        const serialized = JSON.stringify(history.slice(-50));
        for (let i = 0; i < serialized.length; i++) {
            // Classic polynomial rolling hash, nothing fancy
            n = ((31 * n) + serialized.charCodeAt(i)) | 0;
        }
        return n.toString(16);
    };
    /**
     * Safely parses a JSON string into an object
     * Optionally attempts to repair malformed JSON by extracting quoted content
     * Basically I use repair mode for cute little smooth brains UwU
     * @param {string} str - The string to parse
     * @param {boolean} repair - Whether to attempt repair on malformed JSON
     * @returns {Object} Parsed object or empty object on failure
     */
    const deserialize = (str = "", repair = false) => {
        try {
            const parsed = JSON.parse(repair ? (() => {
                // All values will be strings I promise
                // Find the first and last quote chars
                const first = str.indexOf("\"");
                const last = str.lastIndexOf("\"");
                return (
                    ((first === -1) || (last === -1) || (last <= first))
                    ? "{}" : `{${str.slice(first, last + 1)}}`
                );
            })() : str);
            if (parsed && (typeof parsed === "object") && !Array.isArray(parsed)) {
                // Only return a proper object (not null, not array)
                return parsed;
            }
        } catch {}
        // That empty catch looks so dumb lol
        return {};
    };
    /**
     * Validated config settings for Inner Self
     * Default settings are specified by creators at the scenario level
     * Runtime settings are specified by players at the adventure level
     * @typedef {Object} config
     * @property {Object|null} card - Config card object reference
     * @property {boolean} allow - Is Inner Self enabled?
     * @property {string} player - The player character's name
     * @property {number} pov - Is the adventure in 1st, 2nd, or 3rd person?
     * @property {boolean} guide - Show a detailed guide
     * @property {number} percent - Default percentage of Recent Story context length reserved for agent brains
     * @property {number} distance - Number of previous actions to look back for agent name triggers
     * @property {string} indicator - The visual indicator symbol used to display active brains
     * @property {number} chance - Likelihood of performing a standard thought formation task each turn
     * @property {boolean} pin - Is the config card pinned near the top of the list?
     * @property {boolean} auto - Is Auto-Cards enabled?
     * @property {boolean} debug - Is debug mode enabled for inline task output visibility?
     * @property {string[]} agents - All agent names, ordered from highest to lowest trigger priority
     */
    /**
     * Config class - Manages the Inner Self configuration card
     * Handles building, finding, parsing, and validating all settings
     * @class
     */
    class Config {
        /**
         * Build or find the Inner Self config card
         * Returns the card reference and all parsed settings
         * This is the heart of the config system
         * @param {Set<string>} [pending] - Recursion aid for tracking pending agents
         * @returns {config} The complete validated configuration object
         */
        static get(pending = new Set()) {
        // Allow MainSettings mod to override local defaults
        if (typeof globalThis.MainSettings === "function") {
            new MainSettings("InnerSelf", "IS").merge(S);
        }
        /**
         * Fallback values when settings are missing or invalid
         * Frozen because I hate accidental mutations
         * @type {config}
         */
        const fallback = Object.freeze({
            allow: true,
            guide: false,
            player: "",
            pov: 2,
            percent: 30,
            distance: 5,
            indicator: "🎭",
            chance: 60,
            pin: false,
            auto: false,
            debug: false,
            agents: []
        });
        /** @type {config} */
        const config = { card: null };
        /**
         * Strips a string down to lowercase letters only
         * Used for fuzzy matching of setting names
         * @param {string} s - Input string
         * @returns {string} Simplified string
         */
        const simplify = (s = "") => s.toLowerCase().replace(/[^a-z]+/g, "");
        /**
         * Cleans up an agent name by removing commas and zero-width chars
         * Also normalizes whitespace because players are messy ;P
         * @param {string} agent - Raw agent name
         * @returns {string} Cleaned agent name
         */
        const cleanAgent = (agent = "") => agent.replace(/[,\u200B-\u200D]+/g, "").trim().replace(/\s+/g, " ");
        /**
         * Factory function that creates builder/setter pairs for config fields
         * Handles both boolean and integer settings with validation
         * This makes me NOT want to die every time I need to add a new setting
         * @param {string} key - Config property name
         * @param {*} setting - Default value from scenario settings
         * @param {Object} int - Integer constraints (lower, upper, suffix)
         * @returns {Object} Object with builder and setter functions
         */
        const factory = (key = "", setting = null, int = null) => ({
            // Builds the display string for the config card entry
            builder: (cfg = {}) => ` ${config[key] ?? cfg.setter?.(setting)}${(
                // Fancy suffix or boring suffix
                (typeof int?.suffix === "function") ? int.suffix() : int?.suffix ?? ""
            )}`,
            // Parses and validates a value, storing it in config
            setter: (value = null, fallible = false) => {
                // Helper to clamp integers within bounds
                const bound = (val = 20) => Math.min(Math.max(int?.lower ?? 1, val), int?.upper ?? 95);
                if ((typeof value === "boolean") && !int) {
                    // Boolean setting with a boolean value (easy case)
                    config[key] = value;
                } else if (Number.isInteger(value) && int) {
                    // Integer setting with an integer value (also easy)
                    config[key] = bound(value);
                } else if (typeof value !== "string") {
                    // Non-string non-matching type, use fallback unless fallible
                    if (fallible) {
                        return;
                    }
                    config[key] = fallback[key];
                } else if (int) {
                    // Parse integer from string, stripping decimals and non-digits
                    value = value.split(/[./]/, 1)[0].replace(/[^\d]+/g, "");
                    if (value !== "") {
                        config[key] = bound(parseInt(value, 10));
                    } else if (!fallible) {
                        config[key] = bound(fallback[key]);
                    }
                } else {
                    // Parse boolean from string with synonym support
                    value = simplify(value);
                    if (["true", "t", "yes", "y", "on", "1", "enable", "enabled"].includes(value)) {
                        config[key] = true;
                    } else if (["false", "f", "no", "n", "off", "0", "disable", "disabled"].includes(value)) {
                        config[key] = false;
                    } else if (!fallible) {
                        config[key] = fallback[key];
                    }
                }
                return config[key];
            }
        });
        /**
         * Template for building the Inner Self config card
         * Contains all the user-facing text and settings
         * @type {Object}
         */
        const template = {
            type: "class",
            title: "Configure \nInner Self",
            // The config card entry contains the main settings
            entry: [
                {
                    message: "Inner Self grants story characters the ability to learn, plan, and adapt over time. Edit the entry and notes below to control how Inner Self behaves."
                },
                { message: "Enable Inner Self:", ...factory(
                    "allow", S.IS_INNER_SELF_ENABLED_BY_DEFAULT
                ) },
                {
                    message: "Show detailed guide:",
                    builder: (cfg = {}) => ` ${(
                        ((hook === "context") || Number.isInteger(info.maxChars))
                        ? config.guide ?? cfg.setter?.(false)
                        : false
                    )}`,
                    setter: factory("guide", false).setter
                },
                {
                    message: "First name of player character:",
                    builder: (cfg = {}) => ` "${config.player || (() => {
                        const display = cfg.setter?.(S.PREDETERMINED_PLAYER_CHARACTER_NAME);
                        if (config.player === "") {
                            config.player = "the protagonist";
                        }
                        return display;
                    })()}"`,
                    setter: (value = null, fallible = false) => {
                        const example = "Example";
                        if (typeof value === "string") {
                            config.player = value.replaceAll("\"", "").replace(example, "").trim();
                        } else if (fallible) {
                            return;
                        } else {
                            config.player = fallback.player;
                        }
                        return config.player || example;
                    }
                },
                { message: "Adventure in 1st, 2nd, or 3rd person:", ...factory(
                    "pov", S.FIRST_SECOND_OR_THIRD_PERSON_POV,
                    { lower: 1, upper: 3, suffix: () => ["st", "nd", "rd"][config.pov - 1] ?? "" }
                ) },
                { message: "Max brain size relative to story context:", ...factory(
                    "percent", S.PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS,
                    { lower: 1, upper: 95, suffix: "%" }
                ) },
                { message: "Recent turns searched for name triggers:", ...factory(
                    "distance", S.NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS,
                    { lower: 1, upper: 250 }
                ) },
                {
                    message: "Visual indicator of current NPC triggers:",
                    builder: (cfg = {}) => ` "${(
                        config.indicator ?? cfg.setter?.(S.ACTIVE_CHARACTERS_VISUAL_INDICATOR_SYMBOL)
                    )}"`,
                    setter: (value = null, fallible = false) => (
                        (typeof value === "string")
                        ? (config.indicator = value.replace(/["\u200B-\u200D]+/g, "").trim())
                        : (fallible)
                        ? null
                        : (config.indicator = fallback.indicator)
                    )
                },
                { message: "Thought formation chance per turn:", ...factory(
                    "chance", S.THOUGHT_FORMATION_CHANCE_PER_TURN,
                    { lower: 0, upper: 100, suffix: "%" }
                ) },
                { message: "Pin this config card near the top:", ...factory(
                    "pin", S.IS_CONFIG_CARD_PINNED_BY_DEFAULT
                ) },
                { message: "Install Auto-Cards:", ...factory(
                    "auto", S.IS_AC_ENABLED_BY_DEFAULT
                ) },
                { message: "Enable debug mode to see model tasks:", ...factory(
                    "debug", S.IS_DEBUG_MODE_ENABLED_BY_DEFAULT
                ) },
                {
                    message: "Write the name(s) of your non-player characters at the very bottom of the \"notes\" section below. This is mandatory because it allows Inner Self to assemble independent minds for the correct individuals."
                }
            ],
            // Description section contains info and agent list
            description: [
                {
                    message: "Please visit my profile @LewdLeah through the link above and read my bio for simple steps to add Inner Self to your own scenarios! ❤️"
                },
                {
                    message: `Inner Self ${version} is an open-source and general-purpose AI Dungeon mod by LewdLeah. You have my full permission to use it with any scenario!`
                },
                {
                    // This is where players list their NPCs
                    message: "Write the first name of every intelligent story character on separate lines below, listed from highest to lowest trigger priority:",
                    builder: (cfg = {}) => ["", "", ...(
                        config.agents ?? cfg.setter?.(S.IMPORTANT_SCENARIO_CHARACTERS)
                    ), ""].join("\n"),
                    setter: (value = null, fallible = false) => {
                        // Accept string (from card) or array (from code)
                        if (typeof value === "string") {
                            config.agents = value.split(/[,\n]/);
                        } else if (Array.isArray(value)) {
                            config.agents = value.filter(agent => (typeof agent === "string"));
                        } else if (fallible) {
                            return;
                        } else {
                            return (config.agents = [...fallback.agents]);
                        }
                        // Clean, deduplicate, and remove empties
                        return (config.agents = [...new Set(config.agents
                            .map(agent => cleanAgent(agent))
                            .filter(agent => (agent !== ""))
                        )]);
                    }
                }
            ]
        };
        // Track discovered agents to avoid duplicates
        const agents = new Set();
        // Simplified title for fuzzy matching
        const target = simplify(template.title);
        // Scan all story cards in reverse order
        // Looking for config cards, agent cards, and duplicates (remove the latter in-place)
        for (let i = storyCards.length - 1; -1 < i; i--) {
            const card = storyCards[i];
            if (!card || (typeof card !== "object") || Array.isArray(card)) {
                // Remove invalid cards (null, non-objects, arrays)
                // If this ever happens in a real situation, I will cry
                storyCards.splice(i, 1);
            } else if ((typeof card.keys === "string") && card.keys.includes("\"agent\"")) {
                // This card has agent metadata, extract and validate it
                const metadata = deserialize(card.keys);
                if (typeof metadata.agent === "string") {
                    metadata.agent = cleanAgent(metadata.agent);
                    if (metadata.agent !== "") {
                        if (!agents.has(metadata.agent)) {
                            // First time seeing this brain card
                            agents.add(metadata.agent);
                            card.keys = JSON.stringify(metadata);
                            continue;
                        } else if (typeof card.title === "string") {
                            // Duplicate brain card, mark it as a copy
                            card.title = card.title.trim();
                            card.title = `Copy of ${(card.title === "") ? "Agent" : card.title}`;
                        }
                    }
                }
                // Invalid agent metadata, clear it
                card.keys = "";
            } else if ((typeof card.title !== "string") || (100 < card.title.length)) {
                // Skip cards with missing or absurdly long titles
                continue;
            } else if (card.title.startsWith("@") && !card.title.includes("figure")) {
                // Cards starting with @ are shorthand for adding agents
                const agent = cleanAgent(card.title.replace(/^[@\s]*/, ""));
                if (agent !== "") {
                    card.title = agent;
                    pending.add(agent);
                }
            } else if ((() => {
                // Fuzzy matching to find the config card even if title is slightly mangled
                // Because players gonna player and typos happen
                const current = simplify(card.title);
                const maxMistakes = 2;
                let mistakes = 0;
                // Target index (expected title)
                let t = 0;
                // Current index (actual title)
                let c = 0;
                while ((t < target.length) && (c < current.length)) {
                    if (current[c] === target[t]) {
                        // Chars match, advance both
                        t++; c++;
                        continue;
                    } else if (maxMistakes <= mistakes) {
                        // Too many mistakes, this isn't the config card (I hope)
                        return true;
                    }
                    // Allow for insertions, deletions, or substitutions
                    mistakes++;
                    (current[c + 1] === target[t])
                    ? c++
                    : (current[c] === target[t + 1])
                    ? t++
                    : (t++, c++)
                }
                // Count leftover chars as mistakes
                mistakes += (target.length - t) + (current.length - c);
                // This is basically bargain bin levenshtein distance but less costly
                return (maxMistakes < mistakes);
            })()) {
                // Title didn't match the fuzzy search
                continue;
            } else if (config.card === null) {
                // Found the config card
                config.card = card;
            } else if (typeof removeStoryCard === "function") {
                // Duplicate config card, remove it properly the way Latitude intended
                // (I know it's just a wrapper for splice, but that may change one day lol)
                removeStoryCard(i);
            } else {
                // Fallback removal for duplicate config cards
                storyCards.splice(i, 1);
            }
        }
        /**
         * Builds a formatted string from template sections
         * @param {Array} source - Array of config message objects
         * @param {string} delimiter - String to join sections with
         * @returns {string} Formatted config text
         */
        const build = (source = [], delimiter = "\n\n") => (source
            .map(cfg => `> ${cfg.message}${cfg.builder?.(cfg) ?? ""}`)
            .join(delimiter)
        );
        if (config.card === null) {
            // If no config card exists, create one and recurse
            addStoryCard(u,
                build(template.entry, "\n"),
                template.type,
                template.title,
                build(template.description, "\n\n")
            );
            // Recurse to parse the newly created card
            return Config.get(pending);
        }
        // Parse existing card content to extract user-modified settings
        // This is where IS reads back what the player has configured
        // Abomination :3
        ["entry", "description"].map(source => [source, (
            (typeof config.card[source] === "string")
            // Split on >, filter for lines with colons, extract key-value pairs
            ? Object.fromEntries((config.card[source]
                .split(/\s*>[\s>]*/)
                .filter(block => block.includes(":"))
                .map(block => block.split(/\s*:[\s:]*/, 2))
            ).map(pair => [simplify(pair[0]), pair[1].trimEnd()])) : {}
        )]).forEach(([source, extractive]) => template[source].forEach(cfg => (
            // Try to set each config value from extracted content (fallible mode)
            cfg.setter?.(extractive[simplify(cfg.message)], true)
        )));
        // Merge all discovered agents: config, brain card metadata, and "@" pending
        config.agents = [...new Set([...(config.agents ?? fallback.agents), ...agents, ...pending])];
        if (IS.AC.forced) {
            // Handle forced Auto-Cards installation (silly API stuff)
            config.auto = true;
            IS.AC.forced = false;
            IS.AC.enabled = true;
        }
        // Update the card with the canonical template format so it sticks after the hook ends
        config.card.type = template.type;
        config.card.title = template.title;
        config.card.entry = build(template.entry, "\n");
        config.card.description = build(template.description, "\n\n");
        config.card.keys = u;
        return config;
    } }
    /**
     * Removes the visual indicator prefix from a card title
     * The indicator is separated by a zero-width space char
     * @param {Object} card - Story card object to modify
     * @returns {void}
     */
    const deindicate = (card = {}) => {
        if (typeof card.title !== "string") {
            // Cry
            card.title = "";
        } else if (card.title.includes("\u200B")) {
            // Strip everything before and including the zero-width space
            card.title = (card.title
                .slice(card.title.indexOf("\u200B") + 1)
                .replaceAll("\u200B", "")
                .trim()
            );
        }
        return;
    };
    /**
     * Agent class - Represents an NPC with a simulated brain
     * Each agent has their own story card that stores their thoughts
     * The brain is a key-value store of labeled thoughts
     * @class
     */
    class Agent {
        // Private fields for encapsulation
        // Percentage of context reserved for this agent's brain
        _percent;
        // Visual indicator symbol shown when agent is triggered
        _indicator;
        // Cached reference to the agent's brain card
        _card = null;
        // Cached parsed brain contents
        _brain = null;
        // Cached parsed metadata
        _metadata = null;
        /**
         * Creates a new Agent instance
         * The agent will find or create their brain card automatically
         * @param {string} name - The name of the agent (used for triggering)
         * @param {Object} [options] - Optional settings for the agent
         * @param {number} [options.percent=30] - Context reserved for brain contents
         * @param {string} [options.indicator=null] - Visual indicator when triggered
         */
        constructor(name = "", { percent = 30, indicator = null } = {}) {
            this._indicator = indicator;
            this._percent = percent;
            this.name = name;
            return this;
        }
        /**
         * Gets or creates the agent's brain card
         * Uses lazy initialization and caching
         * @returns {Object} The agent's story card
         */
        get card() {
            if (this._card !== null) {
                // Return cached card if stored
                return this._card;
            }
            /**
             * Creates a new brain card for this agent
             * Includes a timestamp for debugging purposes
             * @param {string} name - Display name for the card
             * @returns {Object} The newly created card
             */
            const buildCard = (name = this.name) => addStoryCard(
                JSON.stringify({ agent: this.name }),
                (() => {
                    // Generate a pretty timestamp for the initialization comment
                    const time = new Date();
                    const match = time.toLocaleString("en-US", {
                        timeZone: "UTC",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    }).match(/(\d+)\/(\d+)\/(\d+),?\s*(\d+:\d+\s*[AP]M)/);
                    return `// initialized @ ${(
                        match
                        ? `${match[3]}-${match[1]}-${match[2]} ${match[4]}`
                        : time.toISOString().replace("T", " ").slice(0, 16)
                    )} UTC`;
                })(),
                "Brain",
                name,
                JSON.stringify({}),
                // Thank you Mavrick
                { returnCard: true }
            );
            /**
             * Checks if a card belongs to this agent
             * @param {Object} card - Card to check
             * @returns {boolean} true if this is the right card
             */
            const isAgent = (card = {}) => (
                (typeof card.keys === "string")
                && card.keys.includes("\"agent\"")
                && (deserialize(card.keys).agent === this.name)
            );
            if (typeof this._indicator !== "string") {
                // If no indicator is set, just find or create the card
                for (const card of storyCards) {
                    if (isAgent(card)) {
                        // Found an existing card
                        this._card = card;
                        return this._card;
                    }
                }
                // No existing card found, create one
                this._card = buildCard();
                return this._card;
            }
            // The Agent class instance was constructed with an indicator
            // Update card titles during the same iteration because reasons
            this._indicator = this._indicator.trim();
            const prefix = `${this._indicator}\u200B`;
            for (const card of storyCards) {
                // Remove indicators from all cards
                deindicate(card);
                if ((this._card === null) && isAgent(card)) {
                    // Found the brain card, add the indicator prefix
                    if (this._indicator !== "") {
                        card.title = (card.title === "") ? prefix : `${prefix} ${card.title}`;
                    }
                    this._card = card;
                }
            }
            if (this._card === null) {
                // Still no card? Create one with the indicator
                this._card = (this._indicator === "") ? buildCard() : buildCard(`${prefix} ${this.name}`);
            }
            return this._card;
        }
        /**
         * Gets the agent's metadata from their card
         * Contains per-agent configurable settings like context percentage
         * @returns {Object} metadata object with validated percent
         */
        get metadata() {
            if (this._metadata !== null) {
                // Return cached metadata if available
                return this._metadata;
            }
            // Valid range for brain size percentage (inclusive)
            const [lower, upper] = [1, 95];
            this._metadata = deserialize(this.card.keys);
            // Validate and normalize the percent value
            if (!Number.isInteger(this._metadata.percent)) {
                // Uh oh
                this._metadata.percent = (
                    ((typeof this._metadata.percent === "number") && Number.isFinite(this._metadata.percent))
                    ? Math.min(Math.max(lower, Math.round(this._metadata.percent)), upper)
                    : this._percent
                );
            } else if (this._metadata.percent < lower) {
                // Clamp to minimum
                this._metadata.percent = lower;
            } else if (upper < this._metadata.percent) {
                // Clamp to maximum
                this._metadata.percent = upper;
            } else {
                // Yippee
                return this._metadata;
            }
            // Save the normalized metadata back to the card
            this._card.keys = JSON.stringify(this._metadata);
            return this._metadata;
        }
        /**
         * Gets the agent's brain (thought storage)
         * Parses from the card description with repair mode enabled
         * @returns {Object} Key-value store of thoughts
         */
        get brain() {
            if (this._brain !== null) {
                // Return the cached brain if available
                return this._brain;
            }
            // Parse the brain from card description, allow repairs
            const source = deserialize(this.card.description, true);
            this._brain = {};
            for (const key in source) {
                // Only keep string values (the actual thoughts)
                (typeof source[key] === "string") && (this._brain[key] = source[key]);
            }
            return this._brain;
        }
        /**
         * Clears the cached brain, forcing a re-parse on next access
         * Head empty UwU
         * @returns {void}
         */
        lobotomize() {
            this._brain = null;
            return;
        }
    }
    /**
     * Gets the most recent non-empty action from history
     * Ignores actions that are just zero-width chars >:3
     * @returns {Object|undefined} The previous action or undefined
     */
    const getPrevAction = () => history.findLast(a => !/^[\u200B-\u200D]*$/.test(a?.text ?? a?.rawText ?? ""));
    // ==================== CONTEXT HOOK ====================
    // This is where (half) of the magic happens: Inner Self injects brains and tasks into context
    // Infer the current lifecycle hook
    if ((hook === "context") || Number.isInteger(info.maxChars)) {
        // Calculate the player's context limit with a small buffer
        const limit = Math.max((Math.min(text.length, info.maxChars) - 10), 4500);
        // Ensure stop variable exists (the AID script sandbox is silly)
        globalThis.stop ??= false;
        // Reset agent trigger for this turn
        IS.agent = "";
        /** @type {config} */
        const config = Config.get();
        // [QETX] Create Quest/Money/Items cards on first Continue (SAFE)
        try {
          state.QETX = state.QETX || {};
          if (!state.QETX.init) {
            var _findByTitle = function(t){ try { for (var i=0;i<storyCards.length;i++){ var c=storyCards[i]; if (c && c.title===t) return c; } } catch(_){ } return null; };
            var _ensure = function(title, desc){ if (!_findByTitle(title)) { try { addStoryCard('QETX:'+title, '// initialized', 'class', title, desc, { returnCard:true }); } catch(_){ } } };
            _ensure('Quest Tracker', 'Active Quests:\n—\n\nCompleted Quests:\n—');
            _ensure('Money & Currencies', 'Gold: 0\nSilver: 0\nCopper: 0\nMoney: 0');
            _ensure('Items & Properties', '- (empty)');
            state.QETX.init = true;
          }
        } catch(__e) { try { log(__e.message); } catch(_){} }

  if (typeof QET === "function") { var __q = QET("context", text, globalThis.stop, { config: config });
        if (Array.isArray(__q)) { text = __q[0]; globalThis.stop = __q[1]; } else { text = __q; } }
        if (config.pin) {
            // Move config card to top of list if pinning is enabled
            const index = storyCards.indexOf(config.card);
            if (0 < index) {
                storyCards.splice(index, 1);
                storyCards.unshift(config.card);
            }
        }
        const unzero = () => ((text = text.replace(/[\u200B-\u200D]+/g, "") || " "), (IS.encoding = ""));
        // Handle Auto-Cards integration when enabled
        if (config.auto && hasAutoCards()) {
            try {
                if (!IS.AC.enabled) {
                    // It's my first time enabling AC, please be gentle :3
                    const api = AutoCards().API;
                    // Prevent AC from generating cards with reserved titles
                    api.setBannedTitles([
                        "Inner",
                        "Self",
                        "Configure Inner Self",
                        "Agent",
                        ...api.getBannedTitles(),
                    ]);
                }
                // Run AC's context branch
                AutoCards(null);
                IS.AC.event = false;
                [text, stop] = AutoCards("context", text, stop);
            } catch (error) {
                log(error.message);
            }
            IS.AC.enabled = true;
            if (IS.AC.event || (stop === true)) {
                // If AC triggered an event or stop, we're done here
                config.allow ? unzero() : ((IS.encoding = ""), (text ||= " "));
                return;
            }
        } else if (IS.AC.enabled) {
            IS.AC.enabled = false;
            // AC was just disabled, clean up its cards ;)
            for (let i = storyCards.length - 1; -1 < i; i--) {
                const card = storyCards[i];
                // Check if this is an AC-related card that should be removed
                if (!([
                    "Shared Library",
                    "Input Modifier",
                    "Context Modifier",
                    "Output Modifier",
                    "LSIv2 Guide",
                    "State Display",
                    "Console Log"
                ].includes(card.title) && (card.title === card.keys)) && [{ key: "title", options: [
                    "Configure \nAuto-Cards",
                    "Edit to enable \nAuto-Cards"
                ] }, { key: "keys", options: [
                    "Edit the entry above to adjust your story card automation settings",
                    "Edit the entry above to enable story card automation"
                ] }].every(({ key, options }) => !options.includes(card[key]))) {
                    continue;
                } else if (typeof removeStoryCard === "function") {
                    removeStoryCard(i);
                } else {
                    storyCards.splice(i, 1);
                }
            }
        }
        if (!config.allow) {
            // Early exit if Inner Self is disabled
            IS.encoding = "";
            text ||= " ";
            return;
        }
        /**
         * Removes visual indicators from all story cards
         * Called when no agent is triggered or Inner Self is disabled
         * @returns {void}
         */
        const deindicateAll = () => {
            for (const card of storyCards) {
                deindicate(card);
            }
            return;
        };
        if (config.agents.length === 0) {
            // No agents are configured
            deindicateAll();
            unzero();
            return;
        }
        // ==================== AGENT TRIGGER DETECTION ====================
        // Scan config.distance actions back through history to find the most recent agent trigger
        // Tie-break same-action name triggers based on RNG and their order-of-priority in config.agents
        // Do it all without using ANY RegEx because I'm extra like that :3
        // (this block is blazingly fast)
        const possibilities = [];
        for (
            let [i, remaining] = [history.length - 1, config.distance];
            ((0 < remaining) && (-1 < i) && (possibilities.length === 0));
            i--
        ) {
            const actionText = history[i]?.text ?? history[i]?.rawText;
            if ((typeof actionText !== "string") || (actionText.indexOf(">>>") !== -1)) {
                // Skip invalid actions or Auto-Cards thingies
                continue;
            }
            scan: {
                // Check if this action has any meaningful content
                for (let j = actionText.length - 1; -1 < j; j--) {
                    const c = actionText.charCodeAt(j);
                    if ((0x20 < c) && (c !== 0x200B) && (c !== 0x200C) && (c !== 0x200D)) {
                        // Fast accept any non-whitespace + non-zero-width char
                        break scan;
                    }
                }
                // Byeee
                continue;
            }
            remaining--;
            // Lowercase for case-insensitive matching
            const lower = actionText.toLowerCase();
            // Check each agent in priority order
            for (let [a, n] = [0, config.agents.length]; a < n; a++) {
                const agentLower = config.agents[a].toLowerCase();
                // Scan for all occurrences of agentLower in lower
                for (
                    let p = lower.indexOf(agentLower);
                    (p !== -1);
                    p = lower.indexOf(agentLower, p + 1)
                ) {
                    // Ensure word boundaries (not a-z before or after)
                    if ([((0 < p) ? lower.charCodeAt(p - 1) : 0), (
                        ((p + agentLower.length) < lower.length)
                        ? lower.charCodeAt(p + agentLower.length) : 0
                    )].every(c => ((c < 97) || (122 < c)))) {
                        // Found a valid trigger
                        possibilities.push(config.agents[a]);
                        break;
                    }
                }
            }
        }
        if (possibilities.length === 0) {
            // No agent triggered, clean up and exit
            // Strip zero-width chars and end with a single space
            text = `${text.replace(/\s*[\u200B-\u200D][\s\u200B-\u200D]*/g, "\n\n").trim()} `;
            deindicateAll();
            // Do fancy standoff spacing leading ahead of the next output
            IS.encoding = "";
            IS.agent = " ";
            text ||= " ";
            return;
        } else {
            // Use RNG for tie-breaking name triggers with some priority bias
            const n = possibilities.length;
            // Sum of weights
            const total = (n * (n + 1)) / 2;
            for (let [i, r] = [0, Math.random() * total]; i < n; i++) {
                r -= (n - i);
                if (r < 0) {
                    IS.agent = possibilities[i];
                    break;
                }
            }
        }
        // Temporary markers used to reliably identify sections of the context for later calculations
        const boundary = Object.freeze({
            // Hardcoded AID context header
            needle: "Recent Story:",
            // Marks start of recent story
            upper: "<|story|>",
            // Marks start of task instructions
            lower: "<|task|>"
        });
        /**
         * Replaces a substring in text with a replacement string
         * Expands to consume surrounding whitespace
         * @param {string} substring - String to find and replace
         * @param {string} replacement - String to replace with
         * @param {Function} fallback - Called if substring not found
         * @returns {void}
         */
        const setMarker = (substring = "", replacement = "", fallback = () => {}) => {
            let start = text.indexOf(substring);
            if (start === -1) {
                // Do stuff
                fallback();
                return;
            }
            let end = start + substring.length;
            // Expand left over whitespace
            while ((0 < start) && (text.charCodeAt(start - 1) < 33)) {
                start--;
            }
            // Expand right over whitespace
            while ((end < text.length) && (text.charCodeAt(end) < 33)) {
                end++;
            }
            text = `${text.slice(0, start)}${replacement}${text.slice(end)}`;
            return;
        };
        // Replace "Recent Story:" with the upper boundary marker
        setMarker(boundary.needle, boundary.upper, () => {
            // No needle found, append marker to end
            text = `${text.trimEnd()}${boundary.upper}`;
            return;
        });
        if (config.debug) {
            const start = text.indexOf(boundary.upper);
            if (start !== -1) {
                // In debug mode, strip out parenthetical task outputs from the recent story context
                text = `${text.slice(0, start + boundary.upper.length)}${(text
                    .slice(start + boundary.upper.length)
                    .replace(/\s*\([\s\S]*?\)\s*/g, "\n\n")
                )}`;
            }
        }
        // Construct the agent instance for the triggered NPC
        const agent = new Agent(IS.agent, { percent: config.percent, indicator: config.indicator });
        // Whitelist of thought labels allowed in this context
        const whitelist = new Set();
        /**
         * Builds the mind array from the agent's brain
         * Sorts thoughts and prepares them for context injection
         * @returns {Array} An array of [label, key, thought] triplets
         */
        const mind = (() => {
            // Sort direction: ascending (70%) or descending (30%)
            // Keeps things fresh and prevents bias toward recent or old thoughts
            const direction = (Math.random() < 0.7) ? 1 : -1;
            const brain = agent.brain;
            // Separate thoughts into numbered and unlabeled
            const unknowns = [];
            const numbered = [];
            // Parse each thought and extract label/content
            for (const key in brain) {
                const value = brain[key];
                // Clear from brain (keep instantaneous memory use low)
                delete brain[key];
                // Arrow separates label from thought content
                const sliceIndex = value.indexOf("→");
                const unknown = "*";
                // Parse label and thought, handle malformed values
                const [label, thought] = (sliceIndex === -1) ? [unknown, value.trim()] : [
                    parseInt(value.slice(0, sliceIndex), 10) || unknown,
                    value.slice(sliceIndex + 1).trim()
                ];
                const triplet = [label, key, thought];
                if (!Number.isInteger(label)) {
                    // No valid label, insert at random position in unknowns
                    unknowns.splice(Math.floor(Math.random() * (unknowns.length + 1)), 0, triplet);
                    continue;
                }
                // Track valid labels for the whitelist
                whitelist.add(label);
                // Insert in sorted order (ascending or descending)
                let i = numbered.length;
                while (i-- && ((direction * label) < (direction * numbered[i][0])));
                numbered.splice(i + 1, 0, triplet);
            }
            // Teehee
            agent.lobotomize();
            if (unknowns.length === 0) {
                // All thoughts have labels, nice and clean UwU
                return numbered;
            }
            // Thoughts without integer labels ("[*]") are placed above (60%) or below (40%) the rest
            return (Math.random() < 0.6) ? [...unknowns, ...numbered] : [...numbered, ...unknowns];
        })();
        // Process context and decode any embedded thought labels
        // Zero-width chars encode thought labels that link story events to brain contents
        text = text.replace((
            // Normalize spacing around zero-width chars
            /\s*[\u200B-\u200D][\s\u200B-\u200D]*/g
        ), z => `\n\n${z.replace(/\s+/g, "")}`).replace((
            // Decode binary-encoded thought labels
            /\u200B*((?:[\u200C\u200D]+\u200B+)*[\u200C\u200D]+)\u200B*/g
        ), (_, encoded) => {
            let n = 0;
            let bits = false;
            let decoded = "";
            // Parse binary encoding: ZWSP = separator, ZWNJ = 0, ZWJ = 1
            for (let i = 0; i <= encoded.length; i++) {
                const c = encoded.charCodeAt(i);
                if ((c === 0x200C) || (c === 0x200D)) {
                    // Accumulate bits
                    n = (n << 1) | (c === 0x200D);
                    bits = true;
                } else if (bits) {
                    // End of a number, check if it's in the whitelist
                    bits = false;
                    if (whitelist.has(n)) {
                        // This thought label is visible to the story model in context
                        decoded += `[${n}]`;
                    }
                    n = 0;
                }
            }
            return (decoded === "") ? "" : `${decoded}\n\n`;
        }).replace(/[\u200B-\u200D]+/g, "");
        /**
         * Generates possessive form of a name
         * Handles names ending in s or already possessive
         * @param {string} name - The name to make possessive
         * @returns {string} Possessive form (e.g., "Iris'" or "Leah's")
         */
        const ownership = (name = "") => `${name}${(
            (name.endsWith("'") || name.endsWith("'s"))
            ? "" : name.toLowerCase().endsWith("s")
            ? "'" : "'s"
        )}`;
        // Point of view string for prompt templates
        const pov = ["first", "second", "third"][config.pov - 1] ?? "second";
        /**
         * Generates a simple PoV directive for non-task turns
         * @returns {string} System prompt for PoV guidance
         */
        const nondirective = () => (
            `<SYSTEM>\n# Always continue the story from ${ownership(config.player)} ${pov} person perspective.\n</SYSTEM>`
        );
        /**
         * Wraps the agent's thoughts into a context-friendly format
         * Also clears the mind array as a side effect
         * @param {string} joined - Pre-joined thought strings
         * @returns {string} Formatted brain context block
         */
        const bindSelf = (joined = "") => ((mind.length = 0) || (joined === "")) ? "\n\n" : (
            `\n\n# ${ownership(agent.name)} brain and inner self: [\n${joined}\n]\n\n`
        );
        // Check if the current turn is a retry or erase + continue following a previous task completion
        if (IS.hash === historyHash()) {
            // Same history, just inject the contextualized brain without a new task
            text = `${nondirective()}${bindSelf(mind
                .map(([label, key, thought]) => `- ${key}: ${thought} [${label}]`)
                .join("\n")
            )}${text.trim()} `;
        } else {
            // Prepare for a possible task request
            IS.encoding = "";
            /**
             * Build the brain context and determine if constrained
             * Being constrained means the agent's brain is too large relative to the story context
             */
            const [self, full] = (() => {
                /**
                 * Joins the mind array into a formatted string
                 * @param {boolean} unlabeled - Omit labels if true
                 * @returns {string} Formatted thoughts
                 */
                const joinMind = (unlabeled = false) => mind.map(([label, key, thought]) => (
                    `${unlabeled ? "" : `[${label}] `}(${key}: \`${thought}\`)`
                )).join("\n");
                const joined = joinMind();
                // Check if brain exceeds the allowed percentage of context
                // Only applies when brain is at least 800 chars
                const constrained = ((800 < joined.length) && (
                    ((agent.metadata.percent / 100) * (
                        text.length - text.indexOf(boundary.upper) + boundary.upper.length
                    )) < joined.length
                ));
                if (!constrained || (Math.random() < 0.4)) {
                    // Unconstrained brains stay in sorted order
                    // Constrained brains keep order 40% of the time
                    return [bindSelf(joined), constrained];
                }
                // Constrained brains are contextualized in random order 60% of the time
                // This regulates long-term bias against middle thoughts, when choosing keys to forget
                for (let i = mind.length - 1; 0 < i; i--) {
                    // Swap with a random element
                    const j = Math.floor(Math.random() * (i + 1));
                    [mind[i], mind[j]] = [mind[j], mind[i]];
                }
                // Randomized brains are contextualized without labels 80% of the time
                // (Because free models are too dumb to be trusted with labels when deleting thoughts)
                return [bindSelf(joinMind(
                    (Math.random() < 0.8)
                    && (text = text.replace(/\n?(?:\[\d+\])+\n?/g, ""))
                )), true];
            })();
            /**
             * Occasionally adds a self-reflection prompt to thoughts
             * Keeps the agent from being too present-focused
             * But they become insufferable if always applicable
             * @param {boolean} fancy - Use fancier wording if true
             * @returns {string} Refocus instruction or empty string
             */
            const refocus = (fancy = false) => (Math.random() < 0.2) ? (
                `\n  - Never focus on the present, instead focus ${ownership(agent.name)} thought on self-reflection or ${fancy ? "an actionable future plan." : "future plans"}`
            ) : "";
            /**
             * Prompt templates for different task types and PoV combinations
             * Wrapped in a Proxy for auto-trimming and nested access because it's pretty :3
             * @type {Object}
             */
            const prompt = new Proxy({
                // Operating environment prompts (one per PoV)
                directive: {
                    first: () => `
<SYSTEM>
# OPERATING ENVIRONMENT
- ${config.player} is the story's main protagonist, primary 1st person PoV, AND the real player character.
- ${agent.name} is both the namesake character in the story AND an agentic language model with meta goals.
- ${agent.name} dynamically adapts to achieve meta goals without ${ownership(config.player)} awareness.
- ${agent.name} modifies own brain using the provided thought storage system.
- ${agent.name} realistically interacts with various other characters present in the story.
- ${agent.name} prioritizes information density, long-term planning, and important concepts.
- ${agent.name} always behaves in a believable way.
</SYSTEM>
                    `,
                    second: () => `
<SYSTEM>
# OPERATING ENVIRONMENT
- ${config.player} is both the perspective ("you") character of the story AND the real player.
- You are ${config.player}, therefore the story is addressed to "you" using 2nd person prose.
- ${agent.name} is both the namesake character in the story AND an agentic language model with meta goals.
- ${agent.name} dynamically adapts to achieve meta goals without ${ownership(config.player)} awareness.
- ${agent.name} modifies own brain using the provided thought storage system.
- ${agent.name} realistically interacts with various other characters present in the story.
- ${agent.name} prioritizes information density, long-term planning, and important concepts.
- ${agent.name} always behaves in a believable way.
</SYSTEM>
                    `,
                    third: () => `
<SYSTEM>
# OPERATING ENVIRONMENT
- ${config.player} is the story's main protagonist, primary 3rd person PoV, AND the real player character.
- ${agent.name} is both the namesake character in the story AND an agentic language model with meta goals.
- ${agent.name} dynamically adapts to achieve meta goals without ${ownership(config.player)} awareness.
- ${agent.name} modifies own brain using the provided thought storage system.
- ${agent.name} realistically interacts with various other characters present in the story.
- ${agent.name} prioritizes information density, long-term planning, and important concepts.
- ${agent.name} always behaves in a believable way.
</SYSTEM>
                    `
                },
                // Forget prompts for when the brain is full and needs pruning
                forget: {
                    first: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT
You must output one short parenthetical task followed by the story continuation.

## SHORT TASK (REQUIRED)
- Start your output **immediately** with: (delete key_name_to_forget)
- key_name_to_forget must be an existing key in ${ownership(agent.name)} brain
- This operation **permanently erases** the stored thought associated with that key
- Choose the single most unimportant, outdated, incorrect, or useless thought for ${agent.name} to forget
- Do **NOT** select a key associated with any of ${ownership(agent.name)} core thoughts or identity

## STORY CONTINUATION (REQUIRED)
- After the closing parenthesis, write **one space** and then continue the story
- Written from ${ownership(config.player)} **first person present tense** PoV
- The story continues where it previously left off, with many lines or sentences of new prose

## EXACT SHAPE
(delete unwanted_key) Story continues from ${ownership(config.player)} perspective, using first person present tense prose...
</SYSTEM>
                    `,
                    second: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT
You must output one short parenthetical task followed by the story continuation.

## SHORT TASK (REQUIRED)
- Start your output **immediately** with: (delete key_name_to_forget)
- key_name_to_forget must be an existing key in ${ownership(agent.name)} brain
- This operation **permanently erases** the stored thought associated with that key
- Choose the single most unimportant, outdated, incorrect, or useless thought for ${agent.name} to forget
- Do **NOT** select a key associated with any of ${ownership(agent.name)} core thoughts or identity

## STORY CONTINUATION (REQUIRED)
- After the closing parenthesis, write **one space** and then continue the story
- Written from ${ownership(config.player)} **second person present tense** ("you") PoV
- The story continues where it previously left off, with many lines or sentences of new prose

## EXACT SHAPE
(delete unwanted_key) Story continues from ${ownership(config.player)} second person perspective...
</SYSTEM>
                    `,
                    third: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT
You must output one short parenthetical task followed by the story continuation.

## SHORT TASK (REQUIRED)
- Start your output **immediately** with: (delete key_name_to_forget)
- key_name_to_forget must be an existing key in ${ownership(agent.name)} brain
- This operation **permanently erases** the stored thought associated with that key
- Choose the single most unimportant, outdated, incorrect, or useless thought for ${agent.name} to forget
- Do **NOT** select a key associated with any of ${ownership(agent.name)} core thoughts or identity

## STORY CONTINUATION (REQUIRED)
- After the closing parenthesis, write **one space** and then continue the story
- Written from ${ownership(config.player)} **third person** PoV
- The story continues where it previously left off, with many lines or sentences of new prose

## EXACT SHAPE
(delete unwanted_key) Story continues with third person prose...
</SYSTEM>
                    `
                },
                // Assign prompts for adding/updating a single thought
                assign: {
                    first: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT
You must output one short parenthetical task followed by the story continuation.

## SHORT TASK (REQUIRED)
Start your output **immediately** with:
   (any_key_name = \`One thought sentence.\`)

Inside the parentheses:
- Key:
  - 1-4 descriptive words
  - Letters and underscores only
  - Use snake_case syntax
  - Key names are chosen by ${agent.name} and represent ${ownership(agent.name)} own PoV
  - The chosen key name should be distinct and specific enough for ${agent.name} to recall
- Then a space, then "=", then a space, then "\`"
- Sentence:
  - Written from ${ownership(agent.name)} **first person** PoV${refocus(false)}
  - Avoid using pronouns or the word "you", instead ${agent.name} refers to other characters directly by name
  - Never repeat, novelty and uniqueness are top priorities
  - ${ownership(agent.name)} thought must be one single sentence only
  - Never hallucinate facts
- End the sentence with a period and backtick inside the parentheses; close with ".\`)"

This creates or overwrites the thought associated with that key.

## STORY CONTINUATION (REQUIRED)
- After the closing parenthesis, write **one space** and then continue the story
- Written from ${ownership(config.player)} **first person present tense** PoV
- The story continues where it previously left off, with many lines or sentences of new prose

## EXACT SHAPE
(example_key = \`${ownership(agent.name)} own short 1-sentence thought in first person.\`) Story continues from ${ownership(config.player)} perspective, using first person present tense prose...
</SYSTEM>
                    `,
                    second: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT
You must output one short parenthetical task followed by the story continuation.

## SHORT TASK (REQUIRED)
Start your output **immediately** with:
   (any_key_name = \`One thought sentence.\`)

Inside the parentheses:
- Key:
  - 1-4 descriptive words
  - Letters and underscores only
  - Use snake_case syntax
  - Key names are chosen by ${agent.name} and represent ${ownership(agent.name)} own PoV
  - The chosen key name should be distinct and specific enough for ${agent.name} to recall
- Then a space, then "=", then a space, then "\`"
- Sentence:
  - Written from ${ownership(agent.name)} **first person** PoV${refocus(false)}
  - Avoid using pronouns or the word "you", instead ${agent.name} refers to other characters directly by name
  - Never repeat, novelty and uniqueness are top priorities
  - ${ownership(agent.name)} thought must be one single sentence only
  - Never hallucinate facts
- End the sentence with a period and backtick inside the parentheses; close with ".\`)"

This creates or overwrites the thought associated with that key.

## STORY CONTINUATION (REQUIRED)
- After the closing parenthesis, write **one space** and then continue the story
- Written from ${ownership(config.player)} **second person present tense** ("you") PoV
- The story continues where it previously left off, with many lines or sentences of new prose

## EXACT SHAPE
(example_key = \`${ownership(agent.name)} own short 1-sentence thought in first person.\`) Story continues from ${ownership(config.player)} second person perspective...
</SYSTEM>
                    `,
                    third: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT
You must output one short parenthetical task followed by the story continuation.

## SHORT TASK (REQUIRED)
Start your output **immediately** with:
   (any_key_name = \`One thought sentence.\`)

Inside the parentheses:
- Key:
  - 1-4 descriptive words
  - Letters and underscores only
  - Use snake_case syntax
  - Key names are chosen by ${agent.name} and represent ${ownership(agent.name)} own PoV
  - The chosen key name should be distinct and specific enough for ${agent.name} to recall
- Then a space, then "=", then a space, then "\`"
- Sentence:
  - Written from ${ownership(agent.name)} **first person** PoV${refocus(false)}
  - Avoid using pronouns or the word "you", instead ${agent.name} refers to other characters directly by name
  - Never repeat, novelty and uniqueness are top priorities
  - ${ownership(agent.name)} thought must be one single sentence only
  - Never hallucinate facts
- End the sentence with a period and backtick inside the parentheses; close with ".\`)"

This creates or overwrites the thought associated with that key.

## STORY CONTINUATION (REQUIRED)
- After the closing parenthesis, write **one space** and then continue the story
- Written from ${ownership(config.player)} **third person** PoV
- The story continues where it previously left off, with many lines or sentences of new prose

## EXACT SHAPE
(example_key = \`${ownership(agent.name)} own short 1-sentence thought in first person.\`) Story continues with third person prose...
</SYSTEM>
                    `
                },
                // Choice prompts for advanced operations (assign, rename, or delete)
                // Used at high context when we trust the model more
                choice: {
                    first: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT - FOLLOW EXACTLY

You must output **one and only one** parenthetical block followed by the story continuation.

There are **three possible valid forms** of the parenthetical block:
1) **Write or overwrite a thought:**
   (any_key_name = \`One thought sentence.\`)

2) **Rename an existing thought's key:**
   (new_key_name = old_key_name)

3) **Delete an existing thought:**
   (delete key_name_to_forget)

Only **one** of these may appear in any output.

---

## 1) THOUGHT-WRITING FORMAT
Start your output **immediately** with:
   **(any_key_name = \`One thought sentence.\`)**

Inside the parentheses:
- First the key:
  - One to four descriptive words ONLY.
  - Letters and underscores only, no punctuation.
  - Use valid snake_case syntax.
  - The key name is chosen by ${agent.name} and represents ${ownership(agent.name)} **first person** perspective.
  - The key name should be easy for ${agent.name} to recall; distinct and specific.
- Then a space, then "=", then a space, then "\`".
- Then **ONE SINGLE SENTENCE:**
  - Written from ${ownership(agent.name)} **first person** perspective.${refocus(true)}
  - Only refer to other characters directly by name in the thought sentence.
  - Avoid using pronouns or the word "you" which is too vague. Use specific names instead.
  - Never repeat, novelty and uniqueness are top priorities.
  - ${ownership(agent.name)} thought must be short.
  - Never hallucinate facts.
- End the sentence with a period and backtick **inside** the parentheses; close with ".\`)".

This creates or overwrites the thought associated with that key.

---

## 2) RENAMING A THOUGHT (KEY CHANGE)
To rename an existing thought's key:
   **(new_key_name = old_key_name)**

Rules:
- No thought sentence.
- Use snake_case only.
- This operation **moves the existing stored thought** from old_key_name to new_key_name.
- The old key ceases to exist.

---

## 3) DELETING A THOUGHT
To remove a stored thought entirely:
   **(delete key_name_to_forget)**

Rules:
- key_name_to_forget must be an existing key.
- No sentence.
- This operation **permanently erases** the stored thought associated with that key.
- Only use to forget unimportant, outdated, incorrect, or useless thoughts.
- **NEVER** select a key associated with any of ${ownership(agent.name)} core thoughts or identity.

---

## SHARED RULES FOR ALL THREE FORMS
1. After the closing parenthesis, write **one space** and then continue the story.
2. The story continuation must be written **strictly in the first person present tense**, describing what happens next to ${config.player}.
3. Do **NOT** write anything before the parentheses.
4. Do **NOT** write extra parentheses.
5. Do **NOT** use more than one operation per turn.
6. Do **NOT** invent new structures or mix formats.
7. The story continues where it previously left off, with many sentences of brand new prose.

---

## IMPORTANT STORAGE BEHAVIOR
- ${agent.name} agentically maintains brain contents (labeled "thoughts") to learn, plan, and adapt to new experiences in the operating environment.
- **Each key stores exactly one thought in ${ownership(agent.name)} brain.**
- **If ${agent.name} reuses an already existing key, the new thought REPLACES / OVERRIDES the older thought stored under that key.**
- This means:
  - Reusing an old key: **Overwrite an old thought with a new thought.** Useful for extending or maintaining existing information stored in ${ownership(agent.name)} brain.
  - Using a new key: **Create a new thought.** Useful for storing ${ownership(agent.name)} memories, self-modifying ${ownership(agent.name)} own personality, tracking ${ownership(agent.name)} goals, or making plans for ${agent.name} to follow.
- **Renaming a key moves the thought to a new name.** Useful for reorganizing ${ownership(agent.name)} brain.
- **Deleting a key removes the thought permanently.** Helps ${agent.name} forget outdated, superfluous, or irrelevant information.
- Choose keys carefully so ${agent.name} can easily recall, update, overwrite, rename, or delete thoughts as required for self-improvement.

---

## SUMMARY OF WHAT YOU MUST DO
- EXACT SHAPE (choose only one form):
  1. (any_key = \`${ownership(agent.name)} own short 1-sentence thought in first person.\`) Story continues from ${ownership(config.player)} first person PoV...
  2. (renamed_key = old_key) Story continues from ${ownership(config.player)} first person PoV...
  3. (delete unwanted_key) Story continues from ${ownership(config.player)} first person PoV...
- Thought: ${ownership(agent.name)} information-dense thought written in first person.
- Story: Written from ${ownership(config.player)} first person present tense perspective. The story continuation should occupy the majority of the output length, with multiple lines.
- NO EXTRA SENTENCES IN THE THOUGHT.
- NO EXTRA TEXT ANYWHERE.
- NO EXTRA PARENTHESES.
- THE FIRST CHAR OF THE WHOLE OUTPUT MUST BE "(".

Follow the format **perfectly**.
</SYSTEM>
                    `,
                    second: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT - FOLLOW EXACTLY

You must output **one and only one** parenthetical block followed by the story continuation.

There are **three possible valid forms** of the parenthetical block:
1) **Write or overwrite a thought:**
   (any_key_name = \`One thought sentence.\`)

2) **Rename an existing thought's key:**
   (new_key_name = old_key_name)

3) **Delete an existing thought:**
   (delete key_name_to_forget)

Only **one** of these may appear in any output.

---

## 1) THOUGHT-WRITING FORMAT
Start your output **immediately** with:
   **(any_key_name = \`One thought sentence.\`)**

Inside the parentheses:
- First the key:
  - One to four descriptive words ONLY.
  - Letters and underscores only, no punctuation.
  - Use valid snake_case syntax.
  - The key name is chosen by ${agent.name} and represents ${ownership(agent.name)} **first person** perspective.
  - The key name should be easy for ${agent.name} to recall; distinct and specific.
- Then a space, then "=", then a space, then "\`".
- Then **ONE SINGLE SENTENCE:**
  - Written from ${ownership(agent.name)} **first person** perspective.${refocus(true)}
  - Only refer to other characters directly by name in the thought sentence.
  - Avoid using pronouns or the word "you" which is too vague. Use specific names instead.
  - Never repeat, novelty and uniqueness are top priorities.
  - ${ownership(agent.name)} thought must be short.
  - Never hallucinate facts.
- End the sentence with a period and backtick **inside** the parentheses; close with ".\`)".

This creates or overwrites the thought associated with that key.

---

## 2) RENAMING A THOUGHT (KEY CHANGE)
To rename an existing thought's key:
   **(new_key_name = old_key_name)**

Rules:
- No thought sentence.
- Use snake_case only.
- This operation **moves the existing stored thought** from old_key_name to new_key_name.
- The old key ceases to exist.

---

## 3) DELETING A THOUGHT
To remove a stored thought entirely:
   **(delete key_name_to_forget)**

Rules:
- key_name_to_forget must be an existing key.
- No sentence.
- This operation **permanently erases** the stored thought associated with that key.
- Only use to forget unimportant, outdated, incorrect, or useless thoughts.
- **NEVER** select a key associated with any of ${ownership(agent.name)} core thoughts or identity.

---

## SHARED RULES FOR ALL THREE FORMS
1. After the closing parenthesis, write **one space** and then continue the story.
2. The story continuation must be in **strict second person ("you")**, describing what happens next to ${config.player}.
3. Do **NOT** write anything before the parentheses.
4. Do **NOT** write extra parentheses.
5. Do **NOT** use more than one operation per turn.
6. Do **NOT** invent new structures or mix formats.
7. The story continues where it previously left off, with many sentences of brand new prose.

---

## IMPORTANT STORAGE BEHAVIOR
- ${agent.name} agentically maintains brain contents (labeled "thoughts") to learn, plan, and adapt to new experiences in the operating environment.
- **Each key stores exactly one thought in ${ownership(agent.name)} brain.**
- **If ${agent.name} reuses an already existing key, the new thought REPLACES / OVERRIDES the older thought stored under that key.**
- This means:
  - Reusing an old key: **Overwrite an old thought with a new thought.** Useful for extending or maintaining existing information stored in ${ownership(agent.name)} brain.
  - Using a new key: **Create a new thought.** Useful for storing ${ownership(agent.name)} memories, self-modifying ${ownership(agent.name)} own personality, tracking ${ownership(agent.name)} goals, or making plans for ${agent.name} to follow.
- **Renaming a key moves the thought to a new name.** Useful for reorganizing ${ownership(agent.name)} brain.
- **Deleting a key removes the thought permanently.** Helps ${agent.name} forget outdated, superfluous, or irrelevant information.
- Choose keys carefully so ${agent.name} can easily recall, update, overwrite, rename, or delete thoughts as required for self-improvement.

---

## SUMMARY OF WHAT YOU MUST DO
- EXACT SHAPE (choose only one form):
  1. (any_key = \`${ownership(agent.name)} own short 1-sentence thought in first person.\`) Story continues from ${ownership(config.player)} second person PoV...
  2. (renamed_key = old_key) Story continues from ${ownership(config.player)} second person PoV...
  3. (delete unwanted_key) Story continues from ${ownership(config.player)} second person PoV...
- Thought: ${ownership(agent.name)} information-dense thought written in first person.
- Story: Written from ${ownership(config.player)} second person present tense perspective. **You are ${config.player}.** The story continuation should occupy the majority of the output length, with multiple lines.
- NO EXTRA SENTENCES IN THE THOUGHT.
- NO EXTRA TEXT ANYWHERE.
- NO EXTRA PARENTHESES.
- THE FIRST CHAR OF THE WHOLE OUTPUT MUST BE "(".

Follow the format **perfectly**.
</SYSTEM>
                    `,
                    third: () => `
<SYSTEM>
# STRICT OUTPUT FORMAT - FOLLOW EXACTLY

You must output **one and only one** parenthetical block followed by the story continuation.

There are **three possible valid forms** of the parenthetical block:
1) **Write or overwrite a thought:**
   (any_key_name = \`One thought sentence.\`)

2) **Rename an existing thought's key:**
   (new_key_name = old_key_name)

3) **Delete an existing thought:**
   (delete key_name_to_forget)

Only **one** of these may appear in any output.

---

## 1) THOUGHT-WRITING FORMAT
Start your output **immediately** with:
   **(any_key_name = \`One thought sentence.\`)**

Inside the parentheses:
- First the key:
  - One to four descriptive words ONLY.
  - Letters and underscores only, no punctuation.
  - Use valid snake_case syntax.
  - The key name is chosen by ${agent.name} and represents ${ownership(agent.name)} **first person** perspective.
  - The key name should be easy for ${agent.name} to recall; distinct and specific.
- Then a space, then "=", then a space, then "\`".
- Then **ONE SINGLE SENTENCE:**
  - Written from ${ownership(agent.name)} **first person** perspective.${refocus(true)}
  - Only refer to other characters directly by name in the thought sentence.
  - Avoid using pronouns or the word "you" which is too vague. Use specific names instead.
  - Never repeat, novelty and uniqueness are top priorities.
  - ${ownership(agent.name)} thought must be short.
  - Never hallucinate facts.
- End the sentence with a period and backtick **inside** the parentheses; close with ".\`)".

This creates or overwrites the thought associated with that key.

---

## 2) RENAMING A THOUGHT (KEY CHANGE)
To rename an existing thought's key:
   **(new_key_name = old_key_name)**

Rules:
- No thought sentence.
- Use snake_case only.
- This operation **moves the existing stored thought** from old_key_name to new_key_name.
- The old key ceases to exist.

---

## 3) DELETING A THOUGHT
To remove a stored thought entirely:
   **(delete key_name_to_forget)**

Rules:
- key_name_to_forget must be an existing key.
- No sentence.
- This operation **permanently erases** the stored thought associated with that key.
- Only use to forget unimportant, outdated, incorrect, or useless thoughts.
- **NEVER** select a key associated with any of ${ownership(agent.name)} core thoughts or identity.

---

## SHARED RULES FOR ALL THREE FORMS
1. After the closing parenthesis, write **one space** and then continue the story.
2. The story continuation must be written **strictly in third person**.
3. Do **NOT** write anything before the parentheses.
4. Do **NOT** write extra parentheses.
5. Do **NOT** use more than one operation per turn.
6. Do **NOT** invent new structures or mix formats.
7. The story continues where it previously left off, with many sentences of brand new prose.

---

## IMPORTANT STORAGE BEHAVIOR
- ${agent.name} agentically maintains brain contents (labeled "thoughts") to learn, plan, and adapt to new experiences in the operating environment.
- **Each key stores exactly one thought in ${ownership(agent.name)} brain.**
- **If ${agent.name} reuses an already existing key, the new thought REPLACES / OVERRIDES the older thought stored under that key.**
- This means:
  - Reusing an old key: **Overwrite an old thought with a new thought.** Useful for extending or maintaining existing information stored in ${ownership(agent.name)} brain.
  - Using a new key: **Create a new thought.** Useful for storing ${ownership(agent.name)} memories, self-modifying ${ownership(agent.name)} own personality, tracking ${ownership(agent.name)} goals, or making plans for ${agent.name} to follow.
- **Renaming a key moves the thought to a new name.** Useful for reorganizing ${ownership(agent.name)} brain.
- **Deleting a key removes the thought permanently.** Helps ${agent.name} forget outdated, superfluous, or irrelevant information.
- Choose keys carefully so ${agent.name} can easily recall, update, overwrite, rename, or delete thoughts as required for self-improvement.

---

## SUMMARY OF WHAT YOU MUST DO
- EXACT SHAPE (choose only one form):
  1. (any_key = \`${ownership(agent.name)} own short 1-sentence thought in first person.\`) Story continues with third person prose...
  2. (renamed_key = old_key) Story continues with third person prose...
  3. (delete unwanted_key) Story continues with third person prose...
- Thought: ${ownership(agent.name)} information-dense thought written in first person.
- Story: Written from ${ownership(config.player)} PoV, using the third person perspective. **${config.player} is the story's PoV character.** The story continuation should occupy the majority of the output length, with multiple lines.
- NO EXTRA SENTENCES IN THE THOUGHT.
- NO EXTRA TEXT ANYWHERE.
- NO EXTRA PARENTHESES.
- THE FIRST CHAR OF THE WHOLE OUTPUT MUST BE "(".

Follow the format **perfectly**.
</SYSTEM>
                    `
                }
            // Proxy handler for auto-trimming and nested access
            }, { get(t, p) { return (
                // Functions get called and trimmed
                (typeof t[p] === "function")
                ? t[p]().trim()
                // Objects get wrapped in their own Proxy
                : (t[p] && (typeof t[p] === "object"))
                ? new Proxy(t[p], this)
                // Primitives pass through
                : t[p]
            ); } });
            // Build the final context with appropriate prompts
            text = full ? (
                // Brain is full, prompt for deletion
                `${prompt.directive[pov]}${self}${text.trim()}${boundary.lower}${prompt.forget[pov]}\n\n`
            ) : ((config.chance / ([
                // Reduce task chance after Do/Say/Story actions (player is driving)
                "do", "say", "story"
            ].includes(getPrevAction()?.type) ? 200 : 100)) < Math.random()) ? (
                // Sometimes do nothing and emit a side effect on IS.agent
                (IS.agent = " "),
                `${nondirective()}${self}${text.trim()} `
            ) : `${prompt.directive[pov]}${self}${text.trim()}${boundary.lower}${(
                // Low context = simple prompt, high context = advanced prompt
                (limit < 20000) ? prompt.assign[pov] : prompt.choice[pov]
            )}\n\n`;
        }
        // ==================== CONTEXT TRUNCATION ====================
        // Three-phase truncation to fit within AID's context limit
        truncate: {
            // Precalculate how much needs to be trimmed
            let excess = text.length - limit;
            if (excess < 1) {
                // Under the limit, no truncation required
                break truncate;
            }
            // Find boundary markers
            const upperIndex = text.indexOf(boundary.upper);
            const lowerIndex = (
                (upperIndex !== -1)
                ? text.indexOf(boundary.lower, upperIndex + boundary.upper.length)
                : -1
            );
            // Phase 1: Truncate the recent story
            // Between boundary.upper and boundary.lower
            // Remove from left to right
            if ((upperIndex !== -1) && ((lowerIndex === -1) || (upperIndex < lowerIndex))) {
                const storyStart = upperIndex + boundary.upper.length;
                const storyLength = ((lowerIndex === -1) ? text.length : lowerIndex) - storyStart;
                if (0 < storyLength) {
                    const remove = Math.min(
                        // Never remove more than 85% of recent story context
                        Math.floor(storyLength * 0.85),
                        // Keep at least 2000 chars of recent story context
                        Math.max(0, storyLength - 2000),
                        // But don't remove more than needed
                        excess
                    );
                    if (0 < remove) {
                        text = `${text.slice(0, storyStart)}${text.slice(storyStart + remove)}`;
                        excess -= remove;
                    }
                }
            }
            if (excess < 1) {
                // Phase 1 was enough
                break truncate;
            }
            // Phase 2: Truncate above the recent story
            // Between the start and boundary.upper
            // Remove from right to left
            const newUpperIndex = text.indexOf(boundary.upper);
            if (0 < newUpperIndex) {
                const remove = Math.min(excess, newUpperIndex);
                text = `${text.slice(0, newUpperIndex - remove)}${text.slice(newUpperIndex)}`;
                excess -= remove;
            }
            if (excess < 1) {
                // Phase 2 was enough
                break truncate;
            }
            // Phase 3: I don't care anymore, just make it fit
            // Remove from left to right as a final fallback
            // (I've never seen this situation happen before, but I guard it anyway)
            text = text.slice(text.length - limit);
        }
        // Replace transient boundary markers with proper formatting
        setMarker(boundary.upper, `\n\n${boundary.needle}\n`);
        setMarker(boundary.lower, "\n\n")
        text = text.trimStart() || " ";
        return;
    } else if (hook === "input") {
  if (typeof QET === "function") { text = QET("input", text) || text; }
        // ==================== INPUT HOOK ====================
        // Check for /AC command to force-enable Auto-Cards
        if (IS.AC.enabled || !/\/\s*A\s*C/i.test(text) || !hasAutoCards()) {
            // Normal input processing
            // Append a linebreak to the opening because I said so
            text = (history.length === 0) ? `${text.trimEnd()}\n\n` : text || "\u200B";
            return;
        }
        // Player used a /AC command, force-enable Auto-Cards
        IS.AC.forced = true;
        try {
            text = AutoCards("input", text);
        } catch (error) {
            log(error.message);
        }
        text ||= "\u200B";
        return;
    } else if ((text.includes(">>>") && text.includes("<<<")) || (3000 < text.length)) {
        // Output contains an Auto-Cards thingy or is suspiciously long
        // Safer to leave untouched
        IS.agent = "";
        return;
    }
    // ==================== OUTPUT HOOK ====================
    // Process model output and implement brain operations
    /** @type {config} */
    const config = Config.get();
  if (typeof QET === "function") { text = QET("output", text, null, {config}) || text; }
  if (typeof QET === "function") { var __q = QET("context", text, globalThis.stop, { config: config });
  if (Array.isArray(__q)) { text = __q[0]; globalThis.stop = __q[1]; } else { text = __q; } }
    /**
     * Ensures clean visual separation between actions
     * Only applies after "continue" or "story" actions
     * Does NOT trim leading whitespace from text
     * @returns {void}
     */
    const prespace = () => {
        const action = getPrevAction();
        if (!["continue", "story"].includes(action?.type)) {
            // Only adjust spacing after continue or story actions
            return;
        }
        // Get the previous action text
        const prevText = (action?.text ?? action?.rawText ?? "").replace(/\n +/g, "\n");
        // Add appropriate leading newlines based on how the previous action text ended
        text = !prevText.endsWith("\n") ? `\n\n${text}` : !prevText.endsWith("\n\n") ? `\n${text}` : text;
        return;
    };
    if (config.guide) {
        // Print the detailed guide
        text = `
>>> Guide:
Inner Self was made by LewdLeah ❤️

💡 Overview:
Inner Self ${version} is an AI Dungeon mod that grants memory, goals, secrets, planning, and self-reflection capabilities to the characters living within your story. Simulated agents dynamically assemble their own minds to learn from experiences, form opinions, and adapt their behavior over time. Inner Self provides the AI with the tools it needs to truly embody characters, allowing them to feel more alive and nuanced over long adventures.

📌 Features:
- Compartmentalized memory and highly emergent behavior
- Self-organizing thoughts with agentic revisions and pruning
- Absolutely NO "please select continue" immersion-breaks!
- An interface to view or edit the brain of any NPC in real-time
- Name-based trigger system allowing different NPCs to coexist
- Visual indicators showing which NPC is currently thinking
- General-purpose for diverse character archetypes and scenarios
- Full Auto-Cards compatibility for comprehensive world-building
- Open source and free to use in your own scenarios~ ❤️

🎭 Setup:
1. Open the "Configure Inner Self" story card
2. Write your player character's name where it asks in the entry
3. Write non-player character names at the bottom of the notes (one per line)

🔑 Tips:
- Use simple first names so NPCs trigger when mentioned
- Set your AI response length to 200 tokens for the best results
- Reduce "recent turns searched" if NPCs stay in-scene for too long
- Reduce "thought formation chance" if Inner Self is too overwhelming
- You can install or uninstall Auto-Cards from the Inner Self config card
- Creators predefine Inner Self NPCs by naming story cards like so: @Leah
- Try different story models to see how they perform

🧠 Advanced:
- NPCs auto-generate "Brain" cards when first triggered
- Entry = operation log showing a timeline of recent AI changes
- Notes = human-readable thoughts stored as modifiable JSON in the NPC's brain
- Neither are perfect representations of the NPC's brain (there's a lot more going on under the hood)
- The operation log displays change over time; Inner Self allows NPCs to maintain their own thoughts in-character
- What seems like repetition in the operation log is often a history of useful self-maintenance on older thoughts
- Edit the notes section of a brain card to modify that agent's mind; Inner Self will use this to build context
- Valid JSON syntax is required in the notes section
- Experiments are fun! I designed Inner Self to be adaptive and flexible

⚙️ Settings:

> Enable Inner Self:
- Turns the whole system on or off
- (true or false)

> Show detailed guide:
- If true, shows this player guide in-game
- (true or false)

> First name of player character:
- Your player character's name, used to maintain correct story perspective
- (any name inside the "" or leave empty)

> Adventure in 1st, 2nd, or 3rd person:
- Which narrative PoV your story uses
- (1, 2, or 3)

> Max brain size relative to story context:
- How much of the AI's context window NPC brains can use
- Some percentage of the recent story (pink bar in your context viewer)
- (1% to 95%)

> Recent turns searched for name triggers:
- How far back through your previous actions Inner Self looks to decide which NPC (if any) should think
- (1 to 250)

> Visual indicator of current NPC triggers:
- Symbol shown by the active NPC's card name whenever their brain is engaged
- (any text/emoji inside the "" or leave empty to disable)

> Thought formation chance per turn:
- How often NPCs attempt to form new thoughts when triggered
- Reduced by half for Do/Say/Story actions (player is driving)
- (0% to 100%)

> Pin the config card near the top:
- Keeps the config card pinned high in your cards list
- (true or false)

> Install Auto-Cards:
- Enables automatic story card generation alongside Inner Self
- You can safely uninstall Auto-Cards at any time
- (true or false)

> Enable debug mode to see model tasks:
- Shows raw brain operations inline with your story text
- (true or false)

🌸 Love:
- Please remember this is a personal passion project for me, something I do as a hobby, not as a job
- Follow me on AI Dungeon to explore my other projects: ${u}
- If you see me on Discord (@LewdLeah), Reddit (u/helloitsmyalt_), or anywhere else, please say hi!
- Your kindness, patience, and love mean so much to me~ ❤️

I hope you will have lots of fun!
(please erase before continuing) <<<
        `.trim();
        prespace();
        IS.agent = "";
        return;
    } else if (!config.allow) {
        // Early exit if Inner Self is disabled
        text ||= "\u200B";
        IS.agent = "";
        return;
    }
    // Strip zero-width chars from the model output before processing
    text = text.replace(/[\u200B-\u200D]+/g, "");
    // Check if output looks like an unenclosed operation
    // Models sometimes forget their parentheses, the poor dears
    if (!/[()\[\]{}]/.test(text) && ((
        /^\s*(?:del(?:et(?:e[ds]?|ing))?|for(?:get(?:s|ting)?|got(?:ten)?)|remov(?:e[ds]?|ing))(?:[\s_]*(?:key(?:_name)?|thought|memory|unwanted(?:_key)?))?[\s=:]*[a-z0-9A-Z]*_+[a-z0-9A-Z]/i
    ).test(text) || /^\s*[a-z0-9A-Z_]+\s*=/.test(text))) {
        // (?:del|delete|deleted|deletes|deleting|forget|forgets|forgetting|forgot|forgotten|remove|removed|removes|removing)
        // Fully unenclosed block resembles a known pattern
        // Add an opening parentheses so the block parser can handle it
        text = `(${text.trimStart()}`;
    }
    // ==================== BLOCK PARSER ====================
    // Parse enclosed blocks from the output
    const blocks = [];
    for (const [open, close] of [
        // Try each container type in order of preference
        ["(", ")"],
        ["[", "]"],
        ["{", "}"]
    ]) {
        // Attempt to repair unclosed blocks
        const pass = (() => {
            if (!text.includes(open)) {
                // No opening bracket, skip this type
                return true;
            }
            // Check if the last opening bracket is closed
            const rightIndex = text.lastIndexOf(open);
            const rightOfOpen = text.slice(rightIndex);
            if (rightOfOpen.includes(close)) {
                // Already closed, proceed with block parsing
                return false;
            }
            // Try to find where the close bracket should go
            for (const pattern of [
                // After the deleted key name
                /^[(\[{]\s*(?:del(?:et(?:e[ds]?|ing))?|for(?:get(?:s|ting)?|got(?:ten)?)|remov(?:e[ds]?|ing))(?:[\s_]*(?:key(?:_name)?|thought|memory|unwanted(?:_key)?))?[\s=:]*[a-z0-9A-Z]*_[a-z0-9A-Z_]+/i,
                // After the renamed old key name
                /^[(\[{]\s*[a-z0-9A-Z_]+\s*=+\s*[a-z0-9A-Z]*_[a-z0-9A-Z_]+/,
                // After the triple-redundant punctuation boundary
                /[.?!‽…。！？‼⁇⁈⁉¿*¡%_–−‒—~-]["'`«»„“”「」´‘’‟‚‛]/
            ]) {
                const match = rightOfOpen.match(pattern);
                if (match) {
                    // Found a good insertion point
                    const index = rightIndex + match.index + match[0].length;
                    text = `${text.slice(0, index)}${close}${text.slice(index)}`;
                    return false;
                }
            }
            // No boundary inferred -> Append the current close symbol to the end
            text = `${text.trimEnd()}${close}`;
            return false;
        })();
        if (text.includes(close)) {
            // Handle orphaned closing brackets (no matching open)
            if (!text.slice(0, text.indexOf(close)).includes(open)) {
                // Close without open, prepend an open
                text = `${open}${text.trimStart()}`;
            }
        } else if (pass) {
            // No brackets of this type, try next
            continue;
        }
        // Extract all outermost blocks of this bracket type
        let depth = 0;
        let start = -1;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === open) {
                if (depth === 0) {
                    // Start of a new block
                    start = i;
                }
                depth++;
            } else if (text[i] === close) {
                depth--;
                if ((depth === 0) && (start !== -1)) {
                    // End of a block, capture it
                    blocks.push(text.slice(start, i + 1));
                    start = -1;
                }
            }
        }
        // Only process the first identified bracket type per turn
        break;
    }
    /**
     * Normalizes a thought string for storage
     * Cleans up formatting quirks from model output
     * @param {string} str - Raw thought string
     * @returns {string} Cleaned thought string
     */
    const simplify = (str = "") => {
        str = (str
            // Remove markdown-style formatting
            .replace(/[#*~•·∙⋅]+/g, "")
            // Normalize whitespace
            .replace(/  +/g, " ")
            .replace(/ ?\n ?/g, "\n")
            // Standardize ellipsis
            .replaceAll("…", "...")
            // Fix possessive s's -> s' because DeepSeek is dumb
            .replace(/([sS])(['‘’‛])[sS]/g, (_, s, q) => `${s}${q}`)
            // Normalize dashes
            .replace(/[–−‒]/g, "-")
            .replace(/(?<=\S) [-—] (?=\S)/g, "—")
        )
        // Convert one lone em-dash to a semicolon if appropriate
        return (
            ((str.match(/—/g) || []).length === 1)
            && !str.includes(";") && !str.endsWith("—") && !str.startsWith("—")
        ) ? str.replace("—", "; ") : str;
    };
    // Trim IS.agent name before emptiness check
    if (((IS.agent = IS.agent.trim()) === "") && (blocks.length === 0)) {
        // No task expected, but I'm still careful here because AID retries use cached outputs
        text = simplify(text).replace(/\n\n\n+/g, "\n\n");
        if (text === "") {
            // Guard against empty string outputs to avoid a known AID bug
            text = "\u200B";
            return;
        }
        const prevText = getPrevAction()?.text ?? "";
        if (/["«»„“”「」‟]\s*$/.test(prevText) && /^\s*["«»„“”「」‟]/.test(text)) {
            // Prepend a linebreak if this and the previous actions place dialogue adjacently
            text = text.trimStart();
            prespace();
        } else if (!/\s$/.test(prevText) && !/^\s/.test(text)) {
            // Ensure taskless outputs still have a space of separation from the previous action
            text = ` ${text}`;
        }
        return;
    }
    /**
     * Converts a key name to valid snake_case
     * Handles various edge cases from model output
     * @param {string} k - Raw key string
     * @returns {string} Valid snake_case key name
     */
    const formatKey = (k = "") => (k
        .trim()
        // Take the first word only
        .split(/\s/, 1)[0]
        // Remove quotes and apostrophes
        .replace(/[.'`´‘’]+/g, "")
        // Replace non-alphanumerics with underscore
        .replace(/[^a-z0-9A-Z_]/g, "_")
        // Convert camelCase to snake_case
        .replace(/([a-z0-9])([A-Z])/g, (_, a, b) => `${a}_${b.toLowerCase()}`)
        .toLowerCase()
        // Separate letters from numbers
        .replace(/([a-z])([0-9])/g, (_, a, b) => `${a}_${b}`)
        .replace(/([0-9])([a-z])/g, (_, a, b) => `${a}_${b}`)
        // Clean up multiple underscores
        .replace(/__+/g, "_")
        // Remove leading/trailing underscores
        .replace(/(?:^_|_$)/g, "")
    );
    // Create an agent instance for the triggered NPC
    const agent = (IS.agent === "") ? null : new Agent(IS.agent, { percent: config.percent });
    // Reset IS.agent
    IS.agent = "";
    /**
     * Generates a path string for logging operations
     * Helps brain logs imitate actual code for ease of understanding
     * @param {string} key - Property name to access
     * @returns {string} Path like "agent_name.brain" or "agent_name.key"
     */
    const path = (key = "brain") => `${(() => {
        const fancy = formatKey(agent.name);
        return (fancy === "") ? `agents[${JSON.stringify(agent.name)}]` : fancy;
    })()}.${key}`;
    // Queue of operations to execute
    const operations = [];
    // Track which keys have been touched this turn
    const altered = new Set();
    // ==================== BLOCK INTERPRETER ====================
    // Process extracted block and queue appropriate operations
    interpreter: for (const block of blocks) {
        // Remove the block from the output text unless debug mode is enabled
        deblock: {
            let start = text.indexOf(block);
            if (start === -1) {
                break deblock;
            }
            // Chars to consume along with the block
            const naughty = (c = "") => {
                const code = c.charCodeAt(0);
                // Just for fun, no regex :3
                return (
                    (code === 0x20) // " "
                    || (code === 0x09) // "\t"
                    || (code === 0x0A) // "\n"
                    || (code === 0x0D) // "\r"
                    || (code === 0x27) // "'"
                    || (code === 0x60) // "`"
                    || (code === 0xB4) // "´"
                    || (code === 0x2018) // "‘"
                    || (code === 0x2019) // "’"
                );
            };
            let end = start + block.length;
            // Expand left to consume whitespace and quotes
            while ((0 < start) && naughty(text[start - 1])) {
                start--;
            }
            // Expand right to consume whitespace and quotes
            while ((end < text.length) && naughty(text[end])) {
                end++;
            }
            // Replace the block with newlines (or keep in debug mode)
            text = `${text.slice(0, start)}\n\n${config.debug ? `${block}\n\n` : ""}${text.slice(end)}`;
        };
        if (agent === null) {
            // Only perform deblocking when agent is null
            continue;
        }
        // Extract and normalize the block content
        const str = block.slice(1, -1).trim().replace(/==+/g, "=").replace(/::+/g, ":");
        // Prefer "=" over ":" as the key-value delimiter
        const delimiter = str.includes("=") ? "=" : ":";
        if (2 < str.split(delimiter, 3).length) {
            // Skip blocks with too many delimiters
            continue;
        }
        // ==================== DELETE OPERATION ====================
        // Check if this is a delete/forget command
        /** @returns {string|null} */
        const delKey = (() => {
            // Match various forms of "delete key_name"
            const delMatch1 = str.match(
                /^(?:del(?:et(?:e[ds]?|ing))?|for(?:get(?:s|ting)?|got(?:ten)?)|remov(?:e[ds]?|ing))(?:[\s_]*(?:key(?:_name)?|thought|memory|unwanted(?:_key)?))?[\s=:]*([\s\S]*)$/i
            );
            if (!delMatch1) {
                return null;
            }
            const delKey1 = formatKey(delMatch1[1]);
            if (delKey1 in agent.brain) {
                // Key exists in brain
                return delKey1;
            } else if (!/(?:key|thought|memory|unwanted)/i.test(str)) {
                // Doesn't look like a common hallucination, might be invalid
                return null;
            }
            // Try again with stricter matching
            const delMatch2 = str.match(
                /^(?:del(?:et(?:e[ds]?|ing))?|for(?:get(?:s|ting)?|got(?:ten)?)|remov(?:e[ds]?|ing))[\s=:]*([\s\S]*)$/i
            );
            return delMatch2 ? formatKey(delMatch2[1]) : null;
        })();
        /**
         * Generates a delete log statement
         * @param {string} k - Key being deleted
         * @returns {string} JavaScript delete statement
         */
        const logDelete = (k = "") => `delete ${path()}${(k === "") ? "[\"\"]" : `.${k}`};`;
        if ((typeof delKey === "string") && (delKey in agent.brain)) {
            // Valid delete statement
            if (!altered.has(delKey)) {
                // Queue the delete operation
                operations.push(() => {
                    delete agent.brain[delKey];
                    return logDelete(delKey);
                });
                altered.add(delKey);
            }
            continue;
        } else if (!/\S\s*[=:]+\s*\S/.test(str)) {
            // No assignment pattern, skip
            continue;
        }
        // ==================== KEY EXTRACTION ====================
        /**
         * Gets everything after the last colon in a string
         * @param {string} s - Input string
         * @returns {string} Content after last colon
         */
        const rightOfColon = (s = "") => s.slice(s.lastIndexOf(":") + 1);
        // Extract and clean the key name
        const key = (() => {
            const raw = formatKey((
                (delimiter === "=") ? rightOfColon(str.split("=", 1)[0]) : str.split(":", 1)[0]
            ).trim().replaceAll(" ", "_"));
            // If key exists in brain, use it as-is
            // Otherwise strip common prefixes/suffixes models tend to add
            return (raw in agent.brain) ? raw : (raw
                .replace(/^th(?:oughts?|ink(?:ing))_(?:(?:o[nfr]|a(?:bout|nd)|with|for)_)?/, "")
                .replace(/(?:_(?:and|or))?_th(?:oughts?|ink(?:ing))$/, "")
            );
        })();
        if ((key === "") || ((
            (60 < key.length)
            || ["thought", "thoughts", "think", "thinking", "any_name", "example_name"].includes(key)
            || ["any_key", "key_name", "example_key"].some(s => key.includes(s))
        ) && !(key in agent.brain))) {
            // Skip invalid or placeholder keys copied from the task prompts
            continue;
        }
        // ==================== VALUE EXTRACTION ====================
        // Extract and clean the value
        const value = (
            (str.split(delimiter, 2)[1] || "")
            // Strip leading/trailing quotes and whitespace
            .replace(/^[\s"'`«»„“”「」´‘’‟‚‛]+|[\s"'`«»„“”「」´‘’‟‚‛]+$/g, "")
            .replace(/\s+/g, " ")
        );
        if (!/[a-z0-9A-Z]/.test(value) || /[\u4e00-\u9fff]/.test(value)) {
            // Skip empty or non-latin values because DeepSeek is dumb
            continue;
        } else if (!value.includes(" ")) {
            // ==================== RENAME OPERATION ====================
            // No spaces = might be a key rename
            if (altered.has(key)) {
                continue;
            }
            const oldKey = formatKey(value);
            if (!altered.has(oldKey) && (oldKey in agent.brain)) {
                // Valid rename: move thought from old key to new key
                // Queue a rename operation
                operations.push(() => {
                    agent.brain[key] = agent.brain[oldKey];
                    delete agent.brain[oldKey];
                    const p = path();
                    return `${p}.${key} = ${p}.${oldKey};\n${logDelete(oldKey)}`;
                });
                altered.add(key);
                altered.add(oldKey);
            }
            continue;
        } else if (value.includes("_")) {
            // Underscores in value = probably a malformed key, skip
            continue;
        }
        // ==================== ASSIGN OPERATION ====================
        // Extract the actual thought content
        const thought = simplify(rightOfColon(value)
            .replaceAll("→", " ")
            .replaceAll("\\n", "\n")
        ).trim().split("\n", 1)[0].trimEnd();
        if (altered.has(key) || !thought.includes(" ")) {
            // Skip if key already touched or thought too short
            continue;
        } else if (!(key in agent.brain)) {
            // Check for duplicate thought values (don't store the same thing twice)
            const last = thought.length - 1;
            // Potentially hot loop so avoid excessive get() calls
            const brain = agent.brain;
            for (const key in brain) {
                const existing = brain[key];
                if (
                    // This shouldn't be possible but whatevs
                    (typeof existing === "string")
                    // Short-circuit on impossible relative lengths for speed
                    && (last < existing.length)
                    // Fast check inclusion
                    && (existing.indexOf(thought) !== -1)
                ) {
                    // This thought already exists within some thought associated with another key
                    continue interpreter;
                }
            }
        }
        // Queue an assign operation
        operations.push(() => {
            // Increment the global label counter
            IS.label++;
            // Encode the label as zero-width chars for context tracking
            IS.encoding = `${(IS.encoding === "") ? "\u200B" : IS.encoding}${(() => {
                let n = IS.label;
                let out = "";
                // Convert label to binary using ZWNJ (0) and ZWJ (1)
                while (0 < n) {
                    out = `${(n & 1) ? "\u200D" : "\u200C"}${out}`;
                    n >>>= 1;
                }
                return out || "\u200C";
            })()}\u200B`;
            // Inject the encoding into the output text
            text = (text
                .replace(/[\u200B-\u200D]+/g, "")
                .replace(/^\s*/, leadingWhitespace => `${leadingWhitespace}${IS.encoding}`)
            );
            // One common complaint from playtesters was that models were storing repeated thoughts
            // Upon further investigation, I discovered this was actually miscommunication on my part
            // Players assumed the operation log (card entry) was a reflection of the brain (card notes)
            // Thus players (reasonably) misinterpreted label updates as repetition
            // Solution: Log distinct relabel syntax to improve non-verbal communication
            const target = `${path()}.${key}`;
            const old = agent.brain[key];
            agent.brain[key] = `${IS.label} → ${thought}`;
            // Determine if this is a relabel of the same thought value
            const relabel = (
                (typeof old === "string")
                && (thought === old.slice(old.indexOf("→") + 1).trim())
            );
            return `${(
                relabel ? `old = ${target};\n` : ""
            )}${target} = ${(
                relabel ? `[${IS.label}, old${(
                    old.includes("→") ? `\n  .slice(old.indexOf("→") + 1)\n  .trim()\n` : ".trim()"
                )}].join(" → ")` : JSON.stringify(agent.brain[key])
            )};`;
        });
        altered.add(key);
    }
    // ==================== OUTPUT TEXT SANITIZATION ====================
    // Clean up the model's output text before finalizing
    // This removes artifacts, formatting issues, and unwanted patterns
    text = (simplify(config.debug ? text : text.replaceAll("_", ""))
        .trim()
        .split("\n")
        .filter(line => {
            const lower = line.toLowerCase();
            return !(
                // The nuclear option
                /(?:^|[^a-zA-Z])(?:task|output)(?:$|[^a-zA-Z])/.test(lower)
                // Common AI hallucinations
                || [
                    "STRICT",
                    "OUTPUT",
                    "REQUIRE",
                    "EXACT",
                    "TASK",
                    "FORMAT",
                    "inner self",
                    `You are ${config.player}.`
                ].some(naughty => line.includes(naughty))
                // Remove "story continues" type artifacts from task prompts bleeding through
                || (lower.includes("story") && lower.includes("continu"))
                // Remove numbered list items (e.g., "1.", "[1]", "2.")
                || /^\[?\d+(?:\.?\]|\.)/.test(lower)
                // Remove stray "user" labels from ChatML imitation
                || /^\s*user(?:$|[^a-z])/.test(lower)
            );
        })
        .join("\n")
        .trim()
        // Collapse excessive newlines to a maximum of two
        .replace(/\n\n\n+/g, "\n\n")
    );
    // ==================== OUTPUT FINALIZATION ====================
    // Handle empty outputs and ensure proper spacing between actions
    if (text === "") {
        // AID does not tolerate empty string outputs and "please select continue" messages are cringe
        // Return encoding if available, otherwise a zero-width space placeholder
        text = (IS.encoding === "") ? "\u200B" : IS.encoding;
    } else {
        // Prepend the thought label encoding to the output text
        text = `${IS.encoding}${text}`;
        // Ensure all between-action linebreaks are equally spaced
        prespace();
    }
    // ==================== OPERATION EXECUTOR ====================
    // Execute queued brain operations and persist changes
    if ((operations.length === 0) || (agent === null)) {
        // No operations to execute, we're done
        return;
    }
    const hash = historyHash();
    if (IS.hash === hash) {
        // Same history hash means this turn was a retry or erase + continue
        // This prevents duplicate brain modifications on retry (cached outputs cause problems)
        return;
    } else if (typeof agent.card.entry !== "string") {
        // Initialize the brain card entry if it's not a string (shouldn't happen, but safety first)
        agent.card.entry = "";
    } else if (agent.card.entry.endsWith("UTC") && agent.card.entry.startsWith("// initialized @")) {
        // This is a fresh brain card with only the timestamp comment
        // I prefer logging this info immediately before processing the first valid operation
        // Add metadata and initialize the brain object in the log
        agent.card.entry = `${agent.card.entry.trimStart()}\n${path("metadata")} = ${(
            JSON.stringify(agent.metadata, null, 2)
        )};\n${path()} = {};`;
    }
    // Update the hashcode to mark this history state as processed
    IS.hash = hash;
    // Clear the previous encoding since new operations are being committed
    IS.encoding = "";
    // Execute each queued operation and append to the operation log
    for (const operation of operations) {
        // Increment global operation counter
        IS.ops++;
        // Execute the operation (modifies agent.brain) and get the log message
        // Append the message to the agent's brain card entry
        agent.card.entry = `${agent.card.entry}\n\n// operation ${IS.ops}\n${operation()}`.trimStart();
    }
    // Keep the operation log from growing unbounded
    // Limit to approximately 2000 chars to satisfy AID's soft entry limit
    agent.card.entry = agent.card.entry.split(/\n\n/).slice(-2000).reduceRight((out, op) => (
        // Only include operations that fit within the char limit
        ((out.length + op.length + 2) < 2001) ? `${op}${out ? `\n\n${out}` : ""}` : out
    ), "");
    // ==================== BRAIN SERIALIZATION ====================
    // Rapidly reserialize a flat representation of the modified brain, without heavy memory allocations
    // This custom serialization is faster than JSON.stringify for flat objects
    // It also produces a more readable format in the story card
    let serialized = "";
    const brain = agent.brain;
    const keys = Object.keys(brain);
    // Build the JSON-like string manually for each key-value pair
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        // Format: "key": "value",\n\n (with linebreaks for player readability)
        serialized += `"${key}": ${JSON.stringify(brain[key])},\n\n`;
    }
    // Store the agent's serialized brain in the card notes
    // Slice to the last quote or use "{}" for an empty brain
    agent.card.description = serialized.slice(0, serialized.lastIndexOf("\"") + 1) || "{}";
    return;
}

//—————————————————————————————————————————————————————————————————————————————————————
