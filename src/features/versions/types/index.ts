interface Fields {
  revision: number;
  object_id: string;
  content_type: number;
  db: string;
  format: string;
  serialized_data: string;
  object_repr: string;
}

export interface Version {
  model: string;
  pk: number;
  fields: Fields;
  change_date: string;
  change_user: string;
}

export interface DeserializedData<Entity> {
  model: string;
  pk: string;
  fields: Entity;
}
