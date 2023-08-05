export interface FreezerItem {
  freezer_id: string;
  freezer_item_uuid: string;
  food_id: string;
  count: number;
  expiration_date: Date;
}

export interface FreezerItem {
  food_id: string;
  freezer_id: string;
  count: number;
  expiration_date: Date;
}
