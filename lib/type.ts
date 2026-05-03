export interface HostingConfig {
  subdomain: string;
}

export interface StoreHostedImageParams {
  hosting: HostingConfig | null;
  url: string;
  projectId: string;
  label: string;
}

export interface HostedAsset {
  url: string;
}

export interface DesignItem {
    id: string;
    sourceImage: string;
    renderedImage?: string;
    visibility?: "public" | "private";
    [key: string]: any;
}

export interface CreateProjectParams {
    item: DesignItem;
    visibility?: "public" | "private";
}

export interface Generate3DViewParams {
    sourceImage: string;
}

export interface GenerateCodeParams {
    prompt: string;
    context?: string;
}

export interface ExaSearchParams {
    query: string;
    numResults?: number;
    useAutoprompt?: boolean;
    type?: "keyword" | "neural" | "auto";
}
