# Configuration Reference

Complete reference for all MainSettings configuration options.

## MainSettings.InnerSelf

### Character Setup

#### `IMPORTANT_SCENARIO_CHARACTERS`
- **Type:** String (comma-separated names)
- **Default:** `""`
- **Example:** `"Leah, Lily, Lydia"`
- **What it does:** Lists NPC names whose brains Inner Self will simulate
- **Note:** Names are case-insensitive for matching but preserve capitalization in output

#### `PREDETERMINED_PLAYER_CHARACTER_NAME`
- **Type:** String
- **Default:** `""`
- **Example:** `"Aria"`
- **What it does:** Player character name (improves PoV accuracy)
- **Note:** Leave empty if player name changes between playthroughs

### Perspective Settings

#### `FIRST_SECOND_OR_THIRD_PERSON_POV`
- **Type:** Integer (1, 2, or 3)
- **Default:** `2`
- **Options:**
  - `1` = First person ("I am walking")
  - `2` = Second person ("You are walking") ← Most common
  - `3` = Third person ("The hero is walking")
- **What it does:** Tells Inner Self the story's narrative perspective

### Context & Brain Settings

#### `PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS`
- **Type:** Integer (1-95)
- **Default:** `30`
- **What it does:** How much of context window NPC brains consume
- **Example:** 30% means if you have 3000 chars of context, brains get ~900
- **Tip:** Lower = faster processing, higher = smarter NPCs

#### `NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS`
- **Type:** Integer (1-250)
- **Default:** `5`
- **What it does:** How many recent story actions to scan for character names
- **Example:** 5 = checks last 5 player inputs/AI outputs for NPC mentions
- **Tip:** Lower = faster, higher = catches names mentioned longer ago

### Thought Formation

#### `THOUGHT_FORMATION_CHANCE_PER_TURN`
- **Type:** Integer (0-100)
- **Default:** `60`
- **What it does:** % chance NPC forms a new thought each turn
- **Example:** 60 = roughly 6 out of 10 turns produce new thoughts
- **Special:** Reduced by 50% during player inputs (Do/Say/Story)
- **Tip:** Lower = fewer thoughts (60→30 during inputs), Higher = very chatty

### Visual Indicators

#### `ACTIVE_CHARACTERS_VISUAL_INDICATOR_SYMBOL`
- **Type:** String (emoji or text)
- **Default:** `"🎭"`
- **Examples:** `"🧠"`, `"💭"`, `"[NPC]"`, `"→"`
- **What it does:** Symbol shown in card title when NPC brain is active
- **Note:** Leave empty `""` to disable visual indicators

### UI Settings

#### `IS_CONFIG_CARD_PINNED_BY_DEFAULT`
- **Type:** Boolean
- **Default:** `false`
- **Options:** `true` or `false`
- **What it does:** Pins "Configure Inner Self" card near top of card list
- **Use when:** You edit settings frequently

#### `IS_DEBUG_MODE_ENABLED_BY_DEFAULT`
- **Type:** Boolean
- **Default:** `false`
- **Options:** `true` or `false`
- **What it does:** Shows raw thought data and operations inline with story
- **Use when:** Debugging NPC behavior

#### `IS_INNER_SELF_ENABLED_BY_DEFAULT`
- **Type:** Boolean
- **Default:** `true`
- **Options:** `true` or `false`
- **What it does:** Inner Self active when adventure starts
- **Can be toggled:** Yes, via in-game config card

#### `IS_AC_ENABLED_BY_DEFAULT`
- **Type:** Boolean
- **Default:** `false`
- **Options:** `true` or `false`
- **What it does:** Auto-Cards active when adventure starts
- **Can be toggled:** Yes, via in-game config card

---

## MainSettings.AC

### Core Settings

#### `DEFAULT_DO_AC`
- **Type:** Boolean
- **Default:** `true`
- **What it does:** Enable/disable Auto-Cards system entirely
- **Note:** Can be toggled in-game without restarting

