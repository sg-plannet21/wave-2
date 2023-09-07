import Select, { SelectOption } from '@/components/Elements/Select/Select';
import useAuth from '@/state/hooks/useAuth';
import storage from '@/utils/storage';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function mapBusinessUnitsToOptions(
  businessUnits: { id: string; label: string }[]
): SelectOption[] {
  return businessUnits.map((bu) => ({ label: bu.label, value: bu.id }));
}

function BusinessUnitSelect() {
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState<
    undefined | SelectOption
  >(undefined);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { businessUnits } = useAuth();

  const handleBusinessUnitChange = useCallback(
    (businessUnit: SelectOption) => {
      setSelectedBusinessUnit(businessUnit);
      storage.businessUnit.setBusinessUnit(businessUnit.value.toString());

      // extract any entity from the pathname -> /app/[business-unit-id]/entity/
      const split = pathname.split('/');
      const routeTo = `/app/${businessUnit.value}${
        split.length > 3 ? `/${split[3]}` : ''
      }`;
      navigate(routeTo);
    },
    [pathname, navigate]
  );

  useEffect(() => {
    if (!selectedBusinessUnit && businessUnits.length) {
      const mappedBusinessUnits: SelectOption[] =
        mapBusinessUnitsToOptions(businessUnits);

      const activeBusinessUnitId = storage.businessUnit.getBusinessUnit();
      const activeBusinessUnit = mappedBusinessUnits.find(
        (bu) => bu.value === activeBusinessUnitId
      );

      if (activeBusinessUnit) {
        setSelectedBusinessUnit(activeBusinessUnit);
      } else {
        const [firstItem] = mappedBusinessUnits;
        handleBusinessUnitChange(firstItem);
      }
    }
  }, [selectedBusinessUnit, businessUnits, handleBusinessUnitChange]);

  if (businessUnits.length && selectedBusinessUnit)
    return (
      <Select
        options={mapBusinessUnitsToOptions(businessUnits)}
        onChange={(bu) => handleBusinessUnitChange(bu)}
        selectedOption={selectedBusinessUnit}
      />
    );

  return null;
}

export default BusinessUnitSelect;
