import { diseaseDoc } from '@/types/disease';
import FlatRenderer from './FlatRenderer';
import CollapsibleRenderer from './CollapsibleRenderer';

const DynamicComponentRenderer: React.FC<{ data: diseaseDoc }> = ({ data }) => {
    const mode = process.env.NEXT_PUBLIC_DISEASE_DOC_RENDERMODE;
    if (mode === '1') {
        return <CollapsibleRenderer data={data} />;
    }
    return <FlatRenderer data={data} />;
};

export default DynamicComponentRenderer;
