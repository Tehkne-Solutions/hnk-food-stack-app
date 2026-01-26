// Define a estrutura de dados para uma Organização/Tenant

export interface Organization {
  id: string; // UUID
  name: string;
  slug: string;
  custom_domain?: string | null;
  settings?: {
    primary_color?: string;
    secondary_color?: string;
    font_family?: string;
    logo_url?: string;
  } | null;
  created_at: string; // timestamp
}