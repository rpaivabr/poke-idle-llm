# PokéIdle Testing Plan

- [x] 1. Navigate to http://localhost:4200/ and verify initial state (Arena de Treino: Bulbasaur sprite, 50 coins, 100 energy). Take screenshot `initial_arena`.
- [ ] 2. Click 'Batalhar (-10 ⚡)' 10 times until energy reaches 0.
- [ ] 3. Verify battle button disabled & 'Pokémon Exausto! Vá ao Centro Pokémon para descansar.' appears. Take screenshot `exhausted_arena`.
- [ ] 4. Navigate to 'LOJA' tab.
- [ ] 5. Buy Net Ball (35) and Nest Ball (105). Verify coins = 110, unaffordable items show 'SEM GRANA', backpack shows 'SUA MOCHILA (2)'. Take screenshot `pokemart_shop`.
- [ ] 6. Navigate to 'CENTRO' tab. Verify Chansey sprite, 0 energy bar, pink '💖 Recuperar Saúde' button. Take screenshot `pokemon_center_empty`.
- [ ] 7. Click '💖 Recuperar Saúde' button. Verify energy = 100, bar green/full, button 'Energia Cheia' (disabled). Take screenshot `pokemon_center_healed`.
- [ ] 8. Navigate to 'GINÁSIO' tab. Verify Bulbasaur ready to battle. Take screenshot `final_arena`.
