export interface EntityDependency {
  url: string;
  dependencies: Dependencies;
}

interface Dependencies {
  obj_has_dependencies: boolean;
  related_objects: RelatedObject[];
}

type ModelType =
  | 'Route'
  | 'Menu'
  | 'Prompt'
  | 'EntryPoint'
  | 'Queue'
  | 'Section'
  | 'Schedule'
  | 'ScheduleException';

interface RelatedObject {
  related_model: ModelType;
  related_fields: string[];
  related_id: string;
  related_name: string;
}
