export type PackageInfo = {
    downloads: {
        monthly: number;
        weekly: number;
    };
    dependents: number;
    updated: string;
    searchScore: number;
    package: {
        name: string;
        keywords: string[];
        version: string;
        description: string;
        publisher: {
            email: string;
            username: string;
        };
        maintainers: {
            email: string;
            username: string;
        }[];
        license: string;
        date: string;
        links: {
            homepage: string;
            repository: string;
            bugs: string;
            npm: string;
        };
    };
    score: {
        final: number;
        detail: {
            popularity: number;
            quality: number;
            maintenance: number;
        };
    };
    flags: {
        insecure: number;
    };
};

export type PackageResponse = {
    objects: PackageInfo[]
    time: string;
    total: number
}