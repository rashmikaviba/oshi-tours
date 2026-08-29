export interface CatalogActivityItem {
    id: string;
    name: string;
}
export interface CatalogCategory {
    id: string;
    title: string;
    activities: CatalogActivityItem[];
}
export declare const ACTIVITY_CATALOG: CatalogCategory[];
export declare const TOTAL_AVAILABLE_ACTIVITY_POINTS: number;
export declare const ACTIVITY_CATALOG_MAP: Map<string, {
    categoryTitle: string;
    activityName: string;
}>;
//# sourceMappingURL=activityCatalog.d.ts.map