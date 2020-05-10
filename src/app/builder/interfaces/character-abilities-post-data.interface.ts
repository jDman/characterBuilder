import { CharacterAbilities } from './character-abilities.interface';

export interface CharacterAbilitiesPostData {
  characterId: string;
  abilities: CharacterAbilities;
}
