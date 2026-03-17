# Inner Self - NPC Brain System

## Overview

Inner Self v1.0.0 grants story characters the ability to learn, plan, and adapt over time. Each NPC gets their own "brain" - a persistent thought system stored in their character card.

## How It Works

### 1. **Brain Storage**
- Each NPC has a "Brain" story card (type: Brain)
- Thoughts are stored as JSON in the card's notes section
- Format: `{ "key_name": "label → thought content" }`

### 2. **Thought Structure**
- **Label**: A number (auto-incremented) - tracks thought order
- **Key**: Your chosen name for the thought (e.g., `likes_combat`, `fears_fire`)
- **Content**: The actual thought in first person from NPC's perspective

Example:

### 3. **Trigger System**
- When NPC name appears in story text → their brain activates
- Last 5 actions scanned for name mentions (configurable)
- Only ONE NPC brain active per turn (highest priority wins)

### 4. **Thought Formation**
- 60% chance per turn (configurable) to create new thoughts
- AI generates thoughts based on recent story events
- Thoughts stay relevant to character's situation

### 5. **Memory Management**
- Brain size limited to 30% of recent story context
- When full: old thoughts automatically compressed/summarized
- Keeps brains efficient without losing important info

## Configuration

Set these in `MainSettings.InnerSelf`:

| Setting | Default | What It Does |
|---------|---------|--------------|
| `IMPORTANT_SCENARIO_CHARACTERS` | `""` | Comma-separated NPC names to simulate |
| `IS_INNER_SELF_ENABLED_BY_DEFAULT` | `true` | Start with system on/off |
| `PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS` | `30` | % of context for NPC brains |
| `NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS` | `5` | How many recent actions to scan |
| `ACTIVE_CHARACTERS_VISUAL_INDICATOR_SYMBOL` | `🎭` | Emoji to show active NPC |
| `THOUGHT_FORMATION_CHANCE_PER_TURN` | `60` | % chance to form new thought |
| `IS_CONFIG_CARD_PINNED_BY_DEFAULT` | `false` | Pin config at top of cards |
| `IS_DEBUG_MODE_ENABLED_BY_DEFAULT` | `false` | Show raw thought data inline |

## Creating an NPC Brain Card

### Method 1: Automatic
- Just list NPC names in `IMPORTANT_SCENARIO_CHARACTERS`
- Brain card creates automatically when NPC first mentioned

### Method 2: Manual
- Create story card titled with NPC first name
- Type in entry: `{agent_name}`
- Brain card converts automatically

### Method 3: Advanced
- Create story card titled `@YourCharacterName`
- System recognizes `@` prefix and sets up as agent

## Working with Thoughts

### Operations

The AI can perform these thought operations each turn:

**1. Create/Update Thought:**

**2. Rename Thought:**

**3. Delete Thought:**

### Best Practices

✅ **DO:**
- Use clear, descriptive key names (`fears_darkness`, `loves_gold`)
- Write thoughts from NPC's first-person perspective
- Keep thoughts focused and information-dense
- Let thoughts evolve as story progresses

❌ **DON'T:**
- Use spaces or special chars in key names (use underscores: `my_thought`)
- Write generic thoughts ("I am brave")
- Delete core identity thoughts
- Mix multiple concepts in one thought

## Debug Mode

Set `IS_DEBUG_MODE_ENABLED_BY_DEFAULT: true` to see:
- Raw thought data inline with story
- Thought labels and operations
- Brain size and compression logs
- Trigger detection info

## Troubleshooting

**NPC brain not activating?**
- Check character name is spelled correctly
- Verify name appears in recent actions
- Confirm `IS_INNER_SELF_ENABLED_BY_DEFAULT: true`

**Thoughts disappearing?**
- Brain size exceeded limit → auto-compression happens
- Check "Completed Quests" brain card - compressed thoughts stored there
- Not deleted, just archived

**Too many thoughts forming?**
- Lower `THOUGHT_FORMATION_CHANCE_PER_TURN` (e.g., 30 instead of 60)
- Increase `NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS` (more scattered)

## Integration with Other Systems

- **Auto-Cards**: Compatible - AC creates world cards, Inner Self creates character brains
- **QETEco**: Compatible - economy system runs independently
- **LSIv2**: Can reference brain data in custom scripts

---

**See Also:**
- [Library Overview](./LIBRARY_OVERVIEW.md)
- [Auto-Cards Guide](./AUTO_CARDS.md)
- [Configuration Reference](./CONFIG_REFERENCE.md)
- 
