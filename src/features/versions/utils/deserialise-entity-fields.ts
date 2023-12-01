import { DeserializedData, Version } from '../types';

function deserialiseEntityFields<T>(version: Version): T {
  return (
    JSON.parse(version.fields.serialized_data) as [DeserializedData<T>]
  )[0].fields;
}

export default deserialiseEntityFields;
