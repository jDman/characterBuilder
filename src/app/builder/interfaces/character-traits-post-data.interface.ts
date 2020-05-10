import { CharacterTraits } from './character-traits.interface';

export interface CharacterTraitsPostData {
  characterId: string;
  traits: CharacterTraits;
}
