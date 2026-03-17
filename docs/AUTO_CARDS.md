# Auto-Cards - Story Card Automation

## Overview

Auto-Cards v1.1.3 automatically creates and updates plot-relevant story cards while you play. Instead of manually writing every character, location, and object card, the system watches your story and generates cards at the right moments.

## How It Works

### 1. **Title Detection**
- Scans recent story text for proper nouns (capitalized names/places)
- Looks back 7+ actions (configurable)
- Ignores common words (North, Tuesday, January)
- Creates a "candidate list" of potential card topics

### 2. **Relevance Scoring**
- Tracks how recently titles appeared in story
- More recent = higher priority
- Cards generated for most relevant unused titles
- 2/3 of time uses top candidate, 1/3 random selection

### 3. **Card Generation**
- AI writes new story card entry
- Focuses on plot-relevant information
- Mentions the title in every sentence
- Third-person, polished prose

### 4. **Memory Updates** (Optional)
- Generated cards can auto-update when relevant memories form
- Old card info automatically compressed/summarized
- Keeps long-term memory efficient

### 5. **Cooldown System**
- Minimum turns between card generations (default: 40)
- Prevents spamming cards
- Can be tuned per game

## Configuration

Set these in `MainSettings.AC`:

| Setting | Default | What It Does |
|---------|---------|--------------|
| `DEFAULT_DO_AC` | `true` | Enable/disable Auto-Cards |
| `DEFAULT_PIN_CONFIGURE_CARD` | `false` | Pin config at top of card list |
| `DEFAULT_CARD_CREATION_COOLDOWN` | `40` | Minimum turns between cards |
| `DEFAULT_USE_BULLETED_LIST_MODE` | `true` | New cards use bullet points |
| `DEFAULT_GENERATED_ENTRY_LIMIT` | `600` | Max characters per entry |
| `DEFAULT_NEW_CARDS_DO_MEMORY_UPDATES` | `false` | Auto-update card memory |
| `DEFAULT_NEW_CARDS_MEMORY_LIMIT` | `3200` | When to compress memories |
| `DEFAULT_MEMORY_COMPRESSION_RATIO` | `25` | Compression strength (÷10 = shortness) |
| `DEFAULT_IGNORE_ALL_CAPS_TITLES` | `true` | Ignore ALL-CAPS words |
| `DEFAULT_DETECT_TITLES_FROM_INPUTS` | `false` | Scan player inputs too |
| `DEFAULT_MINIMUM_LOOK_BACK_DISTANCE` | `7` | How many actions to scan back |

## Card Anatomy

### Auto-Card Structure

### What Gets Generated

**Characters/NPCs:**
- Background and motivations
- Relationships to other characters
- Notable traits and abilities
- Recent story involvement

**Locations:**
- Description and atmosphere
- Connected locations
- Points of interest
- History/significance

**Objects/Items:**
- What they are and what they do
- Where they fit in story
- Who cares about them
- Special properties

## Memory Banks

### How They Work

Cards with `{updates: true}` automatically:
1. **Absorb** relevant story context (memories AI generated)
2. **Grow** as story progresses
3. **Compress** when they get too large
4. **Stay relevant** to the adventure

### Compression

When a card's memory bank exceeds the limit (default 3200 chars):
- AI summarizes oldest memories
- Keeps essential information
- Reduces by ~2.5x (default ratio of 25)
- Old memories moved to "Completed" section

### Manual Memory Management

You can add memories to any card by editing its notes:

## In-Game Commands

Type these in a Do/Say/Story action:

### `/ac`
Immediately generate a card for the most relevant unused title

### `/ac YourTitle`
Force-generate a card for a specific title

### `/ac YourTitle / Extra Details`
Generate with additional context in the prompt

### `/ac redo YourTitle / New Info`
Regenerate with additional story developments

### `/ac redo all`
Regenerates every auto-card (⚠️ risky - use carefully!)

## Configuration Card

When Auto-Cards is enabled, a "Configure Auto-Cards" card appears. Edit this card to change settings:

### Entry Settings

### Notes Settings
Contains:
- AI generation prompt (customize tone/style)
- Memory compression prompt
- Banned titles list (prevents card generation)

## Banned Titles

### Default Banned
- Compass directions: North, East, South, West
- Months: January, February, March...
- Days: Monday, Tuesday, Wednesday...

### Why Titles Get Banned
- Generic/too common (not interesting cards)
- Already exist in AI training data
- Not specific enough (what is "North"?)

### How to Ban Custom Titles
Edit the config card's notes section:

Just add your word to the comma-separated list.

## Card Types

### Character/NPC Cards
- Generated for proper names
- Track personality, goals, relationships
- Memory updates show character development

### Location Cards
- Generated for place names
- Describe setting and atmosphere
- Memories show how location changes

### Object/Item Cards
- Generated for significant items
- Track importance and history
- Memory updates show usage/changes

### Faction/Group Cards
- Generated for organization names
- Document purpose and members
- Memories track political shifts

## Best Practices

✅ **DO:**
- Let Auto-Cards run automatically - it learns your story
- Use `/ac redo` for character development moments
- Keep memory updates ON for long campaigns
- Customize the generation prompt to match your tone

❌ **DON'T:**
- Spam `/ac` commands constantly
- Set cooldown to 0 (cards appear too often)
- Ignore compression warnings (memory bloat)
- Mix IC (in-character) and OOC (out-of-character) in cards

## Integration

### With Inner Self
- Inner Self creates **character brains** (thoughts)
- Auto-Cards creates **world cards** (information)
- Work together without conflict
- Enable both for rich, dynamic adventures

### With QETEco
- Independent economy system
- Doesn't interfere with Auto-Cards
- Cards can reference money/items from QETEco

### With LSIv2
- Can reference Auto-Cards data in scripts
- Can trigger custom card generation via API
- Full programmatic control available

## Troubleshooting

### No Cards Generating?
- Check cooldown hasn't expired: `/ac`
- Verify Auto-Cards enabled in config
- Check "Configure Auto-Cards" card exists
- Ensure proper nouns appear in recent actions

### Cards Too Generic?
- Edit the "AI generation prompt" in config card notes
- Add specific instructions (e.g., "Write dark fantasy style")
- Use `/ac redo` with custom prompt details

### Memory Growing Too Fast?
- Lower `DEFAULT_NEW_CARDS_MEMORY_LIMIT` value
- Increase `DEFAULT_MEMORY_COMPRESSION_RATIO`
- Manually clean old memories from cards

### Cards About Wrong Topics?
- Add to banned titles list
- Use `/ac redo` to replace with correct card
- Improve story descriptions (be more specific)

---

**See Also:**
- [Library Overview](./LIBRARY_OVERVIEW.md)
- [Inner Self Guide](./INNER_SELF.md)
- [Configuration Reference](./CONFIG_REFERENCE.md)
