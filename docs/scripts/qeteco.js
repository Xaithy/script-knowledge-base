// ==========================
function QETEco(hook) {
  "use strict";

  // ————————————————————————————————
  // Konfiguracja (wskaźniki/whitelisty/mapy)
  // ————————————————————————————————
  const CFG = {
    indicators: { wallet: "🪙", items: "🎒", quests: "📜" },
    currencies: {
      map: {
        gold: ["gold", "gp"],
        silver: ["silver", "sp"],
        copper: ["copper", "cp"],
        money: ["money", "coin", "coins", "piece", "pieces"]
      }
    },
    parsing: {
      // Łupy / znajdźki (bez "scavenge")
      lootVerbs: [
        "find","pick up","loot","grab","obtain","collect","get",
        "found","looted","picked up","take","took","receive","stash"
      ],
      // Akceptacja questa (nie wypłacamy tu nagrody!)
      questAcceptVerbs: [
        "accept","take","start","begin","agree to","undertake","sign on to","pick up","pick"
      ],
      // Ukończenie questa (tu wypłacamy zapisane nagrody)
      questFinishVerbs: [
        "complete","finish","fulfill","accomplish","turn in","hand in","redeem","wrap up","deliver","submit","cash in","resolve"
      ],
      questNouns: ["quest","mission","task","bounty","job","contract","hunt"],

      // ——— operacje na itemach / handlu ———
      tradeSellVerbs: ["sell","pawn","fence","trade away","barter away"],
      tradeBuyVerbs:  ["buy","purchase","acquire"],
      giveVerbs:      ["give","hand over","hand in","turn over","offer","donate","return","give away"],
      destroyVerbs:   ["destroy","break","smash","shatter","burn","discard","scrap","consume","use up","drink","eat"]
    },
    items: {
      // Słowa bezwartościowe — usuwa je z nazw itemów
      banTokens: new Set([
        "a","an","the","and","or","of","for","to","from","with","in","on","at","by","as","than","then","that","this","these","those",
        "is","are","was","were","be","been","being","am",
        "they","them","their","theirs","where","there","here",
        "who","whom","which","what","when","why","how",
        "rough","feeling","some","any","more","most","much","very","quite",
        // dopiski, by nie przenosić „śmieci” z narracji do nazw
        "finding","found","looting","looted","picking","picked","up","into","onto","off","over","away","back",
        // dodatkowe słowa opisowe (np. "hanging above door")
        "hanging","above","door","sign","depiction","crude","its",
        // ruch / trasa / czasowniki poboczne, by nie wpadały do nazw
        "walk","walking","way","grab"
      ]),
      // Whitelista rdzeni (skrócona do kluczowych)
      whiteRoots: [
        // WEAPONS
        "sword","shortsword","short sword","longsword","long sword","greatsword","great sword","broadsword",
        "claymore","rapier","saber","sabre","scimitar","falchion","katana","wakizashi","nodachi","cutlass",
        "epee","estoc","gladius","kopis","khopesh","machete","kukri","poignard","stiletto","dirk","dagger",
        "knife","shiv","main gauche",
        "axe","ax","handaxe","hand axe","battleaxe","battle axe","greataxe","great axe","hatchet","tomahawk",
        "bardiche","bearded axe","double axe",
        "club","cudgel","mace","flail","morningstar","warhammer","war hammer","maul","sledgehammer","sledge hammer",
        "quarterstaff","quarter staff","staff",
        "spear","javelin","pike","halberd","glaive","lance","trident","partisan","voulge","ranseur",
        "bill","billhook",
        "bow","shortbow","short bow","longbow","long bow","recurve bow","composite bow","crossbow","cross-bow",
        "hand crossbow","arbalest","repeating crossbow","sling","bolas","blowgun","throwing knife","throwing axe",
        "shuriken","chakram","boomerang","arrow","bolt","quiver",
        "whip","net","harpoon","truncheon","sap","mancatcher",
        "wand","rod","orb","focus","grimoire","talisman","totem","spellbook","spell book",
        "pistol","musket","flintlock","arquebus","harquebus","blunderbuss","carbine","powder horn","bullet","lead shot","shot",
        // ARMOR
        "helmet","helm","greathelm","bascinet","sallet","barbute","armet","kettle hat","hood","coif","mask","visor","gorget",
        "armor","armour","breastplate","cuirass","brigandine","hauberk","gambeson","jerkin","chainmail","chain mail",
        "ring mail","scale mail","splint mail","lamellar","plate armor","half plate","full plate","chestplate",
        "tabard","surcoat","tunic","robe","cloak","mantle","cape",
        "pauldron","spaulder","fauld","tasset","vambrace","bracer","rerebrace","gauntlet","glove","greave","cuisses","cuisse","sabaton","belt","boot","sandals","leggings",
        // SHIELDS
        "shield","buckler","tower shield","kite shield","heater shield","round shield","pavise",
        // TOOLS & UTILITY
        "pick","pickaxe","shovel","spade","hoe","rake","sickle","scythe","adze","mattock",
        "hammer","mallet","chisel","saw","hand saw","hacksaw","file","rasp","tongs","pliers","wrench","screwdriver","awl","drill","hand drill","auger",
        "plane","clamp","vice","vise","crowbar","prybar","anvil","bellows","grinder","millstone",
        "rope","chain","hook","grappling hook","torch","lantern","candle","flint","tinderbox","oil","lamp oil","match","lockpick","key","keyring",
        "needle","thread","thimble","loom","spindle",
        "pot","cooking pot","pan","skillet","ladle","kettle","cauldron",
        "canteen","waterskin","bucket","mop","broom",
        "healer's kit","healers kit","healer kit","poisoner's kit","poisoners kit","alchemist's supplies","herbalism kit",
        "navigator's tools","thieves' tools","disguise kit","forgery kit","painter's supplies",
        "mortar","pestle","alembic","retort","crucible","vial","phial","flask","beaker",
        "quill","ink","parchment","paper","papyrus","scrollcase","scroll case","journal","book","tome","codex","map","atlas","compass","sextant","scale","balance","weights",
        "fishing rod","rod and line","lure","bait","net","trap","snare","bear trap","caltrops",
        // CONSUMABLES
        "potion","elixir","tonic","draught","philter","philtre","tincture","remedy","antidote","antitoxin","salve","balm","poultice",
        "healing potion","mana potion","stamina potion","invisibility potion","strength potion","speed potion",
        "food","rations","bread","loaf","hardtack","cheese","meat","jerky","sausage","stew","soup","broth","porridge","gruel",
        "fruit","apple","pear","berry","vegetable","carrot","potato","onion","fish","water","ale","beer","mead","wine","tea","coffee",
        "spice","salt","sugar","scroll","bomb","firebomb","grenade","smoke bomb","oil flask","poison","shot",
        // MATERIALS
        "ore","ingot","bar","nugget","iron","steel","copper","tin","bronze","brass","silver","gold","electrum","platinum","lead",
        "mithril","mythril","adamantine","adamantite","orichalcum","obsidian","meteorite",
        "stone","rock","granite","marble","slate","clay","brick","chalk",
        "wood","log","timber","plank","board","oak","ash","yew","elm","pine","cedar","ebony","mahogany","birch","maple","willow","driftwood",
        "cloth","fabric","textile","linen","wool","cotton","silk","velvet","felt","canvas","hemp","flax","jute","thread","yarn",
        "leather","hide","pelt","fur","scale","bone","horn","ivory","tusk","sinew","chitin","carapace","feather","shell","dragonhide","dragon hide",
        "herb","flower","root","leaf","fungus","fungi","mushroom","spore","ginseng","mandrake","nightshade","wolfsbane","belladonna",
        "kingsfoil","athelas","sage","thyme","rosemary","mint","basil",
        "saltpeter","niter","brimstone","sulfur","charcoal","resin","tar","pitch","wax","dye","crystal","shard","gemstone",
        // VALUABLES
        "gem","jewel","pearl","ruby","emerald","sapphire","diamond","amethyst","topaz","opal","garnet","jade","onyx","aquamarine","citrine","peridot","alexandrite",
        "necklace","ring","bracelet","amulet","pendant","earring","circlet","crown","tiara","diadem","brooch","cameo","locket","chain","torc","torque","signet",
        "relic","artifact","artefact","idol","tapestry","painting","statue","figurine","seal","bullion",
        // STORAGE/CARRY
        "backpack","pack","sack","bag","pouch","satchel","belt pouch","scroll case","scrollcase","chest","coffer","strongbox","crate","barrel","box","jar","bottle","jug","decanter","vessel",
        // CAMP/TRAVEL
        "bedroll","blanket","tent","campfire","flint and steel","saddle","bridle","reins","bit","stirrups","horseshoe","feed","fodder","whistle",
        // PAPERWORK / SEALS
        "writ","deed","charter","permit","letter","stamp","signet"
      ],
      minAlpha: 3,
      maxNameLen: 50
    }
  };

  // ————————————————————————————————
  // Stan trwały
  // ————————————————————————————————
  const S = (state.QETE ??= {
    hash: "",
    money: { gold: 0, silver: 0, copper: 0, money: 0 },
    items: {},
    quests: { active: [], done: [] },
    questRewards: {},     // zapamiętujemy obiecane nagrody walutowe per tytuł
    seen: { lastOut: "", lastIn: "" }
  });

  // Guardy sandboxa AID
  if (
    !globalThis.storyCards || !Array.isArray(storyCards) || typeof addStoryCard !== "function" ||
    !globalThis.history || !Array.isArray(history) ||
    typeof text !== "string"
  ) {
    return;
  }

  // ————————————————————————————————
  // Utils
  // ————————————————————————————————
  const nowISO = () => (new Date()).toISOString().slice(0,16).replace("T"," ");
  const lc = s => (s ?? "").toLowerCase();
  const clean = s => (s ?? "").replace(/\s+/g, " ").trim();

  const historyHash = () => {
    let n = 0; const ser = JSON.stringify(history.slice(-50));
    for (let i=0;i<ser.length;i++) n=((31*n)+ser.charCodeAt(i))|0;
    return n.toString(16);
  };
  const isRetry = () => S.hash === historyHash();
  const markTurn = () => { S.hash = historyHash(); };

  // Wskaźniki/emoji
  const IND = CFG.indicators;
  function stripIndicators(title) {
    return title.replace(/^(?:[\u{1F300}-\u{1FAFF}]\uFE0F?\s*)+/u, "").trim();
  }
  function indicate(card, emoji) {
    const base = stripIndicators(card.title);
    card.title = (emoji ? (emoji + " " + base) : base);
  }
  function clearAllIndicators() {
    for (const c of storyCards) {
      if (!c || typeof c.title !== "string") continue;
      c.title = stripIndicators(c.title);
    }
  }

  // Karty — singletony
  const TITLES = Object.freeze({
    wallet: "Money & Currencies",
    items: "Items & Properties",
    quests: "Quest Tracker"
  });
  function findCard(title) {
    for (let i=0;i<storyCards.length;i++){ const c=storyCards[i]; if (c && c.title===title) return c; }
    return null;
  }
  function ensureSingleton(title, entryInit = "", descInit = "") {
    let first = null;
    for (let i=storyCards.length-1;i>=0;i--) {
      const c = storyCards[i];
      if (!c || typeof c !== "object") continue;
      if (stripIndicators(c.title) === title) {
        if (first) {
          if (typeof removeStoryCard === "function") removeStoryCard(i);
          else storyCards.splice(i,1);
        } else { first = c; }
      }
    }
    if (!first) first = addStoryCard("QETEco:"+title, entryInit, "class", title, descInit, { returnCard:true });
    if (!/^\s*QETEco:/.test(first.keys)) first.keys = "QETEco:" + title;
    first.title = title; // normalizacja nagłówka (bez starych emoji)
    return first;
  }

  // Render: Wallet → ENTRY
  function renderWallet() {
    const c = ensureSingleton(TITLES.wallet);
    const txt = `Gold: ${S.money.gold}\nSilver: ${S.money.silver}\nCopper: ${S.money.copper}\nMoney: ${S.money.money}`;
    if (c.entry !== txt) c.entry = txt;
    if (typeof c.description === "string") c.description = clean(c.description.replace(/Gold:\s*\d+[\s\S]*$/i, ""));
    return c;
  }

  // Kategoryzacja — uproszczona heurystyka (zachowuje grupy)
  function categorizeItem(name) {
    const n = lc(name);
    const has = kw => new RegExp(`\\b(?:${kw.join("|")})\\b`).test(n);

    if (has(["sword","dagger","knife","axe","mace","flail","morningstar","warhammer","staff","spear","javelin","pike","halberd","glaive","lance","trident","bow","crossbow","arrow","bolt","quiver","whip","net","wand","rod","orb","spellbook","pistol","musket","arquebus","carbine","shot","bullet"])) return "Weapons";
    if (has(["helmet","helm","greathelm","bascinet","sallet","barbute","armet","hood","coif","mask","visor","gorget","armor","armour","breastplate","cuirass","brigandine","hauberk","gambeson","jerkin","chainmail","ring mail","scale mail","splint mail","lamellar","plate armor","half plate","full plate","chestplate","tabard","surcoat","tunic","robe","cloak","mantle","cape","pauldron","spaulder","fauld","tasset","vambrace","bracer","rerebrace","gauntlet","glove","greave","cuisse","cuisses","sabaton","belt","boot","sandals","leggings","shield","buckler","pavise"])) return "Armor";
    if (has(["pick","pickaxe","shovel","spade","hoe","rake","sickle","scythe","adze","mattock","hammer","mallet","chisel","saw","hacksaw","file","rasp","tongs","pliers","wrench","screwdriver","awl","drill","auger","plane","clamp","vice","vise","crowbar","prybar","anvil","bellows","grinder","millstone","rope","chain","hook","grappling hook","torch","lantern","candle","flint","tinderbox","oil","match","lockpick","key","keyring","needle","thread","thimble","loom","spindle","pot","pan","skillet","ladle","kettle","cauldron","canteen","waterskin","bucket","mop","broom","kit","tools","supplies","mortar","pestle","alembic","retort","crucible","vial","phial","flask","beaker","quill","ink","parchment","paper","papyrus","scrollcase","scroll case","journal","book","tome","codex","atlas","compass","sextant","scale","balance","weights","fishing rod","lure","bait","net","trap","snare","bear trap","caltrops"])) return "Tools";
    if (has(["potion","elixir","tonic","draught","philter","philtre","tincture","remedy","antidote","antitoxin","salve","balm","poultice","food","ration","bread","loaf","hardtack","cheese","meat","jerky","sausage","stew","soup","broth","porridge","gruel","fruit","apple","pear","berry","vegetable","carrot","potato","onion","fish","water","ale","beer","mead","wine","tea","coffee","spice","salt","sugar","scroll","bomb","firebomb","grenade","smoke bomb","oil flask","poison","shot"])) return "Consumables";
    if (has(["ore","ingot","bar","nugget","iron","steel","copper","tin","bronze","brass","silver","gold","electrum","platinum","lead","mithril","mythril","adamantine","adamantite","orichalcum","obsidian","meteorite","stone","rock","granite","marble","slate","clay","brick","chalk","wood","log","timber","plank","board","oak","ash","yew","elm","pine","cedar","ebony","mahogany","birch","maple","willow","driftwood","cloth","fabric","textile","linen","wool","cotton","silk","velvet","felt","canvas","hemp","flax","jute","thread","yarn","leather","hide","pelt","fur","scale","bone","horn","ivory","tusk","sinew","chitin","carapace","feather","shell","dragon","herb","flower","root","leaf","fungus","fungi","mushroom","spore","ginseng","mandrake","nightshade","wolfsbane","belladonna","kingsfoil","athelas","sage","thyme","rosemary","mint","basil","saltpeter","niter","brimstone","sulfur","charcoal","resin","tar","pitch","wax","dye","crystal","shard","gemstone"])) return "Materials";
    if (has(["gem","jewel","pearl","ruby","emerald","sapphire","diamond","amethyst","topaz","opal","garnet","jade","onyx","aquamarine","citrine","peridot","alexandrite","necklace","ring","bracelet","amulet","pendant","earring","circlet","crown","tiara","diadem","brooch","cameo","locket","torc","torque","relic","artifact","artefact","idol","tapestry","painting","statue","figurine","bullion"])) return "Valuables";
    if (/^(?:property:|prop:)/i.test(n)) return "Properties";
    return "Misc";
  }

  function renderItems() {
    const c = ensureSingleton(TITLES.items);
    const groups = { Weapons:[], Armor:[], Tools:[], Consumables:[], Materials:[], Valuables:[], Misc:[], Properties:[] };
    for (const [k,v] of Object.entries(S.items)) {
      if (!v || v === 0) continue;
      groups[categorizeItem(k)].push(`${k} x${v}`);
    }
    const sec = t => (groups[t].length ? groups[t].map(s=>` - ${s}`).join("\n") : " - (none)");
    const txt =
      `Weapons:\n${sec("Weapons")}\n\n` +
      `Armor:\n${sec("Armor")}\n\n` +
      `Tools:\n${sec("Tools")}\n\n` +
      `Consumables:\n${sec("Consumables")}\n\n` +
      `Materials:\n${sec("Materials")}\n\n` +
      `Valuables:\n${sec("Valuables")}\n\n` +
      `Misc:\n${sec("Misc")}\n\n` +
      `Properties:\n${sec("Properties")}`;
    if (c.entry !== txt) c.entry = txt;
    return c;
  }

  // Quest Tracker: Active -> ENTRY, Completed -> NOTES
  function renderQuests() {
    const c = ensureSingleton(TITLES.quests);
    const actTxt = (S.quests.active.length ? S.quests.active.map(q=>`- ${q}`).join("\n") : "—");
    const entryTxt = `Active Quests:\n${actTxt}`;
    if (c.entry !== entryTxt) c.entry = entryTxt;
    const doneTxt = (S.quests.done.length ? S.quests.done.map(q=>`- ${q}`).join("\n") : "—");
    const notes = `Completed Quests:\n${doneTxt}`;
    if (c.description !== notes) c.description = notes;
    return c;
  }

  // ————————————————————————————————
  // Normalizacja nazw itemów i filtry
  // ————————————————————————————————
  function stripLocationPhrases(s) {
    return (s || "")
      .replace(/\b(?:on|from)\s+the\s+(?:ground|floor|corpse|body|chest|table|altar|road|dirt|sand|snow)\b/ig, "")
      .replace(/\b(?:on|from)\s+(?:ground|floor|corpse|body|chest|table|altar|road|dirt|sand|snow)\b/ig, "")
      .replace(/\b(?:on\s+(?:the|your|my)\s+way)\b/ig, "")
      .replace(/\s{2,}/g, " ").trim();
  }
  function sanitizeItemName(raw) {
    let s = clean(raw).replace(/[“”"'\`]/g, "");
    s = s.replace(/^(?:a|an|some)\s+/i, "");
    s = stripLocationPhrases(s);
    if (s.length > CFG.items.maxNameLen) s = s.slice(0, CFG.items.maxNameLen).trim();
    const tokens = s.split(/[^a-z0-9]+/i).filter(Boolean);
    const kept = [];
    for (const t of tokens) {
      const l = lc(t);
      if (CFG.items.banTokens.has(l)) continue;
      if (l.length < CFG.items.minAlpha) continue;
      kept.push(l);
    }
    if (!kept.length) return "";
    const hasWhite = kept.some(k => CFG.items.whiteRoots.some(r => k.indexOf(r) !== -1));
    const out = kept.join(" ");
    return (hasWhite || out.length >= CFG.items.minAlpha) ? out : "";
  }
  function addItem(name, qty, CH) {
    const n = sanitizeItemName(name);
    if (!n) return;
    const before = S.items[n] || 0;
    S.items[n] = before + (qty || 1);
    if (S.items[n] <= 0) delete S.items[n];
    if ((S.items[n] || 0) !== before) CH.items = true;
  }
  // NOWE: pojemniki/lokacje, których nie dodajemy jako itemów
  const CONTAINERS = new Set([
    "chest","corpse","body","table","altar","road","ground","floor","sand","snow",
    "shelf","rack","wall","door","sign","counter","desk","drawer","cupboard","wardrobe",
    "crate","barrel","box","jar","bottle","bag","sack","pouch","backpack",
    "coffer","strongbox","safe","cache","stash","room","hall","city","street",
    "alley","camp","shop","store","market","tent"
  ]);
  // ——— bezpieczne usuwanie itemów ———
  function removeItem(name, qty, CH) {
    const n = (name ?? "").trim();
    if (!n) return;
    addItem(n, -Math.max(1, qty|0), CH);
  }

  // ————————————————————————————————
  // Waluty / Loot / Questy + anty‑powtórki
  // ————————————————————————————————
  function recentTextsToScan() {
    const res = []; const seen = S.seen;
    // Bierzemy wyłącznie ostatni input użytkownika (do/say) – unikamy narracji AI
    const lastIn = history.findLast(a => a?.type === "do" || a?.type === "say");
    if (lastIn?.text && lastIn.text !== seen.lastIn) { res.push(lastIn.text); seen.lastIn = lastIn.text; }
    return res;
  }

  function addMoney(kind, delta, CH) {
    const k = lc(kind);
    let norm = k;
    for (const key in CFG.currencies.map) { if (CFG.currencies.map[key].includes(k)) { norm = key; break; } }
    if (norm === "coin" || norm === "coins" || norm === "piece" || norm === "pieces") norm = "money";
    const before = S.money[norm] || 0;
    S.money[norm] = Math.max(0, before + (delta||0));
    if (S.money[norm] !== before) CH.wallet = true;
  }

  // Pomocnicze: rozpoznanie walut przy frazach „for …”
  function parseCurrencyAmounts(text) {
    const out = { gold:0, silver:0, copper:0, money:0 };
    const alias = [];
    for (const [k, arr] of Object.entries(CFG.currencies.map)) alias.push(...arr.map(a=>a.replace(/\s+/g,"\\s+")));
    const reAll = new RegExp(`\\bfor\\s+((?:\\d+\\s+(?:${alias.join('|')})(?:\\s+(?:coins?|pieces?))?)(?:\\s*(?:,|and)\\s*\\d+\\s+(?:${alias.join('|')})(?:\\s+(?:coins?|pieces?))?)*)`, 'ig');
    let a; reAll.lastIndex = 0;
    while ((a = reAll.exec(text))) {
      const seq = a[1];
      const each = new RegExp(`(\\d+)\\s+(${alias.join('|')})(?:\\s*(?:coins?|pieces?))?`, 'ig');
      let e; each.lastIndex = 0;
      while ((e = each.exec(seq))) {
        const amt = parseInt(e[1],10)||0;
        const word = lc(e[2]).replace(/\s+/g,' ');
        let kind = 'money';
        for (const [k, arr] of Object.entries(CFG.currencies.map)) {
          if (arr.some(v => lc(v) === word)) { kind = k; break; }
        }
        out[kind] += amt;
      }
    }
    return out;
  }

  // Parser nagród questa (for reward / reward: / reward is / bounty:)
  function parseQuestRewardAmounts(text) {
    const acc = { gold:0, silver:0, copper:0, money:0 };
    const alias = [];
    for (const arr of Object.values(CFG.currencies.map)) {
      for (const a of arr) alias.push(a.replace(/\s+/g,'\\s+'));
    }
    // a) klasyczne: "for 5 silver"
    const viaFor = parseCurrencyAmounts(text);
    acc.gold += viaFor.gold; acc.silver += viaFor.silver; acc.copper += viaFor.copper; acc.money += viaFor.money;

    // b) "for reward 5 silver" / "for a reward of 5 silver"
    const reForReward = new RegExp(`\\bfor\\s+(?:a\\s+)?reward\\s+(?:of\\s+)?((?:\\d+\\s+(?:${alias.join('|')})(?:\\s+(?:coins?|pieces?))?)(?:\\s*(?:,|and)\\s*\\d+\\s+(?:${alias.join('|')})(?:\\s+(?:coins?|pieces?))?)*)`, 'ig');

    // c) "reward: 5 silver" / "reward is 5 silver" / "bounty: 10 gold"
    const reRewardIs = new RegExp(`\\b(?:reward|bounty)\\s*(?::|is)\\s*((?:\\d+\\s+(?:${alias.join('|')})(?:\\s+(?:coins?|pieces?))?)(?:\\s*(?:,|and)\\s*\\d+\\s+(?:${alias.join('|')})(?:\\s+(?:coins?|pieces?))?)*)`, 'ig');

    const collect = (re) => {
      let m; re.lastIndex = 0;
      while ((m = re.exec(text))) {
        const seq = m[1];
        const each = new RegExp(`(\\d+)\\s+(${alias.join('|')})(?:\\s*(?:coins?|pieces?))?`, 'ig');
        let e; each.lastIndex = 0;
        while ((e = each.exec(seq))) {
          const amt = parseInt(e[1],10)||0;
          const word = e[2].toLowerCase().replace(/\s+/g,' ');
          let kind = 'money';
          for (const [k, arr] of Object.entries(CFG.currencies.map)) {
            if (arr.some(v => v.toLowerCase() === word)) { kind = k; break; }
          }
          acc[kind] += amt;
        }
      }
    };
    collect(reForReward);
    collect(reRewardIs);
    return acc;
  }

  // ——— wytnij waluty z segmentu i nalicz je ———
  function extractCurrencyFromSegment(segment, CH) {
    const alias = [];
    for (const arr of Object.values(CFG.currencies.map)) {
      for (const a of arr) alias.push(a.replace(/\s+/g,'\\s+'));
    }
    const reAmt = new RegExp(`(?:^|\\b)(\\d+)\\s+(?:${alias.join('|')})(?:\\s+(?:coins?|pieces?))?(?=\\b|[.,;:!?])`, 'ig');

    let out = segment;
    let m;
    reAmt.lastIndex = 0;
    while ((m = reAmt.exec(segment))) {
      const amt = parseInt(m[1], 10) || 0;
      const tail = segment.slice(m.index).match(new RegExp(`^(?:\\d+)\\s+(${alias.join('|')})(?:\\s+(?:coins?|pieces?))?`, 'i'));
      if (amt && tail) {
        const kindWord = tail[1].toLowerCase().replace(/\s+/g,' ');
        let kind = 'money';
        for (const [k, arr] of Object.entries(CFG.currencies.map)) {
          if (arr.some(v => v.toLowerCase() === kindWord)) { kind = k; break; }
        }
        addMoney(kind, amt, CH);
        out = out.replace(tail[0], '').replace(/\s{2,}/g, ' ').trim();
      }
    }
    return out;
  }

  function parseMoneyAndItemsFrom(textBlob, CH) {
    const raw = " " + textBlob.replace(/\s+/g," ") + " ";

    // Guard: jeśli to akceptacja questa z wariantem nagrody — blokujemy naliczenie pieniędzy z tego tekstu
    const accVerbs = CFG.parsing.questAcceptVerbs.map(v=>v.replace(/[\-\^$*+?.()|[\]{}]/g,'\\$&')).join('|');
    const nouns = CFG.parsing.questNouns.map(v=>v.replace(/[\-\^$*+?.()|[\]{}]/g,'\\$&')).join('|');
    const who = '(?:you|i)';

    const alias = [];
    for (const arr of Object.values(CFG.currencies.map)) for (const a of arr) alias.push(a.replace(/\s+/g,'\\s+'));

    const guardFor = new RegExp(`\\b${who}\\s+(?:${accVerbs})\\s+(?:the\\s+)?(?:${nouns})\\b[\\s\\S]*?\\bfor\\s+\\d+\\s+(?:${alias.join('|')})(?:\\s+(?:coins?|pieces?))?\\b`, 'i');
    const guardReward = new RegExp(`\\b${who}\\s+(?:${accVerbs})\\s+(?:the\\s+)?(?:${nouns})\\b[\\s\\S]*?\\b(?:reward|bounty)\\s*(?::|is|of)?\\s*\\d+\\s+(?:${alias.join('|')})\\b`, 'i');

    const blockMoney = guardFor.test(raw) || guardReward.test(raw);

    // ——— LOOT: wielo‑klauzulowy ———
    const verbsEsc = CFG.parsing.lootVerbs.map(v=>v.replace(/[\-\^$*+?.()|[\]{}]/g,'\\$&')).join('|');
    // Dzielimy tekst przed KAŻDĄ klauzulą typu: "you <verb>" lub "and <verb>"
    const splitRe = new RegExp(`(?=\\b(?:(?:you|i)\\s+(?:${verbsEsc})|and\\s+(?:${verbsEsc}))\\b)`, 'ig');
    const parts = raw.split(splitRe);

    for (const part of parts) {
      // Szukamy klauzuli lootowej na początku fragmentu
      const m = part.match(new RegExp(`^\\b(?:(?:you|i)\\s+|and\\s+)(?:${verbsEsc})\\b\\s+([^.!?]+)`, 'i'));
      if (!m) continue;
      let segment = m[1];

      // Jeśli to akceptacja questa z nagrodą – nie naliczaj pieniędzy z tej klauzuli
      const localBlock = blockMoney && /\b(?:accept|take|start|begin|agree to|undertake|sign on to|pick up|pick)\b/i.test(part) && /\b(?:quest|mission|task|bounty|job|contract|hunt)\b/i.test(part);

      // przytnij segment na wypadek kolejnej klauzuli lootowej w tym samym zdaniu (np. "stash ... and grab ...")
      const nextCut = segment.search(new RegExp(`\b(?:,?\s*and\s+(?:(?:you|i)\s+)?(?:${verbsEsc}))\b`, 'i'));
      if (nextCut > -1) segment = segment.slice(0, nextCut);

      // rozbij listę obiektów po przecinkach i "and"
      segment = stripLocationPhrases(segment).replace(/\b(?:as well as|along with)\b/gi, ",");
      const list = segment.split(/\s*,\s*|\s+and\s+/i).map(s => s.trim()).filter(Boolean);

      for (let x of list) {
        // 1) Waluty (chyba że guard)
        if (!localBlock) x = extractCurrencyFromSegment(x, CH);
        if (!x) continue; // czysto walutowy

        // 2) Gole słowa walut – pomiń
        if (/(?:^\b)(gold|silver|copper|gp|sp|cp|coin|coins|piece|pieces|money)(?:\b$)/i.test(x)) continue;

        // 3) Ilość + nazwa
        const m2 = x.match(/^(?:x?\s*(\d+)\s+)?(.+?)$/i);
        const qty = m2 && m2[1] ? parseInt(m2[1],10) : 1;
        const name = m2 ? m2[2] : x;
        const sname = sanitizeItemName(name);
        if (!sname || CONTAINERS.has(sname)) continue;
        addItem(sname, qty, CH);
      }
    }
  }

  function normalizeQuestTitle(q) {
    q = clean(q).replace(/[“”"']/g,"");
    if (q.length > 80) q = q.slice(0,80).trim();
    q = q.split(" ").map(w => w[0] ? (w[0].toUpperCase() + w.slice(1)) : w).join(" ");
    return q;
  }

  function parseQuests(textBlob, CH) {
    const text = " " + textBlob.replace(/\s+/g," ") + " ";
    const accVerbs = CFG.parsing.questAcceptVerbs.map(v=>v.replace(/[\-\^$*+?.()|[\]{}]/g,'\\$&')).join('|');
    const finVerbs = CFG.parsing.questFinishVerbs.map(v=>v.replace(/[\-\^$*+?.()|[\]{}]/g,'\\$&')).join('|');
    const nouns = CFG.parsing.questNouns.map(v=>v.replace(/[\-\^$*+?.()|[\]{}]/g,'\\$&')).join('|');
    const who = '(?:you|i)';

    // ——— ACCEPT ———
    const reAccept = new RegExp(`\\b${who}\\s+(?:${accVerbs})\\s+(?:the\\s+)?(?:${nouns})\\s*:?[\"']?([^.!?[\"']+)[\"']?`, 'i');
    const mAcc = text.match(reAccept);
    if (mAcc) {
      const title = normalizeQuestTitle(mAcc[1]);
      if (!S.quests.active.includes(title)) { S.quests.active.push(title); CH.quests = true; }
      // Nagrody z akceptacji — zapiszemy, ale nie wypłacamy
      const amounts = parseQuestRewardAmounts(text);
      if (amounts.gold || amounts.silver || amounts.copper || amounts.money) {
        S.questRewards[title] = {
          gold: amounts.gold||0, silver: amounts.silver||0, copper: amounts.copper||0, money: amounts.money||0
        };
      }
    }

    // ——— FINISH ———
    const reFinishGeneric = new RegExp(`\\b(?:${finVerbs})\\s+(?:the\\s+)?(?:${nouns})(?:\\s*:?\\s*[\"']?([^.!?[\"']+)[\"']?)?`, 'i');
    const reFinishSpecial = /\b(?:mission accomplished|collect bounty|claim reward|claim bounty)\b/i;
    const reFinishLast = /\b(?:complete|finish|turn in|hand in|redeem|wrap up|deliver|submit|cash in|resolve)\s+(?:the\s+)?last\s+(?:quest|mission|task|bounty|job|contract|hunt)\b/i;

    let finTitle = null; let finishDetected = false;
    const mFin = text.match(reFinishGeneric);
    if (mFin) { finishDetected = true; finTitle = mFin[1] ? normalizeQuestTitle(mFin[1]) : null; }
    if (!finishDetected && reFinishSpecial.test(text)) { finishDetected = true; finTitle = null; }
    if (!finishDetected && reFinishLast.test(text)) { finishDetected = true; finTitle = null; }

    if (finishDetected) {
      // Wyznacz tytuł: jawny -> ostatni aktywny -> jedyny aktywny
      let idx = -1;
      if (finTitle) idx = S.quests.active.findIndex(q => lc(q) === lc(finTitle));
      if (idx === -1 && S.quests.active.length) idx = S.quests.active.length - 1;
      if (S.quests.active.length === 1) idx = 0;
      if (idx !== -1) {
        const doneTitle = S.quests.active.splice(idx,1)[0];
        S.quests.done.push(`${doneTitle} (✓ ${nowISO()} UTC)`);
        CH.quests = true;

        // WYPŁATA: tylko zapisane nagrody z Accept
        const rw = S.questRewards[doneTitle];
        if (rw) {
          if (rw.gold)   addMoney('gold',   rw.gold, CH);
          if (rw.silver) addMoney('silver', rw.silver, CH);
          if (rw.copper) addMoney('copper', rw.copper, CH);
          if (rw.money)  addMoney('money',  rw.money, CH);
          delete S.questRewards[doneTitle];
        }
      }
    }
  }

  // ——— transakcje (sprzedaż/kupno/oddanie/niszczenie) ———
  function parseTransactions(textBlob, CH) {
    const raw = " " + (textBlob || "").replace(/\s+/g, " ") + " ";

    const esc = s => s.replace(/[\-\^$*+?.()|[\]{}]/g, '\\$&');
    const verbsSell = CFG.parsing.tradeSellVerbs.map(esc).join('|');
    const verbsBuy  = CFG.parsing.tradeBuyVerbs.map(esc).join('|');
    const verbsGive = CFG.parsing.giveVerbs.map(esc).join('|');
    const verbsDestr= CFG.parsing.destroyVerbs.map(esc).join('|');
    const who = '(?:you|i)';

    const splitItems = seg => {
      const cleaned = seg
        .replace(/\b(as well as|along with|plus)\b/gi, ',')
        .replace(/\b(the|a|an)\s+/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      return cleaned.split(/\s*,\s*|\s+and\s+/i).map(s => s.trim()).filter(Boolean);
    };

    const applyForAmounts = (tail, CH) => {
      const amounts = parseCurrencyAmounts(tail || "");
      if (amounts.gold)   addMoney('gold',   amounts.gold, CH);
      if (amounts.silver) addMoney('silver', amounts.silver, CH);
      if (amounts.copper) addMoney('copper', amounts.copper, CH);
      if (amounts.money)  addMoney('money',  amounts.money, CH);
    };

    // SELL
    {
      const re = new RegExp(`\\b${who}\\s+(?:${verbsSell})\\s+([^.!?]+?)(?:\\s+for\\s+([^.!?]+))?(?=[.!?])`, 'ig');
      let m; re.lastIndex = 0;
      while ((m = re.exec(raw))) {
        const listPart = (m[1] || '').trim();
        const priceTail = (m[2] || '').trim();
        const itemsRaw = splitItems(listPart).map(s => extractCurrencyFromSegment(s, CH)).filter(Boolean);
        for (const piece of itemsRaw) {
          const qtyMatch = piece.match(/^(?:x?\s*(\d+)\s+|(\d+)\s*x\s*)?(.*)$/i);
          const qty = parseInt(qtyMatch?.[1] || qtyMatch?.[2] || "1", 10) || 1;
          const name = (qtyMatch?.[3] || piece).trim();
          const sname = sanitizeItemName(name);
          if (!sname || CONTAINERS.has(sname)) continue;
          removeItem(sname, qty, CH);
        }
        if (priceTail) applyForAmounts("for " + priceTail, CH);
      }
    }

    // BUY
    {
      const re = new RegExp(`\\b${who}\\s+(?:${verbsBuy})\\s+([^.!?]+?)(?:\\s+for\\s+([^.!?]+))?(?=[.!?])`, 'ig');
      let m; re.lastIndex = 0;
      while ((m = re.exec(raw))) {
        const listPart = (m[1] || '').trim();
        const priceTail = (m[2] || '').trim();
        const itemsRaw = splitItems(listPart).map(s => extractCurrencyFromSegment(s, CH)).filter(Boolean);
        for (const piece of itemsRaw) {
          const qtyMatch = piece.match(/^(?:x?\s*(\d+)\s+|(\d+)\s*x\s*)?(.*)$/i);
          const qty = parseInt(qtyMatch?.[1] || qtyMatch?.[2] || "1", 10) || 1;
          const name = (qtyMatch?.[3] || piece).trim();
          const sname = sanitizeItemName(name);
          if (!sname || CONTAINERS.has(sname)) continue;
          addItem(sname, qty, CH);
        }
        if (priceTail) {
          const amounts = parseCurrencyAmounts("for " + priceTail);
          if (amounts.gold)   addMoney('gold',   -amounts.gold, CH);
          if (amounts.silver) addMoney('silver', -amounts.silver, CH);
          if (amounts.copper) addMoney('copper', -amounts.copper, CH);
          if (amounts.money)  addMoney('money',  -amounts.money, CH);
        }
      }
    }

    // GIVE
    {
      const re = new RegExp(`\\b${who}\\s+(?:${verbsGive})\\s+([^.!?]+?)(?=[.!?])`, 'ig');
      let m; re.lastIndex = 0;
      while ((m = re.exec(raw))) {
        const itemsRaw = splitItems((m[1] || '')).map(s => extractCurrencyFromSegment(s, CH)).filter(Boolean);
        for (const piece of itemsRaw) {
          const qtyMatch = piece.match(/^(?:x?\s*(\d+)\s+|(\d+)\s*x\s*)?(.*)$/i);
          const qty = parseInt(qtyMatch?.[1] || qtyMatch?.[2] || "1", 10) || 1;
          const name = (qtyMatch?.[3] || piece).trim();
          const sname = sanitizeItemName(name);
          if (!sname || CONTAINERS.has(sname)) continue;
          removeItem(sname, qty, CH);
        }
      }
    }

    // DESTROY / CONSUME
    {
      const re = new RegExp(`\\b${who}\\s+(?:${verbsDestr})\\s+([^.!?]+?)(?=[.!?])`, 'ig');
      let m; re.lastIndex = 0;
      while ((m = re.exec(raw))) {
        const itemsRaw = splitItems((m[1] || '')).map(s => extractCurrencyFromSegment(s, CH)).filter(Boolean);
        for (const piece of itemsRaw) {
          const qtyMatch = piece.match(/^(?:x?\s*(\d+)\s+|(\d+)\s*x\s*)?(.*)$/i);
          const qty = parseInt(qtyMatch?.[1] || qtyMatch?.[2] || "1", 10) || 1;
          const name = (qtyMatch?.[3] || piece).trim();
          const sname = sanitizeItemName(name);
          if (!sname || CONTAINERS.has(sname)) continue;
          removeItem(sname, qty, CH);
        }
      }
    }
  }

  // ————————————————————————————————
  // HOOKI (context / output)
  // ————————————————————————————————
  if (hook === "context") {
    // Normalizacja tytułów (usuń stare emoji) i zapewnij singletony
    for (const t of [TITLES.wallet, TITLES.items, TITLES.quests, "📜 Quest Tracker"]) {
      const c = findCard(t); if (c && c.title === "📜 Quest Tracker") c.title = TITLES.quests;
    }
    ensureSingleton(TITLES.wallet); ensureSingleton(TITLES.items); ensureSingleton(TITLES.quests);
    clearAllIndicators();
    renderWallet(); renderItems(); renderQuests();
    return;
  }

  if (hook === "output") {
    if (isRetry()) return; // nie dubluj po Retry/Erase
    const CHANGES = { wallet:false, items:false, quests:false };
    for (const t of recentTextsToScan()) {
      parseMoneyAndItemsFrom(t, CHANGES);
      parseQuests(t, CHANGES);
      parseTransactions(t, CHANGES); // handel i „znikanie” itemów
    }
    const w = renderWallet(); const it = renderItems(); const q = renderQuests();
    if (CHANGES.wallet) indicate(w, IND.wallet);
    if (CHANGES.items) indicate(it, IND.items);
    if (CHANGES.quests) indicate(q, IND.quests);
    markTurn();
    return;
  }
}
