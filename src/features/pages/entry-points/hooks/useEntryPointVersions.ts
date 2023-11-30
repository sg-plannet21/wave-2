import useEntryPoint from './useEntryPoint';

function useEntryPointVersions(id: string) {
  return useEntryPoint(`${id}'?versions=true`);
}

export default useEntryPointVersions;