#### `DEFAULT_PIN_CONFIGURE_CARD`
- **Type:** Boolean
- **Default:** `false`
- **What it does:** Pin "Configure Auto-Cards" near top of card list

#### `DEFAULT_CARD_CREATION_COOLDOWN`
- **Type:** Integer (0-9999)
- **Default:** `40`
- **What it does:** Minimum turns between automatic card generation
- **Examples:**
  - `0` = Cards generate immediately when titles available
  - `40` = One card every 40 turns
  - `9999` = Pauses auto-generation (manual `/ac` still works)
- **Tip:** Increase if cards generating too frequently

### Card Generation

#### `DEFAULT_USE_BULLETED_LIST_MODE`
- **Type:** Boolean
- **Default:** `true`
- **What it does:** New cards formatted as bullet points vs. prose
- **Bulleted:** Better for readability, scannable
- **Prose:** Better for immersion

#### `DEFAULT_GENERATED_ENTRY_LIMIT`
- **Type:** Integer (200-2000)
- **Default:** `600`
- **What it does:** Maximum characters per generated card entry
- **Higher:** More detailed cards, more context consumed
- **Lower:** Shorter cards, saves context space

#### `DEFAULT_CARD_TYPE`
- **Type:** String
- **Default:** `"class"`
- **Options:** `"class"` or `"text"`
- **Note:** Doesn't really matter - for filtering purposes

### Memory System

#### `DEFAULT_NEW_CARDS_DO_MEMORY_UPDATES`
- **Type:** Boolean
- **Default:** `false`
- **What it does:** New cards auto-update their memory banks over time
- **Enabled:** Cards "remember" relevant story events
- **Disabled:** Cards static, only grow if manually edited

#### `DEFAULT_NEW_CARDS_MEMORY_LIMIT`
- **Type:** Integer (1750-9900)
- **Default:** `3200`
- **What it does:** Character limit before card memories compress
- **Example:** When card's memory bank hits 3200 chars → auto-compress
- **Higher:** Longer memory before compression
- **Lower:** Compresses more frequently (saves space)

#### `DEFAULT_MEMORY_COMPRESSION_RATIO`
- **Type:** Integer (20-1250)
- **Default:** `25`
- **Formula:** New size ≈ Old size ÷ (Ratio ÷ 10)
- **Example:** Ratio 25 → memory becomes ~2.5x shorter
- **Higher:** More aggressive compression
- **Lower:** Less compression, retain more detail

### Title Detection

#### `DEFAULT_IGNORE_ALL_CAPS_TITLES`
- **Type:** Boolean
- **Default:** `true`
- **What it does:** Prevent all-caps words from becoming card titles
- **Enabled:** "RUN" and "HELP" ignored (too generic)
- **Disabled:** All-caps words can generate cards

#### `DEFAULT_DETECT_TITLES_FROM_INPUTS`
- **Type:** Boolean
- **Default:** `false`
- **What it does:** Scan player Do/Say/Story actions for card titles
- **Enabled:** Your typed words analyzed for names
- **Disabled:** Only AI narration analyzed (safer)
- **Note:** Disable if you have inconsistent typing/grammar

#### `DEFAULT_MINIMUM_LOOK_BACK_DISTANCE`
- **Type:** Integer (2-88)
- **Default:** `7`
- **What it does:** Minimum age (in actions) before title becomes eligible
- **Example:** 7 = names from 7+ actions ago eligible for cards
- **Lower:** Quickly generate cards for mentioned names
- **Higher:** Wait longer before generating (prevents duplicates)

### Advanced Features

#### `DEFAULT_DO_LSI_V2`
- **Type:** Boolean
- **Default:** `false`
- **What it does:** Enable Live Script Interface v2 (advanced scripting)
- **Warning:** Complex feature, leave `false` unless using custom scripts

#### `DEFAULT_SHOW_DEBUG_DATA`
- **Type:** Boolean
- **Default:** `false`
- **What it does:** Show debug data card with Auto-Cards internals
- **Use when:** Troubleshooting Auto-Cards behavior

