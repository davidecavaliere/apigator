declare class StoryService {
    constructor();
    list(): {
        id: number;
        title: string;
        author: string;
    }[];
    getById(id: any): {
        id: number;
        title: string;
        author: string;
    };
    getSubscriptions(id: any): string[];
    error(event: any): void;
}
export { StoryService };
