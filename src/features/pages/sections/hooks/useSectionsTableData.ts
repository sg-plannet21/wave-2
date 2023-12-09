import { useMemo } from 'react';
import useSections from './useSections';

export type SectionTableRecord = {
  id: string;
  name: string;
};

function useSectionsTableData() {
  const { data: sections, isLoading, error } = useSections();

  const data: SectionTableRecord[] = useMemo(() => {
    if (!sections) return [];

    return sections.map((section) => ({
      id: section.section_id,
      name: section.section,
    }));
  }, [sections]);

  return { data, isLoading, error };
}

export default useSectionsTableData;
