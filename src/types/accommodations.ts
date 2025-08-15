export interface Accommodation {
  name: string;
  how_it_helps: string;
  addresses_presentation: string;
  example: string;
}

export interface DisabilityData {
  disability_name: string;
  working_definition: string;
  common_presentations: string[];
  accommodations_modifications: Accommodation[];
}