#### `DEFAULT_BANNED_TITLES_LIST`
- **Type:** String (comma-separated)
- **Default:** `"North, East, South, West, Sunday, Monday, ..."`
- **What it does:** Titles that NEVER generate cards
- **Examples:** Directions, months, common words
- **Can be edited:** Yes, in-game via config card

### AI Prompts

#### `DEFAULT_CARD_GENERATION_PROMPT`
- **Type:** Array of strings (multi-line prompt)
- **Default:** See [AUTO_CARDS.md](./AUTO_CARDS.md) for default
- **What it does:** Instructions for AI when generating card entries
- **Customize:** Add specific style guidelines, tone preferences
- **Placeholders:**
  - `%{title}` = Card title (auto-replaced)
  - `%{entry}` = Existing entry (auto-replaced)

#### `DEFAULT_CARD_MEMORY_COMPRESSION_PROMPT`
- **Type:** Array of strings (multi-line prompt)
- **Default:** See [AUTO_CARDS.md](./AUTO_CARDS.md) for default
- **What it does:** Instructions for AI when compressing old memories
- **Customize:** Adjust compression style/detail level
- **Placeholders:**
  - `%{title}` = Card title (auto-replaced)
  - `%{memory}` = Old memory text (auto-replaced)

---

## Quick Reference Tables

### Inner Self Presets

**"Light" NPC Brains**
```javascript
PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 30,
THOUGHT_FORMATION_CHANCE_PER_TURN: 60,
NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS: 5,
PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 50,
THOUGHT_FORMATION_CHANCE_PER_TURN: 80,
NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS: 10,
DEFAULT_DO_AC: false,
DEFAULT_CARD_CREATION_COOLDOWN: 9999,
DEFAULT_CARD_CREATION_COOLDOWN: 100,
DEFAULT_GENERATED_ENTRY_LIMIT: 400,
DEFAULT_CARD_CREATION_COOLDOWN: 40,
DEFAULT_GENERATED_ENTRY_LIMIT: 600,
DEFAULT_CARD_CREATION_COOLDOWN: 10,
DEFAULT_GENERATED_ENTRY_LIMIT: 800,
THOUGHT_FORMATION_CHANCE_PER_TURN: 80,  // was 60
PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 40,  // was 30
DEFAULT_CARD_CREATION_COOLDOWN: 100,  // was 40
DEFAULT_MINIMUM_LOOK_BACK_DISTANCE: 15,  // was 7
PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 15,  // was 30
DEFAULT_GENERATED_ENTRY_LIMIT: 400,  // was 600
PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 50,  // was 30
NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS: 10,  // was 5

---

### **STEP 4: Commit**
Click **"Commit changes..."** and type:

✅ **Done!**

---

## **FILE 5: QETECO.md**

### **STEP 1: Add New File**

### **STEP 2: Name It**

### **STEP 3: Paste This Content**

```markdown
# QETEco - Economy & Equipment System

## Overview

QETEco v1.0 manages economy, inventory, quests, and item systems for AI Dungeon scenarios. Automatically tracks money, items, quest progress, and rewards.

## Core Systems

### 1. **Wallet System**
Tracks multiple currency types:
- **Gold** (primary currency)
- **Silver** (mid-tier)
- **Copper** (low-tier)
- **Generic Money** (miscellaneous)

Automatically updates as you earn/spend in story.

### 2. **Inventory System**
Tracks items with automatic categorization:
- Weapons
- Armor
- Tools
- Consumables
- Materials
- Valuables
- Misc
- Properties

Items stack automatically (quantities tracked).

### 3. **Quest Tracker**
Manages active and completed quests:
- Accepts quests with reward parsing
- Completes quests with automatic payout
- Timestamps completed quests
- Separate views for active/completed

### 4. **Transaction System**
Handles automatically:
- **Selling** items (removes from inventory, adds money)
- **Buying** items (removes money, adds to inventory)
- **Giving** items (removes from inventory)
- **Destroying** items (removes from inventory)

## Story Cards Generated

### Wallet Card 💰
Shows current money:
PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 15,
THOUGHT_FORMATION


