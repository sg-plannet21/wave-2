import Link from '@/components/Navigation/Link';
import { EntityDependency } from '@/features/dependencies/types';
import { chain } from 'lodash';

type RelatedObjectsType = EntityDependency['dependencies']['related_objects'];

interface Props {
    list: RelatedObjectsType;
}

const mapping: {
    [key in RelatedObjectsType[number]['related_model']]: string;
} = {
    Route: 'routes',
    Menu: 'menus',
    Queue: 'queues',
    EntryPoint: 'entry-points',
    Prompt: 'messages',
    Section: 'sections',
    Schedule: 'schedules',
    ScheduleException: 'schedule-exceptions',
};

function renderListItem(
    relatedObject: RelatedObjectsType[number]
): JSX.Element {
    switch (relatedObject.related_model) {
        case 'Route':
        case 'Menu':
        case 'Prompt':
        case 'Queue':
        case 'EntryPoint':
        case 'Section':
        case 'Schedule':
        case 'ScheduleException':
            return (
                <Link to={`../${mapping[relatedObject.related_model]}/`}>
                    {relatedObject.related_name}
                </Link>
            );

        default:
            return <span>{relatedObject.related_name}</span>;
    }
}

function DependencyList({ list }: Props) {
    if (!list.length) return null;
    const sorted = chain(list)
        .orderBy(['related_model', 'related_name'])
        .groupBy('related_model')
        .value();

    return (
        <ul className="space-y-4 text-gray-500 list-inside dark:text-gray-400">
            {Object.entries(sorted).map(([name, items]) => (
                <ul key={name}>
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                        {name}
                    </h3>
                    {items.map((item) => (
                        <li
                            key={item.related_id}
                            className="ps-5 mt-2 space-y-1 list-disc list-inside"
                        >
                            {renderListItem(item)}
                        </li>
                    ))}
                </ul>
            ))}
        </ul>
    );
}

export default DependencyList;
