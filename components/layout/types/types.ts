type FileSystemObject = {
    type: "file" | "directory";
    name: string;
    children?: FileSystemObject[];
    path: string;
    code?: string;
};

export type { FileSystemObject };
