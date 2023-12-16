import { useParams } from 'react-router-dom';
import React from 'react';
import useSections from '../../sections/hooks/useSections';

function useSectionId() {
  const { sectionName } = useParams();
  const { data: sections } = useSections({
    enabled: !!sectionName,
    staleTime: 5 * 60 * 1000,
  });

  const sectionId = React.useMemo(() => {
    if (!sectionName || !sections) return null;

    const decodedSectionName = decodeURIComponent(sectionName);
    return sections.find((section) => section.section === decodedSectionName)
      ?.section_id;
  }, [sectionName, sections]);

  return sectionId;
}

export default useSectionId;
