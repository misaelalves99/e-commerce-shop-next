// src/core/types/category.ts

/**
 * Categoria exibida no header, faixas de categoria e filtros.
 * Base para o "CardCategories" do catÃ¡logo estÃ¡tico.
 */
export interface CardCategory {
  /** ID usado em filtros, rota e link (ex: "roupas", "sapatos") */
  id: string;

  /** Slug usado em URLs e navegação */
  slug?: string;

  /** Label exibido na UI (ex: "Roupas", "Sapatos") */
  label: string;

  /** Ãcone opcional (react-icons key ou slug interno) */
  icon?: string;

  /** Cor opcional usada para destaque visual da categoria */
  highlightColor?: string;

  /** Ordem de destaque na listagem (menor = mais prioridade) */
  order?: number;

  /** DescriÃ§Ã£o curta para SEO ou tooltips */
  description?: string;
}