### Items Card 🎒
Groups inventory by type:
Weapons:

Iron Sword x1
Wooden Bow x1
Armor:

Leather Armor x1
Iron Helmet x1
Tools:

Rope x2
Lockpick x1

### Quest Card 📜
Shows active and completed:
Active Quests:

Find the Lost Amulet
Defeat the Dragon
Completed Quests:

Escort Merchant (✓ 2026-03-17 14:23 UTC)
Gather Herbs (✓ 2026-03-17 12:45 UTC)

## How to Use

### **Earn Money**
In your story, describe receiving payment:
"You loot 50 gold and 15 silver from the chest."

Supported verbs: find, pick up, loot, grab, obtain, collect, get, take, receive

Supported currencies: gold, silver, copper, gp, sp, cp, money, coin, coins, piece, pieces

### **Find Items**
Describe picking up items:
"You find an Iron Sword and a Health Potion."

System automatically:
- Sanitizes item names
- Categorizes by type
- Removes location references
- Stacks identical items

### **Accept Quests**
Describe accepting a quest with optional reward:
"You accept the quest 'Defeat the Dragon' for 100 gold."

Or with details:
"You take the bounty: Find the Lost Amulet. Reward: 50 gold and 25 silver."

The system **records the reward but doesn't pay yet**.

### **Complete Quests**
Describe finishing the quest:
"You turn in the quest. The reward is yours!"

System then **automatically pays the recorded reward**.

Or specific completion:
"You complete the quest 'Defeat the Dragon'."

### **Sell Items**
Describe selling:
"You sell the Iron Sword for 30 gold."

Removes item, adds money.

### **Buy Items**
Describe purchasing:
"You buy a Health Potion for 15 silver."

Removes money, adds item.

### **Give Items**
Describe giving:
"You give the Amulet to the priest."

Removes item from inventory.

### **Destroy/Use Items**
Describe consuming:
"You drink the Health Potion."

Supported verbs: destroy, break, smash, shatter, burn, discard, scrap, consume, use up, drink, eat

## Item Categories

System auto-categorizes items:

| Category | Examples |
|----------|----------|
| **Weapons** | Sword, Bow, Axe, Dagger, Wand, Pistol, Arrow |
| **Armor** | Helmet, Breastplate, Boots, Shield, Gauntlets |
| **Tools** | Rope, Pickaxe, Lockpick, Torch, Compass, Anvil |
| **Consumables** | Potion, Food, Bomb, Scroll, Poison, Ammunition |
| **Materials** | Ore, Wood, Cloth, Leather, Herb, Crystal, Gem |
| **Valuables** | Gem, Necklace, Ring, Crown, Artifact, Relic |
| **Misc** | Anything else not categorized |
| **Properties** | Items prefixed with "Property:" |

## Advanced Features

### Custom Item Properties
Create custom items by prefixing with "Property:":
"You discover a Property: Tavern in the city."

Stores under "Properties" section separately.

### Multi-Item Transactions
Handle multiple items at once:
"You sell the Sword, Shield, and Boots for 100 gold."

System parses and processes each item separately.

### Currency Flexibility
Describe money in various ways:
"You receive 5 gold coins." "You find 50 pieces of silver." "You earn 100 gp." "You get 25 sp." "The reward is: 50 gold and 15 silver and 5 copper."

### Quest Reward Parsing
System finds rewards even in complex sentences:
"For completing the quest 'Dragon Slayer', the reward is 200 gold." "You accept the mission for 50 gold and 25 silver." "The bounty: Find the Amulet. Bounty: 100 gold"

Stores reward and pays on completion.

## What Gets Detected

### Loot Detection
Looks for action verbs:
- find, pick up, loot, grab, obtain, collect, get, take, receive, found, looted, picked up

### Quest Detection
Looks for:
- Accept verbs: accept, take, start, begin, agree to, undertake, sign on to
- Finish verbs: complete, finish, fulfill, accomplish, turn in, hand in, redeem, deliver, submit
- Quest nouns: quest, mission, task, bounty, job, contract, hunt

