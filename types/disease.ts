export type diseaseSummary = {
    name: string;
    title: string;
    plantId: string;
    mainImageUrl: string;
    docId: string;
}
export type disease = {
    id: string;
} & diseaseSummary 



// --- Editor.js Block Data Types ---

export type HeaderBlockData = {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
};

export type ParagraphBlockData = {
    text: string;
};

export type SimpleImageBlockData = {
    url: string;
    caption?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
};

export type ListItemMeta = {
    checked?: boolean;
};

export type ListItem = {
    content: string;
    meta: ListItemMeta;
    items: ListItem[];
};

export type ListBlockData = {
    style: 'ordered' | 'unordered' | 'checklist';
    meta: {
        start?: number;
        counterType?: string;
    };
    items: ListItem[];
};

export type TableBlockData = {
    withHeadings: boolean;
    stretched: boolean;
    content: string[][];
};

export type DelimiterBlockData = Record<string, never>;

// --- Editor.js Block Union ---

export type diseaseDocBlock =
    | { id?: string; type: 'header'; data: HeaderBlockData }
    | { id?: string; type: 'paragraph'; data: ParagraphBlockData }
    | { id?: string; type: 'image'; data: SimpleImageBlockData }
    | { id?: string; type: 'list'; data: ListBlockData }
    | { id?: string; type: 'table'; data: TableBlockData }
    | { id?: string; type: 'delimiter'; data: DelimiterBlockData };

export type diseaseDocData = {
    time?: number;
    version?: string;
    blocks: diseaseDocBlock[];
};

export type diseaseDoc = {
    id: string;
} & diseaseDocData;