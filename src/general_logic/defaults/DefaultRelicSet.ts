const defaultRelicSet = { // key = char ID, value = light cone ID
    // 5 stars
    '1308': { // Acheron with 4pc Pioneer / 2pc Izumo Gensei
      'twoPieceID': '117',
      'fourPieceID': '117',
      'planarID': '314',
      'bodyStat': 'critDamage',
      'feetStat': 'speed',
      'orbStat': 'lightningDamage',
      'ropeStat': 'attackPercent',
    }, 
    '1307': { // Black Swan with 4pc Prisoner / 2pc Glamoth
      'twoPieceID': '116',
      'fourPieceID': '116',
      'planarID': '311',
      'bodyStat': 'effectHitRate',
      'feetStat': 'speed',
      'orbStat': 'windDamage',
      'ropeStat': 'attackPercent',
    }, 
    '1306': { // Sparkle with 2pc Guard / 2pc Messenger / 2pc Broken Keel
      'twoPieceID': '106',
      'fourPieceID': '114',
      'planarID': '310',
      'bodyStat': 'critDamage',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'energyRegen'
    }, 
    '1305': { // Dr. Ratio and 4pc Pioneer/2pc Izumo Gensei
      'twoPieceID': '117',
      'fourPieceID': '117',
      'planarID': '314',
      'bodyStat': 'critDamage',
      'feetStat': 'speed',
      'orbStat': 'imaginaryDamage',
      'ropeStat': 'attackPercent'
    }, 
    '1304': { // Aventurine with 4pc Knight / 2pc Keel
      'twoPieceID': '103',
      'fourPieceID': '103',
      'planarID': '310',
      'bodyStat': 'defensePercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'defensePercent'
    }, 
    '1303': { // Ruan Mei with 2pc Messenger / 2pc Thief / 2pc Penacony
      'twoPieceID': '111',
      'fourPieceID': '114',
      'planarID': '312',
      'bodyStat': 'hpPercent',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'energyRegen'
    }, 
    '1302': { // Argenti with 4pc Champion/2pc Salsotto
      'twoPieceID': '105',
      'fourPieceID': '105',
      'planarID': '306',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'physicalDamage',
      'ropeStat': 'attackPercent'
    }, 
    '1217': { // Huohuo with 2pc Longevous / 2pc Messenger / 2pc Keel
      'twoPieceID': '113',
      'fourPieceID': '114',
      'planarID': '310',
      'bodyStat': 'healingBoost',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'hpPercent'
    },
    '1213': { // DHIL with 4pc Musketeer/2pc Rutilant
      'twoPieceID': '102',
      'fourPieceID': '102',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'attackPercent',
      'orbStat': 'imaginaryDamage',
      'ropeStat': 'attackPercent'
    },
    '1212': { // Jingliu with 4pc Quantum /2pc Rutilant
      'twoPieceID': '108',
      'fourPieceID': '108',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'iceDamage',
      'ropeStat': 'attackPercent'
    },
    '1211': { // Bailu with 2pc Longevous / 2pc Messenger / 2pc Keel
      'twoPieceID': '113',
      'fourPieceID': '114',
      'planarID': '310',
      'bodyStat': 'healingBoost',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'energyRegen'
    },
    '1209': { // Yanqing with 4pc Hunter / 2pc Glamoth
      'twoPieceID': '104',
      'fourPieceID': '104',
      'planarID': '311',
      'bodyStat': 'critDamage',
      'feetStat': 'speed',
      'orbStat': 'iceDamage',
      'ropeStat': 'attackPercent'
    },
    '1208': { // Fu Xuan with 2pc Guard / 2pc Longevous / 2pc Keel
      'twoPieceID': '106',
      'fourPieceID': '113',
      'planarID': '310',
      'bodyStat': 'hpPercent',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'energyRegen'
    },
    '1205': { // Blade with 4pc Longevous / 2pc Rutilant
      'twoPieceID': '113',
      'fourPieceID': '113',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'hpPercent',
      'orbStat': 'windDamage',
      'ropeStat': 'hpPercent'
    },
    '1204': { // Jing Yuan with 4pc Duke / 2pc Salsotto
      'twoPieceID': '115',
      'fourPieceID': '115',
      'planarID': '306',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'lightningDamage',
      'ropeStat': 'attackPercent'
    },
    '1203': { // Luocha with 2pc Messenger / 2pc Passerby / 2pc Keel
      'twoPieceID': '114',
      'fourPieceID': '101',
      'planarID': '310',
      'bodyStat': 'attackPercent',
      'feetStat': 'speed',
      'orbStat': 'attackPercent',
      'ropeStat': 'energyRegen'
    },
    '1112': { // Topaz with 4pc Duke / 2pc Salsotto
      'twoPieceID': '115',
      'fourPieceID': '115',
      'planarID': '306',
      'bodyStat': 'critRate',
      'feetStat': 'attackPercent',
      'orbStat': 'fireDamage',
      'ropeStat': 'attackPercent'
    },
    '1107': { // Clara with 4pc Champion / 2pc Salsotto
      'twoPieceID': '105',
      'fourPieceID': '105',
      'planarID': '306',
      'bodyStat': 'critRate',
      'feetStat': 'attackPercent',
      'orbStat': 'physicalDamage',
      'ropeStat': 'attackPercent'
    },
    '1104': { // Gepard with 4pc Knight / 2pc Belobog
      'twoPieceID': '103',
      'fourPieceID': '103',
      'planarID': '304',
      'bodyStat': 'defensePercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'energyRegen'
    },
    '1102': { // Seele with 4pc Quantum / 2pc Glamoth
      'twoPieceID': '108',
      'fourPieceID': '108',
      'planarID': '311',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'quantumDamage',
      'ropeStat': 'attackPercent'
    },
    '1101': { // Bronya with 2pc Messenger / 2pc Longevous / 2pc Keel
      'twoPieceID': '114',
      'fourPieceID': '113',
      'planarID': '310',
      'bodyStat': 'critDamage',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'energyRegen'
    },
    '1006': { // Silver Wolf with 2pc Messenger / 2pc Genius / 2pc Penacony
      'twoPieceID': '114',
      'fourPieceID': '108',
      'planarID': '312',
      'bodyStat': 'effectHitRate',
      'feetStat': 'speed',
      'orbStat': 'quantumDamage',
      'ropeStat': 'energyRegen'
    },
    '1005': { // Kafka with 4pc Prisoner / 2pc Glamoth
      'twoPieceID': '116',
      'fourPieceID': '116',
      'planarID': '311',
      'bodyStat': 'attackPercent',
      'feetStat': 'speed',
      'orbStat': 'lightningDamage',
      'ropeStat': 'attackPercent'
    },
    '1004': { // Welt with 4pc Wastelander / 2pc Space Sealing
      'twoPieceID': '112',
      'fourPieceID': '112',
      'planarID': '301',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'imaginaryDamage',
      'ropeStat': 'attackPercent'
    },
    '1003': { // Himeko with 4pc Duke / 2pc Sigonia
      'twoPieceID': '115',
      'fourPieceID': '115',
      'planarID': '313',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'fireDamage',
      'ropeStat': 'attackPercent'
    },
    '8001': { // Caelus Destruction with 4pc Champion / 2pc Rutilant
      'twoPieceID': '105',
      'fourPieceID': '105',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'physicalDamage',
      'ropeStat': 'attackPercent'
    },
    '8002': { // Stelle Destruction with 4pc Champion / 2pc Rutilant
      'twoPieceID': '105',
      'fourPieceID': '105',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'physicalDamage',
      'ropeStat': 'attackPercent'
    },
    '8003': { // Caelus Preservation with 4pc Knight / 2pc Keel
      'twoPieceID': '103',
      'fourPieceID': '103',
      'planarID': '310',
      'bodyStat': 'defensePercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'defensePercent'
    },
    '8004': { // Stelle Preservation with 4pc Knight / 2pc Keel
      'twoPieceID': '103',
      'fourPieceID': '103',
      'planarID': '310',
      'bodyStat': 'defensePercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'defensePercent'
    },

    // 4 stars
    '1312': { // Misha with 4pc Pioneer / 2pc Salsotto
      'twoPieceID': '117',
      'fourPieceID': '117',
      'planarID': '306',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'iceDamage',
      'ropeStat': 'attackPercent'
    },
    '1301': { // Gallagher with 4pc Thief / 2pc Talia
      'twoPieceID': '111',
      'fourPieceID': '111',
      'planarID': '307',
      'bodyStat': 'hpPercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'energyRegen'
    },
    '1215': { // Hanya with 4pc Messenger / 2pc Keel
      'twoPieceID': '114',
      'fourPieceID': '114',
      'planarID': '310',
      'bodyStat': 'hpPercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'energyRegen'
    },
    '1214': { // Xueyi with 4pc Genius / 2pc Space Sealing
      'twoPieceID': '108',
      'fourPieceID': '108',
      'planarID': '301',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'quantumDamage',
      'ropeStat': 'breakEffect'
    },
    '1210': { // Guinaifen with 4pc Prisoner / 2pc Glamoth
      'twoPieceID': '116',
      'fourPieceID': '116',
      'planarID': '311',
      'bodyStat': 'attackPercent',
      'feetStat': 'speed',
      'orbStat': 'fireDamage',
      'ropeStat': 'attackPercent'
    },
    '1207': { // Yukong with 2pc Messenger / 2pc Guard / 2pc Keel
      'twoPieceID': '114',
      'fourPieceID': '106',
      'planarID': '310',
      'bodyStat': 'hpPercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'energyRegen'
    },
    '1206': { // Sushang with 4pc Champion / 2pc Rutilant
      'twoPieceID': '105',
      'fourPieceID': '105',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'physicalDamage',
      'ropeStat': 'attackPercent'
    },
    '1202': { // Tingyun with 2pc Messenger / 2pc Guard / 2pc Keel
      'twoPieceID': '114',
      'fourPieceID': '106',
      'planarID': '310',
      'bodyStat': 'attackPercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'energyRegen'
    },
    '1201': { // Qingque with 4pc Quantum / 2pc Rutilant
      'twoPieceID': '108',
      'fourPieceID': '108',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'attackPercent',
      'orbStat': 'quantumDamage',
      'ropeStat': 'attackPercent'
    },
    '1111': { // Luka with 4pc Prisoner / 2pc Space Sealing
      'twoPieceID': '116',
      'fourPieceID': '116',
      'planarID': '301',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'physicalDamage',
      'ropeStat': 'attackPercent'
    },
    '1110': { // Lynx with 2pc Messenger / 2pc Passerby / 2pc Keel
      'twoPieceID': '114',
      'fourPieceID': '101',
      'planarID': '310',
      'bodyStat': 'hpPercent',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'energyRegen'
    },
    '1109': { // Hook with 4pc Pioneer / 2pc Glamoth
      'twoPieceID': '117',
      'fourPieceID': '117',
      'planarID': '311',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'fireDamage',
      'ropeStat': 'attackPercent'
    },
    '1108': { // Sampo with 4pc Prisoner / 2pc Glamoth
      'twoPieceID': '116',
      'fourPieceID': '116',
      'planarID': '311',
      'bodyStat': 'effectHitRate',
      'feetStat': 'speed',
      'orbStat': 'windDamage',
      'ropeStat': 'attackPercent'
    },
    '1106': { // Pela with 4pc Eagle / 2pc Penacony
      'twoPieceID': '110',
      'fourPieceID': '110',
      'planarID': '312',
      'bodyStat': 'effectHitRate',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'energyRegen'
    },
    '1105': { // Natasha with 2pc Messenger / 2pc Passerby / 2pc Fleet
      'twoPieceID': '114',
      'fourPieceID': '101',
      'planarID': '302',
      'bodyStat': 'hpPercent',
      'feetStat': 'speed',
      'orbStat': 'hpPercent',
      'ropeStat': 'energyRegen'
    },
    '1103': { // Serval with 4pc Sizzling Thunder / 2pc Glamoth
      'twoPieceID': '109',
      'fourPieceID': '109',
      'planarID': '311',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'lightningDamage',
      'ropeStat': 'energyRegen'
    },
    '1013': { // Herta with 4pc Hunter / 2pc Glamoth
      'twoPieceID': '104',
      'fourPieceID': '104',
      'planarID': '311',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'iceDamage',
      'ropeStat': 'attackPercent'
    },
    '1009': { // Asta with 4pc Messenger / 2pc Keel
      'twoPieceID': '114',
      'fourPieceID': '114',
      'planarID': '310',
      'bodyStat': 'hpPercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'energyRegen'
    },
    '1008': { // Arlan with 4pc Sizzling Thunder / 2pc Rutilant
      'twoPieceID': '109',
      'fourPieceID': '109',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'lightningDamage',
      'ropeStat': 'attackPercent'
    },
    '1002': { // Green Dan Heng with 4pc Pioneer / 2pc Rutilant
      'twoPieceID': '117',
      'fourPieceID': '117',
      'planarID': '309',
      'bodyStat': 'critRate',
      'feetStat': 'speed',
      'orbStat': 'windDamage',
      'ropeStat': 'attackPercent'
    },
    '1001': { // March 7th with 4pc Knight / 2pc Keel
      'twoPieceID': '103',
      'fourPieceID': '103',
      'planarID': '310',
      'bodyStat': 'defensePercent',
      'feetStat': 'speed',
      'orbStat': 'defensePercent',
      'ropeStat': 'energyRegen'
    },
  }
  
  export default defaultRelicSet;