### Transaction Detection
- **Sell:** sell, pawn, fence, trade away, barter away
- **Buy:** buy, purchase, acquire
- **Give:** give, hand over, hand in, turn over, offer, donate, return, give away
- **Destroy:** destroy, break, smash, shatter, burn, discard, consume, use up, drink, eat

## Item Naming

System intelligently handles item names:

✅ **Properly Cleaned:**
- "a rusty iron sword" → "iron sword"
- "the magical staff on the table" → "magical staff"
- "5 copper coins" → "copper coins" (recognized as currency)
- "an ancient tome found in the library" → "ancient tome"

❌ **Ignored/Filtered:**
- Pure currency mentions (converted to money)
- Location references (on ground, from chest, etc.)
- Words under 3 characters
- Generic/bannable words (the, a, an, and, of, or, etc.)

## Retry Protection

System uses turn-hash detection to prevent:
- Duplicate money on Retry
- Duplicate items on Retry
- Duplicate quest progress on Retry

Automatically skips processing if turn hasn't changed (retry detected).

## Configuration

All QETEco settings are in the `CFG` object inside the script. Customizable:

```javascript
CFG.indicators = { 
  wallet: "💰",      // Emoji for money updates
  items: "🎒",       // Emoji for inventory updates
  quests: "📜"       // Emoji for quest updates
};

CFG.currencies.map = {
  gold: ["gold", "gp"],
  silver: ["silver", "sp"],
  copper: ["copper", "cp"],
  money: ["money", "coin", "coins", "piece", "pieces"]
};
Troubleshooting
Money Not Adding?
Check currency name spelled correctly (gold, silver, copper, money, coin, piece)
Verify you're describing receiving it ("you find", "you earn", etc.)
Not during quest acceptance (reserve for completion)
Items Not Appearing?
Item name might be too generic (filtered out)
Might be recognized as location reference
Name under 3 characters gets filtered
Try more specific description
Quests Not Completing?
Use completion verb: "complete", "finish", "turn in", "deliver", etc.
Specific quest name or quest just before
If multiple active quests, specify which one
Duplicate Money on Retry?
This is prevented by hash detection
Should not happen unless script error
Best Practices
✅ DO:

Describe financial transactions naturally ("You find 50 gold")
Use clear item names
Complete quests properly (accept then complete)
Let system handle categorization
❌ DON'T:

Try to forge item/money descriptions
Use weird item names
Complete quests without accepting first
Manually edit Money/Items cards (they auto-update)
Integration
With Inner Self
Independent systems
Inner Self tracks NPC thoughts
QETEco tracks economy
Work together seamlessly
With Auto-Cards
QETEco independent of Auto-Cards
Can generate cards about merchants/shops
References to money/items in cards work fine
With Custom Scripts
QETEco uses state.QETE for persistence
Safe to access for custom logic
Standard state management
Card Updates
Cards auto-indicate when changed:

💰 appears on Money card when money changes
🎒 appears on Items card when inventory changes
📜 appears on Quest card when quests change
Indicators disappear after they're seen (automatic cleanup).

See Also:

Library Overview
Configuration Reference

---

### **STEP 4: Commit**
docs: Add QETEco economy system documentation

✅ **Done!**

---

## **FILE 6: TROUBLESHOOTING.md**

### **STEP 1: Add New File**

### **STEP 2: Name It**
TROUBLESHOOTING.md

### **STEP 3: Paste This Content**

```markdown
# Troubleshooting Guide

Common issues and solutions for Inner Self, Auto-Cards, and QETEco.

## Inner Self Issues

### Problem: NPC Brain Not Activating

**Symptoms:** NPC card exists but brain isn't processing thoughts

**Causes & Solutions:**

1. **Character name mismatch**
   - ❌ Config: "Leah" but story text: "LEAH" or "leah"
   - ✅ Solution: Add all variations or use common form

2. **Inner Self disabled**
   - ❌ `IS_INNER_SELF_ENABLED_BY_DEFAULT: false`
   - ✅ Solution: Edit config card, set to true

