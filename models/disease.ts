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

export type headingData = 'h1'|'h2'|'h3'|'h4'|'h5'|'h6';
export type titleDocElement = {
    type: headingData;
    content: string;
};
export type paragraphDocElement = {
    type: 'paragraph';
    title?: string | null;
    paragraph: string;
};
export type imageDocElement = {
    type: 'image';
    url: string;
    altText: string;
    caption?: string | null;
};
export type diseasesImages = {
    type: 'diseasesImages';
    title: string;
    images: { url: string; altText: string }[];
};

export type diseaseDocElement = paragraphDocElement | imageDocElement | diseasesImages;
export type diseaseDocData = {
    diseaseId: string;
    content: diseaseDocElement[];
};
export type diseaseDoc = {
    id: string;
} & diseaseDocData;