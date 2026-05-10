// Esquema preliminar — substitua por tipos gerados via
// `npx supabase gen types typescript --project-id <id> > src/types/database.ts`
export type Database = {
  public: {
    Tables: {
      fazendeiros: {
        Row: {
          id: string;
          nome: string;
          telefone: string;
          ativo: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          telefone: string;
          ativo?: boolean;
          created_at?: string;
        };
        Update: Partial<{
          nome: string;
          telefone: string;
          ativo: boolean;
        }>;
        Relationships: [];
      };
      mensagens: {
        Row: {
          id: string;
          fazendeiro_id: string;
          direcao: "enviada" | "recebida";
          conteudo: string;
          enviada_em: string;
        };
        Insert: {
          id?: string;
          fazendeiro_id: string;
          direcao: "enviada" | "recebida";
          conteudo: string;
          enviada_em?: string;
        };
        Update: Partial<{
          conteudo: string;
        }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