3. **Name not in recent actions**
   - ❌ Character mentioned 20 actions ago, lookback is 5
   - ✅ Solution: Increase `NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS`

4. **Peerage words blocking trigger**
   - ❌ "King Leah" - "King" filtered out, leaving empty
   - ✅ Solution: Use just "Leah" or include as separate mention

### Problem: Thoughts Disappearing

**Symptoms:** Brain card exists but thoughts gone

**Causes & Solutions:**

1. **Memory limit exceeded**
   - Brains auto-compress when full (default 30% of context)
   - ✅ Check brain card - old thoughts in "Completed" section
   - ✅ Not deleted, just archived

2. **Thought key names changed**
   - ❌ Old key "personality" renamed to "traits"
   - ✅ Create new thought with new key (old one stays)

3. **Brain card deleted accidentally**
   - ❌ Manually removed agent's brain card
   - ✅ List character in config - new brain auto-creates

### Problem: Too Many Thoughts Forming

**Symptoms:** Thoughts generate constantly, consuming context

**Causes & Solutions:**

1. **High chance setting**
   - ❌ `THOUGHT_FORMATION_CHANCE_PER_TURN: 90`
   - ✅ Lower to 40-60

2. **High brain percentage**
   - ❌ `PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 80`
   - ✅ Reduce to 20-30

### Problem: Brains Using Too Much Context

**Symptoms:** Text gets cut off, AI has less space to write

**Causes & Solutions:**

