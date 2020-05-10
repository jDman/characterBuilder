import { CharacterEquipment } from './character-equipment.interface';

export interface CharacterEquipmentPostData {
  characterId: string;
  equipment: CharacterEquipment;
}
