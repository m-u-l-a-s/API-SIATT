interface UserDetailsProps {
    id: string;
    login: string;
    email: string;
    departamento: string;
    permissao: number;
    status: number;
    admin: boolean;
    senha?: string;
}