1. **Reduce brain context allocation:**
   ```javascript
   PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 15  // was 30
NUMBER_OF_ACTIONS_TO_LOOK_BACK_FOR_TRIGGERS: 3  // was 5
THOUGHT_FORMATION_CHANCE_PER_TURN: 30  // was 60
Auto-Cards Issues
Problem: No Cards Generating
Symptoms: "Configure Auto-Cards" card exists but no new cards

Causes & Solutions:

Auto-Cards disabled

❌ DEFAULT_DO_AC: false
✅ Edit config card, enable it
Cooldown not expired

❌ Set to 40 turns, only 10 have passed
✅ Wait more turns or use /ac command
No valid titles found

❌ Story has no proper nouns or all are generic
✅ Mention character/location names more
✅ Use /ac YourTitle to force generation
Titles banned

❌ Character name "North" - banned by default
✅ Remove from banned list in config card
Problem: Cards Generating for Wrong Topics
Symptoms: Card generated for "the" or "and" instead of character

Causes & Solutions:

All-caps detection off

❌ DEFAULT_IGNORE_ALL_CAPS_TITLES: false
✅ Set to true to ignore "RUN", "HELP", etc.
Banned list incomplete

❌ Missing common words that shouldn't get cards
✅ Add to banned list: "North, East, South, West, ..."
Bad title detection

❌ Story describes "a large building" - "building" flagged
✅ Be more specific: "The Tavern" (capitalized proper noun)
Problem: Memory Growing Too Fast
Symptoms: Card memories fill up immediately

Causes & Solutions:

Memory limit too high

❌ DEFAULT_NEW_CARDS_MEMORY_LIMIT: 9999
✅ Lower to 3200 (default)
Memory updates too aggressive

❌ Every relevant story line added to memory
✅ Lower the compression ratio or disable updates
Compression not triggering

❌ Limit set to 10000 but memory 20000
✅ Ensure compression configured correctly
Problem: Cards Too Generic
Symptoms: Generated cards lack interesting detail

Causes & Solutions:

Edit AI prompt

In config card notes, find "AI prompt to generate new cards"
Add specific style: "Write like a medieval historian" or "Add humor"
Use /ac redo

Regenerate card: /ac redo YourCharacter
Adds current story context for richer detail
Provide starter entry

Use: /ac YourTitle / Details / Existing content here
AI builds on your foundation
Problem: Too Many Cards Generating
Symptoms: New card every 5 turns, cluttering interface

Causes & Solutions:

Lower cooldown too much

❌ DEFAULT_CARD_CREATION_COOLDOWN: 5
✅ Increase to 40-60
Too many titles in story

✅ Use /ac redo all to clean up
✅ Add common words to banned list
Disable auto-generation temporarily

Set cooldown to 9999
Use /ac YourTitle when you want cards
QETEco Issues
Problem: Money Not Adding Up
Symptoms: You describe earning money but wallet doesn't update

Causes & Solutions:

Currency name not recognized

❌ "You find 50 doubloons"
✅ Use: gold, silver, copper, money, coin, piece
Wrong verb

❌ "You are given 50 gold" (passive)
✅ Use: "You find, get, earn, receive 50 gold"
During quest acceptance

❌ "Accept quest for 50 gold" - blocked to prevent double-pay
✅ Reward recorded but paid on completion
Parse conflict

❌ Complex sentence mixing multiple concepts
✅ Simplify: "You get 50 gold. You find a sword."
Problem: Items Not Appearing
Symptoms: You pick up item but inventory doesn't update

Causes & Solutions:

Item name too generic

❌ "You find a thing" - filtered out
✅ Be specific: "You find an iron sword"
Name contains location

❌ "You find a sword on the ground"
✅ Use: "You find a sword"
Item name under 3 characters

❌ "You find an ax" - "ax" filtered
✅ Use: "You find an axe"
Banned token in name

❌ "You find the very helpful healing potion"
✅ Use: "You find a healing potion"
Problem: Quests Not Tracking
Symptoms: Quest accepted but doesn't appear in tracker

Causes & Solutions:

No accept verb

❌ "You get a new quest" (generic)
✅ Use: "You accept, take, start the quest"
No quest noun

❌ "You begin this task"
✅ Use: "You accept this quest/mission/bounty"
Quest name not captured

❌ Vague: "You accept the quest to save people"
✅ Named: "You accept the quest 'Save the Village'"
Problem: Quest Reward Not Paid
Symptoms: Completed quest but money didn't appear

Causes & Solutions:

No completion verb

❌ "The dragon is dead" (narrative, not action)
✅ Use: "You complete the quest, deliver the amulet, turn in"
Reward not recorded on accept

❌ Accepted without reward, trying to complete with reward
✅ Include reward on acceptance
Quest name mismatch

❌ Accepted "Dragon Slayer" but completed "Kill the Dragon"
✅ Use exact same name or be generic ("last quest")
Retry duplicate protection

❌ You retry turn, reward already paid last attempt
✅ System detects and prevents double-pay
Problem: Duplicate Money on Retry
Symptoms: Retry a turn and money appears twice

Causes & Solutions:

This shouldn't happen

System has retry protection built-in
✅ Report as bug if it occurs
Check turn hash

System compares current history to previous
If identical, processing skipped
Integration Issues
Problem: Inner Self and Auto-Cards Conflicting
Symptoms: Cards appearing twice or thoughts breaking

Causes & Solutions:

Both creating character cards

❌ Inner Self makes brain cards, Auto-Cards makes info cards
✅ This is intended - they complement each other
Context overflow

❌ Combined systems using 80% of context
✅ Lower Inner Self percentage and/or Auto-Cards entry limit
Problem: QETEco Interfering with Story
Symptoms: Money/items mentioned in story not showing up

Causes & Solutions:

QETEco only tracks intentional actions

❌ "There was gold on the table" (narrative)
✅ Use: "You find gold on the table" (action)
Verify storage cards exist

✅ Check: Money & Currencies, Items & Properties, Quest Tracker cards exist
Performance Issues
Problem: Script Running Slowly
Symptoms: Long pauses between actions

Causes & Solutions:

Too many Brain cards

❌ 30+ NPCs with active brains
✅ Reduce to 5-10 important NPCs
Auto-Cards processing too much

❌ Generates card every 2-3 turns
✅ Increase cooldown to 50+
QETEco parsing complex text

❌ Very long story blocks with lots of transactions
✅ Break into shorter actions
Solution: Lower Context Usage
// Reduce Inner Self
PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 15  // was 30

// Reduce Auto-Cards
DEFAULT_GENERATED_ENTRY_LIMIT: 400  // was 600

// Disable optional features
IS_DEBUG_MODE_ENABLED_BY_DEFAULT: false
DEFAULT_SHOW_DEBUG_DATA: false
Getting Help
If issues persist:

Check the docs:

Library Overview
Configuration Reference
Enable debug mode:

IS_DEBUG_MODE_ENABLED_BY_DEFAULT: true
Shows raw data for diagnosis
Simplify your story:

Use clear, direct language
Avoid mixing multiple concepts per action
Reset and retry:

Disable system, test story without it
Re-enable one system at a time
Still stuck? Check your config card - most issues are settings-related!

---

### **STEP 4: Commit**

✅ **Done!**

---

## **FILE 7: README.md** (Update This One)

Go back and **click on README.md** in the left sidebar, then click the **pencil icon** to edit.

Replace the entire content with:

```markdown
# Script Knowledge Base

Complete documentation for Inner Self, Auto-Cards, and QETEco systems for AI Dungeon.

## 📚 Documentation

- **[Library Overview](./docs/LIBRARY_OVERVIEW.md)** - Start here! Overview of all systems
- **[Inner Self Guide](./docs/INNER_SELF.md)** - NPC brain simulation system
- **[Auto-Cards Guide](./docs/AUTO_CARDS.md)** - Automatic story card generation
- **[QETEco Documentation](./docs/QETECO.md)** - Economy and inventory system
- **[Configuration Reference](./docs/CONFIG_REFERENCE.md)** - All settings explained
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🚀 Quick Start

### 1. Add to Your Scenario

Copy the three main scripts to your scenario:
- `library.js` - Shared library (contains all systems)
- `context.js` - Context modifier
- `output.js` - Output modifier
- `input.js` - Input modifier

### 2. Configure

Edit `library.js` and update `MainSettings`:

```javascript
globalThis.MainSettings = (class MainSettings {
  static InnerSelf = {
    IMPORTANT_SCENARIO_CHARACTERS: "Leah, Lily",  // Your NPC names
    IS_INNER_SELF_ENABLED_BY_DEFAULT: true,
    // ... other settings
  };
  
  static AC = {
    DEFAULT_DO_AC: true,
    DEFAULT_CARD_CREATION_COOLDOWN: 40,
    // ... other settings
  };
});
3. Play!
Start playing normally. The systems work automatically.

📖 What Each System Does
Inner Self 🧠
Gives NPCs persistent memory and thoughts
Tracks character development over time
Auto-generates NPC reactions based on story
Auto-Cards 🎴
Automatically creates story cards for characters, locations, objects
Updates card memories as story progresses
Saves you from manual card management
QETEco 💰
Tracks money earned/spent
Manages inventory and item stacks
Handles quest acceptance and completion
Auto-processes trades (buying/selling)
🎮 In-Game Commands
Auto-Cards Commands
/ac                                    # Generate card for best title
/ac YourTitle                          # Force-generate card
/ac YourTitle / Extra details          # Generate with context
/ac redo YourTitle                     # Regenerate existing card
📝 Configuration
All systems configured via MainSettings in library.js or in-game via config cards:

"Configure Inner Self" card
"Configure Auto-Cards" card
See Configuration Reference for all options.

⚡ Features
✨ Inner Self

NPC thoughts with persistent memory
Automatic brain card creation
Thought compression and archival
Debug mode for transparency
✨ Auto-Cards

Smart title detection
Relevance-based priority
Memory bank auto-updates
Customizable AI prompts
✨ QETEco

Multi-currency support
Auto-categorized inventory
Quest tracking with rewards
Transaction parsing (buy/sell/trade)
🛠️ Troubleshooting
See Troubleshooting Guide for common issues.

Quick fixes:

NPC not responding? Check character name is listed
No cards generating? Verify Auto-Cards enabled
Money not updating? Use exact currency names (gold, silver, copper)
📦 What's Included
